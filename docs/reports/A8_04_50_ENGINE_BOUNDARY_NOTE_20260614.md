# A8-04 50-Engine Boundary Decision

During PR #10 work, adding A8-04 as a new dedicated engine was identified as unsafe for this small PR because the verifier expects exactly 50 engine ids.

Decision:
- Do not treat A8-04 as a 51st engine in this PR.
- Keep the existing 50-engine boundary intact.
- Continue A8-04 improvements only through the existing legacy topic unless a future planned remapping updates verifiers, documentation, and product counts together.

Status:
- PR remains Draft until CI is green.
- Main remains untouched.
