import { useState, useEffect, useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getAllCharacters } from '../services/api'
import CharacterCard from '../components/CharacterCard'
import SearchBar from '../components/ui/SearchBar'
import Pagination from '../components/ui/Pagination'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import ErrorMessage from '../components/ui/ErrorMessage'

const CHARS_PER_PAGE = 12

function CharactersPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [allCharacters, setAllCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [searchQuery, setSearchQuery] = useState(searchParams.get('name') || '')
  const [debouncedQuery, setDebouncedQuery] = useState(searchParams.get('name') || '')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
      setCurrentPage(1)
      if (searchQuery) setSearchParams({ name: searchQuery }, { replace: true })
      else setSearchParams({}, { replace: true })
    }, 500)
    return () => clearTimeout(timer)
  }, [searchQuery, setSearchParams])

  const fetchCharacters = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await getAllCharacters()
      setAllCharacters(data)
    } catch (err) {
      setError(err.message || 'Failed to load characters. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchCharacters() }, [fetchCharacters])

  const filtered = useMemo(() => {
    if (!debouncedQuery.trim()) return allCharacters
    const q = debouncedQuery.toLowerCase()
    return allCharacters.filter(c => c.name?.toLowerCase().includes(q))
  }, [allCharacters, debouncedQuery])

  const totalPages = Math.ceil(filtered.length / CHARS_PER_PAGE)
  const paginatedChars = useMemo(() => {
    const start = (currentPage - 1) * CHARS_PER_PAGE
    return filtered.slice(start, start + CHARS_PER_PAGE)
  }, [filtered, currentPage])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* green background effect */}
      <div
        className="absolute top-16 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(0,200,83,0.03), transparent)', zIndex: 0 }}
      />

      <div className="relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black tracking-wide uppercase mb-2" style={{ color: '#E0E0E0' }}>
            Characters
          </h1>
          <p className="text-sm" style={{ color: '#9E9E9E' }}>
            {!loading && `${filtered.length} character${filtered.length !== 1 ? 's' : ''} in the Breaking Bad universe`}
          </p>
        </div>

        <div className="mb-8 max-w-lg">
          <SearchBar
            placeholder="Search characters by name..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {loading && <LoadingSpinner message="Loading characters..." />}
        {!loading && error && <ErrorMessage message={error} onRetry={fetchCharacters} />}

        {!loading && !error && (
          <>
            {paginatedChars.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">🔍</p>
                <p style={{ color: '#9E9E9E' }}>
                  No characters found{debouncedQuery ? ` for "${debouncedQuery}"` : ''}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {/* pass index to make animation work one by one */}
                {paginatedChars.map((char, i) => (
                  <CharacterCard key={char.id} character={char} index={i} />
                ))}
              </div>
            )}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </>
        )}
      </div>
    </div>
  )
}

export default CharactersPage
