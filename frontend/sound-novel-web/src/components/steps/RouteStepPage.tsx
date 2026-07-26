import { useState } from 'react'
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

function LocationImage({ src }: { src: string }) {
  return (
    <div className={styles.locationFrame}>
      <img src={assets.frame} alt="" className={styles.frameBg} aria-hidden="true" />
      <img src={src} alt="" className={styles.locationImage} />
    </div>
  )
}

function MapImage({ src }: { src: string }) {
  const [zoomed, setZoomed] = useState(false)

  return (
    <>
      <button type="button" className={styles.mapButton} onClick={() => setZoomed(true)}>
        <img src={src} alt="" className={styles.mapImage} />
      </button>
      {zoomed && (
        <div className={styles.zoomOverlay} onClick={() => setZoomed(false)} role="presentation">
          <img src={src} alt="" className={styles.zoomImage} />
        </div>
      )}
    </>
  )
}

function StepActions({
  step,
  onNext,
  onBack,
  onSecondary,
}: RouteStepPageProps) {
  return (
    <StepFooter>
      {step.secondaryAction && onSecondary && (
        <Button variant="light" onClick={onSecondary}>
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
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        {step.locationImageUrl && <LocationImage src={step.locationImageUrl} />}
        {step.body && <p className={styles.body}>{step.body}</p>}
        <AudioPlayer src={step.audioUrl} />
      </div>
      <StepActions step={step} onNext={onNext} onBack={onBack} onSecondary={onSecondary} />
    </div>
  )
}

export function TransitStep({ step, onNext, onBack, onSecondary }: RouteStepPageProps) {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        {step.mapImageUrl && <MapImage src={step.mapImageUrl} />}
        {step.travelTime && <p className={styles.travelTime}>Время в пути — {step.travelTime}.</p>}
        {step.body && <p className={styles.body}>{step.body}</p>}
        <AudioPlayer src={step.audioUrl} />
      </div>
      <StepActions step={step} onNext={onNext} onBack={onBack} onSecondary={onSecondary} />
    </div>
  )
}
