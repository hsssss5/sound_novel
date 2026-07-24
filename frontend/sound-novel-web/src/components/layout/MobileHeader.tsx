import { assets } from '../../content/assets'
import styles from './MobileHeader.module.css'

interface MobileHeaderProps {
  onOpenMenu: () => void
  onOpenMap: () => void
}

export function MobileHeader({ onOpenMenu, onOpenMap }: MobileHeaderProps) {
  return (
    <header className={styles.header}>
      <button type="button" className={styles.iconBtn} onClick={onOpenMenu} aria-label="Меню">
        <MenuIcon />
      </button>

      <div className={styles.logoWrap}>
        <img src={assets.logo} alt="" className={styles.logo} />
      </div>

      <button type="button" className={styles.iconBtn} onClick={onOpenMap} aria-label="Карта">
        <MapIcon />
      </button>
    </header>
  )
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function MapIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 4v14M15 6v14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
