# Source Alignment Map — 25 Active Engines

**Date:** 2026-06-11 | **Batch:** 3 (mapping/audit only — no engine code changed)

Authority order: 1) `sources/intake/2026-06-09/` 2) `source-learning/2026-06-09/*.learning.md` 3) `curriculum-map/CURRICULUM_MAP.md` 4) `question-patterns/PATTERN_INDEX.md`. Engine code is implementation, not content authority.

Each row covers a topic pair: the legacy slice and its `-ENGINE` twin (same ID base). All 25 engines are preserved. Statuses: KEEP / REMAP / RENAME / PATCH QUESTIONS / ADD MISSING FAMILY / NEEDS REVIEW. REMAP = documentation-level ID mapping only; nothing is deleted or renamed in code.

## Key ID finding

Engine IDs follow **pattern IDs** (`PATTERN_INDEX.md`), not curriculum topic IDs (`CURRICULUM_MAP.md`). Three numbering systems coexist:

| Engine/code ID | Pattern ID | Curriculum topic ID | Topic |
|---|---|---|---|
| G7-01 | G7-04 (תיבה) | G7-01 (מלבן/תיבה) | Rectangle + box |
| G7-03 | G7-03 | G7-07 | Pythagoras |
| G7-04 | G7-01 | G7-02-round2 "Angles" (G7-03 curric.) | Missing angle in triangle |
| G8-04 | G8-02 | G8-04 | Triangle similarity |
| U7-02 | U8-02 | U7-02 | Basic probability |
| A8-03 | A8-03 | A8-04 | Systems of equations |
| N7-03..N7-07 | N7-03..N7-07 | N7-02..N7-06 | Numeric grade 7 (off by one) |

**Decision: no code IDs are renamed.** This table is the canonical translation. Future workers must consult it before assuming a mismatch is a bug.

## Alignment matrix

Source files cited as learning notes (`source-learning/2026-06-09/`); originals in `sources/intake/2026-06-09/`.

| Engine ID | Site name | Gr | Domain | Source file | Source topic (pattern) | Status |
|---|---|---|---|---|---|---|
| G7-01 | מלבן ותיבה | 7 | Geometry | 03 + 09 | Curric. G7-01; pattern G7-04 (תיבה) | REMAP |
| G7-02 | שטחי צורות שטוחות | 7 | Geometry | 03 + 09 | Pattern G7-02 שטח צורה שטוחה | KEEP |
| G7-03 | משפט פיתגורס | 7 | Geometry | 03 + 09 | Pattern G7-03; curric. G7-07 | KEEP |
| G7-04 | זווית חסרה במשולש | 7 | Geometry | 03 + 09 | Pattern G7-01 זווית חסרה | REMAP |
| N7-03 | מספרים שליליים על ציר | 7 | Numeric | 05 + 07 | Pattern N7-03; curric. N7-02 | ADD MISSING FAMILY |
| N7-04 | חיבור וחיסור מכוונים | 7 | Numeric | 05 + 07 | Pattern N7-04; curric. N7-03 | ADD MISSING FAMILY |
| N7-05 | כפל וחילוק מכוונים | 7 | Numeric | 05 + 07 | Pattern N7-05; curric. N7-04 | KEEP |
| N7-06 | חזקות (−a)ⁿ/−aⁿ | 7 | Numeric | 05 + 07 | Pattern N7-06; curric. N7-05 | KEEP |
| N7-07 | שורש ריבועי | 7 | Numeric | 05 + 07 | Pattern N7-07; curric. N7-06 | KEEP |
| A7-01 | ביטויים אלגבריים | 7 | Algebra | 01 + 08 | Pattern A7-01 | PATCH QUESTIONS |
| A7-02 | הצבה בביטוי | 7 | Algebra | 01 + 08 | Pattern A7-02 | KEEP |
| A7-03 | משוואות מדרגה ראשונה | 7 | Algebra | 01 + 08 | Pattern A7-03 | KEEP |
| U7-01 | טבלת תדירות | 7 | Uncertainty | 06 | Pattern U7-01 | ADD MISSING FAMILY |
| U7-02 | הסתברות בסיסית | 7 | Uncertainty | 06 | Pattern U8-02; curric. U7-02 | REMAP |
| G8-01 | עיגול — היקף ושטח | 8 | Geometry | 04 + 09 | Pattern G8-01 | KEEP |
| G8-04 | דמיון משולשים | 8 | Geometry | 04 + 09 | Pattern G8-02; curric. G8-04 | REMAP |
| N8-01 | יחס | 8 | Numeric | 07 | Pattern N8-01 | KEEP |
| N8-02 | פרופורציה | 8 | Numeric | 07 | Pattern N8-02 | KEEP |
| N8-03 | קנה מידה | 8 | Numeric | 07 | Pattern N8-03 | KEEP |
| N8-04 | אחוזים סטטיים | 8 | Numeric | 07 | Pattern N8-04 | KEEP |
| N8-05 | אחוזים דינמיים | 8 | Numeric | 07 | Pattern N8-05 | KEEP |
| A8-02 | שיפוע ומשוואת ישר | 8 | Algebra | 02 + 08 | Pattern A8-02 | PATCH QUESTIONS |
| A8-03 | מערכת משוואות | 8 | Algebra | 02 + 08 | Pattern A8-03; curric. A8-04 | KEEP |
| U8-01 | ממוצע, חציון, טווח | 8 | Uncertainty | 06 | Pattern U8-01; curric. N8-06/U8-01 | KEEP |
| U8-02 | הסתברות מטבלה | 8 | Uncertainty | 06 | Pattern U8-02 | KEEP |

