import { useState } from "react";
import { Link } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { Lightbulb, Check, X } from "lucide-react";
import "./powers-case-framing.css";

export function PowersHero() {
  return <>
    <section className="powers-story-wrap powers-story-hero">
      <Link className="powers-story-back" to="/case-studies">All case studies</Link>
      <div className="powers-story-hero-grid">
        <div className="powers-story-heading"><p className="powers-story-client">Powers Gymnastics</p><h1 data-testid="case-study-title">From first click<br/>to first class.</h1></div>
        <figure><img src="/images/case-stories/powers-gymnastics.webp" alt="A child enjoying gymnastics at Powers Round Rock" width="1200" height="900"/><figcaption>Selected work · 2025–2026</figcaption></figure>
        <div className="powers-story-intro"><p>For a parent, gymnastics can mean more confidence, new friendships, and a place for their child’s energy. Across locations, the marketing needs to make that possibility clear—and make the next step easy.</p><div className="powers-story-tags"><span>Google & Meta</span><span>Multi-location campaigns</span><span>Creative systems</span><span>Trial-funnel analysis</span></div></div>
      </div>
    </section>
    <section className="powers-story-purpose"><div className="powers-story-wrap"><h2>Helping more families discover spaces where children can move, build skills, and find confidence.</h2></div></section>
  </>;
}

export function PowersContext({challenge,solutions}:{challenge:string;solutions:string[]}) {
  return <section className="powers-story-context-section"><div className="powers-story-wrap">
    <div className="powers-story-context">
      <div><h2>A real business.<br/><em>A specific challenge.</em></h2><p>{challenge}</p><p>Each gym has its own personality and local audience. The opportunity was to keep that identity while making the path from first interest to trial and enrollment easier to understand and measure.</p></div>
      <aside><span className="powers-story-seal"><Lightbulb size={28}/></span><h3>Our contribution</h3><p>We worked across Google and Meta campaign management, seasonal and free-trial creative, landing-page messaging, and funnel reporting.</p><p>That meant connecting the parent-facing message with the practical work behind it: location-specific campaigns, creative testing, follow-up, and a clearer view of leads, trials, and enrollments.</p><p className="powers-story-collaboration">Developed with the client’s team and creative, web, and enrollment collaborators.</p></aside>
    </div>
    <div className="powers-story-solution"><h2>Keep the local personality.<br/><em>Build a more consistent growth system.</em></h2><ul>{solutions.map(item=><li key={item}><Check size={18} aria-hidden="true"/><span>{item}</span></li>)}</ul></div>
  </div></section>;
}

const creative = [
  {src:"/images/services/campaigns/scotts-school-0.webp",caption:"Scottsdale back-to-school free-trial creative connects the joy of gymnastics with a practical next step for parents."},
  {src:"/images/services/gallery/powers-round-rock-1.webp",caption:"Capital Round Rock camp creative gives parents a glimpse of the experience while preserving the gym’s own visual identity."},
];

export function PowersCreative() {
  const [selected,setSelected]=useState<(typeof creative)[number]|null>(null);
  return <>
    <section className="powers-story-wrap powers-story-creative"><h2>Something you can see.</h2><p className="powers-story-subtitle">Different locations. Distinct creative. A shared focus on helping parents take the next step.</p><div className="powers-story-gallery">{creative.map(item=><figure key={item.src}><button type="button" onClick={()=>setSelected(item)} aria-label={`Enlarge ${item.caption}`}><img src={item.src} alt={item.caption} loading="lazy"/><span>Explore the creative </span></button><figcaption>{item.caption}</figcaption></figure>)}</div>
      <aside className="powers-story-recent"><h3>Look beyond the lead.</h3><div className="powers-story-recent-grid"><div><strong>74%</strong><p>Reported trial conversion</p></div><div><strong>59%</strong><p>Prior three-month average</p></div></div><p className="powers-story-measurement">The September 2026 client reporting describes trial conversion, rather than ad-click conversion. It covers a different period from the growth results above and reflects the wider team’s work.</p></aside>
    </section>
    <Dialog.Root open={Boolean(selected)} onOpenChange={open=>{if(!open)setSelected(null);}}><Dialog.Portal><Dialog.Overlay className="powers-story-overlay"/><Dialog.Content className="powers-story-dialog"><Dialog.Title>Powers Gymnastics · Selected creative</Dialog.Title><Dialog.Description>{selected?.caption}</Dialog.Description><Dialog.Close aria-label="Close creative"><X/></Dialog.Close>{selected&&<img src={selected.src} alt={selected.caption}/>}</Dialog.Content></Dialog.Portal></Dialog.Root>
  </>;
}

export function PowersClosing() {
  return <section className="powers-story-closing"><div className="powers-story-wrap"><h2>Make your next move<br/><em>meaningful.</em></h2><p>Connect your audience, your message, and the experience with a strategy shaped around your business.</p><Link to="/services">How We Help </Link></div></section>;
}
