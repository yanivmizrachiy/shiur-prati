# Generator Live Verification Report

Date: 2026-06-12T12:43:44.975Z
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
    1) <div class="qtext">…</div> aka getByText('במשולש ישר-זווית, שתי הרגליים הן 888 ס"מ ו-151515 ס"מ. חשבו את היתר')
    2) <div class="qtext">…</div> aka getByText('במשולש ישר-זווית, שתי הרגליים הן 555 ס"מ ו-121212 ס"מ. חשבו את היתר')
    3) <div class="qtext">…</div> aka getByText('במשולש ישר-זווית, היתר 171717 ס"מ והרגל 151515 ס"מ. חשבו את הרגל השנייה')
    4) <div class="qtext">…</div> aka getByText('במשולש ישר-זווית, שתי הרגליים הן 666 ס"מ ו-888 ס"מ. חשבו את היתר')
    5) <div class="qtext">…</div> aka getByText('במשולש ישר-זווית, היתר 171717 ס"מ והרגל 888 ס"מ. חשבו את הרגל השנייה')
    6) <div class="qtext">…</div> aka getByText('במשולש ישר-זווית, היתר 131313 ס"מ והרגל 555 ס"מ. חשבו את הרגל השנייה')
    7) <div class="qtext">…</div> aka getByText('במשולש ישר-זווית, היתר 131313 ס"מ והרגל 121212 ס"מ. חשבו את הרגל השנייה')
    8) <div class="qtext">…</div> aka getByText('במשולש ישר-זווית, היתר 101010 ס"מ והרגל 666 ס"מ. חשבו את הרגל השנייה')
    9) <div class="qtext">…</div> aka getByText('במשולש ישר-זווית, היתר 151515')
    10) <div class="qtext">…</div> aka getByText('במשולש ישר-זווית, היתר 101010 ס"מ והרגל 888 ס"מ. חשבו את הרגל השנייה')

Call log:
  - waiting for locator('.qtext')

    at generateAssert (/home/runner/work/targilim/targilim/verify-generator-live.mjs:41:42)
    at async file:///home/runner/work/targilim/targilim/verify-generator-live.mjs:82:18
```