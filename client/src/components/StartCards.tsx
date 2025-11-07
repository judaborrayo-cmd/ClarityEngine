import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface StartCardsProps {
  onOpenWaitlist: () => void;
}

export default function StartCards({ onOpenWaitlist }: StartCardsProps) {
  return (
    <section className="py-20 text-center" aria-label="Ways to Work Together">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900" style={{ letterSpacing: "-0.01em" }} data-testid="start-cards-title">
          3 Paths to More Profitable Funnels & Ads
        </h2>
        <p className="text-gray-600 text-base max-w-2xl mx-auto mb-14 leading-relaxed">
          All Intro Calls and Audits credit into monthly retainers — when there's a
          long-term fit. <span className="text-gray-900 font-semibold">Different brands need different levels of support — start where you'll see ROI fastest.</span>
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-3 items-stretch gap-8 max-w-6xl mx-auto">
        {/* 1) Strategic Intro Call */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="h-full flex flex-col justify-between rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 bg-white p-8 text-left group" 
          data-testid="card-intro-call"
          style={{ 
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400/0 to-purple-400/0 group-hover:from-purple-400/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
          <div className="relative">
            <div className="text-xl font-bold mb-2 text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>Strategic Intro Call</div>
            <p className="text-base text-gray-600 mb-6 leading-relaxed">
              30-minute diagnostic session to uncover growth gaps and new opportunities.
            </p>
            <ul className="text-sm text-gray-700 divide-y divide-gray-200 rounded-lg border border-gray-100 bg-gray-50/50">
              <li className="py-3 px-4">Pre-call competitor &amp; market research</li>
              <li className="py-3 px-4">Identify ad &amp; funnel blind spots</li>
              <li className="py-3 px-4">1–2 actionable growth ideas</li>
              <li className="py-3 px-4">Professional outside perspective</li>
              <li className="py-3 px-4">$75 deposit credited toward Audit or Retainer</li>
            </ul>
          </div>
          <a
            href="#book-call"
            className="relative mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white text-base py-3 px-5 font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            data-testid="button-start-book-call"
          >
            Book a Call — $75
          </a>
        </motion.div>

        {/* 2) Deep Dive Audit (highlighted) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-full flex flex-col justify-between rounded-2xl border-2 border-green-500 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white p-8 relative text-left group" 
          data-testid="card-deep-dive"
          style={{ 
            boxShadow: "0 10px 15px -3px rgba(34, 197, 94, 0.1), 0 4px 6px -2px rgba(34, 197, 94, 0.05)",
          }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-400/0 to-green-400/0 group-hover:from-green-400/10 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
            3 Month Roadmap
          </div>
          <div className="relative">
            <div className="text-xl font-bold mb-2 text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>Deep Dive Audit</div>
            <p className="text-base text-gray-600 mb-6 leading-relaxed">
              A full-scale analysis of your advertising, funnel &amp; tracking with a 90-day roadmap.
            </p>
            <ul className="text-sm text-gray-700 divide-y divide-gray-200 rounded-lg border border-green-100 bg-green-50/30">
              <li className="py-3 px-4">Audit of Google, Meta, YouTube &amp; tracking setup</li>
              <li className="py-3 px-4">Actionable performance report &amp; action plan</li>
              <li className="py-3 px-4">Creative &amp; CRO feedback with performance benchmarks</li>
              <li className="py-3 px-4">Competitor insights + prioritized growth roadmap</li>
              <li className="py-3 px-4">Live 60-min walkthrough + Q&amp;A (2-3 week turnaround)</li>
            </ul>
          </div>
          <div className="relative">
            <div className="text-xl font-bold mt-6 mb-1 text-gray-900">$1,250 one-time</div>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">
              Includes a $600 credit toward your Growth Retainer if there's a fit.
            </p>
            <Link
              to="/checkout/audit"
              className="inline-flex items-center justify-center w-full rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 text-base py-3 font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              data-testid="button-start-order-audit"
            >
              Order Your Deep Dive Audit
            </Link>
          </div>
        </motion.div>

        {/* 3) Growth Retainer */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="h-full flex flex-col justify-between rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 bg-white p-8 relative text-left group" 
          data-testid="card-retainer-waitlist"
          style={{ 
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400/0 to-purple-400/0 group-hover:from-purple-400/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
            Strategy & Execution
          </div>
          <div className="relative">
            <div className="text-xl font-bold mb-2 text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>Growth Retainer</div>
            <p className="text-base text-gray-600 mb-6 leading-relaxed">
              Ongoing partnership combining strategy, execution &amp; optimization across channels.
            </p>
            <ul className="text-sm text-gray-700 divide-y divide-gray-200 rounded-lg border border-gray-100 bg-gray-50/50">
              <li className="py-3 px-4">3 Month Paid Media &amp; CRO Roadmap</li>
              <li className="py-3 px-4">Omni-channel ads: Google, Meta, YouTube (+ new channels as needed)</li>
              <li className="py-3 px-4">Creative testing system, offers/ad-angle development &amp; CRO roadmap</li>
              <li className="py-3 px-4">Tracking &amp; attribution upgrades, KPI dashboards, weekly reporting</li>
              <li className="py-3 px-4">Weekly strategy/optimization calls + Slack/async support</li>
              <li className="py-3 px-4">New funnel builds &amp; experiment backlog with clear milestones</li>
            </ul>
            <p className="text-sm text-gray-500 mt-4 leading-relaxed">
              Currently at capacity — audit clients receive priority when a slot opens.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenWaitlist}
            className="relative mt-6 inline-flex items-center justify-center rounded-xl border-2 border-gray-300 text-gray-900 text-base py-3 px-5 font-semibold hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            data-testid="button-start-join-waitlist"
          >
            Apply to Wait List
          </button>
        </motion.div>
      </div>

      {/* Metrics / Proof Row */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-16 text-sm text-gray-600 flex flex-col sm:flex-row gap-6 sm:gap-12 justify-center items-center"
      >
        <div className="text-center">
          <span className="text-purple-700 font-bold text-2xl block mb-1">$3M+</span>
          <span className="block text-gray-600 text-sm leading-relaxed">
            in ad spend managed across growth brands
          </span>
        </div>
        <div className="text-center">
          <span className="text-green-600 font-bold text-2xl block mb-1">12+</span>
          <span className="block text-gray-600 text-sm leading-relaxed">
            years in paid media &amp; growth strategy
          </span>
        </div>
        <div className="text-center">
          <span className="text-purple-700 font-bold text-2xl block mb-1">20,800+</span>
          <span className="block text-gray-600 text-sm leading-relaxed">
            hours managing ads &amp; strategy
          </span>
        </div>
      </motion.div>
    </section>
  );
}
