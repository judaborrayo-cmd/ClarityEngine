import { auditRequest } from './audit-api';
import { inquiryAttributionFields } from './campaign-attribution';
export async function attributedCheckout(url:string) {
  const fields=inquiryAttributionFields();
  if(!fields.ce_latest_attribution) return url;
  const {reference}=await auditRequest<{reference:string|null}>('/purchase-attribution','POST',fields);
  const target=new URL(url);
  if(reference) target.searchParams.set('client_reference_id',reference);
  return target.toString();
}
