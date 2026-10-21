import { useEffect, useRef, useState, type MouseEvent, type TouchEvent } from 'react'
import { assetUrl } from '../../lib/assetUrl'
import {
  loadPlaybackRateIndex,
  PLAYBACK_RATES,
  savePlaybackRateIndex,
} from '../../lib/playbackRate'
import {
  ensureSharedTourSrc,
  getSharedTourAudio,
  getSharedTourSrc,
} from '../../lib/sharedTourAudio'
import styles from './AudioPlayer.module.css'

const TEMP_AUDIO_URL = assetUrl('audio/temp-placeholder.mp3')
const TRACK_INSET_PX = 14

interface AudioPlayerProps {
  src?: string
  persist?: boolean
  preload?: 'none' | 'metadata'
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0:00'
  }
  const total = Math.floor(seconds)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function AudioPlayer({ src, persist = false, preload = 'metadata' }: AudioPlayerProps) {
  const localAudioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [rateIndex, setRateIndex] = useState(loadPlaybackRateIndex)

  const audioSrc = src || TEMP_AUDIO_URL
  const playbackRate = PLAYBACK_RATES[rateIndex]

  const getAudio = () => (persist ? getSharedTourAudio() : localAudioRef.current)

  const ownsSharedTrack = () => !persist || getSharedTourSrc() === audioSrc

  useEffect(() => {
    const audio = getAudio()
    if (!audio) {
      return
    }

    if (persist) {
      ensureSharedTourSrc(audioSrc, false)
    }

    const sync = () => {
      if (persist && getSharedTourSrc() !== audioSrc) {
        setPlaying(false)
        setProgress(0)
        setCurrentTime(0)
        setDuration(0)
        return
      }
      if (!audio.duration) {
        return
      }
      setDuration(audio.duration)
      setCurrentTime(audio.currentTime)
      setProgress(audio.currentTime / audio.duration)
      setPlaying(!audio.paused)
    }
    const onPlay = () => {
      if (!persist || getSharedTourSrc() === audioSrc) {
        setPlaying(true)
      }
    }
    const onPause = () => {
      if (!persist || getSharedTourSrc() === audioSrc) {
        setPlaying(false)
      }
    }
    const onEnded = () => {
      if (!persist || getSharedTourSrc() === audioSrc) {
        setPlaying(false)
        setProgress(0)
        setCurrentTime(0)
      }
    }

    audio.addEventListener('timeupdate', sync)
    audio.addEventListener('loadedmetadata', sync)
    audio.addEventListener('durationchange', sync)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)
    sync()

    return () => {
      audio.removeEventListener('timeupdate', sync)
      audio.removeEventListener('loadedmetadata', sync)
      audio.removeEventListener('durationchange', sync)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
    }
  }, [audioSrc, persist])

  useEffect(() => {
    const audio = getAudio()
    if (audio && ownsSharedTrack()) {
      audio.playbackRate = playbackRate
    }
  }, [playbackRate, audioSrc, persist])

  const toggle = async () => {
    const audio = getAudio()
    if (!audio) {
      return
    }

    if (persist) {
      const sameTrack = getSharedTourSrc() === audioSrc
      if (!sameTrack || audio.paused) {
        ensureSharedTourSrc(audioSrc, true)
        audio.playbackRate = playbackRate
        await audio.play()
        setPlaying(true)
        return
      }
      audio.pause()
      setPlaying(false)
      return
    }

    if (audio.paused) {
      await audio.play()
      setPlaying(true)
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  const cycleRate = () => {
    setRateIndex((i) => {
      const next = (i + 1) % PLAYBACK_RATES.length
      savePlaybackRateIndex(next)
      const audio = getAudio()
      if (audio && (!persist || getSharedTourSrc() === audioSrc)) {
        audio.playbackRate = PLAYBACK_RATES[next]
      }
      return next
    })
  }

  const seek = (clientX: number, target: HTMLElement) => {
    const audio = getAudio()
    if (!audio || !audio.duration) {
      return
    }
    if (persist && getSharedTourSrc() !== audioSrc) {
      return
    }
    const rect = target.getBoundingClientRect()
    const usable = Math.max(1, rect.width - TRACK_INSET_PX * 2)
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left - TRACK_INSET_PX) / usable))
    audio.currentTime = ratio * audio.duration
    setProgress(ratio)
    setCurrentTime(audio.currentTime)
  }

  const onSeekClick = (event: MouseEvent<HTMLButtonElement>) => {
    seek(event.clientX, event.currentTarget)
  }

  const onSeekTouch = (event: TouchEvent<HTMLButtonElement>) => {
    seek(event.touches[0].clientX, event.currentTarget)
  }

  const travel = TRACK_INSET_PX * 2
  const rateLabel = Number.isInteger(playbackRate) ? `${playbackRate}×` : `${playbackRate.toFixed(1)}×`

  return (
    <div className={styles.player}>
      {!persist && (
        <audio ref={localAudioRef} src={audioSrc} preload={preload} playsInline />
      )}
      <button type="button" className={styles.playBtn} onClick={toggle} aria-label={playing ? 'Пауза' : 'Слушать'}>
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button
        type="button"
        className={styles.track}
        onClick={onSeekClick}
        onTouchStart={onSeekTouch}
        aria-label="Перемотка"
      >
        <span className={styles.rail} aria-hidden="true" />
        <span
          className={styles.thumb}
          style={{ left: `calc(${TRACK_INSET_PX}px + ${progress} * (100% - ${travel}px))` }}
        />
      </button>
      <div className={styles.meta}>
        <span className={styles.time}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
        <button type="button" className={styles.rateBtn} onClick={cycleRate} aria-label={`Скорость ${rateLabel}`}>
          {rateLabel}
        </button>
      </div>
    </div>
  )
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 1.5v11l9-5.5L3 1.5z" fill="currentColor" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 2h3v10H3V2zm5 0h3v10H8V2z" fill="currentColor" />
    </svg>
  )
}
