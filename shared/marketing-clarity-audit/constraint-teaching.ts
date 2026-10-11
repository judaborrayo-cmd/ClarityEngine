import type { FrozenAuditReport } from "./report";
export interface ConstraintTeachingContent {
  meaning: string[];
  strong: string[];
  constrained: string[];
  consequence: string;
  progress: { title: string; description: string }[];
}
// Canonical presentation lessons. These examples never add diagnostic evidence or rules.
export const constraintTeaching: Record<number, ConstraintTeachingContent> = {
  1: {
    meaning: [
      "Offer is what a customer gets, who it is for, and why the outcome is worth choosing. It includes the promise, price, and way the service or product is packaged.",
    ],
    strong: [
      "A new buyer quickly understands what is being sold.",
      "The offer promises a specific, useful customer outcome.",
      "The intended customer and buying situation are clear.",
      "Real customer behavior provides evidence of demand.",
      "Price and deliverables make sense in relation to the value.",
    ],
    constrained: [
      "Buyers must assemble the value from a list of services or features.",
      "Several offers compete without one clear priority.",
      "The promised improvement is vague.",
      "Qualified prospects repeatedly question the value or reason to choose it.",
      "Demand is assumed rather than supported by customer evidence.",
    ],
    consequence:
      "When the offer is unclear or unproven, more traffic and better execution can amplify confusion. People may hesitate before messaging or the sales experience has a chance to help.",
    progress: [
      {
        title: "Buyers can explain the offer",
        description:
          "New prospects can describe what they get and why it matters without a long explanation.",
      },
      {
        title: "One customer outcome is clear",
        description:
          "Your pages, conversations, and proposals consistently lead with the same meaningful improvement.",
      },
      {
        title: "Value objections become more specific",
        description:
          "Customer questions help refine fit and delivery instead of revealing basic confusion about what is being sold.",
      },
      {
        title: "Demand is supported by behavior",
        description:
          "Relevant prospects take meaningful next steps, buy, or provide specific evidence you can use to evaluate the offer.",
      },
    ],
  },
  2: {
    meaning: [
      "Audience is your understanding of the people or businesses most likely to benefit from your offer, the situations that make them look for help, and where you can reach them.",
    ],
    strong: [
      "Best-fit customers are identifiable in concrete terms.",
      "Their buying triggers and problems are understood.",
      "Leads are evaluated for fit rather than counted equally.",
      "Customer conversations reveal what they ultimately want to accomplish.",
      "You know where relevant prospects can be reached.",
    ],
    constrained: [
      "The audience is described as almost everyone.",
      "Marketing attracts people who cannot benefit or are unlikely to buy.",
      "Buying triggers are guessed rather than observed.",
      "Customer groups with different needs receive the same approach.",
      "Lead volume hides poor customer fit.",
    ],
    consequence:
      "Without a clear customer, your offer, message, and channel choices can pull in different directions. Time and budget go toward interest that is unlikely to become useful business.",
    progress: [
      {
        title: "Customer fit becomes easier to identify",
        description:
          "Your team can explain who benefits most and which prospects are a poor fit.",
      },
      {
        title: "Buying situations repeat",
        description:
          "Conversations reveal consistent problems or triggers that your marketing can address.",
      },
      {
        title: "Qualified interest improves",
        description:
          "A greater share of conversations comes from people with the need, circumstances, and ability to take the next step.",
      },
      {
        title: "Reach is more deliberate",
        description:
          "Channel and audience choices connect to identifiable customers rather than broad guesses.",
      },
    ],
  },
  3: {
    meaning: [
      "Message is how clearly you communicate the value of your offer, why someone should care, why they should choose you, and what evidence makes the promise believable.",
    ],
    strong: [
      "A new visitor understands the main value quickly.",
      "Customer outcomes lead; features explain how they are delivered.",
      "The language sounds like real customer conversations.",
      "A reasonable buyer can explain why this option is different.",
      "Important claims are supported by credible proof.",
    ],
    constrained: [
      "The message mainly lists services, features, or internal terminology.",
      "Visitors struggle to understand the customer benefit.",
      "Claims sound interchangeable with competing offers.",
      "The message does not connect to a reason people care.",
      "Persuasion is stronger than the evidence supporting it.",
    ],
    consequence:
      "Weak messaging can make a good offer look average. It can reduce interest before prospects reach the stronger parts of your business or understand the value they would receive.",
    progress: [
      {
        title: "New visitors understand the value",
        description:
          "People unfamiliar with the business can explain the main benefit after a brief look.",
      },
      {
        title: "Customer language appears consistently",
        description:
          "Pages and sales materials use the problems, outcomes, and words you hear from relevant customers.",
      },
      {
        title: "Reasons to choose you become clearer",
        description:
          "Prospects can distinguish your offer from a reasonable alternative without relying only on price.",
      },
      {
        title: "Proof supports the decision",
        description:
          "The strongest claims have relevant examples, testimonials, or evidence where buyers evaluate them.",
      },
    ],
  },
  4: {
    meaning: [
      "Conversion Experience is the path from interest to a meaningful next action. It includes how clear the step is, the work it requires, and the proof and reassurance around that decision.",
    ],
    strong: [
      "The next action is obvious and worthwhile.",
      "The promise before the click matches the experience after it.",
      "Forms, booking, checkout, and conversations remove unnecessary work.",
      "Proof and reassurance appear near the decision.",
      "The experience fits the commitment being requested.",
    ],
    constrained: [
      "Visitors have to work out what to do next.",
      "The page does not deliver the promise that brought them there.",
      "Unnecessary steps or uncertainty interrupt interest.",
      "Proof is missing when the visitor needs it most.",
      "The ask and the surrounding experience are out of alignment.",
    ],
    consequence:
      "Even qualified interest can stall when the next step is confusing, difficult, or unsupported. The aim is to align the requested commitment with enough context and trust, without adding unnecessary friction.",
    progress: [
      {
        title: "The next step is understood",
        description:
          "Relevant visitors can explain what to do next and why the step is worthwhile.",
      },
      {
        title: "The promise stays consistent",
        description:
          "The ad, referral, page, and next interaction describe the same value and expectations.",
      },
      {
        title: "Avoidable friction is removed",
        description:
          "You can identify and eliminate unnecessary steps without removing the context needed for a sound decision.",
      },
      {
        title: "Commitment and reassurance align",
        description:
          "The proof and explanation around the action match what the visitor is being asked to commit.",
      },
    ],
  },
  5: {
    meaning: [
      "Traffic is how the right people enter and return to your marketing system. It includes the role of each channel, acquisition costs, and whether tests receive enough budget and volume to teach you something useful.",
    ],
    strong: [
      "Channels have clear jobs for finding new people or bringing them back.",
      "Qualified demand and business economics guide spending.",
      "Proven campaigns stay stable while new ideas are tested separately.",
      "Tests have a clear question and enough data to evaluate it.",
      "Changes and results build a record of useful learning.",
    ],
    constrained: [
      "Visits increase without clarity about customer fit or business value.",
      "Channels are judged without understanding the job each performs.",
      "Too many tests divide limited budget and traffic.",
      "The working baseline changes alongside the test.",
      "Performance shifts lead to edits without a useful comparison or change log.",
    ],
    consequence:
      "Poorly directed or underpowered acquisition can spend money without producing dependable demand or learning. Frequent changes can also disrupt what was working and make results harder to explain.",
    progress: [
      {
        title: "A working baseline stays intact",
        description:
          "You can identify the campaigns or channels producing acceptable results and keep them stable while testing separately.",
      },
      {
        title: "Tests answer one useful question",
        description:
          "Each test names a hypothesis, the variable being changed, and the budget, traffic, and time needed for a meaningful comparison.",
      },
      {
        title: "Channel roles are clearer",
        description:
          "You know which sources introduce new people, bring them back, or help them take the next step.",
      },
      {
        title: "Changes produce usable learning",
        description:
          "A dated record connects changes, expected effects, observed results, and the decision to keep, revise, scale, or stop.",
      },
    ],
  },
  6: {
    meaning: [
      "Measurement & Learning is your ability to know whether marketing is creating meaningful business results, understand why performance changed, and use that evidence to decide what to do next.",
      "It is not simply having analytics. A strong measurement system connects marketing activity → customer behavior → leads/sales → revenue/business outcomes → decisions.",
    ],
    strong: [
      "A few important business KPIs are clearly defined.",
      "Everyone knows the source of truth for each KPI.",
      "Marketing can be connected to downstream leads, sales, and revenue.",
      "Changes are documented and evaluated against evidence.",
      "Tests produce learning that informs the next decision.",
      "Reporting makes decisions easier.",
    ],
    constrained: [
      "Teams track many metrics but aren't sure which ones matter.",
      "Platforms and business systems disagree and nobody knows which number to trust.",
      "Marketing performance stops at clicks, leads, or platform-reported conversions.",
      "Performance changes lead to reactive edits without understanding the cause.",
      "Campaigns change frequently but little cumulative knowledge is created.",
      "Reporting produces numbers without clear conclusions or actions.",
    ],
    consequence:
      "When measurement is weak, even good marketing becomes harder to improve. You may scale something that only looks effective, cut something that is actually contributing to revenue, or make several changes without learning which one mattered.",
    progress: [
      {
        title: "You have a small KPI hierarchy",
        description:
          "You can name the few numbers that tell you whether marketing is producing meaningful business value.",
      },
      {
        title: "Every important KPI has a source of truth",
        description:
          "You know whether each number comes from your CRM, commerce platform, analytics, ad platform, sales system, or another authoritative source. Known discrepancies are documented rather than ignored.",
      },
      {
        title: "Marketing connects downstream",
        description:
          "You can follow meaningful portions of the journey from source/campaign → qualified lead → customer → revenue.",
      },
      {
        title: "Reporting creates decisions",
        description:
          "Weekly or monthly reporting helps answer: What changed? Why do we think it changed? What evidence supports that? What should we do next?",
      },
      {
        title: "Tests create cumulative learning",
        description:
          "Hypotheses, meaningful changes, results, and lessons are documented so future decisions benefit from previous tests.",
      },
    ],
  },
};
export function teachingFor(report: FrozenAuditReport) {
  return report.diagnosis.primary
    ? constraintTeaching[report.diagnosis.primary.sectionId]
    : undefined;
}
export const hierarchyExplanation =
  "Outcome KPIs tell you whether the business result happened. Supporting indicators show meaningful progress toward that result. Diagnostic signals help explain why performance changed.";
export function improvementHierarchy(report: FrozenAuditReport) {
  return report.diagnosis.primary?.sectionId === 6
    ? [
        { label: "Business outcome", value: "Revenue / purchases" },
        {
          label: "Supporting indicator",
          value: "Qualified leads / opportunities",
        },
        {
          label: "Diagnostic signals",
          value:
            "Conversion rate, CPL, CTR, attribution discrepancies, funnel-stage drop-off",
        },
      ]
    : [
        { label: "Business outcome", value: report.kpis.primary },
        { label: "Supporting indicator", value: report.kpis.supporting },
        {
          label: "Diagnostic signals",
          value: report.kpis.diagnostic.join(" · "),
        },
      ];
}
