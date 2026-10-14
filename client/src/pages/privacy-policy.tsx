import { Link } from "react-router-dom";
import { privacyPolicy } from "@shared/privacy-policy";
import "./terms-of-service.css";

export default function PrivacyPolicy() {
  return <main className="ce-terms">
    <header>
      <p className="ce-terms-label">Invision Group Inc. · Operating as Clarity Engine</p>
      <h1>Privacy Policy</h1>
      <p className="ce-terms-intro">How information is handled when you contact us, use our website or work with us.</p>
      <p>Effective {privacyPolicy.effectiveDate}</p>
      <p>Privacy contact: <a href={`mailto:${privacyPolicy.email}`}>{privacyPolicy.email}</a></p>
    </header>
    <nav aria-label="Privacy contents"><p><strong>On this page</strong></p><ul>{privacyPolicy.sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ul></nav>
    {privacyPolicy.sections.map(section => <section id={section.id} key={section.id} aria-labelledby={`${section.id}-title`}><h2 id={`${section.id}-title`}>{section.title}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.links && <ul>{section.links.map(link => <li key={link.href}><a href={link.href} rel="noreferrer">{link.label}</a></li>)}</ul>}</section>)}
    <p className="ce-terms-return"><Link to="/terms-of-service">Terms of Service →</Link></p>
  </main>;
}
