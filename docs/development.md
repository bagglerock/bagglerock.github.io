# Development guide

The HTML is the complete, usable page. JavaScript adds behavior through native ES modules; there is no bundle or framework runtime. Serve the folder over HTTP for module imports.

## Where changes belong

| Location | Responsibility |
| --- | --- |
| `index.html` | Content, semantic markup, metadata |
| `assets/css/` | Base styles and enhancement styles; existing order is intentional |
| `assets/js/main.js` | Explicit initialization order |
| `assets/js/features/` | Portfolio-specific selectors and composition |
| `assets/js/components/` | Carousel DOM behavior and accessible tab interactions |
| `assets/js/core/` | Pure calculations, URL helpers, capability policy, timer scheduling |
| `tests/unit/` | Boundary cases and behavior policies, using Node's test runner |
| `tests/browser/` | Real interaction and reversible-layout regressions |

The view controller is passed to features rather than stored on `window`. Chapters compose the page before project measurements and section restoration run. Keep that order when adding features.

## Reusing behavior

- `createPlayback({ advance, delay, clock })` manages one autoplay timer. Feed it pause, hover, visibility, and document visibility state; call `destroy()` when unmounting. Injecting a clock makes timer policy testable without real waits.
- `mountCarousel(grid, reducedMotionQuery)` enhances a grid of figures containing images and captions, and returns cleanup. It uses the carousel classes in `screens.css`; copy those styles with the component. It is not a general-purpose slider library.
- `bindTabs(tabs, panels, on)` supplies selection and keyboard behavior to existing tab markup. The caller provides listener registration and owns cleanup.
- `core/` helpers have no page selectors or browser globals and can be imported into another app directly.

## Lifecycle rules

Layout features move existing nodes rather than clone content. Save their original positions and restore them on teardown. Each mounted carousel owns its listeners, observer, and timer. Repeated Simple/Enhanced switches and viewport changes must never duplicate wrappers, controls, or timers.

Reduced motion and device capability hints select the default view; the visitor can choose a supported view explicitly. Keep all content accessible in the static layout. Short windows must release sticky positioning rather than clip content.

## Verification

Run `npm run check` after installing dependencies and Playwright Chromium (see README). Python 3 serves the browser fixture. No GitHub Actions workflow is required.

Browser tests exercise both desktop and touch phone contexts. They cover the Play/Pause regression, repeated layout switching, contact deep links, keyboard tabs, preference persistence, reduced motion, and no-JavaScript content. The fast unit suite covers circular indexes, timer cleanup, section selection, URL preservation, animation limits, and label fitting.

For visual changes, also inspect a tablet and a short desktop window. Tests validate behavior, not every visual detail. `CHROMIUM_PATH` optionally selects an existing Chromium executable for constrained development environments.
