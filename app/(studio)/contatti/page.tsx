import { Arrow } from "@/components/icons";
import { ContactForm } from "@/components/contact-form";
import { Eyebrow } from "@/components/ui";
import { pageMeta, site } from "@/lib/site";
export const metadata = pageMeta(
  "Parliamo del sito del tuo ristorante",
  "Racconta il tuo locale a Edoardo. Prenota un primo confronto gratuito di 15 minuti oppure prepara un messaggio email, senza impegno.",
  "/contatti",
);
export default function ContactPage() {
  return (
    <section className="container contact-page">
      <div className="contact-intro">
        <Eyebrow>Facciamo due parole</Eyebrow>
        <h1>
          Il primo passo
          <br />
          <em>è conoscerci.</em>
        </h1>
        <p>
          Raccontami che locale gestisci e cosa vorresti migliorare. Non serve
          avere già tutte le idee in ordine.
        </p>
        <div className="contact-options">
          <a href={site.booking} target="_blank" rel="noopener noreferrer">
            <span className="micro">PREFERISCI PARLARNE?</span>
            <strong>
              Scegli un momento <Arrow diagonal />
            </strong>
            <span>
              15 minuti, gratuitamente e senza impegno.
              <br />
              Si apre il calendario su Calendly.
            </span>
          </a>
          <a href={`mailto:${site.email}`}>
            <span className="micro">OPPURE, UNA SEMPLICE EMAIL</span>
            <strong>
              {site.email} <Arrow diagonal />
            </strong>
            <span>Leggo e rispondo personalmente.</span>
          </a>
        </div>
        <div className="contact-person">
          <span className="signature-mark">e.</span>
          <span>
            Parli con Edoardo.
            <br />
            <strong>Dalle prime domande al sito online.</strong>
          </span>
        </div>
      </div>
      <ContactForm />
    </section>
  );
}
