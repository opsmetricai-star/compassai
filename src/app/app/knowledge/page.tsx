import { supabaseServer } from "@/lib/supabase/server";
import { KnowledgeManager } from "@/components/app/KnowledgeManager";

export default async function Knowledge() {
  const sb = await supabaseServer();
  const [{ data: ws }, { data: docs }, { data: p }] = await Promise.all([
    sb.from("workspaces").select("id,name").order("created_at"),
    sb.from("documents").select("id,title,source_type,source_url,char_count,workspace_id,created_at").order("created_at", { ascending: false }),
    sb.from("profiles").select("plan").single(),
  ]);
  return (<div><p className="eyebrow">Knowledge</p><h1 className="display mt-2 mb-8 text-[36px] sm:text-[48px]">Your sources.</h1>
    <KnowledgeManager workspaces={ws ?? []} docs={docs ?? []} plan={p?.plan ?? "free"} /></div>);
}
