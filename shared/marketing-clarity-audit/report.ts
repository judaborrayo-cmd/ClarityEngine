import content from "./report-content.json";
import { buildClarityPlan } from "./plan";
import { questionnaire, type Answers } from "./scoring";
import {
  resolveDiagnosis,
  type SectionId,
  type StoredEvidence,
} from "./resolver";
import { customerContextSchema, type CustomerContext } from "./context";

export const reportVersion = "1.0.0";
const defaults: Record<SectionId, string> = {
  1: "P01",
  2: "P03",
  3: "P05",
  4: "P08",
  5: "P13",
  6: "P14",
};
const tags: Record<SectionId, string[]> = {
  1: ["offer"],
  2: ["audience"],
  3: ["message"],
  4: ["conversion"],
  5: ["traffic", "testing"],
  6: ["measurement"],
};
const modelTags: Record<string, string[]> = {
  ecommerce: ["ecommerce"],
  professional_services: ["professional_services", "consulting"],
  local_service: ["local_business"],
  saas_software: ["saas_software"],
  education_coaching: ["education"],
  travel_hospitality: ["travel", "travel_hospitality"],
  membership_subscription: ["membership_subscription"],
  nonprofit: ["nonprofit"],
  other: [],
};

export const commitmentMismatch = {
  summary:
    "The commitment you're asking from the visitor and the experience surrounding that decision appear to be out of alignment.",
  actions: [
    {
      id: "P09_NEUTRAL_01",
      title: "Map exactly what the visitor is being asked to commit.",
      whatToDo:
        "Map exactly what the visitor is being asked to commit: money, time, personal information, scheduled call, contract, etc.",
      doneWhen:
        "You have mapped the money, time, information, and other commitments required at each step.",
    },
    {
      id: "P09_NEUTRAL_02",
      title: "Compare the commitment to the surrounding experience.",
      whatToDo:
        "Compare that commitment to the amount of proof, context, and friction surrounding the decision.",
      doneWhen:
        "You have determined whether the experience asks for too much too soon or overcomplicates a low-risk decision.",
    },
    {
      id: "P09_NEUTRAL_03",
      title: "Resolve the mismatch once its direction is clear.",
      whatToDo:
        "Remove unnecessary friction or add the missing trust/context once the direction of the mismatch is clear.",
      doneWhen:
        "You have removed unnecessary friction or added the identified missing trust and context.",
    },
  ],
  prompt:
    "Does the experience ask for too much too soon, or overcomplicate a relatively low-risk decision? Determine which direction applies before choosing a change.",
};

const doneWhen: Record<string, string> = {
  OFF_01:
    "One sentence states who the offer is for, what they get, and what changes for them.",
  OFF_02: "One primary customer outcome is selected and documented.",
  OFF_03:
    "One primary offer is dominant and secondary offers are clearly secondary.",
  OFF_04:
    "Ten sales conversations have been reviewed for buying, hesitation, rejection, and expectations.",
  OFF_05:
    "Five recent customers have been interviewed and repeated triggers and choice reasons documented.",
  OFF_06:
    "Real prospects have encountered the offer and their demand evidence is documented.",
  AUD_01:
    "The last 20–50 leads are grouped by fit, quality, revenue potential, source, and outcome.",
  AUD_03:
    "Repeated situations immediately preceding purchase interest are documented.",
  AUD_04:
    "Each meaningful segment has a documented problem, trigger, and reachable channel.",
  AUD_06:
    "Poor-fit inquiries are separated from qualified inquiries and targeting or qualification changes are identified.",
  MSG_01: "The primary hero communicates the customer outcome.",
  MSG_03: "Repeated customer phrases are extracted from direct evidence.",
  MSG_04: "Two or three customer-relevant differentiators are documented.",
  MSG_05: "Major claims have relevant proof immediately after them.",
  MSG_07:
    "Ad, landing page, form, sales call, and checkout have been compared for continuity.",
  MSG_08:
    "Internal jargon has been replaced with language a new customer can understand.",
  CONV_01: "One primary next step is visually and conceptually dominant.",
  CONV_02:
    "The value proposition and primary CTA appear early in the experience.",
  CONV_03:
    "Every conversion step has been mapped and unnecessary steps removed.",
  CONV_04:
    "The trust, context, and friction fit the commitment being requested.",
  CONV_05: "The strongest reassurance is placed near the decision point.",
  TRAF_01: "Each meaningful channel has a documented funnel role.",
  TRAF_02: "Source quality is compared using qualified business outcomes.",
  TRAF_03:
    "New-audience acquisition and return-visitor activity are separated where appropriate.",
  TRAF_04: "A working baseline is preserved separately from the test.",
  TRAF_05:
    "The most valuable test question is selected and budget is concentrated around it.",
  TRAF_06: "An acquisition-cost range is calculated from business economics.",
  ML_01: "A small set of meaningful business outcome KPIs is documented.",
  ML_04: "Each primary KPI has an authoritative source and known caveats.",
  ML_05:
    "Available source, lead, qualification, sale, and revenue data are connected, with gaps documented.",
  ML_06: "A change log records dates, reasons, expected impact, and results.",
  ML_07: "An appropriate follow-up system is defined and implemented.",
};

