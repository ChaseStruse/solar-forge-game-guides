# Solar Forge Game Guides — Model Instructions

Read `docs/README.md`, `docs/components.md`, and `docs/frontend.md` before frontend work.

- Commit early, commit often: make focused commits after each coherent, verified change. Never commit secrets or unrelated work.
- Document, document, document: update docs with every component, layout, behavior, or deployment change.
- Follow DRY principles. Reuse the CSS and HTML patterns in `docs/components.md` before creating anything new.
- Keep the entire deployable site in `frontend/`. Edit its HTML files directly; there is no package manager, Node build, or generated output directory.
- Use HTMX 4 attributes for enhanced navigation and interactions that a static site can support. Use native HTML for ordinary links, checkboxes, and disclosure. Keep the small browser scripts for local countdowns and saved checks; HTMX alone cannot compute or persist those without a backend.
- Preserve working links and content without JavaScript. HTMX 4 uses explicit `:inherited` attributes; do not copy v2 inheritance assumptions.
- Capitalize every word in page and section titles, including card and guide titles (for example, “Event Timers”). Follow `docs/components.md` for styling.
- Use the shared black and gold tokens, responsive layouts, focus styles, and guide template. Document additions in `docs/`.
- Verify mobile and desktop, keyboard access, route links, and the directly served static site. Keep assets small.
- Do not invent game facts, guide counts, contributors, update dates, or functional tools. Label planned content honestly.
- Keep Cloudflare Pages deployment static until a feature explicitly requires a backend. Do not deploy without authorization.
