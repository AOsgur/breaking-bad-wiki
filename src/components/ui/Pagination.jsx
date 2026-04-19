// Pagination.jsx — Previous/Next pagination with page indicator
// Props:
//   currentPage  — 1-based current page index
//   totalPages   — total number of pages
//   onPageChange — callback(newPage: number)
function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-4 mt-10">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-5 py-2 rounded-lg text-sm font-medium border transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.03]"
        style={{
          backgroundColor: '#1a1a1a',
          borderColor: '#2a2a2a',
          color: '#9E9E9E',
        }}
        onMouseEnter={e => {
          if (currentPage > 1) e.currentTarget.style.borderColor = '#00C853'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = '#2a2a2a'
        }}
      >
        ← Previous
      </button>

      {/* Page indicator */}
      <span className="text-sm" style={{ color: '#9E9E9E' }}>
        Page{' '}
        <span style={{ color: '#00C853', fontWeight: 600 }}>{currentPage}</span>
        {' '}of{' '}
        <span style={{ color: '#E0E0E0' }}>{totalPages}</span>
      </span>

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-5 py-2 rounded-lg text-sm font-medium border transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.03]"
        style={{
          backgroundColor: '#1a1a1a',
          borderColor: '#2a2a2a',
          color: '#9E9E9E',
        }}
        onMouseEnter={e => {
          if (currentPage < totalPages) e.currentTarget.style.borderColor = '#00C853'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = '#2a2a2a'
        }}
      >
        Next →
      </button>
    </div>
  )
}

export default Pagination
