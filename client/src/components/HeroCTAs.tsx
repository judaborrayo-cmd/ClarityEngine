import { Link } from "react-router-dom";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export default function HeroCTAs() {
  return (
    <div className="mt-6 flex flex-col items-center gap-3">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto justify-center">
        <button
          type="button"
          onClick={() => {
            const calendlyUrl = 'https://calendly.com/juda-borrayo/strategic-intro-call-10-20-min';
            if (window.Calendly) {
              try {
                window.Calendly.initPopupWidget({ url: calendlyUrl });
              } catch (error) {
                console.error('Calendly popup error:', error);
                window.open(calendlyUrl, '_blank');
              }
            } else {
              window.open(calendlyUrl, '_blank');
            }
          }}
          className="inline-flex items-center justify-center px-5 py-3 rounded-2xl shadow hover:shadow-md transition bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
          aria-label="Book a Strategic Intro Call"
          data-testid="hero-cta-book-call"
        >
          <span className="mr-2">💬</span> Book a Strategic Intro Call
        </button>
        <Link
          to="/checkout/audit"
          className="inline-flex items-center justify-center px-5 py-3 rounded-2xl shadow hover:shadow-md transition border border-black/10 bg-white text-gray-900 text-sm font-medium hover:bg-green-600 hover:text-white hover:border-green-600"
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
