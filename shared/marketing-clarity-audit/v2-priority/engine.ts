import { resolve as legacyRecipePool } from "../v2-goals/engine";
import { readinessMeaning } from "./answer-meaning";
import {
  goalEvidence,
  goalChecks,
  goalMeasures,
  selectedGoalLabels,
  goalLabels,
  goalMetrics,
} from "./goals";
import { readinessOpportunity } from "./readiness";
import { plainText, plainCoreTitles } from "./plain-language";
import { z } from "zod";
import {
  recipes,
  coreGoal,
  focusedCoreId,
  coreObservation,
  coreActionRecipe,
  strongValidation,
} from "./answer-guidance";
import { answerMeaning } from "./answer-meaning";
import {
  assessmentQuestions,
  questionCounts,
  sections,
  setupSchema,
  versions,
  type Answers,
  type Choice,
  type Setup,
  nonUseReasons,
  nonUseSignalScore,
} from "./questionnaire";

export const draftSchema = z
  .object({
    versions: z
      .object({
        questionnaire: z.literal(versions.questionnaire),
        scoring: z.literal(versions.scoring),
        report: z.literal(versions.report),
      })
      .strict(),
    setup: setupSchema,
    answers: z.record(z.enum(["A", "B", "C", "D", "E", "F"])),
  })
  .strict();
export type Draft = z.infer<typeof draftSchema>;
export function validateAnswers(
  setup: Setup,
  input: unknown,
  complete = false,
): Answers {
  if (complete) setupSchema.parse(setup);
  const answers = z.record(z.enum(["A", "B", "C", "D", "E", "F"])).parse(input);
  const questions = assessmentQuestions(setup);
  if (
    Object.entries(answers).some(
      ([id, value]) =>
        !questions.some(
          (q) => q.id === id && q.options.some((o) => o.value === value),
        ),
    )
  )
    throw new Error(
      "Invalid question or response for this questionnaire version",
    );
  if (complete && questions.some((q) => !answers[q.id]))
    throw new Error(
      "Answer every question before completing the questionnaire",
    );
  if (setup.paidStatus === "running" && Object.values(answers).includes("F"))
    throw new Error(
      "Non-advertising responses conflict with your current advertising status",
    );
  return answers;
}
export function progress(setup: Setup, input: unknown) {
  const answers = validateAnswers(setup, input);
  const questions = assessmentQuestions(setup);
  const answered = Object.keys(answers).length;
  return {
    ...questionCounts(setup),
    answered,
    percent: Math.round((answered / questions.length) * 100),
    nextQuestionId: questions.find((q) => !answers[q.id])?.id,
    sections: sections.map((s) => ({
      id: s.id,
      answered: questions.filter((q) => q.sectionId === s.id && answers[q.id])
        .length,
      total: questions.filter((q) => q.sectionId === s.id).length,
    })),
  };
}
export function score(setup: Setup, input: unknown) {
  const answers = validateAnswers(setup, input, true);
  const questions = assessmentQuestions(setup);
  const nonUse = setup.paidStatus !== "running",
    paidIds = ["T5", "T6", "T7", "T8", "T9", "T10"];
  const sectionScores = Object.fromEntries(
    sections.map((section) => {
      const selected = questions.filter((q) => q.sectionId === section.id);
      const capability =
        nonUse && section.id === 5
          ? selected.filter((q) => !paidIds.includes(q.id))
          : selected;
      let weight = capability.reduce((n, q) => n + q.weight, 0),
        sum = capability.reduce(
          (n, q) =>
            n +
            q.weight * q.options.find((o) => o.value === answers[q.id])!.score,
          0,
        );
      if (nonUse && section.id === 5) {
        const preparation =
          paidIds.reduce(
            (n, id) =>
              n +
              questions
                .find((q) => q.id === id)!
                .options.find((o) => o.value === answers[id])!.score,
            0,
          ) / paidIds.length;
        sum += preparation + nonUseSignalScore(setup);
        weight += 2;
      }
      return [section.id, (sum / (weight * 5)) * 100];
    }),
  );
  return {
    sectionScores,
    nonUseScoring: {
      questionIds: [] as string[],
      combinedWeight: nonUse ? 1 : 0,
      readinessCombinedWeight: nonUse ? 1 : 0,
      reason: setup.nonUseReason,
      score: nonUse ? nonUseSignalScore(setup) : undefined,
    },
    overallScore:
      Object.values(sectionScores).reduce((n, v) => n + v, 0) / sections.length,
  };
}

