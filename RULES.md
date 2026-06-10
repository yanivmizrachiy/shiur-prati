# Project Rules — Targilim Hebrew Math Exercise Generator

Repository: `yanivmizrachiy/targilim`

Hebrew project name: `תרגילים`

Last updated: 2026-06-10

---

## 1. Purpose of this file

`RULES.md` is the binding execution rulebook for this repository.

This file must prevent repeated work, duplicated patches, false claims, fake success, and unsafe edits.

The repository has already passed major Phase 1 and Phase 2 work. Future agents must not restart the project from old assumptions.

---

## 2. Role model

Yaniv is the product owner and teacher.

Claude is the project manager / brain / pedagogy and design decision-maker.

ChatGPT is the GitHub executor / implementation assistant.

Execution rule:

- Claude decides strategy, pedagogy, design direction, and quality gates.
- ChatGPT may execute repository changes, but must preserve Claude's decisions and repository reality.
- Yaniv must not be forced to manage routine technical decisions.
- No agent may ask Yaniv to repeat work that already exists in the repository.

---

## 3. Current true status — do not reset

As of 2026-06-10, the project is not at the beginning.

Completed:

- Source audit and source-learning phase completed.
- Legacy root files archived.
- Repository structure is modular and organized.
- Public generator exists under `generator/`.
- GitHub Pages deployment workflow exists.
- `generator/.nojekyll` exists.
- `phase2-loader.js` exists.
- Static verifier exists.
- Browser batch verifier exists.
- Pages healthcheck workflow exists.
- `PROJECT_STATUS.md` exists and must remain truthful.
- Phase 2 execution report exists under `docs/reports/`.
- Premium mobile-first RTL CSS redesign has been applied.
- `core.js` contains minimal `qmeta` markup alignment for premium card styling.
- Grade 9 remains locked because real worked example sources are missing.

Active code state:

- 25 code-active slices exist.
- Grade 7 and Grade 8 are active.
- The original verified MVP slices remain active.
- The Phase 2 slices are code-active and loaded through `phase2-loader.js`.
- The four weak/stub slices previously identified by Claude were repaired:
  - `N8-01` Ratio — 4 variants.
  - `N8-03` Scale — 4 variants.
  - `G8-04` Similarity — 4 variants.
  - `A8-03` Systems of equations — 4 integer-safe variants.

Pending:

- Final live visual verification.
- Final Pages healthcheck / browser workflow confirmation.
- Only after live verification may new Phase 2 slices be marked `Live ✅`.

---

## 4. Do not repeat completed work

Future work must not repeat these completed actions:

- Do not recreate the source-learning phase.
- Do not recreate the curriculum map from scratch.
- Do not recreate the pattern index from scratch.
- Do not re-archive legacy files that are already archived.
- Do not rebuild the modular architecture from scratch.
- Do not rewrite `index.html` wholesale.
- Do not rewrite `core.js` wholesale.
- Do not rewrite `phase2-loader.js` unless there is a real loader failure.
- Do not rewrite `export.js` unless export is proven broken.
- Do not re-add the same 25 slices.
- Do not create duplicate topic IDs.
- Do not mark `Live ✅` without actual verification.

Every future change must first inspect repository reality.

---

## 5. Active generator slices

The project currently has 25 code-active slices.

### Grade 7

- `G7-01` — Rectangle and box.
- `G7-02` — Flat shape areas.
- `G7-03` — Pythagoras — missing side.
- `G7-04` — Missing angle in triangle.
- `N7-03` — Negative numbers on number line.
- `N7-04` — Signed addition/subtraction.
- `N7-05` — Signed multiplication/division.
- `N7-06` — Powers: `(−a)^n` vs `−a^n`.
- `N7-07` — Square root — exact and estimation.
- `A7-01` — Algebraic expressions.
- `A7-02` — Substitution in expression.
- `A7-03` — First-degree equations.
- `U7-01` — Frequency table.
- `U7-02` — Basic probability.

### Grade 8

- `G8-01` — Circle circumference and area.
- `G8-04` — Similarity / triangle scale factor.
- `N8-01` — Ratio.
- `N8-02` — Proportion.
- `N8-03` — Scale.
- `N8-04` — Static percentages.
- `N8-05` — Dynamic percentages.
- `A8-02` — Slope and line equation.
- `A8-03` — Systems of equations.
- `U8-01` — Mean, median, range.
- `U8-02` — Basic probability.

### Grade 9

Grade 9 is locked.

Do not implement Grade 9 generator slices until Yaniv supplies real worked example question sources or Claude explicitly approves source-backed examples.

---

## 6. Protected files and folders

Do not touch these unless there is explicit need and a clear reason:

