const defaultTitle = "Clarity Engine — Performance Marketing & Growth Strategy";
const defaultDescription = "Drive measurable growth with expert performance marketing. From growth audits to full-funnel optimization. Based on $3M+ in managed ad spend.";
const defaultImage = "https://www.clarity-engine.org/og-image.png";
const defaultImageAlt = "Clarity Engine growth dashboard showing results across travel, fitness, luxury, and education brands";

export const defaultMetadata = {
  title: defaultTitle,
  tags: {
    description: defaultDescription,
    "og:title": defaultTitle,
    "og:description": defaultDescription,
    "og:url": "https://www.clarity-engine.org/",
    "og:type": "website",
    "og:image": defaultImage,
    "og:image:secure_url": defaultImage,
    "og:image:width": "1448",
    "og:image:height": "1086",
    "og:image:alt": defaultImageAlt,
    "twitter:card": "summary_large_image",
    "twitter:title": defaultTitle,
    "twitter:description": defaultDescription,
    "twitter:image": defaultImage,
    "twitter:image:alt": defaultImageAlt,
  },
  canonical: undefined as string | undefined,
};

const sprintTitle = "30-Day Growth Strategy Sprint | Clarity Engine";
const sprintDescription = "Three live strategy sessions over 30 days to help founders and business owners solve growth problems, sharpen priorities, and move faster.";
const sprintUrl = "https://www.clarity-engine.org/checkout/strategy-sprint";
const sprintImage = "https://www.clarity-engine.org/social/strategy-sprint-preview.png";
const sprintImageAlt = "30-Day Growth Strategy Sprint by Clarity Engine";

export const strategySprintMetadata = {
  title: sprintTitle,
  tags: {
    ...defaultMetadata.tags,
    description: sprintDescription,
    "og:title": sprintTitle,
    "og:description": sprintDescription,
    "og:url": sprintUrl,
    "og:image": sprintImage,
    "og:image:secure_url": sprintImage,
    "og:image:width": "1731",
    "og:image:height": "909",
    "og:image:alt": sprintImageAlt,
    "twitter:title": sprintTitle,
    "twitter:description": sprintDescription,
    "twitter:image": sprintImage,
    "twitter:image:alt": sprintImageAlt,
  },
  canonical: sprintUrl,
};

export function getStrategySprintMetadata(pathname: string) {
  const path = pathname.replace(/\/$/, "");
  if (path === "/checkout/strategy-sprint") return strategySprintMetadata;
  if (path === "/checkout/strategy-sprint/thank-you") {
    return {
      ...defaultMetadata,
      title: "Strategy Sprint Confirmed | Clarity Engine",
      tags: { ...defaultMetadata.tags, description: "Your 30-Day Growth Strategy Sprint is confirmed." },
    };
  }
  return undefined;
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Replace only existing metadata fields; retain the app shell and default HTML elsewhere.
export function strategySprintHtml(html: string, pathname: string) {
  const metadata = getStrategySprintMetadata(pathname);
  if (!metadata) return html;
  let result = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(metadata.title)}</title>`);
  for (const [key, value] of Object.entries(metadata.tags)) {
    const attribute = key.startsWith("og:") ? "property" : "name";
    result = result.replace(
      new RegExp(`<meta ${attribute}="${key}" content="[^"]*"\\s*\\/?>`),
      () => `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`,
    );
  }
  if (metadata.canonical) {
    result = result.replace("</head>", `    <link rel="canonical" href="${escapeHtml(metadata.canonical)}" />\n  </head>`);
  }
  return result;
}
