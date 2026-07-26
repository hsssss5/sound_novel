import { useEffect, useRef, useState, type MouseEvent, type TouchEvent } from 'react'
import { assetUrl } from '../../lib/assetUrl'
import styles from './AudioPlayer.module.css'

/** Временная заглушка вместо реальных дорожек */
const TEMP_AUDIO_URL = assetUrl('audio/temp-placeholder.mp3')

interface AudioPlayerProps {
  src?: string
}

export function AudioPlayer({ src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const audioSrc = src || TEMP_AUDIO_URL

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) {
      return
    }

    const onTime = () => {
      if (!audio.duration) {
        return
      }
      setProgress(audio.currentTime / audio.duration)
    }
    const onEnded = () => {
      setPlaying(false)
      setProgress(0)
    }

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnded)
    }
  }, [audioSrc])

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

  const seek = (clientX: number, target: HTMLElement) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) {
      return
    }
    const rect = target.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    audio.currentTime = ratio * audio.duration
    setProgress(ratio)
  }

  const onSeekClick = (event: MouseEvent<HTMLButtonElement>) => {
    seek(event.clientX, event.currentTarget)
  }

  const onSeekTouch = (event: TouchEvent<HTMLButtonElement>) => {
    seek(event.touches[0].clientX, event.currentTarget)
  }

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
          style={{ left: `calc(10px + ${progress} * (100% - 20px))` }}
        />
      </button>
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
