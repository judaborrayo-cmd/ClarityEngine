import test from 'node:test';
import assert from 'node:assert/strict';
import {cleanPurchaseAttribution} from './purchase-attribution';
import {HubSpotPurchases,websitePurchase} from './hubspot-purchases';
import type Stripe from 'stripe';
const fields={ce_utm_source:'google',ce_utm_medium:'cpc',ce_utm_campaign:'assessment_launch',ce_submission_page:'https://www.clarity-engine.org/marketing-clarity-assesment',ce_first_attribution:'',ce_latest_attribution:JSON.stringify({at:'2026-11-01T23:00:00Z',landing:'https://www.clarity-engine.org/',referrer:'',parameters:{utm_source:'google',utm_medium:'cpc',utm_campaign:'assessment_launch'}})};
test('only allowlisted attribution is accepted; empty consent and personal/query data are excluded',()=>{
 assert.deepEqual(cleanPurchaseAttribution(fields),fields);
 for(const patch of [{ce_latest_attribution:''},{ce_utm_source:'buyer@example.com'},{ce_submission_page:'https://www.clarity-engine.org/audit/resume/private'},{ce_submission_page:'https://www.clarity-engine.org/?email=private'},{extra:'unexpected'},{ce_latest_attribution:JSON.stringify({at:'2026-11-01',landing:'https://www.clarity-engine.org/',referrer:'',parameters:{email:'private'}})}]) assert.equal(cleanPurchaseAttribution({...fields,...patch}),undefined);
});
test('confirmed purchase carries attribution reference and preserves campaign on deal with assessment category',async()=>{
 const s={id:'cs_live_test',client_reference_id:'ce_attr_abcdefghijklmnopqrstuv',livemode:true,payment_status:'paid',status:'complete',mode:'payment',currency:'usd',amount_total:100,metadata:{product:'marketing-clarity-audit'},customer_details:{email:'owner@example.com'},line_items:{data:[{quantity:1,price:{id:'price_test'}}]}} as unknown as Stripe.Checkout.Session;
 const p=websitePurchase(s,'price_test',Date.now())!;
 assert.equal(p.attributionReference,s.client_reference_id);p.attribution=fields;
 const writes:any[]=[];
 const crm=new HubSpotPurchases('fixture',async(_url,init)=>{const body=init?.body?JSON.parse(String(init.body)):null;writes.push(body);return new Response(JSON.stringify(init?.method==='GET'?{id:'1',properties:{ce_products_purchased:'strategy_sprint'}}:String(_url).includes('batch/upsert')?{results:[{id:'2'}]}:{}));});
 await crm.sync(p);
 assert.equal(writes[1].properties.ce_products_purchased,'strategy_sprint;assessment');
 assert.equal(writes[1].properties.ce_utm_campaign,'assessment_launch');
 assert.match(writes[2].inputs[0].properties.description,/assessment_launch/);
 assert.equal(writes[2].inputs[0].properties.amount,'1');
});
