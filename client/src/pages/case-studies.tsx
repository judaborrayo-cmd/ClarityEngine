import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Quote, Target, Users, Heart } from "lucide-react";
import HowWeDeliverSection from "@/components/HowWeDeliverSection";
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
import bolayLogo from "@assets/Bolay_Official_Logo_Vertical_RGB_1756749176444.png";
import core40Logo from "@assets/Core40_Logo_1756749176445.png";
import cuteraLogo from "@assets/Cutera-Laser-Genesis-Subpage_1756749176443.png";
import eftUniverseLogo from "@assets/EFTUniverse-logo_320x132 (1)_1756749176445.png";
import magayaLogo from "@assets/LOGO_MAGAYA_MEDIUM-GREY_1756749176446.png";
import mandaliLogo from "@assets/mandali_logo-actual_1756749176444.png";
import mixTelematicsLogo from "@assets/mix-telematics-logo-actual_1756749176445.png";
import motivatingMassesLogo from "@assets/Motivating_The_Masses_Logo_Transparent_1756749176445.png";
import columbusLogo from "@assets/2LOGO-NEW-COLUMBUS-01-(1)_1756749176442.png";
import mariSmithPhoto from "@assets/Mari_1758572440824.jpg";
import lindseyBassPhoto from "@assets/Lindsey_Bast_1758572440824.jpg";
import alyssaArmandRoyPhoto from "@assets/Alyssa_1758572440823.jpg";
import danielaGutenkovski from "@assets/Daniela_1758572440824.jpg";
import mikeBerkmanPhoto from "@assets/Mike_Berkman_1758572440825.jpg";
import billBowmanPhoto from "@assets/Bill_Bowman_1758572440823.jpg";

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
  <div className={`logo-item relative isolate shrink-0 [flex-basis:7.5rem] transition-[flex-basis,margin] duration-300 ease-out hover:[flex-basis:9rem] hover:z-10 ${className}`}>
    <img 
      src={src} 
      alt={alt} 
      className="h-8 w-auto object-contain transition-all duration-300 ease-out hover:scale-110 hover:drop-shadow-lg"
      data-testid={`logo-${alt.toLowerCase().replace(/\s+/g, '-')}`}
    />
  </div>
);

const colleagueReviews = [
  {
    id: 1,
    name: "Mari Smith",
    title: "Co-Founder & Marketing Director",
    avatar: mariSmithPhoto,
    review: "It's always enjoyable writing a recommendation for someone as enjoyable as Juda. I've worked with Juda in a professional capacity for over a year now at Sociality Squared. We've worked on his various clients together and he's worn many different hats.",
    bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
    textColor: "text-white",
    type: "Colleague review"
  },
  {
    id: 2,
    name: "Lindsey Bast",
    title: "Digital Strategist & Growth Marketer",
    avatar: lindseyBassPhoto,
    review: "I highly recommend Juda as a skilled and professional growth marketer. I've worked with him on multiple digital marketing strategies and media buying projects. Juda gives it his all for his clients.",
    bgColor: "bg-gradient-to-br from-purple-400 to-purple-500",
    textColor: "text-white",
    type: "Colleague review"
  },
  {
    id: 3,
    name: "Alyssa Brooke-Gay",
    title: "Senior Project Manager",
    avatar: alyssaArmandRoyPhoto,
    review: "Juda is a phenomenal colleague and complete rockstar for his clients! I've had the pleasure of working with Juda for over a year, and we've collaborated on several large-scale digital marketing projects throughout that time.",
    bgColor: "bg-gradient-to-br from-green-500 to-green-600",
    textColor: "text-white",
    type: "Colleague review"
  },
  {
    id: 4,
    name: "Daniela Goldzmindt",
    title: "Marketing Manager",
    avatar: danielaGutenkovski,
    review: "Juda is simply one of the best persons I have had the opportunity to work with. Not only he is proficient in Marketing, specially in the paid media field, but also, he has a very strong work ethic and solid soft skills. Juda is a team player.",
    bgColor: "bg-gradient-to-br from-pink-500 to-pink-600",
    textColor: "text-white",
    type: "Colleague review"
  },
  {
    id: 5,
    name: "Mike Berkman",
    title: "VP of Performance",
    avatar: mikeBerkmanPhoto,
    review: "I had the pleasure of working with Juda during his tenure at Lamark. During his interview, I knew he would bring a different level of thinking and analysis to the team that we were needing. He did not disappoint.",
    bgColor: "bg-gradient-to-br from-pink-400 to-pink-500",
    textColor: "text-white",
    type: "Colleague review"
  },
  {
    id: 6,
    name: "Bill Bowman",
    title: "Vice President of Marketing",
    avatar: billBowmanPhoto,
    review: "Juda is an exceptional marketing talent. He is able to manage complex advertising campaigns in a calm and focused way. While working with him, he continually suggested new and interesting ways to accomplish our team goals.",
    bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
    textColor: "text-white",
    type: "Colleague review"
  }
];

