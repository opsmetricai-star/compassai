"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";

type WS = { id: string; name: string };
type Doc = { id: string; title: string; source_type: string; source_url: string | null; char_count: number; workspace_id: string; created_at: string };

export function KnowledgeManager({ workspaces, docs, plan }: { workspaces: WS[]; docs: Doc[]; plan: string }) {
  const router = useRouter();
  const [type, setType] = useState<"text" | "file" | "url">("text");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);
  const limit = plan === "pro" ? Infinity : plan === "starter" ? 3 : 1;
  const cls = "w-full rounded-xl border border-line px-4 py-3 outline-none focus:border-brand bg-white";

  async function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setMsg(null);
    const fd = new FormData(e.currentTarget); fd.set("type", type);
    const r = await fetch("/api/documents", { method: "POST", body: fd });
    const j = await r.json().catch(() => ({}));
    setBusy(false);
    if (!r.ok) return setMsg({ ok: false, t: j.error ?? "Upload failed." });
    setMsg({ ok: true, t: `Indexed ${j.chunks} passage${j.chunks === 1 ? "" : "s"}.` });
    (e.target as HTMLFormElement).reset(); router.refresh();
  }
  async function remove(id: string) {
    if (!confirm("Delete this document and its indexed passages?")) return;
    const { error } = await supabaseBrowser().from("documents").delete().eq("id", id);
    if (error) setMsg({ ok: false, t: "Could not delete." }); else router.refresh();
  }
  async function addWs(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (workspaces.length >= limit) return setMsg({ ok: false, t: "Your plan's workspace limit is reached. Upgrade for more." });
    const name = String(new FormData(e.currentTarget).get("name") ?? "").trim();
    if (!name) return;
    const sb = supabaseBrowser(); const { data: u } = await sb.auth.getUser();
    const { error } = await sb.from("workspaces").insert({ name, owner_id: u.user!.id });
    if (error) setMsg({ ok: false, t: "Could not create workspace." }); else { (e.target as HTMLFormElement).reset(); router.refresh(); }
  }

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-8 max-w-[1100px]">
      <div>
        <h2 className="text-[20px] text-ink mb-4">Documents ({docs.length})</h2>
        {docs.length === 0 ? <p className="text-muted">No documents yet. Add one to get started.</p> : (
          <ul className="space-y-3">
            {docs.map((d) => (
              <li key={d.id} className="card p-4 flex items-center justify-between gap-4">
                <div className="min-w-0"><p className="text-ink truncate">{d.title}</p>
                  <p className="text-[13px] text-muted">{workspaces.find((w) => w.id === d.workspace_id)?.name} · {d.source_type} · {d.char_count.toLocaleString()} chars</p></div>
                <button onClick={() => remove(d.id)} className="text-[13px] text-red-600 shrink-0">Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="space-y-6">
        <form onSubmit={add} className="card p-5 space-y-3">
          <h2 className="text-[18px] text-ink">Add knowledge</h2>
          <div className="flex gap-2">{(["text", "file", "url"] as const).map((t) => <button type="button" key={t} onClick={() => setType(t)} className={`rounded-full border px-3 py-1 text-[13px] capitalize ${type === t ? "bg-black text-white border-black" : "border-line text-muted"}`}>{t === "text" ? "Paste text" : t === "file" ? "Upload file" : "From URL"}</button>)}</div>
          <select name="workspaceId" required className={cls}>{workspaces.map((w) => <option key={w.id} value={w.id}>{w.name}</option>)}</select>
          <input name="title" placeholder="Title (optional)" className={cls} />
          {type === "text" && <textarea name="text" required rows={6} placeholder="Paste notes, policies, transcripts…" className={cls} />}
          {type === "file" && <input name="file" type="file" required accept=".txt,.md,.markdown,.csv,.json,.log" className={cls} />}
          {type === "url" && <input name="url" type="url" required placeholder="https://…" className={cls} />}
          {msg && <p className={`text-sm ${msg.ok ? "text-brand" : "text-red-600"}`} role="status">{msg.t}</p>}
          <button disabled={busy} className="btn btn-blue disabled:opacity-60">{busy ? "Indexing…" : "Add"}</button>
        </form>
        <form onSubmit={addWs} className="card p-5 space-y-3">
          <h2 className="text-[18px] text-ink">Workspaces</h2>
          <p className="text-[13px] text-muted">{workspaces.map((w) => w.name).join(", ")}</p>
          <div className="flex gap-2"><input name="name" maxLength={80} placeholder="New workspace" className={cls} /><button className="btn btn-black">Create</button></div>
        </form>
      </div>
    </div>
  );
}
