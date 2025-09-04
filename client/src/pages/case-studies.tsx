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
    id: "lamark-agency",
    clientName: "Lamark Agency",
    clientLogo: "/images/client-logos/lamark.png",
    metricValue: "20.85x",
    metricLabel: "ROAS",
    tags: ["20.85x ROAS", "+$180K Revenue", "-55% CPL"],
    summary: "Raised high-end skincare ROAS from 11.1 to 20.85 in just 1-2 months, increasing monthly revenue from $76K to over $180K.",
    channels: "Google Ads, Display, Shopping",
    period: "2 months",
    services: "Strategy, Optimization, Creative Testing",
    outcomes: [
      "Revenue: +$103K/month",
      "ROAS: +87% improvement", 
      "CPM: -32% reduction",
      "Conversion Rate: +24%"
    ],
    problem: "Skincare brand struggling with low ROAS and high customer acquisition costs.",
    strategy: "Implemented advanced bidding strategies, audience segmentation, and creative testing framework.",
    result: "Nearly doubled ROAS while significantly increasing monthly revenue within 60 days.",
    category: "E-commerce",
    featured: true
  },
  {
    id: "core-40-fitness",
    clientName: "Core 40 Fitness",
    clientLogo: "/images/client-logos/core40.png",
    metricValue: "+$2M",
    metricLabel: "Revenue",
    tags: ["+$2M Revenue", "11K+ Members", "-55% CPL"],
    summary: "Scaled Pilates business from $100K ad investment to over $2M in revenue across Amsterdam and San Francisco locations.",
    channels: "Facebook, Instagram, Google",
    period: "12 months",
    services: "Full-Funnel Strategy, Creative Direction, Optimization",
    outcomes: [
      "Revenue: +$2M generated",
      "Members: +11,000 acquired",
      "CPL: -55% reduction", 
      "Locations: 2 cities scaled"
    ],
    problem: "Multi-location Pilates business needed scalable acquisition strategy across international markets.",
    strategy: "Built location-specific campaigns with cultural adaptation and unified tracking system.",
    result: "Achieved 20:1 return on ad investment while expanding to new geographic markets.",
    category: "Fitness",
    featured: true
  },
  {
    id: "b2b-software",
    clientName: "B2B Software Client",
    clientLogo: "/images/client-logos/b2b-software.png",
    metricValue: "-72%",
    metricLabel: "CPL",
    tags: ["-72% CPL", "164 Leads", "$220/Lead"],
    summary: "Dropped Cost Per Lead from $966 to $270 in 3 weeks for B2B software through strategic targeting and campaign optimization.",
    channels: "Google Search, Display, Gmail",
    period: "3 weeks",
    services: "Lead Generation, Strategy, Analysis",
    outcomes: [
      "CPL: -72% reduction",
      "Leads: 164 generated",
      "Quality: $220 per lead",
      "Speed: 3-week turnaround"
    ],
    problem: "B2B software company struggling with extremely high cost per lead acquisition.",
    strategy: "Implemented qualitative analysis, refined search strategy, and launched targeted display campaigns.",
    result: "Achieved massive CPL reduction while maintaining lead quality in record time.",
    category: "B2B Software",
    featured: true
  },
  {
    id: "supplements-brand",
    clientName: "Supplements Company",
    clientLogo: "/images/client-logos/supplements.png",
    metricValue: "+216%",
    metricLabel: "Revenue",
    tags: ["+216% Revenue", "2x ROAS", "$62K/Month"],
    summary: "Doubled monthly ROAS and revenue for supplements company through multi-channel testing across Gmail, Display, Shopping, and YouTube.",
    channels: "Gmail, Display, Shopping, YouTube",
    period: "6 months",
    services: "Multi-Channel Strategy, Creative Testing, Optimization",
    outcomes: [
      "Revenue: +216% increase",
      "ROAS: 2x improvement",
      "Monthly: $62K peak",
      "Channels: 4 optimized"
    ],
    problem: "Supplements brand needed to scale beyond single-channel dependence with declining performance.",
    strategy: "Developed comprehensive multi-channel approach with systematic creative testing framework.",
    result: "Achieved sustainable growth across multiple channels while doubling key performance metrics.",
    category: "E-commerce",
    featured: true
  },
  {
    id: "lacrosse-ecommerce",
    clientName: "Lacrosse E-commerce Brand",
    clientLogo: "/images/client-logos/lacrosse.png",
    metricValue: "5.11x",
    metricLabel: "ROAS",
    tags: ["5.11x ROAS", "+215% CVR", "$1K+ Products"],
    summary: "Implemented Display & YouTube strategy resulting in 215% conversion rate increase and ROAS improvement from 1.3 to 5.11.",
    channels: "Display, YouTube",
    period: "4 months",
    services: "Strategy, Creative Development, Conversion Optimization",
    outcomes: [
      "ROAS: +293% improvement",
      "CVR: +215% increase",
      "AOV: $1K+ products",
      "Brand: Premium positioning"
    ],
    problem: "E-commerce lacrosse brand struggling with low conversion rates and poor ROAS performance.",
    strategy: "Developed premium brand positioning with video-first creative strategy targeting high-value products.",
    result: "Transformed performance metrics while successfully repositioning brand in premium market segment.",
    category: "E-commerce",
    featured: true
  },
  {
    id: "medical-equipment",
    clientName: "Medical Equipment Co.",
    clientLogo: "/images/client-logos/medical.png",
    metricValue: "+28%",
    metricLabel: "Conversion Rate",
    tags: ["+28% CVR", "-52% CPC", "164 Leads"],
    summary: "Built multiple B2B accounts selling $80K medical equipment with 28% conversion rate lift and 52% cost reduction.",
    channels: "Google Search, Display",
    period: "6 months",
    services: "B2B Strategy, Account Structure, Lead Generation",
    outcomes: [
      "CVR: +28% improvement",
      "CPC: -52% reduction",
      "Leads: 164 doctors",
      "Value: $80K equipment"
    ],
    problem: "Medical equipment company needed qualified leads for high-value B2B sales in competitive market.",
    strategy: "Developed specialized B2B targeting with medical professional focus and optimized account structure.",
    result: "Significantly improved conversion efficiency while reducing costs for high-value B2B lead generation.",
    category: "Medical",
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