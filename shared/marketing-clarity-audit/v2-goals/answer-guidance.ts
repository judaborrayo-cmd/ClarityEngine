import { goalEvidence, goalChecks, selectedGoalLabels } from "./goals";
import type { Answers, Setup } from "./questionnaire";
import { answerMeaning, unverifiedObservations } from "./answer-meaning";

export interface Recipe {
  topic: string;
  observation: string;
  impact: string;
  evidence: string;
  decision: string;
  implement: string;
  done: string;
  evaluate: string;
}
// Every core question has its own evidence -> decision -> implementation recipe.
// These are checks/improvements to the answered capability, never a section-wide repair bundle.
export const recipes: Record<string, Recipe> = {};
function add(
  id: string,
  topic: string,
  observation: string,
  impact: string,
  evidence: string,
  decision: string,
  implement: string,
  done: string,
  evaluate: string,
) {
  recipes[id] = {
    topic,
    observation,
    impact,
    evidence,
    decision,
    implement,
    done,
    evaluate,
  };
}
add(
  "O1",
  "a clear offer explanation",
  "your offer takes additional explanation or is still being defined",
  "New prospects need to understand what they are considering before they can judge its value.",
  "Compare the current offer explanation with how three relevant prospects describe it back to you.",
  "Choose one accurate sentence naming what the customer receives; keep the customer outcome and audience you already report as clear.",
  "Use the chosen sentence in one sales explanation or low-risk copy prototype and check comprehension.",
  "One accurate explanation has been checked with relevant prospects and confusing terms recorded.",
  "Compare what prospects understand with the original explanation; keep or refine it without assuming more sales.",
);
add(
  "O2",
  "the outcome your offer promises",
  "the customer outcome is less clear than the services or deliverables",
  "A clear mechanism alone may leave the customer unsure what changes for them.",
  "Ask recent customers what changed after using the offer; compare that with the stated deliverables.",
  "Choose one substantiated outcome to lead with, retaining accurate service details as support.",
  "Revise one offer explanation or prototype so the outcome is explicit without adding unsupported claims.",
  "The explanation names an evidence-supported outcome and the supporting deliverables.",
  "Check whether relevant prospects can describe the outcome and whether the promise remains credible.",
);
add(
  "O3",
  "who the offer fits",
  "the intended customer for this offer remains broad",
  "A broad fit definition makes it harder to judge which inquiries deserve attention.",
  "Compare recent buyers by the situation in which the offer was useful and the outcomes they received.",
  "Choose fit and exclusion criteria for this offer, using the audience knowledge you already have.",
  "Document the offer-specific fit criteria in a sales or qualification brief.",
  "A brief names the best-fit situations and the boundaries of this offer.",
  "Review a small sample of inquiries against the criteria and record ambiguous cases.",
);
add(
  "O4",
  "value and price objections",
  "value or price questions need investigation, or there is too little evidence to interpret them",
  "Objections can reveal missing context, fit or expectations; they do not establish that the price is wrong.",
  "Review relevant customer conversations and value objections, including acceptance, hesitation and rejection; gather examples if evidence is sparse.",
  "Separate price affordability, unclear value, fit and delivery concerns before choosing one response.",
  "Clarify the relevant value explanation or sales response for the observed objection; do not change price without evidence.",
  "Repeated objections and one justified response are documented.",
  "Check whether the response answers the actual objection and record remaining uncertainty.",
);
add(
  "O5",
  "direct demand evidence",
  "the evidence that customers want this offer is still limited",
  "Increasing acquisition before learning why customers say yes or no can amplify an untested assumption.",
  "Gather recent purchase, inquiry and rejection evidence; distinguish interest from willingness to buy.",
  "Choose the most important unanswered demand question and a low-cost way to test it with relevant prospects.",
  "Conduct the agreed interviews or offer validation exercise within an affordable limit, without assuming paid traffic is needed.",
  "The demand question has direct customer evidence and a written keep, refine or rethink decision.",
  "Review actual behavior and objections against the hypothesis; do not count polite interest as validated demand.",
);
add(
  "O6",
  "readiness for more qualified demand",
  "you are unsure the current sales experience could absorb more demand",
  "A readiness concern deserves a specific check before expanding acquisition.",
  "Walk through one recent customer path and ask the team where twice the volume would create difficulty.",
  "Choose the evidenced readiness bottleneck; preserve capabilities reported as effective.",
  "Complete one bounded readiness exercise or process adjustment, or document what must be resolved before expansion.",
  "The identified readiness concern has an owner and a checked response or explicit deferral condition.",
  "Review whether the concern is resolved and whether expansion conditions are met; expansion is not automatic.",
);
add(
  "A1",
  "the best-fit customer pattern",
  "your best-fit customer definition is broad or unconfirmed",
  "Without a useful fit pattern, targeting decisions rely more heavily on assumptions.",
  "Group a feasible sample of customers by problem, circumstances and value received.",
  "Choose the characteristics that distinguish strong fit from superficial similarities.",
  "Write a best-fit profile and apply it to the next available inquiry sample.",
  "The profile is supported by customer examples and includes uncertain boundaries.",
  "Compare fit judgments with subsequent customer outcomes where available.",
);
add(
  "A2",
  "the trigger that creates buying intent",
  "the events that make customers start looking are not yet clear",
  "Knowing who buys is different from understanding when they become receptive.",
  "Ask recent buyers what happened immediately before they sought a solution.",
  "Choose one repeated trigger supported by the interviews rather than inventing urgency.",
  "Add the validated trigger to a research, audience or messaging brief.",
  "A documented trigger cites customer evidence and avoids fabricated urgency.",
  "Check whether new conversations repeat the trigger or suggest a different explanation.",
);
add(
  "A3",
  "customer fit",
  "the fit of people showing interest is mixed or not consistently checked",
  "Activity counts alone cannot tell you whether acquisition is reaching suitable people.",
  "Review a small sample of people taking the intended next step. Define useful fit criteria before judging the sample.",
  "Choose one qualification distinction supported by outcomes, allowing for limited sample size.",
  "Use the distinction in a qualification checklist or source review before changing targeting.",
  "Inquiries can be consistently classified with exceptions and sample limitations recorded.",
  "Review the share meeting the stated fit criteria and any useful later outcomes, rather than optimizing only the cheapest action.",
);
add(
  "A4",
  "the result customers want",
  "the larger goal behind the immediate product need needs more investigation",
  "Customer decisions can depend on a broader practical or business outcome than the purchased mechanism.",
  "Ask customers what the immediate solution allows them to accomplish next.",
  "Choose one recurring larger goal that the offer can credibly support.",
  "Record that goal in a customer insight brief or an accurate explanatory prototype.",
  "The larger goal is documented with customer evidence and limits to the claim.",
  "Check the interpretation with customers rather than treating a plausible motivation as fact.",
);
add(
  "A5",
  "a realistic route to the audience",
  "the audience or an efficient way to reach it remains uncertain",
  "A sound audience definition still needs a feasible route to relevant people.",
  "List where best-fit prospects already search, learn or seek recommendations, using customer evidence.",
  "Choose one audience/channel hypothesis and a low-cost research method to evaluate access.",
  "Validate access through interviews, existing-channel evidence or a bounded outreach/research exercise; paid spend is optional after readiness checks.",
  "One realistic reach hypothesis has evidence, resource limits and a next decision.",
  "Review whether the channel reaches appropriate people, including costs and uncertainty.",
);
add(
  "M1",
  "first-impression message clarity",
  "the main value takes too much work to understand or varies across explanations",
  "Visitors need a coherent value explanation before deciding whether to continue.",
  "Show the current first impression to relevant people and record what they think the business offers.",
  "Choose the confusing or inconsistent part to clarify while preserving the offer and outcomes already reported as strong.",
  "Check a concise message prototype for comprehension before changing broader positioning.",
  "Relevant readers can describe the intended value and remaining confusion is recorded.",
  "Compare comprehension with the original version without promising a conversion gain.",
);
add(
  "M2",
  "outcomes in the message",
  "the message leans toward features or leaves the outcome distinction unclear",
  "People should not have to translate every deliverable into a personal benefit.",
  "Compare current feature statements with the outcomes customers say those features enable.",
  "Choose one accurate outcome statement that adds value without discarding useful product details.",
  "Revise one message example or prototype to connect the feature to its customer outcome.",
  "The example connects an actual feature to an evidence-supported customer outcome.",
  "Check whether customers recognize the outcome and understand the feature more easily.",
);
add(
  "M3",
  "customer language",
  "some messaging rests on assumptions rather than customers’ own language",
  "Customer phrasing can reveal distinctions that internally written copy misses.",
  "Collect phrases from a feasible set of sales conversations, reviews or interviews.",
  "Choose recurring language that accurately captures the problem and desired result.",
  "Use the supported language in one message prototype, keeping claims and offer scope accurate.",
  "The prototype cites the customer-language evidence behind its wording.",
  "Check recognition and comprehension with relevant readers and note differences.",
);
add(
  "M4",
  "a meaningful reason to choose you",
  "your differentiation is difficult to explain or remains uncertain",
  "A claim of being different helps only when customers understand why it matters.",
  "Compare actual customer choice reasons with reasonable alternatives, including doing nothing.",
  "Choose a substantiated difference relevant to that decision; do not invent uniqueness.",
  "Express the difference in one message prototype with the evidence needed to support it.",
  "One relevant difference is stated accurately and tied to customer evidence.",
  "Check whether relevant prospects can explain the difference and why it matters to them.",
);
add(
  "M5",
  "human relevance in the message",
  "the personal relevance of the message is limited or uncertain",
  "A practical offer can matter because of relief, confidence or ambition; those motivations must come from evidence.",
  "Ask customers what meaningful frustration, risk, relief or ambition accompanies the practical need.",
  "Choose one respectful motivation supported by customers, without fear tactics or exaggerated promises.",
  "Check a message prototype that connects the practical outcome to that motivation.",
  "The prototype reflects a real motivation without manipulation or unsupported claims.",
  "Review customer reactions for relevance, accuracy and discomfort before broader use.",
);
add(
  "M6",
  "evidence behind claims",
  "important marketing claims have limited supporting evidence",
  "Proof needs to substantiate the claim rather than merely decorate the page.",
  "List major claims and the evidence currently available for each, including demonstrations and direct records.",
  "Choose one material claim to substantiate or narrow; do not assume new testimonials are the only answer.",
  "Prepare a verified proof example or revise the claim to match the evidence.",
  "The selected claim has relevant substantiation or has been narrowed to a supportable statement.",
  "Check whether the evidence answers the claim and whether customers find it credible.",
);
add(
  "C1",
  "a clear primary next step",
  "the next action is difficult to identify or competes with other paths",
  "People can be interested yet remain unsure what they should do next.",
  "Walk the main conversion experience with a relevant visitor and record which action they notice.",
  "Choose the primary action for that page or sales step, preserving the value explanation you report as clear.",
  "Check a page/form or handoff prototype with a dominant next step and necessary alternatives.",
  "Relevant users can identify the intended next step without guidance.",
  "Review action comprehension and observed hesitation before considering a wider change.",
);
add(
  "C2",
  "value before the next step",
  "visitors need to work or scroll before understanding why the next step is worthwhile",
  "A clear action still needs enough context early in the experience to justify it.",
  "Review what appears before the first decision point on phone and desktop, noting where essential value is first explained.",
  "Choose which existing value explanation belongs earlier; preserve the primary action reported as clear.",
  "Check a prototype placing that explanation before the decision without rewriting the offer.",
  "Relevant visitors can explain why the next step is worthwhile before reaching it.",
  "Compare comprehension and reassurance with the original ordering.",
);
add(
  "C3",
  "a consistent offer from the first message to the next step",
  "the first message and the next page do not consistently describe the same offer",
  "A clear message can still lose people when the destination appears to offer something different.",
  "Compare what an ad, post or email offers with the page, form, checkout or sales conversation that follows.",
  "Choose the specific break in promise, language or next step; keep the offer and first-impression message reported as effective.",
  "Align that handoff with the existing promise in a checked prototype or bounded change.",
  "The first message and the next page describe the same accurate offer and next step.",
  "Review whether relevant visitors experience continuity and whether new inconsistencies remain.",
);
add(
  "C4",
  "unnecessary conversion friction",
  "the conversion path contains avoidable effort or has not been reviewed",
  "Extra steps can obstruct interest, but removing necessary reassurance can also hurt the decision.",
  "Walk the path and list clicks, fields, delays and required handoffs, noting what each contributes.",
  "Choose one evidenced unnecessary step while preserving necessary trust and qualification.",
  "Simplify that step in a checked prototype or a bounded process change.",
  "One unnecessary step is removed or justified, with the complete path checked.",
  "Review completion effort and customer questions, including any loss of needed context.",
);
add(
  "C5",
  "proof at the decision point",
  "proof or reassurance is limited where people are asked to act",
  "Evidence can exist elsewhere and still fail to answer hesitation at the moment of commitment.",
  "Locate where a relevant visitor hesitates and inventory proof already available for that decision.",
  "Choose the existing proof that answers that hesitation; only gather new evidence if the inventory establishes a real gap.",
  "Place the relevant evidence or reassurance next to that action in a checked prototype or bounded change.",
  "The decision point contains relevant, verifiable reassurance and has been checked in context.",
  "Review whether the reassurance answers the observed hesitation rather than assuming placement raises conversion.",
);
add(
  "C6",
  "fit between commitment and experience",
  "the commitment and surrounding experience may not fit, or that fit is uncertain",
  "The right remedy depends on whether the ask is premature, reassurance is missing, or a simple decision is overcomplicated.",
  "Map the money, time, information and commitment required at the decision; compare existing proof, context and friction.",
  "Determine which direction, if any, is supported: too much too soon, missing reassurance, or unnecessary complexity. Do not assume the direction.",
  "Adjust only the evidenced side of the commitment/experience relationship, or record no-change if the evidence does not confirm a mismatch.",
  "The commitment map and evidence justify one bounded adjustment or a documented no-change decision.",
  "Review fit with relevant visitors and check that the change preserves necessary trust and appropriate ease.",
);
add(
  "T1",
  "the roles of current traffic sources",
  "source roles are not clearly understood",
  "Discovery and returning interest need different evaluation questions.",
  "Trace current sources and a few customer journeys, identifying discovery versus return visits where evidence permits.",
  "Choose a useful role definition for each existing source rather than judging every source on the last click.",
  "Document the role map and use it in the next existing-channel review.",
  "The role map separates observed contribution from unverified assumptions.",
  "Check whether the map helps explain real journeys without claiming incremental impact.",
);
add(
  "T2",
  "visibility into incoming demand",
  "the flow from new interest to useful outcomes is unclear",
  "Final sales alone do not reveal whether enough suitable demand is entering the journey.",
  "Collect available incoming visitor/inquiry counts and downstream outcomes for a comparable period.",
  "Choose a feasible baseline linking incoming interest to qualified outcomes, recording missing data.",
  "Build the baseline review with existing records; document gaps instead of inventing conversion rates.",
  "One period shows incoming demand, downstream outcomes and known visibility gaps.",
  "Review whether the baseline supports a demand-versus-conversion question; avoid assuming more traffic is the answer.",
);
add(
  "T3",
  "investigation before reacting to performance",
  "performance changes are often explained through assumptions or guesses",
  "Campaign changes are easier to justify after checking other changes in the commercial system.",
  "Reconstruct one performance change alongside offer, pricing, customer mix, site, follow-up and tracking changes.",
  "Choose which explanations have evidence and which need checking before a campaign decision.",
  "Use a short investigation checklist and dated change log for the next review.",
  "A review separates observed facts, plausible causes and missing evidence.",
  "Check whether decisions follow the evidence and whether unresolved explanations remain.",
);
add(
  "T4",
  "intentional channel roles",
  "acquisition channels lack a clear division of purpose",
  "Different channels can support different stages of the same customer journey.",
  "Review how the current channels actually contribute to discovery, intent, return visits and conversion.",
  "Choose an evidenced purpose and appropriate measure for each current channel; no new channel is assumed.",
  "Document the roles and compare the next channel review with those intentions.",
  "Each current channel has a role, a relevant outcome and documented uncertainty.",
  "Review whether the chosen measures fit the channel roles and observed customer journeys.",
);
add(
  "ML1",
  "business outcomes worth measuring",
  "the small set of outcomes that defines marketing success is unclear",
  "A dashboard can show activity without answering whether the business is making progress.",
  "Compare the measures used in recent decisions with the intended business outcomes and their value.",
  "Choose a small set of business outcomes and explain how each supports a decision.",
  "Document those definitions in the existing review, preserving the review cadence you report as effective.",
  "The primary outcomes have clear definitions and a decision each will inform.",
  "Check whether the defined outcomes help answer the chosen business question rather than merely adding metrics.",
);
add(
  "ML2",
  "business outcomes versus diagnostic clues",
  "the distinction between results and supporting signals is unclear",
  "Clicks or engagement can help explain a result without being the business result themselves.",
  "List the current outcome and supporting measures from a recent review.",
  "Separate business outcomes from conversion steps and diagnostic clues, keeping the outcomes you already report as defined.",
  "Add the distinctions and their decision roles to the existing review.",
  "Each selected measure has a documented role and is not treated as an isolated success claim.",
  "Check whether a recent decision used the outcome and supporting clues appropriately.",
);
add(
  "ML3",
  "a consistent performance review cadence",
  "the recurring review of important business measures is irregular or missing",
  "Even reliable data is less useful when decisions are made from occasional snapshots.",
  "Review the dates and contents of recent performance reviews and identify the feasible owner and available inputs.",
  "Choose a realistic weekly or monthly review rhythm and agenda, retaining the measures and trusted data sources reported as strong.",
  "Schedule and conduct the first review using those existing measures; record decisions and the next date.",
  "A named owner has completed one review and the next review is scheduled with the same agenda.",
  "Check review attendance, consistency and usefulness of decisions; do not introduce a new measurement system.",
);
add(
  "ML4",
  "reliability of the data used for decisions",
  "your confidence in the data behind decisions is limited",
  "Changing acquisition based on unreliable inputs can make it harder to tell what actually improved.",
  "Trace a feasible sample of recorded outcomes from the customer action to the reporting source and business record.",
  "Identify any actual recording, definition or reconciliation gap before selecting a repair; do not assume tracking is broken.",
  "Verify or repair only the evidenced reliability gap, checking the sample again before relying on it for budget decisions.",
  "The sample reconciles with business records or has explicit unresolved limits and a responsible owner.",
  "Review the verification evidence and whether the inputs are reliable enough for the intended decision.",
);
add(
  "ML5",
  "visibility from marketing to later business value",
  "visibility fades between the initial response and downstream customer outcomes",
  "A reported conversion does not always show whether the intended action was useful or valuable.",
  "Trace a small sample from its source to the selected action and any useful follow-up result. Use the outcome-specific checks rather than assuming a lead-to-sale funnel; document where records stop connecting.",
  "Choose one missing downstream link that would help an actual decision, preserving data sources reported as reliable.",
  "Document or connect that feedback link using available records and check a sample end to end.",
  "One relevant downstream link is verified or its remaining gaps are explicitly recorded.",
  "Review whether customer quality and value can now inform the selected acquisition decision.",
);
add(
  "ML6",
  "a disciplined response to changing results",
  "the process for interpreting performance changes is inconsistent",
  "A repeatable investigation helps avoid reacting to the most visible short-term signal.",
  "Review how the last meaningful performance change was investigated and what was changed in response.",
  "Choose an investigation order covering data checks, business context and the relevant customer journey before action.",
  "Use the agreed checklist and change log in one review, preserving the reporting cadence and data trust you report as strong.",
  "One review records the investigation, uncertainty and reasons for its decision.",
  "Check whether the decision followed the agreed process and whether additional evidence is still needed.",
);

