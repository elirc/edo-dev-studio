import Link from "next/link";
import { site } from "@/lib/config";
import { Arrow } from "./icons";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link href="/" className="wordmark" aria-label="edo-dev, homepage">
              edo<span>—</span>dev<span className="wordmark-dot">.</span>
            </Link>
            <p>
              Siti web per ristoranti indipendenti.
              <br />
              Curati da Edoardo, dall’inizio alla fine.
            </p>
          </div>
          <nav aria-label="Navigazione nel footer">
            <Link href="/lavori">Lavori</Link>
            <Link href="/servizi">Cosa faccio</Link>
            <Link href="/chi-sono">Chi sono</Link>
            <Link href="/guide">Guide</Link>
          </nav>
          <div className="footer-contact">
            <a href={`mailto:${site.email}`}>
              {site.email} <Arrow diagonal />
            </a>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer">
              Instagram{" "}
              <span className="sr-only">(si apre in una nuova scheda)</span>
              <Arrow diagonal />
            </a>
            <span>Da remoto, in tutta Italia.</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} edo-dev</span>
          <span>Fatto con cura. Come le cose buone.</span>
          <Link href="/privacy">Privacy e cookie</Link>
        </div>
      </div>
    </footer>
  );
}
