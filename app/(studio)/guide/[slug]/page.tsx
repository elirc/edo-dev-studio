import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactBand, Eyebrow } from "@/components/ui";
import { guides, findGuide, pageMeta, site } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import { socialImage } from "@/lib/metadata";
export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = findGuide(slug);
  if (!guide) notFound();
  return pageMeta(guide.title, guide.description, `/guide/${slug}`, "article");
}
export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = findGuide(slug);
  if (!guide) notFound();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    author: {
      "@type": "Person",
      "@id": `${site.url}/#edoardo`,
      name: site.founder,
      url: `${site.url}/chi-sono`,
    },
    publisher: { "@id": `${site.url}/#studio` },
    image: socialImage.url,
    mainEntityOfPage: `${site.url}/guide/${guide.slug}`,
    inLanguage: "it-IT",
  };
  return (
    <>
      <article className="container article-page">
        <Link className="back-link" href="/guide">
          ← Tutte le guide
        </Link>
        <header>
          <Eyebrow>
            {guide.category} · {guide.time} di lettura
          </Eyebrow>
          <h1>{guide.title}</h1>
          <p className="article-deck">{guide.description}</p>
          <span className="article-author">A cura di Edoardo · edo-dev</span>
        </header>
        <div className="article-body">
          {guide.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}
          {guide.source && (
            <aside className="article-source">
              <span className="micro">PER APPROFONDIRE</span>
              <a
                href={guide.source.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {guide.source.label} ↗
              </a>
            </aside>
          )}
          <aside className="article-next">
            <h3>Guardiamo il tuo sito, insieme.</h3>
            <p>
              Se vuoi capire da dove partire nel tuo caso,{" "}
              <Link href="/contatti">raccontami del locale</Link>.
            </p>
          </aside>
        </div>
      </article>
      <ContactBand />
      <JsonLd data={schema} />
    </>
  );
}
