import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { ArrowLink, PageHero } from "@/components/v2/Primitives";

export function generateMetadata(): Metadata {
  const locale = getLocale();
  return pageMetadata({ path: "/academy", locale, title: "Focus Labs Academy — Learning Extension in Development", description: locale === "en" ? "A future learning extension of Focus Labs, currently in development." : "Una futura extensión educativa de Focus Labs, actualmente en desarrollo." });
}

export default function AcademyPage() {
  const locale = getLocale();
  const en = locale === "en";
  return (
    <>
      <PageHero eyebrow="Focus Labs Academy" title={en ? "Learning to see can change what we are able to create." : "Aprender a ver también cambia lo que podemos crear."} intro={en ? "Focus Labs Academy is an educational extension in development. It will share judgment, process and tools without turning knowledge into hierarchy." : "Focus Labs Academy es una extensión educativa en desarrollo. Nacerá para compartir criterio, procesos y herramientas sin convertir el conocimiento en jerarquía."} />
      <section className="section feature-band">
        <div className="split"><p className="eyebrow">{en ? "Current state" : "Estado actual"}</p><div><p className="quote-large">{en ? <>In development. <em>With intention.</em></> : <>En desarrollo. <em>Con intención.</em></>}</p><p className="section-copy mt-8">{en ? "There is no fake course catalog here. The first offering will appear when its promise, material and delivery are real." : "Aquí no hay un catálogo ficticio. La primera oferta aparecerá cuando su promesa, material y entrega sean reales."}</p><div className="mt-8"><ArrowLink href={en ? "/en/contact" : "/contact"}>{en ? "Talk with Focus Labs" : "Hablar con Focus Labs"}</ArrowLink></div></div></div>
      </section>
    </>
  );
}
