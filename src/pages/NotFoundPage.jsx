// 404 page.
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      {/* Big 404 number */}
      <p
        className="font-black text-[10rem] md:text-[14rem] leading-none select-none"
        style={{ color: '#1a1a1a' }}
      >
        404
      </p>

      <div className="-mt-8 space-y-4">
        <p
          className="text-3xl md:text-4xl font-black tracking-wide"
          style={{ color: '#E0E0E0' }}
        >
          You&#39;re not in the territory anymore.
        </p>

        <p className="text-base max-w-md mx-auto" style={{ color: '#9E9E9E' }}>
          This page has been... eliminated. Say my name — it won&#39;t help you find this page.
        </p>

        <div className="pt-4">
          <Link
            to="/"
            className="inline-block px-8 py-3 rounded-xl font-bold transition-all duration-200 hover:scale-105"
            style={{ backgroundColor: '#00C853', color: '#0a0a0a' }}
          >
            ← Back to Home Base
          </Link>
        </div>

        <p className="text-sm italic" style={{ color: '#444444' }}>
          &quot;I am the one who knocks.&quot; — Walter White
        </p>
      </div>
    </div>
  )
}

export default NotFoundPage
