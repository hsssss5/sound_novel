import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './BurgerMenu.module.css'

interface BurgerMenuProps {
  open: boolean
  onClose: () => void
  onOpenTour: () => void
  onOpenDossier: () => void
  onOpenAbout: () => void
  onOpenLegends: () => void
  onOpenMap: () => void
  onOpenFeedback: () => void
}

export function BurgerMenu({
  open,
  onClose,
  onOpenTour,
  onOpenDossier,
  onOpenAbout,
  onOpenLegends,
  onOpenMap,
  onOpenFeedback,
}: BurgerMenuProps) {
  useEffect(() => {
    if (!open) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  if (!open) {
    return null
  }

  const handle = (action: () => void) => {
    onClose()
    action()
  }

  return createPortal(
    <div className={styles.root}>
      <button type="button" className={styles.overlay} aria-label="Закрыть меню" onClick={onClose} />
      <nav className={styles.panel} aria-label="Меню">
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Закрыть">
          <CloseIcon />
        </button>
        <ul className={styles.list}>
          <li className={styles.item}>
            <button type="button" className={styles.link} onClick={() => handle(onOpenTour)}>
              Экскурсия
            </button>
          </li>
          <li className={styles.item}>
            <button type="button" className={styles.link} onClick={() => handle(onOpenDossier)}>
              Досье персонажей
            </button>
          </li>
          <li className={styles.item}>
            <button type="button" className={styles.link} onClick={() => handle(onOpenAbout)}>
              О проекте
            </button>
          </li>
          <li className={styles.item}>
            <button type="button" className={styles.link} onClick={() => handle(onOpenLegends)}>
              Легенды вашего двора
            </button>
          </li>
          <li className={styles.item}>
            <button type="button" className={styles.link} onClick={() => handle(onOpenMap)}>
              Карта
            </button>
          </li>
          <li className={styles.item}>
            <button type="button" className={styles.link} onClick={() => handle(onOpenFeedback)}>
              Обратная связь
            </button>
          </li>
          <li className={styles.item}>
            <span className={styles.disabled}>Сайт МЦБС</span>
          </li>
          <li className={styles.item}>
            <span className={styles.disabled}>Группа ВК</span>
          </li>
        </ul>
      </nav>
    </div>,
    document.body,
  )
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
