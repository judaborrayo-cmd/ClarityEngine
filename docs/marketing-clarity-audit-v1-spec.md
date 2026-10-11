# The $27 Marketing Clarity Audit
## A Clarity Engine™ Diagnostic

**See what's working. Find what's holding you back. Know what to do next.**

**Document status:** Canonical V1 implementation specification. This document is authoritative for product logic, question wording, scoring, recommendations, scope, and UX unless explicitly superseded by a later approved spec.

## 1. Product purpose and positioning

The Marketing Clarity Audit is a paid, self-guided diagnostic that helps founders, consultants, freelancers, small-business owners, and hands-on marketers identify the highest-leverage constraint in their current marketing system. The product is designed to combat marketing misdiagnosis: fixing the most visible symptom instead of the underlying constraint.

**Core promise:** Figure out what is actually holding back your marketing and what to fix first.

**Transformation:** From “There are 20 things I could change and I do not know where to start” to “I know my primary constraint, secondary constraint, three next actions, and what I should intentionally not prioritize yet.”

### Clarity Loop
**Understand → Decide → Implement → Learn**. This is a supporting methodology concept and the default logic behind 30-day plans.

## 2. V1 scope

V1 includes: paid-first access; required name/email/company/website; business type and primary marketing goal; 35-question diagnostic; autosave; secure resume link without account/password; back navigation; progress/time cues; strategically triggered teaching notes; deterministic scoring/flags/pattern matching; confidence score; web results; personalized report; downloadable report; downloadable Clarity Work Session; matched anonymized case card; KPI guidance; AI accelerators; 30-day plan; internal completion notification.

### Explicitly not V1
Customer account/profile system, free mini-audit preview, automated abandonment emails, 30/90-day retake emails, full admin dashboard, AI crawling/analysis of the submitted website, advanced aggregate analytics UI, user-to-user sharing, multi-seat company accounts, dynamically generated recommendations from an LLM.

## 3. URL and information architecture

Preferred same-domain structure unless repository constraints justify otherwise:

- Sales page: `/marketing-clarity-audit`
- Assessment start: `/audit/start`
- Secure resume: `/audit/resume/[token]`
- Results: `/audit/results/[token]`
- Future free preview (V1.1+): `/marketing-clarity-check`

Avoid a subdomain unless the existing architecture makes it materially cleaner. Avoid `/checkout/` as the permanent product URL.

## 4. Brand and design requirements

This is a native Clarity Engine product. Reuse the current site’s typography, spacing, color system, buttons, borders, and case-study visual language where practical. The diagnostic case cards should feel like compact descendants of the existing `/case-studies` design, not a second unrelated case-study system. Codex must inspect the current codebase and reuse existing components/tokens before inventing new ones.

## 5. Purchase → assessment → resume → results journey

1. User visits sales page and purchases for $27.
2. After payment, collect/confirm required customer context.
3. Start diagnostic with expectation setting: 6 sections, 35 questions, ~12–18 minutes.
4. Show one question at a time with sticky progress and time remaining.
5. Autosave every response. Back navigation is allowed.
6. A secure resume URL reopens at the last incomplete question; no password/account required.
7. Reveal no section score until completion. Use non-scored section completion cues.
8. Trigger teaching notes only on selected answers (roughly 8–10 notes total maximum).
9. On completion, calculate deterministic results and freeze an AuditReport record.
10. Show web report and offer downloads.
11. End with one restrained “Explore Ways to Work Together” CTA.

### Progress UX
Always show: section name; section number; progress percentage; approximate time remaining; local question position; subtle autosave status. Example: `Message · Section 3 of 6 · 48% complete · ~7 min remaining`. Time remaining should use broad buckets, not fake precision.

## 6. Required customer context

Required: name, email, company name, website URL. Also collect business type and primary marketing goal as non-scored context variables.

### Business types
`ecommerce`, `professional_services`, `local_service`, `saas_software`, `education_coaching`, `travel_hospitality`, `membership_subscription`, `nonprofit`, `other`.

### Primary marketing goals
`purchases`, `leads`, `booked_calls`, `trials_demos`, `registrations`, `store_visits`, `subscribers`, `other`.

## 7. Canonical 35-question V1 questionnaire

### Section 1 of 6: Offer
**What are you actually asking customers to buy?**

We’ll start by looking at how clearly your offer is defined, whether customers understand the value, and how much evidence you have that the market wants it.

*6 questions · ~2–3 minutes*

#### O1. Offer clarity
**Can a new potential customer understand what you sell within a few seconds of hearing or reading your explanation?**

- **A.** Yes. I can explain our primary offer clearly in one simple sentence.

- **B.** Mostly. People generally understand it, although it usually needs a little additional explanation.

- **C.** Sometimes. The basic idea is understandable, but different people may explain it differently.

- **D.** Not really. Our offer includes several services, products, or ideas and can be difficult to explain simply.

- **E.** We’re still figuring out exactly what our primary offer should be.


**Triggered teaching note (selected weaker answers only):** If explaining the offer requires a long conversation, marketing usually has to work harder everywhere downstream.


#### O2. Outcome clarity
**Does your primary offer promise a clear outcome or improvement for the customer?**

- **A.** Yes. The desired customer outcome is specific and central to the offer.

- **B.** Mostly. The outcome is there, but we could communicate it more clearly.

- **C.** Somewhat. We tend to explain what we provide more than what changes for the customer.

- **D.** Not really. Our offer is mostly described through services, features, deliverables, or process.

- **E.** I’m not sure what primary outcome we should promise.


**Triggered teaching note (selected weaker answers only):** A service describes what you do. An outcome describes why the customer cares. “Weekly executive English coaching” describes a service; “Lead meetings confidently in English without second-guessing yourself” describes an outcome.


#### O3. Customer fit
**How clearly defined is the customer your primary offer is intended for?**

- **A.** Extremely clear. We know who benefits most and who generally isn’t a good fit.

- **B.** Fairly clear. We know our strongest customer types, although several types of people can benefit.

- **C.** Broad. We have a general target customer, but the definition could be more specific.

- **D.** Very broad. Many different types of people or businesses could theoretically use what we sell.

- **E.** We’re still figuring out who the offer is really for.


#### O4. Value resistance
**How frequently do qualified prospects question the value, price, or reason they should choose your offer?**

- **A.** Rarely. Qualified prospects generally understand why the offer is valuable.

- **B.** Occasionally. We encounter predictable objections, but they usually make sense.

- **C.** Fairly often. We frequently need to explain or reinforce the value.

- **D.** Very often. Price resistance, value confusion, or extensive explanation is a major part of the sales process.

- **E.** We don’t have enough sales conversations or customer data to know yet.


#### O5. Market validation
**How much evidence do you have that people actually want this offer?**

- **A.** Strong evidence. We consistently sell it and/or customers repeatedly seek it out.

- **B.** Good evidence. We’ve sold it successfully, although demand isn’t completely predictable.

- **C.** Limited evidence. We’ve had some sales or interest, but not enough to establish a strong pattern.

- **D.** Very little evidence. We’re relying substantially on what we believe people should want.

- **E.** None yet. The offer is new or has not meaningfully been tested.


**Triggered teaching note (selected weaker answers only):** Better copy cannot fully compensate for an offer the market doesn’t want. Before aggressively scaling an unproven offer, learn why real prospects say yes, no, or not yet.


#### O6. Scale readiness
**If qualified traffic to your offer doubled tomorrow, how confident would you feel sending those people into the current sales experience?**

- **A.** Very confident. More qualified traffic would be welcome.

- **B.** Fairly confident. There are improvements we’d make, but the offer is ready.

- **C.** Unsure. More traffic would probably expose some weaknesses.

- **D.** Not very confident. There are important things I would want to fix first.

- **E.** Not confident at all. We’re still working out what we’re selling or how we’re selling it.


### Section 2 of 6: Audience
**Do you understand who buys, why they act, and how to reach more people like them?**

This section evaluates customer fit, buying triggers, lead quality, deeper motivations, and audience access.

*5 questions · ~2 minutes*

#### A1. Best-customer clarity
**How clearly can you identify the type of customer who gets the most value from your primary offer?**

- **A.** Very clearly. Our best customers share identifiable characteristics, problems, circumstances, or goals.

- **B.** Fairly clearly. We know our strongest customer types, although there is some variation.

- **C.** Somewhat. We have a general sense of who they are, but our definition is broad.

- **D.** Not clearly. Many different types of people could theoretically use what we sell.

- **E.** We haven’t identified this yet.


#### A2. Buying triggers
**Do your best customers tend to share a specific problem, trigger, or situation that causes them to start looking for a solution like yours?**

- **A.** Yes. We understand the specific situations or problems that typically create demand.

- **B.** Mostly. We’ve identified several common triggers.

- **C.** Somewhat. We understand the broad problem, but not necessarily what causes someone to act.

- **D.** Not really. We know who they are more than we know what creates buying intent.

- **E.** We haven’t investigated this.


**Triggered teaching note (selected weaker answers only):** Knowing that your customer is a “business owner” or “professional” is useful. Knowing what happened yesterday that made them start searching for help today is often much more actionable.


#### A3. Lead quality
**How often are the leads or prospects reaching you actually a good fit for what you sell?**

- **A.** Most are reasonably well qualified.

- **B.** A majority are good fits, although we still receive some poor-fit leads.

- **C.** It’s mixed. We spend meaningful time separating strong prospects from weak ones.

- **D.** Many are the wrong fit, can’t afford the offer, or need something substantially different.

- **E.** We don’t consistently qualify or categorize leads, so we don’t really know.


#### A4. Deeper outcome understanding
**How well do you understand what your customer is ultimately trying to accomplish beyond simply buying your product or service?**

- **A.** Very well. We understand the larger business, professional, practical, or personal outcome they want.

