import { useEffect } from "react";
import ServiceOptionVideo from "@/components/ServiceOptionVideo";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check, Search, Compass, Layers, Megaphone, ScanLine, TextSearch, MousePointerClick, Swords, ChartLine, Network, Map } from "lucide-react";
import {
  deepDiveGrowthAuditOffer as offer,
} from "@shared/deep-dive-growth-audit-offer";
import "./deep-dive-growth-audit.css";

const auditHighlights = [
  { label: "Paid Media Audit", Icon: Megaphone, color: "#6844d9", tint: "#f2edff" },
  { label: "Tracking Audit", Icon: ScanLine, color: "#28775c", tint: "#eaf7f0" },
  { label: "Message Audit", Icon: TextSearch, color: "#ad477c", tint: "#fff0f7" },
  { label: "Conversion Experience Audit", Icon: MousePointerClick, color: "#287888", tint: "#edf8fb" },
  { label: "Competitive Strategy", Icon: Swords, color: "#a46922", tint: "#fff7e9" },
  { label: "Measurement & Learning", Icon: ChartLine, color: "#4c59c3", tint: "#eef0ff" },
  { label: "Marketing Channel Analysis", Icon: Network, color: "#28775c", tint: "#eaf7f0" },
  { label: "90-day roadmap", Icon: Map, color: "#6844d9", tint: "#f2edff" },
];

const deliverables = [
  { title: "Your Strategic Growth Blueprint", copy: "A tailored written investigation connecting evidence, business implications, prioritized recommendations and the decisions ahead." },
  { title: "Tangible strategic development", copy: "Selected recommendations developed into agreed concepts, copy, structures, functional variations or specifications—chosen for your circumstances, not a standard asset bundle." },
  { title: "Your prioritized 90-day roadmap", copy: "A practical implementation sequence with dependencies, suggested responsibilities, validation KPIs and decisions about what to test, improve or defer." },
  { title: "Strategy walkthrough", copy: "Work through the findings, tangible development and next steps so your team or chosen partners can act with context." },
];
const investigation = [
  {
    number: "01",
    title: "Business & competitive landscape",
    summary: "Understand the business behind the campaigns.",
    items: [
      "Business model, acquisition economics, offers and differentiation",
      "Competitor messaging, positioning, advertising and creative",
      "Opportunities suggested by publicly observable market activity",
    ],
  },
  {
    number: "02",
    title: "Advertising & acquisition",
    summary: "See the role each channel plays.",
    items: [
      "Relevant Google, Meta, Instagram, YouTube and other acquisition activity",
      "Campaign structure, keyword strategy, targeting and objectives",
      "Performance indicators and coordination across the customer journey",
    ],
  },
  {
    number: "03",
    title: "Creative, messaging & conversion",
    summary: "Follow the path from attention to action.",
    items: [
      "Hooks, creative effectiveness, offers and messaging consistency",
      "Landing pages, website experience and calls to action",
      "Stronger testing opportunities and appropriate AI-assisted workflows",
    ],
  },
  {
    number: "04",
    title: "Email, follow-up & measurement",
    summary: "Look beyond the first click.",
    items: [
      "Relevant lead capture, email, nurture and follow-up sequences",
      "Conversion tracking, analytics and attribution limitations",
      "Reporting consistency, useful KPIs and decision-making processes",
    ],
  },
];
const stages = [
  {
    icon: Search,
    title: "Investigate",
    copy: "Examine your business, competitive landscape, and relevant marketing systems using available evidence and authorized read-level access.",
  },
  {
    icon: Layers,
    title: "Identify",
    copy: "Connect the observations. Separate confirmed findings from hypotheses and prioritize opportunities by importance, feasibility, evidence, and dependencies.",
  },
  {
    icon: Compass,
    title: "Strategize",
    copy: "Develop selected recommendations into tangible work products and a practical 90-day roadmap, with focused tests, useful KPIs and clear dependencies.",
  },
];
const faqs = [
  [
    "What will you investigate?",
    "We agree the priorities around your business, available evidence and relevant marketing systems. The scope depends on those priorities and authorized access; it is not an exhaustive inspection of every asset, record or competitor.",
  ],
  [
    "Does the Audit include implementation?",
    "Every Audit includes investigation, a Strategic Growth Blueprint, selected tangible strategic development, a 90-day roadmap and a strategy walkthrough. The work products follow your agreed scope. Publishing websites, activating campaigns, integrations, ongoing management and executing the roadmap require a separate agreement.",
  ],
  [
    "Can my team use the strategy independently?",
    "Yes. You can execute the recommendations internally, assign them to another provider, or discuss a separate engagement with Clarity Engine. Further services are optional.",
  ],
  [
    "What if the evidence is incomplete?",
    "We identify the limitations, distinguish hypotheses from findings, and explain what additional evidence or testing would make the next decision stronger.",
  ],
  [
    "How is AI involved?",
    "Experienced human strategic judgment decides what deserves attention and what should be created. AI expands our ability to research, analyze, write, design and build sophisticated demonstrations. A functional concept is not automatically production-ready or evidence of improved performance.",
  ],
  [
    "How long does the Audit take?",
    "Proposed delivery is approximately three weeks after complete onboarding and sufficient authorized access, with a normal extended window of approximately five weeks where needed. Timing exceptions are communicated.",
  ],
  [
    "How do you keep the scope clear?",
    "A short engagement-specific scope confirmation identifies the selected brands, locations, markets, channels, conversion journeys, competitors, evidence and tangible work products. Research, creative production, functional development and revisions are bounded by that agreement.",
  ],
  [
    "Do I need a consultation before purchasing?",
    "No. Request a conversation about your Audit or choose a complimentary fit conversation. No Assessment, paid consultation or Sprint purchase is required. Online purchasing remains unavailable until payment verification, onboarding and commercial terms are finalized.",
  ],
  [
    "Will this guarantee more revenue or a higher ROAS?",
    "No. The Audit gives you an evidence-led strategy and priorities. Outcomes depend on implementation, market conditions and the evidence available.",
  ],
];
function StartLink() {
  return (
    <a className="dda-button" href="mailto:Juda.Borrayo@gmail.com?subject=Deep%20Dive%20Growth%20Audit%20enquiry">
      Discuss Your Deep Dive Audit <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  );
}

