import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'
import styles from './FeedbackModal.module.css'

interface FeedbackModalProps {
  open: boolean
  onClose: () => void
}

export function FeedbackModal({ open, onClose }: FeedbackModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Обратная связь">
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
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
        <Button type="submit" variant="primary">
          Отправить
        </Button>
      </form>
    </Modal>
  )
}
