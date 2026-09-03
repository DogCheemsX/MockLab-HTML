import React from 'react';
import { User } from 'firebase/auth';
import { UserProfile } from '../../types/auth';
import { PAYMENT_INFO, getPaymentVerificationWhatsappUrl } from '../../constants/config';
import { QRCodeMagnifier } from '../common/QRCodeMagnifier';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPremium?: boolean;
  user?: User | null;
  userData?: UserProfile | null;
}

export const PremiumModal: React.FC<PremiumModalProps> = React.memo(({ isOpen, onClose, user, userData }) => {
  if (!isOpen) return null;

  const whatsappPaymentUrl = getPaymentVerificationWhatsappUrl(user, userData);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 border-2 border-amber-500/50 shadow-glow-amber relative overflow-hidden text-left bg-gradient-to-br from-amber-950/30 via-slate-900/95 to-purple-950/30 transition-all duration-300 ease-out transform animate-page-enter"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="premium-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors z-20"
          aria-label="Close dialog"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          {/* Pulsing Urgency Banner */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-black uppercase tracking-wider mb-3 shadow-glow-rose animate-pulse">
            <span>🔥</span> DISCOUNT ENDING SOON (50% OFF)
          </div>

          <span className="block text-amber-300 text-xs font-black uppercase tracking-widest mb-1">
            PREMIUM PRO PASS
          </span>
          <h2 id="premium-modal-title" className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
            Unlock Unlimited Full Length Past Papers
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-sm mx-auto leading-relaxed">
            Generate infinite on-demand past papers across all universities.
          </p>
        </div>

        {/* Pricing Offer Banner */}
        <div className="w-full glass-card p-4 rounded-2xl border border-amber-500/40 bg-amber-950/20 mb-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest">Lifetime Access Offer</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-black text-amber-300">{PAYMENT_INFO.amount}</span>
              <span className="line-through text-slate-400 text-lg sm:text-xl font-bold font-mono ml-1.5 opacity-85 decoration-rose-500/80 decoration-2">PKR 1000</span>
            </div>
          </div>
          <span className="text-[11px] font-extrabold px-3 py-1.5 rounded-full bg-amber-500 text-slate-950 shadow-sm uppercase tracking-wider">
            ONE-TIME PAYMENT
          </span>
        </div>

        {/* QR Code Container with Magnifier */}
        <div className="mb-5 flex justify-center">
          <QRCodeMagnifier />
        </div>

        {/* Step-by-Step Payment Instructions */}
        <div className="space-y-2.5 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-left mb-5 shadow-inner">
          <div className="flex items-start">
            <div className="bg-indigo-600 text-white font-black rounded-lg h-5 w-5 flex items-center justify-center text-[11px] shrink-0 mt-0.5 mr-2.5">
              1
            </div>
            <p className="text-xs font-medium text-slate-300 leading-relaxed">
              Send <b className="text-emerald-400 font-bold">{PAYMENT_INFO.amount}</b> to <b className="text-white font-bold">{PAYMENT_INFO.accountNumber}</b> (NayaPay).
            </p>
          </div>
          <div className="flex items-start">
            <div className="bg-indigo-600 text-white font-black rounded-lg h-5 w-5 flex items-center justify-center text-[11px] shrink-0 mt-0.5 mr-2.5">
              2
            </div>
            <p className="text-xs font-medium text-slate-300 leading-relaxed">
              Send your payment screenshot to WhatsApp admin.
            </p>
          </div>
          <div className="flex items-start">
            <div className="bg-indigo-600 text-white font-black rounded-lg h-5 w-5 flex items-center justify-center text-[11px] shrink-0 mt-0.5 mr-2.5">
              3
            </div>
            <p className="text-xs font-medium text-slate-300 leading-relaxed">
              Account activated upon payment confirmation.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <a
          href={whatsappPaymentUrl}
          target="_blank"
          rel="noreferrer"
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm py-3.5 px-6 rounded-xl shadow-glow-emerald transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 border border-emerald-400/30 text-center"
        >
          <img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5 object-contain shrink-0" />
          <span>Confirm Payment on WhatsApp</span>
        </a>
      </div>
    </div>
  );
});

PremiumModal.displayName = 'PremiumModal';
