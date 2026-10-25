import { BarChart3, TrendingUp, Compass, Layers3, Award } from "lucide-react";
import "./experience-badges.css";

const experience = [
  { value: "$5M+", label: "Ad spend managed", detail: "Across growth brands", Icon: BarChart3 },
  { value: "Multi-million", label: "Revenue driven", detail: "Through paid media", Icon: TrendingUp },
  { value: "12+ years", label: "Paid media &", detail: "growth strategy", Icon: Compass },
  { value: "Proven results", label: "Travel · Fitness", detail: "Luxury · Education", Icon: Layers3 },
  { value: "Top Specialist", label: "Recognized by Contra", detail: "2025", Icon: Award },
];

export default function ExperienceBadges() {
  return <div className="experience-proof" aria-label="Experience and recognition">
    <ul className="experience-badges">{experience.map(({value,label,detail,Icon}) => <li key={value}>
      <div className="experience-seal" aria-hidden="true"><Icon size={29} strokeWidth={1.3} /><span className="experience-cross experience-cross-a"/><span className="experience-cross experience-cross-b"/></div>
      <strong>{value}</strong><span>{label}</span><small>{detail}</small>
    </li>)}</ul>
    <div className="experience-platforms"><p className="experience-platform-heading">Hands-on platform experience</p><p>Google Ads <i>·</i> YouTube Ads <i>·</i> Meta Ads <i>·</i> Google Analytics</p><p>LinkedIn Ads <i>·</i> Shopify <i>·</i> WordPress <i>·</i> Vibe coding</p></div>
  </div>;
}
