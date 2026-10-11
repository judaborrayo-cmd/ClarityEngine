# Get Clarity Assessment draft

Branch: `draft/get-clarity-assessment`. Preview: http://127.0.0.1:4311/marketing-clarity-audit

This local preview uses `tests/audit-server.ts` with isolated in-memory storage and simulated payments. It cannot charge a card or grant access to a production purchase. Restart with `npm run build` followed by `AUDIT_PREVIEW_PORT=4311 npx tsx tests/audit-server.ts`.

The original sales route is retained. The full draft follows the supplied hero layout: HTML offer copy before the visual on mobile, white/mint background, navy/green typography, raised video panel, and six-area strip using shared colors and icons. The supplied latest `Get Clarity Assesment.mp4` is copied unchanged into the served project assets. The supplied poster is compressed to WebP. Playback is muted and inline, runs once, and supports pause/manual replay, reduced motion and rejected autoplay.

Customer-facing product labels are updated on the sales page, assessment screens, results, shared HTML report/snapshot, PDF headings and document metadata. The separate Deep Dive Audit is retained. Stripe Checkout receives a contextual submit description; its line-item Price ID and all payment validation are unchanged.

No scoring, questions, diagnostic rules, saved report JSON, report versions, identifiers, URLs, price amounts, live payment settings or production deployment were changed for this rename. Existing uncommitted implementation work was retained; this is a workspace draft, not a clean committed release.

## Copy and output review

The synthetic sample was generated using `createFrozenReport` from the existing diagnostic logic. `scripts/create-sales-example.ts` publishes only its display subset; no customer data or tokens are included.

The report generates three recommended moves when a constraint is selected. Some answer patterns select no constraint and return no priority fixes. The draft explicitly qualifies the three-move promise and describes the Work Session as the next step in that case. Diagnostic confidence describes the input-based diagnosis; the product does not inspect ad accounts or guarantee growth.

The approximately 12–18 minute estimate comes from the existing product specification, not measured completion-time data. Refund terms and any email-delivery promise are omitted because they are not established in this project. Wider case studies are linked as Clarity Engine work; no testimonial is represented as an assessment review.

## Separate external updates

- Stripe owns the configured Product/Price display name and receipt/product descriptions. Review the Product associated with the existing configured Price and update its customer-facing name separately; do not create a new Price or change IDs solely for the rename. No remote Stripe update was performed.
- Transactional customer email delivery is not implemented here. If Stripe receipt emails or another externally managed automation uses the old name, update those templates separately. Internal completion notifications are stored records, not customer emails.
- Live Stripe transport, external database and hosted preview routing are outside this isolated verification. No real purchase or live configuration change was made.

## Validation

See `tmp/get-clarity-check.log`, `tmp/get-clarity-build.log`, `tmp/get-clarity-unit.log`, `tmp/get-clarity-browser.log` and `test-results/` for local check output and desktop/mobile/tablet screenshots. The existing build warnings concern external script bundling, browser compatibility data age, and bundle size.

Final checks: TypeScript, frontend build and server build passed; 69 unit/integration tests and all 39 browser regressions passed across desktop, mobile and tablet. Three additional focused sales checks passed with served-media content-type assertions and an awaited final-frame seek. The supplied MP4 and project copy have matching SHA-256 checksums. The local preview returns HTTP 200 and remains running for review.
