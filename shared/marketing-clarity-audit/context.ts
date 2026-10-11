import { z } from "zod";

export const businessTypes = [
  "ecommerce",
  "professional_services",
  "local_service",
  "saas_software",
  "education_coaching",
  "travel_hospitality",
  "membership_subscription",
  "nonprofit",
  "other",
] as const;
export const marketingGoals = [
  "purchases",
  "leads",
  "booked_calls",
  "trials_demos",
  "registrations",
  "store_visits",
  "subscribers",
  "other",
] as const;

export const customerContextSchema = z
  .object({
    name: z.string().trim().min(1, "Enter your name").max(200),
    email: z.string().trim().email("Enter a valid email").max(254),
    companyName: z.string().trim().min(1, "Enter your company name").max(200),
    websiteUrl: z
      .string()
      .trim()
      .min(1, "Enter your website URL")
      .max(2048)
      .transform((value) =>
        /^[a-z][a-z\d+.-]*:/i.test(value) ? value : `https://${value}`,
      )
      .refine((value) => {
        try {
          const url = new URL(value);
          return (
            ["http:", "https:"].includes(url.protocol) &&
            /^https?:\/\/[^/]/i.test(value) &&
            !url.username &&
            !url.password &&
            url.hostname.includes(".")
          );
        } catch {
          return false;
        }
      }, "Use an http:// or https:// website URL without credentials"),
    businessType: z.enum(businessTypes),
    primaryMarketingGoal: z.enum(marketingGoals),
  })
  .strict();

export type CustomerContext = z.infer<typeof customerContextSchema>;
