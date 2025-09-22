import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Search, Target, Users, Crown, Heart, BarChart3 } from "lucide-react";
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
import bolayLogo from "@assets/Bolay_Official_Logo_Vertical_RGB_1756749176444.png";
import core40Logo from "@assets/Core40_Logo_1756749176445.png";
import cuteraLogo from "@assets/Cutera-Laser-Genesis-Subpage_1756749176443.png";
import eftUniverseLogo from "@assets/EFTUniverse-logo_320x132 (1)_1756749176445.png";
import magayaLogo from "@assets/LOGO_MAGAYA_MEDIUM-GREY_1756749176446.png";
import mandaliLogo from "@assets/mandali_logo-actual_1756749176444.png";
import mixTelematicsLogo from "@assets/mix-telematics-logo-actual_1756749176445.png";
import motivatingMassesLogo from "@assets/Motivating_The_Masses_Logo_Transparent_1756749176445.png";
import columbusLogo from "@assets/2LOGO-NEW-COLUMBUS-01-(1)_1756749176442.png";

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

const LogoImage = ({ src, alt, className = "" }: { src: string; alt: string; className?: string }) => (
  <img 
    src={src} 
    alt={alt} 
    className={`h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 ${className}`}
    data-testid={`logo-${alt.toLowerCase().replace(/\s+/g, '-')}`}
  />
);

