import { useState } from "react";
import { Link } from "react-router-dom";
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
      id: "lamark-agency",
      icon: Dumbbell,
      title: "Lamark Agency — Performance Marketing",
      stat: "Managed budgets up to $70,000 per month across verticals",
      description: "Scaled PPC programs and tracked multi‑location impact.",
    },
    {
      id: "hapi-art",
      icon: Palette,
      title: "Hapi Art — E‑commerce",
      stat: "8×+ ROAS System Built",
      description: "Built a profitable system with creative testing and audience expansion.",
    },
    {
      id: "mandali-retreats",
      icon: Waves,
      title: "Mandali Retreat — Luxury Wellness",
      stat: "15× ROAS while filling retreat bookings",
      description: "Multi‑channel strategy across Meta & Search; retargeting and geo‑segmented campaigns.",
    },
    {
      id: "fitness-roi",
      icon: TrendingUp,
      title: "Maximizing ROI in Fitness",
      stat: "11k new members, $2M+ revenue influenced",
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
            <div className="absolute top-16 left-16 w-16 h-16 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full animate-pulse backdrop-blur-sm shadow-lg shadow-primary/20"></div>
            <div className="absolute top-32 right-20 w-12 h-12 bg-gradient-to-r from-accent/15 to-primary/15 rounded-full animate-bounce backdrop-blur-sm shadow-lg shadow-accent/20" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
            <div className="absolute bottom-32 left-1/4 w-10 h-10 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full animate-ping backdrop-blur-sm" style={{ animationDelay: '2s' }}></div>
            
            {/* Lightning bolt for breakthrough moments */}
            <div className="absolute top-20 right-32 opacity-10 animate-pulse">
              <svg className="w-12 h-12 text-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 2v11h3v9l7-12h-4L17 2H7z" />
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
              Scaling Ambitious Brands with <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">ROI-Driven</span> Paid Media & Growth Strategy
              {/* Lightning accent for breakthrough */}
              <div className="absolute -top-2 -right-2 opacity-30">
                <svg className="w-12 h-12 text-accent animate-ping" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 2v11h3v9l7-12h-4L17 2H7z" />
                </svg>
              </div>
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

        {/* Client Portfolio Carousel */}
        <section className="px-6 py-16 lg:px-8 bg-muted/50 overflow-hidden">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="clients-title">
                Trusted by Leading Brands Across Industries
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                From fitness and wellness to SaaS and e-commerce, I've helped ambitious brands achieve 
                multi-million dollar growth through strategic paid media and growth marketing across all major platforms.
              </p>
            </div>
            
            {/* Animated Logo Carousel */}
            <div className="relative">
              {/* Animated expanding/retracting top border */}
              <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-secondary mb-8 animate-border-expand"></div>
              
              <div className="flex animate-scroll">
                {/* First set of logos */}
                <div className="flex items-center gap-12 flex-shrink-0">
                  {/* Client Logos */}
                  <div className="h-20 w-40 flex items-center justify-center transition-all duration-300">
                    <img src="/images/client-logos/steelfit.png" alt="SteelFit" className="max-h-16 max-w-36 object-contain" />
                  </div>
                  <div className="h-20 w-40 flex items-center justify-center transition-all duration-300">
                    <img src="/images/client-logos/amawaterways.png" alt="AmaWaterways" className="max-h-16 max-w-36 object-contain" />
                  </div>
                  <div className="h-20 w-40 flex items-center justify-center transition-all duration-300">
                    <img src="/images/client-logos/bolay.png" alt="Bolay Kitchen" className="max-h-12 max-w-32 object-contain" />
                  </div>
                  <div className="h-20 w-40 flex items-center justify-center transition-all duration-300">
                    <img src="/images/client-logos/shani-darden.png" alt="Shani Darden Skincare" className="max-h-16 max-w-36 object-contain" />
                  </div>
                  <div className="h-20 w-40 flex items-center justify-center transition-all duration-300">
                    <img src="/images/client-logos/cutera.png" alt="Cutera" className="max-h-16 max-w-36 object-contain" />
                  </div>
                  <div className="h-20 w-40 flex items-center justify-center transition-all duration-300">
                    <img src="/images/client-logos/mandali.png" alt="Mandali Retreats" className="max-h-16 max-w-36 object-contain" />
                  </div>
                  <div className="h-20 w-40 flex items-center justify-center transition-all duration-300">
                    <img src="/images/client-logos/core40.png" alt="Core 40" className="max-h-16 max-w-36 object-contain" />
                  </div>
                  <div className="h-20 w-40 flex items-center justify-center transition-all duration-300">
                    <img src="/images/client-logos/motivating-masses.png" alt="Motivating The Masses" className="max-h-16 max-w-36 object-contain" />
                  </div>
                  <div className="h-20 w-40 flex items-center justify-center transition-all duration-300">
                    <img src="/images/client-logos/magaya.png" alt="Magaya" className="max-h-16 max-w-36 object-contain" />
                  </div>
                  <div className="h-20 w-40 flex items-center justify-center transition-all duration-300">
                    <img src="/images/client-logos/columbus-travel.png" alt="Columbus Travel" className="max-h-16 max-w-36 object-contain" />
                  </div>
                  <div className="h-20 w-40 flex items-center justify-center transition-all duration-300">
                    <img src="/images/client-logos/mix-telematics.png" alt="Mix Telematics" className="max-h-16 max-w-36 object-contain" />
                  </div>
                  <div className="h-20 w-40 flex items-center justify-center transition-all duration-300">
                    <img src="/images/client-logos/eft-universe.png" alt="EFT Universe" className="max-h-16 max-w-36 object-contain" />
                  </div>
                  
                  {/* Platform/Technology Logos */}
                  <div className="h-20 w-40 flex items-center justify-center transition-all duration-300">
                    <svg className="h-10 w-24" viewBox="0 0 100 32" fill="currentColor">
                      <text x="0" y="20" className="text-base font-bold">Google Ads</text>
                    </svg>
                  </div>
                  <div className="h-20 w-40 flex items-center justify-center transition-all duration-300">
                    <svg className="h-10 w-24" viewBox="0 0 100 32" fill="currentColor">
                      <text x="0" y="20" className="text-base font-bold">Meta</text>
                    </svg>
                  </div>
                  <div className="h-20 w-40 flex items-center justify-center transition-all duration-300">
                    <svg className="h-10 w-24" viewBox="0 0 100 32" fill="currentColor">
                      <text x="0" y="20" className="text-base font-bold">YouTube</text>
                    </svg>
                  </div>
                  <div className="h-20 w-40 flex items-center justify-center transition-all duration-300">
                    <svg className="h-10 w-24" viewBox="0 0 100 32" fill="currentColor">
                      <text x="0" y="20" className="text-base font-bold">LinkedIn</text>
                    </svg>
                  </div>
                </div>
                
                {/* Duplicate set for seamless loop */}
                <div className="flex items-center gap-12 px-6 flex-shrink-0">
                  {/* Client Logos */}
                  <div className="h-20 w-40 flex items-center justify-center transition-all duration-300">
                    <img src="/images/client-logos/steelfit.png" alt="SteelFit" className="max-h-16 max-w-36 object-contain" />
                  </div>
                  <div className="h-20 w-40 flex items-center justify-center transition-all duration-300">
                    <img src="/images/client-logos/amawaterways.png" alt="AmaWaterways" className="max-h-16 max-w-36 object-contain" />
                  </div>
                  <div className="h-20 w-40 flex items-center justify-center transition-all duration-300">
                    <img src="/images/client-logos/bolay.png" alt="Bolay Kitchen" className="max-h-12 max-w-32 object-contain" />
                  </div>
                  <div className="h-20 w-40 flex items-center justify-center transition-all duration-300">
                    <img src="/images/client-logos/shani-darden.png" alt="Shani Darden Skincare" className="max-h-16 max-w-36 object-contain" />
                  </div>
                  <div className="h-20 w-40 flex items-center justify-center transition-all duration-300">
                    <img src="/images/client-logos/cutera.png" alt="Cutera" className="max-h-16 max-w-36 object-contain" />
                  </div>
                  <div className="h-20 w-40 flex items-center justify-center transition-all duration-300">
                    <img src="/images/client-logos/mandali.png" alt="Mandali Retreats" className="max-h-16 max-w-36 object-contain" />
                  </div>
                  <div className="h-20 w-40 flex items-center justify-center transition-all duration-300">
                    <img src="/images/client-logos/core40.png" alt="Core 40" className="max-h-16 max-w-36 object-contain" />
                  </div>
                  <div className="h-20 w-40 flex items-center justify-center transition-all duration-300">
                    <img src="/images/client-logos/motivating-masses.png" alt="Motivating The Masses" className="max-h-16 max-w-36 object-contain" />
                  </div>
                  <div className="h-20 w-40 flex items-center justify-center transition-all duration-300">
                    <img src="/images/client-logos/magaya.png" alt="Magaya" className="max-h-16 max-w-36 object-contain" />
                  </div>
                  <div className="h-20 w-40 flex items-center justify-center transition-all duration-300">
                    <img src="/images/client-logos/columbus-travel.png" alt="Columbus Travel" className="max-h-16 max-w-36 object-contain" />
                  </div>
                  <div className="h-20 w-40 flex items-center justify-center transition-all duration-300">
                    <img src="/images/client-logos/mix-telematics.png" alt="Mix Telematics" className="max-h-16 max-w-36 object-contain" />
                  </div>
                  <div className="h-20 w-40 flex items-center justify-center transition-all duration-300">
                    <img src="/images/client-logos/eft-universe.png" alt="EFT Universe" className="max-h-16 max-w-36 object-contain" />
                  </div>
                  
                  {/* Platform/Technology Logos */}
                  <div className="h-20 w-40 flex items-center justify-center transition-all duration-300">
                    <svg className="h-10 w-24" viewBox="0 0 100 32" fill="currentColor">
                      <text x="0" y="20" className="text-base font-bold">Google Ads</text>
                    </svg>
                  </div>
                  <div className="h-20 w-40 flex items-center justify-center transition-all duration-300">
                    <svg className="h-10 w-24" viewBox="0 0 100 32" fill="currentColor">
                      <text x="0" y="20" className="text-base font-bold">Meta</text>
                    </svg>
                  </div>
                  <div className="h-20 w-40 flex items-center justify-center transition-all duration-300">
                    <svg className="h-10 w-24" viewBox="0 0 100 32" fill="currentColor">
                      <text x="0" y="20" className="text-base font-bold">YouTube</text>
                    </svg>
                  </div>
                  <div className="h-20 w-40 flex items-center justify-center transition-all duration-300">
                    <svg className="h-10 w-24" viewBox="0 0 100 32" fill="currentColor">
                      <text x="0" y="20" className="text-base font-bold">LinkedIn</text>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Gradient overlays for smooth edges */}
              <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-muted/50 to-transparent pointer-events-none"></div>
              <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-muted/50 to-transparent pointer-events-none"></div>
              
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="px-6 py-16 lg:px-8 relative overflow-hidden">
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
              <h2 className="text-3xl font-bold text-foreground" data-testid="services-title">Services</h2>
              <p className="mt-2 text-muted-foreground" data-testid="services-subtitle">Choose your entry point or build a plan across channels.</p>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <article 
                    key={service.title} 
                    className="group rounded-2xl border border-border p-6 shadow-sm hover:shadow-xl transition-all duration-500 bg-card hover:bg-gradient-to-br hover:from-blue-600 hover:via-purple-600 hover:to-blue-800 hover:scale-105 hover:border-primary/50 hover:shadow-2xl hover:shadow-blue-500/25 animate-fade-in-up"
                    style={{ animationDelay: `${index * 150}ms` }}
                    data-testid={`service-card-${index}`}
                  >
                    <div className="flex items-center mb-4">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        <IconComponent className="relative text-2xl text-primary group-hover:text-white mr-3 group-hover:scale-110 transition-all duration-300" />
                      </div>
                      <h3 className="text-xl font-semibold text-card-foreground group-hover:text-white transition-colors duration-300" data-testid={`service-title-${index}`}>
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground group-hover:text-white/90 transition-colors duration-300" data-testid={`service-description-${index}`}>
                      {service.description}
                    </p>
                    <div className="mt-4">
                      <button 
                        onClick={() => scrollToSection('cta')}
                        className="text-primary group-hover:text-white font-medium underline underline-offset-2 hover:text-primary/80 group-hover:hover:text-white/80 transition-colors"
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
        <section id="case-studies" className="px-6 py-16 lg:px-8 bg-muted relative overflow-hidden">
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
                        <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors duration-300" data-testid={`case-study-title-${index}`}>
                          {study.title}
                        </h3>
                        <div className="mt-1 text-primary font-bold" data-testid={`case-study-stat-${index}`}>
                          {study.stat}
                        </div>
                        
                        {/* Animated Progress Bar with Real Metrics */}
                        <div className="mt-3 relative">
                          {/* Lightning bolt for high ROI/Revenue */}
                          {(label === 'ROAS' || label === 'Revenue') && (
                            <div className="absolute -top-2 -right-2 opacity-60 group-hover:opacity-100 transition-opacity">
                              <svg className="w-4 h-4 text-accent animate-ping" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M7 2v11h3v9l7-12h-4L17 2H7z" />
                              </svg>
                            </div>
                          )}
                          
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-muted-foreground">Strategy & Execution:</span>
                            <div className="flex items-center gap-1">
                              <span className="text-lg font-bold text-primary group-hover:scale-110 transition-transform duration-300">{metric}</span>
                              {/* Upward scaling arrow for growth */}
                              <svg className="w-3 h-3 text-green-500 animate-bounce" fill="currentColor" viewBox="0 0 24 24" style={{animationDelay: `${index * 200 + 800}ms`}}>
                                <path d="M7 14l5-5 5 5z" />
                              </svg>
                            </div>
                          </div>
                          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-primary via-accent to-secondary rounded-full animate-progress-fill transition-all duration-1000 group-hover:animate-pulse"
                              style={{ 
                                width: `${progressValue}%`,
                                animationDelay: `${index * 300 + 500}ms`
                              }}
                            ></div>
                          </div>
                          <div className="flex justify-end mt-1">
                            <span className="text-xs text-muted-foreground">Strategy & Execution: {progressValue}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="relative ml-4">
                        <div className="absolute -inset-2 bg-gradient-to-r from-accent to-primary rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        <IconComponent className="relative text-primary text-xl group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <p className="text-muted-foreground" data-testid={`case-study-description-${index}`}>
                      {study.description}
                    </p>
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
        </section>

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
              <div className="group flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:bg-gradient-to-br hover:from-blue-600 hover:via-purple-600 hover:to-blue-800 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 cursor-pointer">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 group-hover:bg-white/20 rounded-lg transition-colors duration-300">
                  <Shield className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-foreground group-hover:text-white transition-colors duration-300">Best English-speaking freelance Performance Marketing Specialists to hire in 2025</div>
                  <div className="text-sm text-muted-foreground group-hover:text-white/90 transition-colors duration-300">Contra Featured Expert</div>
                </div>
              </div>
              
              <div className="group flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:bg-gradient-to-br hover:from-blue-600 hover:via-purple-600 hover:to-blue-800 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 cursor-pointer">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 group-hover:bg-white/20 rounded-lg transition-colors duration-300">
                  <Target className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-foreground group-hover:text-white transition-colors duration-300">Best Spanish-speaking Google Ads freelancers to hire in 2025</div>
                  <div className="text-sm text-muted-foreground group-hover:text-white/90 transition-colors duration-300">Contra Featured Expert</div>
                </div>
              </div>
              
              <div className="group flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:bg-gradient-to-br hover:from-blue-600 hover:via-purple-600 hover:to-blue-800 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 cursor-pointer">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 group-hover:bg-white/20 rounded-lg transition-colors duration-300">
                  <Users className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-foreground group-hover:text-white transition-colors duration-300">Best Spanish-speaking Google Sheets freelancers to hire in 2025</div>
                  <div className="text-sm text-muted-foreground group-hover:text-white/90 transition-colors duration-300">Contra Featured Expert</div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <a 
                href="https://contra.com/@judaborrayo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                data-testid="contra-profile-link"
              >
                View Full Contra Profile
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
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