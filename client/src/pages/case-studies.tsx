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
    title: "Growth Across Industries",
    subtitle: "Pay Per Click Lamark Agency",
    description: "Multi-industry PPC strategy driving exceptional growth across diverse business sectors with targeted campaign optimization.",
    results: [
      "Multi-location tracking",
      "Cross-industry expertise",
      "Scalable PPC systems"
    ],
    category: "PPC Management",
    image: "/images/case-study-lamark.png", // We'll need to add this
    featured: true
  },
  {
    id: "hapi-art",
    title: "Building a Profitable 10X ROAS",
    subtitle: "Hapi Art Advertising System",
    description: "Comprehensive advertising system design that delivered exceptional 10X return on ad spend through strategic optimization.",
    results: [
      "10X ROAS achieved",
      "Profitable ad system",
      "Strategic optimization"
    ],
    category: "ROI Optimization",
    image: "/images/case-study-hapi.png",
    featured: true
  },
  {
    id: "lisa-nichols",
    title: "Scaling a Best Selling Author & Speaker",
    subtitle: "Lisa Nichols Growth Strategy",
    description: "Comprehensive growth strategy for scaling a best-selling author and speaker's personal brand, reaching millions worldwide.",
    results: [
      "Best-selling author status",
      "Global speaking platform",
      "Millions reached worldwide"
    ],
    category: "Personal Brand Growth",
    image: "/images/case-study-lisa.png",
    featured: true
  },
  {
    id: "core-40",
    title: "Maximizing ROI in Fitness",
    subtitle: "$2M Revenue, 11K New Members",
    description: "Comprehensive fitness marketing strategy that generated $2M+ in revenue while acquiring over 11,000 new members through strategic optimization.",
    results: [
      "$2M+ revenue generated",
      "11K+ new members",
      "Fitness growth expertise"
    ],
    category: "Fitness Marketing",
    image: "/images/case-study-core40.png",
    featured: true
  },
  {
    id: "steel-fit-usa",
    title: "Steel Fit USA",
    subtitle: "Exceptional Growth with Paid Media Strategy",
    description: "Transformative paid media strategy that drove exceptional growth for fitness brand through targeted audience development.",
    results: [
      "Exceptional growth",
      "Fitness industry expertise",
      "Paid media mastery"
    ],
    category: "Paid Media",
    image: "/images/case-study-steelfit.png",
    featured: true
  },
  {
    id: "mandali-retreats",
    title: "Crafting Success: Mandali Retreats",
    subtitle: "Journey to 5X ROAS",
    description: "Strategic campaign development for wellness retreat business achieving remarkable 5X return on advertising spend.",
    results: [
      "5X ROAS achieved",
      "Wellness industry success",
      "Strategic campaign design"
    ],
    category: "Wellness Marketing",
    image: "/images/case-study-mandali.png",
    featured: true
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <ProgressBar />
      {/* Header Section */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="case-studies-title">
              Case Studies
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="case-studies-subtitle">
              Real results from real campaigns. See how I've helped businesses achieve exceptional growth through strategic marketing and advertising.
            </p>
          </div>

          {/* Featured Case Studies Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study, index) => (
              <div 
                key={study.id}
                className="group relative bg-card border border-border rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/20 hover:bg-gradient-to-br hover:from-blue-600 hover:via-purple-600 hover:to-blue-800 hover:text-white"
                data-testid={`case-study-card-${index}`}
              >
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-6">
                  <Badge variant="secondary" className="text-xs font-medium group-hover:bg-white/20 group-hover:text-white">
                    {study.category}
                  </Badge>
                  {study.featured && (
                    <Badge className="bg-primary/10 text-primary border-primary/20 group-hover:bg-white/20 group-hover:text-white group-hover:border-white/30">
                      Featured
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-white" data-testid={`case-study-title-${index}`}>
                    {study.title}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-4 group-hover:text-white/90">
                    {study.subtitle}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6 group-hover:text-white/80">
                    {study.description}
                  </p>

                  {/* Results */}
                  <div className="space-y-2 mb-6">
                    {study.results.map((result, resultIndex) => (
                      <div key={resultIndex} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span className="text-muted-foreground group-hover:text-white/80">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link 
                  to={`/case-study/${study.id}`}
                  className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors group-hover:gap-3 group-hover:text-white"
                  data-testid={`case-study-link-${index}`}
                >
                  Read full case study
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
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
                <div className="text-3xl font-bold text-primary">10X</div>
                <div className="text-sm text-muted-foreground">Max ROAS Achieved</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">$2M+</div>
                <div className="text-sm text-muted-foreground">Revenue Generated</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">11K+</div>
                <div className="text-sm text-muted-foreground">New Members</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}