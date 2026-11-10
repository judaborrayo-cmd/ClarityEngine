import { test } from "node:test";
import assert from "node:assert/strict";
import { scenarios } from "../v2/scenarios";
import {
  versions,
  assessmentQuestions,
  requiredSetupFields,
  type Setup,
} from "./questionnaire";
import { createReport, score, validateAnswers } from "./engine";
import {
  customerSteps,
  completedStepValues,
  setupPlacement,
} from "./customer-sequence";
import { pillarDescription } from "../pillar-interpretation";
import { goalLabels } from "./goals";
import { sample } from "./review-fixtures";
test("all business goals survive without choosing a hidden primary; mixed reports keep separate measures", () => {
  const draft = sample("running", [
    "purchases",
    "leads",
    "booked_calls",
    "subscribers",
  ]);
  const report = createReport(draft);
  assert.deepEqual(report.setup.outcome, draft.setup.outcome);
  assert.deepEqual(
    report.businessGoals.map((g) => g.id),
    draft.setup.outcome,
  );
  assert.match(
    report.recommendations[0].whatToDo,
    /purchases and qualified leads/,
  );
  assert.ok(report.progressMeasures.some((x) => /close rate/.test(x)));
  assert.ok(report.progressMeasures.some((x) => /contribution/.test(x)));
  assert.ok(report.progressMeasures.some((x) => /subscribers/i.test(x)));
  assert.match(report.recommendations[2].whatToDo, /separately/);
  assert.match(
    report.thirtyDayPlan[3].actions.join(" "),
    /each selected business goal/,
  );
  assert.equal(
    score(sample("running", ["purchases"]).setup, draft.answers).overallScore,
    score(draft.setup, draft.answers).overallScore,
  );
  assert.throws(() =>
    createReport({ ...draft, setup: { ...draft.setup, outcome: [] } }),
  );
  assert.throws(() =>
    createReport({
      ...draft,
      setup: { ...draft.setup, outcome: ["leads", "leads"] },
    }),
  );
});
test("all 46 steps are mandatory, interleaved in natural pillars, with dynamic dependencies respected", () => {
  const draft = sample(),
    steps = customerSteps(draft.setup);
  assert.equal(steps.length, 46);
  assert.equal(new Set(steps.map((s) => s.key)).size, 46);
  assert.deepEqual(
    [...new Set(steps.map((s) => s.sectionId))],
    [1, 2, 3, 4, 5, 6],
  );
  assert.equal(steps.find((s) => s.field === "outcome")!.sectionId, 1);
  assert.equal(steps.find((s) => s.field === "paidStatus")!.sectionId, 2);
  assert.equal(steps.find((s) => s.field === "trend")!.sectionId, 6);
  for (const f of requiredSetupFields)
    assert.equal(steps.filter((s) => s.field === f).length, 1);
  const idx = (key: string) => steps.findIndex((s) => s.key === key);
  assert.ok(idx("setup-paidStatus") < idx("setup-nonUseReason"));
  assert.ok(idx("T6") < idx("setup-testReadiness"));
  assert.ok(idx("setup-platforms") < idx("setup-trend"));
  assert.equal(
    completedStepValues({ ...draft.setup, outcome: [] }, draft.answers)[
      "setup-outcome"
    ],
    undefined,
  );
  for (const q of assessmentQuestions(draft.setup)) {
    const a = { ...draft.answers };
    delete a[q.id];
    assert.throws(() => validateAnswers(draft.setup, a, true));
  }
});
test("non-advertisers answer six distinct readiness questions, with no repeated status answers", () => {
  const draft = sample("deliberate"),
    questions = assessmentQuestions(draft.setup).filter((q) =>
      /^T(?:[5-9]|10)$/.test(q.id),
    );
  assert.equal(questions.length, 6);
  assert.equal(new Set(questions.map((q) => q.prompt)).size, 6);
  for (const q of questions) {
    assert.equal(q.options.length, 5);
    assert.ok(
      q.options.every(
        (o) =>
          o.value !== "F" &&
          !/not currently running paid advertising/i.test(o.text),
      ),
    );
  }
  assert.throws(() =>
    validateAnswers(draft.setup, { ...draft.answers, T5: "F" }, true),
  );
  const deliberate = score(draft.setup, draft.answers),
    unexplored = score(sample("unexplored").setup, draft.answers);
  assert.ok(deliberate.sectionScores[5] > unexplored.sectionScores[5]);
  assert.ok(deliberate.sectionScores[5] < 100);
  assert.ok(unexplored.sectionScores[5] > 0);
  const weak = { ...draft.answers, T10: "E" };
  const report = createReport({ ...draft, answers: weak });
  assert.equal(report.diagnosis.primary?.id, "prep_T10");
  assert.match(report.recommendations[0].title, /customer actions/);
  assert.doesNotMatch(
    report.recommendations.map((m) => m.whatToDo).join(" "),
    /hire an employee|launch a campaign now/,
  );
  assert.equal(deliberate.nonUseScoring.combinedWeight, 1);
  assert.equal(deliberate.nonUseScoring.readinessCombinedWeight, 1);
  for (const id of [1, 2, 3, 4, 6])
    assert.equal(
      score(draft.setup, weak).sectionScores[id],
      deliberate.sectionScores[id],
    );
});
test("plain customer language preserves checked-versus-confirmed distinctions and actionable weekly plans", () => {
  const draft = sample();
  const unknown = createReport({
      ...draft,
      answers: { ...draft.answers, C3: "E" },
    }),
    known = createReport({ ...draft, answers: { ...draft.answers, C3: "D" } });
  assert.match(unknown.recommendations[0].title, /whether.*match/);
  assert.match(unknown.recommendations[2].title, /Keep a match/);
  assert.match(known.recommendations[0].title, /where.*differ/);
  assert.doesNotMatch(
    JSON.stringify([
      unknown.recommendations,
      unknown.introduction,
      unknown.thirtyDayPlan,
    ]),
    /promise continuity through the journey/,
  );
  const prep = sample("preparing");
  prep.answers.T8 = "C";
  const p = createReport(prep);
  assert.equal(p.diagnosis.primary?.kind, "uncertainty");
  assert.match(p.recommendations[0].why, /not.*repair/);
  assert.ok(
    p.thirtyDayPlan.every((w) =>
      w.actions.every((a) => typeof a === "string" && a.length > 0),
    ),
  );
  assert.equal(p.thirtyDayPlan[0].actions[0], p.recommendations[0].whatToDo);
  assert.equal(p.thirtyDayPlan[2].actions[0], p.recommendations[2].whatToDo);
});
test("six pillar interpretations are distinct and do not describe an unchecked condition as a failure", () => {
  const draft = sample(),
    report = createReport({ ...draft, answers: { ...draft.answers, C3: "E" } }),
    descriptions = [1, 2, 3, 4, 5, 6].map((id) =>
      pillarDescription(report, id),
    );
  assert.equal(new Set(descriptions).size, 6);
  assert.match(
    descriptions[3],
    /missing verification, not a confirmed failure/,
  );
  assert.ok(
    descriptions.every(
      (x) => !x.includes("Review the supporting evidence in your answers"),
    ),
  );
});