export function focusedCoreId(ids: string[], answers: Answers) {
  const prerequisite = (id: string) =>
    ["D", "E"].includes(answers[id])
      ? id === "ML4"
        ? 0
        : id === "O5"
          ? 1
          : id === "O1"
            ? 2
            : id === "O2"
              ? 3
              : 4
      : 5;
  return [...ids].sort(
    (a, b) =>
      prerequisite(a) - prerequisite(b) ||
      "ABCDE".indexOf(answers[b]) - "ABCDE".indexOf(answers[a]) ||
      a.localeCompare(b, undefined, { numeric: true }),
  )[0];
}
export function coreObservation(id: string, answers: Answers) {
  if (answerMeaning(id, answers[id]) === "missing_verification")
    return unverifiedObservations[id];
  if (id === "ML3")
    return answers.ML3 === "B"
      ? "you already have a report, but its updates or reviews are occasionally inconsistent"
      : answers.ML3 === "E"
        ? "no formal report currently brings the important measures together"
        : answers.ML3 === "D"
          ? "you mainly check individual platforms rather than maintain a consistent report"
          : "the existing report changes frequently or is spread across several tools";
  if (id === "M3" && answers.M3 === "E")
    return "you have not intentionally researched customer language; how closely the current wording matches customers still needs checking";
  if (id === "C6" && answers.C6 === "E")
    return "you are not yet sure whether the experience fits the commitment you ask for";
  if (id === "C6" && answers.C6 === "D")
    return "you reported a substantial mismatch between the commitment and the experience, without establishing its direction";
  if (id === "A3" && answers.A3 === "E")
    return "you have not consistently checked the fit of people showing interest, so their actual fit remains uncertain";
  if (id === "M1" && answers.M1 === "E")
    return "different pages or people explain the business differently";
  return recipes[id].observation;
}
export function coreActionRecipe(id: string, answers: Answers) {
  const recipe = { ...recipes[id] };
  if (id === "C5" && ["A", "B"].includes(answers.M6)) {
    recipe.evidence =
      "Inventory the credible proof you already have, then locate the hesitation at the decision point.";
    recipe.decision =
      "Choose which existing proof belongs beside the action; preserve the evidence already working elsewhere.";
    recipe.implement =
      "Place that existing proof or reassurance beside the decision in a checked prototype or bounded change. Do not commission new testimonials or case studies unless the inventory reveals a distinct evidence gap.";
  }
  if (id === "C3" && answers.C3 === "E")
    Object.assign(recipe, {
      topic: "whether the first message and next page match",
      observation: unverifiedObservations.C3,
      impact:
        "An unreviewed journey may already be consistent. Comparing the actual promise with the destination shows whether any change is needed.",
      evidence:
        "Compare what one ad, post or email says with the page, form or sales conversation that follows. Record both the matches and any differences.",
      decision:
        "Decide whether the first message and next step give customers different expectations. If they match, record that no change is needed; if they differ, choose only the change the comparison supports.",
      implement:
        "Record a confirmed match and keep the current experience, or make and check only the specific adjustment the comparison supports. A live website change is not required.",
      done: "A documented comparison confirms a match with no change needed, or supports a specific adjustment that has been checked. Both are useful completed outcomes.",
      evaluate:
        "Review the comparison and confirm that the no-change decision or checked adjustment follows the evidence. A confirmed match counts as a useful outcome.",
    });
  if (id === "C4" && answers.C4 === "E")
    Object.assign(recipe, {
      observation: unverifiedObservations.C4,
      decision:
        "Determine whether any step adds unnecessary effort. Preserve necessary qualification and reassurance; a finding that no unnecessary friction is established is valid.",
      implement:
        "Document a verified no-change decision, or simplify only an unnecessary step identified by the review and check the complete path.",
      done: "The path review justifies either a checked simplification or a documented no-change decision; unnecessary friction has not been assumed.",
    });
  if (id === "C1" && answers.C1 === "E")
    Object.assign(recipe, {
      decision:
        "Check which action visitors identify and whether it fits the intended next step. Keep an already clear action; choose a change only if the check reveals confusion.",
      implement:
        "Document an already clear next step or check a bounded prototype addressing the confusion actually observed.",
      done: "The intended action is verified as clear, or a specific improvement has been checked with relevant visitors.",
    });
  if (id === "M3" && answers.M3 === "E")
    Object.assign(recipe, {
      decision:
        "Compare the collected customer language with the existing wording before deciding whether any change would be useful.",
      implement:
        "Keep wording that already matches customer language, or check one evidence-supported wording change in a prototype.",
      done: "Customer-language research supports either the existing wording or a checked, specific revision.",
    });
  if (id === "ML3") {
    const existing = ["B", "C"].includes(answers.ML3);
    const definitions =
      answers.ML1 === "A"
        ? "Keep the important business outcomes you already have clearly defined."
        : answers.ML1 === "B"
          ? "Use the main business outcomes already identified, and clarify only the definitions that still need formalizing."
          : "Agree a small set of useful business outcomes and write a consistent definition for each.";
    const sources =
      answers.ML4 === "A"
        ? "Reuse the trusted sources you already have; do not replace them merely to build a report."
        : answers.ML4 === "B"
          ? "Keep the trusted sources already in use and document the few known gaps or ambiguities."
          : "Name a source for each measure and record any reliability limits before using it to decide.";
    Object.assign(recipe, {
      topic: existing
        ? "a consistent existing KPI report"
        : "a lightweight KPI report",
      observation: coreObservation(id, answers),
      impact:
        "Comparing the same measures across consistent periods is easier when the report, definitions and update responsibility stay clear.",
      evidence: existing
        ? "Review the existing report, tools, metric definitions, reporting periods, sources and update history. Identify what changes or gets missed."
        : "Inventory the measures and records already available in the individual platforms and business systems. Check what can support a simple recurring report.",
      decision: `${definitions} ${sources} Choose consistent reporting periods, an update owner and a realistic review rhythm. ${existing ? "Agree which parts of the existing report need standardizing rather than starting again." : "Choose a lightweight format, such as one spreadsheet or a simple dashboard; a new software platform is not required."}`,
      implement: existing
        ? "Improve the existing report so the same defined measures, reporting periods and sources are used consistently. Have the named update owner refresh it, hold a review and schedule the next update."
        : "Create the lightweight report with consistent metric definitions, reporting periods and sources. Have a named update owner populate it, hold a review and schedule the next update.",
      done: existing
        ? "The existing report has consistent definitions, periods and sources, has been refreshed by its owner and has a scheduled update and review rhythm."
        : "One populated report records the agreed definitions, periods and sources, its update owner and the next update and review dates.",
      evaluate:
        "Compare the completed report across the agreed periods. Check that definitions and sources stayed consistent, the owner updated it and the review supported a useful decision.",
    });
  }
  if (id === "O4" && answers.O4 === "E")
    Object.assign(recipe, {
      decision:
        "Determine whether the available conversations establish a repeated value or price concern. Choose more evidence gathering if they do not; do not presume the price or value explanation is wrong.",
      implement:
        "Document what the new conversations establish. Keep the current response when no concern is confirmed, or check a response addressing an objection actually observed.",
      done: "A feasible conversation sample supports a documented no-change decision, a checked response to an observed objection, or a clear plan to collect missing evidence.",
    });
  if (id === "C2" && answers.C2 === "E")
    Object.assign(recipe, {
      decision:
        "Check whether relevant visitors understand the value before the next step. Preserve the current ordering if it already supplies enough context; select a change only for an observed delay or misunderstanding.",
      implement:
        "Record a confirmed clear explanation, or check a prototype that addresses the specific delay or misunderstanding found.",
      done: "A visitor check supports the current ordering or a checked, specific change; late value communication has not been assumed.",
    });
  if (id === "M2" && answers.M2 === "E")
    Object.assign(recipe, {
      decision:
        "Explain the distinction in plain language, then compare the existing copy with what customers say changes for them. Decide whether any revision is needed.",
      implement:
        "Keep copy that already communicates the outcome, or check a justified example connecting the feature to its benefit.",
      done: "The team can distinguish features from customer outcomes and has documented either a good existing example or a checked revision.",
    });
  if (id === "O6" && answers.O6 === "C")
    Object.assign(recipe, {
      decision:
        "Determine whether the walkthrough establishes a readiness concern. Preserve an experience that checks out; select one response only if a concern is confirmed.",
      implement:
        "Document a verified readiness finding, complete a bounded response to an observed issue, or specify the evidence needed before expansion.",
      done: "The walkthrough supports readiness, a checked response or explicit evidence requirements without inventing a bottleneck.",
    });
  if (id === "M1" && answers.M1 === "E") {
    recipe.topic = "one consistent explanation of the business";
    recipe.evidence =
      "Compare the explanations used across current pages, campaigns and sales conversations.";
    recipe.decision =
      "Choose the accurate, customer-relevant explanation to carry consistently across those touchpoints.";
    recipe.implement =
      "Align a bounded set of inconsistent explanations with that chosen wording, preserving the offer you report as clear.";
  }
  return recipe;
}
export function strongValidation(setup: Setup) {
  return {
    topic:
      setup.outcome.length > 1
        ? "the evidence for each selected outcome"
        : `the evidence behind ${selectedGoalLabels(setup).toLowerCase()}`,
    evidence:
      setup.outcome.length === 1
        ? goalChecks[setup.outcome[0]]
        : "Trace a small sample for each selected outcome using the checks under Useful Progress Measures. Keep requests, useful completions and quality checks separate.",
    decision:
      "Choose one useful question that the evidence and available resources can answer. Define a separate baseline and success criterion for each selected outcome; a no-change decision remains useful.",
    implement:
      "Use the effective owner and review process you reported to complete a small evidence check or test within agreed resources. Keep successful activity stable and record a no-change decision if no change is supported.",
    done: "A checked evidence sample, separate outcome definitions and a keep, refine, defer or stop decision are recorded with an owner and review date.",
    evaluate:
      "Compare each selected outcome with its own baseline and useful-completion criteria. Record delays, measurement limits and tradeoffs; do not combine unlike outcomes or promise improvement.",
  };
}

