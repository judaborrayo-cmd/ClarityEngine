import { opportunityDepth } from "./editorial-narrative";
import React from "react";
import { reportLanguage, growthRoadmap, customerSummary, growthDefinitions } from "./customer-language";
import { precedenceExplanation } from "./precedence-explanation";
import { progressIcons, progressIconName } from "./progress-icons";
import { measuresFor } from "./progress-measures";
import type { FrozenAuditReport } from "./report";
import { sectionColors, sectionStyle } from "./sections";
import { sectionBand } from "./scoring";
import { teachingFor } from "./constraint-teaching";
export function ConstraintTeaching({
  report,
  imagery,
}: {
  report: FrozenAuditReport;
  imagery?: React.ReactNode;
}) {
  const precedence = precedenceExplanation(report);
  const id = report.diagnosis.primary?.sectionId,
    lesson = teachingFor(report);
  if (!id || !lesson)
    return (
      <section className="audit-block">
        <h2>Choose your next decision with evidence</h2>
        <p>{customerSummary(report)}</p>
      </section>
    );
  return (
    <section className="audit-block constraint-lesson" style={sectionStyle(id)}>
      <p className="report-eyebrow">{reportLanguage.primary}</p>
      <h2>{sectionColors[id].name}</h2>
      <p className="constraint-score">
        <strong>{Math.round(report.diagnosis.sectionScores[id])} / 100</strong>{" "}
        · {sectionBand(report.diagnosis.sectionScores[id])}
      </p>
      <p>{opportunityDepth(report)}</p>
      {imagery && <div className="constraint-illustration">{imagery}</div>}
      <h3>What this means</h3>
      {growthDefinitions[id].map((copy) => (
        <p key={copy}>{copy}</p>
      ))}
      <div className="constraint-comparison">
        {[
          ["WHEN THIS IS STRONG", lesson.strong, "constraint-strong"],
          [
            "WHEN THIS CONSTRAINS GROWTH",
            lesson.constrained,
            "constraint-limited",
          ],
        ].map(([label, items, className]) => (
          <div className={className as string} key={label as string}>
            <h3>{label as string}</h3>
            <ul>
              {(items as string[]).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <h3>{reportLanguage.setback}</h3>
      <p>{lesson.consequence}</p>
    </section>
  );
}
export function ImprovementEvidence({
  report,
  imagery,
}: {
  report: FrozenAuditReport;
  imagery?: React.ReactNode;
}) {
  const lesson = teachingFor(report);
  if (!lesson) return null;
  return (
    <section
      className="audit-block improvement-evidence"
      style={sectionStyle(report.diagnosis.primary?.sectionId)}
    >
      <h2>{reportLanguage.progress}</h2>
      <div className="improvement-signals">
        {lesson.progress.map((signal, index) => {
          const name = progressIconName(
              report.diagnosis.primary!.sectionId,
              index,
            ),
            Icon = progressIcons[name];
          return (
            <div key={signal.title} className="progress-signal">
              <span
                className="progress-icon"
                data-progress-icon={name}
                aria-hidden="true"
              >
                <Icon size={18} strokeWidth={1.8} />
              </span>
              <div>
                <h3>{signal.title}</h3>
                <p>{signal.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      <details className="improvement-hierarchy">
        <summary>How to Measure Your Progress</summary>
        {imagery}
        <ul className="progress-measures">
          {measuresFor(report).map((measure) => (
            <li key={measure.title}>
              <h4>{measure.title}</h4>
              <p>{measure.method}</p>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
