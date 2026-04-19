import { useState } from 'react'

function DeaRaid() {
  const [isRaided, setIsRaided] = useState(false)

  return (
    <>
      <button 
        onClick={() => setIsRaided(true)}
        className="mt-12 px-6 py-3 bg-[#03A9F4] text-black font-black uppercase tracking-widest rounded-full hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(3,169,244,0.5)] animate-pulse"
      >
        Buy Blue Sky (99.1% Pure) 💎
      </button>

      {isRaided && (
        <div 
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center p-4" 
          style={{ animation: 'siren 0.5s infinite' }}
        >
          <div className="bg-[#0a0a0a] border-8 border-red-600 p-8 text-center max-w-2xl transform scale-105 shadow-[0_0_100px_red]">
            <h1 className="text-6xl md:text-8xl mb-4 select-none">🚨</h1>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-widest uppercase" style={{ textShadow: '2px 2px 0 red' }}>
              DEA CYBER DIVISION
            </h2>
            <p className="text-red-500 font-bold text-2xl mb-6 uppercase tracking-widest">
              Illegal Narcotics Request Detected
            </p>
            <div className="text-left bg-black text-green-500 font-mono p-4 mb-8 rounded border border-gray-800">
              <p>{`> TRACING CONNECTION...`}</p>
              <p>{`> IP LOGGED AND SENT TO ALBUQUERQUE PD.`}</p>
              <p>{`> DISPATCHING SWAT TEAM...`}</p>
              <p className="animate-pulse text-red-500 mt-2">{`> ETA: 2 MINUTES... DO NOT LEAVE THE PREMISES.`}</p>
            </div>
            <button 
              onClick={() => setIsRaided(false)}
              className="px-6 py-2 bg-transparent text-gray-500 hover:text-white border border-gray-600 rounded text-sm transition-colors uppercase font-bold"
            >
              Just kidding, don't arrest me (Close)
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default DeaRaid
