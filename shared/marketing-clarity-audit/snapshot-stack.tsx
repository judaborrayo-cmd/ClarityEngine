import React from "react";
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
export function SnapshotClarityStack({
  report,
}: {
  report: FrozenAuditReport;
}) {
  return (
    <figure className="snapshot-clarity-stack">
      <figcaption>Your marketing system at a glance</figcaption>
      <ol aria-label="Snapshot Clarity Stack">
        {snapshotLayers(report).map((layer) => (
          <li
            key={layer.id}
            data-layer-id={layer.id}
            data-state={layer.state}
            style={{
              background:
                layer.state === "primary"
                  ? layer.color
                  : layer.state === "muted"
                    ? "#F7F8FA"
                    : layer.tint,
              color:
                layer.state === "primary"
                  ? "white"
                  : layer.state === "muted"
                    ? "#667085"
                    : layer.color,
              borderColor:
                layer.state === "muted"
                  ? "#E5E7EB"
                  : layer.state === "strength"
                    ? layer.border
                    : layer.color,
            }}
          >
            <span>{layer.name}</span>
            {layer.label && (
              <span className="snapshot-layer-state">{layer.label}</span>
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}
