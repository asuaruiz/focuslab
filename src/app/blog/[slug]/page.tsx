import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import sanitizeHtml from "sanitize-html";
import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/lib/types";
import { getReadingTime } from "@/lib/reading-time";
import { formatPublishedDate } from "@/lib/format-date";
import { toFaqPageJsonLd } from "@/lib/indexal/faq";
import RelatedServiceCTA from "@/components/blog/RelatedServiceCTA";
import { getLocale } from "@/lib/i18n";

type Props = { params: { slug: string } };

export const revalidate = 3600;

async function getPost(slug: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from("focuslab_blog_posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle<BlogPost>();

  return data;
}

async function getTranslatedPostSlug(
  translationGroupId: string,
  locale: "es" | "en"
) {
  const supabase = createClient();
  const { data } = await supabase
    .from("focuslab_blog_posts")
    .select("slug")
    .eq("translation_group_id", translationGroupId)
    .ilike("language_code", `${locale}%`)
    .not("published_at", "is", null)
    .maybeSingle<Pick<BlogPost, "slug">>();

  return data?.slug ?? null;
}

// Google truncates SERP titles around ~60 characters. post.title is written
// for the on-page H1 (descriptive, can run long); the <title> tag needs its
// own shorter version so the brand suffix from the layout template doesn't
// get cut off mid-word.
function toSeoTitle(title: string, maxLength = 60): string {
  if (title.length <= maxLength) return title;
  const truncated = title.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  return `${truncated.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};

  return {
    title: toSeoTitle(post.title),
    description: post.excerpt ?? post.content.slice(0, 155),
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      publishedTime: post.published_at ?? undefined,
      images: post.cover_image_url ? [{ url: post.cover_image_url }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const locale = getLocale();
  const post = await getPost(params.slug);
  if (!post) notFound();

  if (!post.language_code?.toLowerCase().startsWith(locale)) {
    const translatedSlug = post.translation_group_id
      ? await getTranslatedPostSlug(post.translation_group_id, locale)
      : null;

    if (translatedSlug) redirect(`/blog/${translatedSlug}`);
    notFound();
  }

  const date = formatPublishedDate(post.published_at, locale);
  const minutes = getReadingTime(post.content);
  const faqJsonLd = toFaqPageJsonLd(post.faq_schema);

  return (
    <article className="mx-auto max-w-3xl px-6 py-32 lg:px-12">
      <h1 className="text-3xl md:text-5xl">{post.title}</h1>

      <p className="mt-6 flex flex-wrap items-center gap-x-2 text-sm text-white/50">
        <span>{locale === "en" ? "By" : "Por"} {post.author}</span>
        {date && (
          <>
            <span aria-hidden="true">·</span>
            <span>{date}</span>
          </>
        )}
        <span aria-hidden="true">·</span>
        <span>{minutes} min {locale === "en" ? "read" : "de lectura"}</span>
      </p>

      {/* Indexal marks the hero image as best-effort, so it can be missing;
          the article still publishes, just without a cover. */}
      {post.cover_image_url && (
        <div className="relative mt-12 aspect-video w-full overflow-hidden bg-charcoal">
          <Image
            src={post.cover_image_url}
            alt={locale === "en" ? `Cover image for ${post.title}` : `Imagen de portada del artículo ${post.title}`}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      )}

      <div
        className="prose prose-invert prose-lg mt-12 max-w-prose text-white/80"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
      />

      {post.author_bio && (
        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-sm text-white/50">
            <span className="text-white/80">{post.author}</span> — {post.author_bio}
          </p>
        </div>
      )}

      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <RelatedServiceCTA locale={locale} />
    </article>
  );
}
