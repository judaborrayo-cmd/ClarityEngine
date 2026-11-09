import { Link } from "react-router-dom";
import { CalendarDays, ChartNoAxesCombined, Compass, FlaskConical, RefreshCw, Sparkles, Target, Workflow } from "lucide-react";
import "./retainer-partnership.css";

const support = [
  {Icon:CalendarDays,title:"A working session every week",copy:"Review what we’ve learned, solve blockers, and agree on the next actions with the people responsible for them."},
  {Icon:ChartNoAxesCombined,title:"A shared view of performance",copy:"Focus on the numbers that matter to your business—qualified inquiries, bookings, sales, and acquisition costs—and identify gaps in the tracking."},
  {Icon:FlaskConical,title:"New ideas put to the test",copy:"Keep improving campaigns, creative, and landing pages with a prioritized testing plan and a clear reason for each experiment."},
  {Icon:Sparkles,title:"People + AI, put to work",copy:"Use the latest AI tools to accelerate analysis, creative variations, and page production. Experienced judgment sets the direction and reviews the work."},
];

export default function RetainerPartnership() {
  return <section id="retainer" className="services-wrap retainer-partnership" aria-labelledby="retainer-heading">
    <div className="retainer-partnership-panel">
      <div className="retainer-partnership-top">
        <div><h2 id="retainer-heading">Put Clarity Engine on your team.<br/><em>Keep improving what drives growth.</em></h2><p className="retainer-partnership-lead">The Growth Partnership brings senior direction and hands-on support into your business. We connect paid media, conversion improvements, and measurement, then help turn the priorities into work customers actually see.</p><p className="retainer-partnership-copy">Work alongside your marketers, designers, and developers—or have Clarity Engine handle agreed execution. Weekly working calls keep priorities clear, while AI-assisted analysis and production help move testing forward faster.</p><Link to="/growth-partnership" className="retainer-partnership-cta">Explore the Growth Partnership</Link><p className="retainer-partnership-note">Priorities, responsibilities, and delivery scope are agreed around your goals and team capacity.</p></div>
        <aside className="retainer-rhythm" aria-label="The ongoing growth rhythm"><p className="retainer-rhythm-eyebrow">A continuous growth rhythm</p><div className="retainer-rhythm-grid">{[{Icon:Compass,title:"Plan",body:"Priorities & roadmap"},{Icon:Workflow,title:"Execute",body:"Campaigns & creative"},{Icon:Target,title:"Measure",body:"KPIs & evidence"},{Icon:RefreshCw,title:"Improve",body:"Test, learn & iterate"}].map(({Icon,title,body},i)=><div key={title}><span className={`retainer-rhythm-seal retainer-rhythm-seal-${i}`}><Icon size={29} strokeWidth={1.5}/></span><h3>{title}</h3><p>{body}</p></div>)}</div><p className="retainer-rhythm-footer"><RefreshCw size={15} aria-hidden="true"/> Weekly connection. Ongoing progress.</p></aside>
      </div>
      <div className="retainer-partnership-support">{support.map(({Icon,title,copy})=><article key={title}><span className="retainer-support-icon"><Icon size={23} strokeWidth={1.6}/></span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </div>
  </section>;
}
