import { pillarDescription } from "../../shared/marketing-clarity-audit/pillar-interpretation";
import React from "react";
import { Document, View, renderToBuffer } from "@react-pdf/renderer";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import {
  BrandedPage,
  AuditPdfText as Text,
  AuditPdfHeading as Heading,
  AuditPdfParagraph as Paragraph,
  auditPdfStyles as styles,
} from "./pdf";
import { customerCopy } from "../../shared/marketing-clarity-audit/v2/customer-copy";
import { reportParagraphs } from "../../shared/marketing-clarity-audit/v2/customer-sequence";
import type { AnyV2Report as Report } from "../../shared/marketing-clarity-audit/v2/customer-report";
import type { CustomerV2Report } from "../../shared/marketing-clarity-audit/v2/customer-report";
import { sections } from "../../shared/marketing-clarity-audit/v2/questionnaire";
import { reportLanguage } from "../../shared/marketing-clarity-audit/customer-language";
import { sectionColors } from "../../shared/marketing-clarity-audit/sections";
export function PreviewPdf({
  report: r,
  notes,
}: {
  report: Report;
  notes?: Record<string, string>;
}) {
  const context = (r as Partial<CustomerV2Report>).context ?? {
    companyName: "Your business",
    name: "",
    websiteUrl: "",
  };
  const pageReport = { context };
  const primary = r.diagnosis.primary,
    theme =
      sectionColors[(primary?.sectionId ?? 1) as keyof typeof sectionColors];
  const intro = reportParagraphs(r.introduction);
  const page = (
    children: React.ReactNode,
    title = "Your Growth Clarity Report",
  ) => (
    <BrandedPage report={pageReport} title={title} size="LETTER">
      {children}
    </BrandedPage>
  );
  return (
    <Document title="Your Growth Clarity Report" author="Clarity Engine">
      {page(
        <>
          <View style={styles.hero}>
            <Text style={styles.eyebrow}>GET CLARITY ASSESSMENT</Text>
            <Text style={styles.h1}>{reportLanguage.title}</Text>
            <Text style={styles.h3}>{context.companyName}</Text>
            <Text style={styles.small}>{customerCopy.completion}</Text>
            {"businessGoals" in r && (
              <Text
                style={styles.small}
              >{`Business goals: ${r.businessGoals.map((g) => g.label).join(", ")}`}</Text>
            )}
            <Text
              style={styles.small}
            >{`Prepared for ${context.name || context.companyName} · ${new Date(r.createdAt).toLocaleDateString("en-US", { timeZone: "America/New_York" })}`}</Text>
          </View>
          <Text style={styles.label}>Your First Growth Opportunity</Text>
          <Heading>
            {"priorityHeadline" in r
              ? r.priorityHeadline
              : (primary?.title ?? "Validate your next opportunity")}
          </Heading>
          <Paragraph>{r.recommendations[0].why}</Paragraph>
          {"prioritySummary" in r && <Paragraph>{r.prioritySummary}</Paragraph>}
          <View style={styles.lesson}>
            <Text style={styles.h3}>Start here</Text>
            <Paragraph>{r.recommendations[0].title}</Paragraph>
          </View>
          {"priorityAreas" in r && r.priorityAreas[1] && (
            <View>
              <Text
                style={styles.h3}
              >{`${r.diagnosis.primaryIds.length > 1 ? "Equally ranked area" : "Next area"}: ${r.priorityAreas[1].name} · ${Number(r.priorityAreas[1].score.toFixed(1))} / 100`}</Text>
              <Paragraph>
                {r.diagnosis.secondary?.rationale ??
                  "Validate the capability rather than assuming a hidden weakness."}
              </Paragraph>
            </View>
          )}
          <Heading>How to use your report</Heading>
          <Paragraph>
            Start with your first opportunity and its three practical moves,
            then turn your four-week plan into action. Your Work Session keeps
            the evidence and your next decision in one place.
          </Paragraph>
          <Text style={styles.small}>{r.caveat}</Text>
        </>,
      )}
      {page(
        <>
          <Heading>Your Marketing Clarity Snapshot</Heading>
          <Text style={styles.small}>
            Based on your 46 assessment answers. The six levers summarize
            strengths and opportunities you reported.
          </Text>
          {[...sections]
            .sort(
              (a, b) =>
                r.diagnosis.sectionScores[b.id] -
                  r.diagnosis.sectionScores[a.id] || a.id - b.id,
            )
            .map((section) => {
              const t = sectionColors[section.id as keyof typeof sectionColors];
              return (
                <View
                  key={section.id}
                  style={{
                    ...styles.card,
                    padding: 14,
                    backgroundColor: t.tint,
                    borderColor: t.border,
                    borderLeftWidth: 4,
                    borderLeftColor: t.color,
                  }}
                  wrap={false}
                >
                  <Text
                    style={{ ...styles.h3, color: t.color }}
                  >{`${t.name} · ${Number(r.diagnosis.sectionScores[section.id].toFixed(1))} / 100`}</Text>
                  <Text style={styles.small}>
                    {[
                      "2.0.0-preview.5",
                      "2.0.0-preview.6",
                      "2.0.0-preview.7",
                    ].includes(r.versions.questionnaire)
                      ? pillarDescription(r, section.id)
                      : r.diagnosis.primary?.sectionId === section.id
                        ? r.diagnosis.primary.rationale
                        : "Review the supporting evidence in your answers."}
                  </Text>
                </View>
              );
            })}
          <Text
            style={styles.small}
          >{`Overall: ${Number(r.diagnosis.overallScore.toFixed(1))} / 100. Scores summarize your answers, not a forecast of growth.`}</Text>
        </>,
      )}
      {page(
        <>
          <Heading>Why this comes first</Heading>
          {intro.map((p, i) => (
            <Paragraph key={i}>{p}</Paragraph>
          ))}
          <Heading>Your advertising situation</Heading>
          {reportParagraphs(r.trendNote).map((p, i) => (
            <Paragraph key={i}>{p}</Paragraph>
          ))}
          {r.diagnosis.contradictions.length > 0 && (
            <Heading>Evidence to check</Heading>
          )}
          {r.diagnosis.contradictions.map((c) => (
            <Paragraph key={c}>{c}</Paragraph>
          ))}
          <Text style={styles.small}>{r.caveat}</Text>
        </>,
      )}
      {page(
        <>
          <Heading>Your First 3 Moves</Heading>
          {r.recommendations.map((m, i) => (
            <View
              key={m.id}
              style={{
                ...styles.card,
                borderTopWidth: 3,
                borderTopColor: theme.color,
                marginBottom: 16,
                padding: 16,
              }}
              wrap={false}
            >
              <Text
                style={{ ...styles.eyebrow, color: theme.color }}
              >{`Move ${i + 1}`}</Text>
              <Text style={styles.h3}>{m.title}</Text>
              <Text style={styles.label}>What to do</Text>
              <Paragraph>{m.whatToDo}</Paragraph>
              {"supportingDetails" in m &&
                m.supportingDetails?.map((detail) => (
                  <Text
                    key={detail}
                    style={styles.bullet}
                  >{`• ${detail}`}</Text>
                ))}
              <Text style={styles.label}>Done when</Text>
              <Paragraph>{m.doneWhen}</Paragraph>
              <Text style={styles.label}>Why this matters</Text>
              <Paragraph>{m.why}</Paragraph>
            </View>
          ))}
        </>,
      )}
      {page(
        <>
          <Heading>Your Four-Week Clarity Plan</Heading>
          {r.thirtyDayPlan.map((w) => (
            <View
              key={w.week}
              style={{
                ...styles.card,
                borderTopWidth: 3,
                borderTopColor: theme.color,
                padding: 16,
                marginBottom: 12,
              }}
              wrap={false}
            >
              <Text
                style={{ ...styles.eyebrow, color: theme.color }}
              >{`Week ${w.week}: ${w.title}`}</Text>
              <Paragraph>{w.objective}</Paragraph>
              <Text style={styles.label}>Your actions</Text>
              {w.actions.map((a) => (
                <Text key={a} style={styles.bullet}>{`• ${a}`}</Text>
              ))}
              <Text style={styles.label}>Done when</Text>
              <Paragraph>{w.completionCriteria}</Paragraph>
            </View>
          ))}
          {"goalGuidance" in r ? (
            <View minPresenceAhead={140}>
              <Heading>Useful Progress Measures</Heading>
            </View>
          ) : (
            <Heading>Useful Progress Measures</Heading>
          )}
          {"goalGuidance" in r &&
            r.goalGuidance.map((g) => (
              <View key={g.id} style={styles.card} wrap={false}>
                <Text style={styles.h3}>{g.label}</Text>
                <Text style={styles.label}>What to check</Text>
                <Paragraph>{g.check}</Paragraph>
                <Text style={styles.label}>Useful measures</Text>
                <Paragraph>{g.measure}</Paragraph>
              </View>
            ))}
          {(!("goalGuidance" in r)
            ? r.progressMeasures
            : r.progressMeasures.slice(-1)
          ).map((m) => (
            <Text key={m} style={styles.bullet}>{`• ${m}`}</Text>
          ))}
        </>,
      )}
      {page(
        <>
          <View
            style={{
              ...styles.hero,
              backgroundColor: theme.tint,
              borderTopColor: theme.color,
            }}
          >
            <Text style={styles.eyebrow}>YOUR NEXT STEP</Text>
            <Text style={styles.h1}>Your Clarity Work Session</Text>
            <Paragraph>
              Connect your opportunity to the evidence in your business.
            </Paragraph>
          </View>
          {r.workSession.map((p, i) => (
            <View
              key={p}
              style={styles.prompt}
              wrap={Boolean(notes?.[`work-${i + 1}`])}
            >
              <Text style={styles.promptText}>{`${i + 1}. ${p}`}</Text>
              {notes?.[`work-${i + 1}`] && (
                <Paragraph>{notes[`work-${i + 1}`]}</Paragraph>
              )}
              <View
                style={{
                  height: 55,
                  borderBottomWidth: 0.6,
                  borderBottomColor: "#CDD6E2",
                }}
              />
            </View>
          ))}
        </>,
        "Your Clarity Work Session",
      )}
    </Document>
  );
}
export async function renderPreviewPdf(
  report: Report,
  notes?: Record<string, string>,
) {
  const bytes = await renderToBuffer(
    <PreviewPdf report={report} notes={notes} />,
  );
  const pdf = await PDFDocument.load(bytes),
    font = await pdf.embedFont(StandardFonts.Helvetica);
  pdf.getPages().forEach((page, i) =>
    page.drawText(`${i + 1} / ${pdf.getPageCount()}`, {
      x: 537,
      y: 23,
      size: 8,
      font,
      color: rgb(0.38, 0.43, 0.51),
    }),
  );
  return Buffer.from(await pdf.save());
}
