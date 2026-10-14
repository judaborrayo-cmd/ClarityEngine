import { Link } from "react-router-dom";
import {
  deepDiveGrowthAuditOffer as offer,
  deepDiveGrowthAuditDeliverables as deliverables,
} from "@shared/deep-dive-growth-audit-offer";
import "./deep-dive-growth-audit.css";
export default function CheckoutAudit() {
  return (
    <main className="dda-page">
      <div className="dda-wrap dda-checkout">
        <Link to="/" className="dda-text-link">
          ← Back to Home
        </Link>
        <header className="dda-checkout-header">
          <p className="dda-eyebrow">Review your engagement</p>
          <h1>{offer.name}</h1>
          <p className="dda-lead">
            Expert-led investigation of your business and marketing evidence,
            with priorities you can put to work.
          </p>
        </header>
        <div className="dda-checkout-grid">
          <section>
            <h2>What your strategy includes</h2>
            <div className="dda-deliverables">
              {deliverables.map((d, i) => (
                <article key={d.title}>
                  <span className="dda-number">0{i + 1}</span>
                  <div>
                    <h3>{d.title}</h3>
                    <p>{d.copy}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="dda-note">
              Scope follows your business, available evidence, agreed priorities
              and authorized read-level access. Implementation and ongoing
              management require a separate agreement.
            </p>
          </section>
          <aside className="dda-order" aria-label="Audit order summary">
            <p className="dda-eyebrow">Deep Dive Growth Audit</p>
            <p className="dda-price">
              {offer.priceLabel}
              <span>USD · one-time</span>
            </p>
            <div className="dda-review-notice" id="audit-terms-summary">
              <strong>Before checkout</strong>
              <p>Review the <Link className="dda-text-link" to="/terms-of-service">Terms of Service</Link> and <Link className="dda-text-link" to="/terms-of-service#cancellation">cancellation terms</Link>. Before substantive work begins, cancellation is refundable less actual nonrecoverable processing fees only where legally permitted and disclosed before purchase. After work begins, there is no satisfaction-based money-back guarantee; completed work and unperformed services are accounted for fairly. Non-delivery refunds and applicable legal rights remain protected.</p>
              <p>When purchasing opens, mandatory acceptance will be collected in Stripe checkout.</p>
            </div>
            <p className="dda-note">Read our <Link className="dda-text-link" to="/privacy-policy">Privacy Policy</Link> for information about payments, onboarding and service delivery.</p>
            <button
              className="dda-button"
              disabled
              aria-describedby="audit-checkout-status audit-terms-summary"
              data-testid="button-proceed-checkout"
            >
              Checkout not yet available
            </button>
            <div className="dda-review-notice" id="audit-checkout-status">
              <strong>Online purchasing is not yet available</strong>
              <p>
                Purchasing is unavailable while the new payment link is
                inactive. No payment can be made from this page.
              </p>
            </div>
            <p className="dda-note"><a className="dda-text-link" href="mailto:Juda.Borrayo@gmail.com?subject=Deep%20Dive%20Growth%20Audit%20enquiry">Contact us about the Audit →</a></p>
            <p className="dda-note">
              Onboarding, written scope confirmation, sufficient access and written commencement notice are required before the approximately three-week target turnaround begins, with an approximately five-week extended window where needed.
            </p>
            <Link
              to="/terms-of-service#scope"
              className="dda-text-link"
            >
              Review scope and delivery terms →
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
