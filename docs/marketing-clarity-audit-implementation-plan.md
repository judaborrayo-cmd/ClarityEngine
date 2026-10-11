# Marketing Clarity Audit implementation plan

Repository discovery completed October 4, 2026. The canonical specification is preserved verbatim in `marketing-clarity-audit-v1-spec.md`. The user's follow-up decisions are authoritative: preserve all 35 questions, deterministic decisions, paid-first access, no accounts, secure autosave/resume, frozen reports, curated bundles, selective insights, and V1 scope. Severity overrides stage; similarly severe constraints generally follow upstream dependency order. This plan records technical choices; it does not silently amend diagnostic rules.

## Implementation status

Phase 2 is implemented: reproducible canonical content, weighted scoring, flags/severity, contradictions, confidence, supported pattern matching, constraint precedence, bundles/substitutions, case selection, KPI guidance, Work Sessions, plans, and frozen report data. The user's evidence/P09/P15/ML4 decisions are encoded in `marketing-clarity-audit-v1-rule-notes.md` and regression tests.

The paid-session backend and assessment/report UI are also implemented. Stripe verification is browser-bound, resume tokens are opaque and hashed, each answer autosaves, insights are persisted and capped at ten, and completion atomically freezes the report and internal notification. Printable downloads share the web report component. Each purchase now includes exactly one full retake with a separate frozen Report 2; purchaser/business identity stays fixed, and either report remains selectable without a comparison feature. Vercel API/private HTML routes, first-party allowlisted events, SQL migration, and setup documentation are included.

Isolated tests pass for the five stress scenarios, payment ownership, autosave/resume, immutable completion, duplicate callbacks, downloads, and PostgreSQL rollback. Desktop/mobile/tablet browser runs cover complete assessment and failure/retry. Final verification counts are recorded in setup/QA notes. Live payment, Neon transport, remote migration and deployed Vercel routing remain unverified because no service credentials were configured. No deployment or live payment modification was performed.

## Existing repository

- React 18 and TypeScript SPA, built with Vite 5; React Router routes in `client/src/App.tsx`. Wouter is installed but is not the active routing model.
- Express 4 runs the development server and contains the waitlist API. Production server build is a separate script. Both Vercel rewrites and Replit deployment currently target static hosting, so the Express API is not deployed by the existing frontend build.
- Tailwind 3, Inter, CSS color/spacing/radius tokens in `client/src/index.css`, Radix/shadcn buttons, cards, inputs, radio controls, progress, and toast components are available. Reuse the current responsive containers, white surfaces, rounded borders, purple/pink tokens, and green proof accents.
- `client/src/components/CaseStudiesCRO.tsx` provides rounded proof cards with Problem/Solution copy and outcome accents. Extract a small shared proof-card shell rather than importing the whole asset-heavy case-studies page or inventing another visual system. Audit cases remain anonymized and preserve their supplied evidence levels.
- Deep Dive Audit ($1,250) and Strategy Sprint ($497) use distinct hard-coded Stripe Payment Links. There are no checkout creation APIs, webhooks, Stripe SDK, verified purchase records, or server-side ownership checks. Preserve these existing products.
- Drizzle, Neon serverless Postgres, Zod, and `DATABASE_URL` conventions are installed. `shared/schema.ts` defines users/waitlist, but runtime storage is `MemStorage`; there is no durable database adapter or migration directory.
- No transactional email integration or email environment configuration was found. Store internal completion notifications durably in V1, as permitted by the pasted request; no new email service is necessary for that behavior.
- No active analytics event transport was found in application code or HTML. Add a small allowlisted audit event adapter; exclude answers, names, email, website, and private tokens. Provider selection can remain configuration-driven.
- No unit/E2E test runner configuration, PDF library, or existing report print implementation was found. Node's test runner through the existing `tsx` can cover pure logic without adding a unit-test dependency. Browser verification needs a browser harness.
- Zod validates the existing waitlist endpoint. There is no implemented private-report access model, token throttling, or audit privacy convention. The Express logger captures API response bodies and paths; audit routes must redact tokens and omit bodies before private APIs are introduced.
- `.env.local` contains Vercel tooling configuration only. No audit database or payment credentials are presently configured. Do not copy secrets to documentation or client code. Local Express startup does not currently load `.env.local` automatically.
- Baseline `npm run check` passes. Initial working tree was clean. No applicable `AGENTS.md` was found in the workspace tree.

