# Privacy notice — unpublished working draft

Not ready for publication. No public route or footer link has been created. Bracketed details require business confirmation. This document describes inspected code, not a compliance determination or a claim that all configured production services have been verified.

## Proposed notice

Clarity Engine [confirm legal operator, business address, and privacy contact] collects information you provide when booking, requesting contact, buying an offer, or using Get Clarity Assessment.

The homepage waitlist form requests name and email. In the Express implementation it submits to /api/waitlist and uses in-memory storage. Production availability/delivery is unconfirmed; no email-sending implementation was found. The browser stores a seven-day modal suppression date in localStorage.

Calendly booking embeds and linked scheduling pages are used for intro and onboarding calls. Information you submit there is handled by Calendly and the business's configured account. Calendly's privacy notice: https://calendly.com/legal/privacy-notice. Public marketing pages also include YouTube embeds, fonts fetched from Google, and external Calendly scripts. The app shell additionally references a Replit development banner script; a referenced local ux-enhancements.js file is missing from the inspected checkout. Embedded services may receive connection/device information and use their own storage. [Confirm active production embeds, tracking, cookie consent decisions, and vendor agreements.] Stripe-hosted checkout processes payments: https://stripe.com/privacy. The project does not collect card numbers in its own forms.

Get Clarity Assessment collects contact/business details, website, business type and marketing goal, answers, notes and Work Session content. Its configured PostgreSQL implementation stores assessment sessions, answers, reports, payment-verification records, retakes, notes, and first-party usage events. It uses secure token-bearing resume/report links rather than customer passwords, stores token hashes, and supports PDF downloads. Holders of a private link can access the associated session; users should keep those links private. Private routes have noindex/no-referrer directives. These are implemented safeguards, not promises of absolute security.

The assessment purchase API sets a 30-day HttpOnly, SameSite=Lax purchase cookie restricted to /api/audit, marked Secure for HTTPS. First-party assessment events include sales-page views, checkout starts, and session activity. No Google Analytics, Google Tag Manager, Meta advertising pixel, or similar tracking installation was found in current source; deployed injections/account settings and embedded-provider tracking remain unverified. Hosting providers may retain request logs; retention and subprocessors need confirmation.

We use provided information to arrange services, process purchases, save and deliver assessment results, and support product operation. [Confirm actual marketing communications, recipients, processing grounds, and vendor list.] Service recordings and AI-assisted notes are described in the Sprint offer; [confirm recording consent process, platform, AI provider, handling of sensitive material, storage location, access and retention before finalizing].

[Set specific retention/deletion periods for inquiries, booking records, recordings, assessment data, reports, analytics and financial records. Document a verified request process and contact for access/correction/deletion. Confirm applicable countries, international transfers, children's-use rules, and legally required regional notices. Do not claim sale/sharing opt-outs, consent mechanisms, legal bases, or regulatory compliance until verified.]
