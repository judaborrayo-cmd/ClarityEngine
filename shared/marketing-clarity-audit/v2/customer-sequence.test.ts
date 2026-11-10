import {test} from 'node:test';
import assert from 'node:assert/strict';
import {scenarios} from './scenarios';
import {customerSteps,completedStepValues} from './customer-sequence';
import {requiredSetupFields} from './questionnaire';
import {diagnosticLayers} from '../clarity-stack';
test('46 mandatory steps stay in the original six pillars, with paid-media questions inside Traffic',()=>{
 for(const scenario of scenarios){const steps=customerSteps(scenario.draft.setup);assert.equal(steps.length,46);assert.equal(new Set(steps.map(s=>s.key)).size,46);assert.deepEqual([...new Set(steps.map(s=>s.sectionId))],[1,2,3,4,5,6]);assert.deepEqual(steps.filter(s=>s.field).map(s=>s.field),[...requiredSetupFields]);assert.ok(steps.filter(s=>s.field).every(s=>s.sectionId===5));assert.equal(steps.filter(s=>s.question).length,39);}
});
test('shared pillar stack counts every version-specific answer and does not complete Traffic early',()=>{
 const draft=scenarios[0].draft,steps=customerSteps(draft.setup),questions=steps.map(s=>({id:s.key,sectionId:s.sectionId}));
 const complete=completedStepValues(draft.setup,draft.answers);assert.ok(diagnosticLayers(complete,undefined,questions).every(l=>l.completed));
 const partial={...complete};delete partial['setup-owner'];assert.equal(diagnosticLayers(partial,undefined,questions)[4].completed,false);
});
