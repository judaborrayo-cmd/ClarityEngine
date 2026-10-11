import { test } from "node:test";
import assert from "node:assert/strict";
import { constraintTeaching } from "./constraint-teaching";
import { progressMeasures } from "./progress-measures";
import { progressIconNames, progressIcons } from "./progress-icons";
import { caseRelevance } from "./presentation";
import { createFrozenReport } from "./report";
import { questionnaire } from "./scoring";
test("each category has practical nonduplicate observation methods and meaningful icons for each signal", () => {
  for (const [id, lesson] of Object.entries(constraintTeaching)) {
    assert.equal(progressMeasures[Number(id)].length, lesson.progress.length);
    assert.equal(progressIconNames[Number(id)].length, lesson.progress.length);
    progressIconNames[Number(id)].forEach((name) =>
      assert.ok(progressIcons[name]),
    );
    for (const measure of progressMeasures[Number(id)]) {
      assert.ok(measure.method.length > 60);
      assert.ok(
        !lesson.progress.some(
          (signal) =>
            signal.title === measure.title ||
            signal.description === measure.method,
        ),
      );
    }
  }
  assert.deepEqual(progressIconNames[6], [
    "target",
    "source",
    "connection",
    "reporting",
    "learning",
  ]);
});
test("case relevance addresses the customer diagnosis without implying matching business outcomes", () => {
  const report = createFrozenReport(
    Object.fromEntries(
      questionnaire.questions.map((q) => [q.id, q.sectionId === 5 ? "D" : "A"]),
    ),
    {
      name: "Test",
      email: "test@example.com",
      companyName: "Clarity Engine",
      websiteUrl: "https://example.com",
      businessType: "professional_services",
      primaryMarketingGoal: "leads",
    },
  );
  const frozen = JSON.stringify(report),
    copy = caseRelevance(report);
  assert.match(copy, /Your Traffic diagnosis/);
  assert.match(copy, /your own customers/);
  assert.doesNotMatch(copy, /For Clarity Engine|lesson for Clarity Engine/);
  assert.equal(JSON.stringify(report), frozen);
});
