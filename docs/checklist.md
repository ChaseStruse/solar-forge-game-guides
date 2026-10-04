# Aion 2 Weekly Priorities Checklist

The page content lives in `frontend/src/checklist-data.mjs`. The user-provided “Weekly Priorities” screenshot sets the **15 task names, order, priorities, and time estimates**. Time estimates are planning aids from that screenshot, not game limits, official durations, or promises. “1,5–3 Hours” in the image is normalized to “1.5–3 hr”. Keep the image's task labels, including “Odyle Morph”, “Wind Breeze”, and “Duty Missions”.

This list mixes daily tasks, weekly allowances, and timed events. Do not auto-reset it based on an assumed game reset schedule. Users clear their checks manually. Checkbox state is stored in `localStorage` for this browser and origin only. There is no account, sync, or backend. Without JavaScript, the static tasks, descriptions, sources, and native checkboxes remain usable for the current page visit.

Short activity descriptions are paraphrased from source pages linked beside each task. The sources are community guides and observed schedules; mechanics and regional limits can change. The page avoids precise item counts and patch-dependent rewards. Prefer developer documentation when it becomes available. Recheck a source before materially expanding a description.

| Task | Context source |
| --- | --- |
| Odyle Morph, Ascension Trial, Command Missions, Duty Missions | [Aion 2 Maps daily and weekly guide](https://aion2maps.com/guides/daily-and-weekly/) |
| Wind Breeze | [Aion 2 Maps global differences](https://aion2maps.com/guides/global-differences/) |
| Sanctuary, Daily Dungeons | [Aion 2 Maps dungeons and raids](https://aion2maps.com/guides/dungeons-and-raids/) |
| Conquest, Exploration | [Metaroad dungeon types](https://metaroad.gg/aion2/dungeons/aion-2-dungeon-system-expedition-transcendence-sanctuary) |
| Transcendence | [Aion 2 vi.ki Transcendence](https://aion2.vi.ki/transcendence) |
| Nightmare | [Aion 2 Maps Nightmare](https://aion2maps.com/guides/nightmare/) |
| Shugo Festival, Spacetime Rift | [Shugo.GG timers](https://shugo.gg/timers) |
| Abyss | [Aion 2 Maps Abyss](https://aion2maps.com/guides/abyss/) |
| Battlefield | [Aion 2 Maps PvP](https://aion2maps.com/guides/pvp/) |

The UI should use the shared black and gold palette and Title Case headings. Build task rows from the data module, keep links real, and make keyboard interaction and small screens first-class. The Aion 2 hub and game section navigation should link to `/games/aion-2/checklist/`.
