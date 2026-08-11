import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyIndexalRequest } from "@/lib/indexal/verify";
import { parseIndexalPayload } from "@/lib/indexal/types";
import {
  normalizeSlug,
  resolveAuthorName,
  resolveCoverImage,
  resolvePublishedAt,
} from "@/lib/indexal/article";
import { getSiteUrl } from "@/lib/site";

// Receives `article.published` deliveries from Indexal (getindexal.com) and
// upserts them into focuslab_blog_posts. See INDEXAL.md for the setup steps and
// supabase/sql/04_indexal_integration.sql for the schema this relies on.

export const runtime = "nodejs"; // node:crypto, for HMAC verification
export const dynamic = "force-dynamic";

const SUPPORTED_EVENT = "article.published";
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Slugs are unique across the whole blog, but Indexal's identity key is the
 * article id — the same slug can legitimately arrive for a different article
 * (a translation, or a hand-written post that already claimed it). The slug is
 * suffixed until it is free, and an article that already owns the slug keeps it.
 */
async function resolveFreeSlug(
  supabase: ReturnType<typeof createAdminClient>,
  desired: string,
  indexalId: string
): Promise<string> {
  for (let attempt = 0; attempt < 25; attempt += 1) {
    const candidate = attempt === 0 ? desired : `${desired}-${attempt + 1}`;

    const { data, error } = await supabase
      .from("focuslab_blog_posts")
      .select("indexal_id")
      .eq("slug", candidate)
      .maybeSingle<{ indexal_id: string | null }>();

    if (error) throw new Error(`slug lookup failed: ${error.message}`);
    if (!data || data.indexal_id === indexalId) return candidate;
  }

  return `${desired}-${indexalId.slice(0, 8)}`;
}

export async function POST(request: Request) {
  const secret = process.env.INDEXAL_WEBHOOK_SECRET;

  if (!secret) {
    console.error("[indexal] INDEXAL_WEBHOOK_SECRET is not configured");
    return NextResponse.json({ error: "webhook not configured" }, { status: 500 });
  }

  // The signature covers the raw bytes, so the body is read as text and only
  // parsed after verification succeeds.
  const rawBody = await request.text();

  const verification = verifyIndexalRequest({
    rawBody,
    signature: request.headers.get("x-indexal-signature"),
    timestamp: request.headers.get("x-indexal-timestamp"),
    authorization: request.headers.get("authorization"),
    secret,
  });

  if (!verification.ok) {
    console.warn(`[indexal] rejected delivery: ${verification.reason}`);
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const event = request.headers.get("x-indexal-event");
  if (event && event !== SUPPORTED_EVENT) {
    // Acknowledged on purpose: a 2xx stops Indexal from retrying an event this
    // site has no handling for.
    return NextResponse.json({ ignored: event });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const payload = parseIndexalPayload(body);
  if (!payload) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const rawDeliveryId = request.headers.get("x-indexal-delivery");
  const deliveryId =
    rawDeliveryId && UUID_PATTERN.test(rawDeliveryId) ? rawDeliveryId : null;

  // Indexal retries on any non-2xx, including timeouts that happened *after*
  // the write went through. A delivery already on record is answered with the
  // URL it produced instead of being reprocessed.
  if (deliveryId) {
    const { data: seen } = await supabase
      .from("focuslab_indexal_deliveries")
      .select("post_url")
      .eq("delivery_id", deliveryId)
      .maybeSingle<{ post_url: string }>();

    if (seen) return NextResponse.json({ url: seen.post_url });
  }

  try {
    const desiredSlug =
      normalizeSlug(payload.slug) ||
      normalizeSlug(payload.title) ||
      `articulo-${payload.id.slice(0, 8)}`;

    const slug = await resolveFreeSlug(supabase, desiredSlug, payload.id);

    const { error: upsertError } = await supabase
      .from("focuslab_blog_posts")
      .upsert(
        {
          indexal_id: payload.id,
          title: payload.title,
          slug,
          // contentHtml already carries the infographic as a plain <img>, which
          // survives the DOMPurify pass on the blog post page. infographicHtml
          // is deliberately unused: its inline <style> would be stripped.
          content: payload.contentHtml,
          excerpt: payload.metaDescription,
          cover_image_url: resolveCoverImage(payload.heroImageUrl),
          published_at: resolvePublishedAt(payload),
          author: resolveAuthorName(payload),
          author_bio: payload.author?.bio ?? null,
          language_code: payload.languageCode,
          translation_group_id: payload.translationGroupId,
          faq_schema: payload.faqSchema ?? null,
        },
        { onConflict: "indexal_id" }
      );

    if (upsertError) throw new Error(`upsert failed: ${upsertError.message}`);

    const url = `${getSiteUrl()}/blog/${slug}`;

    if (deliveryId) {
      await supabase.from("focuslab_indexal_deliveries").insert({
        delivery_id: deliveryId,
        article_id: payload.id,
        language_code: payload.languageCode,
        post_slug: slug,
        post_url: url,
      });
    }

    // The blog pages are ISR'd with `revalidate = 3600`; without this the
    // article would not surface for up to an hour.
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/sitemap.xml");

    return NextResponse.json({ url });
  } catch (error) {
    // A 5xx tells Indexal to retry, which is what should happen for a
    // transient database failure.
    console.error("[indexal] failed to store article", error);
    return NextResponse.json({ error: "storage failed" }, { status: 500 });
  }
}
