import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Quote } from "lucide-react";
import HowWeDeliverSection from "@/components/HowWeDeliverSection";
import { CaseStudyCarousel, LogoTicker } from "@/components/CaseStudiesCRO";
import { KPIChipsLinks } from "@/components/KPIChipsLinks";
import amaWaterwaysLogo from "@assets/ama-waterways-seeklogo_1758461361953.png";
import popcornIndianaLogo from "@assets/Popcorn-Indiana-logo-Hartley-Berg_1758463163430.png";
import ascendLogo from "@assets/ascend-logojpg-x-small_1759067902299.jpeg";
import microsoftLogo from "@assets/Microsoft-Design_1758463290202.png";
import denaGamesLogo from "@assets/Dena-Games-Logo_1758463419409.png";
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
import lisaNicholsImage from "@assets/Lisa Nichols Resized_1761604917835.png";
import hapiArtImage from "@assets/Hapi Art Resized_1761591215292.png";
import steelFitImage from "@assets/Steel Fit USA New 1600 by 1000_1761591662248.png";
import core40Image from "@assets/Core40 Image 1600 by 1000_1761591215292.jpg";
import mandaliImage from "@assets/Mandali 1600 by 1000_1761604910726.jpg";
import lamarkImage from "@assets/Lamark Media 1600 by 1000_1761591605719.png";
import powersGymnasticsImage from "@assets/Rowland-Ballard-Case-Study-Image_1763648189223.png";

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
  const caseStudyItems = [
    {
      slug: "/case-study/hapi-art",
      title: "Hapi Art — E-commerce",
      impact: "10× ROAS with creative testing sprints & precise attribution",
      image: hapiArtImage,
      imageAlt: "Hapi Art - Fine art by Kristi Kohut e-commerce Shopify store",
      problem: "High-visual brand needed profitable scale and clear attribution.",
      solution: "Built creative testing cadence, prospecting/retargeting structure, and SKU/category reporting.",
    },
    {
      slug: "/case-study/lamark-agency",
      title: "Growth Across Industries",
      impact: "Consistent CPL at scale across multi-account portfolios",
      image: lamarkImage,
      imageAlt: "Lamark Media - Multi-industry portfolio showcase",
      problem: "Portfolio complexity across industries and accounts reduced clarity.",
      solution: "Unified frameworks, reporting, and optimization protocols enabling scalable management.",
    },
    {
      slug: "/case-study/mandali-retreats",
      title: "Mandali Retreats — Luxury Wellness",
      impact: "+16.5× ROAS social, +29.06× ROAS search while filling retreat bookings consistently",
      image: mandaliImage,
      imageAlt: "Mandali luxury wellness retreat in Italy",
      problem: "Luxury wellness market needed sophisticated targeting and offline conversion tracking.",
      solution: "Implemented tiered remarketing, offline conversion tracking, and geographic optimization.",
    },
    {
      slug: "/case-study/powers-gymnastics",
      title: "Powers Gymnastics — Multi-location Growth",
      impact: "2–3× more leads, 50% cheaper Google CPL, record trials & enrollments",
      image: powersGymnasticsImage,
      imageAlt: "Powers Gymnastics multi-location growth",
      problem: "Fragmented accounts, seasonal focus, inconsistent CPL, lack of visibility from click → trial → enrollment.",
      solution: "Rebuilt Google Search & PMAX, Meta lead-gen campaigns, multi-format creative system, funnel reporting across locations.",
    },
    {
      slug: "/case-study/core-40",
      title: "Core40 — Fitness Studio",
      impact: "$2M+ revenue, 11K new members acquired",
      image: core40Image,
      imageAlt: "Core40 fitness studio training",
      problem: "Boutique studio needed to differentiate and scale member acquisition profitably.",
      solution: "Premium brand positioning, targeted digital marketing, and community-building initiatives.",
    },
    {
      slug: "/case-study/steel-fit-usa",
      title: "Steel Fit USA — Paid Media",
      impact: "Exceptional growth with optimized customer acquisition",
      image: steelFitImage,
      imageAlt: "Steel Fit USA strategic approach and results",
      problem: "Intense competition in saturated fitness equipment market required cost-effective acquisition.",
      solution: "Advanced audience segmentation, creative testing protocols, and strategic remarketing funnels.",
    },
    {
      slug: "/case-study/lisa-nichols",
      title: "Lisa Nichols — Personal Brand Growth",
      impact: "Best-selling author with global platform reaching millions",
      image: lisaNicholsImage,
      imageAlt: "Lisa Nichols - Motivating the Masses",
      problem: "Scaling personal brand beyond traditional speaking required digital transformation.",
      solution: "Comprehensive digital presence, multi-channel content distribution, and authentic audience engagement.",
    },
  ];

  const logoItems = [
    { src: mandaliLogo, alt: "Mandali" },
    { src: popcornIndianaLogo, alt: "Popcorn Indiana" },
    { src: bolayLogo, alt: "Bolay" },
    { src: cuteraLogo, alt: "Cutera" },
    { src: motivatingMassesLogo, alt: "Motivating The Masses" },
    { src: columbusLogo, alt: "Columbus" },
    { src: magayaLogo, alt: "Magaya" },
    { src: mixTelematicsLogo, alt: "Mix Telematics" },
    { src: eftUniverseLogo, alt: "EFT Universe" },
    { src: amaWaterwaysLogo, alt: "AMA Waterways" },
    { src: ascendLogo, alt: "Ascend" },
    { src: microsoftLogo, alt: "Microsoft" },
    { src: denaGamesLogo, alt: "Dena Games" },
    { src: core40Logo, alt: "Core40" },
  ];

  const kpiLinkItems = [
    { metric: "10× ROAS", context: "Overall campaign", client: "Hapi Art", href: "/case-study/hapi-art", type: "Metric" as const },
    { metric: "16× ROAS", context: "Prospecting · Meta", client: "Hapi Art", href: "/case-study/hapi-art", type: "Metric" as const },
    { metric: "6.9× ROAS", context: "Retargeting · Meta", client: "Hapi Art", href: "/case-study/hapi-art", type: "Metric" as const },
    { metric: "5–6% CTR", context: "Top creatives · Meta", client: "Hapi Art", href: "/case-study/hapi-art", type: "Metric" as const },
    { metric: "$70K+ monthly ad spend", context: "Portfolio mgmt", client: "Lamark Agency", href: "/case-study/lamark-agency", type: "Outcome" as const },
    { metric: "Consistent CPL at scale", context: "Multi-industry", client: "Lamark Agency", href: "/case-study/lamark-agency", type: "Outcome" as const },
    { metric: "+16.5× ROAS", context: "Social · Retreat bookings", client: "Mandali Retreats", href: "/case-study/mandali-retreats", type: "Metric" as const },
    { metric: "+29.06× ROAS", context: "Search · Retreat bookings", client: "Mandali Retreats", href: "/case-study/mandali-retreats", type: "Metric" as const },
    { metric: "2–3× leads", context: "Monthly growth", client: "Powers Gymnastics", href: "/case-study/powers-gymnastics", type: "Metric" as const },
    { metric: "~50% cheaper CPL", context: "Google Ads", client: "Powers Gymnastics", href: "/case-study/powers-gymnastics", type: "Metric" as const },
    { metric: "2.6× trials", context: "Attendance lift", client: "Powers Gymnastics", href: "/case-study/powers-gymnastics", type: "Metric" as const },
    { metric: "3–4× ROAS", context: "Evergreen Google", client: "Powers Gymnastics", href: "/case-study/powers-gymnastics", type: "Metric" as const },
    { metric: "$2M+ revenue", context: "Member growth", client: "Core40", href: "/case-study/core-40", type: "Metric" as const },
    { metric: "11K+ new members", context: "Acquisition campaign", client: "Core40", href: "/case-study/core-40", type: "Metric" as const },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <ProgressBar />
      <main className="relative">
        
        {/* Hero Section with H1 */}
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

            {/* Case Study Carousel */}
            <CaseStudyCarousel items={caseStudyItems} title="Featured Case Studies" />

            {/* Logo Ticker */}
            <LogoTicker logos={logoItems} />
          </div>
        </section>

        {/* How We Deliver Section (Untouched) */}
        <section className="bg-white">
          <HowWeDeliverSection />
        </section>

        {/* KPI Chips Links - Clickable Results */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <KPIChipsLinks items={kpiLinkItems} />
          </div>
        </section>

        {/* Colleague Reviews Section (Untouched) */}
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

        {/* CTA Section (Untouched) */}
        <section className="py-16 bg-green-50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to see similar results for your brand?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Let's discuss your growth goals and map out a strategy that delivers measurable ROI.
            </p>
            <div className="flex justify-center">
              <Link 
                to="/#book-intro" 
                className="inline-flex items-center justify-center rounded-2xl px-8 py-4 text-lg font-semibold text-white bg-primary hover:bg-primary/90 shadow-lg ring-2 ring-primary/20 hover:-translate-y-0.5 transition-all duration-200"
                data-testid="cta-book-strategic-call"
              >
                Book Strategic Intro Call
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
