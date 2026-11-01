import { trackWebsiteEvent } from './website-analytics';
import { readAdvertisingConsent, advertisingPageAllowed, updateAdvertising } from './website-advertising';
export const inquiryFormId = '79432239-56d8-4e28-a732-60a9e74748c2';
export const inquiryReceiptKey = 'ce-inquiry-receipt-v1';
type Receipt = {id:string;at:number;analytics?:boolean;meta?:boolean};
export function readInquiryReceipt(): Receipt | null {
  try { const r = JSON.parse(sessionStorage.getItem(inquiryReceiptKey) || 'null');
    return r && /^[a-zA-Z0-9-]{8,100}$/.test(r.id) && Number.isFinite(r.at) && Date.now()-r.at >= 0 && Date.now()-r.at < 1800000 ? r : null;
  } catch { return null; }
}
export function rememberInquiry(id:string) {
  if (!/^[a-zA-Z0-9-]{8,100}$/.test(id)) return;
  try { if (readInquiryReceipt()?.id !== id) sessionStorage.setItem(inquiryReceiptKey,JSON.stringify({id,at:Date.now()})); } catch {}
}
export function reportInquiry() {
  const r=readInquiryReceipt();
  if (!r || location.hostname !== 'www.clarity-engine.org') return;
  // A thank-you page visit alone is never a lead. Only the provider's success callback creates this receipt.
  if (!r.analytics && trackWebsiteEvent('generate_lead',{form_id:'work_inquiry',lead_source:'website_inquiry'})) r.analytics=true;
  if (!r.meta && readAdvertisingConsent()==='granted' && advertisingPageAllowed(location.pathname,location.search,location.hash,document.referrer)) {
    updateAdvertising(location.pathname,true);
    const fbq=(window as Window & {fbq?: (...args:unknown[])=>void}).fbq;
    if (fbq) { fbq('consent','grant'); fbq('track','Lead',{content_name:'Website inquiry'},{eventID:'ce_lead_'+r.id}); r.meta=true; }
  }
  try {sessionStorage.setItem(inquiryReceiptKey,JSON.stringify(r));}catch{}
}
