import styles from './FeedbackPage.module.css'
import pageStyles from './SimplePage.module.css'

export function FeedbackPage() {
  return (
    <div className={pageStyles.page}>
      <h1 className={pageStyles.title}>Обратная связь</h1>
      <form className={styles.panel} onSubmit={(e) => e.preventDefault()}>
        <label className={styles.field}>
          <span className={styles.label}>Имя</span>
          <input className={styles.input} type="text" name="name" />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Email</span>
          <input className={styles.input} type="email" name="email" />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Сообщение</span>
          <textarea className={styles.textarea} name="message" rows={5} />
        </label>
      </form>
    </div>
  )
}
