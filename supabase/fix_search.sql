-- Retrieval fix: match ANY meaningful term (OR), ranked by relevance, instead of requiring all terms.
create or replace function public.search_chunks(p_workspace uuid, p_query text, p_limit int default 6)
returns table (chunk_id uuid, document_id uuid, title text, content text, rank real)
language sql stable as $$
  with q as (
    select nullif(replace(plainto_tsquery('english', p_query)::text, ' & ', ' | '), '')::tsquery as tq
  )
  select c.id, c.document_id, d.title, c.content, ts_rank(c.tsv, q.tq) as rank
    from public.chunks c
    join public.documents d on d.id = c.document_id
    cross join q
   where q.tq is not null
     and (p_workspace is null or c.workspace_id = p_workspace)
     and c.tsv @@ q.tq
   order by rank desc
   limit p_limit;
$$;
grant execute on function public.search_chunks(uuid, text, int) to authenticated, service_role;

-- Refund must also remove the usage record so charts and counters stay consistent.
create or replace function public.refund_credit() returns void
language plpgsql security definer set search_path = public as $$
begin
  update public.profiles set credits_used = greatest(credits_used - 1, 0) where id = auth.uid();
  delete from public.usage_events where id = (
    select id from public.usage_events where owner_id = auth.uid() order by created_at desc limit 1);
end $$;
grant execute on function public.refund_credit() to authenticated;

-- Repair the test account's drifted usage log (safe to run; resyncs events to credits_used).
-- (No-op for accounts that are already consistent.)
