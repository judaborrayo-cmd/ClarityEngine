import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Lightbulb, Check } from "lucide-react";
import core40Image from "@assets/Core40 Image 1600 by 1000_1761591215292.jpg";
import { StatStrip } from "./ConversionComponents";
import "./powers-case-framing.css";

export function Core40Hero({overview}:{overview:string}) {
  return <>
    <section className="powers-story-wrap powers-story-hero"><Link className="powers-story-back" to="/case-studies"><ArrowLeft size={16}/>All case studies</Link><div className="powers-story-hero-grid"><div className="powers-story-heading"><p className="powers-story-eyebrow">Boutique fitness · Member acquisition · Paid media</p><p className="powers-story-client">Core40</p><h1 data-testid="case-study-title">Maximizing ROI<br/><em>in fitness.</em></h1></div><figure><img src={core40Image} alt="Core40 boutique fitness training experience" width="1600" height="1000"/><figcaption>A distinctive training experience. A clearer path to membership.</figcaption></figure><div className="powers-story-intro"><p>{overview}</p><div className="powers-story-tags"><span>Google & Meta</span><span>Boutique fitness</span><span>Member acquisition</span><span>Creative & conversion</span></div></div></div><StatStrip items={[{k:"$2M+",v:"Revenue generated"},{k:"11K+",v:"New members acquired"},{k:"–38%",v:"Reduction in cost per lead"},{k:"+26%",v:"Improved lead-to-member conversion rate"}]}/></section>
    <section className="powers-story-purpose"><div className="powers-story-wrap"><p className="powers-story-eyebrow">Ambitious brands making life better</p><h2>Helping more people discover movement, strength, and a community they want to return to.</h2></div></section>
  </>;
}

export function Core40Context({challenge,solutions}:{challenge:string;solutions:string[]}) {
  return <><div className="powers-story-context"><div><p className="powers-story-eyebrow">The starting point · The challenge</p><h2>A distinctive studio.<br/><em>A specific growth challenge.</em></h2><p>{challenge}</p></div><aside><span className="powers-story-seal"><Lightbulb size={28}/></span><h3>Our contribution</h3><p>We connected audience targeting, paid media, creative testing, and the membership journey into a more coordinated growth approach.</p><p>The work brought the studio’s positioning into the campaigns and landing experience, with performance measurement helping guide acquisition decisions and ongoing optimization.</p><p className="powers-story-collaboration">Developed alongside the client’s team and creative, web, and studio collaborators. The training experience and member community are Core40’s.</p></aside></div><div className="powers-story-solution"><p className="powers-story-eyebrow">The solution</p><h2>Make the experience distinctive.<br/><em>Make the next step easier.</em></h2><ul>{solutions.map(item=><li key={item}><Check size={18} aria-hidden="true"/><span>{item}</span></li>)}</ul></div></>;
}

export function Core40Closing() {
  return <section className="powers-story-closing"><div className="powers-story-wrap"><p className="powers-story-eyebrow">Your next chapter</p><h2>Make your next move<br/><em>meaningful.</em></h2><p>Connect what makes your business valuable with the audience, campaigns, and customer experience that help it grow.</p><Link to="/services">How We Help <ArrowUpRight size={18}/></Link></div></section>;
}
