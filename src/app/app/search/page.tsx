import { supabaseServer } from "@/lib/supabase/server";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = (q ?? "").trim().slice(0, 200);
  let results: { chunk_id: string; title: string; content: string }[] = [];
  let failed = false;
  if (query.length >= 2) {
    const sb = await supabaseServer();
    const { data, error } = await sb.rpc("search_chunks", { p_workspace: null, p_query: query, p_limit: 20 });
    if (error) failed = true; else results = data ?? [];
  }
  return (
    <div className="max-w-[860px]">
      <p className="eyebrow">Search</p>
      <h1 className="display mt-2 text-[36px] sm:text-[48px]">Find it fast.</h1>
      <p className="mt-2 text-muted">Searching is free and does not use credits.</p>
      <form className="mt-6 flex gap-2"><input name="q" defaultValue={query} placeholder="Search all your documents…" className="flex-1 rounded-xl border border-line bg-white px-4 py-3 outline-none focus:border-brand" /><button className="btn btn-black">Search</button></form>
      {failed && <p className="mt-6 text-red-600">Search failed. Please try again.</p>}
      {query && !failed && results.length === 0 && <p className="mt-8 text-muted">No matches for “{query}”.</p>}
      <ul className="mt-8 space-y-4">
        {results.map((r) => (<li key={r.chunk_id} className="card p-5"><p className="text-ink">{r.title}</p><p className="mt-2 text-[15px] text-muted whitespace-pre-wrap">{r.content.slice(0, 380)}{r.content.length > 380 ? "…" : ""}</p></li>))}
      </ul>
    </div>
  );
}
