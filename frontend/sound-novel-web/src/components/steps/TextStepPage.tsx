import { Button } from '../ui/Button'

import { StepFooter } from '../layout/StepFooter'

import styles from './TextStepPage.module.css'



interface TextStepPageProps {

  body: string

  primaryLabel: string

  onNext: () => void

}



export function WelcomePage({ body, onNext }: Omit<TextStepPageProps, 'primaryLabel'>) {

  return <TextStepPage body={body} primaryLabel="Далее" onNext={onNext} />

}



export function InstructionPage({ body, onNext }: Omit<TextStepPageProps, 'primaryLabel'>) {

  return <TextStepPage body={body} primaryLabel="Начать прохождение" onNext={onNext} />

}



function TextStepPage({ body, primaryLabel, onNext }: TextStepPageProps) {

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

        <Button variant="light" onClick={onNext}>

          {primaryLabel}

        </Button>

      </StepFooter>

    </div>

  )

}


