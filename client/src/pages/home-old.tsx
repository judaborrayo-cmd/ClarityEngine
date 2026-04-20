import { useState } from "react";
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
  Mail 
} from "lucide-react";
import clarityEngineLogo from "@assets/clarity-engine-logo.png";

import Clarity_Engine_Favicon from "@assets/Clarity-Engine-Favicon.png";

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const services = [
    {
      icon: DollarSign,
      title: "Growth Clarity Audit",
      description: "A 360° audit to uncover what's costing you conversions. Full funnel review, video walkthrough, and an action plan you can implement immediately.",
    },
    {
      icon: Target,
      title: "Google Ads Management",
      description: "High-ROI campaigns built for efficiency, scale, and measurable results—from audit to strategy to ongoing optimization.",
    },
    {
      icon: Users,
      title: "Paid Social Media Growth",
      description: "Creative testing, precision targeting, and scaling across Meta & beyond. Brand story meets conversions.",
    },
    {
      icon: TrendingUp,
      title: "Fractional CMO",
      description: "Senior-level partnership unifying strategy, funnels, and paid media. A strategist and operator embedded with your team.",
    },
    {
      icon: Heart,
      title: "Non-Profit Google Grant",
      description: "Unlock and maximize your $10K/month Google Ad Grant: compliance, builds, tracking, and training.",
    },
    {
      icon: Target,
      title: "CRO & Funnel Optimization",
      description: "Prioritized testing roadmap across pages, offers, and analytics to increase conversion rate and ROAS.",
    },
  ];

  const caseStudies = [
    {
      icon: Mic,
      title: "Lisa Nichols — Author & Speaker",
      stat: "−47.9% CPC, optimized $250k+ ad spend",
      description: "Scaled presence with efficient Google & YouTube campaigns; improved CTRs and lowered costs.",
    },
    {
      icon: Waves,
      title: "Mandali Retreat — Luxury Wellness",
      stat: "5× ROAS while filling retreat bookings",
      description: "Multi‑channel strategy across Meta & Search; retargeting and geo‑segmented campaigns.",
    },
    {
      icon: Palette,
      title: "Hapi Art — E‑commerce",
      stat: "10× ROAS, $1M+ revenue generated",
      description: "Built a profitable system with creative testing and audience expansion.",
    },
    {
      icon: Dumbbell,
      title: "Lamark Agency — Fitness",
      stat: "11k new members, $2M+ revenue influence",
      description: "Scaled PPC programs and tracked multi‑location impact.",
    },
  ];

  const testimonials = [
    {
      quote: "Juda is an exceptional marketing talent — he approaches challenges with a calm, focused mindset and consistently finds innovative solutions.",
      author: "VP of Marketing",
    },
    {
      quote: "He brings a different level of analysis and thinking to every campaign. A true partner in driving growth.",
      author: "VP of Performance",
    },
    {
      quote: "Always learning, always innovating. Juda brings clarity to complex challenges and executes with precision.",
      author: "Founder, Chief Creative",
    },
  ];

  const achievements = [
    "$5M+ in ad spend managed across growth brands",
    "Multi-millions in revenue driven through paid media",
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
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3" data-testid="logo">
              <img
                src={Clarity_Engine_Favicon}
                alt="Clarity Engine Logo"
                className="h-8 w-8"
              />
              <span className="text-xl font-bold text-foreground">Clarity Engine</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('services')}
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="nav-services"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('case-studies')}
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="nav-case-studies"
              >
                Case Studies
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="nav-about"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('cta')}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-2xl font-semibold hover:bg-primary/90 transition-colors"
                data-testid="nav-get-started"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-foreground"
              data-testid="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="text-xl" /> : <Menu className="text-xl" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-border">
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-muted-foreground hover:text-foreground transition-colors text-left"
                  data-testid="mobile-nav-services"
                >
                  Services
                </button>
                <button 
                  onClick={() => scrollToSection('case-studies')}
                  className="text-muted-foreground hover:text-foreground transition-colors text-left"
                  data-testid="mobile-nav-case-studies"
                >
                  Case Studies
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-muted-foreground hover:text-foreground transition-colors text-left"
                  data-testid="mobile-nav-about"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('cta')}
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-2xl font-semibold hover:bg-primary/90 transition-colors text-left w-fit"
                  data-testid="mobile-nav-get-started"
                >
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative px-6 pt-20 pb-16 lg:px-8 bg-gradient-to-b from-background to-muted">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto h-28 w-28 mb-6 flex items-center justify-center">
              <img
                src={clarityEngineLogo}
                alt="Clarity Engine Logo"
                className="h-28 w-28 object-contain"
              />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground" data-testid="hero-title">
              Scaling Ambitious Brands with ROI-Driven Paid Media & Growth Strategy
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground" data-testid="hero-description">
              I help founders and teams turn ad spend into predictable growth. With over
              <span className="font-semibold text-foreground"> $3M in ad budget managed</span> and
              <span className="font-semibold text-foreground"> multi-million in revenue driven</span>,
              I bring clarity, structure, and impact to every campaign.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
              <button 
                onClick={() => scrollToSection('cta')}
                className="rounded-2xl px-6 py-3 text-base font-semibold border border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                data-testid="hero-cta-audit"
              >
                Start with a Growth Clarity Audit
              </button>
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

        {/* Services Section */}
        <section id="services" className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground" data-testid="services-title">Services</h2>
              <p className="mt-2 text-muted-foreground" data-testid="services-subtitle">Choose your entry point or build a plan across channels.</p>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <article 
                    key={service.title} 
                    className="rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow bg-card"
                    data-testid={`service-card-${index}`}
                  >
                    <div className="flex items-center mb-4">
                      <IconComponent className="text-2xl text-primary mr-3" />
                      <h3 className="text-xl font-semibold text-card-foreground" data-testid={`service-title-${index}`}>
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground" data-testid={`service-description-${index}`}>
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
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section id="case-studies" className="px-6 py-16 lg:px-8 bg-muted">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground" data-testid="case-studies-title">Proof & Case Studies</h2>
              <p className="mt-2 text-muted-foreground" data-testid="case-studies-subtitle">Selected outcomes from recent work.</p>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {caseStudies.map((study, index) => {
                const IconComponent = study.icon;
                return (
                  <article 
                    key={study.title} 
                    className="rounded-2xl border border-border p-6 bg-card shadow-sm hover:shadow-md transition-shadow"
                    data-testid={`case-study-card-${index}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-card-foreground" data-testid={`case-study-title-${index}`}>
                          {study.title}
                        </h3>
                        <div className="mt-1 text-primary font-bold" data-testid={`case-study-stat-${index}`}>
                          {study.stat}
                        </div>
                      </div>
                      <IconComponent className="text-primary text-xl" />
                    </div>
                    <p className="text-muted-foreground" data-testid={`case-study-description-${index}`}>
                      {study.description}
                    </p>
                    <div className="mt-4">
                      <a 
                        href="#" 
                        className="text-primary font-medium underline underline-offset-2 hover:text-primary/80 transition-colors"
                        data-testid={`case-study-link-${index}`}
                      >
                        Read full case study
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground" data-testid="testimonials-title">What People Say</h2>
            </div>
            
            <div className="grid gap-6 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <figure 
                  key={index} 
                  className="rounded-2xl border border-border p-6 shadow-sm bg-card"
                  data-testid={`testimonial-card-${index}`}
                >
                  <div className="text-primary text-2xl mb-4">
                    <Quote />
                  </div>
                  <blockquote className="text-card-foreground" data-testid={`testimonial-quote-${index}`}>
                    "{testimonial.quote}"
                  </blockquote>
                  <figcaption className="mt-4 text-sm text-muted-foreground" data-testid={`testimonial-author-${index}`}>
                    — {testimonial.author}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Why Work With Me Section */}
        <section id="about" className="px-6 py-16 lg:px-8 bg-muted">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground" data-testid="about-title">Why Work With Me</h2>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3" data-testid={`achievement-${index}`}>
                  <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-primary flex-shrink-0"></span>
                  <span className="text-muted-foreground">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center rounded-3xl border border-border p-10 shadow-sm bg-card">
              <div className="mx-auto w-16 h-16 flex items-center justify-center mb-6">
                <img
                  src={clarityEngineLogo}
                  alt="Clarity Engine Logo"
                  className="h-16 w-16 object-contain"
                />
              </div>
              <h2 className="text-3xl font-bold text-card-foreground" data-testid="cta-title">Ready to scale with clarity?</h2>
              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto" data-testid="cta-description">
                The fastest way to uncover what's holding back your growth is through a Growth Clarity Audit.
                In 5–10 days, you'll receive a complete funnel review, video walkthrough, and a roadmap for measurable growth.
              </p>
              <div className="mt-6 flex justify-center">
                <a 
                  href="#" 
                  className="rounded-2xl px-8 py-4 text-base font-semibold text-accent-foreground bg-accent hover:bg-primary hover:text-primary-foreground transition-all duration-200 transform hover:scale-105"
                  data-testid="cta-book-audit"
                >
                  Book Your Growth Clarity Audit
                </a>
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
                  src={clarityEngineLogo}
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
