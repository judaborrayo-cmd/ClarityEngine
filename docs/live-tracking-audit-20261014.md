# Live Clarity Engine tracking audit and implementation plan

The live website does not show a functioning Clarity Engine GA4, GTM, Google Ads or Meta Pixel installation in the tested first-party pages. Google/Meta libraries do load inside the Calendly booking iframe, and YouTube embeds make advertising-related requests. These are confirmed provider activities, not proof that conversions are being measured in Clarity Engine's advertising accounts. No site-wide cookie-consent control was observed; the Calendly fallback is an embedded iframe whose URL explicitly hides its provider banner, not merely an external booking link.

No tags, IDs, advertising accounts, payment links or production settings were changed during this audit. The revised Privacy Policy is drafted for review and has not been published.

## Scope and method

Audit date: October 14, 2026. Live origin: https://www.clarity-engine.org . Production policy/source checkpoint: 04e04ab7ef4478ecd36520f6e811b43584898eab; deployment dpl_ANb7CcyRtd6T527mey6KCWXcBmbB.

Inspected 14 live routes in desktop Chromium and iPhone 13 Chromium emulation, using two fresh, nonauthenticated browser contexts. Each visit included initial-load observation, screenshot and scrolling to trigger lazy embeds. Captured 687 browser requests across 28 visits, response status/types, script URLs and first-party deployed script contents, public tracking-ID patterns, top-page globals, iframe globals, cookie names/domains, storage keys, and visible consent controls. A focused homepage inspection also checked iframe consent elements, request initiators, normal SPA navigation to About, and browser back. All 28 document responses were HTTP 200.

Routes: home, About, Services, Case Studies, Hapi Art and Lisa Nichols case studies, Growth Clarity Audit, Assessment sales, Strategy Sprint, Sprint checkout, legacy Audit checkout, new disabled $3,725 Audit review, Privacy Policy, and Terms.

No forms, bookings or payments were submitted; no real customer/private assessment records or advertising-account settings were accessed. The Assessment sales page automatically attempted its ordinary first-party view event. Account ownership, receiving-property data, geo-dependent consent behavior, other browsers, paid checkout/fulfillment, and server-to-server traffic are not established by this browser audit. Browser geolocation would not substitute for a genuine regional network/consent test.

## Technology status

“Missing” below means missing from the observed Clarity Engine first-party installation, not proof that no property/account exists elsewhere. “Unverified” means the necessary account-side or server-side evidence was not available.

| Technology | Status | Live evidence |
| --- | --- | --- |
| Clarity Engine GA4 | Missing in tested first-party pages | No G- measurement ID, gtag configuration, GA4 collect request, _ga cookie, or top-page gtag/dataLayer found. Calendly separately requested legacy analytics.js and gtag/js within its booking frame; neither establishes a site-owned GA4 property. |
| Clarity Engine GTM | Missing in tested first-party pages | No GTM- container ID or gtm.js container request, including normal SPA navigation/back. A gtag/js URL hosted on googletagmanager.com is not a GTM container installation. Calendly's internal Google runtime objects do not establish a site container. |
| Google Ads conversion tracking | Missing in tested first-party pages | No AW- destination/conversion ID or site-owned conversion request observed. No conversion was submitted during testing. |
| Clarity Engine Google remarketing | Missing in tested first-party pages | No site-owned remarketing configuration or _gcl cookie observed. Google/DoubleClick requests originated from YouTube video frames; these are provider activity, not proof of Clarity Engine remarketing audiences. |
| Clarity Engine Meta Pixel | Missing in tested first-party pages | No top-page fbq, pixel initialization/ID, facebook.com/tr event request, _fbp or _fbc cookie observed. Calendly's iframe fetched fbevents.js and exposed an fbq function in some runs. Library loading alone does not confirm a configured site Pixel or successful event delivery. |
| Meta Conversions API | Unverified | A browser cannot inspect server-to-server delivery. No CAPI integration was identified in the deployed repository, but external integrations, gateways or account-side delivery require Events Manager and server/provider evidence. Do not conclude “absent everywhere.” |
| Site-wide cookie consent | Missing in tested interface | No site consent banner, accept/reject/settings control or first-party consent storage observed. No first-party consent-mode command found in deployed scripts. |
| Calendly consent tooling | Confirmed provider-only; inconsistent paths | Normal desktop embed loaded OneTrust scripts and its iframe dataLayer contained OneTrust/Optanon group events. Focused fallback iframe used hide_gdpr_banner=1, with no visible consent controls in that frame. The focused network trace also attributed later Google/Meta library requests to the banner-hidden fallback. This does not manage all Clarity Engine site cookies. |
| First-party Assessment events | Confirmed attempted; not successfully recorded | Desktop and mobile each sent POST /api/audit/events with event sales_page_view; both returned HTTP 503. Current event persistence is not verified. |
| Duplicate/conflicting site tags | None observed; account-side status unverified | No duplicate top-page tracking script URLs or active first-party installations found. Multiple provider libraries in an iframe are not duplicate Clarity Engine installations. Different Calendly initialization/fallback paths produce different provider behavior and require reconciliation. |

