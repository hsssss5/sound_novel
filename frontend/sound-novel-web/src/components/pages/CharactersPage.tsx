import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { characterRows, charactersById } from '../../content/characters'
import { useHeaderChrome } from '../layout/HeaderChromeContext'
import styles from './CharactersPage.module.css'

export function CharactersPage() {
  const { setShowBrandLogo } = useHeaderChrome()
  const [activeId, setActiveId] = useState<string | null>(null)
  const active = activeId ? charactersById[activeId] : null

  useEffect(() => {
    setShowBrandLogo(true)
    return () => setShowBrandLogo(false)
  }, [setShowBrandLogo])

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
        {characterRows.map((row) => (
          <div key={row.join('-')} className={styles.row}>
            {row.map((id) => {
              const character = charactersById[id]
              return (
                <button
                  key={character.id}
                  type="button"
                  className={styles.card}
                  onClick={() => setActiveId(character.id)}
                >
                  <img src={character.thumbUrl} alt="" className={styles.photo} />
                  <span className={styles.name}>{character.name}</span>
                </button>
              )
            })}
          </div>
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
