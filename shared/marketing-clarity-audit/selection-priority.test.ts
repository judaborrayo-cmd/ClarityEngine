import { test } from "node:test";
import assert from "node:assert/strict";
import { questionnaire, type Answers } from "./scoring";
import { resolveDiagnosis } from "./resolver";
import { createFrozenReport } from "./report";
import { precedenceExplanation } from "./precedence-explanation";
const base = (): Answers =>
  Object.fromEntries(questionnaire.questions.map((q) => [q.id, "A"]));
const traffic = {
  T1: "D",
  T2: "D",
  T3: "C",
  T4: "D",
  T5: "C",
  T6: "C",
} as Answers;
const measurement = {
  ML1: "B",
  ML2: "C",
  ML3: "C",
  ML4: "D",
  ML5: "C",
  ML6: "B",
} as Answers;
const context = {
  name: "Test",
  email: "test@example.com",
  companyName: "Test",
  websiteUrl: "https://example.com",
  businessType: "professional_services",
  primaryMarketingGoal: "leads",
};
test("data-trust precedence still outranks lower Traffic and reports a named explanation without changing weights", () => {
  const report = createFrozenReport(
    { ...base(), ...traffic, ...measurement },
    context,
  );
  assert.equal(report.diagnosis.sectionScores[5], 50.4);
  assert.equal(report.diagnosis.sectionScores[6], 62.4);
  assert.equal(report.diagnosis.primary?.sectionId, 6);
  assert.equal(report.diagnosis.secondary?.sectionId, 5);
  assert.equal(
    report.diagnosis.primaryPrecedence?.ruleId,
    "DATA_TRUST_BLOCKER",
  );
  assert.deepEqual(
    report.diagnosis.primaryPrecedence?.lowerScoringSections,
    [5],
  );
  assert.match(
    precedenceExplanation(report)!.copy,
    /Traffic scored lower numerically/,
  );
  const frozen = JSON.stringify(report);
  precedenceExplanation(report);
  assert.equal(JSON.stringify(report), frozen);
  const legacy = structuredClone(report);
  delete (legacy.diagnosis as { primaryPrecedence?: unknown })
    .primaryPrecedence;
  assert.equal(precedenceExplanation(legacy)!.ruleId, "DATA_TRUST_BLOCKER");
});
test("without data-trust override Traffic leads; supporting remains below 65 or major/critical with no gap rule", () => {
  const a = { ...base(), ...traffic, ...measurement, ML4: "C" as const };
  const noSecondary = resolveDiagnosis(a);
  assert.equal(noSecondary.primary?.sectionId, 5);
  assert.equal(noSecondary.secondary, undefined);
  const secondary = resolveDiagnosis({ ...a, ML1: "C" });
  assert.equal(secondary.primary?.sectionId, 5);
  assert.equal(secondary.secondary?.sectionId, 6);
  assert.equal(secondary.sectionScores[6], 63.2);
  assert.equal(noSecondary.primaryPrecedence, undefined);
});
test("ordinary equivalent-priority/severity constraints select the lower unrounded score before section order", () => {
  const a = {
    ...base(),
    T1: "B",
    T2: "B",
    T3: "D",
    T4: "C",
    T5: "D",
    T6: "B",
    ML1: "D",
    ML2: "D",
    ML3: "D",
    ML4: "C",
    ML5: "C",
    ML6: "C",
  } as Answers;
  const d = resolveDiagnosis(a);
  assert.equal(d.sectionScores[5], 62.4);
  assert.equal(d.sectionScores[6], 50.4);
  assert.equal(d.sectionSeverity[5], 2);
  assert.equal(d.sectionSeverity[6], 2);
  assert.equal(d.primary?.sectionId, 6);
  assert.equal(d.secondary?.sectionId, 5);
  assert.equal(d.primaryPrecedence, undefined);
  assert.equal(
    precedenceExplanation(createFrozenReport(a, context)),
    undefined,
  );
});
test("explicit severe-upstream dependency and foundational Offer exceptions remain intact", () => {
  const a = {
    ...base(),
    T1: "E",
    T2: "E",
    T3: "E",
    T4: "E",
    T5: "E",
    T6: "E",
    O1: "D",
    O2: "D",
    O3: "D",
    O4: "D",
    O5: "C",
    O6: "D",
  } as Answers;
  const d = resolveDiagnosis(a);
  assert.equal(d.primary?.sectionId, 1);
  assert.equal(d.primaryPrecedence?.ruleId, "SEVERE_UPSTREAM_DEPENDENCY");
  const gate = resolveDiagnosis({
    ...base(),
    ...traffic,
    ...measurement,
    O5: "D",
  });
  assert.equal(gate.primary?.sectionId, 1);
  assert.equal(gate.primaryPrecedence?.ruleId, "FOUNDATIONAL_OFFER");
});
test("generic flag severity outranks numeric weakness within a group; no named explanation is invented", () => {
  const a = {
    ...base(),
    ...traffic,
    ML1: "B",
    ML2: "B",
    ML3: "B",
    ML4: "A",
    ML5: "E",
    ML6: "B",
  } as Answers;
  const d = resolveDiagnosis(a);
  assert.ok(d.sectionScores[6] > d.sectionScores[5]);
  assert.equal(d.primary?.sectionId, 6);
  assert.equal(d.sectionSeverity[6], 3);
  assert.equal(d.primaryPrecedence, undefined);
});

test("exact ordinary ties use section order; named precedence does not explain equal scores", () => {
  const tie = resolveDiagnosis({
    ...base(),
    T1: "C",
    T2: "C",
    T3: "C",
    T4: "C",
    T5: "D",
    T6: "D",
    ML1: "C",
    ML2: "D",
    ML3: "C",
    ML4: "C",
    ML5: "D",
    ML6: "C",
  });
  assert.equal(tie.sectionScores[5], tie.sectionScores[6]);
  assert.equal(tie.primary?.sectionId, 5);
  const report = createFrozenReport(
    {
      ...base(),
      T1: "B",
      T2: "B",
      T3: "D",
      T4: "C",
      T5: "D",
      T6: "B",
      ...measurement,
    },
    context,
  );
  assert.equal(
    report.diagnosis.sectionScores[5],
    report.diagnosis.sectionScores[6],
  );
  assert.equal(precedenceExplanation(report), undefined);
});
