-- FULL RESET of public schema (confirmed by user 2x, including dipy_* and product_* tables)
drop schema if exists public cascade;
create schema public;

grant usage on schema public to postgres, anon, authenticated, service_role;
grant all on schema public to postgres, service_role;

alter default privileges in schema public grant all on tables to postgres, service_role;
alter default privileges in schema public grant all on functions to postgres, service_role;
alter default privileges in schema public grant all on sequences to postgres, service_role;

alter default privileges for role postgres in schema public grant select, insert, update, delete on tables to anon, authenticated;
alter default privileges for role postgres in schema public grant execute on functions to anon, authenticated;
alter default privileges for role postgres in schema public grant usage, select on sequences to anon, authenticated;

-- Focus Labs Media Group tables (prefixed: this Supabase project is shared
-- across multiple unrelated sites/apps, not exclusive to Focus Labs)

create table public.focuslab_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  project_type text,
  project_details text,
  created_at timestamptz not null default now()
);

alter table public.focuslab_leads enable row level security;

create policy "Anyone can submit a lead"
  on public.focuslab_leads
  for insert
  to anon, authenticated
  with check (true);

create policy "Authenticated staff can read leads"
  on public.focuslab_leads
  for select
  to authenticated
  using (true);

create table public.focuslab_blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  content text not null,
  excerpt text,
  cover_image_url text not null,
  published_at timestamptz
);

create index focuslab_blog_posts_published_at_idx
  on public.focuslab_blog_posts (published_at desc);

alter table public.focuslab_blog_posts enable row level security;

create policy "Published posts are publicly readable"
  on public.focuslab_blog_posts
  for select
  to anon, authenticated
  using (published_at is not null and published_at <= now());

create policy "Authenticated staff manage posts"
  on public.focuslab_blog_posts
  for all
  to authenticated
  using (true)
  with check (true);

create table public.focuslab_case_studies (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  client_context text not null,
  conflict text not null,
  transformation text not null,
  resolution text not null,
  video_url text,
  cover_image_url text not null,
  created_at timestamptz not null default now()
);

create index focuslab_case_studies_created_at_idx
  on public.focuslab_case_studies (created_at desc);

alter table public.focuslab_case_studies enable row level security;

create policy "Case studies are publicly readable"
  on public.focuslab_case_studies
  for select
  to anon, authenticated
  using (true);

create policy "Authenticated staff manage case studies"
  on public.focuslab_case_studies
  for all
  to authenticated
  using (true)
  with check (true);

-- Migration applied after initial creation: contact form gained "company"
-- and "project_type" fields.
-- alter table public.focuslab_leads add column if not exists company text, add column if not exists project_type text;
