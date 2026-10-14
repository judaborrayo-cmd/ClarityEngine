import { test, expect } from "./local-fonts";
import { mkdirSync } from "node:fs";
import { deepDiveGrowthAuditOffer as offer } from "../shared/deep-dive-growth-audit-offer";
const screenshots = "stage-c1-review/screenshots";

test("premium Audit is responsive and stops at inactive checkout", async ({
  page,
}, info) => {
  mkdirSync(screenshots, { recursive: true });
  await page.emulateMedia({ reducedMotion: "reduce" });
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/growth-clarity-audit");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "See the whole picture.Know your next move.",
  );
  await expect(page).toHaveTitle(
    "Deep Dive Growth Audit — $3,725 | Clarity Engine",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: `${screenshots}/${info.project.name}-landing.png`,
    fullPage: true,
  });
  await page.screenshot({
    path: `${screenshots}/${info.project.name}-hero.png`,
  });
  await page.getByRole("link", { name: "Explore What's Included" }).click();
  await expect(page.locator("#included")).toBeInViewport();
  expect(
    await page
      .locator("#included")
      .evaluate((el) => el.getBoundingClientRect().top >= 100),
  ).toBe(true);
  await page
    .getByText("Does the Audit include implementation?", { exact: true })
    .click();
  await expect(
    page.getByText("Every Audit includes investigation, a Strategic Growth Blueprint", {
      exact: false,
    }),
  ).toBeVisible();
  await expect(page.locator("#development")).toContainText("Every Audit includes substantive strategic development");
  await expect(page.getByRole("link", { name: "Complimentary Fit Conversation" })).toHaveCount(2);
  await expect(page.locator("#included")).toContainText("Tangible strategic development");
  await expect(page.getByRole("link", { name: "Complimentary Fit Conversation" }).first()).toHaveAttribute("href", "mailto:Juda.Borrayo@gmail.com?subject=Deep%20Dive%20Growth%20Audit%20fit%20conversation");
  await page.locator("#pricing").scrollIntoViewIfNeeded();
  await page.screenshot({
    path: `${screenshots}/${info.project.name}-pricing.png`,
  });
  await expect(page.locator("#pricing").getByRole("link", { name: "Discuss Your Deep Dive Audit" })).toHaveAttribute("href", "mailto:Juda.Borrayo@gmail.com?subject=Deep%20Dive%20Growth%20Audit%20enquiry");
  await expect(page.locator('main a[href="/checkout/audit"]')).toHaveCount(0);
  await page.goto("/checkout/audit");
  await expect(page).toHaveURL(/\/checkout\/audit$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(offer.name);
  await expect(page.getByTestId("button-proceed-checkout")).toBeDisabled();
  await expect(page.locator('a[href*="buy.stripe.com"]')).toHaveCount(0);
  await expect(
    page.getByText(
      "Purchasing is unavailable while the new payment link is inactive.",
      { exact: false },
    ),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: `${screenshots}/${info.project.name}-checkout.png`,
    fullPage: true,
  });
  await page.goto(offer.nextStepsPath + "?session_id=unverified");
  await expect(
    page.getByText(
      "This page does not verify a purchase or confirm a booking.",
      { exact: false },
    ),
  ).toBeVisible();
  await expect(page.locator('a[href*="calendly.com"]')).toHaveCount(0);
  await page.screenshot({
    path: `${screenshots}/${info.project.name}-next-steps.png`,
    fullPage: true,
  });
  await page.goto("/checkout/audit/thank-you");
  await expect(
    page.getByText("Deep Dive Audit purchased: $1,250", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("$600 credited if we work together", { exact: true }),
  ).toBeVisible();
  await page.goto("/strategy-sprint");
  await expect(page).toHaveTitle(
    "30-Day Growth Strategy Sprint | Clarity Engine",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("new-purchase Audit references are consistent; short phones do not overflow", async ({
  page,
}) => {
  for (const path of [
    "/",
    "/services",
    "/ways-to-work-together",
    "/growth-clarity-audit",
    "/checkout/audit",
  ]) {
    await page.goto(path);
    const main = page.locator("main");
    await expect(main).toContainText("Deep Dive Growth Audit");
    await expect(main).toContainText("$3,725");
    await expect(main).not.toContainText(/\$497|\$900|\$1,250|\$600/);
  }
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto("/growth-clarity-audit");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(
    await page
      .locator(".dda-system")
      .evaluate((el) => el.getBoundingClientRect().top < innerHeight),
  ).toBe(true);
});
