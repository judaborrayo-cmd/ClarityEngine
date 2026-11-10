import {
  ownershipOptions,
  trends,
  nonUseReasons,
  type Setup,
} from "@shared/marketing-clarity-audit/v2/questionnaire";
export const setupChoices: Partial<
  Record<keyof Setup, { value: string; text: string }[]>
> = {
  paidStatus: [
    { value: "running", text: "Currently running paid advertising" },
    { value: "preparing", text: "Preparing to start" },
    { value: "not_planning", text: "Not currently planning to use it" },
  ],
  outcome: [
    { value: "purchases", text: "Purchases" },
    { value: "leads", text: "Leads or qualified opportunities" },
  ],
  nonUseReason: Object.entries(nonUseReasons).map(([value, text]) => ({
    value,
    text,
  })),
  platforms: [
    { value: "single", text: "One platform" },
    { value: "multiple", text: "More than one platform" },
    { value: "none", text: "We are not currently running paid advertising." },
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
