import { Button } from '../ui/Button'
import { legendsIntro } from '../../content/legends'
import styles from './LegendsPage.module.css'

export function LegendsPage() {
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
        <div className={styles.submitWrap}>
          <Button type="submit" variant="primary">
            Отправить
          </Button>
        </div>
      </form>
    </div>
  )
}
