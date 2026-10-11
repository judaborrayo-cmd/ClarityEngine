import {
  finalDecisionPrompts,
  patternWorkSessions,
} from "./work-session-content";
import type { FrozenAuditReport } from "./report";
import content from "./report-content.json";
import { buildClarityPlan } from "./plan";
import { sectionColors } from "./sections";

export function reportPlan(report: FrozenAuditReport) {
  const rich = report.thirtyDayPlan.every(
    (w) =>
      w.actions[0] !== w.objective &&
      !w.completionCriteria.startsWith("Document the result of this phase:"),
  );
  if (rich) return report.thirtyDayPlan;
  const defaults: Record<number, string> = {
    1: "P01",
    2: "P03",
    3: "P05",
    4: "P08",
    5: "P13",
    6: "P14",
  };
  const id =
    report.diagnosis.primary?.pattern?.id ??
    defaults[report.diagnosis.primary?.sectionId ?? 0];
  return buildClarityPlan(
    content.patterns.find((p) => p.id === id),
    report.recommendations,
  );
}
export function confidencePresentation(report: FrozenAuditReport) {
  const primary = report.diagnosis.primary;
  if (!primary)
    return {
      explanation:
        "Your answers do not establish a clear constraint. The confidence score reflects the consistency of the collected responses, rather than an independent verification of business performance.",
      caveats: [] as string[],
    };
  const name = sectionColors[primary.sectionId].name;
  const multiple = report.diagnosis.confidence.corroborationBonus > 0;
  const downstream = Object.entries(report.diagnosis.sectionScores).filter(
    ([id]) => Number(id) > primary.sectionId,
  );
  const stronger =
    downstream.length > 0 &&
    downstream.every(
      ([, score]) =>
        score >= 65 &&
        score > report.diagnosis.sectionScores[primary.sectionId],
    );
  const focus =
    primary.pattern?.id === "P01"
      ? "clarity and packaging"
      : name.toLowerCase();
  const explanation =
    report.diagnosis.confidence.level === "high"
      ? `${multiple ? `Multiple ${name} responses consistently point` : `Your ${name} responses point`} to ${focus} as the main constraint${stronger ? ", while downstream sections remain comparatively strong" : ". The selected constraint is supported directly by your collected responses"}.`
      : `Your collected responses point most strongly to ${name}. ${multiple ? "Several responses support this direction, but" : "The evidence is less conclusive, and"} the confidence adjustments reflect uncertainty or conflicting signals that should be checked before committing to a change.`;
  const ids = [
    primary.pattern?.id,
    report.diagnosis.secondary?.pattern?.id,
  ].filter(Boolean);
  return {
    explanation,
    caveats: [
      ...report.diagnosis.evidenceGaps
        .filter((g) => ids.includes(g.patternId))
        .map((g) => g.message),
      ...report.diagnosis.confidence.contradictions
        .filter((c) => c.penalty > 0)
        .map((c) => c.message),
    ],
  };
}
export function caseRelevance(report: FrozenAuditReport) {
  if (
    report.caseCard?.id === "CASE_BUSINESS_SYSTEMS_POSITIONING" &&
    report.diagnosis.primary?.sectionId === 1
  )
    return "Your Offer results suggest a similar opportunity: make the customer outcome easier to understand before explaining all the pieces that deliver it.";
  const connections: Record<number, string> = {
    1: "make the complete customer outcome clear, rather than asking buyers to assemble value from a list of services",
    2: "choose the customer and buying situation your marketing is best equipped to serve",
    3: "connect the customer’s problem to a clear promise and credible proof",
    4: "align the commitment you request with the proof, context, and friction surrounding the decision",
    5: "give each channel a clear role before expanding traffic or spend",
    6: "connect the measures you trust to a decision you can act on",
  };
  const patternConnections: Record<string, string> = {
    P13: "protect a stable comparison and give one useful test enough budget and time to teach you something",
    P14: "define the outcomes that matter, agree on reliable sources, and connect reporting to a decision",
  };
  const connection =
    patternConnections[report.diagnosis.primary?.pattern?.id ?? ""] ??
    connections[report.diagnosis.primary?.sectionId ?? 0] ??
    "turn the evidence into one focused strategic decision";
  return report.diagnosis.primary
    ? `Your ${sectionColors[report.diagnosis.primary.sectionId].name} diagnosis makes this lesson relevant: ${connection}. Use evidence from your own customers to decide which change fits your business.`
    : "Use this lesson to examine the evidence in your own business before choosing a change.";
}
export function aiPresentation(report: FrozenAuditReport) {
  const gather: Record<number, string[]> = {
    1: [
      "Current offers and pricing",
      "Website and landing-page copy",
      "Testimonials",
      "Sales-call transcripts or notes",
      "Prospect objections",
      "Lost-opportunity notes",
    ],
    2: [
      "Recent leads or customers grouped by fit, source, and outcome.",
      "Buying triggers and language from relevant customer conversations.",
    ],
    3: [
      "Your current headline, offer explanation, and available proof.",
      "Customer language, objections, and the alternatives they consider.",
    ],
    4: [
      "The actual ad-to-page-to-decision journey and its required commitments.",
      "Available proof, reassurance, and observed points of friction.",
    ],
    5: [
      "Channel roles, business economics, and the current testing baseline.",
      "Available qualified outcomes, budget constraints, and the test hypothesis.",
    ],
    6: [
      "The KPI definitions, reporting sources, and known data gaps.",
      "A change log and available source-to-outcome evidence.",
    ],
  };
  return report.aiAccelerators.map((ai) => ({
    ...ai,
    gather: gather[report.diagnosis.primary?.sectionId ?? 1],
    ask:
      report.diagnosis.primary?.sectionId === 1
        ? "Give AI the evidence above and ask it to identify repeated customer problems, desired outcomes, objections, and language. Then ask it to generate several possible offer formulations based on those patterns."
        : ai.instruction,
    use: "Check the output against the original evidence. Select and refine the useful options, make the strategic decision yourself, and validate it with real customers or observed outcomes.",
  }));
}
export function workPrompts(report: FrozenAuditReport) {
  const authored =
    patternWorkSessions[report.diagnosis.primary?.pattern?.id ?? ""];
  const primary =
    authored?.primaryThinkingPrompts ??
    report.workSession.primaryPrompts.map((label, index) => ({
      id: `primary-${index}`,
      label,
      helper: undefined as string | undefined,
    }));
  const supporting = report.diagnosis.secondary
    ? (authored?.supportingThinkingPrompts ??
      report.workSession.secondaryPrompts.map((label, index) => ({
        id: `secondary-${index}`,
        label,
        helper: undefined as string | undefined,
      })))
    : [];
  const generic = report.workSession.synthesis.fields.map((label, index) => ({
    id: `decision-${index}`,
    label,
    helper: undefined as string | undefined,
    legacy: true,
    group: "decision" as const,
    sectionId: report.diagnosis.primary?.sectionId,
  }));
  return [
    ...primary.map((prompt) => ({
      ...prompt,
      helper: prompt.helper,
      legacy: false,
      group: "primary" as const,
      sectionId: report.diagnosis.primary?.sectionId,
    })),
    ...supporting.map((prompt) => ({
      ...prompt,
      helper: prompt.helper,
      legacy: false,
      group: "secondary" as const,
      sectionId: report.diagnosis.secondary?.sectionId,
    })),
    ...finalDecisionPrompts.map((prompt) => ({
      ...prompt,
      helper: prompt.helper,
      legacy: false,
      group: "decision" as const,
      sectionId: report.diagnosis.primary?.sectionId,
    })),
    ...(authored?.legacyDecisionPrompts ?? []).map((prompt) => ({
      ...prompt,
      helper: prompt.helper,
      legacy: true,
      group: "decision" as const,
      sectionId: report.diagnosis.primary?.sectionId,
    })),
    ...generic,
  ];
}
export function recommendationsPresentation(report: FrozenAuditReport) {
  return report.recommendations.map((move) => {
    const authored = content.recommendations.find(
      (item) => item.id === move.id,
    );
    // Only the three explicitly approved actions receive a presentation upgrade.
    return ["TRAF_04", "TRAF_05", "ML_06"].includes(move.id) && authored
      ? { ...move, ...authored, doneWhen: authored.doneWhen ?? move.doneWhen }
      : move;
  });
}
export function supportingSequence(report: FrozenAuditReport) {
  const primary = report.diagnosis.primary?.sectionId,
    supporting = report.diagnosis.secondary?.sectionId;
  if (!primary || !supporting) return undefined;
  const first = sectionColors[primary].name,
    next = sectionColors[supporting].name;
  return {
    intro: `Focus first on ${first}. ${next} is also limiting performance, but it should be addressed after the primary issue is clearer or materially improved.`,
    next: `Once the primary changes have enough evidence to evaluate, reassess ${next}. It is your current supporting constraint and may become the next highest-leverage area to improve.`,
  };
}

