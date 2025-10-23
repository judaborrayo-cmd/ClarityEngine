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
            <h3 className="text-xl font-semibold mb-2 text-gray-900" data-testid="text-audit-title">
              Deep-Dive Growth Audit (Full-Funnel)
            </h3>
            <p className="text-gray-600 mb-4" data-testid="text-audit-description">
              Pinpoint what's working, what's not, and what to fix first across ads, tracking, offers, and funnel. 
              Built to unlock faster bookings and lower CPL for retreats, travel operators, fitness studios/gyms, and multi-location brands.
            </p>
            <ul className="text-sm text-gray-600 mb-5 space-y-2">
              <li className="flex items-start gap-2" data-testid="text-audit-bullet-1">
                <span>•</span>
                <span>Full-funnel audit with PDF + video walkthrough</span>
              </li>
              <li className="flex items-start gap-2" data-testid="text-audit-bullet-2">
                <span>•</span>
                <span>30–60-minute strategy call to review findings</span>
              </li>
              <li className="flex items-start gap-2" data-testid="text-audit-bullet-3">
                <span>•</span>
                <span>Priority actions: quick wins, CRO tests, remarketing tiers</span>
              </li>
              <li className="flex items-start gap-2" data-testid="text-audit-bullet-4">
                <span>•</span>
                <span>2 weeks of post-audit support via email</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-3">
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

          {/* Growth Retainer (By Application) */}
          <article
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
            data-testid="card-retainer-offer"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-900" data-testid="text-retainer-title">
              Growth Retainer (By Application / Waitlist)
            </h3>
            <p className="text-gray-600 mb-4" data-testid="text-retainer-description">
              Ongoing, hands-on growth management: paid media, CRO, and attribution working together to scale bookings 
              and revenue. Best for founders and teams ready to compound wins post-audit.
            </p>
            <ul className="text-sm text-gray-600 mb-5 space-y-2">
              <li className="flex items-start gap-2" data-testid="text-retainer-bullet-1">
                <span>•</span>
                <span>Omni-channel strategy across Google, Meta, and YouTube</span>
              </li>
              <li className="flex items-start gap-2" data-testid="text-retainer-bullet-2">
                <span>•</span>
                <span>Tiered remarketing (Day 1–7, Week 2–4, 30+ days)</span>
              </li>
              <li className="flex items-start gap-2" data-testid="text-retainer-bullet-3">
                <span>•</span>
                <span>Offer + landing page testing to lift bookings and memberships</span>
              </li>
              <li className="flex items-start gap-2" data-testid="text-retainer-bullet-4">
                <span>•</span>
                <span>Attribution + reporting focused on ROAS, CPA, and payback</span>
              </li>
              <li className="flex items-start gap-2" data-testid="text-retainer-bullet-5">
                <span>•</span>
                <span>Fractional CMO guidance for multi-location ops</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-3">
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

      {/* ===== 3) SUPPORTING SERVICES GRID (tailored) ===== */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center text-gray-900">
            Specialized Playbooks &amp; Capabilities
          </h2>
          <p className="text-gray-600 text-center mt-2 max-w-3xl mx-auto">
            Built for brands that depend on demand generation: retreats, travel, fitness, and multi-location companies.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm hover:shadow-md transition" data-testid="card-google-ads">
              <p className="text-xs uppercase tracking-wide text-gray-500">Paid Media</p>
              <h4 className="mt-2 font-semibold text-gray-900" data-testid="text-google-ads-title">
                Google Ads Management
              </h4>
              <p className="mt-2 text-gray-600" data-testid="text-google-ads-description">
                Capture high-intent searchers for bookings and leads (retreat dates, itineraries, class signups).
              </p>
              <a
                href="#google"
                className="mt-4 inline-block text-indigo-600 font-semibold hover:text-indigo-700"
                data-testid="link-google-ads-playbook"
              >
                Learn more →
              </a>
            </div>

            <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm hover:shadow-md transition" data-testid="card-meta-campaigns">
              <p className="text-xs uppercase tracking-wide text-gray-500">Paid Media</p>
              <h4 className="mt-2 font-semibold text-gray-900" data-testid="text-meta-title">
                Meta Campaigns
              </h4>
              <p className="mt-2 text-gray-600" data-testid="text-meta-description">
                Scalable creative systems + tiered remarketing to turn interest into inquiries and bookings.
              </p>
              <a
                href="#meta"
                className="mt-4 inline-block text-indigo-600 font-semibold hover:text-indigo-700"
                data-testid="link-meta-playbook"
              >
                Learn more →
              </a>
            </div>

            <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm hover:shadow-md transition" data-testid="card-cro">
              <p className="text-xs uppercase tracking-wide text-gray-500">CRO</p>
              <h4 className="mt-2 font-semibold text-gray-900" data-testid="text-cro-title">
                CRO &amp; Funnel Optimization
              </h4>
              <p className="mt-2 text-gray-600" data-testid="text-cro-description">
                Lift conversion rates for retreat applications, tour inquiries, trial passes, and memberships.
              </p>
              <a
                href="#cro"
                className="mt-4 inline-block text-indigo-600 font-semibold hover:text-indigo-700"
                data-testid="link-cro-playbook"
              >
                Learn more →
              </a>
            </div>

            <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm hover:shadow-md transition" data-testid="card-attribution">
              <p className="text-xs uppercase tracking-wide text-gray-500">Analytics</p>
              <h4 className="mt-2 font-semibold text-gray-900" data-testid="text-attribution-title">
                Attribution &amp; Reporting
              </h4>
              <p className="mt-2 text-gray-600" data-testid="text-attribution-description">
                Unify GA4 + ad platforms to see ROAS, CPA, and payback clearly across locations.
              </p>
              <a
                href="#attribution"
                className="mt-4 inline-block text-indigo-600 font-semibold hover:text-indigo-700"
                data-testid="link-attribution-playbook"
              >
                Learn more →
              </a>
            </div>

            <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm hover:shadow-md transition" data-testid="card-youtube">
              <p className="text-xs uppercase tracking-wide text-gray-500">Video Ads</p>
              <h4 className="mt-2 font-semibold text-gray-900" data-testid="text-youtube-title">
                YouTube Ads
              </h4>
              <p className="mt-2 text-gray-600" data-testid="text-youtube-description">
                Educate and convert with high-intent audiences (itineraries, destination research, gym near me).
              </p>
              <a
                href="#youtube"
                className="mt-4 inline-block text-indigo-600 font-semibold hover:text-indigo-700"
                data-testid="link-youtube-playbook"
              >
                Learn more →
              </a>
            </div>

            <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm hover:shadow-md transition" data-testid="card-fractional-cmo">
              <p className="text-xs uppercase tracking-wide text-gray-500">Strategy</p>
              <h4 className="mt-2 font-semibold text-gray-900" data-testid="text-cmo-title">
                Fractional CMO
              </h4>
              <p className="mt-2 text-gray-600" data-testid="text-cmo-description">
                Align teams, locations, and vendors behind a unified roadmap and weekly reporting rhythm.
              </p>
              <a
                href="#fcm"
                className="mt-4 inline-block text-indigo-600 font-semibold hover:text-indigo-700"
                data-testid="link-cmo-playbook"
              >
                Learn more →
              </a>
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