- **B.** Fairly well. We understand the main goals, although we could probably go deeper.

- **C.** Somewhat. We primarily understand the immediate problem we solve.

- **D.** Not very well. Our understanding is mostly based on the product or service itself.

- **E.** I’m not sure.


#### A5. Audience access
**If you needed to put your offer in front of 1,000 ideal prospects, do you know who those people would be and where you could realistically reach them?**

- **A.** Yes. We know who they are and have several realistic ways to reach them.

- **B.** Mostly. We know who they are, although reaching them predictably could improve.

- **C.** We understand the customer but aren’t sure which channels or targeting approaches would reach them efficiently.

- **D.** We’re not specific enough about the audience to answer confidently.

- **E.** Both the audience and the path for reaching them are still unclear.


### Section 3 of 6: Message
**Does a stranger understand, believe, and care about the value you provide?**

This section evaluates message clarity, outcomes, customer language, differentiation, emotional relevance, and credibility.

*6 questions · ~2–3 minutes*

#### M1. First-impression clarity
**Can a new visitor understand the main value you provide within the first few seconds of seeing your website, landing page, ad, or profile?**

- **A.** Yes. The main outcome and value are immediately clear.

- **B.** Mostly. The value becomes clear quickly, although the message could be sharper.

- **C.** Somewhat. People generally need to read or explore before fully understanding it.

- **D.** Not really. Our marketing explains what we do, but the value isn’t immediately obvious.

- **E.** No. Different pages, campaigns, or people explain the business differently.


#### M2. Benefits vs. features
**Does your marketing emphasize what changes for the customer, or mostly describe what you provide?**

- **A.** We strongly emphasize customer outcomes and transformation.

- **B.** Mostly outcomes, supported by relevant information about features and deliverables.

- **C.** Roughly equal. We discuss outcomes, but much of the message still focuses on what we do.

- **D.** Mostly features, services, deliverables, credentials, or process.

- **E.** I’m not sure how to distinguish the two.


**Triggered teaching note (selected weaker answers only):** Features help explain the solution. Benefits help people understand what the solution does for them. Strong marketing usually needs both, but the customer shouldn’t have to translate every feature into personal value.


#### M3. Customer language
**How closely does your marketing language reflect the actual problems, goals, and words your customers use?**

- **A.** Very closely. Our messaging is informed by sales conversations, reviews, research, search behavior, or other direct evidence.

- **B.** Fairly closely. We know the language customers tend to use.

- **C.** Somewhat. Our messaging is based partly on customer insight and partly on our assumptions.

- **D.** Not much. Most of our copy is written primarily from the company’s perspective.

- **E.** We haven’t intentionally researched customer language.


**Triggered teaching note (selected weaker answers only):** Customer conversations can be one of your best copywriting resources. The words customers naturally use to describe problems, ambitions, frustrations, and objections can often communicate more clearly than polished internal terminology.


#### M4. Differentiation
**Can a potential customer quickly understand why they should choose you instead of another reasonable alternative?**

- **A.** Yes. Our differentiation is clear, relevant, and meaningful to the customer.

- **B.** Mostly. We have real differentiators, but could communicate them more strongly.

- **C.** Somewhat. We know we’re different, but explaining exactly why can be difficult.

- **D.** Not really. Our marketing could easily sound similar to competitors.

- **E.** We’re not sure what genuinely differentiates us.


#### M5. Emotional relevance
**Does your marketing create a meaningful emotional reason for the customer to care?**


_Emotion does not mean manipulation. Saving time, reducing frustration, feeling confident, protecting money, creating freedom, avoiding risk, or accomplishing something meaningful are all emotional reasons people care._

- **A.** Yes. Our messaging connects clearly to meaningful ambitions, frustrations, fears, desires, identity, or relief.

- **B.** Somewhat. We use emotional relevance where appropriate, although we could go deeper.

- **C.** Occasionally. Most of our messaging is practical or informational.

- **D.** Rarely. Our marketing primarily explains the product or service.

- **E.** I’m uncomfortable or unsure about how emotion should fit into our marketing.


#### M6. Credibility
**How much credible evidence supports the important claims you make in your marketing?**

- **A.** A lot. We regularly use relevant testimonials, reviews, results, case studies, demonstrations, data, associations, or other proof.

- **B.** Some. We have strong proof but could use it more consistently.

- **C.** Limited. We have some credibility indicators, but significant claims remain unsupported.

- **D.** Very little. Most of our marketing asks people to take our claims at face value.

- **E.** We’re new and haven’t built meaningful proof yet.


### Section 4 of 6: Conversion Experience
**What happens after someone becomes interested?**

This section evaluates next-step clarity, value communication, message continuity, friction, trust, and whether the journey matches the size of the ask.

*6 questions · ~2–3 minutes*

#### C1. Next-step clarity
**When someone reaches your main conversion page or experience, is the primary action you want them to take immediately clear?**

- **A.** Yes. There is one obvious primary action.

- **B.** Mostly. The primary action is clear, although some competing options exist.

- **C.** Somewhat. Visitors can figure it out, but they have to look around.

- **D.** Not really. There are several possible paths or unclear calls to action.

- **E.** We haven’t intentionally designed the experience around one primary action.


#### C2. Value timing
**How much work does a visitor have to do before they understand why taking the next step is worthwhile?**

- **A.** Very little. The value and next step are clear near the beginning.

- **B.** A little. The experience provides enough context fairly quickly.

- **C.** A moderate amount. Visitors need to read or scroll significantly before understanding the value.

- **D.** A lot. Important benefits, proof, or offer details appear relatively late.

- **E.** I’m not sure.


#### C3. Message continuity
**How well does the promise that gets someone to your website or landing page match what they encounter once they arrive?**

- **A.** Very closely. The promise, language, offer, and next step feel consistent.

- **B.** Mostly. There are small differences, but the journey remains coherent.

- **C.** Somewhat. Different parts of the journey emphasize different things.

- **D.** Poorly. Someone can click because of one promise and encounter a noticeably different message afterward.

- **E.** We haven’t intentionally reviewed the journey this way.


**Triggered teaching note (selected weaker answers only):** An ad can perform well and still produce poor business results if the experience after the click fails to continue the same promise. Think: Search / Ad / Post → Landing Page → Conversion.


#### C4. Friction
**How much unnecessary friction exists between interest and conversion?**


_Think about extra clicks, long forms, confusing navigation, account creation, too many fields, unclear pricing, unexpected steps, or unnecessary pages._

- **A.** Very little. The process is simple and intentional.

- **B.** Some, but nothing that appears significant.

- **C.** Moderate. There are several steps we could probably remove or simplify.

- **D.** A lot. The process is longer or more complicated than it needs to be.

- **E.** We haven’t systematically reviewed it.


#### C5. Decision-point trust
**How strong is the proof or reassurance around the point where you’re asking someone to take action?**

- **A.** Strong. Relevant proof and reassurance are located close to the decision.

- **B.** Good. We have credible proof, although the placement or strength could improve.

- **C.** Limited. Proof exists but not necessarily where hesitation happens.

- **D.** Very little.

- **E.** None yet.


#### C6. Commitment match
**How well does your conversion experience match the level of commitment you’re asking from the visitor?**

- **A.** Very well. The amount of information, proof, and friction fits the decision.

- **B.** Mostly. The experience is appropriate, with some room for improvement.

- **C.** Somewhat. We may be asking for too much too quickly or overcomplicating a relatively simple decision.

- **D.** Poorly. There is a substantial mismatch between the commitment and the experience.

- **E.** I’m not sure.


### Section 5 of 6: Traffic
**Do you understand the role traffic plays inside the entire customer-acquisition system?**

This section evaluates demand flow, channel roles, root-cause diagnosis, testing discipline, and acquisition economics.

*6 questions · ~2–3 minutes*

#### T1. Funnel-role understanding
**Do you know which traffic sources primarily introduce new people to your business versus bringing back people who already know you?**

- **A.** Yes. We clearly understand which channels play prospecting, retargeting, branded, referral, organic, or similar roles.

- **B.** Mostly. We understand the broad roles, although there is some overlap.

- **C.** Somewhat. We know where traffic comes from, but not always what role each source plays in the funnel.

- **D.** Not really. We mostly evaluate individual channels based on their direct conversions.

- **E.** We don’t currently think about traffic this way.


#### T2. Demand visibility
**Do you know whether enough new demand is entering the system to support the conversions and growth you want?**

- **A.** Yes. We understand how much new traffic or lead volume enters the funnel and approximately what happens afterward.

- **B.** Mostly. We understand the broad flow, although measurement could improve.

- **C.** Somewhat. We know traffic volumes but not clearly how they translate downstream.

- **D.** Not really. We mainly focus on final sales or leads.

- **E.** We don’t currently understand our funnel well enough to answer.


#### T3. Root-cause discipline
**When performance changes, how confidently can you determine whether the cause is traffic, the offer, the website, product or merchandising changes, pricing, tracking, follow-up, or something else?**

- **A.** Very confidently. We have enough data and process to investigate across the customer journey.

- **B.** Fairly confidently. We can usually narrow the cause down.

- **C.** Sometimes. We identify obvious issues but still rely on assumptions.

- **D.** Poorly. We often blame the channel or campaign because it is the most visible thing.

- **E.** We mostly guess.


**Triggered teaching note (selected weaker answers only):** “The ads are performing worse” describes an observation. It does not automatically identify the cause. Advertising performance can change because of campaigns, pricing, merchandising, website changes, offer changes, tracking, seasonality, customer behavior, or other parts of the system.


#### T4. Channel strategy
**Are your acquisition channels intentionally assigned different roles, or are you expecting every channel to do everything?**

- **A.** Yes. Different channels have clear strategic roles.

