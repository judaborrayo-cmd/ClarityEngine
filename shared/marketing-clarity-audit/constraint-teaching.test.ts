import { test } from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  constraintTeaching,
  teachingFor,
  improvementHierarchy,
  hierarchyExplanation,
} from "./constraint-teaching";
import {
  ConstraintTeaching,
  ImprovementEvidence,
} from "./constraint-teaching-view";
import { createFrozenReport } from "./report";
import { questionnaire } from "./scoring";
const context = {
  name: "Test",
  email: "test@example.com",
  companyName: "Test",
  websiteUrl: "https://example.com",
  businessType: "professional_services",
  primaryMarketingGoal: "leads",
};
test("all six categories have concrete teaching and distinct observable progress without changing frozen diagnosis", () => {
  assert.deepEqual(Object.keys(constraintTeaching), [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
  ]);
  for (const [id, lesson] of Object.entries(constraintTeaching)) {
    assert.ok(
      lesson.meaning.length &&
        lesson.strong.length >= 4 &&
        lesson.constrained.length >= 4 &&
        lesson.progress.length >= 4,
    );
    const report = createFrozenReport(
      Object.fromEntries(
        questionnaire.questions.map((q) => [
          q.id,
          q.sectionId === Number(id) ? "D" : "A",
        ]),
      ),
      context,
    );
    const before = JSON.stringify(report);
    assert.ok(teachingFor(report));
    const html = renderToStaticMarkup(
      React.createElement(ConstraintTeaching, { report }),
    );
    assert.match(html, /What this means/);
    assert.match(html, /WHEN THIS IS STRONG/);
    assert.match(html, /WHEN THIS CONSTRAINS GROWTH/);
    const progress = renderToStaticMarkup(
      React.createElement(ImprovementEvidence, { report }),
    );
    assert.match(progress, /Signs You&#x27;re Moving in the Right Direction/);
    assert.match(progress, /How to Measure Your Progress/);
    assert.equal(
      (progress.match(/data-progress-icon=/g) ?? []).length,
      lesson.progress.length,
    );
    assert.equal(JSON.stringify(report), before);
  }
});
test("Measurement teaching uses the approved downstream lesson and improvement evidence; healthy reports invent no constraint", () => {
  assert.equal(constraintTeaching[6].strong.length, 6);
  assert.equal(constraintTeaching[6].constrained.length, 6);
  assert.equal(
    constraintTeaching[6].progress[0].title,
    "You have a small KPI hierarchy",
  );
  assert.equal(
    constraintTeaching[6].progress[4].title,
    "Tests create cumulative learning",
  );
  const report = createFrozenReport(
    Object.fromEntries(
      questionnaire.questions.map((q) => [q.id, q.sectionId === 6 ? "D" : "A"]),
    ),
    context,
  );
  assert.equal(improvementHierarchy(report)[0].value, "Revenue / purchases");
  const healthy = createFrozenReport(
    Object.fromEntries(questionnaire.questions.map((q) => [q.id, "A"])),
    context,
  );
  assert.equal(teachingFor(healthy), undefined);
  assert.equal(
    renderToStaticMarkup(
      React.createElement(ImprovementEvidence, { report: healthy }),
    ),
    "",
  );
});
