-- Indexal (getindexal.com) publishes articles into this blog over a webhook
-- (see src/app/api/indexal/webhook/route.ts). Two things are needed for that:
--
-- 1. A stable per-article key. Indexal's docs are explicit that the slug is
--    NOT a safe identity — titles and slugs change between edits and between
--    language versions — so the article's `id` is stored and made unique, and
--    the webhook upserts on it. Multiple NULLs are allowed by a Postgres
--    unique constraint, so the pre-existing hand-written posts are unaffected.
--
-- 2. A cover image that is allowed to be absent. `heroImageUrl` can arrive as
--    null (cover disabled, or generation failed — Indexal treats it as
--    best-effort), and the receiver is expected to publish the article anyway.
--
-- Applied directly against the project via the Management API on 2026-08-11;
-- kept here so 00_reset_and_create.sql stays reproducible for a fresh reset.

alter table public.focuslab_blog_posts
  add column if not exists indexal_id text,
  add column if not exists language_code text,
  add column if not exists translation_group_id text,
  add column if not exists author_bio text,
  add column if not exists faq_schema jsonb;

do $$
begin
  alter table public.focuslab_blog_posts
    add constraint focuslab_blog_posts_indexal_id_key unique (indexal_id);
exception
  when duplicate_table then null;
  when duplicate_object then null;
end $$;

alter table public.focuslab_blog_posts
  alter column cover_image_url drop not null;

-- Delivery log. X-Indexal-Delivery is a UUID meant for deduplication: Indexal
-- retries on non-2xx, and a retry after a successful write must not be
-- reprocessed. Doubles as an audit trail when debugging "did the article
-- actually arrive?". Service-role only — RLS on with no policies, matching the
-- reasoning in 03_restrict_staff_policies_to_service_role.sql.

create table if not exists public.focuslab_indexal_deliveries (
  delivery_id uuid primary key,
  article_id text not null,
  language_code text,
  post_slug text not null,
  post_url text not null,
  received_at timestamptz not null default now()
);

create index if not exists focuslab_indexal_deliveries_received_at_idx
  on public.focuslab_indexal_deliveries (received_at desc);

alter table public.focuslab_indexal_deliveries enable row level security;
