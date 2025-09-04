import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, TrendingUp, DollarSign, Target } from "lucide-react";

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

const caseStudies = [
  {
    id: "steelfit-usa",
    clientName: "SteelFit USA",
    clientLogo: "/images/client-logos/steelfit.png",
    metricValue: "20.85x",
    metricLabel: "ROAS",
    tags: ["20.85x ROAS", "$2M+ Revenue", "Exceptional Growth"],
    summary: "Achieved exceptional growth for fitness supplement brand through comprehensive paid media strategy and creative optimization.",
    channels: "Google Ads, Facebook, Instagram",
    period: "8 months",
    services: "Paid Media Strategy, Creative Development, Account Management",
    outcomes: [
      "ROAS: 20.85x peak performance",
      "Revenue: $2M+ generated",
      "Growth: Exceptional scaling",
      "Brand: Market positioning"
    ],
    problem: "SteelFit USA needed to scale their supplement business while maintaining profitability in competitive fitness market.",
    strategy: "Developed comprehensive paid media strategy with focus on creative testing and audience optimization.",
    result: "Achieved record-breaking 20.85x ROAS while generating over $2M in revenue growth.",
    category: "Fitness Supplements",
    featured: true
  },
  {
    id: "motivating-masses",
    clientName: "Motivating the Masses",
    clientLogo: "/images/client-logos/mtm.png",
    metricValue: "$2M+",
    metricLabel: "Revenue",
    tags: ["$2M Revenue", "11K Members", "365 Days/Year"],
    summary: "Generated $2M+ revenue and 11,000+ new members for Lisa Nichols' motivational speaking and coaching business.",
    channels: "Facebook, Instagram, YouTube, Email",
    period: "12 months",
    services: "Digital Marketing Strategy, Lead Generation, Sales Funnel Optimization",
    outcomes: [
      "Revenue: $2M+ generated",
      "Members: 11K+ new signups",
      "Reach: Global audience",
      "Impact: Transformational results"
    ],
    problem: "Lisa Nichols needed to scale her motivational speaking business and reach more people with her transformational message.",
    strategy: "Built comprehensive digital marketing system with focus on authentic storytelling and community building.",
    result: "Successfully scaled to $2M+ revenue while helping 11,000+ people transform their lives.",
    category: "Personal Development",
    featured: true
  },
  {
    id: "mandali-retreats",
    clientName: "Mandali Retreats",
    clientLogo: "/images/client-logos/mandali.png",
    metricValue: "5x",
    metricLabel: "ROAS",
    tags: ["5x ROAS", "Luxury Wellness", "Premium Positioning"],
    summary: "Crafted success for luxury wellness retreat business achieving 5x ROAS through strategic positioning and targeted marketing.",
    channels: "Google Ads, Facebook, Instagram",
    period: "6 months",
    services: "Luxury Brand Positioning, Paid Media, Creative Strategy",
    outcomes: [
      "ROAS: 5x return achieved",
      "Bookings: Premium clientele",
      "Brand: Luxury positioning",
      "Growth: Sustainable scaling"
    ],
    problem: "Mandali Retreats needed to attract high-value clients for their luxury wellness experiences while maintaining exclusivity.",
    strategy: "Developed premium brand positioning with targeted campaigns focusing on affluent wellness seekers.",
    result: "Achieved 5x ROAS while successfully positioning brand in luxury wellness market segment.",
    category: "Luxury Wellness",
    featured: true
  },
  {
    id: "core40",
    clientName: "Core40",
    clientLogo: "/images/client-logos/core40.png",
    metricValue: "+300%",
    metricLabel: "Growth",
    tags: ["+300% Growth", "Fitness Studio", "Member Acquisition"],
    summary: "Delivered 300% growth for boutique fitness studio through targeted local marketing and member acquisition strategies.",
    channels: "Google Ads, Facebook, Instagram",
    period: "10 months",
    services: "Local Marketing, Lead Generation, Conversion Optimization",
    outcomes: [
      "Growth: +300% increase",
      "Members: Significant growth",
      "Revenue: Major increase",
      "Community: Strong local presence"
    ],
    problem: "Core40 needed to grow their boutique fitness studio membership in competitive local market.",
    strategy: "Implemented targeted local marketing with focus on community building and member retention.",
    result: "Achieved 300% growth while building strong community presence and member loyalty.",
    category: "Boutique Fitness",
    featured: true
  },
  {
    id: "ascend-gyms",
    clientName: "Ascend Gyms",
    clientLogo: "/images/client-logos/ascend.png",
    metricValue: "-72%",
    metricLabel: "CPL",
    tags: ["-72% CPL", "Multi-Location", "Franchise Growth"],
    summary: "Reduced cost per lead by 72% while scaling multi-location gym franchise through systematic marketing approach.",
    channels: "Google Ads, Facebook, Local Marketing",
    period: "8 months",
    services: "Franchise Marketing, Lead Generation, Multi-Location Strategy",
    outcomes: [
      "CPL: -72% reduction",
      "Locations: Multi-site growth",
      "Efficiency: Improved systems",
      "Scale: Franchise expansion"
    ],
    problem: "Ascend Gyms needed efficient lead generation system that could scale across multiple franchise locations.",
    strategy: "Developed systematic approach with location-specific campaigns and centralized optimization.",
    result: "Achieved 72% CPL reduction while successfully scaling across multiple gym locations.",
    category: "Fitness Franchise",
    featured: true
  },
  {
    id: "hapi-art",
    clientName: "Hapi Art",
    clientLogo: "/images/client-logos/hapi.png",
    metricValue: "10x",
    metricLabel: "ROAS",
    tags: ["10x ROAS", "E-commerce", "Creative Business"],
    summary: "Built profitable 10x ROAS advertising system for creative e-commerce business specializing in art and design products.",
    channels: "Google Shopping, Display, YouTube",
    period: "6 months",
    services: "E-commerce Strategy, Product Feed Optimization, Creative Development",
    outcomes: [
      "ROAS: 10x return achieved",
      "Sales: Significant growth",
      "Products: Optimized catalog",
      "Brand: Creative positioning"
    ],
    problem: "Hapi Art needed profitable advertising system for their creative e-commerce business in competitive art market.",
    strategy: "Built comprehensive e-commerce strategy with focus on product feed optimization and creative showcasing.",
    result: "Successfully built 10x ROAS advertising system while growing creative business profitably.",
    category: "Creative E-commerce",
    featured: true
  },
];

