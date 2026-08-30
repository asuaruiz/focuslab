import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

type PageMetadata = {
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export function pageMetadata({ path, locale, title, description }: PageMetadata): Metadata {
  const localizedPath = locale === "en" ? `/en${path === "/" ? "" : path}` : path;
  const esPath = path;
  const enPath = `/en${path === "/" ? "" : path}`;

  return {
    title,
    description,
    alternates: {
      canonical: localizedPath,
      languages: { "es": esPath, "en": enPath, "x-default": esPath },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "en" ? "en_US" : "es_US",
      url: localizedPath,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Focus Labs Media Group" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
