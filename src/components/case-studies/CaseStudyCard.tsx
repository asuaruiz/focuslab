import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/types";
import type { Locale } from "@/lib/i18n";

export default function CaseStudyCard({ caseStudy, locale }: { caseStudy: CaseStudy; locale: Locale }) {
  return (
    <Link
      href={`/casos-de-estudio/${caseStudy.slug}`}
      className="group relative block aspect-[2/3] w-full overflow-hidden bg-charcoal"
    >
      <Image
        src={caseStudy.cover_image_url}
        alt={locale === "en" ? `Featured frame from the ${caseStudy.title} case study` : `Fotograma destacado del caso de estudio ${caseStudy.title}`}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover opacity-90 transition-all duration-500 ease-out group-hover:scale-105 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="text-lg leading-snug">{caseStudy.title}</h3>
      </div>
    </Link>
  );
}
