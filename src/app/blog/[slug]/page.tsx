import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/lib/types";

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};

  return {
    title: post.title,
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

  return (
    <article className="mx-auto max-w-3xl px-6 py-32 lg:px-12">
      <h1 className="text-3xl md:text-5xl">{post.title}</h1>

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
        className="prose-invert mt-12 max-w-prose text-white/80"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