- **B.** Mostly. We understand that channels contribute differently.

- **C.** Somewhat. We still compare channels too directly at times.

- **D.** No. We generally expect each channel to independently generate conversions.

- **E.** We haven’t intentionally designed a channel strategy.


#### T5. Testing discipline
**When testing campaigns, audiences, creative, offers, or channels, do you usually have enough budget and conversion volume to learn something meaningful without unnecessarily disrupting what already works?**

- **A.** Yes. We design tests around realistic budgets, sufficient time, and an existing baseline.

- **B.** Usually. Most tests are reasonably funded and controlled.

- **C.** Sometimes. We occasionally spread budget too thin or change too many things.

- **D.** Often not. We test many ideas simultaneously with limited budget or make major changes directly to working campaigns.

- **E.** We don’t currently have a structured testing approach.


**Triggered teaching note (selected weaker answers only):** Testing more things does not necessarily mean learning more things. AI and brainstorming tools can help generate many hypotheses cheaply; budget should usually be reserved for the ideas most worth validating in the real world.


#### T6. Acquisition economics
**Do you understand the economics that determine how much you can reasonably afford to spend to acquire a lead or customer?**

- **A.** Yes. We understand customer value, margins, close rates, and acceptable acquisition costs.

- **B.** Mostly. We have reasonable CPA/CPL targets based on business economics.

- **C.** Roughly. We rely more on historical averages or benchmarks than a clear economic model.

- **D.** Not really. We mostly judge whether acquisition costs “feel high” or “feel low.”

- **E.** No. We haven’t calculated this.


### Section 6 of 6: Measurement & Learning
**Can you trust the feedback you’re using to make marketing decisions?**

This section evaluates KPI hierarchy, reporting cadence, data trust, closed-loop measurement, and diagnostic discipline.

*6 questions · ~2–3 minutes*

#### ML1. North Star KPI clarity
**Have you clearly defined the small number of business outcomes that matter most for judging whether marketing is working?**


_Examples might include revenue, purchases, qualified leads, booked calls, registrations, customer acquisition cost, profit, or lifetime value._

- **A.** Yes. We have a small, clearly defined set of primary business KPIs.

- **B.** Mostly. We know the main outcomes, but could formalize them better.

- **C.** Somewhat. We track many metrics but don’t always agree on which matter most.

- **D.** Not really. Different people tend to judge performance using different metrics.

- **E.** No. We mostly look at whichever metrics the platforms show us.


#### ML2. KPI hierarchy
**Do you distinguish between outcome KPIs and diagnostic KPIs?**

- **A.** Yes. We intentionally use both and understand their different purposes.

- **B.** Mostly. We make this distinction informally.

- **C.** Sometimes. We tend to mix them together.

- **D.** Rarely. We often optimize toward whichever metric appears strongest or weakest.

- **E.** I’m not sure which metrics belong in each category.


**Triggered teaching note (selected weaker answers only):** An outcome KPI tells you whether the business got the result that matters. A diagnostic KPI can help explain why that result changed. For example: Revenue → Purchases → Conversion Rate → CTR/CPC.


#### ML3. KPI operating cadence
**Do you maintain a KPI report or dashboard that lets you compare the same important metrics over time?**

- **A.** Yes. It is consistently updated and actively used for decisions.

- **B.** Yes, although updates or reviews are occasionally inconsistent.

- **C.** We have reporting, but it changes frequently or is spread across several tools.

- **D.** Not really. We mostly log into individual platforms when we want to check performance.

- **E.** No formal KPI reporting exists.


#### ML4. Data trust and sources
**Does your team agree on where important KPIs come from, which sources should be treated as authoritative, and whether the data is reliable enough to make decisions?**

- **A.** Yes. We have clear sources of truth and regularly validate important tracking.

- **B.** Mostly. There are a few known gaps or areas of ambiguity.

- **C.** Somewhat. Different platforms frequently show different numbers and we reconcile them manually.

- **D.** Not really. Conflicting numbers or tracking questions regularly create uncertainty.

- **E.** No. We don’t currently trust the data enough to make confident marketing decisions.


#### ML5. Closed-loop measurement
**Can you connect marketing activity to meaningful downstream business outcomes?**


_For example: Did the lead become qualified? Did the booked call close? Did the free trial become a customer? Did the customer purchase again?_

- **A.** Yes. We can connect acquisition to meaningful downstream outcomes.

- **B.** Mostly. We can do this for our most important channels or offers.

- **C.** Partially. We capture the initial conversion but lose visibility later in the journey.

- **D.** Poorly. Marketing data and sales/customer data are mostly separate.

- **E.** Not at all.


#### ML6. Learning process
**When performance changes, do you have a consistent process for reviewing the data, recent changes, and customer journey before making major marketing decisions?**

- **A.** Yes. We review business outcomes, diagnostic KPIs, tracking, recent changes, and the broader funnel before acting.

- **B.** Usually. We have a general troubleshooting process.

- **C.** Sometimes. The depth of analysis depends on the situation.

- **D.** Rarely. We often react to the most visible metric first.

- **E.** No. Performance changes usually trigger immediate tactical changes without a consistent diagnostic process.


## 8. Scoring, weighting, flags, and section bands

Default score mapping: A=5, B=4, C=3, D=2, E=1, except where explicitly defined otherwise in the question data. Section normalized score = weighted earned points / weighted maximum points × 100. The visible overall score is an equal-weight average of the six normalized section scores; it never selects the primary constraint by itself.

### Section bands
- 80–100: Strong
- 65–79: Solid / Functional
- 45–64: Needs Attention
- <45: Priority Area

### Question weights

- **Offer:** O1=1.0, O2=1.0, O3=0.75, O4=1.0, O5=1.25, O6=1.0

- **Audience:** A1=1.0, A2=1.0, A3=1.0, A4=1.0, A5=1.0

- **Message:** M1=1.0, M2=1.0, M3=1.0, M4=1.0, M5=0.75, M6=1.0

- **Conversion Experience:** C1=1.0, C2=1.0, C3=1.0, C4=1.0, C5=1.0, C6=1.0

- **Traffic:** T1=1.0, T2=1.0, T3=1.25, T4=1.0, T5=1.0, T6=1.0

- **Measurement & Learning:** ML1=1.0, ML2=1.0, ML3=1.0, ML4=1.25, ML5=1.0, ML6=1.0


### Severity
`none=0`, `opportunity=1`, `major=2`, `critical=3`. Severity is used for strategic priority, not for the user-facing overall score.

## 9. Answer-level canonical flag map

- **O1 Offer clarity** — C: OFFER_CLARITY:opportunity; D: OFFER_CLARITY:major; E: OFFER_DEFINITION:critical

- **O2 Outcome clarity** — C: OUTCOME_CLARITY:opportunity; D: FEATURE_HEAVY_OFFER:major; E: UNDEFINED_OUTCOME:critical

- **O3 Customer fit** — C: OFFER_CUSTOMER_FIT:opportunity; D: BROAD_OFFER_FIT:major; E: UNDEFINED_CUSTOMER:critical

- **O4 Value resistance** — C: VALUE_PERCEPTION:opportunity; D: VALUE_RESISTANCE:major; E: OFFER_EVIDENCE_UNKNOWN:opportunity. Confidence modifiers: E: -5

- **O5 Market validation** — A: STRONG_VALIDATION:none; C: LIMITED_VALIDATION:opportunity; D: MARKET_VALIDATION_WARNING:critical; E: UNVALIDATED_OFFER:critical

- **O6 Scale readiness** — C: SCALE_READINESS:opportunity; D: DO_NOT_SCALE_YET:major; E: DO_NOT_SCALE_YET:critical

- **A1 Best-customer clarity** — C: AUDIENCE_DEFINITION:opportunity; D: AUDIENCE_DEFINITION:major; E: AUDIENCE_DEFINITION:critical

- **A2 Buying triggers** — C: TRIGGER_CLARITY:opportunity; D: DEMAND_TRIGGER_BLIND_SPOT:major; E: DEMAND_TRIGGER_BLIND_SPOT:major. Confidence modifiers: E: -5

- **A3 Lead quality** — C: LEAD_QUALITY:opportunity; D: LEAD_QUALITY_PROBLEM:major; E: QUALIFICATION_BLIND_SPOT:major. Confidence modifiers: E: -5

- **A4 Deeper outcome understanding** — C: SURFACE_CUSTOMER_INSIGHT:opportunity; D: CUSTOMER_OUTCOME_BLIND_SPOT:major; E: CUSTOMER_OUTCOME_BLIND_SPOT:major

- **A5 Audience access** — C: DISTRIBUTION_GAP:opportunity; D: AUDIENCE_ACCESS_CONSTRAINT:major; E: AUDIENCE_DISTRIBUTION_UNCLEAR:critical

- **M1 First-impression clarity** — C: MESSAGE_CLARITY:opportunity; D: MESSAGE_CLARITY:major; E: MESSAGE_INCONSISTENCY:critical

- **M2 Benefits vs. features** — C: FEATURE_HEAVY_MESSAGING:opportunity; D: FEATURE_HEAVY_MESSAGING:major; E: BENEFIT_LANGUAGE_BLIND_SPOT:major

- **M3 Customer language** — C: CUSTOMER_LANGUAGE_GAP:opportunity; D: CUSTOMER_LANGUAGE_GAP:major; E: CUSTOMER_LANGUAGE_GAP:major. Confidence modifiers: E: -5

- **M4 Differentiation** — C: POSITIONING_GAP:opportunity; D: POSITIONING_GAP:major; E: UNDIFFERENTIATED_POSITIONING:critical

- **M5 Emotional relevance** — C: LOW_EMOTIONAL_RELEVANCE:opportunity; D: LOW_EMOTIONAL_RELEVANCE:major; E: EMOTIONAL_MESSAGING_UNCERTAINTY:opportunity

