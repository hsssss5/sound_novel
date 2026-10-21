const STORAGE_KEY = 'sn-playback-rate'
export const PLAYBACK_RATES = [1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2] as const

export type PlaybackRate = (typeof PLAYBACK_RATES)[number]

export function loadPlaybackRateIndex() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw == null) {
      return 0
    }
    const value = Number(raw)
    const index = PLAYBACK_RATES.findIndex((rate) => rate === value)
    return index >= 0 ? index : 0
  } catch {
    return 0
  }
}

export function savePlaybackRateIndex(index: number) {
  const rate = PLAYBACK_RATES[index]
  if (rate == null) {
    return
  }
  try {
    localStorage.setItem(STORAGE_KEY, String(rate))
  } catch {
    // ignore
  }
}
