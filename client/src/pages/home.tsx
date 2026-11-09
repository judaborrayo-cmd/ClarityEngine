import { testimonials } from "@/lib/partner-testimonials";
import HomeExplorerScenes from "@/components/HomeExplorerScenes";
import LeadershipCollaboration from "@/components/LeadershipCollaboration";
import ExperienceBadges from "@/components/ExperienceBadges";
import { useState, useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import ProblemsTicker from "@/components/ProblemsTicker.home-variation";
import HeroCTAs from "@/components/HeroCTAs";
import StartCards from "@/components/StartCards.home-variation";
import ScaleAndAudit from "@/components/ScaleAndAudit.home-variation";
import HowWeBuildFasterSection from "@/components/HowWeBuildFasterSection.home-variation";
import ServicesAtAGlance from "@/components/ServicesAtAGlance.home-variation";
import FaqHybrid from "@/components/FaqHybrid.home-variation";
import { FeaturedCaseStudiesHome } from "@/components/FeaturedCaseStudiesHome.home-variation";
import { Quote } from "lucide-react";
import HeroMotion from "@/components/HeroMotion";
import TestimonialSmoke from "@/components/TestimonialSmoke";
import "./home-redesign.css";
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
import rowlandBallardLogo from "@assets/client-rowland-ballard-school.png";
import oasisGymnasticsLogo from "@assets/client-oasis-gymnastics.png";
import goldenGalapagosLogo from "@assets/client-golden-galapagos.png";
import columbusTravelLogo from "@assets/client-columbus-travel.webp";
import luxuryCruisesGalapagosLogo from "@assets/client-luxury-cruises-galapagos.png";
import goldenExperiencesTravelLogo from "@assets/client-golden-experiences-travel.png";
import artOfLivingRetreatCenterLogo from "@assets/client-art-of-living-retreat-center.png";

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
    className={`ce-readable-logo h-[60px] w-auto object-contain ${className}`}
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


const PartnerCard = ({ testimonial, delay = 0, shouldReduceMotion = false }: { testimonial: typeof testimonials[0]; delay?: number; shouldReduceMotion?: boolean }) => (
  <motion.div
    initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : delay }}
    whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.3 } }}
    className="home-partner-card"
  >
    <Quote className="home-partner-quote" aria-hidden="true" />
    <blockquote className="home-partner-review">{testimonial.review}</blockquote>
    <div className="home-partner-attribution">
      <img
        src={testimonial.avatar}
        alt={testimonial.name}
        className="w-12 h-12 rounded-full object-cover" loading="lazy" width="48" height="48"
      />
      <div>
        <p className="font-semibold text-base">{testimonial.name}</p>
        <p className="text-sm text-gray-600 mt-0.5">{testimonial.title}</p>
      </div>
    </div>
  </motion.div>
);

