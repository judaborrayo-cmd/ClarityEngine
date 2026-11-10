import {
  assessmentQuestions,
  versions,
  type Setup,
  type Answers,
  type Choice,
} from "./questionnaire";
import { createReport, type Draft } from "./engine";
const running: Setup = {
  nonUseReason: "running",
  paidStatus: "running",
  outcome: "purchases",
  platforms: "multiple",
  owner: "Dedicated internal specialist",
  trend: "Generally stable",
  testReadiness: "ready",
};
export function scenario(
  name: string,
  changes: Partial<Answers> = {},
  setupChanges: Partial<Setup> = {},
  uniform: Choice = "A",
) {
  const setup = { ...running, ...setupChanges };
  if (setup.paidStatus !== "running") {
    setup.nonUseReason =
      setupChanges.nonUseReason ??
      (setup.paidStatus === "preparing" ? "preparing" : "deliberate");
    setup.platforms = "none";
    setup.trend = "We are not currently running paid advertising.";
  }
  const answers: Answers = Object.fromEntries(
    assessmentQuestions(setup).map((q) => [
      q.id,
      changes[q.id] ??
        (setup.paidStatus !== "running" &&
        ["T5", "T6", "T7", "T8", "T9", "T10"].includes(q.id)
          ? "F"
          : uniform),
    ]),
  );
  const draft: Draft = { versions, setup, answers };
  return { name, draft };
}
export const singleQuestionScenarios = assessmentQuestions(running).map((q) =>
  scenario(`Single question ${q.id}: all other answers strong`, {
    [q.id]: "D",
  }),
);
export const singleQuestionEvidenceScenarios = [
  "C6",
  "A3",
  "ML4",
  "C3",
  "ML3",
].map((id) =>
  scenario(
    id === "ML3"
      ? "Single reporting gap ML3: no formal KPI reporting exists"
      : id === "ML4"
        ? "Single data-trust concern ML4: reliability needs verification"
        : id === "C3"
          ? "Single missing verification C3: journey has not been reviewed"
          : `Single uncertainty ${id}: all other answers strong`,
    { [id]: "E" },
  ),
);
export const scenarios = [
  scenario("Strong balanced foundations"),
  scenario("Several moderate opportunities", { O2: "C", A2: "C", M2: "C" }),
  ...[1, 2, 3, 4, 5, 6].map((id) =>
    scenario(
      `Isolated section ${id} weakness`,
      Object.fromEntries(
        assessmentQuestions(running)
          .filter((q) => q.sectionId === id)
          .map((q) => [q.id, "D"]),
      ),
    ),
  ),
  scenario(
    "Strong overall with ownership gap",
    { T5: "E" },
    { owner: "No clear owner" },
  ),
  scenario(
    "Effective founder-led experimentation",
    {},
    { owner: "Founder / owner" },
  ),
  scenario("Dedicated specialist without testing process", {
    T5: "C",
    T9: "E",
  }),
  scenario(
    "Overloaded founder without protected time",
    { T5: "D" },
    { owner: "Founder / owner" },
  ),
  scenario(
    "Single-platform purchase advertiser",
    { T7: "C" },
    { platforms: "single" },
  ),
  scenario(
    "Multi-platform lead generation",
    { T6: "D", T7: "C" },
    { outcome: "leads" },
  ),
  scenario("Not planning advertising", {}, { paidStatus: "not_planning" }),
  scenario("Preparing for advertising", {}, { paidStatus: "preparing" }),
  scenario(
    "Preparing with weak foundations",
    { O5: "E", ML4: "D" },
    { paidStatus: "preparing" },
  ),
  scenario(
    "Low volume and limited history",
    { T8: "C" },
    { trend: "Too little history to judge", testReadiness: "limited" },
  ),
  scenario(
    "Strong ROAS uncertain profitability",
    { T6: "D" },
    {
      trend: "Generally improving",
      trendContext:
        "Reported platform ROAS is strong, but we have not reconciled margins and costs.",
    },
  ),
  scenario(
    "Falling ROAS intentional expansion",
    {},
    {
      trend: "Generally declining",
      trendContext:
        "We deliberately expanded into a new customer group. We are checking margin, volume, and conversion delays.",
    },
  ),
  scenario("Strong economics weak creative development", { T9: "E" }),
  scenario("Unclear optimization outcomes", { T10: "E" }),
  scenario("Measurement must precede creative changes", { ML4: "E", T9: "E" }),
  scenario("Conflicting ownership evidence", {}, { owner: "No clear owner" }),
  scenario(
    "Conflicting trend evidence",
    {},
    { trend: "We are not tracking this consistently" },
  ),
  scenario("Missing testing evidence", {}, { testReadiness: "unknown" }),
  ...(
    [
      "deliberate",
      "support",
      "risk",
      "tried",
      "preparing",
      "unexplored",
    ] as const
  ).flatMap((nonUseReason) => [
    scenario(
      `Non-advertiser: ${nonUseReason}, ready to evaluate`,
      { T6: "A" },
      { paidStatus: "not_planning", nonUseReason, testReadiness: "ready" },
    ),
    scenario(
      `Non-advertiser: ${nonUseReason}, missing readiness`,
      { T6: "E" },
      { paidStatus: "preparing", nonUseReason, testReadiness: "unknown" },
    ),
  ]),
  scenario(
    "Lowest-option responses: mixed known gaps and unverified conditions",
    {},
    {},
    "E",
  ),
  scenario("Strong lead-generation foundations", {}, { outcome: "leads" }),
  scenario("Strong single-platform foundations", {}, { platforms: "single" }),
  scenario(
    "Declining returns with stated seasonality",
    {},
    {
      trend: "Generally declining",
      trendContext: "Seasonality may be involved; we have not confirmed it.",
    },
  ),
  ...["T5", "T7", "T8", "T9"].map((id) =>
    scenario(`Single moderate ${id}: all other answers strong`, { [id]: "B" }),
  ),
  ...singleQuestionScenarios,
  ...singleQuestionEvidenceScenarios,
  scenario("Existing KPI report with occasional update or review gaps", {
    ML3: "B",
  }),
  scenario("Existing KPI report fragmented across tools", { ML3: "C" }),
];
export const reviewReports = () =>
  scenarios.map((s) => ({
    ...s,
    report: createReport(s.draft, new Date("2026-11-02T12:00:00Z")),
  }));
