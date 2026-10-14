import { test, expect } from "./local-fonts";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
const questions = JSON.parse(readFileSync(new URL("../shared/marketing-clarity-audit/questionnaire.json", import.meta.url), "utf8")).questions as { id: string; sectionId: number }[];

test("Phase 2 frozen constraint reports remain readable across responsive layouts", async ({ page }, info) => {
  mkdirSync("tmp/phase2-review", { recursive: true });
  for (const sectionId of [1, 2, 3, 4, 5, 6]) {
    await page.goto("/marketing-clarity-assesment");
    await page.getByRole("button", { name: "Get My Clarity Assessment — $27" }).first().click();
    await expect(page.getByRole("heading", { name: "Start with your business. Find your next growth opportunity." })).toBeVisible();
    const token = page.url().split("/").at(-1)!;
    const headers = { origin: "http://127.0.0.1:4307" };
    await page.request.put(`/api/audit/${token}/context`, { headers, data: {
      name: "Fictional Review Customer", email: "review@example.com", companyName: "Clarity Review Studio", websiteUrl: "https://example.com", businessType: "professional_services", primaryMarketingGoal: "leads",
    }});
    for (const q of questions) await page.request.put(`/api/audit/${token}/answer`, { headers, data: { questionId: q.id, answer: q.sectionId === sectionId ? (q.id === "O5" ? "B" : "D") : "A" }});
    const completed = await page.request.post(`/api/audit/${token}/complete`, { headers });
    expect(completed.status()).toBe(200);
    const frozen = (await completed.json()).report;
    expect(frozen.diagnosis.primary.sectionId).toBe(sectionId);
    if (info.project.name === "desktop") writeFileSync(`tmp/phase2-review/frozen-section-${sectionId}.json`, JSON.stringify(frozen));
    await page.goto(`/audit/results/${token}`);
    await expect(page.locator(".clarity-snapshot")).toBeVisible();
    await expect(page.locator(".snapshot-clarity-stack li")).toHaveCount(6);
    await expect(page.locator('.score-grid')).toHaveCount(0);
    const stackFits = await page.locator('.snapshot-clarity-stack').evaluate(stack => {
      const r=stack.getBoundingClientRect();return Array.from(stack.querySelectorAll('li')).every(li=>{const b=li.getBoundingClientRect();return b.left>=r.left&&b.right<=r.right&&b.bottom<=r.bottom;});
    });
    expect(stackFits).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({ path: `tmp/phase2-review/${info.project.name}-${sectionId}-cover.png`, fullPage: false });
    for (const [name, selector] of Object.entries({ snapshot: ".clarity-snapshot", scorecard: ".snapshot-clarity-stack", constraint: ".constraint-lesson", example: ".case-module", work: ".work-session-heading", toolkit: "#clarity-toolkit" })) {
      await page.locator(selector).evaluate(el => el.scrollIntoView({ block: "start", behavior: "instant" }));
      await page.locator(selector).screenshot({ style: 'nav[aria-label="Main navigation"] { visibility: hidden; }', path: `tmp/phase2-review/${info.project.name}-${sectionId}-${name}.png` });
    }
    const retrieved = await page.request.get(`/api/audit/${token}/report`);
    expect((await retrieved.json()).report).toEqual(frozen);
  }
});
