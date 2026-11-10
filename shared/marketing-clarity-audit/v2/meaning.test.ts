import { test } from "node:test";
import assert from "node:assert/strict";
import {
  answerMeaning,
  answerMeanings,
  meaningExplanation,
} from "./answer-meaning";
import { assessmentQuestions, type Choice } from "./questionnaire";
import { createReport } from "./engine";
import { scenario, scenarios } from "./scenarios";

const ids = /\b(?:O[1-6]|A[1-5]|M[1-6]|C[1-6]|T(?:[1-9]|10)|ML[1-6])\b/;
function customerCopy(r: ReturnType<typeof createReport>) {
  return JSON.stringify({
    introduction: r.introduction,
    trend: r.trendNote,
    moves: r.recommendations.map((m) => ({
      title: m.title,
      what: m.whatToDo,
      why: m.why,
      done: m.doneWhen,
    })),
    weeks: r.thirtyDayPlan.map((w) => ({
      title: w.title,
      objective: w.objective,
      actions: w.actions,
      done: w.completionCriteria,
    })),
    checks: r.diagnosis.contradictions,
    work: r.workSession,
    caveat: r.caveat,
  });
}
test("all 201 diagnostic options have explicit reviewed meanings, independent of keyword matching", () => {
  const d = scenario("meaning audit").draft;
  let count = 0;
  for (const q of assessmentQuestions(d.setup)) {
    assert.equal(answerMeanings[q.id].length, 5);
    for (const o of q.options) {
      const meaning = answerMeaning(q.id, o.value);
      assert.ok(meaningExplanation[meaning]);
      count++;
    }
  }
  assert.equal(count, 201);
  assert.equal(answerMeaning("C3", "E"), "missing_verification");
  assert.equal(answerMeaning("C4", "E"), "missing_verification");
  assert.equal(answerMeaning("O4", "E"), "missing_verification");
  assert.equal(answerMeaning("ML3", "E"), "reported_gap");
  assert.equal(answerMeaning("ML6", "E"), "reported_gap");
  assert.equal(answerMeaning("M6", "E"), "reported_gap");
  assert.equal(answerMeaning("T6", "E"), "reported_gap");
});
test("profile 89 treats unreviewed continuity as verification, with a confirmed match as completion", () => {
  const r = createReport(scenarios[88].draft);
  assert.equal(r.answers.C3, "E");
  assert.equal(r.diagnosis.primary?.kind, "uncertainty");
  assert.match(r.introduction, /whether they match remains unverified/);
  assert.doesNotMatch(
    r.introduction,
    /not consistently carried|mismatch exists\./,
  );
  assert.match(
    r.recommendations[0].whatToDo,
    /Record both the matches and any differences/,
  );
  assert.match(
    r.recommendations[1].whatToDo,
    /determine whether|Determine whether/,
  );
  assert.match(
    r.recommendations[2].doneWhen,
    /confirms a match with no change needed/,
  );
  assert.match(
    r.thirtyDayPlan[2].completionCriteria,
    /Both are useful completed outcomes/,
  );
  assert.match(
    r.thirtyDayPlan[3].actions[0],
    /confirmed match counts as a useful outcome/,
  );
});
test("confirmed continuity mismatch and missing review have different diagnoses and tasks", () => {
  const confirmed = createReport(scenario("C3 D", { C3: "D" }).draft);
  const unknown = createReport(scenario("C3 E", { C3: "E" }).draft);
  assert.equal(confirmed.diagnosis.primary?.kind, "demonstrated weakness");
  assert.equal(unknown.diagnosis.primary?.kind, "uncertainty");
  assert.notEqual(
    confirmed.recommendations[2].whatToDo,
    unknown.recommendations[2].whatToDo,
  );
  for (const [id, row] of Object.entries(answerMeanings))
    for (let i = 0; i < 5; i++)
      if (row[i] === "missing_verification") {
        const r = createReport(
          scenario(id, { [id]: "ABCDE"[i] as Choice }).draft,
        );
        assert.equal(
          r.diagnosis.primary?.kind,
          "uncertainty",
          `${id}=${"ABCDE"[i]}`,
        );
      }
});
test("profile 90 is a known reporting gap, not uncertainty, and creates an actual lightweight report", () => {
  const r = createReport(scenarios[89].draft);
  assert.equal(r.answers.ML3, "E");
  assert.match(scenarios[89].name, /no formal KPI reporting exists/);
  assert.doesNotMatch(scenarios[89].name, /uncertainty/i);
  assert.equal(r.diagnosis.primary?.kind, "demonstrated weakness");
  assert.match(r.introduction, /no formal report/);
  const copy = r.recommendations.map((m) => m.whatToDo).join(" ");
  for (const term of [
    "metric definitions",
    "reporting periods",
    "sources",
    "update owner",
    "review",
  ])
    assert.ok(copy.includes(term), term);
  assert.match(copy, /trusted sources you already have/);
  assert.match(copy, /business outcomes you already have clearly defined/);
  assert.match(r.recommendations[2].whatToDo, /Create the lightweight report/);
  assert.match(r.thirtyDayPlan[2].actions[0], /Create the lightweight report/);
});
test("existing inconsistent KPI reports are improved instead of replaced", () => {
  for (const value of ["B", "C"] as const) {
    const r = createReport(scenario("existing report", { ML3: value }).draft);
    assert.match(r.recommendations[2].whatToDo, /Improve the existing report/);
    assert.doesNotMatch(
      r.recommendations[2].whatToDo,
      /Create the lightweight report/,
    );
    assert.match(r.recommendations[1].whatToDo, /rather than starting again/);
    if (value === "B") {
      assert.match(
        r.introduction,
        /updates or reviews are occasionally inconsistent/,
      );
      assert.doesNotMatch(r.introduction, /spread across several tools/);
    }
  }
});
test("customer explanations contain neither question identifiers nor diagnostic implementation labels", () => {
  for (const s of scenarios) {
    const r = createReport(s.draft);
    assert.doesNotMatch(customerCopy(r), ids, s.name);
    assert.doesNotMatch(
      customerCopy(r),
      /Selected for|Selected from|missing_verification|reported_gap|deterministic interpretation|selected opportunity|one shared paid-acquisition opportunity signal/,
      s.name,
    );
    for (const m of r.recommendations) assert.ok(m.selectionReason);
  }
  const r = createReport(scenarios[88].draft);
  assert.ok(r.recommendations.every((m) => m.evidenceIds?.includes("C3")));
  assert.match(r.recommendations[0].selectionReason!, /C3=E/);
});
