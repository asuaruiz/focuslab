import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Servicios — Producción Audiovisual y Estrategia de Marca",
  description:
    "Estrategia de marca, producción comercial, fotografía de alto nivel, podcast y gestión de redes sociales por Focus Labs Media Group.",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-32 lg:px-12">
      <SectionHeading eyebrow="Capítulo Siete" title="Disciplina con Imaginación" />

      <p className="mx-auto mt-8 max-w-2xl text-center">
        Ofrecemos soluciones escalonadas para emprendedores, líderes
        corporativos y marcas establecidas.
      </p>

      <div className="mt-16 space-y-12">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/servicios/${service.slug}`}
            className="group block"
          >
            <div className="space-y-4 rounded-lg border border-white/10 bg-black p-8 transition-colors hover:bg-charcoal hover:border-white/20">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg text-amber group-hover:text-yellow-400">{service.title}</h3>
                  <p className="mt-1 text-xs text-gray">{service.startingAt}</p>
                </div>
              </div>

              <p className="text-sm text-white/80">{service.description}</p>

              {service.expanded && (
                <p className="text-sm leading-relaxed text-white/60">
                  {service.expanded}
                </p>
              )}

              <div className="mt-6 space-y-2 border-t border-white/10 pt-4">
                <p className="text-xs text-gray uppercase tracking-wider">Incluye:</p>
                <ul className="grid gap-1 sm:grid-cols-2">
                  {service.includes.map((item, idx) => (
                    <li key={idx} className="text-xs text-white/60">
                      ✓ {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
