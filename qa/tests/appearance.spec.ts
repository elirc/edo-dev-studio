import { expect, test } from "@playwright/test";

// These baselines are captured before the implementation changes.
// Same browser/platform + a production build keep comparisons meaningful.
for (const width of [390, 1440]) {
  for (const route of ["/", "/contatti", "/concept/casa-lino", "/lavori"]) {
    test(`appearance ${width}px ${route}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all(
          Array.from(document.images).map((image) =>
            image.decode().catch(() => {}),
          ),
        );
      });
      if (route === "/contatti") {
        await expect(
          page.getByRole("button", { name: "Prepara il messaggio" }),
        ).toBeEnabled();
      }
      await expect(page).toHaveScreenshot(
        `${route.replaceAll("/", "-") || "home"}-${width}.png`,
        { fullPage: true, animations: "disabled", maxDiffPixelRatio: 0.001 },
      );
    });
  }
}
