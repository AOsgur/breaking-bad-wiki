import { useState, useEffect } from 'react'

function Fly() {
  const [position, setPosition] = useState({ top: '50%', left: '50%' })
  const [isDead, setIsDead] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (isDead) return
    
    const moveFly = () => {
      // Random position between 10% and 80% of screen to keep it visible
      const randomTop = Math.floor(Math.random() * 70) + 15
      const randomLeft = Math.floor(Math.random() * 70) + 15
      setPosition({ top: `${randomTop}%`, left: `${randomLeft}%` })
    }

    // Move immediately and then every 2.5 seconds
    moveFly()
    const interval = setInterval(moveFly, 2500)
    
    return () => clearInterval(interval)
  }, [isDead])

  // if fly is dead and modal is closed, hide everything
  if (isDead && !showModal) return null

  // custom success popup instead of ugly alert
  if (showModal) {
    return (
      <div className="fixed inset-0 z-[10000] bg-black/80 flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm">
        <div className="bg-[#0a0e0a] border-2 border-[#00C853] p-8 rounded-xl max-w-sm text-center shadow-[0_0_40px_rgba(0,200,83,0.3)] animate-slide-up">
          <div className="text-6xl mb-4">🧼</div>
          <h2 className="text-2xl font-black text-[#00C853] mb-2 uppercase tracking-widest">LAB CLEARED</h2>
          <p className="text-[#E0E0E0] mb-6 leading-relaxed">
            "Now we can eat."<br/>
            <span className="text-[#9E9E9E] text-sm mt-2 block">— Walter White</span>
          </p>
          <button 
            onClick={() => setShowModal(false)}
            className="px-8 py-2 bg-[#00C853] text-black font-bold rounded-lg hover:bg-green-400 transition-colors uppercase tracking-wide"
          >
            BACK TO WORK
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed z-[9999] flex flex-col items-center"
      style={{
        top: position.top,
        left: position.left,
        transition: 'top 2s ease-in-out, left 2s ease-in-out',
      }}
    >
      {/* Tooltip to remind user to click */}
      <span 
        className="text-[10px] bg-red-600 text-white font-bold px-2 py-0.5 rounded-full mb-1 whitespace-nowrap animate-pulse shadow-lg"
        style={{ pointerEvents: 'none' }}
      >
        Catch me! 👆
      </span>
      
      {/* The actual fly */}
      <div
        onClick={() => {
          setIsDead(true)
          setShowModal(true)
        }}
        className="cursor-crosshair select-none text-3xl hover:scale-125 transition-transform"
        style={{
          animation: 'fly-buzz 0.05s linear infinite',
          filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.5))'
        }}
        title="Smash it!"
      >
        🪰
      </div>
    </div>
  )
}

export default Fly
