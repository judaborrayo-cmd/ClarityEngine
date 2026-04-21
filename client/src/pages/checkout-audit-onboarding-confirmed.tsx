import { Link } from "react-router-dom";
import { CalendarCheck2, CheckCircle2, ClipboardList } from "lucide-react";

const accessDocUrl =
  "https://docs.google.com/document/d/1CTqY208yMGIIgDKz3fmxDtIVZeCZT_Lh/edit?usp=sharing&ouid=107174069229096384110&rtpof=true&sd=true";

export default function CheckoutAuditOnboardingConfirmed() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <main className="relative">
        <section className="bg-white py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Link
              to="/"
              className="mb-6 inline-block text-sm text-gray-600 hover:text-gray-900"
              data-testid="link-back-home"
            >
              ← Back to Home
            </Link>

            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
              <div className="max-w-3xl">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 shadow-sm ring-1 ring-black/5">
                  <CalendarCheck2 className="h-8 w-8 text-green-600" />
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">
                  Deep Dive Audit
                </p>
                <h1
                  className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl"
                  data-testid="page-title"
                >
                  Your onboarding call is booked.
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-gray-600">
                  Thank you. Your Deep Dive Audit onboarding call has been scheduled.
                </p>
              </div>

              <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_0.85fr]">
                <div>
                  <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-violet-50 via-white to-emerald-50 p-6">
                    <h2 className="text-xl font-bold text-gray-900">What happens next</h2>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">
                      We’ll meet at the scheduled time and use the call to confirm goals, context,
                      and access. If anything is still outstanding, that is completely fine. We can
                      walk through it together during the call.
                    </p>
                  </div>

                  <div className="mt-6">
                    <h2 className="text-xl font-bold text-gray-900">What to prepare</h2>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">
                      Before the call, please review the onboarding and access document and begin
                      preparing any relevant read or analysis-level access, business context, and
                      priority questions.
                    </p>

                    <div className="mt-5 space-y-3">
                      {[
                        "Google Ads / Meta / YouTube access",
                        "GA4, CRM, tracking, or funnel context",
                        "Current goals, bottlenecks, and questions",
                        "Any recent performance notes or issues you want reviewed",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white ring-1 ring-black/5">
                      <ClipboardList className="h-5 w-5 text-violet-600" />
                    </div>
                    <h2 className="mt-4 text-xl font-bold text-gray-900">Key links</h2>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">
                      The access document shows exactly what will be requested so you can prepare
                      ahead of time and make the onboarding call as productive as possible.
                    </p>

                    <div className="mt-6 flex flex-col gap-3">
                      <a
                        href={accessDocUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                      >
                        Review Access Document
                      </a>
                      <Link
                        to="/"
                        className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
                      >
                        Return to Homepage
                      </Link>
                    </div>
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
