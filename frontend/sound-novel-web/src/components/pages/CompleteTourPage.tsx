import { useEffect } from 'react'
import { completePageBody } from '../../content/tour'
import { useHeaderChrome } from '../layout/HeaderChromeContext'
import { CompletePage } from '../steps/TextStepPage'

export function CompleteTourPage() {
  const { setShowBrandLogo } = useHeaderChrome()

  useEffect(() => {
    setShowBrandLogo(true)
    return () => setShowBrandLogo(false)
  }, [setShowBrandLogo])

  return <CompletePage body={completePageBody} />
}
