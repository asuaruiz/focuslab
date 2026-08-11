"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/types";
import { getReadingTime } from "@/lib/reading-time";
import { formatPublishedDate } from "@/lib/format-date";
import type { Locale } from "@/lib/i18n";

type ViewMode = "list" | "grid";

function PostMeta({ post, locale }: { post: BlogPost; locale: Locale }) {
  const date = formatPublishedDate(post.published_at, locale);
  const minutes = getReadingTime(post.content);

  return (
    <p className="mt-2 flex flex-wrap items-center gap-x-2 text-xs text-white/50">
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
  );
}

function ListItem({ post, locale }: { post: BlogPost; locale: Locale }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col gap-6 border-b border-white/10 pb-10 sm:flex-row"
    >
      {/* Posts published through Indexal can arrive without a cover; the
          charcoal block stands in so the layout keeps its rhythm. */}
      <div className="relative h-48 w-full flex-shrink-0 overflow-hidden bg-charcoal sm:h-32 sm:w-48">
        {post.cover_image_url && (
          <Image
            src={post.cover_image_url}
            alt={locale === "en" ? `Cover image for ${post.title}` : `Imagen de portada del artículo ${post.title}`}
            fill
            sizes="(min-width: 640px) 192px, 100vw"
            className="object-cover transition-opacity group-hover:opacity-80"
          />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-xl normal-case tracking-normal font-normal text-white group-hover:text-amber">
          {post.title}
        </h3>
        <PostMeta post={post} locale={locale} />
        {post.excerpt && (
          <p className="mt-3 line-clamp-2 text-sm text-white/70">{post.excerpt}</p>
        )}
      </div>
    </Link>
  );
}

function GridItem({ post, locale }: { post: BlogPost; locale: Locale }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col">
      <div className="relative aspect-video w-full overflow-hidden bg-charcoal">
        {post.cover_image_url && (
          <Image
            src={post.cover_image_url}
            alt={locale === "en" ? `Cover image for ${post.title}` : `Imagen de portada del artículo ${post.title}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-opacity group-hover:opacity-80"
          />
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-lg normal-case tracking-normal font-normal text-white group-hover:text-amber">
          {post.title}
        </h3>
        <PostMeta post={post} locale={locale} />
        {post.excerpt && (
          <p className="mt-3 line-clamp-2 text-sm text-white/70">{post.excerpt}</p>
        )}
      </div>
    </Link>
  );
}

function ViewToggle({ view, onChange, locale }: { view: ViewMode; onChange: (view: ViewMode) => void; locale: Locale }) {
  const base =
    "flex h-10 w-10 items-center justify-center border transition-colors";
  const active = "border-amber text-amber";
  const inactive = "border-white/20 text-white/50 hover:border-white/40 hover:text-white";

  return (
    <div className="flex items-center gap-2" role="group" aria-label={locale === "en" ? "Post view" : "Vista del listado"}>
      <button
        type="button"
        aria-pressed={view === "list"}
        aria-label={locale === "en" ? "List view" : "Vista de lista"}
        onClick={() => onChange("list")}
        className={`${base} ${view === "list" ? active : inactive}`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
          <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <button
        type="button"
        aria-pressed={view === "grid"}
        aria-label={locale === "en" ? "Grid view" : "Vista de grilla"}
        onClick={() => onChange("grid")}
        className={`${base} ${view === "grid" ? active : inactive}`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
          <rect x="4" y="4" width="7" height="7" />
          <rect x="13" y="4" width="7" height="7" />
          <rect x="4" y="13" width="7" height="7" />
          <rect x="13" y="13" width="7" height="7" />
        </svg>
      </button>
    </div>
  );
}

export default function BlogPostsView({ posts, locale }: { posts: BlogPost[]; locale: Locale }) {
  const [view, setView] = useState<ViewMode>("list");

  return (
    <div>
      <div className="flex justify-end">
        <ViewToggle view={view} onChange={setView} locale={locale} />
      </div>

      {posts.length === 0 && (
        <p className="mt-16 text-center text-white/60">
          {locale === "en" ? "New articles are coming soon." : "Pronto publicaremos nuevos artículos."}
        </p>
      )}

      {view === "list" ? (
        <div className="mt-10 space-y-10">
          {posts.map((post) => (
            <ListItem key={post.id} post={post} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <GridItem key={post.id} post={post} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
