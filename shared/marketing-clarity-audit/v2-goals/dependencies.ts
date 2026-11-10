import type { Setup } from "./questionnaire";
export function invalidatedByChange(
  setup: Setup,
  field: string,
  value: string | string[],
) {
  if (field === "paidStatus" && setup.paidStatus && value !== setup.paidStatus)
    return {
      setup: ["nonUseReason", "platforms", "trend", "testReadiness"],
      answers: ["T5", "T6", "T7", "T8", "T9", "T10"],
    };
  if (
    field === "outcome" &&
    Array.isArray(setup.outcome) &&
    setup.outcome.length &&
    JSON.stringify([...setup.outcome].sort()) !==
      JSON.stringify([...(value as string[])].sort())
  )
    return { setup: [], answers: ["T6", "T7", "T8", "T10"] };
  return { setup: [], answers: [] };
}
