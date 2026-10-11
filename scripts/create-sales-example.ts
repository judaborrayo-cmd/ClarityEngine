import { writeFileSync } from 'node:fs';
import { createFrozenReport } from '../shared/marketing-clarity-audit/report';
import { questionnaire } from '../shared/marketing-clarity-audit/scoring';
// Synthetic answers only; publish the display subset, never customer fields or tokens.
const answers = Object.fromEntries(questionnaire.questions.map(q => [q.id, q.sectionId === 3 ? 'D' : 'A']));
const report = createFrozenReport(answers, { name: 'Example', email: 'example@example.com', companyName: 'Example business', websiteUrl: 'https://example.com', businessType: 'professional_services', primaryMarketingGoal: 'leads' }, {}, new Date('2026-01-01T00:00:00Z'));
writeFileSync('client/src/lib/assessment-sales-example.json', JSON.stringify({ summary: report.summary, confidence: report.diagnosis.confidence.level, recommendations: report.recommendations.map(({title,whatToDo,doneWhen}) => ({title,whatToDo,doneWhen})) }, null, 2) + '\n');
