import { z } from "zod";
import { customerContextSchema } from "../context";
export const marketingGoals = [
  "purchases",
  "leads",
  "qualified_opportunities",
  "demos",
  "trials",
  "booked_calls",
  "registrations",
  "store_visits",
  "subscribers",
  "other",
] as const;
export type BusinessGoal = (typeof marketingGoals)[number];
export const goalsSchema = z
  .array(z.enum(marketingGoals))
  .min(1, "Choose at least one business goal.")
  .max(marketingGoals.length)
  .refine((g) => new Set(g).size === g.length, "Choose each goal only once.");
export const goalLabels: Record<BusinessGoal, string> = {
  purchases: "Purchases",
  leads: "Leads / inquiries",
  qualified_opportunities: "Qualified opportunities",
  demos: "Demos",
  trials: "Trials / account signups",
  booked_calls: "Booked calls",
  registrations: "Registrations",
  store_visits: "Store visits",
  subscribers: "Subscribers",
  other: "Another business outcome",
};
export const goalMetrics: Record<BusinessGoal, string> = {
  purchases:
    "Completed purchases, order value and contribution after relevant costs",
  leads:
    "New leads or inquiries, response time and cost per inquiry; qualification is a separate check",
  qualified_opportunities:
    "Opportunities meeting explicit fit and intent criteria, progression and cost per qualified opportunity",
  demos:
    "Requested and attended demos, useful participation and cost per attended demo",
  trials:
    "Trial starts or account signups, activation and cost per activated account",
  booked_calls:
    "Booked calls, attendance and useful next steps, with booking and attendance counted separately",
  registrations:
    "Completed registrations, attendance or participation where relevant, and cost per useful registration",
  store_visits:
    "Store visits, visit measurement limits and cost per meaningful visit",
  subscribers:
    "New subscribers, permission and relevant engagement; cost per engaged subscriber",
  other:
    "Define the intended outcome, what counts as a valuable completion, a source and an affordable resource limit before choosing a numeric target",
};
export const goalChecks: Record<BusinessGoal, string> = {
  purchases:
    "Trace a completed order to the payment or order record; account for refunds, fulfillment costs and margin.",
  leads:
    "Trace an inquiry to its contact record and response. Do not assume every inquiry is qualified or becomes a customer.",
  qualified_opportunities:
    "Check a sample against written fit and intent criteria and record how consistently those criteria are applied.",
  demos:
    "Separate demo requests from attendance and check whether attendees reached the intended useful next step.",
  trials:
    "Separate account creation from activation and check the time allowed to experience useful product value.",
  booked_calls:
    "Compare bookings with attended calls and the next useful action, allowing for cancellations and no-shows.",
  registrations:
    "Check that the registration is complete and useful for its intended purpose; distinguish registration from later participation.",
  store_visits:
    "Choose a feasible way to identify a visit and record duplicates, attribution limits and any use of estimates.",
  subscribers:
    "Check permission, genuine subscriptions and useful engagement rather than treating list size alone as success.",
  other:
    "Name the intended business outcome and decide what a useful completion means. Until that is clear, use an evidence review and avoid assuming a sales or lead funnel.",
};
export function selectedGoalLabels(setup: { outcome: BusinessGoal[] }) {
  return (setup.outcome ?? []).map((g) => goalLabels[g]).join(", ");
}
export function goalEvidence(setup: { outcome: BusinessGoal[] }) {
  return (setup.outcome ?? [])
    .map((g) => `${goalLabels[g]}: ${goalChecks[g]}`)
    .join(" ");
}
export function goalMeasures(setup: { outcome: BusinessGoal[] }) {
  return (setup.outcome ?? [])
    .map((g) => `${goalLabels[g]}: ${goalMetrics[g]}`)
    .join("; ");
}
export const customerContextGoalsSchema = customerContextSchema
  .omit({ primaryMarketingGoal: true })
  .extend({ marketingGoals: goalsSchema.optional() })
  .strict();
