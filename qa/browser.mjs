import { chromium } from "@playwright/test";

export function launchBrowser() {
  return chromium.launch({
    channel:
      process.env.PLAYWRIGHT_CHANNEL ||
      (process.platform === "win32" ? "msedge" : undefined),
  });
}
