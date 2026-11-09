import "./problems-ticker.css";

const rows = [{"category": "Revenue", "items": [["Unclear advertising returns", "Connect spending with business outcomes"], ["Different results across locations", "See where support is needed"], ["Clicks without enough inquiries", "Improve the path from interest to action"]]}, {"category": "Growth", "items": [["Same ads, month after month", "Fresh ideas to test"], ["Too much on your team’s plate", "Add experienced direction and execution"], ["Scattered campaigns", "Bring your message and priorities together"]]}, {"category": "Conversion", "items": [["Landing pages waiting for updates", "Get improvements ready to test sooner"], ["Plenty of ideas, little follow-through", "Give the next steps an owner"], ["Clicks without enough inquiries", "Improve the path from interest to action"]]}];

export default function ProblemsTicker() {
  return (
    <section id="growth-challenges" className="problems-section" aria-labelledby="problems-heading">
      <div className="problems-intro">
        <p className="problems-eyebrow">Your challenges. A clearer way forward.</p>
        <h2 id="problems-heading">Your marketing is running.<br /><span>Is it moving your business forward?</span></h2>
        <p>The same ads keep running. Promising ideas wait for someone to implement them. Reports show activity, but leave you wondering what’s actually bringing in customers.</p><p>We help you identify what needs attention, decide what to change, and put the next improvement into motion.</p>
      </div>
      <div className="problems-rows">
        {rows.map(({ category, items }) => (
          <div key={category} className={`problems-row problems-row-${category.toLowerCase()}`}>
            <h3 className="problems-category">{category}</h3>
            <div className="problems-viewport" tabIndex={0} role="region" aria-label={`${category} challenges and potential solutions. Focus or hover to pause movement.`}>
              <div className="problems-track">
                {[0, 1].map(copy => (
                  <ul className="problems-group" key={copy} aria-hidden={copy === 1 || undefined}>
                    {items.map(([problem, solution]) => (
                      <li className="problems-pair" key={problem}>
                        <span className="problems-challenge">{problem}</span>
                        <span className="problems-arrow" aria-hidden="true">→</span>
                        <span className="sr-only">Potential solution: </span>
                        <span className="problems-solution">{solution}</span>
                        <span className="problems-separator" aria-hidden="true">✦</span>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
