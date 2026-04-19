// ErrorMessage.jsx — Red-tinted error state card with a retry button
// Props:
//   message  — the error text to display
//   onRetry  — callback function invoked when "Try Again" is clicked
function ErrorMessage({ message = 'Failed to load data. Please try again.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-5 px-4">
      <div
        className="max-w-md w-full rounded-xl border p-8 text-center"
        style={{ backgroundColor: '#1a0a0a', borderColor: '#B71C1C' }}
      >
        {/* Error icon */}
        <div className="text-5xl mb-4">⚠️</div>

        <h3 className="text-lg font-semibold mb-2" style={{ color: '#EF5350' }}>
          Something went wrong
        </h3>

        <p className="text-sm mb-6" style={{ color: '#9E9E9E' }}>
          {message}
        </p>

        {/* Retry button — calls the onRetry callback */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 hover:scale-[1.03]"
            style={{
              backgroundColor: '#B71C1C',
              color: '#fff',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#EF5350')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#B71C1C')}
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorMessage
