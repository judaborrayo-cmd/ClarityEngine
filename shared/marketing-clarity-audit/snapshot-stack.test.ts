import { test } from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { snapshotLayers } from "./snapshot-stack";
import { MarketingSnapshot } from "./snapshot-view";
import { questionnaire } from "./scoring";
import { createFrozenReport } from "./report";
const context = {
  name: "Test",
  email: "test@example.com",
  companyName: "Stack Co.",
  websiteUrl: "https://example.com",
  businessType: "professional_services",
  primaryMarketingGoal: "leads",
};
test("Snapshot layers distinguish existing primary/supporting selections and qualified strengths without changing report data", () => {
  const report = createFrozenReport(
    Object.fromEntries(
      questionnaire.questions.map((q) => [q.id, q.sectionId === 1 ? "D" : "A"]),
    ),
    context,
  );
  const before = JSON.stringify(report),
    layers = snapshotLayers(report);
  assert.equal(layers.length, 6);
  assert.equal(layers[0].state, "primary");
  assert.ok(layers.slice(1).every((l) => l.state === "strength"));
  const html = renderToStaticMarkup(
    React.createElement(MarketingSnapshot, { report }),
  );
  assert.match(html, /Snapshot Clarity Stack/);
  assert.doesNotMatch(html, /self-reported strengths include/);
  assert.match(html, /First opportunity/);
  assert.equal(JSON.stringify(report), before);
  const display = structuredClone(report);
  display.diagnosis.secondary = {
    sectionId: 3,
  } as typeof display.diagnosis.secondary;
  display.diagnosis.sectionScores[6] = 66;
  assert.equal(snapshotLayers(display)[2].state, "supporting");
  assert.equal(snapshotLayers(display)[5].state, "muted");
});
