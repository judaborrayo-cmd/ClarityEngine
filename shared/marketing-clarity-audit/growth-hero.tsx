import React from "react";
import { CompanyLogo, type CompanyLogoAsset } from "./company-logo-view";
import type { FrozenAuditReport } from "./report";
import { growthRoadmap, reportLanguage } from "./customer-language";
import { sectionStyle } from "./sections";
export function GrowthPath() {
  return <figure className="growth-path" role="img" aria-label="Scattered insights coming together into a clear path. A visual concept, not a forecast of business results.">
    <svg viewBox="0 0 320 130" aria-hidden="true">
      <path d="M35 103 C95 105 95 64 153 67 S239 31 282 28" fill="none" stroke="#DAD2F6" strokeWidth="7" strokeLinecap="round" />
      <path d="M35 103 C95 105 95 64 153 67 S239 31 282 28" fill="none" stroke="#5541BF" strokeWidth="3" strokeLinecap="round" />
      {[[35,103],[89,84],[153,67],[214,47],[282,28]].map(([x,y],i) => <circle className={`growth-seed seed-${i}`} key={i} cx={x} cy={y} r="7" fill={i === 4 ? "#145C43" : "#5541BF"} stroke="white" strokeWidth="3" />)}
      <path d="m271 21 13 7-8 13" fill="none" stroke="#145C43" strokeWidth="3" strokeLinecap="round" />
    </svg>
    <figcaption>Clearer thinking. A more focused next step.</figcaption>
  </figure>;
}
export function GrowthReportHero({ report, companyLogo }: { report: FrozenAuditReport; companyLogo?: CompanyLogoAsset }) {
  const road = growthRoadmap(report);
  return <header className="report-cover growth-report-hero" style={sectionStyle(road.primaryId)}>
    <div className="growth-hero-heading">
      <div><p className="report-eyebrow">{reportLanguage.branding}</p><h1>{reportLanguage.title}</h1><p className="growth-company">For {report.context.companyName}</p></div>
      <GrowthPath />
    </div>
    <p className="growth-basis">Based on your 35 assessment responses. Recommended priorities follow the diagnosis, not simply the lowest score.</p>
    <div className="growth-roadmap">
      <section className="growth-first"><p className="report-eyebrow">{reportLanguage.primary}</p><h2>{road.primaryName}</h2><p>{road.explanation}</p><p className="growth-start"><strong>Start here: </strong><a href="#first-growth-moves">{road.startTitle ?? "Check the evidence in your Work Session"}</a></p><details><summary>Why this comes first and how to start</summary><p>{road.why}</p><p>The First 3 Moves below give you the actions, reasons, and completion checks for putting this priority to work.</p></details></section>
      <div className="growth-roadmap-companion">
        <section style={sectionStyle(road.strengthId)}><p className="report-eyebrow">{reportLanguage.strength}</p>{road.strengthName && <h2>{road.strengthName}</h2>}<p>{road.strength}</p></section>
        {road.nextName && <section style={sectionStyle(road.nextId)}><p className="report-eyebrow">{reportLanguage.secondary}</p><h2>{road.nextTitle}</h2><p>{road.next}</p></section>}
      </div>
    </div>
    {road.precedence && <details className="growth-precedence"><summary>{road.precedence.title}</summary><p>{road.precedence.copy}</p></details>}
    <details className="growth-prepared"><summary>Prepared for {report.context.name} · {new Date(report.createdAt).toLocaleDateString("en-US", { timeZone: "America/New_York" })}</summary><p>{report.context.websiteUrl}</p>{companyLogo && <CompanyLogo key={companyLogo.src} asset={companyLogo} />}</details>
  </header>;
}
