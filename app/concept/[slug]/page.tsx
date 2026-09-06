import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RestaurantDemo } from "@/components/restaurant-demo";
import { findProject, pageMeta, projects } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();
  return {
    ...pageMeta(
      `${project.name} — concept dimostrativo`,
      "Un sito per un ristorante immaginario, progettato da edo-dev. Esplora il menu e il percorso di prenotazione dimostrativo.",
      `/concept/${slug}`,
    ),
    robots: { index: false, follow: true },
  };
}

export default async function ConceptPage({ params }: Params) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();
  return <RestaurantDemo project={project} />;
}