## A Route and component architecture

Keep the React SPA and same-domain routes: `/marketing-clarity-audit`, `/audit/start`, `/audit/resume/:token`, `/audit/results/:token`. Use a quieter audit layout with the existing typography and components. Private route metadata must override the current default metadata reset; also serve `X-Robots-Tag: noindex, nofollow` for private routes and API responses.

Create versioned modules under `shared/marketing-clarity-audit/`: canonical content, types, validation, scoring, confidence/contradictions, pattern resolver, recommendations, case matching, KPI selection, Work Session selection, and plan selection. Pages import content and result types; they contain no scoring rules. Keep private persistence and Stripe verification in `server/audit/`.

Proposed API operations: create checkout; exchange verified checkout for an assessment session; read private session; save context; upsert a response; complete/freeze report; fetch report; download report or Work Session. Completion is transactional. An already completed session returns its existing report and rejects answer edits.

## B Storage and migration

Use the installed Neon Postgres driver and parameterized SQL. A compact transactional schema consolidates customer, purchase, responses, progress, and frozen report in `marketing_audit_sessions`, minimizing duplicated personal data. Related tables hold `marketing_audit_notifications`, `marketing_audit_payment_events`, `marketing_audit_rate_limits`, and `marketing_audit_events`. The migration is `migrations/0001_marketing_audit.sql` with a runnable migration script. Drizzle remains available to the existing site; a second ORM layer is unnecessary for this small feature.

Canonical definitions remain versioned code/content. A database trigger prohibits changes to completed answers, customer context, report data, version, ownership and completion timestamp. Completion uses a row lock and transaction; failed notification creation rolls back the report write. No production memory fallback is provided.

## C Payment and session initiation

Proposed approach: a dedicated Stripe Checkout Session for the $27 product, created server-side using a configured Stripe price. Store an opaque browser purchase claim and bind it to checkout creation. The return URL alone is not proof of purchase or ownership. Verify paid status, product, amount, currency, and browser claim server-side before session initiation. A webhook verifies Stripe signatures over raw request bytes, records payment events idempotently, and reconciles delayed confirmations. Repeated callbacks must not create additional entitlements.

Expose the Express API through a same-domain Vercel function before the SPA catch-all rewrite, while retaining existing static Sprint HTML routes. The same API modules should run under local Express. This requires deployment work; adding SPA pages alone is insufficient.

Required deployment configuration: `DATABASE_URL`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `MARKETING_AUDIT_STRIPE_PRICE_ID`, `AUDIT_TOKEN_SECRET`, and `AUDIT_APP_ORIGIN`. Mock verified purchases only through test dependency injection, never through a public bypass endpoint.

## D Secure resume

Generate a 32-byte cryptographically random browser purchase claim. Derive a pseudorandom 32-byte resume token with HMAC-SHA256 over the claim and checkout ID using a stable server secret, and store only its SHA-256 hash. This allows idempotent purchase exchange without storing plaintext resume credentials. The private resume URL is a bearer credential. Validate token shape and hash server-side, use durable throttling, `Cache-Control: no-store`, `Referrer-Policy: no-referrer`, and redact token paths from logs. Do not send these paths to third-party analytics. Show a copyable/bookmarkable resume link; no account recovery or abandonment email.

Restore the first unanswered question from saved responses. Persist each answer before advancing; on failure retain the selected response and expose Retry. Prevent duplicate in-flight submissions and handle Back/edit safely. Completed resume URLs open the frozen result. Keep report reads and completion checks behind the same token authorization.

## E Reports and downloads

Use one structured frozen report for the exact 15-part web sequence and both downloadable print-friendly HTML artifacts. HTML downloads satisfy the specification's printable/downloadable option and allow browser Save as PDF without a server Chromium dependency. Work Session includes only its configured prompts and decision synthesis. Escape all customer data, use self-contained print CSS, avoid external trackers/assets, and test Letter/A4 page breaks. Native server-produced PDF can be added only if HTML proves insufficient for the required experience.

## F Verification sequence

