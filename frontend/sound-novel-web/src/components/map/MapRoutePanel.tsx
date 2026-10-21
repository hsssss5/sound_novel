import { useState } from 'react'
import {
  MAP_2GIS_OPEN_URL,
  MAPMAGIC_ROUTE_URL,
  YANDEX_MAP_WIDGET_SRC,
  YANDEX_MAPS_OPEN_URL,
  routePoints,
} from '../../content/mapLinks'
import styles from './MapRoutePanel.module.css'

interface MapRoutePanelProps {
  large?: boolean
}

export function MapRoutePanel({ large = false }: MapRoutePanelProps) {
  const [geoStatus, setGeoStatus] = useState<'idle' | 'loading' | 'error'>('idle')

  const locateMe = () => {
    if (!navigator.geolocation) {
      setGeoStatus('error')
      return
    }
    setGeoStatus('loading')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeoStatus('idle')
        const { latitude, longitude } = position.coords
        const url = `https://yandex.ru/maps/?ll=${longitude},${latitude}&z=16&pt=${longitude},${latitude}`
        window.open(url, '_blank', 'noopener,noreferrer')
      },
      () => {
        setGeoStatus('error')
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 30000 },
    )
  }

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
          href={MAPMAGIC_ROUTE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.openButton}
        >
          MapMagic
        </a>
        <button
          type="button"
          className={styles.openButton}
          onClick={locateMe}
          disabled={geoStatus === 'loading'}
        >
          {geoStatus === 'loading' ? 'Определяем…' : 'Моё местоположение'}
        </button>
      </div>
      {geoStatus === 'error' && (
        <p className={styles.geoError}>Не удалось определить геолокацию. Разрешите доступ в настройках браузера.</p>
      )}

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
