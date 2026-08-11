import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export default function Footer({ locale }: { locale: Locale }) {
  const en = locale === "en";
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <Image
          src="/logo-circle.png"
          alt="Focus Labs Media Group"
          width={48}
          height={48}
          className="h-12 w-12"
        />

        <p className="accent-quote mt-8 text-lg">
          &ldquo;{en ? "We transform imagination into meaningful experiences." : "Transformamos la imaginación en experiencias significativas."}&rdquo;
        </p>

        <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <span className="font-heading text-xs tracking-widest uppercase text-gray">
            Focus Labs Media Group — Est. 2024
          </span>

          <nav className="flex flex-wrap gap-6">
            <Link href="/filosofia" className="text-xs tracking-widest uppercase text-gray hover:text-white">
              {en ? "Philosophy" : "Filosofía"}
            </Link>
            <Link href="/servicios" className="text-xs tracking-widest uppercase text-gray hover:text-white">
              {en ? "Services" : "Servicios"}
            </Link>
            <Link href="/casos-de-estudio" className="text-xs tracking-widest uppercase text-gray hover:text-white">
              {en ? "Case Studies" : "Casos de Estudio"}
            </Link>
            <Link href="/experiencia-clientes" className="text-xs tracking-widest uppercase text-gray hover:text-white">
              {en ? "Experience" : "Experiencia"}
            </Link>
            <Link href="/blog" className="text-xs tracking-widest uppercase text-gray hover:text-white">
              Blog
            </Link>
            <Link href="/contacto" className="text-xs tracking-widest uppercase text-gray hover:text-white">
              {en ? "Contact" : "Contacto"}
            </Link>
          </nav>
        </div>

        <p className="mt-8 inline-flex items-center gap-1.5 text-xs text-gray">
          Made with <span aria-hidden="true" className="text-amber">♥</span> by{" "}
          <a
            href="https://andflow.cl"
            rel="dofollow"
            className="font-semibold text-white/90 underline-offset-4 hover:text-amber hover:underline"
          >
            andflow.cl
          </a>
        </p>
      </div>
    </footer>
  );
}
