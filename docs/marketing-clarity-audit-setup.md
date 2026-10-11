# Marketing Clarity Audit setup and verification

The audit uses native React routes, an Express API, Neon-compatible Postgres, Stripe Checkout, and branded PDF downloads. Reports include frozen copy as well as scores. No production memory fallback or purchase bypass exists. Test fixtures are imported only by test entry points.

## Local configuration

Copy `.env.audit.example` to `.env.audit.local` and provide `DATABASE_URL`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `MARKETING_AUDIT_STRIPE_PRICE_ID`, `AUDIT_TOKEN_SECRET`, and `AUDIT_APP_ORIGIN`. Use a Stripe one-time USD price of $27. The token secret must be at least 32 characters; generate it with `openssl rand -hex 32`. Keep this secret stable: purchase exchanges depend on it. Existing issued resume links are validated against stored hashes.

Apply the reviewable migrations to the configured database (the runner applies `0001_marketing_audit.sql`, `0002_marketing_audit_retake.sql`, and `0003_marketing_audit_work_notes.sql` in one transaction):

```sh
node --env-file=.env.audit.local --import tsx scripts/migrate-audit.ts
```

Start locally with environment loading:

```sh
NODE_ENV=development PORT=3001 node --env-file=.env.audit.local --import tsx server/index.ts
```

Set the trusted origin to match the browser exactly. For Stripe test-mode webhook forwarding, use the Stripe CLI to forward to `/api/audit/webhook`; put its webhook signing secret in the local configuration. The endpoint handles checkout completion and asynchronous payment success. Payment is verified against the expected price, product metadata, amount, currency, and browser claim before access is granted.

## Deployment

Vercel serves the existing frontend and `api/audit.ts` on the same domain. The audit API rewrite precedes the private HTML and SPA rewrites. Private HTML removes the site's external widget scripts and has initial noindex/no-referrer metadata. Private routes also receive no-store/noindex/no-referrer headers. Existing Sprint static metadata pages and payment links are preserved.

Configure the same environment variables in the target deployment, use its trusted production origin, and configure a Stripe webhook to `https://your-domain/api/audit/webhook`. Run the migration against the intended database before exposing checkout. No external database migration, live payment configuration, or deployment was performed during implementation. The Replit static deployment configuration cannot host the private API; it must use a server deployment if Replit becomes the production target.

The ordinary Express production server now serves Vite's `dist` directory after `npm run build` and `npm run build:server`.

## Verification commands

```sh
npm run test:audit
npm run check
npm run build
npm run build:server
npx playwright install chromium
npm run test:audit:e2e
```

Unit/integration tests cover canonical copy, five stress scenarios, scoring, confidence deduplication, unknown evidence, neutral P09, guarded P15, bundle selection, case applicability, progress, required details, payment ownership, token handling, failure/retry, frozen results, duplicate callbacks, downloads, and PostgreSQL transaction rollback. PostgreSQL migration/adapter tests use a separate embedded Postgres instance. Browser tests use isolated injected storage/payment fixtures on port 4307 and run desktop/mobile/tablet flows; they cannot grant access to production purchases.

Browser screenshots and downloaded PDF fixtures are saved under ignored `test-results/`. Both download actions return binary `.pdf` files with `application/pdf`. The PDFs use the same frozen report data and shared presentation helpers as the website. Customers do not need to print HTML or configure an external PDF service.

The Node generator uses `@react-pdf/renderer` with bundled Inter fonts and the existing Clarity Engine logo. `pdf-lib` stamps page numbers from the completed physical page count. This avoids headless Chromium, remote font requests, and a separate paid service. `vercel.json` includes the local assets in the API function bundle. Letter and A4 fixtures can be generated with `npx tsx scripts/verify-audit-pdf.ts`; these are private, ignored QA artifacts, not deployed customer reports.

## Persistence and notifications

Customer context, verified purchase, initial progress, and Report 1 live in the private audit-session row. A separate retake row, unique per purchase, holds retake progress and frozen Report 2. Notifications and completed-report events are stored atomically with completion. A database trigger protects completed context, answers, report, version, ownership, and completion timestamp. No public internal-report endpoint exists; notification payloads contain the internal report/session UUID for an operator's database lookup, rather than distributing bearer resume URLs.

Internal completion notifications are durable database records. Email delivery is not configured, and no email is sent. This implements the user-authorized send/store notification option without adding a transactional-email dependency.

First-party funnel events are stored separately with an allowlisted event name, optional internal session UUID, optional question ID, and timestamp. Answer values, customer fields, and resume tokens are excluded from event payloads. Analytics failures never block the assessment. There is no analytics dashboard in V1.

Live Stripe and Neon transport and deployed Vercel routing require validation after credentials/provisioning. Passing isolated tests does not claim live payment or deployment verification.

## Implementation verification record

