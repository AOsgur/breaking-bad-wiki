// QuotesPage.jsx — Quotes listing with client-side author filter and random quote highlighter
// NOTE: The API author filter is case-sensitive and requires exact full names,
// so we fetch all quotes once and filter client-side for a better UX.
import { useState, useEffect, useCallback, useMemo } from 'react'
import { getQuotes } from '../services/api'
import QuoteCard from '../components/QuoteCard'
import SearchBar from '../components/ui/SearchBar'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import ErrorMessage from '../components/ui/ErrorMessage'

function QuotesPage() {
  const [allQuotes, setAllQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [authorQuery, setAuthorQuery] = useState('')
  const [debouncedAuthor, setDebouncedAuthor] = useState('')
  const [highlightedId, setHighlightedId] = useState(null)

  // Debounce author filter — 400 ms delay
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedAuthor(authorQuery), 400)
    return () => clearTimeout(timer)
  }, [authorQuery])

  // Fetch ALL quotes once on mount
  const fetchQuotes = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await getQuotes()
      // Filter out any corrupt data entries from the API
      setAllQuotes(data.filter(q => q.quote && q.author && q.author.length < 60))
    } catch (err) {
      setError(err.message || 'Failed to load quotes. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchQuotes()
  }, [fetchQuotes])

  // Client-side filter — case-insensitive, partial match on author name
  const filtered = useMemo(() => {
    if (!debouncedAuthor.trim()) return allQuotes
    const q = debouncedAuthor.toLowerCase()
    return allQuotes.filter(quote => quote.author?.toLowerCase().includes(q))
  }, [allQuotes, debouncedAuthor])

  // Pick a random quote from the filtered list, highlight it, and scroll to it
  function handleRandomQuote() {
    if (filtered.length === 0) return
    const randomQuote = filtered[Math.floor(Math.random() * filtered.length)]
    setHighlightedId(randomQuote.id)
    setTimeout(() => {
      const el = document.getElementById(`quote-${randomQuote.id}`)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 50)
    // Clear highlight after 4 seconds
    setTimeout(() => setHighlightedId(null), 4000)
  }

  // Unique author list for hint text
  const uniqueAuthors = useMemo(() => {
    return [...new Set(allQuotes.map(q => q.author))].sort()
  }, [allQuotes])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black tracking-wide uppercase mb-2" style={{ color: '#E0E0E0' }}>
          Quotes
        </h1>
        <p className="text-sm" style={{ color: '#9E9E9E' }}>
          {!loading && `${filtered.length} quote${filtered.length !== 1 ? 's' : ''}${debouncedAuthor ? ` by "${debouncedAuthor}"` : ''}`}
        </p>
      </div>

      {/* Controls row: search + random button */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1 max-w-lg">
          <SearchBar
            placeholder="Search by author name..."
            value={authorQuery}
            onChange={e => setAuthorQuery(e.target.value)}
          />
        </div>
        <button
          onClick={handleRandomQuote}
          disabled={filtered.length === 0}
          className="px-6 py-3 rounded-xl font-semibold text-sm border transition-all duration-200 hover:scale-[1.03] disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            backgroundColor: 'rgba(255,193,7,0.1)',
            borderColor: 'rgba(255,193,7,0.3)',
            color: '#FFC107',
          }}
        >
          🎲 Random Quote
        </button>
      </div>

      {/* Author suggestion pills */}
      {!loading && uniqueAuthors.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {uniqueAuthors.map(author => (
            <button
              key={author}
              onClick={() => setAuthorQuery(author)}
              className="text-xs px-3 py-1 rounded-full border transition-all duration-200 hover:border-[#00C853]/50 hover:text-[#00C853]"
              style={{
                backgroundColor: debouncedAuthor.toLowerCase() === author.toLowerCase() ? 'rgba(0,200,83,0.12)' : '#111111',
                borderColor: debouncedAuthor.toLowerCase() === author.toLowerCase() ? 'rgba(0,200,83,0.4)' : '#2a2a2a',
                color: debouncedAuthor.toLowerCase() === author.toLowerCase() ? '#00C853' : '#9E9E9E',
              }}
            >
              {author}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      {loading && <LoadingSpinner message="Loading quotes..." />}

      {!loading && error && (
        <ErrorMessage message={error} onRetry={fetchQuotes} />
      )}

      {!loading && !error && (
        <>
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">💬</p>
              <p style={{ color: '#9E9E9E' }}>
                No quotes found {debouncedAuthor ? `for "${debouncedAuthor}"` : ''}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((q, i) => {
                const delayClass = `animate-delay-${Math.min((i % 12) + 1, 12)}`
                return (
                  <div key={q.id} className={`animate-slide-up ${delayClass}`}>
                    <QuoteCard quote={q} highlight={q.id === highlightedId} />
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

export default QuotesPage
