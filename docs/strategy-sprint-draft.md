# Strategy Sprint draft

Local review: http://127.0.0.1:4311/strategy-sprint

New standalone sales page on the draft branch. Navigation still links to /checkout/strategy-sprint. All new purchase links go to that checkout; its Stripe URL and payment behavior are unchanged. No production deployment or payment changes.

## Verified offer

Source: existing checkout-strategy-sprint.tsx and its thank-you page. $497 once, three sessions over 30 days, typically 60–120 minutes depending on topic and availability. Flexible advisory and live problem-solving. Recordings can be provided with AI-assisted summaries/action items. Full refund if requested within 24 hours after first session because engagement is not useful; guarantee expires afterward. Outside-session execution requires separate agreement. Inclusions extracted verbatim to shared/strategy-sprint-offer.ts for reuse by both pages.

Homepage credentials reused: 12+ years in paid media/growth strategy and $5M+ managed ad spend. No testimonials or claimed Sprint outcomes added.

## Media and open needs

Temporary approved homepage asset: /videos/clarity-engine-hero-new.mp4 with /videos/clarity-hero-poster.jpg. This illustrates broader Clarity Engine strategy, not Sprint deliverables. Replace the sprintMedia configuration at the top of client/src/pages/strategy-sprint.tsx with the final local MP4/poster. Loop is false pending verification of a clean loop. Playback is muted inline, with an explicit keyboard-accessible pause button, reduced-motion support, and poster fallback.

Existing thank-you scheduling URL remains a placeholder. The new page accurately says times are arranged together; no instant booking promise or new scheduling link was added. No between-session support promised.

## Verification

TypeScript and production build pass. Browser checks at 320, 360, 390, 768, 1024, 1440 pixels: no horizontal overflow; both purchase CTAs route to unchanged checkout; inclusion anchor and keyboard FAQ opening work. Reduced motion starts paused; keyboard playback and failed-video poster fallback pass. Desktop and mobile screenshots in tmp/strategy-sprint-hero-1440.png and tmp/strategy-sprint-hero-390.png; full-page screenshots also available.

The pre-existing app shell references absent /ux-enhancements.js, causing an unrelated script parse error in the local static preview. That request was stubbed during isolated page QA; the shell was not edited.
