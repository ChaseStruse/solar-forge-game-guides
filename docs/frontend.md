# Frontend architecture and workflow

## Structure

- `frontend/src/components.mjs`: shared page shell, section heading, badge, topic card, guide layout, escaping.
- `frontend/src/pages.mjs`: author-written home, Aion 2 hub, guide preview, and 404 content.
- `frontend/public/assets/site.css`: design tokens, components, responsive rules, CSS illustrations.
- `frontend/public/assets/timer-schedule.js`: canonical owner-supplied server-time recurrences and pure next-occurrence calculation.
- `frontend/public/assets/timers.js`: one-second client countdown and fixed CST clock, loaded only on the timer page.
- `frontend/src/timers-page.mjs`: static timer page and readable CST schedules.
- `frontend/src/class-data.mjs`: eight class descriptions and owner-specified role grouping.
- `frontend/src/classes-page.mjs`: static class overview using the shared layout and section headings.
- `frontend/public/assets/htmx.min.js`: pinned, self-hosted HTMX 4.0.0 runtime; license beside it.
- `frontend/public/_headers`: Cloudflare response headers, including content security policy.
- `frontend/build.mjs`: dependency-free Node static build. `frontend/dist/` is disposable output.
- `frontend/serve.mjs`: local preview only; not a production server.
- `frontend/check.mjs`: build integrity checks.

Node 22 or newer is required for development. There is no package installation or runtime backend. From the repository root:

```sh
npm run dev        # Build once and serve at http://localhost:4321
npm run build      # Rebuild after source edits; no automatic watcher
npm run check      # Build and verify links, assets, fragment targets, and structure
```

Routes: `/`, `/games/aion-2/`, `/preview/guide/`, `/games/aion-2/timers/`, `/games/aion-2/classes/`, and `/404.html`. The preview is excluded from indexing via robots metadata and robots.txt; it is deliberately absent from visitor navigation.

## Rendering and HTMX

HTMX 4 enhances same-origin anchors via `hx-boost:inherited="true"` on the body. Full static documents are served for both ordinary and boosted requests; no fragments API, backend, or client router is needed. Browser history and title updates are handled by HTMX. Native anchor links and `details` handle in-page navigation and disclosures.

The browser runs the vendored HTMX runtime on all pages. The timers page also loads a small native module to tick countdowns once a second; HTMX handles navigation, while native JavaScript handles clock math. Build scripts are Node JavaScript and do not ship to the browser. All pages remain usable without JavaScript. Future search, party tools, or mutations need real endpoints and a separate scope; do not add pretend controls.

HTMX 4 uses explicit inheritance. Reference [HTMX 4 docs](https://four.htmx.org/docs) before implementing new interactions. The minified runtime comes from `https://cdn.jsdelivr.net/npm/htmx.org@4.0.0/dist/htmx.min.js`. Preserve its license; pin and review upgrades. No CDN request happens during a visitor's session.

The CSP allows inline styles for HTMX style insertion, but restricts scripts to self and disallows eval. Avoid inline event handlers, `js:` expressions, or eval-dependent HTMX features. The preview server does not emulate Cloudflare `_headers`; test deployed header behavior before adding new integrations.

## Page recipes

**Home:** shared header → hero → principles → game directory → planned coverage → closing note → shared footer.

**Game hub:** breadcrumbs → game identity and honest status → coverage cards → next action. Publish verified guide links here as they become available; replace planned cards when warranted.

**Timers:** read [Aion 2 timers](timers.md) before changing schedules or labels. The Aion 2 hub links to the static timers route with native navigation so the page module initializes reliably. Show fixed CST (UTC−6) explicitly; countdowns depend on the visitor device clock. Keep all nine static schedules readable when scripts are disabled.

**Classes:** read [Aion 2 classes](classes.md) for content provenance and role ordering. The page uses shared layout and headings, class data from one module, responsive cards, and native role anchors. Keep the source link visible.

**Guide:** use `guideLayout()` and the preview route. Breadcrumbs, category, one H1, short summary, verified patch/region/review metadata, sticky desktop contents, article sections, sources and change notes. Mobile contents stay in normal flow. Match section IDs and contents anchors. The current helper always adds noindex for template safety; introduce an explicit publication option when real guides are added.

Add routes in the build registry. Use directory `index.html` output and absolute internal URLs. Do not copy the site header or footer into pages. Renderer HTML arguments are trusted author content: escape data strings and sanitize any future external rich content before rendering.

## Cloudflare Pages

Use the repository root as the project root, framework preset **None**, build command `npm run build`, and output directory `frontend/dist`. Set Node to 22 or newer. Select the intended production branch explicitly (current work is on `Aion2`). Cloudflare serves the generated directory and uses the top-level 404 page for missing routes. No SPA fallback or rewrites are needed.

See [Cloudflare static HTML deployment](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/). This change prepares deployment; it does not publish a site or provision an account. After deployment, verify deep links, missing-page 404 status, and `_headers` responses on the real URL.

## Validation before committing

Run `npm run check` (includes timer recurrence tests). Inspect `/`, `/games/aion-2/`, and `/preview/guide/` at 320, 390, 768, and 1440 CSS pixels. Verify no horizontal overflow, readable contrast, visible focus, skip link, table scrolling, and native disclosures. Test boosted navigation, browser Back/Forward, and navigation with JavaScript disabled. Check the browser console and missing asset responses.

Commit early, commit often. Document each shared component and behavior when it changes. Follow DRY principles and update the existing component before adding another implementation.

### Foundation verification (2026-10-03)

`npm run check` passed for all four documents. Chromium checks passed for HTMX 4.0.0 boosted navigation (without a document reload), title updates, browser Back, no-JavaScript navigation, the keyboard skip link, and the native guide disclosure. All four routes were checked for horizontal overflow at 320, 390, 768, and 1440px. Desktop home, mobile home, mobile Aion hub, and desktop guide screenshots were visually reviewed. No browser JavaScript errors occurred. Cloudflare deployment and production header behavior remain untested because this site has not been deployed.
