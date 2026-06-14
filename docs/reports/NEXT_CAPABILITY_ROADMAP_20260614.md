# Next Capability Roadmap — 2026-06-14

## Where we are
The generator now has a real knowledge layer: 41 dedicated source-backed engines,
each STRONG, source-locked, pedagogy-tagged (learning goal, teacher purpose,
skill, misconception, follow-ups, question families), variety-gated and
visual-checked. Every output carries pedagogic `meta`. 9 fallback topics remain.

## Next steps, in priority order
1. **Teacher Advanced Mode UI** — build on the ready data layer (E.PEDAGOGY +
   meta). Skill/family/qtype/difficulty/visual/explanation selectors; teacher
   card shows goal/purpose/misconception/source/follow-ups; simple mode intact.
   Add `verify:teacher`.
2. **Convert the remaining 9 fallbacks** to dedicated engines: N7-10/11/12/13,
   G7-05 transformations, G7-06 composite area, G8-05 central angle/sector,
   G8-07 congruence markings, G8-09 similarity/shadows. Each needs a real visual
   (grid transforms, composite-area decomposition, sector arc, tick-mark
   congruence, shadow similarity).
3. **Follow-up generation**: let the teacher request the documented followUpIdeas
   as actual generated questions (the metadata already lists them per family).
4. **Per-question source provenance**: tighten meta.questionFamily to the family
   actually used by each generation (currently topic-level first family).
5. **Human visual QA** on a device + print; capture screenshots once tooling allows.
6. **Pie/misleading variants**: add 3D-effect and category-order misleading
   cases; pie reading (not only central angle).

## Risk notes
- Keep verify:deep green after every change; never weaken a verifier to pass.
- Do not merge old PR branches; extract files manually only.
