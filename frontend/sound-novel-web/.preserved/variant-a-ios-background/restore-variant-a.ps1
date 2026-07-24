# Восстановить Variant A (без PWA)
$root = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$bak = Join-Path $root ".preserved\variant-a-ios-background"
Copy-Item "$bak\index.css" "$root\src\index.css" -Force
Copy-Item "$bak\BlurredBackground.tsx" "$root\src\components\layout\BlurredBackground.tsx" -Force
Copy-Item "$bak\AppShell.module.css" "$root\src\components\layout\AppShell.module.css" -Force
Copy-Item "$bak\StartPage.module.css" "$root\src\components\steps\StartPage.module.css" -Force
Copy-Item "$bak\TextStepPage.module.css" "$root\src\components\steps\TextStepPage.module.css" -Force
Copy-Item "$bak\MobileHeader.module.css" "$root\src\components\layout\MobileHeader.module.css" -Force
Copy-Item "$bak\index.html" "$root\index.html" -Force
Remove-Item "$root\src\pwa.css" -ErrorAction SilentlyContinue
Remove-Item "$root\public\manifest.webmanifest" -ErrorAction SilentlyContinue
Write-Host "Variant A restored."
