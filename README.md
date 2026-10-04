# Solar Forge Game Guides

A lightweight, responsive home for MMORPG guides. Starts with the central Forge homepage and an Aion 2 coming-soon hub.

## Local preview

Requires Node.js 22+. No dependency installation needed.

```sh
npm run dev
```

Open **http://localhost:4321**. Edit `frontend/`, then run `npm run build` and refresh; the preview server does not auto-rebuild.

- `/` — home and game directory
- `/games/aion-2/` — Aion 2 landing page
- `/games/aion-2/timers/` — live event countdowns in fixed CST (UTC−6)
- `/games/aion-2/classes/` — eight classes grouped by Tank, DPS, and Healer
- `/games/aion-2/checklist/` — fifteen weekly priorities with browser-saved progress
- `/preview/guide/` — reusable guide layout example (not indexed)

## Build and verify

```sh
npm run build
npm run check
```

Static output goes to `frontend/dist/`. Shared Node renderers eliminate repeated layout markup; the browser receives HTML, CSS, self-hosted HTMX 4.0.0, and a small countdown module on the timers page. No client framework, web fonts, database, or production Node server.

## Cloudflare Pages

Framework: **None**. Repository root: **root**. Build command: **`npm run build`**. Output: **`frontend/dist`**. Node: **22+**. Deployment is not performed automatically by this repository.

Read [class source and grouping](docs/classes.md), [timer schedules](docs/timers.md), and [checklist sources](docs/checklist.md) for content details. Read [frontend architecture](docs/frontend.md) for workflow and hosting, [reusable components](docs/components.md) for styling and composition, and [AGENTS.md](AGENTS.md) for future-model instructions.