export default function GrowthClarityAudit() {
  useEffect(() => {
    const root = document.documentElement;
    const navigation = document.querySelector<HTMLElement>('nav[aria-label="Main navigation"]');
    const previousOffset = root.style.getPropertyValue("--audit-navigation-offset");
    root.classList.add("audit-sales-view");
    const measure = () => root.style.setProperty("--audit-navigation-offset", `${Math.max(125, (navigation?.getBoundingClientRect().height ?? 102) + 16)}px`);
    measure();
    const observer = new ResizeObserver(measure);
    if (navigation) observer.observe(navigation);
    return () => {
      observer.disconnect();
      root.classList.remove("audit-sales-view");
      if (previousOffset) root.style.setProperty("--audit-navigation-offset", previousOffset);
      else root.style.removeProperty("--audit-navigation-offset");
    };
  }, []);
  return (
    <main className="dda-page">
      <section className="dda-wrap dda-hero">
        <div>
          <p className="dda-eyebrow">Deep Dive Growth Audit</p>
          <h1>
            See the whole picture.
            <br />
            <em>Know your next move.</em>
          </h1>
          <p className="dda-lead">
            For established or ambitious businesses ready to move forward.
          </p>
          <p>
            Understand what is working, what is underperforming, and what may be
            broken. Turn your most important opportunities into tangible
            strategies and a prioritized 90-day implementation roadmap.
          </p>
          <p className="dda-promise">
            Don't just recommend what's possible. Make it tangible.
          </p>
          <p className="dda-price">
            {offer.priceLabel} <span>USD · one-time</span>
          </p>
          <div className="dda-actions">
            <StartLink />
            <a className="dda-text-link" href="mailto:Juda.Borrayo@gmail.com?subject=Deep%20Dive%20Growth%20Audit%20fit%20conversation">
              Request a Complimentary Fit Conversation ↗
            </a>
            <a className="dda-text-link" href="#included">
              Explore What's Included ↓
            </a>
          </div>
          <p className="dda-note">
            Online purchasing is not yet available. Contact us to discuss fit and scope.
          </p>
        </div>
        <div className="dda-system dda-artwork">
          <ServiceOptionVideo name="audit-painter-action" label="artist painting the Colosseum then riding into action" />
        </div>
      </section>
      <section className="dda-highlights" aria-labelledby="audit-highlights-title">
        <div className="dda-wrap">
          <h2 id="audit-highlights-title">A complete view. A focused <span className="dda-nowrap">90-day plan.</span></h2>
          <ul className="dda-highlight-grid">{auditHighlights.map(({ label, Icon, color, tint }) => <li key={label} style={{ color, background: tint }}><Icon size={23} aria-hidden="true" /><span>{label}</span></li>)}</ul>
        </div>
      </section>
      <section id="marketing-alignment" className="dda-band">
        <div className="dda-wrap dda-alignment">
          <div className="dda-orchestra"><img src="/videos/audit-orchestra-poster.webp" alt="A conductor coordinating a chamber orchestra, illustrating marketing, strategy, and sales working in harmony." width="1672" height="941" loading="lazy" decoding="async" /></div>
          <div>
            <p className="dda-eyebrow">Working in harmony</p>
            <h2>Align your <em>marketing, strategy, and sales.</em></h2>
            <p className="dda-alignment-copy">Your ads, website, tracking, and sales follow-up should support the same direction. The Deep Dive Growth Audit examines how they work together, then turns the findings into coordinated priorities and a practical 90-day roadmap.</p>
          </div>
        </div>
      </section>
      <section className="dda-map-section" id="investigation">
        <div className="dda-map-motion">
          <ServiceOptionVideo name="audit-mountain-team" label="team mountain expedition" />
        </div>
        <div className="dda-wrap dda-section dda-map-content">
        <p className="dda-eyebrow">What we investigate</p>
        <h2>
          Real business context.
          <br />
          <em>Relevant evidence.</em>
        </h2>
        <p className="dda-section-intro">
          We focus on the systems that matter to your priorities, rather than
          treating every account as the same checklist.
        </p>
        <div className="dda-investigation">
          {investigation.map((area) => (
            <article className="dda-card" key={area.number}>
              <span className="dda-number">{area.number}</span>
              <h3>{area.title}</h3>
              <p>{area.summary}</p>
              <ul>
                {area.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="dda-note">
          Exact scope depends on your business, available evidence, agreed
          priorities and authorized read-level access.
        </p>
        </div>
      </section>
      <section className="dda-band">
        <div className="dda-wrap dda-section">
          <p className="dda-eyebrow">Our methodology</p>
          <h2>
            Investigate. Identify. <em>Strategize.</em>
          </h2>
          <div className="dda-three">
            {stages.map(({ icon: Icon, title, copy }, i) => (
              <article key={title}>
                <Icon size={27} aria-hidden="true" />
                <p className="dda-eyebrow">Stage 0{i + 1}</p>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="dda-wrap dda-section" id="development">
        <p className="dda-eyebrow">Strategic thinking, made tangible</p>
        <h2>More than a list of ideas.<br /><em>Something you can work with.</em></h2>
        <p className="dda-section-intro">Every Audit includes substantive strategic development. We choose what to develop around the evidence, your circumstances and the agreed scope—not around a fixed creative package.</p>
        <div className="dda-three dda-development">
          {[
            ["Conversion & customer experience", "Landing-page concepts or functional variations, message hierarchies and funnel improvements that make a proposed customer experience clear."],
            ["Advertising & channel strategy", "Creative and copy concepts, campaign architecture or channel launch strategies that connect the offer, audience and next action."],
            ["Measurement & decisions", "Measurement specifications and test plans that explain what to track, which evidence is missing and how to judge progress."],
          ].map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
        <div className="dda-development-note"><strong>Experience drives the strategy. AI makes more possible.</strong><p>We combine years of growth marketing experience with AI-assisted research, creative development, and technical execution to turn meaningful opportunities into strategies and tangible solutions.</p></div>
        <p className="dda-note">A concept, functional variation and production implementation are different levels of work. A full website build, unlimited creative assets and live campaign launches are not standard Audit inclusions.</p>
      </section>
      <section className="dda-wrap dda-section" id="included">
        <p className="dda-eyebrow">What you receive</p>
        <h2>
          Findings you can understand.
          <br />
          <em>A Blueprint you can use.</em>
        </h2>
        <div className="dda-deliverables">
          {deliverables.map((item, i) => (
            <article key={item.title}>
              <span className="dda-number">0{i + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
              <Check size={22} aria-hidden="true" />
            </article>
          ))}
        </div>
        <p className="dda-note">
          The roadmap is yours to execute internally, with another provider, or
          through separately agreed implementation or ongoing Growth Retainer services. The Audit stands on its own; further services are optional.
        </p>
      </section>
      <section className="dda-wrap dda-section dda-fit">
        <div>
          <p className="dda-eyebrow">Who it's for</p>
          <h2>
            You have a business to grow.
            <br />
            <em>And decisions worth investigating.</em>
          </h2>
        </div>
        <div>
          <p>
            A strong fit for established businesses with meaningful acquisition
            activity, a customer journey to improve, and access to evidence that
            can inform the next stage of growth.
          </p>
          <ul>
            <li>
              You need a connected view of campaigns, conversion and
              measurement.
            </li>
            <li>
              You want priorities grounded in your business rather than another
              list of tactics.
            </li>
            <li>
              You have a team or implementation partner—or want to understand
              the expertise required.
            </li>
          </ul>
          <p className="dda-note">
            Relevant across travel, hospitality, wellness, fitness,
            multi-location, education and service businesses. Fit depends on
            your priorities and evidence, not an industry label.
          </p>
        </div>
      </section>
      <section className="dda-band">
        <div className="dda-wrap dda-section">
          <p className="dda-eyebrow">How the engagement works</p>
          <h2>
            Agree the focus. <em>Follow the evidence.</em>
          </h2>
          <ol className="dda-process">
            {[
              [
                "Context & priorities",
                "Share your business goals, acquisition context and the decisions you need help making.",
              ],
              [
                "Access & investigation",
                "Confirm the brands, locations, markets, channels, journeys, competitor set and work products. Agree appropriate read-level access and sufficient evidence before investigation.",
              ],
              [
                "Findings & roadmap",
                "Connect observations, develop the agreed tangible work products and organize the Blueprint and 90-day direction around your dependencies.",
              ],
              [
                "Personal walkthrough",
                "Work through the reasoning and next steps, including what your team can own and where additional expertise may help.",
              ],
            ].map(([title, copy], i) => (
              <li key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="dda-note">
            Proposed delivery: approximately three weeks after complete onboarding and sufficient access, with a normal extended window of approximately five weeks where needed. Timing exceptions are communicated. No account passwords or unnecessary sensitive customer information.
          </p>
        </div>
      </section>
      <section className="dda-wrap dda-section">
        <p className="dda-eyebrow">The 90-day strategy</p>
        <h2>
          A sequence that fits <em>your business.</em>
        </h2>
        <p className="dda-section-intro">
          Your roadmap connects recommendations to one another. Near-term,
          mid-term and later priorities follow your evidence and
          dependencies—not a fixed monthly recipe.
        </p>
        <div className="dda-three dda-roadmap">
          {[
            [
              "Establish the foundations",
              "Identify prerequisites, evidence gaps and the actions that make later work useful.",
            ],
            [
              "Test & improve",
              "Choose practical experiments, clarify responsibilities and define KPIs that indicate progress.",
            ],
            [
              "Build on what you learn",
              "Decide what deserves more attention, what can wait and which activities need specialist support.",
            ],
          ].map(([title, copy]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="dda-wrap dda-section">
        <p className="dda-eyebrow">Experience behind the investigation</p>
        <h2>
          The experience came first.
          <br />
          <em>AI expands what's possible.</em>
        </h2>
        <p className="dda-section-intro">
          Hands-on growth strategy, paid media, conversion and analytics
          experience informs the questions we ask. Explore the decisions and
          work behind existing engagements.
        </p>
        <div className="dda-three dda-proof">
          {[
            [
              "Mandali Retreats",
              "Luxury wellness acquisition, remarketing and offline conversion tracking.",
              "mandali-retreats",
            ],
            [
              "Powers Gymnastics",
              "Multi-location campaigns and visibility from click to trial and enrollment.",
              "powers-gymnastics",
            ],
            [
              "Growth Across Industries",
              "Campaign management, reporting and optimization frameworks developed at Lamark.",
              "lamark-agency",
            ],
          ].map(([title, copy, slug]) => (
            <Link key={slug} to={`/case-study/${slug}`}>
              <h3>{title}</h3>
              <p>{copy}</p>
              <span className="dda-text-link">Explore the case study ↗</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="dda-band">
        <div className="dda-wrap dda-section">
          <p className="dda-eyebrow">Choose the right kind of clarity</p>
          <h2>
            Different questions. <em>Different support.</em>
          </h2>
          <div className="dda-three">
            {[
              [
                "Get Clarity Assessment · $27",
                "Self-guided diagnosis based on your answers to 35 questions. A useful starting point without an account investigation.",
                "/marketing-clarity-assesment",
              ],
              [
                "Strategy Sprint · $697",
                "Three collaborative sessions over 30 days to work through priorities and practical roadblocks. A flexible live engagement.",
                "/strategy-sprint",
              ],
              [
                `${offer.name} · ${offer.priceLabel}`,
                "Expert-led investigation of actual business and marketing evidence, written findings and a 90-day roadmap.",
                "/growth-clarity-audit",
              ],
            ].map(([title, copy, path]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
                <Link className="dda-text-link" to={path}>
                  Explore this option ↗
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="dda-wrap dda-section">
        <p className="dda-eyebrow">Questions, answered</p>
        <h2>
          Before your <em>next move.</em>
        </h2>
        <div className="dda-faq">
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="dda-wrap dda-section" id="pricing">
        <div className="dda-pricing">
          <div>
            <p className="dda-eyebrow">Deep Dive Growth Audit</p>
            <h2>
              A clearer picture.
              <br />
              <em>A practical direction.</em>
            </h2>
            <p>
              Expert-led investigation, client-specific tangible development, your
              Strategic Growth Blueprint, a prioritized 90-day roadmap and a
              strategy walkthrough.
            </p>
          </div>
          <div>
            <p className="dda-price">
              {offer.priceLabel}
              <span>USD · one-time</span>
            </p>
            <StartLink />
            <a className="dda-text-link dda-fit-link" href="mailto:Juda.Borrayo@gmail.com?subject=Deep%20Dive%20Growth%20Audit%20fit%20conversation">Request a Complimentary Fit Conversation ↗</a>
            <p className="dda-note">
              Online purchasing is not yet available. No prior Assessment, paid
              consultation or Sprint purchase required.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
