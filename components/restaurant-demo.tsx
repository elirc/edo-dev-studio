import Image from "next/image";
import Link from "next/link";
import { menuCategories, type Project } from "@/lib/site";
import { Asterisk, Arrow } from "./icons";
import { RestaurantMenu, DemoBooking } from "./restaurant-interactions";

/**
 * The standalone demo site for a fictional restaurant (rendered at /concept/[slug]).
 * All copy, dishes and colours come from `project.demo` in lib/site.ts.
 */
export function RestaurantDemo({ project }: { project: Project }) {
  const { demo, slug, name } = project;

  return (
    <div className={`restaurant-demo demo-${project.color}`}>
      <div className="demo-notice">
        <Link href={`/lavori/${slug}`}>← Torna al progetto</Link>
        <span>
          Concept dimostrativo · Ristorante immaginario · Immagini generate
        </span>
        <Link href="/contatti">
          Un sito per il tuo locale <Arrow diagonal />
        </Link>
      </div>
      <header className="demo-header">
        <Link href={`/concept/${slug}`} className="restaurant-wordmark">
          {demo.wordmark}
          <small>{demo.descriptor}</small>
        </Link>
        <nav aria-label="Navigazione del sito dimostrativo">
          <a href="#la-cucina">La cucina</a>
          <a href="#il-menu">Il menu</a>
          <a className="demo-book-button" href="#prenota">
            Prenota un tavolo <Arrow diagonal />
          </a>
        </nav>
      </header>
      <section className="demo-hero">
        <Image
          src={project.image}
          alt={demo.heroImageAlt}
          fill
          priority
          sizes="100vw"
        />
        <div className="demo-hero-overlay" />
        <div className="demo-hero-copy">
          <span className="micro">{demo.kicker}</span>
          <h1>
            {demo.headline[0]}
            <br />
            <em>{demo.headline[1]}</em>
          </h1>
          <p>{demo.lead}</p>
          <a className="button button-cream" href="#il-menu">
            Scopri il menu <Arrow />
          </a>
        </div>
        <div className="demo-hero-bottom">
          <span>{demo.motto}</span>
          <Asterisk />
        </div>
      </section>
      <section className="demo-story" id="la-cucina">
        <span className="micro">IL PIACERE DELLE COSE SEMPLICI</span>
        <div>
          <h2>
            {demo.story.title[0]}
            <br />
            <em>{demo.story.title[1]}</em>
          </h2>
          <p>{demo.story.body}</p>
        </div>
      </section>
      <section className="demo-menu" id="il-menu">
        <div className="demo-section-heading">
          <div>
            <span className="micro">DALLA NOSTRA CUCINA</span>
            <h2>
              A tavola,
              <br />
              <em>secondo stagione.</em>
            </h2>
          </div>
          <p>
            Menu e prezzi sono esempi dimostrativi.
            <br />
            Non si riferiscono a un’attività reale.
          </p>
        </div>
        <RestaurantMenu categories={menuCategories} dishes={demo.dishes} />
        <p className="demo-allergen-note">
          Esempio di menu: per un ristorante reale, ingredienti, allergeni e
          disponibilità vanno verificati e pubblicati dal locale.
        </p>
      </section>
      <section className="demo-booking" id="prenota">
        <Asterisk />
        <span className="micro">CI VEDIAMO A TAVOLA</span>
        <h2>
          Il piacere
          <br />
          <em>di esserci.</em>
        </h2>
        <p>
          Questo è un sito dimostrativo: il ristorante non esiste e non è
          possibile prenotare un tavolo.
        </p>
        <DemoBooking />
      </section>
      <footer className="demo-footer">
        <span className="restaurant-wordmark">{demo.wordmark}</span>
        <span>
          Un concept originale di <Link href="/">edo-dev</Link>.<br />
          Non rappresenta un’attività aperta al pubblico.
        </span>
        <Link href={`/lavori/${slug}`}>
          Scopri il progetto {name} <Arrow diagonal />
        </Link>
      </footer>
    </div>
  );
}
