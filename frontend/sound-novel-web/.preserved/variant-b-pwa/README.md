# Variant B — PWA поверх Variant A (сохранено 2026-06-13)

Variant A + PWA-обвязка:
- `public/manifest.webmanifest` — `display: standalone`
- `index.html` — manifest, `black-translucent`, скрипт `data-standalone`
- `src/pwa.css` — в standalone убран `--safari-toolbar-clearance`
- `MobileHeader` — fallback `max(env(safe-area-inset-top), 47px)` в PWA
- Фон как в A: `html::before/::after`, `body` прозрачный

## Быстрое восстановление

```powershell
cd frontend/sound-novel-web/.preserved/variant-b-pwa
./restore-variant-b.ps1
```

## Как проверить

1. Safari → Поделиться → «На экран Домой»
2. Запуск с иконки (standalone PWA)
3. Сравнить с обычным Safari

Variant A: `.preserved/variant-a-ios-background/`
