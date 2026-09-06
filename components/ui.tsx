import Image from "next/image";
import Link from "next/link";
import { Asterisk, Arrow } from "./icons";
import { faqs, site, type Project } from "@/lib/site";

export function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>
      <span />
      {children}
    </p>
  );
}
export function ContactBand() {
  return (
    <section className="contact-band">
      <div className="container contact-band-inner">
        <div>
          <Eyebrow light>Il prossimo passo</Eyebrow>
          <h2>
            Partiamo dal
            <br />
            <em>tuo ristorante.</em>
          </h2>
          <p>
            Mi racconti il locale. Guardiamo cosa serve al sito.
            <br />
            Poi decidiamo insieme da dove cominciare.
          </p>
          <div className="actions">
            <Link className="button button-cream" href="/contatti">
              Parliamone <Arrow diagonal />
            </Link>
            <a className="text-link light-link" href={`mailto:${site.email}`}>
              Oppure scrivimi <Arrow />
            </a>
          </div>
        </div>
        <div className="contact-band-mark" aria-hidden="true">
          <Asterisk />
          <span>
            Buone cose
            <br />
            iniziano a tavola.
          </span>
        </div>
      </div>
    </section>
  );
}
export function Faq({ all = false }: { all?: boolean }) {
  return (
    <div className="faq-list">
      {faqs.slice(0, all ? undefined : 4).map((item, index) => (
        <details key={item.question}>
          <summary>
            <span className="faq-number">0{index + 1}</span>
            {item.question}
            <span className="faq-plus" aria-hidden="true">
              +
            </span>
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
export function PageIntro({
  eyebrow,
  title,
  italic,
  children,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-intro container">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1>
        {title}
        {italic && (
          <>
            <br />
            <em>{italic}</em>
          </>
        )}
      </h1>
      {children && <div className="intro-copy">{children}</div>}
    </section>
  );
}

export function ProjectPreview({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  return (
    <div
      className={`project-visual ${project.color} ${compact ? "compact" : ""}`}
    >
      <div className="mock-browser">
        <div className="browser-bar">
          <span>
            <i />
            <i />
            <i />
          </span>
          <span>{project.slug}.example</span>
          <span aria-hidden="true">↗</span>
        </div>
        <div className="mock-site">
          <div className="mock-nav">
            <span>
              {project.demo.wordmark}
              <small>{project.demo.descriptor}</small>
            </span>
            <span>
              La cucina &nbsp; Il menu &nbsp; <b>Prenota un tavolo ↗</b>
            </span>
          </div>
          <div className="mock-content">
            <div className="mock-copy">
              <small>{project.demo.kicker}</small>
              <strong>
                {project.demo.headline[0]}
                <br />
                <em>{project.demo.headline[1]}</em>
              </strong>
              <span className="mock-button">
                Un posto a tavola <Arrow diagonal />
              </span>
            </div>
            <div className="mock-photo">
              <Image
                src={project.image}
                alt=""
                fill
                sizes="(max-width: 700px) 70vw, 45vw"
              />
            </div>
          </div>
          <div className="mock-bottom">
            <span>{project.demo.mockNote}</span>
            <span>Scopri il menu ↓</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Card used in project grids. `headingLevel` keeps the document outline valid:
 * use "h2" when the card sits directly under the page h1 (e.g. /lavori).
 */
export function ProjectCard({
  project,
  index,
  headingLevel: Heading = "h3",
}: {
  project: Project;
  index: number;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <article className="project-card">
      <Link
        href={`/lavori/${project.slug}`}
        className="project-image-link"
        aria-label={`Scopri ${project.name}, concept di ${project.category.toLowerCase()}`}
      >
        <ProjectPreview project={project} />
        <span className="project-hover">
          <Arrow diagonal />
        </span>
      </Link>
      <div className="project-caption">
        <div>
          <span className="micro">0{index + 1} / CONCEPT DI DESIGN</span>
          <Heading>
            <Link href={`/lavori/${project.slug}`}>{project.name}</Link>
          </Heading>
          <p>{project.category}</p>
        </div>
        <Link
          href={`/lavori/${project.slug}`}
          className="circle-link"
          aria-label={`Scopri il concept ${project.name}`}
        >
          <Arrow diagonal />
        </Link>
      </div>
    </article>
  );
}

export function Process() {
  return (
    <div className="process-grid">
      {[
        [
          "Ci conosciamo.",
          "Mi racconti il locale, il pubblico e il modo in cui lavori. Guardiamo il sito attuale e mettiamo a fuoco le priorità.",
        ],
        [
          "Diamo una forma alle idee.",
          "Ricevi una proposta chiara. Definiamo contenuti, fotografie e struttura, poi puoi vedere e discutere il design.",
        ],
        [
          "Prepariamo ogni dettaglio.",
          "Costruisco il sito, collego le prenotazioni e verifico pagine, menu e contatti sui diversi dispositivi.",
        ],
        [
          "Si va online, insieme.",
          "Pubblichiamo sul tuo dominio. Ti consegno accessi e istruzioni; scegliamo come gestire gli aggiornamenti.",
        ],
      ].map(([title, text], i) => (
        <article key={title}>
          <span className="process-number">0{i + 1}</span>
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </div>
  );
}
