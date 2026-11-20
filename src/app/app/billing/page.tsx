import { supabaseServer } from "@/lib/supabase/server";
import { PLANS } from "@/lib/site";

export default async function Billing() {
  const sb = await supabaseServer();
  const { data: u } = await sb.auth.getUser();
  const { data: p } = await sb.from("profiles").select("plan,credits_used,credits_limit,period_start").single();
  const pct = p?.credits_limit ? Math.min(100, Math.round((p.credits_used / p.credits_limit) * 100)) : 0;
  return (
    <div className="max-w-[1000px]">
      <p className="eyebrow">Billing</p>
      <h1 className="display mt-2 text-[36px] sm:text-[48px]">Plan and usage.</h1>
      <div className="card mt-8 p-6">
        <div className="flex justify-between"><p className="text-[20px] text-ink capitalize">{p?.plan ?? "free"} plan</p><p className="text-muted">{p?.credits_used ?? 0} / {p?.credits_limit ?? 0} credits</p></div>
        <div className="mt-3 h-3 rounded-full bg-line overflow-hidden"><div className="h-full bg-brand" style={{ width: `${pct}%` }} /></div>
        <p className="mt-2 text-[13px] text-muted">Current period started {p ? new Date(p.period_start).toLocaleDateString() : "Not available"}. Credits reset every 30 days.</p>
      </div>
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {PLANS.map((pl) => {
          const current = p?.plan === pl.id;
          return (
            <div key={pl.id} className={`card p-6 ${current ? "border-brand" : ""}`}>
              <p className="text-[20px] text-ink">{pl.name} <span className="text-muted text-[16px]">${pl.price}/mo</span></p>
              <p className="mt-1 text-muted">{pl.credits.toLocaleString()} credits per month</p>
              {current ? <p className="mt-5 text-brand">Your current plan</p> : (
                <a href={pl.href} target="_blank" rel="noopener noreferrer" className="btn btn-blue mt-5">Upgrade to {pl.name}</a>
              )}
            </div>
          );
        })}
      </div>
      <div className="card mt-6 p-6 bg-cream">
        <p className="text-ink">How activation works</p>
        <p className="mt-2 text-[15px] text-muted">Pay at checkout using <b>{u.user?.email}</b>. A payment redirect alone does not unlock a plan: we confirm each payment, then activate your account, usually within one business day. You will get a notification when it is done.</p>
      </div>
    </div>
  );
}
