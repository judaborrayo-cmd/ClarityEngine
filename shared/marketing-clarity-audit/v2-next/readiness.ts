import { readinessMeaning } from "./answer-meaning";
import type { Setup, Answers } from "./questionnaire";
const titles: Record<string, [string, string, string]> = {
  T5: [
    "Review who can own a test",
    "Agree responsibility and protected time",
    "Confirm the owner’s test responsibilities",
  ],
  T6: [
    "Review costs and customer value",
    "Choose affordable targets for the selected goals",
    "Check the cost model before considering spend",
  ],
  T7: [
    "Review the available measures and reports",
    "Choose a simple report and update owner",
    "Prepare and check the report",
  ],
  T8: [
    "Review the baseline and learning question",
    "Agree when to proceed, wait or stop",
    "Check the written test decision rules",
  ],
  T9: [
    "Review customer evidence and existing ideas",
    "Choose an audience, offer and useful idea",
    "Prepare the research brief or prototype",
  ],
  T10: [
    "Trace the intended customer actions",
    "Choose which measurement checks are needed",
    "Check measurement before deciding to spend",
  ],
};
const topics: Record<
  string,
  {
    title: string;
    evidence: string;
    choose: string;
    prepare: string;
    done: string;
  }
> = {
  T5: {
    title: "Agree who owns the proposed test",
    evidence:
      "Review the people and time available for a test. Keep any responsibility already agreed; identify only the missing agreement.",
    choose:
      "Agree one accountable person, protected time and the decisions they can make. Support can be internal or external; hiring is not assumed.",
    prepare:
      "Write and confirm the responsibility and time agreement before any test is funded.",
    done: "A named person has accepted responsibility, time and a review date.",
  },
  T6: {
    title: "Set affordable targets before considering spend",
    evidence:
      "Bring together costs, margins, customer value and any lead qualification, close-rate or sales-delay information needed for the selected goals.",
    choose:
      "Choose affordable acquisition targets and record assumptions separately for each relevant outcome. Identify any inputs that still need checking.",
    prepare:
      "Complete and check a small cost model, then record a spending ceiling or a decision to defer. No campaign launch is required.",
    done: "Affordable targets, checked assumptions and a spending or deferral decision are documented.",
  },
  T7: {
    title: "Prepare a simple test-results report",
    evidence:
      "Inventory the useful measures, trusted sources and existing reports. Preserve clearly defined measures and sources that already work.",
    choose:
      "Choose one lightweight format with consistent definitions, reporting periods, sources, an update owner and a review rhythm.",
    prepare:
      "Prepare and check that report using existing records or a clearly labelled rehearsal. A new software platform or live campaign is not required.",
    done: "The report format, sources, update owner and review schedule are ready and checked.",
  },
  T8: {
    title: "Define what the test should teach you",
    evidence:
      "Review the available baseline, the question you want to answer and how long the selected outcomes take to appear.",
    choose:
      "Agree what evidence would support proceeding, stopping, waiting or deciding that the result is inconclusive. Account for customer quality and delays.",
    prepare:
      "Write and check the comparison and decision rules with the person responsible. Keep a no-test or no-change decision available.",
    done: "A learning question, baseline, review date and decision rules are documented.",
  },
  T9: {
    title: "Choose an audience, offer and idea worth investigating",
    evidence:
      "Review customer conversations, current-channel results and existing ideas. Identify what supports the proposed audience and offer.",
    choose:
      "Choose one customer-informed idea and the assumption it would test. Use research first where the evidence is too thin.",
    prepare:
      "Prepare a research brief or prototype that links the audience, offer, message and learning question. Do not launch a campaign merely to complete this move.",
    done: "One evidence-supported idea or a research-first decision is documented.",
  },
  T10: {
    title: "Check how the important actions will be measured",
    evidence:
      "Trace the selected customer actions through the proposed tracking and reporting sources. Separate checks not yet performed from failures actually found.",
    choose:
      "Decide whether the existing measurement is suitable or which specific missing setup/check is needed. Keep trusted definitions and sources.",
    prepare:
      "Check a labelled sample or rehearsal and complete only the missing measurement work found. Do this before deciding whether to fund a test.",
    done: "The intended actions and sources are defined, and measurement is checked or its remaining limits are recorded.",
  },
};
export function readinessOpportunity(answers: Answers) {
  const order = ["T10", "T6", "T5", "T7", "T8", "T9"];
  const candidates = order
    .filter((id) => answers[id] !== "A")
    .sort(
      (a, b) =>
        "ABCDE".indexOf(answers[b]) - "ABCDE".indexOf(answers[a]) ||
        order.indexOf(a) - order.indexOf(b),
    );
  const id = candidates[0];
  if (!id) return undefined;
  const r = topics[id];
  const meaning = readinessMeaning(id, answers[id]);
  const why =
    meaning === "missing_verification"
      ? "Your answer identifies a check that has not been completed. Establish what is true before deciding that anything needs repair."
      : answers[id] === "B"
        ? "You report that most of this preparation is in place, with a specific detail still to confirm. Keep what already works."
        : "Your answer identifies a preparation step that is not yet in place or sufficiently clear. This is a readiness opportunity, not evidence that advertising has failed.";
  return {
    id: `prep_${id}`,
    sectionId: 5,
    questionIds: [id],
    kind: (meaning === "missing_verification"
      ? "uncertainty"
      : meaning === "opportunity"
        ? "improvement opportunity"
        : "demonstrated weakness") as
      "uncertainty" | "improvement opportunity" | "demonstrated weakness",
    evidenceMeanings: [{ questionId: id, answer: answers[id], meaning }],
    title: r.title,
    rationale: why,
    priority:
      (answers[id] === "B" ? 25 : answers[id] === "C" ? 14 : 8) +
      order.indexOf(id) / 10,
    actions: [
      {
        id: `prep_${id}_1`,
        title: titles[id][0],
        whatToDo: r.evidence,
        why,
        doneWhen:
          "The existing preparation, useful evidence and specific missing work are recorded.",
      },
      {
        id: `prep_${id}_2`,
        title: titles[id][1],
        whatToDo: r.choose,
        why,
        doneWhen:
          "One practical decision names the scope, responsible person and review criteria.",
      },
      {
        id: `prep_${id}_3`,
        title: titles[id][2],
        whatToDo: r.prepare,
        why,
        doneWhen: r.done,
      },
    ],
  };
}
