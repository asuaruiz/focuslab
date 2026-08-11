import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import BlogPostsView from "@/components/blog/BlogPostsView";
import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/lib/types";
import { getLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Blog — Ideas Sobre Storytelling y Producción",
  description:
    "Artículos de Focus Labs Media Group sobre estrategia de marca, dirección cinematográfica y el negocio de contar historias con intención.",
  alternates: { canonical: "/blog" },
};

export const revalidate = 3600;

export default async function BlogPage() {
  const locale = getLocale();
  const supabase = createClient();
  const { data: posts } = await supabase
    .from("focuslab_blog_posts")
    .select("*")
    .not("published_at", "is", null)
    .ilike("language_code", `${locale}%`)
    .order("published_at", { ascending: false })
    .returns<BlogPost[]>();

  return (
    <div className="mx-auto max-w-5xl px-6 py-32 lg:px-12">
      <SectionHeading as="h1" eyebrow={locale === "en" ? "Insights" : "Ideas"} title="Blog" />

      <div className="mt-16">
        <BlogPostsView posts={posts ?? []} locale={locale} />
      </div>
    </div>
  );
}
