import Stripe from "stripe";

export interface AuditPayment {
  checkout(
    origin: string,
    claimHash: string,
  ): Promise<{ id: string; url: string }>;
  isPaid(id: string, claimHash?: string): Promise<boolean>;
  webhook(body: Buffer, signature: string): { id: string; checkoutId?: string };
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
    return (
      session.payment_status === "paid" &&
      session.mode === "payment" &&
      session.currency === "usd" &&
      session.amount_total === 2700 &&
      session.metadata?.product === "marketing-clarity-audit" &&
      (!claimHash || session.metadata.claimHash === claimHash) &&
      session.line_items?.data.length === 1 &&
      session.line_items.data[0].price?.id === this.priceId &&
      session.line_items.data[0].quantity === 1
    );
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
      checkoutId: recognized
        ? (event.data.object as Stripe.Checkout.Session).id
        : undefined,
    };
  }
}
