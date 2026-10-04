# Reusable components and visual language

Read this catalog before creating frontend UI. Source: `frontend/src/components.mjs` and `frontend/public/assets/site.css`. The live guide template is `/preview/guide/` while the local server runs.

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

## Renderer catalog

| Component | Input | Contract |
| --- | --- | --- |
| `layout` | `{title, description, content, current?, noindex?, scripts?}` | Full HTML document, metadata, skip link, header, footer, CSS, HTMX. `current: 'home'` marks the home link. `content` is trusted HTML; `scripts` lists local module URLs for page-specific behavior. |
| `sectionHeading` | `(eyebrow, title, detail?)` | H2 heading and optional supporting copy; stacks on mobile. Inputs are escaped. |
| `badge` | `(label)` | Noninteractive status, with decorative star. Never convey status by color alone. |
| `hubFeature` | `{id, eyebrow, title, description, href, cta, nativeNavigation?}` | Shared Aion 2 hub card for timers, classes, and checklist. Escapes text and renders a real link; `nativeNavigation` disables HTMX boost for pages that need a fresh module load. |
| `aionNav` | `(current)` | Aion 2 section tabs for Overview, Timers, Classes, and Checklist. Marks the active link with `aria-current="page"`; script-driven pages use native navigation. |
| `topicCard` | `{number, title, description}` | Noninteractive article for planned coverage. Includes explicit planned label. Do not use for published guides. |
| `guideLayout` | `{title, description, game, gameHref, category, updated, sections, content, notes?}` | Full guide document using shared shell; `sections: [{id,title}]` populates contents navigation. `content` and `notes` are trusted HTML. Preview is noindex by default. |
| `escape` | `(value)` | Escape data used in HTML text and quoted attribute values; does not sanitize unsafe URLs or rich HTML. |
| `arrow` | None | Decorative arrow HTML; accessible link name must come from surrounding text. |

## CSS and markup patterns

- `.forge-art`: fine orbital rings composed in CSS, with a local `solar-anvil.svg` illustration and no background sun or warm background wash. The parent provides the accessible image description; the nested SVG image has empty alt text. `.solar-anvil` scales within the illustration at every breakpoint. Keep the anvil’s horn, broad face, narrow waist, and flared base recognizable.
- `.container`: centered content width; 48px side gutters on desktop, 20px on mobile.
- `.section`, `.section-heading`, `.eyebrow`, `.lead`: standard section spacing and text hierarchy. Use exactly one H1 per page.
- `.button`: primary navigation CTA. Use an anchor for navigation and a real button for actions. `.button-secondary` is outlined. Minimum height is 48px.
- `.text-link`: gold secondary link with optional decorative arrow. Links need useful visible names, not repeated “click here.”
- `.game-card`: single clickable game directory card with `.game-art`, `.game-info`, `.game-card-top`, and `.tags`. Never nest interactive controls in the anchor. CSS art is decorative; the game name is real text.
- `.hub-feature-grid`, `.hub-feature`: shared three-column Aion 2 hub entries, reduced to two and then one column at the standard breakpoints. Keep each CTA as a real link.
- `.game-nav`: shared visible Aion 2 section links, wrapping on small screens. Active state uses gold fill plus `aria-current`.
- `.checklist-page`, `.checklist-item`, `.checklist-progress`: responsive task list based on `checklist-data.mjs`. Desktop rows show task, priority, and time columns; mobile rows stack metadata. Native labeled checkboxes work without JavaScript. Progress and clearing use a page module; the status line explains browser storage.
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

1. Look for an existing renderer and CSS pattern that can cover the use case.
2. Put genuinely reusable rendering in `components.mjs`; keep page content in `pages.mjs` or a dedicated future content module.
3. Use tokens; escape data; specify heading level and accessibility behavior.
4. Add the component's input contract, states, mobile behavior, and example usage here.
5. Verify it in a real page, then commit code and documentation together.
