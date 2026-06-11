# QA Checklist — Manual Live Verification

**Purpose:** the only items standing between current state and broad teacher distribution. Run on the live site (https://yanivmizrachiy.github.io/targilim/), preferably once on desktop and once on a phone. Mark each PASS / FAIL with a note.

**Automated coverage note (2026-06-11):** `node tools/release-audit.mjs` (23 static invariants) and `node tools/harness-engines.mjs` (45,000 generations, all 25 engines) both PASS. Sections C and D below remain the human-only gate — rendering, copy-image pixels, and print output cannot be verified from code.

## A. Generation sanity (per domain)

- [ ] כיתה ז׳ → each domain → pick a ✦ topic → צור תרגיל: card renders, no English/technical leakage
- [ ] כיתה ח׳ → same
- [ ] Main title above shows "תחום — נושא" without "גרסה חכמה/✦"
- [ ] Legacy (non-✦) topics still generate

## B. Engine controls (✦ topics)

- [ ] סוג שאלה: open / רב־ברירה / נכון-שגוי / מצא את הטעות all render correctly
- [ ] רמת קושי: בסיסית / סטנדרטית / מאתגרת change the question substantively (different families/numbers, not just wording)
- [ ] רב־ברירה: exactly one correct choice highlighted in the solution

## C. Visual mode (תצוגת שרטוטים)

- [ ] צבע → גווני אפור → שחור-לבן: diagram colors actually change on screen
- [ ] Switch back to צבע: original colors restored
- [ ] In שחור-לבן: labels readable, line graph grid acceptable (known: grid renders black — judge density)

## D. Export

- [ ] העתק כתמונה: pasted image contains NO export buttons, NO topic title, NO credit (האתר מנוהל ע"י יניב רז), NO technical ids
- [ ] Copied image honors the selected visual mode
- [ ] PNG הורדה: same checks
- [ ] הדפס: header/settings/buttons hidden; solution box visible; diagram prints correctly

## E. Hebrew / pedagogy spot-check (teacher eyes)

- [ ] 3 random mistake-questions: is the student error believable?
- [ ] 3 random true/false: non-trivial?
- [ ] New families: A7-01 rectangle, N7-03 placement (−3.5), A8-02 graph, G8-04 area-ratio, N7-04 estimation, U7-01 relative frequency
- [ ] Mobile: no horizontal scroll, diagrams fit

## F. On failure

File each FAIL as a NEEDS REVIEW line in `PROJECT_STATUS.md` and fix in a small targeted batch. Do not rewrite engines.
