# Run this file from an elevated PowerShell window.
# It only removes old installer leftovers; it does not touch note data.

$ErrorActionPreference = "Stop"

$oldShortcut = "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\花笺.lnk"
$oldUninstallKey = "HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\花笺"
$oldInstallDir = "C:\Tools\花笺"

if (Test-Path -LiteralPath $oldShortcut) {
  Remove-Item -LiteralPath $oldShortcut -Force
  Write-Host "Removed old shortcut: $oldShortcut"
}

if (Test-Path -LiteralPath $oldUninstallKey) {
  Remove-Item -LiteralPath $oldUninstallKey -Recurse -Force
  Write-Host "Removed old uninstall registry key: $oldUninstallKey"
}

if (Test-Path -LiteralPath $oldInstallDir) {
  Remove-Item -LiteralPath $oldInstallDir -Recurse -Force
  Write-Host "Removed old install directory: $oldInstallDir"
}

Write-Host "Done. Your note data under Documents\花笺 was not touched."
