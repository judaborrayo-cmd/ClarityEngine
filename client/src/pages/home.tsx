import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Rocket, 
  Menu, 
  X, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Heart, 
  Target, 
  Mic, 
  Waves, 
  Palette, 
  Dumbbell, 
  Quote, 
  Shield, 
  Linkedin, 
  Twitter, 
  Mail,
  AlertTriangle,
  CheckCircle,
  Zap,
  Handshake,
  Building2,
  Briefcase,
  CheckCircle2,
  Feather,
  ShieldCheck
} from "lucide-react";
import amaWaterwaysLogo from "@assets/ama-waterways-seeklogo_1758461361953.png";
import popcornIndianaLogo from "@assets/Popcorn-Indiana-logo-Hartley-Berg_1758463163430.png";
import ascendLogo from "@assets/ascend-logo-B_1758463167834.png";
import microsoftLogo from "@assets/Microsoft-Design_1758463290202.png";
import denaGamesLogo from "@assets/Dena-Games-Logo_1758463419409.png";
import estrellaGymnasticsLogo from "@assets/Estrella-Gymnastics-logo_1758464245387.png";
import capitalGymnasticsLogo from "@assets/capital-gymnastics-logo_1758464403830.png";

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
      }, 300); // Half second fade out before changing
    }, 2000); // Change word every 2 seconds

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span 
      className={`inline-block font-semibold text-primary transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      data-testid="rotating-word"
    >
      {words[currentIndex]}
    </span>
  );
}

// Profile image paths
const profileImages = {
  lindsey: "/images/lindsey.jpg",
  mari: "/images/mari.jpg",
  alyssa: "/images/alyssa.jpg",
  daniela: "/images/daniela.jpg",
  mike: "/images/mike.jpg",
  bill: "/images/bill.jpg"
};

export default function HomePage() {
  // Avatar problems data
  const AVATARS = {
    "Agencies": [
      "Clients frustrated with unclear ROI",
      "Campaigns wasting budget on bad structures", 
      "Lack of scalable reporting",
      "Hard to differentiate from competitors",
    ],
    "Marketing Teams": [
      "Overwhelmed by too many platforms",
      "Broken tracking between channels",
      "Struggling to hit lead/sales targets", 
      "Internal bottlenecks slowing execution",
    ],
    "Executives": [
      "No senior leader guiding marketing strategy",
      "Wasted ad spend due to misaligned vendors",
      "Disconnected marketing + sales goals",
      "Lack of clarity in decision-making",
    ],
    "Growing Brands": [
      "Scaling ads but hitting a plateau",
      "Unclear funnel leaks costing sales",
      "Over-reliance on one channel",
      "Need predictable revenue, not seasonal spikes",
    ],
  };

  const AVATAR_TABS = [
    { key: "Agencies" as const, icon: Building2 },
    { key: "Marketing Teams" as const, icon: Users },
    { key: "Executives" as const, icon: Briefcase },
    { key: "Growing Brands" as const, icon: Rocket },
  ];

  const [selectedAvatar, setSelectedAvatar] = useState<keyof typeof AVATARS>("Agencies");

  // Logo hover interaction effect
  useEffect(() => {
    const setupLogoHoverEffects = () => {
      const bg = document.getElementById('trusted-bg');
      const logoCards = document.querySelectorAll('.logo-card');
      
      if (bg && logoCards.length > 0) {
        // Add event listeners to each logo card
        logoCards.forEach(card => {
          const cardElement = card as HTMLElement;
          
          const handleMouseEnter = () => {
            // Reduce background prominence when any logo is hovered
            bg.style.opacity = '0.30';
            
            // Ensure hovered card stacks above neighbors without layout shift
            cardElement.style.zIndex = '10';
            cardElement.style.position = 'relative';
          };

          const handleMouseLeave = () => {
            // Restore background prominence
            bg.style.opacity = '0.40';
            
            // Reset z-index
            cardElement.style.zIndex = '';
          };

          cardElement.addEventListener('mouseenter', handleMouseEnter);
          cardElement.addEventListener('mouseleave', handleMouseLeave);
        });
      }
    };

    // Set up with a small delay to ensure DOM is ready
    const timeoutId = setTimeout(setupLogoHoverEffects, 500);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const services = [
    {
      icon: DollarSign,
      title: "Growth Clarity Audit",
      description: "Uncover hidden leaks and wasted spend so every dollar is working harder. Leave with a clear roadmap that connects strategy to ROI.",
    },
    {
      icon: Target,
      title: "Google Ads Management",
      description: "Campaigns structured for measurable revenue — not just clicks. Custom strategies that scale profitably without burning budget on vanity metrics.",
    },
    {
      icon: Users,
      title: "Paid Social Media Growth",
      description: "Meta, Instagram, and beyond. Full-funnel campaigns that build awareness, trust, and conversions — no cookie-cutter approaches.",
    },
    {
      icon: TrendingUp,
      title: "Fractional CMO",
      description: "Hands-on leadership to unify strategy, creative, and paid media execution — aligned with your team, not working in silos.",
    },
    {
      icon: Heart,
      title: "Non-Profit Google Grant",
      description: "Unlock up to $10K/month in free ad spend, optimized for conversions, not just impressions. Compliance made simple.",
    },
    {
      icon: Target,
      title: "CRO & Funnel Optimization",
      description: "Iterative testing across landing pages, offers, and funnels. Scale bookings and maximize ROAS with data-driven improvements.",
    },
  ];

  const caseStudies = [
    {
      id: "lamark-agency",
      icon: Dumbbell,
      title: "Lamark Agency — Performance Marketing",
      intent: "Lamark wanted to scale paid programs profitably.",
      obstacle: "But their budget was scattered across inefficient campaigns.",
      resolution: "We restructured, built unified campaigns, and reduced costs while scaling.",
      stat: "$70,000/month budget managed across verticals, consistent CPL growth",
      description: "Scaled PPC programs and tracked multi‑location impact.",
    },
    {
      id: "hapi-art",
      icon: Palette,
      title: "Hapi Art — E‑commerce",
      intent: "Hapi Art needed a profitable advertising system.",
      obstacle: "But their campaigns lacked structure and creative testing.",
      resolution: "We built a 10x ROAS system with systematic optimization.",
      stat: "10× ROAS System Built",
      description: "Built a profitable system with creative testing and audience expansion.",
    },
    {
      id: "mandali-retreats",
      icon: Waves,
      title: "Mandali Retreats — Luxury Wellness",
      intent: "Mandali Retreats needed year-round bookings.",
      obstacle: "Their ads were siloed and search traffic wasn't converting.",
      resolution: "We built multi-channel campaigns with retargeting layers.",
      stat: "5× ROAS while filling retreat bookings consistently",
      description: "Multi‑channel strategy across Meta & Search; retargeting and geo‑segmented campaigns.",
    },
    {
      id: "core40-fitness",
      icon: TrendingUp,
      title: "Core40 — Fitness Studio",
      intent: "Core40 wanted to maximize ROI and scale member acquisition.",
      obstacle: "But their marketing lacked coordination and tracking was broken.",
      resolution: "We unified their strategy and rebuilt tracking for clear ROI visibility.",
      stat: "$2M+ revenue, 11K new members",
      description: "Comprehensive fitness marketing strategy delivering exceptional results.",
    },
  ];

  const testimonials = [
    {
      quote: "It's always enjoyable writing a recommendation for someone as enjoyable as Juda. I've worked with Juda in a professional capacity for over a year now at Sociality Squared. We've worked on various clients together and he's worn many different hats.",
      author: "Mari Smith, Co-Founder & Marketing Director",
      gradient: "from-purple-500 to-purple-600",
      profileColor: "border-white",
      image: profileImages.mari
    },
    {
      quote: "I highly recommend Juda as a skilled and professional growth marketer. I've worked with him on multiple digital marketing strategies and media buying projects. Juda gives it his all for his clients.",
      author: "Lindsey Bast, Digital Strategist & Growth Marketer",
      gradient: "from-purple-500 to-purple-600",
      profileColor: "border-white",
      image: profileImages.lindsey
    },
    {
      quote: "Juda is a phenomenal colleague and complete rockstar for his clients! I've had the pleasure of working with Juda for over a year, and we've collaborated on several large-scale digital marketing projects throughout that time.",
      author: "Alyssa Brooke-Gay, Senior Project Manager",
      gradient: "from-green-500 to-green-600",
      profileColor: "border-white",
      image: profileImages.alyssa
    },
    {
      quote: "Juda is simply one of the best persons I have had the opportunity to work with. Not only he is proficient in Marketing, specially in the paid media field, but also, he has a very strong work ethic and solid soft skills. Juda is a team player.",
      author: "Daniela Goldzmindt, Marketing Manager",
      gradient: "from-pink-400 to-pink-500",
      profileColor: "border-white",
      image: profileImages.daniela
    },
    {
      quote: "I had the pleasure of working with Juda during his tenure at LamarR. During his interview, I knew he would bring a different level of thinking and analysis to the team that we were needing. He did not disappoint.",
      author: "Mike Berkman, VP of Performance",
      gradient: "from-pink-400 to-pink-500",
      profileColor: "border-white",
      image: profileImages.mike
    },
    {
      quote: "Juda is an exceptional marketing talent. He is able to manage complex advertising campaigns in a calm and focused way. While working with him, he continually suggested new and interesting ways to accomplish our team goals.",
      author: "Bill Bowman, Vice President of Marketing",
      gradient: "from-blue-500 to-purple-600",
      profileColor: "border-white",
      image: profileImages.bill
    }
  ];

  const brandValues = [
    {
      title: "Clarity over complexity",
      description: "We simplify funnels and ad ecosystems so you know exactly what's working."
    },
    {
      title: "Strategy first, execution second", 
      description: "Every campaign is tied to roadmaps, milestones, and business outcomes."
    },
    {
      title: "ROI over vanity",
      description: "We track the metrics that matter: revenue, bookings, conversions."
    },
    {
      title: "Collaboration over black-box agencies",
      description: "We embed as part of your team, not as outsiders."
    }
  ];

  const achievements = [
    "$3M+ in ad spend managed across growth brands",
    "Multi-million in revenue driven through paid media",
    "Proven results across Retreats, E-commerce, Luxury, and Education",
    "10+ years in paid media & growth strategy",
    "Recognized by Contra as a Top Specialist in 2025",
    "Operator + strategist: I plan, build, and optimize",
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <ProgressBar />
      <main>
        {/* Hero Section */}
        <section className="relative px-6 pt-20 pb-16 lg:px-8 bg-gradient-to-b from-background to-muted overflow-hidden">
          {/* Mountain Path Journey Background */}
          <div className="absolute inset-0 -z-10">
            {/* Mountain silhouettes */}
            <svg className="absolute bottom-0 left-0 w-full h-48 opacity-10 text-primary" viewBox="0 0 1200 200" fill="none">
              <path d="M0 200L100 120L200 150L300 80L400 110L500 60L600 90L700 40L800 70L900 30L1000 50L1100 20L1200 40V200H0Z" fill="currentColor" className="animate-fade-in-up" />
              <path d="M0 200L150 140L250 170L350 100L450 130L550 80L650 110L750 60L850 90L950 50L1050 70L1150 40L1200 60V200H0Z" fill="currentColor" className="animate-fade-in-up opacity-50" style={{animationDelay: '0.5s'}} />
            </svg>
            
            {/* Animated journey path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 1200 400">
              <path 
                d="M50 350 Q300 250 600 300 T1150 200" 
                stroke="url(#journeyGradient)" 
                strokeWidth="3" 
                fill="none" 
                strokeDasharray="15 10"
                className="animate-path-pulse"
              />
              <defs>
                <linearGradient id="journeyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Clarity illumination orbs */}
            <div className="absolute top-16 left-16 w-16 h-16 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full animate-pulse shadow-lg shadow-primary/20"></div>
            <div className="absolute top-32 right-20 w-12 h-12 bg-gradient-to-r from-accent/15 to-primary/15 rounded-full animate-bounce shadow-lg shadow-accent/20" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
            <div className="absolute bottom-32 left-1/4 w-10 h-10 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
            
            {/* Lightning bolt for breakthrough moments */}
            <div className="absolute top-20 right-32 opacity-10">
              <svg className="w-12 h-12 text-green-500" viewBox="0 0 24 24">
                <path 
                  d="M7 2v11h3v9l7-12h-4L17 2H7z" 
                  fill="currentColor"
                  className="animate-lightning-solidify"
                />
              </svg>
            </div>
          </div>
          
          <div className="mx-auto max-w-4xl text-center relative z-10">
            <div className="mx-auto h-28 w-28 mb-6 flex items-center justify-center">
              <img
                src="/clarity-engine-logo.png"
                alt="Clarity Engine Logo"
                className="h-28 w-28 object-contain"
              />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground relative" data-testid="hero-title">
              Scaling Ambitious Brands with <span className="bg-gradient-to-r from-green-500 via-green-600 to-green-500 bg-clip-text text-transparent animate-lightning-solidify">ROI-Driven</span> Paid Media & Growth Strategy
              {/* Lightning accent for breakthrough */}
              <div className="absolute -top-2 -right-2 opacity-30">
                <svg className="w-12 h-12 text-green-500 animate-ping" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 2v11h3v9l7-12h-4L17 2H7z" />
                </svg>
              </div>
            </h1>
            <p className="mt-5 text-xl leading-8 text-muted-foreground" data-testid="hero-description">
              We help founders and teams grow without wasting money on vanity metrics, cookie-cutter campaigns, or broken tracking. Clarity Engine exists to bring clarity, structure, and measurable ROI to every <RotatingWord words={["Campaign", "Account", "Region", "Vertical", "Challenge", "Paid Media Channel", "Agency", "Client", "Team", "Partnership"]} />.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
              <Link 
                to="/growth-clarity-audit"
                className="rounded-2xl px-6 py-3 text-base font-semibold border border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-200 inline-block text-center"
                data-testid="hero-cta-audit"
              >
                Start with a Growth Clarity Audit
              </Link>
              <button 
                onClick={() => scrollToSection('services')}
                className="rounded-2xl px-6 py-3 text-base font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
                data-testid="hero-cta-services"
              >
                See Services
              </button>
            </div>
          </div>
        </section>

        {/* The Problems We Eliminate Section - Premium Polish */}
        <section className="relative py-16 bg-[#fffefd]">
          {/* Top gradient divider */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-200/60 to-transparent" />

          {/* Watermark */}
          <svg
            className="pointer-events-none absolute inset-x-0 -top-10 mx-auto opacity-[0.06] w-[720px] h-auto"
            viewBox="0 0 800 200" aria-hidden="true"
          >
            <defs>
              <linearGradient id="ceGrad" x1="0" x2="1">
                <stop offset="0%" stopColor="#34d399"/>
                <stop offset="100%" stopColor="#8b5cf6"/>
              </linearGradient>
            </defs>
            <path d="M20 150 C200 20, 600 280, 780 120" fill="none" stroke="url(#ceGrad)" strokeWidth="6" strokeLinecap="round"/>
          </svg>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative max-w-6xl mx-auto px-4"
          >
            <div className="text-center">
              <h2 className="text-3xl md:text-[40px] font-bold tracking-tight text-foreground mb-2" data-testid="problems-title">
                The Problems We Eliminate
              </h2>
              <p className="mt-2 text-sm text-neutral-500">
                Choose your profile to see the most common issues we solve.
              </p>
            </div>

            {/* Avatar Tabs with Mobile UX */}
            <div className="mt-8 flex items-stretch gap-3 md:gap-4 justify-center md:flex-wrap md:justify-center
                            overflow-x-auto md:overflow-visible px-2 -mx-2 md:mx-0 scroll-smooth snap-x snap-mandatory">
              {AVATAR_TABS.map(({ key, icon: Icon }) => {
                const isActive = selectedAvatar === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedAvatar(key)}
                    aria-pressed={isActive}
                    aria-selected={isActive}
                    className={`snap-start min-w-[150px] md:min-w-0 group relative isolate overflow-hidden flex flex-col items-center justify-center
                                px-5 py-3 rounded-2xl border transition-all duration-300
                                focus:outline-none focus:ring-2 focus:ring-emerald-300
                                ${isActive
                                  ? "bg-gradient-to-b from-emerald-50 to-white border-emerald-200 shadow ring-1 ring-inset ring-emerald-100"
                                  : "bg-white border-neutral-200 hover:-translate-y-0.5 hover:shadow"}`}
                    data-testid={`avatar-tab-${key.toLowerCase().replace(' ', '-')}`}
                  >
                    {/* light gradient hover (same as Services) */}
                    {!isActive && (
                      <span className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0
                                       group-hover:opacity-100 transition duration-300
                                       bg-gradient-to-br from-violet-500/10 via-indigo-500/10 to-emerald-500/10" />
                    )}
                    
                    {/* existing icon + label */}
                    <div className="relative z-10 flex flex-col items-center justify-center">
                      <Icon className={`h-6 w-6 transition-transform duration-200
                                        ${isActive ? "text-emerald-600 scale-105" : "text-emerald-500 group-hover:text-emerald-600"}`} />
                      <span className={`mt-2 text-sm font-medium ${isActive ? "text-emerald-800" : "text-neutral-700"}`}>
                        {key}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Problems Grid with AnimatePresence */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedAvatar}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
              >
                {AVATARS[selectedAvatar].map((problem, idx) => (
                  <div
                    key={`${selectedAvatar}-${idx}`}
                    className="p-5 md:p-6 rounded-2xl bg-neutral-50/40 border border-neutral-100/70 shadow-sm
                               hover:shadow-md hover:border-emerald-200 transition-all duration-300
                               flex items-start gap-3"
                    data-testid={`problem-card-${idx}`}
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-[15px] leading-relaxed text-neutral-800">{problem}</p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Bottom gradient divider */}
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-200/60 to-transparent" />
        </section>

        {/* Dream Outcome Section */}
        <motion.section 
          className="relative px-6 py-16 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="dream-outcome-title">
              Imagine doubling your bookings without doubling your ad spend.
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-3">
              That's the growth engine we build for ambitious brands.
            </p>
            
            {/* centered legend row (replaces floating badge) */}
            <div className="mt-3 flex justify-center gap-2 mb-12">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-white/80 border border-neutral-200 text-neutral-700 shadow-sm">
                <Zap className="w-3.5 h-3.5" /> Weekly, monthly, quarterly planning
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-white/80 border border-neutral-200 text-neutral-700 shadow-sm">
                <Feather className="w-3.5 h-3.5" /> High clarity
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-white/80 border border-neutral-200 text-neutral-700 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5" /> High confidence
              </span>
            </div>
            
            {/* Top hairline divider */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-200/60 to-transparent" />

            {/* column headers */}
            <div className="mt-8 hidden md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-end md:gap-6">
              <div className="flex justify-start">
                <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full border bg-rose-50 text-rose-700 border-rose-100 shadow-sm">
                  Before
                </span>
              </div>
              <div />
              <div className="flex justify-end">
                <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full border bg-green-50 text-green-700 border-green-100 shadow-sm">
                  After
                </span>
              </div>
            </div>

            {/* paired rows */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-4 space-y-5"
            >
              {[
                {
                  before: "Wasted budget on vanity metrics",
                  after: "Campaigns tied to revenue outcomes",
                  chips: [
                    { icon: Zap, label: "2-4 week audits" },
                    { icon: Feather, label: "High ROI & ROAS focus" },
                    { icon: ShieldCheck, label: "High performance" }
                  ]
                },
                {
                  before: "No clear roadmap or milestones",
                  after: "Clear funnel roadmap with milestones",
                  chips: [
                    { icon: Zap, label: "Weekly, monthly, quarterly planning" },
                    { icon: Feather, label: "Iterative testing, Conversion Rate Optimization" },
                    { icon: ShieldCheck, label: "Fast Execution" }
                  ]
                },
                {
                  before: "Broken tracking hides true ROI",
                  after: "Clean tracking that connects ad spend to revenue",
                  chips: [
                    { icon: Zap, label: "2-4 week audits" },
                    { icon: Feather, label: "Get more leads, sales, business" },
                    { icon: ShieldCheck, label: "High trust" }
                  ]
                },
                {
                  before: "Cookie-cutter execution",
                  after: "Custom strategy aligned to goals",
                  chips: [
                    { icon: Zap, label: "90-day growth roadmap" },
                    { icon: Feather, label: "Adaptive growth management" },
                    { icon: ShieldCheck, label: "High Collaboration" }
                  ]
                }
              ].map((row, i) => (
                <div key={i} className="group grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch gap-6">
                  {/* BEFORE card */}
                  <div className="h-full p-5 md:p-6 rounded-2xl bg-rose-50 border border-rose-100 text-rose-800 shadow-sm group-hover:shadow transition flex flex-col">
                    <div className="flex items-start gap-3 flex-1">
                      <AlertTriangle className="w-5 h-5 text-rose-500 mt-0.5" />
                      <p className="text-[15px] leading-relaxed">{row.before}</p>
                    </div>
                  </div>

                  {/* SPINE with centered Transform pill */}
                  <div className="relative hidden md:flex items-center justify-center">
                    <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-neutral-200 to-transparent" />
                    <span className="absolute -translate-y-1/2 top-1/2 inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full bg-white border border-neutral-200 text-neutral-600 shadow-sm">
                      Transform
                    </span>
                  </div>

                  {/* AFTER card */}
                  <div className="h-full p-5 md:p-6 rounded-2xl bg-green-50 border border-green-100 text-green-900 shadow-sm group-hover:shadow-md transition flex flex-col">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="text-[15px] leading-relaxed">{row.after}</p>
                        {/* inline chips per row to echo legend */}
                        <div className="mt-3 flex flex-wrap gap-2">
                          {row.chips.map((chip, chipIdx) => (
                            <span key={chipIdx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-white/80 border border-neutral-200 text-neutral-700 shadow-sm">
                              <chip.icon className="w-3.5 h-3.5" /> {chip.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* mobile Transform pill between stacked cards */}
                  <div className="md:hidden flex justify-center -mt-2">
                    <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full bg-white border border-neutral-200 text-neutral-600 shadow-sm">
                      Transform
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Bottom hairline divider */}
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-200/60 to-transparent" />
          </div>
        </motion.section>

        {/* Trusted by Leading Brands */}
        <section className="relative isolate py-16 px-6 lg:px-8">
          {/* Background logo layer - subtle pattern */}
          <div 
            id="trusted-bg" 
            className="pointer-events-none absolute inset-0 -z-10 opacity-30 transition-opacity duration-300"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.03) 0%, transparent 50%), 
                               radial-gradient(circle at 75% 75%, rgba(99, 102, 241, 0.02) 0%, transparent 50%)`,
              backgroundSize: '250px 250px'
            }}
          />

          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="clients-title">
                Trusted by Leading Brands Across Industries
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                From fitness and wellness to SaaS and e-commerce, we've helped ambitious brands achieve 
                multi-million dollar growth through strategic paid media and growth marketing across Meta, Instagram, YouTube, Google Ads, and other major platforms.
              </p>
            </div>

            {/* Grid of logo cards */}
            <div 
              id="trusted-logos"
              className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
            >
              {/* Client Logo Cards */}
              <div className="logo-card group relative isolate block rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer">
                <div className="aspect-[3/2] p-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/images/client-logos/steelfit.png" 
                    alt="SteelFit" 
                    className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out transform-gpu will-change-transform group-hover:scale-110" 
                  />
                </div>
              </div>

              <div className="logo-card group relative isolate block rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer">
                <div className="aspect-[3/2] p-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src={amaWaterwaysLogo} 
                    alt="AmaWaterways" 
                    className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out transform-gpu will-change-transform group-hover:scale-110" 
                  />
                </div>
              </div>

              <div className="logo-card group relative isolate block rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer">
                <div className="aspect-[3/2] p-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/images/client-logos/bolay.png" 
                    alt="Bolay Kitchen" 
                    className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out transform-gpu will-change-transform group-hover:scale-110" 
                  />
                </div>
              </div>

              <div className="logo-card group relative isolate block rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer">
                <div className="aspect-[3/2] p-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/images/client-logos/shani-darden.png" 
                    alt="Shani Darden Skincare" 
                    className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out transform-gpu will-change-transform group-hover:scale-110" 
                  />
                </div>
              </div>

              <div className="logo-card group relative isolate block rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer">
                <div className="aspect-[3/2] p-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/images/client-logos/cutera.png" 
                    alt="Cutera" 
                    className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out transform-gpu will-change-transform group-hover:scale-110" 
                  />
                </div>
              </div>

              <div className="logo-card group relative isolate block rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer">
                <div className="aspect-[3/2] p-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/images/client-logos/mandali.png" 
                    alt="Mandali Retreats" 
                    className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out transform-gpu will-change-transform group-hover:scale-110" 
                  />
                </div>
              </div>

              <div className="logo-card group relative isolate block rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer">
                <div className="aspect-[3/2] p-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/images/client-logos/core40.png" 
                    alt="Core 40" 
                    className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out transform-gpu will-change-transform group-hover:scale-110" 
                  />
                </div>
              </div>

              <div className="logo-card group relative isolate block rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer">
                <div className="aspect-[3/2] p-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/images/client-logos/motivating-masses.png" 
                    alt="Motivating The Masses" 
                    className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out transform-gpu will-change-transform group-hover:scale-110" 
                  />
                </div>
              </div>

              <div className="logo-card group relative isolate block rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer">
                <div className="aspect-[3/2] p-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/images/client-logos/magaya.png" 
                    alt="Magaya" 
                    className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out transform-gpu will-change-transform group-hover:scale-110" 
                  />
                </div>
              </div>

              <div className="logo-card group relative isolate block rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer">
                <div className="aspect-[3/2] p-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/images/client-logos/columbus-travel.png" 
                    alt="Columbus Travel" 
                    className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out transform-gpu will-change-transform group-hover:scale-110" 
                  />
                </div>
              </div>

              <div className="logo-card group relative isolate block rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer">
                <div className="aspect-[3/2] p-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/images/client-logos/mix-telematics.png" 
                    alt="Mix Telematics" 
                    className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out transform-gpu will-change-transform group-hover:scale-110" 
                  />
                </div>
              </div>

              <div className="logo-card group relative isolate block rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer">
                <div className="aspect-[3/2] p-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/images/client-logos/eft-universe.png" 
                    alt="EFT Universe" 
                    className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out transform-gpu will-change-transform group-hover:scale-110" 
                  />
                </div>
              </div>

              {/* Second row of logos */}
              <div className="logo-card group relative isolate block rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer">
                <div className="aspect-[3/2] p-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src={popcornIndianaLogo} 
                    alt="Popcorn Indiana" 
                    className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out transform-gpu will-change-transform group-hover:scale-110" 
                  />
                </div>
              </div>

              <div className="logo-card group relative isolate block rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer">
                <div className="aspect-[3/2] p-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src={ascendLogo} 
                    alt="Ascend" 
                    className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out transform-gpu will-change-transform group-hover:scale-110" 
                  />
                </div>
              </div>

              <div className="logo-card group relative isolate block rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer">
                <div className="aspect-[3/2] p-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src={microsoftLogo} 
                    alt="Microsoft" 
                    className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out transform-gpu will-change-transform group-hover:scale-110" 
                  />
                </div>
              </div>

              <div className="logo-card group relative isolate block rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer">
                <div className="aspect-[3/2] p-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src={denaGamesLogo} 
                    alt="DeNA Games" 
                    className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out transform-gpu will-change-transform group-hover:scale-110" 
                  />
                </div>
              </div>

              <div className="logo-card group relative isolate block rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer">
                <div className="aspect-[3/2] p-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src={estrellaGymnasticsLogo} 
                    alt="Estrella Gymnastics" 
                    className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out transform-gpu will-change-transform group-hover:scale-110" 
                  />
                </div>
              </div>

              <div className="logo-card group relative isolate block rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer">
                <div className="aspect-[3/2] p-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src={capitalGymnasticsLogo} 
                    alt="Capital Gymnastics" 
                    className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out transform-gpu will-change-transform group-hover:scale-110" 
                  />
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* How We Deliver Section */}
        <motion.section 
          id="services" 
          className="px-6 py-16 lg:px-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Connecting path from previous section */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8">
            <svg className="w-12 h-16 text-primary opacity-30" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l-1.41 1.41L15.17 8H4v2h11.17l-4.58 4.59L12 16l6-6-6-6z" transform="rotate(90)" />
            </svg>
          </div>
          
          {/* Illumination beams */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-radial from-primary/10 to-transparent rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-radial from-accent/10 to-transparent rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
          
          <div className="mx-auto max-w-6xl relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground" data-testid="services-title">How We Deliver</h2>
              <p className="mt-2 text-muted-foreground" data-testid="services-subtitle">Choose your entry point or build a plan across channels.</p>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <article 
                    key={service.title} 
                    className="group relative isolate overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md animate-fade-in-up"
                    style={{ animationDelay: `${index * 150}ms` }}
                    data-testid={`service-card-${index}`}
                  >
                    {/* Hover overlay (no blends) */}
                    <div className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-violet-500/10 via-indigo-500/10 to-emerald-500/10" />
                    {/* Content */}
                    <div className="relative z-10 p-6">
                      <div className="flex items-center mb-4">
                        <div className="relative">
                          <IconComponent className="text-2xl text-primary mr-3 transition-all duration-300" />
                        </div>
                        <h3 className="text-xl font-semibold text-card-foreground transition-colors duration-300" data-testid={`service-title-${index}`}>
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground transition-colors duration-300" data-testid={`service-description-${index}`}>
                        {service.description}
                      </p>
                      <div className="mt-4">
                        <button 
                          onClick={() => scrollToSection('cta')}
                          className="text-primary font-medium underline underline-offset-2 hover:text-primary/80 transition-colors"
                          data-testid={`service-learn-more-${index}`}
                        >
                          Learn more
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Value Equation Section - Hormozi's Four Variables */}
        <motion.section 
          className="px-6 py-16 lg:px-8 bg-gray-50 dark:bg-gray-900/20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="value-equation-title">
              We maximize the four variables that determine value.
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Why Clients Choose Clarity Engine
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div 
                className="group relative isolate overflow-hidden text-center p-6 bg-white dark:bg-card rounded-2xl shadow-sm border border-border hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true }}
              >
                {/* light gradient hover */}
                <span className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0
                                 group-hover:opacity-100 transition duration-300
                                 bg-gradient-to-br from-violet-500/10 via-indigo-500/10 to-emerald-500/10" />
                <div className="relative z-10">
                  <Target className="mx-auto w-8 h-8 text-indigo-600 mb-4"/>
                  <h4 className="font-semibold text-lg mb-2 text-foreground">Dream Outcome</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Predictable growth, full rooms, booked calendars.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="group relative isolate overflow-hidden text-center p-6 bg-white dark:bg-card rounded-2xl shadow-sm border border-border hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {/* light gradient hover */}
                <span className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0
                                 group-hover:opacity-100 transition duration-300
                                 bg-gradient-to-br from-violet-500/10 via-indigo-500/10 to-emerald-500/10" />
                <div className="relative z-10">
                  <CheckCircle className="mx-auto w-8 h-8 text-indigo-600 mb-4"/>
                  <h4 className="font-semibold text-lg mb-2 text-foreground">Likelihood of Success</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Proven strategies & $3M+ managed ad spend.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="group relative isolate overflow-hidden text-center p-6 bg-white dark:bg-card rounded-2xl shadow-sm border border-border hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {/* light gradient hover */}
                <span className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0
                                 group-hover:opacity-100 transition duration-300
                                 bg-gradient-to-br from-violet-500/10 via-indigo-500/10 to-emerald-500/10" />
                <div className="relative z-10">
                  <Zap className="mx-auto w-8 h-8 text-indigo-600 mb-4"/>
                  <h4 className="font-semibold text-lg mb-2 text-foreground">Speed</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Audits deliver clarity in just 7 days.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="group relative isolate overflow-hidden text-center p-6 bg-white dark:bg-card rounded-2xl shadow-sm border border-border hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {/* light gradient hover */}
                <span className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0
                                 group-hover:opacity-100 transition duration-300
                                 bg-gradient-to-br from-violet-500/10 via-indigo-500/10 to-emerald-500/10" />
                <div className="relative z-10">
                  <Handshake className="mx-auto w-8 h-8 text-indigo-600 mb-4"/>
                  <h4 className="font-semibold text-lg mb-2 text-foreground">Ease</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We manage complexity, you stay focused.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Case Studies Section */}
        <motion.section 
          id="case-studies" 
          className="px-6 py-16 lg:px-8 bg-muted relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Connecting path showing transformation */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8">
            <svg className="w-16 h-16 text-accent opacity-40 animate-pulse" viewBox="0 0 24 24" fill="none">
              <path d="M4 12h16m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="rotate(90)" />
            </svg>
          </div>
          
          {/* Clarity illumination behind metrics */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/3 left-1/3 w-40 h-40 bg-gradient-radial from-green-500/10 to-transparent rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute bottom-1/3 right-1/3 w-36 h-36 bg-gradient-radial from-blue-500/10 to-transparent rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
            
            {/* Success rays */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 left-10 w-1 h-20 bg-gradient-to-b from-primary/20 to-transparent transform rotate-45 animate-pulse" style={{animationDelay: '2s'}}></div>
              <div className="absolute bottom-10 right-10 w-1 h-16 bg-gradient-to-b from-accent/20 to-transparent transform -rotate-45 animate-pulse" style={{animationDelay: '3s'}}></div>
            </div>
          </div>
          
          <div className="mx-auto max-w-6xl relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground" data-testid="case-studies-title">Proof & Case Studies</h2>
              <p className="mt-2 text-muted-foreground" data-testid="case-studies-subtitle">Selected outcomes from recent work.</p>
              <div className="mt-4">
                <Link 
                  to="/case-studies"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors underline underline-offset-2"
                  data-testid="all-case-studies-link"
                >
                  View All Case Studies
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4l-1.41 1.41L15.17 10H4v2h11.17l-4.58 4.59L12 18l6-6-6-6z" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {caseStudies.map((study, index) => {
                const IconComponent = study.icon;
                // Extract specific metrics for each case study
                let metric, progressValue, label;
                if (study.id === 'lamark-agency') {
                  metric = '6-12 Clients Per Month'; label = 'Managed budgets simultaneously across 6-12 B2B and B2C clients'; progressValue = 100;
                } else if (study.id === 'hapi-art') {
                  metric = '8×+'; label = 'ROAS Achieved for Evergreen Ads: 8x+'; progressValue = 100;
                } else if (study.id === 'mandali-retreats') {
                  metric = '15×+'; label = '15x+ ROAS across Google Ads and Meta for the last 3+ years'; progressValue = 100;
                } else {
                  metric = '365 Days/year'; label = 'Evergreen Leads & Sales: 365 Days a Year'; progressValue = 100;
                }
                return (
                  <article 
                    key={study.title} 
                    className="group rounded-2xl border border-border p-6 bg-card shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-102 animate-slide-in-left"
                    style={{ animationDelay: `${index * 200}ms` }}
                    data-testid={`case-study-card-${index}`}
                  >
                    <div className="flex items-start justify-between mb-4 relative">
                      {/* Mountain peak icon for scaling success */}
                      <div className="absolute -top-3 -left-3 opacity-20 group-hover:opacity-40 transition-opacity">
                        <svg className="w-6 h-6 text-primary animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14 6l-4.22 5.63 1.25 1.67L14 9.33 19 16h-8.46l-4.01-5.37L1 18h22l-9-12z" />
                        </svg>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors duration-300 mb-3" data-testid={`case-study-title-${index}`}>
                          {study.title}
                        </h3>
                        
                        {/* Intent → Obstacle → Resolution Story */}
                        <div className="space-y-2 mb-4 text-sm">
                          <p className="text-muted-foreground">
                            <span className="font-medium text-blue-600">Intent:</span> {study.intent}
                          </p>
                          <p className="text-muted-foreground">
                            <span className="font-medium text-orange-600">Obstacle:</span> {study.obstacle}
                          </p>
                          <p className="text-muted-foreground">
                            <span className="font-medium text-green-600">Resolution:</span> {study.resolution}
                          </p>
                        </div>
                        
                        <div className="mt-3 text-primary font-bold" data-testid={`case-study-stat-${index}`}>
                          Impact: {study.stat}
                        </div>
                      </div>
                      <div className="relative ml-4">
                        <div className="absolute -inset-2 bg-gradient-to-r from-accent to-primary rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        <IconComponent className="relative text-primary text-xl group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Link 
                        to={`/case-study/${study.id}`}
                        className="text-primary font-medium underline underline-offset-2 hover:text-primary/80 transition-colors"
                        data-testid={`case-study-link-${index}`}
                      >
                        Read full case study
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <section className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground" data-testid="testimonials-title">Colleague Reviews</h2>
              <p className="mt-2 text-muted-foreground">What industry professionals say about working with me</p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => {
                return (
                  <div 
                    key={index} 
                    className={`group relative rounded-3xl p-8 text-white bg-gradient-to-br ${testimonial.gradient} hover:from-primary hover:to-accent shadow-xl hover:shadow-2xl hover:shadow-primary/25 overflow-hidden hover:scale-110 transition-all duration-500 animate-float-up hover:rotate-1`}
                    style={{ 
                      animationDelay: `${index * 250}ms`,
                      animationDuration: `${3 + (index % 3)}s`
                    }}
                    data-testid={`testimonial-card-${index}`}
                  >
                    {/* Animated Decorative circles with glow effect */}
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-white opacity-30 rounded-full animate-pulse group-hover:bg-white group-hover:shadow-lg group-hover:shadow-white/50 transition-all duration-300"></div>
                    <div className="absolute -top-2 -left-2 w-4 h-4 bg-white opacity-50 rounded-full animate-ping group-hover:bg-white group-hover:shadow-lg group-hover:shadow-white/50 transition-all duration-300" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-8 left-8 w-12 h-12 bg-white opacity-10 group-hover:opacity-30 group-hover:shadow-lg group-hover:shadow-white/30 transition-all duration-300"></div>
                    <div className="absolute top-12 left-20 w-6 h-6 bg-white opacity-20 group-hover:scale-150 group-hover:shadow-lg group-hover:shadow-white/40 transition-all duration-300"></div>
                    
                    {/* Animated Quote Mark with enhanced movement */}
                    <div className="absolute top-4 right-4 text-white opacity-20 group-hover:opacity-80 group-hover:drop-shadow-lg transition-all duration-500">
                      <Quote size={32} className="transform group-hover:rotate-12 group-hover:scale-150 group-hover:-translate-y-2 group-hover:translate-x-1 transition-transform duration-500" />
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="mb-6">
                        <div className="inline-block px-6 py-2 bg-white bg-opacity-20 rounded-full text-sm font-medium">
                          Colleague review
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 mb-6">
                        <div className={`w-16 h-16 rounded-full overflow-hidden ${testimonial.profileColor} border-4 flex-shrink-0`}>
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.author}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              console.log(`Failed to load image: ${testimonial.image}`);
                              e.currentTarget.style.display = 'none';
                            }}
                            onLoad={() => console.log(`Successfully loaded: ${testimonial.image}`)}
                          />
                        </div>
                        <div className="flex-1">
                          <blockquote className="text-white leading-relaxed mb-4 group-hover:drop-shadow-lg transition-all duration-300" data-testid={`testimonial-quote-${index}`}>
"{(() => {
                              // Define specific highlights for each testimonial using correct author names
                              const highlights: Record<string, string> = {
                                'Mari Smith, Co-Founder & Marketing Director': "It's always enjoyable writing a recommendation for someone as enjoyable as Juda",
                                'Lindsey Bast, Digital Strategist & Growth Marketer': "Juda gives it his all for his clients",
                                'Alyssa Brooke-Gay, Senior Project Manager': "complete rockstar for his clients",
                                'Daniela Goldzmindt, Marketing Manager': "Juda is simply one of the best persons I have had the opportunity to work with",
                                'Mike Berkman, VP of Performance': "I knew he would bring a different level of thinking and analysis to the team that we were needing. He did not disappoint",
                                'Bill Bowman, Vice President of Marketing': "able to manage complex advertising campaigns in a calm and focused way"
                              };
                              
                              const highlightText = highlights[testimonial.author];
                              if (highlightText && testimonial.quote.includes(highlightText)) {
                                const parts = testimonial.quote.split(highlightText);
                                return (
                                  <>
                                    {parts[0]}
                                    <span className="group-hover:bg-white group-hover:text-primary group-hover:px-1 group-hover:rounded transition-all duration-300">
                                      {highlightText}
                                    </span>
                                    {parts[1]}
                                  </>
                                );
                              }
                              return testimonial.quote;
                            })()}"
                          </blockquote>
                        </div>
                      </div>
                      
                      <figcaption className="font-medium text-white opacity-90 group-hover:drop-shadow-lg transition-all duration-300" data-testid={`testimonial-author-${index}`}>
                        - {testimonial.author}
                      </figcaption>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-sm text-muted-foreground">linkedin.com/in/judaborrayo/</p>
            </div>
          </div>
        </section>

        {/* Featured On Section */}
        <section className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="featured-title">Featured On</h2>
              <p className="text-muted-foreground">Recognized expertise in performance marketing and growth strategy</p>
            </div>
            
            <div className="space-y-6">
              <div className="group relative isolate overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md cursor-pointer">
                {/* Hover overlay (no blends) */}
                <div className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-violet-500/8 via-indigo-500/8 to-emerald-500/8" />
                {/* Content */}
                <div className="relative z-10 flex items-center gap-4 p-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg transition-colors duration-300">
                    <Shield className="w-6 h-6 text-primary transition-colors duration-300" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground transition-colors duration-300">Best English-speaking freelance Performance Marketing Specialists to hire in 2025</div>
                    <div className="text-sm text-muted-foreground transition-colors duration-300">Contra Featured Expert</div>
                  </div>
                </div>
              </div>
              
              <div className="group relative isolate overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md cursor-pointer">
                {/* Hover overlay (no blends) */}
                <div className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-violet-500/8 via-indigo-500/8 to-emerald-500/8" />
                {/* Content */}
                <div className="relative z-10 flex items-center gap-4 p-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg transition-colors duration-300">
                    <Target className="w-6 h-6 text-primary transition-colors duration-300" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground transition-colors duration-300">Best Spanish-speaking Google Ads freelancers to hire in 2025</div>
                    <div className="text-sm text-muted-foreground transition-colors duration-300">Contra Featured Expert</div>
                  </div>
                </div>
              </div>
              
              <div className="group relative isolate overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md cursor-pointer">
                {/* Hover overlay (no blends) */}
                <div className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-violet-500/8 via-indigo-500/8 to-emerald-500/8" />
                {/* Content */}
                <div className="relative z-10 flex items-center gap-4 p-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg transition-colors duration-300">
                    <Users className="w-6 h-6 text-primary transition-colors duration-300" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground transition-colors duration-300">Best Spanish-speaking Google Sheets freelancers to hire in 2025</div>
                    <div className="text-sm text-muted-foreground transition-colors duration-300">Contra Featured Expert</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Values Section */}
        <motion.section 
          id="about" 
          className="px-6 py-16 lg:px-8 bg-muted"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground" data-testid="about-title">Our Values</h2>
            </div>
            
            {/* Brand Values */}
            <div className="grid gap-8 sm:grid-cols-2 mb-12">
              {brandValues.map((value, index) => (
                <div key={index} className="text-center p-6 bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-300" data-testid={`brand-value-${index}`}>
                  <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
            
            {/* Proof Points */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-6">These values work in practice:</p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3" data-testid={`achievement-${index}`}>
                    <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-primary flex-shrink-0"></span>
                    <span className="text-muted-foreground text-sm">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <section id="cta" className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center rounded-3xl border border-border p-10 shadow-sm bg-card">
              <div className="mx-auto w-16 h-16 flex items-center justify-center mb-6">
                <img
                  src="/clarity-engine-logo.png"
                  alt="Clarity Engine Logo"
                  className="h-16 w-16 object-contain"
                />
              </div>
              <h2 className="text-3xl font-bold text-card-foreground" data-testid="cta-title">Our mission: Help ambitious brands grow with clarity and measurable ROI.</h2>
              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto" data-testid="cta-description">
                Ready to see where your growth engine is leaking? Book your Growth Clarity Audit today.
              </p>
              <div className="mt-6 flex justify-center">
                <Link 
                  to="/growth-clarity-audit"
                  className="rounded-2xl px-8 py-4 text-base font-semibold text-accent-foreground bg-accent hover:bg-primary hover:text-primary-foreground transition-all duration-200 transform hover:scale-105 inline-block"
                  data-testid="cta-book-audit"
                >
                  Book Your Growth Clarity Audit
                </Link>
              </div>
              <p className="mt-4 text-sm text-muted-foreground" data-testid="cta-guarantee">
                <Shield className="inline mr-1" size={16} />
                100% satisfaction guarantee
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 py-16 lg:px-8 bg-muted border-t border-border">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center space-x-3 mb-4" data-testid="footer-logo">
                <img
                  src="/clarity-engine-logo.png"
                  alt="Clarity Engine Logo"
                  className="h-8 w-8"
                />
                <span className="text-xl font-bold text-foreground">Clarity Engine</span>
              </div>
              <p className="text-muted-foreground text-sm" data-testid="footer-description">
                ROI-driven paid media and growth strategy for ambitious brands.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Services</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="hover:text-foreground transition-colors"
                    data-testid="footer-growth-audit"
                  >
                    Growth Audit
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="hover:text-foreground transition-colors"
                    data-testid="footer-google-ads"
                  >
                    Google Ads
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="hover:text-foreground transition-colors"
                    data-testid="footer-social-media"
                  >
                    Social Media
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="hover:text-foreground transition-colors"
                    data-testid="footer-fractional-cmo"
                  >
                    Fractional CMO
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button 
                    onClick={() => scrollToSection('case-studies')}
                    className="hover:text-foreground transition-colors"
                    data-testid="footer-case-studies"
                  >
                    Case Studies
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="hover:text-foreground transition-colors"
                    data-testid="footer-about"
                  >
                    About
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors" data-testid="footer-contact">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors" data-testid="footer-blog">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Connect</h3>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="footer-linkedin"
                >
                  <Linkedin className="text-xl" />
                </a>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="footer-twitter"
                >
                  <Twitter className="text-xl" />
                </a>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="footer-email"
                >
                  <Mail className="text-xl" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground" data-testid="footer-copyright">
            © {new Date().getFullYear()} Juda Borrayo • Clarity Engine. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}