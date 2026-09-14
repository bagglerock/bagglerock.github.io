# Portfolio screenshot handoff

The portfolio remains a static HTML/CSS site hosted on GitHub Pages. No React migration or build step is necessary.

## Status

| Project                  | Status                          | Image                                     |
| ------------------------ | ------------------------------- | ----------------------------------------- |
| Mastadon                 | Done — real app screenshot      | `assets/img/websites/mastadon.webp`       |
| Stock Lab (`stocks`)     | Done — real app screenshot      | `assets/img/websites/stock-lab.webp`      |
| Workout Logger Universal | Done — real app screenshots     | `assets/img/websites/workout-logger.webp` |
| NJ Pacific Deals (`storefront`) | Done — live-site screenshot | `assets/img/websites/nj-pacific-deals.webp` |

The Mastadon, Stock Lab, and Workout Logger Universal screenshots come from the applications actually running against seeded demo data. Workout Logger Universal is a composed side-by-side: the iOS (SwiftUI) session screen captured in the iOS Simulator and the Android (Jetpack Compose) home screen captured on an emulator, both from the app's own DEBUG sample workouts, laid out on the card's mat colour at 1600x1200 so the card keeps the same row height as its neighbour. The NJ Pacific Deals screenshot is the deployed storefront at https://njpacificdeals.com/, captured at 1600x1000 with Playwright; its listings are real and public on eBay, and the shop view is filtered to Shoes so the grid reads well at card size. No credentials, account identifiers, customer details, or private financial information appear in any of them. The Stock Lab market history is synthetic demo data generated for the capture; the anomalies, detector output, and chart were produced by Stock Lab's own scanner from that data, not hand-drawn.

## Note for whoever reseeds Mastadon

Mastadon's inventory table needs 1201px but its card caps the content area at 1150px, so the rightmost "Next step" column sits behind a ~51px horizontal scroll at every desktop width. That is why the featured card uses the stock-detail workflow screen rather than the inventory list.

## Validate

Run `python3 -m http.server 8000`. Inspect desktop, tablet, and 390px mobile widths; ensure screenshots remain legible, images load, and the page does not overflow. Check anchor links, the earlier-work disclosure, keyboard focus, JavaScript-disabled content, and reduced-motion behavior. Review before merging into the existing GitHub Pages publishing branch.
