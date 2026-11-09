import { servicesPageCopy } from "@/lib/services-page-copy";
import ServicesAtAGlance from "@/components/ServicesAtAGlance";

export default function HowWeDeliverSection() {
  return (
    <ServicesAtAGlance
      sectionId="how-we-deliver"
      eyebrow={null}
      heading="How the work comes together."
      subheading="Reach the right people, make the next step easier, and understand what changes. Explore the capabilities behind the work—and where Clarity Engine could support your team."
      content={servicesPageCopy}
      note={null}
      headingTestId="how-we-deliver-title"
      subheadingTestId="how-we-deliver-subtitle"
    />
  );
}
