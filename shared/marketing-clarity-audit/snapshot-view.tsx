import React from "react";
import { SnapshotClarityStack } from "./snapshot-stack";
import type { FrozenAuditReport } from "./report";
import {
  marketingSnapshot,
  howToReadResults,
  scoreBandGuide,
} from "./snapshot";
import { sectionStyle } from "./sections";
export function MarketingSnapshot({ report }: { report: FrozenAuditReport }) {
  const snapshot = marketingSnapshot(report);
  const working = snapshot.working.replace(
    /^Your self-reported strengths include[^.]*\.\s*/,
    "",
  );
  return (
    <section
      className="audit-block clarity-snapshot"
      style={sectionStyle(report.diagnosis.primary?.sectionId)}
    >
      <p className="report-eyebrow">
        Your results at a glance · Based on your responses
      </p>
      <h2>Your Get Clarity Assessment Snapshot</h2>
      <h3 className="snapshot-lead">{snapshot.title}</h3>
      <SnapshotClarityStack report={report} />
      {working && <p>{working}</p>}
      <p>{snapshot.profile}</p>
      <p>{snapshot.matters}</p>
      <h3>What your results suggest</h3>
      <dl className="snapshot-actions">
        {[
          ["Build on", snapshot.buildOn],
          ["Focus first", snapshot.focus],
          ["Protect", snapshot.protect],
          ["Do not rush into", snapshot.avoid],
          ["Your opportunity", snapshot.opportunity],
        ].map(([label, text]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{text}</dd>
          </div>
        ))}
      </dl>
      {snapshot.relativeStrength && <p>{snapshot.relativeStrength}</p>}
      {snapshot.secondary && <p>{snapshot.secondary}</p>}
      <div className="snapshot-read">
        <h3>How to read your results</h3>
        <p>{howToReadResults}</p>
      </div>
      <p>
        Overall score:{" "}
        <strong>{Math.round(report.diagnosis.overallScore)} / 100</strong>. A
        strong overall score can still contain a meaningful bottleneck.
      </p>
    </section>
  );
}
export function ScoreBandGuide() {
  return (
    <div className="score-band-guide">
      <h3>How to interpret your scores</h3>
      <ul>
        {scoreBandGuide.map((band) => (
          <li key={band.range}>
            <strong>{band.range}</strong> — {band.label}
          </li>
        ))}
      </ul>
      <p>
        Your goal is not necessarily to score 100 everywhere. Your goal is to
        remove the constraint most likely to limit the rest of the system.
      </p>
    </div>
  );
}
