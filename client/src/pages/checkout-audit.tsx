import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

export default function CheckoutAudit() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <main className="relative">
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block" data-testid="link-back-home">
              ← Back to Home
            </Link>
            
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl" data-testid="page-title">
              Order Your Deep Dive Audit
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              A comprehensive audit that uncovers exactly where you're losing revenue and how to fix it.
            </p>

            <div className="mt-12 grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h2>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Full Account Audit</h3>
                      <p className="text-sm text-gray-600">Google Ads, Meta, YouTube, tracking setup—we review everything to find inefficiencies and opportunities.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Funnel Analysis</h3>
                      <p className="text-sm text-gray-600">Complete customer journey assessment from ad click to conversion, identifying drop-off points.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Prioritized 30-Day Roadmap</h3>
                      <p className="text-sm text-gray-600">Clear, actionable steps ranked by ROI potential so you know exactly what to tackle first.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Live Video Walkthrough</h3>
                      <p className="text-sm text-gray-600">60-minute screen share where we walk through findings, answer questions, and clarify next steps.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Detailed Written Report</h3>
                      <p className="text-sm text-gray-600">Comprehensive documentation you can reference and share with your team.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-900">💡 Bonus</p>
                  <p className="text-sm text-gray-600 mt-1">
                    If we end up working together, <strong>$600 is fully credited</strong> toward your first month of retainer.
                  </p>
                </div>
              </div>

              <div>
                <div className="rounded-2xl border border-gray-200 p-6 shadow-sm bg-gray-50">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Deep Dive Audit</h2>
                  <div className="text-4xl font-bold text-gray-900 mb-1">$1,250</div>
                  <p className="text-sm text-gray-600 mb-6">One-time payment</p>

                  <div className="space-y-3 mb-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>Delivered within 7 business days</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>60-minute live walkthrough included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>Credited if we work together</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 mb-4">
                    <p className="text-xs text-gray-600 mb-3">
                      <strong>Next Steps:</strong> After purchase, you'll receive an onboarding form to share access and context. We'll schedule your walkthrough within 7 business days.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="w-full inline-flex items-center justify-center rounded-xl bg-black text-white text-base font-semibold py-3 hover:opacity-90 transition"
                    data-testid="button-proceed-checkout"
                    onClick={() => alert('Payment integration coming soon. For now, please book a Strategic Intro Call to discuss the audit.')}
                  >
                    Proceed to Checkout
                  </button>

                  <p className="text-xs text-gray-500 mt-3 text-center">
                    Secure payment processing via Stripe
                  </p>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-xs text-gray-600 text-center">
                      Questions? <a href="/#book-call" className="text-black font-medium hover:underline">Book a call</a> first
                    </p>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    Not ready yet? <Link to="/" className="text-black font-medium hover:underline">Go back to homepage</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
