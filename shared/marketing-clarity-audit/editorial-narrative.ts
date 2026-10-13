import type { FrozenAuditReport } from './report';
import { sectionColors } from './sections';
const depth: Record<string,string> = {
 P01:"A buyer has to understand the customer, the outcome, and the package together. If those pieces pull in different directions, marketing can attract interest without helping anyone make a confident choice. Check where your explanation leaves the buyer to fill in the blanks.",
 P02:"A well-worded promise is still an assumption until customers respond to it. The useful evidence is why intended buyers choose, hesitate, or decline—not whether the team likes the pitch. Look for demand signals that can support an offer decision before a larger acquisition investment.",
 P03:"A broad audience description can hide several different buying situations. Compare the customers who fit well with the events and motivations that brought them to you; that gives targeting and messaging a more useful foundation than a demographic label alone.",
 P04:"An inquiry can look successful in a campaign report and still be unsuitable for the business. Define what makes an opportunity useful before judging its source, so you can distinguish a qualification issue from weak demand or weak marketing.",
 P05:"Customers may understand what you provide without seeing why the result matters to them. Examine the gap between your service description and the outcome buyers mention in their own words, then connect the promise to evidence they can assess.",
 P06:"Your competitors aren't the only alternatives. Customers can postpone the decision, do the work themselves, or choose a different approach. A persuasive difference needs to matter in that real comparison and be supported by something more specific than a claim to be better.",
 P07:"A claim can create interest and doubt at the same time. Review the questions each major claim raises, then check whether the proof nearby answers those questions accurately. Stronger presentation cannot compensate for evidence you don't yet have.",
 P08:"Friction isn't limited to extra fields. An unclear invitation, missing context, or a broken handoff can interrupt the decision too. Walk the full path and compare what the customer expects with what the next screen asks them to do.",
 P09:"The right journey depends on the size of the decision. Removing steps may help a low-risk action, while a substantial commitment may need more context and reassurance. Your answers identify a mismatch to investigate, not proof that making everything shorter is the answer.",
 P10:"Acquisition amplifies the experience it sends people into. If the offer, promise, or next decision is unresolved, more visits can make the problem more expensive without making its cause clearer. Use the selected foundational work to establish what is ready to be tested.",
 P11:"Channel activity only becomes useful when its job and business economics are understood. Review which opportunities you want a test to create and what the available resources can reasonably reveal; clicks alone don't settle that decision.",
 P12:"A discovery channel and a channel capturing active intent aren't doing the same work. Immediate conversion totals can conceal that distinction. Evaluate each role within the customer journey before treating a last-touch comparison as a complete allocation answer.",
 P13:"When several variables change together, even a promising result can be hard to interpret. A stable comparison and a test with a clear question let you distinguish the new idea from ordinary variation, interruptions, or changes elsewhere in the system.",
 P14:"A metric is useful only when people agree on what it counts, where it comes from, and what decision it informs. Discrepancies can reflect different definitions or missing connections rather than a real business change. Resolve those differences before drawing a confident spending conclusion.",
 P15:"Initial interest and eventual purchase may happen at different times. Review the handoffs after an inquiry and the next useful invitation, rather than assuming an unanswered first interaction means the person was never interested.",
};
const defaults:Record<number,string>={1:'P01',2:'P03',3:'P05',4:'P08',5:'P13',6:'P14'};
export function opportunityDepth(report:FrozenAuditReport){const p=report.diagnosis.primary;return p?depth[p.pattern?.id??defaults[p.sectionId]]:'Use the Work Session to separate established evidence from assumptions before choosing an improvement.';}
export function supportingDepth(report:FrozenAuditReport){const s=report.diagnosis.secondary;if(!s)return undefined;return `${depth[s.pattern?.id??defaults[s.sectionId]]} Keep this as the next review after the first priority has produced evidence you can evaluate.`;}
export function closingTransition(report:FrozenAuditReport){const next=report.diagnosis.secondary;return next
 ? `Finish your review by writing the first decision in your Work Session. Use the three moves as your checklist and the weekly cards to pace the work. At the end of the review period, check what the evidence supports before moving to ${sectionColors[next.sectionId].name}; if the first question is still unresolved, name the evidence you need next.`
 : 'Write your first decision in the Work Session, use the three moves as your checklist, and put the weekly cards where you will see them. Review the evidence at the end of the period before choosing another change. You have one clear priority; the next project can wait for what you learn.';
}
export const caseReasoning: Record<string,string> = {
 CASE_YOUTH_SPORTS_FREE_TRIAL:'An existing introductory offer gives the journey a concrete invitation. Aligning the ad, local page, and next action reduces the number of decisions a family has to interpret before trying a program.',
 CASE_PRO_ENGLISH_OUTCOME:'An outcome-led promise connects the teaching method to the professional situation that makes learning worthwhile. That gives potential buyers a more relevant way to judge the coaching than instruction quality alone.',
 CASE_BUSINESS_SYSTEMS_POSITIONING:'One integrated outcome gives the tools a shared purpose. Buyers can evaluate the complete proposition first, then use the individual components to understand how it would be delivered.',
 CASE_EDU_LANDING_ALIGNMENT:'Matching the page promise and action to the search intent makes the handoff more coherent. It also helps distinguish a page or decision problem from a problem with the source of traffic.',
 CASE_TRACKING_URL_BREAK:'Testing the actual journey identifies the broken measurement dependency directly. Restoring the trigger makes the event observable again; it does not, by itself, establish a change in customer demand or campaign effectiveness.',
 CASE_TRAVEL_CLOSED_LOOP:'Connecting available downstream outcomes to acquisition data adds customer value to the comparison. It also makes attribution gaps visible instead of treating one reporting touchpoint as the entire buying journey.',
 CASE_RETREAT_KPI_BREADTH:'Separating business outcomes from supporting signals gives each measure a defined job. A broader view can explain cross-program or delayed activity without treating every conversion type as equally valuable.',
 CASE_ECOM_SYSTEM_CAUSE:'Reviewing several plausible causes protects against a premature channel diagnosis. The aim is to find evidence that distinguishes an acquisition issue from changes in the offer, experience, or commercial context.',
 CASE_UNDERPOWERED_TESTING:'A focused hypothesis gives the available budget one question to answer. Keeping the working baseline stable preserves a useful comparison and reduces the risk that simultaneous changes make the result uninterpretable.',
 CASE_CHANNEL_ROLES:'Role-based evaluation accounts for the different jobs channels perform before a purchase. Looking at the combined journey makes the comparison more useful while keeping the limits of attribution explicit.',
};
export const caseTitles:Record<string,string>={
 CASE_YOUTH_SPORTS_FREE_TRIAL:'Making a free trial easier to find and try',
 CASE_PRO_ENGLISH_OUTCOME:'Showing what better English makes possible',
 CASE_BUSINESS_SYSTEMS_POSITIONING:'Making a bundled service easier to understand',
 CASE_EDU_LANDING_ALIGNMENT:'Matching the page to the reason people clicked',
 CASE_TRACKING_URL_BREAK:'Fixing tracking before judging the campaign',
 CASE_TRAVEL_CLOSED_LOOP:'Following a lead through to business value',
 CASE_RETREAT_KPI_BREADTH:'Looking beyond one conversion column',
 CASE_ECOM_SYSTEM_CAUSE:'Checking the whole buying system before blaming ads',
 CASE_UNDERPOWERED_TESTING:'Giving one useful test a fair comparison',
 CASE_CHANNEL_ROLES:'Judging channels by the jobs they do',
};

const workAreas:Record<number,string>={1:'the offer assumption and customer evidence you would need to check',2:'customer fit, buying situations, and the evidence behind your audience choice',3:'the buyer question, the promise you could test, and the proof available to support it',4:'the decision being requested and the effort or reassurance that needs checking',5:'the job of each channel and the question a traffic comparison should answer',6:'the definitions, reporting sources, and missing connections you need to resolve'};
export function workOpportunityTransition(report:FrozenAuditReport){const s=report.diagnosis.secondary;return s?`Use these prompts to record ${workAreas[s.sectionId]}. Treat this as preparation for the next review, not a reason to interrupt the first priority.`:undefined;}
