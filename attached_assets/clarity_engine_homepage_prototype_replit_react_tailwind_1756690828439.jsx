export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-[#030000]">
      {/* HERO */}
      <section className="relative isolate px-6 pt-20 pb-16 lg:px-8 bg-gradient-to-b from-white to-[#fff5f3]">
        <div className="mx-auto max-w-4xl text-center">
          <img
            src="/clarity-engine-logo.png"
            alt="Clarity Engine Logo"
            className="mx-auto h-28 w-auto mb-6"
          />
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-[#030000]">
            Scaling Ambitious Brands with ROI-Driven Paid Media & Growth Strategy
          </h1>
          <p className="mt-5 text-lg leading-8 text-[#0d513a]">
            I help founders and teams turn ad spend into predictable growth. With over
            <span className="font-semibold text-[#030000]"> $3M in ad budget managed</span> and
            <span className="font-semibold text-[#030000]"> multi-million in revenue driven</span>,
            I bring clarity, structure, and impact to every campaign.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a href="#cta" className="rounded-2xl px-6 py-3 text-base font-semibold shadow-sm ring-1 ring-[#fd89c0] text-[#fd89c0] hover:bg-[#fd89c0] hover:text-white">
              Start with a Growth Clarity Audit
            </a>
            <a href="#services" className="rounded-2xl px-6 py-3 text-base font-semibold text-white bg-[#5242f3] hover:bg-[#0d513a]">
              See Services
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-[#030000]">Services</h2>
          <p className="mt-2 text-[#0d513a]">Choose your entry point or build a plan across channels.</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Growth Clarity Audit',
                body:
                  'A 360° audit to uncover what’s costing you conversions. Full funnel review, video walkthrough, and an action plan you can implement immediately.',
              },
              {
                title: 'Google Ads Management',
                body:
                  'High-ROI campaigns built for efficiency, scale, and measurable results—from audit to strategy to ongoing optimization.',
              },
              {
                title: 'Paid Social Media Growth',
                body:
                  'Creative testing, precision targeting, and scaling across Meta & beyond. Brand story meets conversions.',
              },
              {
                title: 'Fractional CMO',
                body:
                  'Senior-level partnership unifying strategy, funnels, and paid media. A strategist and operator embedded with your team.',
              },
              {
                title: 'Non-Profit Google Grant Build',
                body:
                  'Unlock and maximize your $10K/month Google Ad Grant: compliance, builds, tracking, and training.',
              },
              {
                title: 'CRO & Funnel Optimization',
                body:
                  'Prioritized testing roadmap across pages, offers, and analytics to increase conversion rate and ROAS.',
              },
            ].map((card) => (
              <article key={card.title} className="rounded-2xl border border-[#fd89c0] p-6 shadow-sm hover:shadow-md transition bg-white">
                <h3 className="text-xl font-semibold text-[#030000]">{card.title}</h3>
                <p className="mt-2 text-[#0d513a]">{card.body}</p>
                <div className="mt-4">
                  <a href="#cta" className="text-[#5242f3] font-medium underline underline-offset-2">Learn more</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="px-6 py-16 lg:px-8 bg-[#fff5f3]">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-[#030000]">Proof & Case Studies</h2>
          <p className="mt-2 text-[#0d513a]">Selected outcomes from recent work.</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Lisa Nichols — Author & Speaker',
                stat: '−47.9% CPC, optimized $250k+ ad spend',
                body: 'Scaled presence with efficient Google & YouTube campaigns; improved CTRs and lowered costs.',
              },
              {
                title: 'Mandali Retreat — Luxury Wellness',
                stat: '5× ROAS while filling retreat bookings',
                body: 'Multi‑channel strategy across Meta & Search; retargeting and geo‑segmented campaigns.',
              },
              {
                title: 'Hapi Art — E‑commerce',
                stat: '10× ROAS, $1M+ revenue generated',
                body: 'Built a profitable system with creative testing and audience expansion.',
              },
              {
                title: 'Lamark Agency — Fitness',
                stat: '11k new members, $2M+ revenue influence',
                body: 'Scaled PPC programs and tracked multi‑location impact.',
              },
            ].map((cs) => (
              <article key={cs.title} className="rounded-2xl border border-[#fd89c0] p-6 bg-white shadow-sm hover:shadow-md transition">
                <div className="text-sm font-semibold text-[#030000]">{cs.title}</div>
                <div className="mt-1 text-sm text-[#5242f3]">{cs.stat}</div>
                <p className="mt-3 text-[#0d513a]">{cs.body}</p>
                <div className="mt-4">
                  <a href="#" className="text-[#5242f3] font-medium underline underline-offset-2">Read full case study</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-[#030000]">What People Say</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              {
                quote:
                  'Juda is an exceptional marketing talent — he approaches challenges with a calm, focused mindset and consistently finds innovative solutions.',
                name: 'VP of Marketing',
              },
              {
                quote:
                  'He brings a different level of analysis and thinking to every campaign. A true partner in driving growth.',
                name: 'VP of Performance',
              },
              {
                quote:
                  'Always learning, always innovating. Juda brings clarity to complex challenges and executes with precision.',
                name: 'Founder, Chief Creative',
              },
            ].map((t, i) => (
              <figure key={i} className="rounded-2xl border border-[#fd89c0] p-6 shadow-sm bg-white">
                <blockquote className="text-[#030000]">“{t.quote}”</blockquote>
                <figcaption className="mt-4 text-sm text-[#0d513a]">— {t.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* WHY ME */}
      <section className="px-6 py-16 lg:px-8 bg-[#fff5f3]">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-[#030000]">Why Work With Me</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-[#0d513a]">
            {[
              '$3M+ in ad spend managed across growth brands',
              'Multi-million in revenue driven through paid media',
              'Proven results across Retreats, E-commerce, Luxury, and Education',
              '10+ years in paid media & growth strategy',
              'Recognized by Contra as a Top Specialist in 2025',
              'Operator + strategist: I plan, build, and optimize',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#5242f3]"></span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl text-center rounded-3xl border border-[#fd89c0] p-10 shadow-sm bg-white">
          <h2 className="text-3xl font-bold text-[#030000]">Ready to scale with clarity?</h2>
          <p className="mt-3 text-[#0d513a]">
            The fastest way to uncover what’s holding back your growth is through a Growth Clarity Audit.
            In 5–10 days, you’ll receive a complete funnel review, video walkthrough, and a roadmap for measurable growth.
          </p>
          <div className="mt-6 flex justify-center">
            <a href="#" className="rounded-2xl px-6 py-3 text-base font-semibold text-white bg-[#fd89c0] hover:bg-[#5242f3]">
              Book Your Growth Clarity Audit
            </a>
          </div>
        </div>
      </section>

      <footer className="px-6 pb-16 lg:px-8 text-center text-sm text-[#0d513a]">
        © {new Date().getFullYear()} Juda Borrayo • Clarity Engine
      </footer>
    </main>
  );
}
