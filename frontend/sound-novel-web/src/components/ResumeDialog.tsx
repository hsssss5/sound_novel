import { Modal } from './ui/Modal'
import { Button } from './ui/Button'
import styles from './ResumeDialog.module.css'

interface ResumeDialogProps {
  open: boolean
  onResume: () => void
  onRestart: () => void
}

export function ResumeDialog({ open, onResume, onRestart }: ResumeDialogProps) {
  return (
    <Modal open={open} onClose={onResume} title="Продолжить?">
      <p className={styles.text}>У вас есть сохранённый прогресс. Продолжить с того же места?</p>
      <div className={styles.actions}>
        <Button onClick={onResume}>Продолжить</Button>
        <Button variant="light" onClick={onRestart}>
          Начать сначала
        </Button>
      </div>
    </Modal>
  )
}
