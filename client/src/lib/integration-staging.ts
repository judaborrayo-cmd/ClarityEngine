export const integrationStaging = () => import.meta.env?.VITE_INTEGRATION_STAGING === 'true' && location.hostname === 'clarity-engine-v2-staging.vercel.app';
export const analyticsHost = () => location.hostname === 'www.clarity-engine.org' || integrationStaging();
