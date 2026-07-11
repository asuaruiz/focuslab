import Button from "@/components/ui/Button";

// Reusable end-of-article CTA pointing readers toward the general services
// catalog. Individual posts may also link to a specific service inline
// within their content — this block is the consistent, site-wide fallback.
export default function RelatedServiceCTA() {
  return (
    <div className="mt-16 border-t border-white/10 pt-12 text-center">
      <span className="font-heading text-xs tracking-widest uppercase text-amber">
        Siguiente Paso
      </span>
      <h3 className="mt-4 text-2xl md:text-3xl">¿Listo Para Tu Próxima Producción?</h3>
      <p className="mx-auto mt-4 max-w-md text-white/70">
        Explora nuestros servicios de producción audiovisual y estrategia de
        marca, diseñados para convertir imaginación en resultados.
      </p>
      <div className="mt-8 flex justify-center">
        <Button href="/servicios">Ver Servicios</Button>
      </div>
    </div>
  );
}
