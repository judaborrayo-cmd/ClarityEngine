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
      quote: "I highly recommend Juda as a skilled and professional growth marketer. I've worked with him on multiple digital marketing strategies and media buying projects. Juda gives it his all for his clients.",
      author: "Lindsey Bast, Digital Strategist & Growth Marketer",
      gradient: "from-purple-500 to-purple-600",
      profileColor: "border-white",
      image: profileImages.lindsey
    },
    {
      quote: "It's always enjoyable writing a recommendation for someone as enjoyable as Juda. I've worked with Juda in a professional capacity for over a year now at Sociality Squared. We've worked on various clients together and he's worn many different hats.",
      author: "Mari Smith, Co-Founder & Marketing Director",
      gradient: "from-purple-500 to-purple-600",
      profileColor: "border-white",
      image: profileImages.mari
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
      <main>
        {/* Hero Section */}
        <section className="relative px-6 pt-20 pb-16 lg:px-8 bg-gradient-to-b from-background to-muted">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto h-28 w-28 mb-6 flex items-center justify-center">
              <img
                src="/clarity-engine-logo.png"
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
              <h2 className="text-3xl font-bold text-foreground" data-testid="testimonials-title">Colleague Reviews</h2>
              <p className="mt-2 text-muted-foreground">What industry professionals say about working with me</p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className={`relative rounded-3xl p-8 text-white bg-gradient-to-br ${testimonial.gradient} shadow-xl overflow-hidden`}
                  data-testid={`testimonial-card-${index}`}
                >
                  {/* Decorative circles */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-white opacity-30 rounded-full"></div>
                  <div className="absolute -top-2 -left-2 w-4 h-4 bg-white opacity-50 rounded-full"></div>
                  <div className="absolute top-8 left-8 w-12 h-12 bg-white opacity-10 rounded-full"></div>
                  <div className="absolute top-12 left-20 w-6 h-6 bg-white opacity-20 rounded-full"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="mb-6">
                      <div className="inline-block px-6 py-2 bg-white bg-opacity-20 rounded-full text-sm font-medium backdrop-blur-sm">
                        Colleague review
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-16 h-16 rounded-full overflow-hidden ${testimonial.profileColor} border-4 backdrop-blur-sm flex-shrink-0`}>
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
                        <blockquote className="text-white leading-relaxed mb-4" data-testid={`testimonial-quote-${index}`}>
                          "{testimonial.quote}"
                        </blockquote>
                      </div>
                    </div>
                    
                    <figcaption className="font-medium text-white opacity-90" data-testid={`testimonial-author-${index}`}>
                      - {testimonial.author}
                    </figcaption>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-sm text-muted-foreground">linkedin.com/in/judaborrayo/</p>
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
                  src="/clarity-engine-logo.png"
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