import { Link } from "react-router-dom";
import { CheckCircle2, CalendarDays, ClipboardList, Mail } from "lucide-react";

export default function CheckoutAuditThankYou() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <main className="relative">
        <section className="bg-white py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Link
              to="/"
              className="mb-6 inline-block text-sm text-gray-600 hover:text-gray-900"
              data-testid="link-back-home"
            >
              ← Back to Home
            </Link>

            <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-violet-50 via-white to-emerald-50 p-8 shadow-sm sm:p-10">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_320px] lg:items-start">
                <div className="max-w-3xl">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>

                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">
                    Deep Dive Audit
                  </p>
                  <h1
                    className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl"
                    data-testid="page-title"
                  >
                    Thank you. Your audit order is in.
                  </h1>
                  <p className="mt-4 text-lg leading-relaxed text-gray-600">
                    We’ve got your request and the next step is simple: once proper read access
                    to key platforms is in place, we’ll begin your Deep Dive Audit and move
                    toward your walkthrough delivery window.
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
                  <p className="text-sm font-semibold text-gray-900">Audit Summary</p>
                  <div className="mt-2 text-3xl font-bold text-gray-900">$1,250</div>
                  <p className="mt-1 text-sm text-gray-600">Deep Dive Audit purchase received</p>
                  <div className="mt-5 space-y-3 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                      <span>60-minute walkthrough included</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                      <span>$600 credit available if we work together</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                      <span>Delivered within 14 business days after proper read access</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">What happens next</h2>
                <div className="mt-6 space-y-5">
                  <div className="flex gap-4">
                    <div className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50">
                      <ClipboardList className="h-5 w-5 text-violet-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">1. Onboarding + access review</h3>
                      <p className="mt-1 text-sm leading-relaxed text-gray-600">
                        You’ll share the core context, goals, and proper read access to the ad,
                        analytics, and tracking platforms we need to review.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                      <CalendarDays className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">2. Audit review window begins</h3>
                      <p className="mt-1 text-sm leading-relaxed text-gray-600">
                        Once access is confirmed, the 14-business-day delivery window starts and
                        we begin reviewing account structure, tracking, funnel behavior, and ROI
                        opportunities.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">3. Written audit + walkthrough</h3>
                      <p className="mt-1 text-sm leading-relaxed text-gray-600">
                        You’ll receive your written findings, prioritized roadmap, and a live
                        walkthrough session so the next moves are clear and actionable.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900">Helpful while you wait</h2>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    If you want to speed things up, have these ready: platform access, your main
                    revenue goal, recent performance notes, and any questions you definitely want
                    covered in the walkthrough.
                  </p>

                  <div className="mt-6 space-y-3 text-sm text-gray-700">
                    <div className="rounded-xl bg-white p-4 ring-1 ring-black/5">
                      Google Ads / Meta / YouTube read access
                    </div>
                    <div className="rounded-xl bg-white p-4 ring-1 ring-black/5">
                      GA4, CRM, or booking funnel context
                    </div>
                    <div className="rounded-xl bg-white p-4 ring-1 ring-black/5">
                      Current goals, bottlenecks, and priority questions
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <a
                      href="/#book-intro"
                      className="inline-flex items-center justify-center rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                    >
                      Book a Deep Dive Audit Onboarding Call
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
        </section>
      </main>
    </div>
  );
}
