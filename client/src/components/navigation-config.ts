import assessment from '@shared/marketing-clarity-audit/report-content.json';
import { strategySprintOffer } from '@shared/strategy-sprint-offer';
export type NavigationItem = {
    id: string;
    label: string;
    description: string;
    to: string;
    icon: 'compass' | 'chart' | 'cursor' | 'layout' | 'plan' | 'conversation' | 'search' | 'repeat' | 'book' | 'video' | 'news' | 'layers' | 'globe';
    availability: 'information' | 'launch-pending' | 'coming-soon' | 'inquiry';
    destinationStatus: 'implemented' | 'planned';
};
const item = (id: string, label: string, description: string, to: string, icon: NavigationItem['icon'], availability: NavigationItem['availability'] = 'information', destinationStatus: NavigationItem['destinationStatus'] = 'implemented'): NavigationItem => ({ id, label, description, to, icon, availability, destinationStatus });
export const assessmentItem = item('assessment', assessment.product.name, 'A guided review to help you identify what to improve next.', '/marketing-clarity-assesment', 'compass', 'launch-pending');
const websiteKit = item('website-kit', 'The Anti-AI Slop Website Kit', 'Build clearer, more distinctive websites with AI.', '/tools/anti-ai-slop-website-kit', 'layout', 'coming-soon', 'planned');
export const navigationGroups = {
    solutions: [
        { title: 'What do you need help with?', items: [
                { ...assessmentItem, id: 'growth-block', label: "Find what's holding growth back", description: "Understand what's working and what deserves attention next." },
                item('advertising', 'Improve advertising performance', 'Get a clearer strategy for your campaigns, creative, and spend.', '/services', 'chart'),
                item('conversion', 'Turn more visitors into customers', 'Improve your messaging, landing pages, and conversion experience.', '/services', 'cursor'),
                { ...websiteKit, id: 'better-website', label: 'Build a better website with AI', description: 'Create clearer, more distinctive pages without generic AI output.' },
                item('growth-plan', 'Create a focused growth plan', 'Work through priorities and next steps with an experienced strategist.', '/strategy-sprint', 'plan'),
            ] },
        { title: 'Work with a strategist', items: [
                item('consultation', 'Growth Strategy Consultation', 'Get an expert perspective on a specific growth decision.', '/ways-to-work-together#intro', 'conversation', 'coming-soon'),
                item('sprint', strategySprintOffer.name, 'Work through priorities and practical next steps together.', '/strategy-sprint', 'plan'),
                item('audit', 'Deep Dive Growth Audit', 'Investigate your marketing and identify the changes that matter.', '/growth-clarity-audit', 'search', 'inquiry'),
                item('retainer', 'Growth Retainer', 'Explore ongoing strategic support and growth execution.', '/ways-to-work-together#retainer', 'repeat', 'inquiry'),
            ] },
    ],
    tools: [
        { title: 'A self-guided starting point', items: [assessmentItem] },
        { title: 'In development', items: [websiteKit,
                item('landing-kit', 'Anti-AI Slop Landing Page Kit', 'Create landing pages with sharper messaging and a clearer next step.', '/tools/anti-ai-slop-landing-page-kit', 'cursor', 'coming-soon', 'planned'),
                item('visibility', 'AI Visibility & SEO', 'Practical checks for making your website easier to find and understand.', '/tools/ai-visibility-seo', 'globe', 'coming-soon', 'planned'),
                item('ads-builder', 'Google Search Ads Builder', 'Plan and structure Google Search campaigns with fewer repetitive steps.', '/tools/google-search-ads-builder', 'chart', 'coming-soon', 'planned'),
                item('creative-engine', 'Multi-location Creative Engine', 'Create consistent advertising variations for multiple locations.', '/tools/multi-location-creative-engine', 'layers', 'coming-soon', 'planned'),
            ] },
    ],
    resources: [{ title: 'Learn & keep up', items: [
                item('insights', 'Insights & Guides', 'Practical explanations and ideas for improving your marketing.', '/resources/insights', 'book', 'coming-soon', 'planned'),
                item('videos', 'Videos & Walkthroughs', 'See strategies, examples, and processes explained.', '/resources/videos', 'video', 'coming-soon', 'planned'),
                item('updates', "What's New", 'Follow new resources, products, and updates from Clarity Engine.', '/whats-new', 'news', 'coming-soon', 'planned'),
            ] }],
};
export type NavigationCategory = keyof typeof navigationGroups;
export const categories: {
    id: NavigationCategory;
    label: string;
}[] = [{ id: 'solutions', label: 'Solutions' }, { id: 'tools', label: 'Tools & Kits' }, { id: 'resources', label: 'Resources' }];
export const plannedDestinations = Array.from(new Set(Object.values(navigationGroups).flatMap(groups => groups.flatMap(g => g.items)).filter(i => i.destinationStatus === 'planned').map(i => i.to)));
export const assessmentPriceLabel = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(assessment.product.priceCents / 100);
