import { websitePurchase, type CrmPurchase } from './hubspot-purchases';
import Stripe from "stripe";

export interface AuditPayment {
  checkout(
    origin: string,
    claimHash: string,
  ): Promise<{ id: string; url: string }>;
  deepDiveReceipt?(id: string): Promise<{ value: number } | null>;
  sprintReceipt?(id: string): Promise<{ value: number } | null>;
  assessmentReceipt?(id: string, claimHash: string): Promise<{ value: number } | null>;
  isPaid(id: string, claimHash?: string): Promise<boolean>;
  crmPurchase?(id: string, paidAt: number): Promise<CrmPurchase | null>;
  webhook(body: Buffer, signature: string): { id: string; checkoutId?: string; paidAt?: number };
}
export class StripeAuditPayment implements AuditPayment {
  private stripe: Stripe;
  constructor(
    secret: string,
    private priceId: string,
    private webhookSecret: string,
  ) {
    this.stripe = new Stripe(secret);
  }
  async checkout(origin: string, claimHash: string) {
    const session = await this.stripe.checkout.sessions.create({
      mode: "payment",
      allow_promotion_codes: true,
      line_items: [{ price: this.priceId, quantity: 1 }],
      custom_text: { submit: { message: "Get Clarity Assessment by Clarity Engine examines six marketing areas to help you identify where to focus next." } },
      metadata: { product: "marketing-clarity-audit", claimHash },
      success_url: `${origin}/audit/start?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/marketing-clarity-assesment`,
    });
    if (!session.url) throw new Error("Checkout unavailable");
    return { id: session.id, url: session.url };
  }
  async isPaid(id: string, claimHash?: string) {
    const session = await this.stripe.checkout.sessions.retrieve(id, {
      expand: ["line_items"],
    });
    return this.validAssessment(session, claimHash);
  }
  private validAssessment(session: Stripe.Checkout.Session, claimHash?: string) {
    return session.livemode && session.status === "complete" &&
      (session.payment_status === "paid" || (session.payment_status === "no_payment_required" && session.amount_total === 0)) &&
      session.mode === "payment" && session.currency === "usd" &&
      Number.isSafeInteger(session.amount_total) && session.amount_total! >= 0 &&
      session.metadata?.product === "marketing-clarity-audit" &&
      typeof session.metadata.claimHash === "string" && /^[a-f0-9]{64}$/.test(session.metadata.claimHash) &&
      (!claimHash || session.metadata.claimHash === claimHash) &&
      session.line_items?.data.length === 1 &&
      session.line_items.data[0].price?.id === this.priceId &&
      session.line_items.data[0].quantity === 1;
  }
  async assessmentReceipt(id: string, claimHash: string) {
    const session = await this.stripe.checkout.sessions.retrieve(id, { expand: ["line_items"] });
    if (!this.validAssessment(session, claimHash)) return null;
    return { value: (session.amount_total! - (session.total_details?.amount_tax ?? 0) - (session.total_details?.amount_shipping ?? 0)) / 100 };
  }
  async sprintReceipt(id: string) {
    const session = await this.stripe.checkout.sessions.retrieve(id);
    if (!session.livemode || session.payment_status !== "paid" || session.status !== "complete" || session.mode !== "payment" || session.currency !== "usd" || session.payment_link !== "plink_1UPQoSF2Vf3NGmY34kdTmiTC" || session.amount_total !== 69700) return null;
    return { value: (session.amount_total - (session.total_details?.amount_tax ?? 0) - (session.total_details?.amount_shipping ?? 0)) / 100 };
  }
  async deepDiveReceipt(id: string) {
    const session = await this.stripe.checkout.sessions.retrieve(id, { expand: ["line_items"] });
    const item = session.line_items?.data[0];
    if (!session.livemode || session.payment_status !== "paid" || session.status !== "complete" || session.mode !== "payment" || session.currency !== "usd" || session.payment_link !== "plink_1UQE5yF2Vf3NGmY3we6iSUab" || session.amount_total !== 372500 || session.line_items?.data.length !== 1 || item?.price?.id !== "price_1UQE5mF2Vf3NGmY3417ombIk" || item.quantity !== 1) return null;
    return { value: (session.amount_total - (session.total_details?.amount_tax ?? 0) - (session.total_details?.amount_shipping ?? 0)) / 100 };
  }
  async crmPurchase(id: string, paidAt: number) {
    return websitePurchase(await this.stripe.checkout.sessions.retrieve(id, { expand: ["line_items"] }), this.priceId, paidAt);
  }
  webhook(body: Buffer, signature: string) {
    const event = this.stripe.webhooks.constructEvent(
      body,
      signature,
      this.webhookSecret,
    );
    const recognized = [
      "checkout.session.completed",
      "checkout.session.async_payment_succeeded",
    ].includes(event.type);
    return {
      id: event.id,
      paidAt: event.created * 1000,
      checkoutId: recognized
        ? (event.data.object as Stripe.Checkout.Session).id
        : undefined,
    };
  }
}
