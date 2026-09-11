import { Button } from '../ui/Button'
import { feedbackIntro } from '../../content/feedback'
import styles from './FeedbackPage.module.css'

export function FeedbackPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Обратная связь</h1>
      <p className={styles.intro}>{feedbackIntro}</p>
      <form className={styles.panel} onSubmit={(e) => e.preventDefault()}>
        <label className={styles.field}>
          <span className={styles.label}>Имя</span>
          <input className={styles.input} type="text" name="name" autoComplete="name" />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Email</span>
          <input className={styles.input} type="email" name="email" autoComplete="email" />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Сообщение</span>
          <textarea className={styles.textarea} name="message" rows={5} />
        </label>
        <label className={styles.consent}>
          <input className={styles.checkbox} type="checkbox" name="consent" required />
          <span>Я соглашаюсь на обработку моих персональных данных</span>
        </label>
        <div className={styles.submitWrap}>
          <Button type="submit" variant="primary">
            Отправить
          </Button>
        </div>
      </form>
    </div>
  )
}
