import { revalidatePath } from "next/cache";
import { supabaseServer } from "@/lib/supabase/server";

export default async function Settings({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const { saved } = await searchParams;
  const sb = await supabaseServer();
  const { data: u } = await sb.auth.getUser();
  const { data: p } = await sb.from("profiles").select("full_name").single();
  async function save(fd: FormData) {
    "use server";
    const name = String(fd.get("name") ?? "").trim().slice(0, 100);
    const s = await supabaseServer();
    await s.from("profiles").update({ full_name: name }).eq("id", (await s.auth.getUser()).data.user!.id);
    revalidatePath("/app", "layout");
  }
  return (
    <div className="max-w-[560px]">
      <p className="eyebrow">Settings</p>
      <h1 className="display mt-2 text-[36px] sm:text-[48px]">Your account.</h1>
      <form action={save} className="card mt-8 p-6 space-y-4">
        <label className="block text-[14px] text-muted">Email<input disabled value={u.user?.email ?? ""} className="mt-1 w-full rounded-xl border border-line bg-cream px-4 py-3" /></label>
        <label className="block text-[14px] text-muted">Full name<input name="name" defaultValue={p?.full_name ?? ""} maxLength={100} className="mt-1 w-full rounded-xl border border-line px-4 py-3 outline-none focus:border-brand" /></label>
        <button className="btn btn-blue">Save</button>{saved && <span className="ml-3 text-brand">Saved</span>}
      </form>
      <p className="mt-6 text-[14px] text-muted">To change your password, sign out and use “Forgot password” on the sign-in page.</p>
    </div>
  );
}
