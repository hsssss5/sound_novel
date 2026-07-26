import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { AboutPage } from './components/pages/AboutPage'
import { CharactersPage } from './components/pages/CharactersPage'
import { FeedbackPage } from './components/pages/FeedbackPage'
import { LegendsPage } from './components/pages/LegendsPage'
import { MapPage } from './components/pages/MapPage'
import { TourView } from './components/TourView'
import './App.css'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<TourView />} />
          <Route path="characters" element={<CharactersPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="legends" element={<LegendsPage />} />
          <Route path="map" element={<MapPage />} />
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
