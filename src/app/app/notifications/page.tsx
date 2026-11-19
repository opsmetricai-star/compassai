import { revalidatePath } from "next/cache";
import { supabaseServer } from "@/lib/supabase/server";

export default async function Notifications() {
  const sb = await supabaseServer();
  const { data } = await sb.from("notifications").select("id,title,body,read,created_at").order("created_at", { ascending: false }).limit(50);
  async function markAll() {
    "use server";
    const s = await supabaseServer();
    await s.from("notifications").update({ read: true }).eq("read", false);
    revalidatePath("/app", "layout");
  }
  return (
    <div className="max-w-[760px]">
      <div className="flex items-end justify-between"><div><p className="eyebrow">Notifications</p><h1 className="display mt-2 text-[36px] sm:text-[48px]">Updates.</h1></div>
        <form action={markAll}><button className="text-brand text-[14px]">Mark all read</button></form></div>
      <ul className="mt-8 space-y-3">
        {(data ?? []).length === 0 && <li className="text-muted">Nothing yet.</li>}
        {(data ?? []).map((n) => (<li key={n.id} className={`card p-4 ${n.read ? "" : "border-brand"}`}><p className="text-ink">{n.title}</p>{n.body && <p className="text-[14px] text-muted">{n.body}</p>}<p className="mt-1 text-[12px] text-muted">{new Date(n.created_at).toLocaleString()}</p></li>))}
      </ul>
    </div>
  );
}
