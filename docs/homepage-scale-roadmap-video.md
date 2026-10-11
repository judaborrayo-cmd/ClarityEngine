# Homepage process roadmap video

Replaced only the image beside the month-by-month process in How We Scale Paid Media in 90 Days. The homepage hero, process cards, CTA, surrounding copy, navigation, prices and checkout links are unchanged.

Approved MP4 copied unchanged to `client/public/videos/from-insight-to-scale-chart-motion.mp4` (2.9 MB, H.264, 1916×1080, 10.04 seconds, silent, fast-start metadata). Opening-frame WebP poster: `client/public/videos/from-insight-to-scale-chart-motion-poster.webp` (1280 pixels wide, 67 KB). The embedded Illustrative growth label remains in both assets.

The existing FounderHeroVideo component now accepts media/presentation props; its original About defaults and behavior are preserved. The roadmap variant uses object-contain inside the existing 16:9 rounded panel, viewport-triggered muted inline looping, offscreen/background pause, and a compact accessible keyboard play/pause control. Reduced motion starts on the poster and allows manual playback. Native looping returns to the approved opening frame, resetting the chart and multiplier. Failure falls back to the poster.

Verification: TypeScript, production build, shared metadata checks; Playwright at 320/390/768/1440 widths checked full composition, unchanged panel ratio/CTA/hero source, native end-to-start looping, pause/play keyboard controls, offscreen pause, reduced-motion manual playback and poster MIME/bytes. Screenshots reviewed on desktop/mobile. Existing About source/poster/loop/manual controls verified separately.
