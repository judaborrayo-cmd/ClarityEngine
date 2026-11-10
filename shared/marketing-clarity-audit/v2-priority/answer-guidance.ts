import { coreObservation as oldObservation } from "../v2-goals/answer-guidance";
export * from "../v2-goals/answer-guidance";
import { recipes } from "../v2-goals/answer-guidance";
import { answerMeaning } from "../v2-goals/answer-meaning";
import type { Answers } from "../v2-goals/questionnaire";
// Within a pillar only: strongest answered gap; a known absence wins an equal-severity
// tie with an unperformed check. Uncertainty is not given a lower severity score.
export function focusedCoreId(ids: string[], answers: Answers) {
  return [...ids].sort(
    (a, b) =>
      "ABCDE".indexOf(answers[b]) - "ABCDE".indexOf(answers[a]) ||
      Number(answerMeaning(b, answers[b]) === "reported_gap") -
        Number(answerMeaning(a, answers[a]) === "reported_gap") ||
      recipes[a].topic.localeCompare(recipes[b].topic),
  )[0];
}

export function coreObservation(id: string, answers: Answers) {
  if (id === "ML1" && answers.ML1 === "D")
    return "different people judge performance using different metrics";
  if (id === "M4" && answers.M4 === "D")
    return "your marketing sounds similar to competing alternatives";
  return oldObservation(id, answers);
}
