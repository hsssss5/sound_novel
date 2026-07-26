import { assets } from '../../content/assets'
import { useHeaderChrome } from './HeaderChromeContext'
import styles from './MobileHeader.module.css'

interface MobileHeaderProps {
  onOpenMenu: () => void
  onOpenMap: () => void
}

export function MobileHeader({ onOpenMenu, onOpenMap }: MobileHeaderProps) {
  const { showBrandLogo } = useHeaderChrome()

  return (
    <header className={styles.header}>
      <button type="button" className={styles.iconBtn} onClick={onOpenMenu} aria-label="Меню">
        <MenuIcon />
      </button>

      <div className={styles.spacer} aria-hidden="true" />

      {showBrandLogo ? (
        <div className={styles.logoMark}>
          <img src={assets.headerLogo} alt="" className={styles.headerLogo} />
        </div>
      ) : (
        <button type="button" className={styles.iconBtn} onClick={onOpenMap} aria-label="Карта">
          <MapIcon />
        </button>
      )}
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
        d="M9 4.5l6 2.5 5-2v14.5l-5 2-6-2.5-5 2V6.5l5-2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 4.5v14M15 7v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
