import { test } from "node:test";
import assert from "node:assert/strict";
import { questionnaire } from "./scoring";
import { createFrozenReport } from "./report";
import { sectionColors } from "./sections";
import {
  aiPresentation,
  caseTeaching,
  recommendationWhyCritical,
  confidencePresentation,
  reportPlan,
  workPrompts,
} from "./presentation";
import { foundationalOfferPlan, buildClarityPlan } from "./plan";
import content from "./report-content.json";
const context = {
  name: "Customer",
  email: "customer@example.com",
  companyName: "Example",
  websiteUrl: "https://example.com",
  businessType: "professional_services",
  primaryMarketingGoal: "leads",
};
const answers = Object.fromEntries(
  questionnaire.questions.map((q) => [
    q.id,
    q.sectionId === 1 ? (q.id === "O5" ? "B" : "D") : "A",
  ]),
);
function contrast(a: string, b: string) {
  const luminance = (hex: string) => {
    const c = hex
      .match(/[0-9a-f]{2}/gi)!
      .map((v) => parseInt(v, 16) / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  };
  const x = luminance(a),
    y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}
test("six brand section colors are distinct and meet AA text contrast", () => {
  assert.deepEqual(
    Object.values(sectionColors).map((c) => c.name),
    questionnaire.sections.map((s) => s.name),
  );
  assert.equal(
    new Set(Object.values(sectionColors).map((c) => c.color)).size,
    6,
  );
  for (const theme of Object.values(sectionColors))
    assert.ok(contrast(theme.color, theme.tint) >= 4.5);
});
test("Offer 48 retains P01 and high 100 confidence with an Offer-centered explanation", () => {
  const report = createFrozenReport(answers, context);
  assert.equal(Math.round(report.diagnosis.sectionScores[1]), 48);
  assert.equal(report.diagnosis.primary?.pattern?.id, "P01");
  assert.equal(report.diagnosis.confidence.score, 100);
  assert.match(
    confidencePresentation(report).explanation,
    /Multiple Offer responses consistently point to clarity and packaging/,
  );
  assert.match(
    confidencePresentation(report).explanation,
    /downstream sections remain comparatively strong/,
  );
  assert.ok(!confidencePresentation(report).explanation.includes("Audience"));
  assert.deepEqual(report.thirtyDayPlan, foundationalOfferPlan);
  assert.deepEqual(
    report.recommendations.map((r) => r.id),
    ["OFF_01", "OFF_02", "OFF_03"],
  );
});
test("legacy frozen reports receive rich presentation without mutation; AI and work prompt IDs are structured", () => {
  const report = createFrozenReport(answers, context);
  const legacy = structuredClone(report);
  legacy.thirtyDayPlan = report.thirtyDayPlan.map((w) => ({
    ...w,
    actions: [w.objective],
    completionCriteria: `Document the result of this phase: ${w.objective}.`,
  }));
  const serialized = JSON.stringify(legacy);
  assert.deepEqual(reportPlan(legacy), foundationalOfferPlan);
  assert.equal(JSON.stringify(legacy), serialized);
  const ai = aiPresentation(report)[0];
  assert.ok(ai.gather.length && ai.ask && ai.use);
  assert.match(ai.use, /make the strategic decision yourself/);
  const prompts = workPrompts(report);
  assert.equal(new Set(prompts.map((p) => p.id)).size, prompts.length);
  assert.ok(prompts.some((p) => p.group === "decision"));
  for (const pattern of content.patterns) {
    const weeks = buildClarityPlan(pattern, report.recommendations);
    assert.equal(weeks.length, 4);
    for (const week of weeks) {
      assert.ok(
        week.objective && week.actions.length && week.completionCriteria,
      );
      assert.ok(!week.actions.includes(week.objective));
      assert.ok(
        !week.completionCriteria.startsWith(
          "Document the result of this phase:",
        ),
      );
    }
  }
});

test("customer-centered example and AI guidance preserve selected frozen content", () => {
  const report = createFrozenReport(
    Object.fromEntries(
      questionnaire.questions.map((q) => [
        q.id,
        q.sectionId === 1 ? (q.id === "O5" ? "B" : "D") : "A",
      ]),
    ),
    context,
  );
  const frozen = JSON.stringify(report);
  const teaching = caseTeaching(report)!;
  assert.equal(teaching.stages.length, 5);
  assert.match(teaching.title, /business outcome/);
  assert.match(
    teaching.stages.find(
      ([label]) => label === "What customers actually cared about",
    )![1],
    /more leads, easier booking/,
  );
  assert.match(teaching.lesson, /what’s in it for them/);
  assert.match(
    teaching.stages.find(
      ([label]) => label === "What customers were shown",
    )![1],
    /coming soon/,
  );
  const reasons = report.recommendations.map(recommendationWhyCritical);
  assert.equal(new Set(reasons).size, 3);
  assert.match(reasons[0], /piece together the value/);
  const historicalMove = { ...report.recommendations[0] };
  delete (historicalMove as { whyCritical?: string }).whyCritical;
  assert.equal(recommendationWhyCritical(historicalMove), reasons[0]);
  const ai = aiPresentation(report)[0];
  assert.equal(ai.gather.length, 6);
  assert.match(ai.ask, /repeated customer problems/);
  assert.match(ai.use, /strategic decision yourself/);
  assert.equal(JSON.stringify(report), frozen);
});
