import { Link } from "react-router-dom";

export default function HeroCTAs() {
  return (
    <div className="mt-8 flex flex-col items-center lg:items-start gap-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
        <a
          href="#book-call"
          className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-green-600 text-white text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-purple-500/40"
          style={{ boxShadow: "0px 6px 18px rgba(115, 102, 255, 0.3)" }}
          aria-label="Book a Strategic Intro Call"
          data-testid="hero-cta-book-call"
        >
          <span className="mr-2">💬</span> Book a Strategic Intro Call
        </a>
        <Link
          to="/checkout/audit"
          className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-gray-900 text-base font-semibold shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-green-400 hover:bg-green-50"
          aria-label="Order Your Deep Dive Audit"
          data-testid="hero-cta-order-audit"
        >
          <span className="mr-2">🔍</span> Order Your Deep Dive Audit
        </Link>
      </div>

      <div className="text-sm text-gray-600 text-center lg:text-left font-medium" data-testid="hero-trust-anchors">
        ROI-first, no fluff • Clear roadmaps
      </div>
    </div>
  );
}
