import { useCallback, useEffect, useState } from 'react'
import { getStepIndex, tourSteps } from '../content/tour'

const STORAGE_KEY = 'sound_novel_step_index'

export function useTourProgress() {
  const [stepIndex, setStepIndex] = useState(0)
  const [showResumeDialog, setShowResumeDialog] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved !== null) {
      const index = Number.parseInt(saved, 10)
      if (!Number.isNaN(index) && index > 0 && index < tourSteps.length) {
        setStepIndex(index)
        setShowResumeDialog(true)
      }
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
    goToStep,
    restart,
    resume,
    totalSteps: tourSteps.length,
    getStepIndex,
  }
}