- **M6 Credibility** — C: CREDIBILITY_GAP:opportunity; D: CREDIBILITY_GAP:major; E: PROOF_DEFICIT:major

- **C1 Next-step clarity** — C: CTA_CLARITY:opportunity; D: CTA_CLARITY:major; E: CONVERSION_PATH_AMBIGUITY:critical

- **C2 Value timing** — C: DELAYED_VALUE:opportunity; D: DELAYED_VALUE:major; E: VALUE_TIMING_UNKNOWN:opportunity. Confidence modifiers: E: -5

- **C3 Message continuity** — C: MESSAGE_MATCH:opportunity; D: MESSAGE_MATCH_FAILURE:major; E: JOURNEY_NOT_AUDITED:major

- **C4 Friction** — C: CONVERSION_FRICTION:opportunity; D: CONVERSION_FRICTION:major; E: FUNNEL_NOT_REVIEWED:major

- **C5 Decision-point trust** — C: DECISION_TRUST_GAP:opportunity; D: DECISION_TRUST_GAP:major; E: DECISION_TRUST_GAP:major

- **C6 Commitment match** — C: COMMITMENT_MISMATCH:opportunity; D: COMMITMENT_MISMATCH:major; E: COMMITMENT_MATCH_UNKNOWN:opportunity. Confidence modifiers: E: -5

- **T1 Funnel-role understanding** — C: FUNNEL_ROLE_BLINDNESS:opportunity; D: FUNNEL_ROLE_BLINDNESS:major; E: FUNNEL_ROLE_BLINDNESS:major

- **T2 Demand visibility** — C: DEMAND_VISIBILITY_GAP:opportunity; D: DEMAND_VISIBILITY_GAP:major; E: DEMAND_VISIBILITY_GAP:major. Confidence modifiers: E: -5

- **T3 Root-cause discipline** — C: ROOT_CAUSE_WEAKNESS:opportunity; D: ROOT_CAUSE_WEAKNESS:major; E: REACTIVE_OPTIMIZATION_RISK:critical

- **T4 Channel strategy** — C: CHANNEL_ROLE_MISMATCH:opportunity; D: CHANNEL_ROLE_MISMATCH:major; E: CHANNEL_ROLE_MISMATCH:major

- **T5 Testing discipline** — C: UNDERPOWERED_TESTING:opportunity; D: UNDERPOWERED_TESTING:major; E: TESTING_DISCIPLINE_MISSING:major

- **T6 Acquisition economics** — C: ACQUISITION_ECONOMICS_GAP:opportunity; D: ACQUISITION_ECONOMICS_GAP:major; E: ACQUISITION_ECONOMICS_GAP:critical

- **ML1 North Star KPI clarity** — C: KPI_CLARITY:opportunity; D: KPI_CLARITY:major; E: NO_NORTH_STAR:critical

- **ML2 KPI hierarchy** — C: METRIC_HIERARCHY_PROBLEM:opportunity; D: METRIC_HIERARCHY_PROBLEM:major; E: METRIC_HIERARCHY_PROBLEM:major

- **ML3 KPI operating cadence** — C: NO_KPI_CADENCE:opportunity; D: NO_KPI_CADENCE:major; E: NO_KPI_CADENCE:major

- **ML4 Data trust and sources** — C: DATA_TRUST_PROBLEM:opportunity; D: DATA_TRUST_PROBLEM:major; E: DATA_TRUST_CONSTRAINT:critical. Confidence modifiers: E: -15, D: -5

- **ML5 Closed-loop measurement** — C: CLOSED_LOOP_GAP:opportunity; D: CLOSED_LOOP_GAP:major; E: CLOSED_LOOP_GAP:critical

- **ML6 Learning process** — C: REACTIVE_OPTIMIZATION:opportunity; D: REACTIVE_OPTIMIZATION:major; E: NO_LEARNING_PROCESS:major

## 10. Confidence model

Start at 100. Subtract 5 for material `I don't know / insufficient evidence` answers (cap this uncertainty class at -25). Apply explicit question confidence modifiers, contradiction penalties, and a -15 data-trust penalty when ML4=E. Add +10 when multiple independent answers consistently support the same dominant pattern. Suggested output bands: High 80–100; Moderate 60–79; Limited <60. Clamp 35–100.

Language must adapt to confidence: High = “Your strongest constraint appears to be…”; Moderate = “X is the strongest constraint indicated by your answers”; Limited = “Your answers point most strongly toward X, but gaps in available evidence make the diagnosis less certain.”

## 11. Contradiction rules

- **CR01 — Strong validation + high value resistance.** Condition: `O5 in [A,B] AND O4=D`. Confidence modifier: -5. Interpretation: Do not call the offer unvalidated. Interpret as positioning/value communication tension.

- **CR02 — High message clarity + poor message continuity.** Condition: `M1 in [A,B] AND C3 in [D,E]`. Confidence modifier: -3. Interpretation: Message may be clear before the click; the handoff/journey continuity is more likely the issue.

- **CR03 — Strong acquisition economics claim + no KPI hierarchy.** Condition: `T6 in [A,B] AND ML1=E`. Confidence modifier: -8. Interpretation: Verify economics before recommending scaling.

- **CR04 — High offer confidence + low market validation.** Condition: `O6 in [A,B] AND O5 in [D,E]`. Confidence modifier: -8. Interpretation: Confidence to scale conflicts with lack of demand evidence; elevate validation warning.

- **CR05 — High lead-quality claim + no qualification process.** Condition: `A3 in [A,B] AND A3 evidence unavailable elsewhere`. Confidence modifier: -3. Interpretation: Treat lead-quality conclusion cautiously if there is no qualification definition.

- **CR06 — Strong traffic diagnosis + low data trust.** Condition: `T3 in [A,B] AND ML4=E`. Confidence modifier: -10. Interpretation: Reduce confidence in performance-root-cause conclusions until data trust improves.

- **CR07 — Strong message proof + weak decision-point trust.** Condition: `M6 in [A,B] AND C5 in [D,E]`. Confidence modifier: -2. Interpretation: Proof exists but may be poorly placed; prioritize deployment rather than creation.

- **CR08 — Strong audience knowledge + distribution uncertainty.** Condition: `A1 in [A,B] AND A5 in [C,D,E]`. Confidence modifier: 0. Interpretation: Audience definition may be strong; treat the issue as audience access/distribution instead.

## 12. Canonical V1 Pattern → Output Matrix

Pattern precedence: critical foundational issues → data-trust blockers → severe upstream constraint (Offer → Audience → Message → Conversion) → severe downstream constraint → optimization opportunity. Severity can override dependency order. Primary = highest-priority unresolved constraint after severity, critical flags, dependency, and pattern confidence. Secondary = strongest meaningful next constraint. Relative Strength = highest-scoring section ≥75 without a major/critical contradiction; otherwise show no clear relative strength.

### P01 — Foundational Offer Clarity

- **Trigger:** Offer <50 and/or O1/O2 critical
- **Primary constraint:** Offer
- **Recommendations:** OFF_01, OFF_02, OFF_03
- **Do Not Prioritize Yet:** More ad spend, New acquisition channels, Large creative production
- **KPI bundle:** Primary: sales/offer acceptance; Supporting: qualified lead rate; Diagnostic: objection frequency
- **Case format:** Business Model → Constraint → Priority
- **Work Session:** What have people repeatedly paid for? What problem are they hiring you to solve? Which offer would you keep if only one survived?
- **AI Accelerator:** Synthesize services, testimonials, and sales language into 3–5 possible offer formulations.
- **30-day plan:** Understand: review buyers and conversations → Decide: select offer + outcome → Implement: update core explanation → Learn: validate with real prospects

### P02 — Market Validation Warning

- **Trigger:** O5 D/E regardless of average Offer score
- **Primary constraint:** Offer / Validation
- **Recommendations:** OFF_05, OFF_06, OFF_04
- **Do Not Prioritize Yet:** Large ad budgets, Funnel automation, Sophisticated attribution work
- **KPI bundle:** Primary: sales/offer acceptance; Supporting: qualified interest; Diagnostic: objections/rejection themes
- **Case format:** Problem → Diagnosis → Fix
- **Work Session:** What direct evidence proves demand? What behavior supports assumptions? What are prospects actually rejecting?
- **AI Accelerator:** Analyze interview transcripts for repeated motivations, objections, unmet needs, and language.
- **30-day plan:** Understand: recruit interview pool → Decide: identify repeated patterns → Implement: revise offer → Learn: retest

### P03 — Audience Definition Constraint

- **Trigger:** Audience <55 and/or A1/A2 D/E
- **Primary constraint:** Audience
- **Recommendations:** AUD_01, AUD_03, AUD_04
- **Do Not Prioritize Yet:** Broad scaling, Adding offers, Generic acquisition
- **KPI bundle:** Primary: qualified customer/lead rate; Supporting: conversion by segment; Diagnostic: fit patterns
- **Case format:** Business Model → Constraint → Priority
- **Work Session:** Who gets the most value? What changes right before they seek help? Who should not be targeted?
- **AI Accelerator:** Cluster CRM or transcript data into meaningful customer groups and buying triggers.
- **30-day plan:** Understand: categorize recent leads → Decide: identify high-value patterns → Implement: map triggers and channels → Learn: adjust targeting/message and review

### P04 — Lead Quality Problem

