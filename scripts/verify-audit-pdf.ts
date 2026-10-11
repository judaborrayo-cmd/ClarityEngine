import { readFile, mkdir, writeFile } from "node:fs/promises";
import {
  questionnaire,
  type Answers,
} from "../shared/marketing-clarity-audit/scoring";
import { createFrozenReport } from "../shared/marketing-clarity-audit/report";
import { renderAuditPdf } from "../server/audit/pdf";
const answers: Answers = Object.fromEntries(
  questionnaire.questions.map((q) => [
    q.id,
    q.sectionId === 1 ? (q.id === "O5" ? "B" : "D") : "A",
  ]),
);
const report = createFrozenReport(
  answers,
  {
    name: "Fictional Customer",
    email: "fictional@example.com",
    companyName: "Apex & Co.",
    websiteUrl: "https://example.com",
    businessType: "professional_services",
    primaryMarketingGoal: "leads",
  },
  {},
  new Date("2026-10-05T12:00:00Z"),
);
await mkdir("tmp/pdfs", { recursive: true });
for (const size of ["LETTER", "A4"] as const)
  for (const kind of [
    "report",
    "work-session",
    "work-session-completed",
    "work-session-long",
  ]) {
    const buffer = await renderAuditPdf(
      report,
      kind !== "report",
      "https://www.clarity-engine.org",
      size,
      kind === "work-session-completed"
        ? {
            "primary-0":
              "Saved Report 1 response: We help professional services businesses make a clear, evidence-backed marketing decision.",
            "decision-1":
              "Focus one offer.\nValidate it with five customers before increasing spend.",
          }
        : kind === "work-session-long"
          ? {
              "primary-0":
                "Customer evidence and a considered next action. ".repeat(80) +
                "\nEnd of saved response.",
            }
          : undefined,
    );
    await writeFile(`tmp/pdfs/clarity-${kind}-${size}.pdf`, buffer);
  }
console.log("Generated branded PDF QA fixtures in tmp/pdfs.");

const qaLogo = await readFile(
  new URL("../server/audit/pdf-assets/logo.png", import.meta.url),
);
const messageReport = createFrozenReport(
  Object.fromEntries(
    questionnaire.questions.map((q) => [q.id, q.sectionId === 3 ? "D" : "A"]),
  ),
  { ...report.context },
);
for (const size of ["LETTER", "A4"] as const) {
  await writeFile(
    `tmp/pdfs/clarity-report-logo-${size}.pdf`,
    await renderAuditPdf(
      report,
      false,
      "https://example.com",
      size,
      undefined,
      qaLogo,
    ),
  );
  await writeFile(
    `tmp/pdfs/clarity-work-session-logo-${size}.pdf`,
    await renderAuditPdf(
      report,
      true,
      "https://example.com",
      size,
      undefined,
      qaLogo,
    ),
  );
  await writeFile(
    `tmp/pdfs/clarity-report-message-${size}.pdf`,
    await renderAuditPdf(messageReport, false, "https://example.com", size),
  );
}

const trafficOverrides: Answers = {
  T1: "C",
  T2: "C",
  T3: "D",
  T4: "C",
  T5: "D",
  T6: "D",
  ML1: "B",
  ML2: "B",
  ML3: "C",
  ML4: "C",
  ML5: "C",
  ML6: "C",
};
const trafficReport = createFrozenReport(
  {
    ...Object.fromEntries(questionnaire.questions.map((q) => [q.id, "A"])),
    ...trafficOverrides,
  },
  report.context,
);
const supportingReport = createFrozenReport(
  {
    ...Object.fromEntries(questionnaire.questions.map((q) => [q.id, "A"])),
    ...trafficOverrides,
    ML1: "C",
    ML2: "D",
    ML3: "D",
    ML4: "C",
    ML5: "D",
    ML6: "C",
  },
  report.context,
);
for (const size of ["LETTER", "A4"] as const) {
  await writeFile(
    `tmp/pdfs/clarity-traffic-report-${size}.pdf`,
    await renderAuditPdf(trafficReport, false, "https://example.com", size),
  );
  await writeFile(
    `tmp/pdfs/clarity-traffic-work-session-${size}.pdf`,
    await renderAuditPdf(trafficReport, true, "https://example.com", size, {
      "p13-decision-3": "Run one audience test with $300 and a stable control.",
      "decision-1": "Original saved generic decision; preserve its meaning.",
    }),
  );
  await writeFile(
    `tmp/pdfs/clarity-supporting-report-${size}.pdf`,
    await renderAuditPdf(supportingReport, false, "https://example.com", size),
  );
}

const measurementReport = createFrozenReport(
  Object.fromEntries(
    questionnaire.questions.map((q) => [
      q.id,
      q.sectionId === 6 ? (q.id === "ML4" ? "E" : "D") : "A",
    ]),
  ),
  report.context,
);
for (const size of ["LETTER", "A4"] as const)
  await writeFile(
    `tmp/pdfs/clarity-measurement-report-${size}.pdf`,
    await renderAuditPdf(measurementReport, false, "https://example.com", size),
  );

const precedenceAnswers = {
  ...Object.fromEntries(questionnaire.questions.map((q) => [q.id, "A"])),
  T1: "D",
  T2: "D",
  T3: "C",
  T4: "D",
  T5: "C",
  T6: "C",
  ML1: "B",
  ML2: "C",
  ML3: "C",
  ML4: "D",
  ML5: "C",
  ML6: "B",
} as Answers;
const precedenceReport = createFrozenReport(precedenceAnswers, report.context);
for (const size of ["LETTER", "A4"] as const)
  await writeFile(
    `tmp/pdfs/clarity-precedence-report-${size}.pdf`,
    await renderAuditPdf(precedenceReport, false, "https://example.com", size),
  );
