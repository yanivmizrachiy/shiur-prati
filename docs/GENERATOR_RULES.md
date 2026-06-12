# Targilim Generator Rules — Extreme Quality Mode

This file is the rules page for the `targilim` generator.

## Goal

The generator must produce rich, varied, useful Hebrew math worksheets that are close to textbook/workbook quality.

## Source grounding

- The generator must stay attached to the 10 source PDF files in `sources/intake/2026-06-09`.
- Source PDFs must never be edited by upgrade scripts.
- New exercises should match the mathematical language, grade level, and worksheet style of the repository source material.
- No fake/demo content is allowed.

## Visual quality rules

Every geometry diagram must aim for print-safe textbook quality:

1. Use SVG/vector diagrams when practical.
2. Use `vector-effect="non-scaling-stroke"` for scalable strokes.
3. Use clean dark strokes.
4. Use light neutral fills.
5. Use outside vertex labels.
6. Do not let labels touch polygon lines.
7. Do not let labels be clipped by the SVG viewBox.
8. Prefer text with a subtle white halo over boxed labels.
9. Use angle arcs for angle questions.
10. Generate structural variety automatically.
11. Use best-of layout selection when one random diagram may be weak.

## Autopilot rule

When upgrading the generator:

- Sync the repo first.
- Work on a feature branch.
- Write or update a report under `docs/reports/`.
- Update this rules page when the quality contract changes.
- Run the verification suite.
- Commit and push only if checks pass.
- Do not merge to `main` until the visual QA page is reviewed.

## Current extreme geometry strategy

The premium geometry layer now uses:

- 72-candidate best-of layout selection for angle triangles.
- 72-candidate best-of layout selection for right triangles.
- Larger padded SVG canvases.
- Textbook-style halo text.
- Non-scaling SVG strokes.
- Clean dimension labels without bulky boxes.
- Separate QA preview under `docs/verification/premium-geometry-diagrams-preview.html`.
