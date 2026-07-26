import { Button } from '../ui/Button'
import { StepFooter, StepNav } from '../layout/StepFooter'
import styles from './TextStepPage.module.css'

interface TextStepPageProps {
  body: string
  primaryLabel: string
  onNext: () => void
  onBack?: () => void
}

export function WelcomePage({
  body,
  onNext,
  onBack,
}: Omit<TextStepPageProps, 'primaryLabel'>) {
  return <TextStepPage body={body} primaryLabel="Далее" onNext={onNext} onBack={onBack} />
}

export function InstructionPage({
  body,
  onNext,
  onBack,
}: Omit<TextStepPageProps, 'primaryLabel'>) {
  return (
    <TextStepPage body={body} primaryLabel="Начать прохождение" onNext={onNext} onBack={onBack} />
  )
}

function TextStepPage({ body, primaryLabel, onNext, onBack }: TextStepPageProps) {
  const paragraphs = body.split('\n\n')

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className={styles.body}>
            {paragraph}
          </p>
        ))}
      </div>
      <StepFooter>
        <StepNav>
          {onBack && (
            <Button variant="outline" fullWidth={false} size="compact" onClick={onBack}>
              Назад
            </Button>
          )}
          <Button variant="light" fullWidth={false} size="compact" onClick={onNext}>
            {primaryLabel}
          </Button>
        </StepNav>
      </StepFooter>
    </div>
  )
}
