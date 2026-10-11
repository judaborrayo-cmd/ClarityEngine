import { test } from "node:test";
import assert from "node:assert/strict";
import { createFrozenReport, matchCase } from "./report";
import { questionnaire, type Answers } from "./scoring";
import { customerContextSchema } from "./context";

const context = customerContextSchema.parse({
  name: "Test",
  email: "test@example.com",
  companyName: "Example",
  websiteUrl: "https://example.com",
  businessType: "professional_services",
  primaryMarketingGoal: "leads",
});
const answers = (changes: Partial<Answers> = {}): Answers =>
  Object.fromEntries(
    questionnaire.questions.map((q) => [q.id, changes[q.id] ?? "A"]),
  );

test("neutral P09 report never guesses the direction of mismatch", () => {
  const report = createFrozenReport(answers({ C6: "D" }), context);
  assert.equal(
    report.summary,
    "The commitment you're asking from the visitor and the experience surrounding that decision appear to be out of alignment.",
  );
  assert.deepEqual(
    report.recommendations.map((r) => r.id),
    ["P09_NEUTRAL_01", "P09_NEUTRAL_02", "P09_NEUTRAL_03"],
  );
  assert.ok(
    report.workSession.primaryPrompts.some((p) =>
      p.includes("Determine which direction applies"),
    ),
  );
  assert.ok(report.recommendations[2].whatToDo.includes("or"));
});

test("curated bundles, output counts and completion criteria are preserved", () => {
  const a = answers();
  for (const q of questionnaire.questions.filter((q) => q.sectionId === 3))
    a[q.id] = "D";
  const report = createFrozenReport(a, context);
  assert.deepEqual(
    report.recommendations.map((r) => r.id),
    ["MSG_01", "MSG_03", "MSG_05"],
  );
  assert.ok(
    report.recommendations.every((r) => r.whatToDo && r.why && r.doneWhen),
  );
  assert.ok(report.deprioritized.length <= 3);
  assert.equal(report.workSession.primaryPrompts.length, 6);
  assert.equal(report.thirtyDayPlan.length, 4);
  assert.ok(report.kpis.primary && report.kpis.supporting);
  assert.ok(report.kpis.diagnostic.length <= 2);
});

test("proof deployment contradiction substitutes within the same strategic purpose", () => {
  const report = createFrozenReport(answers({ C5: "D" }), context);
  assert.equal(report.diagnosis.primary?.pattern?.id, "P07");
  assert.ok(!report.recommendations.some((r) => r.id === "MSG_05"));
  assert.ok(report.recommendations.some((r) => r.id === "CONV_05"));
  assert.equal(new Set(report.recommendations.map(r => r.id)).size, 3);
});

test("case relevance takes precedence over evidence rank and model breaks relevance ties", () => {
  const card = matchCase(1, context);
  assert.equal(card?.id, "CASE_BUSINESS_SYSTEMS_POSITIONING");
  assert.equal(card?.evidence, "C_strategic");
  assert.equal(
    matchCase(6, { ...context, businessType: "travel_hospitality" })?.id,
    "CASE_RETREAT_KPI_BREADTH",
  );
});

test("frozen report snapshot is independent of subsequent input changes", () => {
  const a = answers({ C6: "D" });
  const report = createFrozenReport(
    a,
    context,
    {},
    new Date("2026-10-04T12:00:00Z"),
  );
  const serialized = JSON.stringify(report);
  a.C6 = "A";
  const oldName = context.companyName;
  context.companyName = "Changed";
  assert.equal(JSON.stringify(report), serialized);
  assert.equal(report.context.companyName, oldName);
  context.companyName = oldName;
  assert.equal(report.createdAt, "2026-10-04T12:00:00.000Z");
});

test("healthy answers do not manufacture a constraint, bundle or AI accelerator", () => {
  const report = createFrozenReport(answers(), context);
  assert.equal(report.diagnosis.primary, undefined);
  assert.equal(report.recommendations.length, 0);
  assert.equal(report.aiAccelerators.length, 0);
});
