# Homepage hero and partners preview

Branch: `feat/homepage-hero-partners`. Based on production commit `bffe342` in an isolated checkout; unfinished local audit changes are excluded.

## Scope

Only the homepage hero and What Partners Say presentation changed. Existing navigation/logo, HeroCTAs component, route destinations, HTML metadata/scripts, and Case Studies files are untouched. Homepage sections following What Partners Say are byte-for-byte unchanged. Existing lower-page testimonial presentation is preserved.

The supplied handoff and index.html guide visual presentation. Repository content remains the factual source: all five exact credibility statements and all six existing testimonial records are retained, including quotes, names, roles, and original photos. The new partner grid exposes the full existing six-record inventory rather than the previous two-card selection. No invented testimonials or figures.

## Motion asset

Actual supplied clarity-hero.mp4, encoded to H.264/yuv420p with faststart and no audio. Ten seconds, 1280×720, 735,623 bytes (~718 KiB), compared with the original ~3.4 MiB. Poster extracted at one second: 66,956 bytes (~65 KiB). Both are served from client/public/videos. No signed temporary source URLs are used.

HTML headline, CTA buttons and credibility claims remain outside the video. The frame reserves a 16:9 ratio. Motion uses muted autoplay, loop, playsInline and metadata preload; pauses when the page is hidden and provides a keyboard-accessible pause/play control. Reduced motion and Save-Data suppress the video entirely. Playback failure retains the poster.

## Verification

- TypeScript checking and production Vite build pass. Existing bundle-size, Browserslist and non-module script warnings remain.
- Automated Chromium checks at desktop 1440px, tablet 768px and mobile 390px pass: exact headline, five visible credibility statements, unchanged CTA hrefs, six cards, video play/pause, and no horizontal page overflow.
- Reduced-motion check: poster renders, no video element, zero MP4 requests. Failed video request retains the loaded poster.
- Desktop/tablet/mobile screenshots reviewed: desktop two-column hero, tablet/mobile text and CTAs above the visual, and partner cards in three/two/one columns.
- Local unthrottled development LCP samples approximately 0.5–0.6 seconds; these are smoke-test observations, not production performance guarantees. New media payload totals ~784 KiB.
- Existing testimonial data and credibility wording compared directly with the base revision; unchanged.
- Tracking scripts and CTA identifiers are preserved. No new analytics event names or tracking configuration were introduced. This is not a verification of external GA4/GTM account delivery.

No production deployment, alias promotion, schema migration or production-data changes.
