import { sectionPriority, precedenceDecision } from "./selection-priority";
import {
  scoreAnswers,
  validateAnswers,
  questionnaire,
  severityRank,
  type Answers,
} from "./scoring";

export type SectionId = 1 | 2 | 3 | 4 | 5 | 6;
export interface StoredEvidence {
  activeAcquisition?: boolean;
  sufficientLeadVolume?: boolean;
  multipleAcquisitionChannels?: boolean;
  scaleIntent?: boolean;
  qualificationDefined?: boolean;
  trafficExists?: boolean;
  nonTrivialConsideration?: boolean;
  weakFollowUp?: boolean;
}
export interface PatternMatch {
  id: string;
  sectionId: SectionId;
  evidenceIds: string[];
}
export interface EvidenceGap {
  patternId: string;
  field: keyof StoredEvidence;
  message: string;
}
const evidenceMessages: Record<keyof StoredEvidence, string> = {
  activeAcquisition:
    "Downstream visibility needs attention, but active acquisition was not established. Confirm that context before drawing an attribution conclusion.",
  sufficientLeadVolume:
    "Lead quality needs attention, but lead volume was not collected. Confirm volume before treating qualification as the primary constraint.",
  multipleAcquisitionChannels:
    "Channel roles need attention, but the number of active channels was not collected. Confirm which channels are active.",
  scaleIntent:
    "An upstream issue is indicated, but plans to increase traffic were not collected. Confirm scale intent before interpreting this as a more-traffic trap.",
  qualificationDefined:
    "The definition of a qualified lead was not collected. Verify it before relying on lead-quality claims.",
  trafficExists:
    "Follow-up may deserve review, but traffic volume was not established.",
  nonTrivialConsideration:
    "The length and complexity of the buying decision were not established. Confirm them before diagnosing follow-up leakage.",
  weakFollowUp:
    "Follow-up maturity was not collected. Review it during the Work Session rather than assuming a follow-up problem.",
};
const weak = (a: Answers, id: string) => ["D", "E"].includes(a[id]);
const strong = (a: Answers, id: string) => ["A", "B"].includes(a[id]);

export function detectContradictions(
  a: Answers,
  evidence: StoredEvidence = {},
) {
  return [
    {
      id: "CR01",
      matches: strong(a, "O5") && a.O4 === "D",
      penalty: 5,
      sectionIds: [1, 3],
      message:
        "Demand is validated; value resistance points to positioning or value communication rather than an unvalidated offer.",
    },
    {
      id: "CR02",
      matches: strong(a, "M1") && weak(a, "C3"),
      penalty: 3,
      sectionIds: [3, 4],
      message:
        "The message may be clear before the click; review continuity after the click.",
    },
    {
      id: "CR03",
      matches: strong(a, "T6") && a.ML1 === "E",
      penalty: 8,
      sectionIds: [5, 6],
      message:
        "Verify acquisition economics before scaling because the business KPI hierarchy is undefined.",
    },
    {
      id: "CR04",
      matches: strong(a, "O6") && weak(a, "O5"),
      penalty: 8,
      sectionIds: [1],
      message: "Confidence to scale conflicts with limited demand evidence.",
    },
    {
      id: "CR05",
      matches: strong(a, "A3") && evidence.qualificationDefined === false,
      penalty: 3,
      sectionIds: [2],
      message: "Lead-quality claims need a qualification definition.",
    },
    {
      id: "CR06",
      matches: strong(a, "T3") && a.ML4 === "E",
      penalty: 10,
      sectionIds: [5, 6],
      message:
        "Low data trust weakens confidence in performance-root-cause conclusions.",
    },
    {
      id: "CR07",
      matches: strong(a, "M6") && weak(a, "C5"),
      penalty: 2,
      sectionIds: [3, 4],
      message:
        "Proof exists; prioritize placing it near the decision rather than creating more.",
    },
    {
      id: "CR08",
      matches: strong(a, "A1") && ["C", "D", "E"].includes(a.A5),
      penalty: 0,
      sectionIds: [2],
      message:
        "Audience definition may be strong; access and distribution need attention.",
    },
  ]
    .filter((rule) => rule.matches)
    .map(({ matches, ...rule }) => rule);
}

