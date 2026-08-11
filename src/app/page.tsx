import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { getLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Focus Labs Media Group — Productora Audiovisual de Autor",
  description:
    "Fotografía, cine y estrategia de marca con la calma de una autoridad operativa. Focus Labs Media Group transforma la imaginación en experiencias significativas.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const locale = getLocale();
  const en = locale === "en";
  return (
    <>
      <HeroSection locale={locale} />

      <section className="mx-auto max-w-4xl px-6 py-24 lg:px-12">
        <SectionHeading title={en ? "Strategic Certainty in a Noisy Industry" : "Certeza Estratégica en una Industria Ruidosa"} />

        <div className="mt-10 space-y-6">
          <p className="text-center">
            {en ? "In a market crowded with technical operators and high-volume content creators, we occupy the space of Strategic Certainty. We close the gap between your creative vision and execution, removing friction and building operational trust." : "En un mercado saturado de operadores técnicos y creadores de contenido de alto volumen, nosotros ocupamos el espacio de la Certeza Estratégica. Cerramos la brecha entre tu visión creativa y la ejecución, eliminando la fricción y construyendo confianza operativa."}
          </p>
          <p className="text-center">
            {en ? "We are not a content factory, and we do not chase reactive trends. We are your high-end production studio and visual identity partner." : "No somos una fábrica de contenido ni perseguimos tendencias reactivas. Somos tu estudio de producción de alta gama y desarrolladores de identidad visual."}
          </p>

          <div className="mt-12 border-t border-white/10 pt-8">
            <p className="text-sm text-amber">{en ? "What does Strategic Certainty mean?" : "¿Qué significa Certeza Estratégica?"}</p>
            <p className="mt-4 text-white/80">
              {en ? "It is the difference between a videographer who executes your idea and a producer who helps you think. It means knowing exactly what you are communicating, why it matters, and how your audience will receive it. When you arrive on set, there are no surprises: there is a clear plan, a prepared team, and confidence in the result." : "Es la diferencia entre un videógrafo que ejecuta tu idea y un productor que te ayuda a pensar. Es saber exactamente qué estás comunicando, por qué importa, y cómo tu audiencia lo recibirá. Significa que cuando llegas al set, no hay sorpresas ni improvisación. Hay un plan claro, un equipo preparado, y la confianza de que el resultado será exactamente lo que imaginaste (o mejor)."}
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-charcoal">
        <div className="mx-auto max-w-4xl px-6 py-24 lg:px-12">
          <SectionHeading title={en ? "Videographer or Strategic Producer?" : "¿Videógrafo o Productor Estratégico?"} />

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray">{en ? "The Videographer" : "El Videógrafo"}</p>
              <ul className="space-y-2 text-sm text-white/70">
                <li>• {en ? "Executes what you ask" : "Ejecuta lo que le dices"}</li>
                <li>• {en ? "Focuses on the technical" : "Se enfoca en lo técnico"}</li>
                <li>• {en ? "Is predictable, but not distinctive" : "Es predecible pero no diferencia"}</li>
                <li>• {en ? "Delivers a beautiful video" : "Entrega un video bonito"}</li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-amber">Focus Labs</p>
              <ul className="space-y-2 text-sm text-white/70">
                <li>• {en ? "Helps shape the vision" : "Ayuda a crear la visión"}</li>
                <li>• {en ? "Understands your business and audience" : "Entiende tu negocio y audiencia"}</li>
                <li>• {en ? "Creates real business results" : "Genera resultados comerciales reales"}</li>
                <li>• {en ? "Delivers a growth asset" : "Entrega una herramienta de crecimiento"}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24 lg:px-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl">{en ? "Our Most Important Deliverable Is Trust" : "Nuestro Principal Entregable es la Confianza"}</h2>
            <p className="mt-6 text-white/80">
              {en ? "Great work does not begin with a camera; it begins with intention. Behind every project is someone trusting us with something personal: their dream, business, or legacy." : "El gran trabajo no comienza con una cámara; comienza con intención. Detrás de cada proyecto hay alguien confiándonos algo personal: su sueño, su negocio o su legado."}
            </p>
            <p className="mt-4 text-white/80">
              {en ? "We draw out authentic performances by creating a controlled, high-trust environment. We work with discipline, preparation, and clarity. Clients receive more than an extraordinary film; they receive an experience they are proud of." : "Extraemos actuaciones auténticas que no pueden ser forzadas mediante la creación de un entorno controlado y de alta confianza. Trabajamos con disciplina, preparación y claridad. El resultado es que los clientes no solo obtienen un video extraordinario; obtienen una experiencia de la que se sienten orgullosos."}
            </p>
          </div>

          <div className="border-t border-white/10 pt-8">
            <p className="text-sm text-amber">{en ? "How We Build Trust" : "Cómo Construimos Confianza"}</p>
            <div className="mt-6 space-y-4 text-sm text-white/80">
              <p><strong>{en ? "1. We Listen First" : "1. Escuchamos Primero"}</strong> — {en ? "We understand your real objective; we do not assume." : "Entendemos tu objetivo real, no asumimos."}</p>
              <p><strong>{en ? "2. We Plan Together" : "2. Planificamos Juntos"}</strong> — {en ? "You define the vision; we make it achievable." : "Defines la visión, nosotros la aseguramos."}</p>
              <p><strong>{en ? "3. We Execute Seamlessly" : "3. Ejecutamos sin Fricción"}</strong> — {en ? "Everything is ready; nothing feels chaotic." : "Todo está listo, nada es caótico."}</p>
              <p><strong>{en ? "4. We Deliver with Pride" : "4. Entregamos con Orgullo"}</strong> — {en ? "It is not just a video; it is an asset." : "No es ‘un video’, es un activo."}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-charcoal">
        <div className="mx-auto max-w-4xl px-6 py-24 lg:px-12">
          <p className="text-center text-sm text-amber">{en ? "Next Step" : "Próximo Paso"}</p>
          <p className="mt-6 text-center text-white/80">
            {en ? "Have a project in mind? We can help you define the right strategy for your brand." : "¿Tienes un proyecto en mente? Podemos ayudarte a definir la estrategia correcta para tu marca."}
          </p>
        </div>
      </section>

      <section className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-24 text-center lg:px-12">
        <Button href="/servicios">{en ? "Explore Services" : "Explorar Servicios"}</Button>
        <Button href="/filosofia" variant="outline">{en ? "Our Philosophy" : "Conocer Nuestra Filosofía"}</Button>
        <Button href="/contacto" variant="outline">{en ? "Contact Us" : "Contactar"}</Button>
      </section>
    </>
  );
}
