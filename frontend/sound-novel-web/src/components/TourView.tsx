import { useCallback, useEffect, useState } from 'react'
import { placeMaterials } from '../content/placeMaterials'
import type { PlaceMaterial } from '../content/types'
import { useTourProgress } from '../hooks/useTourProgress'
import { useHeaderChrome } from './layout/HeaderChromeContext'
import { PlaceModal } from './modals/PlaceModal'
import { ResumeDialog } from './ResumeDialog'
import { CheckpointStep, TransitStep } from './steps/RouteStepPage'
import { StartPage } from './steps/StartPage'
import { InstructionPage, WelcomePage } from './steps/TextStepPage'

export function TourView() {
  const { currentStep, stepIndex, goNext, goBack, hydrated, showResumeDialog, resume, restart } =
    useTourProgress()
  const { setShowBrandLogo } = useHeaderChrome()
  const [placeMaterialsOpen, setPlaceMaterialsOpen] = useState<PlaceMaterial[]>([])

  useEffect(() => {
    if (!hydrated) {
      return
    }
    setShowBrandLogo(currentStep.type === 'start')
    return () => setShowBrandLogo(false)
  }, [hydrated, currentStep.type, setShowBrandLogo])

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
      default:
        return null
    }
  }

  return (
    <>
      {renderStep()}
      <ResumeDialog open={showResumeDialog} onResume={resume} onRestart={restart} />
      <PlaceModal
        open={placeMaterialsOpen.length > 0}
        materials={placeMaterialsOpen}
        onClose={() => setPlaceMaterialsOpen([])}
      />
    </>
  )
}
