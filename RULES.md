# Targilim — Central Rules & AI Operating Guide
# תרגילים — דף כללים מרכזי לבינה מלאכותית ולמפתחים

Repository: `yanivmizrachiy/targilim` · Hebrew name: `תרגילים`
**Last updated: 2026-06-17** · Baseline: 2026-06-14

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
| Approved source materials | **`sources/intake/2026-06-09/`** (10 PDFs) |
| Live engine inventory (the real list) | **`generator/engine/source-registry.js`** |
| Quality gates | **`package.json`** scripts (`verify:deep`) |
| Local worktree + GitHub sync | `docs/reference/ACTIVE_WORKTREE_AND_SYNC.md` · `npm run verify:sync` |
| Coverage gaps roadmap | `docs/reports/SOURCE_BACKED_COVERAGE_GAPS_20260614.md` |
| PDF duplicate audit | `docs/reports/PDF_DUPLICATE_AUDIT_20260614.md` |
| Verifier/tool index | `tools/README.md` · Docs index `docs/README.md` |

Before adding any fact to docs, check it does not already live in one of the
above. If it does, **link to it — do not copy it**.

---

## 3. Repository structure

```text
generator/              the live site + the generator runtime
generator/engine/       engines, source-registry, pedagogy-registry, diagrams
sources/                approved source PDFs (protected)
docs/                   documentation
docs/reports/           audit, coverage and hardening reports
tools/                  verifiers and deep checks (run via package.json)
.github/workflows/      CI + GitHub Pages deployment
PROJECT_STATUS.md       current status snapshot
RULES.md                this central operating guide
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

## 5. Changelog — merged improvements (most recent first)

All entries below are **merged to `main`, live, and `verify:deep`-green**. Newest first.

| PR | Date | Improvement |
|---|---|---|
| main | 2026-06-17 | **Pythagoras Hebrew terminology guard** — student and teacher wording now uses the standard Hebrew terms **ניצב/ניצבים** and **יתר**; `verify:geometry-language` prevents "רגל/רגליים" from returning to G7-03 Pythagoras output. |
| **#52** | 2026-06-17 | **A8-03 count-and-value system word problem** — coins/stamps style elimination family added and documented. |
| main `7db6ab4` | 2026-06-17 | **Source-fit/UI sync** — A7-05 aligned to value tables + first-quadrant graphs; A7-03/U7-01/U8-01 families expanded; mobile share reduced to copy-image only; premium typography guards added. |
| **#51** | 2026-06-17 | **A7-02 expression-value range** — questions of the form "if x is in [a,b], where is kx+c?" |
| **#50** | 2026-06-17 | **Topic dropdown dedupe/order cleanup** — canonical engine topic display without stale duplicate rows. |
| **#49** | 2026-06-17 | **Registry/source-bible sync** — shipped families documented in `pedagogy-registry` and regenerated `SOURCE_BIBLE`. |
| **#48** | 2026-06-17 | **A7-01 polygon perimeter with algebraic sides** — labeled diagram + source-backed family. |
| **#47** | 2026-06-17 | **Source-level family expansion** — applied-formula substitution and equal-expressions families. |
| **#46** | 2026-06-17 | **Difficulty tiers integration** — new families wired into real רמה 1/2/3 paths. |
| **#34** | 2026-06-16 | **Pythagoras (legacy G7-03) fixes** — diagram no longer reveals the answer (the unknown side is marked **`?`**, like `angleSvg` already did for the unknown angle); fixed the clipped "ס\"מ" label (`text-anchor="middle"`); precise Hebrew around unknown side length; **premium student answer box** (rounded, soft shadow, 5 comfortable 40px ruled lines). |
| **#33** | 2026-06-16 | **Source-faithful topic labels** — `G7-02` "שטחי צורות שטוחות" → **"שטחי מצולעים"** (source: "שטחי מצולעים" / "Areas of polygons"); `G8-04` "ניידות משולשים" → **"דמיון משולשים"** (curriculum-map "Triangle similarity"; engine + questions already used "דמיון"). `U7-01` "טבלת תדירות" kept — the source uses "תדירות". |
| **#32** | 2026-06-16 | **Removed the landing splash** — the main page opens **directly** to the "הגדרות תרגיל" topic-selection tool (no hero/benefits/CTA/marketing). `generator/landing.css` deleted. |
| **#30** | 2026-06-16 | **Level selector = רמה 1 / רמה 2 / רמה 3**, and the visible `#sl` selector now actually drives difficulty for every topic (it was previously a hidden no-op reading `#selDiff`). |
| #20 | 2026-06-15 | Central rules + status refresh. |
| #28 | 2026-06-15 | Real **A7-04 multi-correct** — forward `mcqMode` through the wrapper chain; `verify:multi-correct` wired into `verify:deep` (multi → 2 correct, single → 1). |
| #27 | 2026-06-15 | Worksheet polish — sharp math rectangles (`sharpenMathRects`); no question-type badge on the student card. |
| #21–#24 | 2026-06-15 | UI premium round — professional card + Assistant typography; one clean untitled answer box; color/שחור-לבן only + per-card image export; `verify:premium-ui` guard. |

