# Aion 2 Classes

The Classes page uses `frontend/src/class-data.mjs` as its single content source. The eight class names and short descriptions are paraphrased from the [Aion 2 Wiki class overview](https://aion2.wiki.fextralife.com/Classes), reviewed on 2026-10-03. The Tank, DPS, and Healer grouping and order were specified by the site owner:

- Tank: Gladiator, Templar
- DPS: Elementalist, Assassin, Ranger, Sorcerer
- Healer: Cleric, Chanter

The source describes Gladiator as a heavy weapon melee fighter with area attacks. Its Tank placement is this site's party organization, so the class description should retain that melee identity without inventing defensive abilities. Templar is the clearly defensive frontline class in the source.

## Class Images

The eight 150×150 class icons in `frontend/public/assets/classes/` come from the corresponding images on the [Aion 2 Wiki class overview](https://aion2.wiki.fextralife.com/Classes). The wiki served PNG bytes under `.webp` URLs; these local copies were converted losslessly to actual WebP files without resizing. Filenames match class names in lowercase. The page credits the wiki for both descriptions and icons. The images remain third-party game imagery, separate from Solar Forge's original artwork.

The page is an overview, not a build guide. Keep summaries brief and avoid unsourced claims about skill names, stats, balance, patch changes, or required party composition. Link the source on the page. Use Title Case for headings and class names. Preserve the black and gold tokens in `docs/components.md`.

## Page Pattern

The public route is `/games/aion-2/classes/`, linked from the Aion 2 hub through the shared `hubFeature` component. The page uses the same black canvas, gold labels, borders, typography, and responsive gutters as the rest of the site. Its Tank, DPS, and Healer jump links use native anchors; the cards are informational until class guide pages exist. Desktop cards appear in two columns, mobile cards in one. The within-role index counts to that role's class total.
