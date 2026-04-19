// navbar component. sticks to top.
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/',           label: 'Home' },
  { to: '/characters', label: 'Characters' },
  { to: '/episodes',   label: 'Episodes' },
  { to: '/deaths',     label: 'Deaths' },
  { to: '/quotes',     label: 'Quotes' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="glass-nav sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* logo area */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            onClick={() => setMenuOpen(false)}
          >
            {/* green circle that blinks */}
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{
                backgroundColor: '#00C853',
                boxShadow: '0 0 8px #00C853',
                animation: 'glow-pulse 3s ease-in-out infinite',
              }}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-[#00C853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <span className="font-bold text-lg tracking-widest flex items-center">
              <span className="element-block mr-1 flex-col">
                <span>Br</span>
                <span className="element-details">
                  <span>Bromine</span>
                  <span>79.904</span>
                </span>
              </span>
              <span style={{ color: '#E0E0E0' }}>eaking</span>
              <span className="element-block ml-3 mr-1 flex-col">
                <span>Ba</span>
                <span className="element-details">
                  <span>Barium</span>
                  <span>137.327</span>
                </span>
              </span>
              <span style={{ color: '#E0E0E0' }}>d</span>
              <span style={{ color: '#FFC107', fontSize: '0.65rem', marginLeft: '8px', fontWeight: 'bold' }}>WIKI</span>
            </span>
          </Link>

          {/* links for pc */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'text-[#00C853] bg-[#00C853]/10'
                      : 'text-[#9E9E9E] hover:text-[#E0E0E0] hover:bg-[#1a1a1a]'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* menu button for phone */}
          <button
            className="md:hidden p-2 rounded-lg text-[#9E9E9E] hover:text-[#E0E0E0] hover:bg-[#1a1a1a] transition-colors"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* menu for phone */}
      {menuOpen && (
        <div
          className="md:hidden border-t px-4 py-3 flex flex-col gap-1"
          style={{ borderColor: 'rgba(0,200,83,0.1)', backgroundColor: '#0d0d0d' }}
        >
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-[#00C853] bg-[#00C853]/10'
                    : 'text-[#9E9E9E] hover:text-[#E0E0E0] hover:bg-[#1a1a1a]'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar
