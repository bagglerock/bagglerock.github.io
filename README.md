# Oscar Villalta — Portfolio

Personal portfolio at https://bagglerock.github.io/ built with HTML, CSS, and progressive desktop scroll animations.

## Local preview

Run `python3 -m http.server 8000` from the repository root and open http://localhost:8000.
No dependency installation or build step is required.

## Editing

- `index.html`: bio, experience, projects, links, and logo gallery.
- `assets/css/style.css`: responsive layout and CSS project illustrations.
- `assets/css/storytelling.css`: desktop blue/gold opening, project scenes, and calm closing sections.
- `assets/js/app.js`: tablet/desktop scroll progress, accessible title reveals, motion cleanup, and footer year.
- `assets/js/screens.js`: reversible screen layout, logo carousel controls, and career tabs at 768px+.
- `assets/css/screens.css`: screen stops, responsive finale, and subtle background curves.
- `assets/img/`: original background, logos, historical project images, and the social share image (`og-cover.jpg`).
- `assets/img/websites/`: project screenshots used by the featured work cards.
- `robots.txt`, `sitemap.xml`, `favicon.ico`: search and browser metadata.

Mastadon, Stock Lab, Photos Cleaner, and Workout Logger Universal use real screenshots captured from the running applications — no customer, account, or live market data appears in them. Mastadon, Stock Lab, and Workout Logger Universal ran against seeded demo data. Photos Cleaner is a native Mac app captured from its own review queue against a real Photos library, limited to landscape photographs and capture timestamps the owner approved for publication. The Workout Logger Universal card is a composed side-by-side of the two native apps: the iOS (SwiftUI) build in the iOS Simulator and the Android (Jetpack Compose) build in an Android emulator, both running the app's own seeded sample workouts. NJ Pacific Deals is captured from the deployed site at https://njpacificdeals.com/ rather than from seeded data, so the featured listing it shows is a real public eBay listing. It is the one featured project with a public link. The remaining projects are private repositories and intentionally have no source/demo buttons. Add verified public links when available.

## Hosting

The root `index.html` is ready for GitHub Pages branch publishing. Keep the repository's existing Pages publishing configuration. Merging into its publishing branch updates the deployed site; a review branch does not change the live page.

React could also be hosted here after compiling to static assets, but this content-focused site does not need a framework or build pipeline.

## Manual checks

Preview desktop and mobile widths; check anchor navigation, keyboard focus, the earlier-work disclosure, images, and no horizontal overflow. The complete portfolio remains readable with JavaScript disabled. Reduced-motion settings disable smooth scrolling.

## Desktop storytelling

At 1100px and wider, the opening uses blue, gold, white, and CSS curves instead of the hero photograph. Project motion runs at all desktop heights. Scenes use sticky positioning only when the entire card fits below the navigation. Scroll progress drives screenshot depth/slide-in, letter-staggered titles, and upward exits. Scrolling remains native and reversible. Experience and contact settle into spacious closing sections; contact is centered. The creative gallery appears before the closing sections on desktop.

The enhanced experience now also supports phones. Simple view restores the original photo, card grid, section order, and contact layout at every width. Reduced-motion users receive the complete static page; changing that preference restores the original DOM. JavaScript-disabled visitors retain all content and links. No libraries or build step were added.

Preview checklist for this motion pass:
- Desktop at 1440×900: scroll through all five projects, pause on titles, reverse direction, and check that screenshots remain fully visible.
- Keyboard: navigate directly to Work/About/Contact and tab to the storefront link during a reveal.
- Resize to a short window and zoom to 200%: cards that no longer fit should unpin.
- Mobile at 390px and tablet at 820px: compare with the original layout and check for horizontal overflow.
- Toggle reduced motion while halfway down the page; verify all content remains readable.
- Disable JavaScript and confirm the complete portfolio remains available.

### Motion fix verification

Verified in headless Chromium at 1440×700: all five project reveals, increasing and reversing scroll progress, pinned upward exit, centered contact, and live reduced-motion toggling. Also checked 390×844: original mobile photograph, no story wrappers, and no horizontal overflow. No JavaScript page errors. Visually reviewed opening, mid-reveal, settled project, contact, and mobile screenshots.

The old 760px minimum-height activation gate was removed: height now controls only whether individual cards can pin. Versioned script and motion stylesheet URLs ensure browsers request this fix after deployment. The hero curve is blue and moved right to separate it from the gold headline.

## Screen chapters and logo carousel

Enhanced layouts show Earlier work, the creative carousel, and a combined career/contact finale as separate viewport-sized chapters. Native proximity scroll snapping and bounded sticky containers let each screen settle into place without intercepting wheel or touch events. Short or zoomed windows allow content to grow and scroll rather than clipping it. The final screen includes the footer and uses Experience, Background, and Skills & education tabs to keep all existing content available at readable sizes.

The carousel advances left to right every three seconds, highlights the center logo, pauses on hover/focus or when offscreen, and offers previous/next, pause/play, and tap-to-enlarge controls. Keyboard focus brings a logo to center. Reduced motion disables autoplay by default. Background tabs implement arrow/Home/End navigation. Switching to Simple view restores the original DOM, including the earlier-work disclosure and separate about/contact sections. On phones, Contact joins the finale tabs so the content fits without squeezing the sidebar.

Verified in Chromium at 1440×900, 1440×700, 1024×768, 820×1180, and phone width 390×844. Checks cover carousel autoplay and hover pause, manual selection, keyboard tabs, live phone-layout restoration, reduced motion, no horizontal overflow/page errors, native About/Contact anchor navigation, all finale tabs fitting at 1440×700, and content with JavaScript disabled. Opening, earlier-work, carousel, and finale screenshots were visually reviewed across desktop and tablet layouts.

## Adaptive experience and section URLs

- `experience-mode.js` chooses an enhanced or simple layout before the other enhancement scripts run. It checks required browser APIs and CSS support, honors reduced motion by default, and conservatively defaults to simple on devices reporting at most 2 logical cores or 2 GB device memory. These are heuristics, not a performance guarantee. The header's Simple view / Enhanced view switch persists locally and lets visitors choose. The no-JavaScript document is the normal photo-led page.
- `experience-mode.css` contains the normal-layout fallback and enhanced phone rules. On phones, all four finale tabs (Experience, Background, Skills & education, Contact) are available. Content that exceeds a short viewport grows naturally.
- `section-location.js` maintains `?section=...` with replaceState while scrolling, so reload returns to that chapter without flooding history. Explicit header navigation creates a history entry; Back/Forward restores it. Unrelated query parameters are retained.
- Supported section values: `home`, `work`, `mastadon`, `photos-cleaner`, `stock-lab`, `workout-logger`, `nj-pacific-deals`, `earlier`, `creative`, `experience`, `contact`.
- The carousel has a blue/gold control dock, faint chapter labels, a longer viewing hold, one snap target per chapter, and invisible edge repositioning to prevent a wrapped logo flashing through the center.

Verified mobile enhanced/simple switching, saved preference, phone Contact deep links, desktop switching, low-resource/reduced-motion/missing-feature defaults, 320/360/390/820/1440 widths without overflow, URL reload and Back, no-JavaScript fallback, and no page errors. Earlier checks also covered carousel autoplay/hover pause/selection and section updates without extra history entries. Browser checks use Chromium; real-device motion smoothness can vary.
