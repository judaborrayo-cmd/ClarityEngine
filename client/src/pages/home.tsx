import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProblemsTicker from "@/components/ProblemsTicker";
import amaWaterwaysLogo from "@assets/ama-waterways-seeklogo_1758461361953.png";
import popcornIndianaLogo from "@assets/Popcorn-Indiana-logo-Hartley-Berg_1758463163430.png";
import ascendLogo from "@assets/ascend-logo-B_1758463167834.png";
import microsoftLogo from "@assets/Microsoft-Design_1758463290202.png";
import denaGamesLogo from "@assets/Dena-Games-Logo_1758463419409.png";
import estrellaGymnasticsLogo from "@assets/Estrella-Gymnastics-logo_1758464245387.png";
import capitalGymnasticsLogo from "@assets/capital-gymnastics-logo_1758464403830.png";
import tigarGymnasticsLogo from "@assets/Tigar Gymnastics Logo-vmake_1758554236584.png";
import houstonGymnasticsLogo from "@assets/Houston-Gymnastics-Academy-vmake_1758554236584.png";
import sgtMenuLogo from "@assets/SGT-MENU-LOGO-1_1758554236584.png";
import noTypicalMomentsLogo from "@assets/No-Typical-Moments-Logo_1758554458418.png";
import marketerHireLogo from "@assets/MarketerHire Logo_1758554458419.png";
import rowlandBallardLogo from "@assets/Rowland-Ballard-Logo_1758554468287.png";

/**
 * Homepage Light Renovation — Credibility Hub + Faster Paths
 * Framework: React + TailwindCSS (no external deps)
 *
 * What this file includes:
 *  - Hero with 2 CTAs and Microproof
 *  - Proof Bar (real logos/metrics)
 *  - Value Ladder (3 cards)
 *  - YouTube Cred Block (1 feature + 2 thumbs)
 *  - Services Tiles
 *  - Case Study Cards (carousel-ready grid)
 *  - FAQ (3–5 items)
 *  - Sticky CTA (mobile & desktop)
 */

// Progress Bar Component
function ProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${scrollProgress}%` }} />
    </div>
  );
}

// Rotating Word Component
function RotatingWord({ words }: { words: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, 300);
    }, 2000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span 
      className={`inline-block font-semibold text-green-600 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      data-testid="rotating-word"
    >
      {words[currentIndex]}
    </span>
  );
}

const Section = ({ id, className = "", children }: { id: string; className?: string; children: React.ReactNode }) => (
  <section id={id} className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </section>
);

const PrimaryButton = ({ href = "#", children, testId }: { href?: string; children: React.ReactNode; testId?: string }) => (
  <a
    href={href}
    className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-base font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
    data-testid={testId}
  >
    {children}
  </a>
);

const SecondaryButton = ({ href = "#", children, testId }: { href?: string; children: React.ReactNode; testId?: string }) => (
  <a
    href={href}
    className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-base font-semibold border border-green-300 text-green-700 hover:bg-green-50 transition-colors duration-200"
    data-testid={testId}
  >
    {children}
  </a>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50/60 px-3 py-1 text-xs font-medium text-green-700 backdrop-blur">
    {children}
  </span>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}>
    {children}
  </div>
);

const Divider = () => <div className="h-px w-full bg-gray-100 my-3" />;

const LogoImage = ({ src, alt, className = "" }: { src: string; alt: string; className?: string }) => (
  <img 
    src={src} 
    alt={alt} 
    className={`h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 ${className}`}
    data-testid={`logo-${alt.toLowerCase().replace(/\s+/g, '-')}`}
  />
);

