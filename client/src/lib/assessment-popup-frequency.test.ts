import { test } from 'node:test';
import assert from 'node:assert/strict';
import { reserveAssessmentPopupView } from './assessment-popup-frequency';
function session() {
 const values = new Map<string,string>();
 return { getItem: (key:string) => values.get(key) ?? null, setItem: (key:string,value:string) => { values.set(key,value); } };
}
test('limits a shared session to two appearances across remounts or reloads',()=>{
 const storage=session();
 assert.equal(reserveAssessmentPopupView(storage),true);
 assert.equal(reserveAssessmentPopupView(storage),true);
 for(let i=0;i<5;i++) assert.equal(reserveAssessmentPopupView(storage),false);
 assert.equal(reserveAssessmentPopupView(session()),true);
});
test('blocked storage does not allow uncounted repeated appearances',()=>{
 assert.equal(reserveAssessmentPopupView({getItem:()=>{throw new Error('blocked');},setItem:()=>{}}),false);
 assert.equal(reserveAssessmentPopupView({getItem:()=>null,setItem:()=>{throw new Error('blocked');}}),false);
});
test('invalid counters fail closed',()=>{
 for(const value of ['bad','-1','1.5','Infinity']) assert.equal(reserveAssessmentPopupView({getItem:()=>value,setItem:()=>{}}),false);
});