1. Extract exact canonical content and assert 35 questions, six sections, all answer options, weights, flags, and recommendation references. Run weighted-scoring and canonical stress-scenario unit tests before UI work.
2. Test confidence deductions/caps, explicit modifiers, contradictions, precedence, secondary constraints, strength suppression, bundle substitutions, case applicability, and KPI/prompt/plan selection after rules are settled.
3. Test payment verification/ownership, duplicate callbacks, token authorization, context validation, response upserts, concurrency, frozen reports, and exactly-once completion events using isolated test storage and mocked payment transport.
4. Browser-test complete assessment, teaching notes, all section transitions/progress buckets, Back/edit, autosave failure/retry, close/resume, invalid token, completed resume, and download failures.
5. Verify keyboard controls, focus, semantic headings, mobile/tablet/desktop overflow, contrast, print output, and regressions on existing checkout/home/case-study pages. Run TypeScript and production builds.

## G Explicit rule interpretations and remaining deployment prerequisites

The user's latest instructions resolve unavailable evidence, neutral P09, guarded P15 and single ML4 confidence deduction. `marketing-clarity-audit-v1-rule-notes.md` records those decisions and the numeric interpretation of qualitative thresholds using the existing section bands. Answer modifiers replace generic uncertainty penalties for the same answer, and the deduction ledger makes independent contradiction penalties visible.

Teaching insights trigger only for canonical D/E answers, with a persisted ten-note cap across resume and edits. Recommendation completion criteria operationalize canonical actions; CR07 substitutes journey continuity review for proof creation while retaining proof placement, avoiding duplicate recommendations. Default E=1 remains unchanged because no canonical overrides exist.

Credentials/provisioning are required for live Stripe/Neon validation and deployment. See `marketing-clarity-audit-setup.md` and `.env.audit.example`. Completion notifications are stored; email is not sent. Downloads are branded, server-generated binary PDFs; online Work Session notes are separately persisted for each report. The user-approved included retake is now part of V1; comparisons, accounts, reminders, and the remaining V1.1 features stay excluded.


### Approved V1 report presentation upgrade

- Use a central accessible six-section palette across the wider assessment/report layout and printed scorecards.
- Keep frozen diagnostic results immutable. Shared presentation helpers improve confidence explanations and legacy plan display without changing evidence, scoring, selection, or recommendation bundles.
- Author P01 rich Objective/Actions/Done When weeks; allow each pattern to supply equally rich content, with structured defaults derived from its existing phases and recommendations.
- Store post-diagnostic working notes outside frozen reports, keyed by purchase/report/prompt. Protect reads and writes with existing secure token ownership and completed-run validation. Tabs do not change diagnostic answers.
- Generate two branded binary PDFs locally in Node using React PDF, bundled Inter/logo assets, and PDF-lib physical page numbering. No new image generation, browser service, or PDF subscription is required.
- Test persistence, retry, tab navigation, run isolation, PDF metadata/header/filenames, palette contrast, and Offer-48/P01/High-100 explanation. Visually review report/workbook in Letter and A4.
- Require migration 0003 before local worksheet testing. Do not run external migrations or deploy until authorized.


### Approved no-account results workspace persistence clarification

Reuse existing secure results/resume token, protected frozen answer rows, and per-run Postgres Work Session notes. Add clear copy/bookmark guidance, saved-note/offline-work guidance, a calm save warning, blank/completed PDF choices, read-only 35-answer review accordions, remaining/used retake language, and independent report switching. Completed PDFs read selected-run notes from the server; do not mix current retake answers or other-run notes into historical results. Preserve the scorecard’s explicit score/status spacing and verify both Letter/A4 output, including long-note continuation. Test fresh browser access without cookies in addition to refresh, retries, and report switching. No account or recovery mechanism and no production changes.

### Report action workspace usability pass

Checklist completion is mutable workspace data in `marketing_audit_checklist`, keyed by purchase, report run and frozen recommendation ID. It never enters diagnostic inputs or frozen report JSON. GET/PUT checklist endpoints use the same paid secure-token, no-store, origin and rate-limit protections as notes; boolean values and actual selected recommendation IDs are validated. Rapid toggles serialize each field, failed writes retain local state for retry, and report switching/retakes wait for pending writes. Report PDF checkboxes are always empty, independent of online progress.

Existing selected case/AI content receives a presentation-only teaching layer. No pattern, scoring or recommendation selection changes. The metrics module accepts optional richer imagery; its default is a responsive branded HTML journey. The PDF plan uses two self-contained dashed-cut cards per page (Letter/A4), each with business identity, week, objective, actions and completion criterion. Blank and completed Work Session downloads remain separate.

Apply migration 0004 locally before using the checklist. No production/database deployment was performed.

