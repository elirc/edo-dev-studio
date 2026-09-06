import { ContactBand, PageIntro, ProjectCard } from "@/components/ui";
import { pageMeta, projects } from "@/lib/site";
export const metadata = pageMeta(
  "Lavori e concept per la ristorazione",
  "Due concept originali mostrano l’approccio di edo-dev a identità, menu e prenotazioni. Esempi dimostrativi, chiaramente distinti dai lavori per clienti.",
  "/lavori",
);
export default function WorkPage() {
  return (
    <>
      <PageIntro
        eyebrow="Lavori / esplorazioni"
        title="La cura si vede."
        italic="Anche prima di conoscerci."
      >
        <p>
          Qui puoi esplorare due direzioni di design per la ristorazione. Un
          modo concreto per capire il mio approccio, dai primi contenuti ai
          dettagli sul telefono.
        </p>
      </PageIntro>
      <section className="container work-index">
        <aside className="transparency-note">
          <span className="concept-dot" />
          <p>
            <strong>Due concept, dichiarati.</strong> Casa Lino e Onda sono
            ristoranti immaginari. Interfacce e immagini generate sono materiale
            dimostrativo originale, non lavori commissionati. Non vengono
            attribuiti clienti, testimonianze o risultati commerciali.
          </p>
        </aside>
        <div className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              headingLevel="h2"
            />
          ))}
        </div>
      </section>
      <ContactBand />
    </>
  );
}