export default function CaseStudies() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <ProgressBar />
      <main className="relative">
        
        {/* Hero Section with Trusted Brands */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl" data-testid="page-title">
                Case Studies
              </h1>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Proven results and the strategic framework behind them. See how we've helped ambitious brands achieve measurable growth.
              </p>
            </div>
            
            {/* Brand Logos Grid */}
            <div className="space-y-8 mt-12">
              {/* First row */}
              <div className="logo-row group flex flex-wrap items-center justify-center gap-8 transition-[gap] duration-300 overflow-visible">
                <LogoImage src={mandaliLogo} alt="Mandali" />
                <LogoImage src={popcornIndianaLogo} alt="Popcorn Indiana" />
                <LogoImage src={bolayLogo} alt="Bolay" />
                <LogoImage src={cuteraLogo} alt="Cutera" />
                <LogoImage src={motivatingMassesLogo} alt="Motivating The Masses" />
              </div>
              
              {/* Second row */}
              <div className="logo-row group flex flex-wrap items-center justify-center gap-8 transition-[gap] duration-300 overflow-visible">
                <LogoImage src={columbusLogo} alt="Columbus" />
                <LogoImage src={magayaLogo} alt="Magaya" />
                <LogoImage src={columbusLogo} alt="Columbus Capital" />
                <LogoImage src={mixTelematicsLogo} alt="Mix Telematics" />
                <LogoImage src={eftUniverseLogo} alt="EFT Universe" />
              </div>
              
              {/* Third row */}
              <div className="logo-row group flex flex-wrap items-center justify-center gap-8 transition-[gap] duration-300 overflow-visible">
                <LogoImage src={amaWaterwaysLogo} alt="AMA Waterways" />
                <LogoImage src={ascendLogo} alt="Ascend" />
                <LogoImage src={microsoftLogo} alt="Microsoft" />
                <LogoImage src={denaGamesLogo} alt="Dena Games" />
                <LogoImage src={core40Logo} alt="Core40" />
              </div>
              
              {/* Fourth row */}
              <div className="logo-row group flex flex-wrap items-center justify-center gap-8 transition-[gap] duration-300 overflow-visible">
                <LogoImage src={estrellaGymnasticsLogo} alt="Estrella Gymnastics" />
                <LogoImage src={capitalGymnasticsLogo} alt="Capital Gymnastics" />
                <LogoImage src={tigarGymnasticsLogo} alt="Tigar Gymnastics" />
                <LogoImage src={houstonGymnasticsLogo} alt="Houston Gymnastics" />
              </div>
              
              {/* Fifth row */}
              <div className="logo-row group flex flex-wrap items-center justify-center gap-8 transition-[gap] duration-300 overflow-visible">
                <LogoImage src={sgtMenuLogo} alt="SGT Menu" />
                <LogoImage src={noTypicalMomentsLogo} alt="No Typical Moments" />
                <LogoImage src={marketerHireLogo} alt="MarketerHire" />
                <LogoImage src={rowlandBallardLogo} alt="Rowland Ballard" />
              </div>
            </div>
          </div>
        </section>

        {/* How We Deliver Section */}
        <section className="bg-white">
          <HowWeDeliverSection />
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
                      Lamark Agency — Performance Marketing
                    </h3>
                    <div className="mt-2 flex items-center">
                      <Badge variant="secondary" className="mr-2">Performance Marketing</Badge>
                    </div>
                  </div>
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                
                <div className="space-y-4 text-gray-600">
                  <p><span className="font-semibold text-gray-900">Intent:</span> Lamark wanted to scale paid programs profitably.</p>
                  <p><span className="font-semibold text-gray-900">Obstacle:</span> But their budget was scattered across inefficient campaigns.</p>
                  <p><span className="font-semibold text-gray-900">Resolution:</span> We restructured, built unified campaigns, and reduced costs while scaling.</p>
                  <p><span className="font-semibold text-gray-900">Impact:</span> $70,000/month budget managed across verticals, consistent CPL growth</p>
                </div>
                
                <div className="mt-6">
                  <Link 
                    to="/case-study/lamark-agency" 
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
                      Hapi Art — E‑commerce
                    </h3>
                    <div className="mt-2 flex items-center">
                      <Badge variant="secondary" className="mr-2">E-commerce</Badge>
                    </div>
                  </div>
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                
                <div className="space-y-4 text-gray-600">
                  <p><span className="font-semibold text-gray-900">Intent:</span> Hapi Art needed a profitable advertising system.</p>
                  <p><span className="font-semibold text-gray-900">Obstacle:</span> But their campaigns lacked structure and creative testing.</p>
                  <p><span className="font-semibold text-gray-900">Resolution:</span> We built a 10x ROAS system with systematic optimization.</p>
                  <p><span className="font-semibold text-gray-900">Impact:</span> 10× ROAS System Built</p>
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
                      Mandali Retreats — Luxury Wellness
                    </h3>
                    <div className="mt-2 flex items-center">
                      <Badge variant="secondary" className="mr-2">Luxury Wellness</Badge>
                    </div>
                  </div>
                  <Heart className="h-8 w-8 text-purple-600" />
                </div>
                
                <div className="space-y-4 text-gray-600">
                  <p><span className="font-semibold text-gray-900">Intent:</span> Mandali Retreats needed year-round bookings.</p>
                  <p><span className="font-semibold text-gray-900">Obstacle:</span> Their ads were siloed and search traffic wasn't converting.</p>
                  <p><span className="font-semibold text-gray-900">Resolution:</span> We built multi-channel campaigns with retargeting layers.</p>
                  <p><span className="font-semibold text-gray-900">Impact:</span> 15× ROAS while filling retreat bookings consistently</p>
                </div>
                
                <div className="mt-6">
                  <Link 
                    to="/case-study/lisa-nichols" 
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
                      Core40 — Fitness Studio
                    </h3>
                    <div className="mt-2 flex items-center">
                      <Badge variant="secondary" className="mr-2">Fitness</Badge>
                    </div>
                  </div>
                  <Target className="h-8 w-8 text-red-600" />
                </div>
                
                <div className="space-y-4 text-gray-600">
                  <p><span className="font-semibold text-gray-900">Intent:</span> Core40 wanted to maximize ROI and scale member acquisition.</p>
                  <p><span className="font-semibold text-gray-900">Obstacle:</span> But their marketing lacked coordination and tracking was broken.</p>
                  <p><span className="font-semibold text-gray-900">Resolution:</span> We unified their strategy and rebuilt tracking for clear ROI visibility.</p>
                  <p><span className="font-semibold text-gray-900">Impact:</span> $2M+ revenue, 11K new members</p>
                </div>
                
                <div className="mt-6">
                  <Link 
                    to="/case-study/core-40" 
                    className="text-red-600 font-medium hover:text-red-700 inline-flex items-center"
                  >
                    Read full case study <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Colleague Reviews Section */}
        <section id="colleague-reviews-cs" className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900" data-testid="colleague-reviews-title">
                Colleague Reviews
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                What industry professionals say about working with me
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {colleagueReviews.map((review) => (
                <div 
                  key={review.id}
                  className={`${review.bgColor} ${review.textColor} rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-200`}
                  data-testid={`review-${review.id}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-white/20 flex items-center justify-center mr-3">
                        <img 
                          src={review.avatar} 
                          alt={review.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-xs font-medium opacity-75 uppercase tracking-wide">
                          {review.type}
                        </span>
                      </div>
                    </div>
                    <Quote className="h-6 w-6 opacity-75" />
                  </div>
                  
                  <blockquote className="text-sm leading-relaxed mb-4">
                    "{review.review}"
                  </blockquote>
                  
                  <div className="border-t border-white/20 pt-4">
                    <div className="font-semibold text-sm">{review.name}</div>
                    <div className="text-xs opacity-90">{review.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Client Results Section */}
        <section id="client-results-cs" className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Client Results</h2>
              <p className="mt-4 text-lg text-gray-600">
                Real outcomes from our partnerships
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Gym Chain</h3>
                <p className="text-gray-600 mb-2">10+ locations</p>
                <div className="text-2xl font-bold text-green-600">-56% CPL</div>
                <p className="text-sm text-gray-500">in 60 days</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Luxury Travel</h3>
                <p className="text-gray-600 mb-2">Galápagos tours</p>
                <div className="text-2xl font-bold text-blue-600">3x ROAS</div>
                <p className="text-sm text-gray-500">improvement</p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">E-commerce</h3>
                <p className="text-gray-600 mb-2">Fine jewelry</p>
                <div className="text-2xl font-bold text-purple-600">Higher AOV</div>
                <p className="text-sm text-gray-500">& repeat buyers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Ready to join our success stories CTA */}
        <section id="success-cta-cs" className="py-16 bg-green-50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to join our success stories?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Let's discuss how we can deliver similar results for your brand.
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
                to="/case-studies" 
                className="inline-flex items-center justify-center rounded-2xl px-8 py-4 text-lg font-semibold border border-green-300 text-green-700 hover:bg-green-50 transition-colors duration-200"
                data-testid="cta-case-studies"
              >
                View Case Studies
              </Link>
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