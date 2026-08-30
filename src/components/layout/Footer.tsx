import Link from "next/link";
import type { Locale } from "@/lib/i18n";

function localized(path: string, locale: Locale) {
  return locale === "en" ? `/en${path === "/" ? "" : path}` : path;
}

export default function Footer({ locale }: { locale: Locale }) {
  const en = locale === "en";
  return (
    <footer className="site-footer">
      <div className="footer-statement">
        <p>{en ? "We give ideas a place to exist." : "Damos a las ideas un lugar para existir."}</p>
        <Link href={localized("/contact", locale)}>{en ? "Start a conversation" : "Empezar una conversación"} <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="footer-grid">
        <div className="brand-lockup"><span>FOCUS LABS</span><small>MEDIA GROUP</small></div>
        <nav aria-label={en ? "Secondary navigation" : "Navegación secundaria"}>
          <Link href={localized("/work", locale)}>{en ? "Work" : "Trabajo"}</Link>
          <Link href={localized("/services", locale)}>{en ? "Services" : "Servicios"}</Link>
          <Link href={localized("/the-lab", locale)}>The Lab</Link>
          <Link href={localized("/about", locale)}>{en ? "About" : "Nosotros"}</Link>
          <Link href={localized("/academy", locale)}>Academy</Link>
          <Link href={localized("/blog", locale)}>Notes</Link>
        </nav>
        <p className="footer-meta">Orlando, Florida<br />© {new Date().getFullYear()} Focus Labs Media Group</p>
      </div>
    </footer>
  );
}
