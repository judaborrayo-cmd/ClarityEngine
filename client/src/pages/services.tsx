import RetainerPartnership from "@/components/RetainerPartnership";
import CampaignWorkGallery from "@/components/CampaignWorkGallery";
import { useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "react-router-dom";
import { Check, X } from "lucide-react";
import ServicesAtAGlance from "@/components/ServicesAtAGlance";
import ServicesJourneyVideo from "@/components/ServicesJourneyVideo";
import ServiceOptionVideo from "@/components/ServiceOptionVideo";
import { strategySprintOffer } from "@shared/strategy-sprint-offer";
import { questionnaire } from "@shared/marketing-clarity-audit/scoring";
import { servicesPageCopy } from "@/lib/services-page-copy";
import assessment from "@shared/marketing-clarity-audit/report-content.json";
import "./services.css";

const examples = [
  { title: "Angermeyer Waterfront Inn", tag: "Boutique hospitality · Landing-page concept", image: "angermeyer", href: "/concepts/angermeyer.html", copy: "Help potential guests picture their stay and find the right room. This page concept brings the waterfront setting, island heritage, and booking journey together." },
  { title: "Art of Living Retreat Center", tag: "Wellness · Opt-in concept", image: "art-of-living", href: "/concepts/art-of-living.html", copy: "Connect a specific wellness concern with a reason to learn more. This opt-in concept gives visitors a focused message and a clear next step." },
  { title: "Galápagos Island", tag: "Cruise planning · Campaign landing page", image: "galapagos-island", href: "https://book.galapagosisland.net/galapagos-island-home/", copy: "Help travelers move from researching the islands to planning a trip, with destination expertise, reassurance, and a direct inquiry path." },
  { title: "La Selva Jungle Lodge", tag: "Luxury hospitality · Amazon experience", image: "la-selva", href: "https://book.laselvajunglelodge.com/", copy: "Show what a stay in the rainforest could feel like, answer practical travel questions, and make it easy to ask about availability." },
  { title: "Golden Galápagos Cruises", tag: "Campaign landing page · Ecuador travel", image: "golden-galapagos", href: "https://book.goldengalapagoscruises.com/luxury-ecuador-vacation-package-lp-test/", copy: "Connect the appeal of a luxury voyage with the details travelers need to choose: vessels, itineraries, local expertise, and help planning their trip." },
  { title: "Luxury Cruises Galápagos", tag: "Cruise discovery · Page concept", image: "luxury-cruises", href: "https://luxurycruisesgalapagos.com/v2", copy: "Make cruise options easier to explore and compare. This page concept guides travelers toward a conversation with a specialist." },
];

const offers = [
  { id: "sprint", label: "Work through it together", title: "30-Day Growth Strategy Sprint", price: `$${strategySprintOffer.price}`, note: "One-time · three live sessions", copy: "Turn a specific marketing challenge into clear decisions and next actions. Work with Clarity Engine through three live sessions over 30 days.", points: ["Three live sessions focused on your priorities", "Work on offers, messaging, funnels, campaigns, or measurement", "Clear decisions and next actions you can work from"], href: "/strategy-sprint", cta: "Explore the Strategy Sprint", featured: true },
  { id: "audit", label: "Go deeper into the evidence", title: "Deep Dive Growth Audit", price: "$3,725", note: "USD · one-time engagement", copy: "Find out what needs attention before committing more budget. Clarity Engine investigates your marketing evidence and builds a prioritized 90-day roadmap.", points: ["Written strategic findings and recommendations", "A personal findings walkthrough", "Scope shaped by agreed priorities and available evidence"], href: "/growth-clarity-audit", cta: "Explore the Deep Dive Audit", featured: true },
  { id: "assessment", label: "Find your starting point", title: "Get Clarity Assessment", price: `$${assessment.product.priceCents / 100}`, note: "One-time · self-guided", copy: "Examine your marketing across six areas and get a personalized report to help you decide where to focus. Complete it at your own pace.", points: [`${questionnaire.questions.length} questions and a personalized report`, "Practical next moves when your answers reveal a clear constraint", "A Clarity Work Session and downloadable PDFs"], href: "/marketing-clarity-assesment", cta: "Explore the assessment", featured: false },
  { id: "ongoing", label: "Keep improving over time", title: "Ongoing growth support", price: "Let’s discuss fit", note: "Scope agreed around your business", copy: "Continuing help connecting paid media, conversion, measurement, and growth strategy—guided by what your business needs next.", points: ["Paid-media strategy and optimization", "Landing-page and customer-journey improvements", "Measurement, testing, and strategic direction"], href: "/#book-intro", cta: "Discuss ongoing support", featured: false },
];

export default function Services() {
  const [preview, setPreview] = useState<(typeof examples)[number] | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const previewTrigger = useRef<HTMLButtonElement | null>(null);
  return <main className="services-page">
    <section className="services-hero services-wrap">
      <div className="services-hero-copy">
      <p className="services-eyebrow">Growth marketing for retreats, travel, hospitality &amp; wellness</p>
      <h1>Give your marketing the expertise<br /><em>and capacity to move forward.</em></h1>
      <p className="services-lead">Clarity Engine connects strategy, advertising, landing pages, and measurement to help turn more interest into inquiries, bookings, and revenue. Senior marketing expertise and the latest AI tools help your team test ideas and put improvements into action faster.</p>
      <div className="services-actions"><a href="#services" className="services-button">Explore how we help</a></div>
      <p className="services-proof">12+ years of growth marketing experience · $5M+ in ad spend managed</p></div><ServicesJourneyVideo />
    </section>

    <ServicesAtAGlance heading="Make the pieces of your marketing work together." subheading="Reach the right people, give them a reason to choose you, and measure what happens next. Explore where Clarity Engine can help." note={null} content={servicesPageCopy} />

    <section id="next-move" className="services-wrap services-final">
      <h2>Start with the support<br /><em>your business needs now.</em></h2>
      <div className="services-next">
        <article><ServiceOptionVideo name="services-sprint-bridge" label="runner jumping a bridge" /><Link to="/strategy-sprint"><span>I need expert help with a specific challenge.</span><strong>Explore the Strategy Sprint </strong></Link></article>
        <article><ServiceOptionVideo name="services-audit-mechanic" label="mechanic fine-tuning a sports car" /><Link to="/growth-clarity-audit"><span>I need to understand what’s holding performance back.</span><strong>Explore the Deep Dive Audit </strong></Link></article>
        <article><ServiceOptionVideo name="services-assessment-dragon" label="dragon igniting a giant match" /><Link to="/marketing-clarity-assesment"><span>I want a clearer starting point on my own.</span><strong>Explore the assessment </strong></Link></article>
      </div>
      <p className="services-intro">Need someone to lead the work and help implement it? <Link to="/growth-partnership" className="services-text-link">Explore the Growth Partnership</Link></p>
    </section>

    <CampaignWorkGallery pages={examples} onPreview={(example,trigger) => { previewTrigger.current = trigger; setZoomed(false); setPreview(example); }} />

    <RetainerPartnership />

    <section id="starting-points" className="services-offers-section">
      <div className="services-wrap">

        <h2>Choose a clearer starting point.<br /><em>Know what comes with it.</em></h2>
        <p className="services-intro">A self-guided assessment, focused working sessions, or a deeper investigation. Compare the scope and investment, then choose the support that fits your next decision.</p>
        <div className="services-offers">{[offers[2], offers[0], offers[1]].map(offer => <article id={offer.id} key={offer.id} className={`services-offer ${offer.id === "sprint" ? "services-offer-featured" : ""}`}>
          <div className="services-plan-heading"><h3>{offer.title}</h3><p className="services-plan-copy">{offer.copy}</p></div>
          <p className="services-price">{offer.price}<span>{offer.note}</span></p>
          <Link to={offer.href} className={`services-button ${offer.id !== "sprint" ? "services-button-outline" : ""}`}>{offer.cta}</Link>
          <div className="services-plan-includes"><p>What’s included</p><ul>{offer.points.map(point => <li key={point}><Check size={18} aria-hidden="true" /><span>{point}</span></li>)}</ul></div>
        </article>)}</div>
      </div>
    </section>
    <section className="services-wrap services-ongoing" aria-labelledby="ongoing-heading">
      <div><h2 id="ongoing-heading">Ready to put your next<br /><em>growth opportunity to work?</em></h2><p className="services-intro">Tell us what you’re trying to improve, where progress is getting stuck, and what your team can take on. We’ll discuss whether a Growth Partnership fits and where we could start.</p></div>
      <div className="services-ongoing-action"><p>Start with a conversation about your business.</p><Link to="/growth-partnership#consultation" className="services-button">Book a Growth Call</Link></div>
      <div className="services-retainer-animation"><ServiceOptionVideo name="retainer-growth-engine" label="ongoing strategy and execution" /></div>
    </section>

    <Dialog.Root open={preview !== null} onOpenChange={open => { if (!open) setPreview(null); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="services-preview-overlay" />
        <Dialog.Content className="services-preview-dialog" onCloseAutoFocus={event => { event.preventDefault(); previewTrigger.current?.focus(); }}>
          <header className="services-preview-header"><div><Dialog.Title>{preview?.title}</Dialog.Title><Dialog.Description>Scroll to explore this read-only page preview. Links and forms are inactive.</Dialog.Description></div><button type="button" className="services-preview-zoom" onClick={() => setZoomed(value => !value)}>{zoomed ? "Fit to width" : "Zoom in"}</button><Dialog.Close className="services-preview-close" aria-label="Close page preview"><X size={22}/></Dialog.Close></header>
          <div className="services-preview-scroll" tabIndex={0} role="region" aria-label={`${preview?.title ?? "Landing page"} scrollable preview`}><img className={zoomed ? "is-zoomed" : ""} src={preview ? `/images/services/previews/${preview.image}.webp` : undefined} alt={`${preview?.title ?? "Landing page"} full-page design. Read-only visual preview.`} draggable={false}/></div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>

  </main>;
}
