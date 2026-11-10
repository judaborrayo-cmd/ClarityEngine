import { goalsSchema, selectedGoalLabels, goalMeasures } from "./goals";
import legacy from "../questionnaire.json";
import { z } from "zod";

export const versions = {
  questionnaire: "2.0.0-preview.6",
  scoring: "2.0.0-preview.6",
  report: "2.0.0-preview.6",
} as const;
export const ownershipOptions = [
  "Founder / owner",
  "Dedicated internal specialist",
  "Internal team member with multiple responsibilities",
  "Agency / external specialist",
  "Shared responsibility",
  "No clear owner",
  "Not sure",
] as const;
export const trends = [
  "Generally improving",
  "Generally stable",
  "Generally declining",
  "Mixed across campaigns or platforms",
  "Too little history to judge",
  "We are not tracking this consistently",
  "I do not know",
  "Baseline and review date defined",
  "Baseline outlined; some sources still need checking",
  "No useful baseline defined yet",
  "Previous test results need reviewing",
] as const;
export const nonUseReasons = {
  deliberate:
    "We have evaluated paid advertising and deliberately prioritize other channels.",
  support:
    "We want to advertise but lack the knowledge, ownership, or support to start.",
  risk: "We are concerned about losing money and do not know how to test responsibly.",
  tried: "We tried advertising, but the results were disappointing or unclear.",
  preparing:
    "We are preparing our offer, budget, or measurement before starting.",
  unexplored: "We have not seriously considered it.",
  running: "We currently run paid advertising.",
} as const;
export const nonUseScores = {
  deliberate: 4.5,
  support: 2.5,
  risk: 2.5,
  tried: 3,
  preparing: 3.5,
  unexplored: 2,
  running: 5,
} as const;
export const requiredSetupFields = [
  "paidStatus",
  "outcome",
  "nonUseReason",
  "platforms",
  "owner",
  "trend",
  "testReadiness",
] as const;
export const setupSchema = z
  .object({
    paidStatus: z.enum(["running", "preparing", "not_planning"]),
    outcome: goalsSchema,
    nonUseReason: z.enum([
      "deliberate",
      "support",
      "risk",
      "tried",
      "preparing",
      "unexplored",
      "running",
    ]),
    platforms: z.enum(["single", "multiple", "none"]),
    owner: z.enum(ownershipOptions),
    trend: z.enum(trends),
    trendContext: z.string().trim().max(1200).optional(),
    testReadiness: z.enum(["ready", "limited", "unknown"]),
  })
  .strict()
  .superRefine((s, ctx) => {
    if ((s.paidStatus === "running") !== (s.nonUseReason === "running"))
      ctx.addIssue({
        code: "custom",
        path: ["nonUseReason"],
        message:
          "Choose the reason that matches your current advertising status.",
      });
    if (s.paidStatus === "running" && s.platforms === "none")
      ctx.addIssue({
        code: "custom",
        path: ["platforms"],
        message:
          "Choose the platform answer that matches your current advertising status.",
      });
    const planningTrends = [
      "Baseline and review date defined",
      "Baseline outlined; some sources still need checking",
      "No useful baseline defined yet",
      "Previous test results need reviewing",
    ];
    if ((s.paidStatus !== "running") !== planningTrends.includes(s.trend))
      ctx.addIssue({
        code: "custom",
        path: ["trend"],
        message: "Choose a review answer that matches your advertising status.",
      });
  });
export type Setup = z.infer<typeof setupSchema>;
export function nonUseSignalScore(setup: Setup) {
  const base = nonUseScores[setup.nonUseReason] ?? 3;
  return Math.max(
    2,
    base -
      (setup.testReadiness === "limited"
        ? 0.25
        : setup.testReadiness === "unknown"
          ? 0.5
          : 0),
  );
}
export type Choice = "A" | "B" | "C" | "D" | "E" | "F";
export type Answers = Record<string, Choice>;
export interface Question {
  id: string;
  sectionId: number;
  prompt: string;
  supporting?: string;
  weight: number;
  options: { value: Choice; text: string; score: number }[];
}
const options = (texts: string[]) =>
  texts.map((text, i) => ({ value: "ABCDE"[i] as Choice, text, score: 5 - i }));
