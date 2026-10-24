import { writeFileSync } from 'node:fs';
import { createFrozenReport } from '../shared/marketing-clarity-audit/report';
import { questionnaire, type Answers } from '../shared/marketing-clarity-audit/scoring';
import { recommendationsPresentation } from '../shared/marketing-clarity-audit/presentation';
import { rankedSnapshotLayers } from '../shared/marketing-clarity-audit/snapshot-stack';

// Synthetic examples from the existing Message and Scenario 5 Traffic fixtures.
// Export only public display fields, never real customer reports or access links.
const baseline: Answers = Object.fromEntries(questionnaire.questions.map(q => [q.id, 'A']));
const fixtures = [
  { name: 'Traffic', answers: { ...baseline, T1: 'C', T2: 'C', T3: 'D', T4: 'C', T5: 'D', T6: 'D', ML1: 'B', ML2: 'B', ML3: 'C', ML4: 'C', ML5: 'C', ML6: 'C' } },
  { name: 'Message', answers: Object.fromEntries(questionnaire.questions.map(q => [q.id, q.sectionId === 3 ? 'D' : 'A'])) },
];
const examples = fixtures.map(({ name, answers }) => {
  const report = createFrozenReport(answers as Answers, {
    name: 'Example', email: 'example@example.com', companyName: 'Example business', websiteUrl: 'https://example.com', businessType: 'professional_services', primaryMarketingGoal: 'leads',
  }, {}, new Date('2026-01-01T00:00:00Z'));
  if (report.diagnosis.primary?.sectionId !== (name === 'Traffic' ? 5 : 3)) throw new Error(`Unexpected ${name} example diagnosis`);
  return { name, summary: report.summary, confidence: report.diagnosis.confidence.level,
    layers: rankedSnapshotLayers(report),
    recommendations: recommendationsPresentation(report).map(({ title, whatToDo, doneWhen }) => ({ title, whatToDo, doneWhen })),
  };
});
writeFileSync('client/src/lib/assessment-preview-examples.json', JSON.stringify(examples, null, 2) + '\n');
