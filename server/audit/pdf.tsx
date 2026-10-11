import React from "react";
import { precedenceExplanation } from "../../shared/marketing-clarity-audit/precedence-explanation";
import { PdfProgressIcon } from "./pdf-progress-icon";
import { progressIconName } from "../../shared/marketing-clarity-audit/progress-icons";
import { measuresFor } from "../../shared/marketing-clarity-audit/progress-measures";
import { teachingFor } from "../../shared/marketing-clarity-audit/constraint-teaching";
import { workSessionIntro } from "../../shared/marketing-clarity-audit/work-session-content";
import {
  marketingSnapshot,
  scoreBandGuide,
  howToReadResults,
} from "../../shared/marketing-clarity-audit/snapshot";
import { normalizeCompanyLogo } from "./company-logo";
import {
  Svg,
  Path,
  Document,
  Page,
  View,
  Text,
  Image,
  Link,
  Font,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";
import { resolve } from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { FrozenAuditReport } from "../../shared/marketing-clarity-audit/report";
import { sectionColors } from "../../shared/marketing-clarity-audit/sections";
import { sectionBand } from "../../shared/marketing-clarity-audit/scoring";
import {
  aiPresentation,
  caseRelevance,
  caseTeaching,
  recommendationWhyCritical,
  confidencePresentation,
  reportPlan,
  workPrompts,
  recommendationsPresentation,
  supportingSequence,
} from "../../shared/marketing-clarity-audit/presentation";

const asset = (name: string) =>
  resolve(process.cwd(), "server/audit/pdf-assets", name);
Font.register({
  family: "Inter",
  fonts: [
    { src: asset("Inter-Regular.woff"), fontWeight: 400 },
    { src: asset("Inter-Bold.woff"), fontWeight: 700 },
  ],
});
Font.registerHyphenationCallback((word) => [word]);
const styles = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontSize: 9,
    lineHeight: 1.35,
    color: "#18232B",
    paddingTop: 72,
    paddingBottom: 55,
    paddingHorizontal: 40,
  },
  header: {
    position: "absolute",
    top: 24,
    left: 40,
    right: 40,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#DFD8F1",
    paddingBottom: 9,
  },
  logo: { width: 24, height: 24, marginRight: 8 },
  wordmark: { fontSize: 12, fontWeight: 700 },
  headerTag: { marginLeft: "auto", fontSize: 7, color: "#5541BF" },
  hero: {
    padding: 20,
    backgroundColor: "#F2EFFF",
    borderRadius: 12,
    marginBottom: 16,
  },
  eyebrow: {
    fontSize: 7.5,
    color: "#5541BF",
    fontWeight: 700,
    letterSpacing: 1,
    marginBottom: 5,
  },
  h1: { fontSize: 25, fontWeight: 700, lineHeight: 1.2, marginBottom: 10 },
  h2: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.25,
    marginTop: 10,
    marginBottom: 10,
  },
  h3: { fontSize: 11, fontWeight: 700, lineHeight: 1.3, marginBottom: 6 },
  label: {
    fontSize: 8,
    fontWeight: 700,
    color: "#5541BF",
    marginTop: 6,
    marginBottom: 3,
  },
  p: { marginBottom: 5 },
  small: { fontSize: 8, color: "#606873", marginBottom: 5 },
  card: {
    borderWidth: 1,
    borderColor: "#E3E6EC",
    borderRadius: 9,
    padding: 10,
    marginBottom: 8,
  },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 8 },
  score: {
    width: "31.9%",
    padding: 11,
    borderRadius: 8,
    borderTopWidth: 3,
    marginBottom: 2,
  },
  scoreNum: {
    fontSize: 22,
    fontWeight: 700,
    lineHeight: 1.3,
    marginTop: 4,
    marginBottom: 6,
  },
  stage: {
    width: "31.9%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#E3E6EC",
    borderRadius: 8,
  },
  lesson: {
    padding: 12,
    backgroundColor: "#F2EFFF",
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  bullet: { marginBottom: 5, paddingLeft: 8 },
  prompt: {
    padding: 6,
    borderWidth: 1,
    borderColor: "#DFE5ED",
    borderRadius: 8,
    marginBottom: 6,
  },
  promptText: { fontSize: 9, marginBottom: 5 },
  line: { height: 10, borderBottomWidth: 0.6, borderBottomColor: "#CDD6E2" },
});
const labelName = (id?: number) =>
  id
    ? sectionColors[id as keyof typeof sectionColors].name
    : "No clear constraint indicated";
