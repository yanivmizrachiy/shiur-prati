# Targilim — Central Rules & AI Operating Guide
# תרגילים — דף כללים מרכזי לבינה מלאכותית ולמפתחים

Repository: `yanivmizrachiy/targilim` · Hebrew name: `תרגילים`
**Last updated: 2026-06-16** · Baseline: 2026-06-14

> **This file is the central operating guide.** Any AI or developer must read it
> (and `PROJECT_STATUS.md`) before any change. It overrides older claims found in
> historical docs. When this file and code disagree, **the code + verifiers win** —
> fix this file.

---

## 1. What the project is

- A **Hebrew, RTL** smart math **exercise generator** for **Grades 7–8 only** (no Grade 9).
- Fully source-bound: every question maps to one of the **10 approved source PDFs**.
- It is a **print-first teaching product**, not an online auto-graded task.
- Capabilities: single-exercise + numbered worksheet generation, mixed question
  types, answer key, **teacher mode**, **engine gallery**, **visual-QA dashboard**,
  and **image export** (copy/download a whole question as PNG).
- **Live site:** GitHub Pages serves `generator/` from `main`:
  https://yanivmizrachiy.github.io/targilim/
  - **The live site reflects `main` only.** Changes on open branches do **not**
    appear on the site until they are merged into `main` and Pages redeploys.

---

## 2. Source-of-truth map (do not duplicate; reference these)

| Concern | Source of truth |
|---|---|
| Operating rules / forbidden actions / merge order | **`RULES.md`** (this file) |
| Current project status snapshot | **`PROJECT_STATUS.md`** |
| Pedagogy / per-topic intent | **`docs/SOURCE_BIBLE.md`** |
| **Single truth snapshot (what exists NOW)** | **`PROJECT_TRUTH.md`** ← added 2026-06-16 |
| Approved source materials | `sources/intake/2026-06-09/` (10 PDFs) |
| Live engine inventory (the real list) | **`generator/engine/source-registry.js`** |
| Quality gates | **`package.json`** scripts (`verify:deep`) |
| Coverage gaps roadmap | `docs/reports/SOURCE_BACKED_COVERAGE_GAPS_20260614.md` |
| PDF duplicate audit | `docs/reports/PDF_DUPLICATE_AUDIT_20260614.md` |
| Verifier/tool index | `tools/README.md` · Docs index `docs/README.md` |
| Phase 1 requirements status | `REQUIREMENTS_STATUS.md` |
| Historical docs (do not act on) | `docs/planning/PRODUCT_REQUIREMENTS.md` · `docs/planning/TRUE_GENERATOR_TEACHER_CONTROLS_REQUIREMENTS.md` |

Before adding any fact to docs, check it does not already live in one of the
above. If it does, **link to it — do not copy it**.

---

## 3. Repository structure

```text
generator/                     the live site + the generator runtime
generator/engine/               engines, source-registry, pedagogy-registry, diagrams
generator/sw.js                 PWA Service Worker (added 2026-06-16, PR #31)
generator/manifest.webmanifest  PWA manifest (added 2026-06-16, PR #31)
generator/icon.svg              PWA icon (added 2026-06-16, PR #31)
sources/                        approved source PDFs (protected)
docs/                           documentation
docs/reports/                   audit, coverage and hardening reports
docs/planning/                  historical planning docs (tagged — do not act on)
tools/                          verifiers and deep checks (run via package.json)
.github/workflows/              CI + GitHub Pages deployment
PROJECT_STATUS.md               current status snapshot
PROJECT_TRUTH.md                single truth snapshot — what exists NOW (added 2026-06-16)
RULES.md                        this central operating guide
```

---

## 4. Iron rules (forbidden without explicit approval)

- **Do not work directly on `main`.** Feature branches only; merge via PR.
- **No force push.**
- **No merge to `main`** without `verify:deep` green in GitHub Actions **and** Yaniv's explicit approval.
- **Do not delete** source PDFs or `sources/.../originals/`.
- **Do not change** `generator/engine/source-registry.js` without a proven reason.
- **No new engine without full planning** (registry + pedagogy + docs + verifiers + count update). Check first whether it already exists.
- **No `A8-04-ENGINE`** — A8-04 (inequalities) is a **legacy/source-fit topic in `a8-03.js`**, intentionally not a dedicated engine. (A8-05 = percent equations, also legacy.)
- **No "engine 51".** The inventory is **50 engines / 0 fallback** — keep it unless a planned, approved change updates the count everywhere.
- **Do not weaken a verifier.** Adding guards is fine; loosening existing checks is not.
- **No demo / mock / placeholder / fake controls.** All output must be real and source-grounded.
- **Do not invent questions** without a source. No new Grade-8 numeric/uncertainty content without **new** source intake.
- **Do not claim something is done if it only exists on a branch** and is not merged.
- **Every PR must pass `npm run verify:deep`.**
- **Update docs** (`PROJECT_STATUS.md`, this file) after any meaningful change — truthfully.

