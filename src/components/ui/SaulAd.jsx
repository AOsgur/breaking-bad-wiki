import { useState } from 'react'

function SaulAd() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      {/* Sticky Banner Ad */}
      <div 
        onClick={() => setShowModal(true)}
        className="fixed bottom-4 right-4 z-[9000] cursor-pointer animate-pulse hover:scale-105 transition-transform"
        title="Call Saul!"
      >
        <div className="bg-[#FFEB3B] border-4 border-[#F44336] p-2 text-center shadow-2xl transform rotate-[-5deg] select-none">
          <p className="text-[#F44336] font-black text-xs uppercase tracking-tighter">Legal Trouble?</p>
          <p className="text-black font-black text-lg leading-none uppercase">Better<br/>Call Saul!</p>
        </div>
      </div>

      {/* Tacky Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[10000] bg-[#FFEB3B] flex items-center justify-center p-4 animate-fade-in">
          <div className="text-center max-w-2xl border-8 border-dashed border-[#F44336] p-8 bg-white shadow-2xl transform rotate-1 animate-slide-up">
            <div className="text-8xl mb-4 select-none">⚖️</div>
            <h2 className="text-4xl md:text-6xl font-black text-[#F44336] mb-4 uppercase" style={{ textShadow: '2px 2px 0 #000' }}>
              Did you know you have rights?
            </h2>
            <p className="text-2xl md:text-3xl font-bold text-black mb-8 uppercase leading-tight">
              Constitution says you do!<br/>And so do I!
            </p>
            <p className="text-xl text-[#666] italic mb-8 px-4">
              "I believe that until proven guilty, every man, woman, and child in this country is innocent."
            </p>
            <button 
              onClick={() => setShowModal(false)}
              className="px-8 py-4 bg-[#F44336] text-white font-black text-2xl border-4 border-black hover:bg-black hover:text-[#F44336] transition-colors uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-2 hover:translate-x-2"
            >
              Close Consultation
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default SaulAd