- **Trigger:** A3 D/E while traffic/lead volume is not clearly deficient
- **Primary constraint:** Audience / Qualification
- **Recommendations:** AUD_06, AUD_01, TRAF_02
- **Do Not Prioritize Yet:** Increasing lead volume, Broadening targeting, Scaling low-quality sources
- **KPI bundle:** Primary: qualified lead rate; Supporting: close rate; Diagnostic: CPL by source/segment
- **Case format:** Problem → Diagnosis → Fix
- **Work Session:** What separates strong from weak leads? Which sources create customers rather than forms?
- **AI Accelerator:** Categorize recent leads into quality tiers and identify common traits/source patterns.
- **30-day plan:** Understand: define quality → Decide: review and segment leads → Implement: tighten weak sources/messages → Learn: compare quality after changes

### P05 — Strong Offer, Weak Message

- **Trigger:** Offer ≥75, Audience ≥70, Message <60
- **Primary constraint:** Message
- **Recommendations:** MSG_01, MSG_03, MSG_05
- **Do Not Prioritize Yet:** Creating another offer, Full rebrand, Major traffic increase
- **KPI bundle:** Primary: conversion rate; Supporting: CTA click rate; Diagnostic: CTR/engagement
- **Case format:** Before → After
- **Work Session:** What does the customer actually want? What phrases do they use? What would a stranger understand in five seconds?
- **AI Accelerator:** Use current hero, offer, testimonials, and customer language to generate distinct messaging territories and hero options.
- **30-day plan:** Understand: extract customer language → Decide: choose core message → Implement: rewrite + add proof → Learn: measure

### P06 — Differentiation / Positioning Gap

- **Trigger:** M4 D/E while Offer/Audience are reasonably strong
- **Primary constraint:** Message / Positioning
- **Recommendations:** MSG_04, MSG_08, MSG_07
- **Do Not Prioritize Yet:** Generic content expansion, Additional offers, Larger ad budgets
- **KPI bundle:** Primary: sales conversion; Supporting: CTA rate; Diagnostic: objection themes
- **Case format:** Before → After
- **Work Session:** Why choose you? What do customers get here they cannot easily get elsewhere? What alternative are they really comparing you to?
- **AI Accelerator:** Compare company messaging with competitor pages and identify interchangeable claims and differentiation territories.
- **30-day plan:** Understand: map alternatives → Decide: define differentiation → Implement: update messaging → Learn: test reactions/performance

### P07 — Trust / Credibility Constraint

- **Trigger:** M6 and/or C5 D/E, especially with meaningful commitment/high-ticket offer
- **Primary constraint:** Message / Conversion Trust
- **Recommendations:** MSG_05, CONV_05, MSG_04
- **Do Not Prioritize Yet:** More persuasion without evidence, Major traffic increase, Cosmetic redesign
- **KPI bundle:** Primary: conversion rate; Supporting: CTA→conversion rate; Diagnostic: engagement around proof/decision areas
- **Case format:** Before → After
- **Work Session:** What claims need proof? What evidence already exists? Where does hesitation occur?
- **AI Accelerator:** Turn reviews, testimonials, results, and project notes into concise proof modules or case-card drafts.
- **30-day plan:** Understand: gather evidence → Decide: select strongest proof → Implement: create/place proof → Learn: compare conversion

### P08 — Conversion Experience Constraint

- **Trigger:** Conversion <55 while upstream Offer/Message are reasonably functional
- **Primary constraint:** Conversion Experience
- **Recommendations:** CONV_01, CONV_02, CONV_03
- **Do Not Prioritize Yet:** More traffic, More ads, Another channel
- **KPI bundle:** Primary: page/funnel conversion rate; Supporting: CTA click rate; Diagnostic: drop-off by step
- **Case format:** Before → After; youth-sports/free-trial style where applicable
- **Work Session:** Map every click/page/field. What can be removed? Where does trust drop?
- **AI Accelerator:** Audit a page section-by-section against one conversion goal and identify ambiguity, redundancy, and friction.
- **30-day plan:** Understand: map + baseline → Decide: identify highest-friction issue → Implement: simplify + strengthen value/CTA → Learn: measure

### P09 — Commitment Mismatch

- **Trigger:** C6 D/E plus contextual evidence that ask and journey are misaligned
- **Primary constraint:** Conversion Experience
- **Recommendations:** CONV_04, CONV_05, CONV_03
- **Do Not Prioritize Yet:** Cosmetic redesign, Scaling traffic before fixing mismatch
- **KPI bundle:** Primary: completion/conversion rate; Supporting: CTA rate; Diagnostic: abandonment point
- **Case format:** Problem → Diagnosis → Fix
- **Work Session:** What are you asking the visitor to risk—time, money, data, commitment—and does the surrounding experience justify it?
- **AI Accelerator:** Compare the size of the ask to the current process and generate simplification or trust-building options.
- **30-day plan:** Understand: identify mismatch → Decide: redesign decision path → Implement: change trust/friction → Learn: compare completion

### P10 — More-Traffic Trap

- **Trigger:** Meaningful upstream weakness in Offer/Message/Conversion plus scale intent or O6 D/E
- **Primary constraint:** Highest upstream constraint
- **Recommendations:** DYNAMIC_UPSTREAM_1, DYNAMIC_UPSTREAM_2, DYNAMIC_UPSTREAM_3
- **Do Not Prioritize Yet:** Budget increases, Additional paid channels, Aggressive prospecting
- **KPI bundle:** Primary: KPI associated with upstream constraint; Supporting: current CVR; Diagnostic: traffic quality
- **Case format:** Business Model → Constraint → Priority
- **Work Session:** Why do you believe more traffic is the answer? What would happen if traffic doubled tomorrow?
- **AI Accelerator:** Use AI to accelerate diagnosis/ideation of the upstream issue rather than create more campaign volume.
- **30-day plan:** Understand: baseline upstream issue → Decide: select one fix → Implement: make change → Learn: validate and reassess scale readiness

### P11 — True Traffic Constraint

- **Trigger:** Offer ≥75, Audience ≥75, Message ≥70, Conversion ≥70, Traffic <60, Measurement sufficiently trustworthy
- **Primary constraint:** Traffic
- **Recommendations:** TRAF_01, TRAF_06, TRAF_05
- **Do Not Prioritize Yet:** Rebuilding strong pages, Changing the offer, Unnecessary brand work
- **KPI bundle:** Primary: CAC/CPA/qualified customer volume; Supporting: conversion rate; Diagnostic: CTR/CPC/reach/impression share as relevant
- **Case format:** Business Model → Constraint → Priority
- **Work Session:** Where does existing demand come from? Which channel gives the clearest next test? What can you afford to acquire?
- **AI Accelerator:** Research and brainstorm channel hypotheses, messaging angles, and creative concepts before choosing the subset worth funding.
- **30-day plan:** Understand: channel + economics → Decide: choose test → Implement: launch → Learn: review signal quality

### P12 — Channel-Role Mismatch

- **Trigger:** T1 + T4 weak and multiple acquisition channels exist
- **Primary constraint:** Traffic Strategy
- **Recommendations:** TRAF_01, TRAF_03, ML_05
- **Do Not Prioritize Yet:** Declaring channels failures from last-click results, Forcing every channel into prospecting
- **KPI bundle:** Primary: revenue/qualified acquisition; Supporting: assisted/return conversion behavior; Diagnostic: role-specific channel metrics
- **Case format:** Before → After funnel map
- **Work Session:** What job is each channel actually performing? Where is discovery occurring? Where is conversion occurring?
- **AI Accelerator:** Summarize multi-touch journeys/reporting exports into role hypotheses and flag where attribution may be misleading.
- **30-day plan:** Understand: map roles → Decide: define role-specific KPIs → Implement: rebuild reporting by role → Learn: make role-adjusted allocation decision

### P13 — Underpowered Testing

- **Trigger:** T5 D/E and/or testing fragmentation plus limited budget/conversion volume
- **Primary constraint:** Traffic / Experimentation
- **Recommendations:** TRAF_04, TRAF_05, ML_06
- **Do Not Prioritize Yet:** Numerous simultaneous audiences/campaigns, Constant edits, Large structural changes
- **KPI bundle:** Primary: target outcome of the test; Supporting: conversion volume; Diagnostic: spend/data per variant
- **Case format:** Problem → Diagnosis → Fix
- **Work Session:** What single question is most valuable to answer? What baseline are you protecting? What evidence would cause you to keep/reject the change?
- **AI Accelerator:** Generate many hypotheses cheaply, score them for expected impact/ease/evidence, then select the best 1–3 for real-world testing.
- **30-day plan:** Understand: define hypothesis + baseline → Decide: choose one test → Implement: run without unnecessary interference → Learn: evaluate + log

### P14 — Attribution / Data Trust Constraint

- **Trigger:** ML4 D/E and/or ML5 D/E with active acquisition
- **Primary constraint:** Measurement & Learning
- **Recommendations:** ML_01, ML_04, ML_05
- **Do Not Prioritize Yet:** Large budget shifts from platform-only attribution, Aggressive optimization on questionable data
- **KPI bundle:** Primary: authoritative business-source outcome; Supporting: qualified lead/purchase volume; Diagnostic: platform-vs-source discrepancies
- **Case format:** Business Model → Constraint → Priority; travel attribution where applicable
- **Work Session:** Which numbers decide whether marketing is actually working? Where does each come from? Where does visibility disappear?
- **AI Accelerator:** Reconcile exports from ad platforms, CRM, ecommerce, or sales systems and identify mismatches/gaps.
- **30-day plan:** Understand: KPI hierarchy → Decide: source-of-truth map → Implement: build recurring view/feedback loop → Learn: make one evidence-backed decision

### P15 — Follow-Up Leakage