---

## 5. UI/UX round — fully merged to `main`

All UI/UX branches from the 2026-06-15 round are **merged and live** on the site.

| PR | Purpose | Status |
|---|---|---|
| #21 | Professional card + Assistant typography | ✅ MERGED |
| #22 | Single untitled student answer box | ✅ MERGED |
| #23 | Premium image export + color/BW mode | ✅ MERGED |
| #24 | verify:premium-ui guard wired into verify:deep | ✅ MERGED |
| #27 | Worksheet polish (sharp math rects, no question-type badge) | ✅ MERGED |
| #28 | Real A7-04 multi-correct (forward mcqMode; verify:multi-correct) | ✅ MERGED |
| #29 | No blank answer box for MCQ/TF question types | ✅ MERGED |
| #30 | Level selector shows רמה 1/2/3 and actually drives difficulty | ✅ MERGED |
| #19 | Luxury landing page (factual, dry copy) | ✅ MERGED |
| #20 | Central AI rules + status refresh | ✅ MERGED |

**Open branch — not yet merged:** `docs/critical-improvements-20260616` → PR #31
(SOURCE_BIBLE fix, PROJECT_TRUTH.md, PWA, gallery filter, sticky CTA, verify:pwa 22/22 PASS)

---

## 6. Verified completed work (empirically confirmed, 2026-06-16)

