"use client";

import { useRef } from "react";
import type { Locale } from "@/lib/i18n";
import { contactProjectTypes } from "@/lib/content";
import { trackEvent } from "@/lib/analytics";
import { submitLead } from "./actions";
import SubmitButton from "./SubmitButton";

export default function ContactForm({ locale }: { locale: Locale }) {
  const started = useRef(false);
  const en = locale === "en";
  const onStart = () => {
    if (started.current) return;
    started.current = true;
    trackEvent("form_start");
  };

  return (
    <form action={submitLead} className="form-grid" onFocus={onStart}>
      <input type="hidden" name="locale" value={locale} />
      <div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
      <div className="field"><label htmlFor="name">{en ? "Name *" : "Nombre *"}</label><input id="name" name="name" type="text" required maxLength={120} autoComplete="name" /></div>
      <div className="field"><label htmlFor="email">{en ? "Email *" : "Correo *"}</label><input id="email" name="email" type="email" required maxLength={254} autoComplete="email" inputMode="email" /></div>
      <div className="field"><label htmlFor="company">{en ? "Company" : "Empresa"}</label><input id="company" name="company" type="text" maxLength={160} autoComplete="organization" /></div>
      <div className="field"><label htmlFor="project_type">{en ? "Project type" : "Tipo de proyecto"}</label><select id="project_type" name="project_type" defaultValue=""><option value="">{en ? "Select if useful" : "Selecciona si ayuda"}</option>{contactProjectTypes[locale].map((type) => <option key={type} value={type}>{type}</option>)}</select></div>
      <div className="field field-full"><label htmlFor="idea">{en ? "What are you trying to bring to life? *" : "¿Qué estás intentando traer al mundo? *"}</label><textarea id="idea" name="idea" required minLength={10} maxLength={5000} /></div>
      <div className="field field-full"><label htmlFor="timing">{en ? "When would you like to begin?" : "¿Cuándo te gustaría empezar?"}</label><input id="timing" name="timing" type="text" maxLength={160} placeholder={en ? "A date, a window—or “I’m not sure yet”" : "Una fecha, un rango o “todavía no estoy seguro”"} /></div>
      <SubmitButton label={en ? "Start the conversation" : "Empezar la conversación"} pendingLabel={en ? "Sending…" : "Enviando…"} />
    </form>
  );
}
