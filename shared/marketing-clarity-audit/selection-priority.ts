import type { SectionId } from "./resolver";
export type PrecedenceRuleId =
  "FOUNDATIONAL_OFFER" | "DATA_TRUST_BLOCKER" | "SEVERE_UPSTREAM_DEPENDENCY";
export interface SelectionProfile {
  sectionScores: Record<number, number>;
  sectionSeverity: Record<number, number>;
  flags: { id?: string; questionId: string; severity?: string }[];
}
export interface PrecedenceDecision {
  ruleId: PrecedenceRuleId;
  lowerScoringSections: SectionId[];
  evidenceIds: string[];
}
export function sectionPriority(
  id: SectionId,
  profile: SelectionProfile,
): { group: number; ruleId?: PrecedenceRuleId; evidenceIds: string[] } {
  const offerFlags = profile.flags.filter((f) =>
    [
      "OFFER_DEFINITION",
      "UNDEFINED_OUTCOME",
      "MARKET_VALIDATION_WARNING",
      "UNVALIDATED_OFFER",
    ].includes(f.id ?? ""),
  );
  if (id === 1 && offerFlags.length)
    return {
      group: 0,
      ruleId: "FOUNDATIONAL_OFFER",
      evidenceIds: offerFlags.map((f) => f.questionId),
    };
  if (
    id === 6 &&
    profile.flags.some(
      (f) =>
        f.questionId === "ML4" &&
        ["major", "critical"].includes(f.severity ?? ""),
    )
  )
    return { group: 1, ruleId: "DATA_TRUST_BLOCKER", evidenceIds: ["ML4"] };
  // Explicit canonical severe-upstream dependency order is an intentional exception.
  if (profile.sectionScores[id] < 45 && id <= 4)
    return {
      group: id + 1,
      ruleId: "SEVERE_UPSTREAM_DEPENDENCY",
      evidenceIds: [],
    };
  if (profile.sectionScores[id] < 45) return { group: 6, evidenceIds: [] };
  return { group: profile.sectionSeverity[id] >= 2 ? 7 : 8, evidenceIds: [] };
}
export function precedenceDecision(
  primary: SectionId | undefined,
  candidates: SectionId[],
  profile: SelectionProfile,
): PrecedenceDecision | undefined {
  if (!primary) return undefined;
  const priority = sectionPriority(primary, profile);
  if (!priority.ruleId) return undefined;
  const lower = candidates
    .filter(
      (id) =>
        id !== primary &&
        profile.sectionScores[id] < profile.sectionScores[primary] &&
        sectionPriority(id, profile).group > priority.group,
    )
    .sort(
      (a, b) => profile.sectionScores[a] - profile.sectionScores[b] || a - b,
    );
  return lower.length
    ? {
        ruleId: priority.ruleId,
        lowerScoringSections: lower,
        evidenceIds: priority.evidenceIds,
      }
    : undefined;
}
