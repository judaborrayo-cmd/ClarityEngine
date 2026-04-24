import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CheckCheck,
  ClipboardList,
  FileText,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

const onboardingCallUrl =
  "https://calendly.com/juda-borrayo/deep-dive-audit-onboarding-call";
const prepDocumentUrl =
  "https://docs.google.com/document/d/1CTqY208yMGIIgDKz3fmxDtIVZeCZT_Lh/edit?usp=sharing&ouid=107174069229096384110&rtpof=true&sd=true";

const whyItMatters = [
  "Confirm access before the audit clock starts",
  "Align the review around your actual business goals",
  "Prioritize the highest-impact growth opportunities first",
];

const timelineSteps = [
  {
    step: "01",
    title: "Book your onboarding call",
    copy:
      "We’ll confirm your goals, access needs, funnel structure, and priority questions so the audit starts with the right context.",
    icon: CalendarDays,
    accent: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    step: "02",
    title: "Share access and prep details",
    copy:
      "You’ll provide read-level access to the relevant ad, analytics, CRM, tracking, and funnel platforms. This helps avoid delays and gives the audit a stronger data foundation.",
    icon: FileText,
    accent: "bg-violet-50 text-violet-600 border-violet-100",
  },
  {
    step: "03",
    title: "Receive your audit and walkthrough",
    copy:
      "You’ll receive a written audit, prioritized 30-day roadmap, and a 60-minute walkthrough focused on what to fix, what to test, and what to do next.",
    icon: Target,
    accent: "bg-slate-100 text-slate-700 border-slate-200",
  },
];

const checklistItems = [
  "Share read-level access before the call when possible",
  "List your top 3 business goals or growth priorities",
  "Share any tracking, attribution, or reporting issues you already know about",
  "Bring the questions you most want answered during the walkthrough",
];

const purchaseSummary = [
  "Deep Dive Audit purchased: $1,250",
  "60-minute walkthrough included",
  "$600 credited if we work together",
  "Delivery timeline begins after proper read access is confirmed",
];

const prepCards = [
  {
    title: "Access first",
    copy: "Share read-level access before the call when possible.",
  },
  {
    title: "Goals next",
    copy: "List your top 3 business goals or growth priorities.",
  },
  {
    title: "Known issues",
    copy: "Share any tracking, attribution, or reporting issues you already know about.",
  },
  {
    title: "Priority questions",
    copy: "Bring the questions you most want answered during the walkthrough.",
  },
];

