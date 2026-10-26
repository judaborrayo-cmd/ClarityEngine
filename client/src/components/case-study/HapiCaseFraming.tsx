import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Lightbulb, Check } from "lucide-react";
import hapiArtImage from "@assets/Hapi Art Resized_1761591215292.png";
import { StatStrip } from "./ConversionComponents";
import "./powers-case-framing.css";
import "./hapi-case-framing.css";

export function HapiHero({overview}:{overview:string}) {
  return <>
    <section className="powers-story-wrap powers-story-hero">
      <Link className="powers-story-back" to="/case-studies"><ArrowLeft size={16}/>All case studies</Link>
      <div className="powers-story-hero-grid">
        <div className="powers-story-heading"><p className="powers-story-eyebrow">Art & interiors · E-commerce · Meta advertising</p><p className="powers-story-client">Hapi Art · Kristi Kohut</p><h1 data-testid="case-study-title">Building a profitable<br/><em>10× ROAS.</em></h1></div>
        <figure><img src={hapiArtImage} alt="Hapi Art: vibrant fine art by Kristi Kohut" width="1600" height="1000"/><figcaption>Fine art. A distinct point of view. A system for reaching more collectors.</figcaption></figure>
        <div className="powers-story-intro"><p>{overview}</p><div className="powers-story-tags"><span>Meta Ads</span><span>Creative testing</span><span>E-commerce</span><span>Conversion optimization</span></div></div>
      </div>
      <StatStrip items={[{k:"10× ROAS",v:"Overall efficiency"},{k:"16× ROAS",v:"Cold prospecting (Meta)"},{k:"6.9× ROAS",v:"Retargeting (Meta)"},{k:"5–6% CTR",v:"Top creatives"}]}/>
    </section>
    <section className="powers-story-purpose"><div className="powers-story-wrap"><p className="powers-story-eyebrow">Ambitious brands making life better</p><h2>Making room for more color, self-expression, and art that feels personal.</h2></div></section>
  </>;
}

export function HapiContext({challenge,solutions}:{challenge:string;solutions:string[]}) {
  return <>
    <div className="powers-story-context">
      <div><p className="powers-story-eyebrow">The starting point · The challenge</p><h2>A distinctive brand.<br/><em>A specific growth challenge.</em></h2><p>{challenge}</p></div>
      <aside><span className="powers-story-seal"><Lightbulb size={28}/></span><h3>My contribution</h3><p>I connected creative testing, audience strategy, funnel optimization, and performance measurement into a more systematic advertising approach.</p><p>The work balanced the brand’s expressive visual identity with the practical decisions behind profitable acquisition: which creative to test, who to reach, how to follow up, and where to allocate budget.</p><p className="powers-story-collaboration">The brand, artwork, and creative identity belong to Hapi Art. Campaign work was developed with the client and collaborators.</p></aside>
    </div>
    <div className="powers-story-solution"><p className="powers-story-eyebrow">The solution</p><h2>Let the art stand out.<br/><em>Give performance a repeatable system.</em></h2><ul>{solutions.map(item=><li key={item}><Check size={18} aria-hidden="true"/><span>{item}</span></li>)}</ul></div>
  </>;
}

export function HapiCreative() {
  return <div className="hapi-story-creative"><p className="powers-story-eyebrow">The work, in context</p><h2>Something you can see.</h2><p className="powers-story-subtitle">Color, original artwork, and a sense of how it could live in someone’s home. Selected campaign films bring the brand’s personality into view.</p><div className="hapi-story-films">{[{id:"hapi-splash",title:"Splash a little joy",body:"Lead with color and the feeling of discovering a piece you love."},{id:"hapi-originals",title:"One-of-a-kind originals",body:"Make the artwork and its individuality the focus."},{id:"hapi-homes",title:"Art made for your home",body:"Help people imagine the art in their own space."}].map(film=><figure key={film.id}><video controls playsInline preload="metadata" poster={`/images/case-stories/hapi/${film.id.replace("hapi-", "")}-poster.webp`} src={`/videos/portfolio/${film.id}.mp4`} aria-label={`Hapi Art campaign film: ${film.title}`}/><figcaption><h3>{film.title}</h3><p>{film.body}</p></figcaption></figure>)}</div><p className="powers-story-measurement">Selected campaign creative is shown for context; these examples are not presented as the specific ads responsible for every reported metric.</p></div>;
}

export function HapiClosing() {
  return <section className="powers-story-closing"><div className="powers-story-wrap"><p className="powers-story-eyebrow">Your next chapter</p><h2>Make your next move<br/><em>meaningful.</em></h2><p>Build on what makes your brand worth discovering—with strategy, creative testing, and a clearer path from interest to action.</p><Link to="/services">How We Help <ArrowUpRight size={18}/></Link></div></section>;
}
