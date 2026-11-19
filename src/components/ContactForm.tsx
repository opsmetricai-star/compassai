"use client";
import { useState } from "react";

export function ContactForm({ kind }: { kind: "demo" | "contact" }) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    const f = Object.fromEntries(new FormData(e.currentTarget));
    const r = await fetch("/api/leads", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...f, kind }) });
    const j = await r.json().catch(() => ({}));
    if (r.ok) setState("done");
    else { setState("error"); setMsg(j.error ?? "Something went wrong."); }
  }
  if (state === "done") return <div className="card p-8 text-[18px]">Thanks. We’ve got your request and will reply within one business day.</div>;
  const cls = "w-full rounded-xl border border-line px-4 py-3 outline-none focus:border-brand";
  return (
    <form onSubmit={onSubmit} className="card p-8 space-y-4">
      <input name="name" required placeholder="Full name" className={cls} />
      <input name="email" type="email" required placeholder="Work email" className={cls} />
      <input name="company" placeholder="Company" className={cls} />
      <textarea name="message" rows={4} placeholder={kind === "demo" ? "What would you like to see?" : "How can we help?"} className={cls} />
      {state === "error" && <p className="text-red-600 text-sm">{msg}</p>}
      <button disabled={state === "loading"} className="btn btn-blue disabled:opacity-60">{state === "loading" ? "Sending…" : kind === "demo" ? "Request a demo" : "Send message"}</button>
    </form>
  );
}
