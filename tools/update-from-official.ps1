# Fetch official updates, replay local custom changes, test, and build.

$ErrorActionPreference = "Stop"

$repo = Split-Path -Parent $PSScriptRoot
Set-Location $repo

Write-Host "Step 1/5: Fetching official updates..."
git fetch upstream --tags

Write-Host "Step 2/5: Replaying your local changes on top of upstream/main..."
git rebase upstream/main

Write-Host "Step 3/5: Running frontend tests..."
npm test

Write-Host "Step 4/5: Running Rust tests..."
$env:PATH = "$env:USERPROFILE\.cargo\bin;$env:PATH"
cargo test --manifest-path src-tauri\Cargo.toml

Write-Host "Step 5/5: Building installer..."
$env:ALL_PROXY = ""
$env:all_proxy = ""
npm run tauri build

Write-Host "Done. Installer output:"
Get-ChildItem -LiteralPath "src-tauri\target\release\bundle\nsis" -Filter "*.exe" |
  Sort-Object LastWriteTime -Descending |
  Select-Object -First 3 FullName, Length, LastWriteTime
