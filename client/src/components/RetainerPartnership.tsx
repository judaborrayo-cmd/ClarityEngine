import { Link } from "react-router-dom";
import { CalendarDays, ChartNoAxesCombined, Compass, FlaskConical, RefreshCw, Sparkles, Target, Workflow } from "lucide-react";
import "./retainer-partnership.css";

const support = [
  {Icon:CalendarDays,title:"A weekly connection",copy:"Regular calls to work through priorities, solve problems, and keep your roadmap moving as the business evolves."},
  {Icon:ChartNoAxesCombined,title:"Clear KPIs & tracking",copy:"A shared view of the numbers that matter: sales, booked calls, qualified leads, acquisition costs, and the next opportunity to improve."},
  {Icon:FlaskConical,title:"Proactive testing & optimization",copy:"Ongoing paid media optimization and A/B testing across creative, messaging, and landing pages—with a clear reason for each test."},
  {Icon:Sparkles,title:"People + AI, put to work",copy:"Creative strategic recommendations and hands-on execution. We use AI to extend research, analysis, ideation, and production, with experienced judgment directing the work."},
];

export default function RetainerPartnership() {
  return <section id="retainer" className="services-wrap retainer-partnership" aria-labelledby="retainer-heading">
    <div className="retainer-partnership-panel">
      <div className="retainer-partnership-top">
        <div><h2 id="retainer-heading">Ongoing strategy.<br/><em>Consistent forward motion.</em></h2><p className="retainer-partnership-lead">We work with a select number of clients on retainer, staying close to the business and actively moving the work forward—from roadmapping and creative direction to paid media optimization, testing, and execution.</p><p className="retainer-partnership-copy">Together, we keep the growth engine running: solve what’s slowing you down, build on what’s working, and keep the next useful ideas ready to test. The mix of people, AI, and collaboration with your team is shaped around your business. The goal is more sales, more qualified calls, and more efficient customer acquisition.</p><Link to="/#book-intro" className="retainer-partnership-cta">Discuss a growth retainer </Link><p className="retainer-partnership-note">We’ll discuss fit, priorities, and scope around your business.</p></div>
        <aside className="retainer-rhythm" aria-label="The ongoing growth rhythm"><p className="retainer-rhythm-eyebrow">A continuous growth rhythm</p><div className="retainer-rhythm-grid">{[{Icon:Compass,title:"Plan",body:"Priorities & roadmap"},{Icon:Workflow,title:"Execute",body:"Campaigns & creative"},{Icon:Target,title:"Measure",body:"KPIs & evidence"},{Icon:RefreshCw,title:"Improve",body:"Test, learn & iterate"}].map(({Icon,title,body},i)=><div key={title}><span className={`retainer-rhythm-seal retainer-rhythm-seal-${i}`}><Icon size={29} strokeWidth={1.5}/></span><h3>{title}</h3><p>{body}</p></div>)}</div><p className="retainer-rhythm-footer"><RefreshCw size={15} aria-hidden="true"/> Weekly connection. Ongoing progress.</p></aside>
      </div>
      <div className="retainer-partnership-support">{support.map(({Icon,title,copy})=><article key={title}><span className="retainer-support-icon"><Icon size={23} strokeWidth={1.6}/></span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </div>
  </section>;
}
