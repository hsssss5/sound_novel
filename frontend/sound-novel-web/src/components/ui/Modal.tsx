import { useEffect, type MouseEvent, type ReactNode } from 'react'
import styles from './Modal.module.css'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  whiteBackground?: boolean
}

export function Modal({ open, onClose, title, children, whiteBackground = true }: ModalProps) {
  useEffect(() => {
    if (!open) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
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

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={title || undefined}
      onClick={handleOverlayClick}
    >
      <div
        className={`${styles.panel} ${whiteBackground ? styles.white : ''}`}
        onClick={handlePanelClick}
      >
        <header className={styles.header}>
          {title ? <h2 className={styles.title}>{title}</h2> : <div />}
          <button type="button" className={styles.close} onClick={onClose} aria-label="Закрыть">
            ×
          </button>
        </header>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  )
}
