import type { FrozenAuditReport } from "./report";
import { sectionBand } from "./scoring";
import { sectionColors } from "./sections";

// Authored orientation templates only. No scoring, flags or selection occurs here.
const templates: Record<
  number,
  { title: string; profile: string; matters: string; opportunity: string }
> = {
  1: {
    title:
      "Clarify the foundation before asking the rest of your marketing to work harder.",
    profile:
      "Your Offer responses point to a foundational clarity gap. Buyers may need a clearer picture of who the offer is for, what they get, and why it is worth choosing.",
    matters:
      "Downstream marketing can bring attention and help people take action, but it cannot reliably compensate for an offer whose value is difficult to understand.",
    opportunity:
      "Make the customer, outcome, and value of your offer easier to understand before expanding execution.",
  },
  2: {
    title: "Give your marketing a clearer customer to serve.",
    profile:
      "Audience is the strongest indicated constraint. A sharper view of customer fit, buying situations, and desired outcomes can give the rest of your system clearer direction.",
    matters:
      "When the customer is unclear, messaging, channel choices, and lead quality can pull in different directions.",
    opportunity:
      "Focus your marketing around the customers and buying situations it is best equipped to serve.",
  },
  3: {
    title:
      "Make the value of your business easier for new prospects to recognize.",
    profile:
      "Message is the largest indicated gap: the value you provide may not be reaching new prospects as clearly or persuasively as it could.",
    matters:
      "Weak messaging can make a good offer look average. It can reduce response before someone gets far enough to experience the stronger parts of your business.",
    opportunity:
      "Make the value customers care about easier to understand, believe, and act on.",
  },
  4: {
    title: "Make the next decision easier to understand and take.",
    profile:
      "Conversion Experience is the strongest indicated constraint. The journey from interest to action deserves attention before you send more people through it.",
    matters:
      "A confusing next step, missing reassurance, or unnecessary friction can interrupt demand that already exists.",
    opportunity:
      "Align the next action, proof, and required commitment around a clearer customer decision.",
  },
  5: {
    title: "Give traffic a clearer role in your marketing system.",
    profile:
      "Traffic is the strongest indicated constraint. Your responses point to a need for more purposeful acquisition, channel roles, or useful testing.",
    matters:
      "More visits alone do not establish qualified demand or profitable acquisition. Each source needs a role and a result you can evaluate.",
    opportunity:
      "Clarify where demand should come from and what a useful acquisition test needs to establish.",
  },
  6: {
    title: "Build a clearer basis for deciding what to change.",
    profile:
      "Measurement & Learning is the strongest indicated constraint. Your business needs a more dependable connection between marketing activity, outcomes, and decisions.",
    matters:
      "When definitions, sources, or downstream visibility are uncertain, major changes can be driven by an incomplete picture.",
    opportunity:
      "Connect trustworthy measures to a business decision and a consistent learning process.",
  },
};
const patternCopy: Record<string, Partial<(typeof templates)[number]>> = {
  P01: {
    profile:
      "Your Offer results suggest that the customer, outcome, or packaging of the offer needs clarification. The opportunity is to make the value understandable before asking the downstream system to amplify it.",
  },
  P02: {
    profile:
      "Your selected Offer pattern points to a validation gap. Clarifying the promise matters, but you also need evidence that the intended customer wants what you are offering.",
    opportunity:
      "Gather direct customer evidence and test demand before treating the offer as ready to scale.",
  },
  P05: {
    profile:
      "The selected Message pattern points to a value-translation gap: what you provide may be easier to see than the customer outcome it creates.",
  },
  P06: {
    profile:
      "The selected Message pattern points to a positioning gap. Prospects may need a clearer reason to choose you over another reasonable alternative.",
    opportunity:
      "Make the distinctive customer value and supporting proof easier to recognize.",
  },
  P07: {
    profile:
      "The selected Message pattern points to a proof gap. Important claims need credible support at the point where a potential customer evaluates them.",
    opportunity:
      "Connect your strongest claims to relevant, credible evidence.",
  },
  P09: {
    profile:
      "The commitment requested from the visitor and the surrounding decision experience appear out of alignment. The collected evidence does not establish which direction the mismatch takes.",
    opportunity:
      "Map the commitment, proof, context, and friction before deciding whether to remove friction or add reassurance.",
  },
};
export const scoreBandGuide = [
  { range: "80-100", label: sectionBand(80) },
  { range: "65 to below 80", label: sectionBand(65) },
  { range: "45 to below 65", label: sectionBand(45) },
  { range: "<45", label: sectionBand(0) },
];
export const howToReadResults =
  "Start with the primary constraint. Your strongest areas show what you can build on. Other lower-scoring areas may matter, but they should not all compete for your attention at once.";
