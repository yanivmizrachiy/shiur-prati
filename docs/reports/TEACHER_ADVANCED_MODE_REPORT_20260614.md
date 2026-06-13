# Teacher Advanced Mode Report — 2026-06-14

## Status: NOT IMPLEMENTED this sprint (deliberately deferred)

The sprint brief explicitly states Teacher Advanced Mode should come **only
after** the data layer (source bible, variety, fallback engines) and warns not
to spend the round on UI. The data layer was the priority and is now complete,
so the UI was deferred to avoid end-of-sprint risk to the working simple mode.

## What is now READY for it (the hard part)
Every engine output already carries `meta` (via pedagogy-attach.js):
sourceFile, sourceId, grade, domain, skill, learningGoal, teacherPurpose,
misconception, questionFamily, qtype, difficulty, requiredVisual, followUpIdeas.
`E.PEDAGOGY` exposes per-topic skills + families for selectors. So an advanced
teacher panel can be built purely on existing data with no engine changes.

## Next step (small, low-risk)
Add a "מצב מורה מתקדם" toggle in index.html that:
- offers skill / question-family / qtype / difficulty / visual / explanations
  selectors sourced from E.PEDAGOGY + E.getFamilies;
- shows learningGoal / teacherPurpose / misconception / source / follow-ups on
  the teacher card (hidden in student print);
- leaves the simple mode untouched.
Then add `tools/verify-teacher-advanced-mode.mjs` + `verify:teacher`.

## Recommended progress
Data layer for teacher mode: ready. UI: 0% (next sprint).
