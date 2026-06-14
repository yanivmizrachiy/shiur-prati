# Source-Backed Coverage Gaps — 2026-06-14

**Repo:** yanivmizrachiy/targilim  
**Date:** 2026-06-14  
**Auditor:** Comet (automated analysis based on engine code inspection)  
**Approved sources:** sources/intake/2026-06-09 (10 PDFs, grades 7-8)

---

## Engine Summary

Total source-fit engines active: **25**  
Total pilot engines (dynamic): additional legacy engines loaded from `generator/engine/pilot-*.js`

---

## Coverage by Domain

### Algebra (A-engines)

| Engine | Grade | Topics covered | Open | MCQ single | MCQ multi | TF | Mistake |
|---|---|---|---|---|---|---|---|
| A7-04-ENGINE | 7 | Simplification, equivalent expressions | ✅ | ✅ | ✅ (PR #15) | ❌ | ✅ |
| A7-05-ENGINE | 7 | Equations, substitution | ✅ | ✅ | ❌ | ✅ | ✅ |
| A8-01-ENGINE | 8 | Inequalities (legacy sources) | ✅ | ✅ | ❌ | ❌ | ✅ |

**Algebra assessment:**
- **Strong:** A7-04 (most complete), A7-05
- **Weak:** A8-01 — no TF, no MCQ multi; inequalities domain is sparsely covered
- **Gap:** A8 has only 1 engine vs A7 with 2
- **Gap:** No A8 MCQ multi; inequalities naturally support multi-correct ("which inequality is equivalent?")

---

### Geometry (G-engines)

| Engine | Grade | Topics covered | Open | MCQ single | MCQ multi | TF | Mistake |
|---|---|---|---|---|---|---|---|
| G7-05-ENGINE | 7 | Pre-deductive geometry basics | ✅ | ✅ | ❌ | ✅ | ❌ |
| G7-06-ENGINE | 7 | Pre-deductive geometry advanced | ✅ | ✅ | ❌ | ✅ | ❌ |
| G8-02-ENGINE | 8 | Geometry curriculum core | ✅ | ✅ | ❌ | ✅ | ❌ |
| G8-03-ENGINE | 8 | Geometry curriculum core | ✅ | ✅ | ❌ | ✅ | ❌ |
| G8-05-ENGINE | 8 | Geometry principles | ✅ | ✅ | ❌ | ✅ | ❌ |
| G8-06-ENGINE | 8 | Geometry principles | ✅ | ✅ | ❌ | ✅ | ❌ |
| G8-07-ENGINE | 8 | Geometry principles | ✅ | ✅ | ❌ | ✅ | ❌ |
| G8-08-ENGINE | 8 | Geometry curriculum | ✅ | ✅ | ❌ | ✅ | ❌ |
| G8-09-ENGINE | 8 | Geometry principles | ✅ | ✅ | ❌ | ✅ | ❌ |

**Geometry assessment:**
- **Strong in coverage count:** 9 engines (largest domain)
- **Weak in question-type diversity:** 0 MCQ multi across all geometry engines
- **Weak:** 0 Mistake-type in geometry (all G-engines lack mistake detection questions)
- **Gap:** Geometry properties naturally support multi-correct ("which statements about this triangle are true?") — candidate for PR #18 or future PR
- **Note:** Do not add MCQ multi unless the specific source PDF (03/04/09) explicitly supports that property set

---

### Numeric (N-engines)

| Engine | Grade | Topics covered | Open | MCQ single | MCQ multi | TF | Mistake |
|---|---|---|---|---|---|---|---|
| N7-01-ENGINE | 7 | Numeric domain core | ✅ | ✅ | ❌ | ✅ | ❌ |
| N7-08-ENGINE | 7 | Numeric domain | ✅ | ✅ | ❌ | ✅ | ❌ |
| N7-09-ENGINE | 7 | Numeric domain | ✅ | ✅ | ❌ | ✅ | ❌ |
| N7-10-ENGINE | 7 | Numeric principles | ✅ | ✅ | ❌ | ✅ | ❌ |
| N7-11-ENGINE | 7 | Numeric principles | ✅ | ✅ | ❌ | ✅ | ❌ |
| N7-12-ENGINE | 7 | Numeric principles | ✅ | ✅ | ❌ | ✅ | ❌ |
| N7-13-ENGINE | 7 | Numeric principles | ✅ | ✅ | ❌ | ✅ | ❌ |

**Numeric assessment:**
- **Grade 7 only:** No N8 engines at all — grade 8 numeric domain is uncovered
- **No MCQ multi** in any numeric engine
- **No Mistake-type** in any numeric engine
- **Gap:** Grade 8 numeric is not represented (no approved source explicitly listed for grade-8-numeric, so this gap cannot be filled without new source intake)
- **Potential:** Fractions/ratios/percentages often support TF multi-statement questions

---

### Uncertainty (U-engines)

| Engine | Grade | Topics covered | Open | MCQ single | MCQ multi | TF | Mistake |
|---|---|---|---|---|---|---|---|
| U7-03-ENGINE | 7 | Relative vs absolute frequency | ✅ | ❌ | ❌ | ✅ | ❌ |
| U7-04-ENGINE | 7 | Uncertainty / probability | ✅ | ✅ | ❌ | ✅ | ❌ |
| U7-05-ENGINE | 7 | Uncertainty domain | ✅ | ✅ | ❌ | ✅ | ❌ |
| U7-06-ENGINE | 7 | Uncertainty domain | ✅ | ✅ | ❌ | ✅ | ❌ |
| U7-07-ENGINE | 7 | Uncertainty domain | ✅ | ✅ | ❌ | ✅ | ❌ |
| U7-08-ENGINE | 7 | Uncertainty domain | ✅ | ✅ | ❌ | ✅ | ❌ |

**Uncertainty assessment:**
- **U7-03 is MCQ-weak:** only open + TF, no MCQ single or multi
- **Grade 8 uncertainty:** not covered (no approved source)
- **No MCQ multi** in any uncertainty engine
- **No Mistake-type** in any uncertainty engine

---

## Coverage Gaps Summary

| Gap | Domain | Severity | Can fill without new source? |
|---|---|---|---|
| No MCQ multi in geometry | Geometry | Medium | Only if source explicitly supports property-list questions |
| No MCQ multi in numeric | Numeric | Medium | Possible for grade 7 (source 05 available) |
| No MCQ multi in uncertainty | Uncertainty | Medium | Possible (source 06 available) |
| No Mistake-type in geometry | Geometry | Low | Yes — source 03/04 likely has error examples |
| No Mistake-type in numeric | Numeric | Low | Yes — source 05/07 has numeric traps |
| Grade 8 numeric not covered | Numeric | High | **No** — requires new source intake |
| Grade 8 uncertainty not covered | Uncertainty | High | **No** — requires new source intake |
| A8 has only 1 engine | Algebra | Medium | Yes — source 02 (grade-8 algebra) can support more topics |
| U7-03 has no MCQ single | Uncertainty | Low | Yes — source 06 has MCQ examples |

---

## Recommended Next PRs (priority order)

1. **feat: add MCQ single to U7-03-ENGINE** — source 06 explicitly has MCQ examples for relative frequency
   - Estimated improvement: +4% question-type coverage
   - Risk: Low (additive only)

2. **feat: add second source-backed multi-correct MCQ path** (Stage 4 from plan)
   - Best candidate: Numeric engine with fraction equivalence (source 05 or 07)
   - Estimated improvement: +8% quality
   - Risk: Low if grounded in source

3. **feat: add Mistake-type to A7-05-ENGINE** — already has Mistake type; verify A8-01 could add it too
   - Estimated improvement: +3%
   - Risk: Low

4. **Do NOT:** Add grade 8 numeric or uncertainty engines without new source intake.

---

## Estimated improvement from this report

+4% tichnum (no code changes, but clear roadmap prevents wasted PRs).
