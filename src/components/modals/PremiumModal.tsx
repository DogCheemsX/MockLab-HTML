import React, { useState } from 'react';
import { PAYMENT_INFO } from '../../constants/config';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PremiumModal: React.FC<PremiumModalProps> = React.memo(({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(PAYMENT_INFO.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div 
      className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-backdrop-enter"
      role="dialog"
      aria-modal="true"
      aria-labelledby="premium-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="glass-panel rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl border border-amber-500/40 relative overflow-hidden animate-modal-enter text-left">
        {/* Background glow effect */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Modal"
          className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold text-sm bg-slate-800/80 hover:bg-slate-700 w-8 h-8 rounded-full flex items-center justify-center border border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black uppercase tracking-widest mb-2.5 shadow-sm">
            <span>👑</span> PREMIUM PASS
          </span>
          <h2 id="premium-modal-title" className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
            Unlock All Premium Tests
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-sm mx-auto leading-relaxed">
            Get full access to all practice test papers for all universities.
          </p>
        </div>

        {/* Pricing Offer Banner */}
        <div className="flex items-center justify-between bg-gradient-to-r from-amber-950/40 via-slate-900/80 to-amber-950/40 p-3.5 rounded-2xl border border-amber-500/30 mb-5">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Lifetime Pass</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">{PAYMENT_INFO.amount}</span>
              <span className="text-xs text-slate-400 line-through">{PAYMENT_INFO.originalPrice}</span>
            </div>
          </div>
          <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-sm">
            {PAYMENT_INFO.discountPercent}
          </span>
        </div>

        {/* Payment Channel: NayaPay Only */}
        <div className="mb-4 text-center">
          <span className="text-xs font-extrabold text-indigo-300 bg-indigo-950/60 px-4 py-1.5 rounded-full border border-indigo-500/30 inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
            Payment Method: NayaPay
          </span>
        </div>

        {/* QR Code Container */}
        <div className="flex flex-col items-center justify-center mb-5 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
          <div className="bg-white p-2.5 rounded-2xl shadow-glow-indigo border-2 border-indigo-400 mb-2 transition-transform hover:scale-105 duration-300">
            <img src="/qr.png" alt="NayaPay QR Code" className="w-32 h-32 object-contain rounded-lg" />
          </div>
          <p className="text-[11px] font-medium text-slate-300 text-center">
            Scan to pay with <b className="text-white">NayaPay App</b>
          </p>
        </div>

        {/* Step-by-Step Payment Instructions & Copy Box */}
        <div className="space-y-2.5 bg-slate-900/90 p-4 rounded-2xl border border-slate-800 text-left mb-5">
          <div className="flex items-center justify-between bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold">NayaPay Account Number</p>
              <p className="text-sm font-black text-emerald-400 tracking-wider">{PAYMENT_INFO.accountNumber}</p>
            </div>
            <button
              onClick={handleCopyAccount}
              className="text-xs font-bold px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-all flex items-center gap-1 shadow-sm"
            >
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>

          <div className="space-y-1.5 pt-1 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <span className="font-bold text-amber-400">1.</span>
              <span>Send <b>{PAYMENT_INFO.amount}</b> to <b>{PAYMENT_INFO.accountNumber}</b> (NayaPay).</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-amber-400">2.</span>
              <span>Send your payment screenshot to WhatsApp admin.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-amber-400">3.</span>
              <span>Account activated within <b>5 minutes</b>.</span>
            </div>
          </div>
        </div>

        {/* WhatsApp Direct Action Button */}
        <a
          href={PAYMENT_INFO.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm py-3.5 px-4 rounded-2xl shadow-glow-emerald transition-all flex items-center justify-center gap-2.5 border border-emerald-400/40 text-center"
        >
          <img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5 object-contain shrink-0" />
          <span>Confirm Payment on WhatsApp</span>
        </a>
      </div>
    </div>
  );
});

PremiumModal.displayName = 'PremiumModal';
