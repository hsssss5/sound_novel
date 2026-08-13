import { assets } from './assets'
import { listenHistoryAction } from './placeMaterials'
import type { GeoPoint, TourStep } from './types'

export const routePoints: GeoPoint[] = [
  { lat: 59.9156, lng: 30.2989, title: 'Библиотека «Измайловская»' },
  { lat: 59.9175, lng: 30.295, title: 'Памятник Д. И. Менделееву' },
  { lat: 59.9185, lng: 30.2935, title: 'Памятник Петербургскому ангелу' },
  { lat: 59.936, lng: 30.3015, title: 'Памятник Человеку-невидимке' },
  { lat: 59.9432, lng: 30.3287, title: 'Египетский мост' },
  { lat: 59.9315, lng: 30.315, title: 'Семимостье' },
  { lat: 59.9325, lng: 30.328, title: 'Никольский Морской собор' },
  { lat: 59.9295, lng: 30.322, title: 'Львиный мост' },
  { lat: 59.928, lng: 30.319, title: 'Средняя Подьяческая' },
  { lat: 59.927, lng: 30.317, title: 'Переулок Бринько' },
  { lat: 59.938, lng: 30.3146, title: 'Гауптвахта' },
]

const synopsisBody = [
  'Вам будет представлен спектакль в аудиоформате, разыгранный по ролям.',
  'У главной героини — девушки Евы — пропадает дедушка. Пытаясь его отыскать, она отправляется в путешествие по Адмиралтейскому району и по дороге сталкивается с призраками, ожившими памятниками и загадками и выясняет о дедушке то, чего совсем не ожидала узнать о родном человеке...',
  'Вы можете пройти этот увлекательный путь вместе с Евой и по-новому посмотреть на некоторые локации нашего города.',
].join('\n\n')

const instructionsBody = [
  'Чтобы открыть полную карту маршрута, нажмите на иконку в правом верхнем углу экрана.',
  'На каждой точке маршрута вас будет ждать фрагмент спектакля, который нужно прослушать.',
  'На схематичных картах, показывающих маршрут от точки до точки, есть условные обозначения:\n\n🐱 — места, у которых нужно делать остановки;\n\n☁️ — места, у которых не нужно останавливаться, но о которых вы можете послушать истории по пути.',
  'Для полного погружения в историю Евы и города мы рекомендуем вам пройти маршрут и параллельно прослушать аудиоспектакль целиком.',
  'Приятной прогулки!',
].join('\n\n')

const checkpointBody = (pointLabel: string, extra?: string) =>
  [
    `Вы дошли до ${pointLabel}.`,
    extra ??
      'Прослушайте аудиофрагмент, чтобы узнать, что нового Ева смогла выяснить об исчезновении дедушки. Чтобы перейти к следующему отрезку маршрута, нажмите «Далее».',
  ].join('\n\n')

