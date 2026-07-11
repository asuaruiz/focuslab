import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import { submitLead } from "./actions";

export const metadata: Metadata = {
  title: "Contacto — Inicia un Proyecto",
  description:
    "Donde la visión se encuentra con la artesanía. Cuéntanos sobre tu proyecto y comienza a construir un activo estratégico con Focus Labs Media Group.",
  alternates: { canonical: "/contacto" },
};

const PROJECT_TYPES = [
  "Video",
  "Estrategia de Marca",
  "Evento",
  "Producción Comercial",
  "Podcast",
  "Fotografía",
  "Otro",
];

export default function ContactoPage({
  searchParams,
}: {
  searchParams: { success?: string; error?: string };
}) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-32 lg:px-12">
      <SectionHeading eyebrow="Descubrimiento" title="Donde la Visión se Encuentra con la Artesanía" />

      <p className="mt-8 text-center text-white/70">
        Si buscas velocidad sobre sustancia, o ruido sobre propósito, no somos
        el estudio adecuado. Si buscas un socio estratégico dispuesto a elevar
        tu narrativa visual con disciplina y calma, comienza tu proyecto aquí.
      </p>

      {searchParams.success && (
        <p className="mt-8 border border-amber/40 bg-charcoal p-4 text-sm text-amber">
          Gracias. Te responderemos dentro de las próximas 2 horas hábiles.
        </p>
      )}
      {searchParams.error && (
        <p className="mt-8 border border-white/20 bg-charcoal p-4 text-sm text-white/70">
          Hubo un problema al enviar el formulario. Intenta de nuevo.
        </p>
      )}

      <form action={submitLead} className="mt-12 space-y-6">
        <div>
          <label htmlFor="name" className="block text-xs tracking-widest uppercase text-gray">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-2 w-full border border-white/20 bg-transparent px-4 py-3 text-white outline-none focus:border-amber"
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-xs tracking-widest uppercase text-gray">
            Empresa
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className="mt-2 w-full border border-white/20 bg-transparent px-4 py-3 text-white outline-none focus:border-amber"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs tracking-widest uppercase text-gray">
            Correo Electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-2 w-full border border-white/20 bg-transparent px-4 py-3 text-white outline-none focus:border-amber"
          />
        </div>

        <div>
          <label htmlFor="project_type" className="block text-xs tracking-widest uppercase text-gray">
            Tipo de Proyecto
          </label>
          <select
            id="project_type"
            name="project_type"
            defaultValue=""
            className="mt-2 w-full border border-white/20 bg-black px-4 py-3 text-white outline-none focus:border-amber"
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="project_details"
            className="block text-xs tracking-widest uppercase text-gray"
          >
            Cuéntanos Sobre Tu Visión
          </label>
          <textarea
            id="project_details"
            name="project_details"
            rows={5}
            className="mt-2 w-full border border-white/20 bg-transparent px-4 py-3 text-white outline-none focus:border-amber"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-amber px-8 py-4 font-heading text-xs tracking-widest uppercase text-black transition-opacity hover:opacity-90"
        >
          Enviar Solicitud
        </button>
      </form>
    </div>
  );
}
