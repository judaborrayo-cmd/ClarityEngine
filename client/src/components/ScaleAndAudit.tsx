import "./scale-and-audit.css";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import ServiceOptionVideo from "./ServiceOptionVideo";
import FounderHeroVideo from "./founder-hero-video";

/** Compact month-by-month roadmap with color accents */
function MonthRoadmap() {
  const [openMonth, setOpenMonth] = useState<number | null>(null);
  const roadmapId = useId();
  const rows = [
    {
      m: "Month 1 — Discover & Diagnose",
      pts: [
        "Kickoff, goals, KPIs, constraints",
        "Tracking/GTM/GA4 sanity check & fixes",
        "Account audit + quick-win experiments",
        "Offer & creative hypothesis backlog",
      ],
      dot: "bg-purple-600",
      border: "border-purple-200",
    },
    {
      m: "Month 2 — Design & Deploy",
      pts: [
        "New creatives/angles → launch sets",
        "Signals & audience consolidation",
        "Landing-page CRO fixes & speed passes",
        "Budget reallocation toward early winners",
      ],
      dot: "bg-green-600",
      border: "border-green-200",
    },
    {
      m: "Month 3+ — Drive & Scale",
      pts: [
        "Iterate winners, cut losers",
        "Bidding/delivery tuning, LTV cohorts",
        "Weekly testing cadence",
        "Add channels/offers while protecting ROAS",
      ],
      dot: "bg-indigo-600",
      border: "border-indigo-200",
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <h3 className="text-base font-semibold text-gray-900 mb-1">How We Scale in 90 Days</h3>
      <div className="text-[13px] text-gray-600 mb-3">
        A simple month-by-month plan we adapt to your brand.
      </div>

      <ul className="space-y-3">
        {rows.map((r, index) => {
          const isOpen = openMonth === index;
          const triggerId = `${roadmapId}-month-${index}-trigger`;
          const panelId = `${roadmapId}-month-${index}-panel`;
          return (
            <li key={r.m} className={`overflow-hidden rounded-xl border ${r.border} ${isOpen ? "bg-gray-50" : "bg-white"}`}>
              <h4>
                <button
                  type="button"
                  id={triggerId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenMonth(isOpen ? null : index)}
                  className="flex min-h-[76px] w-full items-center gap-3 p-4 text-left hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-purple-600"
                >
                  <span aria-hidden="true" className={`h-2.5 w-2.5 shrink-0 rounded-full ${r.dot}`} />
                  <span className="flex-1 text-[15px] font-semibold leading-snug text-gray-900">{r.m}</span>
                  <ChevronDown aria-hidden="true" className={`h-5 w-5 shrink-0 text-gray-500 transition-transform motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`} />
                </button>
              </h4>
              <div id={panelId} role="region" aria-labelledby={triggerId} hidden={!isOpen}>
                <ul className="grid gap-2 px-4 pb-5 pl-[38px] text-[13px] leading-relaxed text-gray-700">
                  {r.pts.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Full-width, horizontal audit checklist with expandable tiles */
function TeardownGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items: Array<{ title: string; desc: string }> = [
    { title: "Tracking & Attribution", desc: "Pixels, CAPI, GTM, events, GA4 hygiene and deduping." },
    { title: "Account Structure", desc: "Objectives, naming, signal quality, consolidation for learning." },
    { title: "Audiences & Exclusions", desc: "Signals by stage, overlap control, remarketing tiers." },
    { title: "Creative Diagnostics", desc: "Hooks, formats, thumb-stop rate, offer/angle effectiveness." },
    { title: "Competitor Research", desc: "Spy tools, positioning gaps, ad-angle library & white space." },
    { title: "Bidding & Delivery", desc: "Bids/caps, optimization events, placements, learning phase." },
    { title: "Landing Pages & CRO", desc: "Speed, clarity, proof, CTAs, forms, UX frictions." },
    { title: "Measurement & Benchmarks", desc: "Targets, cohorts, blended views, rolling trendlines." },
    { title: "Quick Wins & 90-Day Plan", desc: "Prioritized roadmap with owners, deadlines, and KPIs." },
  ];

  return (
    <section className="mt-6 audit-checklist-section" aria-labelledby="audit-checklist-title">
      <div className="audit-checklist-layout">
        <div className="audit-checklist-visual"><img src="/images/audit-checklist-blueprint.webp" alt="A blueprint checklist becoming a finished clipboard with emerald check marks, showing audit findings taking shape" width="1024" height="1280" loading="lazy"/></div>
        <div className="audit-checklist-content">
        <h3 id="audit-checklist-title" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Audit Teardown <span className="text-purple-700">(What We Check)</span></h3>
        <div className="text-[13px] text-gray-600 mb-3">
          The core areas we evaluate to unlock fast wins and guide your 90-day plan.
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {items.map(({ title, desc }, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={title}
                className="rounded-xl border border-gray-200 hover:border-purple-300 bg-white hover:shadow-md transition-all"
                data-testid={`accordion-${title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left cursor-pointer p-3"
                  aria-expanded={isOpen}
                  data-testid={`button-${title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-sm font-medium text-gray-900">{title}</div>
                    <ChevronDown 
                      className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 mt-0.5 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-3 pb-3 text-[12px] text-gray-700">{desc}</div>
                )}
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </section>
  );
}

export default function ScaleAndAudit() {
  return (
    <section className="container mx-auto px-4 py-6" aria-label="Scale in 90 Days">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">How We Scale Paid Media in 90 Days</h2>
      <p className="text-gray-600 mb-6">
        Discovery → Diagnose → Design → Drive — applied through a month-by-month plan.
      </p>

      {/* Top row: visual + roadmap (balanced) */}
      <div className="grid lg:grid-cols-3 gap-6 items-start">
        {/* Image (2 columns) */}
        <div className="lg:col-span-2">
          <div className="relative w-full overflow-hidden rounded-2xl shadow-sm border border-gray-200">
            <div className="growth-roadmap-mobile"><ServiceOptionVideo name="growth-roadmap-mobile" label="growth chart, Pilates exercise, and presenter" /><p>Illustrative dashboard; 8x is an example, not a promised result.</p></div><div className="relative hidden lg:block aspect-[16/9] w-full bg-white">
              <FounderHeroVideo
                variant="roadmap"
                src="/videos/from-insight-to-scale-chart-motion.mp4"
                poster="/videos/from-insight-to-scale-chart-motion-poster.webp"
                width={1916}
                height={1080}
                description="From Insight to Scale: illustrative growth chart and dashboard. Illustrative growth, not a promised result."
                controlLabel="illustrative growth roadmap"
              />
            </div>
          </div>

          {/* Primary CTA strip */}
          <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-4 sm:flex sm:items-center sm:justify-between">
            <div className="text-sm">
              <div className="font-semibold text-base text-gray-900">
                A lot can change in 90 days.
              </div>
              <div className="text-gray-600 text-sm leading-relaxed mt-1">
                Find out what’s working, what needs improvement, where opportunities exist, and how competitors approach your market. Get strategic findings, a prioritized 90-day roadmap, and a personal walkthrough.
              </div>
            </div>
            <Link
              to="/growth-clarity-audit"
              className="mt-3 sm:mt-0 inline-flex items-center justify-center rounded-xl bg-green-500 text-white hover:bg-green-600 text-sm py-2 px-4 font-medium"
              data-testid="button-scale-audit-order"
            >
              Explore the Deep Dive Growth Audit
            </Link>
          </div>
        </div>

        {/* Roadmap card (right column) */}
        <MonthRoadmap />
      </div>

      {/* Bottom row: full-width horizontal audit grid */}
      <TeardownGrid />
    </section>
  );
}