export function matchPatterns(a: Answers, evidence: StoredEvidence = {}) {
  const { sectionScores: s } = scoreAnswers(a);
  const matches: PatternMatch[] = [];
  const gaps: EvidenceGap[] = [];
  const add = (
    id: string,
    sectionId: SectionId,
    condition: boolean,
    evidenceIds: string[],
  ) => {
    if (condition) matches.push({ id, sectionId, evidenceIds });
  };
  const needs = (patternId: string, field: keyof StoredEvidence) => {
    if (evidence[field] === undefined)
      gaps.push({
        patternId,
        field,
        message: evidenceMessages[field],
      });
    return evidence[field] === true;
  };
  add("P01", 1, s[1] < 50 || a.O1 === "E" || a.O2 === "E", [
    "O1",
    "O2",
    "O3",
    "O4",
    "O5",
    "O6",
  ]);
  add("P02", 1, weak(a, "O5"), ["O5"]);
  add("P03", 2, s[2] < 55 || weak(a, "A1") || weak(a, "A2"), [
    "A1",
    "A2",
    "A3",
    "A4",
    "A5",
  ]);
  if (weak(a, "A3"))
    add("P04", 2, needs("P04", "sufficientLeadVolume"), ["A3"]);
  add("P05", 3, s[1] >= 75 && s[2] >= 70 && s[3] < 60, [
    "M1",
    "M2",
    "M3",
    "M4",
    "M5",
    "M6",
  ]);
  add("P06", 3, weak(a, "M4") && s[1] >= 65 && s[2] >= 65, ["M4"]);
  add("P07", weak(a, "M6") ? 3 : 4, weak(a, "M6") || weak(a, "C5"), [
    "M6",
    "C5",
  ]);
  add("P08", 4, s[4] < 55 && s[1] >= 65 && s[3] >= 65, [
    "C1",
    "C2",
    "C3",
    "C4",
    "C5",
    "C6",
  ]);
  // C6=D asserts a mismatch. C6=E says "I'm not sure" and is not affirmative evidence.
  add("P09", 4, a.C6 === "D", ["C6"]);
  const upstream = ([1, 3, 4] as SectionId[])
    .filter((id) => s[id] < 65)
    .sort((x, y) => s[x] - s[y] || x - y)[0];
  if (upstream)
    add("P10", upstream, weak(a, "O6") || needs("P10", "scaleIntent"), [
      "O6",
      ...questionnaire.questions
        .filter((q) => q.sectionId === upstream)
        .map((q) => q.id),
    ]);
  add(
    "P11",
    5,
    s[1] >= 75 &&
      s[2] >= 75 &&
      s[3] >= 70 &&
      s[4] >= 70 &&
      s[5] < 60 &&
      s[6] >= 65 &&
      strong(a, "ML4") &&
      !weak(a, "ML5"),
    ["T1", "T2", "T3", "T4", "T5", "T6"],
  );
  if (weak(a, "T1") && weak(a, "T4"))
    add("P12", 5, needs("P12", "multipleAcquisitionChannels"), ["T1", "T4"]);
  add("P13", 5, weak(a, "T5"), ["T5"]);
  // Poor data trust is direct evidence; the closed-loop-only branch requires active acquisition.
  add(
    "P14",
    6,
    weak(a, "ML4") || (weak(a, "ML5") && needs("P14", "activeAcquisition")),
    ["ML4", "ML5"],
  );
  if (evidence.weakFollowUp === true) {
    const traffic = needs("P15", "trafficExists");
    const consideration = needs("P15", "nonTrivialConsideration");
    add("P15", 4, traffic && consideration, []);
  }
  return { matches, gaps };
}

