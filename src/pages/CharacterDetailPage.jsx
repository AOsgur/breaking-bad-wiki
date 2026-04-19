// CharacterDetailPage.jsx — Single character detail view
// Uses useParams to get :id from the URL, fetches from /characters/{id}
import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCharacterById } from '../services/api'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import ErrorMessage from '../components/ui/ErrorMessage'

function getDangerLevel(count) {
  if (count >= 50) return { label: 'Heisenberg Level', color: '#EF5350', bg: 'rgba(183,28,28,0.2)' }
  if (count >= 20) return { label: 'Dangerous', color: '#FFC107', bg: 'rgba(255,193,7,0.15)' }
  return { label: 'Associate', color: '#00C853', bg: 'rgba(0,200,83,0.12)' }
}

function getElementSymbol(name = '') {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) return parts[0][0].toUpperCase() + parts[1][0].toLowerCase()
  return name.slice(0, 2)
}

function CharacterDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [imgError, setImgError] = useState(false)

  const fetchCharacter = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getCharacterById(id)
      setCharacter(data)
    } catch (err) {
      setError(err.message || 'Failed to load character. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchCharacter()
  }, [fetchCharacter])

  if (loading) return <LoadingSpinner message="Loading character..." />
  if (error) return <ErrorMessage message={error} onRetry={fetchCharacter} />
  if (!character) return null

  const danger = getDangerLevel(character.episodes_count || 0)
  const symbol = getElementSymbol(character.name)
  const occupations = Array.isArray(character.occupation) ? character.occupation : [character.occupation].filter(Boolean)
  const appearances = Array.isArray(character.appearances) ? character.appearances : []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-slide-up animate-delay-1">
      {/* Back button */}
      <button
        onClick={() => navigate('/characters')}
        className="flex items-center gap-2 mb-8 text-sm transition-colors hover:text-[#00C853]"
        style={{ color: '#9E9E9E' }}
      >
        ← Back to Characters
      </button>

      {/* Two-column layout on desktop, stacked on mobile */}
      <div className="flex flex-col lg:flex-row gap-10">

        {/* ── LEFT: Image ── */}
        <div className="lg:w-1/3 flex-shrink-0">
          <div
            className="rounded-xl overflow-hidden border"
            style={{
              borderColor: '#00C853',
              boxShadow: '0 0 40px rgba(0,200,83,0.15)',
              background: 'linear-gradient(135deg, #0a1a0a, #0a0a0a)',
            }}
          >
            {!imgError && character.image_url ? (
              <img
                src={character.image_url}
                alt={character.name}
                onError={() => setImgError(true)}
                className="w-full object-cover"
                style={{ maxHeight: '500px' }}
              />
            ) : (
              <div
                className="w-full h-80 flex flex-col items-center justify-center gap-3"
                style={{ background: 'linear-gradient(135deg, #0a1a0a, #0a0a0a)' }}
              >
                <span className="element-symbol" style={{ fontSize: '7rem', color: '#00C853', opacity: 0.5 }}>
                  {symbol}
                </span>
                <p className="text-sm" style={{ color: '#666666' }}>No image available</p>
              </div>
            )}
          </div>

          {/* Element symbol badge below image */}
          <div
            className="mt-4 p-4 rounded-xl border text-center"
            style={{ backgroundColor: '#1a1a1a', borderColor: '#2a2a2a' }}
          >
            <span
              className="element-symbol block"
              style={{ fontSize: '3.5rem', color: '#00C853', opacity: 0.8 }}
            >
              {symbol}
            </span>
            <p className="text-xs mt-1 tracking-widest uppercase" style={{ color: '#666666' }}>
              Element
            </p>
          </div>
        </div>

        {/* ── RIGHT: Details ── */}
        <div className="flex-1 space-y-6">
          {/* Name & danger level */}
          <div>
            <h1 className="text-3xl md:text-4xl font-black mb-1" style={{ color: '#E0E0E0' }}>
              {character.full_name || character.name}
            </h1>
            {character.portrayed && (
              <p style={{ color: '#9E9E9E' }}>
                Portrayed by{' '}
                <span style={{ color: '#E0E0E0', fontWeight: 600 }}>{character.portrayed}</span>
              </p>
            )}
            <div className="mt-3">
              <span
                className="text-sm font-semibold px-3 py-1.5 rounded-full"
                style={{ color: danger.color, backgroundColor: danger.bg }}
              >
                ⚡ {danger.label}
              </span>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: 'Birth Date', value: character.birth_date },
              { label: 'Episodes', value: character.episodes_count },
              { label: 'Series', value: character.series },
            ].filter(i => i.value).map(({ label, value }) => (
              <div
                key={label}
                className="p-4 rounded-xl border"
                style={{ backgroundColor: '#111111', borderColor: '#2a2a2a' }}
              >
                <p className="text-xs mb-1 uppercase tracking-wider" style={{ color: '#666666' }}>{label}</p>
                <p className="font-semibold text-sm" style={{ color: '#E0E0E0' }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Occupations */}
          {occupations.length > 0 && (
            <div>
              <h3 className="text-xs uppercase tracking-widest mb-3 font-semibold" style={{ color: '#666666' }}>
                Occupation
              </h3>
              <div className="flex flex-wrap gap-2">
                {occupations.map((occ, i) => (
                  <span
                    key={i}
                    className="text-sm px-3 py-1.5 rounded-full border"
                    style={{ backgroundColor: 'rgba(0,200,83,0.08)', borderColor: 'rgba(0,200,83,0.2)', color: '#00C853' }}
                  >
                    {occ}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Season appearances */}
          {appearances.length > 0 && (
            <div>
              <h3 className="text-xs uppercase tracking-widest mb-3 font-semibold" style={{ color: '#666666' }}>
                Season Appearances
              </h3>
              <div className="flex flex-wrap gap-2">
                {appearances.map(season => (
                  <span
                    key={season}
                    className="text-sm font-mono font-bold px-3 py-1.5 rounded-lg border"
                    style={{ backgroundColor: '#1a1a1a', borderColor: '#2a2a2a', color: '#E0E0E0' }}
                  >
                    Season {season}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CharacterDetailPage
