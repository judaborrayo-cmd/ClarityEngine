import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import ProblemsTicker from "@/components/ProblemsTicker";
import HeroCTAs from "@/components/HeroCTAs";
import StartCards from "@/components/StartCards";
import ScaleAndAudit from "@/components/ScaleAndAudit";
import HowWeBuildFasterSection from "@/components/HowWeBuildFasterSection";
import ServicesAtAGlance from "@/components/ServicesAtAGlance";
import ExitIntentModal from "@/components/ExitIntentModal";
import CalendlyInline from "@/components/CalendlyInline";
import FaqHybrid from "@/components/FaqHybrid";
import { FeaturedCaseStudiesHome } from "@/components/FeaturedCaseStudiesHome";
import { Quote } from "lucide-react";
import heroImage from "@assets/generated_images/Marketing_strategist_office_portrait_4348a687.png";
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
  <section id={id} className={`w-full px-4 sm:px-6 lg:px-8 ${className}`}>
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
    className={`h-[60px] w-auto object-contain grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500 ${className}`}
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
const TestimonialCard = ({ testimonial, delay = 0, shouldReduceMotion = false }: { testimonial: typeof testimonials[0]; delay?: number; shouldReduceMotion?: boolean }) => (
  <motion.div 
    initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : delay }}
    whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.3 } }}
    className={`${testimonial.bgColor} ${testimonial.textColor} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300`}
  >
    <Quote className="h-10 w-10 mb-6 opacity-80" />
    <p className="text-lg mb-8 leading-relaxed font-normal">{testimonial.review}</p>
    <div className="flex items-center gap-4">
      <img 
        src={testimonial.avatar} 
        alt={testimonial.name}
        className="w-14 h-14 rounded-full object-cover border-2 border-white/30 shadow-md"
      />
      <div>
        <p className="font-semibold text-lg">{testimonial.name}</p>
        <p className="text-sm opacity-90 mt-0.5">{testimonial.title}</p>
      </div>
    </div>
  </motion.div>
);

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  
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
        <Section id="hero" className="pt-36 pb-24 md:pt-28 lg:pt-32 lg:pb-32 relative overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-green-50 opacity-40" />
          {!shouldReduceMotion ? (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-green-400/10"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ 
                duration: 15,
                ease: "linear",
                repeat: Infinity 
              }}
              style={{ backgroundSize: "200% 200%" }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-green-400/10" />
          )}
          
          <div className="relative mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Content */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: "easeOut" }}
                className="text-center lg:text-left"
              >
                <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-6xl text-gray-900 leading-[1.15]" style={{ letterSpacing: "-0.02em" }} data-testid="hero-title">
                  Scaling Ambitious Brands with <span className="bg-gradient-to-r from-green-500 via-green-600 to-green-500 bg-clip-text text-transparent">ROI-Driven</span> Paid Media & Growth Strategy
                </h1>
                <p className="mt-8 text-xl leading-[1.7] text-gray-600 font-normal" data-testid="hero-description">
                  We help founders and teams grow without wasting money on vanity metrics, cookie-cutter campaigns, or broken tracking. Bringing clarity to every <RotatingWord words={["Campaign", "Account", "Region", "Vertical", "Challenge", "Paid Media Channel", "Agency", "Client", "Team", "Partnership"]} />.
                </p>

                <motion.div
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.2 }}
                >
                  <HeroCTAs />
                </motion.div>

                {/* Microproof row */}
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.4 }}
                  className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-2" 
                  data-testid="hero-badges"
                >
                  <Badge>$5M+ in ad spend managed across growth brands</Badge>
                  <Badge>Multi-millions in revenue driven through paid media</Badge>
                  <Badge>Proven results across Travel, Fitness, Luxury, and Education</Badge>
                  <Badge>12+ years in paid media & growth strategy</Badge>
                  <Badge>Recognized by Contra as a Top Specialist in 2025</Badge>
                </motion.div>
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.5 }}
                  className="mt-5"
                >
                  <p className="text-sm text-gray-500 leading-relaxed">Paid booking filters for seriousness; deposit credited if we're a fit.</p>
                </motion.div>
              </motion.div>

              {/* Right: Hero Image */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: shouldReduceMotion ? 0 : 0.3 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src={heroImage}
                    alt="Professional marketing strategist in modern office"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
                {/* Decorative gradient glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-400/20 to-green-400/20 blur-3xl -z-10" />
              </motion.div>
            </div>
          </div>
        </Section>

        {/* --- TESTIMONIALS AFTER HERO --- */}
        <Section id="testimonials-hero" className="py-16 lg:py-20 bg-gray-50">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold sm:text-5xl text-gray-900 tracking-tight" style={{ letterSpacing: "-0.02em" }}>
                What Partners Say
              </h2>
              <p className="mt-4 text-lg text-gray-600 font-normal">
                Trusted by marketing professionals and industry leaders
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8">
              <TestimonialCard testimonial={testimonials[4]} delay={0.1} shouldReduceMotion={shouldReduceMotion} />
              <TestimonialCard testimonial={testimonials[2]} delay={0.2} shouldReduceMotion={shouldReduceMotion} />
            </div>
          </div>
        </Section>

        {/* --- PROBLEMS TICKER --- */}
        <ProblemsTicker />

        {/* --- PROOF BAR --- */}
        <div className="bg-gray-50 py-16 lg:py-20">
          <Section id="proof-bar" className="">
            <motion.div 
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold sm:text-5xl text-gray-900 tracking-tight" style={{ letterSpacing: "-0.02em" }}>
                Trusted by Leading Brands
              </h2>
              <p className="mt-4 text-lg text-gray-600 font-normal">
                Partnering with ambitious companies across industries
              </p>
            </motion.div>
            
            {/* Three rows of logos */}
            <motion.div 
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: shouldReduceMotion ? 0 : 0.2 }}
              className="space-y-10"
            >
              {/* First row */}
              <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-12">
                <LogoImage src={amaWaterwaysLogo} alt="AMA Waterways" />
                <LogoImage src={popcornIndianaLogo} alt="Popcorn Indiana" />
                <LogoImage src={ascendLogo} alt="Ascend" />
                <LogoImage src={microsoftLogo} alt="Microsoft" />
                <LogoImage src={denaGamesLogo} alt="Dena Games" />
              </div>
              
              {/* Second row */}
              <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-12">
                <LogoImage src={estrellaGymnasticsLogo} alt="Estrella Gymnastics" />
                <LogoImage src={capitalGymnasticsLogo} alt="Capital Gymnastics" />
                <LogoImage src={tigarGymnasticsLogo} alt="Tigar Gymnastics" />
                <LogoImage src={houstonGymnasticsLogo} alt="Houston Gymnastics" />
              </div>
              
              {/* Third row */}
              <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-12">
                <LogoImage src={sgtMenuLogo} alt="SGT Menu" />
                <LogoImage src={noTypicalMomentsLogo} alt="No Typical Moments" />
                <LogoImage src={marketerHireLogo} alt="MarketerHire" />
                <LogoImage src={rowlandBallardLogo} alt="Rowland Ballard" />
              </div>
              
              {/* Key metrics */}
              <div className="flex flex-wrap items-center justify-center gap-8 pt-8 mt-4 border-t border-gray-200">
                <div className="text-base font-semibold text-green-600" data-testid="metric-cpl">Serving B2B & B2C Clients</div>
                <div className="text-base font-semibold text-green-600" data-testid="metric-calls">12+ Years Managing Paid Media Strategies</div>
                <div className="text-base font-semibold text-green-600" data-testid="metric-revenue">10M+ in Revenue Generated Across Verticals</div>
              </div>
            </motion.div>
          </Section>
        </div>

        {/* --- START CARDS (CRO) --- */}
        <Section id="value-ladder" className="py-8 lg:py-12">
          <StartCards onOpenWaitlist={openWaitlist} />
        </Section>

        {/* --- SCALE AND AUDIT SECTION --- */}
        <Section id="how-we-scale" className="py-8 lg:py-12">
          <ScaleAndAudit videoUrl={CONFIG.featuredVideo.url()} />
        </Section>

        {/* --- HOW WE BUILD FASTER SECTION --- */}
        <HowWeBuildFasterSection />

        {/* --- SERVICES AT A GLANCE --- */}
        <ServicesAtAGlance />

        {/* --- FEATURED CASE STUDIES --- */}
        <FeaturedCaseStudiesHome />

        {/* --- COMPACT FAQ --- */}
        <Section id="faq" className="pt-8 pb-12 sm:pt-12 sm:pb-14 scroll-mt-20">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
            className="mx-auto max-w-5xl"
          >
            <FaqHybrid defaultVisibleCategories={2} defaultVisibleQuestionsPerCategory={3} />
          </motion.div>
        </Section>

        {/* --- BOOKING SECTION (#book-call and #book-intro) --- */}
        <Section id="book-call" className="py-20 lg:py-24">
          <Card className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold sm:text-4xl text-gray-900 tracking-tight" style={{ letterSpacing: "-0.02em" }} data-testid="booking-title">Book a Strategic Intro Call (20–30 min)</h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-600">Aligned goals, surface bottlenecks, set the next step. A <strong>$75 deposit</strong> is required to reserve your slot and is <strong>fully credited</strong> toward your first audit or retainer if we're a fit.</p>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Qualifying questions you'll answer when booking:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Current monthly ad spend (range)</li>
                <li>• Primary growth goal for next 3–6 months</li>
                <li>• Biggest challenge right now (tracking, ROI, CAC, scaling, etc.)</li>
                <li>• Timeline to start (immediately, 30–60 days, 90+ days)</li>
              </ul>
            </div>
            
            <p className="mt-6 text-center text-base font-medium text-gray-700" data-testid="calendly-reminder">
              You'll get clarity on what's working, what's missing, and where to focus next — no fluff.
            </p>
            
            {/* Calendly inline widget */}
            <div className="mt-6" id="book-intro">
              <CalendlyInline height={700} />
            </div>
            <p className="mt-4 text-center text-sm text-gray-500">Serious inquiries only. Limited availability each week.</p>
            <p className="mt-3 text-center text-sm text-gray-600" data-testid="calendly-testimonial">
              ⭐⭐⭐⭐⭐ "Best 30 minutes I spent all quarter." - CEO
            </p>
          </Card>
          
          {/* Testimonial in booking section */}
          <div className="mt-12 max-w-4xl mx-auto">
            <TestimonialCard testimonial={testimonials[1]} shouldReduceMotion={shouldReduceMotion} />
          </div>
        </Section>

        <Section id="audit" className="py-20 lg:py-24">
          <Card className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold sm:text-4xl text-gray-900 tracking-tight" style={{ letterSpacing: "-0.02em" }}>Deep‑Dive Audit</h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-600">A comprehensive assessment of your tracking, campaign structure, and funnel with a prioritized 30-day action plan.</p>
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
        <Section id="testimonial-retainer" className="py-16 lg:py-20 bg-white">
          <div className="mx-auto max-w-4xl">
            <TestimonialCard testimonial={testimonials[0]} shouldReduceMotion={shouldReduceMotion} />
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
              <PrimaryButton href="#book-intro" testId="button-retainer">Book Strategic Intro Call</PrimaryButton>
            </div>
          </Card>
        </Section>

        <ExitIntentModal />
      </main>
    </div>
  );
}
