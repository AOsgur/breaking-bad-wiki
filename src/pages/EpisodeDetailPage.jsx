// EpisodeDetailPage.jsx — Single episode detail view
// Uses useParams to get :id, fetches from /episodes/{id}
import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getEpisodeById } from '../services/api'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import ErrorMessage from '../components/ui/ErrorMessage'

function formatEpisodeCode(season, episode) {
  return `S${String(season).padStart(2, '0')}E${String(episode).padStart(2, '0')}`
}

function EpisodeDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [episode, setEpisode] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchEpisode = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getEpisodeById(id)
      setEpisode(data)
    } catch (err) {
      setError(err.message || 'Failed to load episode. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchEpisode()
  }, [fetchEpisode])

  if (loading) return <LoadingSpinner message="Loading episode..." />
  if (error) return <ErrorMessage message={error} onRetry={fetchEpisode} />
  if (!episode) return null

  const code = formatEpisodeCode(episode.season, episode.episode)
  const characters = Array.isArray(episode.characters) ? episode.characters : []

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-slide-up animate-delay-1">
      {/* Back button */}
      <button
        onClick={() => navigate('/episodes')}
        className="flex items-center gap-2 mb-8 text-sm transition-colors hover:text-[#00C853]"
        style={{ color: '#9E9E9E' }}
      >
        ← Back to Episodes
      </button>

      {/* Episode header card */}
      <div
        className="rounded-xl border p-8 mb-8"
        style={{ backgroundColor: '#1a1a1a', borderColor: '#2a2a2a' }}
      >
        {/* Code badge + series */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span
            className="text-sm font-mono font-bold px-3 py-1.5 rounded-lg"
            style={{
              backgroundColor: '#00C853',
              color: '#0a0a0a',
              boxShadow: '0 0 12px rgba(0,200,83,0.3)',
            }}
          >
            {code}
          </span>
          <span
            className="text-sm px-3 py-1.5 rounded-lg"
            style={{ backgroundColor: '#1B5E20', color: '#00C853' }}
          >
            Season {episode.season}
          </span>
          {episode.series && (
            <span className="text-xs" style={{ color: '#666666' }}>
              {episode.series}
            </span>
          )}
        </div>

        {/* Episode title */}
        <h1
          className="text-3xl md:text-4xl font-black mb-4 leading-tight"
          style={{ color: '#E0E0E0' }}
        >
          {episode.title}
        </h1>

        {/* Air date */}
        {episode.air_date && (
          <p className="text-sm" style={{ color: '#9E9E9E' }}>
            📅 Aired: <span style={{ color: '#E0E0E0' }}>{episode.air_date}</span>
          </p>
        )}
      </div>

      {/* Characters section */}
      {characters.length > 0 && (
        <div
          className="rounded-xl border p-8"
          style={{ backgroundColor: '#1a1a1a', borderColor: '#2a2a2a' }}
        >
          <h2
            className="text-xs uppercase tracking-widest font-bold mb-5"
            style={{ color: '#666666' }}
          >
            Characters in This Episode ({characters.length})
          </h2>

          {/* Clickable character name pills — navigate to characters page with name filter */}
          <div className="flex flex-wrap gap-2">
            {characters.map((charName, i) => (
              <Link
                key={i}
                to={`/characters?name=${encodeURIComponent(charName)}`}
                className="text-sm px-3 py-1.5 rounded-full border transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: '#111111',
                  borderColor: '#2a2a2a',
                  color: '#9E9E9E',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(0,200,83,0.5)'
                  e.currentTarget.style.color = '#00C853'
                  e.currentTarget.style.boxShadow = '0 0 8px rgba(0,200,83,0.2)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#2a2a2a'
                  e.currentTarget.style.color = '#9E9E9E'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {charName}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default EpisodeDetailPage
