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
    </Modal>
  )
}
