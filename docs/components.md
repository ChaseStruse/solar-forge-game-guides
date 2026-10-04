# Reusable components and visual language

Read this catalog before creating frontend UI. Source: `frontend/src/components.mjs` and `frontend/public/assets/site.css`. The live guide template is `/preview/guide/` while the local server runs.

## Design tokens

| Token | Value | Purpose |
| --- | --- | --- |
| `--bg` | `#080909` | Page canvas |
| `--surface` | `#111211` | Cards and callouts |
| `--surface-raised` | `#191a17` | Raised surfaces |
| `--line` | `#302d23` | Quiet borders |
| `--text` | `#f4f0e5` | Primary text |
| `--muted` | `#aaa89f` | Supporting copy |
| `--accent` | `#e5c36e` | Gold actions and emphasis |
| `--accent-dark` | `#302817` | Dark accent surface |
| `--max` | `1200px` | Maximum container width |
| `--radius` | `8px` | Card radius |

Use system Arial/Helvetica for UI and Georgia for editorial italic emphasis. No external fonts. Large headings have tight spacing; body copy has generous line height. Reserve uppercase letter spacing for short labels. Use 4/8-pixel spacing increments where practical and the existing component spacing before custom values. Prefer warm gold accents, near-black surfaces, fine borders, and generous negative space. Do not add gradients to ordinary cards; illustrative hero art may use gradients.

## Renderer catalog

| Component | Input | Contract |
| --- | --- | --- |
| `layout` | `{title, description, content, current?, noindex?}` | Full HTML document, metadata, skip link, header, footer, CSS, HTMX. `current: 'home'` marks the home link. `content` is trusted HTML. |
| `sectionHeading` | `(eyebrow, title, detail?)` | H2 heading and optional supporting copy; stacks on mobile. Inputs are escaped. |
| `badge` | `(label)` | Noninteractive status, with decorative star. Never convey status by color alone. |
| `topicCard` | `{number, title, description}` | Noninteractive article for planned coverage. Includes explicit planned label. Do not use for published guides. |
| `guideLayout` | `{title, description, game, gameHref, category, updated, sections, content, notes?}` | Full guide document using shared shell; `sections: [{id,title}]` populates contents navigation. `content` and `notes` are trusted HTML. Preview is noindex by default. |
| `escape` | `(value)` | Escape data used in HTML text and quoted attribute values; does not sanitize unsafe URLs or rich HTML. |
| `arrow` | None | Decorative arrow HTML; accessible link name must come from surrounding text. |

## CSS and markup patterns

- `.forge-art`: celestial sun and orbital rings composed in CSS, with a local `solar-anvil.svg` illustration below the sun. The parent provides the accessible image description; the nested SVG image has empty alt text. `.solar-anvil` scales within the illustration at every breakpoint. Keep the anvil’s horn, broad face, narrow waist, and flared base recognizable.
- `.container`: centered content width; 48px side gutters on desktop, 20px on mobile.
- `.section`, `.section-heading`, `.eyebrow`, `.lead`: standard section spacing and text hierarchy. Use exactly one H1 per page.
- `.button`: primary navigation CTA. Use an anchor for navigation and a real button for actions. `.button-secondary` is outlined. Minimum height is 48px.
- `.text-link`: gold secondary link with optional decorative arrow. Links need useful visible names, not repeated “click here.”
- `.game-card`: single clickable game directory card with `.game-art`, `.game-info`, `.game-card-top`, and `.tags`. Never nest interactive controls in the anchor. CSS art is decorative; the game name is real text.
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