function Heading({ children }: { children: React.ReactNode }) {
  return (
    <Text style={styles.h2} minPresenceAhead={90}>
      {children}
    </Text>
  );
}
function Paragraph({ children }: { children: React.ReactNode }) {
  return <Text style={styles.p}>{children}</Text>;
}
function BrandedPage({
  report,
  title,
  size,
  children,
}: {
  report: FrozenAuditReport;
  title: string;
  size: "LETTER" | "A4";
  children: React.ReactNode;
}) {
  return (
    <Page size={size} style={styles.page} wrap>
      <View style={styles.header} fixed>
        <Image src={asset("logo.png")} style={styles.logo} />
        <Text style={styles.wordmark}>Clarity Engine</Text>
        <Text style={styles.headerTag}>A CLARITY ENGINE™ DIAGNOSTIC</Text>
      </View>
      <Text
        fixed
        style={{
          position: "absolute",
          top: size === "LETTER" ? 752 : 802,
          left: 40,
          width: 450,
          fontSize: 7,
          color: "#606873",
        }}
      >
        {title} · {report.context.companyName.slice(0, 55)}
      </Text>
      {children}
    </Page>
  );
}
function Prepared({
  report,
  companyLogo,
}: {
  report: FrozenAuditReport;
  companyLogo?: Buffer;
}) {
  return (
    <View>
      {companyLogo && (
        <Image
          src={companyLogo}
          style={{
            width: 160,
            height: 42,
            objectFit: "contain",
            objectPosition: "left",
            marginBottom: 8,
            backgroundColor: "white",
          }}
        />
      )}
      <Text style={styles.h3}>{report.context.companyName}</Text>
      <Text style={styles.small}>{report.context.websiteUrl}</Text>
      <Text style={styles.small}>
        Prepared for {report.context.name} ·{" "}
        {new Date(report.createdAt).toLocaleDateString("en-US", {
          timeZone: "America/New_York",
        })}
      </Text>
    </View>
  );
}
function Workbook({
  report,
  size,
  notes,
  companyLogo,
}: {
  report: FrozenAuditReport;
  size: "LETTER" | "A4";
  notes?: Record<string, string>;
  companyLogo?: Buffer;
}) {
  const prompts = workPrompts(report).filter(
    (p) => !p.legacy || Boolean(notes?.[p.id]?.trim()),
  );
  const hasThinking = prompts.some((p) => p.group === "primary");
  const needsContinuation =
    prompts.filter((p) => p.group === "primary").length > 3 ||
    prompts.some((p) => p.group === "secondary");
  const promptBlock = (p: (typeof prompts)[number]) => {
    const response = notes?.[p.id];
    const filled = Boolean(response?.trim());
    return (
      <View key={p.id} style={styles.prompt} wrap={filled}>
        <Text style={styles.promptText} minPresenceAhead={filled ? 30 : 0}>
          {p.label}
        </Text>
        {p.legacy && (
          <Text style={styles.small}>
            Previously saved response · original question
          </Text>
        )}
        {p.helper && (
          <Text style={{ ...styles.small, marginBottom: 5 }}>{p.helper}</Text>
        )}
        {filled ? (
          <Text
            style={{ fontSize: 9, lineHeight: 1.5, marginTop: 5 }}
            orphans={2}
            widows={2}
          >
            {response}
          </Text>
        ) : (
          [0, 1, 2, 3].map((i) => (
            <View
              key={i}
              style={{
                ...styles.line,
                height: p.group === "decision" ? 10 : 14,
              }}
            />
          ))
        )}
      </View>
    );
  };
  return (
    <>
      <BrandedPage report={report} title="Clarity Work Session" size={size}>
        <View style={{ ...styles.hero, padding: 14 }}>
          <Text style={styles.eyebrow}>
            {notes
              ? "YOUR CLARITY TOOLKIT · SAVED RESPONSES"
              : "YOUR CLARITY TOOLKIT · COMPANION WORKBOOK"}
          </Text>
          <Text style={styles.h1}>Your Clarity Work Session</Text>
          <Text style={styles.h3}>Turn your diagnosis into action.</Text>
          <Paragraph>{workSessionIntro}</Paragraph>
          <Prepared report={report} companyLogo={companyLogo} />
          <Text style={styles.small}>
            {notes
              ? "These are your saved responses at the time of download. Unanswered prompts retain writing space. Your notes never change the frozen diagnosis."
              : "Use the evidence behind your diagnosis to work toward one clear decision. Your online notes are separate from diagnostic scoring."}
          </Text>
        </View>
        {hasThinking && (
          <>
            <Heading>Work Through Your Primary Constraint</Heading>
            <Text
              style={{
                ...styles.h3,
                color:
                  sectionColors[report.diagnosis.primary?.sectionId ?? 1].color,
              }}
            >
              {labelName(report.diagnosis.primary?.sectionId)}
            </Text>
            {prompts
              .filter((p) => p.group === "primary")
              .slice(0, 3)
              .map(promptBlock)}
          </>
        )}
        {!needsContinuation && (
          <>
            <Heading>Your decision</Heading>
            {prompts
              .filter((p) => p.group === "decision" && !p.legacy)
              .map(promptBlock)}
          </>
        )}
      </BrandedPage>
      {needsContinuation && (
        <BrandedPage report={report} title="Clarity Work Session" size={size}>
          <Heading>Work Through Your Primary Constraint · Continued</Heading>
          {prompts
            .filter((p) => p.group === "primary")
            .slice(3)
            .map(promptBlock)}
          {prompts.some((p) => p.group === "secondary") && (
            <>
              <Heading>
                Supporting constraint:{" "}
                {labelName(report.diagnosis.secondary?.sectionId)}
              </Heading>
              {prompts.filter((p) => p.group === "secondary").map(promptBlock)}
            </>
          )}
          <Heading>Your decision</Heading>
          {prompts
            .filter((p) => p.group === "decision" && !p.legacy)
            .map(promptBlock)}
        </BrandedPage>
      )}
      {prompts.some((p) => p.legacy) && (
        <BrandedPage report={report} title="Clarity Work Session" size={size}>
          <Heading>Previously saved responses</Heading>
          <Paragraph>
            Your earlier notes are preserved under their original questions.
          </Paragraph>
          {prompts.filter((p) => p.legacy).map(promptBlock)}
        </BrandedPage>
      )}
    </>
  );
}
function ReportDocument({
  report,
  size,
  origin,
  companyLogo,
}: {
  report: FrozenAuditReport;
  size: "LETTER" | "A4";
  origin: string;
  companyLogo?: Buffer;
}) {
  const d = report.diagnosis;
  const confidence = confidencePresentation(report);
  const snapshot = marketingSnapshot(report);
  const card = report.caseCard;
  const teaching = caseTeaching(report);
  const lesson = teachingFor(report);
  const precedence = precedenceExplanation(report);
  const deferred = (
    <View wrap={false}>
      <Text
        style={{
          ...styles.h2,
          marginTop: 8,
          marginBottom: 8,
          color: "#843E34",
        }}
        minPresenceAhead={70}
      >
        What Not to Prioritize Yet · NOT YET
      </Text>
      <View style={styles.row}>
        {report.deprioritized.map((p) => (
          <View
            style={{
              ...styles.card,
              width: "31.9%",
              backgroundColor: "#FFF7F5",
              borderColor: "#EACFC8",
              padding: 8,
            }}
            key={p.action}
            wrap={false}
          >
            <Text style={{ ...styles.h3, fontSize: 9, marginBottom: 5 }}>
              {p.action}
            </Text>
            <Text style={{ fontSize: 8, lineHeight: 1.3 }}>{p.reason}</Text>
          </View>
        ))}
      </View>
    </View>
  );
  return (
    <>
      <BrandedPage report={report} title="Get Clarity Assessment Report" size={size}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>
            SEE WHAT'S WORKING · KNOW WHAT TO DO NEXT
          </Text>
          <Text style={styles.h1}>Get Clarity Assessment Report</Text>
          <Prepared report={report} companyLogo={companyLogo} />
        </View>
        <Heading>Your Get Clarity Assessment Snapshot</Heading>
        <Text
          style={{
            ...styles.h3,
            fontSize: 13,
            color: sectionColors[d.primary?.sectionId ?? 1].color,
          }}
        >
          {snapshot.title}
        </Text>
        <Paragraph>{snapshot.working}</Paragraph>
        <Paragraph>{snapshot.profile}</Paragraph>
        <Paragraph>{snapshot.matters}</Paragraph>
        <Text style={styles.h3}>What your results suggest</Text>
        {[
          ["Build on", snapshot.buildOn],
          ["Focus first", snapshot.focus],
          ["Protect", snapshot.protect],
          ["Do not rush into", snapshot.avoid],
          ["Your opportunity", snapshot.opportunity],
        ].map(([label, text]) => (
          <View
            key={label}
            style={{ flexDirection: "row", marginBottom: 7 }}
            wrap={false}
          >
            <Text style={{ fontWeight: 700, width: 95, fontSize: 8 }}>
              {label}
            </Text>
            <Text style={{ flex: 1, fontSize: 9 }}>{text}</Text>
          </View>
        ))}
        {snapshot.relativeStrength && (
          <Text style={styles.small}>{snapshot.relativeStrength}</Text>
        )}
        {snapshot.secondary && (
          <Text style={styles.small}>{snapshot.secondary}</Text>
        )}
        <Text style={styles.h3}>How to read your results</Text>
        <Paragraph>{howToReadResults}</Paragraph>
        <Text style={styles.small}>
          Overall score: {Math.round(d.overallScore)} / 100. A strong overall
          score can still contain a meaningful bottleneck.
        </Text>
      </BrandedPage>
      <BrandedPage report={report} title="Get Clarity Assessment Report" size={size}>
        <Heading>Six-part scorecard</Heading>
        <View style={styles.row}>
          {Object.entries(sectionColors).map(([key, color]) => (
            <View
              key={key}
              style={{
                ...styles.score,
                backgroundColor: color.tint,
                borderTopColor: color.color,
              }}
              wrap={false}
            >
              <Text style={{ ...styles.h3, color: color.color }}>
                {color.name}
              </Text>
              <Text style={{ ...styles.scoreNum, color: color.color }}>
                {Math.round(d.sectionScores[Number(key)])} / 100
              </Text>
              <Text style={{ ...styles.small, lineHeight: 1.4, marginTop: 3 }}>
                {sectionBand(d.sectionScores[Number(key)])}
              </Text>
            </View>
          ))}
        </View>
        <Text style={styles.h3}>How to interpret your scores</Text>
        <Text style={styles.small}>
          {scoreBandGuide.map((b) => `${b.range}: ${b.label}`).join(" · ")}
        </Text>
        <Paragraph>
          Your goal is not necessarily to score 100 everywhere. Your goal is to
          remove the constraint most likely to limit the rest of the system.
        </Paragraph>
        <Heading>Diagnostic Confidence</Heading>
        <View style={styles.card} wrap={false}>
          <Text style={styles.h3}>
            {d.confidence.level.toUpperCase()} · {d.confidence.score} / 100
          </Text>
          <Paragraph>{confidence.explanation}</Paragraph>
          {confidence.caveats.map((note) => (
            <Text key={note} style={styles.small}>
              {note}
            </Text>
          ))}
        </View>
      </BrandedPage>
      {lesson && d.primary && (
        <BrandedPage
          report={report}
          title="Get Clarity Assessment Report"
          size={size}
        >
          <Text style={styles.eyebrow}>YOUR BIGGEST CONSTRAINT</Text>
          <Heading>{labelName(d.primary.sectionId)}</Heading>
          <Text style={styles.h3}>
            {Math.round(d.sectionScores[d.primary.sectionId])} / 100 ·{" "}
            {sectionBand(d.sectionScores[d.primary.sectionId])}
          </Text>
          <Paragraph>{report.summary}</Paragraph>
          {precedence && (
            <View style={styles.lesson} wrap={false}>
              <Text style={styles.h3}>{precedence.title}</Text>
              <Paragraph>{precedence.copy}</Paragraph>
            </View>
          )}
          <Text style={styles.h3}>What this means</Text>
          {lesson.meaning.map((copy) => (
            <Paragraph key={copy}>{copy.replace(/→/g, "->")}</Paragraph>
          ))}
          <View style={styles.row} wrap={false}>
            {[
              {
                title: "WHEN THIS IS STRONG",
                items: lesson.strong,
                tint: "#EDF8F1",
                color: "#145C43",
              },
              {
                title: "WHEN THIS CONSTRAINS GROWTH",
                items: lesson.constrained,
                tint: "#FFF2F4",
                color: "#81374C",
              },
            ].map((column) => (
              <View
                key={column.title}
                style={{
                  ...styles.card,
                  width: "48%",
                  backgroundColor: column.tint,
                }}
                wrap={false}
              >
                <Text style={{ ...styles.label, color: column.color }}>
                  {column.title}
                </Text>
                {column.items.map((item) => (
                  <Text
                    key={item}
                    style={{ ...styles.bullet, fontSize: 9, lineHeight: 1.4 }}
                  >
                    • {item}
                  </Text>
                ))}
              </View>
            ))}
          </View>
          <Text style={styles.h3}>Why this can hold back growth</Text>
          <Paragraph>{lesson.consequence}</Paragraph>
          {d.secondary && (
            <View style={styles.card} wrap={false}>
              <Text style={styles.eyebrow}>
                SUPPORTING CONSTRAINT · {labelName(d.secondary.sectionId)}
              </Text>
              <Paragraph>{supportingSequence(report)?.intro}</Paragraph>
            </View>
          )}
          {d.relativeStrength && (
            <Text style={styles.small}>
              Relative strength: {labelName(d.relativeStrength)}
            </Text>
          )}
        </BrandedPage>
      )}
      <BrandedPage report={report} title="Get Clarity Assessment Report" size={size}>
        {!d.primary && (
          <>
            <Heading>Constraint profile</Heading>
            <Paragraph>{report.summary}</Paragraph>
          </>
        )}
        <Text style={{ ...styles.h2, marginBottom: 3 }} minPresenceAhead={90}>
          Your Next 3 Moves
        </Text>
        {report.recommendations.length > 0 && (
          <Text style={{ ...styles.small, marginBottom: 2 }}>
            These are the three actions most likely to improve your primary
            constraint.
          </Text>
        )}
        <View style={styles.row}>
          {recommendationsPresentation(report).map((r, i) => (
            <View
              style={{ ...styles.card, width: "31.9%" }}
              key={r.id}
              wrap={false}
            >
              <View
                style={{
                  width: 16,
                  height: 16,
                  borderWidth: 1.2,
                  borderColor: "#145C43",
                  marginBottom: 8,
                }}
              />
              <Text style={styles.eyebrow}>MOVE {i + 1}</Text>
              <Text style={styles.h3}>{r.title}</Text>
              <Text style={styles.label}>What to do</Text>
              <Paragraph>{r.whatToDo}</Paragraph>
              <Text style={styles.label}>Why this is critical</Text>
              <Text style={{ fontSize: 8, lineHeight: 1.3, marginBottom: 6 }}>
                {recommendationWhyCritical(r)}
              </Text>
              <Text style={styles.label}>Done when</Text>
              <Paragraph>{r.doneWhen}</Paragraph>
            </View>
          ))}
        </View>
        {!report.recommendations.length && (
          <Paragraph>
            Your answers do not establish a priority fix. Use the Work Session
            to define the next decision.
          </Paragraph>
        )}
        {d.primary?.pattern?.id !== "P13" && deferred}
      </BrandedPage>
      <BrandedPage report={report} title="Get Clarity Assessment Report" size={size}>
        {d.primary?.pattern?.id === "P13" && deferred}
        {card && (
          <View wrap={false}>
            <Heading>What This Looks Like in the Real World</Heading>
            <Text style={styles.eyebrow}>REAL-WORLD EXAMPLE</Text>
            <Text style={styles.h3}>{teaching?.title}</Text>
            {teaching?.stages.map(([title, text]) => (
              <View key={title} style={{ marginBottom: 8 }}>
                <Text style={styles.label}>{title}</Text>
                <Text>{text}</Text>
              </View>
            ))}
            {card.id === "CASE_BUSINESS_SYSTEMS_POSITIONING" && (
              <View style={{ marginBottom: 8 }}>
                <Text style={styles.label}>
                  Why the improved direction is stronger
                </Text>
                <Text>
                  • Makes the customer outcome clear before listing tools.
                </Text>
                <Text>• Connects the components to one business purpose.</Text>
                <Text>
                  • Gives buyers a simpler way to understand the value.
                </Text>
              </View>
            )}
            <View style={styles.lesson} wrap={false}>
              <Text style={styles.h3}>What to take from this</Text>
              <Paragraph>{teaching?.lesson}</Paragraph>
            </View>
            <Text style={styles.h3}>Why this matters for your business</Text>
            <Paragraph>{caseRelevance(report)}</Paragraph>
            <Text style={styles.small}>
              {card.evidence === "C_strategic"
                ? "Strategic example; After describes a direction, with no outcome claim."
                : card.evidence === "B_observed"
                  ? "Observed improvement; no causal or quantified outcome claim. After describes the intervention."
                  : "Verified intervention; no quantified metric is supplied. After describes the intervention."}
            </Text>
          </View>
        )}
      </BrandedPage>
      <BrandedPage report={report} title="Get Clarity Assessment Report" size={size}>
        {lesson && (
          <View>
            <Heading>How You’ll Know This Is Improving</Heading>
            {lesson.progress.map((signal, index) => (
              <View
                key={signal.title}
                style={{ ...styles.card, padding: 9 }}
                wrap={false}
              >
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      flexShrink: 0,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: sectionColors[d.primary!.sectionId].border,
                      backgroundColor: sectionColors[d.primary!.sectionId].tint,
                      padding: 3,
                    }}
                  >
                    <PdfProgressIcon
                      name={progressIconName(d.primary!.sectionId, index)}
                      color={sectionColors[d.primary!.sectionId].color}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.h3}>{signal.title}</Text>
                    <Paragraph>
                      {signal.description.replace(/→/g, "->")}
                    </Paragraph>
                  </View>
                </View>
              </View>
            ))}
            <View
              style={{ ...styles.card, backgroundColor: "#F7F8FA" }}
              wrap={false}
            >
              <Text style={styles.label}>How to Measure Your Progress</Text>
              {measuresFor(report).map((measure) => (
                <View key={measure.title} style={{ marginTop: 7 }}>
                  <Text style={styles.label}>{measure.title}</Text>
                  <Text style={styles.small}>{measure.method}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </BrandedPage>
      <BrandedPage report={report} title="Get Clarity Assessment Report" size={size}>
        {report.aiAccelerators.length > 0 && (
          <>
            <Heading>Leverage AI More Effectively</Heading>
            <Paragraph>
              Use AI to accelerate informed thinking, not to replace strategic
              judgment.
            </Paragraph>
            {aiPresentation(report).map((ai) => (
              <View style={styles.card} key={ai.patternId} wrap={false}>
                <Text style={styles.label}>Gather Fuel for Your AI Tools</Text>
                {ai.gather.map((g) => (
                  <Text style={styles.bullet} key={g}>
                    • {g}
                  </Text>
                ))}
                <Text style={styles.label}>Co-Create With AI</Text>
                <Paragraph>{ai.ask}</Paragraph>
                <Text style={styles.label}>
                  Validate Ideas & Accelerate Execution
                </Text>
                <Paragraph>{ai.use}</Paragraph>
              </View>
            ))}
          </>
        )}
        {
          <View style={styles.lesson} wrap={false}>
            <Text style={styles.h3}>Your Clarity Toolkit</Text>
            <Paragraph>
              Use the separate Clarity Work Session workbook or the autosaved
              online worksheet to turn this diagnosis into a decision.
            </Paragraph>
            <Link src={`${origin}/services`}>
              Explore Ways to Work Together
            </Link>
          </View>
        }
      </BrandedPage>
      {[0, 2].map((start) => (
        <BrandedPage
          key={start}
          report={report}
          title="Get Clarity Assessment Report"
          size={size}
        >
          <Heading>Your 30-Day Clarity Plan</Heading>
          {start === 0 && (
            <View style={{ marginBottom: 12 }} wrap={false}>
              <Text style={styles.h3}>Put your plan where you can see it</Text>
              <Paragraph>
                Pro tip: Download your Get Clarity Assessment Report and cut out
                these four weekly focus cards. Keep one on your desk each week
                so the priorities most likely to move your business forward stay
                visible while you work.
              </Paragraph>
            </View>
          )}
          <View style={styles.row}>
            {reportPlan(report)
              .slice(start, start + 2)
              .map((week) => (
                <View
                  style={{
                    ...styles.card,
                    width: "48%",
                    borderStyle: "dashed",
                    borderColor: "#8B80B7",
                    padding: 14,
                  }}
                  key={week.week}
                  wrap={false}
                >
                  <Svg width={14} height={14} viewBox="0 0 24 24">
                    <Path
                      d="M6 7a3 3 0 1 0 0 6a3 3 0 0 0 0-6M6 15a3 3 0 1 0 0 6a3 3 0 0 0 0-6M8 9L21 21M8 18L21 3"
                      stroke="#8B80B7"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </Svg>
                  <Text style={styles.small}>
                    {report.context.companyName} · Clarity Plan
                  </Text>
                  <Text style={styles.eyebrow}>WEEK {week.week}</Text>
                  <Text style={styles.h3}>{week.title}</Text>
                  <Text style={styles.label}>Objective</Text>
                  <Paragraph>{week.objective}</Paragraph>
                  <Text style={styles.label}>Specific Actions</Text>
                  {week.actions.map((action) => (
                    <Text style={styles.bullet} key={action}>
                      • {action}
                    </Text>
                  ))}
                  <Text style={styles.label}>Done When / Deliverable</Text>
                  <Paragraph>{week.completionCriteria}</Paragraph>
                  <Text style={styles.small}>
                    Cut this out and keep it visible this week.
                  </Text>
                </View>
              ))}
          </View>
          {start === 2 && supportingSequence(report) && (
            <View style={styles.lesson} wrap={false}>
              <Text style={styles.h3}>What comes next</Text>
              <Paragraph>{supportingSequence(report)?.next}</Paragraph>
            </View>
          )}
        </BrandedPage>
      ))}
    </>
  );
}
export async function renderAuditPdf(
  report: FrozenAuditReport,
  workSession = false,
  origin = "https://www.clarity-engine.org",
  size: "LETTER" | "A4" = "LETTER",
  notes?: Record<string, string>,
  companyLogo?: Buffer,
) {
  if (companyLogo) {
    try {
      companyLogo = await normalizeCompanyLogo(companyLogo, "image/png");
    } catch {
      companyLogo = undefined;
    }
  }
  const buffer = await renderToBuffer(
    <Document
      title={
        workSession
          ? notes
            ? "My Completed Clarity Work Session"
            : "Clarity Work Session"
          : "Get Clarity Assessment Report"
      }
      author="Clarity Engine"
      subject={`Prepared for ${report.context.companyName}`}
      language="en-US"
    >
      {workSession ? (
        <Workbook
          report={report}
          size={size}
          notes={notes}
          companyLogo={companyLogo}
        />
      ) : (
        <ReportDocument
          report={report}
          size={size}
          origin={origin}
          companyLogo={companyLogo}
        />
      )}
    </Document>,
  );
  // Stamp actual physical page counts after layout; keep headers/footers out of pagination.
  const document = await PDFDocument.load(buffer);
  const font = await document.embedFont(StandardFonts.Helvetica);
  const pages = document.getPages();
  pages.forEach((page, index) => {
    const label = `${index + 1} / ${pages.length}`;
    page.drawText(label, {
      x: page.getWidth() - 40 - font.widthOfTextAtSize(label, 7),
      y: 31,
      size: 7,
      font,
      color: rgb(0.38, 0.41, 0.45),
    });
  });
  return Buffer.from(await document.save());
}
