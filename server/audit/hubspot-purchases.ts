import { cleanPurchaseAttribution, type PurchaseAttribution } from './purchase-attribution';
import type Stripe from 'stripe';

export type CrmPurchase = {
  checkoutId: string; email: string; product: 'assessment' | 'strategy_sprint' | 'deep_dive_audit';
  attributionReference?: string; attribution?: PurchaseAttribution;
  productName: string; amount: number; paidAt: number;
};
// Only the three website offers are eligible. Retainers and unrelated Stripe sales stay out.
export function websitePurchase(session: Stripe.Checkout.Session, assessmentPrice: string, paidAt: number, stagingTest = false): CrmPurchase | null {
  const isIsolatedTest = stagingTest && !session.livemode && session.metadata?.product === "marketing-clarity-audit" && session.metadata?.integrationTest === "combined-staging" && /^clarity-staging-[a-z0-9-]+@example\.com$/.test(session.customer_details?.email ?? session.customer_email ?? "");
  if ((!session.livemode && !isIsolatedTest) || !(session.payment_status === 'paid' || (session.payment_status === 'no_payment_required' && session.amount_total === 0)) || session.status !== 'complete' || session.mode !== 'payment' || session.currency !== 'usd') return null;
  const items = session.line_items?.data;
  if (!items || items.length !== 1 || items[0].quantity !== 1) return null;
  let product: CrmPurchase['product']; let productName: string;
  if (session.metadata?.product === 'marketing-clarity-audit' && items[0].price?.id === assessmentPrice) {
    product = 'assessment'; productName = 'Get Clarity Assessment';
  } else if (session.payment_link === 'plink_1UQE5yF2Vf3NGmY3we6iSUab' && items[0].price?.id === 'price_1UQE5mF2Vf3NGmY3417ombIk') {
    product = 'deep_dive_audit'; productName = 'Deep Dive Growth Audit';
  } else if (session.payment_link === 'plink_1UPQoSF2Vf3NGmY34kdTmiTC') {
    product = 'strategy_sprint'; productName = '30-Day Growth Strategy Sprint';
  } else return null;
  const email = session.customer_details?.email || session.customer_email;
  if (!email) throw new Error('Website purchase is missing its customer email');
  const amount = ((session.amount_total ?? 0) - (session.total_details?.amount_tax ?? 0) - (session.total_details?.amount_shipping ?? 0)) / 100;
  if (!Number.isFinite(amount) || amount < 0 || !Number.isFinite(paidAt)) throw new Error('Invalid website purchase');
  return { checkoutId: session.id, email: email.trim().toLowerCase(), product, productName, amount, paidAt, ...(session.client_reference_id?.startsWith("ce_attr_") ? {attributionReference:session.client_reference_id} : {}) };
}

export class HubSpotPurchases {
  constructor(private token: string, private request: typeof fetch = fetch) {}
  private async api(path: string, method = 'GET', body?: unknown, allowMissing = false): Promise<any> {
    const response = await this.request(`https://api.hubapi.com${path}`, {
      method, headers: { Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json' },
      ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(12000),
    });
    if (allowMissing && response.status === 404) return null;
    // Response bodies may contain personal data; never include them in errors or logs.
    if (!response.ok) throw new Error(`HubSpot request failed (${response.status})`);
    return response.status === 204 ? null : response.json();
  }
  async sync(p: CrmPurchase) {
    const contactPath = `/crm/v3/objects/contacts/${encodeURIComponent(p.email)}?idProperty=email&properties=ce_products_purchased,ce_last_purchase_date,ce_latest_attribution,ce_first_attribution`;
    let contact = await this.api(contactPath, 'GET', undefined, true);
    if (!contact) {
      try { contact = await this.api('/crm/v3/objects/contacts', 'POST', { properties: { email: p.email } }); }
      catch (error) { contact = await this.api(contactPath, 'GET', undefined, true); if (!contact) throw error; }
    }
    const products = new Set<string>((contact.properties?.ce_products_purchased || '').split(';').filter(Boolean));
    products.add(p.product);
    const previousDate = Date.parse(contact.properties?.ce_last_purchase_date || '') || 0;
    const purchaseDate = Math.floor(p.paidAt / 86400000) * 86400000;
    const attribution=cleanPurchaseAttribution(p.attribution);
    let previousAt=0; try {previousAt=Date.parse(JSON.parse(contact.properties?.ce_latest_attribution||'{}').at)||0;}catch{}
    const incomingAt=attribution?Date.parse(JSON.parse(attribution.ce_latest_attribution).at):0;
    await this.api(`/crm/v3/objects/contacts/${contact.id}`, 'PATCH', { properties: {
      ...(attribution && incomingAt>=previousAt ? {...attribution, ...(contact.properties?.ce_first_attribution ? {ce_first_attribution:contact.properties.ce_first_attribution} : {})} : {}),
      ce_products_purchased: Array.from(products).join(';'),
      ce_last_purchase_date: String(Math.max(previousDate, purchaseDate)),
    } });
    // A unique Stripe reference makes retries safe even if a prior response was lost.
    const result = await this.api('/crm/v3/objects/deals/batch/upsert', 'POST', { inputs: [{
      idProperty: 'ce_stripe_checkout_id', id: p.checkoutId,
      properties: { ce_stripe_checkout_id: p.checkoutId, dealname: `${p.checkoutId.startsWith('cs_test_') ? '[STAGING TEST — NO REAL REVENUE] ' : ''}${p.productName} — ${p.checkoutId}`,
        pipeline: 'default', dealstage: 'closedwon', amount: String(p.amount), closedate: new Date(p.paidAt).toISOString(),
        description: `Confirmed Clarity Engine website purchase. Product: ${p.productName}. Currency: USD. Stripe checkout: ${p.checkoutId}. Amount excludes tax and shipping. Historical payment; refunds are managed in Stripe.${attribution ? "\nCampaign attribution at checkout (consent-aware): " + JSON.stringify(attribution) : "\nCampaign attribution unavailable (no captured consented campaign)."}`,
      },
    }] });
    const deal = result.results?.[0];
    if (!deal?.id || result.errors?.length) throw new Error('HubSpot purchase upsert incomplete');
    await this.api(`/crm/v3/objects/deals/${deal.id}/associations/contacts/${contact.id}/3`, 'PUT');
    return { contactId: String(contact.id), dealId: String(deal.id) };
  }
}
