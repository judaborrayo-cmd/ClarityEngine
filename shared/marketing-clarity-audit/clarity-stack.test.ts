import { test } from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { diagnosticLayers, DiagnosticClarityStack } from "./clarity-stack";
import { questionnaire, type Answers } from "./scoring";
import { questionDisplay } from "./question-display";
import display from "./question-display.json";
import { MarketingSystemInteractions } from "./system-interactions";

test("lean display covers exactly 35 existing question IDs without changing canonical prompts or options", () => {
  const snapshot = JSON.stringify(questionnaire);
  assert.deepEqual(
    Object.keys(display).sort(),
    questionnaire.questions.map((q) => q.id).sort(),
  );
  for (const q of questionnaire.questions)
    assert.equal(questionDisplay(q), display[q.id as keyof typeof display]);
  assert.equal(
    questionDisplay({ id: "unknown", prompt: "Fallback" }),
    "Fallback",
  );
  assert.equal(JSON.stringify(questionnaire), snapshot);
  assert.equal(
    questionDisplay(questionnaire.questions[0]),
    "Can a new potential customer understand what you sell within a few seconds?",
  );
});
test("six layers progress from current/future to completed, restore from saved answers, and emphasize Back/edit section", () => {
  const empty = diagnosticLayers({}, 1);
  assert.equal(empty[0].state, "current");
  assert.ok(empty.slice(1).every((l) => l.state === "future"));
  const answers: Answers = Object.fromEntries(
    questionnaire.questions
      .filter((q) => q.sectionId === 1)
      .map((q) => [q.id, "B"]),
  );
  const completed = diagnosticLayers(answers, 2);
  assert.equal(completed[0].state, "complete");
  assert.equal(completed[1].state, "current");
  assert.equal(diagnosticLayers(answers)[0].state, "complete");
  delete answers.O6;
  assert.equal(diagnosticLayers(answers, 2)[0].state, "future");
  const all: Answers = Object.fromEntries(
    questionnaire.questions.map((q) => [q.id, "B"]),
  );
  assert.ok(diagnosticLayers(all).every((l) => l.state === "complete"));
  assert.equal(diagnosticLayers(all, 3)[2].state, "current");
  const html = renderToStaticMarkup(
    React.createElement(DiagnosticClarityStack, { answers: all }),
  );
  assert.equal((html.match(/data-state="complete"/g) ?? []).length, 6);
  assert.match(html, /You’re building a clearer picture/);
});
test("future system interaction hook is empty by default and renders authored section connections only", () => {
  assert.equal(
    renderToStaticMarkup(React.createElement(MarketingSystemInteractions, {})),
    "",
  );
  const html = renderToStaticMarkup(
    React.createElement(MarketingSystemInteractions, {
      items: [
        {
          id: "example-only",
          title: "Strong Offer + Weak Message",
          explanation: "Authored explanation for future content.",
          sections: [1, 3],
          sourcePatternIds: ["P05"],
        },
      ],
    }),
  );
  assert.match(html, /How Your Marketing System Works Together/);
  assert.match(html, /Strong Offer \+ Weak Message/);
});