const YouTubeEmbed = ({ src, title }: { src: string; title: string }) => (
  <div className="relative w-full overflow-hidden rounded-2xl shadow-lg" style={{ paddingTop: "56.25%" }}>
    <iframe
      className="absolute inset-0 h-full w-full"
      src={src}
      title={title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      data-testid="youtube-embed"
    />
  </div>
);

// --- SIMPLE CONFIG FOR EASY SWAPS ---
const CONFIG = {
  featuredVideo: {
    id: "dQw4w9WgXcQ", // TODO: replace with your video id only
    title: "How We Scale Paid Media in 90 Days",
    url() {
      return `https://www.youtube.com/embed/${this.id}`;
    },
  },
  sideVideos: [
    { id: "r6zIGXun57U", title: "Audit Teardown: Fix Tracking Fast", href: "https://www.youtube.com/watch?v=r6zIGXun57U" },
    { id: "9bZkp7q19f0", title: "Tiered Remarketing in Practice", href: "https://www.youtube.com/watch?v=9bZkp7q19f0" },
  ],
};

export default function Home() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <ProgressBar />
      <main className="relative min-h-screen overflow-x-hidden bg-white text-gray-900">
        {/* --- HERO --- */}
        <Section id="hero" className="pt-14 pb-12 lg:pt-20 lg:pb-16">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-gray-900" data-testid="hero-title">
              Scaling Ambitious Brands with <span className="bg-gradient-to-r from-green-500 via-green-600 to-green-500 bg-clip-text text-transparent">ROI-Driven</span> Paid Media & Growth Strategy
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-600" data-testid="hero-description">
              We help founders and teams grow without wasting money on vanity metrics, cookie-cutter campaigns, or broken tracking. Clarity Engine exists to bring clarity, structure, and measurable ROI to every <RotatingWord words={["Campaign", "Account", "Region", "Vertical", "Challenge", "Paid Media Channel", "Agency", "Client", "Team", "Partnership"]} />.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <PrimaryButton href="#book-intro" testId="hero-cta-book">Book a Strategic Intro Call</PrimaryButton>
              <SecondaryButton href="#services" testId="hero-cta-services">Explore Services & Wins</SecondaryButton>
            </div>
            <p className="mt-4 text-sm text-gray-500 text-center">10–20 min · $75 deposit · Credited to first engagement</p>

            {/* Microproof row */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2" data-testid="hero-badges">
              <Badge>$3M+ in ad spend managed across growth brands</Badge>
              <Badge>Multi-million in revenue driven through paid media</Badge>
              <Badge>Proven results across Retreats, E-commerce, Luxury, and Education</Badge>
              <Badge>10+ years in paid media & growth strategy</Badge>
              <Badge>Recognized by Contra as a Top Specialist in 2025</Badge>
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-500">Paid booking filters for seriousness; deposit credited if we're a fit.</p>
            </div>
          </div>
        </Section>

        {/* --- PROBLEMS TICKER --- */}
        <ProblemsTicker />

        {/* --- PROOF BAR --- */}
        <div className="bg-gray-50 py-8">
          <Section id="proof-bar" className="">
            <div className="text-center mb-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Trusted by Leading Brands</h2>
            </div>
            
            {/* Three rows of logos */}
            <div className="space-y-6">
              {/* First row */}
              <div className="flex flex-wrap items-center justify-center gap-8">
                <LogoImage src={amaWaterwaysLogo} alt="AMA Waterways" />
                <LogoImage src={popcornIndianaLogo} alt="Popcorn Indiana" />
                <LogoImage src={ascendLogo} alt="Ascend" />
                <LogoImage src={microsoftLogo} alt="Microsoft" />
                <LogoImage src={denaGamesLogo} alt="Dena Games" />
              </div>
              
              {/* Second row */}
              <div className="flex flex-wrap items-center justify-center gap-8">
                <LogoImage src={estrellaGymnasticsLogo} alt="Estrella Gymnastics" />
                <LogoImage src={capitalGymnasticsLogo} alt="Capital Gymnastics" />
                <LogoImage src={tigarGymnasticsLogo} alt="Tigar Gymnastics" />
                <LogoImage src={houstonGymnasticsLogo} alt="Houston Gymnastics" />
              </div>
              
              {/* Third row with metrics */}
              <div className="flex flex-wrap items-center justify-center gap-8">
                <LogoImage src={sgtMenuLogo} alt="SGT Menu" />
                <LogoImage src={noTypicalMomentsLogo} alt="No Typical Moments" />
                <LogoImage src={marketerHireLogo} alt="MarketerHire" />
                <LogoImage src={rowlandBallardLogo} alt="Rowland Ballard" />
              </div>
              
              {/* Key metrics */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-4 border-t border-gray-200">
                <div className="text-sm font-semibold text-green-600" data-testid="metric-cpl">-56% CPL in 60 days</div>
                <div className="text-sm font-semibold text-green-600" data-testid="metric-calls">3× more calls booked</div>
                <div className="text-sm font-semibold text-green-600" data-testid="metric-revenue">$3M+ in ad spend managed</div>
              </div>
            </div>
          </Section>
        </div>

        {/* --- VALUE LADDER --- */}
        <Section id="value-ladder" className="py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl text-gray-900">Work with us, your way</h2>
            <p className="mt-4 text-xl text-gray-600">Start quick, then go deeper as needed.</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <Card>
              <h3 className="text-xl font-semibold text-gray-900" data-testid="card-intro-call">Strategic Intro Call (10–20 min)</h3>
              <p className="mt-2 text-sm font-medium text-gray-700">$75 deposit · credited to audit/retainer</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-600">
                <li>Pinpoint biggest growth leaks (ads, tracking, funnel)</li>
                <li>Immediate next steps + quick wins</li>
                <li>Deposit fully credited if we move forward</li>
              </ul>
              <a href="#book-intro" className="mt-6 inline-block text-sm font-semibold text-green-600 hover:text-green-700 underline transition-colors" data-testid="link-intro-call">See details</a>
            </Card>
            <Card>
              <h3 className="text-xl font-semibold text-gray-900" data-testid="card-audit">Deep‑Dive Audit ($600–900)</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-600">
                <li>Tracking & funnel assessment</li>
                <li>Account structure review</li>
                <li>30‑day action plan</li>
              </ul>
              <Link to="/growth-clarity-audit" className="mt-6 inline-block text-sm font-semibold text-green-600 hover:text-green-700 underline transition-colors" data-testid="link-audit">See scope & pricing</Link>
            </Card>
            <Card>
              <h3 className="text-xl font-semibold text-gray-900" data-testid="card-retainer">Growth Retainer ($3,200–$15,000/mo)</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-600">
                <li>Omni‑channel ads (Google, Meta, YouTube)</li>
                <li>Tiered remarketing & CRO</li>
                <li>Weekly iteration & reporting</li>
              </ul>
              <a href="#retainer" className="mt-6 inline-block text-sm font-semibold text-green-600 hover:text-green-700 underline transition-colors" data-testid="link-retainer">See program</a>
            </Card>
          </div>
        </Section>

        {/* --- YOUTUBE CRED BLOCK --- */}
        <Section id="youtube" className="py-16">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4" data-testid="featured-video-title">{CONFIG.featuredVideo.title}</h3>
                <YouTubeEmbed
                  src={CONFIG.featuredVideo.url()}
                  title={CONFIG.featuredVideo.title}
                />
              </div>
            </div>
            <div className="space-y-6">
              <Card>
                <h3 className="text-lg font-semibold text-gray-900">How We Scale in 90 Days</h3>
                <p className="mt-3 text-gray-600">A quick walkthrough of the discovery → diagnose → design → drive framework.</p>
                <a href={CONFIG.sideVideos[0].href} className="mt-4 inline-block text-sm font-semibold text-green-600 hover:text-green-700 underline transition-colors" data-testid="link-video-scale">Watch on YouTube</a>
              </Card>
              <Card>
                <h3 className="text-lg font-semibold text-gray-900">Audit Teardown (5 mins)</h3>
                <p className="mt-3 text-gray-600">Common tracking gaps and how to fix them fast.</p>
                <a href={CONFIG.sideVideos[1].href} className="mt-4 inline-block text-sm font-semibold text-green-600 hover:text-green-700 underline transition-colors" data-testid="link-video-audit">Watch clip</a>
              </Card>
            </div>
          </div>
        </Section>

        {/* --- SERVICES TILES --- */}
        <Section id="services" className="py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl text-gray-900">Services at a glance</h2>
            <p className="mt-4 text-xl text-gray-600">Outcome‑focused playbooks we can plug in.</p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Google Ads Strategy", bullets: ["Capture high‑intent searches", "Cut CPL & eliminate waste"], href: "#google", testId: "service-google" },
              { title: "Meta Campaigns", bullets: ["Scalable creative systems", "Tiered remarketing"], href: "#meta", testId: "service-meta" },
              { title: "Conversion Optimization", bullets: ["Funnel testing & optimization", "Clearer tracking & attribution"], href: "#cro", testId: "service-cro" },
              { title: "Attribution & Reporting", bullets: ["Unified metrics dashboard", "Decisions, not noise"], href: "#attr", testId: "service-attribution" },
              { title: "YouTube Ads", bullets: ["Educate & capture viewers", "High‑intent video targeting"], href: "#yt", testId: "service-youtube" },
              { title: "Landing Pages", bullets: ["Persuasive UX design", "Faster experiments"], href: "#lp", testId: "service-landing" },
            ].map((service) => (
              <Card key={service.title}>
                <h3 className="text-xl font-semibold text-gray-900" data-testid={service.testId}>{service.title}</h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-600">
                  {service.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <a href={service.href} className="mt-6 inline-block text-sm font-semibold text-green-600 hover:text-green-700 underline transition-colors" data-testid={`link-${service.testId}`}>See playbook</a>
              </Card>
            ))}
          </div>
        </Section>

        {/* --- CASE STUDY PREVIEWS --- */}
        <Section id="case-studies" className="py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl text-gray-900">Selected wins</h2>
            <p className="mt-4 text-xl text-gray-600">Problem → Approach → Result. Short and sweet.</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <Card>
              <h3 className="text-xl font-semibold text-gray-900" data-testid="case-study-gym">Gym chain (10+ locations)</h3>
              <Divider />
              <ul className="mt-4 space-y-3 text-gray-700">
                <li><span className="font-medium text-gray-900">Problem:</span> Rising CPL, flat sign‑ups</li>
                <li><span className="font-medium text-gray-900">Approach:</span> Tiered remarketing + search overhaul</li>
                <li><span className="font-medium text-green-600">Result:</span> −56% CPL in 60 days</li>
              </ul>
              <a href="#cs-gym" className="mt-6 inline-block text-sm font-semibold text-green-600 hover:text-green-700 underline transition-colors" data-testid="link-case-study-gym">Open full case study</a>
            </Card>
            <Card>
              <h3 className="text-xl font-semibold text-gray-900" data-testid="case-study-travel">Luxury travel (Galápagos)</h3>
              <Divider />
              <ul className="mt-4 space-y-3 text-gray-700">
                <li><span className="font-medium text-gray-900">Problem:</span> Wasted spend, broken tracking</li>
                <li><span className="font-medium text-gray-900">Approach:</span> Fix tracking + rebuild search</li>
                <li><span className="font-medium text-green-600">Result:</span> More qualified calls, better ROAS</li>
              </ul>
              <a href="#cs-travel" className="mt-6 inline-block text-sm font-semibold text-green-600 hover:text-green-700 underline transition-colors" data-testid="link-case-study-travel">Open full case study</a>
            </Card>
            <Card>
              <h3 className="text-xl font-semibold text-gray-900" data-testid="case-study-jewelry">Fine jewelry (e‑com)</h3>
              <Divider />
              <ul className="mt-4 space-y-3 text-gray-700">
                <li><span className="font-medium text-gray-900">Problem:</span> Low AOV catalog retargeting</li>
                <li><span className="font-medium text-gray-900">Approach:</span> Dynamic sets + creative testing</li>
                <li><span className="font-medium text-green-600">Result:</span> Higher AOV & repeat buyers</li>
              </ul>
              <a href="#cs-jewelry" className="mt-6 inline-block text-sm font-semibold text-green-600 hover:text-green-700 underline transition-colors" data-testid="link-case-study-jewelry">Open full case study</a>
            </Card>
          </div>
        </Section>

        {/* --- FAQ --- */}
        <Section id="faq" className="py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl text-gray-900">FAQs</h2>
            <p className="mt-4 text-xl text-gray-600">Quick answers to common questions.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Card>
              <h3 className="text-lg font-semibold text-gray-900" data-testid="faq-results">How fast can I see results?</h3>
              <p className="mt-3 text-gray-600">Audits deliver clarity in days or weeks, not months. Most clients see meaningful movement in 30–60 days once tracking and structure are fixed.</p>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold text-gray-900" data-testid="faq-budgets">What budgets do you work with?</h3>
              <p className="mt-3 text-gray-600">From 5k budgets to $30k+/mo. The playbook adapts to your growth stage and business model. If your budget and goals aren't a fit, we'll let you know quickly and point you in the right direction.</p>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold text-gray-900" data-testid="faq-contracts">Do you require long‑term contracts?</h3>
              <p className="mt-3 text-gray-600">No annual lock‑in. We start with a 90‑day plan and iterate from there based on results.</p>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold text-gray-900" data-testid="faq-team">Will you work with our team?</h3>
              <p className="mt-3 text-gray-600">Yes. We plug in as partners or fractional CMOs and collaborate seamlessly with your existing team.</p>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold text-gray-900" data-testid="faq-deposit">Why is there a $75 deposit?</h3>
              <p className="mt-3 text-gray-600">It keeps the calendar focused on serious, high-impact conversations. It also covers prep time and ensures we're both invested. If we decide to work together, the deposit is fully credited toward your first audit or retainer.</p>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold text-gray-900" data-testid="faq-duration">Is the call only 10 minutes?</h3>
              <p className="mt-3 text-gray-600">Plan for 10–20 minutes. The goal is speed and clarity—identify your biggest ROI blockers, outline next steps, and confirm fit.</p>
            </Card>
          </div>
        </Section>

        {/* --- BOOKING TARGETS (ANCHORS) --- */}
        <Section id="book-intro" className="py-16">
          <Card className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900" data-testid="booking-title">Book a Strategic Intro Call (10–20 min)</h2>
            <p className="mt-3 text-lg text-gray-600">Aligned goals, surface bottlenecks, set the next step. A <strong>$75 deposit</strong> is required to reserve your slot and is <strong>fully credited</strong> toward your first audit or retainer if we're a fit.</p>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Qualifying questions you'll answer when booking:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Current monthly ad spend (range)</li>
                <li>• Primary growth goal for next 3–6 months</li>
                <li>• Biggest challenge right now (tracking, ROI, CAC, scaling, etc.)</li>
                <li>• Timeline to start (immediately, 30–60 days, 90+ days)</li>
              </ul>
            </div>
            
            {/* Calendly embed placeholder - replace with actual Calendly code */}
            <div className="mt-8">
              <div 
                className="h-96 w-full rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center"
                data-testid="calendly-placeholder"
              >
                <div className="text-center">
                  <p className="text-gray-500 text-lg mb-4">📅 Calendly Integration Ready</p>
                  <p className="text-gray-400 text-sm mb-4">Replace this section with your Calendly embed code:</p>
                  <div className="text-left text-xs text-gray-400 bg-white p-4 rounded border mb-4 max-w-md">
                    <code>{`<!-- Calendly inline widget begin -->`}<br/>
                    {`<div class="calendly-inline-widget" data-url="https://calendly.com/your-username/10min" style="min-width:320px;height:580px;"></div>`}<br/>
                    {`<script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>`}<br/>
                    {`<!-- Calendly inline widget end -->`}</code>
                  </div>
                  <div className="mt-4">
                    <PrimaryButton href="https://calendly.com/your-link" testId="button-calendly">Book Strategic Intro Call</PrimaryButton>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-gray-500">Serious inquiries only. Limited availability each week.</p>
          </Card>
        </Section>

        <Section id="audit" className="py-16">
          <Card className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900">Deep‑Dive Audit</h2>
            <p className="mt-3 text-lg text-gray-600">A comprehensive assessment of your tracking, campaign structure, and funnel with a prioritized 30-day action plan.</p>
            <ul className="mt-6 list-disc space-y-2 pl-6 text-gray-600">
              <li>Verify analytics & pixel setup</li>
              <li>Rebuild campaigns for efficiency</li>
              <li>Identify CRO opportunities</li>
              <li>Provide a roadmap with quick wins</li>
            </ul>
            <p className="mt-6 text-sm text-gray-600 bg-green-50 p-4 rounded-lg"><strong>Risk-free entry:</strong> If you choose a Growth Retainer within 14 days of receiving your audit, your $900 fee is fully credited toward your first month.</p>
            <div className="mt-8">
              <Link to="/growth-clarity-audit" className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-base font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors duration-200" data-testid="button-audit">Get Growth Clarity Audit</Link>
            </div>
          </Card>
        </Section>

        <Section id="retainer" className="py-16">
          <Card className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900">Growth Retainer</h2>
            <p className="mt-3 text-lg text-gray-600">Hands‑on management and strategy to drive compounding results.</p>
            <ul className="mt-6 list-disc space-y-2 pl-6 text-gray-600">
              <li>Omni‑channel ads (Google, Meta, YouTube)</li>
              <li>Tiered remarketing & CRO</li>
              <li>Weekly optimization & reporting</li>
              <li>Fractional CMO leadership</li>
            </ul>
            <p className="mt-6 text-sm text-gray-600 bg-green-50 p-4 rounded-lg"><strong>Commitment terms:</strong> We start with an initial 90-day plan (enough time to implement, test, and prove results). After that, we move to a month-to-month partnership with just 30 days' notice. It gives us the runway to win together, while keeping things flexible for you.</p>
            <div className="mt-8">
              <PrimaryButton href="#book-intro" testId="button-retainer">Book Strategic Intro Call</PrimaryButton>
            </div>
          </Card>
        </Section>

        {/* --- STICKY CTA --- */}
        <a
          href="#book-intro"
          className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-xl hover:bg-green-700 transition-all duration-200 hover:scale-105 sm:px-6 sm:py-4 sm:bottom-6 sm:right-6"
          data-testid="sticky-cta"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('book-intro');
          }}
          style={{ marginBottom: 'max(env(safe-area-inset-bottom), 0px)' }}
        >
          <span className="hidden sm:inline">Book Strategic Intro Call</span>
          <span className="sm:hidden">Book Call</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h9.69L10.22 6.04a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.21H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
          </svg>
        </a>
      </main>
    </div>
  );
}