export interface Opportunity {
  id: string;
  sectionId: number;
  questionIds: string[];
  kind:
    | "demonstrated weakness"
    | "uncertainty"
    | "ownership or capacity gap"
    | "improvement opportunity";
  title: string;
  rationale: string;
  priority: number;
  actions: Move[];
  evidenceMeanings?: { questionId: string; answer: string; meaning: string }[];
}
export interface Move {
  id: string;
  title: string;
  whatToDo: string;
  why: string;
  doneWhen: string;
  selectionReason?: string;
  evidenceIds?: string[];
  preserveQuestionIds?: string[];
  supportingDetails?: string[];
}
const move = (
  id: string,
  title: string,
  whatToDo: string,
  why: string,
  doneWhen: string,
): Move => ({ id, title, whatToDo, why, doneWhen });
function coreMoves(
  _sectionId: number,
  _rationale: string,
  ids: string[],
  answers: Answers,
): Move[] {
  const focus = focusedCoreId(ids, answers);
  const recipe = coreActionRecipe(focus, answers);
  const preserveIds = Object.keys(answers).filter(
    (id) => ["A", "B"].includes(answers[id]) && id !== focus,
  );
  const stages = [
    {
      title:
        focus === "C3" && answers.C3 === "E"
          ? "Compare the promise with the destination"
          : focus === "ML3"
            ? ["B", "C"].includes(answers.ML3)
              ? "Review the existing report and its updates"
              : "Gather the inputs for a lightweight report"
            : `Review ${recipe.topic}`,
      what: recipe.evidence,
      done: `A baseline for ${recipe.topic} separates observed evidence, assumptions and unanswered questions.`,
      why: `${recipe.impact} Start with a small review so the next decision rests on what is actually happening.`,
    },
    {
      title:
        focus === "C3" && answers.C3 === "E"
          ? "Determine whether any mismatch needs a response"
          : focus === "ML3"
            ? ["B", "C"].includes(answers.ML3)
              ? "Agree consistent reporting and update responsibilities"
              : "Choose a simple report format and update responsibilities"
            : focus === "C6"
              ? "Determine which side of the commitment relationship needs attention"
              : focus === "C5" && preserveIds.includes("M6")
                ? "Choose existing proof for the decision"
                : `Choose the next step for ${recipe.topic}`,
      what: recipe.decision,
      done:
        focus === "ML3"
          ? "The agreed report structure names the measures, their definitions, reporting periods and sources, an update owner, and the update and review dates."
          : `One evidence-supported decision about ${recipe.topic} names the intended scope, owner and review criterion; no-change remains an option.`,
      why:
        focus === "ML3"
          ? "Consistent definitions and periods let you compare like with like. Keeping trusted sources and assigning updates makes the report practical to maintain."
          : `Using what you observed to choose the next step keeps the work focused on ${recipe.topic} while preserving the parts already working.`,
    },
    {
      title:
        focus === "C3" && answers.C3 === "E"
          ? "Keep a confirmed match or make the supported adjustment"
          : focus === "ML3"
            ? ["B", "C"].includes(answers.ML3)
              ? "Improve and refresh the existing report"
              : "Create and populate the lightweight report"
            : `Apply the agreed response for ${recipe.topic}`,
      what: recipe.implement,
      done: recipe.done,
      why: `The agreed response should follow the findings about ${recipe.topic}. ${recipe.impact}`,
    },
  ];
  const titles = plainCoreTitles(focus, answers);
  if (titles)
    stages.forEach((stage, index) => {
      stage.title = titles[index];
    });
  return stages.map((stage, i) => ({
    ...move(
      `${focus}_${["EVIDENCE", "DECISION", "IMPLEMENT"][i]}`,
      stage.title,
      stage.what,
      stage.why,
      stage.done,
    ),
    selectionReason: `Selected for ${focus}=${answers[focus]} (${answerMeaning(focus, answers[focus])}). ${stage.why}`,
    evidenceIds: [focus],
    preserveQuestionIds: preserveIds,
  }));
}
function paidMoves(
  id: string,
  rationale: string,
  setup: Setup,
  answers: Answers,
): Move[] {
  const bank: Record<string, [string, string, string][]> = {
    ownership: [
      [
        "Agree who owns the next test",
        "Name one accountable owner, agree the decisions they can make, and protect time each week. Support the current specialist or founder; consider outside help only if capacity remains missing.",
        "An owner, weekly time allocation, and decision rights are written down.",
      ],
      [
        "Choose one test your resources can support",
        "Prioritize one learning question, allocate an affordable budget and appropriate duration, and check useful conversion volume. Preserve successful campaigns while testing.",
        "A test brief names the hypothesis, budget limit, evidence needed, duration, and protected baseline.",
      ],
      [
        "Review the result and record the next decision",
        "Schedule a review with the owner, record what happened and what remains uncertain, and decide the next step.",
        "A recurring review and a decision log are in place.",
      ],
    ],
    economics: [
      [
        "Calculate your affordable acquisition range",
        "Gather the relevant acquisition costs and evidence of value for each selected outcome. Use its measures under Useful Progress Measures to set an affordable resource limit, and record unverified assumptions.",
        "A working cost model names its assumptions and an affordable acquisition range.",
      ],
      [
        "Compare reported returns with business value",
        "Compare the cost and useful completion of each outcome with its own value assumptions. Keep different outcomes separate. Counting an intermediate action does not establish revenue or profit.",
        "One recent period reconciles spend, outcomes, and relevant costs, with gaps documented.",
      ],
      [
        "Set a decision rule before changing spend",
        "Choose a target range, a review period suited to conversion delays, and conditions for continuing, adjusting, or stopping.",
        "A written rule names the target, budget limit, review date, and responsible person.",
      ],
    ],
    reporting: [
      [
        "Build one platform and business review",
        "Choose trusted sources for spend and the measures listed for your selected outcomes. Compare them for one consistent period, keeping different outcomes separate.",
        "A recurring review contains spend, outcomes, relevant costs, and known limitations.",
      ],
      [
        "Explain the business context",
        "Review volume, quality, margins, seasonality, and conversion delays. Investigate possible explanations; reported returns alone do not prove an additional business result caused by ads.",
        "The review separates observed facts, possible explanations, and missing evidence.",
      ],
      [
        "Make one evidence-based decision",
        "Choose one budget or campaign decision supported by the review. If evidence is insufficient, collect it before restructuring or increasing spend.",
        "A dated decision includes its evidence, owner, next review date, and stop conditions.",
      ],
    ],
    creative: [
      [
        "Gather customer-informed advertising ideas",
        "Review recent customer conversations and performance. Write three distinct message, creative, offer, or audience hypotheses with a reason each could matter.",
        "Three hypotheses cite a customer insight or observed result.",
      ],
      [
        "Run one sustainable learning cycle",
        "Choose the most valuable hypothesis your budget and conversion volume can support. Define a meaningful comparison and duration; preserve successful campaigns.",
        "One test has an owner, budget limit, comparison, learning criterion, and review date.",
      ],
      [
        "Use what you learn in the next idea",
        "Record the result and uncertainty, then choose whether to refine, repeat, or retire the idea. Avoid changing ads simply to keep changing them.",
        "A learning note informs the next creative brief.",
      ],
    ],
    signals: [
      [
        "Verify the outcome each campaign pursues",
        "List each campaign’s intended role and optimization outcome. Awareness campaigns may pursue relevant discovery outcomes; document how those connect to later business value.",
        "Each campaign has a stated role and a deliberately chosen outcome.",
      ],
      [
        "Check a real outcome from start to finish",
        "Trace a sample of each selected outcome through its tracking, definitions and relevant feedback. Check missing, duplicated, or incorrect signals before changing the ads.",
        "A sample reconciles with business records or documents exactly what needs repair.",
      ],
      [
        "Return useful quality and value feedback",
        "Where appropriate, connect qualified outcomes or purchase values back to campaign decisions. Verify the repair before campaign restructuring or budget expansion.",
        "A verified feedback process and review owner are in place.",
      ],
    ],
    readiness: [
      [
        "Choose a question your volume can answer",
        "Focus on one useful learning question. Estimate the budget, useful outcomes, and time needed before launching.",
        "A brief explains why the available evidence can support the decision—or defers the test.",
      ],
      [
        "Protect what already works",
        "Keep successful activity stable and bound the experimental spend. Use customer research or a smaller validation step if paid conversion volume is insufficient.",
        "The baseline, spending limit, and alternative research step are documented.",
      ],
      [
        "Review uncertainty before acting",
        "Allow for conversion delays and record uncertainty. Extend, stop, or redesign the test based on evidence rather than short-term alerts.",
        "A review date and explicit decision criteria are agreed.",
      ],
    ],
  };
  if (
    id === "reporting" &&
    ["A", "B"].includes(answers.T7) &&
    ["B", "C", "D", "E"].includes(answers.T8)
  )
    bank.reporting = [
      [
        "Use the review you already have to explain the change",
        "Take one change from the platform and overall review you report as established. Compare spend, volume, customer quality, margins and conversion delays; separate facts from possible explanations.",
        "One observed change has a documented business-context explanation and remaining questions.",
      ],
      [
        "Choose which interpretation the evidence supports",
        "Compare plausible explanations using the existing review. Decide what is known, what needs checking and which decision can responsibly wait.",
        "A working interpretation cites evidence and does not confuse correlation with incremental impact.",
      ],
      [
        "Record the decision within the existing review",
        "Use the current review cadence to document the interpretation, decision, owner and next check. Preserve the reporting process you described as working.",
        "The existing review records a reasoned decision and a follow-up date.",
      ],
    ];
  if (
    id === "reporting" &&
    ["A", "B"].includes(answers.T8) &&
    ["B", "C", "D", "E"].includes(answers.T7)
  )
    bank.reporting = [
      [
        "Connect platform detail with the overall business view",
        "Compare the current platform and business views for one period, checking which useful measures are missing from the combined decision. Keep the interpretation capability you described as effective.",
        "The comparison documents the missing decision view without assuming poor trend understanding.",
      ],
      [
        "Choose a shared decision view",
        "Choose a useful set of platform and business measures, their sources and period so the existing interpretation process can use them together.",
        "One decision view names its measures, sources, period and limitations.",
      ],
      [
        "Use the combined view in the next decision",
        "Prepare the combined view for the next existing review and record how it informs one budget or growth decision, or why evidence remains insufficient.",
        "The combined view is available and its decision use is recorded.",
      ],
    ];
  if (id === "reporting" && answers.T7 === "B")
    bank.reporting = [
      [
        "Review how both existing views inform decisions",
        "Inspect a recent budget or growth decision alongside the platform and overall returns you already review. Identify where the decision did not use that available evidence.",
        "One recent decision has a documented comparison with both existing reviews.",
      ],
      [
        "Choose a decision rule using both reviews",
        "Agree how the current platform and business views will inform the next decision, retaining the reporting and interpretation capabilities already in place.",
        "A written decision rule names both existing views and their limitations.",
      ],
      [
        "Apply the rule in the existing review",
        "Use the agreed rule for the next existing review and record the decision, supporting evidence and next check.",
        "An existing review records how both views informed a decision.",
      ],
    ];
  if (id === "ownership" && answers.T5 === "B")
    bank.ownership[0] = [
      "Protect time for the owner who already tests",
      "Review competing priorities with the current owner and agree a sustainable protected testing allocation. Keep the effective responsibility and regular testing you reported.",
      "The existing owner has an agreed time allocation and a way to handle competing priorities.",
    ];
  if (id === "ownership" && answers.T5 === "C")
    bank.ownership[0] = [
      "Make testing a regular part of the current owner’s work",
      "Review the current manager’s capacity and agree a recurring test-and-learning rhythm. Clarify the process around the existing owner before considering additional support.",
      "The current owner has a feasible recurring testing responsibility and review date.",
    ];
  if (id === "creative" && answers.T9 === "B")
    bank.creative = [
      [
        "Review what happens after each existing test",
        "Use the regular idea pipeline you already report. Inspect recent tests for missing conclusions or follow-through rather than assuming a shortage of ideas.",
        "Recent test records show where learning is lost and where it is already applied.",
      ],
      [
        "Choose one learning handoff to improve",
        "Agree who converts the test conclusion into the next brief and what evidence is needed to do so. Preserve the current idea cadence.",
        "A practical handoff defines the conclusion, responsible person and next brief.",
      ],
      [
        "Apply the conclusion to the next brief",
        "Complete one evidence-based test conclusion and use it in the next advertising brief within the existing process.",
        "One next brief cites the previous learning and its uncertainty.",
      ],
    ];
  if (id === "signals" && answers.T10 === "E")
    bank.signals[2] = [
      "Keep verified feedback or address only the gap found",
      "Confirm whether the existing outcome and quality feedback fits the campaign’s intended role. Keep it when verified; repair a signal or add feedback only when the check establishes a specific need.",
      "The check documents either suitable existing outcomes and feedback or a verified response to the gap actually found.",
    ];
  if (setup.paidStatus !== "running" && id === "economics")
    bank.economics = [
      bank.economics[0],
      [
        "Check the assumptions before planning spend",
        "Compare the estimates with current customer records, margins, close rates, and conversion delays. Verify conversion tracking before treating an acquisition target as usable.",
        "The cost model has checked inputs and documented uncertainty.",
      ],
      [
        "Set conditions for deciding whether to test",
        "Agree the affordable loss limit, required measurement, responsible owner, and evidence that would justify evaluating an advertising experiment. Defer spending until those conditions hold.",
        "A written readiness decision defines the limits and conditions; no launch is assumed.",
      ],
    ];
  return bank[id].map(([title, what, done], i) =>
    move(`${id}_${i + 1}`, title, what, rationale, done),
  );
}
export function resolve(setup: Setup, input: unknown) {
  const answers = validateAnswers(setup, input, true),
    scored = score(setup, answers),
    questions = assessmentQuestions(setup);
  const groups = Object.entries(scored.sectionScores).reduce(
    (m, [id, raw]) => {
      const displayed = Number(raw.toFixed(1));
      (m[displayed] ??= []).push(Number(id));
      return m;
    },
    {} as Record<number, number[]>,
  );
  let rank = 1;
  const priorityGroups = Object.entries(groups)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([value, ids]) => {
      const g = {
        rank,
        score: Number(value),
        sectionIds: ids.sort((a, b) =>
          sections
            .find((s) => s.id === a)!
            .name.localeCompare(sections.find((s) => s.id === b)!.name),
        ),
      };
      rank += ids.length;
      return g;
    });
  const meaning = (id: string) =>
    setup.paidStatus !== "running" && /^T(?:[5-9]|10)$/.test(id)
      ? readinessMeaning(id, answers[id])
      : answerMeaning(id, answers[id]);
  const pool: Opportunity[] = [];
  for (const section of sections) {
    const ids = questions
      .filter(
        (q) =>
          q.sectionId === section.id &&
          !["T5", "T6", "T7", "T8", "T9", "T10"].includes(q.id) &&
          answers[q.id] !== "A",
      )
      .map((q) => q.id);
    if (!ids.length) continue;
    const focus = focusedCoreId(ids, answers),
      recipe = coreActionRecipe(focus, answers);
    pool.push({
      id: `core_${section.id}`,
      sectionId: section.id,
      questionIds: ids,
      priority: 0,
      title: `Review ${recipe.topic}`,
      rationale: `Your answers indicate that ${coreObservation(focus, answers)}. ${recipe.impact}`,
      kind: ids.some((id) => meaning(id) === "reported_gap")
        ? "demonstrated weakness"
        : ids.some((id) => meaning(id) === "missing_verification")
          ? "uncertainty"
          : "improvement opportunity",
      evidenceMeanings: ids.map((id) => ({
        questionId: id,
        answer: answers[id],
        meaning: meaning(id),
      })),
      actions: coreMoves(section.id, "", ids, answers),
    });
  }
  // Reuse approved specialized recipes, never their historical ranking values.
  const old = legacyRecipePool(setup, answers);
  for (const item of old.opportunities.filter(
    (o) => !o.id.startsWith("core_") && !o.id.startsWith("prep_"),
  )) {
    pool.push({ ...item, priority: 0 });
  }
  if (setup.paidStatus !== "running")
    for (const id of ["T5", "T6", "T7", "T8", "T9", "T10"])
      if (answers[id] !== "A") {
        const isolated = {
          ...answers,
          ...Object.fromEntries(
            ["T5", "T6", "T7", "T8", "T9", "T10"].map((k) => [
              k,
              k === id ? answers[k] : "A",
            ]),
          ),
        };
        const recipe = readinessOpportunity(isolated);
        if (recipe) pool.push({ ...recipe, priority: 0 });
      }
  const severity = (o: Opportunity) =>
    Math.max(0, ...o.questionIds.map((id) => "ABCDE".indexOf(answers[id])));
  pool.sort(
    (a, b) =>
      scored.sectionScores[a.sectionId] - scored.sectionScores[b.sectionId] ||
      severity(b) - severity(a) ||
      Number(b.kind === "demonstrated weakness") -
        Number(a.kind === "demonstrated weakness") ||
      a.title.localeCompare(b.title),
  );
  for (const o of pool)
    o.priority = priorityGroups.find((g) =>
      g.sectionIds.includes(o.sectionId),
    )!.rank;
  const lowest = priorityGroups[0],
    next = lowest.sectionIds.length === 1 ? priorityGroups[1] : lowest;
  const primaryIds = lowest.sectionIds,
    nextIds = next === lowest ? lowest.sectionIds.slice(1) : next.sectionIds;
  const firstId = primaryIds[0],
    secondId = nextIds[0];
  const primary = pool.find((o) => o.sectionId === firstId),
    secondary = secondId
      ? pool.find((o) => o.sectionId === secondId)
      : undefined;
  const names = (ids: number[]) =>
    ids.map((id) => sections.find((s) => s.id === id)!.name).join(", ");
  const allStrong = lowest.score >= 80;
  const prioritySummary =
    lowest.sectionIds.length > 1
      ? `${names(primaryIds)} are equally ranked at ${lowest.score}/100. Their display order does not indicate strategic precedence. The three moves are a limited starting sequence; other tied areas remain equally ranked.${priorityGroups[1] ? ` The next score group is ${names(priorityGroups[1].sectionIds)} at ${priorityGroups[1].score}/100.` : ""}`
      : `${names(primaryIds)} is the lowest-scoring area at ${lowest.score}/100. ${names(next.sectionIds)} ${next.sectionIds.length > 1 ? "are equally ranked next" : "is next"} at ${next.score}/100. Specific answers determine the work within these areas; prerequisites do not change this order.`;
  return {
    ...scored,
    priorityGroups,
    primaryIds,
    nextIds,
    allStrong,
    prioritySummary,
    opportunities: pool,
    primary: primaryIds.length === 1 ? primary : undefined,
    firstCandidate: primary,
    secondary,
    lowestSectionId: firstId,
    contradictions: old.contradictions,
    path: (allStrong
      ? "strong, balanced foundations"
      : primary?.kind === "demonstrated weakness"
        ? "clear constraint"
        : "several moderate opportunities") as
      | "strong, balanced foundations"
      | "clear constraint"
      | "several moderate opportunities",
    priorityReason: prioritySummary,
  };
}
function validationMoves(setup: Setup): Move[] {
  const v = strongValidation(setup);
  return [
    move(
      "validate_1",
      `Validate ${v.topic}`,
      v.evidence,
      "No specific weakness is established. Check the evidence behind the capability rather than assuming it needs repair.",
      `A recent evidence sample documents ${v.topic}, including limitations.`,
    ),
    move(
      "validate_2",
      "Choose one small, testable improvement",
      v.decision,
      "The next learning question should fit your business outcome and the process you already report as effective.",
      "A written test plan names the business outcome, comparison, owner, limits and review period.",
    ),
    move(
      "validate_3",
      "Check the idea while keeping current activity stable",
      v.implement,
      "A small validation exercise or a no-change decision can be useful even when reported capabilities are strong.",
      v.done,
    ),
  ];
}
export function createReport(raw: unknown, date = new Date()) {
  const { setup, answers } = draftSchema.parse(raw),
    diagnosis = resolve(setup, answers),
    questions = assessmentQuestions(setup);
  const areas = Array.from(
    new Set([...diagnosis.primaryIds, ...diagnosis.nextIds]),
  ).map((id) => {
    const qs = questions.filter((q) => q.sectionId === id);
    const evidence = qs
      .filter(
        (q) =>
          !["A", "B"].includes(answers[q.id]) ||
          (q.id === "ML3" && answers[q.id] === "B"),
      )
      .map((q) => ({
        id: q.id,
        answer: answers[q.id],
        text: q.options.find((o) => o.value === answers[q.id])!.text,
        meaning:
          setup.paidStatus !== "running" && /^T(?:[5-9]|10)$/.test(q.id)
            ? readinessMeaning(q.id, answers[q.id])
            : answerMeaning(q.id, answers[q.id]),
      }));
    return {
      sectionId: id,
      name: sections.find((s) => s.id === id)!.name,
      score: diagnosis.sectionScores[id],
      evidence,
      confirmed: evidence.filter((e) => e.meaning === "reported_gap"),
      uncertain: evidence.filter((e) => e.meaning === "missing_verification"),
    };
  });
  const primaryArea = areas[0],
    secondaryArea = areas[1],
    first = diagnosis.firstCandidate,
    second = diagnosis.secondary;
  const worthwhile = (area: typeof primaryArea | undefined) =>
    area && area.evidence.length > 0;
  const recipe = first?.actions ?? validationMoves(setup),
    support = second?.actions;
  const sentences = (t: string) => t.split(/(?<=[.!?])\s+/).filter(Boolean);
  let recommendations: Move[];
  if (worthwhile(secondaryArea) && support) {
    recommendations = [
      {
        ...recipe[0],
        id: "priority-first-prepare",
        title: `${primaryArea.name}: ${recipe[0].title.charAt(0).toLowerCase() + recipe[0].title.slice(1)}`,
        whatToDo: recipe[0].whatToDo,
        supportingDetails: sentences(recipe[1].whatToDo),
        doneWhen: recipe[1].doneWhen,
      },
      {
        ...recipe[2],
        id: "priority-first-apply",
        title: `${primaryArea.name}: ${recipe[2].title.charAt(0).toLowerCase() + recipe[2].title.slice(1)}`,
      },
      {
        ...support[2],
        id: "priority-next-apply",
        title: `${secondaryArea.name}: ${support[2].title.charAt(0).toLowerCase() + support[2].title.slice(1)}`,
        whatToDo: support[0].whatToDo,
        supportingDetails: [
          ...sentences(support[1].whatToDo),
          ...sentences(support[2].whatToDo),
        ],
        why: support[2].why,
      },
    ];
  } else recommendations = recipe;
  if (diagnosis.allStrong)
    recommendations = recommendations.map((m) => ({
      ...m,
      why: `Your scores are strong. Treat this as a focused validation or improvement opportunity, not evidence that the whole capability is weak. ${m.why}`,
    }));
  if (
    primaryArea.evidence.some(
      (e) => e.id === "ML2" && e.meaning === "missing_verification",
    ) &&
    primaryArea.evidence.some(
      (e) => e.id === "ML3" && e.meaning === "reported_gap",
    )
  )
    (recommendations[0].supportingDetails ??= []).push(
      "Separate business results from supporting clues using a recent example; keep that check separate from creating the report you currently lack.",
    );
  const prerequisiteNotes: string[] = [];
  if (primaryArea.sectionId === 5 && ["D", "E"].includes(answers.ML4))
    prerequisiteNotes.push(
      "Before relying on acquisition costs or reported returns, trace a small sample to its source: your answers say those inputs have not yet been validated. Keep targets provisional until checked; do not assume the tracking is broken.",
    );
  if (
    primaryArea.sectionId === 5 &&
    ["O1", "O2", "O5"].some((id) => ["D", "E"].includes(answers[id]))
  )
    prerequisiteNotes.push(
      "Before funding a paid test, check the unclear offer or unverified demand using a small customer-evidence review. Include this in acquisition readiness; deferring spend is a valid outcome.",
    );
  if (primaryArea.sectionId === 3 && ["D", "E"].includes(answers.ML4))
    prerequisiteNotes.push(
      "Use customer conversations and a small message prototype for this first-area check. Do not use unverified performance numbers as proof that a wording change worked.",
    );
  if (prerequisiteNotes.length)
    (recommendations[0].supportingDetails ??= []).push(...prerequisiteNotes);
  const observation = (area: typeof primaryArea) => {
    const describe = (e: (typeof area.evidence)[number]) =>
      recipes[e.id]
        ? coreObservation(e.id, answers)
        : `the preparation described in ${questions
            .find((q) => q.id === e.id)!
            .prompt.replace(/\?$/, "")
            .toLowerCase()} needs a practical check`;
    if (!area.evidence.length)
      return `${area.name} has no specific weak answer; validate what you report as working.`;
    const known = area.confirmed.length
      ? `Your ${area.name} answers indicate that ${area.confirmed.map(describe).join("; ")}.`
      : "";
    const unknown = area.uncertain.length
      ? `The unresolved checks are separate: ${area.uncertain.map(describe).join("; ")}. These do not establish a failure.`
      : "";
    return known || unknown
      ? `${known} ${unknown}`
      : `Your ${area.name} answers identify details to improve or validate: ${describe(area.evidence[0])}.`;
  };
  const namesFor = (ids: number[]) => ids.map(id => sections.find(s => s.id === id)!.name).join(" and ");
  const customerSummary = diagnosis.primaryIds.length > 1
    ? `${namesFor(diagnosis.primaryIds)} are equally ranked at ${diagnosis.priorityGroups[0].score}/100.`
    : `Start with ${primaryArea.name} at ${Number(primaryArea.score.toFixed(1))}/100.${secondaryArea ? ` Next, work on ${namesFor(diagnosis.nextIds)} at ${Number(secondaryArea.score.toFixed(1))}/100.` : ""}`;
  const intro = `${customerSummary} ${diagnosis.allStrong ? "All six scores are strong; the moves below validate or refine reported capabilities without inventing a broad weakness." : ""} ${observation(primaryArea)} ${secondaryArea ? observation(secondaryArea) : ""} The three moves address the first area${worthwhile(secondaryArea) ? " and the next area" : ""}, while preserving the stronger capabilities you reported.`;
  const mixedEvidence = areas.map((a) => ({
    sectionId: a.sectionId,
    knownGaps: a.confirmed.map((e) => e.id),
    unresolvedChecks: a.uncertain.map((e) => e.id),
  }));
  const goals = setup.outcome.map((id) => ({
    id,
    label: goalLabels[id],
    measure: goalMetrics[id],
  }));
  const phases = [
    {
      week: 1,
      title: "Establish the evidence",
      objective:
        "Review the first and next priority areas before selecting changes.",
      actions: [
        recipe[0].whatToDo,
        ...(worthwhile(secondaryArea) && support ? [support[0].whatToDo] : []),
        ...setup.outcome.map((g) => `${goalLabels[g]}: ${goalChecks[g]}`),
      ],
      completionCriteria:
        "Current evidence, reported gaps and unanswered checks are recorded separately for the priority areas.",
    },
    {
      week: 2,
      title: "Choose the improvements",
      objective:
        "Choose the specific changes to make, what evidence they need and who will own them.",
      actions: [
        recipe[1].whatToDo,
        ...(worthwhile(secondaryArea) && support ? [support[1].whatToDo] : []),
      ],
      completionCriteria:
        "Scope, owner, definitions, review period and any conditions for deferring implementation are agreed.",
    },
    {
      week: 3,
      title: "Complete the agreed work",
      objective:
        "Implement the agreed first-area improvement, then the next-area work when its evidence is ready; research or a no-change outcome remains valid.",
      actions: [
        recipe[2].whatToDo,
        ...(worthwhile(secondaryArea) && support ? [support[2].whatToDo] : []),
      ],
      completionCriteria: recommendations.map((m) => m.doneWhen).join(" "),
    },
    {
      week: 4,
      title: "Evaluate the completed work",
      objective:
        "Review what was completed without starting a new implementation task.",
      actions: [
        "Compare completed work with the agreed criteria for both priority areas. Record results, evidence limits and a keep, refine, defer or stop decision.",
        "Review each selected business outcome against its own baseline; keep unlike outcomes separate.",
      ],
      completionCriteria:
        "A dated review records what was learned and any proposal for a later cycle.",
    },
  ];
  if (
    primaryArea.evidence.some(
      (e) => e.id === "ML2" && e.meaning === "missing_verification",
    ) &&
    primaryArea.evidence.some(
      (e) => e.id === "ML3" && e.meaning === "reported_gap",
    )
  )
    phases[1].actions.push(
      "Use a recent example to distinguish the business outcome from supporting clues before populating the agreed report.",
    );
  if (prerequisiteNotes.length) phases[0].actions.push(...prerequisiteNotes);
  return structuredClone({
    versions,
    createdAt: date.toISOString(),
    setup,
    answers,
    diagnosis,
    prerequisiteNotes,
    prioritySummary: customerSummary,
    priorityHeadline:
      diagnosis.primaryIds.length > 1
        ? "Equally ranked priority areas"
        : primaryArea.name,
    priorityAreas: areas,
    mixedEvidence,
    businessGoals: goals,
    goalGuidance: setup.outcome.map((g) => ({
      id: g,
      label: goalLabels[g],
      check: goalChecks[g],
      measure: goalMetrics[g],
    })),
    introduction: plainText(intro).replace(/ +/g, " ").trim(),
    trendNote:
      setup.paidStatus === "running"
        ? `You reported advertising returns as “${setup.trend}”. This is context, not proof of a cause.`
        : "Any paid experiment remains optional and depends on affordable economics, ownership and checked measurement; these moves do not require a live campaign.",
    recommendations: recommendations.map((m) => ({
      ...m,
      title: plainText(m.title),
      whatToDo: plainText(m.whatToDo),
      supportingDetails: m.supportingDetails?.map(plainText),
      why: plainText(m.why),
      doneWhen: plainText(m.doneWhen),
    })),
    thirtyDayPlan: phases.map((w) => ({
      ...w,
      recommendationIds: recommendations.map((m) => m.id),
      actions: w.actions.map(plainText),
    })),
    progressMeasures: [
      ...goals.map((g) => g.measure),
      "Completion of the agreed work and remaining evidence limits in both priority areas.",
    ],
    workSession: [
      "What evidence supports the first and next areas?",
      "Which gaps are confirmed and which checks are still unresolved?",
      "Which useful work can be completed with the people and time available?",
      "What needs to be ready before you make these changes?",
      "What baseline and completion criteria will be used?",
      "What will you keep, change, defer or stop after the review?",
    ],
    caveat:
      "This report summarizes your answers. Verify them against customer and business evidence; scores do not establish a cause or guarantee growth.",
  });
}
export type Report = ReturnType<typeof createReport>;
// Legacy data must remain on its original engine. No invented paid answers or implicit upgrades.
export function resumePolicy(record: {
  versions?: { questionnaire: string };
  report?: unknown;
  run_number?: number;
}) {
  if (record.report)
    return { action: "show_frozen_report" as const, migrate: false };
  if (!record.versions || record.versions.questionnaire === "1.0.0")
    return { action: "resume_v1" as const, migrate: false };
  if (record.versions.questionnaire !== versions.questionnaire)
    throw new Error("Unsupported questionnaire version");
  return { action: "resume_v2" as const, migrate: false };
}
