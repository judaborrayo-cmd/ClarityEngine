import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  questionnaire,
  scoreAnswers,
  assessmentProgress,
  sectionBand,
  validateAnswers,
  type Answers,
  type AnswerValue,
} from "./scoring";

const uniform = (value: AnswerValue): Answers =>
  Object.fromEntries(questionnaire.questions.map((q) => [q.id, value]));

test("canonical question rules and choices retain the original supplied spec verbatim", () => {
  const spec = readFileSync(
    new URL("../../docs/marketing-clarity-audit-v1-spec.md", import.meta.url),
    "utf8",
  );
  for (const question of questionnaire.questions) {
    const block = spec
      .split(`#### ${question.id}. `)[1]
      .split(/#### |### Section |## 8\./)[0];
    assert.equal(
      block.match(/\n\*\*(.*?)\*\*/)?.[1],
      question.prompt,
      question.id,
    );
    assert.deepEqual(
      Array.from(block.matchAll(/- \*\*([A-E])\.\*\* ([^\n]+)/g)).map((m) => ({
        value: m[1],
        text: m[2],
      })),
      question.options.map((o) => ({ value: o.value, text: o.text })),
      question.id,
    );
  }
});

test("canonical questionnaire has 35 unique questions across six sections", () => {
  assert.equal(questionnaire.questions.length, 35);
  assert.equal(new Set(questionnaire.questions.map((q) => q.id)).size, 35);
  assert.deepEqual(
    questionnaire.sections.map(
      (s) => questionnaire.questions.filter((q) => q.sectionId === s.id).length,
    ),
    [6, 5, 6, 6, 6, 6],
  );
  for (const question of questionnaire.questions)
    assert.deepEqual(
      question.options.map((o) => o.value),
      ["A", "B", "C", "D", "E"],
    );
});

test("default scoring covers every answer, including E without invented overrides", () => {
  for (const [answer, expected] of [
    ["A", 100],
    ["B", 80],
    ["C", 60],
    ["D", 40],
    ["E", 20],
  ] as const) {
    assert.equal(scoreAnswers(uniform(answer)).overallScore, expected);
  }
});

test("weights affect section scores while overall weights each section equally", () => {
  const answers = uniform("A");
  answers.O5 = "E";
  const result = scoreAnswers(answers);
  assert.ok(Math.abs(result.sectionScores[1] - (100 * 25) / 30) < 1e-10);
  assert.ok(
    Math.abs(result.overallScore - ((100 * 25) / 30 + 500) / 6) < 1e-10,
  );
  assert.ok(
    result.flags.some(
      (flag) =>
        flag.questionId === "O5" &&
        flag.id === "UNVALIDATED_OFFER" &&
        flag.severity === "critical",
    ),
  );
});

test("invalid, unknown, and incomplete responses cannot produce a score", () => {
  for (const value of [null, [], { O1: "F" }, { unknown: "A" }, {}])
    assert.throws(() => scoreAnswers(value));
  assert.throws(() => validateAnswers({ O1: "<script>" }));
});

test("progress resumes first unanswered question and reflects edits without scores", () => {
  const answers = uniform("A");
  delete answers.M3;
  assert.equal(assessmentProgress(answers).nextQuestionId, "M3");
  answers.O1 = "D";
  assert.equal(assessmentProgress(answers).answered, 34);
  assert.ok(!("sectionScores" in assessmentProgress(answers)));
  assert.deepEqual(
    assessmentProgress({}).sections.map((s) => s.total),
    [6, 5, 6, 6, 6, 6],
  );
  assert.equal(assessmentProgress(uniform("A")).percent, 100);
});

test("section band thresholds preserve fractional score boundaries", () => {
  assert.deepEqual([80, 79.9, 65, 64.9, 45, 44.9].map(sectionBand), [
    "Strong",
    "Solid / Functional",
    "Solid / Functional",
    "Needs Attention",
    "Needs Attention",
    "Priority Area",
  ]);
});
