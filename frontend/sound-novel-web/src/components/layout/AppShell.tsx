import type { ReactNode } from 'react'
import { BlurredBackground } from './BlurredBackground'
import { BurgerMenu } from './BurgerMenu'
import { MobileHeader } from './MobileHeader'
import styles from './AppShell.module.css'

interface AppShellProps {
  children: ReactNode
  overlayOpacity?: number
  menuOpen: boolean
  onOpenMenu: () => void
  onCloseMenu: () => void
  onOpenTour: () => void
  onOpenMap: () => void
  onOpenDossier: () => void
  onOpenAbout: () => void
  onOpenLegends: () => void
  onOpenFeedback: () => void
}

export function AppShell({
  children,
  overlayOpacity = 0.35,
  menuOpen,
  onOpenMenu,
  onCloseMenu,
  onOpenTour,
  onOpenMap,
  onOpenDossier,
  onOpenAbout,
  onOpenLegends,
  onOpenFeedback,
}: AppShellProps) {
  return (
    <div className={styles.shell}>
      <BlurredBackground opacity={overlayOpacity} />
      <MobileHeader onOpenMenu={onOpenMenu} onOpenMap={onOpenMap} />
      <main className={styles.main}>{children}</main>
      <BurgerMenu
        open={menuOpen}
        onClose={onCloseMenu}
        onOpenTour={onOpenTour}
        onOpenDossier={onOpenDossier}
        onOpenAbout={onOpenAbout}
        onOpenLegends={onOpenLegends}
        onOpenMap={onOpenMap}
        onOpenFeedback={onOpenFeedback}
      />
    </div>
  )
}
