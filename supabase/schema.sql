create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'customer' check (role in ('customer','admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_code text unique not null,
  service_slug text not null,
  service_title text not null,
  template_slug text,
  template_name text,
  price numeric(10,2) not null default 0,
  customer_name text not null,
  whatsapp text not null,
  email text not null,
  city text,
  address text,
  details jsonb not null default '{}'::jsonb,
  status text not null default 'New' check (status in ('New','Pending','In Progress','Completed','Cancelled')),
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_files (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  file_name text not null,
  storage_path text not null,
  mime_type text not null,
  file_size bigint not null,
  created_at timestamptz not null default now(),
  unique(order_id, storage_path)
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  rating int not null check (rating between 1 and 5),
  review text not null,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  whatsapp text,
  email text not null,
  service text,
  message text not null,
  created_at timestamptz not null default now(),
  read boolean not null default false
);

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  organization text not null,
  category text not null,
  location text,
  qualification text,
  experience text,
  age_limit text,
  salary text,
  last_date date not null,
  posted_date date not null default current_date,
  description text not null,
  requirements text[] not null default '{}',
  required_documents text[] not null default '{}',
  official_apply_url text not null,
  image_url text,
  status text not null default 'Active' check (status in ('Active','Expired','Draft')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ads (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text,
  description text,
  button_text text,
  destination_url text,
  start_date timestamptz,
  end_date timestamptz,
  status text not null default 'Inactive' check (status in ('Active','Inactive')),
  position text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists orders_status_idx on public.orders(status);
create index if not exists orders_created_idx on public.orders(created_at desc);
create index if not exists jobs_last_date_idx on public.jobs(last_date);
create index if not exists jobs_category_idx on public.jobs(category);
create index if not exists ads_position_idx on public.ads(position);

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin insert into public.profiles(id,email) values(new.id,new.email) on conflict (id) do nothing; return new; end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create or replace function public.set_updated_at() returns trigger language plpgsql as $$ begin new.updated_at=now(); return new; end; $$;
drop trigger if exists orders_updated_at on public.orders; create trigger orders_updated_at before update on public.orders for each row execute procedure public.set_updated_at();
drop trigger if exists jobs_updated_at on public.jobs; create trigger jobs_updated_at before update on public.jobs for each row execute procedure public.set_updated_at();
drop trigger if exists ads_updated_at on public.ads; create trigger ads_updated_at before update on public.ads for each row execute procedure public.set_updated_at();
drop trigger if exists settings_updated_at on public.settings; create trigger settings_updated_at before update on public.settings for each row execute procedure public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.order_files enable row level security;
alter table public.reviews enable row level security;
alter table public.contact_messages enable row level security;
alter table public.jobs enable row level security;
alter table public.ads enable row level security;
alter table public.settings enable row level security;

drop policy if exists "public read approved reviews" on public.reviews;
create policy "public read approved reviews" on public.reviews for select to anon, authenticated using (approved=true);
drop policy if exists "public insert review" on public.reviews;
create policy "public insert review" on public.reviews for insert to anon, authenticated with check (approved=false);
drop policy if exists "public read active jobs" on public.jobs;
create policy "public read active jobs" on public.jobs for select to anon, authenticated using (status='Active' and last_date >= current_date);
drop policy if exists "public read active ads" on public.ads;
create policy "public read active ads" on public.ads for select to anon, authenticated using (status='Active' and (start_date is null or start_date <= now()) and (end_date is null or end_date >= now()));

drop policy if exists "admin profiles" on public.profiles;
create policy "admin profiles" on public.profiles for all to authenticated using (id=auth.uid() and role='admin') with check (id=auth.uid() and role='admin');
drop policy if exists "admin orders" on public.orders;
create policy "admin orders" on public.orders for all to authenticated using (exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin')) with check (exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin'));
drop policy if exists "admin order files" on public.order_files;
create policy "admin order files" on public.order_files for all to authenticated using (exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin')) with check (exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin'));
drop policy if exists "admin reviews" on public.reviews;
create policy "admin reviews" on public.reviews for all to authenticated using (exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin')) with check (exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin'));
drop policy if exists "admin messages" on public.contact_messages;
create policy "admin messages" on public.contact_messages for all to authenticated using (exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin')) with check (exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin'));
drop policy if exists "admin jobs" on public.jobs;
create policy "admin jobs" on public.jobs for all to authenticated using (exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin')) with check (exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin'));
drop policy if exists "admin ads" on public.ads;
create policy "admin ads" on public.ads for all to authenticated using (exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin')) with check (exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin'));
drop policy if exists "admin settings" on public.settings;
create policy "admin settings" on public.settings for all to authenticated using (exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin')) with check (exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin'));

insert into storage.buckets(id,name,public) values('documents','documents',false) on conflict (id) do nothing;
insert into storage.buckets(id,name,public) values('ad-images','ad-images',true) on conflict (id) do nothing;

create sequence if not exists public.order_code_seq start 1;
create or replace function public.next_order_code() returns table(code text) language plpgsql security definer set search_path=public as $$
begin return query select 'SDS-'||extract(year from now())::int||'-'||lpad(nextval('public.order_code_seq')::text,4,'0'); end; $$;
