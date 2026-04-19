// DeathCard.jsx — Death entry card with red accent styling
// API fields: { id, death, cause, responsible, last_words, season, series }
function DeathCard({ death }) {
  return (
    <div
      className="card-glow-red rounded-xl border transition-all duration-300 hover:scale-[1.01] p-5 group h-full"
      style={{
        backgroundColor: '#1a1a1a',
        borderColor: '#2a2a2a',
        borderLeft: '3px solid #B71C1C',
      }}
    >
      {/* Header: skull + victim name + season badge */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xl flex-shrink-0">💀</span>
          <h3
            className="font-bold text-sm leading-tight group-hover:text-[#EF5350] transition-colors"
            style={{ color: '#E0E0E0' }}
          >
            {death.death}
          </h3>
        </div>
        {death.season && (
          <span
            className="text-xs font-mono flex-shrink-0 px-2 py-0.5 rounded"
            style={{ backgroundColor: 'rgba(183,28,28,0.25)', color: '#EF5350' }}
          >
            S{death.season}
          </span>
        )}
      </div>

      {death.cause && (
        <p className="text-xs mb-2 leading-relaxed" style={{ color: '#9E9E9E' }}>
          <span style={{ color: '#666666' }}>Cause: </span>{death.cause}
        </p>
      )}

      {death.responsible && (
        <p className="text-xs mb-3">
          <span style={{ color: '#666666' }}>Responsible: </span>
          <span style={{ color: '#FFC107' }}>{death.responsible}</span>
        </p>
      )}

      {death.last_words &&
        death.last_words.toLowerCase() !== 'unknown' &&
        death.last_words.toLowerCase() !== 'n/a' && (
          <blockquote
            className="text-xs italic border-l-2 pl-3 mt-3 leading-relaxed"
            style={{ borderColor: '#B71C1C', color: '#9E9E9E' }}
          >
            {death.last_words}
          </blockquote>
        )}
    </div>
  )
}

export default DeathCard
