# Clarity Engine measurement

GA4: G-T4SMFB5CTF / property 561791210. GTM: GTM-N4JXQLWJ.

Import clarity-engine-gtm.json into the Clarity Engine web container, validate the two native Google tags, and publish before deploying the website migration. No Custom HTML tags are used. The Google tag runs once as setup for the GA4 event tag; automatic page views are disabled. The custom ce_analytics trigger is sent only after analytics consent, on the production domain. Private assessment routes use the public offer URL as event context and never send tokens, answers, company details or contact information.

| Event | Source |
| --- | --- |
| page_view | Registered public marketing route, deduplicated during navigation |
| begin_checkout | Successful assessment checkout creation or Sprint checkout link click |
| form_submit | Assessment context API confirms save |
| assessment_complete | Assessment completion API succeeds |
| file_download | PDF response successfully read and browser download initiated |
| purchase | Server verifies Stripe payment; live sessions only; stable hashed transaction ID |

Purchase receipts include USD value and item ID/name/price/quantity. Browser storage and GA4 transaction ID deduplication prevent repeat counting. Website reporting is consent-based and browser-based: declined consent, blockers, or buyers not returning from Stripe can prevent events. Stripe remains the financial source of truth. This does not implement refunds, server-side Measurement Protocol, Meta Pixel, ad personalization, or enhanced conversions.

Sprint's active Stripe payment link is plink_1UPQoSF2Vf3NGmY34kdTmiTC. After deploying receipt verification, its after_completion must redirect to https://www.clarity-engine.org/checkout/strategy-sprint/thank-you?session_id={CHECKOUT_SESSION_ID}. Do not alter pricing. Unpaid, incomplete, test-mode, wrong-link, or wrong-value sessions produce no purchase event. Deep Dive Audit is a preview and has no purchase event.

Consent key v2 requests consent for the expanded measurement purposes. Advertising consent remains denied. Enhanced measurement must remain off, and automatically detected user-provided data must be disabled before launch. No customer emails/phones are sent. No booking-completed event is configured because the Sprint scheduling URL is still a placeholder; contact link clicks are not leads.
