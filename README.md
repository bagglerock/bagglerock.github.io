# Oscar Villalta — Portfolio

Personal portfolio at https://bagglerock.github.io/ built with HTML, CSS, and a small JavaScript enhancement for the footer year.

## Local preview

Run `python3 -m http.server 8000` from the repository root and open http://localhost:8000.
No dependency installation or build step is required.

## Editing

- `index.html`: bio, experience, projects, links, and logo gallery.
- `assets/css/style.css`: responsive layout and CSS project illustrations.
- `assets/js/app.js`: optional footer year enhancement.
- `assets/img/`: original background, logos, historical project images, and the social share image (`og-cover.jpg`).
- `assets/img/websites/`: project screenshots used by the featured work cards.
- `robots.txt`, `sitemap.xml`, `favicon.ico`: search and browser metadata.

Mastadon, Stock Lab, Photos Cleaner, and Workout Logger Universal use real screenshots captured from the running applications — no customer, account, or live market data appears in them. Mastadon, Stock Lab, and Workout Logger Universal ran against seeded demo data. Photos Cleaner is a native Mac app captured from its own review queue against a real Photos library, limited to landscape photographs and capture timestamps the owner approved for publication. The Workout Logger Universal card is a composed side-by-side of the two native apps: the iOS (SwiftUI) build in the iOS Simulator and the Android (Jetpack Compose) build in an Android emulator, both running the app's own seeded sample workouts. NJ Pacific Deals is captured from the deployed site at https://njpacificdeals.com/ rather than from seeded data, so the featured listing it shows is a real public eBay listing. It is the one featured project with a public link. The remaining projects are private repositories and intentionally have no source/demo buttons. Add verified public links when available.

## Hosting

The root `index.html` is ready for GitHub Pages branch publishing. Keep the repository's existing Pages publishing configuration. Merging into its publishing branch updates the deployed site; a review branch does not change the live page.

React could also be hosted here after compiling to static assets, but this content-focused site does not need a framework or build pipeline.

## Manual checks

Preview desktop and mobile widths; check anchor navigation, keyboard focus, the earlier-work disclosure, images, and no horizontal overflow. The complete portfolio remains readable with JavaScript disabled. Reduced-motion settings disable smooth scrolling.
