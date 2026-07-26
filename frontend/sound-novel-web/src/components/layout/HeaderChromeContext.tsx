import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

interface HeaderChromeContextValue {
  showBrandLogo: boolean
  setShowBrandLogo: (value: boolean) => void
}

const HeaderChromeContext = createContext<HeaderChromeContextValue | null>(null)

export function HeaderChromeProvider({ children }: { children: ReactNode }) {
  const [showBrandLogo, setShowBrandLogo] = useState(false)
  const value = useMemo(
    () => ({ showBrandLogo, setShowBrandLogo }),
    [showBrandLogo],
  )
  return (
    <HeaderChromeContext.Provider value={value}>{children}</HeaderChromeContext.Provider>
  )
}

export function useHeaderChrome() {
  const ctx = useContext(HeaderChromeContext)
  if (!ctx) {
    throw new Error('useHeaderChrome must be used within HeaderChromeProvider')
  }
  return ctx
}