const paid: Question[] = [
  {
    id: "T5",
    sectionId: 5,
    weight: 1,
    prompt:
      "Do you have someone with dedicated responsibility and time to keep improving your paid advertising through testing?",
    supporting:
      "This could include testing creative, messaging, offers, audiences, landing pages, campaigns, platforms, or relevant ad formats.",
    options: options([
      "Yes. Someone has clear responsibility and protected time, runs a prioritized testing program, and regularly applies what we learn.",
      "Yes. Someone is responsible and tests regularly, but competing priorities sometimes limit the work.",
      "Someone manages our ads, but testing is occasional rather than an ongoing responsibility.",
      "The founder or team fits testing around other responsibilities; there is no dedicated time or consistent process.",
      "No. Nobody currently owns ongoing paid-media experimentation.",
    ]),
  },
  {
    id: "T6",
    sectionId: 5,
    weight: 1,
    prompt:
      "Do you know your break-even return on ad spend—and the target you need to make advertising worthwhile?",
    supporting:
      "ROAS compares revenue with advertising spend. Break-even ROAS is the revenue per advertising dollar needed to cover the costs you include. Use your own costs and margins. ROI considers the relevant investment costs; strong ROAS alone does not establish profitability.",
    options: options([
      "Yes. We have calculated our break-even point and target using our costs and margins, and review them regularly.",
      "We have calculated them, but some assumptions or costs need updating.",
      "We have a rough target, mostly based on past performance or industry benchmarks.",
      "We track ROAS, but do not know what level actually makes advertising profitable.",
      "We have not calculated this or are not sure what break-even ROAS means.",
    ]),
  },
  {
    id: "T7",
    sectionId: 5,
    weight: 1,
    prompt:
      "Do you review both the return from individual advertising platforms and the overall return from your advertising investment?",
    options: options([
      "Yes. We regularly review both and use them together to guide budget and growth decisions.",
      "We review both, but do not consistently use them to make decisions.",
      "We mainly review individual platforms and only occasionally look at the overall picture.",
      "We rely on isolated campaign results or occasional reports.",
      "We do not have a consistent way to review advertising returns.",
    ]),
  },
  {
    id: "T8",
    sectionId: 5,
    weight: 1,
    prompt:
      "How clearly can you explain those results and what they mean for the business?",
    supporting:
      "Consider the trend you just selected alongside spend, customer volume, customer quality, and profitability. Direction itself does not earn or lose points.",
    options: options([
      "We review changes alongside spend, customer volume, customer quality, and profitability, and can explain our decisions.",
      "We understand the main changes, but some business context is missing.",
      "We can see the changes but are often unsure what caused them or what to do.",
      "We mostly react to short-term fluctuations or platform alerts.",
      "We do not have a consistent baseline or review process.",
    ]),
  },
  {
    id: "T9",
    sectionId: 5,
    weight: 1,
    prompt:
      "How consistently do you develop and test new advertising ideas to find your next opportunity?",
    supporting:
      "Think about new messages, creative concepts, offers, audiences, or relevant campaign approaches—not only small variations of the same ad.",
    options: options([
      "We have an ongoing pipeline of ideas informed by customers and performance, and use each round of testing to improve the next.",
      "We develop and test new ideas regularly, but our learning or follow-through is inconsistent.",
      "We test occasionally, mostly through small variations of existing ads.",
      "We usually wait for performance to decline before trying something new.",
      "We do not have a consistent process for developing and testing new ideas.",
    ]),
  },
  {
    id: "T10",
    sectionId: 5,
    weight: 1,
    prompt:
      "Are your campaigns optimizing for the results that create real value for your business?",
    supporting:
      "Optimization means the outcome the advertising system is trying to produce. Awareness campaigns can have a different intended role; judge whether their chosen outcomes fit that role.",
    options: options([
      "Yes. We verify that the outcomes and values used for optimization reflect valuable purchases or qualified opportunities, or the intended role of awareness campaigns.",
      "Mostly. The outcomes are relevant, but some customer-quality or value feedback is missing.",
      "We optimize for leads or purchases, but rarely check differences in quality or value.",
      "We focus on easily measured actions without knowing how closely they connect to business results.",
      "We are not sure what our campaigns optimize for or whether it is measured correctly.",
    ]),
  },
];
export const sections = legacy.sections.map((s) => ({
  ...s,
  name: s.id === 5 ? "Traffic & Paid Acquisition" : s.name,
}));
export function assessmentQuestions(setup: Setup): Question[] {
  const questions: Question[] = legacy.questions
    .filter((q) => !["T5", "T6"].includes(q.id))
    .map((q) => ({
      ...q,
      options: q.options.map((o) => ({
        value: o.value as Choice,
        text: o.text,
        score: o.score,
      })),
    }));
  questions.push(
    ...paid.map((q) => ({ ...q, options: q.options.map((o) => ({ ...o })) })),
  );
  for (const q of questions) {
    if (setup.paidStatus !== "running" && q.id === "T3")
      q.prompt =
        "When marketing results change, how well can you investigate what changed across your customer journey?";
    if (setup.paidStatus !== "running" && q.id === "T4")
      q.prompt =
        "Do you understand how your current channels work together, from discovery to becoming a customer?";
    if (q.id === "T7" && setup.platforms === "single") {
      q.prompt =
        "Do you review both the return reported by your advertising platform and the overall return from your advertising investment?";
      q.options[2].text =
        "We mainly review our platform and only occasionally look at the overall business picture.";
    }
    if (setup.paidStatus !== "running" && readinessQuestions[q.id])
      Object.assign(q, readinessQuestions[q.id]);

    if (setup.paidStatus === "running" && q.id === "T6") {
      q.prompt = `Have you set affordable acquisition targets for ${selectedGoalLabels(setup).toLowerCase() || "your selected business outcomes"}?`;
      q.supporting = `Review each selected outcome separately: ${goalMeasures(setup)}. A desired outcome is not automatically revenue; record the assumptions connecting it to business value.`;
      q.options = options([
        "We calculate and review affordable targets for each selected outcome using its business value and relevant costs.",
        "Targets exist, but some assumptions need updating.",
        "We have rough targets, mainly from past results or benchmarks.",
        "We track costs but cannot explain which levels support the business.",
        "We have not calculated affordable targets for these outcomes.",
      ]);
    }
    if (setup.paidStatus === "running" && ["T7", "T8", "T10"].includes(q.id))
      q.supporting = `Use the outcomes you selected, keeping their definitions and review periods separate: ${goalMeasures(setup)}.`;
    if (q.id === "T10" && setup.paidStatus === "running")
      q.options = options([
        "We verify that each campaign uses the intended business outcome and a meaningful value or quality check.",
        "The intended outcomes are selected, but a value or quality check needs improving.",
        "We use the intended outcomes but rarely check their business value.",
        "We mainly optimize easy activity rather than the intended business result.",
        "We have not checked whether the campaign objective or feedback represents the intended business result.",
      ]);
    if (q.id === "O6")
      q.prompt =
        "If the number of suitable people reaching your offer doubled, how confident would you feel sending them into the current customer experience?";
    if (q.id === "A3")
      q.prompt =
        "How often are the people showing interest in your offer a good fit for it?";
    if (q.id === "T2")
      q.prompt =
        "Can you tell whether enough suitable people are entering the customer path to support the outcomes you want?";
  }
  return questions.sort(
    (a, b) =>
      a.sectionId - b.sectionId ||
      Number(a.id.match(/\d+/)![0]) - Number(b.id.match(/\d+/)![0]),
  );
}
export const setupPrompts = {
  paidStatus: "Which best describes your paid advertising today?",
  outcome:
    "Which business goals should your marketing support? Select all that matter.",
  nonUseReason:
    "Which best explains your current decision about paid advertising?",
  platforms:
    "Which paid-platform scope fits your current activity or first proposed test?",
  owner:
    "Who is responsible for turning paid-media test results into decisions?",
  trend:
    "Over the past 3–6 months—or since you started—what has happened to your advertising returns?",
  trendContext: "Additional context (optional).",
  testReadiness:
    "Can your tests use enough budget, useful conversion volume, and time to learn while preserving successful campaigns?",
};
export function questionCounts(setup: Setup) {
  const scored = assessmentQuestions(setup).length;
  return {
    scored,
    coreQuestions: 35,
    additionalPaidGroups: 4,
    setupAnswers: requiredSetupFields.length,
    scoredContextAnswers: 1,
    conditionalFollowUps: 0,
    optionalNotes: 1,
    requiredAnswers: scored + requiredSetupFields.length,
    screens: scored + requiredSetupFields.length,
  };
}

