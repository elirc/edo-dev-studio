"use client";

import { Arrow } from "@/components/icons";
import { site } from "@/lib/config";

export default function PageError({ retry }: { retry: () => void }) {
  return (
    <section className="container not-found" role="alert">
      <span className="eyebrow">Un piccolo imprevisto</span>
      <h1>
        Riproviamo,
        <br />
        <em>con calma.</em>
      </h1>
      <p>
        Non siamo riusciti a caricare questa pagina. Puoi riprovare oppure
        scrivermi direttamente.
      </p>
      <div className="actions">
        <button type="button" className="button button-dark" onClick={retry}>
          Riprova
          <Arrow />
        </button>
        <a className="text-link" href={`mailto:${site.email}`}>
          Scrivimi
          <Arrow diagonal />
        </a>
      </div>
    </section>
  );
}