- **Trigger:** Traffic exists, consideration is non-trivial, follow-up/nurture is missing or weak based on context and responses
- **Primary constraint:** Lifecycle / Conversion
- **Recommendations:** ML_07, TRAF_03, ML_05
- **Do Not Prioritize Yet:** More cold traffic, More acquisition complexity
- **KPI bundle:** Primary: lead/visitor-to-sale rate over time; Supporting: return/nurture conversion; Diagnostic: email/retargeting engagement
- **Case format:** Before → After
- **Work Session:** What happens to the people who do not convert immediately? What useful next touchpoint should they receive?
- **AI Accelerator:** Turn offer/customer context into nurture sequences, retargeting angles, and segmented follow-up ideas.
- **30-day plan:** Understand: map leakage → Decide: choose missing follow-up → Implement: launch nurture/retargeting → Learn: measure delayed conversions

## 13. Canonical recommendation library (48 actions)

- **OFF_01 · Offer · Write your primary offer in one sentence.** Explain who it is for, what they get, and what changes for them.

- **OFF_02 · Offer · Identify the single most important customer outcome.** Decide what one result the customer should remember above everything else.

- **OFF_03 · Offer · Simplify competing offers.** Choose one primary offer and make secondary offers clearly secondary.

- **OFF_04 · Offer · Review the last 10 sales conversations.** Identify why people bought, hesitated, said no, and what they expected to receive.

- **OFF_05 · Offer · Interview five recent customers.** Ask what problem they were trying to solve, what triggered action, and why they chose you.

- **OFF_06 · Offer · Validate demand before scaling.** Put the offer in front of real prospects before investing heavily in traffic.

- **OFF_07 · Offer · Strengthen the reason to act now.** Clarify why the problem, opportunity, or timing deserves attention without fake scarcity.

- **OFF_08 · Offer · Review pricing against perceived value.** Assess price relative to outcome, alternatives, proof, and commitment.

- **AUD_01 · Audience · Categorize your last 20–50 leads.** Group them by fit, quality, revenue potential, source, and outcome.

- **AUD_02 · Audience · Identify your highest-value customer segment.** Determine which group combines the strongest revenue, retention, margin, referrals, or ease of sale.

- **AUD_03 · Audience · Document top purchase triggers.** Identify what tends to happen immediately before someone looks for what you sell.

- **AUD_04 · Audience · Map audience → problem → trigger → channel.** For each meaningful segment, document who they are, what they feel, what makes them act, and where to reach them.

- **AUD_05 · Audience · Interview three ideal customers.** Focus on language, frustrations, alternatives considered, and what made the decision worthwhile.

- **AUD_06 · Audience · Separate poor-fit leads from poor marketing.** If inquiries are bad fits, refine targeting or qualification before increasing volume.

- **AUD_07 · Audience · Identify who is not a fit.** Define exclusion criteria as clearly as inclusion criteria.

- **AUD_08 · Audience · Match customer segment to message.** If groups buy for different reasons, stop showing every audience the same message.

- **MSG_01 · Message · Rewrite the hero section around the customer outcome.** Rewrite the hero section of your homepage or primary landing page(s) so it is centered around the customer’s primary outcome, not just your company, service, or process.

- **MSG_02 · Message · Replace feature language with benefit language.** For every major feature, state what it allows the customer to do, avoid, gain, or feel.

- **MSG_03 · Message · Extract customer language from real conversations.** Review sales calls, testimonials, reviews, emails, and support questions for repeated language.

- **MSG_04 · Message · Clarify why someone should choose you.** Identify 2–3 meaningful differentiators that matter to the customer.

- **MSG_05 · Message · Add proof immediately after major claims.** Support claims with results, reviews, testimonials, examples, credentials, or demonstrations.

- **MSG_06 · Message · Create one emotional hook and one rational hook.** Develop both an emotional reason to care and a rational reason to believe.

- **MSG_07 · Message · Audit message consistency across the journey.** Compare ad → landing page → form → sales call → checkout for continuity.

- **MSG_08 · Message · Remove internal jargon.** Rewrite language that makes sense internally but forces a new customer to translate it.

- **CONV_01 · Conversion · Choose one primary conversion action.** Make one next step visually and conceptually dominant.

- **CONV_02 · Conversion · Put the value proposition and CTA earlier.** Do not make visitors search for what they get or what to do next.

- **CONV_03 · Conversion · Reduce unnecessary conversion steps.** Map every click, page, field, form, and confirmation; remove what does not materially help.

- **CONV_04 · Conversion · Match the experience to the size of the ask.** Low-risk actions should feel easy; high-commitment actions need more trust and context.

- **CONV_05 · Conversion · Move proof closer to the decision point.** Place the strongest reassurance near high-friction actions.

- **CONV_06 · Conversion · Establish your baseline conversion rate.** Know the current conversion rate before redesigning everything.

- **CONV_07 · Conversion · Test the first screen before redesigning the whole page.** Start with headline, subheadline, CTA, proof, and offer clarity.

- **CONV_08 · Conversion · Review the experience on mobile.** Confirm CTA visibility, form usability, readability, load time, and low distraction.

- **TRAF_01 · Traffic · Map each channel to its role in the funnel.** Define whether each channel contributes to discovery, intent capture, retargeting, nurture, conversion, or reactivation.

- **TRAF_02 · Traffic · Separate traffic volume from traffic quality.** Measure which sources create qualified business outcomes, not just clicks or forms.

- **TRAF_03 · Traffic · Build a prospecting + retargeting structure.** Where appropriate, separate new audience acquisition from bringing interested people back.

- **TRAF_04 · Traffic · Protect the working baseline while testing.** Do not dismantle a profitable baseline simply to create a test.

- **TRAF_05 · Traffic · Run fewer, better-funded tests.** Pick the question you most need answered rather than fragmenting limited budget.

- **TRAF_06 · Traffic · Define an acceptable acquisition-cost range.** Use customer value, margins, close rate, retention, and repeat purchase behavior.

- **TRAF_07 · Traffic · Investigate the whole funnel before blaming the channel.** Review offer, product mix, merchandising, website, pricing, tracking, promotions, and conversion behavior.

- **TRAF_08 · Traffic · Reduce dangerous channel concentration.** Build a second dependable source without unnecessarily disrupting the first.

- **ML_01 · Measurement · Define your North Star KPIs.** Choose the smallest set of metrics that tell you whether marketing is creating meaningful business outcomes.

- **ML_02 · Measurement · Separate outcome KPIs from diagnostic KPIs.** Build a hierarchy from business outcome to conversion and supporting diagnostic signals.

- **ML_03 · Measurement · Create a weekly KPI document.** Track the same important numbers on a consistent cadence so patterns become visible.

- **ML_04 · Measurement · Define the source of truth for each KPI.** Document whether each authoritative number comes from Shopify, CRM, sales, GA4, ad platforms, or another source.

- **ML_05 · Measurement · Connect marketing source to downstream outcomes.** Where possible, track source → lead → qualified lead → sale → revenue.

- **ML_06 · Measurement · Keep a marketing change log.** Record date, change, reason, expected impact, and actual result.

- **ML_07 · Measurement · Build a consistent follow-up system.** Use email, SMS, retargeting, sales follow-up, abandoned-cart, or nurture where appropriate.

- **ML_08 · Measurement · Review performance across multiple time horizons.** Do not let one bad day or week override longer-term trends without investigation.

## 14. Recommendation selection rules

Use curated recommendation bundles for V1 rather than selecting individual actions independently. Each matched pattern has a default 3-action bundle. If an exclusion condition makes an action inappropriate, substitute from the same category/purpose. Never show more than three recommendations. Each rendered recommendation must include: What to do; Why you're seeing this; Done when; optional AI Accelerator.

## 15. Do Not Prioritize Yet rules
Maximum three items. Every item must include a reason tied to the user's diagnosis. Never use generic prohibitions without explaining why the action is premature for this specific pattern.

## 16. KPI guidance rules

Every report gets exactly one Primary KPI, one Supporting KPI, and up to two Diagnostic KPIs. Include a permanent note: **Do not optimize toward diagnostic KPIs in isolation.** KPI guidance must adapt to business type and primary marketing goal where possible.

## 17. AI Accelerator rules

AI is not a seventh diagnostic category. AI appears only when it materially improves speed, breadth, synthesis, or execution. Principle: **Use AI to accelerate informed thinking, not to outsource decisions you have not defined clearly enough yet.** Good uses include transcript synthesis, customer-language extraction, messaging territory generation, hypothesis generation/ranking, competitor-message comparison, KPI reconciliation, and page critique against a defined conversion goal. Avoid vague prompts such as “Ask ChatGPT what marketing you should do.”

## 18. Clarity Work Session

Primary constraint receives 5–7 coaching prompts; secondary receives 3. Finish with a structured decision synthesis rather than open-ended reflection. Example for Message: customer; primary desired outcome; repeated problem phrase; reason to choose us; proof; five-second message. Tone should be empowering and practical.

### Work Session prompt bank

#### Offer

- Describe what you sell in one sentence without using industry jargon.

- What is the single most important result a customer hopes to get from this offer?

- Who is most likely to get exceptional value from this offer—and who is not a fit?

- What objections come up most often, and what do they reveal about value perception?

- What direct evidence—not assumptions—shows that people want this offer?

- If traffic doubled tomorrow, what weakness would you be most worried about exposing?

- What creates a genuine reason to act now without manufactured scarcity?

- Which offer would you keep if you could only sell one for the next 12 months?

- Why did recent buyers choose you, and why did recent prospects say no?

#### Audience

- What do your best customers have in common beyond demographics?

- What tends to happen right before a strong prospect starts looking for help?

- Define a qualified lead in one sentence. Then compare your last 20 leads against it.

- What larger life or business outcome sits behind the immediate product need?

- Where do ideal prospects already spend attention or actively search for solutions?

- Which customer group creates the most economic value?

- Who should you actively exclude?

- How should different segments receive different messages?

#### Message

- What should a relevant stranger understand within five seconds?

- For each major feature, ask: “So what does this let the customer do, avoid, gain, or feel?”

