import {pillarDescription} from "../pillar-interpretation";
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import saved from "./saved-case.fixture.json";
import { versions, assessmentQuestions } from "./questionnaire";
import { createReport, resolve, score } from "./engine";
import { sample } from "../v2-goals/review-fixtures";
import { createReport as oldReport } from "../v2-goals/engine";
const run = (d: any) => createReport({ ...d, versions });
test("saved assessment: unchanged scores, Measurement first, Message next, known gaps and uncertainty separate", () => {
  const before = oldReport(saved),
    after = run(saved);
  assert.deepEqual(
    before.diagnosis.sectionScores,
    after.diagnosis.sectionScores,
  );
  assert.deepEqual(
    after.diagnosis.priorityGroups.slice(0, 2).map((g) => g.sectionIds),
    [[6], [3]],
  );
  assert.equal(after.diagnosis.primary!.sectionId, 6);
  assert.equal(after.diagnosis.primary!.kind, "demonstrated weakness");
  assert.deepEqual(after.mixedEvidence[0].knownGaps, ["ML1", "ML3"]);
  assert.deepEqual(after.mixedEvidence[0].unresolvedChecks, ["ML2"]);
  assert.match(
    [
      after.recommendations[0].whatToDo,
      ...(after.recommendations[0].supportingDetails ?? []),
    ].join(" "),
    /definitions|definition/,
  );
  assert.match(after.recommendations[1].whatToDo, /report/);
  assert.match(
    [
      after.recommendations[2].whatToDo,
      ...(after.recommendations[2].supportingDetails ?? []),
    ].join(" "),
    /difference/,
  );
  assert.match(pillarDescription(after, 6), /gaps in.*definitions.*report.*Separately, check.*results and supporting clues/);
  assert.match(after.prioritySummary, /48\/100.*70.4\/100/);
  assert.doesNotMatch(after.introduction + after.prioritySummary + JSON.stringify(after.thirtyDayPlan), /score-ordered|reorder the pillars|ranking rule|prerequisites inside/);
  assert.match(after.recommendations[0].title, /Gather the inputs/i);
  assert.doesNotMatch(
    after.introduction,
    /actionable decision to verify|you reported not really/,
  );
});
test("all110 attached scenarios: unchanged scores and ascending equal-rank groups, not 65 presumed errors", () => {
  const scenarios = JSON.parse(
    readFileSync(
      "shared/marketing-clarity-audit/v2-priority/audit110.fixture.json",
      "utf8",
    ),
  );
  assert.equal(scenarios.length, 110);
  for (const c of scenarios) {
    const d = sample(c.name.startsWith("preparing") ? "preparing" : "running");
    d.answers = c.answers;
    const r = run(d);
    assert.deepEqual(r.diagnosis.sectionScores, c.scores, c.name);
    const vals = r.diagnosis.priorityGroups.map((g) => g.score);
    assert.deepEqual(
      vals,
      [...vals].sort((a, b) => a - b),
    );
    const min = Math.min(...(Object.values(c.scores) as number[]));
    assert.equal(
      r.diagnosis.priorityGroups[0].score,
      Number(min.toFixed(1)),
      c.name,
    );
    assert.equal(r.recommendations.length, 3);
    assert.equal(r.thirtyDayPlan.length, 4);
    for (const g of r.diagnosis.priorityGroups)
      for (const id of g.sectionIds)
        assert.equal(Number(r.diagnosis.sectionScores[id].toFixed(1)), g.score);
  }
});
test("large differences and prerequisites never override score order", () => {
  const d = sample();
  d.answers.ML4 = "E";
  for (const q of assessmentQuestions(d.setup).filter((q) => q.sectionId === 3))
    d.answers[q.id] = "D";
  const r = run(d);
  assert.equal(r.diagnosis.primary!.sectionId, 3);
  assert.equal(r.diagnosis.priorityGroups[1].sectionIds[0], 6);
  assert.match(r.diagnosis.prioritySummary, /prerequisites do not change this order/);
  assert.ok(
    r.recommendations[2].whatToDo.includes("before") ||
      r.recommendations[2].whatToDo.includes("Trace"),
  );
});
test("tied scores are equally ranked, strong profiles validate rather than invent weaknesses", () => {
  const r = run(sample());
  assert.equal(r.diagnosis.primary, undefined);
  assert.equal(r.diagnosis.priorityGroups.length, 1);
  assert.equal(r.diagnosis.priorityGroups[0].sectionIds.length, 6);
  assert.match(r.priorityHeadline, /Equally ranked/);
  assert.equal(r.diagnosis.allStrong, true);
  assert.ok(
    r.recommendations.every((m) => m.why.includes("scores are strong")),
  );
  assert.ok(
    r.recommendations.every((m) => !m.why.includes("demonstrated weakness")),
  );
  const d = sample();
  d.answers.O1 = "D";
  d.answers.C1 = "D";
  const tied = run(d);
  assert.deepEqual(
    new Set(tied.diagnosis.priorityGroups[0].sectionIds),
    new Set([1, 4]),
  );
  assert.match(tied.prioritySummary, /equally ranked/);
});

test("acquisition prerequisites stay inside Traffic actions when Measurement scores higher", () => {
  const d = sample();
  for (const q of assessmentQuestions(d.setup).filter((q) => q.sectionId === 5))
    d.answers[q.id] = "D";
  d.answers.ML4 = "E";
  const r = run(d);
  assert.equal(r.diagnosis.primary!.sectionId, 5);
  assert.ok(
    r.prerequisiteNotes.some((n) => n.includes("trace a small sample")),
  );
  assert.ok(
    r.recommendations[0].supportingDetails?.some((n) =>
      n.includes("targets provisional"),
    ),
  );
  assert.ok(
    r.thirtyDayPlan[0].actions.some((n) => n.includes("targets provisional")),
  );
});
