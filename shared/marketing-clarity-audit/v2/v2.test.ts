import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  assessmentQuestions,
  versions,
  questionCounts,
  setupSchema,
  nonUseScores,
  nonUseSignalScore,
  type Choice,
} from "./questionnaire";
import {
  score,
  createReport,
  progress,
  resolve,
  resumePolicy,
  draftSchema,
} from "./engine";
import { scenario, scenarios } from "./scenarios";

test("all scenarios produce deterministic bounded complete reports without mutating inputs", () => {
  for (const { name, draft } of scenarios) {
    const raw = JSON.stringify(draft);
    const date = new Date("2026-11-02T12:00:00Z");
    const report = createReport(draft, date);
    assert.deepEqual(report, createReport(draft, date), name);
    assert.equal(JSON.stringify(draft), raw);
    assert.equal(report.recommendations.length, 3, name);
    assert.equal(
      new Set(report.recommendations.map((r) => r.id)).size,
      3,
      name,
    );
    assert.deepEqual(
      report.thirtyDayPlan.map((w) => w.week),
      [1, 2, 3, 4],
    );
    assert.ok(
      report.recommendations.every(
        (r) => r.title && r.whatToDo && r.why && r.doneWhen,
      ),
      name,
    );
    assert.ok(
      report.thirtyDayPlan.every(
        (w) => w.actions.length && w.completionCriteria,
      ),
    );
    assert.equal(report.workSession.length, 6);
    for (const n of [
      ...Object.values(report.diagnosis.sectionScores),
      report.diagnosis.overallScore,
    ])
      assert.ok(n >= 0 && n <= 100);
  }
});
test("everyone answers 39 questions plus 7 context prompts, with dynamic completion and equal section weights", () => {
  for (const status of ["running", "preparing", "not_planning"] as const)
    for (const v of ["A", "B", "C", "D", "E"] as Choice[]) {
      const { draft } = scenario(status, {}, { paidStatus: status }, v);
      const result = score(draft.setup, draft.answers);
      if (status === "running")
        assert.equal(result.overallScore, (5 - "ABCDE".indexOf(v)) * 20);
      assert.equal(Object.keys(draft.answers).length, 39);
      assert.equal(progress(draft.setup, draft.answers).percent, 100);
      assert.equal(questionCounts(draft.setup).requiredAnswers, 46);
      assert.equal(
        result.overallScore,
        Object.values(result.sectionScores).reduce((a, b) => a + b, 0) / 6,
      );
      for (const id of Object.keys(draft.answers)) {
        const partial = { ...draft.answers };
        delete partial[id];
        assert.throws(() => score(draft.setup, partial), id);
        assert.equal(progress(draft.setup, partial).nextQuestionId, id);
      }
      for (const field of [
        "paidStatus",
        "outcome",
        "nonUseReason",
        "platforms",
        "owner",
        "trend",
        "testReadiness",
      ]) {
        const partial = { ...draft.setup };
        delete partial[field as keyof typeof partial];
        assert.throws(() => setupSchema.parse(partial));
      }
    }
});
test("non-use reasons and readiness score once in Traffic, without changing other sections", () => {
  const values: Record<string, number> = {};
  for (const reason of [
    "deliberate",
    "support",
    "risk",
    "tried",
    "preparing",
    "unexplored",
  ] as const) {
    const d = scenario(
      reason,
      {},
      { paidStatus: "not_planning", nonUseReason: reason },
    ).draft;
    const s = score(d.setup, d.answers);
    values[reason] = s.sectionScores[5];
    assert.equal(s.nonUseScoring.combinedWeight, 1);
    assert.equal(s.nonUseScoring.questionIds.length, 6);
    assert.ok(
      Math.abs(
        s.sectionScores[5] - ((21.25 + nonUseScores[reason]) / 26.25) * 100,
      ) < 1e-8,
    );
    assert.ok(s.sectionScores[5] < 100 && s.sectionScores[5] > 20);
    for (const id of [1, 2, 3, 4, 6]) assert.equal(s.sectionScores[id], 100);
    const lessReady = { ...d.setup, testReadiness: "unknown" as const };
    assert.ok(
      score(lessReady, d.answers).sectionScores[5] <= s.sectionScores[5],
    );
    assert.ok(nonUseSignalScore(lessReady) >= 2);
    const weakEconomics = { ...d.answers, T6: "E" as const };
    assert.ok(
      score(d.setup, weakEconomics).sectionScores[5] < s.sectionScores[5],
    );
    assert.equal(createReport(d).recommendations.length, 3);
    assert.equal(createReport(d).thirtyDayPlan.length, 4);
  }
  assert.ok(
    values.deliberate > values.preparing &&
      values.preparing > values.unexplored,
  );
});
test("trend direction, job title, optional context and platform count never determine scores", () => {
  const base = scenario("base").draft;
  for (const changes of [
    { owner: "Founder / owner" },
    { owner: "Agency / external specialist" },
    { trend: "Generally declining" },
    { platforms: "single" },
    { trendContext: "Intentional expansion" },
  ] as const) {
    const d = scenario("context", {}, changes).draft;
    assert.deepEqual(
      score(d.setup, d.answers),
      score(base.setup, base.answers),
    );
  }
  assert.equal(resolve(base.setup, base.answers).primary, undefined);
  const founder = scenario("founder", {}, { owner: "Founder / owner" }).draft;
  assert.equal(resolve(founder.setup, founder.answers).primary, undefined);
});
test("specific paid gaps are detected despite strong average scores and readiness is a prerequisite", () => {
  for (const [id, expected] of [
    ["T5", "ownership"],
    ["T6", "economics"],
    ["T7", "reporting"],
    ["T8", "reporting"],
    ["T9", "creative"],
    ["T10", "signals"],
  ]) {
    const d = scenario(id, { [id]: "E" }).draft;
    const diagnosis = resolve(d.setup, d.answers);
    assert.ok(diagnosis.overallScore > 95);
    assert.equal(diagnosis.primary?.id, expected);
    const stronger = scenario(id, { [id]: "B" }).draft;
    assert.ok(
      score(stronger.setup, stronger.answers).overallScore >
        diagnosis.overallScore,
    );
  }
  const d = scenario("precedence", { ML4: "E", T9: "E" }).draft;
  assert.equal(resolve(d.setup, d.answers).primary?.sectionId, 6);
  assert.match(
    resolve(d.setup, d.answers).priorityReason,
    /reporting inputs first/,
  );
});
test("reporting evidence is grouped and ownership does not imply interest or hiring", () => {
  const d = scenario("both", { T7: "D", T8: "D" }).draft;
  assert.equal(
    resolve(d.setup, d.answers).opportunities.filter(
      (o) => o.id === "reporting",
    ).length,
    1,
  );
  const founder = scenario(
    "founder",
    { T5: "D" },
    { owner: "Founder / owner" },
  ).draft;
  assert.doesNotMatch(
    JSON.stringify(createReport(founder)),
    /must hire|wants to hire|serviceInterest|purchaseHistory/,
  );
});
test("routes reject irrelevant, unknown, malformed or missing evidence without inventing answers", () => {
  const d = scenario("nonpaid", {}, { paidStatus: "not_planning" }).draft;
  assert.throws(() =>
    createReport({ ...d, answers: { ...d.answers, unknown: "A" } }),
  );
  assert.throws(() =>
    createReport({ ...d, answers: { ...d.answers, O1: "F" } }),
  );
  assert.throws(() =>
    createReport({ ...d, answers: { ...d.answers, O1: "F" } }),
  );
  assert.throws(() =>
    createReport({ ...d, versions: { ...versions, questionnaire: "1.0.0" } }),
  );
  const running = scenario("running").draft;
  assert.throws(() =>
    setupSchema.parse({ ...running.setup, owner: undefined }),
  );
  assert.throws(() =>
    draftSchema.parse({ ...running, purchaseInterest: true }),
  );
});
test("purchase, lead and single platform wording is adapted without changing identifiers", () => {
  const d = scenario(
    "lead",
    {},
    { outcome: "leads", platforms: "single" },
  ).draft;
  const q = assessmentQuestions(d.setup);
  assert.match(q.find((q) => q.id === "T6")!.prompt, /qualified lead/);
  assert.match(
    q.find((q) => q.id === "T7")!.prompt,
    /your advertising platform/,
  );
  assert.equal(new Set(q.map((q) => q.id)).size, 39);
});
test("legacy in-progress assessments, retakes and frozen reports remain on their existing version", () => {
  assert.deepEqual(resumePolicy({}), { action: "resume_v1", migrate: false });
  assert.equal(resumePolicy({ run_number: 2 }).action, "resume_v1");
  const frozen = { report: { reportVersion: "1.0.0", summary: "Original" } };
  const raw = JSON.stringify(frozen);
  assert.equal(resumePolicy(frozen).action, "show_frozen_report");
  assert.equal(JSON.stringify(frozen), raw);
  assert.equal(resumePolicy({ versions }).action, "resume_v2");
  assert.throws(() => resumePolicy({ versions: { questionnaire: "future" } }));
  // Existing engine and canonical question set remain pinned, including old T5/T6 semantics.
  const v1 = JSON.parse(
    readFileSync(new URL("../questionnaire.json", import.meta.url), "utf8"),
  );
  assert.equal(v1.version, "1.0.0");
  assert.equal(v1.questions.length, 35);
});
test("seeded sensitivity sweep: 500 answer sets are bounded, deterministic and complete", () => {
  let seed = 727;
  for (let i = 0; i < 500; i++) {
    const d = scenario(
      "seeded",
      {},
      {
        paidStatus:
          i % 3 === 0 ? "running" : i % 3 === 1 ? "preparing" : "not_planning",
      },
    ).draft;
    for (const id of Object.keys(d.answers)) {
      if (d.answers[id] === "F") continue;
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      d.answers[id] = "ABCDE"[seed % 5] as Choice;
    }
    const a = resolve(d.setup, d.answers),
      b = resolve(d.setup, d.answers);
    assert.deepEqual(a, b);
    assert.ok(a.overallScore >= 20 && a.overallScore <= 100);
    assert.equal(createReport(d).recommendations.length, 3);
    assert.equal(createReport(d).thirtyDayPlan.length, 4);
  }
});

