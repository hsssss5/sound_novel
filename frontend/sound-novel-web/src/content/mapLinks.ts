import { routePoints } from './tour'

const YANDEX_CONSTRUCTOR_UM =
  'constructor%3Ad78f44f7f377c314b19ab08f410a951165f45481a1cce763505e6266fb13d416'

export const YANDEX_MAP_WIDGET_SRC =
  `https://yandex.ru/map-widget/v1/?lang=ru_RU&scroll=true&source=constructor-api&um=${YANDEX_CONSTRUCTOR_UM}`

export const MAP_2GIS_WIDGET_SRC =
  'https://makemap.2gis.ru/widget?data=eJzFV11v4kYU_S_uY1B2vj-Q9iF1WsKuw2LaakNXeUCx45gQTM1AFqL8997BM-NGqdJaSmlEZDi-vr5n7vGZ66eoqrO8zrNBXj3kpi7zddT_9hSZ3SqP-tHP-cxs6jzqRau6WuW1OZx_irJ8fVOXK1NWS4iC02tTV_d5XC2qGoAfsOJCyoB_LTNzF_W5__1lNbspzS7qo1MhetF-uMzy71EfP_eioqljZ-_iikjKZf4LlLYsIOFNBQWXy5k5FPqNolOKJCesx_WpxohLet1zqMANyJjWLchpg3JCuEMxkVh6VPpYLDV1GTjlLKCSugwKCRxQzvgBJQirkIHDOjhU4FAYwdLlhWpcLNGS-soEZy1KmHCxRHGPcne9ljhgmgvq7iWZCihRzdIQjBQOWSVWDUpkCFUCaQdqEQrQsHgNSrEgbQIerhcB5MShFHH-ugLKaBurhKuAQ7l-ZRBFLpZzzQOKccOXCOQzAEo8B8FE6C8S3KMKK49iIhwJiVS4Gw6hsPYBlFT4BKhNoJ3CAGUhlghKPKpDWsq0z6DbEig0xceKNlYghzImpZcNVthlYJS3YiLSodDpEMsVcW3nlPq7YaFDrCIhg-B-eQVuxS-l9ixA8B6FK92iS7jq-hoezTKL-oqh594_2oMpzcKeR59-Miip03V8Hv-h4ylKbtPtKH5EyTLd6PgEJcmkyGKBkvPJXH22hvHKWW68p8gZyOM2-otdIP_3974xrsqleWUZzjEw9Y4hqCcnCe9ELt0MR_E0Kc_T5SjGKKGpORy3qcnscfjxTUJoRpSavQshaCKR3pU49oQYSLQTow9Q-SBGydWkGMXf0XRsj3s0vUg3JmYouS-gVek2Ayy5SjePH4_HkChv8mA0omWoSReGn29tbyRKZLo2tkeVOfQti3comdv-Acu9Zft4LGaIEMr9fgDW4JlhpTr17ipda1u96-GLnu3TrRn8iKZHU6TduaRy-5lGbb_A_jqxoulmZA1CgmEMLl-wgu_rUYxeMRpfnJ2gT8nkLrMOkwL9YfFvEg1HgwsnfRDGTXFwrpEVy3xSGLh2elk0_-Ba2rrY1j0uZ8WX8l4l9Ozkv1pNzZTy27AMq8lhauik_peFv60FovAteSctaC3DvBDsVmCEO2lhO5mPmud0mw2S_0nZMAzAx08TsI16NmBRnXpx4YT2q2UzRlNVWP_dmhih6X4y106MfnvcndveyaQ4nufC0EJlGIZaphKxLkwbRzqz--Q9HF3_Lu3jtT0iGzvFizBdhj0fdN5JhGPwhME5kLKesLOtuXMeYDcSmHTSKmuGge3Bf6xIP6SbHXub6DtON9hO8E6gorVeiUlHgdptUR3aNQImUxCssW377XibiKZurCH21S4wYZg-X_eih9lqXK3LpoanaDEz1hIPOw68fmKYceG9rRct7OlGAZIRZud9LuHFLNpX1QOUB2KOgEy1WHy9y_PF7wfU1Jv8-U-Zkkmk'

export const GOOGLE_MY_MAPS_URL =
  'https://www.google.com/maps/d/viewer?mid=1KZSqsP4ZAzJCTF6WAtlBXSV5MisJP4g&ll=59.91934240180665%2C30.318845287299013&z=15'

export const YANDEX_CONSTRUCTOR_SCRIPT_SRC =
  `https://api-maps.yandex.ru/services/constructor/1.0/js/?um=${YANDEX_CONSTRUCTOR_UM}&width=100%25&height=500&lang=ru_RU&scroll=true`

function formatCoords(separator: string, order: 'latLng' | 'lngLat'): string {
  return routePoints
    .map((p) => (order === 'latLng' ? `${p.lat},${p.lng}` : `${p.lng},${p.lat}`))
    .join(separator)
}

export function getYandexMapsRouteUrl(): string {
  return `https://yandex.ru/maps/?rtext=${formatCoords('~', 'latLng')}&rtt=pd`
}

export function get2GisRouteUrl(): string {
  const points = routePoints.map((p) => `${p.lng},${p.lat}`).join('|')
  return `https://2gis.ru/spb/directions/tab/pedestrian/points/${points}`
}

export const YANDEX_MAPS_OPEN_URL = getYandexMapsRouteUrl()
export const MAP_2GIS_OPEN_URL = MAP_2GIS_WIDGET_SRC

export { routePoints }
