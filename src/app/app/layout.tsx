import Link from "next/link";
import { redirect } from "next/navigation";
import { supabaseServer, isAdminEmail } from "@/lib/supabase/server";
import { Logo } from "@/components/Logo";
import { SideNav } from "@/components/app/SideNav";

export const metadata = { title: "CompassAI App" };

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await supabaseServer();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");
  const { data: p } = await supabase.from("profiles").select("plan,credits_used,credits_limit,full_name").single();
  const { count } = await supabase.from("notifications").select("id", { count: "exact", head: true }).eq("read", false);
  const used = p?.credits_used ?? 0, limit = p?.credits_limit ?? 0;
  const pct = limit ? Math.min(100, Math.round((used / limit) * 100)) : 0;
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr] bg-cream/60">
      <aside className="lg:sticky lg:top-0 lg:h-screen border-b lg:border-r border-line bg-white p-5 flex lg:flex-col gap-4 overflow-x-auto">
        <Link href="/app" className="shrink-0"><Logo className="scale-90 origin-left" /></Link>
        <SideNav admin={isAdminEmail(data.user.email)} unread={count ?? 0} />
        <div className="hidden lg:block mt-auto card p-4">
          <div className="flex justify-between text-[13px]"><span className="capitalize text-ink">{p?.plan ?? "free"} plan</span><span className="text-muted">{used}/{limit}</span></div>
          <div className="mt-2 h-2 rounded-full bg-line overflow-hidden"><div className="h-full bg-brand" style={{ width: `${pct}%` }} /></div>
          <p className="mt-2 text-[12px] text-muted truncate">{data.user.email}</p>
        </div>
      </aside>
      <div className="p-5 sm:p-10 min-w-0">{children}</div>
    </div>
  );
}
