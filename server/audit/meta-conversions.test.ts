import { test } from 'node:test';
import assert from 'node:assert/strict';
import { signMetaPurchase, verifyMetaPurchase, metaPurchasePayload, sendMetaPurchase } from './meta-conversions';
import { PostgresAuditStore } from './store';
const secret='isolated-test-proof-key-long-enough';
const receipt={transaction_id:'ce_'+'a'.repeat(64),value:3725,items:[{item_id:'deep-dive-growth-audit'}]};
test('only intact, unexpired server-signed purchase proofs are accepted',()=>{
  const signed=signMetaPurchase(receipt,secret,1000)!;
  assert.equal(verifyMetaPurchase(signed,secret,1100)?.value,3725);
  assert.equal(verifyMetaPurchase(signed,secret,4601),null);
  assert.equal(verifyMetaPurchase(signed,'wrong-key',1100),null);
  assert.equal(verifyMetaPurchase(signed+'x',secret,1100),null);
  for (const value of [1, 0, 13.50]) {
    const discounted = {...receipt, value, items:[{item_id:'clarity-assessment'}]};
    const proof = verifyMetaPurchase(signMetaPurchase(discounted,secret,1000)!,secret,1100)!;
    assert.equal(metaPurchasePayload(proof,{fbp:'fb.1.1793562000000.12345',agent:'test'}).custom_data.value,value);
  }
  for (const value of [-1,NaN,Infinity]) assert.equal(signMetaPurchase({...receipt,value},secret),undefined);
  assert.equal(signMetaPurchase({...receipt,items:[{item_id:'unknown'}]},secret),undefined);
  const [payload,sig]=signed.split('.');
  const altered=JSON.parse(Buffer.from(payload,'base64url').toString());altered.value=1;
  assert.equal(verifyMetaPurchase(Buffer.from(JSON.stringify(altered)).toString('base64url')+'.'+sig,secret,1100),null);
});
test('Meta receives only verified product/value, public URL, cookie identifiers and browser agent',async()=>{
  const proof=verifyMetaPurchase(signMetaPurchase(receipt,secret,1000)!,secret,1100)!;
  const user={fbp:'fb.1.1793562000000.12345',agent:'test-browser'};
  const payload=metaPurchasePayload(proof,user);
  assert.equal(payload.custom_data.value,3725);
  assert.equal(payload.event_source_url,'https://www.clarity-engine.org/growth-clarity-audit');
  assert.deepEqual(Object.keys(payload.user_data).sort(),['client_user_agent','fbp']);
  let calls=0;
  await sendMetaPurchase(proof,user,'test-token',(async(url,options)=>{
    calls++;assert.equal(String(url).includes('test-token'),false);
    assert.equal(JSON.stringify(JSON.parse(options!.body as string)).includes('meta_proof'),false);
    return new Response(JSON.stringify({events_received:1}),{status:200});
  }) as typeof fetch);
  assert.equal(calls,1);
  await assert.rejects(sendMetaPurchase(proof,user,'test-token',(async()=>new Response(JSON.stringify({events_received:0}),{status:200})) as typeof fetch));
});
test('purchase delivery stores success only after Meta accepts and skips repeat requests',async()=>{
  const saved=new Set<string>();let staged:string|undefined;let delivered=0;
  const query=async(sql:string,args?:unknown[])=>{
    if(sql.startsWith('SELECT event_id'))return {rows:saved.has(String(args?.[0]))?[{event_id:args?.[0]}]:[],rowCount:0};
    if(sql.startsWith('INSERT'))staged=String(args?.[0]);
    if(sql==='COMMIT' && staged){saved.add(staged);staged=undefined;}
    if(sql==='ROLLBACK')staged=undefined;
    return {rows:[],rowCount:0};
  };
  const store=new PostgresAuditStore('unused',{query,connect:async()=>({query,release(){}})});
  await assert.rejects(store.metaPurchaseOnce(receipt.transaction_id,async()=>{throw new Error('network');}));
  assert.equal(saved.size,0);
  await store.metaPurchaseOnce(receipt.transaction_id,async()=>{delivered++;});
  await store.metaPurchaseOnce(receipt.transaction_id,async()=>{delivered++;});
  assert.equal(delivered,1);assert.equal(saved.size,1);
});
