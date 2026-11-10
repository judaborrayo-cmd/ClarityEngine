import type { AnyV2Report } from "./v2/customer-report";
import { questionsForReport } from "./v2/customer-report";
import { growthDefinitions } from "./customer-language";
import { answerMeaning } from "./v2-next/answer-meaning";
import { readinessMeaning } from "./v2-next/answer-meaning";
const strong: Record<number, string> = {
  1: "Your answers report a clear offer supported by useful customer and demand evidence.",
  2: "Your answers report a useful understanding of customer fit, buying situations and ways to reach suitable people.",
  3: "Your answers report a clear, relevant message with credible support for the claims you make.",
  4: "Your answers report a clear next step, useful reassurance and a customer path that has been checked.",
  5: "Your answers report clear channel roles, affordable targets and a repeatable way to review and learn from paid activity.",
  6: "Your answers report defined business measures, trusted sources and a consistent review and learning process.",
};
const topics: Record<string, string> = {
  O1: "how clearly the offer is explained",
  O2: "the customer result the offer promises",
  O3: "who the offer fits",
  O4: "the evidence behind price or value objections",
  O5: "the evidence of customer demand",
  O6: "readiness for more demand",
  A1: "customer-fit criteria",
  A2: "what starts the buying process",
  A3: "lead qualification",
  A4: "the result customers are seeking",
  A5: "ways to reach suitable people",
  M1: "one consistent explanation of the business",
  M2: "the link between features and benefits",
  M3: "the use of actual customer language",
  M4: "a difference customers value",
  M5: "what matters to customers personally",
  M6: "proof behind marketing claims",
  C1: "clarity of the next step",
  C2: "when visitors understand the value",
  C3: "whether the first message and next page match",
  C4: "whether the customer path contains unnecessary effort",
  C5: "proof where customers are deciding",
  C6: "the fit between the request and customer needs",
  T1: "the role of each channel",
  T2: "visibility through the customer path",
  T3: "how changes in results are investigated",
  T4: "how channels work together",
  T5: "testing responsibility and time",
  T6: "affordable acquisition targets",
  T7: "a useful advertising-results report",
  T8: "a baseline and rules for interpreting results",
  T9: "customer-informed advertising ideas",
  T10: "measurement of useful customer actions",
  ML1: "definitions of useful business results",
  ML2: "the distinction between results and supporting clues",
  ML3: "a consistent report and review rhythm",
  ML4: "reliability of the reporting inputs",
  ML5: "customer-quality feedback after the first response",
  ML6: "how evidence guides the next decision",
};
export function pillarDescription(report: AnyV2Report, id: number) {
  if (!["2.0.0-preview.5","2.0.0-preview.6", "2.0.0-preview.7"].includes(report.versions.questionnaire))
    return growthDefinitions[id][0];
  const questions = questionsForReport(report).filter(
      (q) => q.sectionId === id,
    ),
    ranked = [...questions].sort(
      (a, b) =>
        "ABCDE".indexOf(report.answers[b.id]) -
          "ABCDE".indexOf(report.answers[a.id]) || a.id.localeCompare(b.id),
    );
  if (report.versions.questionnaire === "2.0.0-preview.7") {
    const meaningFor = (qid: string) => report.setup.paidStatus !== "running" && /^T(?:[5-9]|10)$/.test(qid)
      ? readinessMeaning(qid, report.answers[qid]) : answerMeaning(qid, report.answers[qid]);
    const gaps = questions.filter(q => meaningFor(q.id) === "reported_gap");
    const unknown = questions.filter(q => meaningFor(q.id) === "missing_verification");
    const list = (qs: typeof questions) => qs.map(q => q.id === "A3" ? "customer-fit checks" : topics[q.id]).join("; ");
    if (gaps.length && unknown.length) return `Your answers identify gaps in ${list(gaps)}. Separately, check ${list(unknown)}; those unanswered checks do not erase the reported gaps or prove another failure.`;
  }
  const weak = ranked.find((q) => report.answers[q.id] !== "A");
  if (!weak)
    return id === 5 && report.setup.paidStatus !== "running"
      ? "Your answers report prepared ownership, economics, reporting, learning, ideas and measurement. Your separate channel decision still determines whether a paid test is worth evaluating."
      : strong[id];
  const meaning =
    report.setup.paidStatus !== "running" && /^T(?:[5-9]|10)$/.test(weak.id)
      ? readinessMeaning(weak.id, report.answers[weak.id])
      : answerMeaning(weak.id, report.answers[weak.id]);
  const topic = weak.id === "A3" && ["2.0.0-preview.6","2.0.0-preview.7"].includes(report.versions.questionnaire) ? "customer-fit checks" : topics[weak.id];
  return meaning === "missing_verification"
    ? `Check ${topic} before deciding whether a change is needed. This answer identifies missing verification, not a confirmed failure.`
    : meaning === "reported_gap"
      ? `Your answer identifies a specific gap in ${topic}. Address that gap while preserving the stronger capabilities you reported.`
      : `Build on the existing work in ${topic}; your answer identifies a detail to improve or confirm.`;
}
