# Variant C — принять ограничение Safari (сохранено 2026-06-13)

Идея: дракон только в safe-area, под чёлкой и pill-bar — тёмный `#242424`.

- `body { background: #242424 }` — Safari сэмплирует для тинта chrome + overscroll
- Фон: `.shell::before/::after` с отступами `env(safe-area-inset-*)` и `--safari-toolbar-clearance`
- Нет PWA-обвязки, нет `html::before` на весь экран
- Скролл в `main`, документ без rubber-band (как A)

## Быстрое восстановление

```powershell
cd frontend/sound-novel-web/.preserved/variant-c-accept-chrome
./restore-variant-c.ps1
```

## Сравнение вариантов

| | A | B | C |
|---|---|---|---|
| Фон | весь экран (`html::before`) | как A + PWA | только safe-area |
| Под chrome | пытается дракон | пытается в PWA | `#242424` |
| PWA | нет | да | нет |

Variant A: `.preserved/variant-a-ios-background/`  
Variant B: `.preserved/variant-b-pwa/`
