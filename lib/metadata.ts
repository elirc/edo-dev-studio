import type { Metadata } from "next";
import { site } from "./config";

export const socialImage = {
  url: `${site.url}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: "edo-dev — siti web per ristoranti indipendenti",
};

export function pageMeta(
  title: string,
  description: string,
  path: string,
  type: "website" | "article" = "website",
): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  const url = new URL(path, site.url).href;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      locale: "it_IT",
      images: [socialImage],
      ...(type === "article" ? { authors: [`${site.url}/chi-sono`] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [socialImage],
    },
  };
}
