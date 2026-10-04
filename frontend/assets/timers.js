import {events, nextOccurrence, CST_UTC_OFFSET_HOURS} from './timer-schedule.js';

const eventById = new Map(events.map(event => [event.id, event]));
const cards = [...document.querySelectorAll('[data-timer-id]')].map(element => ({
  element,
  event:eventById.get(element.dataset.timerId),
  countdown:element.querySelector('[data-countdown]'),
  start:element.querySelector('[data-next-start]'),
  next:0
}));
const clock = document.querySelector('[data-cst-clock]');
const status = document.querySelector('[data-clock-status]');
const two = value => String(value).padStart(2,'0');

function cstDate(instant) {
  return new Date(instant + CST_UTC_OFFSET_HOURS * 3_600_000);
}
function formatCstStart(instant) {
  const date = cstDate(instant);
  const day = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][date.getUTCDay()];
  return `${day} ${two(date.getUTCMonth()+1)}/${two(date.getUTCDate())} · ${two(date.getUTCHours())}:${two(date.getUTCMinutes())} CST`;
}
function formatRemaining(ms) {
  const seconds = Math.max(0,Math.ceil(ms / 1000));
  const days = Math.floor(seconds / 86_400);
  const hours = Math.floor(seconds % 86_400 / 3_600);
  const minutes = Math.floor(seconds % 3_600 / 60);
  const rest = seconds % 60;
  return days ? `${days}d ${two(hours)}h ${two(minutes)}m ${two(rest)}s` : `${two(hours)}h ${two(minutes)}m ${two(rest)}s`;
}
function update() {
  const now = Date.now();
  const time = cstDate(now);
  clock.textContent = `${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][time.getUTCDay()]} ${two(time.getUTCHours())}:${two(time.getUTCMinutes())}:${two(time.getUTCSeconds())}`;
  for (const card of cards) {
    if (card.next < now) {
      card.next = nextOccurrence(card.event, now);
      card.start.textContent = formatCstStart(card.next);
      card.start.dateTime = new Date(card.next).toISOString();
    }
    card.countdown.textContent = formatRemaining(card.next - now);
  }
}
if (cards.length && clock && status) {
  status.textContent = 'Countdowns refresh every second.';
  update();
  const onVisibilityChange = () => { if (!document.hidden && clock.isConnected) update(); };
  document.addEventListener('visibilitychange', onVisibilityChange);
  const ticker = setInterval(() => {
    if (!clock.isConnected) {
      clearInterval(ticker);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      return;
    }
    update();
  }, 1000);
}
