# Targilim — Central Rules & AI Operating Guide
# תרגילים — דף כללים מרכזי לבינה מלאכותית ולמפתחים

Repository: `yanivmizrachiy/targilim` · Hebrew name: `תרגילים`
**Last updated: 2026-06-15** · Baseline: 2026-06-14

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

## 5. Recent UI/UX premium round — branches & merge order

Five branches were pushed (not yet merged). **Merge order: PR1 → PR2 → PR3 → PR4 → PR5.**

| Order | Branch | Purpose | Status | Note |
|---|---|---|---|---|
| PR1 | `design/professional-exercise-card-v1` | Professional card + Assistant typography + larger diagrams | pushed, not merged | base of the round |
| PR2 | `design/student-answer-box` | One "תשובת התלמיד" box replaces split דרך:/תשובה: | pushed, not merged | |
| PR3 | `feature/premium-image-export-and-bw-mode` | Color/שחור־לבן only; central "העתק/הורד כתמונה"; unified `captureExerciseCardAsPng` | pushed, not merged | |
| PR4 | `test/premium-ui-guards` | `verify:premium-ui` guard wired into `verify:deep` | pushed, not merged | **stacked on PR1–PR3** |
| PR5 | `docs/refresh-status-after-ui-and-pages` | PROJECT_STATUS refresh for the round | pushed, not merged | docs |

- **Do not merge PR4 before PR1–PR3** (the guard only passes when the UI it protects is present).
- **Do not claim the live site has these UI changes** until they are merged into `main` and Pages redeploys.
- This central-rules PR (`docs/update-central-ai-rules`) overlaps `PROJECT_STATUS.md` with PR5; merge one, then rebase the other.

---

## 6. Verified completed work (only what was empirically checked on 2026-06-15)

- GitHub Pages publishes `generator/` from `main`.
- `npm run verify:deep` exists and aggregates the deep gates (see `package.json`).
- **50 engine topics (`*-ENGINE`) / 0 fallback** — counted from `source-registry.js`.
- **No `A8-04-ENGINE`** (A8-04 inequalities is legacy in `a8-03.js`).
- Merged on `main` (HEAD `ba1a0ee`): PR #15 (A7-04 work), **#16** (stress PER → 100), **#17** (A7-04 multi-correct guard, standalone), **#18** (PDF duplicate audit, no deletion).
- **PDF inventory = 20:** 10 working (folders `01-…10-…`) + 10 in `originals/`; the audit found **no accidental duplicates** (originals are intentional backups).
- Source-backed coverage-gaps report exists for the roadmap.

### A7-04 "multi-correct" — was broken on `main`, fixed by PR #25

What was wrong on `main` (HEAD `ba1a0ee`), verified 2026-06-15 (40 samples):
- Despite PR #15/#17 titles, `A7-04-ENGINE` emitted **exactly 1 correct answer in
  BOTH single and multi mode**; the guard `tools/verify-multi-correct-coverage.mjs`
  **failed (30)** and was **not** wired into `verify:deep`.
- Root cause: the `getEngineExercise` decorator chain dropped the 4th `opts`
  argument (which carries `mcqMode`) before it reached the engine. The multi-correct
  engine logic already existed but was unreachable.

Fix: **PR #25** (`fix/forward-mcqmode-multi-correct`) forwards `opts` through every
wrapper and wires the guard into `verify:deep`. Verified after the fix: multi → 2
correct (40/40), single → 1 correct (40/40), `verify:deep` PASS.

Status: real multi-correct MCQ is **`DONE` once PR #25 is merged**. Until then,
`main` still emits one correct answer — do not claim it on the live site before
PR #25 is merged and Pages redeploys.

---

## 7. Open PR queue & merge order

All open PRs were created 2026-06-15; each passes `verify:deep`. Recommended order:

```text
1. #21  design/professional-exercise-card-v1        (UI PR1)
2. #22  design/student-answer-box                   (UI PR2)
3. #23  feature/premium-image-export-and-bw-mode    (UI PR3)
4. #24  test/premium-ui-guards                      (UI guard, STACKED on #21–#23)
5. #25  fix/forward-mcqmode-multi-correct           (real A7-04 multi-correct + guard in verify:deep)
6. #20  docs/update-central-ai-rules                (this central rules + status PR)
```

- Do not merge #24 before #21–#23. `#24` and `#25` both touch the `package.json`
  `verify:deep` line — trivial conflict, keep both `verify:premium-ui` and `verify:multi-correct`.
- `docs/refresh-status-after-ui-and-pages` (old "PR5") is **superseded by #20** — do not merge it.
- After each merge, confirm GitHub Actions `verify:deep` is green; after the last
  merge, confirm Pages redeploys and run the §9 live checklist.

### Next content PR (after the above)
```text
feat: add source-backed MCQ single to U7-03-ENGINE
```
- Source **06** only (relative frequency has MCQ examples). MCQ single only. Additive.
- U7-03-ENGINE currently has only open + TF (verified) — this fills the gap.

### After that
```text
feat: add a second source-backed multi-correct MCQ path
```
- Candidate: numeric fraction-equivalence (source **05** or **07**), now that the
  multi-correct dispatch works (PR #25).

### Do NOT
- Add Grade-8 numeric or uncertainty engines without **new** source intake.

---

## 8. Permanent design requirements (UI)

- The interface must look **premium**; fonts must read like a real math textbook.
- View options are **`צבע` / `שחור־לבן` only** — never the words "גווני אפור".
- Every exercise card carries central primary buttons **`העתק כתמונה`** and **`הורד כתמונה`**.
- The copied/downloaded image must include **the full question and all drawings**.
- Students see **one** answer box ("תשובת התלמיד") — never split "דרך"/"תשובה".
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
