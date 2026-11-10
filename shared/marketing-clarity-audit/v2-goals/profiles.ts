import { marketingGoals, goalLabels, type BusinessGoal } from "./goals";
import { sample } from "./review-fixtures";
const cases: BusinessGoal[][] = [
  ...marketingGoals.map((g) => [g]),
  ["purchases", "leads"],
  ["demos", "trials"],
  ["store_visits", "subscribers"],
];
export const reviewProfiles = cases.flatMap((goals) =>
  [undefined, "ML3", "T6"].map((weak) => {
    const draft = sample("running", goals);
    if (weak) draft.answers[weak] = "E";
    return {
      name: `${goals.map((g) => goalLabels[g]).join(" + ")} — ${weak === "ML3" ? "no KPI report" : weak === "T6" ? "affordable targets not defined" : "strong answers"}`,
      draft,
    };
  }),
);
for (const weak of [undefined, "ML3"]) {
  const draft = sample("running", [
    "demos",
    "trials",
    "registrations",
    "store_visits",
    "subscribers",
    "other",
  ]);
  if (weak) draft.answers[weak] = "E";
  reviewProfiles.push({
    name: `Additional business goals — ${weak ? "no KPI report" : "strong answers"}`,
    draft,
  });
}
const other = sample("running", ["other"]);
other.setup.trendContext =
  "Synthetic reviewer: we have not yet agreed the outcome definition.";
reviewProfiles.push({
  name: "Unspecified other outcome with contextual note",
  draft: other,
});
const deliberate = sample("deliberate", ["store_visits", "subscribers"]);
reviewProfiles.push({
  name: "Other channels deliberately prioritized",
  draft: deliberate,
});
const preparing = sample("preparing", ["demos", "trials"]);
preparing.answers.T10 = "E";
reviewProfiles.push({
  name: "Demos and trials — measurement preparation needed",
  draft: preparing,
});
