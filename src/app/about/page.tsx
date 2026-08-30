import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { processSteps } from "@/lib/content";
import { ArrowLink, PageHero, SectionTitle } from "@/components/v2/Primitives";

export function generateMetadata(): Metadata {
  const locale = getLocale();
  return pageMetadata({ path: "/about", locale, title: locale === "en" ? "About Focus Labs — Ideas With Direction" : "Acerca de Focus Labs — Ideas con Dirección", description: locale === "en" ? "The purpose, philosophy and human origin of Focus Labs." : "El propósito, la filosofía y el origen humano de Focus Labs." });
}

export default function AboutPage() {
  const locale = getLocale();
  const en = locale === "en";
  return (
    <>
      <PageHero eyebrow={en ? "About" : "Nosotros"} title={en ? "Focus creates direction. Labs creates possibility." : "Focus da dirección. Labs crea posibilidad."} intro={en ? "Focus Labs began with a simple belief: ideas deserve more than execution. They deserve intention, care and a place where they can become real." : "Focus Labs nació de una convicción sencilla: las ideas merecen más que ejecución. Merecen intención, cuidado y un lugar donde puedan volverse reales."} />
      <section className="section feature-band">
        <div className="split"><p className="eyebrow">{en ? "Purpose" : "Propósito"}</p><p className="quote-large">{en ? <>To transform imagination into <em>meaningful experiences.</em></> : <>Transformar la imaginación en <em>experiencias significativas.</em></>}</p></div>
      </section>
      <section className="section">
        <div className="split">
          <p className="eyebrow">{en ? "How we think" : "Cómo pensamos"}</p>
          <div>
            <SectionTitle>{en ? "Knowledge creates clarity, not hierarchy." : "El conocimiento crea claridad, no jerarquía."}</SectionTitle>
            <p className="lede mt-8">{en ? "Strategic Certainty is not pretending to know everything. It is listening, asking, studying, preparing, testing and explaining why a decision earns its place." : "Certeza Estratégica no es pretender saberlo todo. Es escuchar, preguntar, estudiar, preparar, probar y explicar por qué una decisión merece su lugar."}</p>
          </div>
        </div>
        <div className="process-grid">
          {processSteps.map((step, index) => <article className="process-card" key={index}><span className="card-number">0{index + 1}</span><h3>{step[locale][0]}</h3><p>{step[locale][1]}</p></article>)}
        </div>
      </section>
      <section className="section">
        <div className="split">
          <p className="eyebrow">{en ? "Human origin" : "Origen humano"}</p>
          <div>
            <SectionTitle>Omar</SectionTitle>
            <p className="lede mt-8">{en ? "Omar is the first human expression of Focus Labs, not the limit of the brand. His way of listening, asking and using humanity to lower the pressure helped define how working inside this universe should feel." : "Omar es la primera expresión humana de Focus Labs, no el límite de la marca. Su forma de escuchar, preguntar y usar la humanidad para bajar la presión ayudó a definir cómo debe sentirse trabajar dentro de este universo."}</p>
            <p className="section-copy mt-8">{en ? "Serious about the craft. Human about the process." : "Serios con el oficio. Humanos con el proceso."}</p>
            <div className="mt-8"><ArrowLink href={en ? "/en/contact" : "/contact"} primary>{en ? "Start a project" : "Iniciar un proyecto"}</ArrowLink></div>
          </div>
        </div>
      </section>
    </>
  );
}
