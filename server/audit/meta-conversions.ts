import {integrationStaging} from "./integration-staging";
import { createHmac, timingSafeEqual } from 'node:crypto';
import { z } from 'zod';
const offers = {
  'clarity-assessment': { value: 27, name: 'Get Clarity Assessment', path: '/marketing-clarity-assesment' },
  'strategy-sprint': { value: 697, name: '30-Day Growth Strategy Sprint', path: '/strategy-sprint' },
  'deep-dive-growth-audit': { value: 3725, name: 'Deep Dive Growth Audit', path: '/growth-clarity-audit' },
} as const;
const proofSchema = z.object({ id: z.string().regex(/^ce_[a-f0-9]{64}$/), item: z.enum(['clarity-assessment','strategy-sprint','deep-dive-growth-audit']), value:z.number().finite().nonnegative(), time:z.number().int(), expires:z.number().int() }).strict();
export type PurchaseProof = z.infer<typeof proofSchema>;
function signature(payload:string, secret:string) { return createHmac('sha256',secret).update('meta-purchase-v1:'+payload).digest(); }
export function signMetaPurchase(receipt:{transaction_id:string;value:number;items:{item_id:string}[]}, secret:string, now = Math.floor(Date.now()/1000)) {
  const item = receipt.items[0]?.item_id as keyof typeof offers;
  if (receipt.items.length !== 1 || !offers[item] || !Number.isFinite(receipt.value) || receipt.value < 0) return undefined;
  const payload = Buffer.from(JSON.stringify({id:receipt.transaction_id,item,value:receipt.value,time:now,expires:now+3600})).toString('base64url');
  return payload+'.'+signature(payload,secret).toString('base64url');
}
export function verifyMetaPurchase(proof:string, secret:string, now = Math.floor(Date.now()/1000)):PurchaseProof|null {
  try {
    const [payload,sig,extra] = proof.split('.');
    if (!payload || !sig || extra) return null;
    const provided = Buffer.from(sig,'base64url'), expected = signature(payload,secret);
    if (provided.length !== expected.length || !timingSafeEqual(provided,expected)) return null;
    const data = proofSchema.parse(JSON.parse(Buffer.from(payload,'base64url').toString()));
    if (data.expires < now || data.time > now+60 || data.expires-data.time !== 3600) return null;
    return data;
  } catch { return null; }
}
export function metaPurchasePayload(proof:PurchaseProof, user:{fbp:string;fbc?:string;agent:string}) {
  const offer = offers[proof.item];
  return {event_name:'Purchase',event_id:proof.id,event_time:proof.time,action_source:'website',event_source_url:'https://www.clarity-engine.org'+offer.path,
    user_data:{fbp:user.fbp,...(user.fbc?{fbc:user.fbc}:{}),client_user_agent:user.agent},
    custom_data:{currency:'USD',value:proof.value,content_type:'product',content_ids:[proof.item],content_name:offer.name,contents:[{id:proof.item,quantity:1,item_price:proof.value}],num_items:1}};
}
export async function sendMetaPurchase(proof:PurchaseProof,user:{fbp:string;fbc?:string;agent:string},token:string,send:typeof fetch=fetch) {
  const response = await send('https://graph.facebook.com/v26.0/1726701150950329/events', {method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`},body:JSON.stringify({data:[metaPurchasePayload(proof,user)],...(integrationStaging()?{test_event_code:requiredTestCode()}: {})}),signal:AbortSignal.timeout(8000)});
  const result = await response.json() as {events_received?:number};
  if (!response.ok || result.events_received !== 1) throw new Error('Meta purchase delivery failed');
}

function requiredTestCode() { const code=process.env.META_TEST_EVENT_CODE; if(!code)throw new Error("Staging Meta Test Events code required");return code; }

const completionSchema=z.object({id:z.string().regex(/^ce_[a-f0-9]{64}$/),time:z.number().int(),expires:z.number().int()}).strict();
export function signMetaCompletion(id:string,secret:string,now=Math.floor(Date.now()/1000)) {
  const payload=Buffer.from(JSON.stringify({id,time:now,expires:now+3600})).toString('base64url');
  return payload+'.'+createHmac('sha256',secret).update('assessment-completion-v1:'+payload).digest('base64url');
}
export function verifyMetaCompletion(input:string,secret:string,now=Math.floor(Date.now()/1000)) {
  try {const[payload,sig,extra]=input.split('.');if(!payload||!sig||extra)return null;const actual=Buffer.from(sig,'base64url'),expected=createHmac('sha256',secret).update('assessment-completion-v1:'+payload).digest();if(actual.length!==expected.length||!timingSafeEqual(actual,expected))return null;const p=completionSchema.parse(JSON.parse(Buffer.from(payload,'base64url').toString()));return p.expires>=now&&p.time<=now+60&&p.expires-p.time===3600?p:null;}catch{return null;}
}
export function metaCompletionPayload(p:z.infer<typeof completionSchema>,user:{fbp:string;fbc?:string;agent:string}) {
  return {event_name:'AssessmentComplete',event_id:p.id,event_time:p.time,action_source:'website',event_source_url:'https://www.clarity-engine.org/marketing-clarity-assesment',user_data:{fbp:user.fbp,...(user.fbc?{fbc:user.fbc}:{}),client_user_agent:user.agent},custom_data:{content_ids:['clarity-assessment'],content_name:'Get Clarity Assessment'}};
}
export async function sendMetaCompletion(p:z.infer<typeof completionSchema>,user:{fbp:string;fbc?:string;agent:string},token:string,send:typeof fetch=fetch) {
 const response=await send('https://graph.facebook.com/v26.0/1726701150950329/events',{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`},body:JSON.stringify({data:[metaCompletionPayload(p,user)],...(integrationStaging()?{test_event_code:requiredTestCode()}: {})}),signal:AbortSignal.timeout(8000)});const result=await response.json() as {events_received?:number};if(!response.ok||result.events_received!==1)throw Error('Meta completion delivery failed');
}
