# A8-04 Clean PR Scope

This branch intentionally changes only the legacy A8-04 inequalities topic in `generator/a8-03.js`.

Scope:
- Improve A8-04 inequalities variation and explanations.
- Do not add A8-04-ENGINE.
- Do not change source-registry.
- Preserve the verified 50-engine boundary.

Reason:
- Adding A8-04-ENGINE would make the registry count 51 and fail the current source-bible verifier.
