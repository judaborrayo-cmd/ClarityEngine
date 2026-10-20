# Clarity Engine project rules

## Marketing motion preference

Hero and highlight animations should autoplay silently when visible, subject to reduced-motion preferences. Do not show play/pause badges or labels over the artwork. Let visitors click/tap the video area to pause or resume, and provide the same interaction through keyboard focus and an accessible label. Keep motion subtle and avoid adding unnecessary simultaneous videos. The supplied `clarity-popup-smoke.mp4` is exclusive to the assessment popup. Preserve the approved What Partners Say treatment.

## Standing mobile hero standard

For public marketing-page hero work, prioritize visible media on phones while preserving desktop layout unless explicitly asked otherwise. Account for the fixed navigation and reduced available viewport height from browser controls; verify at common phone widths and shorter usable heights with screenshots.

On /about specifically, mobile order is: compact name/founder label; headline; founder transformation video; supporting paragraph and primary CTA; complete professional title, case-studies link, and contact links. Reduce excess top spacing; move detailed information lower instead of shrinking all content. Keep a substantial portion of the video visible without scrolling. Keep Juda's face, hand, and logo switch within the full uncropped composition. Preserve wording, link destinations, looping/manual video controls, reduced-motion behavior, offer previews, and the desktop layout.

Apply this principle when modifying other mobile heroes; do not change unrelated pages merely to enforce it. Capture desktop before/after and verify no desktop change for mobile-only requests.

## Standing social preview standard

Every new public marketing page must define page-specific title, description, canonical URL, image dimensions, and descriptive image alt text in `shared/page-metadata.ts`, with an approved static social preview image before publication. Expose the registry metadata in the initial HTML response, using Vite generation and deployment rewrites; JavaScript-only head updates are insufficient. Keep SPA head updates synchronized. Use `https://www.clarity-engine.org` consistently. Keep draft routes unpublished and noindex, and private assessment/report metadata generic with privacy headers intact. Verify direct HTML without JavaScript, duplicate tags, actual image bytes/MIME/dimensions, favicon links, and metadata reset during navigation.
