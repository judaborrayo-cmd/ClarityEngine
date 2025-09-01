import { Search, Users, TrendingUp, Crown, Heart, Target, Clock, DollarSign, CheckCircle, ArrowRight } from "lucide-react";

export default function Services() {
  const services = [
    {
      id: "clarity-audit",
      icon: Search,
      title: "Growth Clarity Audit",
      timeline: "5-10 days delivery",
      testimonial: "Based on $3M+ in managed campaigns - uncover what's costing you conversions",
      summary:
        "Full-funnel Growth & CRO audit to uncover what's costing you conversions. Based on $3M+ in campaign experience with clear, concise recording and PDF walk-through.",
      bullets: [
        "PDF and Video Walkthrough of Opportunities - Clear, concise recording and PDF walk through of current opportunities to improve Return on Investment, Return on Ad Spend, Conversion Rates, and Costs Per Lead or Sale",
        "1:1 Call (30-60 minutes) - for CMOs, Strategists, Advertisers, Builders and Owners",
        "Email Support for 2 Weeks - Ask follow-up questions or get light implementation support via email",
      ],
      cta: "Book Clarity Audit",
    },
    {
      id: "google-ads",
      icon: Target,
      title: "Google Ads Management",
      timeline: "2-3 week setup",
      testimonial: "Proven systems from managing $3M+ in ad spend across industries",
      summary:
        "Based on over $3 Million of paid campaigns managed across Google and Meta. Bespoke approach based on your brand's strengths and funnels. Includes ongoing maintenance.",
      bullets: [
        "Google Search Strategy, Build, and Optimization - Working with your business to find the highest potential ROI strategy to follow with Google Ads",
        "Extensive Audit of current Google/YouTube/Paid Media strategies",
        "Google Ads Set-Up (Month 1) - Complete campaign setup including tracking, audience management, and strategic recommendations",
        "Google Search Ads Optimization (Month 2) - Ongoing optimization and reporting cadence",
      ],
      cta: "Start Google Ads Management",
    },
    {
      id: "paid-social",
      icon: Users,
      title: "Paid Social Media Growth",
      timeline: "1-2 week setup",
      testimonial: "Creative testing framework based on brand strengths and funnels",
      summary:
        "Based on over $3 Million of paid campaigns managed across Google and Meta. You will receive a bespoke approach based on your brand's strengths and funnels. Includes ongoing maintenance.",
      bullets: [
        "Social Media Ads Set-Up (Month 1) - Complete setup including tracking, creative brief development, audience research and strategic recommendations",
        "Social Media Ads Optimization (Month 2) - Ongoing creative testing, audience optimization, and bid management",
        "Weekly creative + bid experimentation with detailed reporting",
        "Full-funnel metrics: CTR, CVR, CPA/ROAS tracking and optimization",
      ],
      cta: "Launch Social Campaign",
    },
    {
      id: "fractional-cmo",
      icon: Crown,
      title: "Fractional CMO",
      timeline: "3-month minimum",
      testimonial: "Senior-level package focused on maximizing ROI and profitable advertising strategies",
      summary:
        "Growth Marketing Manager package. Senior level package focused on maximizing and strategizing based on your overall funnel. This is an ongoing relationship focused on maximizing ROI's and profitable advertising strategies.",
      bullets: [
        "Growth Strategy (Month 1) - Full strategy development including funnel analysis, customer acquisition strategy, and budget allocation",
        "Strategic Recommendations (Month 2) - Identify and Sales Focus Areas for upcoming Roadmaps based on conversations and research",
        "Establish or Optimize Current Reporting and Tracking - Review current reporting and tracking systems",
        "Conversion Rate Optimization Testing and Plan - CRO (Ongoing) - Provide templates, ideas, strategies, roadmaps, stakeholder communication",
        "Month 3 and Ongoing - Paid Media Management + Strategy + Weekly Reporting + Weekly Calls + Growth Marketing Tests",
      ],
      cta: "Discuss CMO Partnership",
    },
    {
      id: "ad-grant",
      icon: Heart,
      title: "Non-Profit Google Grant Build",
      timeline: "2-4 weeks",
      testimonial: "Grant best-practices to maintain $10K/month eligibility",
      summary:
        "Unlock and maximize your $10K/month Google Ad Grant with compliant structure, tracking, and training.",
      bullets: [
        "Grant best-practices to maintain eligibility",
        "Full Search campaign build (themes/ad groups)",
        "Conversion tracking (GTM/GA4/Ads), policy compliance",
        "Negative keyword hygiene & QS improvements",
        "Team handoff + training",
      ],
      cta: "Apply for Grant Build",
    },
    {
      id: "cro",
      icon: TrendingUp,
      title: "CRO & Funnel Optimization",
      timeline: "2-week analysis + testing",
      testimonial: "Prioritized testing roadmap based on data and heuristic review",
      summary:
        "Prioritized testing roadmap across pages, offers, and analytics to increase CVR and ROAS.",
      bullets: [
        "Heuristic & data review (GA4, Hotjar, ads data)",
        "Hypotheses ranked by ICE/PIE score",
        "A/B testing & instrumentation checklist",
        "Creative briefs for ads & landers",
        "Weekly stand-ups to iterate & scale winners",
      ],
      cta: "Start CRO Program",
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

          {/* Anchor chips - sticky navigation */}
          <div className="mt-6 sticky top-24 bg-white/95 backdrop-blur-sm py-2 -mx-6 px-6 z-10 border-b" style={{ borderColor: "#e5e7eb" }}>
            <div className="flex flex-wrap gap-3">
              {services.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-full px-4 py-2 text-sm border hover:bg-pink-50 transition-colors"
                  style={{ borderColor: brand.pink, color: brand.green }}
                >
                  {s.title}
                </a>
              ))}
            </div>
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
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between hover:shadow-lg transition-shadow duration-300">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: brand.peach }}>
                      <s.icon className="w-6 h-6" style={{ color: brand.purple }} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{s.title}</h2>
                      <div className="flex gap-4 text-sm" style={{ color: brand.green }}>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {s.timeline}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {s.testimonial && (
                    <div className="mb-3 p-3 rounded-lg" style={{ backgroundColor: brand.peach, color: brand.green }}>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: brand.purple }} />
                        <span className="text-sm italic">"{s.testimonial}"</span>
                      </div>
                    </div>
                  )}
                  
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
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold text-white hover:scale-105 transition-transform"
                    style={{ background: brand.pink }}
                  >
                    {s.cta}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      
      {/* Real Case Studies Section */}
      <section className="px-6 py-16 lg:px-8 border-t" style={{ borderColor: "#e5e7eb" }}>
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Real Results From $3M+ in Managed Ad Spend</h2>
            <p className="mt-2" style={{ color: brand.green }}>Authentic case studies and proven outcomes across industries</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="p-6 rounded-2xl border" style={{ borderColor: brand.pink, backgroundColor: brand.peach }}>
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: brand.purple }}>
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg">Growth Across Industries</h3>
              </div>
              <p className="mb-4" style={{ color: brand.green }}>Multi-vertical campaign management showcasing adaptability across different business models and customer acquisition strategies.</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: brand.green }}>Campaign Reach:</span>
                  <span className="font-semibold">Multiple Industries</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: brand.green }}>Total Managed:</span>
                  <span className="font-semibold">$3M+ Ad Spend</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl border" style={{ borderColor: brand.pink, backgroundColor: brand.peach }}>
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: brand.purple }}>
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg">Maximizing ROI in Fitness</h3>
              </div>
              <p className="mb-4" style={{ color: brand.green }}>Strategic campaign optimization for fitness industry client, demonstrating expertise in high-competition verticals.</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: brand.green }}>Revenue Generated:</span>
                  <span className="font-semibold text-xl" style={{ color: brand.purple }}>$2M+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: brand.green }}>Industry:</span>
                  <span className="font-semibold">Fitness & Wellness</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl border" style={{ borderColor: brand.pink, backgroundColor: brand.peach }}>
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: brand.purple }}>
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg">10x ROAS Achievement</h3>
              </div>
              <p className="mb-4" style={{ color: brand.green }}>Building a profitable advertising system that delivered exceptional return on ad spend through strategic optimization.</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: brand.green }}>ROAS Achieved:</span>
                  <span className="font-semibold text-xl" style={{ color: brand.purple }}>10x</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: brand.green }}>System:</span>
                  <span className="font-semibold">Profitable Ad System</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-8 p-6 rounded-2xl" style={{ backgroundColor: brand.peach }}>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: brand.purple }}>$3M+</div>
                <div className="text-sm" style={{ color: brand.green }}>Total Ad Spend Managed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: brand.purple }}>78%+</div>
                <div className="text-sm" style={{ color: brand.green }}>Conversion Improvements</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: brand.purple }}>321%+</div>
                <div className="text-sm" style={{ color: brand.green }}>ROAS Increases</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Process Section */}
      <section
        className="px-6 py-16 lg:px-8 border-t"
        style={{ borderColor: "#e5e7eb", background: brand.peach }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">How We Work Together</h2>
            <p className="mt-2" style={{ color: brand.green }}>From kickoff to measurable results in 3 clear phases</p>
          </div>
          
          {/* 3-Step Process */}
          <div className="grid gap-8 md:grid-cols-3 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl font-bold text-white mb-4" style={{ backgroundColor: brand.purple }}>
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Week 1-2: Discovery & Strategy</h3>
              <p style={{ color: brand.green }}>Access & analytics audit → roadmap → stakeholder alignment</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl font-bold text-white mb-4" style={{ backgroundColor: brand.pink }}>
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Week 3-6: Build & Launch</h3>
              <p style={{ color: brand.green }}>Campaign setup → creative production → testing framework → go live</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl font-bold text-white mb-4" style={{ backgroundColor: brand.green }}>
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Ongoing: Optimize & Scale</h3>
              <p style={{ color: brand.green }}>Weekly optimization → monthly reporting → continuous improvement</p>
            </div>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-3">
            <div>
              <h3 className="text-xl font-bold">How engagements work</h3>
              <ul className="mt-4 list-disc pl-5" style={{ color: brand.green }}>
                <li>Kickoff → access & analytics check → roadmap</li>
                <li>Build → launch → iterate weekly</li>
                <li>Reporting OS with clear KPIs & ROI focus</li>
                <li>Slack/email support throughout engagement</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold">Who this is for</h3>
              <ul className="mt-4 list-disc pl-5" style={{ color: brand.green }}>
                <li>Ambitious brands in E-commerce, Retreats, Luxury, Education</li>
                <li>Teams that value strategy + hands-on execution</li>
                <li>Leaders who want measurable outcomes, not vanity metrics</li>
                <li>Companies ready to invest in sustainable growth</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold">Starting points</h3>
              <ul className="mt-4 list-disc pl-5" style={{ color: brand.green }}>
                <li><a href="#clarity-audit" className="underline hover:opacity-70">Growth Clarity Audit</a> – fastest way to identify wins</li>
                <li><a href="#google-ads" className="underline hover:opacity-70">Google Ads Management</a> – Search/PMAX/YouTube</li>
                <li><a href="#paid-social" className="underline hover:opacity-70">Paid Social Growth</a> – creative testing & scale</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Service Selection Guide */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Which Service Is Right for You?</h2>
            <p className="mt-2" style={{ color: brand.green }}>Choose based on your current stage and goals</p>
          </div>
          
          <div className="grid gap-6">
            <div className="p-6 rounded-2xl border" style={{ borderColor: brand.pink, backgroundColor: '#fef7f0' }}>
              <h3 className="font-bold text-lg mb-2">🔍 Just Getting Started or Unclear on Issues?</h3>
              <p className="mb-3" style={{ color: brand.green }}>Start with <strong>Growth Clarity Audit</strong> - Get a complete picture of opportunities and priorities before investing in ongoing management.</p>
              <a href="#clarity-audit" className="text-sm font-medium" style={{ color: brand.purple }}>View Clarity Audit →</a>
            </div>
            
            <div className="p-6 rounded-2xl border" style={{ borderColor: brand.pink, backgroundColor: '#fef7f0' }}>
              <h3 className="font-bold text-lg mb-2">🎯 Ready for Ongoing Management?</h3>
              <p className="mb-3" style={{ color: brand.green }}>Perfect for <strong>Google Ads Management</strong> or <strong>Paid Social Growth</strong> - Choose based on whether your audience searches (Google) or scrolls (Social).</p>
              <div className="flex gap-4">
                <a href="#google-ads" className="text-sm font-medium" style={{ color: brand.purple }}>Google Ads →</a>
                <a href="#paid-social" className="text-sm font-medium" style={{ color: brand.purple }}>Paid Social →</a>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl border" style={{ borderColor: brand.pink, backgroundColor: '#fef7f0' }}>
              <h3 className="font-bold text-lg mb-2">🏢 Need Full Strategic Partnership?</h3>
              <p className="mb-3" style={{ color: brand.green }}>Consider <strong>Fractional CMO</strong> - Unify all channels, team coordination, and strategic planning with hands-on execution.</p>
              <a href="#fractional-cmo" className="text-sm font-medium" style={{ color: brand.purple }}>Explore CMO Services →</a>
            </div>
            
            <div className="p-6 rounded-2xl border" style={{ borderColor: brand.pink, backgroundColor: '#fef7f0' }}>
              <h3 className="font-bold text-lg mb-2">📊 Good Traffic but Poor Conversions?</h3>
              <p className="mb-3" style={{ color: brand.green }}>Start with <strong>CRO & Funnel Optimization</strong> - Fix your conversion rate first, then scale with confidence.</p>
              <a href="#cro" className="text-sm font-medium" style={{ color: brand.purple }}>Start CRO Program →</a>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="px-6 py-16 lg:px-8" style={{ backgroundColor: brand.peach }}>
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          </div>
          
          <div className="grid gap-6">
            <div className="p-6 rounded-2xl bg-white border" style={{ borderColor: brand.pink }}>
              <h3 className="font-bold text-lg mb-2">Can services be combined?</h3>
              <p style={{ color: brand.green }}>Absolutely! Many clients start with a Clarity Audit, then move into management services. Fractional CMO includes multiple services in one strategic package.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white border" style={{ borderColor: brand.pink }}>
              <h3 className="font-bold text-lg mb-2">What if I'm not seeing results?</h3>
              <p style={{ color: brand.green }}>Every engagement includes regular reporting and optimization. If we're not hitting targets after 60-90 days, we'll pivot strategy or pause to reassess approach.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white border" style={{ borderColor: brand.pink }}>
              <h3 className="font-bold text-lg mb-2">How hands-on are you vs. just strategy?</h3>
              <p style={{ color: brand.green }}>I'm both strategist AND operator. I build campaigns, write ad copy, set up tracking, and optimize weekly. You get thinking + doing in one person.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white border" style={{ borderColor: brand.pink }}>
              <h3 className="font-bold text-lg mb-2">What size businesses do you work with?</h3>
              <p style={{ color: brand.green }}>Primarily work with established businesses spending $10K+ monthly on ads, or ready to scale to that level. From ambitious startups to $50M+ companies.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white border" style={{ borderColor: brand.pink }}>
              <h3 className="font-bold text-lg mb-2">How do contracts work?</h3>
              <p style={{ color: brand.green }}>Clarity Audit is one-time project. Management services typically start with 3-6 month minimums. Fractional CMO is minimum 3 months, often 6-12 month engagements.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact CTA */}
      <section id="contact" className="px-6 py-16 lg:px-8 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="mb-8" style={{ color: brand.green }}>Book a 15-minute call to discuss your goals and determine the best starting point.</p>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-lg font-semibold text-white hover:scale-105 transition-transform"
            style={{ background: brand.purple }}
          >
            Schedule Strategy Call
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="mt-4 text-sm" style={{ color: brand.green }}>No sales pitch. Just a genuine conversation about your growth challenges.</p>
        </div>
      </section>
    </main>
  );
}