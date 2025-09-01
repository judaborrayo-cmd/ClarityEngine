export default function Services() {
  const services = [
    {
      id: "clarity-audit",
      title: "Growth Clarity Audit",
      summary:
        "A 360° audit to uncover what’s costing you conversions. You’ll get a full-funnel review, a video walkthrough, and a prioritized action plan.",
      bullets: [
        "Custom video walkthrough (15–30 min) + PDF summary",
        "Tracking & attribution check (GA4, GTM, Ads pixels)",
        "RO/ROAS snapshot with quick wins",
        "Top 10–15 priorities ranked by impact",
        "Email support for 2 weeks to implement fixes",
      ],
      cta: "Start the Clarity Audit",
    },
    {
      id: "google-ads",
      title: "Google Ads Management",
      summary:
        "High-ROI Search, Performance Max, and YouTube campaigns built for efficiency, scale, and measurable results.",
      bullets: [
        "Comprehensive account & tracking audit",
        "Keyword + negative keyword architecture (theme-based)",
        "Ad copy & extensions, testing roadmap, bidding strategy",
        "Weekly optimization & reporting cadence",
        "Landing page & funnel alignment for higher CVR",
      ],
      cta: "Optimize Google Ads",
    },
    {
      id: "paid-social",
      title: "Paid Social Media Growth",
      summary:
        "Creative testing, precision targeting, and scaling across Meta & beyond. Brand story meets conversions.",
      bullets: [
        "Hook → Retain → Reward creative testing framework",
        "Cold / Warm / Remarketing tiers with tailored creative",
        "Audience building (interests, lookalikes, UGC leverage)",
        "Weekly creative + bid experimentation",
        "Full-funnel metrics: CTR, CVR, CPA/ROAS",
      ],
      cta: "Scale Paid Social",
    },
    {
      id: "fractional-cmo",
      title: "Fractional CMO",
      summary:
        "Senior-level partnership unifying strategy, offers, funnels, and paid media. Strategist + operator embedded with your team.",
      bullets: [
        "Quarterly growth roadmap & OKRs",
        "Cross-channel budget & testing plan",
        "Conversion rate optimization program",
        "Reporting OS (weekly & monthly)",
        "Vendor & team coordination (creative, web, email, media)",
      ],
      cta: "Explore Fractional CMO",
    },
    {
      id: "ad-grant",
      title: "Non-Profit Google Grant Build",
      summary:
        "Unlock and maximize your $10K/month Google Ad Grant with compliant structure, tracking, and training.",
      bullets: [
        "Grant best-practices to maintain eligibility",
        "Full Search campaign build (themes/ad groups)",
        "Conversion tracking (GTM/GA4/Ads), policy compliance",
        "Negative keyword hygiene & QS improvements",
        "Team handoff + training",
      ],
      cta: "Launch Your Grant",
    },
    {
      id: "cro",
      title: "CRO & Funnel Optimization",
      summary:
        "Prioritized testing roadmap across pages, offers, and analytics to increase CVR and ROAS.",
      bullets: [
        "Heuristic & data review (GA4, Hotjar, ads data)",
        "Hypotheses ranked by ICE/PIE score",
        "A/B testing & instrumentation checklist",
        "Creative briefs for ads & landers",
        "Weekly stand-ups to iterate & scale winners",
      ],
      cta: "Boost Conversions",
    },
  ];

  // Brand colors
  const brand = {
    pink: "#fd89c0",
    green: "#0d513a",
    purple: "#5242f3",
    peach: "#fff5f3",
    black: "#030000",
  };

  return (
    <main className="min-h-screen bg-white" style={{ color: brand.black }}>
      {/* Hero */}
      <section
        className="px-6 pt-16 pb-8 lg:px-8 border-b"
        style={{ borderColor: "#e5e7eb", background: `linear-gradient(#fff, ${brand.peach})` }}
      >
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Services</h1>
          <p className="mt-3" style={{ color: brand.green }}>
            Choose your entry point or build a plan across channels. Start with a Clarity Audit or dive straight into
            management.
          </p>

          {/* Anchor chips */}
          <div className="mt-6 flex flex-wrap gap-3">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full px-4 py-2 text-sm border hover:opacity-90"
                style={{ borderColor: brand.pink }}
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Services list */}
      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-10">
          {services.map((s) => (
            <article
              key={s.id}
              id={s.id}
              className="rounded-2xl p-6 shadow-sm"
              style={{ border: `1px solid ${brand.pink}`, background: "#fff" }}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <h2 className="text-2xl font-bold">{s.title}</h2>
                  <p className="mt-2" style={{ color: brand.green }}>
                    {s.summary}
                  </p>
                  <ul className="mt-4 grid gap-2 list-disc pl-5" style={{ color: brand.green }}>
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>

                <div className="shrink-0">
                  <a
                    href="#cta"
                    className="inline-block rounded-2xl px-5 py-3 font-semibold text-white"
                    style={{ background: brand.pink }}
                  >
                    {s.cta}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* How it works / Who it's for / Starting points */}
      <section
        className="px-6 pb-16 lg:px-8 border-t"
        style={{ borderColor: "#e5e7eb", background: brand.peach }}
      >
        <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-3">
          <div>
            <h3 className="text-xl font-bold">How engagements work</h3>
            <ul className="mt-4 list-disc pl-5" style={{ color: brand.green }}>
              <li>Kickoff → access & analytics check → roadmap</li>
              <li>Build → launch → iterate weekly</li>
              <li>Reporting OS with clear KPIs & ROI focus</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold">Who this is for</h3>
            <ul className="mt-4 list-disc pl-5" style={{ color: brand.green }}>
              <li>Ambitious brands in E-commerce, Retreats, Luxury, Education</li>
              <li>Teams that value strategy + hands-on execution</li>
              <li>Leaders who want measurable outcomes, not vanity metrics</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold">Starting points</h3>
            <ul className="mt-4 list-disc pl-5" style={{ color: brand.green }}>
              <li><a href="#clarity-audit" className="underline">Growth Clarity Audit</a> – fastest way to identify wins</li>
              <li><a href="#google-ads" className="underline">Google Ads Management</a> – Search/PMAX/YouTube</li>
              <li><a href="#paid-social" className="underline">Paid Social Growth</a> – creative testing & scale</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}