export const coreGoals: Record<string, string> = {
  O1: "check a concise, accurate offer explanation with relevant prospects and use their understanding to decide what wording to keep",
  O2: "connect a substantiated customer outcome to the offer explanation while retaining useful delivery details",
  O3: "turn recent customer evidence into offer-specific fit boundaries and check them against real inquiries",
  O4: "separate the actual reasons behind value objections before choosing a sales response or considering any price decision",
  O5: "replace the most important demand assumption with direct customer evidence before considering acquisition expansion",
  O6: "identify the specific readiness concern and complete a bounded response or define what must wait before expansion",
  A1: "find the best-fit pattern in actual customer situations and check that it helps classify subsequent inquiries",
  A2: "identify the event that makes customers receptive and use that evidence without manufacturing urgency",
  A3: "establish a useful customer-fit distinction and compare it with downstream fit before changing targeting",
  A4: "check the larger goal behind the purchase and record only the motivations customers actually support",
  A5: "evaluate one realistic path to suitable prospects using a bounded research exercise before committing acquisition resources",
  M1: "check which explanation relevant readers understand and apply that learning to a limited message prototype",
  M2: "show the connection between an actual feature and the customer outcome, then check whether readers recognize that value",
  M3: "bring recurring customer phrases into a message prototype and check that the wording remains accurate and recognizable",
  M4: "substantiate a meaningful difference and check whether relevant prospects understand why it matters to their decision",
  M5: "check a respectful, customer-supported motivation in a message prototype without adding exaggerated promises",
  M6: "substantiate one important claim or narrow it to match the evidence you can actually provide",
  C1: "check which next step visitors notice and make a bounded prototype easier to navigate without changing the offer itself",
  C2: "bring the existing value explanation forward in a prototype and check whether it justifies the next step at the right moment",
  C3: "trace one promise through arrival and the next action, then check a targeted alignment while preserving the clear offer and message",
  C4: "identify one unnecessary source of effort, simplify it proportionately and check that necessary reassurance remains",
  C5: "locate the hesitation, choose relevant existing proof and check whether placing it beside the decision answers the real question",
  C6: "map the commitment, compare the surrounding reassurance and effort, and choose a response only after the direction of any mismatch is clear",
  T1: "map the evidenced roles of current sources and use that map to ask better questions about customer journeys",
  T2: "build a feasible incoming-demand baseline so you can distinguish a demand question from a conversion question",
  T3: "reconstruct one performance change and use an evidence-first investigation before choosing a campaign response",
  T4: "agree a useful role for each current channel and check whether the next review evaluates those roles appropriately",
  ML1: "agree a small set of business outcomes with clear decision roles while retaining the review process already working",
  ML2: "separate the business result from the signals that help explain it and check how that distinction changes a recent decision",
  ML3: "agree a feasible review rhythm around the trusted measures already in place, hold the first review and check the usefulness of that routine",
  ML4: "trace a sample to business records, verify or repair only the reliability gap actually found, and check whether the inputs can support the intended decision",
  ML5: "find one missing downstream feedback link and verify whether it adds useful customer-quality or value context",
  ML6: "use a repeatable investigation order in an actual review and evaluate whether the resulting decision follows the evidence",
};

