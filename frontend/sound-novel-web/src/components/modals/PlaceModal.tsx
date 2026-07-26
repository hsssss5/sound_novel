import { useState } from 'react'
import type { PlaceMaterial } from '../../content/types'
import { AudioPlayer } from '../ui/AudioPlayer'
import { Modal } from '../ui/Modal'
import styles from './PlaceModal.module.css'

interface PlaceModalProps {
  open: boolean
  materials: PlaceMaterial[]
  onClose: () => void
}

function isPlaceMetaCaption(caption?: string, captionSource?: string) {
  if (!caption || captionSource) {
    return false
  }
  return /^Санкт-Петербург/i.test(caption)
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function TextSection({ material }: { material: PlaceMaterial }) {
  const [textOpen, setTextOpen] = useState(false)
  const hasText = Boolean(material.text || material.dates)
  if (!hasText) {
    return null
  }

  return (
    <>
      <button type="button" className={styles.textToggle} onClick={() => setTextOpen((v) => !v)}>
        <span>Текстовая версия</span>
        <ChevronIcon open={textOpen} />
      </button>
      {textOpen && (
        <div className={styles.textBlock}>
          {material.dates && <p className={styles.dates}>{material.dates}</p>}
          {material.text && <p className={styles.text}>{material.text}</p>}
        </div>
      )}
    </>
  )
}

function MaterialBlock({ material }: { material: PlaceMaterial }) {
  const hasImage = Boolean(material.imageUrl)
  const hasText = Boolean(material.text || material.dates)
  const hasExtras = Boolean(material.extraImages?.length)

  // Заглушка без фото и текста — не рендерим (иначе заголовок/плеер висят над следующей картинкой)
  if (!hasImage && !hasText && !hasExtras) {
    return null
  }

  // Только текст (легенда без фото) — без плеера и блока «под линией»
  if (!hasImage) {
    return (
      <article className={styles.card}>
        <h3 className={styles.cardTitle}>{material.title}</h3>
        <TextSection material={material} />
      </article>
    )
  }

  const placeMeta = isPlaceMetaCaption(material.caption, material.captionSource)
  const photoCaption = material.caption && !placeMeta ? material.caption : undefined
  const placeLine = placeMeta ? material.caption : 'Санкт-Петербург, 2026 год'

  return (
    <article className={styles.card}>
      <img src={material.imageUrl} alt="" className={styles.image} />
      {photoCaption && <p className={styles.caption}>{photoCaption}</p>}
      {material.captionSource && <p className={styles.captionSource}>{material.captionSource}</p>}

      <h3 className={styles.cardTitle}>{material.title}</h3>

      <div className={styles.divider} />

      <p className={styles.placeLine}>{placeLine}</p>

      <AudioPlayer />

      <TextSection material={material} />

      {material.extraImages?.map((extra) => (
        <div key={extra.imageUrl} className={styles.extra}>
          <img src={extra.imageUrl} alt="" className={styles.image} />
          {extra.caption && <p className={styles.caption}>{extra.caption}</p>}
          {extra.captionSource && <p className={styles.captionSource}>{extra.captionSource}</p>}
        </div>
      ))}
    </article>
  )
}

export function PlaceModal({ open, materials, onClose }: PlaceModalProps) {
  return (
    <Modal open={open} onClose={onClose} ariaLabel="Послушать историю" closeFloating>
      <div className={styles.list}>
        {materials.map((material) => (
          <MaterialBlock key={material.id} material={material} />
        ))}
      </div>
    </Modal>
  )
}
