import {layout, escape, aionNav} from './components.mjs';
import {checklistItems} from './checklist-data.mjs';

function checklistItem(item, index) {
  return `<li class="checklist-item" data-checklist-item>
    <input class="checklist-input" type="checkbox" id="check-${escape(item.id)}" data-checklist-id="${escape(item.id)}">
    <div class="checklist-item-main"><label for="check-${escape(item.id)}"><span class="checklist-number">${String(index + 1).padStart(2, '0')}</span><span>${escape(item.title)}</span></label><p>${escape(item.description)} <a href="${escape(item.source)}" target="_blank" rel="noopener noreferrer">${escape(item.sourceLabel)} <span aria-hidden="true">↗</span></a></p></div>
    <span class="checklist-priority" data-priority="${escape(item.priority.toLowerCase())}">${escape(item.priority)}</span><span class="checklist-time">${escape(item.time)}</span>
  </li>`;
}

export const checklistPage = () => layout({
  title:'Aion 2 Checklist',
  description:'Track fifteen Aion 2 activities with priorities, time estimates, and short explanations.',
  scripts:['/assets/checklist.js'],
  content:`<div class="container checklist-page">
    <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">The Forge</a><span>/</span><a href="/games/aion-2/">Aion 2</a><span>/</span><span aria-current="page">Checklist</span></nav>
    ${aionNav('checklist')}
    <header class="checklist-intro"><p class="eyebrow">AION 2 · PLAN YOUR WEEK</p><h1>Weekly <em>Priorities.</em></h1><p class="lead">A practical list for deciding what to do next. Check off activities as you finish them, then clear the list when you’re ready for a new week.</p></header>
    <section class="checklist-panel" aria-labelledby="checklist-title"><div class="checklist-toolbar"><div><p class="eyebrow">YOUR PROGRESS</p><h2 id="checklist-title">Activity Checklist</h2><p class="checklist-count" data-checklist-count aria-live="polite">0 of ${checklistItems.length} complete</p></div><button type="button" class="button button-secondary checklist-clear" data-checklist-clear disabled>Clear Checks</button></div>
      <progress class="checklist-progress" data-checklist-progress max="${checklistItems.length}" value="0" aria-label="Checklist progress">0 of ${checklistItems.length} complete</progress>
      <p class="checklist-storage" data-checklist-status>Your checks are saved in this browser. Clear them when you want to start again.</p>
      <div class="checklist-head" aria-hidden="true"><span>Task</span><span>Priority</span><span>Time Invest</span></div>
      <ol class="checklist-list">${checklistItems.map(checklistItem).join('')}</ol>
    </section>
    <p class="checklist-footnote">Priorities and time estimates follow the supplied Weekly Priorities image; actual time and available activities can vary by character, region, and update. Activity notes link to community references.</p>
  </div>`
});
