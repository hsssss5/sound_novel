# Variant A — фон под iOS (сохранено 2026-06-13)

Рабочая схема:
- Картинка: `html::before` (fixed, cover)
- Затемнение: `html::after` + `--bg-tint-opacity` из `BlurredBackground.tsx`
- `body` / `#root`: `background: transparent` (иначе заливка перекрывает дракона)
- Скролл только в `AppShell .main`, документ без rubber-band

## Быстрое восстановление

```powershell
cd frontend/sound-novel-web/.preserved/variant-a-ios-background
./restore-variant-a.ps1
```

## Вручную

Скопировать файлы из этой папки в `frontend/sound-novel-web/`.

После восстановления удалить Variant B: `src/pwa.css`, `public/manifest.webmanifest`, убрать `@import ./pwa.css` из `index.css`.
