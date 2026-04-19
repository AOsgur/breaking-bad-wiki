// SeasonFilter.jsx — Season pill filter buttons
// Reused on Episodes page and Deaths page.
// Props:
//   seasons       — array of season values to render (e.g. [1,2,3,4,5] or [1,2,3,4,'5a','5b'])
//   activeSeason  — currently selected season (null = All)
//   onSeasonChange — callback(season: number|string|null)

function SeasonFilter({ seasons = [1, 2, 3, 4, 5], activeSeason, onSeasonChange }) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {/* "All" pill */}
      <button
        onClick={() => onSeasonChange(null)}
        className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
        style={
          activeSeason === null
            ? { backgroundColor: '#00C853', color: '#0a0a0a' }
            : { backgroundColor: '#1a1a1a', color: '#9E9E9E', border: '1px solid #2a2a2a' }
        }
      >
        All
      </button>

      {/* Dynamic season pills */}
      {seasons.map(s => (
        <button
          key={s}
          onClick={() => onSeasonChange(s)}
          className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
          style={
            activeSeason === s
              ? { backgroundColor: '#00C853', color: '#0a0a0a' }
              : { backgroundColor: '#1a1a1a', color: '#9E9E9E', border: '1px solid #2a2a2a' }
          }
        >
          S{s}
        </button>
      ))}
    </div>
  )
}

export default SeasonFilter
