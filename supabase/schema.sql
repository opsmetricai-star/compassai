-- CompassAI schema. Run once in the Supabase SQL editor (or via the CLI).
create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  plan text not null default 'free' check (plan in ('free','starter','pro')),
  credits_limit int not null default 20,
  credits_used int not null default 0,
  period_start timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 80),
  created_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  source_type text not null check (source_type in ('text','file','url')),
  source_url text,
  storage_path text,
  char_count int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.chunks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.documents(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  idx int not null,
  content text not null,
  tsv tsvector generated always as (to_tsvector('english', content)) stored
);
create index if not exists chunks_tsv_idx on public.chunks using gin (tsv);
create index if not exists chunks_ws_idx on public.chunks (workspace_id);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  workspace_id uuid references public.workspaces(id) on delete set null,
  title text not null default 'New conversation',
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('user','assistant')),
  content text not null,
  sources jsonb not null default '[]',
  model text,
  created_at timestamptz not null default now()
);

create table if not exists public.agents (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  workspace_id uuid references public.workspaces(id) on delete set null,
  name text not null,
  description text,
  instructions text not null,
  output_format text not null default 'brief' check (output_format in ('brief','bullets','table','email')),
  created_at timestamptz not null default now()
);

create table if not exists public.agent_runs (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid not null references public.agents(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  input text not null,
  output text,
  sources jsonb not null default '[]',
  status text not null default 'done',
  created_at timestamptz not null default now()
);

create table if not exists public.usage_events (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  kind text not null,
  credits int not null default 1,
  model text,
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  plan text not null check (plan in ('starter','pro')),
  reference text,
  status text not null default 'confirmed',
  confirmed_by text,
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  body text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  kind text not null,
  name text not null,
  email text not null,
  company text,
  message text,
  created_at timestamptz not null default now()
);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.workspaces enable row level security;
alter table public.documents enable row level security;
alter table public.chunks enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.agents enable row level security;
alter table public.agent_runs enable row level security;
alter table public.usage_events enable row level security;
alter table public.payments enable row level security;
alter table public.notifications enable row level security;
alter table public.leads enable row level security;

create policy "own profile read" on public.profiles for select using (id = auth.uid());
create policy "own profile update" on public.profiles for update using (id = auth.uid());
revoke update on public.profiles from authenticated, anon;
grant update (full_name) on public.profiles to authenticated;

do $$
declare t text;
begin
  foreach t in array array['workspaces','documents','chunks','conversations','messages','agents','agent_runs','notifications']
  loop
    execute format('create policy "own select" on public.%I for select using (owner_id = auth.uid())', t);
    execute format('create policy "own insert" on public.%I for insert with check (owner_id = auth.uid())', t);
    execute format('create policy "own update" on public.%I for update using (owner_id = auth.uid())', t);
    execute format('create policy "own delete" on public.%I for delete using (owner_id = auth.uid())', t);
  end loop;
end $$;

create policy "own usage read" on public.usage_events for select using (owner_id = auth.uid());
-- payments and leads: no policies => only the service role can access them.

-- New user -> profile
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''));
  insert into public.workspaces (owner_id, name) values (new.id, 'My workspace');
  insert into public.notifications (owner_id, title, body)
  values (new.id, 'Welcome to CompassAI', 'You have 20 free credits. Add a document and ask your first question.');
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- Atomic credit consumption (monthly reset handled here)
create or replace function public.consume_credit(p_kind text, p_model text default null) returns boolean
language plpgsql security definer set search_path = public as $$
declare ok boolean;
begin
  update public.profiles
     set credits_used = case when period_start < now() - interval '30 days' then 1 else credits_used + 1 end,
         period_start = case when period_start < now() - interval '30 days' then now() else period_start end
   where id = auth.uid()
     and (period_start < now() - interval '30 days' or credits_used < credits_limit)
  returning true into ok;
  if ok then
    insert into public.usage_events (owner_id, kind, model) values (auth.uid(), p_kind, p_model);
  end if;
  return coalesce(ok, false);
end $$;

create or replace function public.refund_credit() returns void
language plpgsql security definer set search_path = public as $
begin
  update public.profiles set credits_used = greatest(credits_used - 1, 0) where id = auth.uid();
  delete from public.usage_events where id = (
    select id from public.usage_events where owner_id = auth.uid() order by created_at desc limit 1);
end $;

-- Passage retrieval; runs as the caller so RLS applies.
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

-- Storage bucket for uploaded files
insert into storage.buckets (id, name, public) values ('documents', 'documents', false) on conflict do nothing;
create policy "own files read" on storage.objects for select using (bucket_id = 'documents' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "own files write" on storage.objects for insert with check (bucket_id = 'documents' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "own files delete" on storage.objects for delete using (bucket_id = 'documents' and (storage.foldername(name))[1] = auth.uid()::text);

-- Plan limits enforced in the database (cannot be bypassed from the client)
create or replace function public.enforce_plan_limits() returns trigger
language plpgsql security definer set search_path = public as $$
declare p text; n int; lim int;
begin
  select plan into p from public.profiles where id = new.owner_id;
  if tg_table_name = 'workspaces' then
    select count(*) into n from public.workspaces where owner_id = new.owner_id;
    lim := case p when 'pro' then 100000 when 'starter' then 3 else 1 end;
  else
    select count(*) into n from public.agents where owner_id = new.owner_id;
    lim := case p when 'pro' then 100000 when 'starter' then 5 else 1 end;
  end if;
  if n >= lim then raise exception 'Plan limit reached. Upgrade to add more.' using errcode = 'P0001'; end if;
  return new;
end $$;
drop trigger if exists limit_workspaces on public.workspaces;
create trigger limit_workspaces before insert on public.workspaces for each row execute function public.enforce_plan_limits();
drop trigger if exists limit_agents on public.agents;
create trigger limit_agents before insert on public.agents for each row execute function public.enforce_plan_limits();

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
