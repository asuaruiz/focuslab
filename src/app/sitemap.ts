import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

const routes = ["", "/one", "/academy", "/the-labs"];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  return routes.map((path) => ({ url: `${siteUrl}${path}`, lastModified: new Date() }));
}
