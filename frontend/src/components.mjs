// These helpers accept trusted author-written HTML; escape all data strings.
export const escape = (value) => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const arrow = '<span aria-hidden="true">↗</span>';
export const badge = (label) => `<span class="badge"><span aria-hidden="true">✦</span> ${escape(label)}</span>`;
export const sectionHeading = (eyebrow, title, detail = '') => `<div class="section-heading"><div><p class="eyebrow">${escape(eyebrow)}</p><h2>${escape(title)}</h2></div>${detail ? `<p>${escape(detail)}</p>` : ''}</div>`;
export function topicCard({number, title, description}) {
  return `<article class="topic-card"><span class="topic-number">${escape(number)}</span><h3>${escape(title)}</h3><p>${escape(description)}</p><span class="quiet-label">PLANNED COVERAGE</span></article>`;
}
export function hubFeature({id, eyebrow, title, description, href, cta, nativeNavigation = false}) {
  return `<section class="hub-feature" aria-labelledby="${escape(id)}"><div><p class="eyebrow">${escape(eyebrow)}</p><h2 id="${escape(id)}">${escape(title)}</h2><p>${escape(description)}</p></div><a class="button" href="${escape(href)}"${nativeNavigation ? ' hx-boost="false"' : ''}>${escape(cta)} <span aria-hidden="true">↗</span></a></section>`;
}
export function layout({title, description, content, current = '', noindex = false, scripts = []}) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="${escape(description)}">${noindex ? '<meta name="robots" content="noindex">' : ''}<meta name="theme-color" content="#000000"><title>${escape(title)} · Solar Forge Game Guides</title><link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/assets/site.css"><script src="/assets/htmx.min.js" defer></script></head>
<body hx-boost:inherited="true"><a class="skip-link" href="#main">Skip to content</a>
<header class="site-header"><div class="container header-inner"><a class="brand" href="/" aria-label="Solar Forge Game Guides home"><img class="brand-mark" src="/assets/favicon.svg" width="43" height="43" alt=""><span>SOLAR FORGE<small>GAME GUIDES</small></span></a><nav aria-label="Main navigation"><a href="/" ${current === 'home' ? 'aria-current="page"' : ''}>The Forge</a><a href="/#games">Games</a><a href="/#about">Our approach</a></nav><span class="header-note"><i></i> Built for the adventure</span></div></header>
<main id="main" tabindex="-1">${content}</main>
<footer class="site-footer"><div class="container footer-inner"><a class="brand footer-brand" href="/"><img class="brand-mark" src="/assets/favicon.svg" width="43" height="43" alt=""><span>SOLAR FORGE<small>GAME GUIDES</small></span></a><p>A little preparation. A better adventure.</p><a href="#main">Back to top ↑</a></div><div class="container fine-print"><span>Independent guides. Forged with care.</span><span>Not affiliated with game developers or publishers.</span></div></footer>
${scripts.map(src => `<script type="module" src="${escape(src)}"></script>`).join('')}</body></html>`;
}
export function guideLayout({title, description, game, gameHref, category, updated, sections, content, notes = ''}) {
  return layout({title, description, noindex: true, content: `<div class="container guide-page"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">The Forge</a><span>/</span><a href="${escape(gameHref)}">${escape(game)}</a><span>/</span><span>Guide</span></nav><p class="eyebrow">${escape(category)} · TEMPLATE PREVIEW</p><h1>${escape(title)}</h1><p class="lead">${escape(description)}</p><p class="guide-meta">${escape(updated)}</p><div class="guide-layout"><aside><nav class="toc" aria-label="On this page"><p class="eyebrow">ON THIS PAGE</p>${sections.map(s => `<a href="#${escape(s.id)}">${escape(s.title)}</a>`).join('')}</nav></aside><article class="guide-content">${notes ? `<div class="callout">${notes}</div>` : ''}${content}</article></div></div>`});
}
