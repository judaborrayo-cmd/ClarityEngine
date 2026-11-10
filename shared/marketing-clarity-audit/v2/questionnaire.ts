import legacy from "../questionnaire.json";
import { z } from "zod";

export const versions = {
  questionnaire: "2.0.0-preview.4",
  scoring: "2.0.0-preview.4",
  report: "2.0.0-preview.4",
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
  "We are not currently running paid advertising.",
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
    outcome: z.enum(["purchases", "leads"]),
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
    if ((s.paidStatus === "running") === (s.platforms === "none"))
      ctx.addIssue({
        code: "custom",
        path: ["platforms"],
        message:
          "Choose the platform answer that matches your current advertising status.",
      });
    if (
      (s.paidStatus === "running") ===
      (s.trend === "We are not currently running paid advertising.")
    )
      ctx.addIssue({
        code: "custom",
        path: ["trend"],
        message:
          "Choose the trend answer that matches your current advertising status.",
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
    if (setup.outcome === "leads") {
      if (q.id === "T6") {
        q.prompt =
          "Do you know what you can afford to pay for a customer and a qualified lead—and the target that makes advertising worthwhile?";
        q.supporting =
          "Use customer value, costs, margins, and the share of qualified leads that become customers to set affordable acquisition costs. Review sales delays and lead quality. Revenue relative to ad spend (ROAS) and return relative to relevant investment costs (ROI) answer different questions.";
        q.options = options([
          "Yes. We calculate and regularly review affordable customer and qualified-lead costs using close rates, customer value, costs, and margins.",
          "We have calculated them, but some assumptions or costs need updating.",
          "We have rough targets, mostly based on past performance or industry benchmarks.",
          "We track lead costs, but do not know which levels support profitable customers.",
          "We have not calculated affordable customer or qualified-lead costs, or are not sure how.",
        ]);
      }
      if (q.id === "T7")
        q.supporting =
          "Review spend, qualified-lead cost, customer acquisition cost, close rates, and customer value at platform and business levels, allowing for sales delays.";
      if (q.id === "T8")
        q.supporting =
          "Consider qualified-lead and customer acquisition costs alongside spend, customer volume, lead quality, close rates, and customer value. Direction itself is unscored.";
    }
    if (q.id === "T7" && setup.platforms === "single") {
      q.prompt =
        "Do you review both the return reported by your advertising platform and the overall return from your advertising investment?";
      q.options[2].text =
        "We mainly review our platform and only occasionally look at the overall business picture.";
    }
    if (["T5", "T6", "T7", "T8", "T9", "T10"].includes(q.id))
      q.options.push({
        value: "F",
        text: "We are not currently running paid advertising.",
        score: nonUseSignalScore(setup),
      });
  }
  return questions.sort(
    (a, b) =>
      a.sectionId - b.sectionId ||
      Number(a.id.match(/\d+/)![0]) - Number(b.id.match(/\d+/)![0]),
  );
}
export const setupPrompts = {
  paidStatus: "Which best describes your paid advertising today?",
  outcome: "Does your business primarily seek purchases or leads?",
  nonUseReason:
    "Which best explains your current decision about paid advertising?",
  platforms:
    "Do you currently advertise on one platform, more than one, or none?",
  owner:
    "Who currently owns paid-media experimentation? (This does not affect your score.)",
  trend:
    "Over the past 3–6 months—or since you started—what has happened to your advertising returns?",
  trendContext:
    "Additional context (optional).",
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
