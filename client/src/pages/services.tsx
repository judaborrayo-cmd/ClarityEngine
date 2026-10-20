import { useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "react-router-dom";
import { Check, ArrowUpRight, X } from "lucide-react";
import ServicesAtAGlance from "@/components/ServicesAtAGlance";
import ServicesJourneyVideo from "@/components/ServicesJourneyVideo";
import { strategySprintOffer } from "@shared/strategy-sprint-offer";
import assessment from "@shared/marketing-clarity-audit/report-content.json";
import "./services.css";

const examples = [
  { title: "Angermeyer Waterfront Inn", tag: "Boutique hospitality · Landing-page concept", image: "angermeyer", href: "/concepts/angermeyer.html", copy: "A waterfront hotel concept bringing the guest experience, island heritage, rooms, and booking journey into one cohesive story." },
  { title: "Art of Living Retreat Center", tag: "Wellness · Opt-in concept", image: "art-of-living", href: "/concepts/art-of-living.html", copy: "A focused opt-in concept built around a clear audience insight, an inviting message, and a simple next step." },
  { title: "Galápagos Island", tag: "Cruise planning · Campaign landing page", image: "galapagos-island", href: "https://book.galapagosisland.net/galapagos-island-home/", copy: "A cruise-planning page that connects destination expertise and traveler reassurance with a direct inquiry journey." },
  { title: "La Selva Jungle Lodge", tag: "Luxury hospitality · Amazon experience", image: "la-selva", href: "https://book.laselvajunglelodge.com/", copy: "An experience-led page connecting the lodge, travel styles, and rainforest activities to a clear availability inquiry." },
  { title: "Golden Galápagos Cruises", tag: "Campaign landing page · Ecuador travel", image: "golden-galapagos", href: "https://book.goldengalapagoscruises.com/luxury-ecuador-vacation-package-lp-test/", copy: "A campaign experience bringing together luxury vessels, local expertise, itinerary choices, and a trip-planning inquiry." },
  { title: "Luxury Cruises Galápagos", tag: "Cruise discovery · Page concept", image: "luxury-cruises", href: "https://luxurycruisesgalapagos.com/v2", copy: "A guided cruise-discovery experience that helps travelers compare ways to explore and take the next step with a specialist." },
];

const offers = [
  { id: "sprint", label: "Work through it together", title: "30-Day Growth Strategy Sprint", price: `$${strategySprintOffer.price}`, note: "One-time · three live sessions", copy: "Bring the decision, campaign, or marketing problem you’re working through. Build a practical way forward with Juda over 30 days.", points: ["Three live sessions focused on your priorities", "Work on offers, messaging, funnels, campaigns, or measurement", "Clear decisions and next actions you can work from"], href: "/strategy-sprint", cta: "Explore the Strategy Sprint", featured: true },
  { id: "audit", label: "Go deeper into the evidence", title: "Deep Dive Growth Audit", price: "$3,725", note: "USD · one-time engagement", copy: "An expert-led investigation into your business and marketing evidence, with prioritized recommendations and a structured 90-day growth roadmap.", points: ["Written strategic findings and recommendations", "A personal findings walkthrough", "Scope shaped by agreed priorities and available evidence"], href: "/growth-clarity-audit", cta: "Explore the Deep Dive Audit", featured: true },
  { id: "assessment", label: "Find your starting point", title: "Get Clarity Assessment", price: `$${assessment.product.priceCents / 100}`, note: "One-time · self-guided", copy: "Examine six essential marketing areas and get a clearer picture of where to focus next.", points: ["35 questions and a personalized report", "Practical next moves when your answers reveal a clear constraint", "A Clarity Work Session and downloadable PDFs"], href: "/marketing-clarity-assesment", cta: "Explore the assessment", featured: false },
  { id: "ongoing", label: "Keep improving over time", title: "Ongoing growth support", price: "Let’s discuss fit", note: "Scope agreed around your business", copy: "Continuing help connecting paid media, conversion, measurement, and growth strategy—guided by what your business needs next.", points: ["Paid-media strategy and optimization", "Landing-page and customer-journey improvements", "Measurement, testing, and strategic direction"], href: "/#book-intro", cta: "Discuss ongoing support", featured: false },
];

export default function Services() {
  const [preview, setPreview] = useState<(typeof examples)[number] | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const previewTrigger = useRef<HTMLButtonElement | null>(null);
  return <main className="services-page">
    <section className="services-hero services-wrap">
      <div className="services-hero-copy"><p className="services-eyebrow">Strategy, creative & growth</p>
      <h1>Services Built to Drive <em>Measurable Growth</em> — with Strategy That Scales</h1>
      <p className="services-lead">Find your focus, work through a challenge, and build the next campaign. Choose the depth of support that fits your business.</p>
      <div className="services-actions"><a href="#services" className="services-button">Explore the services ↓</a><a href="#campaign-concepts" className="services-text-link">See our landing-page work ↗</a></div>
      </div><ServicesJourneyVideo />
    </section>

    <ServicesAtAGlance />

    <section className="services-wrap services-final">
      <p className="services-eyebrow">Make the next move useful</p><h2>What would help<br /><em>your business move forward?</em></h2>
      <div className="services-next"><Link to="/strategy-sprint"><span>I want to work through a challenge.</span><strong>Explore the Strategy Sprint ↗</strong></Link><Link to="/growth-clarity-audit"><span>I need a deeper investigation.</span><strong>Explore the Deep Dive Audit ↗</strong></Link><Link to="/marketing-clarity-assesment"><span>I want a self-guided starting point.</span><strong>Explore the assessment ↗</strong></Link></div>
      <p className="services-intro">Looking for a custom project or continuing support? <Link to="/#book-intro" className="services-text-link">Let’s discuss what you need →</Link></p>
    </section>

    <section id="campaign-concepts" className="services-wrap services-concepts">
      <div><p className="services-eyebrow">Campaign ideas → tangible concepts</p><h2>Give your next campaign<br /><em>something you can see.</em></h2></div>
      <div><p className="services-lead">Campaign ideation and conversion-focused landing-page concepts, built with AI and shaped by marketing experience.</p><p className="services-intro">For teams, designers, and entrepreneurs who need to move from a promising idea to a page they can discuss, refine, and test.</p></div>
      <div className="services-process">
        <article><span>01 / THE IDEA</span><h3>Find the campaign angle.</h3><p>Explore the audience, offer, message, and reasons someone would take the next step.</p></article>
        <article><span>02 / THE EXPERIENCE</span><h3>Make the idea tangible.</h3><p>Develop page structure, copy, visual direction, and AI-built concepts around a clear conversion goal.</p></article>
        <article><span>03 / THE NEXT MOVE</span><h3>Refine it with your team.</h3><p>Use the concept to align stakeholders, brief designers, and decide what to build and test next.</p></article>
      </div>
      <div className="services-showcase"><div className="services-showcase-heading"><p className="services-eyebrow">Selected landing-page work</p><h3>From an idea to an experience.</h3><p>Selected campaign pages and concepts, from experience-led storytelling to guided cruise discovery.</p></div>{examples.map(example => <button type="button" key={example.image} className="services-example" aria-label={`Preview ${example.title}`} onClick={event => { previewTrigger.current = event.currentTarget; setZoomed(false); setPreview(example); }}><div className="services-browser-bar" aria-hidden="true"><i/><i/><i/></div><img src={`/images/services/${example.image}.webp`} alt={`${example.title} landing-page preview`} loading="lazy" width="1100" height="619"/><div><p className="services-eyebrow">{example.tag}</p><h3>{example.title} <ArrowUpRight size={20} aria-hidden="true"/></h3><p>{example.copy}</p><span className="services-text-link">Preview the page ↗</span></div></button>)}</div>
      <div className="services-concept-footer"><p>Explore campaign and page concepts during a Strategy Sprint, or discuss a dedicated project. Production delivery and ongoing testing are scoped separately.</p><Link to="/strategy-sprint" className="services-text-link">Bring your campaign idea →</Link></div>
    </section>

    <section id="starting-points" className="services-offers-section">
      <div className="services-wrap">
        <p className="services-eyebrow">Choose your starting point</p>
        <h2>Scale your business<br /><em>with people + AI.</em></h2>
        <p className="services-intro">Start with clarity, work through a challenge, or go deeper into the evidence. Choose the support that fits your business.</p>
        <div className="services-offers">{[offers[2], offers[0], offers[1]].map(offer => <article id={offer.id} key={offer.id} className={`services-offer ${offer.id === "sprint" ? "services-offer-featured" : ""}`}>
          <div className="services-plan-heading"><p className="services-eyebrow">{offer.label}</p><h3>{offer.title}</h3><p className="services-plan-copy">{offer.copy}</p></div>
          <p className="services-price">{offer.price}<span>{offer.note}</span></p>
          <Link to={offer.href} className={`services-button ${offer.id !== "sprint" ? "services-button-outline" : ""}`}>{offer.cta}<ArrowUpRight size={17} aria-hidden="true" /></Link>
          <div className="services-plan-includes"><p>What’s included</p><ul>{offer.points.map(point => <li key={point}><Check size={18} aria-hidden="true" /><span>{point}</span></li>)}</ul></div>
        </article>)}</div>
      </div>
    </section>
    <section className="services-wrap services-ongoing" aria-labelledby="ongoing-heading">
      <div><p className="services-eyebrow">Build on your progress</p><h2 id="ongoing-heading">Ongoing growth support.<br /><em>Shaped around your business.</em></h2><p className="services-intro">Connect paid media, conversion, measurement, and growth strategy with continuing support. We’ll discuss your priorities and agree on the right scope together.</p></div>
      <div className="services-ongoing-action"><p>Custom scope · Let’s discuss fit</p><Link to="/#book-intro" className="services-button">Discuss ongoing support <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
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
