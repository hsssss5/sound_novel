import { MapRoutePanel } from '../map/MapRoutePanel'
import styles from './MapPage.module.css'

export function MapPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Маршрут</h1>
      <div className={styles.panel}>
        <MapRoutePanel large />
      </div>
    </div>
  )
}
