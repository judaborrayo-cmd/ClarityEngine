# Page-specific social previews

The shared registry is `shared/page-metadata.ts`. Vite emits one HTML document per published route; `vercel.json` rewrites direct requests to those documents. The SPA hook resets its managed tags from the same registry. Express static serving uses the same route-to-file mapping. Canonical hostname: https://www.clarity-engine.org.

Dedicated 1200×630 optimized JPEG previews: homepage, About, Get Clarity Assessment, Strategy Sprint, Sprint checkout, case-study index, and all eight existing case-study paths (fitness-roi shares Core40 imagery). Services, testimonials, Deep-Dive Audit and its checkout, Steven, and confirmation pages use a branded default because they have no suitable independent hero imagery. Titles, descriptions, and canonical URLs remain route-specific.

Asset provenance: home video at 4 seconds, founder transformation at 9.5 seconds (settled approved scene), assessment ping-pong video at 3 seconds, Sprint sorting at 5 seconds. Frames are contained with mint safe margins, never cropped. Case-study previews use the site's existing corresponding portfolio images. No new portraits, endorsements, private reports, or customer data were created. JPEG assets are in `client/public/social/`; the browser favicon remains the existing Clarity Engine logo, and the 180×180 Apple touch icon is derived from it.

Ways to Work Together is now approved for publication, with its own offer-composition image and generated initial HTML. Private audit routes retain generic noindex metadata, no canonical containing report tokens, and existing no-store/no-referrer headers.

Verification: `npm run check`, `npm run build`, `npx tsx scripts/verify-page-metadata.ts`; set METADATA_BASE to the public hostname to verify deployed direct responses, MIME types, dimensions and privacy headers. Browser navigation was checked About → Sprint → Assessment → About → homepage, with one canonical and no duplicate Open Graph/Twitter tags. No layouts, offer terms, prices, payment links, or media playback were changed by this update.

Sharing platforms may retain cached previews. Their URL inspection/debugging or refresh tools may be needed after publication; updates are not guaranteed to appear immediately everywhere.
