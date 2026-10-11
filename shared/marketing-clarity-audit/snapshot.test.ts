import { test } from "node:test";
import assert from "node:assert/strict";
import { createFrozenReport } from "./report";
import { questionnaire, sectionBand } from "./scoring";
import { marketingSnapshot, scoreBandGuide } from "./snapshot";
const context = {
  name: "Test",
  email: "test@example.com",
  companyName: "Snapshot Co.",
  websiteUrl: "https://example.com",
  businessType: "professional_services",
  primaryMarketingGoal: "leads",
};
test("strong Offer/weak Message snapshot uses the selected pattern and real strengths without changing diagnosis", () => {
  const report = createFrozenReport(
    Object.fromEntries(
      questionnaire.questions.map((q) => [q.id, q.sectionId === 3 ? "D" : "A"]),
    ),
    context,
  );
  const before = JSON.stringify(report),
    snapshot = marketingSnapshot(report);
  assert.equal(snapshot.focus, "Message");
  assert.match(snapshot.title, /stronger than your Message score/);
  assert.equal(snapshot.buildOn, "Offer and Audience");
  assert.match(snapshot.protect, /Conversion Experience/);
  for (const action of report.deprioritized)
    assert.ok(snapshot.avoid.includes(action.action));
  assert.equal(JSON.stringify(report), before);
  const qualified = structuredClone(report);
  qualified.diagnosis.sectionSeverity[4] = 3;
  const caution = marketingSnapshot(qualified);
  assert.doesNotMatch(caution.working, /capable of supporting/);
  assert.doesNotMatch(caution.protect, /Conversion Experience/);
});
test("Offer, healthy and neutral commitment snapshots preserve supported evidence and canonical score bands", () => {
  const offer = createFrozenReport(
    Object.fromEntries(
      questionnaire.questions.map((q) => [q.id, q.sectionId === 1 ? "D" : "A"]),
    ),
    context,
  );
  assert.match(marketingSnapshot(offer).profile, /Offer/);
  assert.match(marketingSnapshot(offer).working, /downstream/);
  const healthy = createFrozenReport(
    Object.fromEntries(questionnaire.questions.map((q) => [q.id, "A"])),
    context,
  );
  assert.match(
    marketingSnapshot(healthy).profile,
    /do not establish a clear primary constraint/,
  );
  const mismatch = createFrozenReport(
    Object.fromEntries(
      questionnaire.questions.map((q) => [q.id, q.id === "C6" ? "D" : "A"]),
    ),
    context,
  );
  assert.match(
    marketingSnapshot(mismatch).profile,
    /does not establish which direction/,
  );
  assert.deepEqual(
    scoreBandGuide.map((b) => b.label),
    [sectionBand(80), sectionBand(65), sectionBand(45), sectionBand(0)],
  );
});
