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
  onOpenMap: () => void
  onOpenDossier: () => void
  onOpenTeam: () => void
  onOpenFeedback: () => void
}

export function AppShell({
  children,
  overlayOpacity = 0.35,
  menuOpen,
  onOpenMenu,
  onCloseMenu,
  onOpenMap,
  onOpenDossier,
  onOpenTeam,
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
        onOpenDossier={onOpenDossier}
        onOpenTeam={onOpenTeam}
        onOpenMap={onOpenMap}
        onOpenFeedback={onOpenFeedback}
      />
    </div>
  )
}
