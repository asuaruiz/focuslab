import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { workItems } from "@/lib/work";
import { ArrowLink, PageHero } from "@/components/v2/Primitives";

export function generateMetadata(): Metadata {
  const locale = getLocale();
  return pageMetadata({
    path: "/work",
    locale,
    title: locale === "en" ? "Selected Work — Focus Labs" : "Trabajo Seleccionado — Focus Labs",
    description: locale === "en" ? "Selected creative work, process and project stories by Focus Labs." : "Trabajo creativo, procesos e historias de proyecto seleccionadas por Focus Labs.",
  });
}

export default function WorkPage() {
  const locale = getLocale();
  const en = locale === "en";
  return (
    <>
      <PageHero eyebrow={en ? "Selected work" : "Trabajo seleccionado"} title={en ? "The work is the evidence." : "El trabajo es la evidencia."} intro={en ? "Every project begins somewhere different. What matters is what needed to exist, how the decisions were made and what we were able to build." : "Cada proyecto empieza en un lugar distinto. Lo importante es entender qué necesitaba existir, cómo tomamos las decisiones y qué logramos construir."} />
      <section className="section">
        {workItems.length ? (
          <div className="service-grid">{workItems.map((item) => <article className="service-card" key={item.slug}><p className="card-number">{item.year}</p><div><h2>{item.title}</h2><p>{item.summary}</p></div></article>)}</div>
        ) : (
          <div className="split">
            <p className="eyebrow">{en ? "Publication gate" : "Puerta de publicación"}</p>
            <div>
              <p className="quote-large">{en ? <>Real experience. <em>Exact credits.</em></> : <>Experiencia real. <em>Créditos exactos.</em></>}</p>
              <p className="section-copy mt-8">{en ? "The first media intake is complete. We are preserving the difference between work by Focus Labs and professional experience behind Focus Labs before anything becomes a public claim." : "El primer media intake está completo. Estamos preservando la diferencia entre trabajo de Focus Labs y experiencia profesional detrás de Focus Labs antes de convertir algo en una afirmación pública."}</p>
              <div className="mt-8"><ArrowLink href={en ? "/en/contact" : "/contact"} primary>{en ? "Start a project" : "Iniciar un proyecto"}</ArrowLink></div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
