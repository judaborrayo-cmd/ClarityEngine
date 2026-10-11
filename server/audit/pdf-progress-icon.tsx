import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { parseDocument } from "htmlparser2";
import {
  Svg,
  Path,
  Line,
  Circle,
  Rect,
  Polyline,
  Polygon,
  Ellipse,
} from "@react-pdf/renderer";
import {
  progressIcons,
  type ProgressIconName,
} from "../../shared/marketing-clarity-audit/progress-icons";
// Convert only trusted, bundled Lucide geometry to native PDF vectors.
export function PdfProgressIcon({
  name,
  color,
}: {
  name: ProgressIconName;
  color: string;
}) {
  const root: any = parseDocument(
    renderToStaticMarkup(
      React.createElement(progressIcons[name], { size: 18, strokeWidth: 1.8 }),
    ),
    { xmlMode: true },
  ).children[0];
  const shapes: Record<string, any> = {
    path: Path,
    line: Line,
    circle: Circle,
    rect: Rect,
    polyline: Polyline,
    polygon: Polygon,
    ellipse: Ellipse,
  };
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {root.children
        .filter((node: any) => shapes[node.name])
        .map((node: any, index: number) => {
          const attrs: Record<string, string> = {};
          for (const [key, value] of Object.entries(node.attribs)) {
            if (
              [
                "d",
                "x",
                "y",
                "width",
                "height",
                "rx",
                "ry",
                "cx",
                "cy",
                "r",
                "x1",
                "x2",
                "y1",
                "y2",
                "points",
              ].includes(key)
            )
              attrs[key] = String(value);
          }
          return React.createElement(shapes[node.name], {
            ...attrs,
            fill: "none",
            stroke: color,
            strokeWidth: 1.8,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            key: index,
          });
        })}
    </Svg>
  );
}
