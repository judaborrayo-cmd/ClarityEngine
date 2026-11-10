import type { Choice } from "./questionnaire";

export type Meaning =
  | "strong"
  | "opportunity"
  | "reported_gap"
  | "missing_verification"
  | "non_use";
const S = "strong",
  O = "opportunity",
  G = "reported_gap",
  U = "missing_verification";
// Reviewed option by option. An E is not inherently uncertainty, nor is an
// unreviewed condition affirmative evidence of a faulty customer experience.
export const answerMeanings: Record<string, readonly Meaning[]> = {
  O1: [S, O, G, G, G],
  O2: [S, O, O, G, U],
  O3: [S, O, O, G, G],
  O4: [S, O, G, G, U],
  O5: [S, O, U, U, U],
  O6: [S, O, U, G, G],
  A1: [S, O, O, G, G],
  A2: [S, O, O, G, U],
  A3: [S, O, O, G, U],
  A4: [S, O, O, G, U],
  A5: [S, O, U, G, U],
  M1: [S, O, O, G, G],
  M2: [S, O, O, G, U],
  M3: [S, O, O, G, G],
  M4: [S, O, O, G, U],
  M5: [S, O, O, G, U],
  M6: [S, O, O, G, G],
  C1: [S, O, O, G, U],
  C2: [S, O, O, G, U],
  C3: [S, O, O, G, U],
  C4: [S, O, O, G, U],
  C5: [S, O, O, G, G],
  C6: [S, O, U, G, U],
  T1: [S, O, O, G, G],
  T2: [S, O, O, G, U],
  T3: [S, O, O, G, G],
  T4: [S, O, O, G, G],
  T5: [S, O, O, G, G],
  T6: [S, O, O, G, G],
  T7: [S, O, O, G, G],
  T8: [S, O, O, G, G],
  T9: [S, O, O, G, G],
  T10: [S, O, O, G, U],
  ML1: [S, O, O, G, G],
  ML2: [S, O, O, G, U],
  ML3: [S, O, G, G, G],
  ML4: [S, O, O, U, U],
  ML5: [S, O, O, G, G],
  ML6: [S, O, O, G, G],
};
export function answerMeaning(id: string, answer: Choice): Meaning {
  if (answer === "F") return "non_use";
  const meaning = answerMeanings[id]?.["ABCDE".indexOf(answer)];
  if (!meaning) throw new Error("Missing explicit answer meaning");
  return meaning;
}
// Observations for answers that do not establish the underlying condition.
export const unverifiedObservations: Record<string, string> = {
  O2: "you are not yet sure which customer outcome the offer should promise",
  O4: "there are not enough sales conversations or customer records to judge the pattern of value objections",
  O5: "there is not yet enough direct evidence to judge how consistently customers want the offer",
  O6: "you are unsure how the current sales experience would handle more qualified demand",
  A2: "you have not yet investigated what typically causes customers to start looking",
  A3: "you do not consistently classify lead fit, so the actual quality of inquiries remains unverified",
  A4: "you are not yet sure which larger outcome customers are trying to achieve",
  A5: "the practical route to suitable prospects has not yet been established",
  M2: "you are not yet sure how to distinguish outcome-led messaging from a list of deliverables",
  M4: "the meaningful difference customers would value has not yet been established",
  M5: "you are unsure or uncomfortable about how emotional relevance should fit the message",
  C1: "you have not intentionally designed the experience around one primary action, so its actual clarity needs checking",
  C2: "you are not yet sure how readily visitors understand why the next step is worthwhile",
  C3: "you have not intentionally compared the promise with the destination, so whether they match remains unverified",
  C4: "you have not systematically reviewed the conversion path, so unnecessary friction has not yet been established",
  C6: "you are not yet sure whether the experience fits the commitment you ask for",
  T2: "you do not yet have enough visibility into the funnel to judge incoming demand",
  T10: "you are not yet sure which outcomes campaigns optimize for or whether those outcomes are measured correctly",
  ML2: "you are not yet sure which measures describe business outcomes and which help explain them",
  ML4: "you do not yet have enough confidence in the reporting inputs to rely on them for decisions; the cause needs checking",
};
export const meaningExplanation: Record<Meaning, string> = {
  strong:
    "The response reports an effective capability; it is not independently verified.",
  opportunity:
    "The response describes a functional capability with a credible opportunity to refine it.",
  reported_gap:
    "The response directly reports a missing or weak practice/capability. It does not establish downstream performance loss.",
  missing_verification:
    "The response lacks the evidence or review needed to determine the underlying condition. Do not infer that the condition is faulty.",
  non_use:
    "An explicit non-advertising response, scored through the shared reason/readiness signal rather than as an unknown or a failed advertising process.",
};
