"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

export default function Navbar({ locale }: { locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const english = locale === "en";
  const navLinks = [
    { href: "/filosofia", label: english ? "Philosophy" : "Filosofía" },
    { href: "/servicios", label: english ? "Services" : "Servicios" },
    { href: "/casos-de-estudio", label: english ? "Case Studies" : "Casos de Estudio" },
    { href: "/experiencia-clientes", label: english ? "Experience" : "Experiencia" },
    { href: "/blog", label: "Blog" },
  ];

  function changeLocale(nextLocale: Locale) {
    document.cookie = `focuslab_locale=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    window.location.reload();
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the viewport grows back into the
  // desktop breakpoint, so it can't be left open-but-hidden.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "bg-black/70 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
        <Link href="/" className="flex flex-shrink-0 items-center gap-3">
          <Image
            src="/logo-circle.png"
            alt="Focus Labs Media Group"
            width={40}
            height={40}
            priority
            className="h-10 w-10"
          />
          <span className="hidden whitespace-nowrap font-heading text-sm tracking-widest text-white uppercase font-light sm:inline">
            Focus Labs
          </span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex xl:gap-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="whitespace-nowrap font-heading text-xs tracking-widest uppercase text-gray transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 font-heading text-[10px] tracking-widest text-white/50" aria-label={english ? "Language" : "Idioma"}>
            {(["es", "en"] as Locale[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => changeLocale(item)}
                aria-pressed={locale === item}
                className={`px-1.5 py-2 uppercase transition-colors ${locale === item ? "text-amber" : "hover:text-white"}`}
              >
                {item}
              </button>
            ))}
          </div>
          <Link
            href="/contacto"
            className="whitespace-nowrap rounded-sm bg-amber px-4 py-2 font-heading text-[10px] tracking-widest uppercase text-black transition-opacity hover:opacity-90 sm:px-5 sm:py-2.5 sm:text-xs"
          >
            {english ? "Contact" : "Contacto"}
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? (english ? "Close menu" : "Cerrar menú") : (english ? "Open menu" : "Abrir menú")}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span
              className={`h-px w-6 bg-white transition-transform ${
                menuOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-white transition-transform ${
                menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile / tablet menu — anything under the lg breakpoint */}
      {menuOpen && (
        <ul className="flex flex-col gap-6 border-t border-white/10 bg-black px-6 py-8 lg:hidden">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-heading text-sm tracking-widest uppercase text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
