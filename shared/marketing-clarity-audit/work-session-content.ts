export interface DecisionPrompt {
  id: string;
  label: string;
  helper?: string;
}
export interface PatternWorkSessionContent {
  primaryThinkingPrompts?: DecisionPrompt[];
  legacyDecisionPrompts?: DecisionPrompt[];
  supportingThinkingPrompts?: DecisionPrompt[];
}
// Retired definitions preserve earlier saved responses. Fresh worksheets use finalDecisionPrompts.
export const patternWorkSessions: Record<string, PatternWorkSessionContent> = {
  P13: {
    legacyDecisionPrompts: [
      {
        id: "p13-decision-0",
        label:
          "What is the single traffic problem you are deciding to solve first?",
      },
      {
        id: "p13-decision-1",
        label: "What evidence supports that diagnosis?",
        helper:
          "Name the specific numbers, patterns, or observations that make you believe this is the problem.",
      },
      {
        id: "p13-decision-2",
        label: "What will you keep unchanged while you test?",
        helper: "Define the current baseline you want to protect.",
      },
      {
        id: "p13-decision-3",
        label: "What one test will you run next?",
        helper:
          "Write the exact hypothesis, audience/channel, budget, and expected result.",
      },
      {
        id: "p13-decision-4",
        label: "What will you intentionally NOT change during this test?",
        helper: "This prevents multiple variables from moving at once.",
      },
      {
        id: "p13-decision-5",
        label: "What KPI will determine whether the test worked?",
        helper:
          "Include the KPI, source of truth, and minimum amount of data/time you need before deciding.",
      },
      {
        id: "p13-decision-6",
        label: "What decision will you make after the test?",
        helper: "Scale, keep, revise, or stop.",
      },
    ],
  },
};

export const finalDecisionPrompts: DecisionPrompt[] = [
  { id: "final-next-action", label: "What will you do next?" },
  {
    id: "final-hold-steady",
    label: "What will you intentionally not change yet?",
  },
  {
    id: "final-success-metric",
    label: "What metric will tell you whether this worked?",
  },
];
export const workSessionIntro =
  "Work through the questions below to understand your primary constraint, decide what you will do next, and define how you will know whether it worked. Your notes save automatically to this private workspace.";
