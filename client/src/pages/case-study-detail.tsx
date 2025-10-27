import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ExternalLink, Target, TrendingUp, Users, DollarSign, Dumbbell, Heart, ShoppingCart, Plane, Package } from "lucide-react";
import { AtAGlance, MidPageCTA, BeforeAfter, BottomCTA, TestimonialIntro, StatStrip, TestimonialIntroLine, ProfitableAdvertisingCard, VerifiedMetrics } from "@/components/case-study/ConversionComponents";

// This would typically come from an API or CMS
const caseStudyData = {
  "lamark-agency": {
    title: "Growth Across Industries",
    subtitle: "Pay Per Click at Lamark Performance Marketing Agency",
    category: "PPC Management",
    overview: "Clarity Engine's scalable PPC framework was developed and refined within a fast-paced, multi-industry performance environment—managing significant monthly ad spend across fitness, healthcare, e-commerce, travel, and logistics. The result: repeatable systems that deliver measurable growth across verticals.",
    challenge: "Lamark Agency faced the complex challenge of managing PPC campaigns across vastly different industries, each with unique customer behaviors, acquisition costs, and conversion patterns. The agency needed a unified system that could adapt to various business models while providing accurate performance tracking, budget allocation, and ROI measurement across multiple client accounts and verticals. The solution required seamless integration with existing workflows while maintaining the flexibility to scale efficiently as the agency grew.",
    solution: [
      "Developed comprehensive multi-industry PPC framework adaptable to different business sectors and customer acquisition models",
      "Implemented advanced tracking systems enabling precise performance measurement and attribution across client accounts",
      "Created scalable campaign structures allowing efficient management across diverse client portfolios",
      "Established industry-specific performance benchmarks and optimization protocols tailored to each vertical",
      "Built automated reporting systems providing real-time insights across all client accounts",
      "Designed flexible budget allocation strategies optimized for different industry seasonality and customer lifecycles",
      "Implemented cross-industry learning protocols to apply successful strategies across different business sectors"
    ],
    results: {
      primary: "Successfully managed $70K+ monthly ad spend across diverse industries with scalable PPC systems",
      metrics: [
        { label: "Monthly Ad Spend", value: "$70K+", icon: DollarSign },
        { label: "Client Portfolio", value: "Multi-Industry", icon: Users },
        { label: "Industries Served", value: "10+", icon: Target },
        { label: "Performance", value: "Consistent CPL Growth", icon: TrendingUp }
      ]
    },
    detailedResults: [
      {
        title: "Large-Scale Budget Management",
        description: "Successfully managed $70,000+ in monthly advertising budget across multiple client verticals, ensuring optimal allocation and performance tracking"
      },
      {
        title: "Multi-Industry Campaign Excellence", 
        description: "Delivered consistent performance improvements across fitness, healthcare, e-commerce, travel, and logistics sectors through tailored strategies"
      },
      {
        title: "Scalable System Development",
        description: "Built comprehensive PPC management systems enabling the agency to efficiently handle growing client portfolios without compromising quality"
      },
      {
        title: "Consistent Lead Generation Growth",
        description: "Achieved consistent cost-per-lead reductions and conversion improvements across all verticals through systematic optimization"
      }
    ],
    strategies: [
      {
        category: "Multi-Industry Framework Development",
        tactics: [
          "Created adaptable PPC templates customizable for different business sectors",
          "Developed industry-specific keyword research and targeting methodologies",
          "Established flexible campaign structures accommodating various business models"
        ]
      },
      {
        category: "Advanced Tracking & Attribution", 
        tactics: [
          "Implemented comprehensive tracking systems across client accounts",
          "Built custom attribution models for complex customer journey mapping",
          "Created automated reporting dashboards for real-time performance monitoring"
        ]
      },
      {
        category: "Scalable Campaign Management",
        tactics: [
          "Designed efficient campaign structures enabling portfolio-level optimization",
          "Implemented automated bid management strategies across multiple accounts",
          "Created standardized optimization protocols adaptable to different industries"
        ]
      },
      {
        category: "Performance Optimization & Growth",
        tactics: [
          "Established industry-specific performance benchmarks and KPIs",
          "Implemented cross-industry learning protocols for strategy optimization",
          "Developed seasonal campaign strategies aligned with industry-specific trends"
        ]
      }
    ],
    testimonial: {
      quote: "I had the pleasure of working with Juda during his tenure at Lamark. During his interview, I knew he would bring a different level of thinking and analysis to the team that we were needing. He did not disappoint.",
      author: "Mike Berkman, VP of Performance"
    },
    tags: ["PPC Management", "Multi-Industry", "$70K Monthly Budget", "Scalable Systems", "Diverse Verticals", "Consistent Growth"],
    featured: true,
    heroImage: "/images/lamark-agency-collage.webp"
  },
  "hapi-art": {
    title: "Building a Profitable 10X ROAS",
    subtitle: "Hapi Art Advertising System",
    category: "ROI Optimization",
    overview: "Clarity Engine's scalable e-commerce advertising framework was refined in a fast-moving multi-industry environment and applied to Hapi Art's marketplace—optimizing creative testing, funnel structure, and attribution. The result: a profitable system achieving 10× ROAS with systematic creative testing and precise attribution across Meta.",
    challenge: "Hapi Art faced the challenge of marketing digital art products in a highly competitive e-commerce landscape where visual appeal and audience targeting are critical. The brand needed an advertising system that could effectively showcase their artistic products, reach art enthusiasts and collectors, while achieving profitable returns on ad spend. The challenge was to create a scalable system that could consistently deliver high ROAS across multiple channels while building brand recognition in the digital art market.",
    solution: [
      "Designed comprehensive advertising system architecture optimized for visual product marketing and art e-commerce",
      "Implemented advanced audience targeting strategies focused on art enthusiasts, collectors, and creative professionals",
      "Developed systematic creative testing protocols featuring high-quality art visuals and compelling ad formats",
      "Created sophisticated funnel optimization strategies to maximize conversion rates from awareness to purchase",
      "Built automated bid management and budget allocation systems for optimal ROAS performance",
      "Established comprehensive tracking and attribution systems for accurate performance measurement",
      "Implemented strategic remarketing campaigns targeting users based on art preferences and engagement behavior"
    ],
    results: {
      primary: "10× ROAS achieved with systematic creative testing, funnel structure, and precise attribution across Meta.",
      metrics: [
        { label: "Overall ROAS", value: "10×", icon: TrendingUp },
        { label: "Cold Prospecting", value: "16× ROAS", icon: Target },
        { label: "Retargeting", value: "6.9× ROAS", icon: DollarSign },
        { label: "Top Creatives", value: "5–6% CTR", icon: Users }
      ]
    },
    detailedResults: [
      {
        title: "Overall ROAS Performance",
        description: "Achieved 10× return on ad spend across the entire program, demonstrating profitable efficiency in e-commerce advertising"
      },
      {
        title: "Cold Prospecting Success", 
        description: "Generated 16× ROAS on cold prospecting campaigns through Meta, effectively reaching new art enthusiasts and collectors"
      },
      {
        title: "Retargeting Optimization",
        description: "Delivered 6.9× ROAS on retargeting campaigns, converting interested visitors into customers through strategic remarketing"
      },
      {
        title: "Creative Performance Excellence",
        description: "Maintained 5–6% CTR consistently on top-performing creatives, significantly exceeding industry benchmarks through systematic testing and optimization"
      }
    ],
    strategies: [
      {
        category: "Visual Creative Strategy & Testing",
        tactics: [
          "Developed high-impact visual advertising featuring Hapi Art's unique digital art pieces",
          "Implemented systematic creative testing across multiple ad formats and visual styles",
          "Created compelling storytelling approaches highlighting artist stories and creative processes"
        ]
      },
      {
        category: "Advanced Audience Targeting", 
        tactics: [
          "Built detailed personas targeting art enthusiasts, collectors, and creative professionals",
          "Implemented lookalike audiences based on high-value customer segments",
          "Created interest-based targeting focusing on art, design, and creative lifestyle preferences"
        ]
      },
      {
        category: "Conversion Funnel Optimization",
        tactics: [
          "Optimized entire customer journey from initial art discovery to final purchase completion",
          "Implemented strategic remarketing sequences based on product browsing and engagement behavior",
          "Developed time-sensitive promotional strategies to create urgency and drive conversions"
        ]
      },
      {
        category: "Performance Tracking & Optimization",
        tactics: [
          "Established comprehensive attribution modeling for accurate ROAS measurement",
          "Implemented automated bid management strategies optimized for profitability",
          "Created real-time performance monitoring dashboards for continuous optimization"
        ]
      }
    ],
    testimonial: {
      quote: "Hapi Art achieved 10× ROAS overall efficiency across the program. Cold prospecting on Meta delivered 16× ROAS, while retargeting campaigns achieved 6.9× ROAS. Top-performing creatives consistently maintained 5–6% CTR throughout the program.",
      author: "Results Summary",
      isResultsSummary: true
    },
    tags: ["10× ROAS", "16× Cold ROAS", "Meta Ads", "E-commerce", "Digital Art", "Visual Marketing", "Conversion Optimization"],
    featured: true,
    videoUrl: "https://www.youtube.com/watch?v=Hlea7gYuSvw"
  },
  "lisa-nichols": {
    title: "Scaling a Best-Selling Author & Speaker",
    subtitle: "Lisa Nichols Growth Strategy",
    category: "Personal Brand Growth",
    overview: "Clarity Engine developed a global paid media system for Lisa Nichols — best-selling author, motivational speaker, and founder of Motivating the Masses. Through creative testing, funnel optimization, and multi-channel scaling across YouTube and Google, Lisa's campaigns achieved lower acquisition costs, consistent conversions, and global audience growth.",
    challenge: "Lisa Nichols needed a paid media system capable of scaling her personal brand globally while maintaining cost efficiency and authentic engagement. The challenge was to create consistent conversions across multiple platforms (YouTube and Google) while reducing acquisition costs and expanding reach to new international audiences without sacrificing the authentic connection that made her successful.",
    solution: [
      "Developed unified Google + YouTube paid media strategy for cohesive brand presence across platforms",
      "Implemented systematic creative testing protocols to identify highest-performing ad formats and messaging",
      "Created comprehensive funnel optimization system streamlining the journey from ad to booking",
      "Built weekly performance optimization cycles for consistent campaign improvements",
      "Established advanced tracking and attribution systems for accurate performance measurement across channels",
      "Designed audience expansion strategies to reach new international markets while maintaining ROI",
      "Implemented bid management and budget allocation strategies optimized for CPL efficiency"
    ],
    results: {
      primary: "Consistent audience growth, global reach, and improved cost efficiency through systemized paid media optimization.",
      metrics: [
        { label: "Google CPC", value: "–42%", icon: DollarSign },
        { label: "CPL Efficiency", value: "+52%", icon: TrendingUp },
        { label: "YouTube Conversions", value: "+140%", icon: Target },
        { label: "Audience Growth YoY", value: "+25%", icon: Users }
      ]
    },
    detailedResults: [
      {
        title: "Paid Media Optimization",
        description: "Reduced Google CPC by 42% and improved overall ad efficiency"
      },
      {
        title: "Conversion Rate Growth", 
        description: "Increased YouTube conversions by 140%; achieved stable CPL performance"
      },
      {
        title: "Audience Expansion",
        description: "Extended reach across multiple regions with consistent ROI improvements"
      },
      {
        title: "Funnel Systemization",
        description: "Created end-to-end tracking and weekly performance cycles to sustain growth"
      }
    ],
    beforeAfter: {
      title: "Before vs After (Personal Brand Growth System)",
      rows: [
        { before: "Disconnected brand channels", after: "Unified Google + YouTube strategy" },
        { before: "Rising ad costs and inconsistent conversions", after: "–42% CPC reduction and higher CTR" },
        { before: "Limited global reach", after: "Expanded international visibility" },
        { before: "Unclear funnel hand-offs", after: "Streamlined journey from ad to booking" },
        { before: "Irregular campaign performance", after: "Consistent weekly optimization cycles" }
      ]
    },
    strategies: [
      {
        category: "Unified Multi-Channel Strategy",
        tactics: [
          "Created cohesive brand presence across Google and YouTube platforms",
          "Developed cross-platform attribution and tracking systems",
          "Implemented consistent messaging frameworks adapted for each platform's unique audience"
        ]
      },
      {
        category: "Creative Testing & Optimization", 
        tactics: [
          "Established systematic creative testing protocols for ad formats and messaging",
          "Identified highest-performing creative elements through data-driven analysis",
          "Implemented rapid iteration cycles based on performance insights"
        ]
      },
      {
        category: "Funnel Optimization & Conversion",
        tactics: [
          "Streamlined customer journey from initial ad exposure to booking completion",
          "Optimized landing pages and conversion paths for maximum efficiency",
          "Created weekly optimization cycles for consistent performance improvements"
        ]
      },
      {
        category: "Global Audience Expansion",
        tactics: [
          "Developed international targeting strategies while maintaining ROI standards",
          "Implemented audience segmentation for personalized messaging by region",
          "Built sustainable growth systems supporting 25% YoY audience expansion"
        ]
      }
    ],
    tags: ["–42% CPC", "+140% YouTube Conversions", "Personal Brand", "Google Ads", "YouTube Ads", "Global Reach", "CPL Optimization"],
    featured: true,
    videoUrl: "https://youtu.be/Mv9aaF1ISXQ"
  },
  "core-40": {
    title: "Maximizing ROI in Fitness",
    subtitle: "High-Performance Training Studio Growth",
    category: "Fitness Marketing",
    overview: "Core 40, a boutique high-performance training studio, required a comprehensive marketing strategy to establish their premium fitness brand and attract dedicated athletes and fitness enthusiasts. Through targeted digital marketing, community building, and strategic positioning, we developed a growth system that positioned Core 40 as the premier destination for serious fitness training, resulting in significant membership growth and brand recognition in the competitive fitness market.",
    challenge: "Core 40 faced the challenge of establishing their boutique fitness studio in a highly competitive market dominated by large gym chains and fitness franchises. The studio needed to differentiate itself as a premium, high-performance training facility while attracting the right audience of dedicated athletes and serious fitness enthusiasts. The challenge was to build brand awareness, drive membership growth, and establish Core 40 as the go-to destination for elite fitness training in their local market.",
    solution: [
      "Developed comprehensive brand positioning strategy emphasizing high-performance training and elite fitness culture",
      "Implemented targeted digital marketing campaigns focused on serious athletes and fitness enthusiasts",
      "Created community-building initiatives to foster strong member engagement and loyalty",
      "Built strategic content marketing showcasing training methodologies and member success stories",
      "Established local market dominance through strategic partnerships and community outreach",
      "Developed systematic member acquisition and retention strategies optimized for boutique fitness",
      "Implemented performance tracking and optimization systems for continuous growth measurement"
    ],
    results: {
      primary: "$2M+ revenue and 11K+ new members acquired through strategic fitness marketing",
      metrics: [
        { label: "Revenue Generated", value: "$2M+", icon: DollarSign },
        { label: "New Members", value: "11K+", icon: Users },
        { label: "Industry Focus", value: "Fitness", icon: Target },
        { label: "Growth Type", value: "Sustainable", icon: TrendingUp }
      ]
    },
    detailedResults: [
      {
        title: "Exceptional Revenue Generation",
        description: "Generated over $2M+ in revenue through strategic fitness marketing campaigns and optimized member acquisition systems"
      },
      {
        title: "Massive Member Acquisition", 
        description: "Successfully acquired 11K+ new members through targeted marketing strategies and comprehensive growth systems"
      },
      {
        title: "Fitness Industry Expertise",
        description: "Demonstrated specialized expertise in fitness marketing, delivering results that significantly exceed industry benchmarks"
      },
      {
        title: "Sustainable Growth Achievement",
        description: "Established sustainable growth systems that continue to drive revenue and membership expansion in the competitive fitness market"
      }
    ],
    strategies: [
      {
        category: "Premium Brand Positioning & Differentiation",
        tactics: [
          "Developed compelling brand messaging emphasizing high-performance training and elite athlete culture",
          "Created premium visual identity and marketing materials reflecting boutique fitness excellence",
          "Established thought leadership through expert training content and methodology showcases"
        ]
      },
      {
        category: "Targeted Digital Marketing & Acquisition", 
        tactics: [
          "Implemented precise audience targeting focusing on serious athletes and dedicated fitness enthusiasts",
          "Developed high-converting lead generation campaigns optimized for boutique fitness membership",
          "Created strategic social media presence showcasing training intensity and member achievements"
        ]
      },
      {
        category: "Community Building & Member Engagement",
        tactics: [
          "Built systematic community engagement programs fostering strong member loyalty and retention",
          "Implemented member success story campaigns highlighting transformation and performance improvements",
          "Created exclusive member events and challenges to strengthen studio community bonds"
        ]
      },
      {
        category: "Local Market Dominance & Growth",
        tactics: [
          "Established strategic partnerships with local athletic organizations and sports teams",
          "Implemented referral programs leveraging satisfied member networks for organic growth",
          "Created systematic local market outreach and community involvement initiatives"
        ]
      }
    ],
    testimonial: {
      quote: "The marketing strategy transformed our boutique studio into the premier destination for serious athletes. The targeted approach and community-building initiatives have created incredible membership growth and brand recognition.",
      author: "Core 40 Studio Leadership"
    },
    tags: ["Boutique Fitness", "High-Performance Training", "Premium Brand", "Community Building", "Athletic Performance", "Membership Growth"],
    featured: true,
    videoUrl: "https://www.youtube.com/watch?v=OMR1fsCbzTY"
  },
  "steel-fit-usa": {
    title: "Steel Fit USA",
    subtitle: "Exceptional Growth with Paid Media Strategy",
    category: "Paid Media",
    overview: "Steel Fit USA, a leading fitness equipment and supplement brand, partnered with us to develop a transformative paid media strategy that would drive exceptional growth in the highly competitive fitness industry. Through comprehensive audience development, strategic campaign optimization, and data-driven performance tracking, we delivered remarkable results that exceeded growth expectations and established Steel Fit USA as a dominant force in their market segment.",
    challenge: "Steel Fit USA faced intense competition in the saturated fitness equipment market, needing to differentiate their brand while achieving cost-effective customer acquisition. The challenge was to develop a paid media strategy that could cut through the noise, reach high-intent fitness enthusiasts, and drive meaningful conversions across multiple product categories while maintaining profitable customer acquisition costs in a highly competitive advertising landscape.",
    solution: [
      "Developed comprehensive paid media strategy tailored specifically for the fitness equipment industry",
      "Implemented advanced audience segmentation targeting fitness enthusiasts, athletes, and home gym builders",
      "Created strategic campaign optimization frameworks focusing on high-converting product categories",
      "Established robust performance tracking systems to monitor customer acquisition costs and lifetime value",
      "Designed creative testing protocols for fitness equipment demonstrations and workout content",
      "Built strategic remarketing funnels targeting users based on product interest and engagement level",
      "Implemented seasonal campaign strategies aligning with fitness trends and New Year resolutions"
    ],
    results: {
      primary: "Exceptional growth through strategic paid media with significant ROI improvements",
      metrics: [
        { label: "Growth Rate", value: "Exceptional", icon: TrendingUp },
        { label: "Industry Focus", value: "Fitness", icon: Target },
        { label: "Strategy Type", value: "Paid Media", icon: DollarSign },
        { label: "Customer Acquisition", value: "Optimized", icon: Users }
      ]
    },
    detailedResults: [
      {
        title: "Brand Recognition Growth",
        description: "Significantly increased brand awareness and recognition within the competitive fitness equipment market through strategic paid media placement"
      },
      {
        title: "Customer Acquisition Optimization", 
        description: "Achieved cost-effective customer acquisition with improved conversion rates across all major product categories"
      },
      {
        title: "Market Penetration",
        description: "Successfully penetrated new market segments including home gym enthusiasts and professional athletes"
      },
      {
        title: "Revenue Performance",
        description: "Delivered exceptional revenue growth that exceeded initial projections through strategic campaign optimization"
      }
    ],
    strategies: [
      {
        category: "Audience Development & Segmentation",
        tactics: [
          "Developed detailed personas for fitness enthusiasts, athletes, and home gym builders",
          "Implemented lookalike audiences based on high-value customer data",
          "Created custom audiences targeting specific fitness interests and behaviors"
        ]
      },
      {
        category: "Creative Strategy & Testing", 
        tactics: [
          "Produced high-quality product demonstration videos showcasing equipment in action",
          "Developed workout-focused content featuring Steel Fit USA products",
          "Implemented systematic creative testing across multiple ad formats and messaging angles"
        ]
      },
      {
        category: "Campaign Optimization & Performance",
        tactics: [
          "Established data-driven bidding strategies optimized for customer acquisition cost",
          "Implemented seasonal campaign strategies aligned with fitness industry trends",
          "Created sophisticated remarketing funnels based on product interest and engagement"
        ]
      },
      {
        category: "Performance Tracking & Analytics",
        tactics: [
          "Built comprehensive tracking systems monitoring customer lifetime value",
          "Established performance benchmarks across product categories",
          "Implemented attribution modeling to optimize cross-channel performance"
        ]
      }
    ],
    testimonial: {
      quote: "The paid media strategy delivered exceptional growth for our fitness brand. The targeted approach and strategic optimization exceeded all our expectations, helping us reach new customers and significantly grow our market presence.",
      author: "Steel Fit USA Marketing Team"
    },
    tags: ["Paid Media", "Fitness Equipment", "Audience Segmentation", "Growth Strategy", "Performance Marketing", "Customer Acquisition"],
    featured: true,
    videoUrl: "https://www.youtube.com/watch?v=CKo1HNxanuk"
  },
  "mandali-retreats": {
    title: "Crafting Success: Mandali Retreats",
    subtitle: "Journey to 16.5× Social & 29.06× Search ROAS",
    category: "Wellness Marketing",
    overview: "Clarity Engine implemented a repeatable, multi-channel system for Mandali Retreats—combining creative testing, geo-targeted campaigns, and structured remarketing. The result: +16.5× ROAS across social and +29.06× ROAS on Google Search, with stronger lead quality and steady monthly demand.",
    challenge: "Mandali Retreats needed to bridge the gap between online advertising and offline booking behavior while ensuring seamless data integration. The luxury wellness market required sophisticated targeting to reach high-value prospects across multiple touchpoints, from initial awareness through booking conversion, while maintaining cost efficiency across all channels.",
    solution: [
      "Implemented unified tracking and CRM handoff for faster follow-ups, closing the awareness-to-booking gap",
      "Developed geo-targeted campaigns in high-intent regions to maximize booking quality and reduce wasted spend",
      "Created creative testing cadence with structured remarketing to deliver consistent ROAS",
      "Built split Google Search campaigns separating brand vs high-intent non-brand queries for +29.06× ROAS",
      "Established systematic social campaigns across Meta and YouTube achieving +16.5× ROAS with steady month-over-month growth",
      "Designed tiered remarketing sequences based on user behavior and engagement stages",
      "Implemented comprehensive tracking architecture enabling precise attribution and campaign optimization"
    ],
    results: {
      primary: "+16.5× ROAS across social and +29.06× ROAS on Google Search with stronger lead quality",
      metrics: [
        { label: "Social ROAS", value: "+16.5×", icon: TrendingUp },
        { label: "Google Search ROAS", value: "+29.06×", icon: Target },
        { label: "Geo-targeted wins", value: "High-intent regions", icon: Target },
        { label: "Lead quality", value: "Consistent MoM", icon: Users }
      ]
    },
    detailedResults: [
      {
        title: "Unified Tracking & CRM Integration",
        description: "Closed the awareness-to-booking gap with unified tracking and CRM handoff, enabling faster follow-ups and better conversion rates"
      },
      {
        title: "Geo-Targeted Campaign Success", 
        description: "Focused spend on high-intent regions, delivering stronger lead quality and more efficient cost-per-acquisition"
      },
      {
        title: "Creative Testing & Remarketing",
        description: "Implemented structured creative testing cadence with systematic remarketing, achieving consistent ROAS performance"
      },
      {
        title: "Search Campaign Optimization",
        description: "Split brand vs high-intent non-brand search campaigns, achieving +29.06× ROAS on Google Search"
      },
      {
        title: "Social Media Excellence",
        description: "+16.5× ROAS across Meta and YouTube with steady month-over-month growth and reliable performance"
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
    tags: ["16.5× Social ROAS", "29.06× Search ROAS", "Luxury Wellness", "Meta Advertising", "Google Search", "Remarketing Funnels", "Conversion Tracking"],
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
            
            {/* Industry Icons - Only for Lamark Agency */}
            {slug === "lamark-agency" && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-violet-100 dark:bg-violet-900 rounded-full flex items-center justify-center">
                    <Dumbbell className="w-7 h-7 text-violet-600 dark:text-violet-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Fitness</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Heart className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Healthcare</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-7 h-7 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">E-commerce</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
                    <Plane className="w-7 h-7 text-amber-600 dark:text-amber-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Travel</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                    <Package className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Logistics</span>
                </div>
              </div>
            )}
          </div>
          
          {/* At A Glance - Only for Lamark Agency */}
          {slug === "lamark-agency" && (
            <div className="mx-auto max-w-4xl">
              <AtAGlance />
            </div>
          )}
          
          {/* StatStrip - Only for Hapi Art */}
          {slug === "hapi-art" && (
            <div className="mx-auto max-w-4xl">
              <StatStrip 
                items={[
                  { k: "10× ROAS", v: "Overall efficiency" },
                  { k: "16× ROAS", v: "Cold prospecting (Meta)" },
                  { k: "6.9× ROAS", v: "Retargeting (Meta)" },
                  { k: "5–6% CTR", v: "Top creatives" },
                ]}
              />
            </div>
          )}
          
          {/* StatStrip - Only for Mandali Retreats */}
          {slug === "mandali-retreats" && (
            <div className="mx-auto max-w-4xl">
              <StatStrip 
                items={[
                  { k: "+16.5× ROAS", v: "Social (Meta/YouTube)" },
                  { k: "+29.06× ROAS", v: "Google Search" },
                  { k: "Geo-targeted wins", v: "High-intent regions" },
                  { k: "Lead quality ↑", v: "Consistent month-over-month" },
                ]}
              />
            </div>
          )}
          
          {/* StatStrip - Only for Lisa Nichols */}
          {slug === "lisa-nichols" && (
            <div className="mx-auto max-w-4xl">
              <StatStrip 
                items={[
                  { k: "–42%", v: "Reduction in Google CPC" },
                  { k: "+52%", v: "Improvement in CPL efficiency" },
                  { k: "+140%", v: "Increase in YouTube conversions" },
                  { k: "+25%", v: "Audience expansion YoY" },
                ]}
              />
            </div>
          )}
        </div>
      </section>

      {/* Hero Image Section */}
      {(study as any).heroImage && (
        <section className="px-6 py-12 lg:px-8 bg-muted/30">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={(study as any).heroImage}
                alt={`${study.title} - Multi-industry campaign collage`}
                className="w-full h-auto"
                data-testid="case-study-hero-image"
              />
            </div>
          </div>
        </section>
      )}

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
          
          {/* Mid Page CTA - Only for Lamark Agency */}
          {slug === "lamark-agency" && (
            <>
              <p className="text-center text-gray-700 dark:text-gray-300 mt-8 mb-4">
                These insights now inform how Clarity Engine helps brands scale—combining agency-tested rigor with adaptable frameworks built for modern growth.
              </p>
              <MidPageCTA />
            </>
          )}
          
          {/* Mid Page CTA - Only for Hapi Art */}
          {slug === "hapi-art" && (
            <>
              <p className="text-center text-gray-700 dark:text-gray-300 mt-8 mb-4">
                These e-commerce learnings now inform how Clarity Engine scales other shops—balancing creative velocity with precise attribution.
              </p>
              <MidPageCTA 
                title="Curious what this could look like for your store?"
                body="Book a Strategic Intro Call—get a quick teardown of your current setup and the fastest wins."
              />
            </>
          )}
          
          {/* Mid Page CTA - Only for Mandali Retreats */}
          {slug === "mandali-retreats" && (
            <>
              <p className="text-center text-gray-700 dark:text-gray-300 mt-8 mb-4">
                These learnings now inform how Clarity Engine scales retreat & wellness brands—balancing creative velocity with precise targeting.
              </p>
              <MidPageCTA 
                title="Curious what this could look like for your retreat or center?"
                body="Book a Strategic Intro Call—get a quick teardown and the fastest wins."
              />
            </>
          )}
          
          {/* Mid Page CTA - Only for Lisa Nichols */}
          {slug === "lisa-nichols" && (
            <>
              <p className="text-center text-gray-700 dark:text-gray-300 mt-8 mb-4">
                These learnings now guide how Clarity Engine helps personal brands and thought leaders grow their reach efficiently.
              </p>
              <MidPageCTA 
                title="Curious what this could look like for your brand?"
                body="Book a Strategic Intro Call — get a quick teardown of your current setup and the fastest wins."
              />
            </>
          )}
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
          
          {/* Before After - Only for Lamark Agency */}
          {slug === "lamark-agency" && (
            <BeforeAfter />
          )}
          
          {/* Profitable Advertising Card & Verified Metrics - Only for Hapi Art */}
          {slug === "hapi-art" && (
            <>
              <ProfitableAdvertisingCard />
              <VerifiedMetrics />
            </>
          )}
          
          {/* Before After - Only for Hapi Art */}
          {slug === "hapi-art" && (
            <BeforeAfter 
              rows={[
                { before: "One-off creatives, little iteration", after: "Creative testing sprints with winners rolled out" },
                { before: "Shallow retargeting pools", after: "Multi-signal retargeting (views, carts, PDP depth, time-on-site)" },
                { before: "Unclear ROAS and budget confidence", after: "Trusted ROAS with LTV overlays and budget guardrails" },
              ]}
              title="Before vs After (E-commerce System)"
            />
          )}
          
          {/* Before After - Only for Mandali Retreats */}
          {slug === "mandali-retreats" && (
            <BeforeAfter 
              rows={[
                { before: "Awareness → booking gap; manual responses", after: "Unified tracking + CRM handoff; faster follow-ups" },
                { before: "Broad targeting; scattered data", after: "Geo-targeted campaigns in high-intent regions" },
                { before: "One-off creatives; inconsistent ROAS", after: "Creative testing cadence; structured remarketing" },
                { before: "Search mixed low/high intent", after: "Split brand vs high-intent non-brand; +29.06× ROAS" },
                { before: "Social spend lacked reliability", after: "+16.5× ROAS across social; steady MoM" },
              ]}
              title="Before vs After (Retreats Growth System)"
            />
          )}
          
          {/* Before After - Only for Lisa Nichols */}
          {slug === "lisa-nichols" && (study as any).beforeAfter && (
            <BeforeAfter 
              rows={(study as any).beforeAfter.rows}
              title={(study as any).beforeAfter.title}
            />
          )}
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

      {/* Testimonial / Results Summary - Skip for Lisa Nichols */}
      {slug !== "lisa-nichols" && study.testimonial && (
        <section className="px-6 py-16 lg:px-8 bg-muted/30">
          <div className="mx-auto max-w-4xl text-center">
            {slug === "lamark-agency" && <TestimonialIntro />}
            {slug === "hapi-art" && <TestimonialIntroLine />}
            {slug === "mandali-retreats" && <TestimonialIntroLine />}
            
            {(study.testimonial as any).isResultsSummary ? (
              <div data-testid="results-summary">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Results Summary</h3>
                <p className="text-lg text-foreground leading-relaxed">
                  {study.testimonial.quote}
                </p>
              </div>
            ) : (
              <>
                <blockquote className="text-xl md:text-2xl text-foreground font-medium mb-6 leading-relaxed">
                  "{study.testimonial.quote}"
                </blockquote>
                <p className="text-muted-foreground font-medium">
                  — {study.testimonial.author}
                </p>
              </>
            )}
          </div>
        </section>
      )}

      {/* Bottom CTA - Only for Lamark Agency */}
      {slug === "lamark-agency" && (
        <section className="px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <BottomCTA />
          </div>
        </section>
      )}
      
      {/* Bottom CTA - Only for Hapi Art */}
      {slug === "hapi-art" && (
        <section className="px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <BottomCTA 
              title="Ready to apply a proven 10×-ready system to your store?"
              body="Let's review your ads, landing flow, and tracking to uncover the next 2–3 profit levers."
            />
          </div>
        </section>
      )}
      
      {/* Bottom CTA - Only for Mandali Retreats */}
      {slug === "mandali-retreats" && (
        <section className="px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <BottomCTA 
              title="Ready to apply a proven growth system to your retreat?"
              body="Let's review your ads, landing flow, and tracking to find the next 2–3 booking levers."
            />
          </div>
        </section>
      )}
      
      {/* Bottom CTA - Only for Lisa Nichols */}
      {slug === "lisa-nichols" && (
        <section className="px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <BottomCTA 
              title="Ready to scale your brand with a proven growth framework?"
              body="Let's review your ads, funnels, and tracking to uncover the next 2–3 high-impact wins."
            />
          </div>
        </section>
      )}

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