import styles from './SimplePage.module.css'

export function AboutPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>О проекте</h1>
      <p className={styles.empty} />
    </div>
  )
}
