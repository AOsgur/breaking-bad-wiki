// QuoteCard.jsx — Quote display card with large decorative quotation mark
// Props:
//   quote      — quote object { id, quote, author, series }
//   highlight  — boolean, adds amber glow when this is the "random" highlighted card
function QuoteCard({ quote, highlight = false }) {
  return (
    <div
      id={`quote-${quote.id}`}
      className={`card-glow-amber rounded-xl border transition-all duration-300 hover:scale-[1.01] p-6 relative overflow-hidden ${
        highlight ? 'ring-2 ring-[#FFC107]/50' : ''
      }`}
      style={{
        backgroundColor: '#1a1a1a',
        borderColor: highlight ? '#FFC107' : '#2a2a2a',
      }}
    >
      {/* Decorative large opening quote mark */}
      <div className="quote-mark absolute top-2 left-3 select-none pointer-events-none">
        &ldquo;
      </div>

      {/* Quote text */}
      <p
        className="relative z-10 text-base italic leading-relaxed pt-6"
        style={{ color: '#E0E0E0' }}
      >
        {quote.quote}
      </p>

      {/* Author attribution */}
      <div className="mt-4 flex items-center justify-end gap-2">
        <div className="h-px flex-1" style={{ backgroundColor: '#2a2a2a' }} />
        <p
          className="text-sm font-semibold"
          style={{ color: '#FFC107' }}
        >
          — {quote.author}
        </p>
      </div>

      {/* Series label */}
      {quote.series && (
        <p className="text-xs mt-1 text-right" style={{ color: '#666666' }}>
          {quote.series}
        </p>
      )}
    </div>
  )
}

export default QuoteCard
