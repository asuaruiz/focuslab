import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Focus Labs Media Group — Productora Audiovisual de Autor",
  description:
    "Fotografía, cine y estrategia de marca con la calma de una autoridad operativa. Focus Labs Media Group transforma la imaginación en experiencias significativas.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="mx-auto max-w-4xl px-6 py-24 lg:px-12">
        <SectionHeading title="Certeza Estratégica en una Industria Ruidosa" />

        <div className="mt-10 space-y-6">
          <p className="text-center">
            En un mercado saturado de operadores técnicos y creadores de
            contenido de alto volumen, nosotros ocupamos el espacio de la
            Certeza Estratégica. Cerramos la brecha entre tu visión creativa y
            la ejecución, eliminando la fricción y construyendo confianza
            operativa.
          </p>
          <p className="text-center">
            No somos una fábrica de contenido ni perseguimos tendencias
            reactivas. Somos tu estudio de producción de alta gama y
            desarrolladores de identidad visual.
          </p>

          <div className="mt-12 border-t border-white/10 pt-8">
            <p className="text-sm text-amber">¿Qué significa Certeza Estratégica?</p>
            <p className="mt-4 text-white/80">
              Es la diferencia entre un videógrafo que ejecuta tu idea y un
              productor que te ayuda a pensar. Es saber exactamente qué estás
              comunicando, por qué importa, y cómo tu audiencia lo recibirá.
              Significa que cuando arrives al set, no hay sorpresas ni improvisación.
              Hay un plan claro, un equipo preparado, y la confianza de que el
              resultado será exactamente lo que imaginaste (o mejor).
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-charcoal">
        <div className="mx-auto max-w-4xl px-6 py-24 lg:px-12">
          <SectionHeading title="¿Videógrafo o Productor Estratégico?" />

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray">El Videógrafo</p>
              <ul className="space-y-2 text-sm text-white/70">
                <li>• Ejecuta lo que le dices</li>
                <li>• Se enfoca en lo técnico</li>
                <li>• Es predecible pero no diferencia</li>
                <li>• Entrega un video bonito</li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-amber">Focus Labs</p>
              <ul className="space-y-2 text-sm text-white/70">
                <li>• Ayuda a crear la visión</li>
                <li>• Entiende tu negocio y audiencia</li>
                <li>• Genera resultados comerciales reales</li>
                <li>• Entrega una herramienta de crecimiento</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24 lg:px-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl">Nuestro Principal Entregable es la Confianza</h2>
            <p className="mt-6 text-white/80">
              El gran trabajo no comienza con una cámara; comienza con intención.
              Detrás de cada proyecto hay alguien confiándonos algo personal: su
              sueño, su negocio o su legado.
            </p>
            <p className="mt-4 text-white/80">
              Extraemos actuaciones auténticas que no pueden ser forzadas mediante
              la creación de un entorno controlado y de alta confianza. Trabajamos
              con disciplina, preparación y claridad. El resultado es que los
              clientes no solo obtienen un video extraordinario; obtienen una
              experiencia de la que se sienten orgullosos.
            </p>
          </div>

          <div className="border-t border-white/10 pt-8">
            <p className="text-sm text-amber">Cómo Construimos Confianza</p>
            <div className="mt-6 space-y-4 text-sm text-white/80">
              <p><strong>1. Escuchamos Primero</strong> — Entendemos tu objetivo real, no asumimos.</p>
              <p><strong>2. Planificamos Juntos</strong> — Defines la visión, nosotros la aseguramos.</p>
              <p><strong>3. Ejecutamos sin Fricción</strong> — Todo está listo, nada es caótico.</p>
              <p><strong>4. Entregamos con Orgullo</strong> — No es "un video", es un activo.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-charcoal">
        <div className="mx-auto max-w-4xl px-6 py-24 lg:px-12">
          <p className="text-center text-sm text-amber">Próximo Paso</p>
          <p className="mt-6 text-center text-white/80">
            ¿Tienes un proyecto en mente? Podemos ayudarte a definir la estrategia correcta
            para tu marca.
          </p>
        </div>
      </section>

      <section className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-24 text-center lg:px-12">
        <Button href="/servicios">Explorar Servicios</Button>
        <Button href="/filosofia" variant="outline">Conocer Nuestra Filosofía</Button>
        <Button href="/contacto" variant="outline">Contactar</Button>
      </section>
    </>
  );
}