### Report hierarchy and visual case evidence refinement

The personalized report cover precedes navigation and the compact private-link/retake utility row. Existing secure access, retake guards and work notes are unchanged. New recommendation snapshots include `whyCritical`; older frozen reports read the matching authored explanation at presentation time, without rewriting saved JSON. Offer actions use three distinct explanations. Positive green checklist accents and restrained warm-red “not yet” treatment distinguish action from deferred work.

Offer case teaching explicitly states that the original offer presentation is not currently shown. It retains the revenue model, diagnosed clarity risk, customer outcomes, proposed direction, rationale and lesson without implying visible historical evidence. `CaseVisualComparison` accepts before/after assets, captions, blur/redaction options and a visible reconstruction label. Redacted assets are not rendered, and blurred visuals do not expose sensitive alt text. No reconstructed or stock images were generated. Optional KPI and AI imagery slots support a later asset pass; PDF case copy also clearly identifies the unavailable visual evidence.

The 30-day plan introduces the optional desk-card workflow. PDF cards retain dashed borders, scissors and intact Letter/A4 placement. `/services` remains the continuation destination. No new migration, credentials, production or deployment changes are required for this presentation pass.

### Stable case visual assets and semantic cards

`shared/marketing-clarity-audit/case-assets.ts` defines the five Offer asset IDs (before, after, comparison, problem icon, customer-value icon) plus the audience/message/conversion/traffic/measurement `visual_01` IDs. Supply optional assets through `caseVisuals.assets`, keyed by these stable IDs; descriptors accept `src`, `alt`, `caption`, `blur` and `redacted`. Existing before/after props remain supported. Reconstruction labeling remains explicit, and unavailable visuals retain the placeholder. Category IDs are also exposed as `data-asset-id` hooks when rendered. No asset files are required now.

The problem card uses a muted pink surface with an X-in-circle; customer value uses a green surface with a bullseye. Semantic icons are decorative for assistive technology because the adjacent headings provide the meaning. Heading contrast exceeds 7:1; body contrast exceeds 12:1. Custom icon assets can replace the vector defaults via the stable icon IDs. This changes only web component structure and visual treatment; diagnostic data, PDF generation and persistence are untouched.

### Lean question display and six-layer assessment Clarity Stack

The approved 35 lean prompts live in `question-display.json` and are resolved by question ID through `questionDisplay`. The canonical questionnaire and its original prompts, answer choices, IDs, rules, teaching notes, scores and weights remain unchanged. Assessment screens and read-only answer review use the display layer; historical frozen answers and reports are not rewritten.

`DiagnosticClarityStack` renders the six canonical section colors as compact stacked bricks in the existing sticky progress header. Completion derives only from saved answers for every question in a section. Active sections are emphasized; completed sections fill with their section color; upcoming sections are muted. Section-complete transitions remove active emphasis from the saved completed brick. Back/edit highlights the currently viewed layer even if its answers are already complete. Resume reconstructs the visual from persisted answers without extra state or writes. Numeric progress and estimated time remain alongside the stack.

At pre-report completion, the six completed layers remain visible and the transition line connects them to the existing four numbered report-output cards and Generate CTA. No gamification or scoring interpretation was added.

`MarketingSystemInteractions` is an optional, empty-by-default report presentation hook with authored item IDs, titles, explanations, section references and existing source-pattern IDs. Future content such as “Strong Offer + Weak Message” can be passed via `AuditReportView.systemInteractions`; no interaction rules, diagnoses or report content are invented now. No migration, production data or deployment changes are required.

### Marketing Clarity Snapshot and optional company branding

Replace the thin summary presentation with authored orientation templates keyed to the existing primary section and selected pattern. Read the six existing scores, existing severity, secondary constraint, relative strength and frozen deprioritized actions; do not recompute or change diagnosis. Strong/functional areas with major severity are not described as unqualified strengths. Message profiles with strong Offer/Audience and functional Conversion receive a specific value-translation orientation; Offer profiles explain the foundational issue, including the distinct validation pattern. P09 keeps its directional uncertainty. Healthy/no-primary profiles do not manufacture a fix.

Web and report PDF share the snapshot helper, interpretation guidance and actual score-band thresholds (80/65/45; Priority Area below 45). Later diagnosis, strength, recommendations and deferred-work sections remain intact. Frozen report JSON is never rewritten. The previously implemented lean question display, six-layer assessment stack, four-output completion stack and empty future interactions hook remain unchanged.

