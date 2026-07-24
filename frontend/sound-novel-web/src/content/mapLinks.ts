import { routePoints } from './tour'

function formatCoords(separator: string, order: 'latLng' | 'lngLat'): string {
  return routePoints
    .map((p) => (order === 'latLng' ? `${p.lat},${p.lng}` : `${p.lng},${p.lat}`))
    .join(separator)
}

/** Пешеходный маршрут через все точки — без API-ключа */
export function getYandexMapsRouteUrl(): string {
  return `https://yandex.ru/maps/?rtext=${formatCoords('~', 'latLng')}&rtt=pd`
}

/** Маршрут в 2ГИС (lon,lat) */
export function get2GisRouteUrl(): string {
  const points = routePoints.map((p) => `${p.lng},${p.lat}`).join(';')
  return `https://2gis.ru/spb/directions/tab/pedestrian/points/${points}`
}

export { routePoints }
