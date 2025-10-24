export default function Services() {
  return (
    <main className="relative w-full">
      {/* ===== 1) HERO ===== */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900" data-testid="text-services-hero-title">
            Services Built to Drive Measurable Growth — with Strategy That Scales
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto" data-testid="text-services-hero-subhead">
            Choose your starting point — from a Deep-Dive Growth Audit to long-term partnerships. 
            Everything is designed for brands that live on leads and bookings: retreats, travel, fitness, 
            and multi-location companies.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#calendly"
              className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold shadow-sm bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              data-testid="button-book-call-hero"
            >
              Book a 30-min Strategy Call — $75
            </a>
            <a
              href="#audit"
              className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold shadow-sm border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 transition-colors"
              data-testid="button-explore-audit-hero"
            >
              Explore Deep-Dive Audit
            </a>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            New clients are accepted by application or completion of a Deep-Dive Audit.
          </p>
        </div>
      </section>

      {/* ===== 2) MAIN SERVICE OPTIONS (AUDIT + RETAINER) ===== */}
      <section className="py-6">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-6">
          {/* Deep-Dive Growth Audit */}
          <article
            id="audit"
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
            data-testid="card-audit-offer"
          >
            {/* Header with icon */}
            <div className="flex items-start gap-3 mb-2">
              {/* Magnifying glass icon */}
              <svg className="h-6 w-6 text-indigo-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="7" strokeWidth="2"></circle>
                <path d="M20 20l-3.5-3.5" strokeWidth="2" strokeLinecap="round"></path>
              </svg>
              <div>
                <h3 className="text-xl font-semibold text-gray-900" data-testid="text-audit-title">
                  Deep-Dive Growth Audit (Full-Funnel)
                </h3>
                <p className="text-gray-600" data-testid="text-audit-description">
                  Pinpoint what's working, what's not, and what to fix first across ads, tracking, offers, and funnel.
                </p>
              </div>
            </div>

            {/* Feature list with green check circles */}
            <ul className="mt-4 space-y-2">
              <li className="flex items-start gap-3" data-testid="text-audit-bullet-1">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-green-500 text-green-600 text-xs font-bold mt-0.5">✓</span>
                <span className="text-gray-700">Full-funnel audit with PDF + video walkthrough</span>
              </li>
              <li className="flex items-start gap-3" data-testid="text-audit-bullet-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-green-500 text-green-600 text-xs font-bold mt-0.5">✓</span>
                <span className="text-gray-700">30–60-minute strategy call to review findings</span>
              </li>
              <li className="flex items-start gap-3" data-testid="text-audit-bullet-3">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-green-500 text-green-600 text-xs font-bold mt-0.5">✓</span>
                <span className="text-gray-700">Priority actions: quick wins, CRO tests, tiered remarketing</span>
              </li>
              <li className="flex items-start gap-3" data-testid="text-audit-bullet-4">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-green-500 text-green-600 text-xs font-bold mt-0.5">✓</span>
                <span className="text-gray-700">2 weeks of post-audit support via email</span>
              </li>
            </ul>

            {/* Buttons (unchanged labels) */}
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="#calendly"
                className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold shadow-sm bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                data-testid="button-audit-book-call"
              >
                Book a 30-min Strategy Call — $75
              </a>
              <a
                href="#audit-details"
                className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold shadow-sm border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 transition-colors"
                data-testid="button-audit-details"
              >
                See Audit Details
              </a>
            </div>

            <p className="text-xs text-gray-400 mt-3">
              Most partners start here — the audit becomes your 90-day roadmap.
            </p>
          </article>

          {/* Growth Retainer */}
          <article
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
            data-testid="card-retainer-offer"
          >
            {/* Header with icon */}
            <div className="flex items-start gap-3 mb-2">
              {/* Trending up icon */}
              <svg className="h-6 w-6 text-indigo-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 17l6-6 4 4 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <div>
                <h3 className="text-xl font-semibold text-gray-900" data-testid="text-retainer-title">
                  Growth Retainer (By Application / Waitlist)
                </h3>
                <p className="text-gray-600" data-testid="text-retainer-description">
                  Hands-on growth management to scale bookings and revenue across channels and locations.
                </p>
              </div>
            </div>

            <ul className="mt-4 space-y-2">
              <li className="flex items-start gap-3" data-testid="text-retainer-bullet-1">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-green-500 text-green-600 text-xs font-bold mt-0.5">✓</span>
                <span className="text-gray-700">Omni-channel strategy across Google, Meta, and YouTube</span>
              </li>
              <li className="flex items-start gap-3" data-testid="text-retainer-bullet-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-green-500 text-green-600 text-xs font-bold mt-0.5">✓</span>
                <span className="text-gray-700">Tiered remarketing (Day 1–7, Week 2–4, 30+ days)</span>
              </li>
              <li className="flex items-start gap-3" data-testid="text-retainer-bullet-3">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-green-500 text-green-600 text-xs font-bold mt-0.5">✓</span>
                <span className="text-gray-700">Offer + landing page testing to lift bookings and memberships</span>
              </li>
              <li className="flex items-start gap-3" data-testid="text-retainer-bullet-4">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-green-500 text-green-600 text-xs font-bold mt-0.5">✓</span>
                <span className="text-gray-700">Attribution + reporting focused on ROAS, CPA, payback</span>
              </li>
              <li className="flex items-start gap-3" data-testid="text-retainer-bullet-5">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-green-500 text-green-600 text-xs font-bold mt-0.5">✓</span>
                <span className="text-gray-700">Fractional CMO guidance for multi-location ops</span>
              </li>
            </ul>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="#waitlist"
                className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold shadow-sm bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                data-testid="button-retainer-waitlist"
              >
                Apply for Waitlist
              </a>
              <a
                href="#calendly"
                className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold shadow-sm border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 transition-colors"
                data-testid="button-retainer-discuss"
              >
                Discuss Fit on a Call — $75
              </a>
            </div>

            <p className="text-xs text-gray-400 mt-3">
              Limited slots. New clients typically onboard after a completed audit.
            </p>
          </article>
        </div>
      </section>

      {/* ===== 3) SERVICES AT A GLANCE ===== */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center text-gray-900">Services at a glance</h2>
          <p className="text-gray-600 text-center mt-2">Strategies adjusted based on business needs &amp; audit.</p>

          {/* Grid of 6 cards (match homepage look) */}
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:ring-1 hover:ring-indigo-200 transition" data-testid="card-google-ads">
              <div className="flex items-center gap-3">
                <img alt="Google" className="h-6 w-6" src="https://www.gstatic.com/images/branding/product/1x/googleg_32dp.png" />
                <h3 className="font-semibold text-gray-900" data-testid="text-google-ads-title">Google Ads Advertising</h3>
              </div>
              <p className="mt-3 text-gray-600" data-testid="text-google-ads-description">
                Capture demand: searchers for retreat dates, itineraries, class signups, local queries.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:ring-1 hover:ring-indigo-200 transition" data-testid="card-meta-campaigns">
              <div className="flex items-center gap-3">
                <img alt="Meta" className="h-6 w-6" src="https://upload.wikimedia.org/wikipedia/commons/0/05/Meta_Platforms_Inc._logo.svg" />
                <h3 className="font-semibold text-gray-900" data-testid="text-meta-title">Meta Advertising</h3>
              </div>
              <p className="mt-3 text-gray-600" data-testid="text-meta-description">
                Scalable creative systems + remarketing to convert interest into inquiries &amp; bookings.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:ring-1 hover:ring-indigo-200 transition" data-testid="card-cro">
              <div className="flex items-center gap-3">
                <svg className="h-6 w-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M4 12h16M4 6h10M4 18h7" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <h3 className="font-semibold text-gray-900" data-testid="text-cro-title">Conversion Rate Optimization</h3>
              </div>
              <p className="mt-3 text-gray-600" data-testid="text-cro-description">
                Improve landing flow for applications, tour inquiries, trials, passes, memberships.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:ring-1 hover:ring-indigo-200 transition" data-testid="card-attribution">
              <div className="flex items-center gap-3">
                <svg className="h-6 w-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 3v18h18" strokeWidth="2"/>
                  <path d="M7 15l3-3 2 2 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3 className="font-semibold text-gray-900" data-testid="text-attribution-title">Strategic Reporting &amp; KPI Optimization</h3>
              </div>
              <p className="mt-3 text-gray-600" data-testid="text-attribution-description">
                Unify GA4 + platforms. See ROAS, CPA, and payback clearly across locations.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:ring-1 hover:ring-indigo-200 transition" data-testid="card-youtube">
              <div className="flex items-center gap-3">
                <svg className="h-6 w-6 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 8l6 4-6 4V8z"/>
                </svg>
                <h3 className="font-semibold text-gray-900" data-testid="text-youtube-title">YouTube Advertising</h3>
              </div>
              <p className="mt-3 text-gray-600" data-testid="text-youtube-description">
                Educate &amp; convert high-intent audiences (destination research, "gym near me").
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:ring-1 hover:ring-indigo-200 transition" data-testid="card-ab-testing">
              <div className="flex items-center gap-3">
                <svg className="h-6 w-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 4v16M4 12h16" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <h3 className="font-semibold text-gray-900" data-testid="text-ab-testing-title">A/B Testing</h3>
              </div>
              <p className="mt-3 text-gray-600" data-testid="text-ab-testing-description">
                Systematic experiments on offers, creatives, and funnels to compound wins.
              </p>
            </div>
          </div>

          {/* Gradient panel beneath grid (match homepage feel) */}
          <div
            className="mt-10 rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
            style={{background: "radial-gradient(120% 120% at 0% 0%, rgba(99,102,241,0.08) 0%, rgba(16,185,129,0.08) 60%, rgba(255,255,255,0.9) 100%)"}}
          >
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <div className="h-44 bg-white/60 rounded-xl border border-white/40 shadow-inner hidden md:block"></div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Capture Demand. Convert Faster.</h3>
                <p className="mt-2 text-gray-700">
                  We turn Google into your most reliable sales channel. From Search to Performance Max, we refine structure,
                  tracking, and creative so you capture the right traffic — not just clicks — and make confident decisions faster.
                </p>
                <ul className="mt-4 space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                    Capture high-intent leads and buyers
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                    Eliminate wasted spend through better structure
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                    Build a scalable, data-driven foundation for growth
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                    See what's working faster with clear KPI visibility
                  </li>
                </ul>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-1 rounded-full bg-white border text-gray-600">Search</span>
                  <span className="px-2 py-1 rounded-full bg-white border text-gray-600">PMax</span>
                  <span className="px-2 py-1 rounded-full bg-white border text-gray-600">YouTube</span>
                  <span className="px-2 py-1 rounded-full bg-white border text-gray-600">GA4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4) MINI COMPARISON TABLE ===== */}
      <section className="py-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-left text-sm md:text-base" data-testid="table-comparison">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 font-semibold text-gray-900">Perfect For</th>
                  <th className="py-3 px-4 font-semibold text-gray-900">Commitment</th>
                  <th className="py-3 px-4 font-semibold text-gray-900">Entry Path</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t" data-testid="row-audit">
                  <td className="py-3 px-4 text-gray-600">Quick clarity &amp; prioritized roadmap</td>
                  <td className="py-3 px-4 text-gray-600">One-time</td>
                  <td className="py-3 px-4 text-gray-600">Deep-Dive Audit</td>
                </tr>
                <tr className="border-t bg-gray-50" data-testid="row-retainer">
                  <td className="py-3 px-4 text-gray-600">Scale &amp; compound growth across channels/locations</td>
                  <td className="py-3 px-4 text-gray-600">90 days → ongoing</td>
                  <td className="py-3 px-4 text-gray-600">Retainer (by application)</td>
                </tr>
                <tr className="border-t" data-testid="row-other">
                  <td className="py-3 px-4 text-gray-600">Tactical projects (ads, CRO, analytics)</td>
                  <td className="py-3 px-4 text-gray-600">Flexible</td>
                  <td className="py-3 px-4 text-gray-600">Custom Projects</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== 5) FINAL CTA / APPLICATION ===== */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 text-center rounded-3xl bg-gray-50 py-16">
          <h2 className="text-3xl font-semibold text-gray-900" data-testid="text-cta-headline">
            Ready to Find the Right Fit?
          </h2>
          <p className="text-gray-600 mt-3 max-w-3xl mx-auto" data-testid="text-cta-subhead">
            Start with a paid 30-minute strategy call to align on goals, assess fit, and identify your fastest wins.
            <br className="hidden sm:block" />
            <span className="text-gray-500">Ongoing engagements begin with an audit or an approved application.</span>
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#calendly"
              className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold shadow-sm bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              data-testid="button-book-call-cta"
            >
              Book a 30-min Strategy Call — $75
            </a>
            <a
              href="#waitlist"
              className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold shadow-sm border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 transition-colors"
              data-testid="button-waitlist-cta"
            >
              Join Retainer Waitlist
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Trusted by founders managing $5k–$70k per month in ad spend.
          </p>
        </div>
      </section>

      {/* ===== PLACEHOLDERS FOR FUTURE WIDGETS ===== */}
      <section id="calendly" className="max-w-3xl mx-auto px-4 pb-16">
        {/* Calendly (30-min, $75) embed mounts here */}
        <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
          Calendly embed placeholder — 30-minute Strategy Call ($75)
        </div>
      </section>

      <section id="waitlist" className="max-w-3xl mx-auto px-4 pb-24">
        {/* Waitlist/application form mounts here */}
        <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
          Waitlist/application form placeholder
        </div>
      </section>
    </main>
  );
}
