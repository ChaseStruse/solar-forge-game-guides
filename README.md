# Solar Forge Game Guides

A lightweight, responsive HTML and HTMX site for MMORPG guides. The Aion 2 section includes event timers, classes, and a checklist.

## Local Preview

Serve the `frontend/` directory with any static file server. For example:

```sh
python -m http.server 4321 --directory frontend
```

Open **http://localhost:4321/**. Edit the HTML, CSS, or JavaScript in `frontend/` and refresh. No package installation or build command is required.

- `/` — home and game directory
- `/games/aion-2/` — Aion 2 hub
- `/games/aion-2/timers/` — event countdowns in fixed CST (UTC−6)
- `/games/aion-2/classes/` — classes grouped by Tank, DPS, and Healer
- `/games/aion-2/checklist/` — fifteen priorities with browser-saved progress
- `/preview/guide/` — guide layout example (not indexed)

## Cloudflare Pages

Framework preset: **None**. Build command: **leave empty**. Output directory: **`frontend`**. Deployment is not performed automatically by this repository.

Read [frontend architecture](docs/frontend.md), [reusable patterns](docs/components.md), and [AGENTS.md](AGENTS.md) before adding pages. Aion 2 content sources are documented in [timers](docs/timers.md), [classes](docs/classes.md), and [checklist](docs/checklist.md).
