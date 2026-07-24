import { assetUrl } from '../lib/assetUrl'

export const assets = {
  background: assetUrl('assets/фон.png'),
  frame: assetUrl('assets/рамка.png'),
  logo: assetUrl('assets/Знаки Чб выворотка_Ismailovskaya.png'),
  mapSegments: {
    '1-2': assetUrl('assets/1-2 отрезок.png'),
    '2-3': assetUrl('assets/2-3 отрезок.png'),
    '3-4': assetUrl('assets/3-4 отрезок (2).png'),
  },
  locations: {
    library: assetUrl('assets/библиотека.png'),
    mendeleev: assetUrl('assets/Менделеев.png'),
    angel: assetUrl('assets/ангел.png'),
    invisibleMan: assetUrl('assets/невидимка.png'),
  },
  photos: {
    library: assetUrl('assets/1. Библиотека Измайловская.jpg'),
    labzin: assetUrl('assets/2. Дом Лабзина.jpg'),
    mendeleev: assetUrl('assets/3. Памятник Менделееву.jpg'),
    invisibleMan1: assetUrl('assets/4. Памятник ЧН 1.jpg'),
    invisibleMan2: assetUrl('assets/5. Памятник ЧН 2.png'),
    egyptian1: assetUrl('assets/6. Египетский мост 1.jpg'),
    egyptian2: assetUrl('assets/7. Египетский мост 2.jpg'),
    semimostye: assetUrl('assets/8. Семимостье.jpg'),
    navalCathedral: assetUrl('assets/9. Никольский собор.jpg'),
    litovsky1: assetUrl('assets/10. Литовский замок 1.jpg'),
    litovsky2: assetUrl('assets/11. Литовский замок 2.jpg'),
    srednyaya: assetUrl('assets/12. Средняя Подьяческая.jpg'),
    senna1: assetUrl('assets/13. Сенная 2.jpg'),
    senna2: assetUrl('assets/14. Сенная 1.jpg'),
    garnovsky: assetUrl('assets/15. Дом Гарновского.jpg'),
  },
  cards: {
    library: assetUrl('assets/библиотека карточка.png'),
    labzin: assetUrl('assets/Лабзин карточка.png'),
    mendeleev: assetUrl('assets/Менделеев карточка.png'),
  },
} as const
