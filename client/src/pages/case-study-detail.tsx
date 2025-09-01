import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ExternalLink, Target, TrendingUp, Users, DollarSign } from "lucide-react";

// This would typically come from an API or CMS
const caseStudyData = {
  "lamark-agency": {
    title: "Growth Across Industries",
    subtitle: "Pay Per Click Lamark Agency",
    category: "PPC Management",
    overview: "Strategic pay-per-click management across multiple industries, delivering scalable growth solutions and comprehensive tracking systems for diverse business sectors.",
    challenge: "Lamark Agency needed a comprehensive PPC strategy that could work across multiple industries while maintaining efficiency and tracking performance across different business models and customer acquisition costs.",
    solution: [
      "Developed multi-industry PPC framework adaptable to different sectors",
      "Implemented comprehensive tracking systems for multi-location businesses",
      "Created scalable campaign structures for efficient management",
      "Established cross-industry performance benchmarks and optimization protocols"
    ],
    results: {
      primary: "Multi-location impact tracking and scalable PPC growth",
      metrics: [
        { label: "Industries Served", value: "Multiple", icon: Target },
        { label: "Tracking System", value: "Multi-location", icon: Users },
        { label: "Campaign Structure", value: "Scalable", icon: TrendingUp },
        { label: "Performance", value: "Optimized", icon: DollarSign }
      ]
    },
    testimonial: {
      quote: "The strategic approach to PPC management across our diverse client base has been exceptional. The multi-location tracking and scalable systems have transformed our service delivery.",
      author: "Lamark Agency Team"
    },
    tags: ["PPC Management", "Multi-Industry", "Tracking Systems", "Scalable Growth"],
    featured: true
  },
  "hapi-art": {
    title: "Building a Profitable 10X ROAS",
    subtitle: "Hapi Art Advertising System",
    category: "ROI Optimization",
    overview: "Comprehensive advertising system design and implementation that achieved an exceptional 10X return on ad spend through strategic optimization and systematic approach to campaign management.",
    challenge: "Hapi Art needed a profitable advertising system that could consistently deliver high returns while maintaining scalability and sustainable growth patterns.",
    solution: [
      "Designed comprehensive advertising system architecture",
      "Implemented strategic optimization protocols",
      "Developed systematic approach to campaign management",
      "Created sustainable growth frameworks for long-term profitability"
    ],
    results: {
      primary: "10X ROAS achieved through systematic optimization",
      metrics: [
        { label: "ROAS Achieved", value: "10X", icon: TrendingUp },
        { label: "System Type", value: "Comprehensive", icon: Target },
        { label: "Optimization", value: "Strategic", icon: DollarSign },
        { label: "Profitability", value: "Sustainable", icon: Users }
      ]
    },
    testimonial: {
      quote: "The advertising system delivered incredible results with 10X ROAS. The strategic optimization and systematic approach transformed our entire marketing performance.",
      author: "Hapi Art Team"
    },
    tags: ["10X ROAS", "Advertising Systems", "Strategic Optimization", "Profitability"],
    featured: true
  },
  "steel-fit-usa": {
    title: "Steel Fit USA",
    subtitle: "Exceptional Growth with Paid Media Strategy",
    category: "Paid Media",
    overview: "Transformative paid media strategy development for fitness brand, driving exceptional growth through targeted audience development and strategic campaign optimization.",
    challenge: "Steel Fit USA needed a paid media strategy that could drive exceptional growth in the competitive fitness industry while maintaining cost-effective customer acquisition.",
    solution: [
      "Developed comprehensive paid media strategy for fitness industry",
      "Implemented targeted audience development and segmentation",
      "Created strategic campaign optimization frameworks",
      "Established growth-focused performance tracking systems"
    ],
    results: {
      primary: "Exceptional growth through strategic paid media",
      metrics: [
        { label: "Growth Rate", value: "Exceptional", icon: TrendingUp },
        { label: "Industry Focus", value: "Fitness", icon: Target },
        { label: "Strategy Type", value: "Paid Media", icon: DollarSign },
        { label: "Audience Dev", value: "Targeted", icon: Users }
      ]
    },
    testimonial: {
      quote: "The paid media strategy delivered exceptional growth for our fitness brand. The targeted approach and strategic optimization exceeded all our expectations.",
      author: "Steel Fit USA Team"
    },
    tags: ["Paid Media", "Fitness Industry", "Exceptional Growth", "Audience Development"],
    featured: true
  },
  "mandali-retreats": {
    title: "Crafting Success: Mandali Retreats",
    subtitle: "Journey to 5X ROAS",
    category: "Wellness Marketing",
    overview: "Mandali Retreats, a luxury wellness retreat center in Italy, sought to maximize return on advertising investment (ROI) across paid media channels, including Meta (Instagram and Facebook), Google Search, and YouTube advertising. Through meticulous strategic planning, creative direction, and advanced campaign execution, we delivered remarkable results, achieving consistent 5X ROAS and targeted campaigns that continue to generate thousands of Euros monthly.",
    challenge: "Mandali Retreats needed to bridge the gap between online advertising and offline booking behavior while ensuring seamless data integration. The luxury wellness market required sophisticated targeting to reach high-value prospects across multiple touchpoints, from initial awareness through booking conversion, while maintaining cost efficiency across all channels.",
    solution: [
      "Implemented comprehensive offline conversion tracking to bridge the gap between online advertising and offline booking behavior",
      "Ensured seamless data integration to eliminate delays and streamline campaign optimization with precise attribution",
      "Developed tiered remarketing campaigns based on user behavior, delivering tailored content at specific time intervals",
      "Created high-quality content using professional video editing and diverse ad formats optimized for engagement",
      "Designed geographic and optimized Google campaigns focusing on high-performing regions to reduce costs and increase efficiency",
      "Strategically boosted key posts in Meta Ads Manager to amplify reach and impact at pivotal funnel stages",
      "Built sophisticated remarketing funnels that consistently generate high ROAS and ongoing revenue"
    ],
    results: {
      primary: "+5X ROAS across social media channels with consistent high-value returns on ad spend",
      metrics: [
        { label: "Social Media ROAS", value: "+5X", icon: TrendingUp },
        { label: "Google Search ROAS", value: "+4X", icon: Target },
        { label: "Monthly Revenue", value: "€1000s", icon: DollarSign },
        { label: "Lead Quality", value: "Enhanced", icon: Users }
      ]
    },
    detailedResults: [
      {
        title: "Social Media Performance",
        description: "+5X ROAS across social media channels, consistently exceeding value expectations and delivering substantial returns on ad spend"
      },
      {
        title: "Search Campaign Success", 
        description: "+4X ROAS for Google Search campaigns, generating significant value from both branded and non-branded search terms"
      },
      {
        title: "Revenue Generation",
        description: "Remarketing funnels deliver thousands of Euros monthly, ensuring consistent growth and sustainable revenue streams"
      },
      {
        title: "Enhanced Lead Generation",
        description: "Intensified bookings for Mandali's retreats while optimizing costs geographically for maximum efficiency"
      }
    ],
    strategies: [
      {
        category: "Conversion Tracking & Data Integration",
        tactics: [
          "Implemented comprehensive offline conversion tracking",
          "Ensured seamless data integration eliminating delays",
          "Enabled precise attribution and campaign optimization"
        ]
      },
      {
        category: "Tiered Remarketing Campaigns", 
        tactics: [
          "Day 1-7: Highlighted retreat benefits and luxurious facilities",
          "Week 2-3: Showcased testimonials and social proof",
          "Week 4+: Created urgency with time-sensitive promotions"
        ]
      },
      {
        category: "Creative Content & Testing",
        tactics: [
          "Utilized high-quality content using CapCut for diverse ad formats",
          "Designed multiple ad variations by altering the first few seconds",
          "Provided strategic direction for new promotional video shoots"
        ]
      },
      {
        category: "Geographic & Search Optimization",
        tactics: [
          "Optimized targeting by focusing on high-performing regions",
          "Built Google Search campaigns to capture branded and high-intent search terms",
          "Strategically boosted key posts to amplify reach at pivotal funnel stages"
        ]
      }
    ],
    testimonial: {
      quote: "Juda is an exciting person to work with - his passion for tackling problems and facing challenges is a joy to experience. Juda is constantly learning, which means his work is always on the cutting edge of innovation - an invaluable skill in the world of digital media strategy.",
      author: "Beth Amant, Founder & Chief Creative"
    },
    tags: ["5X ROAS", "Luxury Wellness", "Meta Advertising", "Google Search", "Remarketing Funnels", "Conversion Tracking"],
    featured: true,
    videoUrl: "https://www.youtube.com/watch?v=g7yVF5F6l9s"
  },
  "fitness-roi": {
    title: "Maximizing ROI in Fitness",
    subtitle: "$2M Revenue, 11K New Members",
    category: "Revenue Growth",
    overview: "Comprehensive fitness marketing strategy that generated over $2M in revenue while acquiring more than 11,000 new members through strategic campaign optimization and growth frameworks.",
    challenge: "The fitness business needed a comprehensive marketing strategy that could drive both significant revenue growth and substantial member acquisition while maintaining sustainable growth patterns.",
    solution: [
      "Developed comprehensive fitness marketing strategy",
      "Implemented revenue-focused campaign optimization",
      "Created member acquisition and retention systems",
      "Established sustainable growth frameworks for fitness industry"
    ],
    results: {
      primary: "$2M+ revenue and 11K+ new members acquired",
      metrics: [
        { label: "Revenue Generated", value: "$2M+", icon: DollarSign },
        { label: "New Members", value: "11K+", icon: Users },
        { label: "Industry Focus", value: "Fitness", icon: Target },
        { label: "Growth Type", value: "Sustainable", icon: TrendingUp }
      ]
    },
    testimonial: {
      quote: "The results speak for themselves - $2M in revenue and over 11,000 new members. The comprehensive strategy transformed our entire business growth trajectory.",
      author: "Fitness Business Owner"
    },
    tags: ["$2M Revenue", "11K Members", "Fitness Marketing", "ROI Maximization"],
    featured: true
  }
};

