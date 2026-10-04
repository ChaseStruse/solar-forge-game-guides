# Reusable components and visual language

Read this catalog before creating frontend UI. Source: `frontend/assets/site.css` and the HTML pages in `frontend/`. The guide template is `/preview/guide/` while a local static server runs.

## Design tokens

| Token | Value | Purpose |
| --- | --- | --- |
| `--bg` | `#000000` | Page canvas |
| `--surface` | `#0a0a0a` | Cards and callouts |
| `--surface-raised` | `#141414` | Raised surfaces |
| `--line` | `#292929` | Quiet borders |
| `--text` | `#f4f0e5` | Primary text |
| `--muted` | `#aaa89f` | Supporting copy |
| `--accent` | `#e5c36e` | Gold actions and emphasis |
| `--accent-dark` | `#171717` | Dark accent surface |
| `--max` | `1200px` | Maximum container width |
| `--radius` | `8px` | Card radius |

Use system Arial/Helvetica for UI and Georgia for editorial italic emphasis. No external fonts. Use Title Case for all page titles, H1–H3 headings, card titles, captions, and disclosure titles: capitalize every word (for example, “Event Timers” and “Before You Begin”). Keep body copy and action labels in natural sentence case. Large headings have tight spacing; body copy has generous line height. Reserve uppercase letter spacing for short labels. Use 4/8-pixel spacing increments where practical and the existing component spacing before custom values. Prefer warm gold accents, neutral black and charcoal surfaces, fine borders, and generous negative space. Do not add gradients to ordinary cards; illustrative hero art may use gradients.

## HTML Patterns

| Pattern | Example | Contract |
| --- | --- | --- |
| Page shell | `frontend/index.html` | Doctype, metadata, skip link, header, main, footer, local CSS, and local HTMX script. Copy the shell when adding a page and update its title, description, and navigation state. |
| Section heading | Home `#games` | `.section-heading` with eyebrow, H2, and optional detail. Keep one H1 per page. |
| Status badge | Aion 2 hub | `.badge` is informational; status must be stated in text. |
| Hub feature | Aion 2 hub | `.hub-feature` with H2, summary, and a real CTA link. Set `hx-boost="false"` when the destination requires a page script. |
| Aion section tabs | Any Aion 2 page | `.game-nav` contains Overview, Timers, Classes, and Checklist. Mark exactly one link `aria-current="page"`. |
| Planned topic card | Home and Aion hub | `.topic-card` is noninteractive and explicitly labeled as planned coverage. |
| Guide layout | `frontend/preview/guide/index.html` | Breadcrumbs, category, one H1, summary, contents links, readable article, source notes. Remove noindex only for a verified published guide. |

## CSS and markup patterns

- `.forge-art`: fine orbital rings composed in CSS, with a local `solar-anvil.svg` illustration and no background sun or warm background wash. The parent provides the accessible image description; the nested SVG image has empty alt text. `.solar-anvil` scales within the illustration at every breakpoint. Keep the anvil’s horn, broad face, narrow waist, and flared base recognizable.
- `.container`: centered content width; 48px side gutters on desktop, 20px on mobile.
- `.section`, `.section-heading`, `.eyebrow`, `.lead`: standard section spacing and text hierarchy. Use exactly one H1 per page.
- `.button`: primary navigation CTA. Use an anchor for navigation and a real button for actions. `.button-secondary` is outlined. Minimum height is 48px.
- `.text-link`: gold secondary link with optional decorative arrow. Links need useful visible names, not repeated “click here.”
- `.game-card`: single clickable game directory card with `.game-art`, `.game-info`, `.game-card-top`, and `.tags`. Never nest interactive controls in the anchor. CSS art is decorative; the game name is real text.
- `.hub-feature-grid`, `.hub-feature`: shared three-column Aion 2 hub entries, reduced to two and then one column at the standard breakpoints. Keep each CTA as a real link.
- `.game-nav`: shared visible Aion 2 section links, wrapping on small screens. Active state uses gold fill plus `aria-current`.
- `.checklist-page`, `.checklist-item`, `.checklist-progress`: responsive task list in `frontend/games/aion-2/checklist/index.html`. Desktop rows show task, priority, and time columns; mobile rows stack metadata. Native labeled checkboxes work without JavaScript. A small browser script handles progress and clearing; the status line explains browser storage.
- `.classes-page`, `.role-nav`, `.class-group`, `.class-grid`, `.class-card`: responsive class overview with in-page role links and noninteractive class summaries. Two class columns on desktop, one on mobile. Each card includes a locally hosted 150×150 WebP class icon and a within-role index. The icon has empty alt text because the adjacent H3 gives the class name.
- `.timers-page`, `.timer-grid`, `.timer-card`, `.timer-clock`: timer page, responsive three/two/one-column card grid, informational event card, and fixed CST clock. Labels and schedules remain visible without JavaScript. Cards are not interactive.
- `.topic-grid`: three columns on desktop, one on mobile. `.topic-card` is informational and must not look like an enabled tool.
- `.breadcrumbs`: labeled navigation with slash separators; mark the current destination with `aria-current="page"`.
- `.status-panel`, `.forge-note`: status and follow-on navigation with one clear action.
- `.guide-layout`, `.toc`, `.guide-content`: desktop sidebar and readable article column, stacked below 700px.
- `.callout`: important contextual note with a gold border. Critical requirements should remain visible.
- `.table-scroll`: focusable horizontal scrolling region around a semantic table. Supply region label, caption, and column headers.
- Native `details`/`summary`: optional supporting content, keyboard accessible without JavaScript.

## Responsive and accessibility rules

Breakpoints are 1050px and 700px. Header navigation wraps into a visible second row on mobile; no hidden menu state or extra script. Cards stack, contents navigation becomes inline, and long tables scroll inside their own region. Preserve 320px support.

All interactive elements have visible keyboard focus. The skip link targets `#main`; its `tabindex="-1"` supports focus transfer. Decorative illustrations must use `aria-hidden="true"`, or use a concise descriptive `role="img"` label when meaningful. Respect reduced motion. Do not remove outlines or invent clickable divs.

Illustrations are original CSS and SVG geometry, not official Aion art. The `AION 2` treatment is typographic and must not be described as an official logo. Future images need explicit dimensions, descriptive alt text when meaningful, and optimized local assets; lazy-load below the fold.

## Adding a reusable component

1. Look for an existing HTML and CSS pattern that covers the use case.
2. Reuse the existing classes and structure. HTML is edited directly; update repeated shell or navigation markup on every affected page.
3. Use tokens; escape authored text and attribute values; specify heading level and accessibility behavior.
4. Document the pattern, states, mobile behavior, and example page here.
5. Verify it in a real page, then commit code and documentation together.
