import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/v2/Primitives";
import TrackState from "@/components/analytics/TrackState";
import ContactForm from "./ContactForm";

export function generateMetadata(): Metadata {
  const locale = getLocale();
  return pageMetadata({ path: "/contact", locale, title: locale === "en" ? "Start a Project — Focus Labs" : "Iniciar un Proyecto — Focus Labs", description: locale === "en" ? "Bring Focus Labs an idea, problem or opportunity—even if it is not fully formed." : "Tráele a Focus Labs una idea, un problema o una oportunidad, incluso si todavía no está completamente formada." });
}

export default function ContactPage({ searchParams }: { searchParams: { success?: string; error?: string } }) {
  const locale = getLocale();
  const en = locale === "en";
  return (
    <>
      <PageHero eyebrow={en ? "Start a project" : "Iniciar un proyecto"} title={en ? "Your idea does not have to arrive finished." : "Tu idea no tiene que llegar terminada."} intro={en ? "Tell us what you want to create, solve or explore. You do not need a perfect brief or the right vocabulary. We begin by listening." : "Cuéntanos qué quieres crear, resolver o explorar. No necesitas un brief perfecto ni el vocabulario correcto. Empezamos escuchando."} />
      <section className="section">
        <div className="split">
          <p className="eyebrow">{en ? "The first step" : "El primer paso"}</p>
          <div>
            {searchParams.success && <><TrackState event="form_submit_success" /><p className="form-status" role="status">{en ? "Received. We have a place to begin. We’ll review what you shared and come back with the next step." : "Recibido. Ya tenemos un lugar para empezar. Revisaremos lo que compartiste y te responderemos con el siguiente paso."}</p></>}
            {searchParams.error && <><TrackState event="form_submit_error" /><p className="form-status" role="alert">{en ? "Something did not work as expected. Your idea is still safe. Please try again." : "Algo no salió como debía. Tu idea sigue a salvo. Intenta de nuevo."}</p></>}
            <div className="mt-8"><ContactForm locale={locale} /></div>
          </div>
        </div>
      </section>
    </>
  );
}
