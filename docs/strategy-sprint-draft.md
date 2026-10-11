# Strategy Sprint draft

Local review: http://127.0.0.1:4311/strategy-sprint

New standalone sales page on the draft branch. Navigation now links to /strategy-sprint on desktop and mobile. Both sales-page purchase links go directly to the existing Stripe Payment Link, using the same new-tab behavior as the original checkout. /checkout/strategy-sprint remains accessible; its Stripe URL and payment behavior are unchanged. No production deployment or payment changes.

## Verified offer

Source: existing checkout-strategy-sprint.tsx and its thank-you page. $497 once, three sessions over 30 days, typically 60–120 minutes depending on topic and availability. Flexible advisory and live problem-solving. Recordings can be provided with AI-assisted summaries/action items. Full refund if requested within 24 hours after first session because engagement is not useful; guarantee expires afterward. Outside-session execution requires separate agreement. Inclusions extracted verbatim to shared/strategy-sprint-offer.ts for reuse by both pages.

Homepage credentials reused: 12+ years in paid media/growth strategy and $5M+ managed ad spend. No testimonials or claimed Sprint outcomes added.

## Media and open needs

Approved sorting animation saved durably as /videos/strategy-sprint-hero.mp4 (an exact copy of the supplied MP4), with /videos/strategy-sprint-hero-poster.webp extracted from its first frame. Playback remains muted inline with the existing pause/play control, reduced-motion support, and poster fallback. Loop is false: after one playback it stops; pressing Play restarts it. Homepage and assessment media are unchanged. Desktop, tablet, and mobile playback/replay checks pass. No deployment.

Existing thank-you scheduling URL remains a placeholder. The new page accurately says times are arranged together; no instant booking promise or new scheduling link was added. No between-session support promised.

## Verification

TypeScript and production build pass. Browser checks at 320, 360, 390, 768, 1024, 1440 pixels: no horizontal overflow; both purchase CTAs open the configured Stripe Payment Link; inclusion anchor and keyboard FAQ opening work. Reduced motion starts paused; keyboard playback and failed-video poster fallback pass. Desktop and mobile screenshots in tmp/strategy-sprint-hero-1440.png and tmp/strategy-sprint-hero-390.png; full-page screenshots also available.

The pre-existing app shell references absent /ux-enhancements.js, causing an unrelated script parse error in the local static preview. That request was stubbed during isolated page QA; the shell was not edited.


## Direct purchase flow verification

Existing checkout destination verified in project source: https://buy.stripe.com/dRmcN5eeygbFfkh8Sj8IU01. Moved this exact URL into shared/strategy-sprint-offer.ts and reused it in both pages. No Sprint-specific tracking handlers existed; none removed. No Stripe settings, payment product identifiers, or thank-you behavior changed.

Opened Stripe read-only: merchant Invision Group Inc; product 30-Day Growth Strategy Sprint; $497.00, single Pay form without recurring billing period. No customer or payment information entered, and no purchase completed. Confirmation screenshot: tmp/sprint-stripe-confirmation.png. Navigation and each of the two purchase links verified by clicking at desktop, tablet, and mobile sizes. Local preview only; no production deployment.

## Published visual refinement

Added a photo-free collaboration workbench, a clearly labeled fictional Example of session notes (question → decision to explore → practical next actions), and a connected context → collaboration → action progression. Consolidated repeated personal-guidance explanations while retaining all shared offer inclusions and FAQ terms. Purchase/scheduling details remain immediately beneath the process. Existing direct checkout page is unchanged.

Reusable testimonial component: client/src/components/sprint-testimonials.tsx. Three null slots; the entire section stays absent until approved, complete entries exist. Required fields: video, poster, name, role/company, English WebVTT captions, experience type and approval; quote is optional. Native controls, no autoplay, preload none. Prior advisory experiences display an explicit not-a-Sprint-review label. No endorsements published.

Assets needed: a verified photo of Juda or approved real session image; up to three approved testimonial MP4s, optimized posters, accurate attribution, caption files, optional approved quotes, and confirmation whether each relates to this Sprint or prior advisory. Generated strategist portrait was not used as Juda. No new image downloads or image payload added; current hero assets retained.

Verification: TypeScript/build; layout/no overflow at 320/390/768/1440; keyboard FAQ and preparation anchor; desktop/mobile direct Stripe clicks and preserved checkout; hero autoplay/pause/single-play/replay and reduced motion; fixture tests for empty/unapproved/incomplete testimonial hiding, caption tracks, requested-only playback and prior-experience labels. Screenshots tmp/sprint-polished-*.png. Existing app-shell missing ux-enhancements.js remains outside scope.