export default function CheckoutAuditThankYou() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <main className="relative overflow-hidden bg-white">
        <div className="absolute left-1/2 top-0 h-[520px] w-[1200px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.12),transparent_38%),radial-gradient(circle_at_65%_20%,rgba(124,58,237,0.14),transparent_30%)]" />

        <section className="relative py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              to="/"
              className="mb-6 inline-block text-sm text-gray-600 transition hover:text-gray-900"
              data-testid="link-back-home"
            >
              ← Back to Home
            </Link>

            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_90px_-50px_rgba(15,23,42,0.45)]">
              <div className="grid lg:grid-cols-[minmax(0,1.15fr)_420px]">
                <div className="relative overflow-hidden bg-[linear-gradient(135deg,#f7f5ff_0%,#ffffff_42%,#effcf4_100%)] px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
                  <div className="absolute inset-y-0 right-0 hidden w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent lg:block" />

                  <div className="inline-flex items-center gap-3 rounded-full border border-emerald-200 bg-white/90 px-4 py-2 shadow-sm">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                      Deep Dive Audit Confirmed
                    </span>
                  </div>

                  <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_280px] xl:items-end">
                    <div className="max-w-3xl">
                      <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
                        <CheckCheck className="h-8 w-8 text-emerald-600" />
                      </div>

                      <h1
                        className="mt-6 max-w-3xl text-4xl font-bold leading-tight text-slate-900 sm:text-5xl"
                        data-testid="page-title"
                      >
                        Your Deep Dive Audit is confirmed. Here&apos;s how we make it count.
                      </h1>
                      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
                        You&apos;ve completed the purchase. The next step is to book your onboarding
                        call and review the prep document so we can gather the right access,
                        context, goals, and priority questions before the audit begins.
                      </p>

                      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <a
                          href={onboardingCallUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
                        >
                          Book Your Onboarding Call
                          <ArrowRight className="h-4 w-4" />
                        </a>
                        <a
                          href={prepDocumentUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                        >
                          <FileText className="h-4 w-4 text-violet-600" />
                          Review the Audit Prep Document
                        </a>
                      </div>
                    </div>

                    <div className="rounded-[1.75rem] border border-white/80 bg-white/85 p-5 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.35)] backdrop-blur">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Command Center
                      </p>

                      <div className="mt-4 space-y-3">
                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                          <div className="flex items-center gap-3">
                            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white">
                              <CalendarDays className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-slate-900">
                                Primary next action
                              </div>
                              <div className="text-sm text-slate-600">Book onboarding call</div>
                            </div>
                          </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                          <div className="rounded-2xl border border-violet-100 bg-violet-50 p-4">
                            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-700">
                              Prep
                            </div>
                            <div className="mt-2 text-sm font-medium text-slate-900">
                              Review the audit prep document
                            </div>
                          </div>
                          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                              Delivery
                            </div>
                            <div className="mt-2 text-sm font-medium text-slate-900">
                              Timeline starts after access is confirmed
                            </div>
                          </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-slate-900">
                              Audit workflow
                            </span>
                            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                              In motion
                            </span>
                          </div>
                          <div className="mt-4 space-y-3">
                            {timelineSteps.map((step, index) => {
                              const Icon = step.icon;

                              return (
                                <div key={step.title} className="flex items-start gap-3">
                                  <div className="flex flex-col items-center">
                                    <div
                                      className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl border ${step.accent}`}
                                    >
                                      <Icon className="h-4 w-4" />
                                    </div>
                                    {index < timelineSteps.length - 1 ? (
                                      <div className="mt-2 h-8 w-px bg-gradient-to-b from-slate-300 to-transparent" />
                                    ) : null}
                                  </div>
                                  <div className="pt-1">
                                    <div className="text-sm font-semibold text-slate-900">
                                      {step.title}
                                    </div>
                                    <div className="mt-1 text-xs leading-relaxed text-slate-500">
                                      {step.step}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <aside className="bg-slate-950 px-6 py-8 text-white sm:px-8 sm:py-10 lg:px-8 lg:py-12">
                  <div className="flex h-full flex-col">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                      <Sparkles className="h-5 w-5 text-emerald-300" />
                    </div>
                    <h2 className="mt-5 text-2xl font-bold">Your next best step</h2>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      Book your onboarding call now so we can confirm access, review your goals,
                      and begin the audit process as smoothly as possible.
                    </p>

                    <div className="mt-6 flex flex-col gap-3">
                      <a
                        href={onboardingCallUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-2xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                      >
                        Book Onboarding Call
                      </a>
                      <a
                        href={prepDocumentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                      >
                        Review the Audit Prep Document
                      </a>
                    </div>

                    <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Purchase Summary
                      </p>
                      <div className="mt-4 space-y-3">
                        {purchaseSummary.map((item) => (
                          <div key={item} className="flex items-start gap-3">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                            <span className="text-sm text-slate-200">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 rounded-[1.5rem] border border-emerald-500/20 bg-emerald-500/10 p-5">
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                        <p className="text-sm leading-relaxed text-slate-100">
                          Booking now helps us use the onboarding call for strategy and funnel
                          diagnosis, not just admin and access collection.
                        </p>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
              <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-[0_24px_60px_-40px_rgba(15,23,42,0.8)] sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Why this step matters
                </p>
                <h2 className="mt-4 text-3xl font-bold leading-tight">
                  Strong prep makes the audit more useful, faster.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  The more context we have before the onboarding call, the more useful the audit
                  becomes. Instead of spending the session only collecting access, we can use it to
                  understand your goals, identify bottlenecks, review your funnel, and focus the
                  audit on the highest-leverage opportunities.
                </p>

                <div className="mt-6 space-y-3">
                  {whyItMatters.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 sm:p-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">
                      What happens next
                    </p>
                    <h2 className="mt-2 text-3xl font-bold text-slate-900">
                      The audit process, step by step
                    </h2>
                  </div>
                  <p className="max-w-md text-sm leading-relaxed text-slate-600">
                    This is meant to feel simple: book the call, share context, and we take it
                    from there.
                  </p>
                </div>

                <div className="mt-8 grid gap-4">
                  {timelineSteps.map((step) => {
                    const Icon = step.icon;

                    return (
                      <div
                        key={step.title}
                        className="grid gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[80px_minmax(0,1fr)] md:items-start"
                      >
                        <div className="flex items-center gap-3 md:block">
                          <div className="text-3xl font-bold tracking-tight text-slate-200">
                            {step.step}
                          </div>
                          <div
                            className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${step.accent}`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-slate-600">
                            {step.copy}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">
                  How to get the most value from your audit
                </p>
                <h2 className="mt-3 text-3xl font-bold text-slate-900">
                  Come prepared without feeling overwhelmed
                </h2>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {prepCards.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-[1.5rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#fafafa_100%)] p-5 shadow-sm"
                    >
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50">
                        <ClipboardList className="h-4 w-4 text-emerald-600" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.copy}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-emerald-200 bg-[linear-gradient(180deg,#f2fff6_0%,#ffffff_100%)] p-6 shadow-sm sm:p-8">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <Target className="h-5 w-5 text-emerald-600" />
                </div>
                <h2 className="mt-4 text-2xl font-bold text-slate-900">Start strong</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  The goal is simple: get the right context in place so the audit can focus on
                  diagnosis, priorities, and what to do next.
                </p>

                <div className="mt-6 space-y-3">
                  {checklistItems.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-white px-4 py-3"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <span className="text-sm leading-relaxed text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-[2rem] bg-[linear-gradient(135deg,#0f172a_0%,#1e1b4b_55%,#14532d_100%)] px-6 py-8 text-white shadow-[0_30px_90px_-45px_rgba(15,23,42,0.8)] sm:px-8 sm:py-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                    Ready to get started?
                  </p>
                  <h2 className="mt-3 text-3xl font-bold">Ready to get started?</h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-200 sm:text-base">
                    Book your onboarding call and review the prep document so we can move from
                    purchase to analysis as quickly as possible.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href={onboardingCallUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-2xl bg-green-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-green-700"
                  >
                    Book Your Onboarding Call
                  </a>
                  <a
                    href={prepDocumentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Review Prep Document
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
