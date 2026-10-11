# Marketing Clarity Audit V1 rule notes

These notes record the user's approved follow-up decisions and the explicit interpretation used by the deterministic implementation. The original canonical specification remains unchanged.

## Approved evidence handling

Supported evidence beats speculative completeness. Uncollected contextual evidence is unknown, not true or false. Evidence-dependent patterns cannot become primary or secondary without satisfying every required condition. The resolver can accept explicitly stored evidence, but business type and marketing goal do not substitute for active acquisition, lead volume, channel count, qualification maturity, or follow-up maturity.

P04 requires sufficient lead volume; P12 requires multiple acquisition channels; the closed-loop-only P14 branch requires active acquisition. ML4 D/E directly supports a data-trust constraint without requiring an assumption about acquisition. P15 is retained but requires direct evidence of traffic, non-trivial consideration, and weak follow-up. CR05 requires an explicitly absent qualification definition, rather than inferring absence from missing data.

C6 D directly asserts a substantial mismatch and supports neutral P09. C6 E is uncertainty and does not establish that a mismatch exists. P09 uses the user's neutral summary, three-action bundle, and a Work Session prompt that determines the direction before changing friction or trust. No branch is guessed.

## Approved confidence handling

ML4 E incurs exactly one 15-point answer deduction. An explicit answer modifier replaces a generic uncertainty penalty for that answer. Scores, flags, severity, patterns, and confidence remain separate calculations. Flags do not produce additional confidence deductions. Independent contradiction rules can apply separately, such as CR06 comparing claimed root-cause confidence with poor data trust.

Selective teaching notes trigger on canonical D/E answers only, with a persisted ten-note cap that survives resume and edits. The implementation exposes a deduction ledger. Generic uncertainty is capped at 25 points; explicit modifiers and independent contradictions are recorded separately. Missing material context receives one five-point class adjustment, regardless of the number of missing fields, and appears in report uncertainty notes. Corroboration adds ten points when at least two distinct non-uncertain answers support the primary matched pattern. Confidence is clamped to 35–100 and uses the canonical High/Moderate/Limited bands and wording.

## Precedence and output interpretation

Foundational critical Offer definition/outcome/validation issues precede direct data-trust blockers. Remaining constraints use the canonical Priority Area band below 45 as the severe tier; major/critical answer flags form the next tier, followed by optimization opportunities. The explicit severe-upstream dependency order (Offer → Audience → Message → Conversion), followed by severe downstream constraints, remains an intentional strategic exception. For ordinary sections in the same priority group, compare highest flag severity first (critical before major before opportunity), then lower unrounded section score, then section order only for an exact deterministic tie. Thus a severe Conversion constraint can precede an ordinary Offer score of 61; the documented severe-upstream exception still puts similarly severe Offer before Conversion. The former blanket section-order-before-score comparison for ordinary constraints is superseded by the user’s latest instruction. Primary and secondary are distinct sections; the secondary must have a score below 65 or major/critical evidence. There is no score-gap rule.

For qualitative pattern thresholds, reasonably functional/strong means at least the canonical Functional band threshold of 65; meaningful upstream weakness is below 65. True Traffic additionally requires ML4 A/B, Measurement at least 65, and no ML5 D/E blocker. All numeric thresholds explicitly supplied by the canonical patterns remain unchanged.

Where a section is supported but no specific cross-section pattern is established, use that section's existing curated bundle without asserting an unsupported pattern match. Healthy answers do not manufacture a diagnosis or force a relative strength to be a constraint. Relative strength requires at least 75, no major/critical flag, and no penalized contradiction involving the section.

Pattern-specific recommendation titles/actions remain canonical, except the user-approved P09 replacement. Completion criteria operationalize each canonical action; they do not add new actions. CR07 substitutes journey continuity review for proof creation while retaining the existing proof-placement action, avoiding duplicate recommendations. Deprioritization is capped at three with reasons tied to the selected constraint. Case matching compares diagnosis relevance, then model applicability, then evidence; no metric is invented. Work Sessions use six canonical prompts for primary and three for secondary, with the neutral P09 clarification where relevant. Plans preserve each canonical pattern's four phases and the user's Week 4 Measure/Learn label.

