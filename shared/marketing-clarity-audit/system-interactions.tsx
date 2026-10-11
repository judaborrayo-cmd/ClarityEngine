import React from "react";
import { sectionColors, sectionStyle } from "./sections";
export interface MarketingSystemInteraction {
  id: string;
  title: string;
  explanation: string;
  sections: (keyof typeof sectionColors)[];
  // Authored presentation references existing diagnostic patterns; no new scoring.
  sourcePatternIds: string[];
}
export function MarketingSystemInteractions({
  items = [],
}: {
  items?: MarketingSystemInteraction[];
}) {
  if (!items.length) return null;
  return (
    <section
      className="audit-block"
      aria-labelledby="marketing-system-interactions-title"
    >
      <h2 id="marketing-system-interactions-title">
        How Your Marketing System Works Together
      </h2>
      {items.map((item) => (
        <div className="case-stage" key={item.id} data-interaction-id={item.id}>
          <div className="mb-3 flex flex-wrap gap-2">
            {item.sections.map((id) => (
              <span
                key={id}
                style={sectionStyle(id)}
                className="section-label rounded border px-2 py-1 text-xs"
              >
                {sectionColors[id].name}
              </span>
            ))}
          </div>
          <h3>{item.title}</h3>
          <p>{item.explanation}</p>
        </div>
      ))}
    </section>
  );
}
