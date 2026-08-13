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

function MapImage({ src }: { src: string }) {
  return (
    <div className={styles.mapWrap}>
      <img src={src} alt="" className={styles.mapImage} />
    </div>
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