const otherCaseStudies = [
  { id: "lamark-agency", title: "Growth Across Industries", category: "PPC Management" },
  { id: "hapi-art", title: "Building a Profitable 10X ROAS", category: "ROI Optimization" },
  { id: "steel-fit-usa", title: "Steel Fit USA", category: "Paid Media" },
  { id: "mandali-retreats", title: "Crafting Success: Mandali Retreats", category: "Wellness Marketing" },
  { id: "fitness-roi", title: "Maximizing ROI in Fitness", category: "Revenue Growth" }
];

// Helper function to convert YouTube URL to embed URL
function getYouTubeEmbedUrl(url: string): string {
  const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
}

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug || !caseStudyData[slug as keyof typeof caseStudyData]) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Case Study Not Found</h1>
          <Link to="/case-studies" className="text-primary hover:underline">
            ← Back to Case Studies
          </Link>
        </div>
      </div>
    );
  }

  const study = caseStudyData[slug as keyof typeof caseStudyData];
  const relatedStudies = otherCaseStudies.filter(s => s.id !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link 
            to="/case-studies" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
            data-testid="back-to-case-studies"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Case Studies
          </Link>

          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">
              {study.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="case-study-title">
              {study.title}
            </h1>
            <p className="text-xl text-primary font-medium mb-6">
              {study.subtitle}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {study.overview}
            </p>
          </div>
        </div>
      </section>

      {/* Video Section */}
      {(study as any).videoUrl && (
        <section className="px-6 py-12 lg:px-8 bg-muted/30">
          <div className="mx-auto max-w-4xl">
            <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src={getYouTubeEmbedUrl((study as any).videoUrl)}
                title="Case Study Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                data-testid="case-study-video"
              />
            </div>
          </div>
        </section>
      )}

      {/* Results Metrics */}
      <section className="px-6 py-12 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Key Results</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {study.results.metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="font-bold text-lg text-foreground">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </div>
              );
            })}
          </div>
          <p className="text-center text-lg font-medium text-foreground">
            {study.results.primary}
          </p>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">The Challenge</h2>
              <p className="text-muted-foreground leading-relaxed">
                {study.challenge}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">The Solution</h2>
              <ul className="space-y-3">
                {study.solution.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Results - Only for Mandali */}
      {(study as any).detailedResults && (
        <section className="px-6 py-16 lg:px-8 bg-muted/30">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Detailed Results</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {(study as any).detailedResults.map((result: any, index: number) => (
                <div key={index} className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="font-bold text-foreground mb-3">{result.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{result.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Strategies & Tactics - Only for Mandali */}
      {(study as any).strategies && (
        <section className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Tactics & Strategies</h2>
            <div className="space-y-8">
              {(study as any).strategies.map((strategy: any, index: number) => (
                <div key={index} className="border-l-4 border-primary pl-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">{strategy.category}</h3>
                  <ul className="space-y-2">
                    {strategy.tactics.map((tactic: string, tacticIndex: number) => (
                      <li key={tacticIndex} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{tactic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      <section className="px-6 py-16 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-4xl text-center">
          <blockquote className="text-xl md:text-2xl text-foreground font-medium mb-6 leading-relaxed">
            "{study.testimonial.quote}"
          </blockquote>
          <p className="text-muted-foreground font-medium">
            — {study.testimonial.author}
          </p>
        </div>
      </section>

      {/* Tags */}
      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap gap-2 justify-center">
            {study.tags.map((tag, index) => (
              <Badge key={index} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Other Case Studies */}
      <section className="px-6 py-16 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Other Case Studies</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedStudies.map((related) => (
              <Link
                key={related.id}
                to={`/case-study/${related.id}`}
                className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/20 transition-all duration-300"
              >
                <Badge variant="secondary" className="mb-3 text-xs">
                  {related.category}
                </Badge>
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {related.title}
                </h3>
                <div className="flex items-center gap-2 text-primary text-sm group-hover:gap-3 transition-all">
                  Read case study
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/case-studies">
              <Button variant="outline">
                View All Case Studies
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}