# Polish worksheet cards and sharpen math rectangles

Implements #26.

## Product changes

- Removes question-type badge rendering from student-facing worksheet cards.
- Exercise card header now shows only the exercise number, e.g. `תרגיל 1`.
- Adds `sharpenMathRects(html)` helper function.
- Applies sanitizer before rendering exercise question HTML.
- Mathematical SVG rectangles/squares no longer render with rounded `rx`/`ry` corners in question HTML.

## Verification

- Adds `tools/verify-worksheet-polish.mjs`.
- Adds `verify:worksheet-polish` npm script.
- Wires it into `verify:deep`.

## Required checks before merge

- `npm run verify:worksheet-polish`
- `npm run verify:premium-ui`
- `npm run verify:deep`

## Merge condition

Do not merge until all checks pass and `docs/reports/pr-trigger.txt` is removed from the branch.

## Changed files

- `generator/exercise-set.js` — removed TYPE_LABELS, added sharpenMathRects, sanitized question HTML
- `tools/verify-worksheet-polish.mjs` — NEW guard file
- `package.json` — added verify:worksheet-polish script, wired into verify:deep
- `docs/reports/WORK_PROGRESS_BOARD_20260615.md` — progress tracking
