import { assets } from '../../content/assets'
import { externalLinks, feedbackIntro } from '../../content/feedback'
import styles from './FeedbackPage.module.css'

export function FeedbackPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Обратная связь</h1>
      <p className={styles.intro}>{feedbackIntro}</p>
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

      <nav className={styles.links} aria-label="Ссылки">
        <a
          className={styles.link}
          href={externalLinks.mcbs.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={externalLinks.mcbs.label}
        >
          <img
            className={`${styles.icon} ${styles.iconMcbs}`}
            src={assets.iconMcbs}
            alt={externalLinks.mcbs.label}
            width={98}
            height={56}
          />
        </a>
        <a
          className={styles.link}
          href={externalLinks.vk.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={externalLinks.vk.label}
        >
          <img
            className={styles.icon}
            src={assets.iconVk}
            alt={externalLinks.vk.label}
            width={56}
            height={56}
          />
        </a>
      </nav>
    </div>
  )
}

