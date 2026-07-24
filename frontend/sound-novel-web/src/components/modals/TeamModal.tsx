import { Modal } from '../ui/Modal'

import styles from './EmptyModal.module.css'



interface TeamModalProps {

  open: boolean

  onClose: () => void

}



export function TeamModal({ open, onClose }: TeamModalProps) {

  return (

    <Modal open={open} onClose={onClose} title="Команда проекта">

      <p className={styles.empty} />

    </Modal>

  )

}


