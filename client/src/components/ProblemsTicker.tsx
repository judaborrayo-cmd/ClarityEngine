import "./problems-ticker.css";

const rows = [
  {
    category: "Revenue",
    items: [
      ["Wasted ad spend", "Smarter budget allocation"],
      ["Unclear ROAS", "Measurement you can act on"],
      ["High acquisition costs", "More efficient campaigns"],
      ["Budget guesswork", "Clearer spending priorities"],
      ["Disconnected reporting", "A clearer view of performance"],
      ["Missed offline conversions", "Connect campaigns to outcomes"],
      ["Low-quality leads", "Reach better-fit customers"],
      ["Revenue plateaus", "Find the next growth opportunity"],
    ],
  },
  {
    category: "Growth",
    items: [
      ["Too many priorities", "A focused growth roadmap"],
      ["Creative fatigue", "Fresh angles worth testing"],
      ["Scattered campaigns", "A coordinated channel strategy"],
      ["Slow execution", "People + AI working together"],
      ["Multi-location complexity", "A more consistent growth system"],
      ["Unclear positioning", "A sharper reason to choose you"],
      ["Limited reach", "Find your next audience"],
      ["Scaling bottlenecks", "Know what to fix before scaling"],
    ],
  },
  {
    category: "Conversion",
    items: [
      ["Leaky funnels", "A clearer path to action"],
      ["Confusing offers", "Make the value easier to see"],
      ["Slow landing pages", "A faster customer experience"],
      ["Generic AI websites", "Distinctive pages with purpose"],
      ["Clicks without customers", "Align the ad and the landing page"],
      ["Abandoned inquiries", "Remove friction from the next step"],
      ["Weak calls to action", "Give people a clear next move"],
      ["Low conversion rates", "Test what moves people forward"],
    ],
  },
];

export default function ProblemsTicker() {
  return (
    <section id="growth-challenges" className="problems-section" aria-labelledby="problems-heading">
      <div className="problems-intro">
        <p className="problems-eyebrow">Your challenges. A clearer way forward.</p>
        <h2 id="problems-heading">Big ambitions come with difficult problems.<br /><span>Let’s figure them out.</span></h2>
        <p>From wasted spend to stalled growth, we help you find what’s getting in the way—and what to do next.</p>
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
