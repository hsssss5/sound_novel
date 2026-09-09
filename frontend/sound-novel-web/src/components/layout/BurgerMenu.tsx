import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { assets } from '../../content/assets'
import { externalLinks } from '../../content/feedback'
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
              История
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
            <a
              className={styles.externalLink}
              href={externalLinks.mcbs.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
            >
              <span>{externalLinks.mcbs.label}</span>
              <img
                className={`${styles.icon} ${styles.iconMcbs}`}
                src={assets.iconMcbs}
                alt=""
                width={98}
                height={56}
              />
            </a>
          </li>
          <li className={styles.item}>
            <a
              className={styles.externalLink}
              href={externalLinks.vk.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
            >
              <span>{externalLinks.vk.label}</span>
              <img
                className={styles.icon}
                src={assets.iconVk}
                alt=""
                width={56}
                height={56}
              />
            </a>
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
