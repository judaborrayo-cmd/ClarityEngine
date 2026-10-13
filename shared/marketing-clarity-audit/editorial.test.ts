import {test} from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import content from './report-content.json';
import {createFrozenReport,commitmentMismatch} from './report';
import {questionnaire} from './scoring';
import {recommendationsPresentation,reportPlan,workPrompts,recommendationWhyCritical} from './presentation';
import {recommendationEditorial} from './recommendation-editorial';
import {opportunityDepth,closingTransition,caseReasoning,caseTitles} from './editorial-narrative';
import {growthRoadmap,customerCaseStory} from './customer-language';
import {AuditReportView} from './report-view';
const context={name:'QA',email:'qa@example.com',companyName:'Editorial QA',websiteUrl:'https://example.com',businessType:'professional_services',primaryMarketingGoal:'leads'};
const norm=(s:string)=>s.toLowerCase().replace(/[^a-z0-9 ]/g,'').replace(/\s+/g,' ').trim();
const base=()=>createFrozenReport(Object.fromEntries(questionnaire.questions.map(q=>[q.id,q.sectionId===1?'D':'A'])),context);
test('all library and neutral actions have distinct rationales and observable criteria, preserving action identity',()=>{
 const actions=[...content.recommendations,...commitmentMismatch.actions];assert.equal(actions.length,51);
 for(const action of actions){
  const copy=recommendationEditorial[action.id];assert.ok(copy,action.id);
  assert.ok(copy.whyCritical.length>65 && copy.doneWhen.length>30,action.id);
  assert.ok(!norm(copy.whyCritical).includes(norm(action.whatToDo)),action.id);
  assert.doesNotMatch(copy.whyCritical,/This action helps you|guaranteed|will increase revenue/i);
  const report=base();report.recommendations=[{...action,why:'original',doneWhen:'original'}];const frozen=JSON.stringify(report);
  const [shown]=recommendationsPresentation(report);assert.equal(shown.id,action.id);assert.equal(shown.title,action.title);assert.equal(shown.whatToDo,action.whatToDo);
  assert.equal(recommendationWhyCritical(shown),copy.whyCritical);assert.equal(JSON.stringify(report),frozen);
 }
});
test('every pattern has a four-week evidence/decision/implementation/review sequence, never copied recommendation bodies',()=>{
 const followThrough=new Set<string>();
 for(const pattern of content.patterns){
  const report=base();const id=pattern.id;const sectionId=(id==='P10'?1:id==='P15'?4:Number(id.slice(1))<=2?1:Number(id.slice(1))<=4?2:Number(id.slice(1))<=7?3:Number(id.slice(1))<=9?4:Number(id.slice(1))<=13?5:6) as 1|2|3|4|5|6;
  report.diagnosis.primary={sectionId,pattern:{id,sectionId,evidenceIds:[]}};const frozen=JSON.stringify(report);const weeks=reportPlan(report);
  assert.deepEqual(weeks.map(w=>w.week),[1,2,3,4]);assert.equal(new Set(weeks.map(w=>w.objective)).size,4);assert.equal(new Set(weeks.map(w=>w.completionCriteria)).size,4);
  for(const w of weeks){assert.ok(!w.actions.includes(w.objective));assert.doesNotMatch([w.objective,...w.actions,w.completionCriteria].join(' '),/diagnostic's baseline task|diagnosed constraint|Complete the learning task|bounded implementation brief|Use Your First 3 Moves to set the work order|Use the selected moves as your implementation checklist/);if(id!=='P01')followThrough.add(w.actions[1]);}
  if(id!=='P01')for(const r of report.recommendations)assert.ok(!weeks[2].actions.includes(r.whatToDo));
  assert.equal(JSON.stringify(report),frozen);
 }
 assert.equal(followThrough.size,56,'Each pattern and week needs its own concrete follow-through step.');
});
test('all ten examples distinguish evidence-based reasoning from the takeaway and avoid invented monetization',()=>{
 for(const card of content.cases){const report=base();report.caseCard=card;const frozen=JSON.stringify(report);const story=customerCaseStory(report)!;
  assert.ok(caseReasoning[card.id] && caseTitles[card.id]);assert.notEqual(story.stages[5][1],story.lesson);
  assert.ok(!story.stages.some(([heading])=>heading==='How does it make money?'));assert.equal(JSON.stringify(report),frozen);
 }
});
test('all six paths have distinct opening/detail/closing, one six-score presentation, and no duplicated long paragraph sentences',()=>{
 for(const id of [1,2,3,4,5,6]){
  const report=createFrozenReport(Object.fromEntries(questionnaire.questions.map(q=>[q.id,q.sectionId===id?'D':'A'])),context);
  const frozen=JSON.stringify(report),prompts=JSON.stringify(workPrompts(report));
  assert.notEqual(opportunityDepth(report),growthRoadmap(report).explanation);assert.notEqual(closingTransition(report),growthRoadmap(report).next);
  const html=renderToStaticMarkup(React.createElement(AuditReportView,{report}));assert.ok(!html.includes('class="score-grid"'));assert.equal((html.match(/data-layer-id=/g)??[]).length,6);
  const seen=new Set<string>();for(const [,p] of html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)){
   const plain=p.replace(/<[^>]*>/g,' ').replace(/&#x27;/g,"'").replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
   for(const sentence of plain.split(/(?<=[.!?])\s+/)){if(sentence.split(/\s+/).length<12)continue;assert.ok(!seen.has(sentence),`section ${id}: ${sentence}`);seen.add(sentence);}
  }
  assert.equal(JSON.stringify(report),frozen);assert.equal(JSON.stringify(workPrompts(report)),prompts);
 }
});
