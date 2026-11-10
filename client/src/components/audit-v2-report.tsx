import { pillarDescription } from "@shared/marketing-clarity-audit/pillar-interpretation";
import React from "react";
import {
  assessmentQuestions,
  sections,
} from "@shared/marketing-clarity-audit/v2/questionnaire";
import {
  questionsForReport,
  type AnyV2Report as Report,
} from "@shared/marketing-clarity-audit/v2/customer-report";
import { reportParagraphs } from "@shared/marketing-clarity-audit/v2/customer-sequence";
import { GrowthHeroFrame } from "@shared/marketing-clarity-audit/growth-hero";
import { SnapshotLayers } from "@shared/marketing-clarity-audit/snapshot-stack";
import { ScoreBandGuide } from "@shared/marketing-clarity-audit/snapshot-view";
import {
  sectionColors,
  sectionStyle,
} from "@shared/marketing-clarity-audit/sections";
import {
  growthDefinitions,
  reportLanguage,
} from "@shared/marketing-clarity-audit/customer-language";
import "../pages/audit-results.css";
export function ReportView({
  report,
  companyName = "Your business",
  utilities,
  nextMoves,
  prepared,
}: {
  report: Report;
  companyName?: string;
  utilities?: React.ReactNode;
  nextMoves?: React.ReactNode;
  prepared?: { name: string; websiteUrl: string };
}) {
  const nextArea =
    "priorityAreas" in report ? report.priorityAreas[1] : undefined;
  const primary = report.diagnosis.primary,
    primaryId = primary?.sectionId;
  const paragraphs = reportParagraphs(report.introduction);
  const strength = [...sections]
    .filter((s) => s.id !== primaryId)
    .sort(
      (a, b) =>
        report.diagnosis.sectionScores[b.id] -
          report.diagnosis.sectionScores[a.id] || a.id - b.id,
    )[0];
  const layers = sections
    .map((s) => ({
      id: s.id,
      ...sectionColors[s.id as keyof typeof sectionColors],
      state: s.id === primaryId ? "primary" : "muted",
      label:
        s.id === primaryId
          ? "First opportunity"
          : s.id === strength.id
            ? "Reported strength"
            : "Review",
      score: Number(report.diagnosis.sectionScores[s.id].toFixed(1)),
      description: pillarDescription(report, s.id),
    }))
    .sort((a, b) => b.score - a.score || a.id - b.id);
  return (
    <article className="audit-report" id="marketing-clarity-report">
      <GrowthHeroFrame companyName={companyName} sectionId={primaryId}>
        <p className="growth-basis">
          {"prioritySummary" in report
            ? "Based on your 46 answers, here are practical steps to explore your next growth opportunities."
            : "Based on your 46 assessment answers. Priorities reflect your specific answers and prerequisites, not simply the lowest score."}
        </p>
        <div className="growth-roadmap">
          <section className="growth-first">
            <p className="report-eyebrow">{reportLanguage.primary}</p>
            <h2>
              {"priorityHeadline" in report
                ? report.priorityHeadline
                : primaryId
                  ? sectionColors[primaryId as keyof typeof sectionColors].name
                  : "Validate your next opportunity"}
            </h2>
            <p>{report.recommendations[0].why}</p>
            {"prioritySummary" in report && <p>{report.prioritySummary}</p>}
            <p className="growth-start">
              <strong>Start here: </strong>
              <a href="#first-growth-moves">
                {report.recommendations[0].title}
              </a>
            </p>
            <details>
              <summary>Why this comes first and how to start</summary>
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </details>
          </section>
          <div className="growth-roadmap-companion">
            {nextArea ? (
              <section style={sectionStyle(nextArea.sectionId)}>
                <p className="report-eyebrow">
                  {"prioritySummary" in report &&
                  report.diagnosis.primaryIds.length > 1
                    ? "Equally ranked area"
                    : "Next area to work on"}
                </p>
                <h2>{nextArea.name}</h2>
                <p>{Number(nextArea.score.toFixed(1))} / 100</p>
                <p>
                  {("secondary" in report.diagnosis ? report.diagnosis.secondary?.rationale : undefined) ??
                    "Validate what you report as working; a strong score does not imply a hidden problem."}
                </p>
              </section>
            ) : (
              <section style={sectionStyle(strength.id)}>
                <p className="report-eyebrow">{reportLanguage.strength}</p>
                <h2>
                  {
                    sectionColors[strength.id as keyof typeof sectionColors]
                      .name
                  }
                </h2>
                <p>
                  Your answers place this among your stronger areas. Keep those
                  capabilities while checking the evidence for your next step.
                </p>
              </section>
            )}
          </div>
        </div>
        {"businessGoals" in report && (
          <p className="growth-basis">
            <strong>Business goals: </strong>
            {report.businessGoals.map((g) => g.label).join(", ")}
          </p>
        )}
        <details className="growth-prepared">
          <summary>Your advertising situation</summary>
          {reportParagraphs(report.trendNote).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </details>
        {prepared && (
          <details className="growth-prepared">
            <summary>
              Prepared for {prepared.name} ·{" "}
              {new Date(report.createdAt).toLocaleDateString("en-US", {
                timeZone: "America/New_York",
              })}
            </summary>
            <p>{prepared.websiteUrl}</p>
          </details>
        )}
      </GrowthHeroFrame>
      {utilities}
      <section
        className="audit-block clarity-snapshot"
        style={sectionStyle(primaryId)}
      >
        <p className="report-eyebrow">Based on your assessment answers</p>
        <h2>Your Marketing Clarity Snapshot</h2>
        <p>
          The six levers show where your answers suggest strengths and
          opportunities.
        </p>
        <SnapshotLayers layers={layers} />
        <p>
          Overall score:{" "}
          <strong>
            {Number(report.diagnosis.overallScore.toFixed(1))} / 100
          </strong>
          . These scores summarize your responses, not a conversion rate or a
          forecast of growth.
        </p>
      </section>
      <ScoreBandGuide />
      {report.diagnosis.contradictions.length > 0 && (
        <section className="audit-block">
          <h2>Evidence to Check</h2>
          <ul className="list-disc space-y-3 pl-5">
            {report.diagnosis.contradictions.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>
      )}
      <section
        id="first-growth-moves"
        className="audit-block"
        style={sectionStyle(primaryId)}
      >
        <h2 className="positive-action-heading">Your First 3 Moves</h2>
        <p className="report-prose">
          Start with the evidence, then choose and carry out the next useful
          step.
        </p>
        {nextMoves ?? (
          <div className="moves-grid">
            {report.recommendations.map((r, i) => (
              <div className="recommendation" key={r.id}>
                <p className="move-number">Move {i + 1}</p>
                <h3>{r.title}</h3>
                <h4>What to do</h4>
                <p>{r.whatToDo}</p>
                {"supportingDetails" in r && r.supportingDetails && (
                  <ul className="list-disc space-y-2 pl-5">
                    {r.supportingDetails.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                )}
                <h4>Done when</h4>
                <p>{r.doneWhen}</p>
                <details>
                  <summary>Why this matters</summary>
                  <p>{r.why}</p>
                </details>
              </div>
            ))}
          </div>
        )}
      </section>
      <section className="audit-block" id="clarity-plan">
        <h2>Your Four-Week Clarity Plan</h2>
        <div className="plan-setup">
          <h3>A focused sequence</h3>
          <p>
            Establish evidence, choose the improvement, implement it, then
            evaluate what you learned.
          </p>
        </div>
        <div className="plan-grid">
          {report.thirtyDayPlan.map((w) => (
            <section
              key={w.week}
              className="plan-card"
              style={sectionStyle(primaryId)}
            >
              <p className="report-eyebrow">Week {w.week}</p>
              <h3>{w.title}</h3>
              <p>{w.objective}</p>
              <h4>Your actions</h4>
              <ul className="list-disc space-y-2 pl-5">
                {w.actions.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
              <h4>Done when</h4>
              <p>{w.completionCriteria}</p>
            </section>
          ))}
        </div>
      </section>
      <section className="audit-block improvement-evidence">
        <h2>Useful Progress Measures</h2>
        <div className="improvement-signals">
          {"goalGuidance" in report &&
            report.goalGuidance.map((g) => (
              <div key={g.id} style={sectionStyle(primaryId)}>
                <h3>{g.label}</h3>
                <h4>What to check</h4>
                <p>{g.check}</p>
                <h4>Useful measures</h4>
                <p>{g.measure}</p>
              </div>
            ))}
          {(!("goalGuidance" in report)
            ? report.progressMeasures
            : report.progressMeasures.slice(-1)
          ).map((m) => (
            <div key={m} style={sectionStyle(primaryId)}>
              <p>{m}</p>
            </div>
          ))}
        </div>
        <p className="report-prose">{report.caveat}</p>
      </section>
      <details id="audit-answer-review" className="audit-block">
        <summary className="cursor-pointer text-lg font-semibold">
          Review My Assessment Answers
        </summary>
        {questionsForReport(report).map((q) => (
          <div className="my-5" key={q.id}>
            <h3>{q.prompt}</h3>
            <p>
              {q.options.find((o) => o.value === report.answers[q.id])?.text}
            </p>
          </div>
        ))}
      </details>
    </article>
  );
}
