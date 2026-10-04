import {layout, escape, sectionHeading, aionNav} from './components.mjs';
import {events, serverTimeToCstLabel} from '../public/assets/timer-schedule.js';

const weekdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const clock = (hour, minute) => `${String(hour).padStart(2,'0')}:${String(minute).padStart(2,'0')}`;

function cstSchedule(event) {
  const rule = event.recurrence;
  if (rule.kind === 'hourly') return `Every hour at :${String(rule.minute).padStart(2,'0')}`;
  if (rule.kind === 'interval') {
    const times = Array.from({length:Math.ceil((24 - rule.startHour) / rule.everyHours)}, (_, index) => {
      const serverHour = rule.startHour + index * rule.everyHours;
      const converted = serverTimeToCstLabel(serverHour);
      return clock(converted.hour, 0);
    }).sort();
    return `Every 3 hours · ${times.join(', ')}`;
  }
  const converted = serverTimeToCstLabel(rule.hour, rule.minute);
  const days = rule.weekdays.map(day => weekdays[(day + converted.dayShift + 7) % 7]);
  return `${days.join(', ')} at ${clock(converted.hour, converted.minute)}`;
}

function eventCard(event) {
  return `<article class="timer-card" data-timer-id="${escape(event.id)}">
    <div class="timer-card-head"><span class="timer-category">${escape(event.category)}</span><span class="timer-pulse" aria-hidden="true"></span></div>
    <h3>${escape(event.name)}</h3>
    <p class="timer-schedule">${escape(cstSchedule(event))} <span>CST</span></p>
    <div class="timer-result"><div><span class="timer-label">NEXT IN</span><strong class="timer-countdown" data-countdown>—</strong></div><div><span class="timer-label">NEXT START</span><time data-next-start>See CST schedule above</time></div></div>
  </article>`;
}

export const timersPage = () => layout({title:'Aion 2 Timers', description:'Live countdowns to the next Aion 2 events, rifts, world bosses, and abyss sieges, shown in fixed CST (UTC−6).', scripts:['/assets/timers.js'], content:`
<div class="container timers-page"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">The Forge</a><span>/</span><a href="/games/aion-2/">Aion 2</a><span>/</span><span aria-current="page">Timers</span></nav>
${aionNav('timers')}
<header class="timers-intro"><div><p class="eyebrow">AION 2 · LIVE SCHEDULE</p><h1>Event <em>Timers.</em></h1><p class="lead">Know what’s next. Plan your run around events, rifts, world bosses, and sieges.</p></div><div class="timer-clock"><span class="timer-label">CURRENT TIME · CST (UTC−6)</span><strong data-cst-clock>—</strong><span>Fixed Central Standard Time</span></div></header>
<div class="timer-notice"><span aria-hidden="true">✦</span><p>Schedules are shown in <strong>fixed CST (UTC−6)</strong>, converted from server time (UTC+9). Countdowns use your device clock. <span data-clock-status>Enable JavaScript for live countdowns; the schedules below remain available.</span></p></div>
<section class="section timer-section" id="timers">${sectionHeading('UPCOMING ACTIVITIES', 'Keep Every Event In Sight.', 'Nine event schedules, organized by activity. Each countdown updates once a second.')}<div class="timer-grid">${events.map(eventCard).join('')}</div></section>
<p class="timer-footnote">Times follow the schedules provided for this guide. If an in-game schedule changes, the game’s event calendar takes precedence.</p></div>`});
