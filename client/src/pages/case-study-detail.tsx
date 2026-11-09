import ColumbusCaseStudy from "@/components/case-study/ColumbusCaseStudy";
import { Core40Hero, Core40Context, Core40Closing } from "@/components/case-study/Core40CaseFraming";
import AolCaseStudy from "@/components/case-study/AolCaseStudy";
import { HapiHero, HapiContext, HapiCreative, HapiClosing } from "@/components/case-study/HapiCaseFraming";
import { PowersHero, PowersContext, PowersCreative, PowersClosing } from "@/components/case-study/PowersCaseFraming";
import BrandCaseStory, { hasBrandCaseStory } from "@/components/case-study/BrandCaseStory";
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, TrendingUp, Users, DollarSign, Dumbbell, Heart, ShoppingCart, Plane, Package } from "lucide-react";
import { AtAGlance, MidPageCTA, BeforeAfter, BottomCTA, TestimonialIntro, StatStrip, TestimonialIntroLine, ProfitableAdvertisingCard, LisaNicholsTestimonialIntroLine } from "@/components/case-study/ConversionComponents";
import core40PortfolioImage from "@assets/Core40-Image_1761608258683.png";
import powersGymnasticsHeroImage from "@assets/Black Yellow Modern Dynamic Copywriter Online Portfolio_1763650858659.png";
import powersGymnasticsCreativeImage from "@assets/Graphic Designer Online Portfolio_1763651229848.png";