test("other selected goals do not invent purchase requirements, and KPI report guidance preserves trusted inputs", () => {
  const goals = sample("running", ["subscribers", "registrations"]);
  const r = createReport(goals);
  assert.match(r.recommendations[0].whatToDo, /subscribers/i);
  assert.match(r.recommendations[0].whatToDo, /registrations/i);
  assert.doesNotMatch(r.recommendations[0].whatToDo, /recent purchase journey/);
  const missing = sample();
  missing.answers.ML3 = "E";
  const a = createReport(missing);
  assert.match(
    a.recommendations.map((m) => m.whatToDo).join(" "),
    /definitions/,
  );
  assert.match(a.recommendations.map((m) => m.whatToDo).join(" "), /sources/);
  assert.match(a.recommendations.map((m) => m.whatToDo).join(" "), /owner/);
  assert.match(a.recommendations.map((m) => m.whatToDo).join(" "), /review/);
  assert.equal(a.diagnosis.primary?.kind, "demonstrated weakness");
  const inconsistent = sample();
  inconsistent.answers.ML3 = "B";
  const b = createReport(inconsistent);
  assert.match(
    b.recommendations.map((m) => m.whatToDo).join(" "),
    /existing report/i,
  );
  assert.match(
    b.recommendations.map((m) => m.whatToDo).join(" "),
    /Reuse the trusted sources.*do not replace them/i,
  );
});
