import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { sample } from "./review-fixtures";
import { createReport, validateAnswers, score } from "./engine";
import {
  marketingGoals,
  goalChecks,
  goalMetrics,
  goalLabels,
  type BusinessGoal,
} from "./goals";
import { assessmentQuestions, requiredSetupFields } from "./questionnaire";
import { customerSteps } from "./customer-sequence";
import { invalidatedByChange } from "./dependencies";
import { assessmentModel } from "../versioning";
const combinations: BusinessGoal[][] = [
  ["purchases", "leads"],
  ["demos", "trials"],
  ["store_visits", "subscribers"],
  ["demos", "trials", "registrations", "store_visits", "subscribers", "other"],
];
export const goalCases = [
  ...marketingGoals.map((g) => [g]),
  ...combinations,
] as BusinessGoal[][];
function visible(r: ReturnType<typeof createReport>) {
  return JSON.stringify({
    intro: r.introduction,
    moves: r.recommendations,
    weeks: r.thirtyDayPlan,
    measures: r.progressMeasures,
    work: r.workSession,
  });
}
test("each distinct goal and representative combination receives relevant strong and weak guidance without an inferred primary", () => {
  for (const goals of goalCases)
    for (const weak of [
      undefined,
      ...assessmentQuestions(sample().setup).map((q) => q.id),
    ]) {
      const draft = sample("running", goals);
      if (weak) draft.answers[weak] = "E";
      const r = createReport(draft);
      const text = visible(r);
      assert.deepEqual(
        r.businessGoals.map((g) => g.id),
        goals,
      );
      assert.equal(r.recommendations.length, 3);
      assert.equal(r.thirtyDayPlan.length, 4);
      for (const g of goals) {
        assert.ok(
          text.includes(goalChecks[g]),
          `${g}/${weak}: missing relevant evidence work`,
        );
        assert.ok(r.progressMeasures.includes(goalMetrics[g]));
      }
      assert.doesNotMatch(
        text,
        /lead-generation business|supports validate|message testable idea|customer-quality or message/,
      );
      if (!goals.includes("leads"))
        assert.doesNotMatch(
          text,
          /qualified leads|qualified-lead|lead-generation/,
        );
      if (!goals.includes("purchases"))
        assert.doesNotMatch(
          text,
          /recent purchase journey|Trace a recent purchase|purchase contribution|your purchase business/,
        );
      if (!goals.includes("qualified_opportunities"))
        assert.doesNotMatch(text, /qualified opportunit(?:y|ies)/i);
      assert.equal(
        r.thirtyDayPlan[0].actions[0],
        r.recommendations[0].whatToDo,
      );
      if (weak === "ML3" || !weak)
        assert.equal(
          r.thirtyDayPlan[2].actions[0],
          r.recommendations[2].whatToDo,
        );
    }
});
test("goal choices and question variants stay explicit, required and goal-neutral where unspecified", () => {
  assert.equal(marketingGoals.length, 10);
  assert.ok(!marketingGoals.includes("trials_demos" as any));
  for (const goals of goalCases) {
    const d = sample("running", goals),
      questions = assessmentQuestions(d.setup);
    assert.equal(customerSteps(d.setup).length, 46);
    assert.equal(requiredSetupFields.length, 7);
    validateAnswers(d.setup, d.answers, true);
    const economic = questions.find((q) => q.id === "T6")!;
    for (const g of goals)
      assert.ok(economic.prompt.includes(goalLabels[g].toLowerCase()));
    if (!goals.includes("leads"))
      assert.doesNotMatch(
        JSON.stringify(
          questions.filter((q) => ["T6", "T7", "T8", "T10"].includes(q.id)),
        ),
        /qualified-lead|qualified leads/,
      );
    for (const q of questions) {
      const a = { ...d.answers };
      delete a[q.id];
      assert.throws(() => validateAnswers(d.setup, a, true));
    }
  }
  const other = createReport(sample("running", ["other"]));
  assert.match(
    other.recommendations[0].whatToDo,
    /Name the intended business outcome/,
  );
  assert.doesNotMatch(
    visible(other),
    /lead-generation|purchase journey|trial starts|demo requests/,
  );
});
test("goal updates invalidate dependent variants, without changing scores or rewriting old versions", () => {
  const d = sample("running", ["demos"]);
  assert.deepEqual(
    invalidatedByChange(d.setup, "outcome", ["trials"]).answers,
    ["T6", "T7", "T8", "T10"],
  );
  assert.deepEqual(
    invalidatedByChange(
      { ...d.setup, outcome: ["demos", "trials"] },
      "outcome",
      ["trials", "demos"],
    ).answers,
    [],
  );
  assert.equal(
    score(d.setup, d.answers).overallScore,
    score({ ...d.setup, outcome: ["store_visits"] }, d.answers).overallScore,
  );
  assert.throws(() =>
    createReport({ ...d, setup: { ...d.setup, outcome: [] } }),
  );
  assert.throws(() =>
    createReport({ ...d, setup: { ...d.setup, outcome: ["trials_demos"] } }),
  );
  for (const version of [
    "2.0.0-preview.4",
    "2.0.0-preview.5",
    "2.0.0-preview.6",
  ])
    assert.equal(assessmentModel(version).versions.questionnaire, version);
  const legacy = assessmentModel("2.0.0-preview.5");
  const old = JSON.parse(
    readFileSync("shared/marketing-clarity-audit/v2-goals/legacy-v5.fixture.json", "utf8"),
  );
  assert.deepEqual(
    JSON.parse(
      JSON.stringify(
        legacy.create(old.draft, new Date(old.report.createdAt) as any),
      ),
    ),
    (({ context, ...r }) => r)(old.report),
  );
});

test("goal-specific plans preserve an unchecked condition versus a confirmed gap", () => {
  const d = sample("running", ["demos", "trials"]);
  d.answers.C3 = "E";
  const unchecked = createReport(d);
  assert.equal(unchecked.diagnosis.primary?.kind, "uncertainty");
  assert.match(
    unchecked.recommendations[2].doneWhen,
    /confirms a match|no change needed/,
  );
  assert.doesNotMatch(
    unchecked.introduction,
    /a confirmed mismatch|your journey is mismatched/,
  );
  const confirmed = createReport({ ...d, answers: { ...d.answers, C3: "D" } });
  assert.equal(confirmed.diagnosis.primary?.kind, "demonstrated weakness");
  assert.notEqual(
    confirmed.recommendations[0].title,
    unchecked.recommendations[0].title,
  );
  const reportGap = createReport({
    ...d,
    answers: { ...d.answers, C3: "A", ML3: "E" },
  });
  assert.equal(reportGap.diagnosis.primary?.kind, "demonstrated weakness");
  assert.match(
    reportGap.recommendations.map((m) => m.whatToDo).join(" "),
    /definitions.*sources.*owner/,
  );
});
