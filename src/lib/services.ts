// Static service catalog — sourced from the Focus Labs Media Group Brand
// Book (Chapter 07). Content is stable enough to ship as SSG data rather
// than a Supabase table; promote to a table if pricing needs to change
// without a redeploy.
export type Service = {
  slug: string;
  title: string;
  startingAt: string;
  description: string;
  expanded?: string;
  includes: string[];
};

export const services: Service[] = [
  {
    slug: "estrategia-identidad-de-marca",
    title: "Estrategia e Identidad de Marca",
    startingAt: "Desde $2,500",
    description:
      "Construimos marcas que exigen atención y crean lealtad emocional desde la primera interacción.",
    expanded:
      "Tu marca no es un logo. Es cómo la gente se siente cuando te ve. Trabajamos desde cero para definir quién eres realmente, qué crees, y cómo quieres ser percibido. Luego lo traducimos a identidad visual coherente, messaging claro, y posicionamiento estratégico. El resultado es una marca que genera confianza instantánea.",
    includes: [
      "Sesión de descubrimiento",
      "Arquitectura de marca",
      "Sistema de identidad visual",
      "Brand book",
      "Documento de posicionamiento estratégico",
    ],
  },
  {
    slug: "gestion-de-redes-sociales",
    title: "Gestión de Redes Sociales",
    startingAt: "Desde $800/mes",
    description:
      "No publicamos contenido; diseñamos percepción. Cada título y fotograma está alineado con la voz de tu marca.",
    expanded:
      "Las redes sociales son una herramienta de ingeniería de percepción. No es un calendario de publicaciones. Es una narrativa coherente que evoluciona mes a mes. Nos encargamos de: qué publicas, cómo lo publicas, cuándo lo publicas, y cómo eso construye tu autoridad. El resultado es audiencias que no solo te siguen; te defienden.",
    includes: [
      "Calendario de contenido",
      "Copywriting",
      "Gestión de comunidad",
      "Reportes de analítica",
      "Optimización por plataforma",
    ],
  },
  {
    slug: "produccion-de-contenido",
    title: "Producción de Contenido (Foto y Video)",
    startingAt: "Desde $600",
    description:
      "Contenido visual de calidad cinematográfica diseñado para plataformas digitales. Tratamos cada rodaje como una gran producción.",
    expanded:
      "Ya sea un reel, una foto de producto, o un testimonio de cliente, cada entregable es estratégico. Grabamos con intención, editamos hacia un objetivo, y exportamos específicamente para cada plataforma. No es 'contenido'. Es un activo que genera resultados.",
    includes: [
      "Dirección creativa",
      "Fotografía profesional",
      "Video de formato corto",
      "Edición y color",
      "Exportaciones optimizadas por plataforma",
    ],
  },
  {
    slug: "storytelling-de-eventos",
    title: "Storytelling de Eventos",
    startingAt: "Desde $1,000",
    description:
      "No documentamos eventos; contamos la historia de la experiencia. Ideal para eventos corporativos y conferencias.",
    expanded:
      "Un evento dura horas. Tu video tiene 3-5 minutos. Eso significa ser selectivo sobre qué importa. Capturamos la energía, los momentos genuinos, las voces auténticas. El resultado es que quien no estuvo presente desea haberlo hecho. Y tu marca se percibe como significativa, no solo 'corporativa'.",
    includes: [
      "Cobertura cinematográfica multi-cámara",
      "Highlight Film de alto impacto",
      "Galería fotográfica",
      "Contenido extraído para redes",
    ],
  },
  {
    slug: "produccion-comercial",
    title: "Producción Comercial",
    startingAt: "Desde $1,500",
    description:
      "Diseñado para empresas que requieren una campaña visual de alto impacto, con desarrollo de guion, edición cinematográfica y diseño de sonido.",
    expanded:
      "Tu comercial es la presentación más importante de tu marca. No es improvisado. Desde el concepto creativo hasta el diseño final de sonido, cada decisión sirve a tu objetivo comercial. Trabajamos contigo para asegurar que el video no solo se vea extraordinario; que venda.",
    includes: [
      "Desarrollo de concepto creativo",
      "Guion avanzado",
      "Producción completa en set",
      "Edición cinematográfica",
      "Color y diseño de sonido",
    ],
  },
  {
    slug: "produccion-de-podcast",
    title: "Producción de Podcast",
    startingAt: "Desde $500/episodio",
    description:
      "Grabación multicámara fluida y audio aislado profesional para conversaciones dignas de recordar.",
    expanded:
      "Un podcast de alta gama es cómo construyes autoridad sin parecer que estás 'haciendo marketing'. Tu audiencia te escucha explorar ideas profundas en conversación fluida. Audio profesional. Iluminación de estudio. Pero sin que se sienta 'producido'. El resultado es que te perciben como experto.",
    includes: [
      "Set técnico de estudio",
      "Audio profesional aislado",
      "Iluminación de transmisión",
      "Edición completa",
      "Clips para redes sociales",
    ],
  },
  {
    slug: "fotografia-de-alto-nivel",
    title: "Fotografía de Alto Nivel",
    startingAt: "Desde $250",
    description:
      "Sesiones adaptadas para marca personal, retratos corporativos y productos.",
    expanded:
      "Una foto mala de ti comunica algo. Una foto excelente comunica algo completamente diferente. Ya sea retratos para tu página web, fotos de producto, o sesión de marca personal, nos enfocamos en un objetivo: que la gente se sienta algo cuando te ve.",
    includes: ["Dirección de sesión", "Selección curada", "Retoque y color"],
  },
  {
    slug: "partnership-mensual-de-contenido",
    title: "Partnership Mensual de Contenido",
    startingAt: "Desde $1,200/mes",
    description: "Nuestro retainer insignia. Operamos como tu equipo creativo interno.",
    expanded:
      "No es un servicio. Es una asociación. Cada mes, nos convertimos en tu equipo creativo. Producimos contenido estratégicamente, cobrimos eventos, participamos en planeación, y ajustamos la estrategia basado en resultados. Es cómo las marcas que más crecen lo hacen.",
    includes: [
      "Producción mensual recurrente",
      "Fotografía y video por lotes",
      "Cobertura de eventos",
      "Planeación estratégica mensual",
    ],
  },
  {
    slug: "consultoria-creativa",
    title: "Consultoría Creativa",
    startingAt: "Desde $150/hora",
    description:
      "Para negocios o creadores que requieren arquitectura estratégica antes de encender una cámara.",
    expanded:
      "A veces no necesitas producción. Necesitas pensar diferente. Trabajamos contigo sesión por sesión para definir estrategia, resolver problemas creativos, o diseñar tu dirección de marca. Es consultoría pura sin la factura de una agencia.",
    includes: [
      "Arquitectura de marca",
      "Storytelling",
      "Logística de producción",
      "Estrategia de redes sociales",
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
