import {
  assessmentQuestions,
  requiredSetupFields,
  sections,
  type Setup,
} from "./questionnaire";
export function customerSteps(setup: Setup) {
  const questions = assessmentQuestions(setup);
  return sections.flatMap((section) => [
    ...(section.id === 5
      ? requiredSetupFields.map((field) => ({
          key: `setup-${field}`,
          sectionId: 5,
          field,
          question: undefined,
        }))
      : []),
    ...questions
      .filter((q) => q.sectionId === section.id)
      .map((question) => ({
        key: question.id,
        sectionId: section.id,
        field: undefined,
        question,
      })),
  ]);
}
export function completedStepValues(
  setup: Setup,
  answers: Record<string, string>,
) {
  return {
    ...answers,
    ...Object.fromEntries(
      requiredSetupFields
        .filter((f) => setup[f])
        .map((f) => [`setup-${f}`, setup[f]]),
    ),
  };
}
/** Separate sentences for progressive disclosure, without inventing or removing report claims. */
export function reportParagraphs(text: string) {
  return text.split(/(?<=[.!?])\s+(?=[A-Z])/).filter(Boolean);
}
