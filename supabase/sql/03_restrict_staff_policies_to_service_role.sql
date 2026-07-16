-- This Supabase project is shared across multiple unrelated apps (see
-- 00_reset_and_create.sql). Policies scoped to the generic `authenticated`
-- role were meant to mean "Focus Labs staff", but `authenticated` actually
-- matches any signed-in user from *any* app on this project — this app has
-- no login system of its own. That let any such user read every lead's PII
-- (focuslab_leads) and write blog posts / case studies for Focus Labs.
--
-- Content is actually managed via the Supabase dashboard / Management API,
-- which uses the service_role key and bypasses RLS entirely — so these
-- policies granted access nobody legitimate relied on. Drop them.

drop policy if exists "Authenticated staff can read leads" on public.focuslab_leads;
drop policy if exists "Authenticated staff manage posts" on public.focuslab_blog_posts;
drop policy if exists "Authenticated staff manage case studies" on public.focuslab_case_studies;