Earlier history: PR #7/#8 (Phase 1, 50-engine generator), #15–#18 (A7-04 + stress + PDF audit, inventory = 20 = 10 working + 10 `originals/` backups). Detail in `docs/reports/`.

---

## 6. Current state (verified 2026-06-17)

- The live site reflects `main`; GitHub Pages publishes `generator/` from `main`.
- Local sync is checked with `npm run verify:sync`; it must pass before continuing work in a local copy.
- The main page **opens directly to the generator** — there is no landing/marketing page.
- **50 engine topics (`*-ENGINE`) / 0 fallback** — counted from `source-registry.js`.
- **No `A8-04-ENGINE`** (A8-04 inequalities is legacy in `a8-03.js`; A8-05 percent equations is legacy too).
- `verify:deep` aggregates the deep gates and includes `verify:premium-ui` + `verify:worksheet-polish` + `verify:multi-correct`.
- Real A7-04 multi-correct works; **U7-03 single-answer MCQ already exists** in `source-fit-extensions.js` — do **not** duplicate it.

### Known follow-up (flagged, needs approval — not yet done)
- **Legacy ↔ engine topic dedup.** Several topics appear **twice** in the dropdown — once as a legacy generator (e.g. `geo.js` G7-03) and once as a `*-ENGINE` "גרסה חכמה". The legacy generators are lower quality; the #33/#34 fixes were both on legacy files. Unifying each topic to its single smart engine would prevent a whole class of label/diagram inconsistencies at the root.

### Do NOT
- Add Grade-8 numeric or uncertainty engines without **new** source intake.
- Start new content before checking existing engine coverage.

---

## 8. Permanent design requirements (UI)

- **It is a work tool, not a landing page.** The main page opens **directly** to the
  "הגדרות תרגיל" topic-selection card — no hero/benefits/CTA splash.
- **No marketing / demo language anywhere user-facing.** Dry, factual, teacher-oriented
  copy only (e.g. "מחולל דפי תרגול במתמטיקה", not "מחולל חכם ומעוצב"). No "דמו", no slogans,
  no unproven claims, no `fallback`/`QA`/`מנוע`/`Registry` developer jargon in visible text.
- The interface must look **premium**; fonts must read like a real math textbook.
- View options are **`צבע` / `שחור־לבן` only** — never the words "גווני אפור".
- The level selector is **`רמה 1` / `רמה 2` / `רמה 3`** (the visible `#sl`) and must
  actually drive difficulty for every topic.
- **Diagrams must never reveal the answer.** The unknown side/angle/value is marked **`?`**;
  only the givens carry values. Labels must sit fully inside the viewBox (`text-anchor="middle"`),
  never clipped, with full units (`ס"מ`, not `ס`).
- **Topic labels and wording must be source-faithful** — verified against `source-learning/`
  and `curriculum-map/` — and use precise Hebrew (e.g. "אורך היתר", not "היתר").
- Every exercise card carries central primary buttons **`העתק כתמונה`** and **`הורד כתמונה`**.
- The copied/downloaded image must include **the full question and all drawings**.
- The student answer area is **one** clean, untitled, comfortable **premium writing box**
  (generous ruled lines) — present only for free-write types (open/mistake); mark-the-answer
  types (mcq/tf) get **no** box. A stable `data-student-answer-box="true"` hook identifies it.
- Diagrams must be **sharp, readable, not clipped**.
- Mobile must look professional; print must be clean.
- Teacher-only content must never appear in the student print/export.

---

## 9. Mandatory tests

Automated gate (required for every PR, must be green in GitHub Actions):
```bash
npm install
npm run verify:deep
```

Manual UI checks (required when a UI PR is reviewed, on the **live** site after deploy):
```text
- open the live site
- generate a worksheet
- check color view
- check black-and-white view
- copy as image
- download as image
- open the PNG
- confirm all drawings appear in the image
- check mobile layout
- check print output
- confirm teacher-only content does not appear on the student page
```

---

## 10. AI Work Report Template

Every AI must end its work by filling this in:

```text
Branch:
PR:
Changed files:
What changed:
UI / logic / docs:
Sources touched:
Engines touched:
Registry touched:
verify:deep:
GitHub Actions:
Live URL checked:
Screenshot before:
Screenshot after:
Risks:
What remains:
Estimated improvement:
```

---

## 11. Roles

- **Yaniv** — product owner and teacher; should not be asked to manage routine technical decisions or to repeat the documented vision.
- **Claude** — project manager / pedagogy / design / quality-gate owner.
- **ChatGPT/Codex** — execution assistants that preserve repository reality.

---

## Appendix — historical note

Earlier docs reference **"25 engines"**. That is historical: the current inventory is
**50 engines** (25 dedicated `*-ENGINE` source-fit engines + 25 pilot engines), 0 fallback.
The authoritative live list is `generator/engine/source-registry.js`. Removed scope
(Grade 9, separate booklet/PDF-workbook/A4-bulk/answer-key-booklet modes) is **not** backlog
and must not be reopened unless Yaniv explicitly says so.
