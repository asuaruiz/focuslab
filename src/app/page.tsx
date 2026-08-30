import type { Metadata } from "next";
import { getLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { serviceDirections } from "@/lib/content";
import { AmberMark, ArrowLink, Eyebrow, SectionTitle } from "@/components/v2/Primitives";
import TrackedLink from "@/components/analytics/TrackedLink";

function pathFor(path: string, locale: Locale) {
  return locale === "en" ? `/en${path === "/" ? "" : path}` : path;
}

export function generateMetadata(): Metadata {
  const locale = getLocale();
  return pageMetadata({
    path: "/",
    locale,
    title: locale === "en" ? "Focus Labs — Creative Direction, Strategy & Production" : "Focus Labs — Dirección Creativa, Estrategia y Producción",
    description: locale === "en"
      ? "We give ideas a place to exist through narrative, strategy, creative direction and production."
      : "Damos a las ideas un lugar para existir a través de narrativa, estrategia, dirección creativa y producción.",
  });
}

export default function HomePage() {
  const locale = getLocale();
  const en = locale === "en";
  const services = serviceDirections.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <Eyebrow>Focus Labs Media Group</Eyebrow>
          <h1>{en ? "We transform imagination into meaningful experiences." : "Transformamos la imaginación en experiencias significativas."}</h1>
          <p className="hero-copy">
            {en
              ? "We give ideas a place to exist. Through narrative, strategy and craft, we turn a clear vision—or one still taking shape—into something people can see, feel and remember."
              : "Damos a las ideas un lugar para existir. Unimos narrativa, estrategia y oficio para convertir una visión —clara o todavía incompleta— en algo que las personas puedan ver, sentir y recordar."}
          </p>
          <div className="hero-actions">
            <TrackedLink href={pathFor("/contact", locale)} event="start_project_click" className="button-primary">
              {en ? "Start a project" : "Iniciar un proyecto"} <span aria-hidden="true">↗</span>
            </TrackedLink>
            <TrackedLink href={pathFor("/work", locale)} event="view_work" className="text-link">
              {en ? "View the work" : "Ver el trabajo"} <span aria-hidden="true">↗</span>
            </TrackedLink>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="split">
          <div className="page-kicker"><AmberMark /><Eyebrow>{en ? "Selected work" : "Trabajo seleccionado"}</Eyebrow></div>
          <div>
            <SectionTitle>{en ? "Let the work speak first." : "El trabajo habla primero."}</SectionTitle>
            <p className="lede mt-8">{en ? "A selection of ideas made real." : "Una selección de ideas convertidas en experiencias reales."}</p>
          </div>
        </div>
        <div className="work-grid">
          <div className="work-placeholder">
            <p>{en ? "Real work is being curated with its credits and context intact." : "El trabajo real está siendo curado con sus créditos y contexto intactos."}</p>
          </div>
          <p className="evidence-note">
            {en
              ? "We would rather show less, truthfully, than turn someone else’s work into our claim."
              : "Preferimos mostrar menos, con verdad, que convertir el trabajo de alguien más en una afirmación nuestra."}
          </p>
        </div>
        <div className="mt-8"><ArrowLink href={pathFor("/work", locale)}>{en ? "Explore work" : "Explorar trabajo"}</ArrowLink></div>
      </section>

      <section className="section feature-band">
        <div className="split">
          <Eyebrow>{en ? "What is Focus Labs?" : "¿Qué es Focus Labs?"}</Eyebrow>
          <div>
            <SectionTitle>{en ? "Direction for ideas. Room for possibility." : "Dirección para las ideas. Espacio para lo posible."}</SectionTitle>
            <p className="lede mt-8">
              {en
                ? "Focus brings clarity. Labs makes room to explore. Together, we are a creative partner for people and brands building something genuine, useful and memorable."
                : "Focus aporta claridad. Labs abre la puerta a explorar. Juntos, somos un socio creativo para personas y marcas que quieren construir algo genuino, útil y memorable."}
            </p>
          </div>
        </div>
        <div className="territory-grid">
          {services.map((service, index) => {
            const copy = service[locale];
            return <article className="territory-card" key={service.slug}><span className="card-number">0{index + 1}</span><h3>{copy.title}</h3><p>{copy.summary}</p></article>;
          })}
        </div>
        <div className="mt-8"><TrackedLink href={pathFor("/services", locale)} event="view_services" className="text-link">{en ? "Explore services" : "Explorar servicios"} <span aria-hidden="true">↗</span></TrackedLink></div>
      </section>

      <section className="section">
        <div className="split">
          <Eyebrow>{en ? "How we think + work" : "Cómo pensamos + trabajamos"}</Eyebrow>
          <div>
            <SectionTitle>{en ? "Certainty without pretending to have every answer." : "Certeza sin pretender tener todas las respuestas."}</SectionTitle>
            <p className="lede mt-8">
              {en
                ? "We ask. We listen. We explore. We build. Clarity does not come from guessing; it comes from studying, preparing, testing and explaining the choices we make."
                : "Preguntamos. Escuchamos. Exploramos. Construimos. La claridad no viene de adivinar; viene de estudiar, preparar, probar y explicar las decisiones."}
            </p>
            <p className="section-copy mt-8">{en ? "Every interaction should create clarity, confidence or meaningful progress." : "Cada interacción debe crear claridad, confianza o progreso significativo."}</p>
          </div>
        </div>
      </section>

      <div className="feature-pair">
        <section className="feature-panel">
          <div><Eyebrow>The Lab</Eyebrow><SectionTitle>{en ? "What if we test it?" : "¿Y si lo probamos?"}</SectionTitle></div>
          <div>
            <p className="section-copy">{en ? "A question can become an experiment, an idea a discovery, and every result the next question." : "Una pregunta puede convertirse en experimento, una idea en descubrimiento y un resultado en la siguiente pregunta."}</p>
            <div className="mt-8"><TrackedLink href={pathFor("/the-lab", locale)} event="explore_the_lab" className="text-link">{en ? "Enter The Lab" : "Entrar a The Lab"} <span aria-hidden="true">↗</span></TrackedLink></div>
          </div>
        </section>
        <section className="feature-panel">
          <div><Eyebrow>Academy</Eyebrow><SectionTitle>{en ? "Learning is part of the universe, too." : "Aprender también es parte del universo."}</SectionTitle></div>
          <div>
            <p className="section-copy">{en ? "Focus Labs Academy is our future learning extension. It is being developed with intention." : "Focus Labs Academy es nuestra futura extensión educativa. Está en desarrollo, con intención."}</p>
            <div className="mt-8"><TrackedLink href={pathFor("/academy", locale)} event="academy_interest" className="text-link">{en ? "Meet Academy" : "Conocer Academy"} <span aria-hidden="true">↗</span></TrackedLink></div>
          </div>
        </section>
      </div>

      <section className="section">
        <div className="split">
          <Eyebrow>{en ? "Human origin" : "Origen humano"}</Eyebrow>
          <div>
            <SectionTitle>{en ? "Built from a human point of view." : "Construido desde un punto de vista humano."}</SectionTitle>
            <p className="lede mt-8">
              {en
                ? "Omar is the first human expression of Focus Labs: someone who asks, guides and lowers the pressure so people can give their best. Focus Labs is the system designed to carry that way of creating beyond one person."
                : "Omar es la primera expresión humana de Focus Labs: alguien que pregunta, guía y ayuda a bajar la presión para que las personas puedan dar su mejor versión. Focus Labs es el sistema diseñado para llevar esa forma de crear más allá de una sola persona."}
            </p>
            <div className="mt-8"><ArrowLink href={pathFor("/about", locale)}>{en ? "Meet Focus Labs" : "Conocer Focus Labs"}</ArrowLink></div>
          </div>
        </div>
      </section>

      <section className="section invitation">
        <Eyebrow>{en ? "Start somewhere" : "Empezar en algún lugar"}</Eyebrow>
        <SectionTitle>{en ? "Your idea does not have to arrive finished." : "Tu idea no tiene que llegar terminada."}</SectionTitle>
        <p className="lede mt-8">{en ? "It can begin as a question, a problem, an opportunity or something hard to explain. Let’s start by understanding it." : "Puede llegar como una pregunta, un problema, una oportunidad o algo difícil de explicar. Empecemos por entenderlo."}</p>
        <div className="mt-8"><TrackedLink href={pathFor("/contact", locale)} event="start_project_click" className="button-primary">{en ? "Start a project" : "Iniciar un proyecto"} <span aria-hidden="true">↗</span></TrackedLink></div>
      </section>
    </>
  );
}
