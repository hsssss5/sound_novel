import {
  GOOGLE_MY_MAPS_URL,
  MAP_2GIS_OPEN_URL,
  YANDEX_MAP_WIDGET_SRC,
  YANDEX_MAPS_OPEN_URL,
  routePoints,
} from '../../content/mapLinks'
import styles from './MapRoutePanel.module.css'

interface MapRoutePanelProps {
  large?: boolean
}

export function MapRoutePanel({ large = false }: MapRoutePanelProps) {
  return (
    <div className={styles.root}>
      <div className={`${styles.mapFrame} ${large ? styles.mapFrameLarge : ''}`}>
        <iframe
          title="Карта маршрута"
          className={styles.mapIframe}
          src={YANDEX_MAP_WIDGET_SRC}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allow="geolocation; fullscreen"
        />
      </div>

      <div className={styles.openButtons} role="group" aria-label="Открыть маршрут в картах">
        <a
          href={YANDEX_MAPS_OPEN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.openButton}
        >
          Яндекс
        </a>
        <a
          href={MAP_2GIS_OPEN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.openButton}
        >
          2ГИС
        </a>
        <a
          href={GOOGLE_MY_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.openButton}
        >
          Google
        </a>
      </div>

      <ol className={`${styles.list} ${large ? '' : styles.listModal}`}>
        {routePoints.map((point, index) => (
          <li key={point.title} className={styles.listItem}>
            <span className={styles.number}>{index + 1}</span>
            <span className={styles.pointTitle}>{point.title}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
