import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PanelsTopLeft, TextCursorInput, Megaphone } from "lucide-react";
import CampaignShowcase from "./CampaignShowcase";
import "./campaign-work-gallery.css";

type PageExample = {title:string;tag:string;image:string;href:string;copy:string};
const categories = [{id:"pages",label:"Landing Pages",Icon:PanelsTopLeft},{id:"ads",label:"Ads",Icon:Megaphone},{id:"copy",label:"Message",Icon:TextCursorInput}];
export default function CampaignWorkGallery({pages,onPreview}:{pages:PageExample[];onPreview:(item:PageExample,trigger:HTMLButtonElement)=>void}) {
  return <section id="campaign-concepts" className="services-wrap campaign-work">
    <div className="campaign-work-heading"><h2>See what better marketing <em>looks like in practice.</em></h2><p>Explore landing pages, ads, and messaging for travel, hospitality, wellness, and other businesses. See how a clearer audience, offer, and next step shape the work.</p></div>
    <Tabs defaultValue="pages" className="campaign-tabs">
      <TabsList aria-label="Explore campaign work" className="campaign-tab-list">{categories.map(({id,label,Icon})=><TabsTrigger className="campaign-tab" key={id} value={id}><Icon size={20} aria-hidden="true"/>{label}</TabsTrigger>)}</TabsList>
      <TabsContent value="pages"><div className="campaign-panel-intro"><h3>Give visitors a clearer path to an inquiry or booking.</h3><p>Open a page to explore its layout, message, and inquiry path. These examples include campaign pages and design concepts, developed through team collaboration and AI-assisted production.</p></div><div className="services-showcase">{pages.map(example=><button type="button" key={example.image} className="services-example" aria-label={`Preview ${example.title}`} onClick={event=>onPreview(example,event.currentTarget)}><div className="services-browser-bar" aria-hidden="true"><i/><i/><i/></div><img src={`/images/services/${example.image}.webp`} alt={`${example.title} landing-page preview`} loading="lazy" width="1100" height="619"/><div><h3>{example.title}</h3><p>{example.copy}</p><span className="services-text-link">Explore the page </span></div></button>)}</div></TabsContent>
      <TabsContent value="copy"><div className="campaign-panel-intro"><h3>Make the reason to choose you easier to understand.</h3><p>Compare different ways to communicate an offer. These selected campaign excerpts connect audience motivations with a specific benefit and next step.</p></div><div className="campaign-copy-grid">
        <article className="campaign-copy-card"><h3>Everyday luxury</h3><div className="campaign-copy-sample"><small>Headline variations</small><p>Everyday Luxe, Redefined</p><p>Jewelry That Moves With You</p><p>Designed For Daily Style</p><small>Description</small><p>Modern Fine Jewelry You’ll Actually Wear. Refined Style, Effortless Feel.</p></div><p className="campaign-copy-note">A clear theme connects the product to how someone wants to feel in everyday life.</p></article>
        <article className="campaign-copy-card"><h3>Modern heirlooms</h3><div className="campaign-copy-sample"><small>Headline variations</small><p>Luxury You’ll Pass Down</p><p>Beyond Trends. Made to Last.</p><p>Jewelry With A Legacy</p><small>Description</small><p>Modern Fine Jewelry Designed to Be Loved Now—And Forever.</p></div><p className="campaign-copy-note">A second angle shifts the emphasis from everyday ease to craftsmanship and lasting meaning.</p></article>
        <article className="campaign-copy-card"><h3>From more information to a clearer path</h3><div className="campaign-copy-sample"><small>Message excerpt</small><p>“More information doesn’t always create more clarity. Especially when every expert seems to recommend a different diet, supplement, routine, or health strategy.”</p><small>Creative direction</small><p>Prepare → Immerse → Integrate</p></div><p className="campaign-copy-note">Recognize the audience’s frustration, then introduce a structured journey.</p></article>
        <article className="campaign-copy-card"><h3>Make continued support concrete</h3><div className="campaign-copy-sample"><small>Headline</small><p>An 8-Day Reset. A 108-Day Journey.</p><small>Message excerpt</small><p>“Preparation before you arrive. Support after you return home.”</p></div><p className="campaign-copy-note">Explain the difference in the offer through the experience before, during, and after the retreat.</p></article>
      </div></TabsContent>
      <TabsContent value="ads"><CampaignShowcase/></TabsContent>
    </Tabs>


  </section>;
}
