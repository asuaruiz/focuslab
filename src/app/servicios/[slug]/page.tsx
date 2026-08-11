import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Button from "@/components/ui/Button";
import { getServiceBySlug, getLocalizedService } from "@/lib/services";
import { getLocale } from "@/lib/i18n";

type Props = { params: { slug: string } };

// The selected language is stored in a cookie, so this page must be rendered
// per request even though the known slugs are predeclared below.
export const dynamic = "force-dynamic";

export function generateMetadata({ params }: Props): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/servicios/${service.slug}` },
  };
}

export default function ServicioDetailPage({ params }: Props) {
  const locale = getLocale();
  const service = getLocalizedService(params.slug, locale);
  if (!service) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-32 lg:px-12">
      <span className="font-heading text-xs tracking-widest uppercase text-amber">
        {service.startingAt}
      </span>
      <h1 className="mt-4 text-3xl md:text-5xl">{service.title}</h1>
      <p className="mt-8 text-lg text-white/80">{service.description}</p>

      <ul className="mt-12 space-y-4 border-t border-white/10 pt-8">
        {service.includes.map((item) => (
          <li key={item} className="text-white/70">
            — {item}
          </li>
        ))}
      </ul>

      <div className="mt-16">
        <Button href="/contacto">{locale === "en" ? "Request a Quote" : "Solicitar Cotización"}</Button>
      </div>
    </div>
  );
}
