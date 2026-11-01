import {test} from 'node:test';
import assert from 'node:assert/strict';
import {rememberInquiry,reportInquiry,inquiryReceiptKey,readInquiryReceipt} from './inquiry';
test('thank-you visits require a receipt; consent gates each destination and refresh is deduplicated',()=>{
 const values=new Map<string,string>();const receipts=new Map<string,string>();const meta:any[]=[];const w:any={fbq:(...args:any[])=>meta.push(args)};
 Object.assign(globalThis,{window:w,location:{hostname:'www.clarity-engine.org',pathname:'/inquiry/thank-you',search:'',hash:''},localStorage:{getItem:(k:string)=>values.get(k)},sessionStorage:{getItem:(k:string)=>receipts.get(k),setItem:(k:string,v:string)=>receipts.set(k,v)},document:{referrer:'https://www.clarity-engine.org/about',createElement:()=>({}),head:{appendChild(){}}}});
 reportInquiry();assert.equal(w.dataLayer,undefined);
 rememberInquiry('test-conversion-123');reportInquiry();assert.equal(w.dataLayer,undefined);assert.equal(meta.length,0);
 values.set('ce-analytics-consent-v2','granted');reportInquiry();reportInquiry();
 assert.equal(w.dataLayer.filter((e:any)=>e.ce_event_name==='generate_lead').length,1);assert.equal(meta.length,0);
 values.set('ce-meta-consent-v1','granted');reportInquiry();reportInquiry();
 assert.equal(meta.filter(e=>e[0]==='track'&&e[1]==='Lead').length,1);
 rememberInquiry('test-conversion-123');reportInquiry();assert.equal(meta.filter(e=>e[1]==='Lead').length,1);
 assert.equal(w.dataLayer.filter((e:any)=>e.ce_event_name==='purchase').length,0);
 receipts.set(inquiryReceiptKey,JSON.stringify({id:'expired-receipt',at:Date.now()-1800001}));assert.equal(readInquiryReceipt(),null);
});
