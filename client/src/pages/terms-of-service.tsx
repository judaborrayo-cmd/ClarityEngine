import { Link } from "react-router-dom";
import { auditTerms } from "@shared/audit-terms";
import "./terms-of-service.css";

export default function TermsOfService() {
  return <main className="ce-terms">
    <header>
      <p className="ce-terms-label">Invision Group Inc. · Operating as Clarity Engine</p>
      <h1>Terms of Service</h1>
      <p className="ce-terms-intro">Clear terms for the $3,725 Deep Dive Growth Audit.</p>
      <p>Effective {auditTerms.effectiveDate}</p>
      <p>Contact: <a href={`mailto:${auditTerms.email}`}>{auditTerms.email}</a></p>
    </header>
    <nav aria-label="Terms contents"><p><strong>On this page</strong></p><ul>{auditTerms.sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ul></nav>
    {auditTerms.sections.map(section => <section id={section.id} key={section.id} aria-labelledby={`${section.id}-title`}><h2 id={`${section.id}-title`}>{section.title}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}
    <p className="ce-terms-return"><Link to="/checkout/deep-dive-growth-audit">Review the $3,725 Audit →</Link></p>
  </main>;
}
