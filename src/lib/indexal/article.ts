import type { IndexalArticlePayload } from "@/lib/indexal/types";

/** Byline used when Indexal sends the article with its author box disabled. */
export const FALLBACK_AUTHOR = "Focus Labs Media Group";

/**
 * Indexal already sends a slug, but it comes from an external system and ends
 * up in a public URL, so it is re-normalised rather than trusted: accents
 * folded, everything outside [a-z0-9-] dropped, dashes collapsed.
 */
export function normalizeSlug(raw: string): string {
  return raw
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
}

/**
 * heroImageUrl is best-effort on Indexal's side and can be null. Anything that
 * is not an absolute https URL is dropped instead of being stored, so the blog
 * never renders a broken or mixed-content cover — the layout already falls back
 * to a plain charcoal block when there is no cover.
 */
export function resolveCoverImage(url: string | null | undefined): string | null {
  if (!url) return null;

  try {
    return new URL(url).protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

export function resolveAuthorName(payload: IndexalArticlePayload): string {
  const name = payload.author?.name?.trim();
  return name || FALLBACK_AUTHOR;
}

/**
 * The blog treats `published_at` as the live/draft switch: a null keeps the
 * post out of both the listing and the sitemap (see the RLS policy in
 * 00_reset_and_create.sql). Anything Indexal does not mark as published is
 * therefore stored as a draft.
 */
export function resolvePublishedAt(payload: IndexalArticlePayload): string | null {
  if (payload.status !== "published") return null;

  const published = payload.publishedAt
    ? new Date(payload.publishedAt)
    : new Date();

  return Number.isNaN(published.getTime())
    ? new Date().toISOString()
    : published.toISOString();
}
