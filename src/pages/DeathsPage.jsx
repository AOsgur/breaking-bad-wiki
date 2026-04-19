// DeathsPage.jsx — Deaths listing with animated counter, season filter, staggered cards
import { useState, useEffect, useCallback } from 'react'
import { getDeaths } from '../services/api'
import DeathCard from '../components/DeathCard'
import SeasonFilter from '../components/ui/SeasonFilter'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import ErrorMessage from '../components/ui/ErrorMessage'

const DEATH_SEASONS = [1, 2, 3, 4, '5a', '5b']

function AnimatedCounter({ target }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!target) { setCount(0); return }
    let startTime = null
    const duration = 2000
    let rafId
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [target])

  return (
    <span className="text-6xl md:text-8xl font-black tabular-nums" style={{ color: '#EF5350' }}>
      {count}
    </span>
  )
}

function DeathsPage() {
  const [deaths, setDeaths] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeSeason, setActiveSeason] = useState(null)
  const [displayCount, setDisplayCount] = useState(0)

  const fetchDeaths = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = activeSeason !== null ? { season: activeSeason } : {}
      const { data } = await getDeaths(params)
      setDeaths(data)
    } catch (err) {
      setError(err.message || 'Failed to load deaths. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [activeSeason])

  useEffect(() => { fetchDeaths() }, [fetchDeaths])

  useEffect(() => {
    if (!loading) setDisplayCount(deaths.length)
  }, [loading, deaths.length])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Dramatic header — smoke effect + red gradient + glow */}
      <div
        className="smoke-effect rounded-xl border p-10 mb-10 text-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a0505 0%, #0a0a0a 50%, #1a0505 100%)',
          borderColor: '#B71C1C',
        }}
      >
        <h1 className="relative z-10 text-3xl md:text-4xl font-black tracking-wide uppercase mb-4" style={{ color: '#EF5350' }}>
          ☠️ The Body Count
        </h1>
        <div className="relative z-10 mb-2">
          <AnimatedCounter key={displayCount} target={displayCount} />
        </div>
        <p className="relative z-10 text-sm tracking-widest uppercase" style={{ color: '#9E9E9E' }}>
          {activeSeason !== null ? `Deaths in Season ${activeSeason}` : 'Total On-Screen Deaths'}
        </p>
      </div>

      <div className="mb-8">
        <SeasonFilter seasons={DEATH_SEASONS} activeSeason={activeSeason} onSeasonChange={setActiveSeason} />
      </div>

      {loading && <LoadingSpinner message="Loading deaths..." />}
      {!loading && error && <ErrorMessage message={error} onRetry={fetchDeaths} />}

      {!loading && !error && (
        <>
          {deaths.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">💀</p>
              <p style={{ color: '#9E9E9E' }}>No deaths found for this filter</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {deaths.map((death, i) => {
                const delayClass = `animate-delay-${Math.min((i % 12) + 1, 12)}`
                return (
                  <div key={death.id} className={`animate-slide-up ${delayClass}`}>
                    <DeathCard death={death} />
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default DeathsPage
