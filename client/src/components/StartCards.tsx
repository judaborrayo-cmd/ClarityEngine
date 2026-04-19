import { Link } from "react-router-dom";

interface StartCardsProps {
  onOpenWaitlist: () => void;
}

export default function StartCards({ onOpenWaitlist }: StartCardsProps) {
  return (
    <section className="py-8 text-center" aria-label="Ways to Work Together">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2" data-testid="start-cards-title">
        3 Paths to More Profitable Funnels & Ads
      </h2>
      <p className="text-gray-600 text-sm max-w-xl mx-auto mb-8">
        All Intro Calls and Audits credit into monthly retainers — when there's a
        long-term fit. <span className="text-gray-900 font-medium">Different brands need different levels of support — start where you'll see ROI fastest.</span>
      </p>

      <div className="grid sm:grid-cols-3 items-stretch gap-6 max-w-6xl mx-auto">
        {/* 1) Strategic Intro Call */}
        <div className="h-full flex flex-col justify-between rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition transform hover:-translate-y-1 bg-white p-6 text-left" data-testid="card-intro-call">
          <div>
            <div className="text-lg font-semibold mb-1 text-gray-900">Strategic Intro Call</div>
            <p className="text-sm text-gray-600 mb-4">
              30-minute diagnostic session to uncover growth gaps and new opportunities.
            </p>
            <ul className="text-sm text-gray-700 divide-y divide-gray-200 rounded-lg border border-gray-100">
              <li className="py-2 px-3">Pre-call competitor &amp; market research</li>
              <li className="py-2 px-3">Identify ad &amp; funnel blind spots</li>
              <li className="py-2 px-3">1–2 actionable growth ideas</li>
              <li className="py-2 px-3">Professional outside perspective</li>
              <li className="py-2 px-3">$75 deposit credited toward Audit or Retainer</li>
            </ul>
          </div>
          <a
            href="#book-call"
            className="mt-5 inline-flex items-center justify-center rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm py-2 px-4 font-medium"
            data-testid="button-start-book-call"
          >
            Book a Call — $75
          </a>
        </div>

        {/* 2) Deep Dive Audit (highlighted) */}
        <div className="h-full flex flex-col justify-between rounded-2xl border-2 border-green-500 shadow-md hover:shadow-lg transition transform hover:-translate-y-1 bg-white p-6 relative text-left" data-testid="card-deep-dive">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
            3 Month Roadmap
          </div>
          <div>
            <div className="text-lg font-semibold mb-1 text-gray-900">Deep Dive Audit</div>
            <p className="text-sm text-gray-600 mb-4">
              A full-scale analysis of your advertising, funnel &amp; tracking with a 90-day roadmap.
            </p>
            <ul className="text-sm text-gray-700 divide-y divide-gray-200 rounded-lg border border-green-100">
              <li className="py-2 px-3">Audit of Google, Meta, YouTube &amp; tracking setup</li>
              <li className="py-2 px-3">Actionable performance report &amp; action plan</li>
              <li className="py-2 px-3">Creative &amp; CRO feedback with performance benchmarks</li>
              <li className="py-2 px-3">Competitor insights + prioritized growth roadmap</li>
              <li className="py-2 px-3">Live 60-min walkthrough + Q&amp;A (2-3 week turnaround)</li>
            </ul>
          </div>
          <div>
            <div className="text-lg font-bold mt-5 mb-1">$1,250 one-time</div>
            <p className="text-xs text-gray-600 mb-4">
              Includes a $600 credit toward your Growth Retainer if there's a fit.
            </p>
            <Link
              to="/checkout/audit"
              className="inline-flex items-center justify-center w-full rounded-xl bg-green-500 text-white hover:bg-green-600 text-sm py-2 font-medium transition"
              data-testid="button-start-order-audit"
            >
              Order Your Deep Dive Audit
            </Link>
          </div>
        </div>

        {/* 3) Growth Retainer */}
        <div className="h-full flex flex-col justify-between rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition transform hover:-translate-y-1 bg-white p-6 relative text-left" data-testid="card-retainer-waitlist">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
            Strategy & Execution
          </div>
          <div>
            <div className="text-lg font-semibold mb-1 text-gray-900">Growth Retainer</div>
            <p className="text-sm text-gray-600 mb-4">
              Ongoing partnership combining strategy, execution &amp; optimization across channels.
            </p>
            <ul className="text-sm text-gray-700 divide-y divide-gray-200 rounded-lg border border-gray-100">
              <li className="py-2 px-3">3 Month Paid Media &amp; CRO Roadmap</li>
              <li className="py-2 px-3">Omni-channel ads: Google, Meta, YouTube (+ new channels as needed)</li>
              <li className="py-2 px-3">Creative testing system, offers/ad-angle development &amp; CRO roadmap</li>
              <li className="py-2 px-3">Tracking &amp; attribution upgrades, KPI dashboards, weekly reporting</li>
              <li className="py-2 px-3">Weekly strategy/optimization calls + Slack/async support</li>
              <li className="py-2 px-3">New funnel builds &amp; experiment backlog with clear milestones</li>
            </ul>
            <p className="text-xs text-gray-500 mt-3">
              Currently at capacity — audit clients receive priority when a slot opens.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenWaitlist}
            className="mt-5 inline-flex items-center justify-center rounded-xl border border-gray-300 text-gray-900 text-sm py-2 px-4 hover:shadow"
            data-testid="button-start-join-waitlist"
          >
            Apply to Wait List
          </button>
        </div>
      </div>

      {/* Metrics / Proof Row (unchanged) */}
      <div className="mt-10 text-sm text-gray-600 flex flex-col sm:flex-row gap-4 sm:gap-10 justify-center items-center">
        <div>
          <span className="text-purple-700 font-bold text-base">$3M+</span>
          <span className="block text-gray-600 text-xs">
            in ad spend managed across growth brands
          </span>
        </div>
        <div>
          <span className="text-green-600 font-bold text-base">12+</span>
          <span className="block text-gray-600 text-xs">
            years in paid media &amp; growth strategy
          </span>
        </div>
        <div>
          <span className="text-purple-700 font-bold text-base">20,800+</span>
          <span className="block text-gray-600 text-xs">
            hours managing ads &amp; strategy
          </span>
        </div>
      </div>
    </section>
  );
}