test("non-advertiser recommendations respect prerequisites and deliberate choices", () => {
  const deliberate = scenario(
    "deliberate",
    {},
    { paidStatus: "not_planning", nonUseReason: "deliberate" },
  ).draft;
  assert.equal(
    resolve(deliberate.setup, deliberate.answers).primary?.id,
    "nonuse",
  );
  assert.match(
    createReport(deliberate).recommendations[0].title,
    /channel choice/,
  );
  const unexplored = scenario(
    "unexplored",
    { T6: "A" },
    { paidStatus: "not_planning", nonUseReason: "unexplored" },
  ).draft;
  assert.match(
    createReport(unexplored).recommendations[2].title,
    /optional, bounded experiment/,
  );
  const blocked = scenario(
    "blocked",
    { ML4: "E", O5: "E" },
    {
      paidStatus: "preparing",
      nonUseReason: "preparing",
      testReadiness: "unknown",
    },
  ).draft;
  assert.equal(resolve(blocked.setup, blocked.answers).primary?.sectionId, 6);
  assert.doesNotMatch(
    JSON.stringify(createReport(blocked).recommendations),
    /launch your ads|start spending now/,
  );
  const running = scenario("bad active").draft;
  running.answers.T5 = "F";
  assert.throws(() => createReport(running));
});
