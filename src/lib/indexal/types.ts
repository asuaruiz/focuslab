/**
 * Shape of the `article.published` webhook payload sent by Indexal
 * (getindexal.com). Every optional field is typed as nullable because Indexal
 * documents image generation, the author box and the CTA as best-effort: they
 * can all arrive as null and the receiver must publish the article regardless.
 */
export type IndexalAuthor = {
  name: string | null;
  bio: string | null;
  logoUrl: string | null;
};

export type IndexalCta = {
  url: string | null;
  label: string | null;
  asButton: boolean | null;
};

export type IndexalArticlePayload = {
  id: string;
  title: string;
  slug: string;
  metaDescription: string | null;
  contentHtml: string;
  contentMarkdown: string | null;
  heroImageUrl: string | null;
  infographicImageUrl: string | null;
  infographicHtml: string | null;
  keywords: string[] | null;
  faqSchema: unknown[] | null;
  languageCode: string | null;
  translationGroupId: string | null;
  parentArticleId: string | null;
  isTranslation: boolean | null;
  wordCount: number | null;
  readingTimeMinutes: number | null;
  author: IndexalAuthor | null;
  cta: IndexalCta | null;
  status: string | null;
  publishedAt: string | null;
  canonicalUrl: string | null;
};

/** Minimal structural validation of an untrusted, already-verified body. */
export function parseIndexalPayload(
  body: unknown
): IndexalArticlePayload | null {
  if (typeof body !== "object" || body === null) return null;

  const candidate = body as Record<string, unknown>;
  const requiredStrings = ["id", "title", "slug", "contentHtml"] as const;

  for (const key of requiredStrings) {
    const value = candidate[key];
    if (typeof value !== "string" || value.trim() === "") return null;
  }

  return candidate as unknown as IndexalArticlePayload;
}