export const tourSteps: TourStep[] = [
  {
    id: 'start',
    type: 'start',
    title: 'Переулки памяти: легенды Адмиралтейского района',
    subtitle: 'путешествие по загадкам Адмиралтейского района',
    overlayOpacity: 0.35,
  },
  {
    id: 'welcome',
    type: 'welcome',
    overlayOpacity: 0.25,
    body: [
      'Здравствуйте, дорогой слушатель! Перед вами — проект, объединивший в себе два формата: аудиоспектакль и историю по петербургским локациям, с которыми связаны забавные, неожиданные, а местами и по-настоящему страшные городские легенды.',
      'Чтобы узнать больше, нажмите «Далее».',
    ].join('\n\n'),
  },
  {
    id: 'synopsis',
    type: 'synopsis',
    overlayOpacity: 0.25,
    body: synopsisBody,
  },
  {
    id: 'instructions',
    type: 'instructions',
    overlayOpacity: 0.25,
    body: instructionsBody,
  },
  {
    id: 'cp-1',
    type: 'checkpoint',
    locationImageUrl: assets.locations.library,
    hasAudio: true,
    body: [
      'Начальная точка — библиотека «Измайловская» (Измайловский, 18).',
      'Прослушайте первый аудиофрагмент, не выходя из библиотеки. После завершения прослушивания нажмите «Далее», чтобы перейти к следующему отрезку маршрута.',
    ].join('\n\n'),
    location: routePoints[0],
  },
  {
    id: 'transit-1-2',
    type: 'transit',
    mapImageUrl: assets.mapSegments['1-2'],
    travelTime: '19 минут',
    hasAudio: true,
    body: [
      'Вторая точка — памятник Д. И. Менделееву (Московский пр-т, 19).',
      'Прослушайте аудиофрагмент, выйдя из библиотеки «Измайловская». После завершения прослушивания нажмите «Далее» или «Послушать историю по пути», чтобы узнать о домах, мимо которых вы будете проходить.',
    ].join('\n\n'),
    secondaryAction: {
      label: listenHistoryAction.label,
      materialIds: ['pomeshchik', 'labzin'],
    },
  },
  {
    id: 'cp-2',
    type: 'checkpoint',
    locationImageUrl: assets.locations.mendeleev,
    hasAudio: true,
    body: checkpointBody('второй точки маршрута — памятника Д. И. Менделееву'),
    location: routePoints[1],
  },
  {
    id: 'transit-2-3',
    type: 'transit',
    mapImageUrl: assets.mapSegments['2-3'],
    travelTime: '9 минут',
    hasAudio: false,
    body: [
      'Третья точка — памятник Петербургскому ангелу в Измайловском саду (наб. р. Фонтанки, 114).',
      'По пути вы можете прослушать историю о том, как Д. И. Менделеев был связан с мистикой. После завершения прослушивания нажмите «Далее», чтобы перейти к следующему аудиофрагменту.',
    ].join('\n\n'),
    secondaryAction: {
      label: listenHistoryAction.label,
      materialIds: ['mendeleev'],
    },
  },
  {
    id: 'cp-3',
    type: 'checkpoint',
    locationImageUrl: assets.locations.angel,
    hasAudio: true,
    body: checkpointBody('третьей точки маршрута — памятника Петербургскому ангелу'),
    location: routePoints[2],
  },
  {
    id: 'transit-3-4',
    type: 'transit',
    mapImageUrl: assets.mapSegments['3-4'],
    travelTime: '9 минут',
    hasAudio: true,
    body: [
      'Четвертая точка — памятник Человеку-невидимке (наб. р. Фонтанки, 132).',
      'Прослушайте аудиофрагмент, выйдя из Измайловского сада. После завершения прослушивания нажмите «Далее» или «Послушать историю по пути», чтобы узнать историю о доме Гарновского.',
    ].join('\n\n'),
    secondaryAction: {
      label: listenHistoryAction.label,
      materialIds: ['garnovsky'],
    },
  },
  {
    id: 'cp-4',
    type: 'checkpoint',
    locationImageUrl: assets.locations.invisibleMan,
    hasAudio: true,
    body: checkpointBody('четвертой точки маршрута — памятника Человеку-невидимке'),
    location: routePoints[3],
  },
  {
    id: 'transit-4-5',
    type: 'transit',
    mapImageUrl: assets.mapSegments['4-5'],
    travelTime: '4 минуты',
    hasAudio: false,
    body: [
      'Пятая точка — Египетский мост.',
      'По пути вы можете послушать историю о памятнике и о легендах, которые Человек-невидимка рассказывал Еве. Чтобы перейти к следующему аудиофрагменту, нажмите «Далее».',
    ].join('\n\n'),
    secondaryAction: {
      label: listenHistoryAction.label,
      materialIds: ['invisible_man', 'petersburg_empty', 'serpent'],
    },
  },
  {
    id: 'cp-5',
    type: 'checkpoint',
    locationImageUrl: assets.locations.egyptian,
    hasAudio: true,
    body: checkpointBody('пятой точки маршрута — Египетского моста'),
    location: routePoints[4],
  },
  {
    id: 'transit-5-6',
    type: 'transit',
    mapImageUrl: assets.mapSegments['5-6'],
    travelTime: '9 минут',
    hasAudio: true,
    body: [
      'Шестая точка — Семимостье.',
      'Прослушайте аудиофрагмент, перейдя Египетский мост. После завершения прослушивания нажмите «Далее» или «Послушать историю по пути», чтобы узнать легенду, связанную с Египетским мостом.',
    ].join('\n\n'),
    secondaryAction: {
      label: listenHistoryAction.label,
      materialIds: ['egyptian_bridge'],
    },
  },
  {
    id: 'cp-6',
    type: 'checkpoint',
    locationImageUrl: assets.locations.semimostye,
    hasAudio: true,
    body: checkpointBody('шестой точки маршрута — Семимостья'),
    location: routePoints[5],
  },
  {
    id: 'transit-6-7',
    type: 'transit',
    mapImageUrl: assets.mapSegments['6-7'],
    travelTime: '3 минуты',
    hasAudio: false,
    body: [
      'Седьмая точка — Никольский Морской собор.',
      'По пути вы можете послушать легенду о Семимостье. Чтобы перейти к следующему аудиофрагменту, нажмите «Далее».',
    ].join('\n\n'),
    secondaryAction: {
      label: listenHistoryAction.label,
      materialIds: ['semimostye'],
    },
  },
  {
    id: 'cp-7',
    type: 'checkpoint',
    locationImageUrl: assets.locations.navalCathedral,
    hasAudio: true,
    body: checkpointBody('седьмой точки маршрута — Никольского Морского собора'),
    location: routePoints[6],
  },
  {
    id: 'transit-7-8',
    type: 'transit',
    mapImageUrl: assets.mapSegments['7-8'],
    travelTime: '10 минут',
    hasAudio: true,
    body: [
      'Восьмая точка — Львиный мост.',
      'Прослушайте аудиофрагмент, выйдя из Никольского сада. После завершения прослушивания нажмите «Далее» или «Послушать историю по пути», чтобы узнать легенды, связанные с Никольским Морским собором и… старушками.',
    ].join('\n\n'),
    secondaryAction: {
      label: listenHistoryAction.label,
      materialIds: ['naval_cathedral', 'old_woman_pigeons'],
    },
  },
  {
    id: 'cp-8',
    type: 'checkpoint',
    locationImageUrl: assets.locations.lionBridge,
    hasAudio: true,
    body: checkpointBody(
      'восьмой точки маршрута — Львиного моста',
      'Прослушайте аудиофрагмент, чтобы узнать, куда привел Еву ее новый знакомый. Чтобы перейти к следующему отрезку маршрута, нажмите «Далее».',
    ),
    location: routePoints[7],
  },
  {
    id: 'transit-8-9',
    type: 'transit',
    mapImageUrl: assets.mapSegments['8-9'],
    travelTime: '3 минуты',
    hasAudio: false,
    body: [
      'Девятая точка — Средняя Подьяческая улица.',
      'По пути вы можете послушать историю и узнать, кем же был озлобленный ангел. Чтобы перейти к следующему аудиофрагменту, нажмите «Далее».',
    ].join('\n\n'),
    secondaryAction: {
      label: listenHistoryAction.label,
      materialIds: ['litovsky_castle', 'fog'],
    },
  },
  {
    id: 'cp-9',
    type: 'checkpoint',
    locationImageUrl: assets.locations.srednyaya,
    hasAudio: true,
    body: checkpointBody(
      'девятой точки маршрута — Средней Подьяческой улицы',
      'Прослушайте аудиофрагмент, чтобы узнать, кого еще Ева встретила на своем пути. Чтобы перейти к следующему отрезку маршрута, нажмите «Далее».',
    ),
    location: routePoints[8],
  },
  {
    id: 'transit-9-10',
    type: 'transit',
    mapImageUrl: assets.mapSegments['9-10'],
    travelTime: '16 минут',
    hasAudio: false,
    body: [
      'Десятая точка — переулок Бринько.',
      'По пути вы можете послушать легенду о временном провале, в который угодила Ева. Чтобы перейти к следующему аудиофрагменту, нажмите «Далее».',
    ].join('\n\n'),
    secondaryAction: {
      label: listenHistoryAction.label,
      materialIds: ['srednyaya_podyacheskaya', 'griboedov_embankment'],
    },
  },
  {
    id: 'cp-10',
    type: 'checkpoint',
    locationImageUrl: assets.locations.brinko,
    hasAudio: true,
    body: checkpointBody('десятой точки маршрута — переулка Бринько'),
    location: routePoints[9],
  },
  {
    id: 'transit-10-11',
    type: 'transit',
    mapImageUrl: assets.mapSegments['10-11'],
    travelTime: '5 минут',
    hasAudio: false,
    body: [
      'Одиннадцатая (и конечная) точка — Гауптвахта на Сенной площади.',
      'По пути вы можете послушать легенды, которые слагались о Сенной площади, и узнать историю этого мрачного петербургского места. Чтобы перейти к следующему аудиофрагменту, нажмите «Далее».',
    ].join('\n\n'),
    secondaryAction: {
      label: listenHistoryAction.label,
      materialIds: ['brinko'],
    },
  },
  {
    id: 'cp-11',
    type: 'checkpoint',
    locationImageUrl: assets.locations.hauptwachte,
    hasAudio: true,
    body: [
      'Вы дошли до конечной точки маршрута — Гауптвахты на Сенной.',
      'Прослушайте аудиофрагмент, чтобы узнать, чем же закончились поиски Евы. Нажмите далее, чтобы перейти к завершающему фрагменту.',
    ].join('\n\n'),
    location: routePoints[10],
  },
  {
    id: 'finale',
    type: 'finale',
    hasAudio: true,
    overlayOpacity: 0.25,
    body: 'Перед вами — последний аудиофрагмент и финал истории! Послушайте, чтобы узнать, чем закончились приключения Евы и ее дедушки.',
  },
]

export const completePageBody = [
  'Вы завершили прогулку «Переулки памяти» вместе с нашими героями. Поздравляем — вы великолепны! Большое спасибо за прохождение.',
  'Мы будем очень благодарны, если вы оставите отзыв.',
  'Желаем вам приятных и увлекательных путешествий!',
].join('\n\n')

export function getStepIndex(stepId: string): number {
  return tourSteps.findIndex((s) => s.id === stepId)
}