- Review sales calls, emails, testimonials, and reviews. What phrases appear repeatedly?

- Why should a qualified buyer choose you instead of a competitor, DIY, or doing nothing?

- What meaningful frustration, ambition, risk, relief, or identity change sits underneath the rational purchase?

- Which major claims on your page need stronger proof, and what evidence already exists?

- What proof supports each major claim?

- Which emotional outcome sits underneath the rational outcome?

#### Conversion Experience

- What is the one primary action you want a visitor to take?

- What are the first three things a visitor sees, and do they justify taking the next step?

- Compare the promise before the click with the headline, offer, and CTA after the click. Where does continuity break?

- Map every click, page, field, and step between interest and conversion. Which ones are unnecessary?

- What reassurance would a skeptical but qualified buyer need immediately before taking action?

- What are you asking the visitor to risk—time, money, data, or commitment—and does the experience justify that ask?

- Where do visitors drop off?

- What proof belongs closer to action?

- Is the ask appropriate for the visitor’s current level of trust?

#### Traffic

- For every meaningful channel, label its primary job: discovery, intent capture, retargeting, nurture, conversion, or reactivation.

- What volume enters the top of the funnel, and what proportion becomes the outcomes you care about?

- When performance last changed meaningfully, what else changed around the same time?

- Where does discovery happen? Where does intent get captured? Where does retargeting or nurture happen?

- What single unanswered question would be most valuable to test next, and what baseline would you protect?

- What is a new customer economically worth, and what lead/customer acquisition cost can the business sustain?

- How concentrated is acquisition in one channel?

- Which test would teach you the most without risking the working baseline?

#### Measurement & Learning

- If you could watch only three numbers every week, which would tell you whether marketing is creating real business value?

- List your primary outcome KPI, one supporting KPI, and one diagnostic KPI.

- What recurring weekly or monthly KPI view would make changes in the business easier to interpret?

- For every primary KPI, define one authoritative source and document known attribution differences.

- Where does visibility disappear between acquisition, lead quality, sales, and revenue?

- What sequence should your team follow before making a major change when performance shifts?

- What changed during meaningful performance shifts?

- What does sales/customer data say that advertising platforms do not?

- What happens to leads after the initial conversion?

## 19. Case-card system

Three allowed formats: **Before → After** for messaging/offers/pages/funnels; **Problem → Diagnosis → Fix** for strategic issues; **Business Model → Constraint → Priority** for complex system cases. Match by diagnosis relevance first, business-model applicability second, evidence level third. Evidence levels: A=quantified/defensible result; B=observed performance improvement without overclaiming causality; C=strategic intervention with no outcome claim.

### CASE_YOUTH_SPORTS_FREE_TRIAL — Making an Existing Introductory Offer Easier to See and Act On
- **Industry:** Multi-location youth sports / gymnastics
- **Business model:** Recurring classes, camps, trials, and other programs across multiple locations.
- **Format:** before_after
- **Goal:** Turn paid traffic into more trial participation and downstream paying families.
- **Situation:** A free-trial concept already existed, but acquisition experiences could be broader and less directly focused on that entry offer.
- **Diagnosis:** The opportunity was not necessarily to invent a new offer. It was to make the existing offer easier to notice, understand, and act on across ads and landing pages.
- **Intervention:** Use clearer free-trial messaging, location-specific landing experiences, stronger CTA visibility, and tighter ad-to-page alignment.
- **Strategic lesson:** Sometimes growth comes from reducing the distance between an existing strong offer and the action you want the customer to take.
- **Evidence:** B_observed
- **Applicability:** local_business, multi_location, lead_gen, paid_media, conversion

### CASE_PRO_ENGLISH_OUTCOME — Selling the Outcome Behind the Service
- **Industry:** Professional English coaching / education
- **Business model:** Group and 1:1 coaching for professionals, executives, founders, and ambitious learners; historically referral-heavy.
- **Format:** business_constraint_priority
- **Goal:** Translate a technically clear service into stronger positioning and acquisition messaging.
- **Situation:** The service could easily be interpreted as simply “better English instruction.”
- **Diagnosis:** The deeper value included professional confidence, leadership, self-expression, career advancement, and operating effectively in English-speaking environments.
- **Intervention:** Center positioning, hooks, landing-page messaging, and customer journeys on those deeper outcomes rather than only the instructional mechanism.
- **Strategic lesson:** Customers often buy the life or business outcome created by the service, not merely the mechanism being delivered.
- **Evidence:** C_strategic
- **Applicability:** consulting, education, high_ticket, message, audience

### CASE_BUSINESS_SYSTEMS_POSITIONING — Communicating the Integrated Outcome, Not Just the Pieces
- **Industry:** Business systems / branding / web infrastructure
- **Business model:** Done-for-you or assisted branding, websites, CRM, booking, automation, and related business infrastructure.
- **Format:** before_after
- **Goal:** Make a multi-component service understandable at first glance.
- **Situation:** The initial presentation could make the service look disproportionately like website development even though the offer provided much more.
- **Diagnosis:** The integrated value was closer to a complete client-acquisition and follow-up system than an isolated website build.
- **Intervention:** Shift the hero and supporting messaging toward the end-to-end outcome: look professional, capture leads, book clients, and follow up automatically.
- **Strategic lesson:** When a product does several things, communicate the integrated outcome rather than forcing customers to assemble the value themselves.
- **Evidence:** C_strategic
- **Applicability:** professional_services, consulting, message, offer

### CASE_EDU_LANDING_ALIGNMENT — When the Campaign Is Not the Only Problem
- **Industry:** Education / personal development
- **Business model:** Programs and educational resources supported by a Google Ad Grant and lead-generation pages.
- **Format:** problem_diagnosis_fix
- **Goal:** Improve conversion from search traffic into community/program engagement.
- **Situation:** Traffic was being sent to pages where value, forms, and next actions were not always immediately clear.
- **Diagnosis:** There was a message and conversion alignment issue between search intent, ad copy, landing-page promise, and conversion action.
- **Intervention:** Use benefit-led copy, clearer forms/CTAs, credibility indicators, and tighter page-to-search alignment.
- **Strategic lesson:** A traffic source can be functioning while the experience receiving that traffic suppresses results.
- **Evidence:** B_observed
- **Applicability:** nonprofit, education, google_ads, lead_gen, conversion, message

### CASE_TRACKING_URL_BREAK — When Performance “Breaks” Because Measurement Broke
- **Industry:** Education / personal development
- **Business model:** Lead-generation campaigns using Google Ads and Google Tag Manager.
- **Format:** problem_diagnosis_fix
- **Goal:** Restore accurate conversion measurement.
- **Situation:** A conversion began showing “Needs Attention.”
- **Diagnosis:** A thank-you-page URL change broke the Google Tag Manager trigger.
- **Intervention:** Test the form, identify the mismatched URL, update the trigger, republish, and verify the event fires again.
- **Strategic lesson:** Sometimes the campaign did not change. Your measurement did.
- **Evidence:** A_quantified
- **Applicability:** google_ads, measurement, lead_gen, tracking

### CASE_TRAVEL_CLOSED_LOOP — Connecting Paid Media to Downstream Lead Value
- **Industry:** High-ticket travel / cruises
- **Business model:** High-value travel bookings generated from paid and non-paid acquisition sources.
- **Format:** business_constraint_priority
- **Goal:** Allocate media based on real lead and sales quality rather than surface conversion volume.
- **Situation:** A lead may enter through paid media but later appear as direct, organic, social, or referral depending on the reporting touchpoint.
- **Diagnosis:** Platform-level acquisition data alone was insufficient to understand which campaigns ultimately created valuable opportunities.
- **Intervention:** Improve the feedback loop between marketing source data and downstream lead/sales outcomes.
- **Strategic lesson:** The cheapest lead is not necessarily the most valuable lead; closed-loop reporting helps steer toward real business value.
- **Evidence:** B_observed
- **Applicability:** travel, high_ticket, paid_media, complex_attribution, measurement

### CASE_RETREAT_KPI_BREADTH — Why One Conversion Column Can Miss the Bigger Picture
- **Industry:** Retreats / hospitality / education
- **Business model:** Multiple retreat and program offerings with cross-pollination between conversion types.
- **Format:** problem_diagnosis_fix
- **Goal:** Interpret campaign impact using a broader, more trustworthy measurement view.
- **Situation:** A narrow conversion column could make campaign performance appear weaker or more uncertain than broader customer behavior suggested.
- **Diagnosis:** Customers converted across multiple programs and conversion types, so one platform column did not capture the full commercial story.
- **Intervention:** Review outcome KPIs alongside all-conversion behavior, conversion timing, cross-device and supporting diagnostic metrics.
- **Strategic lesson:** Diagnostic metrics provide context to the North Star result; a single platform column rarely tells the entire business story.
- **Evidence:** B_observed
- **Applicability:** travel_hospitality, google_ads, measurement, complex_attribution

### CASE_ECOM_SYSTEM_CAUSE — When “The Ads” May Not Be the Root Cause
- **Industry:** Premium ecommerce / jewelry
- **Business model:** Direct-to-consumer ecommerce with paid acquisition, merchandising, promotions, and repeat-customer behavior.
- **Format:** problem_diagnosis_fix
- **Goal:** Diagnose softer performance without jumping immediately to a channel-level conclusion.
- **Situation:** Paid-media performance appeared weaker while product assortment, merchandising, promotions, first-touch customer experience, and traffic mix were also changing.
- **Diagnosis:** The issue could be system-level rather than simply “Meta stopped working.”
- **Intervention:** Compare business sales, new-customer behavior, merchandising changes, traffic mix, site changes, and platform performance before restructuring the account.
- **Strategic lesson:** Marketing channels operate inside a commercial system. When the system changes, ad performance can change even if campaign mechanics are not the root cause.
- **Evidence:** C_strategic
- **Applicability:** ecommerce, meta_ads, paid_media, measurement, traffic