// Presentation only: historical report content and selection remain frozen.
export function caseTeaching(report: FrozenAuditReport) {
  const card = report.caseCard;
  if (!card) return undefined;
  if (card.id !== "CASE_BUSINESS_SYSTEMS_POSITIONING")
    return {
      title: card.title,
      stages: [
        ["Business", `${card.industry} · ${card.businessModel}`],
        ["The problem", card.situation],
        ["Diagnosis", card.diagnosis],
        ["The shift", card.intervention],
      ],
      lesson: card.lesson,
    };
  return {
    title: "Help customers see the business outcome, not just a website",
    stages: [
      [
        "How the business makes money",
        "It sells done-for-you or assisted bundles of branding, websites, CRM, booking, automation, and related business infrastructure to service businesses.",
      ],
      [
        "What customers were shown",
        "Visual before/after example coming soon. The original offer presentation is not shown here.",
      ],
      [
        "The problem",
        "The case diagnosis identified a clarity risk: buyers could interpret the service as website development and have to infer how the broader system helps them capture leads, book customers, and follow up. The original presentation is not available here for comparison.",
      ],
      [
        "What customers actually cared about",
        "They were not primarily shopping for a website. They wanted a professional business presence, more leads, easier booking, and a system that helped them follow up and grow.",
      ],
      [
        "Improved direction",
        "Lead with what the customer gets and what improves for them. Use the website, CRM, booking tools, and automation as proof of how the outcome is delivered, not as the headline value proposition.",
      ],
    ],
    lesson:
      "Make it clear what people get and what’s in it for them. Don’t make customers assemble the value themselves from a list of features or services.",
  };
}

export function recommendationWhyCritical(
  move: FrozenAuditReport["recommendations"][number],
) {
  return (
    move.whyCritical ??
    content.recommendations.find((r) => r.id === move.id)?.whyCritical ??
    move.why
  );
}
