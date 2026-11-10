import { assessmentQuestions, sections, type Setup } from "./questionnaire";
export const setupPlacement = {
  outcome: {
    sectionId: 1,
    before: "O1",
    reason: "Business goals frame the offer and all later outcome wording.",
  },
  paidStatus: {
    sectionId: 2,
    before: "A5",
    reason:
      "Current paid reach belongs with how suitable customers are reached; this establishes status before later paid questions.",
  },
  testReadiness: {
    sectionId: 5,
    before: "T7",
    reason:
      "Test feasibility follows the acquisition-economics answer and precedes the reporting/learning questions.",
  },
  nonUseReason: {
    sectionId: 5,
    before: "T1",
    reason:
      "The channel decision belongs with acquisition strategy, after advertising status has been answered.",
  },
  platforms: {
    sectionId: 5,
    before: "T5",
    reason:
      "Platform scope belongs between channel roles and the paid testing questions.",
  },
  trend: {
    sectionId: 6,
    before: "ML2",
    reason:
      "Returns or preparation baselines belong with interpreting useful measures; status and platform scope are already known.",
  },
  owner: {
    sectionId: 6,
    before: "ML5",
    reason:
      "The responsible person belongs with the feedback and review process; job title remains unscored.",
  },
} as const;
export function customerSteps(setup: Setup) {
  return sections.flatMap((section) =>
    assessmentQuestions(setup)
      .filter((q) => q.sectionId === section.id)
      .flatMap((question) => [
        ...Object.entries(setupPlacement)
          .filter(([, p]) => p.before === question.id)
          .map(([field, p]) => ({
            key: `setup-${field}`,
            sectionId: p.sectionId,
            field: field as keyof typeof setupPlacement,
            question: undefined,
          })),
        {
          key: question.id,
          sectionId: question.sectionId,
          field: undefined,
          question,
        },
      ]),
  );
}
export function completedStepValues(
  setup: Setup,
  answers: Record<string, string>,
) {
  return {
    ...answers,
    ...Object.fromEntries(
      Object.keys(setupPlacement)
        .filter((f) => isSetupAnswered((setup as any)[f]))
        .map((f) => [`setup-${f}`, (setup as any)[f]]),
    ),
  };
}
export function isSetupAnswered(value: unknown) {
  return Array.isArray(value) ? value.length > 0 : Boolean(value);
}
