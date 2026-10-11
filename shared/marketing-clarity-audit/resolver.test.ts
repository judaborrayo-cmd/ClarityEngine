import { test } from "node:test";
import assert from "node:assert/strict";
import { questionnaire, type Answers, type AnswerValue } from "./scoring";
import {
  resolveDiagnosis,
  diagnosticConfidence,
  detectContradictions,
  matchPatterns,
} from "./resolver";

const fixture = (
  changes: Partial<Answers> = {},
  sections: Record<number, AnswerValue> = {},
): Answers =>
  Object.fromEntries(
    questionnaire.questions.map((q) => [
      q.id,
      changes[q.id] ?? sections[q.sectionId] ?? "A",
    ]),
  );

test("canonical stress: strong offer and audience, weak message", () => {
  const result = resolveDiagnosis(fixture({}, { 3: "D" }));
  assert.equal(result.primary?.sectionId, 3);
  assert.equal(result.primary?.pattern?.id, "P05");
});

test("canonical stress: weak offer and scale readiness produce Offer and More-Traffic Trap", () => {
  const result = resolveDiagnosis(fixture({}, { 1: "D" }));
  assert.equal(result.primary?.sectionId, 1);
  assert.ok(result.patterns.some((p) => p.id === "P10"));
});

test("canonical stress: functional upstream, low traffic and trusted measurement", () => {
  const result = resolveDiagnosis(fixture({}, { 5: "D" }));
  assert.equal(result.primary?.sectionId, 5);
  assert.equal(result.primary?.pattern?.id, "P11");
});

test("canonical stress: ecommerce blaming ads with poor diagnosis/data trust", () => {
  const result = resolveDiagnosis(fixture({ T3: "D", ML4: "D", ML6: "D" }));
  assert.equal(result.primary?.sectionId, 6);
  assert.equal(result.primary?.pattern?.id, "P14");
});

test("canonical stress: travel leads with weak downstream visibility and active acquisition", () => {
  const result = resolveDiagnosis(fixture({ ML5: "E" }), {
    activeAcquisition: true,
  });
  assert.equal(result.primary?.sectionId, 6);
  assert.equal(result.primary?.pattern?.id, "P14");
});

test("unsupported patterns do not match, regardless of traffic or business assumptions", () => {
  const result = resolveDiagnosis(
    fixture({ A3: "D", T1: "D", T4: "D", ML5: "D" }),
  );
  for (const id of ["P04", "P12", "P14", "P15"])
    assert.ok(!result.patterns.some((p) => p.id === id), id);
  assert.ok(result.evidenceGaps.some((g) => g.patternId === "P14"));
  assert.ok(
    result.confidence.deductions.some((d) => d.id === "missing-context"),
  );
  assert.ok(!detectContradictions(fixture()).some((c) => c.id === "CR05"));
});

test("P15 requires direct stored evidence for every contextual condition", () => {
  const a = fixture();
  assert.ok(
    !matchPatterns(a, { trafficExists: true }).matches.some(
      (p) => p.id === "P15",
    ),
  );
  assert.ok(
    !matchPatterns(a, { weakFollowUp: true, trafficExists: true }).matches.some(
      (p) => p.id === "P15",
    ),
  );
  assert.ok(
    matchPatterns(a, {
      weakFollowUp: true,
      trafficExists: true,
      nonTrivialConsideration: true,
    }).matches.some((p) => p.id === "P15"),
  );
});

test("C6 D supports neutral P09; C6 E uncertainty does not assert mismatch", () => {
  assert.equal(
    resolveDiagnosis(fixture({ C6: "D" })).primary?.pattern?.id,
    "P09",
  );
  assert.ok(
    !resolveDiagnosis(fixture({ C6: "E" })).patterns.some(
      (p) => p.id === "P09",
    ),
  );
});

test("ML4 E confidence costs 15 once, independent of scores and flags", () => {
  const result = diagnosticConfidence(
    fixture({ ML4: "E", T3: "C" }),
    undefined,
    [],
  );
  assert.equal(result.score, 85);
  assert.deepEqual(
    result.deductions.map((d) => [d.id, d.points]),
    [["answer:ML4", 15]],
  );
  const contradiction = diagnosticConfidence(
    fixture({ ML4: "E" }),
    undefined,
    [],
  );
  assert.equal(contradiction.score, 75);
  assert.equal(
    contradiction.deductions.filter((d) => d.id === "answer:ML4").length,
    1,
  );
  assert.ok(contradiction.deductions.some((d) => d.id === "CR06"));
});

test("explicit uncertainty modifier replaces generic penalty for the same answer", () => {
  const result = diagnosticConfidence(fixture({ O4: "E" }), undefined, []);
  assert.equal(result.score, 95);
  assert.equal(result.deductions.length, 1);
});

test("severity overrides stage, and similarly severe constraints follow upstream order", () => {
  const conversionSevere = resolveDiagnosis(fixture({}, { 1: "C", 4: "E" }));
  assert.equal(conversionSevere.primary?.sectionId, 4);
  const bothSevere = resolveDiagnosis(fixture({ O5: "C" }, { 1: "D", 4: "D" }));
  assert.equal(bothSevere.primary?.sectionId, 1);
});

test("relative strength is suppressed with major flags or contradictions", () => {
  const result = resolveDiagnosis(fixture({ O4: "D", C5: "D" }));
  assert.notEqual(result.relativeStrength, 1);
  assert.notEqual(result.relativeStrength, 3);
  assert.notEqual(result.relativeStrength, 4);
});

test("same underlying signal does not multiply flags into confidence deductions", () => {
  const a = fixture({ ML4: "E", T3: "C" });
  const result = resolveDiagnosis(a);
  assert.equal(
    result.confidence.deductions.filter((d) => d.source === "ML4").length,
    1,
  );
  assert.equal(
    new Set(result.confidence.deductions.map((d) => d.id)).size,
    result.confidence.deductions.length,
  );
});

test('confidence bands, uncertainty cap and floor are explicit', () => {
  const limited = diagnosticConfidence(fixture({}, { 1: 'E', 2: 'E', 3: 'E', 4: 'E', 5: 'E', 6: 'E' }), undefined, []);
  assert.equal(limited.score, 35);
  assert.equal(limited.level, 'limited');
  assert.ok(limited.deductions.filter(d => d.id.startsWith('answer:') && d.points === 5).length >= 5);
  const moderate = diagnosticConfidence(fixture({ ML4: 'E' }), undefined, []);
  assert.equal(moderate.level, 'moderate');
  assert.equal(diagnosticConfidence(fixture(), undefined, []).level, 'high');
});
