import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getQuotes, getAllCharacters, getEpisodes, getDeaths } from '../services/api'
import DeaRaid from '../components/ui/DeaRaid'

const ICONS = {
  characters: <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  episodes: <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>,
  deaths: <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-3.866 0-7 3.134-7 7 0 2.228 1.054 4.225 2.697 5.508.354.277.553.708.553 1.154V19c0 1.105.895 2 2 2h3.5c1.105 0 2-.895 2-2v-2.338c0-.446.199-.877.553-1.154C17.946 14.225 19 12.228 19 10c0-3.866-3.134-7-7-7zM9 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm4 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" /></svg>,
  quotes: <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
}

function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!target) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration])
  return count
}

function StatCard({ value, label, icon, accentColor }) {
  const animatedValue = useCountUp(value)
  return (
    <div
      className="flex flex-col items-center p-6 rounded-xl border animate-count-up"
      style={{
        backgroundColor: '#1a1a1a',
        borderColor: '#2a2a2a',
        borderTop: `3px solid ${accentColor}`,
      }}
    >
      <span className="mb-2" style={{ color: accentColor }}>{icon}</span>
      <span className="text-4xl font-black tabular-nums" style={{ color: accentColor }}>
        {animatedValue}
      </span>
      <span className="text-sm mt-1 tracking-wide" style={{ color: '#9E9E9E' }}>{label}</span>
    </div>
  )
}

function FeatureCard({ to, icon, title, description, accentColor, delayClass }) {
  return (
    <Link
      to={to}
      className={`card-glow-green rounded-xl border p-6 flex flex-col gap-3 transition-all duration-300 hover:scale-[1.03] group animate-slide-up ${delayClass}`}
      style={{
        backgroundColor: '#1a1a1a',
        borderColor: '#2a2a2a',
        borderLeft: `3px solid ${accentColor}`,
      }}
    >
      <span style={{ color: accentColor }}>{icon}</span>
      <h3
        className="font-bold text-lg tracking-wide uppercase group-hover:text-[#00C853] transition-colors"
        style={{ color: '#E0E0E0' }}
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: '#9E9E9E' }}>{description}</p>
      <span className="text-sm font-semibold mt-auto" style={{ color: accentColor }}>
        View All →
      </span>
    </Link>
  )
}

