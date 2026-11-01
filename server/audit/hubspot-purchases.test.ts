import test from 'node:test';
import assert from 'node:assert/strict';
import type Stripe from 'stripe';
import { websitePurchase, HubSpotPurchases, type CrmPurchase } from './hubspot-purchases';
const paidAt = Date.UTC(2026,10,1,18);
const session = { id:'cs_live_fixture', livemode:true, payment_status:'paid', status:'complete', mode:'payment', currency:'usd', amount_total:2700, metadata:{product:'marketing-clarity-audit'}, customer_details:{email:'Buyer@Example.com'}, line_items:{data:[{quantity:1,price:{id:'price_assessment'}}]} } as unknown as Stripe.Checkout.Session;
test('only paid live website offers become CRM purchases; unrelated sales and unpaid sessions are excluded',()=>{
  assert.equal(websitePurchase(session,'price_assessment',paidAt)?.product,'assessment');
  for(const patch of [{livemode:false},{payment_status:'unpaid'},{status:'open'},{mode:'subscription'},{currency:'eur'},{metadata:{}},{line_items:{data:[]}}]) assert.equal(websitePurchase({...session,...patch} as Stripe.Checkout.Session,'price_assessment',paidAt),null);
  const deep = {...session,metadata:{},payment_link:'plink_1UQE5yF2Vf3NGmY3we6iSUab',amount_total:372500,line_items:{data:[{quantity:1,price:{id:'price_1UQE5mF2Vf3NGmY3417ombIk'}}]}} as unknown as Stripe.Checkout.Session;
  assert.equal(websitePurchase(deep,'price_assessment',paidAt)?.amount,3725);
  assert.equal(websitePurchase({...session,metadata:{},payment_link:'plink_1UPQoSF2Vf3NGmY34kdTmiTC'} as Stripe.Checkout.Session,'price_assessment',paidAt)?.product,'strategy_sprint');
  assert.throws(()=>websitePurchase({...session,customer_details:null},'price_assessment',paidAt),/email/);
});
test('CRM sync preserves existing purchases, newer purchase dates, contact identity and marketing permission',async()=>{
  const requests:{url:string;body:any;method:string}[]=[];
  const fake = async(url:any,init:any)=>{
    requests.push({url:String(url),body:init.body?JSON.parse(init.body):null,method:init.method});
    const data = init.method==='GET' ? {id:'123',properties:{ce_products_purchased:'strategy_sprint',ce_last_purchase_date:'2026-11-03'}} : String(url).endsWith('/batch/upsert') ? {results:[{id:'456'}]} : {};
    return new Response(JSON.stringify(data),{status:200});
  };
  const crm = new HubSpotPurchases('test-only-token',fake as typeof fetch);
  const purchase=websitePurchase(session,'price_assessment',paidAt)!;
  assert.deepEqual(await crm.sync(purchase),{contactId:'123',dealId:'456'});
  assert.deepEqual(requests[1].body.properties,{ce_products_purchased:'strategy_sprint;assessment',ce_last_purchase_date:String(Date.UTC(2026,10,3))});
  const upsert=requests[2].body.inputs[0];
  assert.equal(upsert.idProperty,'ce_stripe_checkout_id'); assert.equal(upsert.id,purchase.checkoutId);
  assert.equal(upsert.properties.amount,'27'); assert.equal(upsert.properties.dealstage,'closedwon');
  assert.match(requests[3].url,/deals\/456\/associations\/contacts\/123\/3$/);
  assert.ok(requests.every(r=>!JSON.stringify(r.body).includes('lifecyclestage')&&!JSON.stringify(r.body).includes('subscription')));
});
test('HubSpot errors stop processing and exclude response bodies from error messages',async()=>{
  const crm = new HubSpotPurchases('test-only-token',async()=>new Response('private customer data',{status:429}));
  await assert.rejects(crm.sync(websitePurchase(session,'price_assessment',paidAt)!),/^Error: HubSpot request failed \(429\)$/);
});
