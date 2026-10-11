import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { PDFDocument } from "pdf-lib";
import {
  questionnaire,
  type Answers,
} from "../../shared/marketing-clarity-audit/scoring";
import { createFrozenReport } from "../../shared/marketing-clarity-audit/report";
import { renderAuditPdf } from "./pdf";

test("report and companion workbook generate branded, paginated PDF documents without changing frozen data", async () => {
  const answers: Answers = Object.fromEntries(
    questionnaire.questions.map((q) => [
      q.id,
      q.sectionId === 1 ? (q.id === "O5" ? "B" : "D") : "A",
    ]),
  );
  const report = createFrozenReport(answers, {
    name: "PDF Customer",
    email: "pdf@example.com",
    companyName: "Apex & Co.",
    websiteUrl: "https://example.com",
    businessType: "professional_services",
    primaryMarketingGoal: "leads",
  });
  const original = JSON.stringify(report);
  for (const size of ["LETTER", "A4"] as const)
    for (const workbook of [false, true]) {
      const buffer = await renderAuditPdf(
        report,
        workbook,
        "https://example.com",
        size,
      );
      assert.equal(buffer.subarray(0, 5).toString(), "%PDF-");
      const document = await PDFDocument.load(buffer);
      assert.equal(
        document.getTitle(),
        workbook ? "Clarity Work Session" : "Get Clarity Assessment Report",
      );
      assert.equal(document.getAuthor(), "Clarity Engine");
      assert.equal(document.getSubject(), "Prepared for Apex & Co.");
      assert.equal(document.getPageCount(), workbook ? 2 : 9);
      assert.equal(
        Math.round(document.getPage(0).getWidth()),
        size === "LETTER" ? 612 : 595,
      );
    }
  assert.equal(JSON.stringify(report), original);
});

test("filled workbook supports saved responses, long text, and blank unanswered prompts in both paper sizes", async () => {
  const report = createFrozenReport(
    Object.fromEntries(
      questionnaire.questions.map((q) => [q.id, q.sectionId === 1 ? "D" : "A"]),
    ),
    {
      name: "Workbook Customer",
      email: "pdf@example.com",
      companyName: "Apex & Co.",
      websiteUrl: "https://example.com",
      businessType: "professional_services",
      primaryMarketingGoal: "leads",
    },
  );
  const snapshot = JSON.stringify(report);
  const notes = {
    "primary-0": "Evidence from customer conversations. ".repeat(100),
    "decision-1": "Choose one offer.\nValidate with five customers.",
  };
  const before = JSON.stringify(notes);
  for (const size of ["LETTER", "A4"] as const) {
    const buffer = await renderAuditPdf(
      report,
      true,
      "https://example.com",
      size,
      notes,
    );
    const document = await PDFDocument.load(buffer);
    assert.equal(document.getTitle(), "My Completed Clarity Work Session");
    assert.ok(document.getPageCount() >= 3);
    assert.equal(document.getSubject(), "Prepared for Apex & Co.");
  }
  assert.equal(JSON.stringify(report), snapshot);
  assert.equal(JSON.stringify(notes), before);
});

test("company logo is optional on report/workbook covers and malformed logo cannot prevent PDF generation", async () => {
  const report = createFrozenReport(
    Object.fromEntries(questionnaire.questions.map((q) => [q.id, "A"])),
    {
      name: "Test",
      email: "pdf@example.com",
      companyName: "Logo Co.",
      websiteUrl: "https://example.com",
      businessType: "professional_services",
      primaryMarketingGoal: "leads",
    },
  );
  const before = JSON.stringify(report);
  for (const workbook of [false, true]) {
    for (const logo of [
      readFileSync(new URL("./pdf-assets/logo.png", import.meta.url)),
      Buffer.from("invalid"),
    ]) {
      const buffer = await renderAuditPdf(
        report,
        workbook,
        "https://example.com",
        "LETTER",
        undefined,
        logo,
      );
      const document = await PDFDocument.load(buffer);
      assert.ok(document.getPageCount() > 0);
    }
  }
  assert.equal(JSON.stringify(report), before);
});
