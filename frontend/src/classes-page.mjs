import {layout, escape, sectionHeading, arrow} from './components.mjs';
import {classGroups, classSource} from './class-data.mjs';

const classCount = classGroups.reduce((count, group) => count + group.classes.length, 0);

function classCard(characterClass, index, groupCount) {
  return `<article class="class-card">
    <div class="class-card-top"><span class="class-mark" aria-hidden="true">${escape(characterClass.mark)}</span><span class="class-index">${String(index + 1).padStart(2, '0')} / ${String(groupCount).padStart(2, '0')}</span></div>
    <h3>${escape(characterClass.name)}</h3><p>${escape(characterClass.description)}</p>
  </article>`;
}

function roleSection(group) {
  return `<section class="class-group" id="${escape(group.id)}">
    ${sectionHeading(`ROLE / ${String(classGroups.indexOf(group) + 1).padStart(2, '0')}`, group.title, group.summary)}
    <div class="class-grid">${group.classes.map((characterClass, index) => classCard(characterClass, index, group.classes.length)).join('')}</div>
  </section>`;
}

export const classesPage = () => layout({title:'Aion 2 Classes', description:'Explore the eight Aion 2 classes by Tank, DPS, and Healer role, with a quick description of how each plays.', content:`
<div class="container classes-page">
  <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">The Forge</a><span>/</span><a href="/games/aion-2/">Aion 2</a><span>/</span><span aria-current="page">Classes</span></nav>
  <header class="classes-intro"><div><p class="eyebrow">AION 2 · YOUR ROLE IN THE PARTY</p><h1>Find Your <em>Class.</em></h1><p class="lead">Eight ways to enter the fight. Start with the role you want to play, then find the class that feels right.</p></div><div class="classes-at-a-glance" aria-label="Eight classes across three roles"><strong>${String(classCount).padStart(2, '0')}</strong><span>CLASSES</span><i aria-hidden="true"></i><strong>${String(classGroups.length).padStart(2, '0')}</strong><span>ROLES</span></div></header>
  <nav class="role-nav" aria-label="Jump to class role">${classGroups.map(group => `<a href="#${escape(group.id)}">${escape(group.title)} <span>${String(group.classes.length).padStart(2, '0')}</span></a>`).join('')}</nav>
  ${classGroups.map(roleSection).join('')}
  <p class="class-source">Role grouping follows this guide’s party view. Class descriptions are adapted from the <a href="${escape(classSource)}">Aion 2 Wiki class overview ${arrow}</a>.</p>
</div>`});
