import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseServer } from "@/lib/supabase/server";
import { generateGrounded } from "@/lib/ai";

export const maxDuration = 60;

const Body = z.object({
  question: z.string().trim().min(2).max(2000),
  workspaceId: z.string().uuid().nullable().optional(),
  conversationId: z.string().uuid().nullable().optional(),
  mode: z.enum(["ask", "research"]).default("ask"),
});

export async function POST(req: Request) {
  const supabase = await supabaseServer();
  const { data: u } = await supabase.auth.getUser();
  if (!u.user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });

  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Enter a question of 2 to 2000 characters." }, { status: 400 });
  const { question, workspaceId, mode } = parsed.data;
  let conversationId = parsed.data.conversationId ?? null;

  if (mode === "research") {
    const { data: p } = await supabase.from("profiles").select("plan").single();
    if (p?.plan !== "pro") return NextResponse.json({ error: "Research mode is available on the Pro plan.", upgrade: true }, { status: 402 });
  }

  const { data: ok, error: cErr } = await supabase.rpc("consume_credit", { p_kind: mode });
  if (cErr) return NextResponse.json({ error: "Could not check your credits." }, { status: 500 });
  if (!ok) return NextResponse.json({ error: "You have used all your credits for this period. Upgrade to continue.", upgrade: true }, { status: 402 });

  try {
    const { data: passages, error: sErr } = await supabase.rpc("search_chunks", { p_workspace: workspaceId ?? null, p_query: question, p_limit: mode === "research" ? 10 : 6 });
    if (sErr) throw sErr;

    let history: { role: string; content: string }[] = [];
    if (conversationId) {
      const { data } = await supabase.from("messages").select("role,content").eq("conversation_id", conversationId).order("created_at", { ascending: true }).limit(12);
      history = data ?? [];
    } else {
      const { data: c, error } = await supabase.from("conversations").insert({ owner_id: u.user.id, workspace_id: workspaceId ?? null, title: question.slice(0, 60) }).select("id").single();
      if (error) throw error;
      conversationId = c.id;
    }

    const result = await generateGrounded({ question, passages: passages ?? [], history, mode });
    const sources = result.cited
      .map((n) => (passages ?? [])[n - 1])
      .filter(Boolean)
      .map((p: { document_id: string; title: string; content: string }) => ({ document_id: p.document_id, title: p.title, snippet: p.content.slice(0, 220) }));

    const { error: mErr } = await supabase.from("messages").insert([
      { conversation_id: conversationId, owner_id: u.user.id, role: "user", content: question, sources: [], model: null },
      { conversation_id: conversationId, owner_id: u.user.id, role: "assistant", content: result.answer, sources, model: result.model },
    ]);
    if (mErr) console.error("message save failed", mErr.message);
    return NextResponse.json({ conversationId, answer: result.answer, sources, insufficient: result.insufficient, model: result.model });
  } catch (e) {
    await supabase.rpc("refund_credit");
    const msg = e instanceof Error ? e.message : "The request failed.";
    return NextResponse.json({ error: msg.includes("temporarily unavailable") ? msg : "The AI request failed. Your credit was not charged. Please try again." }, { status: 502 });
  }
}
