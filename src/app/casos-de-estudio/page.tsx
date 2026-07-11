import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import CaseStudyCard from "@/components/case-studies/CaseStudyCard";
import { createClient } from "@/lib/supabase/server";
import type { CaseStudy } from "@/lib/types";

export const metadata: Metadata = {
  title: "Casos de Estudio — Portafolio de Producción",
  description:
    "Explora el portafolio de Focus Labs Media Group: campañas comerciales, eventos y contenido de marca contados como una historia cinematográfica.",
  alternates: { canonical: "/casos-de-estudio" },
};

// SSR by default (dynamic Supabase read); wrap in revalidate for ISR if the
// portfolio doesn't need to be instantly fresh.
export const revalidate = 3600;

const STORYTELLING_MATRIX = [
  { title: "El Contexto", description: "¿De dónde partimos?" },
  { title: "El Conflicto", description: "¿Qué desafío enfrentaba la marca o el cliente?" },
  {
    title: "La Transformación",
    description: "¿Cómo interviene la ejecución estratégica de Focus Labs?",
  },
  { title: "La Resolución", description: "El resultado final y el impacto logrado." },
];

export default async function CasosDeEstudioPage() {
  const supabase = createClient();
  const { data: caseStudies } = await supabase
    .from("focuslab_case_studies")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<CaseStudy[]>();

  return (
    <div className="mx-auto max-w-7xl px-6 py-32 lg:px-12">
      <SectionHeading as="h1" eyebrow="Portafolio" title="El Arte Detrás del Lente" />

      <p className="mx-auto mt-8 max-w-2xl text-center">
        Cada fotograma es una promesa. Cada corte es una decisión.
        Exploramos cómo la profundidad de campo poco profunda y la
        composición en tres capas elevan la narrativa visual de nuestros
        socios.
      </p>

      <div className="mx-auto mt-16 grid max-w-4xl gap-px overflow-hidden bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {STORYTELLING_MATRIX.map((step) => (
          <div key={step.title} className="bg-black p-6 text-center">
            <h3 className="text-sm text-amber">{step.title}</h3>
            <p className="mt-2 text-sm text-white/70">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-24 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {(caseStudies ?? []).map((caseStudy) => (
          <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
        ))}
      </div>
    </div>
  );
}
