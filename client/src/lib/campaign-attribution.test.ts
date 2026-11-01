import {test} from 'node:test';
import assert from 'node:assert/strict';
import {attributionKey,captureAttribution,campaignParameters} from './campaign-attribution';
function memory(){const data=new Map<string,string>();return {getItem:(k:string)=>data.get(k)||null,setItem:(k:string,v:string)=>data.set(k,v),removeItem:(k:string)=>data.delete(k)} as Storage;}
test('persists first/latest campaign across navigation, strips sensitive query and honors expiry',()=>{
 const s=memory(), base='https://www.clarity-engine.org';
 const a=captureAttribution(new URL(base+'/?utm_source=google&utm_campaign=launch&gclid=click-123&email=private@example.com'),'https://google.com/search?q=private',true,true,s,1000)!;
 assert.equal(a.first.referrer,'https://google.com/'); assert.equal(a.first.landing,base+'/');
 assert.equal(a.first.parameters.email,undefined);
 const b=captureAttribution(new URL(base+'/about'),' ',true,true,s,2000)!; assert.deepEqual(b,a);
 const c=captureAttribution(new URL(base+'/about?utm_source=meta&utm_campaign=second'),' ',true,true,s,3000)!;
 assert.equal(c.first.parameters.utm_source,'google'); assert.equal(c.latest.parameters.utm_source,'meta');
 const d=captureAttribution(new URL(base+'/about'),' ',true,false,s,4000)!;assert.equal(d.first.parameters.gclid,undefined);
 assert.equal(captureAttribution(new URL(base+'/about'),' ',false,false,s,5000),null); assert.equal(s.getItem(attributionKey),null);
 captureAttribution(new URL(base+'/?utm_source=old'),' ',true,true,s,1000);
 const expired=captureAttribution(new URL(base+'/about'),' ',true,true,s,31*86400000)!;assert.deepEqual(expired.first.parameters,{});
});
test('ignores private pages and only admits campaign-safe values',()=>{
 const s=memory();assert.equal(captureAttribution(new URL('https://www.clarity-engine.org/audit/resume/private?utm_source=x'),' ',true,true,s),null);
 assert.deepEqual(campaignParameters('?utm_source=a@b.com&gclid=abc&utm_medium=paid_social',false),{utm_medium:'paid_social'});
});
