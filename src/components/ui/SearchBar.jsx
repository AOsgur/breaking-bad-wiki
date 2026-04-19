// SearchBar.jsx — Reusable search input with green focus glow and search icon
// Props:
//   placeholder — input placeholder text
//   value       — controlled input value
//   onChange    — change handler callback
function SearchBar({ placeholder = 'Search...', value, onChange }) {
  return (
    <div className="relative w-full">
      {/* Search icon */}
      <span
        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: '#666666' }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
      </span>

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200"
        style={{
          backgroundColor: '#1a1a1a',
          borderColor: '#2a2a2a',
          color: '#E0E0E0',
        }}
        onFocus={e => {
          e.currentTarget.style.borderColor = '#00C853'
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,200,83,0.15)'
        }}
        onBlur={e => {
          e.currentTarget.style.borderColor = '#2a2a2a'
          e.currentTarget.style.boxShadow = 'none'
        }}
      />
    </div>
  )
}

export default SearchBar
