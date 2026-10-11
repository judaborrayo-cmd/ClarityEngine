import content from "./report-content.json";
export interface PlanWeek {
  week: number;
  title: string;
  objective: string;
  actions: string[];
  completionCriteria: string;
}
export const foundationalOfferPlan: PlanWeek[] = [
  {
    week: 1,
    title: "Understand / Baseline",
    objective:
      "Find evidence in what customers and prospects have already told you.",
    actions: [
      "Review 5–10 recent buyers, sales conversations, proposals, or lost opportunities.",
      "Capture repeated problems, desired outcomes, reasons for buying, and objections.",
    ],
    completionCriteria:
      "You have a one-page evidence summary showing the strongest repeated customer problems, outcomes, buying reasons, and objections.",
  },
  {
    week: 2,
    title: "Decide / Build",
    objective: "Turn that evidence into one clear offer decision.",
    actions: [
      "Choose one primary offer, one primary customer, and one outcome that customer should remember.",
      "Draft the one-sentence offer statement.",
    ],
    completionCriteria:
      "You can clearly state who the offer is for, what they get, and what changes for them in one sentence.",
  },
  {
    week: 3,
    title: "Implement / Strengthen",
    objective:
      "Make the customer-facing experience consistently communicate that offer.",
    actions: [
      "Update the homepage/primary landing-page hero, offer description, and primary CTA or sales explanation to reinforce the same proposition.",
    ],
    completionCriteria:
      "At least three major customer-facing touchpoints communicate the same primary offer and outcome.",
  },
  {
    week: 4,
    title: "Measure / Learn",
    objective: "Validate the revised offer against real market feedback.",
    actions: [
      "Put the revised offer in front of at least five relevant prospects/customers or meaningful live traffic.",
      "Record confusion, objections, and response.",
    ],
    completionCriteria:
      "You have documented at least three useful learnings and made a deliberate decision to keep, refine, or rethink the positioning.",
  },
];
// Each pattern can supply four fully authored weeks here without changing diagnostic logic.
export const patternPlans: Partial<Record<string, PlanWeek[]>> = {
  P01: foundationalOfferPlan,
};
export function buildClarityPlan(
  pattern: (typeof content.patterns)[number] | undefined,
  recommendations: { whatToDo: string; doneWhen: string }[],
): PlanWeek[] {
  if (!pattern) return [];
  if (patternPlans[pattern.id])
    return structuredClone(patternPlans[pattern.id]!);
  const phase = pattern.planPhases.map((p) =>
    p.slice(p.indexOf(":") + 1).trim(),
  );
  return [
    {
      week: 1,
      title: "Understand / Baseline",
      objective: `Establish an evidence-based baseline for ${pattern.primaryConstraint.toLowerCase()}.`,
      actions: [
        `Start with the diagnostic's baseline task: ${phase[0]}.`,
        "Collect the relevant customer feedback, current touchpoints, and available outcome data. Document gaps rather than guessing.",
      ],
      completionCriteria:
        "A short baseline names the current problem, the evidence supporting it, and the information still missing.",
    },
    {
      week: 2,
      title: "Decide / Build",
      objective:
        "Choose one clear decision that directly addresses the diagnosed constraint.",
      actions: [
        `Use the baseline to ${phase[1]}.`,
        "Write the decision, why it matters, who will carry it out, and what you will deliberately leave unchanged.",
      ],
      completionCriteria:
        "One decision and a bounded implementation brief are written down, with an owner and a clear measure of progress.",
    },
    {
      week: 3,
      title: "Implement / Strengthen",
      objective: "Put the selected decision into the customer-facing system.",
      actions: recommendations.map((r) => r.whatToDo),
      completionCriteria: recommendations.map((r) => r.doneWhen).join(" "),
    },
    {
      week: 4,
      title: "Measure / Learn",
      objective: "Use the observed response to decide what happens next.",
      actions: [
        `Complete the learning task: ${phase[3]}.`,
        `Review the report's primary and supporting KPIs, customer feedback, and change log. Record what improved, what did not, and what remains uncertain.`,
      ],
      completionCriteria:
        "A learning note records the evidence observed and a deliberate decision to keep, refine, or rethink the change; unsupported outcome claims are excluded.",
    },
  ];
}
