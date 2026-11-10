import { scenarios } from "../v2/scenarios";
import { versions, assessmentQuestions, type Setup } from "./questionnaire";
export function sample(
  reason = "running",
  goals: Setup["outcome"] = ["purchases", "leads"],
) {
  const old = scenarios.find(
    (s) => s.draft.setup.nonUseReason === reason,
  )!.draft;
  const setup = {
    ...old.setup,
    outcome: goals,
    ...(reason === "running"
      ? {}
      : { trend: "Baseline and review date defined" }),
  } as Setup;
  const answers = Object.fromEntries(
    assessmentQuestions(setup).map((q) => [q.id, "A"]),
  ) as Record<string, any>;
  return { versions, setup, answers };
}
