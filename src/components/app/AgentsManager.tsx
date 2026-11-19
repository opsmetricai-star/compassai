"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";

type Agent = { id: string; name: string; description: string | null; instructions: string; output_format: string; workspace_id: string | null };
type WS = { id: string; name: string };
const TEMPLATES = [
  { name: "Meeting recap", instructions: "Turn the provided notes into decisions, owners and next steps.", output_format: "bullets" },
  { name: "Policy explainer", instructions: "Answer questions strictly from policy documents and quote the relevant rule.", output_format: "brief" },
  { name: "Customer brief", instructions: "Summarize everything known about the named account: history, open issues, opportunities.", output_format: "brief" },
  { name: "Release notes", instructions: "Draft customer-friendly release notes from the engineering material.", output_format: "bullets" },
];

export function AgentsManager({ agents, workspaces }: { agents: Agent[]; workspaces: WS[] }) {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", instructions: "", output_format: "brief", workspace_id: "" });
  const [err, setErr] = useState("");
  const [run, setRun] = useState<{ id: string; out?: string; err?: string; busy?: boolean; upgrade?: boolean } | null>(null);
  const cls = "w-full rounded-xl border border-line px-4 py-3 outline-none focus:border-brand bg-white";

  async function create(e: React.FormEvent) {
    e.preventDefault(); setErr("");
    const sb = supabaseBrowser(); const { data: u } = await sb.auth.getUser();
    const { error } = await sb.from("agents").insert({ owner_id: u.user!.id, name: form.name.trim(), instructions: form.instructions.trim(), output_format: form.output_format, workspace_id: form.workspace_id || null });
    if (error) setErr(error.message.includes("Plan limit") ? "Plan limit reached. Upgrade to add more agents." : "Could not save the agent.");
    else { setForm({ name: "", instructions: "", output_format: "brief", workspace_id: "" }); router.refresh(); }
  }
  async function exec(id: string, input: string) {
    setRun({ id, busy: true });
    const r = await fetch(`/api/agents/${id}/run`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ input }) });
    const j = await r.json().catch(() => ({}));
    setRun(r.ok ? { id, out: j.output } : { id, err: j.error ?? "Run failed.", upgrade: j.upgrade });
  }
  async function del(id: string) {
    if (!confirm("Delete this agent and its run history?")) return;
    await supabaseBrowser().from("agents").delete().eq("id", id); router.refresh();
  }

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-8 max-w-[1100px]">
      <div className="space-y-4">
        {agents.length === 0 && <p className="text-muted">No agents yet. Pick a template or build your own.</p>}
        {agents.map((a) => (
          <div key={a.id} className="card p-5">
            <div className="flex justify-between gap-3"><div><p className="text-[18px] text-ink">{a.name}</p><p className="text-[13px] text-muted">{a.output_format} · {workspaces.find((w) => w.id === a.workspace_id)?.name ?? "All workspaces"}</p></div><button onClick={() => del(a.id)} className="text-[13px] text-red-600">Delete</button></div>
            <p className="mt-2 text-[14px] text-muted">{a.instructions}</p>
            <form className="mt-4 flex gap-2" onSubmit={(e) => { e.preventDefault(); const v = String(new FormData(e.currentTarget).get("input") ?? ""); if (v.trim().length > 1) exec(a.id, v); }}>
              <input name="input" required placeholder="Input for this run…" className={cls} /><button className="btn btn-black" disabled={run?.busy && run.id === a.id}>Run</button>
            </form>
            {run?.id === a.id && (run.busy ? <p className="mt-3 text-muted animate-pulse">Running…</p> : run.err ? <p className="mt-3 text-sm text-red-600">{run.err} {run.upgrade && <Link href="/app/billing" className="underline">Upgrade</Link>}</p> : <pre className="mt-3 whitespace-pre-wrap rounded-xl bg-cream p-4 text-[14px] font-sans">{run.out}</pre>)}
          </div>
        ))}
      </div>
      <form onSubmit={create} className="card p-5 space-y-3 h-fit">
        <h2 className="text-[18px] text-ink">New agent</h2>
        <div className="flex flex-wrap gap-2">{TEMPLATES.map((t) => <button type="button" key={t.name} onClick={() => setForm({ ...form, ...t })} className="rounded-full border border-line px-3 py-1 text-[12px] text-muted hover:text-brand">{t.name}</button>)}</div>
        <input required maxLength={80} placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={cls} />
        <textarea required rows={5} maxLength={2000} placeholder="Instructions" value={form.instructions} onChange={(e) => setForm({ ...form, instructions: e.target.value })} className={cls} />
        <select value={form.output_format} onChange={(e) => setForm({ ...form, output_format: e.target.value })} className={cls}><option value="brief">Brief</option><option value="bullets">Bullets</option><option value="table">Table</option><option value="email">Email</option></select>
        <select value={form.workspace_id} onChange={(e) => setForm({ ...form, workspace_id: e.target.value })} className={cls}><option value="">All workspaces</option>{workspaces.map((w) => <option key={w.id} value={w.id}>{w.name}</option>)}</select>
        {err && <p className="text-sm text-red-600" role="alert">{err}</p>}
        <button className="btn btn-blue">Save agent</button>
      </form>
    </div>
  );
}
