import { MapRoutePanel } from '../map/MapRoutePanel'
import { Modal } from '../ui/Modal'
import styles from './MapModal.module.css'

interface MapModalProps {
  open: boolean
  onClose: () => void
}

export function MapModal({ open, onClose }: MapModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Маршрут">
      <div className={styles.wrap}>
        <MapRoutePanel />
      </div>
    </Modal>
  )
}