## Confirmed provider traffic and cookies

On the desktop homepage, these HTTP 200 library requests originated from the Calendly frame:

- https://www.google-analytics.com/analytics.js
- https://www.googletagmanager.com/gtag/js (without a site measurement ID in the observed URL)
- https://connect.facebook.net/en_US/fbevents.js

The Calendly frame also requested OneTrust, Segment integrations, Braze and Sprig assets, reCAPTCHA and Stripe resources. These are observed components of Calendly's embedded page, not evidence of direct Clarity Engine contracts/accounts with each service. Provider behavior varied across browser runs and embed paths; a function or library is not proof that a conversion reached a particular account.

Hapi Art and Lisa Nichols YouTube frames requested googleads.g.doubleclick.net/pagead/id and static.doubleclick.net/instream/ad_status.js on desktop and mobile. Cookies observed across the browsing journeys included Calendly __cf_bm, _cfuvid and OptanonConsent; Replit __cf_bm; Stripe m on m.stripe.com through the scheduler; and YouTube YSC, VISITOR_INFO1_LIVE, VISITOR_PRIVACY_METADATA and related __Secure- cookies. Contexts were fresh at the start of each desktop/mobile journey and reused across that journey, so cookie inventories on later pages can include cookies set by earlier embeds. No first-party Clarity Engine cookie was observed before checkout; the configured Assessment purchase cookie was not triggered by this audit.

