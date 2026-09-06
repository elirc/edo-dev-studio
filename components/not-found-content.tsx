import Link from "next/link";
import { Arrow } from "@/components/icons";
export function NotFoundContent() {
  return (
    <section className="container not-found">
      <span className="eyebrow">404 / Questa pagina non c’è</span>
      <h1>
        Abbiamo cambiato
        <br />
        <em>qualcosa in sala.</em>
      </h1>
      <p>
        La pagina potrebbe essere stata spostata. Puoi ripartire dalla home o
        raccontarmi quello che cercavi.
      </p>
      <div className="actions">
        <Link href="/" className="button button-dark">
          Torna alla home <Arrow />
        </Link>
        <Link href="/contatti" className="text-link">
          Contattami <Arrow diagonal />
        </Link>
      </div>
    </section>
  );
}
