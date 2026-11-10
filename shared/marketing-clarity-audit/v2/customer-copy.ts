/** Customer wording only. Question grouping and scoring stay internal. */
export const customerCopy = {
  introduction: "Answer 46 questions to find your next growth opportunity.",
  completion: "All 46 questions answered.",
  optionalContext: "Additional context (optional).",
} as const;
export function questionProgress(answered: number) {
  return `${answered} of 46 questions answered.`;
}