export function diagnosticConfidence(
  a: Answers,
  primary: PatternMatch | undefined,
  gaps: EvidenceGap[],
  evidence: StoredEvidence = {},
) {
  const deductions: { id: string; points: number; source: string }[] = [];
  let uncertaintyTotal = 0;
  for (const q of questionnaire.questions) {
    const option = q.options.find((o) => o.value === a[q.id])!;
    const explicit =
      "confidenceModifier" in option &&
      typeof option.confidenceModifier === "number"
        ? -option.confidenceModifier
        : 0;
    const uncertain =
      /not sure|don't know|don’t know|haven[’']t|insufficient|not enough|don’t have enough|don't have enough/i.test(
        option.text,
      );
    // Explicit modifiers replace the generic penalty for the same answer.
    if (explicit)
      deductions.push({ id: `answer:${q.id}`, points: explicit, source: q.id });
    else if (uncertain && uncertaintyTotal < 25) {
      deductions.push({ id: `answer:${q.id}`, points: 5, source: q.id });
      uncertaintyTotal += 5;
    }
  }
  const contradictions = detectContradictions(a, evidence);
  for (const rule of contradictions)
    if (rule.penalty)
      deductions.push({
        id: rule.id,
        points: rule.penalty,
        source: rule.message,
      });
  // One class-level adjustment, rather than one penalty for each uncollected field.
  if (gaps.length)
    deductions.push({
      id: "missing-context",
      points: 5,
      source: "Material pattern context is unavailable",
    });
  const corroborating = primary
    ? Array.from(new Set(primary.evidenceIds)).filter(
        (id) =>
          ["C", "D", "E"].includes(a[id]) &&
          !/not sure|don't know|don’t know/i.test(
            questionnaire.questions
              .find((q) => q.id === id)!
              .options.find((o) => o.value === a[id])!.text,
          ),
      )
    : [];
  const bonus = corroborating.length >= 2 ? 10 : 0;
  const score = Math.max(
    35,
    Math.min(
      100,
      100 - deductions.reduce((sum, d) => sum + d.points, 0) + bonus,
    ),
  );
  return {
    score,
    level:
      score >= 80
        ? ("high" as const)
        : score >= 60
          ? ("moderate" as const)
          : ("limited" as const),
    deductions,
    corroborationBonus: bonus,
    contradictions,
  };
}

export function resolveDiagnosis(
  input: unknown,
  evidence: StoredEvidence = {},
) {
  const a = validateAnswers(input, true);
  const scored = scoreAnswers(a);
  const { matches, gaps } = matchPatterns(a, evidence);
  const sectionSeverity = Object.fromEntries(
    questionnaire.sections.map((section) => [
      section.id,
      Math.max(
        0,
        ...scored.flags
          .filter(
            (flag) =>
              questionnaire.questions.find((q) => q.id === flag.questionId)!
                .sectionId === section.id,
          )
          .map(
            (flag) => severityRank[flag.severity as keyof typeof severityRank],
          ),
      ),
    ]),
  );
  const profile = { ...scored, sectionSeverity };
  const candidates = ([1, 2, 3, 4, 5, 6] as SectionId[]).filter(
    (id) =>
      scored.sectionScores[id] < 80 ||
      sectionSeverity[id] >= 2 ||
      matches.some((p) => p.id === "P15" && p.sectionId === id),
  );
  candidates.sort(
    (x, y) =>
      sectionPriority(x, profile).group - sectionPriority(y, profile).group ||
      sectionSeverity[y] - sectionSeverity[x] ||
      scored.sectionScores[x] - scored.sectionScores[y] ||
      x - y,
  );
  const pick = (sectionId: SectionId | undefined) => {
    if (!sectionId) return undefined;
    const sectionMatches = matches.filter(
      (m) => m.sectionId === sectionId && m.id !== "P10",
    );
    const priority = [
      "P02",
      "P01",
      "P14",
      "P05",
      "P09",
      "P08",
      "P03",
      "P04",
      "P06",
      "P07",
      "P11",
      "P13",
      "P12",
      "P15",
    ];
    sectionMatches.sort(
      (x, y) => priority.indexOf(x.id) - priority.indexOf(y.id),
    );
    return { sectionId, pattern: sectionMatches[0] };
  };
  const primary = pick(candidates[0]);
  const secondary = pick(
    candidates.find(
      (id) =>
        id !== primary?.sectionId &&
        (scored.sectionScores[id] < 65 || sectionSeverity[id] >= 2),
    ),
  );
  const confidence = diagnosticConfidence(a, primary?.pattern, gaps, evidence);
  const relativeStrength = ([1, 2, 3, 4, 5, 6] as SectionId[])
    .filter(
      (id) =>
        scored.sectionScores[id] >= 75 &&
        sectionSeverity[id] < 2 &&
        !confidence.contradictions.some(
          (c) => c.penalty > 0 && c.sectionIds.includes(id),
        ),
    )
    .sort(
      (x, y) => scored.sectionScores[y] - scored.sectionScores[x] || x - y,
    )[0];
  return {
    ...scored,
    sectionSeverity,
    primary,
    primaryPrecedence: precedenceDecision(
      primary?.sectionId,
      candidates,
      profile,
    ),
    secondary,
    relativeStrength,
    confidence,
    patterns: matches,
    evidenceGaps: gaps,
  };
}
