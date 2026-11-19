import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";
import { UsageChart } from "@/components/app/UsageChart";

export default async function Dashboard() {
  const sb = await supabaseServer();
  const since = new Date(Date.now() - 13 * 864e5).toISOString();
  const [{ data: p }, { count: docs }, { count: convs }, { count: agents }, { data: ev }] = await Promise.all([
    sb.from("profiles").select("full_name,plan,credits_used,credits_limit").single(),
    sb.from("documents").select("id", { count: "exact", head: true }),
    sb.from("conversations").select("id", { count: "exact", head: true }),
    sb.from("agents").select("id", { count: "exact", head: true }),
    sb.from("usage_events").select("created_at,kind").gte("created_at", since),
  ]);
  const days = Array.from({ length: 14 }, (_, i) => { const d = new Date(Date.now() - (13 - i) * 864e5); return d.toISOString().slice(0, 10); });
  const series = days.map((d) => ({ day: d.slice(5), credits: (ev ?? []).filter((e) => e.created_at.slice(0, 10) === d).length }));
  const stat = (n: number | null, l: string, h: string) => (<Link href={h} className="card p-6 hover:border-brand"><div className="text-[38px] tracking-tighter text-ink">{n ?? 0}</div><div className="text-muted">{l}</div></Link>);
  return (
    <div className="max-w-[1100px]">
      <p className="eyebrow">Dashboard</p>
      <h1 className="display mt-2 text-[36px] sm:text-[48px]">Hello{p?.full_name ? `, ${p.full_name.split(" ")[0]}` : ""}.</h1>
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stat(docs, "Documents", "/app/knowledge")}
        {stat(convs, "Conversations", "/app/assistant")}
        {stat(agents, "Agents", "/app/agents")}
        <div className="card p-6"><div className="text-[38px] tracking-tighter text-ink">{(p?.credits_limit ?? 0) - (p?.credits_used ?? 0)}</div><div className="text-muted">Credits left</div></div>
      </div>
      <div className="card mt-6 p-6">
        <div className="flex justify-between"><h2 className="text-[20px] text-ink">Credit usage, last 14 days</h2><Link href="/app/billing" className="text-brand">Manage plan</Link></div>
        <UsageChart data={series} />
      </div>
      {(docs ?? 0) === 0 && (
        <div className="card mt-6 p-6 bg-brand-soft/30"><p className="text-ink text-[18px]">Get started</p><p className="text-muted mt-1">Add your first document in Knowledge, then ask a question in the Assistant.</p><Link href="/app/knowledge" className="btn btn-blue mt-4">Add a document</Link></div>
      )}
    </div>
  );
}
