import type { FrozenAuditReport } from './report';
import { foundationalOfferPlan, type PlanWeek } from './plan';
// A reading layer, not a replacement for the plan stored with a frozen diagnosis.
const profiles: Record<string, [string,string,string,string]> = {
 P02:['Review customer interviews and recent sales conversations for problems, buying triggers, objections, and evidence of demand.','Choose the offer assumption that most needs validation and define what buyer response would support or challenge it.','Put the revised offer in front of relevant prospects and record their response.','Compare the response with the assumption you wrote down; separate interest, objections, and actual buying behavior.'],
 P03:['Group available recent leads or customers by fit and outcome, and look for recurring buying situations.','Choose a best-fit segment and one buying trigger supported by that evidence.','Apply that segment and trigger to the relevant targeting, message, and channel choices in the audience map.','Compare the fit and response of new inquiries with the earlier sample; record what still needs checking.'],
 P04:['Review recent inquiries against a written definition of a useful lead, including the reasons people are not a fit.','Choose one qualification or targeting change aimed at the clearest mismatch.','Apply the chosen change to the relevant entry point and keep the qualification criteria consistent.','Compare lead fit before and after the change, not just inquiry volume.'],
 P05:['Collect the phrases customers use for the outcome they want and the objections they raise.','Choose one customer promise and the credible proof that can support it.','Carry that promise and proof into the homepage or primary landing page.','Review whether customers can explain the value and whether available response evidence supports the revised message.'],
 P06:['Review the alternatives customers consider, including doing nothing, and the reasons they give for choosing.','Choose a meaningful difference that buyers value and that you can substantiate.','Put that reason to choose you into the relevant message and decision points, using consistent supporting evidence.','Record customer reactions to the difference and compare available response evidence with the starting point.'],
 P07:['List the major claims at decision points and the credible evidence already available to support them.','Choose the claim where better proof could resolve a significant buyer question.','Place relevant proof near that decision, qualifying any claim the evidence cannot yet support.','Check whether the proof answers the intended question and review comparable decision outcomes where available.'],
 P08:['Walk through the customer journey and record the current action, effort, reassurance, and available completion data.','Choose one obstacle supported by that review and define the specific change to test.','Apply the focused journey change and check that the essential information and confirmations still work.','Compare completion and customer feedback with the recorded starting point, noting tracking or sample limitations.'],
 P09:['Review the commitment being requested, the effort involved, and the evidence buyers receive before deciding.','Choose whether the evidence calls for less friction, more reassurance, or a more suitable next step; do not assume simpler is always better.','Make that one decision-path change and verify the whole journey on desktop and mobile.','Compare completion and the questions buyers still ask to see whether the change addressed the original mismatch.'],
 P10:['Review the earlier offer, message, or buying-journey issue before evaluating more traffic.','Choose one foundational improvement and define the evidence needed before considering more acquisition spend.','Apply the agreed offer, message, or journey change while preserving the earlier explanation and decision path for comparison.','Check whether the foundational issue is clearer, then reassess whether a traffic test is ready to be useful.'],
 P11:['Review current channel activity, available customer-value assumptions, and the business outcomes you can evaluate.','Choose one channel question and define a test that fits the available resources.','Run the chosen acquisition test, tracking its intended outcome and documenting any interruptions.','Review signal quality and customer fit before deciding whether to continue, adjust, or stop the test.'],
 P12:['Map the job each active channel performs in the buying journey and the measures currently used to judge it.','Choose role-appropriate outcomes and identify where the current comparison rewards or penalizes the wrong behavior.','Apply the role-based reporting view without changing definitions midway through the comparison.','Make a channel decision using its contribution to the journey, recording what the available attribution cannot establish.'],
 P13:['Record the working comparison, available resources, and the most valuable unanswered test question.','Choose one hypothesis, what will change, what will stay stable, and when there should be enough evidence to review it.','Run the focused test without unnecessary interference, using the defined baseline and a dated change log.','Evaluate the test against the stable comparison; document uncertainty as carefully as any apparent improvement.'],
 P14:['List the business outcomes that matter, their definitions, and where the current numbers come from.','Agree on an authoritative source for each primary KPI and document discrepancies or missing connections.','Build a recurring view that connects available marketing activity to downstream outcomes and records meaningful changes.','Use the consistent reporting view to make one evidence-backed decision; note what the missing data prevents you from concluding.'],
 P15:['Map what happens after someone first expresses interest and identify where useful conversations stop.','Choose one missing or unsuitable follow-up step and define the invitation, timing, and appropriate channel.','Launch the defined follow-up invitation and check its sequence from the customer perspective.','Review delayed responses and downstream outcomes before deciding whether to refine the follow-up.'],
};
const followThrough: Record<string, [string,string,string,string]> = {
  "P02": [
    "Note the offer each interviewee encountered and distinguish recalled opinions from actual buying behavior.",
    "Choose the prospect group and response signals that would make the offer test informative before showing the revised version.",
    "Keep the tested offer consistent across those conversations so differences in response can be compared.",
    "Group objections and buying reasons, then name which offer assumption the evidence supports or challenges."
  ],
  "P03": [
    "Record the source and outcome of each reviewed inquiry where available; flag cases whose customer fit is still unknown.",
    "Write the segment's buying situation and the reason it should receive attention before broader targeting.",
    "Check that the chosen channel reaches that segment in the identified buying situation rather than relying on broad audience labels.",
    "Record whether inquiries match the intended segment and trigger, and identify where your audience description needs refinement."
  ],
  "P04": [
    "Separate unsuitable inquiries by the reason they fail the fit criteria instead of placing them all in one low-quality group.",
    "Decide where the mismatch can be caught or clarified before a sales conversation, without blocking suitable buyers.",
    "Use the same qualification criteria when reviewing inquiries after the change so the comparison remains consistent.",
    "Document whether the original mismatch remains, and distinguish a smaller inquiry count from a genuine change in fit."
  ],
  "P05": [
    "Match recurring customer phrases to the specific outcome or objection they describe and retain the original source.",
    "Draft the main promise with one relevant proof point, checking that neither implies an outcome the evidence cannot support.",
    "Check that the headline, supporting explanation, and proof tell the same story before publishing the revised message.",
    "Record where buyers still misunderstand the payoff and decide which part of the explanation needs another test."
  ],
  "P06": [
    "Include postponing the purchase or doing the work internally among the alternatives where customers mention them.",
    "Check the chosen difference against those alternatives and remove distinctions buyers do not value or that you cannot substantiate.",
    "Carry the same difference through the first promise and the later decision point so buyers do not encounter competing explanations.",
    "Separate reactions to the proposed difference from unrelated objections about price, timing, or customer fit."
  ],
  "P07": [
    "For each proof item, record which claim it supports and any limits on what it can establish.",
    "Choose the decision point where the proof is most relevant and define the buyer question it should answer.",
    "Verify that the evidence is visible beside the claim and that any qualifications remain clear on mobile.",
    "Record unanswered trust questions and decide whether the next need is better placement or stronger evidence."
  ],
  "P08": [
    "Record the path through the main action on desktop and mobile, including any steps that fail or require explanation.",
    "Write what the proposed change should make easier and how you will distinguish that effect from unrelated journey changes.",
    "Run through the revised action, confirmations, and handoffs; keep a record of the previous path for comparison.",
    "Separate technical completion problems from customer hesitation before choosing the next journey change."
  ],
  "P09": [
    "List the money, time, information, and other commitments required before each major decision.",
    "Write down which side of the mismatch the evidence supports and what essential reassurance or steps must stay.",
    "Check that a low-risk action is not unnecessarily complicated and that a substantial ask still has adequate context and proof.",
    "Document whether remaining hesitation comes from the commitment, missing reassurance, or a practical obstacle."
  ],
  "P10": [
    "Record the current customer explanation and decision path, including the evidence still needed to judge the earlier issue.",
    "Define the customer response that would justify testing more traffic after the foundational change.",
    "Check the revised explanation or path against that response question before increasing acquisition activity.",
    "Document whether the earlier issue is ready for a traffic test or needs more customer evidence first."
  ],
  "P11": [
    "Document the customer-value and acquisition-cost assumptions you can support, marking missing information rather than estimating it as fact.",
    "Set a review point and a useful outcome for the chosen channel test based on the resources actually available.",
    "Record changes in spend, audience, or delivery that could affect the interpretation of the test.",
    "Distinguish a lack of suitable opportunities from a test that has not collected enough evidence yet."
  ],
  "P12": [
    "Identify which channels introduce the offer, capture active intent, or bring interested people back, using the available journey evidence.",
    "Write the outcome appropriate to each role and identify which downstream connections the current reporting cannot show.",
    "Check that each channel's reporting uses its agreed role and that missing attribution remains visible.",
    "Record which role-based evidence informed the allocation decision and which attribution questions remain open."
  ],
  "P13": [
    "Describe the comparison you will preserve and record any current conditions that could make the starting evidence unreliable.",
    "Specify the test variable, available budget and traffic, review point, and reasons the comparison might need more time.",
    "Date each intervention or interruption and verify that the control has not been changed alongside the test.",
    "Compare the observed signal with the original hypothesis and note whether the available sample supports a decision or further observation."
  ],
  "P14": [
    "Record each primary KPI's meaning, reporting period, and current source, noting totals that disagree.",
    "Document the reason for each source choice and how known definition or timing differences will be handled.",
    "Trace the available source, lead, qualified-lead, sale, and revenue connections; make broken or missing links visible in the recurring view.",
    "Write the decision supported by the trusted numbers and name any missing connection that still limits confidence."
  ],
  "P15": [
    "Record the invitation, timing, and handoff after the first inquiry, including points where follow-up is absent or unclear.",
    "Define the next useful invitation and the conditions under which each follow-up step is appropriate.",
    "Check the message, timing, links, and ownership of the follow-up before relying on it to continue the conversation.",
    "Separate delayed responses from immediate ones and record where interested people still stop progressing."
  ]
};
const goals: Record<number,[string,string,string,string]> = {
 1:['Find the customer evidence behind the offer.','Choose what the offer needs to communicate or prove.','Put the focused offer decision into practice.','Learn whether buyers understand and want the revised offer.'],
 2:['Understand which customers and buying situations fit best.','Choose a customer-fit decision supported by evidence.','Apply that decision to the relevant marketing touchpoints.','Learn whether the change attracts more suitable opportunities.'],
 3:['Understand what customers need to hear and believe.','Choose one promise and its supporting evidence.','Make the message consistent where customers decide.','Learn whether the message answers the intended buyer question.'],
 4:['Understand the decision path and its starting performance.','Choose the journey change the evidence supports.','Make the focused change without breaking the journey.','Learn whether the change improves the intended decision.'],
 5:['Establish a fair starting point for the traffic decision.','Define a useful comparison before committing resources.','Carry out the traffic work while protecting the comparison.','Turn the observed evidence into the next traffic decision.'],
 6:['Identify which outcomes and numbers deserve attention.','Agree on definitions and trustworthy reporting sources.','Make the agreed reporting view repeatable.','Use the evidence to decide what to keep, change, or test.'],
};
const completion: Record<number,[string,string,string,string]> = {
 1:['Customer observations, objections, and demand evidence are recorded, with assumptions separated from facts.','One offer decision names the intended buyer, customer payoff, and evidence needed to validate it.','The chosen offer work is completed and checked against the decision, with customer-facing changes recorded.','Buyer responses are documented and support a stated decision to keep, refine, or investigate the offer.'],
 2:['A reviewed customer or lead sample records fit, buying situations, and missing information.','A customer-fit decision names the segment or qualification change and the evidence supporting it.','The relevant targeting, message, or qualification change is in place and checked against the chosen criteria.','The review compares customer fit with the earlier sample and states the next audience decision.'],
 3:['Customer language, objections, alternatives, and available proof are collected with their sources.','One promise or reason to choose is selected, with suitable proof and a clearly named buyer question.','The selected message work is checked across its intended touchpoints, with claims supported or qualified.','Customer reactions and available response evidence are reviewed against the original message question.'],
 4:['The decision path, requested commitments, known obstacles, and available starting measurements are documented.','One journey change is defined with the evidence supporting it and the intended completion signal.','The revised path works through the intended action on desktop and mobile, with essential reassurance intact.','Completion and customer feedback are compared with the starting point, including unresolved tracking or sample limits.'],
 5:['Channel roles or the test baseline, available resources, and the unanswered traffic question are documented.','The traffic decision has a hypothesis or role-based comparison, evaluation measures, and a stated review point.','The planned traffic work is running or completed as intended, with its comparison protected and interruptions recorded.','The traffic review states what the comparison supports, what remains uncertain, and whether to continue, adjust, or stop.'],
 6:['Primary business outcomes, current definitions, reporting sources, and known discrepancies are listed.','Each primary KPI has an agreed definition and authoritative source, with missing connections recorded.','The recurring reporting view uses the agreed definitions and sources, and meaningful changes have dated records.','One business decision cites the reporting evidence and explicitly notes what unresolved data gaps prevent you from concluding.'],
};
const defaults: Record<number,string>={1:'P01',2:'P03',3:'P05',4:'P08',5:'P13',6:'P14'};
export function editorialPlan(report: FrozenAuditReport): PlanWeek[] {
 const primary=report.diagnosis.primary;if(!primary)return structuredClone(report.thirtyDayPlan);
 const id=primary.pattern?.id??defaults[primary.sectionId];
 if(id==='P01')return structuredClone(foundationalOfferPlan);
 const p=profiles[id];const next=followThrough[id];const g=goals[primary.sectionId];const done=completion[primary.sectionId];
 return [
  {week:1,title:'Understand / Baseline',objective:g[0],actions:[p[0],next[0]],completionCriteria:done[0]},
  {week:2,title:'Decide / Build',objective:g[1],actions:[p[1],next[1]],completionCriteria:done[1]},
  {week:3,title:'Implement / Strengthen',objective:g[2],actions:[p[2],next[2]],completionCriteria:done[2]},
  {week:4,title:'Measure / Learn',objective:g[3],actions:[p[3],next[3]],completionCriteria:done[3]},
 ];
}
