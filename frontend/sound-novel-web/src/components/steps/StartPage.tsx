import styles from './StartPage.module.css'

interface StartPageProps {
  title: string
  subtitle: string
  onNext: () => void
}

export function StartPage({ title, subtitle, onNext }: StartPageProps) {
  return (
    <div className={styles.page}>
      <div className={styles.center}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      <div className={styles.footer}>
        <button type="button" className={styles.glassBtn} onClick={onNext}>
          Далее
        </button>
      </div>
    </div>
  )
}