export default function Home() {
  const { hash } = useLocation();
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);
  const shouldReduceMotion = useReducedMotion() ?? false;
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

  if (["#book-intro", "#book-call", "#retainer"].includes(hash)) return <Navigate replace to="/about#inquiry" />;
  if (hash === "#audit") return <Navigate replace to="/growth-clarity-audit" />;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <ProgressBar />
      <main className="home-page relative min-h-screen overflow-x-hidden bg-white text-gray-900">
        {/* --- HERO --- */}
        <Section id="hero" className="home-redesign-hero">
          <div className="home-hero-shell">
            <div className="home-hero-grid">
              <div className="home-hero-copy">
                <h1 data-testid="hero-title">
                  Help more of the right people <span>choose your experience.</span>
                </h1>
                <p className="home-hero-description" data-testid="hero-description">
                  We combine senior marketing expertise with the latest AI tools to build campaigns, test landing pages, and uncover opportunities faster—helping turn more interest into inquiries, bookings, and revenue.
                </p>
                <HeroCTAs />
                <p className="home-booking-note">People + AI. Experienced direction. Faster execution. Continuous improvement.</p>
              </div>
              <HeroMotion />
              <HomeExplorerScenes />
            </div>
            <div className="home-credibility" data-testid="hero-badges"><ExperienceBadges animateOnScroll showPlatforms={false} /></div>
          </div>
        </Section>

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
                Experience across businesses built around people.
              </h2>
              <p className="mt-4 text-lg text-gray-600 font-normal">
                From retreats and travel to fitness and hospitality, our work connects marketing with the experiences people choose.
              </p>
            </motion.div>

            {/* Client logo rows */}
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

              {/* Fourth row */}
              <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-12">
                <LogoImage src={oasisGymnasticsLogo} alt="Oasis Gymnastics" />
                <LogoImage src={goldenGalapagosLogo} alt="Golden Galapagos" />
                <LogoImage src={columbusTravelLogo} alt="Columbus Travel" />
                <LogoImage src={luxuryCruisesGalapagosLogo} alt="Luxury Cruises Galapagos" />
                <LogoImage src={goldenExperiencesTravelLogo} alt="Golden Experiences and Travel" />
                <LogoImage src={artOfLivingRetreatCenterLogo} alt="The Art of Living Retreat Center" />
              </div>

            </motion.div>
          </Section>
        </div>

        {/* --- TESTIMONIALS AFTER BRAND PROOF --- */}
        <Section id="testimonials-hero" className="home-partners">
          <TestimonialSmoke />
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold sm:text-5xl text-gray-900 tracking-tight" style={{ letterSpacing: "-0.02em" }}>
                What it’s like to have Clarity Engine on your team.
              </h2>
              <p className="mt-4 text-lg text-gray-600 font-normal">
                Hear from clients and colleagues who have worked with our founder on strategy, execution, and performance.
              </p>
            </motion.div>
            <div className="home-partner-grid home-partner-grid-featured">
              {[testimonials[4], testimonials[5]].map((testimonial) => (
                <PartnerCard key={testimonial.id} testimonial={testimonial} shouldReduceMotion={shouldReduceMotion} />
              ))}
            </div>
            <div id="more-partner-reviews" hidden={!showAllTestimonials}>
              {showAllTestimonials && <div className="home-partner-grid mt-6">
                {[testimonials[1], testimonials[0], testimonials[2], testimonials[3]].map(testimonial => <PartnerCard key={testimonial.id} testimonial={testimonial} shouldReduceMotion={shouldReduceMotion} />)}
              </div>}
            </div>
            <button type="button" className="home-partners-toggle" aria-expanded={showAllTestimonials} aria-controls="more-partner-reviews" onClick={() => setShowAllTestimonials(value => !value)}>
              {showAllTestimonials ? 'Show fewer testimonials' : 'Read testimonials'}
            </button>
          </div>
        </Section>

        <Section id="hands-on-experience" className="home-experience-summary">
          <div className="home-experience-layout">
            <div className="home-experience-copy">

              <h2>The direction you need.<br /><span>The support to move it forward.</span></h2>
              <p>Bring 12+ years of marketing experience into your business, with a partner who can lead the strategy and help get the work done. Clarity Engine works alongside your team—or takes ownership of agreed priorities—using AI to accelerate research, creative development, and implementation.</p>
              <div className="home-experience-principles" aria-label="How we work"><span>Clear priorities</span><span>Hands-on support</span><span>Shared accountability</span></div>
            </div>
            <div className="home-experience-visual"><LeadershipCollaboration /></div>
          </div>
        </Section>

        {/* --- PROBLEMS TICKER --- */}
        <ProblemsTicker />



        {/* --- START CARDS (CRO) --- */}
        <Section id="value-ladder" className="py-8 lg:py-12">
          <StartCards />
        </Section>

        {/* --- SCALE AND AUDIT SECTION --- */}
        <Section id="how-we-scale" className="py-8 lg:py-12">
          <ScaleAndAudit />
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
            <FaqHybrid defaultVisibleCategories={2} defaultVisibleQuestionsPerCategory={4} />
          </motion.div>
        </Section>

        <Section id="next-growth-opportunity" className="py-12 sm:py-20">
          <div className="rounded-3xl border border-purple-100 bg-purple-50/50 p-8 sm:p-12 text-center max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">Give your next growth opportunity<br className="hidden sm:block" /> a way forward.</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-5 mb-7">Bring the challenge, the unfinished idea, or the results you want to improve. Let’s talk about where experienced direction and hands-on support could help.</p>
            <Link to="/growth-partnership#consultation" className="inline-flex rounded-xl bg-violet-600 hover:bg-violet-700 px-6 py-3 font-semibold text-white">Book a Growth Call</Link>
          </div>
        </Section>
      </main>
    </div>
  );
}
