// EpisodesPage.jsx — Episode listing with season filter + staggered animations
import { useState, useEffect, useCallback } from 'react'
import { getEpisodes } from '../services/api'
import EpisodeCard from '../components/EpisodeCard'
import SeasonFilter from '../components/ui/SeasonFilter'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import ErrorMessage from '../components/ui/ErrorMessage'

function EpisodesPage() {
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeSeason, setActiveSeason] = useState(null)

  const fetchEpisodes = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = activeSeason ? { season: activeSeason } : {}
      const { data } = await getEpisodes(params)
      setEpisodes(data)
    } catch (err) {
      setError(err.message || 'Failed to load episodes. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [activeSeason])

  useEffect(() => { fetchEpisodes() }, [fetchEpisodes])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Subtle green-tinted page header gradient */}
      <div
        className="absolute top-16 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(0,200,83,0.03), transparent)', zIndex: 0 }}
      />

      <div className="relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black tracking-wide uppercase mb-2" style={{ color: '#E0E0E0' }}>
            Episodes
          </h1>
          <p className="text-sm" style={{ color: '#9E9E9E' }}>
            {!loading && episodes.length > 0
              ? `${episodes.length} episode${episodes.length !== 1 ? 's' : ''}${activeSeason ? ` — Season ${activeSeason}` : ''}`
              : 'All 5 seasons'}
          </p>
        </div>

        <div className="mb-8">
          <SeasonFilter activeSeason={activeSeason} onSeasonChange={setActiveSeason} />
        </div>

        {loading && <LoadingSpinner message="Loading episodes..." />}
        {!loading && error && <ErrorMessage message={error} onRetry={fetchEpisodes} />}

        {!loading && !error && (
          <>
            {episodes.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">📺</p>
                <p style={{ color: '#9E9E9E' }}>No episodes found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {episodes.map((ep, i) => {
                  const delayClass = `animate-delay-${Math.min((i % 12) + 1, 12)}`
                  return (
                    <div key={ep.id} className={`animate-slide-up ${delayClass}`}>
                      <EpisodeCard episode={ep} />
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default EpisodesPage