Company-logo discovery is a separate authenticated image request; completion does not wait for it. Persist bounded normalized raster PNGs separately from frozen reports. Discovery refuses local/private/reserved addresses, pins approved DNS addresses, revalidates each redirect, uses no credentials/cookies, and limits time, bytes and pixels. Images that fail basic decoding/readability checks retain company-name fallback. Web rendering hides failed assets; PDF rendering revalidates cached PNGs and never downloads a remote image. Test stores default to no logo and make no real website requests.

Migration 0005 adds only the optional cache table. No production database, Stripe, deployment or external-service configuration changes were performed.

### Scenario 5 action hierarchy and decision Work Session

Keep the selected primary constraint as the single first priority. Supporting constraint and relative strength are separate concepts; the three moves are actions for the primary constraint, not three additional constraints. Supporting copy and the conditional “What comes next” note use only the resolver's existing secondary selection. The Scenario 5 fixture (rounded Traffic 50, Measurement 66) still resolves to P13 with no supporting constraint. No thresholds, scoring, flags, pattern matching or bundle selection changed.

Approved copy updates apply to existing IDs TRAF_04, TRAF_05 and ML_06. New reports receive the authored title/action/completion/critical rationale; historical frozen recommendations receive this editorial presentation without rewriting their stored JSON or changing their selected IDs/order. Web moves and report PDFs use the same approved content. Newly generated plans draw on the revised recommendations; existing frozen plan structure is preserved.

`work-session-content.ts` defines a registry of pattern-specific thinking, decision and optional supporting prompts, with stable IDs and optional helpers. P13 currently has the seven approved decision questions and helper lines. Unauthored patterns retain their frozen prompts. The primary tab helps understand the problem/evidence/implications; the decision tab chooses one concrete action/test and its evaluation.

New P13 decision IDs use `p13-decision-*` to avoid reassigning the meaning of old `decision-*` notes. Previously saved generic responses remain visible and editable under their original frozen question labels, explicitly identified as prior responses; they also appear in completed PDFs. Empty legacy fields do not clutter fresh worksheets. The existing authenticated server allowlist derives from the selected report's prompt set; notes remain separate per report and never enter diagnosis. No migration or production changes are needed.

PDF Traffic decision worksheets use two intentional decision pages rather than letting a final prompt spill without a continuation heading. Traffic deferred actions share a page with the relevant real-world example; toolkit guidance remains present, and conditional supporting sequencing stays after the weekly plan. Letter/A4 cut cards and scorecard spacing remain protected.

### Single focused Clarity Work Session

The online worksheet no longer has tabs. It presents the frozen pattern-specific primary thinking prompts, supporting prompts where selected, then one compact “Your decision” group with exactly three active fields: next action, what not to change yet, and the success metric. The approved intro is shared with the PDF. Current field IDs are `final-next-action`, `final-hold-steady`, and `final-success-metric`; all use the existing server-side autosave and selected-report access rules. No scoring or recommendation changes occur.

Generic `decision-*` and earlier P13 decision fields remain legacy-only to preserve saved text and its original meaning. They are not reused for the new questions. Nonempty old responses are available in a collapsed “Previously saved responses” section and an appendix in completed PDFs; they do not appear as blank fields in a fresh worksheet. Primary/supporting prompt IDs and labels remain unchanged. Notes continue to be isolated by Report 1/Report 2.

Blank and filled PDFs follow the same sequence and retain optional company branding, writing space, and long-response wrapping. The three final fields follow the thinking/supporting prompts rather than forming a separate generic worksheet. No migration, credentials or deployment changes are required.

### Scenario 6 constraint education and observable improvement

`constraint-teaching.ts` provides authored definitions, strong/constrained examples, growth consequences and observable progress indicators for all six canonical categories. It is a presentation layer keyed to the existing selected primary section. Lists describe hypothetical states rather than asserting additional conditions about the customer. No scores, severity, confidence, patterns, recommendations or frozen data are changed.

`ConstraintTeaching` expands the biggest-constraint section while showing the existing score/band. Its comparison is side-by-side on desktop and stacked on mobile, with canonical theme accents and accessible green/pink comparison surfaces. Supporting constraint and relative strength remain distinct and use only existing resolver selections. Reports without a selected primary do not manufacture a teaching diagnosis.

