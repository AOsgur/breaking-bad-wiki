import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Fly from './components/ui/Fly'
import SaulAd from './components/ui/SaulAd'

import HomePage from './pages/HomePage'
import CharactersPage from './pages/CharactersPage'
import CharacterDetailPage from './pages/CharacterDetailPage'
import EpisodesPage from './pages/EpisodesPage'
import EpisodeDetailPage from './pages/EpisodeDetailPage'
import DeathsPage from './pages/DeathsPage'
import QuotesPage from './pages/QuotesPage'
import NotFoundPage from './pages/NotFoundPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

function App() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'transparent', color: '#E0E0E0' }}>
      <ScrollToTop />
      <SaulAd />
      <Fly />
      <Navbar />

      {/* main content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/characters/:id" element={<CharacterDetailPage />} />
          <Route path="/episodes" element={<EpisodesPage />} />
          <Route path="/episodes/:id" element={<EpisodeDetailPage />} />
          <Route path="/deaths" element={<DeathsPage />} />
          <Route path="/quotes" element={<QuotesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
