import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { routes } from "../routes.mjs";

for (const route of routes) {
  test(`page, metadata and responsive layout: ${route}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", "it");
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://edo-dev.com${route === "/" ? "" : route}`,
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      `https://edo-dev.com${route === "/" ? "" : route}`,
    );
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
      "content",
      "it_IT",
    );
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute(
      "content",
      "edo-dev",
    );
    await expect(
      page.locator('meta[property="og:image"]').first(),
    ).toHaveAttribute("content", /https:\/\/edo-dev\.com\/opengraph-image/);
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute(
      "content",
      await page.title(),
    );
    const isArticle = route.startsWith("/guide/");
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
      "content",
      isArticle ? "article" : "website",
    );
    if (route.startsWith("/concept/") || route === "/privacy") {
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        /noindex/,
      );
    }
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
        `${route} at ${width}px`,
      ).toBeLessThanOrEqual(width);
    }
    expect(errors).toEqual([]);
  });

  test(`accessibility: ${route}`, async ({ page }) => {
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const results = await new AxeBuilder({ page })
        .withTags([
          "wcag2a",
          "wcag2aa",
          "wcag21a",
          "wcag21aa",
          "wcag22aa",
          "best-practice",
        ])
        .analyze();
      expect(results.violations, `${route} at ${width}px`).toEqual([]);
    }
  });
}

test("unknown pages return real 404s without a misleading canonical", async ({
  page,
}) => {
  for (const path of [
    "/does-not-exist",
    "/guide/not-a-guide",
    "/lavori/not-a-project",
    "/concept/not-a-restaurant",
  ]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(
      page.locator('meta[name="robots"][content*="noindex"]'),
    ).not.toHaveCount(0);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    await expect(
      page.getByRole("link", { name: "Torna alla home" }),
    ).toBeVisible();
  }
});

test("sitemap contains every indexable page and working metadata assets", async ({
  request,
}) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  const xml = await sitemap.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) =>
    match[1].replace(/\/$/, ""),
  );
  const expected = routes
    .filter((route) => route !== "/privacy" && !route.startsWith("/concept/"))
    .map((route) => `https://edo-dev.com${route === "/" ? "" : route}`);
  expect(urls.sort()).toEqual(expected.sort());
  for (const path of ["/robots.txt", "/opengraph-image", "/icon.svg"]) {
    expect((await request.get(path)).ok(), path).toBeTruthy();
  }
});

test("security headers allow the site and block unintended form/image endpoints", async ({
  request,
}) => {
  const response = await request.get("/");
  const headers = response.headers();
  expect(headers["content-security-policy"]).toContain("form-action 'none'");
  expect(headers["content-security-policy"]).toContain(
    "frame-ancestors 'none'",
  );
  expect(headers["content-security-policy"]).not.toContain("unsafe-eval");
  expect(headers["x-powered-by"]).toBeUndefined();
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(
    (await request.get("/_next/image?url=%2Fprivacy&w=640&q=75")).status(),
  ).toBe(400);
});

test("legacy URLs retain their permanent redirects", async ({ request }) => {
  const mappings = [
    ["/siti-web-ristoranti", "/servizi"],
    ["/blog", "/guide"],
    [
      "/blog/come-aumentare-prenotazioni-ristorante-online",
      "/guide/prenotazioni-dirette-ristorante",
    ],
    ["/blog/quanto-costa-sito-web-ristorante", "/servizi#preventivo"],
    ["/blog/template-vs-sito-su-misura-ristorante", "/servizi"],
    [
      "/blog/automazioni-whatsapp-ristoranti-prenotazioni",
      "/guide/prenotazioni-dirette-ristorante",
    ],
    [
      "/blog/ridurre-no-show-ristorante-promemoria-automatici",
      "/guide/prenotazioni-dirette-ristorante",
    ],
    ["/blog/automazioni-ai-ristorante", "/guide"],
    ["/siti-web-ristoranti-milano/pizzerie", "/servizi"],
    ["/siti-web-ristoranti-milano/ristoranti-di-pesce", "/servizi"],
    ["/calcolatore-prenotazioni-ristorante", "/servizi"],
    ["/casi-studio/coachcord", "/lavori"],
    ["/cookie-policy", "/privacy"],
    ["/privacy-policy", "/privacy"],
    ["/siti-web-ristoranti-roma", "/servizi"],
    ["/siti-web-pizzerie-milano", "/servizi"],
  ];
  for (const [path, destination] of mappings) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status(), path).toBe(308);
    expect(response.headers().location).toBe(destination);
    expect((await request.get(destination.split("#")[0])).ok()).toBeTruthy();
  }
});
