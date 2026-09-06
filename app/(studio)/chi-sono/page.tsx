import Link from "next/link";
import { Asterisk, Arrow } from "@/components/icons";
import { ContactBand, Eyebrow, PageIntro } from "@/components/ui";
import { pageMeta } from "@/lib/site";
export const metadata = pageMeta(
  "Sono Edoardo. Il tuo sito, seguito di persona",
  "Design e realizzazione di siti per ristoranti, con un unico interlocutore. Conosci l’approccio di Edoardo e il modo in cui segue ogni progetto.",
  "/chi-sono",
);
export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="Piacere, Edoardo Triveri"
        title="Ci metto il nome."
        italic="E seguo ogni dettaglio."
      >
        <p>
          edo-dev è il mio progetto: siti web per ristoranti indipendenti,
          pensati per raccontare il locale e rendere semplici le cose che
          contano.
        </p>
      </PageIntro>
      <section className="container about-grid">
        <div
          className="about-type-art"
          aria-label="edo-dev, il progetto di Edoardo"
        >
          <Asterisk />
          <span>
            Una buona
            <br />
            intesa.
            <br />
            <em>
              Un bel
              <br />
              progetto.
            </em>
          </span>
          <small>EDOARDO TRIVERI / EDO-DEV</small>
        </div>
        <div className="about-copy">
          <Eyebrow>Perché la ristorazione</Eyebrow>
          <h2>
            Un locale non è<br />
            <em>uguale all’altro.</em>
          </h2>
          <p>
            Cambia il modo di accogliere, cambia la cucina, cambia il motivo per
            cui qualcuno torna. Mi interessa portare questa differenza sul sito,
            senza perdere di vista chi cerca un menu o vuole prenotare.
          </p>
          <p>
            Mi occupo di progettazione e sviluppo. Per te significa avere un
            interlocutore diretto: la persona con cui parli delle idee è la
            stessa che le costruisce e ne segue i dettagli.
          </p>
          <p>
            Prima di partire, chiarisco cosa serve, cosa possiamo riutilizzare e
            quali materiali mancano. Poi condivido il lavoro nei passaggi
            importanti, così le scelte restano comprensibili.
          </p>
          <Link href="/contatti" className="text-link">
            Conosciamoci <Arrow />
          </Link>
        </div>
      </section>
      <section className="section container">
        <Eyebrow>Come mi piace lavorare</Eyebrow>
        <div className="principles-grid">
          <article>
            <span className="micro">01 / ASCOLTO</span>
            <h3>
              Prima il locale,
              <br />
              poi il layout.
            </h3>
            <p>
              La proposta parte dal tipo di cucina, dal pubblico e dal modo in
              cui gestisci il lavoro. La forma viene dopo.
            </p>
          </article>
          <article>
            <span className="micro">02 / CHIAREZZA</span>
            <h3>
              Le scelte hanno
              <br />
              una ragione.
            </h3>
            <p>
              Ti spiego perché propongo una pagina, un contenuto o uno
              strumento. Costi e responsabilità si definiscono prima.
            </p>
          </article>
          <article>
            <span className="micro">03 / CURA</span>
            <h3>
              Il telefono conta
              <br />
              quanto lo schermo grande.
            </h3>
            <p>
              Controllo il sito nei contesti in cui verrà usato. Menu, testi,
              immagini e contatti devono funzionare insieme.
            </p>
          </article>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
