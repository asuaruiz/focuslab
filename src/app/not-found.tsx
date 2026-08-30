import { ArrowLink, Eyebrow, PageHero } from "@/components/v2/Primitives";
import { getLocale } from "@/lib/i18n";

export default function NotFound() {
  const locale = getLocale();
  const en = locale === "en";
  return (
    <>
      <PageHero
        eyebrow="404"
        title={en ? "This path is still an experiment." : "Este camino todavía es un experimento."}
        intro={en ? "The page does not exist—or moved somewhere more useful." : "La página no existe —o se movió a un lugar más útil."}
      />
      <section className="section">
        <Eyebrow>{en ? "Next move" : "Siguiente movimiento"}</Eyebrow>
        <div className="mt-8"><ArrowLink href={en ? "/en" : "/"}>{en ? "Return home" : "Volver al inicio"}</ArrowLink></div>
      </section>
    </>
  );
}
