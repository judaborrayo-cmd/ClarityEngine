# Clarity Engine measurement

GA4: G-T4SMFB5CTF / property 561791210. GTM: GTM-N4JXQLWJ.
Meta dataset: 1726701150950329. Google Ads: 967-554-4521.

GTM's native Google tags consume the consent-gated `ce_analytics` custom event. Automatic page views and enhanced measurement are disabled; registered public routes supply safe page context. Private assessment and checkout routes use their public offer URL and never send tokens, answers, company details or contact information. The Meta Pixel base tag supplies consented public page views through GTM.

| Event | Source |
| --- | --- |
| page_view | Registered public marketing route |
| begin_checkout | Successful assessment checkout creation or paid-offer checkout link click |
| generate_lead | HubSpot successful submission receipt on /inquiry/thank-you; no field contents or revenue |
| assessment_context_submit | Paid assessment context API confirms save; not a lead |
| assessment_complete | Assessment completion API succeeds |
| file_download | PDF response successfully read and browser download initiated |
| purchase | Server verifies live Stripe payment; stable hashed transaction ID |

Purchase receipts include USD value and item ID/name/price/quantity. Browser storage and GA4 transaction ID deduplication prevent repeat counting. The GA4 purchase event is imported into Google Ads as a primary Purchase action using dynamic value/currency, every conversion, and zero fallback value. Downloads and assessment questionnaires are not lead conversions.

## Meta server purchase delivery

Set `META_CONVERSIONS_API_TOKEN` as a production-only Vercel Secret. Never place it in GTM, browser code, source control, or a public-prefixed environment variable. Production code sends no test_event_code.

After verified payment, the server signs a short-lived purchase proof. With advertising consent and an existing Meta browser cookie, the browser forwards that proof to `/api/audit/meta-purchase`. The server verifies the signature, expiry, product and value before sending Purchase through Meta Conversions API. The proof never enters the GA4 data layer. Meta receives the product, value, currency, hashed transaction ID, public offer URL, browser agent and available `_fbp`/`_fbc` identifiers. No email, phone, assessment answers or private URL is sent.

Database locking and persisted delivery records prevent repeated submissions; stable event IDs also allow Meta deduplication after ambiguous network failures. Rejected consent suppresses delivery. This remains dependent on the buyer returning to the site and allowing advertising cookies; it is not webhook-only attribution. GA4 independently requires analytics consent. Stripe remains the financial source of truth.

Deep Dive Audit is live at $3,725; Sprint is $697 and assessment is $27. Only the exact expected live payment links, completed paid sessions, products and amounts qualify. Legacy Deep Dive receipts are excluded. Refund tracking and enhanced conversions are not implemented. Contact clicks and scheduling-link clicks are not successful lead submissions or completed bookings.

## Inquiry integration

HubSpot portal 247862766, published form 79432239-56d8-4e28-a732-60a9e74748c2. The embedded form creates/updates contact records and notifies growth@clarity-engine.org. There is no marketing subscription enrollment, SMTP backend, or Google app password.

The form success callback stores a short-lived submission receipt in session storage. The thank-you route removes HubSpot's submissionGuid query parameter before initializing tags. Only a valid receipt can emit generate_lead and Meta Lead; direct visits and refreshes do not create additional leads. Analytics consent controls GA4; advertising consent controls Meta and Google advertising storage. Contact details and message contents stay out of conversion payloads. Hosted fallback form submissions reach HubSpot but do not create the website receipt, so they are not attributed by this integration.

GA4 generate_lead is a key event imported to Google Ads as Primary / Submit lead form, Count One, with no monetary value. Purchases remain separate. Google Ads reporting requires an attributable advertising interaction; a routine form test is not evidence of an attributed Ads conversion.
