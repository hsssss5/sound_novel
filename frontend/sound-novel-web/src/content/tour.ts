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

  { lat: 59.9325, lng: 30.328, title: 'Николо-Богоявленский морской собор' },

  { lat: 59.9295, lng: 30.322, title: 'Львиный мост' },

  { lat: 59.928, lng: 30.319, title: 'Средняя Подьяческая' },

  { lat: 59.927, lng: 30.317, title: 'Переулок Бринько' },

  { lat: 59.938, lng: 30.3146, title: 'Гауптвахта' },

]



const instructionsBody = [

  'Вам будет представлен спектакль в аудиоформате, разыгранный по ролям. У главной героини — девушки Евы — пропадает дедушка. Пытаясь его отыскать, она отправляется в путешествие по Адмиралтейскому району и по дороге сталкивается с призраками, ожившими памятниками и загадками и выясняет о дедушке то, чего совсем не ожидала узнать о родном человеке...',

  'Вы, дорогой слушатель, можете пройти этот путь вместе с Евой от начала и до конца. Полную карту маршрута вы можете открыть через иконку вверху экрана. На каждой точке вас будет ждать фрагмент спектакля, который вы можете прослушать. А чтобы узнать о том, когда и по какой причине родилась та или иная легенда или интересные факты о повстречавшихся личностях и домах, вы можете нажать на кнопку «Послушать историю».',

  'Для полного погружения в историю Евы и города мы рекомендуем вам пройти маршрут и параллельно прослушать аудиоспектакль целиком. Приятной прогулки!',

].join('\n\n')



export const tourSteps: TourStep[] = [

  {

    id: 'start',

    type: 'start',

    title: 'Дело о пропавшем Хранителе: легенды Адмиралтейского района',

    subtitle: 'путешествие и экскурсия по загадкам Адмиралтейского района',

    overlayOpacity: 0.35,

  },

  {

    id: 'welcome',

    type: 'welcome',

    overlayOpacity: 0.25,

    body: 'Здравствуйте, дорогой слушатель! Перед вами — проект, объединивший в себе два формата: аудиоспектакль и экскурсию по петербургским локациям, с которыми связаны забавные, неожиданные, а местами по-настоящему страшные городские легенды. Чтобы узнать больше, нажмите «Далее».',

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

    body: 'Начальная точка — библиотека «Измайловская» (Измайловский, 18). Прослушайте первый аудиофрагмент, не выходя из библиотеки. После завершения прослушивания нажмите «Далее», чтобы перейти к следующему отрезку маршрута.',

    location: routePoints[0],

  },

  {

    id: 'transit-1-2',

    type: 'transit',

    mapImageUrl: assets.mapSegments['1-2'],

    travelTime: '19 минут',

    body: 'Вторая точка — памятник Д. И. Менделееву (Московский пр-т, 19). Прослушайте аудиофрагмент по пути из библиотеки «Измайловская» до памятника. После завершения прослушивания нажмите «Далее» или «Послушать историю».',

    secondaryAction: {

      label: listenHistoryAction.label,

      materialIds: ['pomeshchik', 'labzin'],

    },

  },

  {

    id: 'cp-2',

    type: 'checkpoint',

    locationImageUrl: assets.locations.mendeleev,

    body: 'Вы дошли до второй точки маршрута — памятника Д. И. Менделееву. Прослушайте аудиофрагмент, чтобы узнать, что нового Ева смогла выяснить об исчезновении дедушки. Чтобы перейти к следующему отрезку маршрута, нажмите «Далее».',

    location: routePoints[1],

  },

  {

    id: 'transit-2-3',

    type: 'transit',

    mapImageUrl: assets.mapSegments['2-3'],

    travelTime: '9 минут',

    body: 'Третья точка — памятник Петербургскому ангелу в Измайловском саду (наб. р. Фонтанки, 114). По пути вы можете прослушать историю о том, как Д. И. Менделеев был связан с мистикой. После завершения прослушивания нажмите «Далее», чтобы перейти к следующему аудиофрагменту.',

    secondaryAction: {

      label: listenHistoryAction.label,

      materialIds: ['mendeleev'],

    },

  },

  {

    id: 'cp-3',

    type: 'checkpoint',

    locationImageUrl: assets.locations.angel,

    body: 'Вы дошли до третьей точки маршрута — памятника Петербургскому ангелу. Прослушайте аудиофрагмент, чтобы узнать, что нового Ева смогла выяснить об исчезновении дедушки. Чтобы перейти к следующему отрезку маршрута, нажмите «Далее».',

    location: routePoints[2],

  },

  {

    id: 'transit-3-4',

    type: 'transit',

    mapImageUrl: assets.mapSegments['3-4'],

    travelTime: '9 минут',

    body: 'Четвертая точка — памятник Человеку-невидимке (наб. р. Фонтанки, 132). По пути вы можете прослушать историю о доме Гарновского. После завершения прослушивания нажмите «Далее», чтобы перейти к следующему аудиофрагменту.',

    secondaryAction: {

      label: listenHistoryAction.label,

      materialIds: ['garnovsky'],

    },

  },

  {

    id: 'cp-4',

    type: 'checkpoint',

    locationImageUrl: assets.locations.invisibleMan,

    body: 'Вы дошли до четвертой точки маршрута — памятника Человеку-невидимке. Прослушайте аудиофрагмент, чтобы узнать, что нового Ева смогла выяснить об исчезновении дедушки. Чтобы перейти к следующему отрезку маршрута, нажмите «Далее».',

    location: routePoints[3],

  },

  {

    id: 'cp-5',

    type: 'checkpoint',

    secondaryAction: {

      label: listenHistoryAction.label,

      materialIds: ['invisible_man', 'petersburg_empty', 'serpent'],

    },

    location: routePoints[3],

  },

  {

    id: 'cp-6',

    type: 'checkpoint',

    secondaryAction: {

      label: listenHistoryAction.label,

      materialIds: ['egyptian_bridge'],

    },

    location: routePoints[4],

  },

  {

    id: 'cp-7',

    type: 'checkpoint',

    secondaryAction: {

      label: listenHistoryAction.label,

      materialIds: ['semimostye'],

    },

    location: routePoints[5],

  },

  {

    id: 'cp-8',

    type: 'checkpoint',

    secondaryAction: {

      label: listenHistoryAction.label,

      materialIds: ['naval_cathedral', 'old_woman_pigeons'],

    },

    location: routePoints[6],

  },

  {

    id: 'transit-fog',

    type: 'transit',

    secondaryAction: {

      label: listenHistoryAction.label,

      materialIds: ['fog'],

    },

  },

  {

    id: 'cp-9',

    type: 'checkpoint',

    secondaryAction: {

      label: listenHistoryAction.label,

      materialIds: ['litovsky_castle', 'griboedov_embankment'],

    },

    location: routePoints[7],

  },

  {

    id: 'cp-10',

    type: 'checkpoint',

    secondaryAction: {

      label: listenHistoryAction.label,

      materialIds: ['srednyaya_podyacheskaya', 'griboedov_embankment'],

    },

    location: routePoints[8],

  },

  {

    id: 'cp-11',

    type: 'checkpoint',

    secondaryAction: {

      label: listenHistoryAction.label,

      materialIds: ['brinko'],

    },

    location: routePoints[9],

  },

  {

    id: 'cp-12',

    type: 'checkpoint',

    location: routePoints[10],

  },

]



export function getStepIndex(stepId: string): number {

  return tourSteps.findIndex((s) => s.id === stepId)

}


