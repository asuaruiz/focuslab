import { notFound } from "next/navigation";
import { workItems } from "@/lib/work";
import { Eyebrow, PageHero, SectionTitle } from "@/components/v2/Primitives";
import { getLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const locale = getLocale();
  const item = workItems.find((entry) => entry.slug === params.slug && entry.permissionsStatus === "approved");
  if (!item) return {};
  return pageMetadata({
    path: `/work/${item.slug}`,
    locale,
    title: `${item.title} — Focus Labs`,
    description: item.summary,
  });
}

export default function WorkDetailPage({ params }: { params: { slug: string } }) {
  const item = workItems.find((entry) => entry.slug === params.slug && entry.permissionsStatus === "approved");
  if (!item) notFound();
  const locale = getLocale();
  const en = locale === "en";

  return (
    <>
      <PageHero eyebrow={en ? "Selected work" : "Trabajo seleccionado"} title={item.title} intro={item.summary} />
      <section className="section">
        <div className="split">
          <Eyebrow>{en ? "Credits + context" : "Créditos + contexto"}</Eyebrow>
          <div>
            <SectionTitle>{item.clientDisplay}</SectionTitle>
            <p className="lede mt-8">{item.attribution}</p>
            <p className="section-copy mt-8">{item.contribution}</p>
            <p className="section-copy mt-8">{item.disciplines.join(" · ")} · {item.year}</p>
          </div>
        </div>
      </section>
    </>
  );
}
