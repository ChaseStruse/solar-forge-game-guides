import test from 'node:test';
import assert from 'node:assert/strict';
import {events, nextOccurrence, serverTimeToCstLabel} from '../public/assets/timer-schedule.mjs';

const event = id => events.find(item => item.id === id);
const nextIso = (id, now) => new Date(nextOccurrence(event(id), Date.parse(now))).toISOString();

test('all nine event schedules have stable identifiers', () => {
  assert.equal(events.length, 9);
  assert.equal(new Set(events.map(item => item.id)).size, 9);
});

test('three-hour schedules wrap across the server day', () => {
  // 2026-10-04 23:00 server time is 2026-10-04 14:00 UTC.
  assert.equal(nextIso('spacetime-rift','2026-10-04T13:59:59Z'),'2026-10-04T14:00:00.000Z');
  assert.equal(nextIso('spacetime-rift','2026-10-04T14:00:01Z'),'2026-10-04T17:00:00.000Z');
  assert.equal(nextIso('watcher-kaira','2026-10-04T13:00:01Z'),'2026-10-04T16:00:00.000Z');
});

test('hourly event minutes stay distinct', () => {
  assert.equal(nextIso('shugo-festival','2026-10-04T00:15:00Z'),'2026-10-04T01:00:00.000Z');
  assert.equal(nextIso('dimensional-invasion','2026-10-04T00:15:00Z'),'2026-10-04T00:30:00.000Z');
});

test('weekly server weekdays convert to the correct UTC date', () => {
  // Sunday 23:00 UTC is Monday 08:00 server; Monday's 21:00 server siege is still ahead.
  assert.equal(nextIso('artifact-siege','2026-10-04T23:00:00Z'),'2026-10-05T12:00:00.000Z');
  assert.equal(nextIso('executor-tamasa','2026-10-05T12:31:00Z'),'2026-10-08T12:30:00.000Z');
  assert.equal(nextIso('executor-argo','2026-10-05T12:31:00Z'),'2026-10-08T12:30:00.000Z');
  assert.equal(nextIso('executor-kaira','2026-10-05T12:31:00Z'),'2026-10-08T12:30:00.000Z');
  assert.equal(nextIso('abyss-siege-boss','2026-10-04T12:01:00Z'),'2026-10-09T12:00:00.000Z');
});

test('CST conversion is fixed UTC-6, including previous-day times', () => {
  assert.deepEqual(serverTimeToCstLabel(2),{hour:11,minute:0,dayShift:-1});
  assert.deepEqual(serverTimeToCstLabel(1),{hour:10,minute:0,dayShift:-1});
  assert.deepEqual(serverTimeToCstLabel(21,30),{hour:6,minute:30,dayShift:0});
});
