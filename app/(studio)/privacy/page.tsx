import Link from "next/link";
import { pageMeta, site } from "@/lib/site";
export const metadata = {
  ...pageMeta(
    "Privacy e cookie",
    "Informazioni sulla gestione dei dati nella versione dimostrativa del sito edo-dev.",
    "/privacy",
  ),
  robots: { index: false, follow: true },
};
export default function PrivacyPage() {
  return (
    <article className="container legal-page">
      <Link className="back-link" href="/">
        ← Torna alla home
      </Link>
      <span className="eyebrow">Privacy e cookie</span>
      <h1>
        I tuoi dati,
        <br />
        <em>con chiarezza.</em>
      </h1>
      <aside className="transparency-note">
        <p>
          <strong>Informazioni per la versione di prova.</strong> Prima della
          pubblicazione definitiva, questa pagina deve essere completata e
          verificata in base ai fornitori e alle modalità di trattamento
          effettivamente adottati.
        </p>
      </aside>
      <section>
        <h2>Contatti</h2>
        <p>
          Il riferimento indicato sul sito edo-dev è Edoardo Triveri. Per
          informazioni sulla gestione dei dati puoi scrivere a{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </section>
      <section>
        <h2>Il modulo di contatto</h2>
        <p>
          Il modulo prepara un messaggio nel tuo browser. I dati inseriti non
          vengono inviati a un server dal modulo e non vengono salvati nel
          browser. L’invio avviene soltanto quando apri la tua applicazione
          email e invii personalmente il messaggio. Puoi anche copiare il testo
          e inviarlo dalla tua casella.
        </p>
      </section>
      <section>
        <h2>Prenotare un confronto</h2>
        <p>
          I collegamenti a Calendly aprono un servizio esterno. Nessun
          calendario è incorporato in questa versione. Quando accedi al
          servizio, si applicano le informazioni fornite da{" "}
          <a
            href="https://calendly.com/legal/privacy-notice"
            target="_blank"
            rel="noopener noreferrer"
          >
            Calendly nella propria informativa privacy
          </a>
          .
        </p>
      </section>
      <section>
        <h2>Cookie e statistiche</h2>
        <p>
          Questa versione del sito non integra strumenti di analisi, pixel
          pubblicitari o cookie di profilazione. Non viene salvato alcun
          consenso perché non sono attivi strumenti che lo utilizzano. I
          caratteri e le immagini sono serviti dal sito.
        </p>
      </section>
      <section>
        <h2>Dati tecnici e informazioni da completare</h2>
        <p>
          Il servizio che ospiterà il sito può trattare dati tecnici di
          connessione. Prima del lancio devono essere precisati hosting,
          destinatari, tempi di conservazione, basi giuridiche, eventuali
          trasferimenti e modalità di esercizio dei diritti. Questa pagina non
          costituisce un’informativa definitiva per la pubblicazione.
        </p>
      </section>
    </article>
  );
}