The final implementation passes 41 unit/integration tests and 24 browser tests across desktop, mobile, and tablet, plus TypeScript checking, frontend and Express production builds, and the Vercel API bundle check. The canonical Markdown source remains byte-for-byte unchanged. The production Express smoke check confirms the sales page, private-route privacy headers, removal of external widget scripts, and a controlled 503 response when service configuration is unavailable. Report and Work Session print output was rendered and visually inspected in both Letter and A4 sizes. Live Stripe, Neon, and deployed Vercel checks remain dependent on provisioning.

## Assigned V1 Stripe price

The user-provided Price ID is `price_1UNAsiF2Vf3NGmY3o7XmNmIa`, configured as `MARKETING_AUDIT_STRIPE_PRICE_ID` in the template and local audit environment. Its Stripe account, mode, and price properties have not been verified remotely. Sandbox testing must use a price from the same sandbox as the API key; a live price cannot be reused with test credentials. Checkout remains server-created, one-time (`mode: payment`), quantity one; paid access requires USD 2700 total and the configured price. No Payment Link is used.

The exact checkout order creates the Stripe Session first, then stores its pending audit record keyed by that Session ID, before returning the checkout URL to the customer. On return, verified payment and browser ownership unlock the paid session.

For local webhooks, authenticate the Stripe CLI to the intended sandbox and run:

```sh
stripe login
stripe listen --events checkout.session.completed,checkout.session.async_payment_succeeded --forward-to http://localhost:3001/api/audit/webhook
```

Enter the listener signing secret in local `STRIPE_WEBHOOK_SECRET`, rather than a Dashboard endpoint secret, and keep the listener running while testing. Configure a separate webhook destination/signing secret for Vercel Preview later.

## Local checkout troubleshooting

Local testing found a Product ID (`prod_...`) in `MARKETING_AUDIT_STRIPE_PRICE_ID`. Stripe rejected checkout with `resource_missing` on the price. The verified matching sandbox Price is `price_1UNBOpF2Vf3NGmY3Bugv2Rcs` (USD 2700, one-time, active, non-live); the private local configuration now uses it. The originally assigned V1 Price remains in the template for later deployment configuration. Restart the app after changing its environment file.

Audit checkout logs now show request arrival, failure stage and allowlisted error code, and final HTTP status. Private paths, bearer tokens, response bodies, customer data, raw error messages, and credentials are excluded.

## Upgrade an existing local audit database for retakes

Before using the updated app against an already migrated database, rerun `node --env-file=.env.audit.local --import tsx scripts/migrate-audit.ts`, then restart the app. The added retake migration preserves existing answers, reports, and secure links; it adds one optional retake per completed purchase and a per-run notification key. The migration runner is safe to repeat. No remote database migration or production deployment was performed for this change.


## Report presentation and online Work Session upgrade

Before testing online notes against your existing local database, apply the idempotent migration runner and restart the app:

```sh
node --env-file=.env.audit.local --import tsx scripts/migrate-audit.ts
NODE_ENV=development PORT=3001 node --env-file=.env.audit.local --import tsx server/index.ts
```

Migration `0003_marketing_audit_work_notes.sql` adds mutable notes keyed by purchase, report number, and frozen prompt ID. Existing answers, secure links, and frozen reports are preserved. Notes autosave through the authenticated API and remain separate from diagnostic responses and scoring. Each report has its own notes; changing tabs or returning through the secure resume link restores them. Failed saves show a retry action. The blank PDF provides writing space. The completed Work Session PDF uses a fresh snapshot of the selected report’s saved notes and retains writing space for unanswered prompts. Long responses can continue across pages. The completed download button stays disabled until at least one nonblank response has saved, and while any changes remain unsaved.

The original scoring, question copy, weights, pattern selection, and recommendation bundles remain unchanged. Shared presentation helpers improve legacy frozen reports without rewriting their stored JSON. Pattern plans support authored Objective/Actions/Done When weeks; P01 uses the approved detailed copy. Other patterns use their existing diagnostic phase tasks and selected recommendations to build distinct objectives, actions, and deliverables. The central six-section palette is shared by assessment, report, worksheet, and PDF scorecards.

No migration has been applied to an external database for this upgrade. No Stripe settings or deployment have been changed.


## Account-free private results workspace

The existing bearer results/resume link remains the V1 access mechanism; no account, password, login, or account recovery has been added. The results header offers **Copy private link** and optional bookmark guidance. The copied link points to `/audit/results/:token` without a report filter so the returning customer can access all completed runs and any available retake. Report switching uses `?run=1` / `?run=2` on the same workspace.

Each completed run’s answers were already frozen in its protected database row. The private report API now returns `frozenAnswers` from the selected completed row, separately from report JSON. The read-only six-section accordion renders all 35 canonical questions and highlights each saved choice; it does not use current retake answers when reviewing Report 1. No frozen rows or report JSON are rewritten.

