// LoadingSpinner.jsx — Multi-ring "Cooking..." themed loading animation
import { useState, useEffect } from 'react'

// Animates "Cooking." → "Cooking.." → "Cooking..." → repeat
function useTypingDots(base = 'Cooking') {
  const [dots, setDots] = useState(3)
  useEffect(() => {
    const id = setInterval(() => setDots(d => (d % 3) + 1), 500)
    return () => clearInterval(id)
  }, [])
  return base + '.'.repeat(dots)
}

function LoadingSpinner({ message }) {
  const cookingText = useTypingDots('Cooking')
  const displayText = message || cookingText

  return (
    <div className="flex flex-col items-center justify-center py-24 gap-6">
      {/* Multi-ring spinner */}
      <div className="relative flex items-center justify-center" style={{ width: 84, height: 84 }}>
        {/* Outer slow counter-rotating ring */}
        <div className="spinner-outer" />
        {/* Inner fast ring */}
        <div className="spinner" />
        {/* Center icon */}
        <span
          className="absolute text-2xl"
          style={{ filter: 'drop-shadow(0 0 6px rgba(0,200,83,0.6))' }}
        >
          ⚗️
        </span>
      </div>

      {/* Animated dots text */}
      <p
        className="text-sm font-medium tracking-widest uppercase"
        style={{ color: '#9E9E9E', minWidth: '8ch', textAlign: 'center' }}
      >
        {displayText}
      </p>
    </div>
  )
}

export default LoadingSpinner