`ImprovementEvidence` replaces the former Metrics Worth Watching module. Each category has concrete signs of progress; Measurement uses the five approved KPI hierarchy/source-of-truth/downstream/decision/cumulative-learning indicators. A subordinate, optional example hierarchy explains business outcomes, supporting indicators and diagnostic signals. Measurement uses the approved illustrative revenue/qualified-lead/diagnostic example; other categories retain their frozen KPI values only as explained examples. Future imagery remains injectable; no images were generated.

The web flow remains Snapshot → scorecard/interpretation → constraint education → actions → deferred work → case → improvement evidence → AI → plan → Work Session. Existing confidence, supporting sequencing and useful later sections are preserved. PDF uses the same canonical lesson and progress content with dedicated readable teaching and improvement pages, two-column Letter/A4 comparisons, intact desk cards and existing blank/filled Work Session documents. ASCII arrows are used in PDF flow sentences where necessary for font fidelity. No migration, production data or deployment changes are required.

### Six-category scanability and customer relevance pass

Progress signals use semantic Lucide icons selected per signal (comprehension, outcomes, fit, language, proof, action, journey, tests, documentation, source of truth, downstream links and reporting). Web icons use a consistent small tinted badge and the existing primary-section color; decorative SVGs are hidden from assistive technology because the adjacent title supplies meaning. PDF uses the same trusted bundled Lucide geometry rendered as native vector shapes, not external or generated image assets.

The accordion is now “How to Measure Your Progress” for every category. `progress-measures.ts` holds distinct practical observation methods for each category, avoiding repetition of the signal copy above. Only Measurement explains outcome/supporting/diagnostic evidence roles where useful; other categories use comprehension checks, customer conversations, fit reviews, journey observation, controlled tests and learning records rather than a forced three-KPI template. Future imagery remains optional beside this content.

All real-world examples use “Why this matters for your business.” Relevance connects the selected category to a lesson the customer can assess with their own evidence; it neither frames the lesson as Clarity Engine’s internal perspective nor predicts the example’s outcome for the customer.

Constraint lessons and green/pink comparisons, scores, supporting selection/sequence, primary recommendations, simplified Work Session, autosave, retakes and QA gates are unchanged. Practical methods and icon semantics are shared across web/PDF. No schema, threshold, production-data or deployment changes are required.

### Snapshot mini stack and short-work-session cue

The web Snapshot centers a compact six-row Clarity Stack. Primary and supporting states come directly from the frozen selected constraints; qualified Strong-band areas and the existing relative strength are colored, with remaining layers muted. Primary state takes precedence and receives the strongest fill/emphasis; supporting state stays subordinate. Text labels accompany color. No scores or selections are recalculated.

Only the web sentence starting “Your self-reported strengths include…” is removed from the working-copy presentation; its surrounding insight text and the frozen report/helper data remain intact. The mini stack uses the same layered-brick language as the assessment, with scoped list margins to keep it compact.

The online Work Session intro adds small Lucide writing/timer icons, a static “20 min” cue, and “Set a 20-minute timer and work through one question at a time.” Desktop uses the available sidebar space; mobile puts a small inline badge beneath the intro. This is guidance, not a running timer or new workflow requirement. Autosave and all worksheet behavior are unchanged. No PDF, schema, production or deployment changes are included in this web UX pass.

### Explicit precedence and ordinary tie-breaking

Preserve foundational Offer rules, the ML4 D/E data-trust blocker, and the documented severe-upstream dependency order. Within an equivalent priority group, select by flag severity, then lower unrounded section score, then section order as the final deterministic tie-breaker. Supporting eligibility remains score <65 OR major/critical flag, with no score-gap rule. Question scores and weights are unchanged.

Record named precedence provenance when an explicit rule outranks a lower-scoring eligible section. Web and report PDFs show the conditional “Why this comes first even though another section scored lower” explanation beneath the primary constraint. Existing frozen reports can derive this explanation from their stored evidence without reranking or rewriting them. Revised selection applies to newly generated reports only. No migration, production-data change, or deployment is required.

Regression coverage includes data trust overriding Traffic, Traffic primary without that blocker, Measurement supporting below 65, no eligible supporting constraint, ordinary lower-score selection, final deterministic ties, and the intentional severe-upstream exception. Verification passed: 69 audit tests, nine targeted responsive browser checks, type checking, client/server/API builds, and visual review of the explanation in Letter/A4 PDFs.
