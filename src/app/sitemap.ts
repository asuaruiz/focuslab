import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import { getSiteUrl } from "@/lib/site";
import type { BlogPost } from "@/lib/types";

const canonicalRoutes = ["", "/work", "/services", "/the-lab", "/about", "/academy", "/contact", "/blog"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const now = new Date();
  const staticRoutes = canonicalRoutes.flatMap((path) => [
    { url: `${siteUrl}${path}`, lastModified: now, alternates: { languages: { es: `${siteUrl}${path}`, en: `${siteUrl}/en${path}` } } },
    { url: `${siteUrl}/en${path}`, lastModified: now, alternates: { languages: { es: `${siteUrl}${path}`, en: `${siteUrl}/en${path}` } } },
  ]);

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return staticRoutes;

  try {
    const supabase = createClient();
    const { data: posts } = await supabase.from("focuslab_blog_posts").select("slug, published_at, language_code").not("published_at", "is", null).returns<Pick<BlogPost, "slug" | "published_at" | "language_code">[]>();
    return [
      ...staticRoutes,
      ...(posts ?? []).map((post) => ({
        url: `${siteUrl}${post.language_code === "en" ? "/en" : ""}/blog/${post.slug}`,
        lastModified: post.published_at ? new Date(post.published_at) : now,
      })),
    ];
  } catch {
    return staticRoutes;
  }
}
