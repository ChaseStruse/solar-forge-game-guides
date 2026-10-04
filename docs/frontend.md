# Frontend Architecture And Workflow

## Structure

`frontend/` is the directly deployable site. There is no package manager, build step, framework, or generated output directory.

| Path | Purpose |
| --- | --- |
| `frontend/index.html` | Forge homepage |
| `frontend/games/aion-2/index.html` | Aion 2 hub |
| `frontend/games/aion-2/timers/index.html` | Static schedules and countdown markup |
| `frontend/games/aion-2/classes/index.html` | Role and class overview |
| `frontend/games/aion-2/checklist/index.html` | Weekly priorities and source links |
| `frontend/preview/guide/index.html` | Noindex example for future guides |
| `frontend/404.html` | Missing-page document |
| `frontend/assets/site.css` | Shared tokens, layouts, components, and responsive rules |
| `frontend/assets/htmx.min.js` | Pinned, self-hosted HTMX 4.0.0; license beside it |
| `frontend/assets/timer-schedule.js`, `timers.js` | Browser countdown logic |
| `frontend/assets/checklist.js` | Browser progress storage and clear action |
| `frontend/_headers`, `frontend/robots.txt` | Cloudflare headers and crawler rules |

All public pages are hand-edited HTML. HTMX behavior is written as HTML attributes; there is no special `.htmx` extension. Native links, checkboxes, and `details` work without JavaScript. Live countdowns and saved checks need small browser scripts because HTMX cannot calculate or persist them without a server.

## Local Preview

Use any static file server pointed at `frontend/`. For example, if Python is available:

```sh
python -m http.server 4321 --directory frontend
```

Open `http://localhost:4321/`. Refresh after editing. Opening HTML directly from disk can break absolute links and browser storage.

## Pages And HTMX

HTMX 4 enhances same-origin links through `hx-boost:inherited="true"` on each page's body. Normal links remain usable if JavaScript is off. Timer and checklist links use `hx-boost="false"` so their page scripts start after a full load. Keep the same header, footer, skip link, metadata, Aion 2 section tabs, and breadcrumbs across pages. See [Reusable components](components.md) for the patterns.

Routes: `/`, `/games/aion-2/`, `/games/aion-2/timers/`, `/games/aion-2/classes/`, `/games/aion-2/checklist/`, `/preview/guide/`, and `/404.html`. The guide preview is noindex and excluded by `robots.txt`.

The content security policy in `_headers` restricts scripts to local files. Avoid inline handlers, eval, and HTMX expressions that require eval. Keep assets local and optimized.

## Page Recipes

**Home:** shared header → hero → principles → game directory → planned coverage → closing note → shared footer.

**Game hub:** breadcrumbs → section navigation → game identity → coverage cards → next action.

**Timers:** read [Aion 2 timers](timers.md). Keep all nine readable CST schedules in HTML. The browser script updates live countdowns.

**Classes:** read [Aion 2 classes](classes.md). Keep the owner-specified grouping and class image attribution.

**Checklist:** read [Aion 2 checklist](checklist.md). Keep all fifteen tasks, estimates, source links, native checkboxes, and manual clearing.

**Guide:** copy the structure of `/preview/guide/` and replace example content with sourced advice. Include breadcrumbs, one H1, summary, version and review metadata, contents links, article sections, sources, and change notes. Remove noindex only when ready to publish.

## Cloudflare Pages

Set framework preset to **None**, leave the build command **empty**, and set the output directory to **`frontend`**. No Node version or package install is needed. Select the intended production branch explicitly. Cloudflare serves directory `index.html` files and the top-level 404 page. No SPA rewrite is needed.

See [Cloudflare static HTML deployment](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/). This repository is not deployed automatically. After deployment, verify deep links, missing-page status, and `_headers` behavior on the real URL.

## Validation Before Committing

Inspect edited pages at 320, 390, 768, and 1440 CSS pixels. Check internal links, asset responses, fragment targets, unique IDs, one H1 per page, keyboard focus, mobile overflow, and browser console errors. Test navigation with and without JavaScript. For timer changes, verify recurrence and CST math; for checklist changes, verify saving, reload, and clearing.

Commit early and often. Update the component catalog and page documentation with every shared pattern or behavior change. Follow DRY by using existing CSS classes and markup patterns. When editing repeated shell markup, update every relevant HTML page in the same change.
