import { useState } from "react";
import { rankCaseStudies } from "./case-study-search";
import { Link } from "react-router-dom";
import type { CS } from "../CaseStudiesCRO";

const filters = ["All work", "Inspire the right people", "Improve the next step", "Understand what works"] as const;
type Filter = typeof filters[number];
type Story = { brand: string; headline: string; problem: string; solution: string; result: string; scope: string; examples: string; topics: Filter[] };
const stories: Record<string, Story> = {
  "art-of-living-retreat-center": {
    brand: "Art of Living Retreat Center", headline: "Help retreat interest become a confident next step.",
    problem: "Connect inspiring program marketing with an easier consultation journey.",
    solution: "Align Google and Meta messaging, test the page, and connect bookings with business reporting.",
    result: "0.84% → 1.32%", scope: "Panchakarma page-test conversion · configured event, not purchase lift",
    examples: "Page experiments · campaign films · creative concepts", topics: ["Inspire the right people", "Improve the next step", "Understand what works"]
  },
  "columbus-travel": {
    brand: "Columbus Travel", headline: "Turn Galápagos inspiration into a journey someone can plan.",
    problem: "Help travelers move from destination interest to a useful conversation about their trip.",
    solution: "Bring vessel footage, landing-page development, and inquiry-to-sale reporting together.",
    result: "$76,007", scope: "September 2026 paid-media-attributed won value · two travel sites",
    examples: "Landing pages · vessel videos · proposed contact-page test", topics: ["Inspire the right people", "Improve the next step", "Understand what works"]
  },
  "powers-gymnastics": {
    brand: "Powers Gymnastics", headline: "Help more local families reach their first class.",
    problem: "Different gyms and programs need messages that speak to local parents.",
    solution: "Connect location-specific creative with trial offers, attendance, and enrollment reporting.",
    result: "74% vs. 59%", scope: "Reported September 2026 trial conversion vs. prior three-month average",
    examples: "Local campaign creative · animated ad · trial-funnel insights", topics: ["Inspire the right people", "Improve the next step", "Understand what works"]
  },
  "hapi-art": {
    brand: "Hapi Art", headline: "Help more people find art they want to live with.",
    problem: "A new collector may love the artwork before they are ready to buy.",
    solution: "Use color, originals, and room context to support discovery, then reconnect through remarketing.",
    result: "$19,605", scope: "October 2023 reported revenue · 9 sales on $1,159.21 ad spend",
    examples: "Three campaign films · creative approaches · sales reporting", topics: ["Inspire the right people", "Understand what works"]
  },
  "mandali-retreats": {
    brand: "Mandali Retreats", headline: "Help the right guests find their next retreat.",
    problem: "A considered booking can take more than one visit and more than one channel.",
    solution: "Connect Search discovery and Meta remarketing, then evaluate completed purchases.",
    result: "32.3× / 20.1×", scope: "Google / Meta purchase ROAS · January–September 2026 · separate platform attribution",
    examples: "Campaign walkthrough · purchase mix · channel strategy", topics: ["Inspire the right people", "Understand what works"]
  },
  "golden-galapagos-cruises": {
    brand: "Golden Galápagos Cruises", headline: "Make the voyage easier to picture—and choose.",
    problem: "Premium imagery needs practical answers about the experience and the next step.",
    solution: "Bring the vessel story into the campaign and test a clearer path to inquiry.",
    result: "$30,475", scope: "October 2026 GGC paid-search-attributed sales value",
    examples: "Vessel film · landing-page example · placement preview", topics: ["Inspire the right people", "Improve the next step"]
  },
  "core-40": {
    brand: "Core40", headline: "Make the first class easier to choose.",
    problem: "Prospective members need to see whether the studio experience feels right for them.",
    solution: "Connect local discovery, creative testing, and the journey toward membership.",
    result: "$2M+ / 11K+", scope: "Revenue / new members · historical portfolio totals; period unspecified",
    examples: "Studio portfolio · campaign walkthrough · acquisition insights", topics: ["Inspire the right people", "Improve the next step"]
  },
  "steel-fit-usa": {
    brand: "SteelFit USA", headline: "Give an interested shopper a reason to return.",
    problem: "New visitors and people who already know the products need different messages.",
    solution: "Use product creative, catalogs, and evergreen retargeting for different buying moments.",
    result: "432 purchases", scope: "Selected retargeting creative group · 7.83× reported ROAS · January–July 2020",
    examples: "Campaign walkthrough · original creative-export results", topics: ["Inspire the right people", "Understand what works"]
  },
  "lisa-nichols": {
    brand: "Lisa Nichols / Motivating the Masses", headline: "Carry an inspiring message toward meaningful action.",
    problem: "Attention needs a clear next step to become a useful response.",
    solution: "Coordinate Google and YouTube campaigns around discovery, leads, and conversion costs.",
    result: "−42% CPC", scope: "Historical Google comparison · baseline dates unspecified",
    examples: "Campaign walkthrough · audience and conversion insights", topics: ["Inspire the right people", "Improve the next step"]
  },
  "lamark-agency": {
    brand: "Lamark Media", headline: "Different businesses. Decisions shaped around their customers.",
    problem: "A varied client portfolio calls for distinct offers, audiences, and priorities.",
    solution: "Combine account-specific campaign decisions with a consistent performance-review process.",
    result: "$70K+ monthly", scope: "Historical advertising-budget responsibility · scope, not revenue",
    examples: "Portfolio examples · account-management approach", topics: ["Understand what works"]
  }
};
const order = Object.keys(stories);