- `sources/`
- `archive/`
- `knowledge-base/`
- `RULES.md` itself, except for truth/status/rule updates.
- `generator/export.js`, unless export is proven broken.
- `generator/phase2-loader.js`, unless a loader failure is proven.
- all slice files, unless fixing a real mathematical/UI/runtime issue.

Do not delete files without explicit approval.

---

## 7. Allowed future changes

Allowed safe changes:

- Fix proven runtime errors.
- Fix proven mathematical errors.
- Fix proven Hebrew wording errors.
- Improve mobile UI only if it preserves generator logic and export.
- Update documentation to match actual repository state.
- Update status files after real code changes.
- Improve verification workflows if they produce false failures or miss real failures.
- Add reports under `docs/reports/` when they document real execution.

Not allowed without Claude/Yaniv approval:

- Adding new content slices.
- Implementing Grade 9.
- Adding analytics services.
- Adding paid services.
- Adding secrets.
- Changing hosting architecture.
- Replacing the generator architecture.
- Performing destructive cleanup.

---

## 8. Source-bound content rule

Every exercise must remain source-bound.

No generic curriculum invention.

Every generated topic must map to:

- grade;
- domain;
- topic;
- skill;
- source or approved source-learning note;
- safe parameter set;
- correct answer logic.

If a topic lacks source-backed examples, mark it locked or pending.

---

## 9. UI and design rules

The public site must remain:

- Hebrew-only for user-facing text;
- RTL;
- mobile-first;
- visually premium;
- readable on phone;
- teacher-friendly;
- suitable for print/export;
- free of demo labels and fake controls.

Current design decision:

- Claude selected the premium mobile-first RTL design system.
- `generator/style.css` contains the current design system.
- `generator/core.js` includes `qmeta` only as a minimal markup alignment for this design.

Do not invent a different design direction without Claude approval.

---

## 10. Export and print rules

The following must remain working:

- copy as image;
- PNG download fallback;
- print layout.

Do not change `export.js` unless the export pipeline is proven broken.

If UI CSS changes, verify that:

- `.qcard` remains the exported element;
- `.expbar` remains visible on screen;
- print hides controls but preserves the question card;
- answer visibility in print follows current project policy.

---

## 11. Deployment rules

Public URL:

`https://yanivmizrachiy.github.io/targilim/`

Deployment model:

- GitHub Pages through GitHub Actions artifact deployment.
- `.github/workflows/deploy-pages.yml` deploys `generator/`.
- `generator/.nojekyll` must remain in the artifact.

If the public URL returns 403 after deployment:

1. Confirm the latest deployment workflow finished.
2. Confirm GitHub Pages source is set to GitHub Actions.
3. Do not falsely mark the app live.
4. Fix only the exact deployment issue.

---

## 12. Verification rules

Required verification assets:

- `tools/verify-phase2-static.mjs`
- `.github/workflows/verify-phase2-static.yml`
- `.github/workflows/pages-healthcheck.yml`
- `.github/workflows/verify-phase2-batch.yml`

Before claiming Phase 2 complete, verify:

- public URL returns 200;
- static verifier passes;
- browser batch verifier passes or equivalent live browser test passes;
- all 25 slices appear in selectors;
- each active slice generates a card;
- answer opens;
- export buttons exist;
- geometry SVGs fit where relevant;
- mobile view has no horizontal scroll;
- Grade 9 stays locked;
- `PROJECT_STATUS.md` matches reality.

No `Live ✅` without real live verification.

---

## 13. Documentation truth rule

`PROJECT_STATUS.md` must describe the current truth.

Execution reports under `docs/reports/` must describe only real changes.

Never write:

- fake PASS;
- fake live verification;
- fake production readiness;
- fake test results;
- claims that a workflow passed if it was not actually observed.

Use honest statuses:

- `Code ✅` for code that exists and is registered.
- `Live ⚠️` for code that is not yet live/browser verified.
- `Live ✅` only after real verification.
- `🔒 Locked` for topics intentionally blocked.

---

## 14. No-pressure execution rule

Yaniv should not be forced into technical management.

When possible, agents must:

- inspect the repository directly;
- avoid asking Yaniv to repeat checks;
- avoid unnecessary ping-pong;
- avoid asking for manual tests unless the blocker truly requires user-side visibility;
- explain only the next real action.

---

## 15. Current next action

The next meaningful action is not more content development.

The next meaningful action is final verification:

1. Wait for GitHub Pages deployment to finish.
2. Confirm Pages healthcheck.
3. Confirm static verification.
4. Confirm browser batch verification.
5. If all pass, update `PROJECT_STATUS.md` to mark verified items as `Live ✅`.
6. If any fail, fix only the exact failing issue.

Do not add new content slices before this is clean.
