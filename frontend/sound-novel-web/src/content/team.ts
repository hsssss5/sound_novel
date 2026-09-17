import { assetUrl } from '../lib/assetUrl'
import type { CreditPerson } from './types'

const credit = (file: string) => assetUrl(`assets/credits/${file}`)

export const castMembers: CreditPerson[] = [
  {
    id: 'eva',
    photoUrl: credit('valeria-chikanchi.jpg'),
    role: 'Ева',
    name: 'Валерия Чиканчи',
  },
  {
    id: 'author',
    photoUrl: credit('nikolay-schlippenbach.jpg'),
    role: 'Рассказчик',
    name: 'Николай фон Шлиппенбах',
  },
  {
    id: 'gleb-angel',
    photoUrl: credit('konstantin-fedorov.jpg'),
    role: 'Глеб Егорович, Петербургский ангел',
    name: 'Константин Фёдоров-Фрейвальд',
  },
  {
    id: 'invisible-alyona-anastasia',
    photoUrl: credit('darya-zaletdinova.jpg'),
    role: 'Человек-невидимка, Алёна Ивановна, Анастасия Платоновна',
    name: 'Дарья Залетдинова',
  },
  {
    id: 'mendeleev',
    photoUrl: credit('alexander-semyachko.jpg'),
    role: 'Д. И. Менделеев',
    name: 'Александр Семячко',
  },
  {
    id: 'sphinx',
    photoUrl: credit('maria-galkina.jpg'),
    role: 'Сфинкс(ы)',
    name: 'Мария Галкина',
  },
  {
    id: 'litovsky-angel',
    photoUrl: credit('yulia-shafir.jpg'),
    role: 'Ангел с Литовского замка',
    name: 'Юлия Шафир',
  },
  {
    id: 'raskolnikov',
    photoUrl: credit('alexey-ivashchenko.jpg'),
    role: 'Родион Раскольников',
    name: 'Алексей Иващенко',
  },
  {
    id: 'zhenya',
    photoUrl: credit('taisiya-vorobyova.jpg'),
    role: 'Девочка Женя',
    name: 'Таисия Воробьёва',
  },
  {
    id: 'cat',
    photoUrl: credit('anastasia-zaramenskaya-cat.jpg'),
    role: 'Кошка, которая гуляет сама по себе',
    name: 'Анастасия Зараменская',
  },
  {
    id: 'director',
    photoUrl: credit('maria-schlippenbach.jpg'),
    role: 'Режиссер, сценарист',
    name: 'Мария фон Шлиппенбах',
  },
  {
    id: 'sound',
    photoUrl: credit('andrey-lobanov.jpg'),
    role: 'Звукорежиссер',
    name: 'Андрей Лобанов',
  },
]

export const teamMembers: CreditPerson[] = [
  {
    id: 'lead',
    photoUrl: credit('alexandra-kruchenkova.jpg'),
    role: 'Руководитель проекта, автор текста',
    name: 'Александра Крученкова',
  },
  {
    id: 'coauthor-illustrator',
    photoUrl: credit('maria-trifonova.jpg'),
    role: 'Соавтор, иллюстратор',
    name: 'Мария Трифонова',
  },
  {
    id: 'coauthor-kutlaeva',
    photoUrl: credit('margarita-kutlaeva.jpg'),
    role: 'Соавтор',
    name: 'Маргарита Кутлаева',
  },
  {
    id: 'coauthor-zaramenskaya',
    photoUrl: credit('anastasia-zaramenskaya.jpg'),
    role: 'Соавтор',
    name: 'Анастасия Зараменская',
  },
  {
    id: 'local-historian-loginova',
    photoUrl: credit('anna-loginova.jpg'),
    role: 'Краевед',
    name: 'Анна Логинова',
  },
  {
    id: 'local-historian-urusova',
    role: 'Краевед',
    name: 'Галина Урусова',
  },
  {
    id: 'programmer',
    role: 'Программист',
    name: 'Максим Полудницин',
  },
]