export function selectBundle(diagnosis: ReturnType<typeof resolveDiagnosis>) {
  const sectionId = diagnosis.primary?.sectionId;
  if (!sectionId) return { pattern: undefined, recommendations: [] };
  const pattern = content.patterns.find(
    (p) => p.id === (diagnosis.primary?.pattern?.id ?? defaults[sectionId]),
  )!;
  if (pattern.id === "P09")
    return {
      pattern,
      recommendations: commitmentMismatch.actions.map((action) => ({
        ...action,
        why: commitmentMismatch.summary,
        whyCritical: commitmentMismatch.summary,
      })),
    };
  const ids = pattern.recommendationIds.map((id) => {
    if (
      id === "MSG_05" &&
      diagnosis.confidence.contradictions.some((c) => c.id === "CR07")
    )
      return "MSG_07";
    return id;
  });
  return {
    pattern,
    recommendations: ids.map((id) => {
      const action = content.recommendations.find((r) => r.id === id)!;
      return {
        ...action,
        why: `Your responses indicate that ${questionnaire.sections.find((s) => s.id === sectionId)!.name} needs attention. This action addresses that priority.`,
        whyCritical:
          action.whyCritical ??
          `This action helps you ${action.whatToDo.charAt(0).toLowerCase()}${action.whatToDo.slice(1)}`,
        doneWhen: action.doneWhen ?? doneWhen[id],
      };
    }),
  };
}

export function matchCase(
  sectionId: SectionId,
  context: CustomerContext,
  patternId?: string,
) {
  const relevanceTags = patternId === "P13" ? ["testing"] : tags[sectionId];
  const businessTags = modelTags[context.businessType];
  const ranked = content.cases
    .map((card) => ({
      card,
      relevance: card.applicability.filter((tag) => relevanceTags.includes(tag))
        .length,
      model: card.applicability.filter((tag) => businessTags.includes(tag))
        .length,
      evidence:
        { A_quantified: 3, B_observed: 2, C_strategic: 1 }[card.evidence] ?? 0,
    }))
    .filter((c) => c.relevance > 0)
    .sort(
      (a, b) =>
        b.relevance - a.relevance ||
        b.model - a.model ||
        b.evidence - a.evidence ||
        a.card.id.localeCompare(b.card.id),
    );
  return ranked[0]?.card;
}

