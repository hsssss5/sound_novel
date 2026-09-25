import { useEffect } from 'react'
import { Button } from '../ui/Button'
import { feedbackIntro, yandexForms } from '../../content/feedback'
import { useHeaderChrome } from '../layout/HeaderChromeContext'
import styles from './FeedbackPage.module.css'

export function FeedbackPage() {
  const { setShowBrandLogo } = useHeaderChrome()

  useEffect(() => {
    setShowBrandLogo(true)
    return () => setShowBrandLogo(false)
  }, [setShowBrandLogo])

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Обратная связь</h1>
      <p className={styles.intro}>{feedbackIntro}</p>
      <div className={styles.cta}>
        <Button
          variant="primary"
          fullWidth={false}
          onClick={() => window.open(yandexForms.feedback, '_blank', 'noopener,noreferrer')}
        >
          Оставить отзыв
        </Button>
      </div>
    </div>
  )
}