export function marketingSnapshot(report: FrozenAuditReport) {
  const d = report.diagnosis,
    primary = d.primary?.sectionId;
  const name = (id: number) =>
    sectionColors[id as keyof typeof sectionColors].name;
  const strong = Object.entries(d.sectionScores)
    .filter(
      ([id, score]) =>
        sectionBand(score) === "Strong" && d.sectionSeverity[Number(id)] < 2,
    )
    .map(([id]) => Number(id));
  const functional = Object.entries(d.sectionScores)
    .filter(
      ([id, score]) =>
        ["Strong", "Solid / Functional"].includes(sectionBand(score)) &&
        d.sectionSeverity[Number(id)] < 2,
    )
    .map(([id]) => Number(id));
  const base = primary
    ? { ...templates[primary], ...patternCopy[d.primary?.pattern?.id ?? ""] }
    : {
        title: "Use the profile to make one deliberate next decision.",
        profile:
          "Your answers do not establish a clear primary constraint. Use the Work Session to examine the evidence before choosing a priority fix.",
        matters:
          "A score is a guide to focus, not independent proof of business performance.",
        opportunity:
          "Verify the profile against customer evidence and choose a decision worth testing.",
      };
  const strongMessageProfile =
    primary === 3 &&
    strong.includes(1) &&
    strong.includes(2) &&
    functional.includes(4);
  const workingStrong = strong.filter(
    (id) => id !== primary && id !== d.secondary?.sectionId,
  );
  const buildOn = strong
    .filter((id) => id !== primary && id !== d.secondary?.sectionId)
    .slice(0, 2);
  const protect = functional.filter(
    (id) =>
      id !== primary && id !== d.secondary?.sectionId && !buildOn.includes(id),
  );
  return {
    ...base,
    title: strongMessageProfile
      ? "Your marketing system is stronger than your Message score makes it feel."
      : base.title,
    working: strongMessageProfile
      ? "Your responses indicate a strong Offer and Audience, with a Conversion Experience capable of supporting the next step. Those are assets to build on while you improve how the value reaches new prospects."
      : workingStrong.length
        ? `Your self-reported strengths include ${workingStrong.map(name).join(", ")}. ${primary === 1 && functional.some((id) => id > 1) ? "Parts of the downstream system appear functional; clarify the offer before asking them to carry more demand." : "Use those areas to support the focused decision ahead."}`
        : strong.length
          ? "Some scores are strong, but the selected pattern and severity still indicate a priority constraint. Start with that evidence."
          : "Your results do not identify an unqualified strength to lead with. Focus on the selected constraint rather than attempting a complete rebuild.",
    buildOn: buildOn.length
      ? buildOn.map(name).join(" and ")
      : d.relativeStrength
        ? name(d.relativeStrength)
        : "Evidence from your strongest available customer outcomes",
    focus: primary
      ? name(primary)
      : "Verify the profile before selecting a fix",
    protect: protect.length
      ? protect.map(name).join(", ")
      : "The parts of the customer experience already supported by evidence",
    avoid:
      report.deprioritized.map((item) => item.action).join(", ") ||
      "Treating every score as a simultaneous priority",
    secondary: d.secondary
      ? `${name(d.secondary.sectionId)} is the supporting constraint. Address it after the primary issue is clearer or materially improved.`
      : undefined,
    relativeStrength: d.relativeStrength
      ? `${name(d.relativeStrength)} is your indicated relative strength.`
      : undefined,
  };
}
