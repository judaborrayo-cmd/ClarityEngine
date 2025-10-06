import { Link } from "react-router-dom";

interface StartCardsProps {
  onOpenWaitlist: () => void;
}

export default function StartCards({ onOpenWaitlist }: StartCardsProps) {
  return (
    <section className="py-12" aria-label="Choose How We Start Working Together">
      <h2 className="text-center text-xl sm:text-2xl font-semibold mb-6" data-testid="start-cards-title">
        Choose How We Start Working Together
      </h2>

      <div className="grid sm:grid-cols-3 gap-4 max-w-6xl mx-auto px-4">
        <div className="rounded-2xl border border-gray-200 p-4 shadow-sm" data-testid="card-intro-call">
          <div className="text-sm font-semibold mb-1">Strategic Intro Call</div>
          <p className="text-xs text-gray-600 mb-3">
            20–30 minutes to understand goals, constraints, and fit.
          </p>
          <a
            href="#book-call"
            className="inline-flex items-center justify-center w-full rounded-xl bg-primary text-primary-foreground text-sm py-2 hover:bg-primary/90 transition"
            data-testid="button-start-book-call"
          >
            Book a Call
          </a>
        </div>

        <div className="rounded-2xl border border-gray-200 p-4 shadow-sm" data-testid="card-deep-dive">
          <div className="text-sm font-semibold mb-1">Deep Dive Audit</div>
          <ul className="text-xs text-gray-600 mb-3 list-disc pl-5 space-y-1">
            <li>Account + funnel audit (Google/Meta/YouTube/Tracking)</li>
            <li>Prioritized roadmap with 30-day plan</li>
            <li>Live walkthrough + Q&A</li>
          </ul>
          <div className="text-sm font-bold mb-1">$495 one-time</div>
          <div className="text-[11px] text-gray-600 mb-3">
            Credited to your first month if there is a fit.
          </div>
          <Link
            to="/checkout/audit"
            className="inline-flex items-center justify-center w-full rounded-xl bg-white text-gray-900 border border-gray-200 text-sm py-2 hover:shadow transition"
            data-testid="button-start-order-audit"
          >
            Order Your Deep Dive Audit
          </Link>
        </div>

        <div className="relative rounded-2xl border border-gray-200 p-4 shadow-sm overflow-hidden" data-testid="card-retainer-waitlist">
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] pointer-events-none"></div>
          <div className="relative">
            <div className="text-sm font-semibold mb-1">Growth Retainer</div>
            <p className="text-xs text-gray-600 mb-3">
              Ongoing growth partnership (ads + CRO + strategy). Currently at capacity.
            </p>
            <button
              type="button"
              onClick={onOpenWaitlist}
              className="relative inline-flex items-center justify-center w-full rounded-xl bg-white text-gray-900 border border-gray-200 text-sm py-2 hover:shadow transition"
              data-testid="button-start-join-waitlist"
            >
              Join Waitlist
            </button>
            <p className="text-[11px] text-gray-500 mt-2">
              You'll be notified as soon as a slot opens.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
