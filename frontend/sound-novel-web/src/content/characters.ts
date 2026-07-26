import { assetUrl } from '../lib/assetUrl'

export interface CharacterEntry {
  id: string
  name: string
  thumbUrl: string
  cardUrl: string
}

/** Порядок как на макете сетки */
export const characters: CharacterEntry[] = [
  {
    id: 'eva',
    name: 'Ева',
    thumbUrl: assetUrl('assets/dossier/eva-thumb.png'),
    cardUrl: assetUrl('assets/dossier/eva-card.png'),
  },
  {
    id: 'gleb',
    name: 'Глеб Егорович',
    thumbUrl: assetUrl('assets/dossier/gleb-thumb.png'),
    cardUrl: assetUrl('assets/dossier/gleb-card.png'),
  },
  {
    id: 'alyona',
    name: 'Алёна Ивановна',
    thumbUrl: assetUrl('assets/dossier/alyona-thumb.png'),
    cardUrl: assetUrl('assets/dossier/alyona-card.png'),
  },
  {
    id: 'invisible',
    name: 'Человек-невидимка',
    thumbUrl: assetUrl('assets/dossier/invisible-thumb.png'),
    cardUrl: assetUrl('assets/dossier/invisible-card.png'),
  },
  {
    id: 'zhenya',
    name: 'Женя',
    thumbUrl: assetUrl('assets/dossier/zhenya-thumb.png'),
    cardUrl: assetUrl('assets/dossier/zhenya-card.png'),
  },
  {
    id: 'cat',
    name: 'Кошка',
    thumbUrl: assetUrl('assets/dossier/cat-thumb.png'),
    cardUrl: assetUrl('assets/dossier/cat-card.png'),
  },
]
