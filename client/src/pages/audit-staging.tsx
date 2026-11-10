import { customerCopy } from "@shared/marketing-clarity-audit/v2/customer-copy";
import { useEffect, useState } from "react";
import { auditRequest } from "@/lib/audit-api";
import "../components/audit-v2-customer.css";
export default function AuditStaging() {
  const [ready, setReady] = useState(false),
    [consent, setConsent] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  useEffect(() => {
    auditRequest<{ enabled: boolean; testMode: boolean }>("/preview-status")
      .then((r) => setReady(r.enabled && r.testMode))
      .catch(() => setError("Staging is unavailable."));
  }, []);
  async function buy() {
    setBusy(true);
    try {
      const params = new URLSearchParams(location.search);
      const touch = {at:new Date().toISOString(),landing:'https://www.clarity-engine.org/marketing-clarity-assesment',referrer:'',parameters:Object.fromEntries(['utm_source','utm_medium','utm_campaign'].filter(k=>params.has(k)).map(k=>[k,params.get(k)!.slice(0,100)]))};
      const attribution = consent ? {ce_utm_source:touch.parameters.utm_source??'',ce_utm_medium:touch.parameters.utm_medium??'',ce_utm_campaign:touch.parameters.utm_campaign??'',ce_first_attribution:JSON.stringify(touch),ce_latest_attribution:JSON.stringify(touch),ce_submission_page:touch.landing} : undefined;
      const r = await auditRequest<{ url: string }>(
        "/checkout",
        "POST",
        attribution ? { attribution } : {},
      );
      location.assign(r.url);
    } catch (e) {
      setError((e as Error).message);
      setBusy(false);
    }
  }
  return (
    <main className="audit-v2-customer">
      <p className="preview-label">STAGING PREVIEW · NO LIVE CHARGE</p>
      <h1>Review the complete Clarity Assessment</h1>
      <p>
        This preview uses Stripe test mode and synthetic customer records in an
        isolated staging schema. Use Stripe test card 4242 4242 4242 4242, a
        future expiry and any three-digit CVC. Do not enter a real card or real
        customer information.
      </p>
      <p>{customerCopy.introduction}</p>
      <p>
        Test price: $27. The purchase includes two frozen reports. Your progress
        saves to the server and resumes using a private link.
      </p>
      <p>
        Estimated time: 15–25 minutes, pending observed completion testing.
        Scores and recommendations remain subject to calibration and do not
        establish diagnostic validity.
      </p>
      <label>
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        Allow campaign source tags on this test purchase to be retained for
        attribution (optional).
      </label>
      <p>
        Purchase and assessment completion are recorded separately for delivery
        and verification. No answers or private access links are sent to an
        advertising platform.
      </p>
      <button disabled={!ready || busy} onClick={buy}>
        {busy ? "Opening test checkout…" : "Start Stripe test purchase — $27"}
      </button>
      {!ready && <p>Checking staging availability…</p>}
      {error && <p role="alert">{error}</p>}
    </main>
  );
}