### CASE_UNDERPOWERED_TESTING — Testing More Things Does Not Always Create More Learning
- **Industry:** Small service business / paid acquisition
- **Business model:** Limited-budget service business testing paid acquisition and creative.
- **Format:** problem_diagnosis_fix
- **Goal:** Learn faster without spreading limited budget across too many variables.
- **Situation:** Budget is split across multiple campaigns, audiences, creatives, or objectives.
- **Diagnosis:** The tests are too underfunded to create meaningful signal, and the working baseline may be destabilized.
- **Intervention:** Concentrate budget around fewer hypotheses, preserve the strongest baseline, and document the result.
- **Strategic lesson:** Testing more things does not necessarily mean learning more things.
- **Evidence:** C_strategic
- **Applicability:** professional_services, paid_media, testing, traffic

### CASE_CHANNEL_ROLES — When Google and Meta Are Doing Different Jobs
- **Industry:** Multi-channel acquisition
- **Business model:** A business using intent-based acquisition plus social retargeting.
- **Format:** before_after
- **Goal:** Evaluate channels based on their contribution to the journey rather than forcing identical expectations.
- **Situation:** Channels may be compared independently on immediate sales even though they contribute at different stages.
- **Diagnosis:** Google can capture existing intent while Meta reinforces the offer through retargeting and return visits.
- **Intervention:** Map channel roles and evaluate the combined journey: intent capture → site visit → retargeting → return → conversion.
- **Strategic lesson:** A channel does not have to receive final-touch credit to contribute materially to acquisition.
- **Evidence:** B_observed
- **Applicability:** google_ads, meta_ads, retargeting, complex_attribution, traffic

Quantified claims must be added only after exact source periods and attribution caveats are verified. Never invent or infer a metric.

## 20. 30-day plan framework

All plans follow the Clarity Loop: **Week 1 Understand/Baseline → Week 2 Decide/Build → Week 3 Implement/Strengthen → Week 4 Learn/Measure.** Each week object contains title, objective, actions, and completion criteria. The plan should be generated from the matched pattern, not from generic calendar copy.

## 21. Report structure

Canonical sequence:
1. Cover/personalized business info
2. Executive summary
3. Six-part scorecard
4. Diagnostic Confidence
5. Primary Constraint
6. Secondary Constraint
7. Relative Strength (only when justified)
8. Your Next 3 Moves
9. What Not to Prioritize Yet
10. What This Looks Like in the Real World
11. Metrics Worth Watching
12. AI Accelerators
13. Your 30-Day Clarity Plan
14. Your Clarity Work Session
15. Continue Working on Your Business / Clarity Engine CTA

Cover line: **See what's working. Find what's holding you back. Know what to do next.** Show company, website, and report date.

### End CTA
Use one restrained CTA: **Explore Ways to Work Together**. Explain that the report is designed for independent action, while Clarity Engine can also provide deeper strategy, audits, paid media/growth work, or ongoing support where there is a fit. Do not force Strategy Sprint as the only next step.

## 22. Download requirements

V1 should provide two downloadable/printable artifacts from the same structured result data: (1) personalized Marketing Clarity Report; (2) customized Clarity Work Session. Prefer server-generated print-friendly HTML/PDF or another repository-appropriate solution. Do not maintain a separate manual logic engine for downloads.

## 23. Persistence and database model

Store customer, purchase/audit session, answer responses, progress state, final frozen report, and internal completion event. A completed report is immutable with respect to later scoring-rule updates; future retakes create new sessions. Minimum conceptual entities: ProductConfig, Customer, AuditSession, Section, Question, AnswerOption, AuditResponse, SectionResult, DiagnosticFlag, DiagnosticPattern, ContradictionRule, DiagnosticConfidence, ConstraintResult, Recommendation, RecommendationBundle, DeprioritizedAction, KPI/KPIBundle, AIAccelerator, WorkSessionPrompt/Bundle, TeachingNote, CaseCard, CaseMetric, ThirtyDayPlan, AuditReport, NotificationEvent.

### Resume behavior
Every response autosaves. Purchased audit gets a cryptographically secure resume token that does not expose email/customer ID. User can close and later resume at last incomplete question. Back navigation and answer editing are allowed. Completed resume links open results. No login/password/account recovery in V1.

## 24. Suggested internal data structures

```ts
interface ProductConfig { productId:string; name:string; subtitle:string; tagline:string; priceCents:number; estimatedMinutes:[number,number]; version:string; }
interface Customer { id:string; name:string; email:string; companyName:string; websiteUrl:string; businessType:string; primaryMarketingGoal:string; }
interface AuditSession { id:string; customerId:string; status:string; secureResumeTokenHash:string; currentQuestionId?:string; startedAt?:Date; lastSavedAt?:Date; completedAt?:Date; }
interface Question { id:string; sectionId:string; order:number; label:string; prompt:string; helperText?:string; weight:number; options:AnswerOption[]; teachingNoteId?:string; }
interface AnswerOption { value:'A'|'B'|'C'|'D'|'E'; text:string; score:number; flags?:string[]; confidenceModifier?:number; }
interface AuditResponse { auditSessionId:string; questionId:string; answerValue:string; weightedScore:number; updatedAt:Date; }
interface AuditReport { id:string; auditSessionId:string; reportVersion:string; overallScore:number; sectionScores:Record<string,number>; primaryConstraint:string; secondaryConstraint?:string; relativeStrength?:string; confidenceScore:number; confidenceLevel:'high'|'moderate'|'limited'; patternIds:string[]; recommendationIds:string[]; }
```

## 25. Internal/admin V1 requirements

No polished admin dashboard required. On completion, send an internal notification containing name, email, company, website, overall score, primary constraint, secondary constraint, confidence, business type, and primary goal, with an internal link to the stored report if feasible. Structure the database so a V1.1 admin table/filter view can be added later.

## 26. Error states and resilience

Required states: payment verified but assessment init fails; invalid/expired resume token; database save temporarily fails; user loses connection while answering; report generation fails; downloadable report fails while web results succeed; duplicate checkout callback; user edits earlier answer after completion (create recalculation workflow only if explicitly allowed—default completed report remains frozen); unsupported/malformed website URL. Never lose already-saved responses. Show clear retry/recover actions.

## 27. Security and privacy requirements

Use secure random resume tokens stored hashed when practical; never put email or sequential customer IDs in resume URLs; verify purchase/session ownership before displaying private results; rate-limit token attempts where appropriate; validate/sanitize inputs; protect internal notification/report routes; use environment variables for secrets; never expose payment secrets client-side; minimize stored personal data; ensure report URLs are not indexed; include appropriate robots/noindex for private audit routes; avoid logging full private responses in public logs.

## 28. Accessibility and mobile requirements

Mobile-first question cards; keyboard accessible answer selection/back navigation; visible focus states; semantic form controls; sufficient contrast; progress information not color-only; teaching notes accessible to screen readers; logical heading structure; tap targets sized appropriately; no horizontal scrolling; report and Work Session print cleanly on common paper sizes.

## 29. Analytics / product measurement

Track product funnel events without collecting unnecessary answer content in analytics: sales-page view; checkout start; purchase success; audit start; section start/complete; question answered (question ID only); resume; diagnostic complete; report viewed; report downloaded; Work Session downloaded; Work Together CTA clicked. Maintain internal product KPI view later: purchase conversion, audit start rate, completion rate, median completion time, resume usage, CTA rate, most common constraints/patterns.

## 30. Acceptance criteria and test scenarios

At minimum, automated/unit tests must cover weighted section scoring, special E scores, confidence modifiers, contradiction penalties, pattern matching, precedence resolver, curated recommendation bundles, relative-strength suppression, frozen report behavior, resume token behavior, answer edits before completion, all six section progress calculations, and required customer fields. End-to-end tests must cover purchase/session creation (or mocked verified purchase), complete audit, close/resume, back/edit, generate result, download report, mobile viewport, and failure/retry states.

### Canonical fictional stress tests
1. Strong offer / weak message → Message primary.
2. Weak offer + aggressive traffic → Offer primary + More-Traffic Trap.
3. Great funnel / low traffic → True Traffic Constraint.
4. Ecommerce blaming ads amid broader changes → Measurement/diagnosis primary.
5. High-ticket travel with many leads but weak downstream visibility → Attribution/Data Trust primary.

## 31. V1.1+ backlog (do not build in V1)

Free six-question preview; abandoned-audit reminders; 30/90-day retake reminders; customer accounts/history; comparison of retake scores; admin analytics dashboard; filters by constraint/business type; website crawling/AI-assisted site review; aggregate benchmarking; more case cards with verified quantified metrics; navigation/service architecture refinements; free-to-paid funnel experiments.

## 32. Codex implementation phases

1. Inspect repository and propose architecture; do not code product logic until repo conventions are understood.
2. Implement canonical data/content files and deterministic scoring engine with unit tests.
3. Implement paid-session initiation, customer context, autosave/resume, question UI, progress/time UX.
4. Implement result resolver, confidence, contradictions, recommendations, report UI.
5. Implement downloads from the same frozen report data.
6. Integrate/verify checkout and internal completion notification.
7. Run canonical fictional stress tests and E2E tests.
8. Perform visual/mobile/accessibility QA and preserve existing Clarity Engine styling.

## 33. Repository/content separation principle

Separate **content** (questions, recommendations, cases, Work Sessions), **logic** (scores, flags, patterns, confidence, matching), and **presentation** (pages, components, report/PDF). Do not hard-code diagnostic copy inside page components. Do not use an LLM as the scoring engine. The deterministic engine selects diagnosis/recommendations; optional AI may personalize wording only where explicitly approved.
