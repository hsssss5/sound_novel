import { useEffect } from 'react'
import { assets } from '../../content/assets'

interface BlurredBackgroundProps {
  /** Видимость фоновой картинки (0.35 = 35%, 0.25 = 25%) */
  opacity?: number
}

/** Фон в safe-area (.shell::before/::after в AppShell.module.css), opacity — из React */
export function BlurredBackground({ opacity = 0.35 }: BlurredBackgroundProps) {
  const tintOpacity = 1 - opacity

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--bg-image', `url("${assets.background}")`)
    root.style.setProperty('--bg-tint-opacity', String(tintOpacity))

    return () => {
      root.style.removeProperty('--bg-image')
      root.style.removeProperty('--bg-tint-opacity')
    }
  }, [tintOpacity])

  return null
}
