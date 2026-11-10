/** Curated retrieval over published work. No generated advice or remote requests. */
export type SearchableStory = { slug: string; brand: string; headline: string; problem: string; solution: string; examples: string };
type Intent = { label: string; terms: string[]; weights: Record<string, number> };
const intents: Intent[] = [
  {label:"landing pages and conversion",terms:["clicks","bookings","not getting leads","landing page","website","page conversion","not converting","conversion rate","more inquiries","more enquiries","clicks but","traffic but","no leads","few leads","booking flow","booking journey","form","cro"],weights:{"art-of-living-retreat-center":10,"columbus-travel":9,"golden-galapagos-cruises":8,"powers-gymnastics":5,"core-40":3}},
  {label:"measurement and attribution",terms:["which campaigns","driving sales","working","tracking","attribution","reporting","dashboard","kpi","measure","measurement","what works","what is working","what s working","roi","roas","data","cross sell","cross program","analytics"],weights:{"art-of-living-retreat-center":10,"columbus-travel":8,"mandali-retreats":7,"powers-gymnastics":6,"lamark-agency":5,"hapi-art":4,"steel-fit-usa":4}},
  {label:"creative and audience messaging",terms:["creative","video","ad design","ads feel","same ads","stale","message","messaging","inspire","inspiration","copy","storytelling","audience","engagement"],weights:{"hapi-art":9,"powers-gymnastics":8,"art-of-living-retreat-center":7,"golden-galapagos-cruises":7,"columbus-travel":6,"lisa-nichols":6,"steel-fit-usa":4}},
  {label:"travel and considered bookings",terms:["travel","cruise","galapagos","tourism","tour","hotel","hospitality","trip","vacation","destination"],weights:{"columbus-travel":14,"golden-galapagos-cruises":13,"mandali-retreats":4}},
  {label:"retreat marketing",terms:["retreat","wellness","yoga","panchakarma","consultation","meditation","booked calls"],weights:{"art-of-living-retreat-center":14,"mandali-retreats":12}},
  {label:"fitness and enrollment",terms:["fitness","gym","gymnastics","studio","membership","member","enrollment","enrolment","parent","kids","children","class","trial"],weights:{"powers-gymnastics":12,"core-40":11}},
  {label:"multiple locations or accounts",terms:["multi location","multiple locations","different locations","local","locations","franchise","multiple accounts","portfolio"],weights:{"powers-gymnastics":14,"lamark-agency":9,"core-40":5}},
  {label:"e-commerce and product sales",terms:["ecommerce","e commerce","shopify","store","shop","product","cart","art","collector","online sales","sell online"],weights:{"hapi-art":14,"steel-fit-usa":12}},
  {label:"remarketing and return visits",terms:["retargeting","remarketing","return visits","returning visitors","come back","follow up","abandon","abandoned"],weights:{"steel-fit-usa":10,"hapi-art":9,"mandali-retreats":8,"art-of-living-retreat-center":5}},
  {label:"search and social working together",terms:["google","meta","facebook","search","paid media","ppc","omnichannel","multi channel","channels","cross channel"],weights:{"art-of-living-retreat-center":6,"mandali-retreats":6,"columbus-travel":5,"powers-gymnastics":5,"lamark-agency":4}},
  {label:"speakers and personal brands",terms:["speaker","personal brand","youtube","author","inspiring message","lisa nichols"],weights:{"lisa-nichols":18}},
  {label:"advertising costs and efficiency",terms:["expensive","cost","costs","budget","spend","spending","acquisition","cpl","cpc","lower","cheaper"],weights:{"powers-gymnastics":8,"art-of-living-retreat-center":7,"steel-fit-usa":6,"lamark-agency":5,"lisa-nichols":5}}
];
export const normalizeQuestion = (text: string) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g," ").trim();
function hasTerm(text: string, term: string) {
  // Match whole words and common plural forms, never substrings such as “art” in “start”.
  return new RegExp(`(?:^| )${term.replace(/ /g," +")}(?:s|es)?(?: |$)`).test(text);
}
export function rankCaseStudies<T extends SearchableStory>(question: string, stories: T[]) {
  const query=normalizeQuestion(question.slice(0,400));
  if (!query) return [];
  const matched=intents.filter(intent=>intent.terms.some(term=>hasTerm(query,term)));
  return stories.map(story=>{
    const id=story.slug.split("/").pop()!;
    const reasons=matched.filter(intent=>intent.weights[id]).sort((a,b)=>b.weights[id]-a.weights[id]);
    const brand=normalizeQuestion(story.brand);
    const direct=hasTerm(query,brand) || hasTerm(query,id.replace(/-/g," "));
    const score=reasons.reduce((sum,intent)=>sum+intent.weights[id],0)+(direct?50:0);
    return {story,score,reason:direct?`You mentioned ${story.brand}.`:reasons.length?`Relevant to ${reasons.slice(0,2).map(reason=>reason.label).join(" and ")}.`:""};
  }).filter(match=>match.score>0).sort((a,b)=>b.score-a.score).slice(0,4);
}
