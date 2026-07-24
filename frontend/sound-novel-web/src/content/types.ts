export type StepType = 'start' | 'welcome' | 'instructions' | 'checkpoint' | 'transit' | 'finale'

export interface PlaceMaterial {
  id: string
  title: string
  imageUrl?: string
  dates?: string
  text?: string
  caption?: string
  captionSource?: string
  extraImages?: Array<{
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
  mapImageUrl?: string
  locationImageUrl?: string
  travelTime?: string
  overlayOpacity?: number
  secondaryAction?: SecondaryAction
  location?: GeoPoint
}

export interface CharacterDossier {
  id: string
  name: string
  age: string
  zodiac: string
  photoUrl: string
  occupation: string
  about: string
  funFact: string
}

export interface TeamMember {
  id: string
  photoUrl: string
  position: string
  role: string
}
