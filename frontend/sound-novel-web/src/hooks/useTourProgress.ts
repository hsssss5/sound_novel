import { useCallback, useEffect, useState } from 'react'
import { getStepIndex, tourSteps } from '../content/tour'

const STORAGE_KEY = 'sound_novel_step_index'

/** Уже поднимали прогресс в этой SPA-сессии — не спрашивать «Продолжить?» при возврате с других страниц */
let tourProgressBootstrapped = false

function readSavedIndex(): number | null {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === null) {
    return null
  }
  const index = Number.parseInt(saved, 10)
  if (Number.isNaN(index) || index < 0 || index >= tourSteps.length) {
    return null
  }
  return index
}

export function useTourProgress() {
  const [stepIndex, setStepIndex] = useState(0)
  const [showResumeDialog, setShowResumeDialog] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const index = readSavedIndex()

    if (!tourProgressBootstrapped) {
      tourProgressBootstrapped = true
      if (index !== null && index > 0) {
        setStepIndex(index)
        setShowResumeDialog(true)
      }
    } else if (index !== null) {
      // Возврат к экскурсии внутри той же сессии — без модалки
      setStepIndex(index)
    }

    setHydrated(true)
  }, [])

  const persist = useCallback((index: number) => {
    localStorage.setItem(STORAGE_KEY, String(index))
  }, [])

  const goNext = useCallback(() => {
    setStepIndex((current) => {
      const next = Math.min(current + 1, tourSteps.length - 1)
      persist(next)
      return next
    })
  }, [persist])

  const goBack = useCallback(() => {
    setStepIndex((current) => {
      const prev = Math.max(current - 1, 0)
      persist(prev)
      return prev
    })
  }, [persist])

  const goToStep = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, tourSteps.length - 1))
      setStepIndex(clamped)
      persist(clamped)
    },
    [persist],
  )

  const restart = useCallback(() => {
    setStepIndex(0)
    persist(0)
    setShowResumeDialog(false)
  }, [persist])

  const resume = useCallback(() => {
    setShowResumeDialog(false)
  }, [])

  const currentStep = tourSteps[stepIndex]

  return {
    stepIndex,
    currentStep,
    hydrated,
    showResumeDialog,
    goNext,
    goBack,
    goToStep,
    restart,
    resume,
    totalSteps: tourSteps.length,
    getStepIndex,
  }
}
