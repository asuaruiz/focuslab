import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { CaseStudy } from "@/lib/types";

type Props = { params: { slug: string } };

export const revalidate = 3600;

async function getCaseStudy(slug: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from("focuslab_case_studies")
    .select("*")
    .eq("slug", slug)
    .maybeSingle<CaseStudy>();

  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const caseStudy = await getCaseStudy(params.slug);
  if (!caseStudy) return {};

  return {
    title: caseStudy.title,
    description: caseStudy.client_context.slice(0, 155),
    alternates: { canonical: `/casos-de-estudio/${caseStudy.slug}` },
    openGraph: {
      images: [{ url: caseStudy.cover_image_url }],
    },
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const caseStudy = await getCaseStudy(params.slug);
  if (!caseStudy) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-32 lg:px-12">
      <h1 className="text-3xl md:text-5xl">{caseStudy.title}</h1>

      {caseStudy.video_url && (
        <video
          className="mt-12 w-full"
          controls
          preload="none"
          poster={caseStudy.cover_image_url}
        >
          <source src={caseStudy.video_url} type="video/mp4" />
        </video>
      )}

      <div className="mt-16 space-y-12 border-t border-white/10 pt-12">
        <section>
          <h2 className="text-sm text-amber">Contexto</h2>
          <p className="mt-4 text-white/80">{caseStudy.client_context}</p>
        </section>
        <section>
          <h2 className="text-sm text-amber">Conflicto</h2>
          <p className="mt-4 text-white/80">{caseStudy.conflict}</p>
        </section>
        <section>
          <h2 className="text-sm text-amber">Transformación</h2>
          <p className="mt-4 text-white/80">{caseStudy.transformation}</p>
        </section>
        <section>
          <h2 className="text-sm text-amber">Resolución</h2>
          <p className="mt-4 text-white/80">{caseStudy.resolution}</p>
        </section>
      </div>
    </div>
  );
}
