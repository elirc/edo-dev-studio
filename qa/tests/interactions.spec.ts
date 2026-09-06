import { expect, test, type Page } from "@playwright/test";

async function fillContact(page: Page) {
  await page.goto("/contatti");
  await expect(
    page.getByRole("button", { name: "Prepara il messaggio" }),
  ).toBeEnabled();
  await page.getByLabel("Come ti chiami").fill("Mario Rossi");
  await page.getByLabel("Nome del ristorante").fill("Caffè & Cucina");
  await page.getByLabel("La tua email").fill("mario@example.com");
  await page
    .getByLabel("A cosa stai pensando?")
    .fill("Vorrei migliorare il sito e il menu del ristorante.");
}

test("contact keeps edited drafts, focus and encoded email without sending data", async ({
  page,
}) => {
  const submissions: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST" || request.url().includes("mario%40"))
      submissions.push(request.url());
  });
  await fillContact(page);
  await page.getByRole("button", { name: "Prepara il messaggio" }).click();
  await expect(
    page.getByRole("heading", { name: "Un ultimo passaggio." }),
  ).toBeFocused();
  const preview = page.getByLabel("Puoi rivederlo prima di inviarlo");
  await preview.fill("Testo modificato: caffè & idee, 50%.");
  await page.getByRole("button", { name: "Torna al modulo" }).click();
  await expect(page.getByLabel("Come ti chiami")).toBeFocused();
  await expect(page.getByLabel("Nome del ristorante")).toHaveValue(
    "Caffè & Cucina",
  );
  await page.getByRole("button", { name: "Prepara il messaggio" }).click();
  await expect(preview).toHaveValue("Testo modificato: caffè & idee, 50%.");
  const href = await page
    .getByRole("link", { name: "Apri l’email e invia" })
    .getAttribute("href");
  expect(new URL(href!).searchParams.get("body")).toBe(
    "Testo modificato: caffè & idee, 50%.",
  );
  await preview.fill("");
  await expect(preview).toBeVisible();
  expect(new URL(page.url()).search).toBe("");
  expect(submissions).toEqual([]);
});

test("contact rejects whitespace and resets the error when corrected", async ({
  page,
}) => {
  await fillContact(page);
  await page.getByLabel("Come ti chiami").fill("   ");
  await page.getByRole("button", { name: "Prepara il messaggio" }).click();
  await expect(page.getByLabel("Come ti chiami")).toBeFocused();
  await expect(page.locator(".email-preview")).toHaveCount(0);
  await page.getByLabel("Come ti chiami").fill(" Mario Rossi ");
  await page.getByRole("button", { name: "Prepara il messaggio" }).click();
  await expect(page.getByLabel("Puoi rivederlo prima di inviarlo")).toHaveValue(
    /sono Mario Rossi e/,
  );
});

test("clipboard rejection selects text and explains how to copy manually", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: () => Promise.reject(new Error("Clipboard denied")) },
    });
  });
  await fillContact(page);
  await page.getByRole("button", { name: "Prepara il messaggio" }).click();
  await page.getByRole("button", { name: "Copia il messaggio" }).click();
  await expect(page.getByRole("status")).toContainText(
    "La copia automatica non è disponibile",
  );
  const preview = page.getByLabel("Puoi rivederlo prima di inviarlo");
  await expect(preview).toBeFocused();
  expect(
    await preview.evaluate(
      (element: HTMLTextAreaElement) =>
        element.selectionEnd - element.selectionStart,
    ),
  ).toBeGreaterThan(0);
});

test("without JavaScript, contact cannot submit and mobile navigation works", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("/contatti");
  const originalUrl = page.url();
  await page.getByLabel("Come ti chiami").fill("Mario");
  await page.getByLabel("Nome del ristorante").fill("Locale");
  await page.getByLabel("La tua email").fill("mario@example.com");
  await page
    .getByLabel("A cosa stai pensando?")
    .fill("Una richiesta senza JavaScript.");
  await expect(page.locator('button[type="submit"]')).toBeDisabled();
  await page.getByLabel("La tua email").press("Enter");
  await expect(page).toHaveURL(originalUrl);
  await expect(
    page.locator('noscript a[href="mailto:edo@edo-dev.com"]'),
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "Navigazione mobile", exact: true })
    .getByRole("link", { name: "Lavori", exact: true })
    .click();
  await expect(page).toHaveURL(/\/lavori$/);
  await context.close();
});

test("mobile menu resets on navigation and resize, and Escape returns focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Apri il menu" }).click();
  await expect(
    page.getByRole("button", { name: "Chiudi il menu" }),
  ).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Apri il menu" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Apri il menu" }).click();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(
    page.getByRole("button", { name: "Apri il menu" }),
  ).toHaveAttribute("aria-expanded", "false");
  await page.getByRole("button", { name: "Apri il menu" }).click();
  await page
    .locator("#mobile-navigation")
    .getByRole("link", { name: "Lavori", exact: true })
    .click();
  await expect(page).toHaveURL(/\/lavori$/);
  await expect(
    page.getByRole("button", { name: "Apri il menu" }),
  ).toHaveAttribute("aria-expanded", "false");
});

test("studio and demo layouts stay correct through client navigation", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/lavori/casa-lino");
  await page.getByRole("link", { name: "Esplora il sito demo" }).click();
  await expect(page).toHaveURL(/\/concept\/casa-lino$/);
  await expect(page.locator(".site-header, .site-footer")).toHaveCount(0);
  await expect(page.locator("main")).toHaveCount(1);
  await page.getByRole("tab", { name: "Primi", exact: true }).click();
  await expect(page.getByRole("tabpanel")).toContainText("Tagliatelle al ragù");
  await page.getByRole("tab", { name: "Primi", exact: true }).press("End");
  await expect(
    page.getByRole("tab", { name: "Dolci", exact: true }),
  ).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText("Tiramisù");
  await page
    .getByRole("button", { name: "Come funzionerebbe la prenotazione" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Dal sito alla tua sala." }),
  ).toBeVisible();
  await page.getByRole("link", { name: "← Torna al progetto" }).click();
  await expect(page.locator(".site-header")).toBeVisible();
  await expect(page.locator(".site-footer")).toBeVisible();
  expect(errors).toEqual([]);
});
