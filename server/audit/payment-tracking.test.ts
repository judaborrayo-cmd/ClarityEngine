import { test } from 'node:test';
import assert from 'node:assert/strict';
import { StripeAuditPayment } from './payment';

test('Sprint receipts require a live, completed paid session for the exact payment link and amount', async () => {
  const payment = new StripeAuditPayment('sk_test_fake', 'price_assessment', 'whsec_fake');
  const valid = { livemode:true, payment_status:'paid', status:'complete', mode:'payment', currency:'usd', payment_link:'plink_1UPQoSF2Vf3NGmY34kdTmiTC', amount_total:69700, total_details:{ amount_tax:0, amount_shipping:0 } };
  let session:any = valid;
  (payment as any).stripe = {checkout:{sessions:{retrieve:async()=>session}}};
  assert.deepEqual(await payment.sprintReceipt('cs_live_test'),{value:697});
  for (const change of [{livemode:false},{payment_status:'unpaid'},{status:'open'},{mode:'subscription'},{currency:'eur'},{payment_link:'plink_other'},{amount_total:27}]) {
    session={...valid,...change};
    assert.equal(await payment.sprintReceipt('cs_live_test'),null);
  }
});

test('Deep Dive receipts reject unpaid, legacy, altered and test sessions', async () => {
  const payment = new StripeAuditPayment('sk_test_fake', 'price_assessment', 'whsec_fake');
  const valid = { livemode:true, payment_status:'paid', status:'complete', mode:'payment', currency:'usd', payment_link:'plink_1UQE5yF2Vf3NGmY3we6iSUab', amount_total:372500, total_details:{amount_tax:0,amount_shipping:0}, line_items:{data:[{price:{id:'price_1UQE5mF2Vf3NGmY3417ombIk'},quantity:1}]} };
  let session:any = valid;
  (payment as any).stripe = {checkout:{sessions:{retrieve:async()=>session}}};
  assert.deepEqual(await payment.deepDiveReceipt('cs_live_test'),{value:3725});
  for (const change of [{livemode:false},{payment_status:'unpaid'},{status:'open'},{mode:'subscription'},{currency:'eur'},{payment_link:'plink_legacy'},{amount_total:125000},{line_items:{data:[]}},{line_items:{data:[{price:{id:'price_other'},quantity:1}]}},{line_items:{data:[{price:{id:'price_1UQE5mF2Vf3NGmY3417ombIk'},quantity:2}]}}]) {
    session={...valid,...change};
    assert.equal(await payment.deepDiveReceipt('cs_live_test'),null);
  }
});

test('Assessment discounts preserve product and browser ownership checks and report net revenue', async () => {
  const payment = new StripeAuditPayment('sk_test_fake', 'price_assessment', 'whsec_fake');
  const claim = 'a'.repeat(64);
  const valid = {livemode:true,status:'complete',payment_status:'paid',mode:'payment',currency:'usd',amount_total:100,metadata:{product:'marketing-clarity-audit',claimHash:claim},line_items:{data:[{quantity:1,price:{id:'price_assessment'}}]},total_details:{amount_tax:0,amount_shipping:0}};
  let session:any=valid;
  (payment as any).stripe={checkout:{sessions:{retrieve:async()=>session}}};
  assert.equal(await payment.isPaid('cs_live_test',claim),true);
  assert.deepEqual(await payment.assessmentReceipt('cs_live_test',claim),{value:1});
  assert.equal(await payment.assessmentReceipt('cs_live_test','b'.repeat(64)),null);
  for (const change of [{livemode:false},{status:'open'},{payment_status:'unpaid'},{amount_total:null},{amount_total:-1},{metadata:{product:'marketing-clarity-audit'}},{line_items:{data:[{quantity:1,price:{id:'price_other'}}]}},{line_items:{data:[{quantity:2,price:{id:'price_assessment'}}]}}]) {
    session={...valid,...change}; assert.equal(await payment.isPaid('cs_live_test',claim),false);
  }
  session={...valid,amount_total:0,payment_status:'no_payment_required'};
  assert.deepEqual(await payment.assessmentReceipt('cs_live_test',claim),{value:0});
  session={...valid,amount_total:108,total_details:{amount_tax:8,amount_shipping:0}};
  assert.deepEqual(await payment.assessmentReceipt('cs_live_test',claim),{value:1});
});