- **GitHub Pages** publishes `generator/` from `main` — live at https://yanivmizrachiy.github.io/targilim/
- **`npm run verify:deep`** — 24 gates (was 23; `verify:pwa` added 2026-06-16).
- **50 engine topics (`*-ENGINE`) / 0 fallback** — runtime-verified from `source-registry.js`.
- **No `A8-04-ENGINE`** — A8-04 inequalities is legacy/source-fit inside `a8-03.js`.
- **PDF inventory = 20:** 10 working (`01-…`–`10-…`) + 10 in `originals/` (intentional backups, no deletion).
- **A7-04 multi-correct — DONE** (PR #28): `mcqMode` forwarded through all wrappers; multi → 2 correct, single → 1 correct. `verify:multi-correct` in `verify:deep`.
- **MCQ shuffle** — real shuffle (א/ב/ג/ד even distribution), no leakage.
- **Print-first** — teacher-only content hidden in print/export. Verified.
- **Image export** — `captureExerciseCardAsPng` unified, waits fonts.ready + 2x rAF. PNG includes full card and drawings.
- **Level selector** — רמה 1 / רמה 2 / רמה 3 labels drive `basic/standard/challenge` correctly (PR #30).
- **No blank answer box under MCQ/TF** (PR #29) — answer space only for open/mistake types.

### SOURCE_BIBLE — fixed 2026-06-16 (branch PR #31)

`tools/gen-source-bible.mjs` had hardcoded `"33 active + 17 fallback"` — fixed to dynamic calculation from `E.PEDAGOGY[id].status`. `docs/SOURCE_BIBLE.md` regenerated: header now correctly reads **`50 dedicated engines / 0 fallback`**.

### PWA — added 2026-06-16 (branch PR #31, pending merge)

| File | Description |
|---|---|
| `generator/manifest.webmanifest` | RTL Hebrew, display:standalone, name/short_name/icon |
| `generator/sw.js` | Network-first service worker, offline fallback, pre-cache core assets |
| `generator/icon.svg` | Dark `#0f172a` bg, blue ת, gold ² superscript |
| `generator/index.html` | `<link rel="manifest">`, `<link rel="apple-touch-icon">`, SW registration |
| `tools/verify-pwa.mjs` | 22/22 checks: manifest JSON + fields, icon, sw.js structure, index.html wiring |
| `package.json` | `verify:pwa` wired to end of `verify:deep` |

### Gallery filter improvements — 2026-06-16 (branch PR #31)

- Label "Provenance" → **"מוצא מקור"** (Hebrew)
- `.active-filter` CSS class: blue border + light blue bg when filter is active
- **✕ איפוס** button: resets all 4 filters in one click
- Uniform select/input styling across the filter bar

### Sticky CTA + progress indicator — 2026-06-16 (branch PR #31)

- `#stickyGenBar`: `position:fixed; bottom:0`, dark backdrop, Intersection Observer on `#btnGenMain` — shown only when main button scrolled out of viewport
- G2: `⏳ מכין…` spinner on generate() start, `הופקו N תרגילים בהצלחה ✓` on completion
- Double rAF before `origGenerate()` — allows spinner repaint before heavy sync work

### Multi-correct status (2026-06-16)

| Engine | Status |
|---|---|
| A7-04 (ביטויים שקולים) | ✅ DONE — PR #28 merged |
| 49 other engines | ⏳ PENDING Phase 2 — still emit 1 correct in multi mode |

Phase 2: add real multi-correct paths only where natural and source-grounded. See `NEXT_STEPS.md`.

## 7. PR and branch status (2026-06-16)

```text
MERGED to main:
  #19 luxury landing page (factual dry copy)
  #20 central AI rules + status refresh
  #21 professional card + typography
  #22 single untitled student answer box
  #23 premium image export + color/BW only
  #24 verify:premium-ui guard
  #27 worksheet polish (sharp math rects, no question-type badge)
  #28 real A7-04 multi-correct (forward mcqMode; verify:multi-correct)
  #29 no blank answer box under MCQ/TF
  #30 level selector רמה 1/2/3 drives difficulty correctly

OPEN — awaiting verify:deep green + Yaniv approval:
  #31 docs/critical-improvements-20260616
      SOURCE_BIBLE fix, PROJECT_TRUTH.md, PWA (manifest+sw+icon),
      gallery filter (Hebrew labels + active-filter + reset),
      sticky CTA + progress indicator, verify:pwa (22/22 PASS)

STALE / DO NOT MERGE without full review:
  claude/source-fit-coordinate-chart-v1
  claude/source-fit-visual-expansion-v2
  a804clean
  fix/release-docs-baseline-20260614 (v1 + v2)
  sources-intake-20260609

CLOSED / SUPERSEDED:
  #25 (superseded by #28)
  #26 (resolved by #27, closed manually)
```

`verify:deep` gates (24 total, current on PR #31 branch):
`hygiene · baseline · brand · links · book · inventory · source-fit · source-lock · source-bible · premium-geometry · coordinate-grid · numeric7 · algebra8 · geometry7 · geometry8 · runtime · coverage · stress · variety · visual · family · followups · graphics-quality · visual-coverage · gallery · visual-qa · teacher · teacher-controls · copy-export · premium-ui · worksheet-polish · multi-correct · print-layout · release-docs · pwa`

### Next content work — check existing coverage first
- **U7-03 MCQ already exists** in `source-fit-extensions.js`. Do not duplicate.
- Multi-correct Phase 2: 49 engines pending. Only add where natural + source-grounded. See `NEXT_STEPS.md`.
- **Do not** add Grade-8 numeric/uncertainty engines without new source intake.

## Appendix — historical notes

### Engine count
Earlier docs reference **"25 engines"** or **"33 active + 17 fallback"**. Both are historical.
Current inventory: **50 dedicated `*-ENGINE` topics / 0 fallback** (runtime-verified, 2026-06-16).
Authoritative live list: `generator/engine/source-registry.js`.

### Removed scope
Grade 9, separate booklet/PDF-workbook/A4-bulk/answer-key-booklet modes are **not backlog**.
Do not reopen unless Yaniv explicitly says so.

### Historical planning docs (do not act on)
The following docs were written during initial planning and **do not reflect current implementation**.
They are tagged with warning blocks and preserved for historical reference only:
- `docs/planning/PRODUCT_REQUIREMENTS.md` — tagged with ⚠️ warning + reference to PROJECT_TRUTH.md
- `docs/planning/TRUE_GENERATOR_TEACHER_CONTROLS_REQUIREMENTS.md` — tagged with contradiction table (4 levels claimed vs 3 actual; no worksheet claimed vs worksheet 1–10 actual)

For current state: see `PROJECT_TRUTH.md` (added 2026-06-16) and `PROJECT_STATUS.md`.
