/**
 * Temporary UI stability smoke check for Engineering Baseline.
 * Uses system Chrome/Edge via Playwright channel (no browser download required).
 */
import { chromium } from "playwright";

const BASE = process.env.BASE_URL || "http://127.0.0.1:3000";

const ROUTES = [
  "/",
  "/pricing",
  "/login",
  "/payment-activation",
  "/dashboard/free",
  "/dashboard/vip",
  "/admin",
  "/admin/members",
  "/admin/subscriptions",
  "/admin/discord",
  "/admin/referrals",
];

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
  { name: "small-mobile", width: 320, height: 720 },
  { name: "landscape-mobile", width: 844, height: 390 },
];

async function measureOverflow(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const body = document.body;
    const scrollWidth = Math.max(doc.scrollWidth, body.scrollWidth);
    const clientWidth = doc.clientWidth;
    const overflowX = scrollWidth - clientWidth;
    return { scrollWidth, clientWidth, overflowX };
  });
}

async function run() {
  const browser = await chromium.launch({
    channel: process.env.PW_CHANNEL || "chrome",
    headless: true,
  });
  const results = [];

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.width <= 430,
      hasTouch: vp.width <= 430,
    });
    const page = await context.newPage();
    const consoleErrors = [];
    page.on("pageerror", (err) => consoleErrors.push(String(err)));
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });

    for (const route of ROUTES) {
      const url = `${BASE}${route}`;
      let status = "ok";
      let overflowX = 0;
      let error = null;
      try {
        const response = await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
        if (!response || !response.ok()) {
          status = `http-${response?.status() ?? "none"}`;
        }
        await page.waitForTimeout(400);
        const metrics = await measureOverflow(page);
        overflowX = metrics.overflowX;
        if (overflowX > 2) status = status === "ok" ? "overflow" : `${status}+overflow`;

        // Admin mobile: open hamburger if present and ensure closed sidebar not hit-testable.
        if (route.startsWith("/admin") && vp.width < 1024) {
          const hamburger = page.getByRole("button", { name: /open menu|menu/i }).first();
          if (await hamburger.count()) {
            await hamburger.click({ timeout: 3000 }).catch(() => {});
            await page.waitForTimeout(250);
            const membersInDrawer = page.locator('aside a[href="/admin/members"]');
            if (await membersInDrawer.count()) {
              await membersInDrawer.first().click({ timeout: 3000 }).catch(() => {});
              await page.waitForTimeout(300);
            }
            // After navigation, closed drawer should not be visible.
            const asideVisible = await page.locator("aside").isVisible().catch(() => false);
            // On desktop aside is always visible; on mobile after nav it should close (hidden).
            if (vp.width < 1024 && asideVisible) {
              // May still be visible briefly; check display via computed style
              const display = await page.locator("aside").evaluate((el) => getComputedStyle(el).display);
              if (display !== "none") {
                status = status === "ok" ? "drawer-still-visible" : `${status}+drawer`;
              }
            }
          }
        }
      } catch (e) {
        status = "error";
        error = String(e);
      }

      results.push({
        viewport: vp.name,
        route,
        status,
        overflowX,
        consoleErrors: [...consoleErrors],
        error,
      });
      consoleErrors.length = 0;
    }

    await context.close();
  }

  await browser.close();

  const failures = results.filter((r) => r.status !== "ok" || r.overflowX > 2);
  console.log(JSON.stringify({ summary: { total: results.length, failures: failures.length }, failures, results }, null, 2));
  process.exit(failures.length ? 1 : 0);
}

run().catch((err) => {
  console.error(err);
  process.exit(2);
});
