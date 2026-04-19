import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function getElementSymbol(name = '') {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) return parts[0][0].toUpperCase() + parts[1][0].toLowerCase()
  return name.slice(0, 2)
}

function getDangerLevel(count) {
  if (count >= 50) return { label: 'Heisenberg Level', color: '#EF5350', bg: 'rgba(183,28,28,0.2)' }
  if (count >= 20) return { label: 'Dangerous', color: '#FFC107', bg: 'rgba(255,193,7,0.15)' }
  return { label: 'Associate', color: '#00C853', bg: 'rgba(0,200,83,0.12)' }
}

function CharacterCard({ character, index = 0 }) {
  const navigate = useNavigate()
  const [imgError, setImgError] = useState(false)

  const symbol = getElementSymbol(character.name)
  const danger = getDangerLevel(character.episodes_count || 0)
  const appearances = Array.isArray(character.appearances) ? character.appearances : []
  const occupation = Array.isArray(character.occupation) ? character.occupation[0] : character.occupation

  const delayClass = `animate-delay-${Math.min((index % 12) + 1, 12)}`

  return (
    <div
      onClick={() => navigate(`/characters/${character.id}`)}
      className={`card-glow-amber rounded-xl border cursor-pointer transition-all duration-300 hover:scale-[1.02] overflow-hidden group animate-slide-up ${delayClass}`}
      style={{
        backgroundColor: '#1a1a1a',
        borderColor: '#2a2a2a',
      }}
    >
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-1.5 z-10" style={{ background: 'repeating-linear-gradient(45deg, #FFC107, #FFC107 10px, #000 10px, #000 20px)' }} />
        {!imgError && character.image_url ? (
          <img
            src={character.image_url}
            alt={character.name}
            onError={() => setImgError(true)}
            className="w-full h-52 object-cover object-top"
          />
        ) : (
          <div className="w-full h-52 flex items-center justify-center" style={{ backgroundColor: '#111111' }}>
            <span className="element-symbol" style={{ fontSize: '5rem', color: '#00C853', opacity: 0.6 }}>
              {symbol}
            </span>
          </div>
        )}

        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #1a1a1a, transparent)' }}
        />

        <span
          className="absolute top-2 left-2 text-xs font-mono px-2 py-0.5 rounded"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: '#666666' }}
        >
          #{character.id}
        </span>

        <span
          className="absolute top-2 right-2 element-symbol text-2xl font-black px-2 py-0.5 rounded"
          style={{
            backgroundColor: 'rgba(0,0,0,0.75)',
            color: '#00C853',
            textShadow: '0 0 10px rgba(0,200,83,0.5)',
          }}
        >
          {symbol}
        </span>
      </div>

      <div className="p-4 space-y-3">
        <h3
          className="font-bold text-base leading-tight group-hover:text-[#00C853] transition-colors"
          style={{ color: '#E0E0E0' }}
        >
          {character.name}
        </h3>

        {character.portrayed && (
          <p className="text-xs" style={{ color: '#9E9E9E' }}>
            Portrayed by: <span style={{ color: '#E0E0E0' }}>{character.portrayed}</span>
          </p>
        )}

        {occupation && (
          <p className="text-xs truncate" style={{ color: '#666666' }}>{occupation}</p>
        )}

        {appearances.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {appearances.map(season => (
              <span
                key={season}
                className="text-[10px] px-1.5 py-0.5 rounded font-mono"
                style={{ backgroundColor: '#2a2a2a', color: '#9E9E9E' }}
              >
                S{season}
              </span>
            ))}
          </div>
        )}

        <div>
          <span
            className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
            style={{ color: danger.color, backgroundColor: danger.bg }}
          >
            ⚡ {danger.label}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CharacterCard
