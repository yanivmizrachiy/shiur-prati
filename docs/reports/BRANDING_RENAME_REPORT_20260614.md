# Branding Rename Report — 2026-06-14

## What was done
Renamed the user-visible owner name to **יניב רז**.
- `generator/index.html` header credit: "האתר מנוהל ע\"י יניב מזרחי" → "האתר מנוהל ע\"י יניב רז".
- `docs/QA_CHECKLIST.md` active reference updated to match.
- Historical `docs/WORKLOG.md` entries are a dated log and were left as-is (not user-visible).

## What was NOT changed (technical identifiers)
GitHub owner, remote URL, email, package name (`targilim`), repo name, code identifiers — untouched.

## Verifier
`tools/verify-branding.mjs` (`verify:brand`, wired into verify:all): scans the
user-visible runtime (generator/*.html/js/css) + active docs and fails on any of
`יניב מזרחי` / `Yaniv Mizrachi` / `yaniv mizrachi` / `Yaniv Mizrahi`; asserts the
canonical "יניב רז" is present in the header and the package name is unchanged.

## Result
verify:brand → BRANDING_PASS (77 files scanned, 0 forbidden hits).
OLD_NAME_OCCURRENCES (visible): 0.