export default function CaseStudyExplorer({ items }: { items: CS[] }) {
  const [active, setActive] = useState<Filter>("All work");
  const [draft, setDraft] = useState("");
  const [question, setQuestion] = useState("");
  const ask = (value: string) => { setDraft(value); setQuestion(value.trim()); setActive("All work"); };
  const available = order.flatMap(slug => {
    const item = items.find(item => item.slug === `/case-study/${slug}`);
    return item ? [{ ...item, ...stories[slug] }] : [];
  });
  const matches = question ? rankCaseStudies(question, available) : [];
  const shown = question ? matches.map(match => match.story) : available.filter(item => active === "All work" || item.topics.includes(active));
  return <section className="case-explorer" aria-labelledby="explore-work">
    <div className="case-explorer-bar"><div><p className="case-kicker">Explore the work</p><h2 id="explore-work">What would you like to improve?</h2></div><p>Start with a challenge that feels familiar.</p></div>
    <form className="case-question" onSubmit={event=>{event.preventDefault(); ask(draft);}} role="search" aria-label="Find relevant case studies">
      <label htmlFor="case-question">Tell us what you’re trying to improve.</label>
      <p id="case-question-help">Ask in your own words. We’ll find relevant work and show why it fits.</p>
      <div className="case-question-input"><input id="case-question" type="search" maxLength={400} value={draft} onChange={event=>setDraft(event.target.value)} placeholder="We get website traffic, but not enough bookings…" aria-describedby="case-question-help"/><button type="submit" disabled={!draft.trim()}>Find relevant work <span aria-hidden="true">↗</span></button></div>
      <div className="case-question-examples"><span>Try a question:</span>{["How can we turn more clicks into bookings?","Our ads need fresh creative.","Which campaigns are actually driving sales?"].map(example=><button key={example} type="button" onClick={()=>ask(example)}>{example}</button>)}</div>
      <small>Matches come from the published case studies. No sign-up needed.</small>
    </form>
    <div className="case-filters" role="group" aria-label="Filter case studies by challenge">{filters.map(filter => <button key={filter} type="button" aria-pressed={active === filter} onClick={() => { setActive(filter); setQuestion(""); setDraft(""); }}>{filter}</button>)}</div>
    <div className="case-search-status"><p className="case-count" role="status">{question ? shown.length ? `${shown.length} relevant stories for “${question}”` : `No close match for “${question}”` : `${shown.length} client stories${active !== "All work" ? ` · ${active}` : " · challenges, decisions, and results"}`}</p>{question && <button type="button" onClick={()=>{setQuestion("");setDraft("");}}>Show all stories</button>}</div>
    {question && !shown.length && <div className="case-search-empty"><h3>Let’s try a different angle.</h3><p>Describe your marketing challenge or industry—for example, landing-page conversion, retreat bookings, creative testing, or campaign reporting. You can also browse all the work below.</p><button type="button" onClick={()=>{setQuestion("");setDraft("");}}>Browse all case studies</button></div>}
    <div className="case-explorer-grid">{shown.map((item, i) => <article className={`case-work-card ${!question && active === "All work" && i < 2 ? "case-work-featured" : ""}`} key={item.slug}>
      <Link to={item.slug} className="case-work-image" aria-label={`Explore ${item.brand}: ${item.headline}`}><img src={item.image} alt={item.imageAlt} loading={i < 2 ? "eager" : "lazy"}/><span>{!question && active === "All work" && i < 2 ? "Inside the engagement" : "Selected work"} ↗</span></Link>
      <div className="case-work-copy">{question && <p className="case-match-reason"><strong>Why this matches</strong>{matches.find(match=>match.story.slug===item.slug)?.reason}</p>}<p className="case-kicker">{item.brand}</p><h3><Link to={item.slug}>{item.headline}</Link></h3>
        <dl className="case-work-decisions"><div><dt>The challenge</dt><dd>{item.problem}</dd></div><div><dt>The work</dt><dd>{item.solution}</dd></div></dl>
        <div className="case-work-proof"><strong>{item.result}</strong><p>{item.scope}</p></div>
        <div className="case-work-foot"><p>{item.examples}</p><Link to={item.slug}>Explore the case study <span aria-hidden="true">↗</span></Link></div>
      </div>
    </article>)}</div>
    <p className="case-explorer-note">Each story explains its reporting period, the work delivered, and what the numbers measure. Implemented work, creative concepts, and proposed tests are identified within the case study.</p>
  </section>;
}
