import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import { services } from "@/lib/services";
import { getSiteUrl } from "@/lib/site";
import type { BlogPost, CaseStudy } from "@/lib/types";

const siteUrl = getSiteUrl();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient();

  const [{ data: posts }, { data: caseStudies }] = await Promise.all([
    supabase.from("focuslab_blog_posts").select("slug, published_at").not("published_at", "is", null).not("indexal_id", "is", null).returns<Pick<BlogPost, "slug" | "published_at">[]>(),
    supabase.from("focuslab_case_studies").select("slug").returns<Pick<CaseStudy, "slug">[]>(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/filosofia",
    "/servicios",
    "/casos-de-estudio",
    "/experiencia-clientes",
    "/blog",
    "/contacto",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteUrl}/servicios/${service.slug}`,
    lastModified: new Date(),
  }));

  const blogRoutes: MetadataRoute.Sitemap = (posts ?? []).map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.published_at ? new Date(post.published_at) : new Date(),
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = (caseStudies ?? []).map((caseStudy) => ({
    url: `${siteUrl}/casos-de-estudio/${caseStudy.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...caseStudyRoutes];
}
