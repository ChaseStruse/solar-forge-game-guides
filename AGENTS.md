# Solar Forge Game Guides — model instructions

Read `docs/README.md`, `docs/components.md`, and `docs/frontend.md` before frontend work.

- Commit early, commit often: make focused commits after each coherent, verified change. Never commit secrets or unrelated work.
- Document, document, document: update docs with every component, layout, behavior, or deployment change.
- Follow DRY principles. Reuse the components in `frontend/src/components.mjs`; consult `docs/components.md` before creating anything new.
- Keep frontend source inside `frontend/`. Generate static HTML using shared layouts; never edit `frontend/dist/`.
- Use HTMX 4 for enhanced interactions, native HTML for ordinary navigation and disclosure, and shared CSS for styling. Avoid a client framework.
- Preserve working links and content without JavaScript. HTMX 4 uses explicit `:inherited` attributes; do not copy v2 inheritance assumptions.
- Use the shared tokens, responsive layouts, focus styles, and guide template. Document additions in `docs/`.
- Verify mobile and desktop, keyboard access, route links, and a production build. Keep dependencies and asset sizes small.
- Do not invent game facts, guide counts, contributors, update dates, or functional tools. Label planned content honestly.
- Keep Cloudflare Pages deployment static until a feature explicitly requires a backend. Do not deploy without authorization.
