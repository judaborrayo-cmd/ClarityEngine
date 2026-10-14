import { test } from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createFrozenReport } from "./report";
import { questionnaire } from "./scoring";
import { growthRoadmap, growthLeverCopy } from "./customer-language";
import { rankedSnapshotLayers } from "./snapshot-stack";
import { AuditReportView } from "./report-view";
const context = { name: "Test", email: "test@example.com", companyName: "Test Company", websiteUrl: "https://example.com", businessType: "professional_services", primaryMarketingGoal: "leads" };
test("Stage A projects all six diagnosed opportunities without changing frozen data or instructions", () => {
  for (const id of [1,2,3,4,5,6]) {
    const report = createFrozenReport(Object.fromEntries(questionnaire.questions.map(q => [q.id,q.sectionId === id ? "D" : "A"])),context);
    const before = JSON.stringify(report);
    const road = growthRoadmap(report);
    assert.equal(road.primaryId,report.diagnosis.primary?.sectionId);
    assert.equal(road.nextId,report.diagnosis.secondary?.sectionId);
    const layers = rankedSnapshotLayers(report);
    for (let i=1;i<layers.length;i++) assert.ok(report.diagnosis.sectionScores[layers[i-1].id]>=report.diagnosis.sectionScores[layers[i].id]);
    assert.equal(layers.find(l=>l.state === "primary")?.id,road.primaryId);
    const html=renderToStaticMarkup(React.createElement(AuditReportView,{report}));
    assert.match(html,/Your High Growth Opportunities/);
    assert.doesNotMatch(html,/What Not to Prioritize Yet|strongest indicated constraint|Relative Strength/);
    assert.equal(JSON.stringify(report),before);
  }
});
test("all four score bands have distinct, evidence-aware wording for each area",()=>{
  for(const id of [1,2,3,4,5,6]) {
    const variants=[100,70,50,20].map(score=>growthLeverCopy(id,score));
    assert.equal(new Set(variants).size,4);
    assert.ok(variants.every(s=>s.length>20 && !/guaranteed|will increase revenue|conversion rate/.test(s)));
  }
});
test("healthy and foundational reports preserve absence of support and precedence over numerical rank",()=>{
  const healthy=createFrozenReport(Object.fromEntries(questionnaire.questions.map(q=>[q.id,"A"])),context);
  assert.equal(growthRoadmap(healthy).primaryId,undefined);
  assert.equal(growthRoadmap(healthy).next,undefined);
  const overrides={ T1:"D",T2:"D",T3:"C",T4:"D",T5:"C",T6:"C",ML1:"B",ML2:"C",ML3:"C",ML4:"D",ML5:"C",ML6:"B" };
  const report=createFrozenReport({...Object.fromEntries(questionnaire.questions.map(q=>[q.id,"A"])),...overrides},context);
  const before=JSON.stringify(report),road=growthRoadmap(report);
  assert.equal(road.primaryId,6);
  assert.ok(report.diagnosis.sectionScores[5]<report.diagnosis.sectionScores[6]);
  assert.ok(road.precedence);
  assert.equal(rankedSnapshotLayers(report).find(l=>l.state==="primary")?.id,6);
  assert.equal(road.nextId,report.diagnosis.secondary?.sectionId);
  assert.equal(JSON.stringify(report),before);
});

test('supporting copy explains distinct relationships and follows selected evidence without mutation', async () => {
  const { supportingOpportunity, reportLanguage } = await import('./customer-language');
  const base=createFrozenReport(Object.fromEntries(questionnaire.questions.map(q=>[q.id,'A'])),context);
  const explanations=new Set<string>();
  for(const first of [1,2,3,4,5,6]) for(const next of [1,2,3,4,5,6]){
    if(first===next)continue;
    const report=structuredClone(base);
    report.diagnosis.primary={sectionId:first as 1|2|3|4|5|6};
    report.diagnosis.secondary={sectionId:next as 1|2|3|4|5|6};
    const frozen=JSON.stringify(report);const copy=supportingOpportunity(report)!;
    assert.ok(copy.title && copy.explanation);explanations.add(copy.explanation);
    assert.equal(JSON.stringify(report),frozen);
  }
  assert.equal(explanations.size,30);
  const offer=structuredClone(base);
  offer.diagnosis.primary={sectionId:1,pattern:{id:'P02',sectionId:1,evidenceIds:[]}};
  offer.diagnosis.secondary={sectionId:2,pattern:{id:'P04',sectionId:2,evidenceIds:[]}};
  assert.match(supportingOpportunity(offer)!.explanation,/clearer wording alone isn't demand evidence/);
  assert.match(supportingOpportunity(offer)!.explanation,/customer fit as well as lead volume/);
  offer.diagnosis.secondary=undefined;
  assert.equal(supportingOpportunity(offer),undefined);
  assert.match(growthRoadmap(offer).explanation,/One clear priority/);
  assert.equal(reportLanguage.movesLead,'Three moves. One clear priority.');
});
