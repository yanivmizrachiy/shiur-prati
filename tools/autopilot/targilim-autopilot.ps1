param(
  [string]$Mode = "status"
)

$ErrorActionPreference = "Stop"
$Repo = "$env:USERPROFILE\Desktop\targilim"
if (!(Test-Path (Join-Path $Repo ".git"))) { $Repo = "$env:USERPROFILE\OneDrive\Desktop\targilim" }
cd $Repo

function Run($name, $cmd) {
  Write-Host ""
  Write-Host ">>> $name" -ForegroundColor Yellow
  cmd /c $cmd
  if ($LASTEXITCODE -ne 0) { throw "FAILED: $name" }
}

if ($Mode -eq "status") {
  git branch --show-current
  git log --oneline -10
  git status --short
  exit 0
}

if ($Mode -eq "qa") {
  Start-Process (Join-Path $Repo "docs\verification\premium-geometry-diagrams-preview.html")
  exit 0
}

if ($Mode -eq "test") {
  if (Test-Path "tools\verify-ultra-autopilot-geometry.mjs") { Run "ultra geometry" "node tools\verify-ultra-autopilot-geometry.mjs" }
  if (Test-Path "tools\verify-extreme-geometry-gate.mjs") { Run "extreme geometry gate" "node tools\verify-extreme-geometry-gate.mjs" }
  if (Test-Path "tools\verify-angle-labels-textbook.mjs") { Run "angle labels" "node tools\verify-angle-labels-textbook.mjs" }
  if (Test-Path "tools\verify-premium-geometry-overrides.mjs") { Run "premium geometry" "node tools\verify-premium-geometry-overrides.mjs" }
  Run "runtime" "node tools\verify-real-generator-runtime.mjs"
  Run "geometry quality" "node tools\verify-geometry-diagram-quality.mjs"
  Run "release audit" "node tools\release-audit.mjs"
  Run "diff check" "git diff --check"
  exit 0
}

if ($Mode -eq "open-live") {
  Start-Process "https://yanivmizrachiy.github.io/targilim/?v=autopilot"
  exit 0
}
