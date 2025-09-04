import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Building2, Lightbulb, TrendingUp, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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

// Original case studies data
const caseStudies = [
  {
    id: "fintech-scale",
    title: "Fintech Scaling",
    stat: "20.85 ROAS",
    description: "Scaled Pilates business from $80K ad investment to $2M in revenue across Amsterdam via Facebook, Instagram, Google.",
    icon: TrendingUp
  },
  {
    id: "b2b-software",
    title: "B2B Software Client", 
    stat: "-72% CPL",
    description: "Dropped Cost Per Lead from $866 to $270 in 3 weeks for B2B software through strategic targeting and campaign optimization.",
    icon: Building2
  },
  {
    id: "supplement-brand",
    title: "Supplements Company",
    stat: "+216% Revenue",
    description: "Doubled monthly ROAS and revenue for supplements company through multi-channel testing across Gmail, Display, Shopping, and YouTube.",
    icon: Lightbulb
  },
  {
    id: "fitness-membership",
    title: "Maximizing ROI in Fitness",
    stat: "365 Days/year",
    description: "Comprehensive fitness marketing strategy delivering exceptional results.",
    icon: Users
  }
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

          {/* Case Studies Grid */}
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