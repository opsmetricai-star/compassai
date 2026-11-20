-- Apply any confirmed payment that arrived before the customer created an account.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
declare pend record; lim int;
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''));
  insert into public.workspaces (owner_id, name) values (new.id, 'My workspace');
  select * into pend from public.payments
   where lower(email) = lower(new.email) and status = 'pending_signup'
   order by created_at desc limit 1;
  if found then
    lim := case pend.plan when 'pro' then 3000 else 500 end;
    update public.profiles set plan = pend.plan, credits_limit = lim where id = new.id;
    update public.payments set status = 'confirmed' where email ilike new.email and status = 'pending_signup';
    insert into public.notifications (owner_id, title, body)
    values (new.id, initcap(pend.plan) || ' plan activated', 'Your payment was confirmed. You now have ' || lim || ' credits per month.');
  else
    insert into public.notifications (owner_id, title, body)
    values (new.id, 'Welcome to CompassAI', 'You have 20 free credits. Add a document and ask your first question.');
  end if;
  return new;
end $$;
