import { answerMeaning } from "./answer-meaning";
import type { Answers } from "./questionnaire";
export function plainText(text: string) {
  return text
    .replaceAll("bounded", "small, clearly defined")
    .replaceAll("hypothesis", "testable idea")
    .replaceAll(
      "promise continuity through the journey",
      "a consistent offer from the first message to the next step",
    )
    .replaceAll(
      "whether the promise and destination match",
      "whether the first message and next page match",
    )
    .replaceAll(
      "promise with the destination",
      "first message with the next page",
    )
    .replaceAll("end-to-end journey", "complete customer path")
    .replaceAll("bounded prototype", "small prototype")
    .replaceAll("bounded change", "small, clearly defined change")
    .replaceAll("bounded response", "specific, limited response")
    .replaceAll("bounded validation exercise", "small validation exercise")
    .replaceAll(
      "commitment relationship",
      "fit between the requested action and customer needs",
    )
    .replaceAll("qualified outcome", "useful customer action");
}
const coreTitles: Record<string, [string, string, string]> = {
  O1: [
    "Check how people describe your offer",
    "Choose one clear offer explanation",
    "Check the revised explanation",
  ],
  O2: [
    "Check the result customers expect",
    "Connect the offer to that result",
    "Check the clearer offer wording",
  ],
  O3: [
    "Review who the offer fits",
    "Define who the offer is for",
    "Check the fit with real inquiries",
  ],
  O4: [
    "Review why people question the value",
    "Choose a response supported by those conversations",
    "Check the response before changing price",
  ],
  O5: [
    "Check the evidence of demand",
    "Decide what more you need to learn",
    "Complete the useful customer research",
  ],
  O6: [
    "Check whether the experience is ready for more demand",
    "Choose only the preparation the check supports",
    "Complete the preparation or record no change",
  ],
  A1: [
    "Review what your best-fit customers share",
    "Choose useful customer-fit criteria",
    "Check the criteria against real customers",
  ],
  A2: [
    "Find what makes customers start looking",
    "Choose the buying situation to address",
    "Check that situation with customers",
  ],
  A3: [
    "Review which inquiries become useful customers",
    "Choose practical lead-fit criteria",
    "Check how those criteria guide follow-up",
  ],
  A4: [
    "Ask what customers are trying to achieve",
    "Choose the customer goal the evidence supports",
    "Check that goal against the offer",
  ],
  A5: [
    "Review where suitable customers can be reached",
    "Choose a route supported by customer evidence",
    "Check the route before expanding it",
  ],
  M1: [
    "Compare how your business is explained",
    "Choose one accurate explanation",
    "Align the explanations that differ",
  ],
  M2: [
    "Compare features with customer benefits",
    "Choose a useful benefit to explain",
    "Check the clearer wording",
  ],
  M3: [
    "Collect the words customers actually use",
    "Compare those words with your current copy",
    "Keep what fits or check a specific revision",
  ],
  M4: [
    "Review why customers choose you",
    "Choose a difference customers value",
    "Check that difference in your message",
  ],
  M5: [
    "Review what matters to customers personally",
    "Choose a relevant and respectful message",
    "Check the message with customer evidence",
  ],
  M6: [
    "Review the evidence behind your claims",
    "Choose which claims need better support",
    "Add only the support the review shows is missing",
  ],
  C1: [
    "Check whether the next step is clear",
    "Decide whether a change is needed",
    "Keep a clear action or check the improvement",
  ],
  C2: [
    "Check when visitors understand the value",
    "Choose what needs to appear earlier",
    "Check the ordering or record no change",
  ],
  C3: [
    "Find where the message and next page differ",
    "Choose the specific difference to fix",
    "Check that the offer stays consistent",
  ],
  C4: [
    "Review the steps customers must complete",
    "Choose only an unnecessary step to change",
    "Check the simpler path or record no change",
  ],
  C5: [
    "Find where customers need reassurance",
    "Choose useful proof you already have",
    "Place that proof beside the decision",
  ],
  C6: [
    "Check whether the request fits the customer’s decision",
    "Identify what makes the request too hard or unclear",
    "Check the specific adjustment needed",
  ],
  T1: [
    "Review the job of each current channel",
    "Choose how each channel will be judged",
    "Use those roles in the next channel review",
  ],
  T2: [
    "Review what happens after people arrive",
    "Choose a useful view of the customer path",
    "Check the counts and remaining gaps",
  ],
  T3: [
    "Review what changed when results changed",
    "Choose the explanation the evidence supports",
    "Check one useful response",
  ],
  T4: [
    "Review how channels work together",
    "Choose a useful comparison across channels",
    "Use the comparison in the next decision",
  ],
  ML1: [
    "Review the business results you need to measure",
    "Choose clearly defined measures",
    "Check that the measures guide a decision",
  ],
  ML2: [
    "Separate business results from supporting clues",
    "Choose which clues explain the result",
    "Use that distinction in a real review",
  ],
  ML4: [
    "Trace the numbers back to their sources",
    "Decide whether any data needs repair",
    "Check the numbers or repair only the confirmed gap",
  ],
  ML5: [
    "Review what happens after the first inquiry",
    "Choose a missing customer-quality feedback link",
    "Check that the feedback is useful",
  ],
  ML6: [
    "Review how a recent decision was made",
    "Choose a repeatable way to investigate changes",
    "Use it in the next review",
  ],
};
export function plainCoreTitles(id: string, answers: Answers) {
  if (id === "C3" && answers.C3 === "E")
    return [
      "Check whether the first message and next page match",
      "Decide whether anything needs to change",
      "Keep a match or check only the change needed",
    ];
  const titles = coreTitles[id];
  if (titles && answerMeaning(id, answers[id]) === "missing_verification")
    return [
      titles[0].replace(/^Find /, "Check "),
      "Decide whether anything needs to change",
      "Keep what works or check only the change the evidence supports",
    ];
  return titles;
}
