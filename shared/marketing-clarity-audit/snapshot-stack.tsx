import React from "react";
import { reportLanguage, growthLeverCopy } from "./customer-language";
import type { FrozenAuditReport } from "./report";
import { sectionColors } from "./sections";
import { sectionBand } from "./scoring";
// Display states use the existing selected constraints, relative strength and score bands.
export function snapshotLayers(report: FrozenAuditReport) {
  const d = report.diagnosis;
  return Object.entries(sectionColors).map(([key, theme]) => {
    const id = Number(key);
    const state =
      id === d.primary?.sectionId
        ? "primary"
        : id === d.secondary?.sectionId
          ? "supporting"
          : id === d.relativeStrength ||
              (sectionBand(d.sectionScores[id]) === "Strong" &&
                d.sectionSeverity[id] < 2)
            ? "strength"
            : "muted";
    return {
      id,
      ...theme,
      state,
      label:
        state === "primary"
          ? "Focus first"
          : state === "supporting"
            ? "Supporting"
            : state === "strength"
              ? "Build on"
              : "",
    };
  });
}
export function rankedSnapshotLayers(report: FrozenAuditReport) {
  return snapshotLayers(report).map(layer => ({
    ...layer,
    label: layer.state === "primary" ? "First opportunity" : layer.state === "supporting" ? "Next opportunity" : layer.state === "strength" ? "Strength" : "Review",
    score: Math.round(report.diagnosis.sectionScores[layer.id]),
    description: growthLeverCopy(layer.id, report.diagnosis.sectionScores[layer.id]),
  })).sort((a, b) => report.diagnosis.sectionScores[b.id] - report.diagnosis.sectionScores[a.id] || a.id - b.id);
}
export function SnapshotClarityStack({
  report,
}: {
  report: FrozenAuditReport;
}) {
  return (
    <figure className="snapshot-clarity-stack">
      <figcaption>{reportLanguage.stack}</figcaption>
      <ol aria-label="Snapshot Clarity Stack">
        {rankedSnapshotLayers(report).map((layer) => (
          <li
            key={layer.id}
            data-layer-id={layer.id}
            data-state={layer.state}
            style={{
              background:
                layer.state === "primary"
                  ? layer.color
                  : layer.tint,
              color:
                layer.state === "primary"
                  ? "white"
                  : layer.color,
              borderColor:
                layer.state === "muted" || layer.state === "strength"
                    ? layer.border
                    : layer.color,
            }}
          >
            <span><strong>{layer.name} · {layer.score} / 100</strong><small className="snapshot-layer-description">{layer.description}</small></span>
            {layer.label && (
              <span className="snapshot-layer-state">{layer.label}</span>
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}
