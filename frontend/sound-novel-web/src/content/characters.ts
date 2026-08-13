import { assetUrl } from '../lib/assetUrl'

export interface CharacterEntry {
  id: string
  name: string
  thumbUrl: string
  cardUrl: string
}

/** Порядок и раскладка как на макете: 3 + 2 + 1 */
export const characterRows: string[][] = [
  ['eva', 'gleb', 'alyona'],
  ['invisible', 'zhenya'],
  ['cat'],
]

export const characters: CharacterEntry[] = [
  {
    id: 'eva',
    name: 'Ева',
    thumbUrl: assetUrl('assets/characters/eva.png'),
    cardUrl: assetUrl('assets/dossier/eva-card.png'),
  },
  {
    id: 'gleb',
    name: 'Глеб Егорович',
    thumbUrl: assetUrl('assets/characters/gleb.png'),
    cardUrl: assetUrl('assets/dossier/gleb-card.png'),
  },
  {
    id: 'alyona',
    name: 'Алёна Ивановна',
    thumbUrl: assetUrl('assets/characters/alyona.png'),
    cardUrl: assetUrl('assets/dossier/alyona-card.png'),
  },
  {
    id: 'invisible',
    name: 'Человек-невидимка',
    thumbUrl: assetUrl('assets/characters/invisible.png'),
    cardUrl: assetUrl('assets/dossier/invisible-card.png'),
  },
  {
    id: 'zhenya',
    name: 'Женя',
    thumbUrl: assetUrl('assets/characters/zhenya.png'),
    cardUrl: assetUrl('assets/dossier/zhenya-card.png'),
  },
  {
    id: 'cat',
    name: 'Кошка',
    thumbUrl: assetUrl('assets/characters/cat.png'),
    cardUrl: assetUrl('assets/dossier/cat-card.png'),
  },
]

export const charactersById = Object.fromEntries(characters.map((c) => [c.id, c])) as Record<
  string,
  CharacterEntry
>
