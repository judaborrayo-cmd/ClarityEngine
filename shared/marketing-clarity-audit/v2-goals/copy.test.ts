import { test } from "node:test";
import assert from "node:assert/strict";
import { createReport } from "./engine";
import { plainText } from "./plain-language";
import { sample } from "./review-fixtures";
import { assessmentQuestions } from "./questionnaire";
import { reviewProfiles } from "./profiles";
export function customerStrings(report: ReturnType<typeof createReport>) {
  return [
    report.introduction,
    report.trendNote,
    ...report.recommendations.flatMap((m) => [
      m.title,
      m.whatToDo,
      m.why,
      m.doneWhen,
    ]),
    ...report.thirtyDayPlan.flatMap((w) => [
      w.title,
      w.objective,
      ...w.actions,
      w.completionCriteria,
    ]),
    ...report.progressMeasures,
    ...report.workSession,
    report.caveat,
  ];
}
export const joiningErrors =
  /\b[Aa] idea\b|\bis that [A-Z]|\bthat Your answer\b|\b(?:that that|the the|to to)\b|\.{2}|[.!?][”"']\.|\s+[.,;]/;
test("copy normalization repairs the article after renaming a hypothesis", () => {
  assert.equal(
    plainText("A hypothesis names a hypothesis."),
    "An idea names an idea.",
  );
});
test("generated customer sentences have valid joins across representative and isolated-weak profiles", () => {
  const drafts = [
    ...reviewProfiles.map((p) => p.draft),
    ...assessmentQuestions(sample().setup).flatMap((q) =>
      ["B", "C", "D", "E"].map((answer) => {
        const d = sample();
        d.answers[q.id] = answer;
        return d;
      }),
    ),
    ...[
      "deliberate",
      "support",
      "risk",
      "tried",
      "preparing",
      "unexplored",
    ].flatMap((reason) =>
      ["T5", "T6", "T7", "T8", "T9", "T10"].map((id) => {
        const d = sample(reason);
        d.answers[id] = "E";
        return d;
      }),
    ),
  ];
  for (const draft of drafts)
    for (const s of customerStrings(createReport(draft)))
      assert.doesNotMatch(s, joiningErrors);
  const one = sample();
  for (const q of assessmentQuestions(one.setup)) one.answers[q.id] = "E";
  one.answers.O5 = "A";
  const intro = createReport(one).introduction;
  assert.match(intro, /That is a useful foundation to keep\./);
  assert.doesNotMatch(intro, /Those are/);
});
