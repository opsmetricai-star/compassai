-- API role grants (newer Supabase projects do not grant these automatically).
-- RLS above still restricts what 'authenticated' can touch.
grant usage on schema public to anon, authenticated, service_role;
grant all on all tables in schema public to service_role;
grant select, insert, update, delete on all tables in schema public to authenticated;
revoke all on public.payments, public.leads from authenticated, anon;
revoke update on public.profiles from authenticated;
grant update (full_name) on public.profiles to authenticated;
grant select on public.usage_events to authenticated;
revoke insert, update, delete on public.usage_events from authenticated;
grant execute on all functions in schema public to authenticated, service_role;
revoke execute on function public.handle_new_user() from authenticated, anon;
