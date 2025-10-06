import { Link } from "react-router-dom";

interface StartCardsProps {
  onOpenWaitlist: () => void;
}

export default function StartCards({ onOpenWaitlist }: StartCardsProps) {
  return (
    <section className="py-16 text-center" aria-label="Ways to Work Together">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2" data-testid="start-cards-title">
        3 Paths to More Profitable Funnels & Ads
      </h2>
      <p className="text-gray-600 text-sm max-w-xl mx-auto mb-10">
        All Intro Calls and Audits credit into monthly retainers — when there's a
        long-term fit. <span className="text-gray-900 font-medium">All paths lead to profits.</span>
      </p>

      <div className="grid sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Strategic Intro Call */}
        <div className="flex flex-col justify-between rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition transform hover:-translate-y-1 bg-white p-6" data-testid="card-intro-call">
          <div>
            <div className="text-lg font-semibold mb-2">Strategic Intro Call</div>
            <p className="text-sm text-gray-600 mb-4">
              20–30 minutes to understand goals, constraints, and fit.
            </p>
          </div>
          <a
            href="#book-call"
            className="inline-flex items-center justify-center mt-auto rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm py-2 px-4 font-medium"
            data-testid="button-start-book-call"
          >
            Book a Call
          </a>
        </div>

        {/* Deep Dive Audit (highlighted) */}
        <div className="flex flex-col justify-between rounded-2xl border-2 border-green-500 shadow-md hover:shadow-lg transition transform hover:-translate-y-1 bg-white p-6 relative" data-testid="card-deep-dive">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
            Audit Deep Dive
          </div>
          <div>
            <div className="text-lg font-semibold mb-2">Deep Dive Audit</div>
            <ul className="text-sm text-gray-600 mb-4 space-y-1">
              <li>Account + funnel audit (Google / Meta / YouTube / Tracking)</li>
              <li>Prioritized roadmap with 30-day plan</li>
              <li>Live walkthrough + Q&A</li>
            </ul>
          </div>
          <div>
            <div className="text-lg font-bold mb-1">$495 one-time</div>
            <p className="text-xs text-gray-600 mb-4">
              Credited to your first month if there's a fit.
            </p>
            <Link
              to="/checkout/audit"
              className="inline-flex items-center justify-center w-full rounded-xl bg-green-600 text-white hover:bg-green-700 text-sm py-2 font-medium transition"
              data-testid="button-start-order-audit"
            >
              Order Your Deep Dive Audit
            </Link>
          </div>
        </div>

        {/* Growth Retainer */}
        <div className="flex flex-col justify-between rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition transform hover:-translate-y-1 bg-white p-6" data-testid="card-retainer-waitlist">
          <div>
            <div className="text-lg font-semibold mb-2">Growth Retainer</div>
            <p className="text-sm text-gray-600 mb-4">
              Ongoing growth partnership (ads + CRO + strategy). Currently at capacity.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenWaitlist}
            className="inline-flex items-center justify-center mt-auto rounded-xl border border-gray-300 text-gray-900 text-sm py-2 px-4 hover:shadow"
            data-testid="button-start-join-waitlist"
          >
            Join Waitlist
          </button>
        </div>
      </div>

      {/* Metrics / Proof Row */}
      <div className="mt-10 flex flex-col sm:flex-row gap-8 sm:gap-12 justify-center items-center">
        <div className="text-center">
          <div className="text-3xl sm:text-4xl font-bold text-blue-600">$3M+</div>
          <div className="text-xs sm:text-sm text-gray-600 mt-1">in ad spend managed across growth brands</div>
        </div>
        <div className="text-center">
          <div className="text-3xl sm:text-4xl font-bold text-green-600">10+</div>
          <div className="text-xs sm:text-sm text-gray-600 mt-1">years in paid media & growth strategy</div>
        </div>
        <div className="text-center">
          <div className="text-3xl sm:text-4xl font-bold text-purple-600">10,000+</div>
          <div className="text-xs sm:text-sm text-gray-600 mt-1">hours managing ads & strategy</div>
        </div>
      </div>
    </section>
  );
}
