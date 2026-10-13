import { caseReasoning, caseTitles } from "./editorial-narrative";
import type { FrozenAuditReport } from "./report";
import { sectionBand } from "./scoring";
import { sectionColors } from "./sections";
import { precedenceExplanation } from "./precedence-explanation";
import { recommendationsPresentation } from "./presentation";

// Customer-facing projections only. Frozen diagnoses, instructions and IDs stay intact.
export const reportLanguage = {
  title: "Your High Growth Opportunities",
  branding: "A Clarity Engine Diagnostic",
  snapshot: "What Your 35 Answers Tell Us",
  scorecard: "Your 6 Growth Levers",
  stack: "6 Building Blocks of a High-Converting Brand",
  primary: "Your Biggest Growth Opportunity",
  secondary: "Your Next Opportunity",
  strength: "What's Already Working in Your Favor",
  use: "How to Put These Insights to Work",
  setback: "Here's What's Likely Holding You Back",
  moves: "Your First 3 Moves",
  progress: "Signs You're Moving in the Right Direction",
  introduction: "You've assessed six important parts of your marketing. Your answers give us a picture of what's working, where you may be losing momentum, and which improvements deserve your attention first.",
  movesLead: "Three moves. One clear priority.",
  movesIntro: "You don't need to fix everything at once. Based on your answers, these are the three actions worth putting on your calendar first.",
  pdfWorkIntro: "Use this workbook to record your evidence and next decision. Downloaded or printed copies do not autosave; handwritten notes stay on your paper copy. Only the online Work Session autosaves to your private workspace.",
  workIntro: "Work through the questions below to understand your first opportunity, choose what you will do next, and decide how you will check the result. Your notes save automatically to this private workspace.",
  guide: "Start with your first opportunity and its three practical moves. Use the examples and progress signals to check your thinking, then turn your 30-day plan into action. Your Work Session keeps the evidence and your next decision in one place.",
  methodology: "These scores summarize your assessment responses. They are not conversion rates, revenue forecasts, or independently verified business results. A high overall score can still hide an important opportunity. Recommended priorities follow the diagnosed patterns and foundational rules, not simply the lowest score.",
} as const;
const bands = ["Strong", "Solid / Functional", "Needs Attention", "Priority Area"] as const;
const copy: Record<number, readonly string[]> = {
  1: ["Your offer gives people a reason to buy.", "Your offer has potential. The payoff could be clearer.", "You may be making customers work too hard to see the value.", "Before asking your marketing to work harder, make the value of your offer easier to understand and verify."],
  2: ["You know who your best customers are and why they buy.", "You understand your buyers, but the buying triggers could be sharper.", "You may need a clearer picture of the customers you're best placed to help.", "Get closer to your best-fit customers before spreading your marketing further."],
  3: ["Your message makes the value obvious.", "Your message gets through, but not always.", "Your marketing may not be making the payoff clear enough.", "Make the promise, reason to choose you, and supporting proof easier to grasp."],
  4: ["You make it easy for interested people to take action.", "The path works, but there may still be speed bumps.", "Interested people may be encountering unnecessary friction.", "Examine the decision you're asking people to make before sending more visitors through it."],
  5: ["You've built a traffic engine you can learn from.", "Traffic is moving, but there's more to prove before scaling.", "Your traffic needs a clearer job and a useful way to evaluate it.", "It's too early to confidently push more traffic through the system without clearer evidence."],
  6: ["You know which numbers deserve your trust.", "You have numbers, but the story isn't always clear.", "Your data may be making growth decisions harder than they need to be.", "Establish which numbers you can trust before using them to make bigger growth decisions."],
};
export function growthLeverCopy(id: number, score: number) {
  return copy[id][bands.indexOf(sectionBand(score))];
}
const opportunities: Record<number, { why: string; start: string }> = {
  1: { why: "People shouldn't need a detective kit to understand what they'll get. A clearer, better-supported offer gives the rest of your marketing something worth amplifying.", start: "Make who it's for, what they get, and why it matters easy to explain." },
  2: { why: "When you know who you're helping and what makes them buy, your message and channel choices can work toward the same goal.", start: "Look for the buying situations and customer needs you can genuinely serve best." },
  3: { why: "A good offer can look ordinary if the payoff gets lost in the explanation. Help new prospects see why it matters to them.", start: "Connect the customer's problem to a clear promise, a reason to choose you, and credible proof." },
  4: { why: "Interest is useful only if people can confidently take the next step. The commitment, reassurance, and effort involved need to make sense together.", start: "Walk through the journey from first interest to the action you want people to take." },
  5: { why: "More visits aren't the same as better opportunities. Give each channel a clear job and each test a question worth answering.", start: "Keep a stable comparison and define what a useful traffic test needs to teach you." },
  6: { why: "Numbers should help you choose what to do next, not give you six competing versions of the truth. Reliable definitions and reporting make decisions easier to defend.", start: "Agree on the business outcomes that matter, their definitions, and the sources you can trust." },
};
const patterns: Record<string, string> = {
  P01: "Your answers suggest that who the offer is for, what they get, or how it's packaged needs to become clearer.",
  P02: "A clear promise is a start. Your answers also point to a need for direct evidence that the intended customers want the offer.",
  P03: "Get clearer about the customers you can help best and the situations that make them ready to buy.",
  P04: "Not every lead is equally useful. Your answers point to reviewing customer fit as well as lead volume.",
  P08: "The next step may not be clear or easy enough. Walk through the whole journey, including the proof, reassurance, and effort involved.",
  P10: "More traffic may send more people into an unresolved offer, message, or decision problem. Check those foundations before buying a bigger audience.",
  P11: "Your answers point to reaching more of the right people. Keep the offer and customer journey in view while you test where useful demand can come from.",
  P12: "Your channels may be doing the wrong jobs. Decide what each source should contribute before judging it by the same numbers as every other source.",
  P15: "People who expressed interest may not be getting consistent follow-up. Check where conversations stall before assuming the answer is more leads.",
  P05: "The ingredients of your service may be clearer than the customer payoff. Lead with the improvement people care about.",
  P06: "Prospects may need a clearer reason to choose you over a reasonable alternative.",
  P07: "Your claims may need more credible proof where customers are deciding whether to believe them.",
  P09: "The commitment you're asking for and the support around that decision may not fit together. Your answers don't yet tell us whether to remove friction or add reassurance; examine both first.",
  P13: "Give one useful test enough time and budget to teach you something, with a stable comparison to judge it against.",
  P14: "Connect clear KPI definitions and reliable reporting sources to business outcomes and decisions you can act on.",
};
const nextTitles: Record<number, string> = {
  1: "Make Your Offer Easier to Choose",
  2: "Get Sharper About Your Best Customers",
  3: "Make Your Message Work Harder",
  4: "Make the Next Step Easier",
  5: "Build a Smarter Traffic Engine",
  6: "Turn Your Numbers into Better Decisions",
};
// Relationship copy follows the already-selected pair. It never chooses priorities.
const opportunityConnections: Record<number, Record<number, string>> = {
  1: {
    2: "Once your offer is easier to understand, get clearer about who values it most, what they're trying to accomplish, and what makes them start looking.",
    3: "Once the offer has a clear customer payoff, your message has something specific to lead with and support with proof.",
    4: "A clearer offer gives people a reason to act. Next, check whether the buying journey makes that decision easy to understand and follow through on.",
    5: "A clearer, better-supported offer gives your traffic tests a useful question: which channels bring people who value what you're offering?",
    6: "Once you've clarified the offer, connect your reporting to the customer decisions that show whether people understand and want it.",
  },
  2: {
    1: "A sharper picture of your best customers gives you a better basis for shaping the offer around an outcome they value.",
    3: "Once you understand who buys and what starts their search, use those insights to make your promise, proof, and reasons to choose you more relevant.",
    4: "Knowing your buyers' questions and concerns gives you a better basis for deciding what the buying journey should explain and reassure them about.",
    5: "Once you know who you're trying to reach and when they start looking, choose traffic channels and tests around those buying situations.",
    6: "A clearer definition of a good-fit customer helps you decide which outcomes to track, so lead volume doesn't stand in for customer fit.",
  },
  3: {
    1: "Making the customer payoff clear in your message helps reveal whether the offer itself gives people a compelling, credible reason to buy.",
    2: "Once the message explains the value clearly, compare how different customers respond to learn who values that promise most.",
    4: "A clearer message sets an expectation. Next, make sure the buying journey carries that same promise through to a confident next step.",
    5: "Once your message makes the value easier to grasp, traffic tests can give you a clearer read on where that promise finds interested buyers.",
    6: "A clear promise gives your reporting something specific to examine: whether people move from understanding the value to taking a useful next step.",
  },
  4: {
    1: "Working through the buying journey can reveal what people need to understand about the offer before they're ready to choose it. Use that evidence to sharpen the offer next.",
    2: "Once the next step is easier to understand, look at who follows through and who hesitates to refine your picture of the best-fit buyer.",
    3: "The buying journey shows where people need a clearer promise or more convincing proof. Use those insights to strengthen the message next.",
    5: "Once the buying journey gives interested people a clear next step, traffic tests have a more useful destination and a clearer outcome to evaluate.",
    6: "Clarifying the buying journey helps you define the decisions and outcomes your reporting needs to capture, rather than counting activity alone.",
  },
  5: {
    1: "Giving traffic tests a clear job can show which parts of the offer people respond to. Use that evidence to sharpen the offer rather than guessing from visit counts.",
    2: "Once your channels and tests have a clear purpose, use what you learn about customer fit to refine who you want to reach next.",
    3: "More disciplined traffic tests give you a better basis for comparing messages. Use that evidence to sharpen the promise and proof people encounter.",
    4: "Once you know what each channel should contribute, examine whether the next step fits the intent of the people arriving from it.",
    6: "Giving each channel and test a clear job tells you what your reporting needs to answer. Next, make those definitions and comparisons consistent enough to guide decisions.",
  },
  6: {
    1: "Once you can trust your numbers, use them alongside customer conversations to check which parts of the offer deserve a closer look.",
    2: "Once customer outcomes are measured consistently, you can compare customer fit with more confidence and sharpen who your marketing should serve.",
    3: "Trustworthy definitions and reporting give message tests a clearer standard, so you can compare promises and proof using evidence rather than impressions alone.",
    4: "Once the numbers are dependable, examine where the buying journey loses momentum and use customer evidence to decide what to change.",
    5: "Once you can trust your numbers, you'll be in a much better position to identify which channels deserve more investment and which ones need another look.",
  },
};
export function supportingOpportunity(report: FrozenAuditReport) {
  const { primary, secondary } = report.diagnosis;
  if (!secondary) return undefined;
  const connection = primary && opportunityConnections[primary.sectionId]?.[secondary.sectionId];
  // Selected pattern evidence can be more specific than the section score.
  const evidence = secondary.pattern?.id === "P03"
    ? primary?.sectionId === 1 ? "" : "Your answers point to sharpening customer fit and buying triggers."
    : patterns[secondary.pattern?.id ?? ""] ?? (connection ? "" : opportunities[secondary.sectionId].start);
  const validation = primary?.sectionId === 1 && primary.pattern?.id === "P02"
    ? "First, validate demand with intended customers; clearer wording alone isn't demand evidence. " : "";
  return { title: nextTitles[secondary.sectionId], explanation: `${validation}${connection ?? "Use your first opportunity to establish a clearer starting point before moving to this area."}${evidence ? ` ${evidence}` : ""}` };
}
export function growthRoadmap(report: FrozenAuditReport) {
  const d = report.diagnosis;
  const primary = d.primary?.sectionId;
  const qualified = Object.entries(d.sectionScores)
    .map(([id, score]) => ({ id: Number(id), score }))
    .filter(({ id }) => id !== primary && id !== d.secondary?.sectionId && d.sectionSeverity[id] < 2)
    .sort((a, b) => b.score - a.score || a.id - b.id);
  const strengthId = d.relativeStrength && d.sectionSeverity[d.relativeStrength] < 2 && d.relativeStrength !== primary && d.relativeStrength !== d.secondary?.sectionId
    ? d.relativeStrength : qualified.find(({ score }) => score >= 65)?.id;
  const precedence = precedenceExplanation(report);
  const supporting = supportingOpportunity(report);
  return {
    primaryId: primary,
    primaryName: primary ? sectionColors[primary].name : "Check the evidence before choosing a priority",
    nextId: d.secondary?.sectionId,
    nextName: d.secondary ? sectionColors[d.secondary.sectionId].name : undefined,
    nextTitle: supporting?.title,
    strengthId,
    strengthName: strengthId ? sectionColors[strengthId as keyof typeof sectionColors].name : undefined,
    strength: strengthId ? `${d.sectionScores[strengthId] < 65 ? "This is a relative strength in your answers, with more work to do. " : ""}${growthLeverCopy(strengthId, d.sectionScores[strengthId])}` : "Your answers don't establish a clear strength to lead with yet. Use your customer evidence to find the most dependable starting point.",
    why: primary ? opportunities[primary].why : "Your answers don't establish a clear first opportunity. Use the Work Session to check the evidence before committing to a fix.",
    explanation: primary ? `${patterns[d.primary?.pattern?.id ?? ""] ?? opportunities[primary].start}${!d.secondary ? " One clear priority: give this your attention first, without adding a second improvement project." : ""}` : "Your scores are a starting point for a decision, not proof that a particular change is needed.",
    startTitle: recommendationsPresentation(report)[0]?.title,
    start: recommendationsPresentation(report)[0]?.whatToDo ?? "Use the Work Session to choose one decision worth testing.",
    next: supporting?.explanation,
    precedence,
  };
}
export function customerSummary(report: FrozenAuditReport) {
  const road = growthRoadmap(report);
  return report.diagnosis.primary ? `${road.explanation} ${road.why}` : road.why;
}
export function customerConfidence(report: FrozenAuditReport) {
  return !report.diagnosis.primary
    ? "Your answers don't point clearly to one first opportunity. Check the evidence in your Work Session before choosing a change. Confidence reflects how consistently your answers fit together, not independently verified performance."
    : report.diagnosis.confidence.level === "high"
      ? `Your answers consistently point toward ${growthRoadmap(report).primaryName} as the place to start. Check this direction against customer evidence as you put it to work.`
      : `Your answers lean toward ${growthRoadmap(report).primaryName}, but some signals need checking. Use the context below to test the direction before making a bigger commitment.`;
}
export function customerCaseStory(report: FrozenAuditReport) {
  const card = report.caseCard;
  if (!card) return undefined;
  const names: Record<number, string> = {
    1: "Making a bundled service easier to understand",
    2: "Finding the customers a business can serve best",
    3: "Helping buyers see a reason to choose",
    4: "Making the next customer decision easier",
    5: "Turning traffic tests into useful learning",
    6: "Making the numbers useful for real decisions",
  };
  const offer = card.id === "CASE_BUSINESS_SYSTEMS_POSITIONING";
  return {
    title: caseTitles[card.id] ?? names[report.diagnosis.primary?.sectionId ?? 1],
    stages: [
      ["What kind of business is this?", card.industry],
      [offer ? "How the service is delivered" : "The business setup", offer ? "It sells bundles of branding, websites, CRM, booking tools, and automation to service businesses." : card.businessModel],
      ["What was happening?", offer ? "Buyers could see a website-development service without seeing how the wider system could help them capture leads, book customers, and follow up. The original presentation is not available here for comparison." : `${card.situation} ${card.diagnosis}`],
      [offer ? "What were customers actually looking for?" : "What was the business trying to improve?", offer ? "A professional business presence, more leads, easier booking, and a way to follow up. The website was one ingredient, not the whole reason to buy." : card.goal],
      ["What strategic change was recommended?", offer ? "Lead with what the customer gets and what improves for them. Use the website, CRM, booking tools, and automation to explain how that outcome is delivered." : card.intervention],
      ["Why is the improved approach stronger?", caseReasoning[card.id] ?? "The proposed change addresses the problem described in this example. Check whether the same reasoning applies to the evidence in your business."],
    ],
    lesson: offer ? "Sell the useful outcome, then explain the ingredients. Your customers shouldn't have to assemble the value themselves." : card.lesson,
  };
}
export const growthDefinitions: Record<number, string[]> = {
  1: ["Your offer is the answer to three buyer questions: Is this for me? What do I get? Why is it worth choosing?", "The promise, price, and package need to make sense together—and real customer behavior should support the demand."],
  2: ["Your audience is the group you can help best, in the situations that make them look for help.", "Knowing what triggers a purchase helps you choose a message, a channel, and a useful way to judge customer fit."],
  3: ["Your message turns what you do into a payoff people can understand and believe.", "Lead with the customer outcome, explain why you're a good choice, and put credible proof where people are deciding."],
  4: ["Your conversion experience is the path from interest to a meaningful next step.", "Look at what you ask people to do, how much effort it takes, and whether the proof and reassurance match that decision."],
  5: ["Traffic brings people into that journey. The useful question is which people, for what purpose, and what you can learn from their response.", "Give each channel a clear job and each test a fair comparison before making a bigger spending decision."],
  6: ["Measurement turns activity into evidence you can use. Start with consistent definitions and sources you can trust.", "Connect the numbers to leads, sales, or other business outcomes, then use them to decide what to keep, change, or test next."],
};
