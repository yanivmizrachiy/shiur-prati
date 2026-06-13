# Open PRs deep audit — 2026-06-13

## Current stable baseline

`main` is currently the trusted baseline.

Verified locally in Termux:

- `npm run verify:all` passes.
- `tools/verify-real-generator-runtime.mjs` passes.
- runtime renders 10 and 20 exercise sets.
- answer key, mixed question types, single-card mode, print controls and source inventory pass.

Project completion estimate: **70% verified**.

## Open PR summary

### PR #6 — Integrate source-fit visual generator upgrades

Status: open, draft, not mergeable.

Branch: `claude/source-fit-critical-charts-v3`.

Risk level: **high**.

Reason:

- 13 commits.
- 25 changed files.
- About 1,997 additions and 42 deletions.
- Branch is far behind current `main`.
- Changes overlap with core runtime/engine files and older docs.

Main areas changed:

- source-fit visual upgrades.
- coordinate system smart engine `pilot-n7-01.js`.
- graph/function reading.
- uncertainty visual representations.
- premium/ultra geometry overrides.
- multiple verifiers and reports.
- `generator/index.html`.
- `generator/engine/pattern-engine.js`.
- `generator/engine/diagrams.js`.

Recommendation:

Do **not** merge directly. Extract only selected safe components after isolated review.

Candidate components worth extracting later:

1. `generator/engine/pilot-n7-01.js` — coordinate system smart engine.
2. selected visual chart/uncertainty generators, if not already covered in `main`.
3. selected verifier logic, only after adapting it to current `main`.

### PR #5 — Autopilot upgrade: premium and ultra geometry diagram quality

Status: open, not draft, not mergeable.

Branch: `fix/premium-geometry-diagrams-v1`.

Risk level: **medium-high**.

Reason:

- 12 commits.
- 13 changed files.
- Adds premium and ultra geometry SVG override layers.
- Touches `generator/core.js` and `generator/index.html`.
- Requires visual inspection before merging.

Main areas changed:

- `generator/engine/diagram-premium-overrides.js`.
- `generator/engine/diagram-ultra-autopilot.js`.
- geometry verification page.
- geometry visual reports.
- `generator/core.js`.
- `generator/index.html`.

Recommendation:

Do **not** merge directly. This PR is useful, but only after taking the two new diagram override files and adapting `index.html` carefully.

Safe extraction candidate:

1. Add the two diagram override files.
2. Add a dedicated verifier for premium/ultra geometry link and functions.
3. Only then add script tags to `index.html`.
4. Run `npm run verify:all`.
5. Run a visual browser check.

### PR #2 — Add digital PDF book

Status: open, not draft, not mergeable.

Branch: `digital-pdf-book`.

Risk level: **low-medium**.

Reason:

- Adds a separate static PDF book UI.
- Does not need to touch generator math logic.
- Still touches `generator/index.html`, so direct merge may conflict.
- Branch is very far behind current `main`.

Main areas changed:

- `generator/book.html`.
- `generator/book.css`.
- `generator/book.js`.
- `generator/index.html`.

Recommendation:

Extract manually after generator work stabilizes. Add book files first. Add index link second. Verify no generator regression.

## Merge policy from now

No direct merge for PR #2/#5/#6.

Use this safer workflow:

1. Keep `main` clean and verified.
2. Extract one component at a time.
3. Commit small isolated changes.
4. Run:

```bash
npm run verify:all
```

5. If visual layer was touched, also run browser check.
6. Only then update progress percentage.

## Next best implementation path

Priority order:

1. Extract PR #5 visual override files into `main` manually.
2. Add verifier for premium/ultra geometry scripts.
3. Add script tags to `index.html` only after verifier exists.
4. Verify all.
5. Then consider extracting PR #6 `pilot-n7-01.js` coordinate-system engine.
6. Leave PR #2 digital book for a later, separate sprint.

## Current conclusion

`main` is healthy. The open PRs contain useful work, but are stale and conflict-prone.

Best path is controlled manual extraction, not merge.
