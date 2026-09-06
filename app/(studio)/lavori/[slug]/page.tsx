import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactBand, Eyebrow, ProjectPreview } from "@/components/ui";
import { Arrow } from "@/components/icons";
import { findProject, pageMeta, projects } from "@/lib/site";
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();
  return pageMeta(
    `${project.name}: concept per ${project.category.toLowerCase()}`,
    project.description,
    `/lavori/${slug}`,
  );
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();
  const otherProject = projects.find((item) => item.slug !== slug) ?? project;
  return (
    <>
      <section className="container project-intro">
        <Link className="back-link" href="/lavori">
          ← Tutti i concept
        </Link>
        <div className="project-title-row">
          <div>
            <Eyebrow>Concept di design · {project.category}</Eyebrow>
            <h1>
              {project.name}
              <span>.</span>
            </h1>
          </div>
          <Link
            href={`/concept/${project.slug}`}
            className="button button-dark"
          >
            Esplora il sito demo <Arrow diagonal />
          </Link>
        </div>
        <p className="project-lead">{project.tagline}</p>
      </section>
      <section className="container project-showcase">
        <ProjectPreview project={project} />
        <aside className="transparency-note">
          <span className="concept-dot" />
          <p>
            <strong>Progetto dimostrativo.</strong> Il ristorante è immaginario.
            Interfaccia e immagini generate sono materiale originale di
            esplorazione: non rappresentano un incarico cliente né risultati
            misurati. La demo non raccoglie prenotazioni.
          </p>
        </aside>
      </section>
      <section className="section container case-description">
        <div>
          <Eyebrow>La direzione</Eyebrow>
          <h2>
            Un’idea di ospitalità.
            <br />
            <em>Una forma precisa.</em>
          </h2>
        </div>
        <div>
          <p>{project.description}</p>
          <ul className="check-list">
            {project.focus.map((focus) => (
              <li key={focus}>{focus}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="container case-points">
        {[
          [
            "Atmosfera, prima delle spiegazioni",
            "La prima schermata racconta il tipo di locale con la fotografia, il tono e la scelta dei caratteri. Le informazioni pratiche restano vicine.",
          ],
          [
            "Il menu non è un allegato",
            "Le categorie sono parte della pagina e i piatti si leggono senza zoom. La demo mostra un menu breve per provare il percorso da telefono.",
          ],
          [
            "Una strada per prenotare",
            "Un richiamo visibile porta al percorso dimostrativo. In un progetto reale il servizio si sceglie con il ristoratore, in base alle abitudini della sala.",
          ],
        ].map(([title, body], i) => (
          <article key={title}>
            <span className="micro">0{i + 1} / SCELTA DI PROGETTO</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </section>
      <div className="container project-demo-cta">
        <Link href={`/concept/${project.slug}`} className="button button-dark">
          Prova la demo di {project.name} <Arrow diagonal />
        </Link>
        <Link className="text-link" href={`/lavori/${otherProject.slug}`}>
          Esplora l’altro concept <Arrow />
        </Link>
      </div>
      <ContactBand />
    </>
  );
}