Source file key: 01 grade-7 algebra · 02 grade-8 algebra · 03 grade-7 pre-deductive geometry · 04 grade-8 geometry · 05 grade-7 numeric · 06 uncertainty · 07 numeric principles 7–8 · 08 algebra principles 7–8 · 09 geometry principles 7–8.

## Per-engine details (skills, families, visual, action)

### Geometry

**G7-01 — REMAP.** Skills: perimeter/area of rectangle; volume/surface area of box. Families (source): rect area/perimeter, missing side, box volume, box surface, missing dimension — engine implements all six. Visual: `3d_box` + rectangle SVG — present. Reason: engine ID matches curriculum topic G7-01 but pattern index files box content under G7-04; pure numbering collision. Action: none beyond this documented mapping.

**G7-02 — KEEP.** Skills: triangle ½bh, parallelogram bh, trapezoid ½(b₁+b₂)h, missing height. Families: area calc + missing-height inverse. Visual: `polygon_labeled` with dashed height — present. Action: none.

**G7-03 — KEEP.** Skills: a²+b²=c², find hypotenuse/leg, safe triples per source. Families: find-hyp, find-leg; engine adds rectangle-diagonal. Visual: `right_triangle_labeled` — present, dynamic. Action: none (reference implementation).

**G7-04 — REMAP.** Skills: angle sum 180°, find missing angle, triangle validity. Families: missing angle, possible-triangle check. Visual: `triangle_labeled` with unknown highlighted — present. Reason: pattern index calls this G7-01; engine ID differs. Action: none beyond mapping.

**G8-01 — KEEP.** Skills: C=2πr, A=πr², from radius/diameter, inverse, formula distinction. Visual: `circle_labeled` — present. Action: none.

**G8-04 — REMAP.** Skills: similarity ratio, corresponding side, is-similar check; source also wants area ratio = k². Visual: `similar_triangles` — present. Reason: pattern index files this as G8-02; curriculum says G8-04. Action: ADD MISSING FAMILY later — area-ratio (יחס שטחים) family from pattern G8-02.

### Numeric grade 7

**N7-03 — ADD MISSING FAMILY.** Skills: ordering, opposites, absolute value, number-line placement incl. fractions (−3.5, −½). Source families: mark P/Q/opposites **on a number line**. Visual: `number_line` — **missing** in engine (text-only). Action: add number-line SVG families; keep existing text families.

**N7-04 — ADD MISSING FAMILY.** Skills: signed add/sub in −20..20. Source families: compute, **estimation without computing**, **missing-addend** (`[a]+__<0`). Engine has compute only. Visual: none required. Action: add estimation + missing-value families.

