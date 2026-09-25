import { useEffect } from 'react'
import { Button } from '../ui/Button'
import { legendsIntro } from '../../content/legends'
import { yandexForms } from '../../content/feedback'
import { useHeaderChrome } from '../layout/HeaderChromeContext'
import styles from './LegendsPage.module.css'

export function LegendsPage() {
  const { setShowBrandLogo } = useHeaderChrome()

  useEffect(() => {
    setShowBrandLogo(true)
    return () => setShowBrandLogo(false)
  }, [setShowBrandLogo])

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Легенды вашего двора</h1>

      <div className={styles.intro}>
        {legendsIntro.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}
      </div>

      <div className={styles.cta}>
        <Button
          variant="primary"
          fullWidth={false}
          onClick={() => window.open(yandexForms.legends, '_blank', 'noopener,noreferrer')}
        >
          Поделиться историей
        </Button>
      </div>
    </div>
  )
}
