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
  const nonUseIds = questions
    .filter((q) => answers[q.id] === "F")
    .map((q) => q.id);
  const weight = (q: (typeof questions)[number]) =>
    answers[q.id] === "F" ? 1 / nonUseIds.length : q.weight;
  const sectionScores = Object.fromEntries(
    sections.map((s) => {
      const applicable = questions.filter((q) => q.sectionId === s.id);
      const additionalContextWeight =
        s.id === 5 && setup.paidStatus !== "running" && !nonUseIds.length
          ? 1
          : 0;
      const maximum =
        applicable.reduce((n, q) => n + weight(q) * 5, 0) +
        additionalContextWeight * 5;
      return [
        s.id,
        ((applicable.reduce(
          (n, q) =>
            n +
            weight(q) * q.options.find((o) => o.value === answers[q.id])!.score,
          0,
        ) +
          additionalContextWeight * nonUseSignalScore(setup)) /
          maximum) *
          100,
      ];
    }),
  );
  return {
    sectionScores,
    nonUseScoring: {
      questionIds: nonUseIds,
      combinedWeight: setup.paidStatus !== "running" ? 1 : 0,
      reason: setup.nonUseReason,
      score:
        setup.paidStatus !== "running" ? nonUseSignalScore(setup) : undefined,
    },
    overallScore:
      Object.values(sectionScores).reduce((n, s) => n + s, 0) / sections.length,
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
  const measure =
    setup.outcome === "leads"
      ? "qualified-lead cost, close rate, customer acquisition cost, and customer value"
      : "revenue relative to ad spend, contribution after relevant costs, and customer volume";
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
        "Close the learning loop",
        "Schedule a review with the owner, record what happened and what remains uncertain, and decide the next step.",
        "A recurring review and a decision log are in place.",
      ],
    ],
    economics: [
      [
        "Calculate your affordable acquisition range",
        `Bring together costs, margins, customer value, and ${setup.outcome === "leads" ? "qualified-lead close rates and sales delays" : "returns, repeat purchase assumptions, and fulfillment costs"}. Record which costs your break-even estimate includes.`,
        "A working cost model names its assumptions and an affordable acquisition range.",
      ],
      [
        "Compare reported returns with business value",
        `Review ${measure}. ROAS compares revenue with ad spend; ROI considers relevant investment costs. Check profitability rather than assuming a platform return proves it.`,
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
        `Choose a trusted source for spend and each outcome. Compare ${measure} at platform and business levels for the same period.`,
        "A recurring review contains spend, outcomes, relevant costs, and known limitations.",
      ],
      [
        "Explain the business context",
        "Review volume, quality, margins, seasonality, and conversion delays. Investigate possible explanations; reported returns alone do not prove additional sales caused by ads.",
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
        "Trace a sample purchase or qualified opportunity through tracking, reported values, and downstream feedback. Check missing, duplicated, or incorrect signals before changing the ads.",
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
  const answers = validateAnswers(setup, input, true);
  const scored = score(setup, answers);
  const questions = assessmentQuestions(setup);
  const opportunities: Opportunity[] = [];
  const add = (
    id: string,
    sectionId: number,
    ids: string[],
    title: string,
    priority: number,
    actions?: Move[],
  ) => {
    const focus =
      ids.length && recipes[ids[0]] ? focusedCoreId(ids, answers) : undefined;
    const paidObservations: Record<string, string> = {
      ownership:
        "your testing responsibility or protected time could be stronger",
      economics:
        "your acquisition targets are not yet fully connected to current costs and customer value",
      reporting:
        ids.includes("T7") && ids.includes("T8")
          ? "platform/overall reviews and the explanation of performance changes both need attention"
          : ids.includes("T7")
            ? "the platform and overall business review is not consistently informing decisions"
            : "the explanation of performance changes lacks some business context",
      creative:
        "the development or follow-through of new advertising ideas is inconsistent",
      signals:
        "the business value represented by campaign optimization outcomes needs checking",
    };
    const rationale = focus
      ? `You indicated that ${coreObservation(focus, answers)}. ${coreActionRecipe(focus, answers).impact}`
      : `You indicated that ${paidObservations[id] ?? title.toLowerCase()}.`;
    const meanings = ids.map((key) => ({
      questionId: key,
      answer: answers[key],
      meaning: answerMeaning(key, answers[key]),
    }));
    const selectedMeaning = focus
      ? answerMeaning(focus, answers[focus])
      : meanings.every((m) => m.meaning === "missing_verification")
        ? "missing_verification"
        : undefined;
    opportunities.push({
      id,
      sectionId,
      questionIds: ids,
      title,
      priority,
      rationale,
      evidenceMeanings: meanings,
      kind:
        selectedMeaning === "missing_verification"
          ? "uncertainty"
          : id === "ownership"
            ? "ownership or capacity gap"
            : ids.some((id) => ["D", "E"].includes(answers[id]))
              ? "demonstrated weakness"
              : "improvement opportunity",
      actions:
        actions ??
        ([
          "ownership",
          "economics",
          "reporting",
          "creative",
          "signals",
          "readiness",
        ].includes(id)
          ? paidMoves(id, rationale, setup, answers)
          : coreMoves(sectionId, rationale, ids, answers)),
    });
  };
  // Foundational prerequisites outrank downstream opportunities; scores never penalize an issue twice.
  for (const s of sections) {
    const weak = questions.filter(
      (q) =>
        q.sectionId === s.id &&
        !["T5", "T6", "T7", "T8", "T9", "T10"].includes(q.id) &&
        (["C", "D", "E"].includes(answers[q.id]) ||
          (q.id === "ML3" && answers[q.id] === "B")),
    );
    if (!weak.length) continue;
    const severe = weak.some((q) => ["D", "E"].includes(answers[q.id]));
    const priority =
      s.id === 6 && ["D", "E"].includes(answers.ML4)
        ? 0
        : s.id === 1 &&
            (["O1", "O2", "O5"].some((id) =>
              ["D", "E"].includes(answers[id]),
            ) ||
              scored.sectionScores[1] < 60)
          ? 1
          : severe
            ? 5 + s.id
            : 30 + s.id;
    add(
      `core_${s.id}`,
      s.id,
      weak.map((q) => q.id),
      `Review ${
        coreActionRecipe(
          focusedCoreId(
            weak.map((q) => q.id),
            answers,
          ),
          answers,
        ).topic
      }`,
      priority,
    );
  }
  {
    const candidates: [string, string[], string, number][] = [
      ["signals", ["T10"], "Verify campaign objectives and feedback", 3],
      [
        "economics",
        ["T6"],
        "Connect advertising returns to business economics",
        4,
      ],
      [
        "ownership",
        ["T5"],
        "Protect ownership and capacity for experimentation",
        12,
      ],
      [
        "reporting",
        ["T7", "T8"],
        "Review advertising returns in business context",
        13,
      ],
      [
        "creative",
        ["T9"],
        "Build a sustainable pipeline of advertising ideas",
        14,
      ],
    ];
    for (const [id, ids, title, priority] of candidates) {
      const weak = ids.filter((id) =>
        ["B", "C", "D", "E"].includes(answers[id]),
      );
      if (weak.length)
        add(
          id,
          5,
          weak,
          title,
          weak.some((id) => ["D", "E"].includes(answers[id]))
            ? priority
            : priority + 20,
        );
    }
    if (setup.paidStatus === "running" && setup.testReadiness !== "ready") {
      const rationale = `You reported ${setup.testReadiness === "limited" ? "limited" : "uncertain"} budget, useful conversion volume, or time for testing. Confirm feasibility before launching.`;
      opportunities.push({
        id: "readiness",
        sectionId: 5,
        questionIds: [],
        title: "Fit testing to the evidence you can collect",
        priority: 11,
        kind:
          setup.testReadiness === "unknown"
            ? "uncertainty"
            : "improvement opportunity",
        rationale,
        actions: paidMoves("readiness", rationale, setup, answers),
      });
    }
  }
  if (setup.paidStatus !== "running") {
    const rationale = `You indicated: “${nonUseReasons[setup.nonUseReason]}” ${setup.testReadiness !== "ready" ? "You also reported limited or uncertain testing resources." : "You reported that testing resources can be planned."}`;
    const titles: Record<string, string> = {
      deliberate: "Validate your channel decision against business evidence",
      support:
        "Prepare ownership and support before evaluating paid acquisition",
      risk: "Define a responsible way to evaluate advertising risk",
      tried: "Learn from the previous advertising attempt",
      preparing: "Complete the foundations before considering advertising",
      unexplored: "Evaluate whether paid acquisition deserves a limited test",
    };
    const ready =
      ["O1", "O2", "O5", "C1", "ML4", "ML5"].every((id) =>
        ["A", "B"].includes(answers[id]),
      ) &&
      ["A", "B"].includes(answers.T6) &&
      setup.testReadiness === "ready";
    const actions = [
      move(
        "nonuse_1",
        setup.nonUseReason === "deliberate"
          ? "Review the evidence for your channel choice"
          : "Establish affordable acquisition targets",
        setup.nonUseReason === "deliberate"
          ? "Compare the reach, customer quality, costs, and contribution of your chosen channels. Record why they fit your priorities and when you would revisit the choice."
          : "Estimate customer value, relevant costs, margins, and affordable acquisition costs. For leads, include qualification, close rates, and sales delays. Check any past advertising evidence without assuming ads caused the reported results.",
        rationale,
        "Your acquisition targets or channel-choice evidence are recorded with assumptions and a review date.",
      ),
      move(
        "nonuse_2",
        "Check readiness and assign responsibility",
        "Identify one promising audience, offer, and channel to evaluate. Name a person to review the opportunity, check the conversion path, and verify that valuable outcomes can be measured. Add support where needed; do not assume hiring an employee is required.",
        rationale,
        "An owner, audience, offer, channel, measurement check, and unresolved readiness gaps are documented.",
      ),
      move(
        "nonuse_3",
        ready && setup.nonUseReason !== "deliberate"
          ? "Design an optional, bounded experiment"
          : "Choose evidence-based conditions for the next step",
        ready && setup.nonUseReason !== "deliberate"
          ? "If the opportunity merits a test, write the learning goal, maximum affordable loss, spending limit, duration, stop conditions, and review measures before deciding whether to launch. Paid advertising is an option to evaluate, not a guaranteed source of growth."
          : "Keep your existing channel decision or complete the identified foundations. Write what evidence, economics, ownership, budget, and measurement would need to be in place before reconsidering paid spending. Use customer research or existing-channel evidence first where useful.",
        rationale,
        "A written decision either defers spending with specific readiness criteria or defines an optional test with learning goals, limits, and stop conditions.",
      ),
    ];
    opportunities.push({
      id: "nonuse",
      sectionId: 5,
      questionIds: scored.nonUseScoring.questionIds,
      kind:
        setup.nonUseReason === "support"
          ? "ownership or capacity gap"
          : "improvement opportunity",
      title: titles[setup.nonUseReason],
      priority: setup.nonUseReason === "deliberate" ? 45 : 15,
      rationale,
      actions,
    });
  }
  opportunities.sort(
    (a, b) => a.priority - b.priority || a.id.localeCompare(b.id),
  );
  const contradictions: string[] = [];
  if (
    setup.paidStatus !== "running" &&
    ["T5", "T7", "T8", "T9", "T10"].some((id) => answers[id] !== "F")
  )
    contradictions.push(
      "You reported no current advertising, but some paid-activity answers describe a process or results. Clarify whether these describe historical practice or current plans before relying on them.",
    );
  if (
    setup.paidStatus === "running" &&
    answers.T5 === "A" &&
    setup.owner === "No clear owner"
  )
    contradictions.push(
      "You described clear testing responsibility but also reported no clear owner. Confirm who is accountable before deciding whether support is needed.",
    );
  if (
    setup.paidStatus === "running" &&
    answers.T6 === "A" &&
    ["D", "E"].includes(answers.ML4)
  )
    contradictions.push(
      "Calculated acquisition targets coexist with weak data trust. Verify inputs before relying on the targets.",
    );
  if (
    setup.paidStatus === "running" &&
    ["We are not tracking this consistently", "I do not know"].includes(
      setup.trend!,
    ) &&
    answers.T8 === "A"
  )
    contradictions.push(
      "Your trend response and confidence in explaining it differ. Establish a baseline before treating the explanation as verified.",
    );
  if (contradictions.length) {
    const rationale = contradictions.join(" ");
    opportunities.push({
      id: "verify_conflict",
      sectionId: setup.owner === "No clear owner" ? 5 : 6,
      questionIds: [],
      title: "Clarify conflicting evidence before making changes",
      priority: 2,
      kind: "uncertainty",
      rationale,
      actions: [
        move(
          "conflict_1",
          "Compare the answers with a recent example",
          "Review the conflicting responses with the person responsible. Use a recent testing decision or performance review to establish what actually happens.",
          rationale,
          "A recent example confirms the process or identifies the missing information.",
        ),
        move(
          "conflict_2",
          "Agree a reliable working baseline",
          "Record who is accountable, what is measured, and what evidence can support a decision. Keep uncertainty visible rather than assigning blame.",
          rationale,
          "The team has a written baseline and a named person to resolve each remaining question.",
        ),
        move(
          "conflict_3",
          "Choose the next step after checking",
          "Use the clarified evidence to select one bounded improvement. Add specialist support only if the confirmed workload and capacity call for it.",
          rationale,
          "One evidence-supported decision names an owner, resource limit, and review date.",
        ),
      ],
    });
    opportunities.sort(
      (a, b) => a.priority - b.priority || a.id.localeCompare(b.id),
    );
  }
  const lowestSectionId = [...sections].sort(
    (a, b) =>
      scored.sectionScores[a.id] - scored.sectionScores[b.id] || a.id - b.id,
  )[0].id;
  const primary = opportunities[0];
  return {
    ...scored,
    opportunities,
    primary,
    lowestSectionId,
    contradictions,
    path: (!primary
      ? "strong, balanced foundations"
      : primary.kind === "demonstrated weakness" ||
          primary.kind === "ownership or capacity gap"
        ? "clear constraint"
        : "several moderate opportunities") as
      | "strong, balanced foundations"
      | "clear constraint"
      | "several moderate opportunities",
    priorityReason: !primary
      ? "No specific gap is established by these self-reported answers. Validate the evidence and test one useful improvement."
      : primary.priority === 0
        ? "Verify the reporting inputs first because their reliability has not yet been established for campaign and budget decisions."
        : primary.priority === 1
          ? "Validate the offer before investing in downstream acquisition changes."
          : primary.sectionId !== lowestSectionId
            ? `Start with ${primary.title.toLowerCase()} because its specific answer evidence or prerequisites deserve attention even though another section has a lower average score.`
            : `Start here because your individual answers identify a concrete next step: ${primary.title.toLowerCase()}.`,
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
      "Choose one useful, bounded improvement hypothesis",
      v.decision,
      "The next learning question should fit your business outcome and the process you already report as effective.",
      "A hypothesis names the business outcome, comparison, owner, limits and review period.",
    ),
    move(
      "validate_3",
      "Complete the validation exercise without disrupting the baseline",
      v.implement,
      "A small validation exercise or a no-change decision can be useful even when reported capabilities are strong.",
      v.done,
    ),
  ];
}
function conversationalIntroduction(
  setup: Setup,
  answers: Answers,
  d: ReturnType<typeof resolve>,
  moves: Move[],
) {
  const strengthPhrases: [string, string][] = [
    ["O5", "direct evidence of demand"],
    ["O1", "a clear offer"],
    ["A1", "a useful understanding of your best-fit customers"],
    ["M1", "an understandable first impression"],
    ["M6", "credible evidence behind your claims"],
    ["C1", "a clear next step"],
    ["ML4", "data you consider reliable"],
    ["T5", "effective testing ownership"],
  ];
  const focus = d.primary?.id.startsWith("core_")
    ? focusedCoreId(d.primary.questionIds, answers)
    : undefined;
  const preferred =
    focus === "C5"
      ? ["M6", "M1", "O5"]
      : focus === "C3"
        ? ["M1", "O1", "C1"]
        : focus === "ML3"
          ? ["ML4", "O5", "A1"]
          : focus === "C6"
            ? ["O1", "M6", "C1"]
            : ["O5", "A1", "C1", "ML4"];
  const strengths = preferred
    .filter((id) => ["A", "B"].includes(answers[id]))
    .slice(0, 3)
    .map((id) => strengthPhrases.find(([key]) => key === id)?.[1])
    .filter(Boolean);
  const opening = strengths.length
    ? `Your answers point to ${strengths.length === 1 ? strengths[0] : strengths.length === 2 ? strengths.join(" and ") : strengths.slice(0, -1).join(", ") + ", and " + strengths[strengths.length - 1]}. Those are useful foundations to keep.`
    : "Your answers leave several foundations uncertain, so a small evidence review is a sensible place to begin.";
  if (!d.primary) {
    const v = strongValidation(setup);
    return `${opening} No specific weakness is identified. For your ${setup.outcome === "leads" ? "lead-generation" : "purchase"} business, the next opportunity is to validate ${v.topic}. ${setup.owner === "Founder / owner" ? "Your founder-led testing process is reported as effective; that is a capability to support, not a staffing problem. " : ""}${setup.trend === "Generally declining" ? "The decline you reported deserves context, not an automatic management diagnosis. " : ""}The three moves will check a recent evidence sample, define one useful hypothesis and complete a bounded validation exercise or an explicit no-change decision.`;
  }
  const nonUseSummary: Record<string, string> = {
    deliberate:
      "you deliberately prioritize other channels, so the opportunity is to check the evidence and revisit conditions behind that choice",
    support:
      "you want to evaluate advertising but responsibility, knowledge or support is not yet in place",
    risk: "you need a responsible basis for evaluating advertising risk before any spending decision",
    tried:
      "your previous advertising attempt left disappointing or unclear results to review before another decision",
    preparing:
      "you are preparing the offer, resources or measurement before considering paid activity",
    unexplored:
      "paid acquisition is an unexplored option to evaluate rather than a proven growth channel",
  };
  const focusText =
    d.primary.id === "nonuse"
      ? nonUseSummary[setup.nonUseReason] + "."
      : focus
        ? `${coreObservation(focus, answers)}. ${coreActionRecipe(focus, answers).impact}`
        : d.primary.rationale
            .replace(/^You indicated that /, "")
            .replace(/^You indicated: /, "");
  const low = sections.find((s) => s.id === d.lowestSectionId)!.name;
  const prerequisite =
    d.primary.priority === 0
      ? `We recommend checking reliability first${d.primary.sectionId !== d.lowestSectionId ? `, even though ${low} has the lowest average score` : ""}, because campaign or budget decisions depend on trustworthy feedback.`
      : d.primary.priority === 1
        ? `We recommend settling this offer question before acquisition changes${d.primary.sectionId !== d.lowestSectionId ? `, even though ${low} has the lowest average score` : ""}; the next traffic decision depends on a credible offer.`
        : d.primary.sectionId !== d.lowestSectionId
          ? `We would start with this specific answer rather than the lowest section average (${low}), because it identifies an actionable decision to verify.`
          : "";
  const goal = focus
    ? `The three moves will ${coreGoal(focus, answers)}.`
    : `The three moves will help you ${moves.map((m) => m.title.replace(/\.$/, "").toLowerCase()).join("; ")}. They define a bounded next step rather than promise a performance improvement.`;
  return `${opening} What deserves attention is that ${focusText} ${prerequisite} ${goal}`
    .replace(/ +/g, " ")
    .trim();
}
function answerPlan(
  setup: Setup,
  answers: Answers,
  primary: Opportunity | undefined,
  moves: Move[],
) {
  const focus = primary?.id.startsWith("core_")
    ? focusedCoreId(primary.questionIds, answers)
    : undefined;
  const core = focus ? coreActionRecipe(focus, answers) : undefined;
  const v = !primary ? strongValidation(setup) : undefined;
  const phaseEvidence: Record<string, string> = {
    ownership:
      "Review who actually makes testing decisions, their protected time and one recent test; separate job title from demonstrated capacity.",
    economics:
      "Gather relevant costs, customer value and available acquisition records; distinguish checked inputs from assumptions.",
    reporting:
      "Gather one comparable period of platform and business records, including outcome quality, volume and conversion delays.",
    creative:
      "Review recent ideas, customer insights and test learnings before choosing the next creative hypothesis.",
    signals:
      "Map campaign roles, optimization outcomes and a feasible sample of recorded business outcomes before deciding whether any signal needs repair.",
    readiness:
      "Review available budget, useful conversion volume, duration and research alternatives before deciding whether a test is feasible.",
    nonuse:
      "Review the evidence behind the stated channel decision, current economics, conversion measurement and available responsibility; no paid launch is assumed.",
    verify_conflict:
      "Compare the conflicting answers with a recent documented example and ask which account is current.",
  };
  const evidence = core?.evidence ?? v?.evidence ?? phaseEvidence[primary!.id];
  const decision =
    core?.decision ??
    v?.decision ??
    `Use the baseline to choose the scope of ${primary!.title.toLowerCase()}. Name the owner, required resources, comparison, stop conditions and unresolved prerequisites; defer any spend that is not justified.`;
  const implementation = core
    ? [core.implement]
    : v
      ? [v.implement]
      : moves.map((m) => m.whatToDo);
  const evaluate =
    core?.evaluate ??
    v?.evaluate ??
    `Evaluate the evidence and completed work for ${primary!.title.toLowerCase()} against the agreed criteria; record what remains uncertain and whether the decision should stand.`;
  const ids = moves.map((m) => m.id);
  return [
    {
      week: 1,
      title: "Establish the evidence",
      objective: `Understand ${core?.topic ?? v?.topic ?? primary!.title.toLowerCase()} before making changes.`,
      actions: [
        evidence,
        "Record observed facts, assumptions and missing information.",
      ],
      completionCriteria: core
        ? moves[0].doneWhen
        : "A relevant baseline and its limits are documented before the decision.",
      recommendationIds: core ? [ids[0]] : ids,
    },
    {
      week: 2,
      title: "Choose the improvement",
      objective:
        "Choose a response the evidence and available resources can support.",
      actions: [decision],
      completionCriteria: core
        ? moves[1].doneWhen
        : "A bounded decision records its evidence, owner, resources, success/review criteria and any reason to defer.",
      recommendationIds: core ? [ids[1]] : ids,
    },
    {
      week: 3,
      title: "Complete the agreed work",
      objective:
        "Carry out the agreed improvement, validation or readiness work; a live campaign or website change is not required.",
      actions: implementation,
      completionCriteria: core
        ? moves[2].doneWhen
        : moves.map((m) => m.doneWhen).join(" "),
      recommendationIds: core ? [ids[2]] : ids,
    },
    {
      week: 4,
      title: "Evaluate the completed work",
      objective:
        "Review the work already completed and what you learned before deciding what comes next.",
      actions: [
        evaluate,
        "Compare the completed work with the agreed completion criteria. Record the result, limitations and a keep, refine, defer or stop decision; any further implementation belongs in a later plan.",
      ],
      completionCriteria:
        "A review note evaluates the completed work and records a decision without claiming unsupported performance gains.",
      recommendationIds: ids,
    },
  ];
}
export function createReport(raw: unknown, date = new Date()) {
  const draft = draftSchema.parse(raw);
  const { setup, answers } = draft;
  const diagnosis = resolve(setup, answers);
  const selectedMoves = diagnosis.primary?.actions ?? validationMoves(setup);
  const recommendations = selectedMoves.map((m) => ({
    ...m,
    selectionReason:
      m.selectionReason ??
      `${diagnosis.primary?.questionIds.length ? "Selected from " + diagnosis.primary.questionIds.join(", ") + ". " : ""}${diagnosis.primary?.rationale ?? "Your answers do not identify a specific gap."} This move supports ${m.title.toLowerCase()} within the reported context.`,
    evidenceIds: m.evidenceIds ?? diagnosis.primary?.questionIds ?? [],
    preserveQuestionIds:
      m.preserveQuestionIds ??
      Object.keys(answers).filter((id) => ["A", "B"].includes(answers[id])),
  }));
  const intro = conversationalIntroduction(
    setup,
    answers,
    diagnosis,
    recommendations,
  );
  const trendNote =
    setup.paidStatus === "running"
      ? `You reported advertising returns as “${setup.trend}”. ${setup.trendContext ? `Your recorded context: “${setup.trendContext}”. ` : ""}This is context, not a score or proof of a cause. Check spend, volume, customer quality, margins, seasonality, and conversion delays before interpreting it; improving returns can coexist with shrinking total profit, and declining returns can accompany deliberate expansion.`
      : `You are ${setup.paidStatus === "preparing" ? "preparing to use paid advertising" : "not currently planning paid advertising"}. You explained: “${nonUseReasons[setup.nonUseReason]}”. Your reason and readiness help determine whether to review the current channel choice, prepare foundations or evaluate an optional experiment. ${diagnosis.sectionScores[1] >= 80 && diagnosis.sectionScores[4] >= 80 && diagnosis.sectionScores[6] >= 80 ? "A bounded paid-traffic experiment is optional only after checking offer evidence, affordable acquisition economics, and measurement; it is not required by this report." : "Strengthen the identified foundations before considering advertising spend."}`;
  const weeks = answerPlan(setup, answers, diagnosis.primary, recommendations);
  return structuredClone({
    versions,
    createdAt: date.toISOString(),
    setup,
    answers,
    diagnosis,
    introduction: intro,
    trendNote,
    recommendations,
    thirtyDayPlan: weeks,
    progressMeasures: [
      `${setup.outcome === "leads" ? "Qualified opportunities" : "Purchases"} and customer volume, measured over an agreed period.`,
      setup.outcome === "leads"
        ? "Qualified-lead cost, close rate, customer acquisition cost, and customer value."
        : "Revenue, advertising spend where applicable, relevant costs, customer volume, and contribution.",
      "Completion of the agreed action, a dated evidence log, and unresolved measurement gaps.",
    ],
    workSession: [
      diagnosis.primary
        ? `What evidence supports this opportunity: ${diagnosis.primary.title.toLowerCase()}?`
        : `Which recent example could validate ${strongValidation(setup).topic}?`,
      "What evidence supports this interpretation, and what would change your mind?",
      "Who owns the next decision and how much time can they protect?",
      "Which one hypothesis is worth testing within your resources?",
      "What baseline, budget limit, review date, and stop conditions will you use?",
      "What will you keep, change, or stop after reviewing the evidence?",
    ],
    caveat:
      "This review is based on your answers. Check the findings against your records and customer experience before making decisions; the review does not guarantee a business result.",
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
