import { useCallback, useState } from 'react'

import { placeMaterials } from '../content/placeMaterials'

import type { PlaceMaterial } from '../content/types'

import { AppShell } from './layout/AppShell'

import { DossierModal } from './modals/DossierModal'

import { FeedbackModal } from './modals/FeedbackModal'

import { MapModal } from './modals/MapModal'

import { PlaceModal } from './modals/PlaceModal'

import { TeamModal } from './modals/TeamModal'

import { ResumeDialog } from './ResumeDialog'

import { CheckpointStep, TransitStep } from './steps/RouteStepPage'

import { StartPage } from './steps/StartPage'

import { InstructionPage, WelcomePage } from './steps/TextStepPage'

import { useTourProgress } from '../hooks/useTourProgress'



export function TourView() {

  const { currentStep, goNext, hydrated, showResumeDialog, resume, restart } = useTourProgress()



  const [menuOpen, setMenuOpen] = useState(false)

  const [mapOpen, setMapOpen] = useState(false)

  const [dossierOpen, setDossierOpen] = useState(false)

  const [teamOpen, setTeamOpen] = useState(false)

  const [feedbackOpen, setFeedbackOpen] = useState(false)

  const [placeMaterialsOpen, setPlaceMaterialsOpen] = useState<PlaceMaterial[]>([])



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

        return <WelcomePage body={currentStep.body ?? ''} onNext={goNext} />

      case 'instructions':

        return <InstructionPage body={currentStep.body ?? ''} onNext={goNext} />

      case 'checkpoint':

        return (

          <CheckpointStep

            step={currentStep}

            onNext={goNext}

            onSecondary={currentStep.secondaryAction ? openSecondary : undefined}

          />

        )

      case 'transit':

        return (

          <TransitStep

            step={currentStep}

            onNext={goNext}

            onSecondary={currentStep.secondaryAction ? openSecondary : undefined}

          />

        )

      default:

        return null

    }

  }



  return (

    <>

      <AppShell
        overlayOpacity={currentStep.overlayOpacity ?? 0.35}
        menuOpen={menuOpen}

        onOpenMenu={() => setMenuOpen(true)}

        onCloseMenu={() => setMenuOpen(false)}

        onOpenMap={() => setMapOpen(true)}

        onOpenDossier={() => setDossierOpen(true)}

        onOpenTeam={() => setTeamOpen(true)}

        onOpenFeedback={() => setFeedbackOpen(true)}

      >

        {renderStep()}

      </AppShell>



      <ResumeDialog open={showResumeDialog} onResume={resume} onRestart={restart} />

      <MapModal open={mapOpen} onClose={() => setMapOpen(false)} />

      <DossierModal open={dossierOpen} onClose={() => setDossierOpen(false)} />

      <TeamModal open={teamOpen} onClose={() => setTeamOpen(false)} />

      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />

      <PlaceModal

        open={placeMaterialsOpen.length > 0}

        materials={placeMaterialsOpen}

        onClose={() => setPlaceMaterialsOpen([])}

      />

    </>

  )

}


