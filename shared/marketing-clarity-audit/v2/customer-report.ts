import type { Report as V7Report } from "../v2-priority/engine";
import { versions as v7 } from "../v2-priority/questionnaire";
import type { Report as V6Report } from "../v2-goals/engine";
import {
  versions as v6,
  assessmentQuestions as goalQuestions,
  type Setup as GoalSetup,
} from "../v2-goals/questionnaire";
import type { CustomerContext } from "../context";
import type { Report as V4Report } from "./engine";
import type { Report as V5Report } from "../v2-next/engine";
import {
  versions as v4,
  assessmentQuestions as oldQuestions,
  type Setup as OldSetup,
} from "./questionnaire";
import {
  versions as v5,
  assessmentQuestions as newQuestions,
  type Setup as NewSetup,
} from "../v2-next/questionnaire";
export type AnyV2Report = V4Report | V5Report | V6Report | V7Report;
export type CustomerV2Report = AnyV2Report & {
  context: Omit<CustomerContext, "primaryMarketingGoal"> & {
    primaryMarketingGoal?: CustomerContext["primaryMarketingGoal"];
    marketingGoals?: string[];
  };
};
export function isV2Report(value: unknown): value is CustomerV2Report {
  return Boolean(
    value &&
    typeof value === "object" &&
    "versions" in value &&
    (
      [
        v4.questionnaire,
        v5.questionnaire,
        v6.questionnaire,
        v7.questionnaire,
      ] as readonly string[]
    ).includes((value as AnyV2Report).versions.questionnaire),
  );
}
export function questionsForReport(report: AnyV2Report) {
  if (
    [v6.questionnaire, v7.questionnaire].includes(
      report.versions.questionnaire as any,
    )
  )
    return goalQuestions(report.setup as GoalSetup);
  return report.versions.questionnaire === v5.questionnaire
    ? newQuestions(report.setup as NewSetup)
    : oldQuestions(report.setup as OldSetup);
}
