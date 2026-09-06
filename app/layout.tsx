import type { Metadata } from "next";
import localFont from "next/font/local";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/lib/config";
import { socialImage } from "@/lib/metadata";
import "./globals.css";

const sans = localFont({
  src: "../assets/fonts/manrope-latin.woff2",
  weight: "200 800",
  style: "normal",
  display: "swap",
  variable: "--font-sans",
});
const serif = localFont({
  src: [
    {
      path: "../assets/fonts/cormorant-garamond-latin.woff2",
      weight: "400 600",
      style: "normal",
    },
    {
      path: "../assets/fonts/cormorant-garamond-italic-latin.woff2",
      weight: "400 600",
      style: "italic",
    },
  ],
  adjustFontFallback: "Times New Roman",
  display: "swap",
  variable: "--font-serif",
});
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Siti web per ristoranti indipendenti | edo-dev",
    template: "%s | edo-dev",
  },
  description:
    "Siti web curati per ristoranti indipendenti: identità, menu, prenotazioni e presenza locale. Un progetto seguito da Edoardo, dall’inizio alla fine.",
  authors: [{ name: site.founder, url: `${site.url}/chi-sono` }],
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: site.name,
    title: "Il tuo ristorante, già dal primo sguardo.",
    description:
      "Siti web per ristoranti indipendenti. Progettati e curati da Edoardo.",
    images: [socialImage],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#studio`,
        name: site.name,
        url: site.url,
        email: site.email,
        description:
          "Progettazione di siti web per ristoranti indipendenti in Italia.",
        founder: { "@id": `${site.url}/#edoardo` },
        sameAs: [site.instagram],
      },
      {
        "@type": "Person",
        "@id": `${site.url}/#edoardo`,
        name: site.founder,
        url: `${site.url}/chi-sono`,
        worksFor: { "@id": `${site.url}/#studio` },
      },
      {
        "@type": "Service",
        name: "Progettazione e realizzazione siti web per ristoranti",
        provider: { "@id": `${site.url}/#studio` },
        areaServed: { "@type": "Country", name: "Italia" },
        url: `${site.url}/servizi`,
      },
    ],
  };
  return (
    <html lang="it" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Vai al contenuto
        </a>
        {children}
        <JsonLd data={schema} />
      </body>
    </html>
  );
}
