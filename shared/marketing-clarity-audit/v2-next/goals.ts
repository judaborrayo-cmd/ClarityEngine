import { z } from "zod";
import { marketingGoals, customerContextSchema } from "../context";
export const goalsSchema = z
  .array(z.enum(marketingGoals))
  .min(1, "Choose at least one business goal.")
  .max(marketingGoals.length)
  .refine((g) => new Set(g).size === g.length, "Choose each goal only once.");
export type BusinessGoal = (typeof marketingGoals)[number];
export const goalLabels: Record<BusinessGoal, string> = {
  purchases: "Purchases",
  leads: "Qualified leads",
  booked_calls: "Booked calls",
  trials_demos: "Trials or demos",
  registrations: "Registrations",
  store_visits: "Store visits",
  subscribers: "Subscribers",
  other: "Another business outcome",
};
export const goalMetrics: Record<BusinessGoal, string> = {
  purchases: "Purchases, customer value and contribution after relevant costs",
  leads: "Qualified leads, close rate and cost per qualified lead",
  booked_calls: "Qualified booked calls, attendance and resulting customers",
  trials_demos: "Qualified trials or demos and the share that become customers",
  registrations:
    "Relevant completed registrations and the next useful customer action",
  store_visits:
    "Meaningful store visits and resulting sales, with measurement limits recorded",
  subscribers: "Relevant subscribers, engagement and downstream customer value",
  other:
    "A clearly named business outcome, its definition and a trustworthy source",
};
export function goalFocus(setup: { outcome: BusinessGoal[] }) {
  const goals = setup.outcome ?? [];
  const purchases = goals.includes("purchases"),
    leads = goals.some((g) =>
      ["leads", "booked_calls", "trials_demos"].includes(g),
    );
  return purchases && leads
    ? "mixed"
    : leads
      ? "leads"
      : purchases
        ? "purchases"
        : "other";
}
export function goalText(
  setup: { outcome: BusinessGoal[] },
  leads: string,
  purchases: string,
) {
  const focus = goalFocus(setup);
  return focus === "mixed"
    ? `${purchases}; separately, ${leads}`
    : focus === "leads"
      ? leads
      : focus === "purchases"
        ? purchases
        : "the business outcomes you selected";
}
// V5 moves the one business-goal question into Offer; identity collection does not ask it again.
export const customerContextNextSchema = customerContextSchema
  .omit({ primaryMarketingGoal: true })
  .extend({ marketingGoals: goalsSchema.optional() })
  .strict();