**N7-05 — KEEP.** Skills: signed mult/div in −12..12, incl. triple products. Visual: none. Action: optionally add 3-factor family (source template shows one).

**N7-06 — KEEP.** Skills: (−a)ⁿ vs −aⁿ misconception — exactly the source's common-error target. Visual: none. Action: none.

**N7-07 — KEEP.** Skills: exact roots of safe squares, estimation between squares, side-from-area. Visual: none. Action: none.

### Numeric grade 8

**N8-01..N8-05 — KEEP (all five).** Source-bound families already implemented per pattern templates: ratio simplify/divide/missing-part (N8-01); proportion missing/rate/check (N8-02); scale map↔real↔factor (N8-03); percent of/whole-from/percent-from (N8-04); increase/decrease/original/two-step (N8-05). Visuals: ratio-bar, proportion-table, map/scale, percent-change SVGs present where required. Action: none; these are the alignment reference standard.

### Algebra

**A7-01 — PATCH QUESTIONS.** Skills: build expression from situation. Source families: **cup-tower** (gradient + expression + evaluate) and **rectangle k-times side** (perimeter + area expression). Engine has cup-tower partially; rectangle family thin. Visual: none mandatory. Action: align wording to two source templates; add rectangle-expression family.

**A7-02 — KEEP.** Skills: substitute values into expression. Source: multi-value substitution. Action: optionally extend to 3-value substitution per template.

**A7-03 — KEEP.** Skills: solve ax±b=c, **check by substitution**, build equation from word problem. Engine implements solve+check+build. Visual: none. Action: none.

**A8-02 — PATCH QUESTIONS.** Skills: m=(y₂−y₁)/(x₂−x₁), rising/falling, write line equation. Source requires visual `linear_graph`. Engine families match; **graph visual missing**. Action: add linear-graph SVG in graph/diagram upgrade batch (not now).

**A8-03 — KEEP.** Skills: two-variable word systems (sum + difference). Matches pattern template. Curriculum numbering A8-04. Visual: none. Action: none.

### Uncertainty

**U7-01 — ADD MISSING FAMILY.** Skills: organize data into frequency table, **relative frequency**. Engine covers tables; relative-frequency family and `frequency_table` visual rendering need review against pattern U7-01. Action: add relative-frequency family; review table rendering.

**U7-02 — REMAP.** Skills: theoretical probability P=favorable/total, complement. Pattern index files basic probability as U8-02; curriculum places it in grade 7 too (U7-02). Engine correct pedagogically. Action: none beyond mapping.

**U8-01 — KEEP.** Skills: mean, median, range on 8–15 values. Matches pattern U8-01. Action: none.

**U8-02 — KEEP.** Skills: probability from table/box compositions, complement. Matches pattern U8-02 with table variant. Action: none.

## Source patterns with no engine (gap list — future work, do not build now)

- N7-01/N7-02 — coordinate system quadrant-I (visual `coordinate_system_q1`)
- A7-04 — graph + value table (visual `coordinate_system_q1`)
- A8-01 — applied graphs (visual `applied_graph`)
- U7-02(pattern) — bar chart construction (visual `bar_chart`)
- U7-03 — group comparison / relative-frequency trap
- Curriculum-only topics without patterns: A7-05/A7-06 functions, A8-03 inequalities, A8-05 percent equations, G7-04(curric.) parallel lines, G7-05 quadrilaterals, G7-06 circle intro, G8-02 cylinder, G8-03 congruence, N7-08 arithmetic laws, U8-03 critical graph reading.

## Summary

- 25/25 engines mapped. Deletions: 0. Code renames: 0.
- KEEP: 16 · REMAP (doc-only): 4 (G7-01, G7-04, G8-04, U7-02) · PATCH QUESTIONS: 2 (A7-01, A8-02) · ADD MISSING FAMILY: 3 (N7-03, N7-04, U7-01)
- Map status: DONE. Source-alignment implementation: NOT DONE.
- Next: targeted fixes per "Action" notes — small batches, never a rewrite.
