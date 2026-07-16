import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/lib/types";
import { getReadingTime } from "@/lib/reading-time";
import { formatPublishedDate } from "@/lib/format-date";
import RelatedServiceCTA from "@/components/blog/RelatedServiceCTA";

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
      images: [{ url: post.cover_image_url }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const date = formatPublishedDate(post.published_at);
  const minutes = getReadingTime(post.content);

  return (
    <article className="mx-auto max-w-3xl px-6 py-32 lg:px-12">
      <h1 className="text-3xl md:text-5xl">{post.title}</h1>

      <p className="mt-6 flex flex-wrap items-center gap-x-2 text-sm text-white/50">
        <span>Por {post.author}</span>
        {date && (
          <>
            <span aria-hidden="true">·</span>
            <span>{date}</span>
          </>
        )}
        <span aria-hidden="true">·</span>
        <span>{minutes} min de lectura</span>
      </p>

      <div className="relative mt-12 aspect-video w-full overflow-hidden bg-charcoal">
        <Image
          src={post.cover_image_url}
          alt={`Imagen de portada del artículo ${post.title}`}
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
          priority
        />
      </div>

      <div
        className="prose prose-invert prose-lg mt-12 max-w-prose text-white/80"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
      />

      <RelatedServiceCTA />
    </article>
  );
}
