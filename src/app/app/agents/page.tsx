import { supabaseServer } from "@/lib/supabase/server";
import { AgentsManager } from "@/components/app/AgentsManager";

export default async function Agents() {
  const sb = await supabaseServer();
  const [{ data: agents }, { data: ws }] = await Promise.all([
    sb.from("agents").select("id,name,description,instructions,output_format,workspace_id").order("created_at", { ascending: false }),
    sb.from("workspaces").select("id,name").order("created_at"),
  ]);
  return (<div><p className="eyebrow">Agents</p><h1 className="display mt-2 mb-8 text-[36px] sm:text-[48px]">Repeatable work, on demand.</h1><AgentsManager agents={agents ?? []} workspaces={ws ?? []} /></div>);
}
