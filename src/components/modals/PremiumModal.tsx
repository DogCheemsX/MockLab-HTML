import React from 'react';
import { PAYMENT_INFO } from '../../constants/config';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PremiumModal: React.FC<PremiumModalProps> = React.memo(({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4">
      <div className="glass-panel rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl border border-indigo-500/40 relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold text-sm bg-slate-800 hover:bg-slate-700 w-8 h-8 rounded-full flex items-center justify-center border border-slate-700 transition-colors"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider mb-2">
            <span>👑</span> Premium Pass Unlock
          </span>
          <h2 className="text-2xl font-extrabold font-display text-white">Unlock All Practice Tests</h2>
          <p className="text-xs text-slate-400 mt-1">
            Get lifetime unlimited access to all NTS NAT, ECAT, MDCAT & University test banks across all devices.
          </p>
        </div>

        {/* QR Code Container */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="bg-white p-3 rounded-2xl shadow-glow-indigo border-2 border-indigo-400 mb-2">
            <img src="qr.png" alt="NayaPay QR Code" className="w-32 h-32 object-contain rounded-lg" />
          </div>
          <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-widest bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-500/30">
            Scan to Pay Via NayaPay / JazzCash / EasyPaisa
          </span>
        </div>

        {/* Step-by-Step Payment Instructions */}
        <div className="space-y-3 bg-slate-900/90 p-4 rounded-2xl border border-slate-800 text-left mb-6">
          <div className="flex items-start">
            <div className="bg-indigo-600 text-white font-black rounded-lg h-6 w-6 flex items-center justify-center text-xs shrink-0 mt-0.5 mr-3">
              1
            </div>
            <p className="text-xs font-medium text-slate-300 leading-relaxed">
              Transfer <b className="text-emerald-400 font-bold">{PAYMENT_INFO.amount}</b> to account <b className="text-white font-bold">{PAYMENT_INFO.accountNumber}</b> ({PAYMENT_INFO.bankName}).
            </p>
          </div>
          <div className="flex items-start">
            <div className="bg-indigo-600 text-white font-black rounded-lg h-6 w-6 flex items-center justify-center text-xs shrink-0 mt-0.5 mr-3">
              2
            </div>
            <p className="text-xs font-medium text-slate-300 leading-relaxed">
              Send your registered email & receipt screenshot to our WhatsApp admin.
            </p>
          </div>
          <div className="flex items-start">
            <div className="bg-indigo-600 text-white font-black rounded-lg h-6 w-6 flex items-center justify-center text-xs shrink-0 mt-0.5 mr-3">
              3
            </div>
            <p className="text-xs font-medium text-slate-300 leading-relaxed">
              Instant activation within 5 minutes!
            </p>
          </div>
        </div>

        {/* WhatsApp Direct Action Button */}
        <a
          href={PAYMENT_INFO.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm py-3.5 px-4 rounded-xl shadow-glow-emerald transition-all flex items-center justify-center gap-2 border border-emerald-400/30 text-center"
        >
          <span>💬</span> Contact Admin on WhatsApp
        </a>
      </div>
    </div>
  );
});

PremiumModal.displayName = 'PremiumModal';

