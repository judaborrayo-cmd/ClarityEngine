import canonical from "./questionnaire.json";

export const questionnaire = canonical;
export type AnswerValue = "A" | "B" | "C" | "D" | "E";
export type Answers = Record<string, AnswerValue>;
export const severityRank = {
  none: 0,
  opportunity: 1,
  major: 2,
  critical: 3,
} as const;

export function validateAnswers(
  input: unknown,
  requireComplete = false,
): Answers {
  if (!input || typeof input !== "object" || Array.isArray(input))
    throw new Error("Invalid answers");
  const answers: Answers = {};
  for (const [id, value] of Object.entries(input)) {
    const question = canonical.questions.find((q) => q.id === id);
    if (!question || !question.options.some((option) => option.value === value))
      throw new Error("Invalid question or answer");
    answers[id] = value as AnswerValue;
  }
  if (requireComplete && Object.keys(answers).length !== 35)
    throw new Error("Complete all 35 questions");
  return answers;
}

export function scoreAnswers(input: unknown) {
  const answers = validateAnswers(input, true);
  const sectionScores = Object.fromEntries(
    canonical.sections.map((section) => {
      const questions = canonical.questions.filter(
        (q) => q.sectionId === section.id,
      );
      const earned = questions.reduce(
        (sum, q) =>
          sum +
          q.weight * q.options.find((o) => o.value === answers[q.id])!.score,
        0,
      );
      const maximum = questions.reduce((sum, q) => sum + q.weight * 5, 0);
      return [section.id, (earned / maximum) * 100];
    }),
  );
  const flags = canonical.questions.flatMap((q) => {
    const option = q.options.find((o) => o.value === answers[q.id])!;
    return "flag" in option ? [{ questionId: q.id, ...option.flag }] : [];
  });
  return {
    sectionScores,
    overallScore:
      Object.values(sectionScores).reduce((sum, score) => sum + score, 0) / 6,
    flags,
  };
}

export function sectionBand(score: number) {
  return score >= 80
    ? "Strong"
    : score >= 65
      ? "Solid / Functional"
      : score >= 45
        ? "Needs Attention"
        : "Priority Area";
}

export function assessmentProgress(input: unknown) {
  const answers = validateAnswers(input);
  const answered = Object.keys(answers).length;
  return {
    answered,
    percent: Math.round((answered / 35) * 100),
    nextQuestionId: canonical.questions.find((q) => !answers[q.id])?.id,
    remainingTime:
      answered === 35
        ? "Complete"
        : answered < 12
          ? "~10–18 min remaining"
          : answered < 24
            ? "~5–10 min remaining"
            : "~1–5 min remaining",
    sections: canonical.sections.map((section) => ({
      sectionId: section.id,
      answered: canonical.questions.filter(
        (q) => q.sectionId === section.id && answers[q.id],
      ).length,
      total: canonical.questions.filter((q) => q.sectionId === section.id)
        .length,
    })),
  };
}