export default function CaseStudies() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <ProgressBar />
      <main className="relative">
        
        {/* Hero Section */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl" data-testid="page-title">
                Case Studies
              </h1>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Proven results and the strategic framework behind them. See how we've helped ambitious brands achieve measurable growth.
              </p>
            </div>
          </div>
        </section>

        {/* How We Deliver Section */}
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900" data-testid="how-we-deliver-title">
                How We Deliver
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Choose your entry point or build a plan across channels.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <Search className="h-8 w-8 text-blue-600" />
                  <h3 className="ml-3 text-lg font-semibold text-gray-900">Growth Clarity Audit</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Uncover hidden leaks and wasted spend so every dollar is working harder. Leave with a clear roadmap that connects strategy to ROI.
                </p>
                <Link 
                  to="/growth-clarity-audit" 
                  className="text-blue-600 font-medium hover:text-blue-700 inline-flex items-center"
                  data-testid="link-audit"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <Target className="h-8 w-8 text-green-600" />
                  <h3 className="ml-3 text-lg font-semibold text-gray-900">Google Ads Management</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Campaigns structured for measurable revenue—not just clicks. Custom strategies that serve profitable without burning budget on vanity metrics.
                </p>
                <Link 
                  to="/services#google-ads" 
                  className="text-green-600 font-medium hover:text-green-700 inline-flex items-center"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                  <h3 className="ml-3 text-lg font-semibold text-gray-900">Paid Social Media Growth</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Meta, Instagram, and beyond. Full-funnel campaigns that build awareness, trust, and conversions—no cookie-cutter approaches.
                </p>
                <Link 
                  to="/services#paid-social" 
                  className="text-purple-600 font-medium hover:text-purple-700 inline-flex items-center"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <Crown className="h-8 w-8 text-yellow-600" />
                  <h3 className="ml-3 text-lg font-semibold text-gray-900">Fractional CMO</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Hands-on leadership to unify strategy, creative, and paid media execution—unlocking value across your marketing stack.
                </p>
                <Link 
                  to="/services#fractional-cmo" 
                  className="text-yellow-600 font-medium hover:text-yellow-700 inline-flex items-center"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <Heart className="h-8 w-8 text-red-600" />
                  <h3 className="ml-3 text-lg font-semibold text-gray-900">Non-Profit Google Grant</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Unlock up to $10k/month in free ad spend for conversions, not just impressions. Grant best-practices to maximize impact.
                </p>
                <Link 
                  to="/services#nonprofit-grant" 
                  className="text-red-600 font-medium hover:text-red-700 inline-flex items-center"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <BarChart3 className="h-8 w-8 text-indigo-600" />
                  <h3 className="ml-3 text-lg font-semibold text-gray-900">CRO & Funnel Optimization</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Iterative testing across landing pages, offers, and funnels. Scale bookings and revenue without scaling acquisition costs.
                </p>
                <Link 
                  to="/services#cro" 
                  className="text-indigo-600 font-medium hover:text-indigo-700 inline-flex items-center"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Proof & Case Studies Section */}
        <section className="py-16 bg-rose-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900" data-testid="proof-case-studies-title">
                Proof & Case Studies
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Selected outcomes from recent work.
              </p>
              <div className="mt-4">
                <Link 
                  to="/case-studies" 
                  className="text-blue-600 font-medium hover:text-blue-700 inline-flex items-center"
                >
                  View All Case Studies <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Lanark Agency Case Study */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900" data-testid="case-lanark">
                      Lanark Agency — Performance Marketing
                    </h3>
                    <div className="mt-2 flex items-center">
                      <Badge variant="secondary" className="mr-2">Performance Marketing</Badge>
                    </div>
                  </div>
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                
                <div className="space-y-4 text-gray-600">
                  <p><span className="font-semibold text-gray-900">Goal:</span> Lanark wanted to scale paid programs profitably.</p>
                  <p><span className="font-semibold text-gray-900">Strategy:</span> Built lean budget gaps & refined across multipoint campaigns, and clarified campaigns, and clarified strategy while scaling.</p>
                  <p><span className="font-semibold text-gray-900">Impact:</span> $76,000/month budget managed across verticals, consistent CPL growth.</p>
                </div>
                
                <div className="mt-6">
                  <Link 
                    to="/case-study/lanark-agency" 
                    className="text-blue-600 font-medium hover:text-blue-700 inline-flex items-center"
                  >
                    Read full case study <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Hapi Art Case Study */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900" data-testid="case-hapi">
                      Hapi Art — E-commerce
                    </h3>
                    <div className="mt-2 flex items-center">
                      <Badge variant="secondary" className="mr-2">E-commerce</Badge>
                    </div>
                  </div>
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                
                <div className="space-y-4 text-gray-600">
                  <p><span className="font-semibold text-gray-900">Goal:</span> Hapi Art needed a complete advertising system.</p>
                  <p><span className="font-semibold text-gray-900">Strategy:</span> Built their campaigns across structure and internal testing approaches. Our work includes attribution optimization.</p>
                  <p><span className="font-semibold text-gray-900">Impact:</span> Set for ROAS System Run.</p>
                </div>
                
                <div className="mt-6">
                  <Link 
                    to="/case-study/hapi-art" 
                    className="text-green-600 font-medium hover:text-green-700 inline-flex items-center"
                  >
                    Read full case study <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Mandel Retreats Case Study */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900" data-testid="case-mandel">
                      Mandel Retreats — Luxury Wellness
                    </h3>
                    <div className="mt-2 flex items-center">
                      <Badge variant="secondary" className="mr-2">Luxury Wellness</Badge>
                    </div>
                  </div>
                  <Heart className="h-8 w-8 text-purple-600" />
                </div>
                
                <div className="space-y-4 text-gray-600">
                  <p><span className="font-semibold text-gray-900">Goal:</span> Mandel Retreats needed new client bookings.</p>
                  <p><span className="font-semibold text-gray-900">Strategy:</span> Built lean search campaigns with story-aligned ads resulting in our team with conversion campaigns and retargeting lists.</p>
                  <p><span className="font-semibold text-gray-900">Result:</span> 5+ ROAS while hitting reduced bookings substantially.</p>
                </div>
                
                <div className="mt-6">
                  <Link 
                    to="/case-study/mandel-retreats" 
                    className="text-purple-600 font-medium hover:text-purple-700 inline-flex items-center"
                  >
                    Read full case study <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* CoreGo Case Study */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900" data-testid="case-corego">
                      CoreGo — Fitness Studio
                    </h3>
                    <div className="mt-2 flex items-center">
                      <Badge variant="secondary" className="mr-2">Fitness</Badge>
                    </div>
                  </div>
                  <Target className="h-8 w-8 text-red-600" />
                </div>
                
                <div className="space-y-4 text-gray-600">
                  <p><span className="font-semibold text-gray-900">Goal:</span> CoreGo wanted to maximize ROI and wage member acquisition.</p>
                  <p><span className="font-semibold text-gray-900">Strategy:</span> Our work focused local targeting strategy and search tracking for clear ROI channel.</p>
                  <p><span className="font-semibold text-gray-900">Result:</span> 5× increased, 19% new members.</p>
                </div>
                
                <div className="mt-6">
                  <Link 
                    to="/case-study/corego-fitness" 
                    className="text-red-600 font-medium hover:text-red-700 inline-flex items-center"
                  >
                    Read full case study <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted by Leading Brands Section */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900" data-testid="trusted-brands-title">
                Trusted by Leading Brands Across Industries
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-4xl mx-auto">
                From fitness and wellness to SaaS and e-commerce, we've helped ambitious brands achieve multi-million dollar growth through strategic paid media and growth marketing across Meta, Instagram, YouTube, Google Ads, and other major platforms.
              </p>
            </div>
            
            {/* Brand Logos Grid */}
            <div className="space-y-8">
              {/* First row */}
              <div className="flex flex-wrap items-center justify-center gap-8">
                <LogoImage src={mandaliLogo} alt="Mandali" />
                <LogoImage src={popcornIndianaLogo} alt="Popcorn Indiana" />
                <LogoImage src={bolayLogo} alt="Bolay" />
                <LogoImage src={cuteraLogo} alt="Cutera" />
                <LogoImage src={motivatingMassesLogo} alt="Motivating The Masses" />
              </div>
              
              {/* Second row */}
              <div className="flex flex-wrap items-center justify-center gap-8">
                <LogoImage src={columbusLogo} alt="Columbus" />
                <LogoImage src={magayaLogo} alt="Magaya" />
                <LogoImage src={columbusLogo} alt="Columbus Capital" />
                <LogoImage src={mixTelematicsLogo} alt="Mix Telematics" />
                <LogoImage src={eftUniverseLogo} alt="EFT Universe" />
              </div>
              
              {/* Third row */}
              <div className="flex flex-wrap items-center justify-center gap-8">
                <LogoImage src={amaWaterwaysLogo} alt="AMA Waterways" />
                <LogoImage src={ascendLogo} alt="Ascend" />
                <LogoImage src={microsoftLogo} alt="Microsoft" />
                <LogoImage src={denaGamesLogo} alt="Dena Games" />
                <LogoImage src={core40Logo} alt="Core40" />
              </div>
              
              {/* Fourth row */}
              <div className="flex flex-wrap items-center justify-center gap-8">
                <LogoImage src={estrellaGymnasticsLogo} alt="Estrella Gymnastics" />
                <LogoImage src={capitalGymnasticsLogo} alt="Capital Gymnastics" />
                <LogoImage src={tigarGymnasticsLogo} alt="Tigar Gymnastics" />
                <LogoImage src={houstonGymnasticsLogo} alt="Houston Gymnastics" />
              </div>
              
              {/* Fifth row */}
              <div className="flex flex-wrap items-center justify-center gap-8">
                <LogoImage src={sgtMenuLogo} alt="SGT Menu" />
                <LogoImage src={noTypicalMomentsLogo} alt="No Typical Moments" />
                <LogoImage src={marketerHireLogo} alt="MarketerHire" />
                <LogoImage src={rowlandBallardLogo} alt="Rowland Ballard" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-green-50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to see similar results for your brand?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Let's discuss your growth goals and map out a strategy that delivers measurable ROI.
            </p>
            <div className="space-x-4">
              <Link 
                to="/#book-intro" 
                className="inline-flex items-center justify-center rounded-2xl px-8 py-4 text-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
                data-testid="cta-book-call"
              >
                Book a 10‑min Intro Call
              </Link>
              <Link 
                to="/growth-clarity-audit" 
                className="inline-flex items-center justify-center rounded-2xl px-8 py-4 text-lg font-semibold border border-green-300 text-green-700 hover:bg-green-50 transition-colors duration-200"
                data-testid="cta-audit"
              >
                Start with an Audit
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}