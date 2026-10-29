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
        <Link to="/growth-clarity-audit" className="dda-text-link">
           Back to the Audit
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
            <button
              className="dda-button"
              disabled
              aria-describedby="audit-checkout-status"
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
            <p className="dda-note"><a className="dda-text-link" href="mailto:Juda.Borrayo@gmail.com?subject=Deep%20Dive%20Growth%20Audit%20enquiry">Contact us about the Audit </a></p>
            <p className="dda-note">
              Engagement scope and commercial details will be confirmed before
              purchase opens.
            </p>
            <Link
              to="/growth-clarity-audit#investigation"
              className="dda-text-link"
            >
              Review the investigation scope </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
