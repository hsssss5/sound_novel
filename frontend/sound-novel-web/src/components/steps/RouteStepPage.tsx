import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import type { TourStep } from '../../content/types'
import { assets } from '../../content/assets'
import { StepFooter, StepNav } from '../layout/StepFooter'
import { AudioPlayer } from '../ui/AudioPlayer'
import { Button } from '../ui/Button'
import styles from './RouteStepPage.module.css'

interface RouteStepPageProps {
  step: TourStep
  onNext: () => void
  onBack?: () => void
  onSecondary?: () => void
}

function BodyText({ body }: { body: string }) {
  return (
    <>
      {body.split('\n\n').map((paragraph) => (
        <p key={paragraph} className={styles.body}>
          {paragraph}
        </p>
      ))}
    </>
  )
}

function SquarePhoto({ src }: { src: string }) {
  return (
    <div className={styles.photoWrap}>
      <img src={src} alt="" className={styles.photo} />
    </div>
  )
}

function MapLightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return createPortal(
    <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Карта маршрута">
      <button
        type="button"
        className={styles.lightboxBackdrop}
        aria-label="Закрыть"
        onClick={onClose}
      />
      <div className={styles.lightboxPanel}>
        <button
          type="button"
          className={styles.lightboxClose}
          aria-label="Закрыть"
          onClick={onClose}
        >
          ×
        </button>
        <img src={src} alt="" className={styles.lightboxImage} />
      </div>
    </div>,
    document.body,
  )
}

function MapImage({ src }: { src: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        className={styles.mapButton}
        onClick={() => setOpen(true)}
        aria-label="Увеличить карту"
      >
        <img src={src} alt="" className={styles.mapImage} />
      </button>
      {open && <MapLightbox src={src} onClose={() => setOpen(false)} />}
    </>
  )
}

function StepActions({ step, onNext, onBack, onSecondary }: RouteStepPageProps) {
  return (
    <StepFooter>
      {step.secondaryAction && onSecondary && (
        <Button variant="primary" onClick={onSecondary}>
          {step.secondaryAction.label}
        </Button>
      )}
      <StepNav>
        {onBack && (
          <Button variant="outline" fullWidth={false} size="compact" onClick={onBack}>
            Назад
          </Button>
        )}
        <Button variant="light" fullWidth={false} size="compact" onClick={onNext}>
          Далее
        </Button>
      </StepNav>
    </StepFooter>
  )
}

export function CheckpointStep({ step, onNext, onBack, onSecondary }: RouteStepPageProps) {
  const showPlayer = step.hasAudio !== false

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        {step.locationImageUrl && <SquarePhoto src={step.locationImageUrl} />}
        {step.body && <BodyText body={step.body} />}
        {showPlayer && <AudioPlayer src={step.audioUrl} />}
      </div>
      <StepActions step={step} onNext={onNext} onBack={onBack} onSecondary={onSecondary} />
    </div>
  )
}

export function TransitStep({ step, onNext, onBack, onSecondary }: RouteStepPageProps) {
  const showPlayer = step.hasAudio === true

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        {step.mapImageUrl && <MapImage src={step.mapImageUrl} />}
        {step.travelTime && <p className={styles.travelTime}>Время в пути — {step.travelTime}.</p>}
        {step.body && <BodyText body={step.body} />}
        {showPlayer && <AudioPlayer src={step.audioUrl} />}
      </div>
      <StepActions step={step} onNext={onNext} onBack={onBack} onSecondary={onSecondary} />
    </div>
  )
}

export function FinaleStep({ step, onNext, onBack }: Omit<RouteStepPageProps, 'onSecondary'>) {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        {step.body && <BodyText body={step.body} />}
        <div className={styles.playerBlock}>
          <img src={assets.finaleCat} alt="" className={styles.finaleCat} />
          {step.hasAudio !== false && <AudioPlayer src={step.audioUrl} />}
        </div>
      </div>
      <StepFooter>
        <StepNav>
          {onBack && (
            <Button variant="outline" fullWidth={false} size="compact" onClick={onBack}>
              Назад
            </Button>
          )}
          <Button variant="light" fullWidth={false} size="compact" onClick={onNext}>
            Далее
          </Button>
        </StepNav>
      </StepFooter>
    </div>
  )
}
