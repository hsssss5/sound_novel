import { useEffect, useRef, useState, type MouseEvent, type TouchEvent } from 'react'
import { assetUrl } from '../../lib/assetUrl'
import styles from './AudioPlayer.module.css'

const TEMP_AUDIO_URL = assetUrl('audio/temp-placeholder.mp3')
const TRACK_INSET_PX = 14
const PLAYBACK_RATES = [1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2] as const

interface AudioPlayerProps {
  src?: string
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

export function AudioPlayer({ src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [rateIndex, setRateIndex] = useState(0)

  const audioSrc = src || TEMP_AUDIO_URL
  const playbackRate = PLAYBACK_RATES[rateIndex]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) {
      return
    }

    const sync = () => {
      if (!audio.duration) {
        return
      }
      setDuration(audio.duration)
      setCurrentTime(audio.currentTime)
      setProgress(audio.currentTime / audio.duration)
    }
    const onEnded = () => {
      setPlaying(false)
      setProgress(0)
      setCurrentTime(0)
    }

    audio.addEventListener('timeupdate', sync)
    audio.addEventListener('loadedmetadata', sync)
    audio.addEventListener('durationchange', sync)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('timeupdate', sync)
      audio.removeEventListener('loadedmetadata', sync)
      audio.removeEventListener('durationchange', sync)
      audio.removeEventListener('ended', onEnded)
    }
  }, [audioSrc])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.playbackRate = playbackRate
    }
  }, [playbackRate, audioSrc])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) {
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
    setRateIndex((i) => (i + 1) % PLAYBACK_RATES.length)
  }

  const seek = (clientX: number, target: HTMLElement) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) {
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
      <audio ref={audioRef} src={audioSrc} preload="metadata" playsInline />
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
