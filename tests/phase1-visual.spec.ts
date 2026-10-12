import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
const questionnaire = JSON.parse(readFileSync(new URL("../shared/marketing-clarity-audit/questionnaire.json", import.meta.url), "utf8")) as { sections: { id: number }[]; questions: { id: string; sectionId: number }[] };

// Presentation review uses fictional responses and cannot touch purchased sessions.
test("Phase 1 responsive question, selection, focus, insight and stack review", async ({ page }, info) => {
  let companyName = "Clarity Review Studio";
  let answers: Record<string, string> = {};
  await page.route("**/api/audit/**", async route => {
    if (route.request().method() === "GET") await route.fulfill({ json: {
      context: { name: "Review Customer", email: "review@example.com", companyName, websiteUrl: "https://example.com", businessType: "professional_services", primaryMarketingGoal: "leads" },
      answers, completed: false, savedAt: new Date().toISOString(),
    }});
    else await route.fulfill({ json: { teachingNote: "A clear offer gives your audience a concrete reason to take the next step." } });
  });
  await page.goto(`/audit/resume/${"a".repeat(43)}`);
  await expect(page.locator(".assessment-question")).toBeVisible();
  if (info.project.name === "desktop") {
    const companion = await page.locator(".assessment-progress-layout > div").first().boundingBox();
    expect(companion?.width).toBeGreaterThan(200);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: `tmp/phase1-review/${info.project.name}-question.png`, fullPage: true });
  const header = page.getByRole("navigation", { name: "Main navigation", exact: true });
  await expect(header).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await expect(header).toHaveCSS("backdrop-filter", "none");
  if (info.project.name === "mobile") {
    for (const width of [390, 440]) {
      await page.setViewportSize({ width, height: 664 });
      const stack = await page.locator(".diagnostic-clarity-stack").boundingBox();
      const panel = await page.locator(".assessment-companion").boundingBox();
      expect(stack!.width).toBeGreaterThan(width - 70);
      expect(panel!.height).toBeLessThan(340);
      await expect(page.locator(".diagnostic-clarity-stack li").first()).toHaveCSS("font-size", "12px");
      await page.screenshot({ path: `tmp/phase1-final-review/mobile-${width}.png`, fullPage: true });
    }
  }
  await page.locator(".assessment-question h2").evaluate(el => el.scrollIntoView({ block: "start", behavior: "instant" }));
  const headerBounds = await header.boundingBox();
  const titleBounds = await page.locator(".assessment-question h2").boundingBox();
  expect(titleBounds!.y).toBeGreaterThan(headerBounds!.height);
  await page.screenshot({ path: `tmp/phase1-final-review/${info.project.name}-scroll.png`, fullPage: false });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.getByRole("radio").first().focus();
  await expect(page.getByRole("radio").first()).toBeFocused();
  const focusedBounds = await page.getByRole("radio").first().boundingBox();
  expect(focusedBounds!.y).toBeGreaterThan(headerBounds!.height);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: `tmp/phase1-review/${info.project.name}-focus.png`, fullPage: true });
  await page.getByRole("radio").last().check();
  await expect(page.locator(".assessment-insight")).toBeVisible();
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: `tmp/phase1-review/${info.project.name}-insight.png`, fullPage: true });
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.locator(".assessment-question h2")).toBeFocused();
  for (const section of questionnaire.sections) {
    const index = questionnaire.questions.findIndex(q => q.sectionId === section.id);
    answers = Object.fromEntries(questionnaire.questions.slice(0, index).map(q => [q.id, "A"]));
    await page.reload();
    await expect(page.locator(`[data-layer-id="${section.id}"]`)).toHaveAttribute("data-state", "current");
    await page.getByRole("radio").last().check();
    await expect(page.locator(".assessment-answer:has(input:checked)")).toHaveCSS("background-color", await page.locator(`[data-layer-id="${section.id}"]`).evaluate(el => getComputedStyle(el).backgroundColor));
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  companyName = "A very long company name for an international professional services and marketing advisory studio";
  await page.reload();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".assessment-answer").first()).toHaveCSS("transition-duration", "0s");
  if (info.project.name === "mobile") {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({ path: "tmp/phase1-review/mobile-320-short.png", fullPage: true });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  answers = Object.fromEntries(questionnaire.questions.map(q => [q.id, "A"]));
  await page.reload();
  await expect(page.locator(".assessment-ready")).toBeVisible();
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: `tmp/phase1-review/${info.project.name}-complete.png`, fullPage: true });
});