export function coreGoal(id: string, answers: Answers) {
  if (id === "C2" && answers.C2 === "E")
    return "check whether the current ordering already explains the value in time, preserving it or checking a change only after observing a specific need";
  if (id === "O4" && answers.O4 === "E")
    return "gather enough conversation evidence to determine whether repeated value objections exist before deciding whether any response needs changing";
  if (id === "M2" && answers.M2 === "E")
    return "clarify the difference between features and outcomes, then check whether the existing copy already communicates the desired customer change";
  if (id === "O6" && answers.O6 === "C")
    return "check whether the walkthrough establishes a readiness concern and document either verified readiness or a response supported by what you find";
  if (id === "C3" && answers.C3 === "E")
    return "compare the promise with the destination, determine whether a mismatch exists and either preserve a confirmed match or make only an evidence-supported adjustment";
  if (id === "C4" && answers.C4 === "E")
    return "review the path before deciding whether unnecessary effort exists, preserving a verified no-change outcome where appropriate";
  if (id === "C1" && answers.C1 === "E")
    return "check whether visitors already recognize the intended next step and change only confusion established by that check";
  if (id === "M3" && answers.M3 === "E")
    return "research customer language, compare it with current wording and retain a verified match or check a justified revision";
  if (id === "ML3")
    return ["B", "C"].includes(answers.ML3)
      ? "standardize the existing report, assign its updates and check that consistent measures support the next review"
      : "create a lightweight report using consistent definitions, periods and sources, give its updates a clear owner and check its usefulness over time";
  return coreGoals[id];
}