function HomePage() {
  const [quotes, setQuotes] = useState([])
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [quoteVisible, setQuoteVisible] = useState(true)
  const [stats, setStats] = useState({ characters: 0, episodes: 0, deaths: 0, quotes: 0 })

  useEffect(() => {
    async function fetchStats() {
      try {
        const [chars, eps, deaths, qs] = await Promise.all([
          getAllCharacters(), getEpisodes(), getDeaths(), getQuotes(),
        ])
        setStats({ characters: chars.count, episodes: eps.count, deaths: deaths.count, quotes: qs.count })
      } catch { /* non-critical */ }
    }
    fetchStats()
  }, [])

  useEffect(() => {
    async function fetchQuotes() {
      try {
        const { data } = await getQuotes()
        setQuotes(data.filter(q => q.quote && q.author && q.author.length < 60))
      } catch { /* silent */ }
    }
    fetchQuotes()
  }, [])

  useEffect(() => {
    if (quotes.length === 0) return
    const interval = setInterval(() => {
      setQuoteVisible(false)
      setTimeout(() => {
        setCurrentQuoteIndex(prev => (prev + 1) % quotes.length)
        setQuoteVisible(true)
      }, 400)
    }, 8000)
    return () => clearInterval(interval)
  }, [quotes])

  const currentQuote = quotes[currentQuoteIndex]

  return (
    <div>
      <section
        className="smoke-effect relative min-h-[70vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #111111 100%)' }}
      >
        <span
          className="absolute select-none pointer-events-none font-black tracking-widest"
          style={{ fontSize: 'clamp(6rem, 18vw, 18rem)', color: '#00C853', opacity: 0.04, zIndex: 0 }}
        >
          C₁₀H₁₅N
        </span>

        <span
          className="absolute select-none pointer-events-none font-black tracking-[0.3em] uppercase"
          style={{
            fontSize: 'clamp(3rem, 8vw, 8rem)',
            color: '#E0E0E0',
            opacity: 0.02,
            transform: 'rotate(-8deg)',
            zIndex: 0,
            bottom: '15%',
            left: '5%',
            whiteSpace: 'nowrap',
          }}
        >
          HEISENBERG
        </span>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1
            className="font-black tracking-tight leading-none flex items-center justify-center flex-wrap gap-2"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: '#E0E0E0' }}
          >
            <span className="element-block flex-col text-5xl md:text-8xl p-2 md:p-4 mr-1 shadow-xl">
              <span>Br</span>
              <span className="element-details text-2xl md:text-3xl tracking-normal mt-1 text-[#00C853]">
                <span>Bromine</span>
                <span>79.904</span>
              </span>
            </span>
            eaking 
            <span className="element-block flex-col text-5xl md:text-8xl p-2 md:p-4 mx-2 shadow-xl">
              <span>Ba</span>
              <span className="element-details text-2xl md:text-3xl tracking-normal mt-1 text-[#00C853]">
                <span>Barium</span>
                <span>137.327</span>
              </span>
            </span>
            d
          </h1>
          <p
            className="text-xl md:text-3xl font-black tracking-[0.5em] uppercase mt-6"
            style={{ color: '#FFC107', textShadow: '0 0 20px rgba(255,193,7,0.3)' }}
          >
            WIKI
          </p>
          <p className="mt-6 text-base md:text-lg max-w-xl mx-auto leading-relaxed" style={{ color: '#9E9E9E' }}>
            The Complete Guide to the Breaking Bad Universe
          </p>

          {/* quote changes */}
          {currentQuote && (
            <div
              className="mt-10 max-w-2xl mx-auto p-6 rounded-xl border"
              style={{
                backgroundColor: 'rgba(0,200,83,0.05)',
                borderColor: 'rgba(0,200,83,0.2)',
                opacity: quoteVisible ? 1 : 0,
                transform: quoteVisible ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
              }}
            >
              <p className="text-base md:text-lg italic mb-3" style={{ color: '#E0E0E0' }}>
                &ldquo;{currentQuote.quote}&rdquo;
              </p>
              <p className="text-sm font-semibold" style={{ color: '#00C853' }}>
                — {currentQuote.author}
              </p>
            </div>
          )}

          {/* buttons */}
          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <Link
              to="/characters"
              className="px-8 py-3 rounded-xl font-black tracking-widest uppercase transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: '#FFC107', color: '#0a0a0a', boxShadow: '0 0 20px rgba(255,193,7,0.4)' }}
            >
              Let's Cook (Characters)
            </Link>
            <Link
              to="/episodes"
              className="px-8 py-3 rounded-xl font-black tracking-widest uppercase border-2 transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: 'transparent', borderColor: '#03A9F4', color: '#03A9F4', boxShadow: '0 0 15px rgba(3,169,244,0.2)' }}
            >
              Blue Sky (Episodes)
            </Link>
          </div>

          {/* Fake DEA Raid Easter Egg - Moved for better visibility */}
          <div className="mt-8 flex justify-center">
            <DeaRaid />
          </div>
        </div>
      </section>

      {/* line */}
      <div className="gradient-divider" />

      {/* stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-center text-xs font-bold tracking-[0.3em] uppercase mb-8" style={{ color: '#666666' }}>
          By the Numbers
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard value={stats.characters} label="Characters" icon={ICONS.characters} accentColor="#00C853" />
          <StatCard value={stats.episodes}   label="Episodes"   icon={ICONS.episodes}   accentColor="#2196F3" />
          <StatCard value={stats.deaths}     label="Deaths"     icon={ICONS.deaths}     accentColor="#EF5350" />
          <StatCard value={stats.quotes}     label="Quotes"     icon={ICONS.quotes}     accentColor="#FFC107" />
        </div>
      </section>

      {/* links */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" style={{ borderTop: '1px solid #1a1a1a' }}>
        <h2 className="text-xs font-bold tracking-[0.3em] uppercase mb-8 text-center" style={{ color: '#666666' }}>
          Explore the Universe
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <FeatureCard to="/characters" icon={ICONS.characters} title="Characters"
            description="Explore the full cast — from Walter White to the cartel lieutenants."
            accentColor="#00C853" delayClass="animate-delay-1" />
          <FeatureCard to="/episodes" icon={ICONS.episodes} title="Episodes"
            description="All 62 episodes across 5 seasons, with complete cast listings."
            accentColor="#FFC107" delayClass="animate-delay-2" />
          <FeatureCard to="/deaths" icon={ICONS.deaths} title="Deaths"
            description="Every on-screen death — causes, responsible parties, and last words."
            accentColor="#EF5350" delayClass="animate-delay-3" />
          <FeatureCard to="/quotes" icon={ICONS.quotes} title="Quotes"
            description="Iconic lines from the series — search by character."
            accentColor="#FFC107" delayClass="animate-delay-4" />
        </div>
      </section>

      {/* about */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center" style={{ borderTop: '1px solid #1a1a1a' }}>
        <h2 className="text-xs font-bold tracking-[0.3em] uppercase mb-6" style={{ color: '#666666' }}>
          About the Show
        </h2>
        <p className="text-base leading-loose" style={{ color: '#9E9E9E' }}>
          Breaking Bad is an American television drama series created by Vince Gilligan. The show
          follows <span style={{ color: '#E0E0E0' }}>Walter White</span>, a high school chemistry
          teacher turned methamphetamine manufacturer, partnering with former student{' '}
          <span style={{ color: '#E0E0E0' }}>Jesse Pinkman</span>. Widely regarded as one of the
          greatest TV series ever made, it aired from{' '}
          <span style={{ color: '#00C853' }}>2008</span> to{' '}
          <span style={{ color: '#00C853' }}>2013</span> across{' '}
          <span style={{ color: '#00C853' }}>5 seasons</span> and{' '}
          <span style={{ color: '#00C853' }}>62 episodes</span>.
        </p>
      </section>
    </div>
  )
}

export default HomePage
