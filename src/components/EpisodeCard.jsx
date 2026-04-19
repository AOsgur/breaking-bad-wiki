// EpisodeCard.jsx — Episode card for grid/list display on Episodes page
// Clicking navigates to /episodes/:id
import { useNavigate } from 'react-router-dom'

/**
 * Format season and episode numbers into "S01E05" style.
 * Pads single digits with a leading zero.
 */
function formatEpisodeCode(season, episode) {
  const s = String(season).padStart(2, '0')
  const e = String(episode).padStart(2, '0')
  return `S${s}E${e}`
}

function EpisodeCard({ episode }) {
  const navigate = useNavigate()
  const code = formatEpisodeCode(episode.season, episode.episode)
  const charCount = Array.isArray(episode.characters) ? episode.characters.length : 0

  return (
    <div
      onClick={() => navigate(`/episodes/${episode.id}`)}
      className="card-glow-green rounded-xl border cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-[#00C853]/30 p-5 group"
      style={{ backgroundColor: '#1a1a1a', borderColor: '#2a2a2a' }}
    >
      {/* Episode code badge */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <span
          className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg"
          style={{ backgroundColor: '#00C853', color: '#0a0a0a' }}
        >
          {code}
        </span>
        <span
          className="text-xs px-2 py-1 rounded"
          style={{ backgroundColor: '#1B5E20', color: '#00C853' }}
        >
          Season {episode.season}
        </span>
      </div>

      {/* Episode title */}
      <h3
        className="font-bold text-base leading-snug mb-2 group-hover:text-[#00C853] transition-colors line-clamp-2"
        style={{ color: '#E0E0E0' }}
      >
        {episode.title}
      </h3>

      {/* Air date */}
      {episode.air_date && (
        <p className="text-xs mb-3" style={{ color: '#9E9E9E' }}>
          📅 {episode.air_date}
        </p>
      )}

      {/* Footer row */}
      <div className="flex items-center justify-between">
        <span className="text-xs" style={{ color: '#666666' }}>
          👥 {charCount} character{charCount !== 1 ? 's' : ''}
        </span>
        {episode.series && (
          <span className="text-xs" style={{ color: '#666666' }}>
            {episode.series}
          </span>
        )}
      </div>
    </div>
  )
}

export default EpisodeCard