// Add state for expanded cards  
function CaseStudyCard({ study, index }: { study: any; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <article 
      className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 hover:border-primary/20"
      data-testid={`case-study-card-${index}`}
    >
      {/* Top Row: Logo + Metric Pill */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          {/* Client Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
              <img 
                src={study.clientLogo} 
                alt={`${study.clientName} logo`}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const nextElement = (e.target as HTMLElement).nextElementSibling as HTMLElement;
                  if (nextElement) nextElement.style.display = 'flex';
                }}
              />
              <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center text-primary font-bold text-sm" style={{display: 'none'}}>
                {study.clientName.charAt(0)}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{study.clientName}</h3>
              <p className="text-xs text-muted-foreground">{study.category}</p>
            </div>
          </div>
          
          {/* Large Metric Pill */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-right">
            <div className="text-2xl font-bold leading-none">{study.metricValue}</div>
            <div className="text-xs opacity-90">{study.metricLabel}</div>
          </div>
        </div>
        
        {/* Outcome Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {study.tags.map((tag: string, tagIndex: number) => (
            <span 
              key={tagIndex}
              className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* One-sentence summary */}
        <p className="text-foreground font-medium leading-relaxed mb-4">
          {study.summary}
        </p>
        
        {/* Meta line */}
        <div className="text-xs text-muted-foreground mb-4 space-y-1">
          <div>• Channels: {study.channels}</div>
          <div>• Period: {study.period}</div>
          <div>• Services: {study.services}</div>
        </div>
        
        {/* Outcome bullets */}
        <div className="space-y-2 mb-6">
          {study.outcomes.map((outcome: string, outcomeIndex: number) => (
            <div key={outcomeIndex} className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span className="text-foreground font-medium">{outcome}</span>
            </div>
          ))}
        </div>
        
        {/* Expandable Problem → Strategy → Result */}
        {isExpanded && (
          <div className="bg-muted/50 -mx-6 px-6 py-4 mb-4 space-y-3">
            <div>
              <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">Problem</span>
              <p className="text-sm text-muted-foreground mt-1">{study.problem}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Strategy</span>
              <p className="text-sm text-muted-foreground mt-1">{study.strategy}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">Result</span>
              <p className="text-sm text-muted-foreground mt-1">{study.result}</p>
            </div>
          </div>
        )}
        
        {/* Bottom row: CTAs */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {isExpanded ? 'Show less' : 'Show details'}
          </button>
          
          <div className="flex items-center gap-3">
            <Link 
              to={`/case-study/${study.id}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid={`case-study-link-${index}`}
            >
              Read case study
            </Link>
            <Link 
              to="/growth-clarity-audit?utm_source=case_studies&utm_campaign=get_results&utm_content=${study.id}"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
              data-testid={`case-study-cta-${index}`}
            >
              Get results like this
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <ProgressBar />
      {/* Header Section */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="case-studies-title">
              Real Brands. Real Results. Proven Growth.
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="case-studies-subtitle">
              Here's how I've helped teams across industries scale with clarity and ROI.
            </p>
          </div>

          {/* Featured Case Studies Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {caseStudies.map((study, index) => (
              <CaseStudyCard key={study.id} study={study} index={index} />
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-20 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">$3M+</div>
                <div className="text-sm text-muted-foreground">Ad Spend Managed</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">20.85x</div>
                <div className="text-sm text-muted-foreground">Peak ROAS Achieved</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">-72%</div>
                <div className="text-sm text-muted-foreground">CPL Reduction</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">+216%</div>
                <div className="text-sm text-muted-foreground">Revenue Growth</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}