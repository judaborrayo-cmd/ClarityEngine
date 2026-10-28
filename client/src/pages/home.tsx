import ExperienceBadges from "@/components/ExperienceBadges";
import { useState, useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import ProblemsTicker from "@/components/ProblemsTicker";
import HeroCTAs from "@/components/HeroCTAs";
import StartCards from "@/components/StartCards";
import ScaleAndAudit from "@/components/ScaleAndAudit";
import HowWeBuildFasterSection from "@/components/HowWeBuildFasterSection";
import ServicesAtAGlance from "@/components/ServicesAtAGlance";
import FaqHybrid from "@/components/FaqHybrid";
import { FeaturedCaseStudiesHome } from "@/components/FeaturedCaseStudiesHome";
import { Quote } from "lucide-react";
import HeroMotion from "@/components/HeroMotion";
import TestimonialSmoke from "@/components/TestimonialSmoke";
import "./home-redesign.css";
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
    name: "Lindsay Bast",
    title: "Fractional CMO",
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
    title: "VP of Performance · Lamark Media",
    avatar: mikeBerkmanPhoto,
    review: "I had the pleasure of working with Juda during his tenure at Lamark. During his interview, I knew he would bring a different level of thinking and analysis to the team that we were needing. He did not disappoint.",
    bgColor: "bg-gradient-to-br from-pink-400 to-pink-500",
    textColor: "text-white"
  },
  {
    id: 6,
    name: "Bill Bowman",
    title: "Former Vice President of Marketing · Magaya Logistics",
    avatar: billBowmanPhoto,
    review: "Juda is an exceptional marketing talent. He is able to manage complex advertising campaigns in a calm and focused way. While working with him, he continually suggested new and interesting ways to accomplish our team goals.",
    bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
    textColor: "text-white"
  }
];

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

  if (["#book-intro", "#book-call", "#retainer"].includes(hash)) return <Navigate replace to="/about" />;
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
                <p className="home-eyebrow">Grow smarter. Go further.</p>
                <h1 data-testid="hero-title">
                  Helping ambitious brands make clear decisions.<br /><span>More focused growth.</span>
                </h1>
                <p className="home-hero-description" data-testid="hero-description">
                  I help founders and teams understand where their marketing is getting stuck, decide what deserves attention next, and turn that into game-changing results.
                </p>
                <HeroCTAs />
                <p className="home-booking-note">12+ years of growth marketing experience. People + AI to move the work forward.</p>
              </div>
              <HeroMotion />
            </div>
            <div className="home-credibility" data-testid="hero-badges"><ExperienceBadges /></div>
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
                Trusted by Leading Brands
              </h2>
              <p className="mt-4 text-lg text-gray-600 font-normal">
                Partnering with ambitious companies across industries
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
              
              {/* Key metrics */}
              <div className="flex flex-wrap items-center justify-center gap-8 pt-8 mt-4 border-t border-gray-200">
                <div className="text-base font-semibold text-green-600" data-testid="metric-cpl">Serving B2B & B2C Clients</div>
                <div className="text-base font-semibold text-green-600" data-testid="metric-calls">12+ Years Managing Paid Media Strategies</div>
                <div className="text-base font-semibold text-green-600" data-testid="metric-revenue">Multi-million revenue driven through paid media</div>
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
                What Partners Say
              </h2>
              <p className="mt-4 text-lg text-gray-600 font-normal">
                Trusted by marketing professionals and industry leaders
              </p>
            </motion.div>
            <div className="home-partner-grid">
              {[testimonials[1], testimonials[4], testimonials[5]].map((testimonial) => (
                <PartnerCard key={testimonial.id} testimonial={testimonial} shouldReduceMotion={shouldReduceMotion} />
              ))}
            </div>
            <div id="more-partner-reviews" hidden={!showAllTestimonials}>
              {showAllTestimonials && <div className="home-partner-grid mt-6">
                {[testimonials[0], testimonials[2], testimonials[3]].map(testimonial => <PartnerCard key={testimonial.id} testimonial={testimonial} shouldReduceMotion={shouldReduceMotion} />)}
              </div>}
            </div>
            <button type="button" className="home-partners-toggle" aria-expanded={showAllTestimonials} aria-controls="more-partner-reviews" onClick={() => setShowAllTestimonials(value => !value)}>
              {showAllTestimonials ? 'Show fewer testimonials' : 'Read 3 more testimonials'}
            </button>
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
            <FaqHybrid defaultVisibleCategories={2} defaultVisibleQuestionsPerCategory={3} />
          </motion.div>
        </Section>

      </main>
    </div>
  );
}
