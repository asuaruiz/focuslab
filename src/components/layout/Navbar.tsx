"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";

const links = [
  ["/work", "Trabajo", "Work"],
  ["/services", "Servicios", "Services"],
  ["/the-lab", "The Lab", "The Lab"],
  ["/about", "Nosotros", "About"],
] as const;

function localized(path: string, locale: Locale) {
  return locale === "en" ? `/en${path === "/" ? "" : path}` : path;
}

export default function Navbar({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const en = locale === "en";
  const cleanPath = pathname.replace(/^\/en(?=\/|$)/, "") || "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled || open ? "is-solid" : ""}`}>
      <nav className="site-nav" aria-label={en ? "Primary navigation" : "Navegación principal"}>
        <Link href={localized("/", locale)} className="brand-lockup" aria-label="Focus Labs Media Group — Home">
          <span>FOCUS LABS</span>
          <small>MEDIA GROUP</small>
        </Link>

        <ul className="desktop-nav">
          {links.map(([href, es, english]) => (
            <li key={href}><Link href={localized(href, locale)}>{en ? english : es}</Link></li>
          ))}
        </ul>

        <div className="desktop-actions">
          <Link
            href={localized(cleanPath, en ? "es" : "en")}
            className="language-link"
            onClick={() => trackEvent("language_switch", { locale: en ? "es" : "en" })}
            hrefLang={en ? "es" : "en"}
          >
            {en ? "ES" : "EN"}
          </Link>
          <Link href={localized("/contact", locale)} className="nav-cta" onClick={() => trackEvent("start_project_click", { placement: "header" })}>
            {en ? "Start a project" : "Iniciar un proyecto"}
          </Link>
        </div>

        <button className="menu-button" type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? (en ? "Close menu" : "Cerrar menú") : (en ? "Open menu" : "Abrir menú")} onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
      </nav>

      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="mobile-menu-inner">
          <ul>
            {links.map(([href, es, english], index) => (
              <li key={href}><span>0{index + 1}</span><Link href={localized(href, locale)} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>{en ? english : es}</Link></li>
            ))}
          </ul>
          <div className="mobile-menu-actions">
            <Link href={localized("/contact", locale)} className="button-primary" onClick={() => { setOpen(false); trackEvent("start_project_click", { placement: "mobile_menu" }); }} tabIndex={open ? 0 : -1}>{en ? "Start a project" : "Iniciar un proyecto"}<span aria-hidden="true">↗</span></Link>
            <Link href={localized(cleanPath, en ? "es" : "en")} className="language-link" onClick={() => trackEvent("language_switch", { locale: en ? "es" : "en" })} tabIndex={open ? 0 : -1}>{en ? "Español" : "English"}</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
