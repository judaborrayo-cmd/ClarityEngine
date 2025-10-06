import { Link } from "wouter";

export default function HeroCTAs() {
  return (
    <div className="mt-6 flex flex-col items-center gap-3">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto justify-center">
        <a
          href="#book-call"
          className="inline-flex items-center justify-center px-5 py-3 rounded-2xl shadow hover:shadow-md transition border border-black/10 bg-black text-white text-sm font-medium"
          aria-label="Book a Strategic Intro Call"
          data-testid="hero-cta-book-call"
        >
          <span className="mr-2">💬</span> Book a Strategic Intro Call
        </a>
        <Link
          href="/checkout/audit"
          className="inline-flex items-center justify-center px-5 py-3 rounded-2xl shadow hover:shadow-md transition border border-black/10 bg-white text-gray-900 text-sm font-medium"
          aria-label="Order Your Deep Dive Audit"
          data-testid="hero-cta-order-audit"
        >
          <span className="mr-2">🔍</span> Order Your Deep Dive Audit
        </Link>
      </div>

      <div className="text-xs text-gray-600 text-center" data-testid="hero-trust-anchors">
        $3M+ tracked client revenue • ROI-first, no fluff • Clear roadmaps
      </div>
    </div>
  );
}