The fallback source and the live focused frame both use hide_gdpr_banner=1. Calendly documents that this hides its cookie banner and that cookies can still be used; it directs sites that hide the banner to manage preferences and delay the embed until the relevant consent. [Calendly cookie management and banner](https://calendly.com/help/calendly-cookie-management-and-banner).

The existing /ux-enhancements.js request still returns HTML and causes a script parse warning. No tracking installation was attributed to that failed script. Current Assessment API 503 responses and the unverified waitlist endpoint are prior operational issues, not introduced by this audit.

## Calendly fallback verification and recommended correction

Owner clarification: keep Calendly's own cookie banner enabled for embedded scheduling; verify whether the hiding flag affects an actual embed or only an external fallback link. No new consent-management system is requested within the SEO/audit scope.

**Confirmed: it affects an actual embedded fallback iframe.** `client/src/components/CalendlyInline.jsx` waits two seconds for widget initialization. If that fails, it returns an `<iframe title="Calendly" data-testid="calendly-iframe-fallback">`, not an external anchor. Its `src` is the existing booking URL with `embed_domain`, `embed_type=Inline` and `hide_gdpr_banner=1`. The normal `Calendly.initInlineWidget` path uses the booking URL without the hiding parameter. The earlier live trace also captured the fallback as a frame on the homepage.

Fresh live verification tested normal desktop loading and forced fallback on desktop/phone, achieved by blocking the widget JavaScript only in the test browser. The normal widget rendered an iframe without the hiding parameter. Both forced fallback DOMs rendered an actual iframe with the hiding parameter; no external Calendly anchor appeared in the scheduling section. In a browser-only correction preview, removing the parameter retained the same booking destination and rendered the existing event/calendar plus visible Calendly Cookie settings, Decline and I understand controls on both desktop and phone after loading. No booking was submitted. No production files or account settings changed. The DOM/frame records are saved as `calendly-fallback-verification.json` and `calendly-fallback-desktop-verification.json`, with screenshots in the audit evidence folder.

**Recommended one-line correction:**

```jsx
const src = `${CALENDLY_URL}?embed_domain=${embedDomain}&embed_type=Inline`;
```

Remove the hiding parameter only. Preserve the existing booking event URL, normal widget initialization, two-second fallback, configured height (including page-specific overrides), full width, classes and frame title. Do not replace the embed with a mandatory new consent gate or add a consent-management platform as part of this audit. Keep any ordinary external booking links unchanged.

Validation for the eventual implementation: check normal and blocked/delayed-widget paths on desktop and phones; confirm the fallback source no longer contains the hiding parameter, that one usable booking frame renders and the event/date/time controls remain usable; inspect Calendly's cookie-settings/banner behavior with fresh storage and applicable regional conditions. The provider's UI may depend on its region/preferences/loading logic, so absence of a visible banner in a particular run must not be interpreted as proof that suppression remains enabled. Leaving its banner enabled is not a claim that it handles all website cookies or guarantees site-wide compliance.

Status: verification and recommendation only. The website scheduler source and live deployment were not changed in this follow-up. No booking, new tracking or new consent-management system was created.

## Recommended implementation order

### 1. Confirm ownership and fix measurement prerequisites

Obtain owner-verified GA4 property/web-stream, GTM container, Google Ads account/conversion actions and Meta Business/dataset IDs associated with www.clarity-engine.org and Invision Group Inc./Clarity Engine. Inventory existing account settings, tag containers, Vercel injections, linked Calendly analytics and any external CAPI/gateway before adding code. Reuse appropriate existing assets only after matching owner and domain; do not copy IDs from client case studies or Calendly's internal libraries. No IDs were discovered or invented for an implementation.

Resolve the existing Assessment API configuration and reliable purchase verification, and verify the waitlist's actual successful storage/notification response before treating its form as a lead. These are separate implementation tasks. Keep the $3,725 link inactive until its dedicated confirmation/fulfillment flow is complete; never infer payment from the old thank-you page or a supplied session_id.

### 2. Implement consent before optional tracking

Use a site-wide preference system with clear Accept, Reject and settings choices, separable optional analytics/advertising preferences, versioned saved choices and a persistent footer link to change/withdraw choices. Keep essential payment verification and security functions usable when optional tracking is rejected.

Recommend blocking optional Google/Meta tags until opt-in as the initial conservative configuration, subject to the locations served and approved legal requirements. If using Google Consent Mode, define analytics_storage, ad_storage, ad_user_data and ad_personalization before any tag loads and update them from the visitor's choice. Google's basic mode blocks Google tags until consent; advanced mode can send cookieless measurements while denied and should not be selected silently. [Google consent-mode overview](https://developers.google.com/tag-platform/security/concepts/consent-mode).

Review UK/EU and other served regions before activation; targeted advertising and storage/access technologies can require prior consent, and any analytics exception must be assessed rather than assumed. Honor sale/sharing opt-outs and Global Privacy Control where applicable to the business and processing. [ICO advertising guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/how-do-the-rules-apply-to-online-advertising/), [California privacy guidance](https://www.oag.ca.gov/privacy/ccpa).

For the current SEO/audit scope, follow the owner's preference to keep Calendly's own cookie banner enabled: remove only hide_gdpr_banner=1 from the embedded fallback iframe URL. The normal widget URL already omits it. Keep the event destination, embed_domain, embed_type=Inline, dimensions, styling and existing fallback behavior. No new site-wide consent-management system or tracking installation is part of this correction. A future site-wide system for new advertising/analytics remains a separate project requiring approval. Similarly, any future YouTube consent changes must be separately scoped; a privacy-enhanced embed URL alone is not proof of no collection. These are documented recommendations, not deployed changes.

### 3. Use one installation and one event source

Recommend a single owner-verified GTM container for approved public marketing routes rather than installing both GTM and hardcoded copies of each tag. Configure one GA4 destination, the owner's Google Ads actions and one owner's Meta dataset after approval. Import GA4 key events into Google Ads OR use direct Ads conversions as the primary source for each action; do not count both as separate primary conversions for the same outcome.

For SPA page views, choose one history/route method. If using explicit sanitized route events, disable competing automatic/configuration/history page views and ensure initial load, route transitions and browser back each emit once. Google cautions against manual page views in parallel with automatic page-view measurement. [GA4 page-view measurement](https://developers.google.com/analytics/devguides/collection/ga4/views?technology=websites).

Disable automatic form matching/capture and additional personal-data features until reviewed. Keep /audit/* private assessment/resume/report routes out of Google/Meta tracking entirely, including raw URLs, tokens, session_id, answers, notes, emails and company context. Tags loaded on an earlier marketing route must also stop sending when the SPA enters a private route. Allowlist sanitized public page paths and approved campaign parameters; never send arbitrary query strings. Google prohibits sending identifiable personal information through Analytics. [Google Analytics PII guidance](https://support.google.com/analytics/answer/6366371).

### 4. Measure actual business outcomes

| Outcome | Proposed event/source | Counting rule |
| --- | --- | --- |
| Offer interest | view_item on public offer/review pages | Product identifier and display price; a microconversion, not revenue or a lead. Distinguish Assessment, Sprint, legacy Audit and new Audit. |
| Checkout intent | begin_checkout at a valid checkout start/outbound action | Once per genuine attempt; not purchase. Never fire for the disabled $3,725 button. |
| Verified sale | purchase from verified paid Stripe fulfillment | Actual product, amount, currency and stable opaque transaction ID. Payment verification required; deduplicate webhook retries and exclude merely opening a thank-you route. |
| Refund | refund after confirmed refund processing | Link to the original transaction and actual amount; do not generate another purchase or invent net revenue. |
| Completed inquiry/waitlist | generate_lead after backend-confirmed accepted submission | Count only after valid success and actual storage/handling; not a button click or an HTTP 200 HTML fallback. |
| Confirmed booking | One approved booking-complete event from verified Calendly event/webhook | One event per booking. Identify intro/onboarding type; a paid customer's onboarding is not a new acquisition lead. No booking creation performed in this audit. |
| Qualified lead | Qualified-lead outcome from owner-reviewed sales process | Future phase; no CRM is currently verified. Not every email click or booking is qualified. |
| Contact intent | Separate email/contact click event | Secondary engagement metric; never label a mailto click as a submitted/qualified lead. |
| Assessment engagement | Existing first-party completion/use events | Restore reliable operation; keep customer answers, report tokens and work content away from ad platforms. Private-page tracking requires a separate privacy review. |

GA4 documents view_item, begin_checkout, purchase, refund and generate_lead; purchase transaction_id supports duplicate prevention. [GA4 event reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events). Final event mappings and which actions are primary for campaign optimization need owner approval.

Optional server-side Google/Meta measurement is a later phase after verified fulfillment and consent handling. It must not bypass a refusal or opt-out. If Pixel and CAPI send the same outcome, use one stable event identity shared between channels and verify deduplication in Meta Events Manager before production. CAPI account/endpoint setup and current Meta requirements still need an authenticated owner-account check; no CAPI implementation was made or assumed here.

### 5. Validate before publishing tracking or revised disclosures

Use owner-controlled test assets, tag preview/debug tools and approved test purchases/bookings. Cover fresh visits, reject/accept by category, withdrawal, returning visitor, SPA navigation/back, mobile, blocked scripts and relevant regional environments. Confirm no optional requests/cookies before consent in the chosen basic approach, no trackers on private routes, exactly one page view per transition, one purchase per verified payment, correct product amounts and deduplication, and no names/emails/tokens in payloads. Verify matching property/account receipt, not just a library request returning 200.

Update the Privacy Policy with the actual activated providers, purposes, data categories, choices and confirmed retention. An intended future platform is not a current provider. Publish the approved policy/consent experience together with the validated tracking configuration; do not activate undisclosed tags first.

## Privacy Policy draft and remaining decisions

The accompanying owner-clarification draft identifies Zoom calls and optional Zoom recordings/summaries; Krisp transcription and potentially AI notes/summaries; Google Drive storage/sharing already used; optional meeting-dependent recording/transcription; and possible AI processing of relevant transcripts/client materials for agreed deliverables with appropriate confidentiality safeguards. It states that no email-marketing platform is connected and none selected. It updates tracking language with the live iframe findings without claiming a site-owned GA4/Meta installation.

Still confirm the recording/transcription notification and consent procedure; precise cloud accounts/locations and sharing access; any AI tools beyond those named, account/provider processing and training settings; retention/deletion/backups; database host/region; CRM and waitlist workflow; customer jurisdictions, transfer requirements and sale/sharing practices. No standard retention period has been established. No claim is made that every meeting is recorded, that training is categorically excluded, or that a consent procedure is already verified.

Review status: draft only. The deployed policy remains the October 14 release until the revised text is reviewed and publication is authorized. No new advertising or analytics technology was installed.

## Evidence artifacts

Local folder: /Users/homefolder/workspaces/ClarityEngine/output/tracking-audit-20261014 . `evidence.json` contains request/frame/cookie/script summaries for all 28 visits; `focused-evidence.json` contains the fallback and SPA inspection; screenshots include the initial desktop/mobile states and focused Calendly view. Raw evidence is kept local and is not included in the public website bundle.
