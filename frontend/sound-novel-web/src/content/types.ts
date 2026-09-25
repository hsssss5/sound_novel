export type StepType =
  | 'start'
  | 'welcome'
  | 'synopsis'
  | 'instructions'
  | 'checkpoint'
  | 'transit'
  | 'finale'

export interface PlaceMaterial {
  id: string
  title: string
  imageUrl?: string
  dates?: string
  text?: string
  caption?: string
  captionSource?: string
  audioUrl?: string
  hideTitle?: boolean
  imageObjectPosition?: string
  extraImages?: Array<{
    id?: string
    imageUrl: string
    caption?: string
    captionSource?: string
  }>
}

export interface GeoPoint {
  lat: number
  lng: number
  title: string
}

export interface SecondaryAction {
  label: string
  materialIds: string[]
}

export interface TourStep {
  id: string
  type: StepType
  title?: string
  subtitle?: string
  body?: string
  audioUrl?: string
  /** Показывать встроенный плеер на шаге (по референсам — не на всех transit) */
  hasAudio?: boolean
  mapImageUrl?: string
  locationImageUrl?: string
  travelTime?: string
  overlayOpacity?: number
  secondaryAction?: SecondaryAction
  location?: GeoPoint
}

export interface CreditPerson {
  id: string
  photoUrl?: string
  role: string
  name: string
}

export type TeamMember = CreditPerson
