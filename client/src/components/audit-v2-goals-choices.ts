import { goalLabels } from "@shared/marketing-clarity-audit/v2-goals/goals";
import {
  ownershipOptions,
  trends,
  nonUseReasons,
  type Setup,
} from "@shared/marketing-clarity-audit/v2-goals/questionnaire";
export const baseSetupChoices: Partial<
  Record<keyof Setup, { value: string; text: string }[]>
> = {
  paidStatus: [
    { value: "running", text: "Currently running paid advertising" },
    { value: "preparing", text: "Preparing to start" },
    { value: "not_planning", text: "Not currently planning to use it" },
  ],
  outcome: Object.entries(goalLabels).map(([value, text]) => ({ value, text })),
  nonUseReason: Object.entries(nonUseReasons).map(([value, text]) => ({
    value,
    text,
  })),
  platforms: [
    { value: "single", text: "One platform" },
    { value: "multiple", text: "More than one platform" },
    { value: "none", text: "No paid platform has been selected yet." },
  ],
  owner: ownershipOptions.map((v) => ({ value: v, text: v })),
  trend: trends.map((v) => ({ value: v, text: v })),
  testReadiness: [
    {
      value: "ready",
      text: "Yes. Budget, useful conversion volume, and duration are planned; successful campaigns are protected.",
    },
    {
      value: "limited",
      text: "Our budget, conversion volume, or available time limits what we can learn.",
    },
    {
      value: "unknown",
      text: "We are not sure what is enough or how to protect what works.",
    },
  ],
};

export function choicesFor(setup: Setup) {
  return {
    ...baseSetupChoices,
    ...(setup.paidStatus !== "running"
      ? {
          testReadiness: [
            {
              value: "ready",
              text: "A learning budget, useful outcome sample and review period are planned, with existing marketing protected.",
            },
            {
              value: "limited",
              text: "Budget, useful outcome volume or available time limits what we could learn.",
            },
            {
              value: "unknown",
              text: "We have not established what would be enough for a useful, responsible test.",
            },
          ],
        }
      : {}),
    trend: (setup.paidStatus === "running"
      ? trends.slice(0, 7)
      : trends.slice(7)
    ).map((v) => ({ value: v, text: v })),
  };
}
export function setupPrompt(field: keyof Setup, setup: Setup) {
  if (field === "trend" && setup.paidStatus !== "running")
    return "Is a baseline ready for reviewing a possible paid test?";
  if (field === "testReadiness" && setup.paidStatus !== "running")
    return "Could a proposed test collect useful evidence within an affordable budget and review period?";
  if (field === "platforms" && setup.paidStatus !== "running")
    return "How many paid platforms would you evaluate for an initial test?";
  return undefined;
}
