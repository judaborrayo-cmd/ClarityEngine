import { test } from "node:test";
import assert from "node:assert/strict";
import { createFrozenReport } from "./report";
import { questionnaire } from "./scoring";
import { workPrompts } from "./presentation";
const context = {
  name: "Test",
  email: "test@example.com",
  companyName: "Test",
  websiteUrl: "https://example.com",
  businessType: "professional_services",
  primaryMarketingGoal: "leads",
};
test("one worksheet keeps frozen thinking prompts and adds only three active final fields with separate legacy IDs", () => {
  for (const section of [1, 3, 5, 6]) {
    const report = createFrozenReport(
      Object.fromEntries(
        questionnaire.questions.map((q) => [
          q.id,
          q.sectionId === section ? "D" : "A",
        ]),
      ),
      context,
    );
    const frozen = JSON.stringify(report),
      prompts = workPrompts(report);
    assert.deepEqual(
      prompts
        .filter((p) => p.group === "primary" && !p.legacy)
        .map((p) => p.label),
      report.workSession.primaryPrompts,
    );
    assert.deepEqual(
      prompts
        .filter((p) => p.group === "decision" && !p.legacy)
        .map((p) => p.label),
      [
        "What will you do next?",
        "What will you intentionally not change yet?",
        "What metric will tell you whether this worked?",
      ],
    );
    assert.ok(
      prompts.some(
        (p) => p.id === "decision-1" && p.legacy && p.label === "Decision",
      ),
    );
    assert.equal(new Set(prompts.map((p) => p.id)).size, prompts.length);
    assert.equal(JSON.stringify(report), frozen);
  }
});
