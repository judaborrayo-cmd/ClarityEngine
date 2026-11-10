import assessment from '@shared/marketing-clarity-audit/report-content.json';
export type NavigationItem = {
    id: string;
    label: string;
    description: string;
    to: string;
    icon: 'compass' | 'chart' | 'cursor' | 'layout' | 'plan' | 'conversation' | 'search' | 'repeat' | 'book' | 'video' | 'news' | 'layers' | 'globe';
    availability: 'information' | 'personalized-insights' | 'coming-soon' | 'inquiry';
    destinationStatus: 'implemented' | 'planned';
};
const item = (id: string, label: string, description: string, to: string, icon: NavigationItem['icon'], availability: NavigationItem['availability'] = 'information', destinationStatus: NavigationItem['destinationStatus'] = 'implemented'): NavigationItem => ({ id, label, description, to, icon, availability, destinationStatus });
export const assessmentItem = item('assessment', 'Find your next marketing priority', 'Take the Clarity Assessment to spot gaps and choose where to focus.', '/marketing-clarity-assesment', 'compass', 'personalized-insights');
const websiteKit = item('website-kit', 'The Anti-AI Slop Website Kit', 'Turn AI drafts into websites that sound like you and make the next step clear.', '/tools/anti-ai-slop-website-kit', 'layout', 'coming-soon', 'planned');
export const navigationGroups = {
    solutions: [
        { title: 'What would you like to improve?', items: [
                { ...assessmentItem, id: 'growth-block', label: "Find what’s holding growth back", description: "Assess your marketing and identify the gaps worth addressing first." },
                item('advertising', 'Make your ad spend work harder', 'Explore support for paid media, landing pages, and tracking.', '/services', 'chart'),
                { ...websiteKit, id: 'better-website', label: 'Build a clearer website with AI', description: 'Give visitors a stronger reason to choose you and a clear next step.' },
            ] },
        { title: 'Choose your level of support', items: [
                item('sprint', 'Turn priorities into action in 30 days', 'Strategy Sprint: three live sessions focused on your pages, campaigns, or offers.', '/strategy-sprint', 'plan'),
                item('growth-plan', 'Get a 90-day growth plan', 'Growth Audit: examine your marketing and prioritize what to improve next.', '/growth-clarity-audit', 'search', 'inquiry'),
                item('retainer', 'Get ongoing growth support', 'Growth Partnership: strategy, campaigns, and testing with an experienced partner.', '/growth-partnership', 'repeat', 'inquiry'),
            ] },
    ],
    tools: [
        { title: 'Find your starting point', items: [assessmentItem] },
        { title: 'Tools in development', items: [websiteKit,
                item('landing-kit', 'Anti-AI Slop Landing Page Kit', 'Help visitors understand your offer and take the next step.', '/tools/anti-ai-slop-landing-page-kit', 'cursor', 'coming-soon', 'planned'),
                item('visibility', 'AI Visibility & SEO', 'Check how easily people can discover your business through search and AI.', '/tools/ai-visibility-seo', 'globe', 'coming-soon', 'planned'),
                item('ads-builder', 'Google Search Ads Builder', 'Turn your offer and search intent into a structured campaign plan.', '/tools/google-search-ads-builder', 'chart', 'coming-soon', 'planned'),
                item('creative-engine', 'Multi-location Creative Engine', 'Adapt your ads for local audiences while keeping your brand consistent.', '/tools/multi-location-creative-engine', 'layers', 'coming-soon', 'planned'),
            ] },
    ],
    resources: [{ title: 'Ideas you can put to work', items: [
                item('insights', 'Practical Marketing Guides', 'Find ways to improve your messaging, campaigns, and customer journey.', '/resources/insights', 'book', 'coming-soon', 'planned'),
                item('videos', 'Marketing Walkthroughs', 'See how campaigns, pages, and measurement come together.', '/resources/videos', 'video', 'coming-soon', 'planned'),
                item('updates', "What's New", 'Explore the latest tools, resources, and improvements.', '/whats-new', 'news', 'coming-soon', 'planned'),
            ] }],
};
export type NavigationCategory = keyof typeof navigationGroups;
export const categories: {
    id: NavigationCategory;
    label: string;
}[] = [{ id: 'solutions', label: 'Growth Services' }, { id: 'tools', label: 'Tools & Kits' }, { id: 'resources', label: 'Learn' }];
export const plannedDestinations = Array.from(new Set(Object.values(navigationGroups).flatMap(groups => groups.flatMap(g => g.items)).filter(i => i.destinationStatus === 'planned').map(i => i.to)));
export const assessmentPriceLabel = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(assessment.product.priceCents / 100);
