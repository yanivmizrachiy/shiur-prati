#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "=== TARGILIM VERIFY ALL ==="
echo "repo: $(pwd)"
echo "node: $(node -v 2>/dev/null || echo missing)"
echo "npm:  $(npm -v 2>/dev/null || echo missing)"
echo "git:  $(git rev-parse --short HEAD 2>/dev/null || echo unknown)"
echo ""

run() {
  echo ">>> $1"
  node "$1"
  echo ""
}

run tools/verify-index-script-links.mjs
run tools/verify-source-fit-inventory.mjs
run tools/verify-chatgpt-source-fit-sync.mjs
run tools/verify-numeric-g7-source-fit.mjs
run tools/verify-algebra-g8-source-fit.mjs
run tools/verify-geometry-g7-source-fit.mjs
run tools/verify-geometry-g8-source-fit.mjs
run tools/verify-real-generator-runtime.mjs

echo "ALL VERIFY PASS"
