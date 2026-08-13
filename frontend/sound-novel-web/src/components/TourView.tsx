import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { placeMaterials } from '../content/placeMaterials'
import type { PlaceMaterial } from '../content/types'
import { useTourProgress } from '../hooks/useTourProgress'
import { useHeaderChrome } from './layout/HeaderChromeContext'
import styles from './TourView.module.css'
import { PlaceModal } from './modals/PlaceModal'
import { ResumeDialog } from './ResumeDialog'
import { CheckpointStep, FinaleStep, TransitStep } from './steps/RouteStepPage'
import { StartPage } from './steps/StartPage'
import { InstructionPage, SynopsisPage, WelcomePage } from './steps/TextStepPage'

export function TourView() {
  const navigate = useNavigate()
  const { currentStep, stepIndex, goNext, goBack, hydrated, showResumeDialog, resume, restart } =
    useTourProgress()
  const { setShowBrandLogo } = useHeaderChrome()
  const [placeMaterialsOpen, setPlaceMaterialsOpen] = useState<PlaceMaterial[]>([])

  useEffect(() => {
    if (!hydrated) {
      return
    }
    setShowBrandLogo(currentStep.type === 'start')

    const root = document.documentElement
    const opacity = currentStep.overlayOpacity ?? 0.35
    root.style.setProperty('--bg-tint-opacity', String(1 - opacity))

    if (currentStep.type === 'start') {
      root.style.setProperty('--bg-size', 'auto 100%')
      root.style.setProperty('--bg-position', 'center top')
      root.style.setProperty('--bg-edge-blend', '40px')
    } else {
      root.style.removeProperty('--bg-size')
      root.style.removeProperty('--bg-position')
      root.style.setProperty('--bg-edge-blend', '96px')
    }

    return () => {
      setShowBrandLogo(false)
      root.style.removeProperty('--bg-size')
      root.style.removeProperty('--bg-position')
      root.style.setProperty('--bg-edge-blend', '96px')
      root.style.setProperty('--bg-tint-opacity', '0.65')
    }
  }, [hydrated, currentStep.type, currentStep.overlayOpacity, setShowBrandLogo])

  const openSecondary = useCallback(() => {
    const action = currentStep.secondaryAction
    if (!action) {
      return
    }
    const materials = action.materialIds
      .map((id) => placeMaterials[id])
      .filter((m): m is PlaceMaterial => m !== undefined)
    setPlaceMaterialsOpen(materials)
  }, [currentStep.secondaryAction])

  if (!hydrated) {
    return null
  }

  const canGoBack = stepIndex > 0

  const renderStep = () => {
    switch (currentStep.type) {
      case 'start':
        return (
          <StartPage
            title={currentStep.title ?? ''}
            subtitle={currentStep.subtitle ?? ''}
            onNext={goNext}
          />
        )
      case 'welcome':
        return (
          <WelcomePage
            body={currentStep.body ?? ''}
            onNext={goNext}
            onBack={canGoBack ? goBack : undefined}
          />
        )
      case 'synopsis':
        return (
          <SynopsisPage
            body={currentStep.body ?? ''}
            onNext={goNext}
            onBack={canGoBack ? goBack : undefined}
          />
        )
      case 'instructions':
        return (
          <InstructionPage
            body={currentStep.body ?? ''}
            onNext={goNext}
            onBack={canGoBack ? goBack : undefined}
          />
        )
      case 'checkpoint':
        return (
          <CheckpointStep
            step={currentStep}
            onNext={goNext}
            onBack={canGoBack ? goBack : undefined}
            onSecondary={currentStep.secondaryAction ? openSecondary : undefined}
          />
        )
      case 'transit':
        return (
          <TransitStep
            step={currentStep}
            onNext={goNext}
            onBack={canGoBack ? goBack : undefined}
            onSecondary={currentStep.secondaryAction ? openSecondary : undefined}
          />
        )
      case 'finale':
        return (
          <FinaleStep
            step={currentStep}
            onNext={() => navigate('/complete')}
            onBack={canGoBack ? goBack : undefined}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className={styles.root}>
      {renderStep()}
      <ResumeDialog open={showResumeDialog} onResume={resume} onRestart={restart} />
      <PlaceModal
        open={placeMaterialsOpen.length > 0}
        materials={placeMaterialsOpen}
        onClose={() => setPlaceMaterialsOpen([])}
      />
    </div>
  )
}
