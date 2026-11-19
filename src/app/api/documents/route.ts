import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseServer } from "@/lib/supabase/server";
import { assertPublicUrl, chunkText, htmlToText } from "@/lib/ai";

export const maxDuration = 30;
const MAX_CHARS = 400_000;
const TEXT_EXT = /\.(txt|md|markdown|csv|json|log)$/i;

export async function POST(req: Request) {
  const supabase = await supabaseServer();
  const { data: u } = await supabase.auth.getUser();
  if (!u.user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });

  const form = await req.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  const workspaceId = z.string().uuid().safeParse(form.get("workspaceId"));
  if (!workspaceId.success) return NextResponse.json({ error: "Choose a workspace." }, { status: 400 });
  const { data: ws } = await supabase.from("workspaces").select("id").eq("id", workspaceId.data).single();
  if (!ws) return NextResponse.json({ error: "Workspace not found." }, { status: 404 });

  const type = String(form.get("type") ?? "text");
  let title = String(form.get("title") ?? "").trim().slice(0, 140);
  let text = "";
  let sourceUrl: string | null = null;
  let storagePath: string | null = null;
  let sourceType: "text" | "file" | "url" = "text";

  try {
    if (type === "url") {
      sourceType = "url";
      const u2 = assertPublicUrl(String(form.get("url") ?? ""));
      sourceUrl = u2.toString();
      const r = await fetch(sourceUrl, { redirect: "follow", signal: AbortSignal.timeout(10_000), headers: { "user-agent": "CompassAI-Fetcher/1.0" } });
      if (!r.ok) throw new Error(`The page returned ${r.status}.`);
      if (r.url) assertPublicUrl(r.url);
      const ct = r.headers.get("content-type") ?? "";
      if (!/text\/|html|xml|json/.test(ct)) throw new Error("That URL is not a text or HTML page.");
      const raw = await r.text();
      text = ct.includes("html") ? htmlToText(raw) : raw;
      title ||= u2.hostname + u2.pathname;
    } else if (type === "file") {
      sourceType = "file";
      const f = form.get("file");
      if (!(f instanceof File) || f.size === 0) throw new Error("Choose a file.");
      if (f.size > 5_000_000) throw new Error("Files must be under 5 MB.");
      if (!TEXT_EXT.test(f.name)) throw new Error("Supported file types: .txt, .md, .csv, .json, .log. PDF and Office parsing is not enabled yet.");
      text = await f.text();
      title ||= f.name;
      storagePath = `${u.user.id}/${crypto.randomUUID()}-${f.name.replace(/[^\w.\-]/g, "_")}`;
      const up = await supabase.storage.from("documents").upload(storagePath, f, { contentType: f.type || "text/plain" });
      if (up.error) storagePath = null;
    } else {
      text = String(form.get("text") ?? "");
      title ||= "Untitled note";
    }
    text = text.slice(0, MAX_CHARS).trim();
    if (text.length < 20) throw new Error("There is not enough text to index (minimum 20 characters).");
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Could not read that source." }, { status: 400 });
  }

  const { data: doc, error } = await supabase.from("documents").insert({
    workspace_id: ws.id, owner_id: u.user.id, title, source_type: sourceType, source_url: sourceUrl, storage_path: storagePath, char_count: text.length,
  }).select("id").single();
  if (error) return NextResponse.json({ error: "Could not save the document." }, { status: 500 });

  const chunks = chunkText(text).map((content, idx) => ({ document_id: doc.id, workspace_id: ws.id, owner_id: u.user.id, idx, content }));
  const { error: cErr } = await supabase.from("chunks").insert(chunks);
  if (cErr) {
    await supabase.from("documents").delete().eq("id", doc.id);
    return NextResponse.json({ error: "Could not index the document." }, { status: 500 });
  }
  return NextResponse.json({ id: doc.id, chunks: chunks.length });
}
