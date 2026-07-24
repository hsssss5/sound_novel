# Восстановить Variant B (A + PWA)
$root = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$bak = Join-Path $root ".preserved\variant-b-pwa"
Copy-Item "$bak\index.css" "$root\src\index.css" -Force
Copy-Item "$bak\pwa.css" "$root\src\pwa.css" -Force
Copy-Item "$bak\index.html" "$root\index.html" -Force
Copy-Item "$bak\manifest.webmanifest" "$root\public\manifest.webmanifest" -Force
Copy-Item "$bak\MobileHeader.module.css" "$root\src\components\layout\MobileHeader.module.css" -Force
# AppShell без safe-area фона — как в Variant A/B
$a = Join-Path $root ".preserved\variant-a-ios-background\AppShell.module.css"
if (Test-Path $a) {
  Copy-Item $a "$root\src\components\layout\AppShell.module.css" -Force
}
Write-Host "Variant B restored."
