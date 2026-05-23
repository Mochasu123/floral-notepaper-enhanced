# Run this from an elevated PowerShell window.
# It removes stale C:\Tools\Anaconda references only.

$ErrorActionPreference = "Stop"

$stalePaths = @(
  "C:\Tools\Anaconda",
  "C:\Tools\Anaconda\Scripts",
  "C:\Tools\Anaconda\Library\bin",
  "C:\Tools\Anaconda\Library\mingw-w64"
) | ForEach-Object { $_.TrimEnd("\") }

foreach ($scope in @("User", "Machine")) {
  $pathValue = [Environment]::GetEnvironmentVariable("Path", $scope)
  if ($null -eq $pathValue) {
    continue
  }

  $entries = $pathValue -split ";" | Where-Object { $_ -ne "" }
  $filtered = $entries | Where-Object {
    $entry = $_.TrimEnd("\")
    -not ($stalePaths | Where-Object { $_ -ieq $entry })
  }

  if ($entries.Count -ne $filtered.Count) {
    [Environment]::SetEnvironmentVariable("Path", ($filtered -join ";"), $scope)
    Write-Host "Cleaned $scope PATH: removed $($entries.Count - $filtered.Count) stale entries."
  }
}

$staleUninstallKeys = @(
  "HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\Anaconda3 2024.10-1 (Python 3.12.7 64-bit)",
  "HKLM:\Software\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\Anaconda3 2024.10-1 (Python 3.12.7 64-bit)",
  "HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\Anaconda3 2024.10-1 (Python 3.12.7 64-bit)"
)

foreach ($key in $staleUninstallKeys) {
  if (Test-Path -LiteralPath $key) {
    Remove-Item -LiteralPath $key -Recurse -Force
    Write-Host "Removed stale uninstall key: $key"
  }
}

Write-Host "Done. The active Anaconda at C:\Users\whoca\anaconda3 was not touched."
