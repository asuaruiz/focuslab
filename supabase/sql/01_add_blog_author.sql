-- Adds the author byline to blog posts. Applied directly against the
-- project via the Management API on 2026-07-10; kept here so
-- 00_reset_and_create.sql stays reproducible for a fresh reset.
alter table public.focuslab_blog_posts
  add column if not exists author text not null default 'Omar Rincones';
