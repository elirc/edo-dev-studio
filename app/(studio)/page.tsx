import Image from "next/image";
import Link from "next/link";
import { Asterisk, Arrow } from "@/components/icons";
import {
  ContactBand,
  Eyebrow,
  Faq,
  Process,
  ProjectCard,
} from "@/components/ui";
import { guides, projects, pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Siti web per ristoranti indipendenti",
  "Siti web curati per ristoranti indipendenti: identità, menu, prenotazioni e presenza locale. Un progetto seguito da Edoardo, dall’inizio alla fine.",
  "/",
);

export default function HomePage() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <Eyebrow>Siti web per ristoranti indipendenti</Eyebrow>
          <h1>
            Il tuo ristorante,
            <br />
            già dal
            <br />
            <em>primo sguardo.</em>
          </h1>
          <p>
            Porto online il carattere del tuo locale.
            <br className="desktop-break" /> Con un sito curato, un menu facile
            da leggere
            <br className="desktop-break" /> e una strada semplice per
            prenotare.
          </p>
          <div className="actions">
            <Link href="/contatti" className="button button-dark">
              Parliamo del tuo locale <Arrow diagonal />
            </Link>
            <Link href="/lavori" className="text-link">
              Guarda i concept <Arrow />
            </Link>
          </div>
          <div className="hero-signature">
            <span className="signature-mark">e.</span>
            <span>
              Un progetto, un interlocutore.
              <br />
              <strong>Sono Edoardo. Piacere di conoscerti.</strong>
            </span>
          </div>
        </div>
        <div className="hero-art">
          <div className="hero-photo">
            <Image
              src="/images/restaurant-interior.webp"
              alt="Concept: una sala raccolta, tavoli in legno e luce calda, per immaginare il sito di una trattoria"
              fill
              priority
              sizes="(max-width: 700px) 100vw, 52vw"
            />
            <div className="hero-photo-shade" />
            <div className="hero-photo-top">
              <span>CASA LINO</span>
              <span>CUCINA, CASA, CONVIVIO</span>
            </div>
            <div className="hero-photo-title">
              L’ospitalità
              <br />
              inizia <em>qui.</em>
            </div>
            <div className="hero-photo-bottom">
              <span>Una tavola da condividere.</span>
              <Asterisk />
            </div>
          </div>
          <Link href="/lavori/casa-lino" className="hero-caption">
            <span>
              <span className="concept-dot" /> CASA LINO — CONCEPT DI DESIGN
            </span>
            <span>
              Esplora <Arrow diagonal />
            </span>
          </Link>
          <span className="hero-side-note">IDENTITÀ. MENU. PRENOTAZIONI.</span>
        </div>
      </section>
      <div className="intro-strip">
        <div className="container">
          <span>Il carattere del locale.</span>
          <Asterisk />
          <span>Le informazioni che servono.</span>
          <Asterisk />
          <span>Il piacere di prenotare.</span>
        </div>
      </div>
      <section className="section section-work container">
        <div className="section-heading">
          <div>
            <Eyebrow>Il design, messo a tavola</Eyebrow>
            <h2>
              Ogni locale ha una storia.
              <br />
              <em>Il sito dovrebbe somigliargli.</em>
            </h2>
          </div>
          <p>
            Due direzioni diverse per mostrare come lavoro su atmosfera,
            contenuti e percorsi. Concept dimostrativi, con immagini originali
            generate: non progetti commissionati.
          </p>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>
      <section className="service-section">
        <div className="container service-section-grid">
          <div>
            <Eyebrow light>Cosa faccio</Eyebrow>
            <h2>
              Bello da vedere.
              <br />
              <em>Semplice da usare.</em>
            </h2>
            <p>
              Chi arriva sul sito vuole capire che posto è, leggere il menu e
              organizzare una serata. Progetto tutto intorno a questi gesti.
            </p>
            <Link href="/servizi" className="text-link light-link">
              Scopri cosa comprende il progetto <Arrow />
            </Link>
            <div className="service-decoration">
              <Asterisk />
              <span>
                La cura si vede
                <br />
                anche nei dettagli.
              </span>
            </div>
          </div>
          <div className="service-rows">
            {[
              [
                "01",
                "Un’identità riconoscibile",
                "Fotografie, parole e impaginazione che raccontano la cucina e l’atmosfera del locale.",
              ],
              [
                "02",
                "Il menu, subito leggibile",
                "Piatti e prezzi chiari anche sul telefono, senza dover ingrandire una pagina o cercare un file.",
              ],
              [
                "03",
                "Una prenotazione senza giri",
                "Il sistema che usi, collegato al sito. Oppure un percorso da scegliere insieme, adatto alla sala.",
              ],
              [
                "04",
                "Le basi per farsi trovare",
                "Pagine ben organizzate, informazioni locali coerenti e indicazioni per il tuo profilo su Google.",
              ],
            ].map(([number, title, body]) => (
              <article key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
                <Arrow diagonal />
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section container" id="metodo">
        <div className="section-heading">
          <div>
            <Eyebrow>Come lavoriamo</Eyebrow>
            <h2>
              Dal primo confronto
              <br />
              <em>al sito online.</em>
            </h2>
          </div>
          <p>
            Parli direttamente con chi progetta e realizza il sito. Priorità,
            costi e passaggi sono chiari prima di cominciare.
          </p>
        </div>
        <Process />
        <div className="process-bottom">
          <span>
            Niente passaggi di mano. Ci sono io, dall’inizio alla fine.
          </span>
          <Link className="text-link" href="/chi-sono">
            Conosci Edoardo <Arrow />
          </Link>
        </div>
      </section>
      <section className="founder-note container">
        <div className="founder-monogram" aria-hidden="true">
          e<span>.</span>
        </div>
        <div>
          <Eyebrow>Una persona, dietro ogni pagina</Eyebrow>
          <h2>
            «Prima di disegnare il sito,
            <br />
            <em>voglio capire il tuo locale.»</em>
          </h2>
          <p>
            Mi chiamo Edoardo. Seguo di persona il progetto, dalle prime idee
            fino alla pubblicazione. Il mio lavoro è dare una forma chiara a
            quello che rende riconoscibile il tuo ristorante.
          </p>
          <Link className="text-link" href="/chi-sono">
            Due parole su di me <Arrow />
          </Link>
        </div>
      </section>
      <section className="section container faq-section">
        <div>
          <Eyebrow>Prima di iniziare</Eyebrow>
          <h2>
            Mettiamo tutto
            <br />
            <em>in chiaro.</em>
          </h2>
          <p>
            Le risposte alle prime domande.
            <br />
            Per le altre, ci sono io.
          </p>
        </div>
        <Faq />
      </section>
      <section className="guide-section container">
        <div className="section-heading compact-heading">
          <div>
            <Eyebrow>Appunti utili</Eyebrow>
            <h2>
              Per chi tiene
              <br />
              <em>al proprio locale.</em>
            </h2>
          </div>
          <Link href="/guide" className="text-link">
            Tutte le guide <Arrow />
          </Link>
        </div>
        <div className="guide-grid">
          {guides.map((guide) => (
            <Link
              className="guide-card"
              href={`/guide/${guide.slug}`}
              key={guide.slug}
            >
              <div>
                <span className="micro">{guide.category}</span>
                <Arrow diagonal />
              </div>
              <h3>{guide.title}</h3>
              <span className="guide-time">{guide.time} di lettura</span>
            </Link>
          ))}
        </div>
      </section>
      <ContactBand />
    </>
  );
}
