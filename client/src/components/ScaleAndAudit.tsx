import { Link } from "react-router-dom";

function StepGraphic() {
  const steps = [
    { k: "Discover", d: "Market, offer, numbers." },
    { k: "Diagnose", d: "Gaps, constraints, quick wins." },
    { k: "Design", d: "Creatives, audiences, funnel plan." },
    { k: "Drive", d: "Launch, optimize, scale." },
  ];
  return (
    <div className="px-2 py-3">
      <div className="relative">
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200" />
        <div className="grid grid-cols-4 gap-2">
          {steps.map((s, i) => (
            <div key={s.k} className="relative text-center">
              <div className="mx-auto w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center font-semibold text-[11px]">
                {i + 1}
              </div>
              <div className="mt-2 text-[12px] font-semibold text-gray-900">
                {s.k}
              </div>
              <div className="text-[11px] text-gray-600">{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TeardownList() {
  const items = [
    ["Tracking & Attribution", "Pixels, Conversions API, GTM, events, GA4"],
    ["Account Structure", "Naming, objectives, signal quality"],
    ["Budget & Pacing", "Spend allocation, learning stability"],
    ["Audiences & Exclusions", "Signals, stages, overlap control"],
    ["Creative Diagnostics", "Hooks, formats, thumb-stop, offer angle"],
    ["Bidding & Delivery", "Caps, optimization events, placements"],
    ["Landing Pages & CRO", "Speed, clarity, proof, CTAs, UX frictions"],
    ["Measurement & Benchmarks", "KPIs, cohort trends, targets"],
    ["Quick Wins & 90-Day Plan", "Prioritized roadmap with owners"],
  ];
  return (
    <ul className="text-sm text-gray-700 divide-y divide-gray-200 rounded-lg border border-gray-100">
      {items.map(([title, sub]) => (
        <li key={title} className="py-2 px-3">
          <div className="font-medium text-gray-900">{title}</div>
          <div className="text-[12px] text-gray-600">{sub}</div>
        </li>
      ))}
    </ul>
  );
}

interface ScaleAndAuditProps {
  videoUrl?: string;
}

export default function ScaleAndAudit({
  videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ",
}: ScaleAndAuditProps) {
  return (
    <section className="container mx-auto px-4 py-12" aria-label="Scale in 90 Days">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">How We Scale Paid Media in 90 Days</h2>
      <p className="text-gray-600 mb-6">
        A simple, repeatable system to go from discovery → diagnose → design → drive.
      </p>

      <div className="grid lg:grid-cols-3 gap-6 items-start">
        {/* Video (spans 2 columns on desktop) */}
        <div className="lg:col-span-2">
          <div className="relative w-full overflow-hidden rounded-2xl shadow-sm border border-gray-200">
            <div className="w-full h-0 pb-[56.25%] relative">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={videoUrl}
                title="How We Scale in 90 Days"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Primary CTA strip (below video) */}
          <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-4 sm:flex sm:items-center sm:justify-between">
            <div className="text-sm">
              <div className="font-semibold text-gray-900">
                Get an Actionable Roadmap in 2–3 Weeks
              </div>
              <div className="text-gray-600 text-xs">
                A written 20–30 page audit + 90-day plan, then a live walkthrough.
              </div>
            </div>
            <Link
              to="/checkout/audit"
              className="mt-3 sm:mt-0 inline-flex items-center justify-center rounded-xl bg-green-500 text-white hover:bg-green-600 text-sm py-2 px-4 font-medium"
              data-testid="button-scale-audit-order"
            >
              Order Your Deep Dive Audit
            </Link>
          </div>
        </div>

        {/* Right column cards */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="text-base font-semibold text-gray-900 mb-1">How We Scale in 90 Days</div>
            <div className="text-[13px] text-gray-600 mb-2">
              The 4-step framework we run with every engagement.
            </div>
            <StepGraphic />
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="text-base font-semibold text-gray-900 mb-1">
              Audit Teardown (What We Check)
            </div>
            <div className="text-[13px] text-gray-600 mb-2">
              The core areas we evaluate to find quick wins and build your 90-day plan.
            </div>
            <TeardownList />
          </div>
        </div>
      </div>
    </section>
  );
}
