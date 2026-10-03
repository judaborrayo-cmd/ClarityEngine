import { Link } from "react-router-dom";
import { CheckCircle2, ShieldCheck } from "lucide-react";

const strategySprintCheckoutUrl = "https://buy.stripe.com/dRmcN5eeygbFfkh8Sj8IU01";

const benefits = [
  {
    title: "Three Live Strategy Sessions",
    copy: "Three focused sessions over 30 days, typically 60–120 minutes depending on the topic, availability, and what we are working through.",
  },
  {
    title: "Live Business & Growth Diagnosis",
    copy: "We can review your offer, messaging, funnel, website, customer journey, lead generation, Google Ads or Meta Ads readiness, and analytics to identify opportunities and drop-off points.",
  },
  {
    title: "Hands-On Problem Solving",
    copy: "Bring current roadblocks, decisions, drafts, campaigns, pages, or ideas. Juda works through them alongside you during the session, including implementation issues, AI workflows, or researching options when helpful.",
  },
  {
    title: "Flexible Strategic Focus",
    copy: "There is no rigid curriculum. Each session centers on the highest-value issue for your business at that point, adapting as you make progress.",
  },
  {
    title: "Recordings + Action Notes",
    copy: "Live video sessions can be recorded for you, with AI-assisted summaries and action items to make follow-through easier.",
  },
];

const purchaseHighlights = [
  "3 live strategy sessions over 30 days",
  "Flexible focus based on your current priorities",
  "Session recordings and action notes",
  "No recurring subscription",
];

export default function CheckoutStrategySprint() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <main className="relative">
        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Link to="/" className="mb-6 inline-block text-sm text-gray-600 hover:text-gray-900" data-testid="link-back-home">
              ← Back to Home
            </Link>
            <p className="mb-3 text-sm font-semibold text-green-700">30-Day Growth Strategy Sprint</p>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl" data-testid="page-title">
              Get clear on what matters next — and move faster.
            </h1>
            <p className="mt-4 text-lg text-gray-600 sm:text-xl">
              Three live strategy sessions over 30 days to help you solve growth problems, sharpen your offer and funnel, and make stronger decisions with experienced guidance.
            </p>

            <div className="mt-10 grid gap-8 md:grid-cols-2 sm:mt-12">
              <div className="min-w-0">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">What's Included</h2>
                <div className="space-y-4">
                  {benefits.map((benefit) => (
                    <div key={benefit.title} className="flex gap-3">
                      <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                        <p className="text-sm leading-relaxed text-gray-600">{benefit.copy}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-lg border border-green-100 bg-green-50 p-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck aria-hidden="true" className="h-5 w-5 shrink-0 text-green-600" />
                    <h3 className="text-sm font-semibold text-gray-900">First-Session Guarantee</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    If you decide within 24 hours after your first session that the engagement is not useful for your business, let me know and I’ll refund the full $497.
                  </p>
                  <p className="mt-2 text-xs text-gray-500">The guarantee expires after that 24-hour window.</p>
                </div>

                <p className="mt-6 text-sm leading-relaxed text-gray-600">
                  This is strategic advisory and live problem-solving to help you build clarity, make better decisions, and execute more effectively. Ongoing done-for-you execution, campaign management, website development, and media buying outside the sessions are separate services, available only if separately agreed. This engagement is not a managed-services retainer.
                </p>
              </div>

              <div className="min-w-0">
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-sm sm:p-6">
                  <h2 className="mb-2 text-2xl font-bold text-gray-900">30-Day Growth Strategy Sprint</h2>
                  <div className="mb-1 text-4xl font-bold text-gray-900">$497</div>
                  <p className="mb-6 text-sm text-gray-600">One-time payment</p>
                  <ul className="mb-6 space-y-3 text-sm text-gray-600">
                    {purchaseHighlights.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mb-4 rounded-xl bg-white p-4">
                    <p className="text-sm leading-relaxed text-gray-600">
                      <strong>Next Steps:</strong> After purchase, we'll choose the three session times that work best over the next 30 days and identify the highest-priority topics for the first call. Each session is designed to end with clear next actions.
                    </p>
                  </div>
                  <a
                    href={strategySprintCheckoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-green-600 px-4 py-3 text-base font-semibold text-white transition hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    data-testid="button-proceed-checkout"
                  >
                    Proceed to Checkout
                  </a>
                  <p className="mt-3 text-center text-xs text-gray-500">Secure payment processing via Stripe</p>
                  <div className="mt-6 border-t border-gray-200 pt-6">
                    <p className="text-center text-xs text-gray-600">
                      Questions before getting started? <a href="/#book-call" className="font-medium text-black hover:underline">Book a call</a> first.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