// This would typically come from an API or CMS
const caseStudyData = {
  "lamark-agency": {
    title: "Help different businesses reach the people who need them.",
    subtitle: "Lamark Media · Paid-media experience across industries",
    category: "PPC Management",
    overview: "A person searching for a fitness studio has different questions from someone choosing a healthcare provider or a logistics service. Juda’s work at Lamark brought paid-media analysis and campaign management to that range of needs, with responsibility for significant advertising budgets and collaboration across the agency team.",
    challenge: "Multiple client accounts meant different audiences, offers, conversion goals, and business constraints. Effective management depended on understanding each customer decision while keeping budget reviews and campaign analysis consistent enough for the team to act on.",
    solution: [
      "Adapt search themes and campaign structure to each client’s offer and audience.",
      "Review spend and conversion reporting in the context of each account’s goals.",
      "Share campaign findings with colleagues so analysis informs the next practical change.",
      "Bring the discipline of agency account management into Clarity Engine’s ongoing client work."
],
    results: {
      primary: "Historical portfolio scope: $70K+ in monthly advertising spend across client accounts.",
      metrics: [
        { label: "Monthly Ad Spend", value: "$70K+", icon: DollarSign },
        { label: "Client Portfolio", value: "Multi-Industry", icon: Users },
        { label: "Industries Served", value: "10+", icon: Target },
        { label: "Performance", value: "Campaign analysis", icon: TrendingUp }
      ]
    },
    detailedResults: [{"title": "Responsibility across accounts", "description": "The historical portfolio records management of more than $70,000 in monthly advertising spend across industries. That scope required account-specific priorities and a consistent way to review performance with the agency team."}],
    strategies: [{ category: "What the work taught us", tactics: ["A consistent review process is useful; identical marketing is not. The customer, offer, and next meaningful action determine what a good campaign should do."] }],
    testimonial: {
      quote: "I had the pleasure of working with Juda during his tenure at Lamark. During his interview, I knew he would bring a different level of thinking and analysis to the team that we were needing. He did not disappoint.",
      author: "Mike Berkman, VP of Performance · Lamark Media"
    },
    tags: ["PPC Management", "Multi-Industry", "$70K Monthly Budget", "Scalable Systems", "Diverse Verticals", "Consistent Growth"],
    featured: true,
    heroImage: "/images/lamark-agency-collage.webp"
  },
  "hapi-art": {
    title: "Help more people find art they want to live with.",
    subtitle: "Hapi Art · Discovery, creative testing, and collector growth",
    category: "ROI Optimization",
    overview: "Art is a personal choice. For Hapi Art, the work helped more people discover Kristi Kohut’s colorful originals and imagine them in their own homes. Meta campaigns connected that inspiration with product discovery and a return visit, while reporting kept sales and advertising investment in view.",
    challenge: "The artwork already had a distinctive voice. The marketing needed to bring it to new collectors, help them picture the work in their space, and reconnect with people who needed time to choose. The challenge was to make that journey commercially effective without flattening the brand into a generic product ad.",
    solution: [
      "Show original artwork, expressive color, and room context as distinct creative approaches.",
      "Connect prospecting with remarketing so discovery can lead to a later purchase.",
      "Review sales, spend, clicks, and reported return together to guide campaign decisions.",
      "Reconcile platform reporting with the sales record, including offline-conversion tracking."
],
    results: {
      primary: "Historical Meta portfolio results, supported by creative testing, prospecting, and remarketing.",
      metrics: [
        { label: "Overall ROAS", value: "10×", icon: TrendingUp },
        { label: "Cold Prospecting", value: "16× ROAS", icon: Target },
        { label: "Retargeting", value: "6.9× ROAS", icon: DollarSign },
        { label: "Top Creatives", value: "5–6% CTR", icon: Users }
      ]
    },
    detailedResults: [{"title": "A dated view of collector response", "description": "October 2023 reporting records 4,341 clicks, 9 sales, and $19,605 in revenue on $1,159.21 in ad spend. The reported monthly return was 16.91×; this is a monthly total, separate from the prospecting and remarketing figures in the historical portfolio."}],
    strategies: [{ category: "What the work taught us", tactics: ["Art can earn attention before someone is ready to buy. Creative that shows the work in a home answers a different question from creative that introduces the artist’s visual world. Both belong in a considered purchase journey."] }],
    testimonial: {
      quote: "Hapi Art achieved 10× ROAS overall efficiency across the program. Cold prospecting on Meta delivered 16× ROAS, while retargeting campaigns achieved 6.9× ROAS. Top-performing creatives consistently maintained 5–6% CTR throughout the program.",
      author: "Results Summary",
      isResultsSummary: true
    },
    tags: ["10× ROAS", "16× Cold ROAS", "Meta Ads", "E-commerce", "Original Art", "Visual Marketing", "Conversion Optimization"],
    featured: true,
    videoUrl: "https://www.youtube.com/watch?v=Hlea7gYuSvw"
  },
  "lisa-nichols": {
    title: "Help an inspiring message reach people ready to act.",
    subtitle: "Lisa Nichols / Motivating the Masses · Google and YouTube",
    category: "Personal Brand Growth",
    overview: "Lisa Nichols brings the message. Paid media helps people discover it and find a clear next step. The work connected Google and YouTube campaign optimization with audience growth and lead generation, keeping the cost of reaching people and the actions they took visible alongside the creative.",
    challenge: "An inspiring video can capture attention without creating a clear path forward. The opportunity was to reach relevant audiences, connect the message to an appropriate destination, and understand which campaigns generated meaningful action at a sustainable cost.",
    solution: [
      "Coordinate Google and YouTube campaigns around discovery and response.",
      "Review creative and audience performance alongside click and conversion costs.",
      "Connect each campaign’s message to the offer and next step on its landing destination.",
      "Use regular performance reviews to guide refinements and budget decisions."
],
    results: {
      primary: "Consistent audience growth, global reach, and improved cost efficiency through systemized paid media optimization.",
      metrics: [
        { label: "Google CPC", value: "–42%", icon: DollarSign },
        { label: "CPL Efficiency", value: "+52%", icon: TrendingUp },
        { label: "YouTube Conversions", value: "+140%", icon: Target },
        { label: "Audience Expansion", value: "+25% YoY", icon: Users }
      ]
    },
    detailedResults: [{"title": "Reaching people more efficiently", "description": "The historical portfolio reports a 42% reduction in Google CPC and a 140% increase in YouTube conversions. Those measures describe different stages: the cost of a click and the volume of recorded conversion actions."}, {"title": "A wider audience", "description": "The portfolio also records 25% year-over-year audience growth and a 52% CPL-efficiency improvement. The latter label needs its original calculation before it can be interpreted as a specific reduction in lead cost."}],
    strategies: [{ category: "What the work taught us", tactics: ["Reach matters most when people can do something with the message. Click costs, lead costs, and conversions describe different parts of that journey; reviewing them together keeps attention connected to action."] }],
    testimonial: {
      quote: "",
      author: "",
      isResultsSummary: false
    },
    tags: ["–42% CPC", "+140% YouTube Conversions", "Personal Brand", "Global Growth", "+52% CPL Efficiency", "Multi-Channel"],
    featured: true,
    videoUrl: "https://youtu.be/Mv9aaF1ISXQ"
  },
  "core-40": {
    title: "Make the first class easier to choose.",
    subtitle: "Core40 · From studio discovery to membership",
    category: "Fitness Marketing",
    overview: "For someone considering a new fitness routine, the first question is often whether the studio feels right for them. Core40’s campaign work connected its distinctive training experience with local discovery, creative testing, and the path toward membership—with acquisition results kept in view.",
    challenge: "A boutique studio needs to communicate what the experience feels like before asking someone to commit. The work needed to connect relevant local audiences with a clear offer and next step, then review acquisition performance as people moved from interest toward membership.",
    solution: [
      "Bring the studio experience into audience targeting and campaign messaging.",
      "Connect creative with a clear first step for prospective members.",
      "Review lead generation and membership conversion as separate stages.",
      "Use performance analysis to refine acquisition decisions with the studio team."
],
    results: {
      primary: "Sustained membership growth and measurable ROI gains through integrated digital campaigns and refined audience targeting.",
      metrics: [
        { label: "Revenue Generated", value: "$2M+", icon: DollarSign },
        { label: "New Members", value: "11K+", icon: Users },
        { label: "Cost Per Lead", value: "–38%", icon: Target },
        { label: "Conversion Rate", value: "+26%", icon: TrendingUp }
      ]
    },
    detailedResults: [
      {
        title: "Revenue Growth",
        description: "Generated over $2M+ in total revenue through high-performing ads and conversion funnels."
      },
      {
        title: "Lead Quality",
        description: "Reduced cost per lead by 38%, increasing campaign efficiency."
      },
      {
        title: "Member Acquisition",
        description: "Added 11K+ new members through systematic retargeting and lookalike expansion."
      },
      {
        title: "Brand Strength",
        description: "Improved consistency across visuals and landing experiences, boosting trust and retention."
      }
    ],
    strategies: [{ category: "What the work taught us", tactics: ["The first class is both a customer decision and a business handoff. Marketing can help someone picture themselves in the studio; the offer, booking experience, and studio team carry that interest forward."] }],
    testimonial: {
      quote: "",
      author: "",
      isResultsSummary: false
    },
    tags: ["Boutique Fitness", "High-Performance Training", "Premium Brand", "Community Building", "Athletic Performance", "Membership Growth"],
    featured: true,
    videoUrl: "https://www.youtube.com/watch?v=OMR1fsCbzTY",
    portfolioImage: core40PortfolioImage
  },
  "steel-fit-usa": {
    title: "Help shoppers find the right next step for their fitness goals.",
    subtitle: "SteelFit USA · Product discovery and return visits",
    category: "Paid Media",
    overview: "SteelFit’s advertising connected product discovery with reasons to return and buy. The original campaign export shows a mix of product-led creative, catalogs, promotions, prospecting, and retargeting. That gives the case study something concrete to examine: how an interested shopper moves from an ad to a purchase.",
    challenge: "Different shoppers arrive with different levels of familiarity. A new visitor needs a reason to explore the product; someone who has already shown interest may need a reminder or a relevant offer. Campaign structure and creative needed to reflect those differences, with purchases and spend used to judge performance.",
    solution: [
      "Use product-led creative and catalog formats to support discovery.",
      "Separate prospecting and retargeting so messages reflect the shopper’s relationship with the brand.",
      "Compare promotional and evergreen creative using purchase results and spend.",
      "Review grouped creative results without treating them as account-wide performance."
],
    results: {
      primary: "One evergreen retargeting creative group · January 1–July 31, 2020 · original Meta export",
      metrics: [
        { label: "Website purchases", value: "432", icon: ShoppingCart },
        { label: "Unique link clicks", value: "1,223", icon: Users },
        { label: "Purchase ROAS", value: "7.83×", icon: TrendingUp },
        { label: "Ad spend", value: "$3,346.27", icon: DollarSign }
      ]
    },
    detailedResults: [{"title": "Interest translated into recorded purchases", "description": "The selected evergreen retargeting group recorded 1,223 unique link clicks and 432 website purchases. These are separate platform metrics, not a cohort conversion rate."}, {"title": "A defined return on a defined investment", "description": "The same group recorded $3,346.27 in spend and 7.83× purchase ROAS during January–July 2020. Its scope is the grouped creative entry; it does not represent all SteelFit advertising."}],
    strategies: [{ category: "What the work taught us", tactics: ["The export shows why the role of the creative matters. Evergreen retargeting, product discovery, and promotional campaigns address different moments in the buying journey; their returns should be read in that context."] }],
    testimonial: { quote: "", author: "", isResultsSummary: false },
    tags: ["Paid Media", "Fitness Equipment", "Audience Segmentation", "Growth Strategy", "Performance Marketing", "Customer Acquisition"],
    featured: true,
    videoUrl: "https://www.youtube.com/watch?v=CKo1HNxanuk"
  },
  "mandali-retreats": {
    title: "Help the right guests find their next retreat.",
    subtitle: "Mandali · Search discovery, remarketing, and completed bookings",
    category: "Wellness Marketing",
    overview: "Choosing a retreat begins with a personal intention: time to pause, practice, or experience a different pace. For Mandali, Google Search helped people find relevant retreat experiences, while Meta reconnected with people who already knew the center. The results show the commercial value of that connected journey.",
    challenge: "Guests do not always book on their first visit. Search, retreat-specific promotions, and remarketing needed to work together while reporting distinguished completed purchases from earlier steps such as adding a retreat to a cart.",
    solution: [
      "Use branded Search to serve people looking for Mandali and non-branded Search to reach people exploring retreat options.",
      "Reconnect with interested visitors through Meta remarketing and selected retreat-specific promotions.",
      "Review completed purchases and recorded purchase revenue alongside advertising spend.",
      "Use campaign mix, demand, and retreat capacity to guide selective budget decisions."
],
    results: {
      primary: "Completed-purchase reporting · January–September 2026 · revised October 9 performance review",
      metrics: [
        { label: "Google purchase revenue", value: "$261,440", icon: DollarSign },
        { label: "Google ROAS", value: "32.3×", icon: TrendingUp },
        { label: "Meta purchase revenue", value: "$334,971", icon: DollarSign },
        { label: "Meta ROAS", value: "20.1×", icon: TrendingUp }
      ]
    },
    detailedResults: [{"title": "A record across two reporting periods", "description": "The revised review records 2025 purchase ROAS of 21.6× for Google and 16.8× for Meta. For January–September 2026, those figures were 32.3× and 20.1× respectively. These are platform-reported periods, not a controlled lift comparison."}, {"title": "Discovery takes more than one form", "description": "In July 2026, Google recorded 27 purchases: 17 branded, 6 non-branded, and 4 retreat-specific. August recorded 24: 20 branded, 1 non-branded, and 3 retreat-specific. The mix shows why branded demand and new discovery need separate review."}],
    strategies: [{ category: "What the work taught us", tactics: ["Search can introduce a future guest and also replenish the audience remarketing reaches later. The channels have different roles, so their results should inform a coordinated decision rather than be added together as unique revenue."] }],
    testimonial: {
      quote: "Juda is an exciting person to work with - his passion for tackling problems and facing challenges is a joy to experience. Juda is constantly learning, which means his work is always on the cutting edge of innovation - an invaluable skill in the world of digital media strategy.",
      author: "Beth Amant, Founder & Chief Creative"
    },
    tags: ["16.5× Social ROAS", "29.06× Search ROAS", "Luxury Wellness", "Meta Advertising", "Google Search", "Remarketing Funnels", "Conversion Tracking"],
    featured: true,
    videoUrl: "https://www.youtube.com/watch?v=g7yVF5F6l9s"
  },
  "fitness-roi": {
    title: "Connect fitness discovery with the decision to join.",
    subtitle: "Fitness acquisition · Historical portfolio results",
    category: "Revenue Growth",
    overview: "Fitness marketing starts with a person looking for a routine, a challenge, or a place to belong. This portfolio summary keeps the reported revenue and member-acquisition results visible while explaining the journey behind them: discovery, inquiry, and the decision to join.",
    challenge: "Revenue and membership totals are useful outcomes, but they do not explain where people hesitate or which next step needs attention. A useful growth review connects those totals to the offer, campaign experience, and enrollment process.",
    solution: [
      "Connect campaign messaging with the reasons people consider joining.",
      "Review the path from first interest to membership.",
      "Keep revenue, member acquisition, and advertising costs visible together.",
      "Use those findings to prioritize the next campaign or conversion improvement."
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
    testimonial: { quote: "", author: "", isResultsSummary: false },
    tags: ["$2M Revenue", "11K Members", "Fitness Marketing", "ROI Maximization"],
    featured: true
  },
  "powers-gymnastics": {
    title: "From first click to first class.",
    subtitle: "Powers Gymnastics · Helping more local families take the next step",
    category: "Gyms & Youth Programs",
    overview: "For parents, a gymnastics class can mean a place for their child to build confidence, make friends, and try something new. Across Powers locations, the work connected those motivations with local campaigns, seasonal creative, and a clearer view of leads, trials, and enrollments.",
    challenge: "Each location serves different families and has its own programs and personality. Seasonal camps and ongoing classes need different messages, while the team needs to know whether new inquiries become booked trials, attended classes, and enrollments.",
    solution: [
      "Coordinate Google and Meta campaigns around local programs and seasonal demand.",
      "Develop creative around confidence, belonging, and skill development.",
      "Connect the ad message with the trial offer and landing-page experience.",
      "Review leads, attendance, and enrollment together to find where the next improvement matters."
],
    results: {
      primary: "2–3× lead growth with 50% cheaper Google CPL and record trial attendance",
      metrics: [
        { label: "Monthly Leads", value: "2–3×", icon: TrendingUp },
        { label: "Trial Attendance", value: "~2.2×", icon: Users },
        { label: "Google CPL", value: "~50% ↓", icon: DollarSign },
        { label: "Evergreen ROAS", value: "3–4×", icon: Target }
      ]
    },
    detailedResults: [
      {
        title: "Lead Generation at Scale",
        description: "Monthly leads increased from 250–300 to 650–900+, with record months reaching 855 in July and 924 in August—a sustained 2–3× growth across all locations"
      },
      {
        title: "Trial & Enrollment Engine",
        description: "Trial attendance rose from approximately 350 per month to 785 at the August peak (about 2.2×), while enrollments grew 2.3× (from ~180/month to 400–550/month, peaking at 555)"
      },
      {
        title: "Acquisition Cost Efficiency",
        description: "Google Ads cost per lead dropped nearly 50% from ~$52 to ~$28, dramatically improving budget efficiency and increasing lifetime value to CAC ratios"
      },
      {
        title: "Evergreen Revenue Systems",
        description: "Achieved 3–4× ROAS on evergreen Google campaigns during summer months, with seasonal and evergreen systems working together to maintain consistent growth year-round"
      }
    ],
    strategies: [{ category: "What the work taught us", tactics: ["A lead is the start of a family’s decision. Looking at attended trials and enrollment alongside campaign volume makes it easier to see whether the marketing is helping more children reach their first class."] }],
    testimonial: {
      quote: "",
      author: ""
    },
    tags: ["2–3× Leads", "50% Cheaper CPL", "Multi-Location", "Youth Programs", "Google Ads", "Meta Advertising", "Funnel Optimization"],
    featured: true,
    heroImage: powersGymnasticsHeroImage,
    portfolioImage: powersGymnasticsCreativeImage
  }
};

const resultContext: Record<string, string> = {
  "hapi-art": "Historical portfolio results above retain their original scope labels. The monthly KPI sheet independently records October 2023 revenue of $19,605 on $1,159.21 spend (16.91× reported ROAS), 9 sales, and 4,341 clicks. That monthly total is distinct from the historical 16× cold-prospecting figure. ROAS measures attributed revenue relative to ad spend, not profit.",
  "powers-gymnastics": "The headline figures are historical portfolio comparisons, separate from the dated trial-conversion example below. Trial attendance of approximately 350 rising to 785 is about 2.2×; baseline dates and location mix are not established here. These are observed business outcomes, not an isolated estimate of advertising impact.",
  "core-40": "Historical portfolio figures retained from the existing case study. The original reporting period and attribution definitions are not specified; the matching Fitness ROI summary is not a separate result to add to these totals.",
  "fitness-roi": "Historical portfolio summary. These totals also appear on Core40; engagement scope and reporting period need confirmation before treating them as independent results.",
  "lisa-nichols": "Historical portfolio comparisons retained from the existing case study. Baseline dates, attribution windows, and the definition of “CPL efficiency” are not available in this summary; the figures should be read as reported historical results.",
  "lamark-agency": "Professional experience at Lamark Media. Budget responsibility describes scope, not revenue or return. The work and client outcomes reflect the agency team’s collaboration.",
  "mandali-retreats": "The revised October 9, 2026 review uses completed purchases and recorded purchase revenue. Google spend was $8,082; Meta spend was $16,663 for January–September 2026. Platform attribution can overlap; do not add these revenues as unique sales. For context, 2025 reported ROAS was 21.6× for Google and 16.8× for Meta.",
  "steel-fit-usa": "Source: original SteelFit creative export, January 1–July 31, 2020. Figures describe “EVERGREEN - DYNAMIC-SLIDE-SHOW-RTG; …and 5 more ads,” one grouped entry, not the whole account or a single ad. Website purchases are not distinct customers; the export separately records 393 unique purchases."
};

const otherCaseStudies = [
  { id: "lamark-agency", title: "Growth Across Industries", category: "PPC Management" },
  { id: "hapi-art", title: "Building a Profitable 10X ROAS", category: "ROI Optimization" },
  { id: "steel-fit-usa", title: "Steel Fit USA", category: "Paid Media" },
  { id: "mandali-retreats", title: "Crafting Success: Mandali Retreats", category: "Wellness Marketing" },
  { id: "fitness-roi", title: "Maximizing ROI in Fitness", category: "Revenue Growth" },
  { id: "powers-gymnastics", title: "Scaling Powers Gymnastics: 2–3× More Leads Across Locations", category: "Gyms & Youth Programs" }
];

// Helper function to convert YouTube URL to embed URL
function getYouTubeEmbedUrl(url: string): string {
  const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
}

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();

  if (slug === "art-of-living-retreat-center") return <AolCaseStudy />;
  if (slug === "columbus-travel") return <ColumbusCaseStudy/>;
  if (slug && !caseStudyData[slug as keyof typeof caseStudyData] && hasBrandCaseStory(slug)) return <BrandCaseStory key={slug} slug={slug}/>;

  if (!slug || !caseStudyData[slug as keyof typeof caseStudyData]) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Case Study Not Found</h1>
          <Link to="/case-studies" className="text-primary hover:underline">
             Back to Case Studies
          </Link>
        </div>
      </div>
    );
  }

  const study = caseStudyData[slug as keyof typeof caseStudyData];
  const isBrandedStudy = slug === "powers-gymnastics" || slug === "hapi-art" || slug === "core-40";
  const relatedStudies = otherCaseStudies.filter(s => s.id !== slug).slice(0, 3);

  return (
    <div className={`min-h-screen bg-background ${isBrandedStudy ? "powers-hybrid" : ""} ${slug === "hapi-art" ? "hapi-hybrid" : ""}`}>
      {/* Header */}
      {slug === "powers-gymnastics" ? <PowersHero /> : slug === "hapi-art" ? <HapiHero overview={study.overview}/> : slug === "core-40" ? <Core40Hero overview={study.overview}/> : <>
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
            data-testid="back-to-case-studies"
          >

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
                  { k: "20.1× ROAS", v: "Meta · Jan–Sep 2026" },
                  { k: "32.3× ROAS", v: "Google · Jan–Sep 2026" },
                  { k: "16.8× ROAS", v: "Meta · 2025" },
                  { k: "21.6× ROAS", v: "Google · 2025" },
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

          {/* StatStrip - Only for Core40 */}
          {slug === "core-40" && (
            <div className="mx-auto max-w-4xl">
              <StatStrip
                items={[
                  { k: "$2M+", v: "Revenue generated" },
                  { k: "11K+", v: "New members acquired" },
                  { k: "–38%", v: "Reduction in cost per lead" },
                  { k: "+26%", v: "Improved lead-to-member conversion rate" },
                ]}
              />
            </div>
          )}
        </div>
      </section>

      </>}

      {/* Hero Image Section */}
      {slug !== "powers-gymnastics" && (study as any).heroImage && (
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
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{resultContext[slug || ""]}</p>

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
                These e-commerce learnings now inform how Clarity Engine supports other shops—connecting creative, the buying journey, and measurement.
              </p>
              <MidPageCTA
                title="What could this look like for your business?"
                body="Explore strategy, paid media, and creative support shaped around your next stage of growth."
                href="/services"
                buttonLabel="How We Help"
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

          {/* Mid Page CTA - Only for Core40 */}
          {slug === "core-40" && (
            <>
              <p className="text-center text-gray-700 dark:text-gray-300 mt-8 mb-4">
                These outcomes demonstrate how Clarity Engine helps fitness brands scale efficiently with creative testing and precise audience segmentation.
              </p>
              <MidPageCTA
                title="Curious what this could look like for your fitness brand?"
                body="Book a Strategic Intro Call — get a quick teardown of your current setup and the fastest wins."
              />
            </>
          )}
        </div>
      </section>

      {/* Challenge & Solution */}
      {slug === "powers-gymnastics" ? <PowersContext challenge={study.challenge} solutions={study.solution} /> : <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {slug === "hapi-art" ? <HapiContext challenge={study.challenge} solutions={study.solution}/> : slug === "core-40" ? <Core40Context challenge={study.challenge} solutions={study.solution}/> : <div className="grid md:grid-cols-2 gap-12">
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

          }
          {/* Before After - Only for Lamark Agency */}
          {slug === "lamark-agency" && (
            <BeforeAfter />
          )}

          {/* Profitable Advertising Card & Verified Metrics - Only for Hapi Art */}
          {slug === "hapi-art" && (
            <>
              <HapiCreative />
              <ProfitableAdvertisingCard />

            </>
          )}

          {/* Before After - Only for Hapi Art */}
          {slug === "hapi-art" && (
            <BeforeAfter
              rows={[
                { before: "One-off creatives, little iteration", after: "Creative testing sprints with winners rolled out" },
                { before: "Shallow retargeting pools", after: "Remarketing that reconnects with interested visitors" },
                { before: "Unclear ROAS and budget confidence", after: "Sales and advertising spend reviewed together" },
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
                { before: "Search mixed low/high intent", after: "Separate branded, non-branded, and retreat-specific Search" },
                { before: "Social spend lacked reliability", after: "Meta remarketing reviewed against completed purchases" },
              ]}
              title="Before vs After (Retreats Growth System)"
            />
          )}

          {/* Before After - Only for Lisa Nichols */}
          {slug === "lisa-nichols" && (
            <BeforeAfter
              rows={[
                { before: "Disconnected brand channels", after: "Unified Google + YouTube strategy" },
                { before: "Rising ad costs & inconsistent conversions", after: "–42% CPC reduction and higher CTR" },
                { before: "Limited global reach", after: "Expanded international visibility" },
                { before: "Unclear funnel hand-offs", after: "Streamlined journey from ad to booking" },
                { before: "Irregular campaign performance", after: "Consistent weekly optimization cycles" },
              ]}
              title="Before vs After (Personal Brand Growth System)"
            />
          )}

          {/* Before After - Only for Core40 */}
          {slug === "core-40" && (
            <BeforeAfter
              rows={[
                { before: "High cost per lead and inconsistent ads", after: "–38% CPL with optimized tracking" },
                { before: "Limited new member flow", after: "11K+ new members reported in the historical portfolio" },
                { before: "Fragmented local targeting", after: "Unified strategy across high-performing regions" },
                { before: "Lack of brand consistency", after: "Strong positioning as a premium fitness experience" },
                { before: "Low conversion from lead to member", after: "+26% conversion-rate improvement reported in the portfolio" },
              ]}
              title="Before vs After (Fitness Growth Framework)"
            />
          )}
        </div>
      </section>

      }

      {slug === "powers-gymnastics" && <section className="px-6 py-12 lg:px-8"><div className="mx-auto max-w-4xl"><img src={powersGymnasticsHeroImage} alt="Powers Gymnastics multi-location campaign overview and growth results" className="w-full h-auto rounded-2xl" loading="lazy"/></div></section>}

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

      {/* Portfolio Image Section - Powers Gymnastics & Core 40 */}
      {(study as any).portfolioImage && (
        <section className="px-6 py-12 lg:px-8 bg-muted/30">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              {slug === "core-40" && <div className="p-6 sm:p-8"><h2>Something you can see.</h2><p className="text-muted-foreground">The existing Core40 and Ascend portfolio presentation connects the creative direction with the wider growth-marketing approach.</p></div>}
              <img
                src={(study as any).portfolioImage}
                alt={slug === "powers-gymnastics" ? "Powers Gymnastics Creative - Professional Photography & Ad Formats" : "Core40 and Ascend Portfolio - Growth Marketing, Omnichannel, Creative Direction"}
                className="w-full h-auto"
                data-testid="case-study-portfolio-image"
              />
            </div>
          </div>
        </section>
      )}

      {slug === "powers-gymnastics" && <PowersCreative />}

      {/* Strategies & Tactics - Only for Mandali */}
      {(study as any).strategies && (
        <section className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Tactics & Strategies</h2>
            <div className={isBrandedStudy ? "powers-story-tactics" : "space-y-8"}>
              {(study as any).strategies.map((strategy: any, index: number) => (
                <div key={index} className={isBrandedStudy ? "powers-story-tactic-card" : "border-l-4 border-primary pl-6"}>
                  {isBrandedStudy && <span className="powers-story-tactic-number" aria-hidden="true">0{index + 1}</span>}
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

      {/* Testimonial / Results Summary */}
      {/* Testimonial / Results Summary */}
      {study.testimonial.quote && (
        <section className="px-6 py-16 lg:px-8 bg-muted/30">
          <div className="mx-auto max-w-4xl text-center">
            {slug === "lamark-agency" && <TestimonialIntro />}
            {slug === "hapi-art" && <TestimonialIntroLine />}
            {slug === "mandali-retreats" && <TestimonialIntroLine />}
            {slug === "lisa-nichols" && <LisaNicholsTestimonialIntroLine />}

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
              title="Help more people discover what makes your brand worth choosing."
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

      {/* Bottom CTA - Only for Core40 */}
      {slug === "core-40" && (
        <section className="px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <BottomCTA
              title="Ready to grow your studio with a proven fitness marketing framework?"
              body="Let's review your ads, funnels, and tracking to identify the next 2–3 high-impact wins."
            />
          </div>
        </section>
      )}

      {slug === "powers-gymnastics" && <PowersClosing />}
      {slug === "hapi-art" && <HapiClosing />}
      {slug === "core-40" && <Core40Closing />}

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