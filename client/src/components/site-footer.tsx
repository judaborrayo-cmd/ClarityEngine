import { Link } from "react-router-dom";
import "./site-footer.css";

const exploreLinks = [
  ["Services", "/services"], ["Case Studies", "/case-studies"], ["How We Scale", "/#how-we-scale"], ["About", "/about"],
];
const productLinks = [
  ["Get Clarity Assessment", "/marketing-clarity-assesment"],
  ["Strategy Sprint", "/strategy-sprint"],
];
export default function SiteFooter() {
  return <footer className="ce-footer" aria-label="Clarity Engine footer">
    <div className="ce-footer-wrap">
      <div className="ce-footer-grid">
        <div className="ce-footer-brand"><Link to="/" className="ce-footer-logo"><img src="/images/clarity-engine-favicon.png" alt="" width="30" height="30" loading="lazy" decoding="async" /><span>Clarity Engine</span></Link><p>Grow with clarity, better tracking, and smarter growth strategy.</p><span className="ce-footer-motto">Grow smarter. Go further.</span></div>
        <nav aria-label="Footer explore"><h2>Explore</h2><ul>{exploreLinks.map(([label,to]) => <li key={to}><Link to={to}>{label}</Link></li>)}</ul></nav>
        <nav aria-label="Footer offers"><h2>Find your next step</h2><ul>{productLinks.map(([label,to]) => <li key={to}><Link to={to}>{label}</Link></li>)}<li><Link to="/#book-intro" className="ce-footer-contact">Book a Strategic Intro Call <span aria-hidden="true">↗</span></Link></li></ul></nav>
      </div>
      <div className="ce-footer-bottom"><small>© {new Date().getFullYear()} Clarity Engine</small><Link to="/">Back to home <span aria-hidden="true">↑</span></Link></div>
    </div>
  </footer>;
}
