import Button from "@/components/ui/Button";
import type { Locale } from "@/lib/i18n";

// Public Supabase Storage URL, e.g. Storage bucket "media" > "hero-reel.mp4"
const HERO_VIDEO_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/hero-reel.mp4`;
const HERO_POSTER_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/hero-poster.jpg`;

export default function HeroSection({ locale }: { locale: Locale }) {
  const en = locale === "en";
  return (
    <section className="relative flex h-screen min-h-[720px] w-full items-center justify-center overflow-hidden bg-black">
      {/* Background video — cinematic, muted, looping */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster={HERO_POSTER_URL}
        aria-hidden="true"
      >
        <source src={HERO_VIDEO_URL} type="video/mp4" />
      </video>

      {/* Darkening overlay to preserve text contrast over footage */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 text-center">
        <span className="font-heading text-xs tracking-widest uppercase text-amber">
          Focus Labs Media Group
        </span>

        <h1 className="text-4xl leading-tight md:text-6xl">
          {en ? "We transform imagination into meaningful experiences" : "Transformamos la imaginación en experiencias significativas"}
        </h1>

        <p className="max-w-2xl text-base text-white/80 md:text-lg">
          {en ? "Photography, film, and brand strategy for those seeking more than a casual videographer: a strategic asset built to scale their influence." : "Fotografía, cine y estrategia de marca para quienes no buscan un videógrafo casual, sino un activo estratégico para escalar su influencia."}
        </p>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <Button href="/contacto">{en ? "Start a Project" : "Iniciar un Proyecto"}</Button>
          <Button href="/casos-de-estudio" variant="outline">
            {en ? "View Case Studies" : "Ver Casos de Estudio"}
          </Button>
        </div>
      </div>
    </section>
  );
}
