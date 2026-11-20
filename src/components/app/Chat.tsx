"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { Send } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string; sources?: { document_id: string; title: string; snippet?: string }[]; insufficient?: boolean };
type WS = { id: string; name: string };

export function Chat({ workspaces, initial, conversationId: cid, isPro }: { workspaces: WS[]; initial: Msg[]; conversationId: string | null; isPro: boolean }) {
  const [msgs, setMsgs] = useState<Msg[]>(initial);
  const [conv, setConv] = useState<string | null>(cid);
  const [ws, setWs] = useState<string>("");
  const [mode, setMode] = useState<"ask" | "research">("ask");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<{ m: string; upgrade?: boolean } | null>(null);
  const end = useRef<HTMLDivElement>(null);

  async function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const q = String(new FormData(form).get("q") ?? "").trim();
    if (q.length < 2 || busy) return;
    form.reset(); setErr(null); setBusy(true);
    setMsgs((m) => [...m, { role: "user", content: q }]);
    try {
      const r = await fetch("/api/ai/ask", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ question: q, workspaceId: ws || null, conversationId: conv, mode }) });
      const j = await r.json();
      if (!r.ok) setErr({ m: j.error ?? "Request failed.", upgrade: j.upgrade });
      else { setConv(j.conversationId); setMsgs((m) => [...m, { role: "assistant", content: j.answer, sources: j.sources, insufficient: j.insufficient }]); }
    } catch { setErr({ m: "Network error. Please try again." }); }
    setBusy(false);
    setTimeout(() => end.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-[900px]">
      <div className="flex flex-wrap gap-3 mb-4">
        <select value={ws} onChange={(e) => setWs(e.target.value)} className="rounded-lg border border-line bg-white px-3 py-2 text-[14px]" aria-label="Workspace">
          <option value="">All workspaces</option>
          {workspaces.map((w) => <option key={w.id} value={w.id}>{w.name}</option>)}
        </select>
        <select value={mode} onChange={(e) => setMode(e.target.value as "ask" | "research")} className="rounded-lg border border-line bg-white px-3 py-2 text-[14px]" aria-label="Mode">
          <option value="ask">Ask</option>
          <option value="research" disabled={!isPro}>Research {isPro ? "" : "(Pro)"}</option>
        </select>
        {conv && <Link href="/app/assistant" className="px-3 py-2 text-[14px] text-brand">New conversation</Link>}
      </div>
      <div className="flex-1 overflow-y-auto space-y-5 pr-2">
        {msgs.length === 0 && <p className="text-muted mt-10">Ask a question about your documents. Answers are written from your sources and cite them.</p>}
        {msgs.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
            <div className={`max-w-[85%] rounded-2xl px-5 py-4 whitespace-pre-wrap ${m.role === "user" ? "bg-black text-white" : "card"}`}>
              {m.content}
              {m.insufficient && <p className="mt-2 text-[13px] text-amber-700">Your documents may not fully cover this question.</p>}
              {m.sources && m.sources.length > 0 && (
                <div className="mt-4 border-t border-line pt-3 space-y-1.5">
                  <p className="eyebrow text-[12px]">Sources</p>
                  {m.sources.map((s, j) => <p key={j} className="text-[13px] text-muted"><span className="text-brand">[{j + 1}]</span> {s.title}{s.snippet ? `: “${s.snippet}…”` : ""}</p>)}
                </div>
              )}
            </div>
          </div>
        ))}
        {busy && <div className="card inline-block px-5 py-4 text-muted animate-pulse">Reading your sources…</div>}
        <div ref={end} />
      </div>
      {err && <p role="alert" className="mt-3 text-sm text-red-600">{err.m} {err.upgrade && <Link href="/app/billing" className="underline">Upgrade</Link>}</p>}
      <form onSubmit={send} className="mt-4 flex gap-2">
        <input name="q" required minLength={2} maxLength={2000} placeholder="Ask anything about your knowledge…" className="flex-1 rounded-xl border border-line bg-white px-4 py-3 outline-none focus:border-brand" />
        <button disabled={busy} className="btn btn-blue !px-5 disabled:opacity-60" aria-label="Send"><Send size={18} /></button>
      </form>
    </div>
  );
}
