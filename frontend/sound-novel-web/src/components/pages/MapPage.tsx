import { get2GisRouteUrl, getYandexMapsRouteUrl, routePoints } from '../../content/mapLinks'
import styles from './MapPage.module.css'
import pageStyles from './SimplePage.module.css'

export function MapPage() {
  const yandexUrl = getYandexMapsRouteUrl()
  const gisUrl = get2GisRouteUrl()

  return (
    <div className={pageStyles.page}>
      <h1 className={pageStyles.title}>Маршрут</h1>
      <div className={styles.panel}>
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
          <a
            href={gisUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.mapLink} ${styles.mapLinkSecondary}`}
          >
            Открыть в 2ГИС
          </a>
        </div>
      </div>
    </div>
  )
}
