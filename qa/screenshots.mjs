// Full-page screenshots of every route at desktop and mobile widths.
//
// Dependencies are installed by npm ci. On Linux/macOS, install the browser:
//   npx playwright install chromium
// Run against a server (npm run build && npm run start, or npm run dev):
//   node qa/screenshots.mjs                      # defaults to http://localhost:3000
//   BASE=http://localhost:3210 node qa/screenshots.mjs /,/contatti
//
// Output: qa/screenshots/<route>-<viewport>.png (git-ignored). Also reports
// horizontal overflow and browser console errors per viewport.
import { launchBrowser } from "./browser.mjs";
import { routes as allRoutes } from "./routes.mjs";
import { mkdirSync } from "node:fs";

const base = process.env.BASE || "http://localhost:3000";
const routes = process.argv[2] ? process.argv[2].split(",") : allRoutes;
const viewports = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};

mkdirSync("qa/screenshots", { recursive: true });
const browser = await launchBrowser();
let failed = false;
try {
  for (const [name, viewport] of Object.entries(viewports)) {
    const context = await browser.newContext({
      viewport,
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    const errors = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(String(error)));
    for (const route of routes) {
      const response = await page.goto(base + route, {
        waitUntil: "networkidle",
      });
      if (!response?.ok()) {
        failed = true;
        console.error(`${route}: HTTP ${response?.status()}`);
      }
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(300);
      const slug =
        route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "_");
      await page.screenshot({
        path: `qa/screenshots/${slug}-${name}.png`,
        fullPage: true,
      });
      const scrollWidth = await page.evaluate(
        () => document.documentElement.scrollWidth,
      );
      if (scrollWidth > viewport.width) {
        failed = true;
        console.error(`OVERFLOW ${name} ${route}: ${scrollWidth}px`);
      }
    }
    if (errors.length) {
      failed = true;
      console.error(`${name} console errors:`, errors);
    }
    await context.close();
  }
} finally {
  await browser.close();
}
console.log("Screenshots written to qa/screenshots/");
if (failed) process.exitCode = 1;
