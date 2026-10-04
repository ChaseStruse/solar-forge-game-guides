// Schedules supplied by the site owner. Canonical times use server time, UTC+9.
// Weekdays are JavaScript weekday numbers in server time (Sunday = 0).
export const SERVER_UTC_OFFSET_HOURS = 9;
export const CST_UTC_OFFSET_HOURS = -6;

export const events = [
  {id:'spacetime-rift', name:'Spacetime Rift', category:'Rifts', recurrence:{kind:'interval', startHour:2, everyHours:3}, serverSchedule:'Every 3 hours from 02:00'},
  {id:'shugo-festival', name:'Shugo Festival', category:'Events', recurrence:{kind:'hourly', minute:0}, serverSchedule:'Every hour at :00'},
  {id:'dimensional-invasion', name:'Dimensional Invasion', category:'Events', recurrence:{kind:'hourly', minute:30}, serverSchedule:'Every hour at :30'},
  {id:'watcher-kaira', name:'Watcher Kaira', category:'World Bosses', recurrence:{kind:'interval', startHour:1, everyHours:3}, serverSchedule:'Every 3 hours from 01:00'},
  {id:'artifact-siege', name:'Artifact Siege', category:'Abyss', recurrence:{kind:'weekly', weekdays:[1,4,6], hour:21, minute:0}, serverSchedule:'Mon, Thu, Sat at 21:00'},
  {id:'executor-tamasa', name:'Executor Tamasa', category:'World Bosses', recurrence:{kind:'weekly', weekdays:[1,4,6], hour:21, minute:30}, serverSchedule:'Mon, Thu, Sat at 21:30'},
  {id:'executor-argo', name:'Executor Argo', category:'World Bosses', recurrence:{kind:'weekly', weekdays:[1,4,6], hour:21, minute:30}, serverSchedule:'Mon, Thu, Sat at 21:30'},
  {id:'executor-kaira', name:'Executor Kaira', category:'World Bosses', recurrence:{kind:'weekly', weekdays:[1,4,6], hour:21, minute:30}, serverSchedule:'Mon, Thu, Sat at 21:30'},
  {id:'abyss-siege-boss', name:'Abyss Siege Boss', category:'World Bosses', recurrence:{kind:'weekly', weekdays:[0,5], hour:21, minute:0}, serverSchedule:'Sun, Fri at 21:00'}
];

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

export function nextOccurrence(event, now = Date.now()) {
  if (!Number.isFinite(now)) throw new TypeError('now must be a finite epoch timestamp');
  const serverNow = now + SERVER_UTC_OFFSET_HOURS * HOUR;
  const serverMidnight = Math.floor(serverNow / DAY) * DAY;

  // Seven days covers every weekly recurrence and the current day.
  for (let day = 0; day <= 7; day++) {
    const dayStart = serverMidnight + day * DAY;
    const weekday = new Date(dayStart).getUTCDay();
    const times = event.recurrence.kind === 'hourly'
      ? Array.from({length:24}, (_, hour) => hour * 60 + event.recurrence.minute)
      : event.recurrence.kind === 'interval'
        ? Array.from({length:Math.ceil((24 - event.recurrence.startHour) / event.recurrence.everyHours)}, (_, index) => (event.recurrence.startHour + index * event.recurrence.everyHours) * 60)
        : event.recurrence.weekdays.includes(weekday)
          ? [event.recurrence.hour * 60 + event.recurrence.minute]
          : [];
    for (const minute of times) {
      const occurrence = dayStart + minute * 60_000 - SERVER_UTC_OFFSET_HOURS * HOUR;
      if (occurrence >= now) return occurrence;
    }
  }
  throw new Error(`No next occurrence for ${event.id}`);
}

export function serverTimeToCstLabel(hour, minute = 0) {
  // Fixed UTC+9 to fixed UTC-6 is a 15-hour subtraction.
  const cstHour = ((hour + CST_UTC_OFFSET_HOURS - SERVER_UTC_OFFSET_HOURS) % 24 + 24) % 24;
  const dayShift = Math.floor((hour + CST_UTC_OFFSET_HOURS - SERVER_UTC_OFFSET_HOURS) / 24);
  return {hour:cstHour, minute, dayShift};
}
