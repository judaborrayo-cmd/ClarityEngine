import React from "react";
import { reportLanguage } from "./customer-language";
import { SnapshotClarityStack } from "./snapshot-stack";
import type { FrozenAuditReport } from "./report";
import { scoreBandGuide } from "./snapshot";
import { sectionStyle } from "./sections";
export function MarketingSnapshot({ report }: { report: FrozenAuditReport }) {
  return (
    <section
      className="audit-block clarity-snapshot"
      style={sectionStyle(report.diagnosis.primary?.sectionId)}
    >
      <p className="report-eyebrow">Based on your assessment responses</p>
      <h2>{reportLanguage.snapshot}</h2>
      <p>{reportLanguage.introduction}</p>
      <SnapshotClarityStack report={report} />
      <p>
        Overall score:{" "}
        <strong>{Math.round(report.diagnosis.overallScore)} / 100</strong>. These scores summarize your responses, not a conversion rate or a forecast of growth.
      </p>
    </section>
  );
}
export function ScoreBandGuide() {
  return (
    <details className="score-band-guide">
      <summary>Understand your scores</summary>
      <h3>How to interpret your scores</h3>
      <ul>
        {scoreBandGuide.map((band) => (
          <li key={band.range}>
            <strong>{band.range}</strong> — {band.label}
          </li>
        ))}
      </ul>
      <p>
        {reportLanguage.methodology}
      </p>
    </details>
  );
}
