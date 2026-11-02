import { attributedCheckout } from '@/lib/attributed-checkout';
import { trackCheckout, deepDiveAuditItem } from "@/lib/website-analytics";
import { Link } from "react-router-dom";
import {
  deepDiveGrowthAuditOffer as offer,
  deepDiveGrowthAuditDeliverables as deliverables,
  deepDiveAuditTerms,
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

            <p className="dda-price">
              {offer.priceLabel}
              <span>USD · one-time</span>
            </p>
            <a className="dda-button" href={offer.paymentLink} data-testid="button-proceed-checkout"
              onClick={async event => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); await trackCheckout(deepDiveAuditItem); try {window.location.assign(await attributedCheckout(offer.paymentLink));} catch {window.alert("Checkout could not be opened. Please try again.");} }}>
              Purchase for {offer.priceLabel}
            </a>
            <p className="dda-note">Secure one-time payment through Stripe. Review the <a href="#terms" className="dda-text-link">engagement and cancellation terms</a> before purchasing.</p>
            <Link
              to="/growth-clarity-audit#investigation"
              className="dda-text-link"
            >
              Review the investigation scope </Link>
          </aside>
        </div>
        <section id="terms" aria-labelledby="audit-terms-heading" style={{ marginTop: '3rem', scrollMarginTop: '8rem' }}>
          <h2 id="audit-terms-heading">Engagement & cancellation terms</h2>
          <p className="dda-note">Effective November 1, 2026 · Deep Dive Growth Audit · $3,725 USD</p>
          {deepDiveAuditTerms.map(term => <article key={term.title} style={{ marginTop: '1.5rem' }}><h3>{term.title}</h3><p>{term.copy}</p></article>)}
        </section>
      </div>
    </main>
  );
}
