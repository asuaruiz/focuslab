import type { Locale } from "@/lib/i18n";

export const serviceDirections = [
  {
    slug: "brand-strategy-identity",
    es: {
      title: "Estrategia e identidad de marca",
      summary: "Claridad, posicionamiento y un sistema reconocible para que la marca pueda crecer con intención.",
    },
    en: {
      title: "Brand strategy & identity",
      summary: "Clarity, positioning and a recognizable system built to help a brand grow with intention.",
    },
  },
  {
    slug: "content-production",
    es: {
      title: "Producción de contenido",
      summary: "Fotografía y video creados para un propósito, una audiencia y un contexto real.",
    },
    en: {
      title: "Content production",
      summary: "Photography and film made for a real purpose, audience and context.",
    },
  },
  {
    slug: "commercial-campaigns",
    es: {
      title: "Campañas y producción comercial",
      summary: "Ideas y piezas diseñadas para mover una percepción, una emoción o una acción.",
    },
    en: {
      title: "Commercial & campaign production",
      summary: "Ideas and assets designed to move a perception, an emotion or an action.",
    },
  },
  {
    slug: "event-storytelling",
    es: {
      title: "Historias de eventos y live media",
      summary: "Convertimos momentos reales en historias que siguen viviendo después del evento.",
    },
    en: {
      title: "Event storytelling & live media",
      summary: "We turn real moments into stories that keep living after the event ends.",
    },
  },
  {
    slug: "creative-direction",
    es: {
      title: "Dirección y consultoría creativa",
      summary: "Criterio, estructura y acompañamiento antes o durante la ejecución.",
    },
    en: {
      title: "Creative direction & consulting",
      summary: "Judgment, structure and guidance before or throughout execution.",
    },
  },
  {
    slug: "ongoing-partnerships",
    es: {
      title: "Colaboraciones creativas continuas",
      summary: "Una relación para construir con coherencia, no una suma de piezas aisladas.",
    },
    en: {
      title: "Ongoing creative partnerships",
      summary: "A relationship built for continuity, not a collection of isolated deliverables.",
    },
  },
] as const;

export const processSteps = [
  { es: ["Preguntar", "Entender qué importa."], en: ["Ask", "Understand what matters."] },
  { es: ["Escuchar", "Aprender el contexto y las personas."], en: ["Listen", "Learn the context and the people."] },
  { es: ["Explorar", "Probar las posibilidades más fuertes."], en: ["Explore", "Test the strongest possibilities."] },
  { es: ["Construir", "Ejecutar con claridad y cuidado."], en: ["Build", "Execute with clarity and care."] },
] as const;

export function localize<T extends { es: unknown; en: unknown }>(item: T, locale: Locale) {
  return item[locale];
}

export const contactProjectTypes = {
  es: ["Estrategia e identidad", "Contenido", "Campaña o comercial", "Evento", "Dirección creativa", "Colaboración continua", "Otro"],
  en: ["Brand strategy & identity", "Content", "Campaign or commercial", "Event", "Creative direction", "Ongoing partnership", "Other"],
};
