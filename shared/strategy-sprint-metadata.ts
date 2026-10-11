// Compatibility exports: all routes now use the shared page registry.
import { getPageMetadata, metadataTags, pageMetadataHtml } from './page-metadata';
const legacy = (path:string) => { const m=getPageMetadata(path);return {title:m.title,tags:metadataTags(m),canonical:m.canonical}; };
export const defaultMetadata=legacy('/');
export const strategySprintMetadata=legacy('/checkout/strategy-sprint');
export const getStrategySprintMetadata=legacy;
export const strategySprintHtml=pageMetadataHtml;
