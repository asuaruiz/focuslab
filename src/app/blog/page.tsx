import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/lib/types";

export const metadata: Metadata = {
  title: "Blog — Ideas Sobre Storytelling y Producción",
  description:
    "Artículos de Focus Labs Media Group sobre estrategia de marca, dirección cinematográfica y el negocio de contar historias con intención.",
  alternates: { canonical: "/blog" },
};

export const revalidate = 3600;

export default async function BlogPage() {
  const supabase = createClient();
  const { data: posts } = await supabase
    .from("focuslab_blog_posts")
    .select("*")
    .not("published_at", "is", null)
    .order("published_at", { ascending: false })
    .returns<BlogPost[]>();

  return (
    <div className="mx-auto max-w-5xl px-6 py-32 lg:px-12">
      <SectionHeading eyebrow="Ideas" title="Blog" />

      <div className="mt-16 space-y-16">
        {(posts ?? []).map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group flex gap-8">
            <div className="relative h-32 w-48 flex-shrink-0 overflow-hidden bg-charcoal">
              <Image
                src={post.cover_image_url}
                alt={`Imagen de portada del artículo ${post.title}`}
                fill
                sizes="192px"
                className="object-cover transition-opacity group-hover:opacity-80"
              />
            </div>
            <div>
              <h3 className="text-xl">{post.title}</h3>
              {post.excerpt && <p className="mt-3 text-white/70">{post.excerpt}</p>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
