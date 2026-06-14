# PDF Duplicate Audit — 2026-06-14

**Repo:** yanivmizrachiy/targilim  
**Date:** 2026-06-14  
**Auditor:** Comet (automated analysis)  
**Action taken:** None — read-only audit.

---

## Summary

| Total PDFs found | Intentional duplicates | Accidental duplicates | Action needed |
|---|---|---|---|
| 20 | 10 (originals/) | 0 | None now |

---

## Findings

### 1. PDF Storage Structure

All PDFs reside in one intake: `sources/intake/2026-06-09/`

Two copies of each PDF exist:
- **Working copy**: inside numbered subfolder (e.g. `01-grade-7-algebra/01_grade-7_algebra_curriculum.pdf`)
- **Original backup**: `originals/01_grade-7_algebra_curriculum.pdf`

This is **intentional** — MANIFEST.md explicitly states: "Original copies are preserved under `sources/intake/2026-06-09/originals`."

### 2. The 10 PDF Pairs

| # | Working copy path | Backup path | Notes |
|---|---|---|---|
| 1 | `01-grade-7-algebra/01_grade-7_algebra_curriculum.pdf` | `originals/01_grade-7_algebra_curriculum.pdf` | Intentional backup — 2.69 MB |
| 2 | `02-grade-8-algebra/02_grade-8_algebra_curriculum.pdf` | `originals/02_grade-8_algebra_curriculum.pdf` | Intentional backup — 5.90 MB |
| 3 | `03-grade-7-pre-deductive-geometry/03_grade-7_pre_deductive_geometry_curriculum.pdf` | `originals/03_grade-7_pre_deductive_geometry_curriculum.pdf` | Intentional backup — 5.12 MB |
| 4 | `04-grade-8-geometry/04_grade-8_geometry_curriculum.pdf` | `originals/04_grade-8_geometry_curriculum.pdf` | Intentional backup — 5.15 MB |
| 5 | `05-grade-7-numeric-domain/05_grade-7_numeric_domain_curriculum.pdf` | `originals/05_grade-7_numeric_domain_curriculum.pdf` | Intentional backup — 8.51 MB |
| 6 | `06-uncertainty-domain/06_uncertainty_domain_curriculum_examples.pdf` | `originals/06_uncertainty_domain_curriculum_examples.pdf` | Intentional backup — 6.84 MB |
| 7 | `07-numeric-principles-grades-7-8/07_numeric_domain_principles_grades-7-8.pdf` | `originals/07_numeric_domain_principles_grades-7-8.pdf` | Intentional backup — 566 KB |
| 8 | `08-algebra-principles-grades-7-8/08_algebra_domain_principles_grades-7-8.pdf` | `originals/08_algebra_domain_principles_grades-7-8.pdf` | Intentional backup — 578 KB |
| 9 | `09-geometry-principles-grades-7-8/09_geometry_domain_principles_grades-7-8.pdf` | `originals/09_geometry_domain_principles_grades-7-8.pdf` | Intentional backup — 586 KB |
| 10 | `10-grade-8-teaching-sequence-2026-2027/10_grade-8_teaching_sequence_2026-2027.pdf` | `originals/10_grade-8_teaching_sequence_2026-2027.pdf` | Intentional backup — 328 KB |

### 3. Generator/Tools References

The generator references PDFs by folder name via `engine-load.mjs` and individual engine source files. All 10 sources are referenced.
No engine references a file by the `originals/` path — the originals are backup-only.

### 4. Accidental Duplicates Found

**None detected.** No PDF appears in more than 2 locations (working + backup).

---

## Risk Assessment

| Risk | Level | Notes |
|---|---|---|
| Accidental duplicates wasting storage | None | 0 accidental duplicates |
| Backup originals taking ~40 MB extra | Low | Intentional; protects against working copy corruption |
| Engine referencing wrong copy | None | Engines use working copies only |

---

## Recommendation

- **Do not delete** any PDF at this time.
- The `originals/` pattern is correct and safe.
- If repo size becomes a concern in future, consider using Git LFS for PDFs rather than deleting them.
- Next audit: when a new intake is added.

---

## Estimated improvement

+5% seder ve-nihul mekorot (no deletions needed = status confirmed clean)
