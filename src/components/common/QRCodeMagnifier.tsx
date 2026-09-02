import React, { useState } from 'react';

interface QRCodeMagnifierProps {
  src?: string;
  alt?: string;
}

export const QRCodeMagnifier: React.FC<QRCodeMagnifierProps> = React.memo(({ src = '/qr.png', alt = 'NayaPay QR Code' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div
          onClick={() => setIsModalOpen(true)}
          className="bg-white p-2.5 rounded-2xl shadow-glow-indigo border-2 border-indigo-400 cursor-zoom-in group relative overflow-hidden transition-all duration-300 transform hover:scale-115 hover:shadow-2xl hover:border-indigo-500 z-10"
          title="Click or tap to view full size"
        >
          <img src={src} alt={alt} className="w-32 h-32 sm:w-36 sm:h-36 object-contain rounded-lg transition-transform duration-300 group-hover:scale-105" />
          <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="bg-slate-950/80 text-white text-[10px] font-bold px-2 py-1 rounded-full border border-indigo-400/40 shadow-md">
              🔍 Tap to Enlarge
            </span>
          </div>
        </div>
        <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-widest bg-indigo-950/80 px-3.5 py-1 rounded-full border border-indigo-500/40 shadow-sm mt-2">
          Scan to Pay via NayaPay
        </span>
      </div>

      {/* Full-Screen Lightbox Modal for Mobile & PC */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-backdrop-enter"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="glass-panel p-6 rounded-3xl border border-indigo-500/50 shadow-2xl flex flex-col items-center max-w-sm w-full relative animate-modal-enter text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white bg-slate-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm border border-slate-700 transition-colors"
            >
              ✕
            </button>
            <h3 className="text-lg font-black text-white mb-3">Scan NayaPay QR Code</h3>
            <div className="bg-white p-4 rounded-2xl border-4 border-indigo-500 shadow-2xl mb-4">
              <img src={src} alt={alt} className="w-64 h-64 sm:w-72 sm:h-72 object-contain rounded-xl" />
            </div>
            <p className="text-xs font-semibold text-slate-300">
              Open your <b className="text-white">NayaPay App</b> scanner to complete payment.
            </p>
          </div>
        </div>
      )}
    </>
  );
});

QRCodeMagnifier.displayName = 'QRCodeMagnifier';
