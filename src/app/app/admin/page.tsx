import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isAdminEmail, supabaseAdmin, supabaseServer } from "@/lib/supabase/server";
import { activatePlan } from "@/lib/billing";

export default async function Admin() {
  const { data } = await (await supabaseServer()).auth.getUser();
  if (!isAdminEmail(data.user?.email)) notFound();
  const admin = supabaseAdmin();
  const [{ data: payments }, { data: leads }] = await Promise.all([
    admin.from("payments").select("*").order("created_at", { ascending: false }).limit(25),
    admin.from("leads").select("*").order("created_at", { ascending: false }).limit(25),
  ]);
  async function confirm(fd: FormData) {
    "use server";
    const me = (await (await supabaseServer()).auth.getUser()).data.user;
    if (!isAdminEmail(me?.email)) throw new Error("Forbidden");
    const email = String(fd.get("email") ?? "").trim();
    const plan = fd.get("plan") === "pro" ? "pro" : "starter";
    if (!/^\S+@\S+\.\S+$/.test(email)) return;
    await activatePlan(email, plan, String(fd.get("reference") ?? "").slice(0, 120) || null, me!.email!);
    revalidatePath("/app/admin");
  }
  const cls = "rounded-xl border border-line px-3 py-2 bg-white";
  return (
    <div className="max-w-[1000px]">
      <p className="eyebrow">Admin</p><h1 className="display mt-2 text-[36px] sm:text-[48px]">Payments and leads.</h1>
      <form action={confirm} className="card mt-8 p-5 flex flex-wrap gap-3 items-end">
        <label className="text-[13px] text-muted">Customer email<input name="email" type="email" required className={`${cls} block mt-1`} /></label>
        <label className="text-[13px] text-muted">Plan<select name="plan" className={`${cls} block mt-1`}><option value="starter">Starter $47</option><option value="pro">Pro $97</option></select></label>
        <label className="text-[13px] text-muted">Selar reference<input name="reference" className={`${cls} block mt-1`} /></label>
        <button className="btn btn-blue">Confirm payment and activate</button>
      </form>
      <h2 className="mt-10 text-[20px] text-ink">Payments</h2>
      <ul className="mt-3 space-y-2">{(payments ?? []).map((p) => <li key={p.id} className="card p-3 text-[14px]">{p.email} · {p.plan} · {p.status} · {p.reference ?? "no ref"} · {new Date(p.created_at).toLocaleDateString()}</li>)}</ul>
      <h2 className="mt-10 text-[20px] text-ink">Leads</h2>
      <ul className="mt-3 space-y-2">{(leads ?? []).map((l) => <li key={l.id} className="card p-3 text-[14px]"><b>{l.name}</b> ({l.email}) · {l.kind}{l.company ? ` · ${l.company}` : ""}<br /><span className="text-muted">{l.message}</span></li>)}</ul>
    </div>
  );
}
