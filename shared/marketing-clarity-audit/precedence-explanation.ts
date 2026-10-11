import type { FrozenAuditReport } from "./report";
import {
  precedenceDecision,
  type PrecedenceRuleId,
} from "./selection-priority";
import type { SectionId } from "./resolver";
import { sectionColors } from "./sections";
export const precedenceExplanationTitle =
  "Why this comes first even though another section scored lower";
const explanations: Record<
  PrecedenceRuleId,
  (lower: string, primary: string) => string
> = {
  DATA_TRUST_BLOCKER: (lower) =>
    `${lower} scored lower numerically, but your answers indicate uncertainty about which numbers can be trusted. Until that is resolved, decisions about increasing, cutting, or reallocating traffic may be based on incomplete evidence. For that reason, Measurement & Learning is the more foundational constraint to address first.`,
  FOUNDATIONAL_OFFER: (lower) =>
    `${lower} scored lower numerically, but your answers indicate a foundational issue with defining the offer, its outcome, or evidence that people want it. Clarifying or validating that foundation gives later marketing work a clearer purpose. For that reason, Offer comes first.`,
  SEVERE_UPSTREAM_DEPENDENCY: (lower, primary) =>
    `${lower} scored lower numerically, but ${primary} is a severely constrained earlier layer of the marketing system. The explicit dependency rule puts that upstream foundation first so later improvements can build on it. Address ${primary} before spreading attention across downstream changes.`,
};
export function precedenceExplanation(report: FrozenAuditReport) {
  const d = report.diagnosis;
  // Older reports retain their stored selection. Derive only directly evidenced named rules.
  const eligible = ([1, 2, 3, 4, 5, 6] as SectionId[]).filter(
    (id) =>
      d.sectionScores[id] < 80 ||
      d.sectionSeverity[id] >= 2 ||
      d.patterns.some((p) => p.id === "P15" && p.sectionId === id),
  );
  const decision =
    d.primaryPrecedence ??
    precedenceDecision(d.primary?.sectionId, eligible, d);
  if (!decision || !d.primary) return undefined;
  const names = decision.lowerScoringSections
    .map((id) => sectionColors[id].name)
    .join(" and ");
  return {
    ruleId: decision.ruleId,
    title: precedenceExplanationTitle,
    copy: explanations[decision.ruleId](
      names,
      sectionColors[d.primary.sectionId].name,
    ),
  };
}
