import Link from "next/link";
import { ContactBand, PageIntro } from "@/components/ui";
import { Arrow } from "@/components/icons";
import { guides, pageMeta } from "@/lib/site";
export const metadata = pageMeta(
  "Guide pratiche per il sito del tuo ristorante",
  "Menu sul telefono, prenotazioni dirette e presenza su Google. Guide brevi e concrete per chi gestisce un ristorante indipendente.",
  "/guide",
);
export default function GuidesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Appunti per ristoratori"
        title="Le cose da sapere."
        italic="Senza complicarle."
      >
        <p>
          Qualche punto fermo per fare scelte più chiare sul sito del tuo
          ristorante. Partendo dalle domande che contano nel lavoro di ogni
          giorno.
        </p>
      </PageIntro>
      <section className="container guide-index">
        {guides.map((guide) => (
          <Link
            className="guide-index-item"
            href={`/guide/${guide.slug}`}
            key={guide.slug}
          >
            <span className="detail-number">{guide.number}</span>
            <div>
              <span className="micro">
                {guide.category} · {guide.time} di lettura
              </span>
              <h2>{guide.title}</h2>
              <p>{guide.description}</p>
            </div>
            <span className="circle-link">
              <Arrow diagonal />
            </span>
          </Link>
        ))}
      </section>
      <ContactBand />
    </>
  );
}
