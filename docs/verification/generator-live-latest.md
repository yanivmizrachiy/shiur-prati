# Generator Live Verification Report

Date: 2026-06-14T04:44:38.400Z
URL: https://yanivmizrachiy.github.io/targilim/
Status: FAIL

## Checks
- PASS — page loaded
- PASS — Hebrew title visible
- PASS — selectors visible
- PASS — selected grade 7 geometry G7-03

## Engine checks
- Not reached

## Observed
- exportButtonCount: 0

## Error
```
locator.innerText: Error: strict mode violation: locator('.qtext') resolved to 10 elements:
    1) <div class="qtext">…</div> aka getByText('במשולש ישר-זווית, היתר 252525 ס"מ והרגל 777 ס"מ. חשבו את הרגל השנייה')
    2) <div class="qtext">…</div> aka getByText('במשולש ישר-זווית, שתי הרגליים הן 999 ס"מ ו-121212 ס"מ. חשבו את היתר')
    3) <div class="qtext">…</div> aka getByText('במשולש ישר-זווית, היתר 555')
    4) <div class="qtext">…</div> aka getByText('במשולש ישר-זווית, היתר 252525 ס"מ והרגל 242424 ס"מ. חשבו את הרגל השנייה')
    5) <div class="qtext">…</div> aka getByText('במשולש ישר-זווית, היתר 171717')
    6) <div class="qtext">…</div> aka getByText('במשולש ישר-זווית, שתי הרגליים הן 555 ס"מ ו-121212 ס"מ. חשבו את היתר')
    7) <div class="qtext">…</div> aka getByText('במשולש ישר-זווית, היתר 101010')
    8) <div class="qtext">…</div> aka getByText('במשולש ישר-זווית, היתר 131313')
    9) <div class="qtext">…</div> aka getByText('במשולש ישר-זווית, היתר 151515')
    10) <div class="qtext">…</div> aka getByText('במשולש ישר-זווית, שתי הרגליים הן 666 ס"מ ו-888 ס"מ. חשבו את היתר')

Call log:
  - waiting for locator('.qtext')

    at generateAssert (/home/runner/work/targilim/targilim/verify-generator-live.mjs:41:42)
    at async file:///home/runner/work/targilim/targilim/verify-generator-live.mjs:82:18
```