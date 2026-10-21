let sharedAudio: HTMLAudioElement | null = null
let sharedSrc = ''

export function getSharedTourAudio() {
  if (typeof window === 'undefined') {
    return null
  }
  if (!sharedAudio) {
    sharedAudio = new Audio()
    sharedAudio.preload = 'metadata'
    sharedAudio.setAttribute('playsinline', 'true')
  }
  return sharedAudio
}

export function getSharedTourSrc() {
  return sharedSrc
}

/** Меняет трек только если ничего не играет (или force). Не автозапускает. */
export function ensureSharedTourSrc(src: string, force = false) {
  const audio = getSharedTourAudio()
  if (!audio || sharedSrc === src) {
    return audio
  }
  if (!force && sharedSrc && !audio.paused) {
    return audio
  }
  sharedSrc = src
  audio.src = src
  audio.load()
  return audio
}
