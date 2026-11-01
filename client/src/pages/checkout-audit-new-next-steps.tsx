import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auditRequest } from "@/lib/audit-api";
import { trackPurchase, type Receipt } from "@/lib/website-analytics";
import { deepDiveGrowthAuditOffer as offer } from "@shared/deep-dive-growth-audit-offer";
import "./deep-dive-growth-audit.css";
export default function CheckoutAuditNewNextSteps() {
  const [status, setStatus] = useState<'checking' | 'verified' | 'unverified'>('checking');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    const checkoutId = new URLSearchParams(window.location.search).get('session_id');
    if (!checkoutId || !/^cs_live_[A-Za-z0-9_]+$/.test(checkoutId)) { setStatus('unverified'); return; }
    setStatus('checking');
    void auditRequest<Receipt>('/deep-dive-receipt', 'POST', { checkoutId }).then(receipt => {
      if (!active) return;
      setStatus('verified');
      trackPurchase(receipt);
    }).catch(() => { if (active) setStatus('unverified'); });
    return () => { active = false; };
  }, [attempt]);
  return <main className="dda-page"><div className="dda-wrap dda-next">
    <h1>{status === 'verified' ? 'Your Deep Dive Growth Audit is confirmed.' : 'Your Deep Dive Growth Audit next steps.'}</h1>
    <div className="dda-review-notice" role="status">
      {status === 'checking' ? <p>Checking your payment securely with Stripe…</p> : status === 'verified' ? <p>Your {offer.priceLabel} USD payment has been verified. Let’s prepare for your kickoff.</p> : <>
        <p>We haven’t verified a completed payment from this page. If you just paid, allow time for processing and check again. Do not pay a second time. Your Stripe receipt remains your payment record; contact Juda if you need help.</p>
        <button className="dda-button" onClick={() => setAttempt(n => n + 1)}>Check payment again</button>
      </>}
    </div>
    {status === 'verified' && <p><a className="dda-button" href="https://calendly.com/juda-borrayo/deep-dive-audit-onboarding-call" rel="noreferrer">Schedule your kickoff</a></p>}
    <ol className="dda-process">{[
      ['Prepare for kickoff', 'Gather your business goals, priority challenges, current channels, team structure and key questions. Work officially begins during the kickoff meeting.'],
      ['Share the required context and access', 'We will identify the documents, historical performance and read-only platform access needed. Use platform invitations rather than sharing passwords. Relevant team members may join conversations during the investigation.'],
      ['Receive your findings', 'Plan for completion within three weeks after kickoff and receipt of the required information, documents and access, unless otherwise agreed. You receive written findings, actionable recommendations, selected examples and a 90-day roadmap.'],
      ['Walk through the plan', 'Review the findings together, followed by two weeks of clarification support: up to two calls totaling 90 minutes. Implementation is a separate engagement.'],
    ].map(([title, copy], i) => <li key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol>
    <p><a className="dda-text-link" href="mailto:Juda.Borrayo@gmail.com?subject=Deep%20Dive%20Growth%20Audit%20onboarding">Contact Juda about onboarding</a></p>
    <p><Link className="dda-text-link" to="/checkout/audit#terms">Review your engagement and cancellation terms</Link></p>
    <Link to="/growth-clarity-audit" className="dda-text-link">Return to the Audit</Link>
  </div></main>;
}
