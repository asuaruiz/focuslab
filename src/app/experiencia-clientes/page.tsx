import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import LazyVideo from "@/components/ui/LazyVideo";
import { createClient } from "@/lib/supabase/server";
import type { CaseStudy } from "@/lib/types";
import { getLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Experiencia de Clientes — El Lado Humano del Proceso",
  description:
    "Descubre el viaje del cliente en Focus Labs Media Group: descubrimiento, estrategia, producción y seguimiento a largo plazo.",
  alternates: { canonical: "/experiencia-clientes" },
};

export const revalidate = 3600;

const CLIENT_JOURNEY = [
  {
    step: "01",
    title: "Descubrimiento",
    description: "Escuchamos antes de cotizar para entender qué intentas lograr.",
  },
  {
    step: "02",
    title: "Estrategia",
    description: "Definimos objetivos, cronogramas y la dirección creativa.",
  },
  {
    step: "03",
    title: "Producción",
    description: "Caminarás hacia un set preparado y tranquilo. Guiarte es nuestro trabajo.",
  },
  {
    step: "04",
    title: "Post-Producción",
    description: "Editamos con una sola pregunta en mente: ¿Esto ayuda a contar mejor la historia?",
  },
  {
    step: "05",
    title: "Entrega",
    description: "Archivos organizados y estructurados mediante plataformas profesionales.",
  },
  {
    step: "06",
    title: "Seguimiento",
    description: "Construimos confianza a largo plazo por encima del beneficio a corto plazo.",
  },
];

export default async function ExperienciaClientesPage() {
  const en = getLocale() === "en";
  const journey = en ? [
    { step: "01", title: "Discovery", description: "We listen before quoting to understand what you want to achieve." },
    { step: "02", title: "Strategy", description: "We define objectives, timelines, and creative direction." },
    { step: "03", title: "Production", description: "You walk onto a prepared, calm set. Guiding you is our job." },
    { step: "04", title: "Post-Production", description: "We edit with one question in mind: does this tell the story better?" },
    { step: "05", title: "Delivery", description: "Organized files delivered through professional platforms." },
    { step: "06", title: "Follow-up", description: "We build long-term trust over short-term gain." },
  ] : CLIENT_JOURNEY;
  const supabase = createClient();
  const { data: testimonials } = await supabase
    .from("focuslab_case_studies")
    .select("*")
    .not("video_url", "is", null)
    .order("created_at", { ascending: false })
    .returns<CaseStudy[]>();

  return (
    <div className="mx-auto max-w-5xl px-6 py-32 lg:px-12">
      <SectionHeading
        as="h1"
        eyebrow={en ? "Chapter Six" : "Capítulo Seis"}
        title={en ? "The Human Side of the Process" : "El Lado Humano del Proceso"}
        quote="People may forget the deliverables. They rarely forget how you made them feel."
      />

      <p className="mx-auto mt-8 max-w-2xl text-center">
        {en ? "Our clients hire us because they value clarity, organization, and a stress-free process." : "Nuestros clientes nos contratan porque buscan claridad, organización y un proceso libre de estrés."}
      </p>

      <div className="mt-20 grid gap-px overflow-hidden bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
        {journey.map((item) => (
          <div key={item.step} className="bg-black p-8">
            <span className="font-heading text-2xl text-amber">{item.step}</span>
            <h3 className="mt-4 text-base">{item.title}</h3>
            <p className="mt-3 text-sm text-white/70">{item.description}</p>
          </div>
        ))}
      </div>

      {testimonials && testimonials.length > 0 && (
        <div className="mt-24 grid gap-16 border-t border-white/10 pt-16 md:grid-cols-2">
          {testimonials.map((item) => (
            <div key={item.id}>
              <LazyVideo
                src={item.video_url as string}
                poster={item.cover_image_url}
                title={item.title}
              />
              <p className="mt-4 text-sm text-gray">{item.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
