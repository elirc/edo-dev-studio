import type { MetadataRoute } from "next";
import { guides, projects, site } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/servizi",
    "/lavori",
    "/chi-sono",
    "/contatti",
    "/guide",
    ...projects.map((p) => `/lavori/${p.slug}`),
    ...guides.map((g) => `/guide/${g.slug}`),
  ].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
