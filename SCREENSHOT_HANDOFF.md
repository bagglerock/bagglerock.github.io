# Portfolio screenshot handoff

The portfolio remains a static HTML/CSS site hosted on GitHub Pages. No React migration or build step is necessary.

## Status

| Project                  | Status                          | Image                                     |
| ------------------------ | ------------------------------- | ----------------------------------------- |
| Mastadon                 | Done — real app screenshot      | `assets/img/websites/mastadon.webp`       |
| Stock Lab (`stocks`)     | Done — real app screenshot      | `assets/img/websites/stock-lab.webp`      |
| Photos Cleaner           | Done — real app screenshot      | `assets/img/websites/photos-cleaner.webp` |
| Workout Logger Universal | Done — real app screenshots     | `assets/img/websites/workout-logger.webp` |
| NJ Pacific Deals (`storefront`) | Done — live-site screenshot | `assets/img/websites/nj-pacific-deals.webp` |

The Mastadon, Stock Lab, and Workout Logger Universal screenshots come from the applications actually running against seeded demo data; Photos Cleaner comes from the app running against a real Photos library, as described below. Workout Logger Universal is a composed side-by-side: the iOS (SwiftUI) session screen captured in the iOS Simulator and the Android (Jetpack Compose) home screen captured on an emulator, both from the app's own DEBUG sample workouts, laid out on the card's mat colour at 1600x1200 so the card keeps the same row height as its neighbour. The NJ Pacific Deals screenshot is the deployed storefront at https://njpacificdeals.com/, captured at 1600x850 with Playwright; it is the home page, and the featured listing it shows is real and public on eBay. The viewport height was chosen so the capture ends above the product row, keeping the card to the brand and the featured find. No credentials, account identifiers, customer details, or private financial information appear in any of them. The Stock Lab market history is synthetic demo data generated for the capture; the anomalies, detector output, and chart were produced by Stock Lab's own scanner from that data, not hand-drawn.

## Note on the Photos Cleaner capture

Photos Cleaner is a native macOS app, so it is captured with `screencapture` rather than a browser. Build and launch it from its own repository with `make run`, which opens the signed Release build with real Photos deletion disabled, then capture the window on its own:

```bash
screencapture -x -o -l<windowID> photos-cleaner.png
```

The window ID comes from `CGWindowListCopyWindowInfo`. `-o` drops the drop shadow so the window's rounded corners stay transparent and the card's `.photos-art` tint shows through them. The 1180x760 window captures at 2360x1520 on a Retina display and is resized to 1600 wide for the card. This needs Screen Recording permission for whatever process runs `screencapture`; without it the command fails with `could not create image from display`.

The app runs in Dark appearance here, so `.photos-art` uses a light slate (`#343a47`) instead of the pale tints the other cards use — a dark window on a dark mat loses its edges. If the capture is ever redone in Light appearance, that tint has to change with it.

Content note: this is the only card not backed by seeded demo data. It shows the owner's real Photos library, limited to landscape photographs and capture timestamps reviewed and approved for publication. `Docs/OWNER_DISPOSABLE_PHOTO_WALKTHROUGH.md` in the app's own repository asks that personal photos stay out of project records, so a recapture against a disposable test library would remove the caveat. Photos Cleaner has no demo fixtures to fall back on — the former `demo-group-*` groups are deliberately retired and filtered out of the queue.

## Note for whoever reseeds Mastadon

Mastadon's inventory table needs 1201px but its card caps the content area at 1150px, so the rightmost "Next step" column sits behind a ~51px horizontal scroll at every desktop width. That is why the featured card uses the stock-detail workflow screen rather than the inventory list.

## Validate

Run `python3 -m http.server 8000`. Inspect desktop, tablet, and 390px mobile widths; ensure screenshots remain legible, images load, and the page does not overflow. Check anchor links, the earlier-work disclosure, keyboard focus, JavaScript-disabled content, and reduced-motion behavior. Review before merging into the existing GitHub Pages publishing branch.
