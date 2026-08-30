import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { processSteps, serviceDirections } from "@/lib/content";
import { ArrowLink, PageHero } from "@/components/v2/Primitives";

export function generateMetadata(): Metadata {
  const locale = getLocale();
  return pageMetadata({
    path: "/services",
    locale,
    title: locale === "en" ? "Creative Strategy & Production Services — Focus Labs" : "Estrategia Creativa y Producción — Focus Labs",
    description: locale === "en" ? "Creative direction, strategy, content, campaigns, event storytelling and ongoing partnerships." : "Dirección creativa, estrategia, contenido, campañas, historias de eventos y colaboraciones continuas.",
  });
}

export default function ServicesPage() {
  const locale = getLocale();
  const en = locale === "en";
  return (
    <>
      <PageHero eyebrow={en ? "Services" : "Servicios"} title={en ? "What we can build together." : "Lo que podemos construir juntos."} intro={en ? "Sometimes you need a deliverable. Sometimes you need direction. We begin with what the idea needs to accomplish, then build the right way to bring it into the world." : "A veces necesitas una pieza. A veces necesitas dirección. Empezamos entendiendo qué debe lograr tu idea y construimos la forma correcta de llevarla al mundo."} />
      <section className="section">
        <div className="service-grid">
          {serviceDirections.map((service, index) => {
            const copy = service[locale];
            return <article className="service-card" key={service.slug}><span className="card-number">0{index + 1}</span><div><h2>{copy.title}</h2><p>{copy.summary}</p></div></article>;
          })}
        </div>
      </section>
      <section className="section feature-band">
        <div className="split"><p className="eyebrow">{en ? "The process" : "El proceso"}</p><p className="quote-large">{en ? <>Complexity behind. <em>Clarity in front.</em></> : <>Complejidad detrás. <em>Claridad al frente.</em></>}</p></div>
        <div className="process-grid">
          {processSteps.map((step, index) => <article className="process-card" key={index}><span className="card-number">0{index + 1}</span><h3>{step[locale][0]}</h3><p>{step[locale][1]}</p></article>)}
        </div>
        <div className="mt-8"><ArrowLink href={en ? "/en/contact" : "/contact"} primary>{en ? "Start a project" : "Iniciar un proyecto"}</ArrowLink></div>
      </section>
    </>
  );
}
