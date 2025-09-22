import { Link } from "react-router-dom";
import { Search, Users, TrendingUp, Target, BarChart3, Crown, CheckCircle, ArrowRight } from "lucide-react";

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="px-6 pt-20 pb-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl" data-testid="text-services-hero-title">
            Services Designed to Drive Measurable Growth
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600" data-testid="text-services-hero-subhead">
            Choose your entry point — from fast clarity audits to ongoing growth retainers. Each service is built to maximize ROI.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/#book-intro"
              className="rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
              data-testid="button-book-intro-hero"
            >
              Book a 10-min Intro Call
            </a>
            <Link
              to="/growth-clarity-audit"
              className="rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-50 transition-colors"
              data-testid="button-explore-audit-hero"
            >
              Explore Growth Audit
            </Link>
          </div>
        </div>
      </section>

      {/* Flagship Offers */}
      <section className="px-6 py-16 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Growth Clarity Audit */}
            <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200" data-testid="card-audit-offer">
              <div className="flex items-center mb-4">
                <div className="rounded-lg bg-indigo-50 p-2">
                  <Search className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900" data-testid="text-audit-title">
                    Growth Clarity Audit ($497–$900 one-time)
                  </h3>
                  <p className="text-sm text-gray-600 mt-1" data-testid="text-audit-who">
                    For founders & teams who want quick clarity on wasted spend, broken tracking, and growth opportunities.
                  </p>
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start" data-testid="text-audit-bullet-1">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Full-funnel audit + PDF/Video walkthrough</span>
                </li>
                <li className="flex items-start" data-testid="text-audit-bullet-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">30–60 min strategy call</span>
                </li>
                <li className="flex items-start" data-testid="text-audit-bullet-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">2 weeks of support</span>
                </li>
                <li className="flex items-start" data-testid="text-audit-bullet-4">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Risk-free entry: credit applied to your first retainer month if you sign within 14 days</span>
                </li>
              </ul>
              
              <Link
                to="/growth-clarity-audit"
                className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
                data-testid="button-audit-details"
              >
                See Growth Audit Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* Growth Retainer */}
            <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200" data-testid="card-retainer-offer">
              <div className="flex items-center mb-4">
                <div className="rounded-lg bg-indigo-50 p-2">
                  <TrendingUp className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900" data-testid="text-retainer-title">
                    Growth Retainer ($3,200–$15,000/mo)
                  </h3>
                  <p className="text-sm text-gray-600 mt-1" data-testid="text-retainer-who">
                    For brands ready to scale with expert ongoing management.
                  </p>
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start" data-testid="text-retainer-bullet-1">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Omni-channel ads (Google, Meta, YouTube)</span>
                </li>
                <li className="flex items-start" data-testid="text-retainer-bullet-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Tiered remarketing & CRO</span>
                </li>
                <li className="flex items-start" data-testid="text-retainer-bullet-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Weekly optimization & reporting</span>
                </li>
                <li className="flex items-start" data-testid="text-retainer-bullet-4">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Fractional CMO leadership</span>
                </li>
              </ul>
              
              <p className="text-sm text-gray-500 mb-6" data-testid="text-retainer-commitment">
                Initial 90-day plan → then month-to-month with 30 days' notice.
              </p>
              
              <a
                href="/#book-intro"
                className="inline-flex items-center justify-center w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 transition-colors"
                data-testid="button-retainer-discuss"
              >
                Discuss Retainer Options
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Google Ads Management */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow" data-testid="card-google-ads">
              <div className="flex items-center mb-4">
                <div className="rounded-lg bg-blue-50 p-2">
                  <Target className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="ml-3 text-lg font-semibold text-gray-900" data-testid="text-google-ads-title">
                  Google Ads Management
                </h3>
              </div>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start" data-testid="text-google-ads-bullet-1">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">Capture high-intent buyers</span>
                </li>
                <li className="flex items-start" data-testid="text-google-ads-bullet-2">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">Optimize cost per lead</span>
                </li>
              </ul>
              <a href="/#book-intro" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium" data-testid="link-google-ads-playbook">
                See playbook →
              </a>
            </div>

            {/* Meta Campaigns */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow" data-testid="card-meta-campaigns">
              <div className="flex items-center mb-4">
                <div className="rounded-lg bg-purple-50 p-2">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="ml-3 text-lg font-semibold text-gray-900" data-testid="text-meta-title">
                  Meta Campaigns
                </h3>
              </div>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start" data-testid="text-meta-bullet-1">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">Build scalable creative systems</span>
                </li>
                <li className="flex items-start" data-testid="text-meta-bullet-2">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">Tiered remarketing</span>
                </li>
              </ul>
              <a href="/#book-intro" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium" data-testid="link-meta-playbook">
                See playbook →
              </a>
            </div>

            {/* CRO & Funnel Optimization */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow" data-testid="card-cro">
              <div className="flex items-center mb-4">
                <div className="rounded-lg bg-green-50 p-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="ml-3 text-lg font-semibold text-gray-900" data-testid="text-cro-title">
                  CRO & Funnel Optimization
                </h3>
              </div>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start" data-testid="text-cro-bullet-1">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">Funnel testing & iteration</span>
                </li>
                <li className="flex items-start" data-testid="text-cro-bullet-2">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">Conversion tracking clarity</span>
                </li>
              </ul>
              <a href="/#book-intro" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium" data-testid="link-cro-playbook">
                See playbook →
              </a>
            </div>

            {/* Attribution & Reporting */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow" data-testid="card-attribution">
              <div className="flex items-center mb-4">
                <div className="rounded-lg bg-orange-50 p-2">
                  <BarChart3 className="h-5 w-5 text-orange-600" />
                </div>
                <h3 className="ml-3 text-lg font-semibold text-gray-900" data-testid="text-attribution-title">
                  Attribution & Reporting
                </h3>
              </div>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start" data-testid="text-attribution-bullet-1">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">Unified metrics dashboard</span>
                </li>
                <li className="flex items-start" data-testid="text-attribution-bullet-2">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">Data for decisions, not noise</span>
                </li>
              </ul>
              <a href="/#book-intro" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium" data-testid="link-attribution-playbook">
                See playbook →
              </a>
            </div>

            {/* YouTube Ads */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow" data-testid="card-youtube">
              <div className="flex items-center mb-4">
                <div className="rounded-lg bg-red-50 p-2">
                  <Users className="h-5 w-5 text-red-600" />
                </div>
                <h3 className="ml-3 text-lg font-semibold text-gray-900" data-testid="text-youtube-title">
                  YouTube Ads
                </h3>
              </div>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start" data-testid="text-youtube-bullet-1">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">Educate & capture viewers</span>
                </li>
                <li className="flex items-start" data-testid="text-youtube-bullet-2">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">High-intent video targeting</span>
                </li>
              </ul>
              <a href="/#book-intro" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium" data-testid="link-youtube-playbook">
                See playbook →
              </a>
            </div>

            {/* Fractional CMO */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow" data-testid="card-fractional-cmo">
              <div className="flex items-center mb-4">
                <div className="rounded-lg bg-indigo-50 p-2">
                  <Crown className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="ml-3 text-lg font-semibold text-gray-900" data-testid="text-cmo-title">
                  Fractional CMO
                </h3>
              </div>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start" data-testid="text-cmo-bullet-1">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">Strategic leadership without full-time hire</span>
                </li>
                <li className="flex items-start" data-testid="text-cmo-bullet-2">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">Align teams around a growth roadmap</span>
                </li>
              </ul>
              <a href="/#book-intro" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium" data-testid="link-cmo-playbook">
                See playbook →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Snapshot */}
      <section className="px-6 py-16 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden bg-white shadow-sm rounded-2xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200" data-testid="table-comparison">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Perfect for
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commitment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pricing
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr data-testid="row-audit">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Quick clarity & roadmap</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">One-time</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$497–$900</td>
                </tr>
                <tr data-testid="row-retainer">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Scale + compounding growth</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">90 days → monthly</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$3,200–$15,000/mo</td>
                </tr>
                <tr data-testid="row-other">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Tactical support</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Flexible</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Varies</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="px-6 py-16 lg:px-8 bg-indigo-50">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900" data-testid="text-cta-headline">
            Ready to Find the Right Fit?
          </h2>
          <p className="mt-4 text-lg text-gray-600" data-testid="text-cta-subhead">
            Start with a quick intro call to align on goals and see which service unlocks the most growth for your brand.
          </p>
          <div className="mt-8">
            <a
              href="/#book-intro"
              className="inline-flex items-center rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
              data-testid="button-book-intro-cta"
            >
              Book a 10-min Intro Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}