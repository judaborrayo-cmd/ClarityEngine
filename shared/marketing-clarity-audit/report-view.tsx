import React from "react";
import {
  ConstraintTeaching,
  ImprovementEvidence,
} from "./constraint-teaching-view";
import { workSessionIntro } from "./work-session-content";
import { CompanyLogo, type CompanyLogoAsset } from "./company-logo-view";
import { MarketingSnapshot, ScoreBandGuide } from "./snapshot-view";
import {
  MarketingSystemInteractions,
  type MarketingSystemInteraction,
} from "./system-interactions";
import {
  caseAssetIds,
  categoryCaseAsset,
  type CaseAssetMap,
  type CaseAsset,
  type CaseAssetId,
} from "./case-assets";
import type { FrozenAuditReport } from "./report";
import { questionnaire, sectionBand } from "./scoring";
import { sectionColors, sectionStyle } from "./sections";
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
} from "./presentation";

export function WorkSessionView({ report }: { report: FrozenAuditReport }) {
  return (
    <section className="audit-block">
      <h2>Your Clarity Work Session</h2>
      <h3>Turn your diagnosis into action.</h3>
      <p>{workSessionIntro}</p>
      {(["primary", "secondary", "decision"] as const).map((group) => {
        const prompts = workPrompts(report).filter(
          (p) => p.group === group && !p.legacy,
        );
        if (!prompts.length) return null;
        return (
          <div key={group} style={sectionStyle(prompts[0].sectionId)}>
            <h3 className="section-label">
              {group === "primary"
                ? "Work Through Your Primary Constraint"
                : group === "secondary"
                  ? "Supporting constraint"
                  : "Your decision"}
            </h3>
            {prompts.map((prompt) => (
              <div className="work-prompt" key={prompt.id}>
                <p>{prompt.label}</p>
                {prompt.helper && (
                  <p className="text-sm text-gray-600">{prompt.helper}</p>
                )}
                <div className="writing-space" aria-hidden="true">
                  {[0, 1, 2, 3].map((line) => (
                    <div className="writing-line" key={line} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </section>
  );
}
export function AuditReportView({
  report,
  onWorkTogether,
  workTogetherHref = "/services",
  workSession,
  nextMoves,
  metricsImagery,
  aiImagery,
  caseVisuals,
  afterHero,
  systemInteractions,
  companyLogo,
}: {
  report: FrozenAuditReport;
  onWorkTogether?: () => void;
  workTogetherHref?: string;
  workSession?: React.ReactNode;
  nextMoves?: React.ReactNode;
  metricsImagery?: React.ReactNode;
  aiImagery?: React.ReactNode;
  caseVisuals?: CaseVisualAssets;
  afterHero?: React.ReactNode;
  systemInteractions?: MarketingSystemInteraction[];
  companyLogo?: CompanyLogoAsset;
}) {
  const d = report.diagnosis;
  const teaching = caseTeaching(report);
  const confidence = confidencePresentation(report);
  const sectionName = (id?: number) =>
    id ? sectionColors[id as keyof typeof sectionColors].name : undefined;
  return (
    <article className="audit-report" id="marketing-clarity-report">
      <header className="report-cover audit-block concise">
        <p className="report-eyebrow">A Clarity Engine™ Diagnostic</p>
        <h1>Get Clarity Assessment Report</h1>
        <p className="report-intro">
          See what's working. Find what's holding you back. Know what to do
          next.
        </p>
        <div className="prepared-for">
          {companyLogo && (
            <CompanyLogo key={companyLogo.src} asset={companyLogo} />
          )}
          <h2>{report.context.companyName}</h2>
          <p>{report.context.websiteUrl}</p>
          <p>
            Prepared for {report.context.name} ·{" "}
            {new Date(report.createdAt).toLocaleDateString("en-US", {
              timeZone: "America/New_York",
            })}
          </p>
        </div>
      </header>
      {afterHero}
      <MarketingSnapshot report={report} />
      <section className="audit-block concise">
        <h2>Six-part scorecard</h2>
        <div className="score-grid">
          {questionnaire.sections.map((s) => (
            <div
              className="score-card section-card"
              style={sectionStyle(s.id)}
              key={s.id}
            >
              <h3>{s.name}</h3>
              <p className="score-number">
                {Math.round(d.sectionScores[s.id])}
                <span> / 100</span>
              </p>
              <p className="score-band">{sectionBand(d.sectionScores[s.id])}</p>
              <div className="score-track" aria-hidden="true">
                <div style={{ width: `${d.sectionScores[s.id]}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
      <ScoreBandGuide />
      <section className="audit-block concise report-prose">
        <h2>Diagnostic Confidence</h2>
        <p className="confidence-value">
          {d.confidence.level} · {d.confidence.score} / 100
        </p>
        <p>{confidence.explanation}</p>
        {confidence.caveats.length > 0 && (
          <details className="confidence-caveats">
            <summary>Context to verify</summary>
            {confidence.caveats.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </details>
        )}
      </section>
      <div
        className="constraint-grid"
        style={{ gridTemplateColumns: "minmax(0,1fr)" }}
      >
        <ConstraintTeaching report={report} />
        {d.secondary && (
          <section
            className="audit-block concise section-card"
            style={sectionStyle(d.secondary?.sectionId)}
          >
            <p className="report-eyebrow">Supporting constraint</p>
            <h2>
              {sectionName(d.secondary?.sectionId) ??
                "No meaningful secondary constraint indicated"}
            </h2>
            {d.secondary && <p>{supportingSequence(report)?.intro}</p>}
          </section>
        )}
      </div>
      {d.relativeStrength && (
        <section
          className="audit-block concise section-card"
          style={sectionStyle(d.relativeStrength)}
        >
          <p className="report-eyebrow">Relative Strength</p>
          <h2>{sectionName(d.relativeStrength)}</h2>
          <p>Build on this strength while addressing the constraint.</p>
        </section>
      )}
      <MarketingSystemInteractions items={systemInteractions} />
      <section
        className="audit-block"
        style={sectionStyle(d.primary?.sectionId)}
      >
        <h2 className="positive-action-heading">Your Next 3 Moves</h2>
        {report.recommendations.length > 0 && (
          <p className="report-prose">
            These are the three actions most likely to improve your primary
            constraint.
          </p>
        )}
        {nextMoves ?? (
          <div className="moves-grid">
            {recommendationsPresentation(report).map((r, i) => (
              <div className="recommendation" key={r.id}>
                <p className="move-number">Move {i + 1}</p>
                <h3>{r.title}</h3>
                <h4>What to do</h4>
                <p>{r.whatToDo}</p>
                <details>
                  <summary>Why this is critical</summary>
                  <p>{recommendationWhyCritical(r)}</p>
                </details>
                <h4>Done when</h4>
                <p>{r.doneWhen}</p>
              </div>
            ))}
          </div>
        )}
        {!report.recommendations.length && (
          <p>
            Your answers do not establish a priority fix. Use the Work Session
            to define the next decision.
          </p>
        )}
      </section>
      <section className="audit-block concise not-yet-module">
        <p className="not-yet-badge">Ⅱ · NOT YET</p>
        <h2>What Not to Prioritize Yet</h2>
        <div className="avoid-grid">
          {report.deprioritized.map((item) => (
            <div className="avoid-card" key={item.action}>
              <h3>{item.action}</h3>
              <p>{item.reason}</p>
            </div>
          ))}
        </div>
      </section>
      {report.caseCard && (
        <section
          className="audit-block real-world"
          style={sectionStyle(d.primary?.sectionId)}
        >
          <h2>What This Looks Like in the Real World</h2>
          <div className="case-module">
            <p className="report-eyebrow">Real-world example</p>
            <h3>{teaching?.title}</h3>
            {teaching?.stages
              .filter(([title]) => title === "How the business makes money")
              .map(([title, copy]) => (
                <div className="case-stage" key={title}>
                  <h4>{title}</h4>
                  <p>{copy}</p>
                </div>
              ))}
            {(d.primary?.sectionId === 1 || caseVisuals) && (
              <CaseVisualComparison
                {...caseVisuals}
                sectionId={d.primary?.sectionId}
              />
            )}
            <div className="case-teaching">
              {teaching?.stages
                .filter(
                  ([title]) =>
                    title !== "What customers were shown" &&
                    title !== "How the business makes money",
                )
                .map(([title, copy]) => (
                  <CaseTeachingCard
                    key={title}
                    title={title}
                    copy={copy}
                    assets={caseVisuals?.assets}
                  />
                ))}
            </div>
            {report.caseCard.id === "CASE_BUSINESS_SYSTEMS_POSITIONING" && (
              <div>
                <h4>Why the improved direction is stronger</h4>
                <ul>
                  <li>
                    It makes the customer outcome clear before listing the
                    tools.
                  </li>
                  <li>It connects the components to one business purpose.</li>
                  <li>
                    It gives buyers a simpler way to understand the offer’s
                    value.
                  </li>
                </ul>
              </div>
            )}
            <div className="strategic-lesson">
              <h4>What to take from this</h4>
              <p>{teaching?.lesson}</p>
            </div>
            <h4>Why this matters for your business</h4>
            <p className="case-relevance">{caseRelevance(report)}</p>
            <p className="evidence-note">
              {report.caseCard.evidence === "C_strategic"
                ? "Strategic example; After describes a direction, with no outcome claim."
                : report.caseCard.evidence === "B_observed"
                  ? "Observed improvement; this example does not establish causality. After describes the intervention."
                  : "Verified intervention; no quantified metric is supplied in this report. After describes the intervention."}
            </p>
          </div>
        </section>
      )}
      <ImprovementEvidence report={report} imagery={metricsImagery} />
      {report.aiAccelerators.length > 0 && (
        <section className="audit-block">
          <h2>Leverage AI More Effectively</h2>
          {aiImagery}
          <p className="report-prose">
            Use AI to accelerate informed thinking, not to replace strategic
            judgment.
          </p>
          {aiPresentation(report).map((ai) => (
            <div className="ai-grid" key={ai.patternId}>
              <div className="ai-card">
                <h3>Gather Fuel for Your AI Tools</h3>
                <p>
                  Better context produces better outputs. Gather the evidence
                  first.
                </p>
                <ul>
                  {ai.gather.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="ai-card">
                <h3>Co-Create With AI</h3>
                <p>{ai.ask}</p>
              </div>
              <div className="ai-card">
                <h3>Validate Ideas & Accelerate Execution</h3>
                <p>{ai.use}</p>
              </div>
            </div>
          ))}
        </section>
      )}
      <section
        className="audit-block"
        style={sectionStyle(d.primary?.sectionId)}
      >
        <h2>Your 30-Day Clarity Plan</h2>
        <div className="plan-setup">
          <h3>Put your plan where you can see it</h3>
          <p>
            Pro tip: Download your Get Clarity Assessment Report and cut out these
            four weekly focus cards. Keep one on your desk each week so the
            priorities most likely to move your business forward stay visible
            while you work.
          </p>
        </div>
        <div className="plan-grid">
          {reportPlan(report).map((week) => (
            <div className="plan-card" key={week.week}>
              <p className="report-eyebrow">Week {week.week}</p>
              <h3>{week.title}</h3>
              <h4>Objective</h4>
              <p>{week.objective}</p>
              <h4>Specific Actions</h4>
              <ul>
                {week.actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
              <h4>Done When / Deliverable</h4>
              <p>{week.completionCriteria}</p>
            </div>
          ))}
        </div>
      </section>
      {supportingSequence(report) && (
        <section className="audit-block concise">
          <h2>What comes next</h2>
          <p>{supportingSequence(report)?.next}</p>
        </section>
      )}
      {workSession ?? <WorkSessionView report={report} />}
      <section className="audit-block concise report-prose">
        <h2>Continue Working on Your Business</h2>
        <p>
          This report is designed for independent action. Clarity Engine can
          also provide deeper strategy, audits, paid media and growth work, or
          ongoing support where there is a fit.
        </p>
        <a
          href={workTogetherHref}
          onClick={onWorkTogether}
          className="audit-cta"
        >
          Explore Ways to Work Together
        </a>
      </section>
    </article>
  );
}

export interface CaseVisualAssets {
  assets?: CaseAssetMap;
  sectionId?: number;
  beforeImage?: { src: string; alt: string };
  afterImage?: { src: string; alt: string };
  beforeCaption?: string;
  afterCaption?: string;
  blurBefore?: boolean;
  blurAfter?: boolean;
  redactedBefore?: boolean;
  redactedAfter?: boolean;
  reconstructedExample?: boolean;
}
export function CaseVisualComparison(assets: CaseVisualAssets) {
  const before =
    assets.assets?.[caseAssetIds.offer.before] ?? assets.beforeImage;
  const after = assets.assets?.[caseAssetIds.offer.after] ?? assets.afterImage;
  const comparisonId =
    assets.sectionId && assets.sectionId !== 1
      ? categoryCaseAsset[assets.sectionId]
      : caseAssetIds.offer.comparison;
  const comparison = assets.assets?.[comparisonId];
  const hasImages = Boolean(before || after || comparison);
  return (
    <div className="case-visual-comparison">
      <h4>What customers were shown</h4>
      {hasImages ? (
        <>
          {assets.reconstructedExample && (
            <p className="evidence-note">
              Reconstructed example based on the real engagement
            </p>
          )}
          {comparison && (
            <CaseAssetImage asset={comparison} assetId={comparisonId} />
          )}
          <div className="case-visual-grid">
            {(["before", "after"] as const).map((side) => {
              const image = side === "before" ? before : after;
              if (!image) return null;
              const blur =
                (image as CaseAsset).blur ??
                (side === "before" ? assets.blurBefore : assets.blurAfter);
              const redacted =
                (image as CaseAsset).redacted ??
                (side === "before"
                  ? assets.redactedBefore
                  : assets.redactedAfter);
              const caption =
                (image as CaseAsset).caption ??
                (side === "before"
                  ? assets.beforeCaption
                  : assets.afterCaption);
              return (
                <figure
                  key={side}
                  data-asset-id={
                    side === "before"
                      ? caseAssetIds.offer.before
                      : caseAssetIds.offer.after
                  }
                >
                  <h4>{side === "before" ? "Before" : "Improved direction"}</h4>
                  {redacted ? (
                    <div className="case-visual-placeholder">
                      Visual withheld for privacy
                    </div>
                  ) : (
                    <img
                      src={image.src}
                      alt={
                        blur ? "Offer visual blurred for privacy" : image.alt
                      }
                      style={blur ? { filter: "blur(8px)" } : undefined}
                      loading="lazy"
                    />
                  )}
                  {caption && <figcaption>{caption}</figcaption>}
                </figure>
              );
            })}
          </div>
        </>
      ) : (
        <p className="case-visual-placeholder" data-asset-id={comparisonId}>
          Visual before/after example coming soon. The original presentation is
          not shown here.
        </p>
      )}
    </div>
  );
}

export function CaseAssetImage({
  asset,
  assetId,
}: {
  asset: CaseAsset;
  assetId: CaseAssetId;
}) {
  return (
    <figure data-asset-id={assetId}>
      {asset.redacted ? (
        <div className="case-visual-placeholder">
          Visual withheld for privacy
        </div>
      ) : (
        <img
          src={asset.src}
          alt={asset.blur ? "Case visual blurred for privacy" : asset.alt}
          style={asset.blur ? { filter: "blur(8px)" } : undefined}
          loading="lazy"
        />
      )}
      {asset.caption && <figcaption>{asset.caption}</figcaption>}
    </figure>
  );
}
export function CaseTeachingCard({
  title,
  copy,
  assets,
}: {
  title: string;
  copy: string;
  assets?: CaseAssetMap;
}) {
  const problem = title === "The problem";
  const value = title === "What customers actually cared about";
  const assetId = problem
    ? caseAssetIds.offer.problem
    : value
      ? caseAssetIds.offer.customerValue
      : undefined;
  const custom = assetId && assets?.[assetId];
  return (
    <div
      className={`case-stage${problem ? " case-problem" : value ? " case-customer-value" : ""}`}
    >
      <h4>
        {assetId && (
          <span
            className="case-semantic-icon"
            data-asset-id={assetId}
            aria-hidden="true"
          >
            {custom && !custom.redacted ? (
              <img
                src={custom.src}
                alt=""
                style={custom.blur ? { filter: "blur(8px)" } : undefined}
              />
            ) : (
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {problem ? (
                  <>
                    <circle cx="12" cy="12" r="9" />
                    <path d="m9 9 6 6m0-6-6 6" />
                  </>
                ) : (
                  <>
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="12" cy="12" r="1" fill="currentColor" />
                  </>
                )}
              </svg>
            )}
          </span>
        )}
        {title}
      </h4>
      <p>{copy}</p>
    </div>
  );
}
