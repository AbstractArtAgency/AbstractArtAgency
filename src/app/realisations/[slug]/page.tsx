import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RealisationDetail from "@/src/components/landing/RealisationDetail";
import { getRealisationBySlug, getRealisations } from "@/src/lib/realisations";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const realisations = await getRealisations();
  return realisations.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const realisation = await getRealisationBySlug(slug);
  if (!realisation) return {};
  return {
    title: `${realisation.title} — Realizacje AbstractArt`,
    description: realisation.summary,
  };
}

export default async function RealisationPage({ params }: Props) {
  const { slug } = await params;
  const realisation = await getRealisationBySlug(slug);
  if (!realisation) notFound();
  return <RealisationDetail realisation={realisation} />;
}