Downloads remain `GET /api/audit/:token/download/report?run=1`, `.../work-session?run=1` for the blank workbook, and `.../work-session-completed?run=1` for the saved-response workbook (run 2 works identically). All endpoints retain the paid-session secure-token protection and private response headers. No public storage URL or email distribution is added.

Work Session changes autosave on a short debounce and blur, retry on restored connectivity, and stay in memory if a request fails. The customer sees a calm warning and manual retry; the completed download and report/retake switch controls wait for pending changes to save. Browser closure warns while unsaved changes remain. Successful saved notes are restored from Postgres on refresh, secure-link return, or a fresh browser context without cookies. A lost secure link has no recovery flow in V1; the interface tells the customer to keep or bookmark it safely.

This pass uses the existing `0003_marketing_audit_work_notes.sql` table. No new migration is needed if the previous three-migration runner has already been applied to the local/sandbox database. No external migration or deployment was performed.

### Saved action checklist

The latest report pass adds `0004_marketing_audit_checklist.sql`. With your local/sandbox database configured in `.env.audit.local`, rerun the idempotent migration runner, then restart the app:

```sh
node --env-file=.env.audit.local --import tsx scripts/migrate-audit.ts
NODE_ENV=development PORT=3001 node --env-file=.env.audit.local --import tsx server/index.ts
```

This stores independent Report 1/Report 2 completion checkboxes without altering frozen reports, diagnostic answers or Work Session notes. No additional credentials or services are needed.

### Local-only Scenario QA copies (preserves the purchased retake)

This opt-in CLI creates a separate marked QA session from an existing verified $27 Stripe test purchase. It copies the original business details and starts with no answers, reports, notes or checklist entries. It never modifies the source session or its retake, and it does not purchase anything. The original private link remains the customer workspace. QA reports use the normal diagnostic/PDF flows but do not send completion notifications. Purchaser/business identity is locked server-side in the QA copy.

1. Keep your existing test credentials in `.env.audit.local`. Add `AUDIT_LOCAL_QA_ENABLED=1` to that file. Do not paste keys or private links into chat.
2. Restart the local app with development mode explicitly set:

```sh
NODE_ENV=development PORT=3001 node --env-file=.env.audit.local --import tsx server/index.ts
```

3. In a second terminal, from the repository directory, run:

```sh
NODE_ENV=development node --env-file=.env.audit.local --import tsx scripts/create-audit-qa.ts
```

4. At the terminal prompt, enter the original `http://localhost:3001/audit/results/...` or `/audit/resume/...` private URL (a `?run=1` query is fine). The helper validates the stored paid session and reads the Stripe Checkout Session to confirm test mode, paid status, USD $27, one-time, quantity 1 and the configured Price ID. It prints a new private QA assessment link. Open that link to start Scenario 2 at Question 1 with the existing business context. The assessment/results show a LOCAL QA label. Original answers are not copied.
5. Keep the new QA link for autosave/resume and QA report downloads. To start another scenario, rerun the helper with the original purchased link, not the QA link.

Disable QA by removing `AUDIT_LOCAL_QA_ENABLED` (or setting it to `0`) and restarting the app. QA links then become unavailable; real customer links remain available. Do not configure this opt-in in deployed environments. Both creation and access reject production mode, Vercel, missing opt-in, live keys and non-local app origins even if QA rows exist in a shared database. The CLI is not exposed as an HTTP route and can be removed by deleting `scripts/create-audit-qa.ts`. Leave the fail-closed access guard in place if QA rows remain. No migration is needed.

### Optional company logo cache

The Marketing Clarity Snapshot needs no configuration. Company-logo discovery uses the required website URL and needs no additional service or credentials. Apply migration `0005_marketing_audit_company_logo.sql` with the existing local/sandbox migration runner, then restart the app:

```sh
node --env-file=.env.audit.local --import tsx scripts/migrate-audit.ts
```

The results page requests the logo separately from report generation. Discovery prefers organization metadata, identifiable logo assets, relevant social logo metadata, then raster icons. Requests use validated public IP addresses pinned to each connection, validated redirects, restricted schemes/ports, byte limits and timeouts. Accepted PNG/JPEG/WebP images are decoded with dimension limits, normalized to a bounded PNG, stripped of metadata, and checked for basic readability. SVG/ICO-only sites may use the company-name fallback.

Only the normalized PNG (or a failed-attempt marker), website identity and checked timestamp are cached in a separate purchase-level table for 24 hours. It is shared by Report 1/Report 2 because business identity is fixed. The asset endpoint uses the same private paid-session access rules. PDFs read only the cached logo and fall back to company name; they do not fetch remote resources. Missing cache configuration, invalid images and discovery failures do not prevent generating or downloading reports. No remote migration was performed.
