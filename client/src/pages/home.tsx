import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProblemsTicker from "@/components/ProblemsTicker";
import HeroCTAs from "@/components/HeroCTAs";
import StartCards from "@/components/StartCards";
import ExitIntentModal from "@/components/ExitIntentModal";
import CalendlyInline from "@/components/CalendlyInline";
import { Quote } from "lucide-react";
import mariSmithPhoto from "@assets/Mari_1758572440824.jpg";
import lindseyBassPhoto from "@assets/Lindsey_Bast_1758572440824.jpg";
import alyssaArmandRoyPhoto from "@assets/Alyssa_1758572440823.jpg";
import danielaGutenkovski from "@assets/Daniela_1758572440824.jpg";
import mikeBerkmanPhoto from "@assets/Mike_Berkman_1758572440825.jpg";
import billBowmanPhoto from "@assets/Bill_Bowman_1758572440823.jpg";
import amaWaterwaysLogo from "@assets/ama-waterways-seeklogo_1758461361953.png";
import popcornIndianaLogo from "@assets/Popcorn-Indiana-logo-Hartley-Berg_1758463163430.png";
import ascendLogo from "@assets/ascend-logojpg-x-small_1759067902299.jpeg";
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
    className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
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
    className={`h-[60px] w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 ${className}`}
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

// --- TESTIMONIALS DATA ---
const testimonials = [
  {
    id: 1,
    name: "Mari Smith",
    title: "Co-Founder & Marketing Director",
    avatar: mariSmithPhoto,
    review: "It's always enjoyable writing a recommendation for someone as enjoyable as Juda. I've worked with Juda in a professional capacity for over a year now at Sociality Squared. We've worked on his various clients together and he's worn many different hats.",
    bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
    textColor: "text-white"
  },
  {
    id: 2,
    name: "Lindsey Bast",
    title: "Digital Strategist & Growth Marketer",
    avatar: lindseyBassPhoto,
    review: "I highly recommend Juda as a skilled and professional growth marketer. I've worked with him on multiple digital marketing strategies and media buying projects. Juda gives it his all for his clients.",
    bgColor: "bg-gradient-to-br from-purple-400 to-purple-500",
    textColor: "text-white"
  },
  {
    id: 3,
    name: "Alyssa Brooke-Gay",
    title: "Senior Project Manager",
    avatar: alyssaArmandRoyPhoto,
    review: "Juda is a phenomenal colleague and complete rockstar for his clients! I've had the pleasure of working with Juda for over a year, and we've collaborated on several large-scale digital marketing projects throughout that time.",
    bgColor: "bg-gradient-to-br from-green-500 to-green-600",
    textColor: "text-white"
  },
  {
    id: 4,
    name: "Daniela Goldzmindt",
    title: "Marketing Manager",
    avatar: danielaGutenkovski,
    review: "Juda is simply one of the best persons I have had the opportunity to work with. Not only he is proficient in Marketing, specially in the paid media field, but also, he has a very strong work ethic and solid soft skills. Juda is a team player.",
    bgColor: "bg-gradient-to-br from-pink-500 to-pink-600",
    textColor: "text-white"
  },
  {
    id: 5,
    name: "Mike Berkman",
    title: "VP of Performance",
    avatar: mikeBerkmanPhoto,
    review: "I had the pleasure of working with Juda during his tenure at Lamark. During his interview, I knew he would bring a different level of thinking and analysis to the team that we were needing. He did not disappoint.",
    bgColor: "bg-gradient-to-br from-pink-400 to-pink-500",
    textColor: "text-white"
  },
  {
    id: 6,
    name: "Bill Bowman",
    title: "Vice President of Marketing",
    avatar: billBowmanPhoto,
    review: "Juda is an exceptional marketing talent. He is able to manage complex advertising campaigns in a calm and focused way. While working with him, he continually suggested new and interesting ways to accomplish our team goals.",
    bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
    textColor: "text-white"
  }
];

// --- TESTIMONIAL COMPONENT ---
const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <div className={`${testimonial.bgColor} ${testimonial.textColor} rounded-2xl p-6 shadow-lg`}>
    <Quote className="h-8 w-8 mb-4 opacity-80" />
    <p className="text-lg mb-6 leading-relaxed">{testimonial.review}</p>
    <div className="flex items-center gap-4">
      <img 
        src={testimonial.avatar} 
        alt={testimonial.name}
        className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
      />
      <div>
        <p className="font-semibold">{testimonial.name}</p>
        <p className="text-sm opacity-90">{testimonial.title}</p>
      </div>
    </div>
  </div>
);

export default function Home() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWaitlist = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const evt = new MouseEvent("mouseout", { clientY: -1, relatedTarget: null, bubbles: true });
    document.dispatchEvent(evt);
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

            <HeroCTAs />

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

        {/* --- TESTIMONIALS AFTER HERO --- */}
        <Section id="testimonials-hero" className="py-12 bg-gray-50">
          <div className="mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8">
              <TestimonialCard testimonial={testimonials[4]} />
              <TestimonialCard testimonial={testimonials[2]} />
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

        {/* --- START CARDS (CRO) --- */}
        <Section id="value-ladder" className="py-16">
          <StartCards onOpenWaitlist={openWaitlist} />
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
              <h3 className="text-lg font-semibold text-gray-900" data-testid="faq-duration">How long is the Strategic Intro Call?</h3>
              <p className="mt-3 text-gray-600">Plan for 20–30 minutes. The goal is speed and clarity—identify your biggest ROI blockers, outline next steps, and confirm fit.</p>
            </Card>
          </div>
        </Section>

        {/* --- BOOKING SECTION (#book-call and #book-intro) --- */}
        <Section id="book-call" className="py-16">
          <Card className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900" data-testid="booking-title">Book a Strategic Intro Call (20–30 min)</h2>
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
            
            {/* Calendly inline widget */}
            <div className="mt-8" id="book-intro">
              <CalendlyInline height={700} />
            </div>
            <p className="mt-4 text-center text-sm text-gray-500">Serious inquiries only. Limited availability each week.</p>
          </Card>
          
          {/* Testimonial in booking section */}
          <div className="mt-8 max-w-4xl mx-auto">
            <TestimonialCard testimonial={testimonials[1]} />
          </div>
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

        {/* --- TESTIMONIAL BEFORE RETAINER --- */}
        <Section id="testimonial-retainer" className="py-12 bg-white">
          <div className="mx-auto max-w-4xl">
            <TestimonialCard testimonial={testimonials[0]} />
          </div>
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
              <button
                type="button"
                onClick={() => {
                  const calendlyUrl = 'https://calendly.com/juda-borrayo/strategic-intro-call-10-20-min';
                  if ((window as any).Calendly) {
                    try {
                      (window as any).Calendly.initPopupWidget({ url: calendlyUrl });
                    } catch (error) {
                      console.error('Calendly popup error:', error);
                      window.open(calendlyUrl, '_blank');
                    }
                  } else {
                    window.open(calendlyUrl, '_blank');
                  }
                }}
                className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                data-testid="button-retainer"
              >
                Book Strategic Intro Call
              </button>
            </div>
          </Card>
        </Section>

        <ExitIntentModal />
      </main>
    </div>
  );
}