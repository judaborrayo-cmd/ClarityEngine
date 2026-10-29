import { Link } from "react-router-dom";
import { deepDiveGrowthAuditOffer as offer } from "@shared/deep-dive-growth-audit-offer";
import "./deep-dive-growth-audit.css";
export default function CheckoutAuditNewNextSteps() {
  return (
    <main className="dda-page">
      <div className="dda-wrap dda-next">

        <h1>
          Start with context.
          <br />
          <em>Build on the evidence.</em>
        </h1>
        <div className="dda-review-notice">
          <strong>Preview of the new engagement's next steps</strong>
          <p>
            This page does not verify a purchase or confirm a booking. The new
            checkout is not yet available. After payment is verified, Clarity
            Engine will confirm the agreed scope and onboarding instructions
            directly.
          </p>
        </div>
        <ol className="dda-process">
          {[
            [
              "Share your business context",
              "Prepare your growth goals, acquisition activity, customer journey and the decisions you want investigated.",
            ],
            [
              "Agree investigation priorities",
              "Identify relevant accounts, platforms, market context and competitors together.",
            ],
            [
              "Confirm appropriate access",
              "Use authorized read-only or analysis-level permissions. Do not send passwords or unnecessary sensitive customer information.",
            ],
            [
              "Review findings and direction",
              "Receive written findings, prioritized recommendations, a 90-day roadmap and a personal walkthrough.",
            ],
          ].map(([title, copy], i) => (
            <li key={title}>
              <span>0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="dda-note">
          Existing $1,250 customers retain their original purchase terms and
          onboarding path. This preview introduces no new delivery deadline,
          support allowance or refund promise.
        </p>
        <Link to="/growth-clarity-audit" className="dda-text-link">
          Return to the Audit </Link>
      </div>
    </main>
  );
}
