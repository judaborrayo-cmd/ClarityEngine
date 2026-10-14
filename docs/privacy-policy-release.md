# Privacy Policy review and release — October 14, 2026

Owner instruction authorizes publication and link-only integration after validation. Release starts from deployed Terms commit eb7c7d89ba806863e7b60a090b1fb85caddee7ba, preserving the older live offer flows rather than publishing unrelated draft/main changes.

Public URL: https://www.clarity-engine.org/privacy-policy
Identity: Invision Group Inc., operating as Clarity Engine.
Contact: Juda.Borrayo@gmail.com (owner-supplied; no verified replacement identified).

## Evidence inventory

- `client/src/components/ExitIntentModal.tsx`: name/email, POST /api/waitlist, seven-day localStorage modal suppression. `server/routes.ts` and `server/storage.ts`: in-memory waitlist in standalone Express server; no customer email sender. `scripts/audit-entry.ts` and `api/audit.js`: deployed Vercel function handles only Assessment API. Read-only live GET /api/waitlist returned 200 HTML before this change; form delivery is not claimed as verified.
- `shared/marketing-clarity-audit/context.ts`: name, email, company, website, business type, goal. `server/audit/store.ts`, migrations: records for answers, progress, frozen reports, retake, checklist, work notes, payment verification, first-party events and rate-limiting hash. No automatic record expiration/deletion schedule found. The Neon driver is a library, not verification of the production database provider.
- `server/audit/payment.ts` and routes: Stripe-hosted $27 checkout, payment/event IDs, hashed ownership tokens; signature and paid-status checks; 30-day HttpOnly, SameSite=Lax purchase cookie restricted to /api/audit and Secure for HTTPS origin.
- `shared/marketing-clarity-audit/events.ts`, client event helper and store: first-party Assessment activity events; session/question IDs and timestamps, not anonymous by default. No GA/GTM/Meta pixel/comparable advertising analytics or AI API calls identified in reviewed source.
- `shared/marketing-clarity-audit/scoring.ts`, report generation and store: deterministic scoring/report generation, no generative AI provider call. Report AI guidance is static guidance, not data submission.
- `server/audit/company-logo.ts`, routes: requests public website/image URLs derived from supplied business website, normalizes/caches logo; no answers/notes sent to that website.
- `client/index.html`: Google-hosted fonts, Calendly script, Replit banner script. `home.tsx`, case-study detail: YouTube embeds. `CalendlyInline.jsx`: scheduler/iframe. Booking/onboarding next-step links: Calendly and Google Docs. Vercel project/alias confirmed for deployed www domain. Google/Gmail contact confirmed by address.
- `strategy-sprint.tsx` and Sprint checkout: advertised recordings and AI-assisted summaries. No off-site recording or AI processor identified in source; do not name Zoom/OpenAI or assert model training exclusions without owner confirmation.
- `server/audit/security.ts`, routes, diagnostics, private HTML and Vercel headers: hashed tokens, input validation, verified-purchase access, rate limiting, private no-store/no-referrer/noindex, diagnostic logging designed to exclude sensitive payloads. These are specific implemented safeguards, not absolute security, at-rest encryption or certification claims.
- Production Vercel env listing returned no configured variables; read-only invalid-token Assessment API GET returned 503 before the release. Do not claim live purchase/fulfillment verification. No secrets were read or exported.

## Owner confirmations still needed

1. Off-site recording platform, whether calls are recorded, notification/consent, AI-summary tools, data submitted, training settings, storage, sharing and retention.
2. Retention/deletion schedule for inquiries, assessments, events, rate-limit records, documents, recordings, backups and financial records; responsible person and request-handling workflow.
3. Database provider and region, provider contracts, backups, access controls and production API availability.
4. Waitlist delivery and notification procedure; off-site CRM, email marketing and recipients.
5. Any dashboard-injected analytics/advertising tags, actual third-party cookies, customer regions and consent controls; sale or cross-context advertising sharing outside reviewed website.
6. Applicable jurisdictions/processing grounds and regional notices, international transfer safeguards, business address/representative details if required, and age/child-data policy.

These are explicitly disclosed as unconfirmed on the public policy; no unverified services, fixed retention periods, no-sale promises, consent banner, model training settings, legal bases or compliance guarantee were invented.

## Implementation and preservation

Same ce-terms stylesheet and page structure as Terms. Single shared content source generates React content and all thirteen policy sections/vendor links in the initial HTML, so policy remains readable without JavaScript. Registry title/description/canonical/social dimensions and alt use the already approved branded 1200×630 static image. Rewrites cover both slash variants, and SPA head updates remain synchronized.

Links added to footer, legacy Audit and Sprint checkout before Stripe, disabled new Audit review, Assessment sales/data-entry, waitlist form and purchase onboarding pages. No new checkbox. No Stripe API mutations, payment-link changes, prices, guarantees, handlers, access rules, token logic, API configuration or cookies changed. Footer wraps when the added legal link requires it on phones.

## Verification

TypeScript, production build, full generated metadata/image/favicon/private-header checks and all 69 Assessment tests passed. Browser checks cover 320×568, 390×664, 768×1024 and 1440×900, no overflow, Terms-matching styling, privacy anchors, checkout/footer navigation, SPA metadata reset, and complete policy with JavaScript disabled. Mocked private Assessment context checks the notice without accessing a real customer; waitlist notice checked without submitting. Existing $1,250 and $697 Stripe destinations and guarantee remain intact; $3,725 checkout remains disabled. Screenshot/check artifacts are local in the primary workspace output/privacy-policy-20261014 and are excluded from deployment.

Known inherited public-shell script parse warnings and the pre-existing API/waitlist availability gaps are outside this privacy/link release. No live payment or customer data access was performed.

## External references checked

Provider notices: https://stripe.com/privacy ; https://calendly.com/legal/privacy-notice ; https://vercel.com/legal/privacy-notice ; https://policies.google.com/privacy ; https://replit.com/privacy-policy . Provider notices describe provider practices, not verification of all Clarity Engine account options.
Transparency/accuracy guidance: https://www.ftc.gov/business-guidance/privacy-security/consumer-privacy ; https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/ . These inform drafting; no determination that any specific regional law applies is claimed.
