import {test} from 'node:test';
import assert from 'node:assert/strict';
import {queueMetaPurchase} from './meta-conversions';

test('Meta purchase delivery requires advertising consent, excludes private context, and deduplicates', async () => {
  const values=new Map<string,string>();
  const events=new EventTarget();
  const requests:{url:string,body:any}[]=[];
  Object.assign(globalThis,{
    window:events,
    location:{hostname:'www.clarity-engine.org',pathname:'/audit/results/private-token'},
    document:{cookie:'_fbp=fb.1.1793565000000.1234567890'},
    localStorage:{getItem:(k:string)=>values.get(k)??null,setItem:(k:string,v:string)=>values.set(k,v)},
    fetch:async(url:string,options:any)=>{requests.push({url,body:JSON.parse(options.body)});return {ok:true};},
  });
  const receipt={transaction_id:'ce_'+'a'.repeat(64),currency:'USD' as const,value:3725,items:[{item_id:'deep-dive-growth-audit',item_name:'Deep Dive Growth Audit',price:3725,quantity:1}],meta_proof:'server-signed-proof'};
  queueMetaPurchase(receipt);
  await new Promise(resolve=>setImmediate(resolve));
  assert.equal(requests.length,0);
  values.set('ce-meta-consent-v1','granted');
  events.dispatchEvent(new Event('ce-advertising-consent-change'));
  await new Promise(resolve=>setImmediate(resolve));
  assert.deepEqual(requests,[{url:'/api/audit/meta-purchase',body:{proof:'server-signed-proof',consent:true,fbp:'fb.1.1793565000000.1234567890'}}]);
  queueMetaPurchase(receipt);
  await new Promise(resolve=>setImmediate(resolve));
  assert.equal(requests.length,1);
  values.set('ce-meta-consent-v1','denied');
  queueMetaPurchase({...receipt,transaction_id:'ce_'+'b'.repeat(64)});
  events.dispatchEvent(new Event('ce-advertising-consent-change'));
  values.set('ce-meta-consent-v1','granted');
  events.dispatchEvent(new Event('ce-advertising-consent-change'));
  await new Promise(resolve=>setImmediate(resolve));
  assert.equal(requests.length,1);
});