export function kpiBundle(
  pattern: (typeof content.patterns)[number],
  context: CustomerContext,
) {
  const parsed = pattern.kpiGuidance.match(
    /^Primary: (.*); Supporting: (.*); Diagnostic: (.*)$/,
  )!;
  const goal: Record<string, string> = {
    purchases: "Purchases",
    leads: "Qualified leads",
    booked_calls: "Booked calls",
    trials_demos: "Qualified trials / demos",
    registrations: "Registrations",
    store_visits: "Store visits",
    subscribers: "Subscribers",
  };
  const ambiguous = ["P11", "P13", "P14"].includes(pattern.id);
  return {
    primary: ambiguous
      ? (goal[context.primaryMarketingGoal] ?? parsed[1])
      : parsed[1],
    supporting: parsed[2],
    diagnostic: parsed[3]
      .split("/")
      .map((metric) => metric.trim())
      .slice(0, 2),
    note: "Do not optimize toward diagnostic KPIs in isolation.",
  };
}

export function workSession(
  primary: SectionId | undefined,
  secondary: SectionId | undefined,
  patternId?: string,
) {
  const prompts = (id: SectionId | undefined, count: number) =>
    id
      ? content.workSessions
          .find(
            (bank) =>
              bank.section ===
              questionnaire.sections.find((s) => s.id === id)!.name,
          )!
          .prompts.slice(0, count)
      : [];
  const primaryPrompts = prompts(primary, 6);
  if (patternId === "P09") primaryPrompts[5] = commitmentMismatch.prompt;
  return {
    primaryPrompts,
    secondaryPrompts: prompts(secondary, 3),
    synthesis: {
      title: "Turn Your Thinking Into a Decision",
      fields: [
        "Primary constraint",
        "Decision",
        "Evidence supporting the decision",
        "Next action",
        "What you will not prioritize yet",
        "KPI and source of truth",
        "What you will review after 30 days",
      ],
    },
  };
}

export function createFrozenReport(
  answers: Answers,
  inputContext: unknown,
  evidence: StoredEvidence = {},
  date = new Date(),
) {
  const context = customerContextSchema.parse(inputContext);
  const diagnosis = resolveDiagnosis(answers, evidence);
  const { pattern, recommendations } = selectBundle(diagnosis);
  const constraint = diagnosis.primary
    ? questionnaire.sections.find((s) => s.id === diagnosis.primary!.sectionId)!
        .name
    : undefined;
  const summary =
    pattern?.id === "P09"
      ? commitmentMismatch.summary
      : !constraint
        ? "No clear constraint is indicated by your answers."
        : diagnosis.confidence.level === "high"
          ? `We recommend focusing on your ${constraint.toLowerCase()}.`
          : diagnosis.confidence.level === "moderate"
            ? `${constraint} is the strongest constraint indicated by your answers.`
            : `Your answers point most strongly toward ${constraint}, but gaps in available evidence make the diagnosis less certain.`;
  const report = {
    reportVersion,
    contentVersion: content.version,
    createdAt: date.toISOString(),
    context,
    diagnosis,
    summary,
    recommendations,
    deprioritized: (pattern?.deprioritizedActions ?? [])
      .slice(0, 3)
      .map((action) => ({
        action,
        reason: `Address ${constraint} first: ${pattern!.title.toLowerCase()} makes this a premature priority.`,
      })),
    caseCard: diagnosis.primary
      ? matchCase(diagnosis.primary.sectionId, context, pattern?.id)
      : undefined,
    kpis: pattern
      ? kpiBundle(pattern, context)
      : {
          primary: "Business outcome associated with your primary goal",
          supporting: "Conversion rate",
          diagnostic: ["Change in conversion over time"],
          note: "Do not optimize toward diagnostic KPIs in isolation.",
        },
    aiAccelerators: pattern
      ? [{ patternId: pattern.id, instruction: pattern.aiAccelerator }]
      : [],
    thirtyDayPlan: buildClarityPlan(pattern, recommendations),
    workSession: workSession(
      diagnosis.primary?.sectionId,
      diagnosis.secondary?.sectionId,
      pattern?.id,
    ),
    uncertaintyNotes: diagnosis.evidenceGaps.map((g) => g.message),
    aiPrinciple:
      "Use AI to accelerate informed thinking, not to outsource decisions you have not defined clearly enough yet.",
  };
  return JSON.parse(JSON.stringify(report)) as typeof report;
}

export type FrozenAuditReport = ReturnType<typeof createFrozenReport>;
