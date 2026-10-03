import { Link } from "react-router-dom";
import { CalendarDays, CheckCircle2 } from "lucide-react";

// Replace this placeholder with the scheduling link for this offer before launch.
const strategySprintSchedulingUrl = "STRATEGY_SPRINT_SCHEDULING_URL";
const isSchedulingConfigured = strategySprintSchedulingUrl.startsWith("https://");

const nextSteps = [
  {
    title: "Schedule the sessions",
    copy: "We'll choose three times over the next 30 days that work for both of us.",
  },
  {
    title: "Send context before the first call",
    copy: "Share any links, questions, pages, campaigns, offers, analytics, or other information that will help us use the first session well.",
  },
  {
    title: "Start with the highest-leverage problem",
    copy: "We'll use the first call to clarify what matters most and turn that into concrete next actions.",
  },
];

const purchaseSummary = [
  "3 live strategy sessions",
  "30-day engagement",
  "Recordings + action notes included",
];

export default function CheckoutStrategySprintThankYou() {
  const schedulingButtonClasses = "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-base font-semibold text-white transition sm:w-auto";

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <main className="bg-white">
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-3 py-2">
              <CheckCircle2 aria-hidden="true" className="h-4 w-4 shrink-0 text-green-600" />
              <span className="text-xs font-semibold uppercase tracking-wide text-green-700">Strategy Sprint Confirmed</span>
            </div>
            <h1 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl" data-testid="page-title">
              You're in. Let's make the next 30 days count.
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">
              Thank you for trusting me to work through this with you. The goal is to use these sessions to create clarity, solve the highest-priority problems, and help you move forward faster.
            </p>

            <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-sm sm:p-6">
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">30-Day Growth Strategy Sprint</h2>
              <p className="mt-2 font-semibold text-gray-900">$497 <span className="font-normal text-gray-600">one-time payment</span></p>
              <ul className="mt-4 flex flex-col gap-3 text-sm text-gray-600 sm:flex-row sm:flex-wrap sm:gap-x-6">
                {purchaseSummary.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <section className="mt-10" aria-labelledby="next-steps-title">
              <h2 id="next-steps-title" className="text-2xl font-bold text-gray-900">What happens next</h2>
              <ol className="mt-6 space-y-5">
                {nextSteps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-50 text-sm font-semibold text-green-700">{index + 1}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-gray-600">{step.copy}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                {isSchedulingConfigured ? (
                  <a href={strategySprintSchedulingUrl} target="_blank" rel="noopener noreferrer" className={`${schedulingButtonClasses} hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600`} data-testid="button-schedule-session">
                    <CalendarDays aria-hidden="true" className="h-5 w-5 shrink-0" />
                    Schedule Your First Session
                  </a>
                ) : (
                  <button type="button" disabled aria-describedby="scheduling-status" className={`${schedulingButtonClasses} cursor-not-allowed opacity-60`} data-testid="button-schedule-session">
                    <CalendarDays aria-hidden="true" className="h-5 w-5 shrink-0" />
                    Schedule Your First Session
                  </button>
                )}
                <Link to="/" className="text-center text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline">Back to Clarity Engine</Link>
              </div>
              {!isSchedulingConfigured && (
                <p id="scheduling-status" className="mt-3 text-sm text-gray-500">Online scheduling is not available yet.</p>
              )}
            </section>

            <p className="mt-10 max-w-3xl text-base leading-relaxed text-gray-600">
              I'm excited to work with you. Bring the messy questions, half-finished ideas, and current roadblocks. The point of these sessions is to turn them into clearer decisions and practical next steps.
            </p>
            <p className="mt-8 border-t border-gray-200 pt-6 text-sm leading-relaxed text-gray-500">
              <strong className="font-semibold text-gray-600">First-Session Guarantee:</strong> If you decide within 24 hours after your first session that the engagement is not useful for your business, let me know and I’ll refund the full $497. The guarantee expires after that 24-hour window.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
