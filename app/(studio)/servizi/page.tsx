import Link from "next/link";
import { ContactBand, Eyebrow, Faq, PageIntro, Process } from "@/components/ui";
import { Arrow } from "@/components/icons";
import { pageMeta } from "@/lib/site";
export const metadata = pageMeta(
  "Siti web per ristoranti: cosa comprende il progetto",
  "Identità, menu, prenotazioni e presenza locale. Scopri il progetto di un sito per ristoranti, gli extra e come viene definito il preventivo.",
  "/servizi",
);
export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Cosa faccio"
        title="Un sito pensato per il locale."
        italic="E per chi lo sceglie."
      >
        <p>
          Dal modo in cui ti presenti al momento in cui qualcuno prenota. Metto
          insieme design, contenuti e funzionalità in un progetto curato di
          persona.
        </p>
        <Link href="/contatti" className="button button-dark">
          Raccontami il tuo progetto <Arrow diagonal />
        </Link>
      </PageIntro>
      <section className="container service-detail-list">
        {[
          [
            "01",
            "Il carattere del ristorante, online.",
            "Design e contenuti",
            "Partiamo dall’identità del locale: cucina, atmosfera, persone e pubblico. Scelgo con te come raccontarla attraverso pagine, fotografie e parole.",
            [
              "Struttura delle pagine e priorità dei contenuti",
              "Design su misura per desktop e telefono",
              "Revisione e organizzazione di testi e fotografie",
            ],
          ],
          [
            "02",
            "Tutto quello che cercano, a portata di mano.",
            "Menu e prenotazioni",
            "Orari, menu e prenotazioni devono essere facili da trovare. Progetto un percorso semplice e verifico come collegarlo al lavoro della sala.",
            [
              "Menu consultabile su telefono",
              "Collegamento al sistema di prenotazione scelto",
              "Orari, indicazioni e contatti sempre accessibili",
            ],
          ],
          [
            "03",
            "Le fondamenta di una presenza curata.",
            "Pubblicazione e presenza locale",
            "Preparo il sito per la pubblicazione, controllo le pagine e organizzo le informazioni che aiutano persone e motori di ricerca a capirlo.",
            [
              "Immagini ottimizzate e verifiche sui dispositivi",
              "Titoli, descrizioni, dati strutturati e sitemap",
              "Indicazioni per Google Business Profile e Search Console",
            ],
          ],
          [
            "04",
            "Il sito continua a vivere dopo il lancio.",
            "Consegna e gestione",
            "Definiamo come aggiornare il menu e chi si occupa del sito. Ricevi gli accessi e le indicazioni necessarie, con eventuale assistenza concordata a parte.",
            [
              "Pubblicazione sul dominio concordato",
              "Consegna degli accessi e istruzioni pratiche",
              "Costi ricorrenti e responsabilità messi per iscritto",
            ],
          ],
        ].map(([number, title, label, body, points]) => (
          <article className="service-detail" key={number as string}>
            <span className="detail-number">{number}</span>
            <div>
              <span className="micro">{label}</span>
              <h2>{title}</h2>
            </div>
            <div>
              <p>{body}</p>
              <ul className="check-list">
                {(points as string[]).map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>
      <section className="section container extras-section">
        <div>
          <Eyebrow>Solo se servono</Eyebrow>
          <h2>
            Gli extra si scelgono.
            <br />
            <em>Non si aggiungono per forza.</em>
          </h2>
        </div>
        <div className="extras-grid">
          <article>
            <h3>Più lingue</h3>
            <p>
              Per accogliere chi visita il locale dall’estero. Lingue,
              traduzioni e gestione dei contenuti da concordare.
            </p>
          </article>
          <article>
            <h3>Aggiornamenti e assistenza</h3>
            <p>
              Per chi preferisce delegare menu, nuovi contenuti e manutenzione
              con un accordo dedicato.
            </p>
          </article>
          <article>
            <h3>Fotografie e identità</h3>
            <p>
              Valutiamo i materiali esistenti e prepariamo un brief per
              eventuali fotografie professionali o nuovi elementi visivi.
            </p>
          </article>
          <article>
            <h3>Misurazione e integrazioni</h3>
            <p>
              Statistiche e strumenti esterni scelti in base a un’esigenza
              concreta, con costi e limiti esplicitati.
            </p>
          </article>
        </div>
      </section>
      <section className="pricing-section" id="preventivo">
        <div className="container pricing-inner">
          <div>
            <Eyebrow light>Una proposta chiara</Eyebrow>
            <h2>
              Prima di partire,
              <br />
              <em>sai cosa stai scegliendo.</em>
            </h2>
          </div>
          <div>
            <p>
              Ogni locale parte da una situazione diversa. Per questo il prezzo
              viene definito dopo un primo confronto, con un preventivo gratuito
              e senza impegno.
            </p>
            <ul className="check-list">
              <li>Costo del progetto e attività comprese</li>
              <li>Eventuali extra, indicati separatamente</li>
              <li>Dominio, hosting e servizi esterni</li>
              <li>Tempi, revisioni e modalità di pagamento</li>
            </ul>
            <Link className="button button-cream" href="/contatti">
              Parliamo del preventivo <Arrow diagonal />
            </Link>
          </div>
        </div>
      </section>
      <section className="section container" id="metodo">
        <Eyebrow>Il percorso</Eyebrow>
        <h2>
          Quattro passaggi.
          <br />
          <em>Un confronto continuo.</em>
        </h2>
        <Process />
      </section>
      <section className="section container faq-section">
        <div>
          <Eyebrow>Domande frequenti</Eyebrow>
          <h2>
            Prima di
            <br />
            <em>mettersi al lavoro.</em>
          </h2>
        </div>
        <Faq all />
      </section>
      <ContactBand />
    </>
  );
}
