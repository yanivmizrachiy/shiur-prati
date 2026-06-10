# Project Status — Targilim תרגילים

Last updated: 2026-06-10

## Current repository

`yanivmizrachiy/targilim`

## Current phase

MVP generator is live on GitHub Pages and verified by browser automation.

Public URL:

`https://yanivmizrachiy.github.io/targilim/`

## Completed

- Repository renamed to `targilim`.
- 10 real source PDFs uploaded.
- Preserved originals exist under `sources/intake/2026-06-09/originals`.
- `RULES.md` is the source of truth.
- README was corrected for the Targilim project.
- Official curriculum reference created under `sources/official/SOURCE_REFERENCE.md`.
- Source-learning notes 00-10 created under `source-learning/2026-06-09/`.
- Curriculum map created: `curriculum-map/CURRICULUM_MAP.md`.
- Question pattern index created: `question-patterns/PATTERN_INDEX.md`.
- Audit and architecture plan created: `docs/AUDIT_AND_ARCHITECTURE_PLAN_2026-06-09.md`.
- Knowledge base JSON files created for grades 7, 8, and 9.
- `generator/index.html` created and deployed from the `generator/` folder.
- Browser verification workflows created and updated.
- Legacy private tutoring app files archived under `archive/legacy-shiur-prati/2026-06-09/` and removed from the root.

## Active generator slices

| Slice | Topic | Status |
|---|---|---|
| G7-03 | Pythagoras — missing side | Active and verified |
| G7-04 | Missing angle in triangle | Active and verified |
| N7-06 | Powers: `(-a)^n` vs `-a^n` | Active and verified |
| A7-03 | First-degree equations | Active and verified |
| U8-01 | Mean, median, and range | Active; dedicated verification workflow added |

## Verification

| Item | Status |
|---|---|
| GitHub Pages | Live |
| Hebrew RTL UI | Verified |
| Grade/domain/topic selectors | Verified |
| Question generation | Verified for active slices; U8-01 workflow added |
| SVG diagram rendering | Verified for geometry slices |
| KaTeX math rendering | Verified |
| Solution panel | Verified |
| Export buttons | Verified present |
| Print / PNG / copy-as-image buttons | Present; browser workflows check presence |
| Console errors | None reported in verification |

## Archived legacy files

Moved to:

`archive/legacy-shiur-prati/2026-06-09/`

Archived files:

- `index.html`
- `app.js`
- `styles.css`
- `sw.js`
- `manifest.webmanifest`
- `quick-add.js`
- `assistant-sync.html`
- `auto-save.html`
- `auto-update.html`
- `payment-save.html`
- `planned-save.html`
- `today.html`
- `assets/icon.svg`
- `data/lesson-appointments.json`

## Current honest status

The project has a working MVP generator with five active slices. The repository is organized, the curriculum source material is documented, and the old private-tutoring root app has been archived.

## Remaining work

- Add more generator slices from `question-patterns/PATTERN_INDEX.md`.
- Expand teacher controls and editing options.
- Improve analytics after MVP decision.
- Add more browser tests as new slices are implemented.

## Recommended next slice

`G7-02` — area of flat shapes.

Reason: strong source coverage, useful geometry practice, and a natural next step after Pythagoras and missing angles.
