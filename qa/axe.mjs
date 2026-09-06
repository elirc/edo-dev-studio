// Accessibility audit (axe-core, WCAG 2.1 AA + best practices) of every route.
//
// Dependencies are installed by npm ci. On Linux/macOS, install the browser:
//   npx playwright install chromium
// Run against a server:
//   node qa/axe.mjs                              # defaults to http://localhost:3000
//   BASE=http://localhost:3210 node qa/axe.mjs
//
// Exit code is 1 when any violation is found, so it can gate a CI job.
import AxeBuilder from "@axe-core/playwright";
import { launchBrowser } from "./browser.mjs";
import { routes } from "./routes.mjs";

const base = process.env.BASE || "http://localhost:3000";

let total = 0;
const browser = await launchBrowser();
try {
  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 390, height: 844 },
  ]) {
    const page = await browser.newPage({ viewport });
    for (const route of routes) {
      await page.goto(base + route, { waitUntil: "networkidle" });
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
      for (const violation of results.violations) {
        total++;
        console.log(
          `${viewport.width}px ${route} [${violation.impact}] ${violation.id}: ${violation.help}`,
        );
        for (const node of violation.nodes.slice(0, 5))
          console.log("   ", node.target.join(" "));
      }
    }
    await page.close();
  }
} finally {
  await browser.close();
}
console.log(
  total ? `${total} violation(s)` : "No accessibility violations found.",
);
process.exit(total ? 1 : 0);
