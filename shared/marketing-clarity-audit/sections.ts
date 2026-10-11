import type { CSSProperties } from "react";

// Derived from the site's purple, pink, green, blue logo, and warm neutral palette.
// Foregrounds meet WCAG AA against their pale tints; names always accompany color.
export const sectionColors = {
  1: { name: "Offer", color: "#5541BF", tint: "#F2EFFF", border: "#DAD2F6" },
  2: { name: "Audience", color: "#145C43", tint: "#EDF8F1", border: "#BCE2CC" },
  3: { name: "Message", color: "#913B65", tint: "#FFF0F6", border: "#EDC9D9" },
  4: {
    name: "Conversion Experience",
    color: "#14636B",
    tint: "#EDF8FA",
    border: "#BDE0E4",
  },
  5: { name: "Traffic", color: "#80520E", tint: "#FFF7E8", border: "#EDD8B0" },
  6: {
    name: "Measurement & Learning",
    color: "#3348A1",
    tint: "#EEF2FF",
    border: "#CBD4F5",
  },
} as const;
export function sectionStyle(id?: number): CSSProperties {
  const theme =
    sectionColors[(id ?? 1) as keyof typeof sectionColors] ?? sectionColors[1];
  return {
    "--section-color": theme.color,
    "--section-tint": theme.tint,
    "--section-border": theme.border,
  } as CSSProperties;
}
