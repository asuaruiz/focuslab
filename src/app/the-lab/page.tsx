import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { ArrowLink, PageHero, SectionTitle } from "@/components/v2/Primitives";

export function generateMetadata(): Metadata {
  const locale = getLocale();
  return pageMetadata({ path: "/the-lab", locale, title: "The Lab — Focus Labs", description: locale === "en" ? "Experiments, original projects and questions from Focus Labs." : "Experimentos, proyectos originales y preguntas de Focus Labs." });
}

export default function TheLabPage() {
  const locale = getLocale();
  const en = locale === "en";
  return (
    <>
      <PageHero eyebrow="The Lab" title={en ? "The best answers usually begin with a question." : "Las mejores respuestas suelen empezar con una pregunta."} intro={en ? "THE LAB is Focus Labs’ territory for experimentation. We test ideas, make the process visible and let every discovery open the next question." : "THE LAB es el territorio de experimentación de Focus Labs. Aquí probamos ideas, hacemos visible el proceso y dejamos que cada descubrimiento abra la siguiente pregunta."} />
      <section className="section feature-band">
        <div className="split">
          <p className="eyebrow">{en ? "Active question" : "Pregunta activa"}</p>
          <div><SectionTitle>{en ? "Can we make it viral?" : "¿Podemos hacerlo viral?"}</SectionTitle><p className="lede mt-8">{en ? "Not a promise. An experiment about curiosity, observation, participation and what the result can teach us." : "No es una promesa. Es un experimento sobre curiosidad, observación, participación y lo que el resultado puede enseñarnos."}</p></div>
        </div>
      </section>
      <section className="section">
        <div className="process-grid">
          {(en ? [["Question", "What are we trying to learn?"], ["Hypothesis", "What do we believe might happen?"], ["Experiment", "We make it, publish it and observe."], ["Next question", "Every answer changes the next move."]] : [["Pregunta", "¿Qué estamos intentando aprender?"], ["Hipótesis", "¿Qué creemos que puede ocurrir?"], ["Experimento", "Lo hacemos, publicamos y observamos."], ["Siguiente pregunta", "Cada respuesta cambia el próximo movimiento."]]).map(([title, copy], index) => <article className="process-card" key={title}><span className="card-number">0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
        <div className="mt-8"><ArrowLink href={en ? "/en/contact" : "/contact"}>{en ? "Bring us a question" : "Tráenos una pregunta"}</ArrowLink></div>
      </section>
    </>
  );
}
