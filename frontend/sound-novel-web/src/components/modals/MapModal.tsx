import { get2GisRouteUrl, getYandexMapsRouteUrl, routePoints } from '../../content/mapLinks'
import { Modal } from '../ui/Modal'
import styles from './MapModal.module.css'

interface MapModalProps {
  open: boolean
  onClose: () => void
}

export function MapModal({ open, onClose }: MapModalProps) {
  const yandexUrl = getYandexMapsRouteUrl()
  const gisUrl = get2GisRouteUrl()

  return (
    <Modal open={open} onClose={onClose} title="Маршрут">
      <div className={styles.wrap}>
        <ol className={styles.list}>
          {routePoints.map((point, index) => (
            <li key={point.title} className={styles.listItem}>
              <span className={styles.number}>{index + 1}</span>
              <span className={styles.pointTitle}>{point.title}</span>
            </li>
          ))}
        </ol>

        <div className={styles.actions}>
          <a href={yandexUrl} target="_blank" rel="noopener noreferrer" className={styles.mapLink}>
            Открыть в Яндекс.Картах
          </a>
          <a href={gisUrl} target="_blank" rel="noopener noreferrer" className={`${styles.mapLink} ${styles.mapLinkSecondary}`}>
            Открыть в 2ГИС
          </a>
        </div>
      </div>
    </Modal>
  )
}
