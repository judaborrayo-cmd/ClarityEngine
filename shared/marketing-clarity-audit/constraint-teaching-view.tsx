import React from "react";
import { precedenceExplanation } from "./precedence-explanation";
import { progressIcons, progressIconName } from "./progress-icons";
import { measuresFor } from "./progress-measures";
import type { FrozenAuditReport } from "./report";
import { sectionColors, sectionStyle } from "./sections";
import { sectionBand } from "./scoring";
import { teachingFor } from "./constraint-teaching";
export function ConstraintTeaching({ report }: { report: FrozenAuditReport }) {
  const precedence = precedenceExplanation(report);
  const id = report.diagnosis.primary?.sectionId,
    lesson = teachingFor(report);
  if (!id || !lesson)
    return (
      <section className="audit-block">
        <h2>No clear constraint indicated</h2>
        <p>{report.summary}</p>
      </section>
    );
  return (
    <section className="audit-block constraint-lesson" style={sectionStyle(id)}>
      <p className="report-eyebrow">Your biggest constraint</p>
      <h2>{sectionColors[id].name}</h2>
      <p className="constraint-score">
        <strong>{Math.round(report.diagnosis.sectionScores[id])} / 100</strong>{" "}
        · {sectionBand(report.diagnosis.sectionScores[id])}
      </p>
      <p>This is the area most likely limiting growth right now.</p>
      <p>{report.summary}</p>
      {precedence && (
        <div className="precedence-explanation">
          <h3>{precedence.title}</h3>
          <p>{precedence.copy}</p>
        </div>
      )}
      <h3>What this means</h3>
      {lesson.meaning.map((copy) => (
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
      <h3>Why this can hold back growth</h3>
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
      <h2>How You’ll Know This Is Improving</h2>
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
