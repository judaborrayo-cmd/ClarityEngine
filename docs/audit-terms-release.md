# Deep Dive Growth Audit terms release — October 14, 2026

Approved by owner instruction to publish Audit-specific terms and nonpayment legal links. Release is based on the currently served production commit 3752aa45b22d438c4ea3895f6e1684c4a304fcb2, not the unrelated draft/main release that was rolled back.

Public policy: https://www.clarity-engine.org/terms-of-service
New disabled purchase review: https://www.clarity-engine.org/checkout/deep-dive-growth-audit

The legacy /checkout/audit and its $1,250 purchase/confirmation terms remain unchanged. The new review is separate because production still serves the legacy offer. No $3,725 Stripe link is exposed as a purchasing link, and no Stripe configuration is mutated. The footer provides policy discovery; the policy links to the new review and the review links to cancellation terms before the disabled checkout action. Stripe will collect the mandatory acceptance at checkout when configured, with no redundant website checkbox.

Terms identify Invision Group Inc., operating as Clarity Engine, and owner-supplied Juda.Borrayo@gmail.com. No verified replacement was found. Cancellation before written commencement permits only actual nonrecoverable processing fees where legal and disclosed with amount or calculation/rate before purchase. Without that disclosure no fee is deducted. After commencement the accounting reflects work performed rather than blanket forfeiture. Provider non-delivery refunds protect unperformed and unusable portions. No governing-law selection, arbitration, waiver, liability cap or broad IP assignment introduced.

Terms and all initial metadata are generated in the initial HTML response. Both route variants rewrite to generated HTML. The existing approved static /social/default.jpg supplies the 1200×630 branded preview; no new promotional image is needed for the legal page. SPA metadata uses the same registry. New review is noindex; no draft pages are published.

Local verification: npm run check; npm run build; npx tsx scripts/verify-page-metadata.ts; responsive screenshots and navigation checks at 320×568, 390×664, 768×1024, 1440×900. Complete eleven-section policy checked with JavaScript disabled. Footer navigation, cancellation anchor, metadata reset and tag uniqueness passed. No overflow or page errors. Checkout button disabled; no payment link or second checkbox. Existing product and API files compared to production baseline with no differences. Screenshots/verification script retained locally in the primary workspace output/audit-terms-20261014, excluded from deployment.

Remaining launch work: configure the Stripe public terms URL and mandatory consent on the $3,725 link only; disclose any intended processing-fee deduction before payment; replace the old success redirect and verify the dedicated payment confirmation/fulfillment flow before activating. The Assessment production configuration issue recorded in the earlier release is outside this legal-only change and no API health fix is claimed here.
