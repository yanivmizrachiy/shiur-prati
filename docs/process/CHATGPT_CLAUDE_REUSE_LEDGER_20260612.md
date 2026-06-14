# ChatGPT + Claude Code reuse ledger — 2026-06-12

## Purpose

This ledger records how the current ChatGPT automation reused the strongest Claude Code work without overwriting newer `main` changes.

## Claude Code work identified

PR #6: `Integrate source-fit visual generator upgrades`

Useful Claude Code assets identified from the PR metadata:

- Source-fit visual upgrade branch: `claude/source-fit-critical-charts-v3`.
- Reported source-fit commits:
  - `7236537` — coordinate system and bar-chart reading.
  - `288ed07` — relative-frequency comparison and applied graph reading.
  - `6bec231` — pie chart and misleading-graph critique.
- Reported verification:
  - Harness: 46,800 generations, 0 failures.
  - Runtime: PASS.
  - Release audit: PASS.
  - Phase 2 / Phase 3A: PASS.
  - Worksheet print / math bidi / geometry quality: PASS.
  - Browser smoke: DOM verified for new visuals.

## What was reused safely on `main`

The PR itself was not merged as-is because it was draft, not mergeable, and `main` already had newer ChatGPT commits.

Instead, the current `main` now carries source-fit improvements that follow the same Claude Code direction while preserving the current repo state:

1. `generator/engine/source-fit-extensions.js`
   - `N7-01-ENGINE` coordinate system Q1.
   - `U7-03-ENGINE` relative-frequency group comparison.

2. `generator/engine/source-fit-graphs.js`
   - `A8-01-ENGINE` applied graph / function reading.
   - `U7-04-ENGINE` bar-chart reading.

3. `generator/engine/source-fit-geometry.js`
   - `G8-02-ENGINE` cylinder and net.
   - `G8-03-ENGINE` parallel-line angles.

4. `generator/u7-02.js`
   - `U7-05` pie chart and relative frequency active fallback.
   - `U7-06` misleading graph critique active fallback.

5. `tools/verify-chatgpt-source-fit-sync.mjs`
   - Static verifier that checks source files, loader order, active engine/topic IDs, and fallback topics.

## Active source-fit clusters on main

1. Coordinate system Q1.
2. Relative-frequency group comparison.
3. Applied graph and function reading.
4. Bar-chart reading.
5. Cylinder and cylinder net.
6. Parallel-line angles.
7. Pie chart and relative frequency.
8. Misleading graph critique.

## Remaining follow-up

1. Convert `U7-05` and `U7-06` from fallback topics into full mixed-mode smart engines when loader updates are allowed.
2. Add congruent-triangle tick-mark diagrams.
3. Add isosceles-triangle properties.
4. Add circle / central-angle engine.
5. Add bar-chart construction, not only reading.
6. Add richer Grade 7 algebra expression-equivalence tasks.

## Rule going forward

Use Claude Code outputs as high-value reference material, but do not blindly overwrite `main`. Prefer selective, source-backed, verified integration.
