# Aion 2 timers

The timer source is `frontend/assets/timer-schedule.js`. The nine recurrences came from the site owner. All canonical schedules are in server time (UTC+9); no game facts were independently verified. Countdown calculations use UTC epoch time, so they do not depend on the visitor's computer timezone.

The requested CST display is fixed UTC−6. This is a 15-hour subtraction from server time, year round. If the desired behavior is Central Time with daylight saving, update the display policy and docs together; do not silently relabel CDT as CST.

| Event | Server time (UTC+9) | CST (UTC−6) |
| --- | --- | --- |
| Spacetime Rift | Every 3h from 02:00 | Every 3h from 11:00 on the previous day (11:00, 14:00, 17:00, 20:00, 23:00, 02:00, 05:00, 08:00) |
| Shugo Festival | Every hour at :00 | Every hour at :00 |
| Dimensional Invasion | Every hour at :30 | Every hour at :30 |
| Watcher Kaira | Every 3h from 01:00 | Every 3h from 10:00 on the previous day (10:00, 13:00, 16:00, 19:00, 22:00, 01:00, 04:00, 07:00) |
| Artifact Siege | Mon, Thu, Sat 21:00 | Mon, Thu, Sat 06:00 |
| Executor Tamasa | Mon, Thu, Sat 21:30 | Mon, Thu, Sat 06:30 |
| Executor Argo | Mon, Thu, Sat 21:30 | Mon, Thu, Sat 06:30 |
| Executor Kaira | Mon, Thu, Sat 21:30 | Mon, Thu, Sat 06:30 |
| Abyss Siege Boss | Sun, Fri 21:00 | Sun, Fri 06:00 |

The first event in a three-hour cycle moves to the previous CST calendar day. The weekly 21:00 server events remain on the same named CST calendar day. Compute the next occurrence from the canonical server recurrence; never advance a formatted CST label by hand.

## Page behavior

The public route is `/games/aion-2/timers/`, linked from the Aion 2 hub. Every event name, category, and CST recurrence is written in `frontend/games/aion-2/timers/index.html`. `frontend/assets/timers.js` computes each next server occurrence, renders its CST date, and updates the remaining duration once a second. The page loads with a normal navigation from the hub so its module initializes after HTMX navigation on the rest of the site. When leaving the page, the timer stops once its clock element is removed.

When JavaScript is unavailable, visitors still see all schedules and a message explaining that live countdowns need JavaScript. The countdown does not claim a frozen time. The current device clock drives the countdown; a wrong device clock produces a wrong countdown. The game calendar remains authoritative if the supplied schedule changes.

The cards follow the owner's supplied order and categories. They are informational; do not make them look clickable without adding a real destination. Keep `docs/components.md` current when changing their shared styling.

## Verification

When changing schedules, verify the three-hour midnight wrap, hourly minutes, weekday rollover, and fixed CST conversion. Chromium checks covered nine rendered countdowns, second-by-second ticking, 320/390/768/1440px widths, no-JavaScript schedules, navigation from home through the hub, and a second visit to the timers page.
