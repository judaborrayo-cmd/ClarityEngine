import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./about-founder.css";

export default function About() {
  useEffect(() => {
    document.title = "Juda Borrayo · Founder of Clarity Engine — Draft";
    const robots = document.createElement("meta"); robots.name = "robots"; robots.content = "noindex, nofollow";
    document.head.appendChild(robots);
    return () => robots.remove();
  }, []);
  return <main className="founder-page">
    <section className="founder-wrap founder-hero">
      <div><p className="founder-eyebrow">Juda Borrayo</p><p className="founder-relationship">Founder of Clarity Engine</p><p className="founder-title">Senior Growth Marketing Strategist | Paid Media, CRO &amp; Full-Funnel Growth</p><h1>Clearer decisions.<br /><em>More focused growth.</em></h1><p className="founder-lead">I help founders and teams understand where their marketing is getting stuck, decide what deserves attention next, and turn that direction into practical work.</p><div className="founder-actions"><a className="founder-button" href="#ways-to-work">Explore ways to work together <span aria-hidden="true">↓</span></a><Link className="founder-link" to="/case-studies">View case studies →</Link></div><div className="founder-contact"><a href="mailto:Juda.Borrayo@gmail.com">Email Juda</a><a href="https://www.linkedin.com/in/judaborrayo" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div></div>
      <div className="founder-visual"><figure className="founder-photo"><img src="/images/juda-borrayo-1440.webp" srcSet="/images/juda-borrayo-720.webp 720w, /images/juda-borrayo-1440.webp 1440w" sizes="(max-width: 767px) calc(100vw - 44px), (max-width: 1240px) 40vw, 442px" width="1440" height="960" alt="Juda Borrayo seated with a laptop and notebook" fetchPriority="high" decoding="async" /><figcaption>Juda Borrayo · Founder of Clarity Engine</figcaption></figure><aside className="founder-perspective"><span className="founder-eyebrow">The bigger picture</span><p>Through Clarity Engine, I connect paid media, messaging, landing pages, and measurement to the bigger picture of how people discover your business, understand your offer, and become customers.</p><div className="founder-journey" aria-label="Customer journey"><span>Discover</span><span aria-hidden="true">→</span><span>Understand</span><span aria-hidden="true">→</span><span>Become a customer</span></div></aside></div>
    </section>
    <section className="founder-wrap founder-section founder-split"><div><p className="founder-eyebrow">Experience & perspective</p><h2>Looking beyond<br /><em>the ad account.</em></h2></div><div className="founder-prose"><p>My consulting work spans wellness, education, travel, e-commerce, professional services, financial services, and other consumer-focused businesses.</p><p>I work across Google Ads, YouTube, Meta, funnel strategy, conversion optimization, analytics, attribution, audience strategy, and creative testing, including ongoing campaigns and launches.</p><p>A large part of my work is diagnosing where performance breaks down across the customer journey; sometimes the issue is traffic quality, sometimes it’s the offer, the message, the landing page, or what happens after someone enquires.</p><p>Understanding those connections helps us choose a useful next step instead of adding activity without a clear reason.</p></div></section>
    <section className="founder-tint"><div className="founder-wrap founder-section"><p className="founder-eyebrow">Approach</p><h2>Find the opportunity.<br /><em>Make the next move practical.</em></h2><ol className="founder-steps">{[
      ["Understand what’s happening", "Look at your goals, marketing, customer experience, and available evidence."],
      ["Decide what to do next", "Separate distractions from opportunities and choose what deserves attention now."],
      ["Put the plan into practice", "Work across landing pages, CRO, analytics, CRM and email, and testing, using AI-assisted tools where useful."],
      ["Learn from what changes", "Use measurement and experimentation to decide what to improve next."],
    ].map(([title,body],i) => <li key={title}><span>0{i+1}</span><h3>{title}</h3><p>{body}</p></li>)}</ol></div></section>
    <section className="founder-wrap founder-section founder-motivation"><div><p className="founder-eyebrow">Motivation</p><h2>Helping people<br /><em>understand—and act.</em></h2></div><div className="founder-prose"><p>I enjoy the conversations where a complicated problem becomes easier to understand and someone can see what to do next.</p><p>That’s the thinking behind Clarity Engine: practical guidance, useful resources, and collaborative work that helps people make more informed decisions.</p></div></section>
    <section className="founder-wrap founder-evidence"><div><p className="founder-eyebrow">Selected work</p><h2>See the work <em>in context.</em></h2><p>Explore selected case studies to see the challenges, decisions, and work behind different engagements.</p></div><Link to="/case-studies" className="founder-button">View case studies →</Link></section>
    <section id="ways-to-work" className="founder-wrap founder-section"><p className="founder-eyebrow">Ways to work together</p><h2>Choose the support that fits <em>where you are.</em></h2><div className="founder-offers">{[
      ["Get Clarity Assessment", "A self-guided starting point to examine six essential marketing areas and identify where to focus next.", "Explore the assessment", "/marketing-clarity-assesment"],
      ["30-Day Growth Strategy Sprint", "Three live sessions to work through your priorities, solve practical problems, and leave with clearer next actions.", "Explore the Strategy Sprint", "/strategy-sprint"],
      ["Ongoing growth support", "For businesses looking for continuing help with paid media, CRO, measurement, and growth strategy.", "Explore services", "/services"],
    ].map(([title,body,label,to],i) => <article key={to}><span className="founder-eyebrow">0{i+1}</span><h3>{title}</h3><p>{body}</p><Link to={to} className="founder-link">{label} →</Link></article>)}</div></section>
  </main>;
}
