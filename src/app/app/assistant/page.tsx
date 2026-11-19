import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";
import { Chat } from "@/components/app/Chat";

export default async function Assistant({ searchParams }: { searchParams: Promise<{ c?: string }> }) {
  const { c } = await searchParams;
  const sb = await supabaseServer();
  const [{ data: ws }, { data: prof }, { data: convs }] = await Promise.all([
    sb.from("workspaces").select("id,name").order("created_at"),
    sb.from("profiles").select("plan").single(),
    sb.from("conversations").select("id,title").order("created_at", { ascending: false }).limit(8),
  ]);
  let initial: { role: "user" | "assistant"; content: string; sources?: never }[] = [];
  let activeId: string | null = null;
  if (c && /^[0-9a-f-]{36}$/.test(c)) {
    const { data: m } = await sb.from("messages").select("role,content,sources").eq("conversation_id", c).order("created_at");
    if (m?.length) { initial = m as never; activeId = c; }
  }
  return (
    <div>
      <p className="eyebrow">Assistant</p>
      <div className="mt-3 flex flex-wrap gap-2 mb-4">
        {(convs ?? []).map((x) => <Link key={x.id} href={`/app/assistant?c=${x.id}`} className={`rounded-full border px-3 py-1 text-[13px] max-w-[220px] truncate ${x.id === activeId ? "border-brand text-brand" : "border-line text-muted"}`}>{x.title}</Link>)}
      </div>
      <Chat key={activeId ?? "new"} workspaces={ws ?? []} initial={initial} conversationId={activeId} isPro={prof?.plan === "pro"} />
    </div>
  );
}
