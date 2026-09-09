import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../../content/assets'
import { Button } from '../ui/Button'
import { StepFooter, StepNav } from '../layout/StepFooter'
import styles from './TextStepPage.module.css'

interface TextStepPageProps {
  body: string
  primaryLabel: string
  onNext: () => void
  onBack?: () => void
}

const legendIcons: Record<string, string> = {
  'legend-cat': assets.legendCat,
  'legend-cloud': assets.legendCloud,
}

function renderParagraph(paragraph: string): ReactNode {
  const parts = paragraph.split(/(\{\{legend-(?:cat|cloud)\}\})/g)
  if (parts.length === 1) {
    return paragraph
  }

  return parts.map((part, index) => {
    const match = part.match(/^\{\{(legend-(?:cat|cloud))\}\}$/)
    if (!match) {
      return <span key={`${index}-${part}`}>{part}</span>
    }

    const src = legendIcons[match[1]]
    return (
      <img
        key={`${index}-${match[1]}`}
        src={src}
        alt=""
        className={styles.legendIcon}
      />
    )
  })
}

export function SynopsisPage({
  body,
  onNext,
  onBack,
}: Omit<TextStepPageProps, 'primaryLabel'>) {
  return <TextStepPage body={body} primaryLabel="Далее" onNext={onNext} onBack={onBack} />
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
    <TextStepPage
      body={body}
      primaryLabel="Начать прохождение"
      onNext={onNext}
      onBack={onBack}
    />
  )
}

export function CompletePage({ body }: { body: string }) {
  const navigate = useNavigate()
  const paragraphs = body.split('\n\n')

  return (
    <div className={styles.page}>
      <div className={`${styles.content} ${styles.completeContent}`}>
        <div className={styles.completeText}>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.body}>
              {paragraph}
            </p>
          ))}
        </div>
        <div className={styles.completeCta}>
          <Button
            variant="primary"
            fullWidth={false}
            onClick={() => navigate('/feedback')}
          >
            Оставить отзыв
          </Button>
        </div>
      </div>
    </div>
  )
}

function TextStepPage({ body, primaryLabel, onNext, onBack }: TextStepPageProps) {
  const paragraphs = body.split('\n\n')

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className={styles.body}>
            {renderParagraph(paragraph)}
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
