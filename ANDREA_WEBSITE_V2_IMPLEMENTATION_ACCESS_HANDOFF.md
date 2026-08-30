# ANDREA · WEBSITE V2 · IMPLEMENTATION / ACCESS HANDOFF

Status: Maximum executable completion reached locally
Base repository: `asuaruiz/focuslab`
Base commit: `2bd8d79d5843fbc9445225edccd2c64df94ee455`
Delivery branch: `codex/website-v2` (local only)
Delivery method: signed-off Git commit plus `git format-patch` file

## 1. What is finished

- Website V2 public architecture implemented in the existing Next.js App Router codebase.
- ES and EN content implemented for Home, Work, Services, The Lab, About, Contact and Academy.
- Work detail route prepared with an approval gate. No unapproved client relationship is published.
- Navigation, footer and mobile menu rebuilt for the V2 hierarchy.
- Contact form rebuilt with low-friction fields, server validation, honeypot, Supabase persistence and bilingual Resend email copy.
- SEO metadata, canonical URLs, language alternates, sitemap, robots, Open Graph image and permanent redirects implemented.
- Reduced-motion support, visible focus states, skip link, semantic structure and responsive CSS implemented.
- Lightweight analytics event hooks prepared. They emit `focuslabs:analytics` browser events and intentionally do not invent a provider.
- Production build and local route smoke test pass.

## 2. Primary files changed

- `next.config.js`
- `src/middleware.ts`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/app/page.tsx`
- `src/app/sitemap.ts`
- `src/app/opengraph-image.tsx`
- `src/app/not-found.tsx`
- `src/app/about/page.tsx`
- `src/app/academy/page.tsx`
- `src/app/contact/*`
- `src/app/services/page.tsx`
- `src/app/the-lab/page.tsx`
- `src/app/work/*`
- `src/components/layout/*`
- `src/components/analytics/*`
- `src/components/v2/Primitives.tsx`
- `src/lib/analytics.ts`
- `src/lib/contact-emails.ts`
- `src/lib/content.ts`
- `src/lib/i18n.ts`
- `src/lib/metadata.ts`
- `src/lib/work.ts`

## 3. Apply the delivery

Preferred safe path:

1. Create a backup/rollback tag from the current production commit.
2. Create a temporary integration branch from the exact base commit or current `main` after verifying no conflicting changes.
3. Apply the supplied patch with `git am Focus_Labs_Website_V2_Implementation.patch`.
4. If `main` moved after the base commit, resolve conflicts intentionally; do not discard V2 copy, routes or publication gates.
5. Run `npm ci` and `npm run build`.
6. Deploy a Vercel Preview first. Do not deploy directly to production.

## 4. Environment and integrations to verify

Required by existing code:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL=https://www.focuslabsmg.com`
- `INDEXAL_WEBHOOK_SECRET` if the existing Indexal webhook remains active
- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`
- `CONTACT_MANAGER_EMAIL`

Confirm that the production Supabase project contains the existing `focuslab_leads` table expected by `src/app/contact/actions.ts`. Do not run `supabase/sql/00_reset_and_create.sql` against production. Verify that the restrictive policies/migration already intended by the repository are the ones actually applied.

## 5. Security gate before production

The current dependency tree reports three high-severity advisories involving `next`, `postcss` and transitive `nanoid`. `npm audit` proposes a semver-major Next.js upgrade rather than a safe automatic patch. Do not run `npm audit fix --force` blindly.

Before production:

1. Assess the supported upgrade path for Next.js and related packages in a separate dependency branch.
2. Build and regression-test the upgrade.
3. Confirm Vercel runtime compatibility.
4. Merge only after the Preview passes.

The current tracked `.env.local.example` contains placeholders, not production keys. A scan of the visible shallow checkout found no credential-shaped production secret committed. Because the local clone exposes only the current grafted history, perform GitHub secret scanning/history review before launch.

## 6. Preview QA required

Test at minimum:

- Home, Work, Services, The Lab, About, Contact and Academy in ES and EN.
- Header/mobile menu at iPhone widths and desktop widths.
- No horizontal overflow; readable text; visible focus states; keyboard navigation.
- Language switch retains the equivalent route.
- Old URLs redirect to the intended V2 URLs.
- Open Graph image, canonical, hreflang, sitemap and robots resolve on the Preview.
- Blog/Notes and Indexal webhook behavior remain intact.
- Image/font loading and Core Web Vitals are acceptable.
- `prefers-reduced-motion` removes nonessential motion.

## 7. Contact conversion test required

After Preview environment variables are connected:

1. Submit one real ES inquiry and one real EN inquiry.
2. Confirm the new row in `focuslab_leads`.
3. Confirm the visitor confirmation email.
4. Confirm the manager notification email and reply-to address.
5. Confirm success state.
6. Force/observe validation and integration failure states safely.
7. Return screenshots or screen recording plus the Supabase row ID and email delivery evidence. Do not include secrets.

Project 03 cannot be marked CLOSED until at least one complete real production inquiry succeeds after launch.

## 8. Media publication gate

Batch 01 has been curated, but no item was inserted into `src/lib/work.ts`. This is intentional. Publish media only after Omar/Focus Labs confirms exact attribution and permission. Preserve the distinction between:

- Work by Focus Labs.
- Professional or collaborative experience behind Focus Labs.

Do not convert Nika Media work into Focus Labs client work.

## 9. What must not be reinterpreted

- Do not change the frozen sitemap or primary CTAs without a real technical conflict.
- Do not add prices or fabricate services, metrics, testimonials, clients or results.
- Do not publish unapproved Work items merely to fill the layout.
- Do not replace the black/charcoal/white/Focus Amber system with a generic cyberpunk treatment.
- Do not restore the floating WhatsApp control unless it is deliberately redesigned and approved.
- Do not turn Academy into a completed platform; it remains an honest future extension.

## 10. Deployment and rollback

Deployment:

1. Vercel Preview from the integration branch.
2. Complete QA and conversion checks above.
3. Merge through the repository's normal review flow.
4. Promote the verified deployment to production.
5. Re-run smoke tests and the real inquiry on `focuslabsmg.com`.

Rollback:

- Keep the pre-V2 production deployment and Git tag available.
- If navigation, contact, SEO or integrations fail after promotion, immediately promote the last known-good Vercel deployment and revert the V2 merge commit.
- Preserve the failed deployment logs and evidence for correction; do not patch production blindly.

## 11. Evidence to return

- Preview URL and final production URL.
- Commit SHA deployed.
- `npm run build` result.
- Dependency/security decision and resulting audit summary.
- Desktop and mobile QA evidence.
- Redirect/metadata/sitemap verification.
- Supabase row ID for the real test inquiry.
- Resend delivery evidence for visitor and manager messages.
- Analytics provider/configuration decision and proof of received events, if connected.
