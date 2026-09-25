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

function splitTitle(title: string) {
  const match = title.match(/^(.+?)\s(\([^)]+\))$/)
  if (!match) {
    return { line1: title, line2: null as string | null }
  }
  return { line1: match[1], line2: match[2] }
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

function renderRichText(paragraph: string) {
  const parts = paragraph.split(/(\*[^*]+\*)/g)
  return parts.map((part, index) => {
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return (
        <em key={`${index}-${part}`} className={styles.textItalic}>
          {part.slice(1, -1)}
        </em>
      )
    }
    return <span key={`${index}-${part}`}>{part}</span>
  })
}

function ExtraImageBlock({
  extra,
}: {
  extra: NonNullable<PlaceMaterial['extraImages']>[number]
}) {
  return (
    <div className={styles.extra}>
      <img src={extra.imageUrl} alt="" className={styles.image} />
      {extra.caption && <p className={styles.caption}>{extra.caption}</p>}
      {extra.caption && extra.captionSource && <div className={styles.divider} />}
      {extra.captionSource && <p className={styles.captionSource}>{extra.captionSource}</p>}
    </div>
  )
}

function TextParagraphs({
  text,
  extras = [],
}: {
  text: string
  extras?: NonNullable<PlaceMaterial['extraImages']>
}) {
  const extrasById = new Map(extras.filter((extra) => extra.id).map((extra) => [extra.id!, extra]))

  return (
    <>
      {text
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
        .map((paragraph) => {
          const imageMatch = paragraph.match(/^\{\{image:([^}]+)\}\}$/)
          if (imageMatch) {
            const extra = extrasById.get(imageMatch[1])
            if (!extra) {
              return null
            }
            return <ExtraImageBlock key={`image-${imageMatch[1]}`} extra={extra} />
          }

          const italicBlock = paragraph.match(/^\*([\s\S]*)\*$/)
          if (italicBlock && !italicBlock[1].includes('*')) {
            const lines = italicBlock[1]
              .split('\n')
              .map((line) => line.trim())
              .filter(Boolean)
            return (
              <p key={paragraph} className={`${styles.textPara} ${styles.textItalic}`}>
                {lines.map((line, index) => (
                  <span key={line}>
                    {index > 0 && <br />}
                    {line}
                  </span>
                ))}
              </p>
            )
          }

          return (
            <p key={paragraph} className={styles.textPara}>
              {renderRichText(paragraph)}
            </p>
          )
        })}
    </>
  )
}

function TextSection({ material }: { material: PlaceMaterial }) {
  const [textOpen, setTextOpen] = useState(false)
  const hasText = Boolean(material.text || material.dates)
  const extras = material.extraImages ?? []
  const hasExtras = extras.length > 0
  if (!hasText && !hasExtras) {
    return null
  }

  const referencedIds = new Set(
    [...(material.text?.matchAll(/\{\{image:([^}]+)\}\}/g) ?? [])].map((match) => match[1]),
  )
  const trailingExtras = extras.filter((extra) => !extra.id || !referencedIds.has(extra.id))

  return (
    <>
      <button type="button" className={styles.textToggle} onClick={() => setTextOpen((v) => !v)}>
        <span>Текстовая версия</span>
        <ChevronIcon open={textOpen} />
      </button>
      {textOpen && (
        <div className={styles.textBlock}>
          {material.dates && (
            <p className={styles.dates}>
              {material.dates.split('\n').map((line) => (
                <span key={line} className={styles.datesLine}>
                  {line}
                </span>
              ))}
            </p>
          )}
          {material.text && <TextParagraphs text={material.text} extras={extras} />}
          {trailingExtras.map((extra) => (
            <ExtraImageBlock key={extra.id ?? extra.imageUrl} extra={extra} />
          ))}
        </div>
      )}
    </>
  )
}

function MaterialBlock({ material }: { material: PlaceMaterial }) {
  const hasImage = Boolean(material.imageUrl)
  const hasText = Boolean(material.text || material.dates)
  const hasExtras = Boolean(material.extraImages?.length)

  if (!hasImage && !hasText && !hasExtras) {
    return null
  }

  if (!hasImage) {
    return (
      <article className={styles.card}>
        <TitleBlock title={material.title} />
        {material.audioUrl && <AudioPlayer src={material.audioUrl} />}
        <TextSection material={material} />
      </article>
    )
  }

  const historicPhoto = Boolean(material.hideTitle)
  const placeMeta = isPlaceMetaCaption(material.caption, material.captionSource)
  const photoCaption = material.caption && !placeMeta ? material.caption : undefined
  const placeLine = placeMeta ? material.caption : 'Санкт-Петербург, 2026 год'
  const showPlaceLine = !(photoCaption && material.captionSource)
  const imageStyle = material.imageObjectPosition
    ? { objectPosition: material.imageObjectPosition }
    : undefined

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={material.imageUrl} alt="" className={styles.image} style={imageStyle} />
      </div>
      {photoCaption && <p className={styles.caption}>{photoCaption}</p>}
      {photoCaption && material.captionSource && <div className={styles.divider} />}
      {material.captionSource && <p className={styles.captionSource}>{material.captionSource}</p>}

      {!historicPhoto && (
        <>
          <TitleBlock title={material.title} />
          {showPlaceLine && (
            <>
              <div className={styles.divider} />
              <p className={styles.placeLine}>{placeLine}</p>
            </>
          )}
        </>
      )}

      {material.audioUrl && <AudioPlayer src={material.audioUrl} />}

      <TextSection material={material} />
    </article>
  )
}

function TitleBlock({ title }: { title: string }) {
  const { line1, line2 } = splitTitle(title)
  return (
    <div className={styles.titleBlock}>
      <h3 className={styles.cardTitle}>{line1}</h3>
      {line2 && <p className={styles.cardTitleSub}>{line2}</p>}
    </div>
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