export const readinessQuestions: Record<
  string,
  Pick<Question, "prompt" | "supporting" | "options">
> = {
  T5: {
    prompt: "Who would own a paid-advertising test, and is time set aside?",
    supporting:
      "A founder, team member or external specialist can own a test. A role title alone does not establish readiness.",
    options: options([
      "A named person has agreed responsibility, protected time and a way to act on what we learn.",
      "A person is responsible, but protected time or follow-through needs confirming.",
      "Someone could help, but responsibility and time are only loosely agreed.",
      "People could contribute, but no one is accountable for the test.",
      "We have not yet decided who would own a test.",
    ]),
  },
  T6: {
    prompt:
      "Have you worked out what you could afford to pay for the results you want?",
    supporting:
      "Use the goals you selected, relevant costs, customer value and—where appropriate—lead qualification and close rates. A target is preparation, not a reason to start spending.",
    options: options([
      "We have documented affordable targets for our selected outcomes, with costs and assumptions reviewed.",
      "Targets are documented, but some assumptions need updating.",
      "We have rough targets, mostly from benchmarks or other channels.",
      "We know some costs but cannot yet judge whether a paid test would be affordable.",
      "We have not worked out affordable acquisition targets.",
    ]),
  },
  T7: {
    prompt:
      "Is a simple report ready to compare a paid test with business results?",
    supporting:
      "It can be a spreadsheet. Name the outcomes, definitions, data sources, reporting period and person who will review it.",
    options: options([
      "A report or template, consistent definitions, sources, review period and owner are ready.",
      "The report is outlined, but a source or review responsibility still needs confirming.",
      "Some useful information exists, but it is not brought together consistently.",
      "We would rely on separate platform screens or ad hoc updates.",
      "We have not planned how to review test results.",
    ]),
  },
  T8: {
    prompt:
      "Could you tell what a test taught you before deciding what to do next?",
    supporting:
      "Agree the baseline, learning question, sales delays and decision rules. An inconclusive result or a decision not to proceed can be useful.",
    options: options([
      "We have a baseline, learning question and decision rules that account for outcome quality and delays.",
      "The main comparison is clear, but some decision rules or delays need confirming.",
      "We have a question, but are unsure what evidence would answer it.",
      "We would mainly react to early costs, clicks or platform alerts.",
      "We have not defined what a useful result would look like.",
    ]),
  },
  T9: {
    prompt:
      "Do you have a useful audience, offer and advertising idea to investigate?",
    supporting:
      "Start with customer evidence and one question. Research or a prototype can be the right next step before any live campaign.",
    options: options([
      "A customer-informed audience, offer and idea are documented, with a clear learning question.",
      "Promising ideas exist, but one audience or offer assumption needs checking.",
      "We have ideas, mostly based on intuition rather than customer evidence.",
      "The audience, offer and idea have not been connected into a useful test.",
      "We have not identified an advertising idea worth evaluating.",
    ]),
  },
  T10: {
    prompt:
      "Are the important customer actions ready to be measured accurately?",
    supporting:
      "Check the tracking and definitions for the goals you selected. Check the relevant quality or value evidence, rather than relying only on an easy activity count.",
    options: options([
      "Relevant actions and values are defined, and the measurement path has been checked.",
      "The main actions are defined, but one tracking or quality-feedback check remains.",
      "Basic tracking exists, but we have not checked whether it represents useful outcomes.",
      "We would mainly measure clicks or other easy activity instead of the intended business result.",
      "The relevant actions and measurement checks have not been set up.",
    ]),
  },
};
