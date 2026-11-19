import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseServer } from "@/lib/supabase/server";
import { generateGrounded } from "@/lib/ai";

export const maxDuration = 60;
const Body = z.object({ input: z.string().trim().min(2).max(4000) });

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!z.string().uuid().safeParse(id).success) return NextResponse.json({ error: "Invalid agent." }, { status: 400 });
  const supabase = await supabaseServer();
  const { data: u } = await supabase.auth.getUser();
  if (!u.user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });
  const body = Body.safeParse(await req.json().catch(() => null));
  if (!body.success) return NextResponse.json({ error: "Enter some input for the agent." }, { status: 400 });

  const { data: agent } = await supabase.from("agents").select("*").eq("id", id).single();
  if (!agent) return NextResponse.json({ error: "Agent not found." }, { status: 404 });

  const { data: ok } = await supabase.rpc("consume_credit", { p_kind: "agent" });
  if (!ok) return NextResponse.json({ error: "You have used all your credits for this period. Upgrade to continue.", upgrade: true }, { status: 402 });

  try {
    const { data: passages } = await supabase.rpc("search_chunks", { p_workspace: agent.workspace_id, p_query: body.data.input, p_limit: 8 });
    const r = await generateGrounded({ question: body.data.input, passages: passages ?? [], format: agent.output_format, instructions: agent.instructions });
    const sources = r.cited.map((n) => (passages ?? [])[n - 1]).filter(Boolean).map((p: { document_id: string; title: string }) => ({ document_id: p.document_id, title: p.title }));
    await supabase.from("agent_runs").insert({ agent_id: id, owner_id: u.user.id, input: body.data.input, output: r.answer, sources });
    return NextResponse.json({ output: r.answer, sources, insufficient: r.insufficient });
  } catch {
    await supabase.rpc("refund_credit");
    return NextResponse.json({ error: "The agent run failed. Your credit was not charged." }, { status: 502 });
  }
}
