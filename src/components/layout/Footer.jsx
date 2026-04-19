// Footer.jsx — Credits, API attribution, tech stack info
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="mt-16" style={{ backgroundColor: '#111111' }}>
      {/* Gradient divider replaces plain border-t */}
      <div className="gradient-divider" />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-bold text-lg tracking-widest uppercase">
              <span style={{ color: '#E0E0E0' }}>Breaking</span>
              <span style={{ color: '#00C853' }}>Bad</span>
              <span style={{ color: '#9E9E9E' }}> Wiki</span>
            </span>
            <p className="text-xs" style={{ color: '#666666' }}>
              The complete guide to the Breaking Bad universe
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm" style={{ color: '#9E9E9E' }}>
            {[
              { to: '/', label: 'Home' },
              { to: '/characters', label: 'Characters' },
              { to: '/episodes', label: 'Episodes' },
              { to: '/deaths', label: 'Deaths' },
              { to: '/quotes', label: 'Quotes' },
            ].map(({ to, label }) => (
              <Link key={to} to={to} className="transition-colors hover:text-[#00C853]">
                {label}
              </Link>
            ))}
          </div>

          {/* Attribution */}
          <div className="text-center md:text-right text-xs space-y-1" style={{ color: '#666666' }}>
            <p>Data provided by <span style={{ color: '#00C853' }}>Breaking Bad API</span></p>
            <p>Built with React &amp; Tailwind CSS</p>
            <p style={{ color: '#444444' }}>⚗️ &quot;I am the one who knocks.&quot;</p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 pt-6 text-center text-xs" style={{ borderTop: '1px solid #1a1a1a', color: '#444444' }}>
          Breaking Bad Wiki — University Midterm Project · SE 3355 Web Programming
        </div>
      </div>
    </footer>
  )
}

export default Footer
