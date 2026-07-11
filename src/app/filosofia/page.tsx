import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Filosofía — Por Qué Existimos",
  description:
    "Conoce la filosofía, propósito, misión y visión de Focus Labs Media Group: transformar la imaginación en experiencias que la gente puede ver, escuchar y sentir.",
  alternates: { canonical: "/filosofia" },
};

const PRINCIPLES = [
  {
    title: "Intencionalidad",
    description:
      "Todo comienza con un propósito. La intención crea claridad, y la claridad crea confianza.",
    expanded:
      "No producimos contenido porque es 'la tendencia' o porque 'hay que estar en video'. Cada proyecto existe porque hay una razón estratégica detrás. Sabemos exactamente qué quieres comunicar, a quién le quieres comunicar, y cuál es el cambio de percepción que buscas. Esa claridad se transmite a todo: desde cómo planificamos hasta cómo te guiamos en el set.",
  },
  {
    title: "Conexión Humana",
    description:
      "Las personas siempre importarán más que el proyecto. La cámara nunca es lo más importante en la habitación.",
    expanded:
      "Hemos visto productores excelentes crear trabajos técnicamente perfectos pero emocionalmente vacíos. Nosotros prioridades diferente. Entendemos que detrás de cada proyecto hay una persona vulnerable: está siendo expuesta, está invirtiendo dinero, está confiando en nosotros con algo que le importa. Por eso el set es un lugar cómodo, no frenético. Por eso escuchamos más que hablamos. Por eso el cliente se siente cuidado.",
  },
  {
    title: "Disciplina",
    description:
      "La excelencia no es un accidente; se construye a través de la preparación y la consistencia.",
    expanded:
      "La falsa libertad creativa es improvisación. La verdadera libertad creativa es tener un plan tan sólido que puedes permitirte ser flexible dentro de él. Nos preparamos exhaustivamente: cada equipo es probado, cada transición es planeada, cada rol es claro. Esto no sofoca la creatividad; la libera. Porque cuando todo está preparado, tenemos energía mental para capturar momentos genuinos, para adaptar la visión en tiempo real, para responder a lo inesperado.",
  },
  {
    title: "Humildad",
    description:
      "Nos mantenemos curiosos y escuchamos con atención. La confianza habla, la humildad escucha.",
    expanded:
      "Sabemos que no somos los expertos en tu industria. Tú eres. Así que llegamos con preguntas, no con respuestas. ¿Qué sabe tu audiencia que nadie más sabe? ¿Cuál es el desafío más profundo que tu cliente enfrenta? ¿Qué verdad necesita ser dicha? La humildad es lo que nos permite ser verdaderamente consultores, no solo productores que ejecutan briefs.",
  },
  {
    title: "Experiencia Extraordinaria",
    description:
      "Entregamos experiencias de las que cada cliente se sentirá orgulloso y seguro.",
    expanded:
      "Un video es un entregable. Una experiencia es memorable. Cuando termina un proyecto con nosotros, el cliente tiene un video extraordinario, sí. Pero también tiene la memoria de un proceso sin estrés. De un equipo que entendía su visión. De una colaboración donde se sintió escuchado. Eso es lo que genera recomendaciones. Eso es lo que genera futuros proyectos. No es el video. Es cómo se sintieron durante el viaje.",
  },
];

export default function FilosofiaPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-32 lg:px-12">
      <SectionHeading eyebrow="Capítulo Uno" title="Cada Historia Merece Intención" />

      <div className="mt-16 space-y-8">
        <p>
          Creemos que cada persona, marca e idea tiene el potencial de dejar
          un impacto duradero. Nuestro propósito es transformar la
          imaginación en algo que la gente pueda ver, escuchar y sentir. No
          solo producimos contenido; damos a las ideas un lugar para existir.
        </p>
      </div>

      <div className="mt-24 grid gap-16 border-t border-white/10 pt-16 md:grid-cols-2">
        <div>
          <h2 className="text-sm text-amber">Nuestra Misión</h2>
          <p className="mt-2 text-xs tracking-widest uppercase text-gray">
            Lo Que Hacemos Cada Día
          </p>
          <p className="mt-6 text-white/80">
            Crear experiencias visuales que hagan que las personas se sientan
            vistas, valoradas y extraordinarias. Combinamos creatividad,
            estrategia y disciplina para producir películas y fotografías con
            claridad y emoción.
          </p>
        </div>

        <div>
          <h2 className="text-sm text-amber">Nuestra Visión</h2>
          <p className="mt-2 text-xs tracking-widest uppercase text-gray">
            Hacia Dónde Vamos
          </p>
          <p className="mt-6 text-white/80">
            Ser reconocidos no solo por la calidad de nuestro trabajo, sino
            por cómo se sienten las personas después de trabajar con
            nosotros. Aspiramos a ser el hogar de ideas significativas donde
            la imaginación sea respetada.
          </p>
        </div>
      </div>

      <div className="mt-24 border-t border-white/10 pt-16">
        <h2 className="text-center text-3xl">Los Principios Que Nos Guían</h2>

        <div className="mt-12 space-y-8">
          {PRINCIPLES.map((principle) => (
            <div key={principle.title} className="border-b border-white/10 pb-8 last:border-b-0">
              <h3 className="text-lg text-amber">{principle.title}</h3>
              <p className="mt-3 text-sm text-white/70">{principle.description}</p>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                {principle.expanded}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
