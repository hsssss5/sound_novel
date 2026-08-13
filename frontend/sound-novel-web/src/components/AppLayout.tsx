import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { AppShell } from './layout/AppShell'
import { HeaderChromeProvider } from './layout/HeaderChromeContext'
import styles from './AppLayout.module.css'

export function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isTour = location.pathname === '/' || location.pathname === ''

  const go = (path: string) => {
    setMenuOpen(false)
    navigate(path)
  }

  return (
    <HeaderChromeProvider>
      <AppShell
        menuOpen={menuOpen}
        onOpenMenu={() => setMenuOpen(true)}
        onCloseMenu={() => setMenuOpen(false)}
        onOpenTour={() => go('/')}
        onOpenMap={() => go('/map')}
        onOpenDossier={() => go('/characters')}
        onOpenAbout={() => go('/about')}
        onOpenLegends={() => go('/legends')}
        onOpenFeedback={() => go('/feedback')}
      >
        {!isTour && (
          <button
            type="button"
            className={styles.backToTour}
            onClick={() => navigate('/')}
          >
            ← К истории
          </button>
        )}
        <Outlet />
      </AppShell>
    </HeaderChromeProvider>
  )
}