## Verification

Assessment personalization uses the stored `context.companyName` (no additional field or question): a muted progress label, completion copy after sections one and three, and the pre-report transition. Missing or blank names suppress the label and use “your business” in transition copy. Website input remains required; bare domains receive `https://`, explicit HTTP/HTTPS protocols are preserved, and unsupported schemes or embedded credentials are rejected by the same client/server validator.

Resolver tests cover all five canonical fictional stress scenarios, unsupported evidence, P09 neutrality, P15 activation requirements, ML4 deduplication, independent contradictions, severity/dependency order, relative-strength suppression, curated bundles, case ordering, and serialized report snapshots.

## User-approved V1 retake allowance and completion milestone

Each paid purchase permits the original diagnostic and exactly one full retake for the same business. Before completion, each run permits unrestricted answer edits; completion freezes that run. Report 1 remains in its original session record, and Report 2 is stored in a separate retake record with a unique purchase/session reference. No third run or comparison feature exists. Starting an in-progress retake again is idempotent and never resets saved answers. The original secure token resumes the active run and provides access to either completed report via `?run=1` or `?run=2`. Downloads select the same numbered frozen report.

Retakes require an already completed paid Report 1. Database constraints/triggers and server methods enforce the allowance, immutable reports, ownership, and exact preservation of the original name, email, company, and website. Business type and marketing goal can be updated using the optional business-focus form during the retake. Each completed run stores its own internal notification. This explicit user request supersedes the original V1.1-only retake/history restriction; accounts, comparisons, subscriptions, and anti-sharing infrastructure remain excluded.

The final review uses the user-specified climb headline, four report-value previews, natural “Prepared specifically for …” personalization, review/retake terms, and Marketing Clarity Report CTA. The triangle/apex treatment is decorative, with no animation or gamification.


## Post-diagnostic working notes and presentation

Work Session entries are mutable customer notes stored separately from the frozen diagnostic, keyed by purchase and report run. They never enter scoring, confidence, pattern matching, recommendation selection, or retake limits. Only a valid secure token for a completed paid report can access that report’s allowlisted prompt IDs. Each field allows up to 4,000 characters. Reports 1 and 2 retain independent notes.

Confidence display leads with evidence supporting the selected constraint, then relevant evidence gaps and independently penalized contradictions. It does not repurpose unrelated section flags as the leading explanation. Presentation changes never recompute a frozen report. Legacy weekly placeholder content is projected into a rich plan at read time; stored JSON remains unchanged. The approved P01 four-week plan is also frozen into newly generated reports.


## Private workspace, frozen answer review, and saved-note PDFs

The secure bearer URL grants persistent access to its paid purchase without a customer account or cookie requirement after the original payment claim. The copied workspace URL omits a run filter; completed reports are selectable independently. Preserve and display each run’s immutable database answer set rather than deriving historical answers from the active retake. Answer review is read-only and never enables answer edits after completion.

Blank and completed Work Session PDFs are separate resources. The completed document includes only allowlisted prompt responses stored for the selected completed run, loaded server-side at download time. Notes remain mutable outside the frozen diagnostic. Pending or failed edits must save before the interface offers a completed-note PDF or switches report/retake context. No report comparison, account recovery, reminders, or automated 60–90-day retake scheduling are introduced.


## Named precedence explanations

Selection rules live in `selection-priority.ts`. Explicit foundational Offer gates and ML4 D/E data-trust blockers retain priority over ordinary numeric weakness. The documented severe-upstream dependency exception is named explicitly rather than being hidden inside a generic comparator. New reports store `primaryPrecedence` only when a named rule outranked an eligible lower-scoring section. Customer explanations appear beneath the selected primary on web and PDF, not for ordinary severity/score comparisons. Legacy frozen reports can derive a directly evidenced explanation from their stored flags/scores/selection; they are never reranked or rewritten. Weights, question scores, flags, pattern matching, confidence calculations and supporting eligibility are unchanged.
