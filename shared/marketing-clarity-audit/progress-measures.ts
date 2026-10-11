import type { FrozenAuditReport } from "./report";
export interface ProgressMeasure {
  title: string;
  method: string;
}
export const progressMeasures: Record<number, ProgressMeasure[]> = {
  1: [
    {
      title: "Check comprehension with fresh prospects",
      method:
        "Show the offer to people unfamiliar with it. Ask them to explain what they would get, who it is for, and why it matters; record where their explanations diverge.",
    },
    {
      title: "Compare the promise across touchpoints",
      method:
        "Review the homepage, offer page, proposal, and sales introduction side by side. Note whether they communicate one consistent customer outcome.",
    },
    {
      title: "Keep an objection record",
      method:
        "Capture the actual questions from qualified prospects. Distinguish confusion about the offer from specific concerns about fit, price, or delivery.",
    },
    {
      title: "Follow meaningful responses",
      method:
        "Track what relevant prospects do after seeing the clarified offer, such as requesting details, booking, starting a trial, or buying. Compare similar situations before drawing conclusions.",
    },
  ],
  2: [
    {
      title: "Review lead fit consistently",
      method:
        "Use a short fit checklist based on actual customer needs and circumstances. Compare the share of relevant leads over time using the same definition.",
    },
    {
      title: "Record the reason people started looking",
      method:
        "Ask relevant customers what happened before they sought help. Look for repeated problems, timing, and buying situations in their own words.",
    },
    {
      title: "Follow qualified interest, not just volume",
      method:
        "Record both total inquiries and those that meet your fit criteria, then follow whether those conversations progress.",
    },
    {
      title: "Connect targeting choices to evidence",
      method:
        "For each audience or channel choice, document the customer group, buying situation, and evidence behind it. Review which choices actually reach those people.",
    },
  ],
  3: [
    {
      title: "Run a short understanding check",
      method:
        "Ask people unfamiliar with the business what the page promises and why they might choose it. Write down their answers before explaining anything.",
    },
    {
      title: "Compare copy with customer conversations",
      method:
        "Collect recurring phrases from interviews, sales notes, or reviews. Check whether your important headlines and explanations use the same meaning and language.",
    },
    {
      title: "Listen for reasons to choose you",
      method:
        "Ask prospects how they compare reasonable alternatives. Look for specific reasons beyond price, and note where your intended distinction is still unclear.",
    },
    {
      title: "Audit claims and nearby evidence",
      method:
        "List the important claims on each decision-making page. Check whether relevant proof appears where the customer evaluates each claim, and record unresolved objections.",
    },
  ],
  4: [
    {
      title: "Observe the next-step journey",
      method:
        "Watch a relevant visitor move from the initial promise toward the action. Ask what they expect next and where the step becomes unclear.",
    },
    {
      title: "Check continuity across the journey",
      method:
        "Compare the ad or referral, landing page, form or checkout, and follow-up. Record mismatches in value, expectations, or required effort.",
    },
    {
      title: "Track where avoidable work occurs",
      method:
        "Document unnecessary fields, steps, delays, or repeated questions. Observe completion and abandonment at those points before and after a focused change.",
    },
    {
      title: "Check reassurance against the commitment",
      method:
        "List what the visitor commits and the proof or explanation beside the action. Ask what remains uncertain; decide whether friction should be removed or trust/context added.",
    },
  ],
  5: [
    {
      title: "Document the control before changing anything",
      method:
        "Record the current campaign settings, budget, audience, offer, and results you want to protect. Confirm that this baseline stays unchanged while the test runs separately.",
    },
    {
      title: "Define the test and its decision rule",
      method:
        "Write the hypothesis, one variable, comparison, budget, traffic, and time needed before reviewing results. Record what finding would justify keeping, revising, scaling, or stopping.",
    },
    {
      title: "Evaluate each channel in its intended role",
      method:
        "Document whether a source introduces new people, brings them back, or helps them take action. Review role-relevant evidence rather than judging every channel by the same final-click measure.",
    },
    {
      title: "Review the change log",
      method:
        "For each meaningful edit, record the date, reason, expected effect, observed result, and lesson. Use that record when explaining a performance shift or choosing the next test.",
    },
  ],
  6: [
    {
      title: "Write the outcome-to-evidence map",
      method:
        "Name the few business results that matter, then identify the supporting steps and diagnostic signals needed to explain them. Check whether reporting keeps those roles distinct.",
    },
    {
      title: "Reconcile definitions and sources",
      method:
        "For each important number, record its definition, authoritative system, owner, and reporting period. Compare discrepancies and document known gaps rather than silently choosing the most favorable value.",
    },
    {
      title: "Trace a sample journey downstream",
      method:
        "Follow available records from a source or campaign to a qualified lead, customer, and revenue. Record where the connection is reliable and where it breaks; track whether those gaps become smaller.",
    },
    {
      title: "Review decisions produced by reporting",
      method:
        "Check whether recent reports record what changed, a plausible explanation, the evidence behind it, and an agreed next action. A report without a decision is a useful improvement opportunity.",
    },
    {
      title: "Inspect the learning record",
      method:
        "Look for test hypotheses, meaningful changes, results, and lessons in one consistent record. Check whether a later decision can point to earlier evidence rather than starting from scratch.",
    },
  ],
};
export function measuresFor(report: FrozenAuditReport) {
  return report.diagnosis.primary
    ? progressMeasures[report.diagnosis.primary.sectionId]
    : [];
}
