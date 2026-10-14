import { test } from "node:test";
import assert from "node:assert/strict";
import { createFrozenReport } from "./report";
import { questionnaire, type Answers } from "./scoring";
import {
  workPrompts,
  recommendationsPresentation,
  supportingSequence,
} from "./presentation";
const context = {
  name: "Test",
  email: "test@example.com",
  companyName: "Traffic Co.",
  websiteUrl: "https://example.com",
  businessType: "professional_services",
  primaryMarketingGoal: "leads",
};
export function trafficAnswers(): Answers {
  return {
    ...Object.fromEntries(questionnaire.questions.map((q) => [q.id, "A"])),
    T1: "C",
    T2: "C",
    T3: "D",
    T4: "C",
    T5: "D",
    T6: "D",
    ML1: "B",
    ML2: "B",
    ML3: "C",
    ML4: "C",
    ML5: "C",
    ML6: "C",
  };
}
test("Scenario 5 keeps Traffic/P13 as the primary without forcing Measurement into supporting diagnosis", () => {
  const report = createFrozenReport(trafficAnswers(), context),
    before = JSON.stringify(report);
  assert.equal(Math.round(report.diagnosis.sectionScores[5]), 50);
  assert.equal(Math.round(report.diagnosis.sectionScores[6]), 66);
  assert.equal(report.diagnosis.primary?.pattern?.id, "P13");
  assert.equal(report.diagnosis.secondary, undefined);
  assert.equal(supportingSequence(report), undefined);
  const moves = recommendationsPresentation(report);
  assert.deepEqual(
    moves.map((m) => m.id),
    ["TRAF_04", "TRAF_05", "ML_06"],
  );
  assert.deepEqual(
    moves.map((m) => m.title),
    [
      "Keep your proven traffic baseline intact",
      "Run fewer tests with enough budget to learn",
      "Keep a simple marketing change log",
    ],
  );
  assert.match(moves[0].doneWhen, /control\/baseline/);
  assert.match(moves[1].whyCritical, /every answer uncertain/);
  assert.match(moves[2].doneWhen, /dated record/);
  const prompts = workPrompts(report).filter(
    (p) => p.group === "decision" && !p.legacy,
  );
  assert.equal(prompts.length, 3);
  assert.equal(prompts[0].id, "final-next-action");
  assert.equal(
    prompts[2].label,
    "What metric will tell you whether this worked?",
  );
  assert.ok(
    workPrompts(report).some((p) => p.id === "p13-decision-3" && p.legacy),
  );
  assert.ok(
    workPrompts(report).some(
      (p) => p.id === "decision-1" && p.legacy && p.label === "Decision",
    ),
  );
  assert.equal(JSON.stringify(report), before);
});
test("legacy frozen Traffic recommendations project revised content while preserving selected IDs and saved report data", () => {
  const report = createFrozenReport(trafficAnswers(), context);
  report.recommendations[0].title =
    "Protect the working baseline while testing.";
  const before = JSON.stringify(report);
  assert.equal(
    recommendationsPresentation(report)[0].title,
    "Keep your proven traffic baseline intact",
  );
  assert.equal(JSON.stringify(report), before);
  const supporting = createFrozenReport(
    {
      ...trafficAnswers(),
      ML1: "C",
      ML2: "D",
      ML3: "D",
      ML4: "C",
      ML5: "D",
      ML6: "C",
    },
    context,
  );
  assert.ok(supporting.diagnosis.secondary);
  assert.match(supportingSequence(supporting)!.intro, /Focus first on/);
  assert.match(supportingSequence(supporting)!.next, /reassess/);
});
