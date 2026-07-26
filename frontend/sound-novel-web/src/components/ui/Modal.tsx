import { useEffect, type MouseEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  ariaLabel?: string
  children: ReactNode
  whiteBackground?: boolean
  /** Крестик поверх контента, без полосы над картинкой */
  closeFloating?: boolean
}

export function Modal({
  open,
  onClose,
  title,
  ariaLabel,
  children,
  whiteBackground = true,
  closeFloating = false,
}: ModalProps) {
  useEffect(() => {
    if (!open) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    // Модалка раньше жила внутри .main со скроллом — блокируем его на всякий случай
    const main = document.querySelector('main') as HTMLElement | null
    const prevMainOverflow = main?.style.overflow ?? ''
    if (main) {
      main.style.overflow = 'hidden'
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      if (main) {
        main.style.overflow = prevMainOverflow
      }
    }
  }, [open, onClose])

  if (!open) {
    return null
  }

  const handleOverlayClick = () => {
    onClose()
  }

  const handlePanelClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  return createPortal(
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel || title || undefined}
      onClick={handleOverlayClick}
    >
      <div
        className={`${styles.panel} ${whiteBackground ? styles.white : ''}`}
        onClick={handlePanelClick}
      >
        {closeFloating ? (
          <button
            type="button"
            className={styles.closeFloating}
            onClick={onClose}
            aria-label="Закрыть"
          >
            ×
          </button>
        ) : (
          <header className={styles.header}>
            {title ? <h2 className={styles.title}>{title}</h2> : <div />}
            <button type="button" className={styles.close} onClick={onClose} aria-label="Закрыть">
              ×
            </button>
          </header>
        )}
        <div className={`${styles.body} ${closeFloating ? styles.bodyFlush : ''}`}>{children}</div>
      </div>
    </div>,
    document.body,
  )
}
