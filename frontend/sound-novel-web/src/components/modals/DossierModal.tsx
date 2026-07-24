import { Modal } from '../ui/Modal'

import styles from './EmptyModal.module.css'



interface DossierModalProps {

  open: boolean

  onClose: () => void

}



export function DossierModal({ open, onClose }: DossierModalProps) {

  return (

    <Modal open={open} onClose={onClose} title="Досье персонажей">

      <p className={styles.empty} />

    </Modal>

  )

}


