# ChatGPT / Claude Source-Fit Ledger — 2026-06-12

This file records the source-fit work produced by Claude Code and verified through ChatGPT/GitHub so future automation can continue from the real repository state instead of repeating old analysis.

## Verified Claude commits

| Sprint | Branch | Commit | Verified result |
|---|---|---|---|
| v1 coordinate + bar chart | `claude/source-fit-coordinate-chart-v1` | `7236537bc28a3b049468287d5e8c0782e5af64b9` | Added N7-01 coordinate-system engine, `E.coordinateGridSvg`, `E.barChartSvg`, U7-01 `bar_chart_read`, and raised active engine count to 26. |
| v2 relative frequency + applied graph | `claude/source-fit-visual-expansion-v2` | `288ed07723f8e039f0a4dc98bb08f86b46231c05` | Added U7-01 `compare_groups_relative_frequency`, `E.doubleBarSvg`, A8-02 `applied_graph_read`, and Hebrew-labeled applied graph support. |
| v3 pie + misleading graph | `claude/source-fit-critical-charts-v3` | `6bec2314f5a703ac22da96330e3f285d51009131` | Added U7-01 `pie_chart_read_or_construct`, `misleading_graph_critique`, `E.pieChartSvg`, and `E.misleadingBarChartSvg`. |

## Product knowledge now established

1. The project is no longer only symbolic/calculation based.
2. Source file 05 is now represented by a real Grade 7 coordinate-system engine.
3. Source file 06 is now represented by table, bar chart, double-bar comparison, pie chart, and misleading graph critique families.
4. Source file 02 is now partially represented by applied linear graph reading in A8-02.
5. Engine count is 26 after v1.
6. The source-fit sprints report full automated test passes, but human teacher QA on printed output is still required.
7. Do not claim 100% readiness.

## Remaining high-value gaps

| Gap | Source basis | Suggested sprint |
|---|---|---|
| Empirical / Kinneret-style graph reading | File 02 | `source-fit-empirical-graphs-v4` |
| Four-quadrant coordinate work | File 05 | `source-fit-coordinate-four-quadrants-v5` |
| Pictogram | File 06 | `source-fit-pictogram-v5` |
| Sequences to expression with drawings | File 01 | `source-fit-sequences-drawings-v6` |
| Domain marking / meaningful x-values | File 02 | include with empirical graphs |
| Circle central angles / point location | File 04 | `source-fit-circle-geometry-v6` |
| Cylinder / net / congruence / parallel lines | File 04 | later geometry sprint |

## Required follow-up when user sends a new Claude result

When the user sends `SAVED_TO_GITHUB: <branch> <sha>`:

1. Fetch the commit from GitHub.
2. Verify that the commit message and diff match the reported work.
3. Identify whether engine count changed.
4. Confirm docs were updated truthfully.
5. Confirm no existing engines were deleted or renamed.
6. Decide whether the branch should be merged by the user/Claude or whether another corrective sprint is needed.
7. Update this ledger or the worklog with the verified result.

## Local sync reminder

For local/Termux copies, the safe sync sequence remains:

```bash
tsync
git fetch --all --prune
git branch -a | grep source-fit
```

If a Claude branch must be reviewed locally:

```bash
git switch <branch>
git pull --ff-only
```

Do not overwrite local work unless the user explicitly approves.

## Next planned expert prompt

The next recommended sprint is:

`source-fit-empirical-graphs-v4`

Reason: after v1-v3, the strongest remaining source-backed mismatch is Grade 8 algebra graph interpretation from a given empirical graph: Kinneret-style graph, interval behavior, domain/range interpretation, and reading values from the graph rather than from a formula.
