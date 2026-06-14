# Source Lock Report — 2026-06-14

> **עדכון מצב (סוף 2026-06-14):** הדוח מתעד מצב היסטורי. מאז, **כל 17 נושאי
> ה-fallback הומרו למנועים ייעודיים** (`*-ENGINE`) בשלב F2. המצב הנוכחי הקובע:
> `verify:source-lock` → registryEntries=**50**, **fallbackEntries=0**,
> `FALLBACK_TOPICS = []`, sourceFiles=10, SOURCE_LOCK_PASS. כלומר אין יותר נושאים
> המוגשים ע"י ה-renderer הגנרי — הסעיפים "17 fallback" ו-"fallbackEntries=17"
> למטה משקפים את העבר בלבד. ראו `FALLBACK_CONVERSION_REPORT_20260614.md`.

Branch: `chore/max-source-smart-generator` (from `origin/main@fe27bef`).

## Before
- No machine-readable source metadata on engines.
- Census: 0 STRONG, 24 NO_CLEAR_SOURCE — "no file identified as STRONG."
- No enforcement that every question traces to one of the 10 intake PDFs.

## What was added
- `generator/engine/source-schema.js` — frozen allowlist of the 10 intake PDFs,
  `E.defineSource / validateSource / getSource`, `E.SOURCE_REGISTRY`.
- `generator/engine/source-registry.js` — 50 entries: 25 pilot engines, 8
  source-fit engines, 17 logical-fallback topics. Mapping grounded in
  `docs/SOURCE_ALIGNMENT.md`, the `source-learning` notes and `PATTERN_INDEX.md`.
- `tools/verify-source-lock.mjs` — VM-loads schema+registry and asserts:
  every entry validates, `sourceFile` ∈ the 10 PDFs, every wired `*-ENGINE`
  id (35 scanned) and every documented fallback topic has metadata, every
  fallback entry states why it is a fallback, and index.html loads the registry.
- Loaded in `index.html` before `pattern-engine.js`; wired into `verify:all`
  after `verify:source-fit`.

## After
- `verify:source-lock` → **SOURCE_LOCK_PASS** (registryEntries=50, engineIds=35,
  fallbackEntries=17, sourceFiles=10).
- 0 engine ids without source metadata.

## Files changed
- new: `generator/engine/source-schema.js`, `generator/engine/source-registry.js`,
  `tools/verify-source-lock.mjs`
- edited: `generator/index.html`, `package.json`

## Tests
- `npm run verify:all` → PASS (EXIT 0), includes `verify:source-lock`.

## Remaining risk
- The 17 fallback topics carry valid source metadata but are still served by the
  generic legacy renderer, not dedicated engines (see implementation report).
- Source mapping is at engine/topic granularity, not per individual question
  template; acceptable for lock purposes, can be tightened later.

## Recommended progress
- Source-grounding integrity: **strong** for the active engine set.
