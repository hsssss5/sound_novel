import { useState } from 'react'
import type { PlaceMaterial } from '../../content/types'
import { Modal } from '../ui/Modal'
import styles from './PlaceModal.module.css'

interface PlaceModalProps {
  open: boolean
  materials: PlaceMaterial[]
  onClose: () => void
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

function MaterialBlock({ material }: { material: PlaceMaterial }) {
  const [textOpen, setTextOpen] = useState(false)
  const hasText = Boolean(material.text || material.dates)

  return (
    <article className={styles.card}>
      {material.imageUrl && <img src={material.imageUrl} alt="" className={styles.image} />}
      {material.caption && <p className={styles.caption}>{material.caption}</p>}
      {material.captionSource && <p className={styles.captionSource}>{material.captionSource}</p>}

      <h3 className={styles.cardTitle}>{material.title}</h3>

      {hasText && (
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
      )}

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
  const title = materials.length === 1 ? materials[0].title : 'Послушать историю'

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className={styles.list}>
        {materials.map((material) => (
          <MaterialBlock key={material.id} material={material} />
        ))}
      </div>
    </Modal>
  )
}
