export type SprintTestimonial = {
  approved: boolean;
  video: string;
  poster: string;
  name: string;
  roleCompany: string;
  quote?: string;
  captions: string;
  experience: "sprint" | "prior-advisory";
};
// Three reserved slots. Only verified, approved material belongs here.
export const sprintTestimonialSlots: Array<SprintTestimonial | null> = [null, null, null];
export function SprintTestimonials({ slots = sprintTestimonialSlots }: { slots?: Array<SprintTestimonial | null> }) {
  const testimonials = slots.slice(0, 3).filter((slot): slot is SprintTestimonial => Boolean(slot?.approved && slot.video && slot.poster && slot.name && slot.roleCompany && slot.captions));
  if (!testimonials.length) return null;
  return <section className="ss-wrap ss-section" aria-labelledby="ss-testimonials-title"><p className="ss-eyebrow">In their own words</p><h2 id="ss-testimonials-title">Experiences of <em>working together.</em></h2><div className="ss-grid ss-testimonials">{testimonials.map(item => <article className="ss-card" key={item.video}><video controls playsInline preload="none" poster={item.poster} aria-label={`Experience shared by ${item.name}`}><source src={item.video} type="video/mp4" /><track kind="captions" src={item.captions} srcLang="en" label="English" default />Your browser does not support video.</video><h3>{item.name}</h3><p>{item.roleCompany}</p><p className="ss-small">{item.experience === "prior-advisory" ? "Previous advisory experience · not a review of this Sprint" : "Strategy Sprint experience"}</p>{item.quote && <blockquote>{item.quote}</blockquote>}</article>)}</div></section>;
}
