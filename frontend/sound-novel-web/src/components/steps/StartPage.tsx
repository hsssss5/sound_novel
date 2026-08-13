import styles from './StartPage.module.css'

interface StartPageProps {
  title: string
  subtitle: string
  onNext: () => void
}

function TextLines({ text, className }: { text: string; className: string }) {
  return (
    <>
      {text.split('\n').map((line) => (
        <span key={line} className={className}>
          {line}
        </span>
      ))}
    </>
  )
}

export function StartPage({ title, subtitle, onNext }: StartPageProps) {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.title}>
          <TextLines text={title} className={styles.titleLine} />
        </h1>
        <p className={styles.subtitle}>
          <TextLines text={subtitle} className={styles.subtitleLine} />
        </p>
      </div>
      <div className={styles.footer}>
        <button type="button" className={styles.glassBtn} onClick={onNext}>
          Далее
        </button>
      </div>
    </div>
  )
}
