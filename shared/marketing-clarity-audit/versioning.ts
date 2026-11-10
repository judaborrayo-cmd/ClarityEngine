import * as v7q from "./v2-priority/questionnaire";
import * as v7e from "./v2-priority/engine";
import * as v6q from "./v2-goals/questionnaire";
import * as v6e from "./v2-goals/engine";
import { customerContextGoalsSchema } from "./v2-goals/goals";
import * as v4q from "./v2/questionnaire";
import * as v4e from "./v2/engine";
import * as v5q from "./v2-next/questionnaire";
import * as v5e from "./v2-next/engine";
import { customerContextSchema } from "./context";
import { customerContextNextSchema } from "./v2-next/goals";
export const currentAssessmentVersion = v7q.versions.questionnaire;
export const isV2Version = (version: string) =>
  (
    [
      v4q.versions.questionnaire,
      v5q.versions.questionnaire,
      v6q.versions.questionnaire,
      v7q.versions.questionnaire,
    ] as readonly string[]
  ).includes(version);
export function assessmentModel(version: string) {
  if (version === v4q.versions.questionnaire)
    return {
      versions: v4q.versions,
      setupSchema: v4q.setupSchema,
      draftSchema: v4e.draftSchema,
      questions: v4q.assessmentQuestions,
      validate: v4e.validateAnswers,
      create: v4e.createReport,
      contextSchema: customerContextSchema,
    };
  if (version === v5q.versions.questionnaire)
    return {
      versions: v5q.versions,
      setupSchema: v5q.setupSchema,
      draftSchema: v5e.draftSchema,
      questions: v5q.assessmentQuestions,
      validate: v5e.validateAnswers,
      create: v5e.createReport,
      contextSchema: customerContextNextSchema,
    };
  if (version === v6q.versions.questionnaire)
    return {
      versions: v6q.versions,
      setupSchema: v6q.setupSchema,
      draftSchema: v6e.draftSchema,
      questions: v6q.assessmentQuestions,
      validate: v6e.validateAnswers,
      create: v6e.createReport,
      contextSchema: customerContextGoalsSchema,
    };
  if (version === v7q.versions.questionnaire)
    return {
      versions: v7q.versions,
      setupSchema: v7q.setupSchema,
      draftSchema: v7e.draftSchema,
      questions: v7q.assessmentQuestions,
      validate: v7e.validateAnswers,
      create: v7e.createReport,
      contextSchema: customerContextGoalsSchema,
    };
  throw new Error("Unsupported assessment version");
}
