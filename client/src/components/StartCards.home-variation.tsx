import ArcherVideo from "./ArcherVideo";
import { Link } from "react-router-dom";
import { strategySprintOffer as sprint } from "@shared/strategy-sprint-offer";
import assessment from "@shared/marketing-clarity-audit/report-content.json";

export default function StartCards() {
  return (
    <section className="py-12 text-center" aria-label="Ways to Work Together">
      <div className="relative isolate pt-8 pb-0 overflow-hidden rounded-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-700 mb-3">A clearer next move</p>
      <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="start-cards-title">Get the support your next decision needs.</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-8">Start with a clearer view of your marketing, or work directly with Clarity Engine to turn a pressing challenge into practical next steps.</p>
      </div>
      <ArcherVideo />
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto text-left">
        <article className="rounded-2xl border border-purple-200 bg-white p-6 sm:p-8 flex flex-col" data-testid="card-assessment">
          <p className="text-xs font-semibold tracking-widest uppercase text-purple-700 mb-3">Explore on your own</p>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Clarity Assessment</h3>
          <p className="text-gray-600 mb-5">Answer 35 questions about your offer, audience, messaging, customer journey, traffic, and measurement. Receive a personalized report that helps you identify possible gaps and where to investigate next.</p>
          <ul className="space-y-3 text-sm text-gray-700 mb-6 list-disc pl-5">
            <li>A guided review across six marketing areas</li>
            <li>Findings based on your answers</li>
            <li>Suggested next steps where a clear constraint emerges</li>
          </ul>
          <p className="text-xs text-gray-500 mb-6">This self-guided assessment does not inspect your accounts or include an expert review.</p>
          <div className="mt-auto"><p className="font-semibold text-gray-900 mb-4">${assessment.product.priceCents / 100} <span className="text-sm font-normal text-gray-500">one-time payment</span></p><Link to="/marketing-clarity-assesment" className="inline-flex justify-center rounded-xl bg-purple-700 hover:bg-purple-800 text-white px-5 py-3 font-medium w-full" data-testid="button-start-assessment">Explore the assessment </Link></div>
        </article>
        <article className="rounded-2xl border border-gray-200 bg-purple-50/50 p-6 sm:p-8 flex flex-col" data-testid="card-strategy-sprint">
          <p className="text-xs font-semibold tracking-widest uppercase text-purple-700 mb-3">Work through it together</p>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">30-Day Growth Strategy Sprint</h3>
          <p className="text-gray-600 mb-5">Bring your marketing challenge to three working sessions with Clarity Engine. Together, we’ll examine your options, clarify priorities, and define actions your team can move forward with.</p>
          <ul className="space-y-3 text-sm text-gray-700 mb-6 list-disc pl-5">
            <li>Three live sessions over 30 days</li>
            <li>Focus on the questions most relevant to your business</li>
            <li>Practical direction for campaigns, messaging, landing pages, or measurement</li>
          </ul>
          <p className="text-xs text-gray-500 mb-6">Implementation and ongoing account management are scoped separately.</p>
          <div className="mt-auto"><p className="font-semibold text-gray-900 mb-4">${sprint.price} <span className="text-sm font-normal text-gray-500">one-time payment · no subscription</span></p><Link to="/strategy-sprint" className="inline-flex justify-center rounded-xl border border-purple-700 text-purple-800 hover:bg-purple-100 px-5 py-3 font-medium w-full" data-testid="button-start-sprint">Explore the Strategy Sprint </Link></div>
        </article>
      </div>
      <div className="mt-7 max-w-5xl mx-auto rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 sm:p-8 text-left sm:flex sm:items-center gap-8"><div className="flex-1"><h3 className="text-xl sm:text-2xl font-bold text-gray-900">Need a partner to keep the work moving?</h3><p className="mt-3 text-gray-600 leading-relaxed">Our Growth Partnership connects ongoing strategy, paid media, conversion improvements, and measurement—with weekly collaboration and hands-on support.</p></div><Link to="/growth-partnership" className="mt-5 sm:mt-0 inline-flex shrink-0 rounded-xl bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 font-semibold">Explore the Growth Partnership</Link></div>
      {/* Metrics / Proof Row (unchanged) */}
      <div className="mt-10 text-sm text-gray-600 flex flex-col sm:flex-row gap-4 sm:gap-10 justify-center items-center">
        <div>
          <span className="text-purple-700 font-bold text-base">$5M+</span>
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
