import { test } from "node:test";
import assert from "node:assert/strict";
import { createReport, resolve } from "./engine";
import { recipes, coreGoal, coreActionRecipe } from "./answer-guidance";
import {
  scenario,
  scenarios,
  singleQuestionScenarios,
  singleQuestionEvidenceScenarios,
} from "./scenarios";

test("every single weak question selects its actual evidence, never a section-wide bundle", () => {
  for (const s of singleQuestionScenarios) {
    const weak = Object.entries(s.draft.answers).filter(([, v]) => v !== "A");
    assert.equal(weak.length, 1);
    const [id] = weak[0];
    const r = createReport(s.draft);
    assert.ok(r.diagnosis.primary?.questionIds.includes(id), s.name);
    for (const m of r.recommendations) {
      assert.deepEqual(m.evidenceIds, [id], m.id);
      assert.ok(m.selectionReason?.includes(id) || !recipes[id], m.id);
      assert.ok(
        m.preserveQuestionIds?.every((key) => r.answers[key] === "A"),
        m.id,
      );
    }
    if (recipes[id])
      assert.ok(r.introduction.includes(coreGoal(id, s.draft.answers)), id);
    if (recipes[id] && id !== "C5") {
      assert.equal(
        r.recommendations[0].whatToDo,
        coreActionRecipe(id, s.draft.answers).evidence,
        id === "C5" ? "C5 has a specialized existing-proof evidence step" : id,
      );
    }
  }
});
test("single-question uncertainty remains investigation, including neutral commitment fit", () => {
  for (const s of singleQuestionEvidenceScenarios) {
    const r = createReport(s.draft);
    assert.equal(
      Object.values(s.draft.answers).filter((v) => v !== "A").length,
      1,
    );
    assert.equal(r.recommendations.length, 3);
    assert.ok(r.recommendations.every((m) => m.evidenceIds?.length === 1));
  }
  const r = createReport(scenario("C6 unknown", { C6: "E" }).draft);
  assert.match(r.introduction, /not yet sure/);
  assert.doesNotMatch(r.introduction, /reported a substantial mismatch/);
});
test("commitment mismatch preserves the v1 neutral direction check instead of generic CTA fixes", () => {
  const r = createReport(scenario("C6 mismatch", { C6: "D" }).draft);
  assert.match(
    r.recommendations[0].whatToDo,
    /money, time, information and commitment/,
  );
  assert.match(
    r.recommendations[1].whatToDo,
    /too much too soon.*missing reassurance.*unnecessary complexity/,
  );
  assert.match(r.recommendations[2].whatToDo, /only the evidenced side/);
  assert.doesNotMatch(
    r.recommendations.map((m) => m.whatToDo).join(" "),
    /one primary action|put the value proposition|rewrite the offer/i,
  );
});
test("existing proof is placed at the decision, and strong promise clarity is preserved", () => {
  const proof = createReport(scenario("proof", { C5: "D" }).draft);
  assert.match(proof.recommendations[0].whatToDo, /proof you already have/);
  assert.match(proof.recommendations[2].whatToDo, /Place that existing proof/);
  assert.match(
    proof.recommendations[2].whatToDo,
    /Do not commission new testimonials/,
  );
  assert.match(proof.introduction, /credible evidence behind your claims/);
  const continuity = createReport(scenario("continuity", { C3: "D" }).draft);
  assert.match(
    continuity.recommendations[0].whatToDo,
    /source promise.*landing page/,
  );
  assert.match(
    continuity.recommendations[1].whatToDo,
    /keep the offer and first-impression message/,
  );
  assert.doesNotMatch(
    continuity.recommendations.map((m) => m.whatToDo).join(" "),
    /choose a primary offer|choose a primary action|create new proof/i,
  );
});
test("cadence and data reliability select different work, without fixing strong measures", () => {
  const cadence = createReport(scenario("cadence", { ML3: "D" }).draft);
  assert.match(
    cadence.recommendations[0].whatToDo,
    /individual platforms and business systems/,
  );
  assert.match(
    cadence.recommendations[1].whatToDo,
    /trusted sources you already have/,
  );
  assert.match(
    cadence.recommendations[2].whatToDo,
    /Create the lightweight report/,
  );
  assert.doesNotMatch(
    cadence.recommendations.map((m) => m.whatToDo).join(" "),
    /choose the outcomes|repair tracking|new measurement system/,
  );
  const reliability = createReport(scenario("data", { ML4: "D" }).draft);
  assert.match(
    reliability.recommendations[0].whatToDo,
    /reporting source and business record/,
  );
  assert.match(
    reliability.recommendations[1].whatToDo,
    /do not assume tracking is broken/,
  );
  assert.match(
    reliability.recommendations[2].whatToDo,
    /only the evidenced reliability gap/,
  );
});
test("all plans cover their three moves before evaluation, and never introduce move 3 during week 4", () => {
  for (const s of scenarios) {
    const r = createReport(s.draft);
    const implemented = new Set(
      r.thirtyDayPlan.slice(0, 3).flatMap((w) => w.recommendationIds),
    );
    for (const m of r.recommendations)
      assert.ok(implemented.has(m.id), s.name + ":" + m.id);
    assert.match(
      r.thirtyDayPlan[3].objective,
      /Review the work already completed/,
    );
    assert.ok(
      r.thirtyDayPlan[3].actions.every(
        (a) => !r.recommendations.some((m) => m.whatToDo === a),
      ),
      s.name,
    );
  }
});
test("deferred advertising plans complete readiness/research, not a required live campaign or website change", () => {
  for (const nonUseReason of [
    "deliberate",
    "preparing",
    "risk",
    "support",
    "tried",
    "unexplored",
  ] as const) {
    const d = scenario(
      nonUseReason,
      {},
      { paidStatus: "preparing", nonUseReason, testReadiness: "unknown" },
    ).draft;
    const r = createReport(d);
    assert.doesNotMatch(
      r.thirtyDayPlan.map((w) => w.completionCriteria).join(" "),
      /change is live|campaign is live|website is live/,
    );
    assert.match(
      r.thirtyDayPlan[2].objective,
      /live campaign or website change is not required/,
    );
    assert.doesNotMatch(r.recommendations[2].title, /Design an optional/);
  }
});
test("strong reports use context without inventing weaknesses, causes, staffing gaps or gains", () => {
  const lead = createReport(scenario("lead", {}, { outcome: "leads" }).draft);
  const purchase = createReport(scenario("purchase").draft);
  assert.notEqual(lead.introduction, purchase.introduction);
  assert.match(lead.recommendations[0].whatToDo, /qualified opportunities/);
  const founder = createReport(
    scenario("founder", {}, { owner: "Founder / owner" }).draft,
  );
  assert.match(founder.introduction, /not a staffing problem/);
  const decline = createReport(
    scenario(
      "seasonality",
      {},
      {
        trend: "Generally declining",
        trendContext: "Seasonality may be involved.",
      },
    ).draft,
  );
  assert.doesNotMatch(decline.recommendations[0].title, /expansion/);
  assert.match(decline.introduction, /not an automatic management diagnosis/);
  for (const r of [lead, purchase, founder, decline]) {
    assert.equal(r.diagnosis.primary, undefined);
    assert.match(r.introduction, /No specific weakness is identified/);
    assert.doesNotMatch(
      r.introduction,
      /will increase|will improve|guaranteed|You indicated [“"]/,
    );
  }
});
test("conversational introductions avoid answer quotations and name prerequisite precedence", () => {
  for (const s of scenarios) {
    const r = createReport(s.draft);
    assert.doesNotMatch(
      r.introduction,
      /You indicated [“"]|This deserves attention because it affects how confidently|relatively strong foundations in/,
    );
  }
  const d = scenario("prerequisite", { ML4: "D", T5: "E", T9: "E" }).draft;
  const r = createReport(d);
  assert.equal(r.diagnosis.primary?.sectionId, 6);
  assert.equal(r.diagnosis.lowestSectionId, 5);
  assert.match(r.introduction, /even though Traffic.*lowest average score/);
});

test("paid single gaps preserve the other reporting and ownership capabilities", () => {
  const interpretation = createReport(scenario("T8 only", { T8: "D" }).draft);
  assert.match(
    interpretation.recommendations[0].title,
    /review you already have/,
  );
  assert.match(
    interpretation.recommendations[2].whatToDo,
    /Preserve the reporting process/,
  );
  assert.doesNotMatch(
    interpretation.recommendations.map((m) => m.title).join(" "),
    /Build one platform/,
  );
  const reporting = createReport(scenario("T7 only", { T7: "D" }).draft);
  assert.match(
    reporting.recommendations[0].whatToDo,
    /Keep the interpretation capability/,
  );
  const capacity = createReport(scenario("T5 B", { T5: "B" }).draft);
  assert.match(capacity.recommendations[0].whatToDo, /current owner/);
  const followThrough = createReport(scenario("T9 B", { T9: "B" }).draft);
  assert.match(
    followThrough.recommendations[0].whatToDo,
    /regular idea pipeline you already report/,
  );
});
