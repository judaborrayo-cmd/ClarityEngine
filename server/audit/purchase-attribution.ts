import { z } from 'zod';
const label=z.string().max(256).regex(/^[a-zA-Z0-9_.~ +\-]*$/);
const page=z.string().max(300).refine(value=>{if(!value)return true;try {const u=new URL(value);return u.origin==='https://www.clarity-engine.org'&&!u.search&&!u.hash&&!u.pathname.startsWith('/audit/');}catch{return false;}});
const referrer=z.string().max(300).refine(value=>{if(!value)return true;try {const u=new URL(value);return ['https:','http:'].includes(u.protocol)&&!u.username&&!u.password&&u.pathname==='/'&&!u.search&&!u.hash;}catch{return false;}});
const keys=['utm_source','utm_medium','utm_campaign','utm_content','utm_term','utm_id','gclid','gbraid','wbraid','fbclid'];
const touch=z.object({at:z.string().datetime(),landing:page,referrer,parameters:z.record(label).refine(parameters=>Object.keys(parameters).every(key=>keys.includes(key)))}).strict();
const snapshot=z.string().max(4000).refine(value=>{if(!value)return true;try{return touch.safeParse(JSON.parse(value)).success;}catch{return false;}});

export const purchaseAttributionSchema=z.object({ce_utm_source:label,ce_utm_medium:label,ce_utm_campaign:label,ce_first_attribution:snapshot,ce_latest_attribution:snapshot,ce_submission_page:page}).strict();
export type PurchaseAttribution=z.infer<typeof purchaseAttributionSchema>;
export function cleanPurchaseAttribution(value:unknown):PurchaseAttribution|undefined {const result=purchaseAttributionSchema.safeParse(value);return result.success&&result.data.ce_latest_attribution?result.data:undefined;}
