import React from "react";
import { questionnaire, type Answers } from "./scoring";
import { sectionColors } from "./sections";
export function diagnosticLayers(answers: Answers, currentSection?: number) {
  return questionnaire.sections.map((section) => {
    const completed = questionnaire.questions
      .filter((q) => q.sectionId === section.id)
      .every((q) => Boolean(answers[q.id]));
    return {
      ...section,
      completed,
      state:
        section.id === currentSection
          ? "current"
          : completed
            ? "complete"
            : "future",
    };
  });
}
export function DiagnosticClarityStack({
  answers,
  currentSection,
}: {
  answers: Answers;
  currentSection?: number;
}) {
  const layers = diagnosticLayers(answers, currentSection);
  const complete = layers.every((layer) => layer.completed);
  return (
    <div className="diagnostic-clarity-stack">
      <ol
        aria-label="Marketing system Clarity Stack"
        className="flex flex-col gap-1"
      >
        {layers.map((layer) => {
          const theme = sectionColors[layer.id as keyof typeof sectionColors];
          return (
            <li
              key={layer.id}
              data-layer-id={layer.id}
              data-state={layer.state}
              aria-current={layer.state === "current" ? "step" : undefined}
              aria-label={`${layer.name}: ${layer.state === "current" ? "current section" : layer.completed ? "complete" : "upcoming"}`}
              className="flex min-h-5 items-center justify-between gap-1 rounded border px-2 py-0.5 text-[10px] leading-tight"
              style={{
                background:
                  layer.state === "complete"
                    ? theme.color
                    : layer.state === "current"
                      ? theme.tint
                      : "#F7F8FA",
                color:
                  layer.state === "complete"
                    ? "white"
                    : layer.state === "current"
                      ? theme.color
                      : "#667085",
                borderColor: layer.state === "future" ? "#E5E7EB" : theme.color,
                borderLeftWidth: layer.state === "current" ? 4 : 1,
                fontWeight: layer.state === "current" ? 700 : 500,
              }}
            >
              <span>{layer.name}</span>
              <span aria-hidden="true">
                {layer.state === "complete"
                  ? "✓"
                  : layer.state === "current"
                    ? "●"
                    : "·"}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="mt-2 text-[11px] leading-snug text-gray-600">
        {complete
          ? "All six growth levers complete. Your report is ready to generate."
          : "You’re building a clearer picture of your marketing system."}
      </p>
    </div>
  );
}
