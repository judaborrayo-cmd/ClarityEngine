import { test, expect } from "./local-fonts";
import { readFileSync, mkdirSync } from "node:fs";
import { assessmentInsights, assessmentSections } from "../client/src/lib/assessment-copy";
const displayQuestions = JSON.parse(readFileSync(new URL("../shared/marketing-clarity-audit/question-display.json", import.meta.url), "utf8"));
const questionnaire = JSON.parse(readFileSync(new URL("../shared/marketing-clarity-audit/questionnaire.json", import.meta.url), "utf8"));

// Fictional browser-only review state. All real API calls are intercepted.
test("Stage B approved copy, all insight points, navigation, resume and completions", async ({ page }, info) => {
  test.setTimeout(120000);
  const root = "stage-b-review/final/screenshots";
  mkdirSync(root, { recursive: true });
  let context: any = null;
  const answers: Record<string, string> = {};
  const shown = new Set<string>();
  await page.route("**/api/audit/**", async route => {
    const request = route.request();
    if (request.method() === "GET") return route.fulfill({ json: { context, answers, completed: false, savedAt: new Date().toISOString() } });
    if (request.url().endsWith("/answer")) {
      const input = request.postDataJSON();
      answers[input.questionId] = input.answer;
      const question = questionnaire.questions.find((q: any) => q.id === input.questionId);
      const teachingNote = !shown.has(question.id) ? question.teachingNote : undefined;
      if (teachingNote) shown.add(question.id);
      return route.fulfill({ json: { saved: true, teachingNote } });
    }
    if (request.url().endsWith("/context")) context = request.postDataJSON();
    return route.fulfill({ json: { saved: true } });
  });
  const capture = async (name: string) => {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({ path: `${root}/${info.project.name}-${name}.png`, fullPage: true });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  };
  await page.goto(`/audit/resume/${"b".repeat(43)}`);
  await expect(page.getByRole("heading", { name: "Start with your business. Find your next growth opportunity." })).toBeVisible();
  await capture("introduction");
  context = { name: "Review Customer", email: "review@example.com", companyName: "Clarity Review Studio", websiteUrl: "https://example.com", businessType: "professional_services", primaryMarketingGoal: "leads" };
  await page.reload();
  for (let i = 0; i < questionnaire.questions.length; i++) {
    const q = questionnaire.questions[i];
    await expect(page.locator(".assessment-question h2")).toHaveText(displayQuestions[q.id]);
    await expect(page.locator(".assessment-question")).toContainText(assessmentSections[q.sectionId].title);
    await expect(page.getByRole("progressbar")).toHaveAttribute("value", String(i));
    await expect(page.getByRole("radio").last()).toBeEnabled();
    await expect(page.getByRole("radio").last()).not.toBeChecked();
    await page.getByRole("radio").last().check();
    await expect(page.getByRole("progressbar")).toHaveAttribute("value", String(i + 1));
    if (q.teachingNote) {
      await expect(page.locator(".assessment-insight p")).toHaveText(assessmentInsights[q.id]);
      if (i === 0) {
        await expect(page.getByRole("radio").last()).toBeChecked();
        await capture("selected-answer-insight");
      }
      await page.getByRole("button", { name: "Continue", exact: true }).click();
    }
    if (i === 0) {
      await page.getByRole("button", { name: "Back", exact: true }).click();
      await expect(page.getByRole("radio").last()).toBeChecked();
      await page.getByRole("radio").first().check();
      await expect(page.locator(".assessment-insight")).toHaveCount(0);
    }
    if (i < 34 && questionnaire.questions[i + 1].sectionId !== q.sectionId) {
      await expect(page.locator(".assessment-transition")).toContainText(assessmentSections[q.sectionId].completion);
      await expect(page.locator(".assessment-transition")).toContainText("Your answers are saved.");
      await capture(`section-${q.sectionId}-complete`);
      await page.getByRole("button", { name: "Review last answer" }).click();
      await expect(page.getByRole("radio").last()).toBeChecked();
      await page.getByRole("button", { name: "Continue", exact: true }).click();
      await page.getByRole("button", { name: "Continue to next section" }).click();
      await page.reload(); // resume at next unanswered question; no extra step
    }
  }
  await expect(page.locator(".assessment-ready")).toBeVisible();
  expect(shown.size).toBe(10);
  expect(Object.keys(answers).length).toBe(35);
  await expect(page.locator(".assessment-ready")).not.toContainText(assessmentSections[6].completion);
  if (info.project.name === "mobile") {
    const ready = await page.locator(".assessment-ready").boundingBox();
    const companion = await page.locator(".assessment-companion").boundingBox();
    const action = await page.locator(".assessment-ready-actions").boundingBox();
    const cards = await page.locator(".assessment-ready > .clarity-stack").boundingBox();
    expect(ready!.y).toBeLessThan(companion!.y);
    expect(action!.y).toBeLessThan(cards!.y);
    await expect(page.locator('[data-state="complete"]')).toHaveCount(6);
  }
  await expect(page.getByRole("button", { name: "Generate My High Growth Opportunities Report" })).toBeVisible();
  await capture("assessment-complete");
  await page.getByRole("button", { name: "Back", exact: true }).click();
  await expect(page.getByRole("radio").last()).toBeChecked();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.locator(".assessment-ready")).toBeVisible();
});
