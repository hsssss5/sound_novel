import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { characters } from '../../content/characters'
import styles from './CharactersPage.module.css'

export function CharactersPage() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const active = characters.find((c) => c.id === activeId) ?? null

  useEffect(() => {
    if (!active) {
      return
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveId(null)
      }
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [active])

  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        {characters.map((character) => (
          <button
            key={character.id}
            type="button"
            className={styles.card}
            onClick={() => setActiveId(character.id)}
          >
            <img src={character.thumbUrl} alt="" className={styles.photo} />
            <span className={styles.name}>{character.name}</span>
          </button>
        ))}
      </div>

      {active &&
        createPortal(
          <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={active.name}>
            <button
              type="button"
              className={styles.lightboxBackdrop}
              aria-label="Закрыть"
              onClick={() => setActiveId(null)}
            />
            <div className={styles.lightboxPanel}>
              <button
                type="button"
                className={styles.lightboxClose}
                aria-label="Закрыть"
                onClick={() => setActiveId(null)}
              >
                ×
              </button>
              <img src={active.cardUrl} alt={active.name} className={styles.dossierImage} />
            </div>
          </div>,
          document.body,
        )}
    </div>
  )
}
