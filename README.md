# Oscar Villalta — Portfolio

My personal website, featuring selected software projects, professional experience, and a little of my creative work.

**[Visit the portfolio →](https://bagglerock.github.io/)**

Built with HTML, CSS, and vanilla JavaScript. Hosted on GitHub Pages, with no framework or build step. The site includes responsive scroll animations, a logo carousel, shareable section links, and a simple layout option. Content remains available without JavaScript.

## Local preview

From the repository root, run:

```sh
python3 -m http.server 8000
```

Open [localhost:8000](http://localhost:8000). No dependencies to install.

## Editing

- `index.html` — page content, project descriptions, links, and metadata.
- `assets/css/` — layout, colors, and responsive styles.
- `assets/js/main.js` — startup and feature wiring.
- `assets/js/features/` — page layout, motion, navigation, and view preferences.
- `assets/js/components/` — reusable carousel and keyboard tabs.
- `assets/js/core/` — DOM-independent calculations and playback policy.
- `assets/img/` — photographs, logos, and project screenshots (`websites/`).

## Tests

With Node.js 22+ installed:

```sh
npm ci
npm test
npx playwright install chromium
npm run test:browser
```

`npm test` runs fast logic tests. Browser tests cover desktop and phone interactions, layout restoration, deep links, and fallbacks. `npm run check` runs both suites. Test dependencies are development-only; publishing still needs no build step.

See [the development guide](docs/development.md) for module boundaries and reuse notes.

## Publishing

GitHub Pages serves the site from the repository root on `master`. Merge changes into that branch to publish them.
