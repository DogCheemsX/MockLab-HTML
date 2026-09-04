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
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const whatsappPaymentUrl = getPaymentVerificationWhatsappUrl(user, userData);

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(PAYMENT_INFO.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white dark:bg-slate-900 border-2 border-amber-300 shadow-xl dark:bg-gradient-to-br dark:from-amber-950/30 dark:via-slate-900/95 dark:to-purple-950/30 dark:border-amber-500/50 dark:shadow-glow-amber rounded-3xl p-6 sm:p-8 relative overflow-hidden text-left transition-all duration-300 ease-out transform animate-page-enter"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="premium-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 p-2 rounded-full hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors z-20"
          aria-label="Close dialog"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          {/* Pulsing Urgency Banner */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/40 text-xs font-black uppercase tracking-wider mb-3 shadow-sm animate-pulse">
            <span>🔥</span> DISCOUNT ENDING SOON (50% OFF)
          </div>

          <span className="block text-amber-700 dark:text-amber-300 text-xs font-black uppercase tracking-widest mb-1">
            PREMIUM PRO PASS
          </span>
          <h2 id="premium-modal-title" className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white tracking-tight">
            Unlock Unlimited Full Length Past Papers
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-sm mx-auto leading-relaxed">
            Generate infinite on-demand past papers across all universities.
          </p>
        </div>

        {/* Pricing Offer Banner */}
        <div className="w-full p-4 rounded-2xl border border-amber-200 bg-amber-50/80 dark:border-amber-500/40 dark:bg-amber-950/20 mb-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold text-amber-800 dark:text-amber-400 uppercase tracking-widest">Lifetime Access Offer</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-black text-amber-800 dark:text-amber-300">{PAYMENT_INFO.amount}</span>
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
        <div className="space-y-2.5 bg-slate-50 border border-slate-200 dark:bg-slate-950/80 dark:border-slate-800 p-4 rounded-2xl text-left mb-5 shadow-inner">
          <div className="flex items-start">
            <div className="bg-indigo-600 text-white font-black rounded-lg h-5 w-5 flex items-center justify-center text-[11px] shrink-0 mt-0.5 mr-2.5">
              1
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                Send <b className="text-emerald-700 dark:text-emerald-400 font-bold">{PAYMENT_INFO.amount}</b> to NayaPay account:
              </p>
              <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black text-slate-900 dark:text-white font-mono bg-white dark:bg-slate-900 px-2.5 py-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm select-all">
                  {PAYMENT_INFO.accountNumber}
                </span>
                <button
                  type="button"
                  onClick={handleCopyAccount}
                  className="text-xs font-extrabold px-2.5 py-1 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 dark:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/40 dark:hover:bg-indigo-500/30 transition-all flex items-center gap-1 shadow-sm active:scale-95"
                >
                  <span>{copied ? '✓ Copied!' : '📋 Copy Number'}</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-indigo-600 text-white font-black rounded-lg h-5 w-5 flex items-center justify-center text-[11px] shrink-0 mt-0.5 mr-2.5">
              2
            </div>
            <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
              Send your payment screenshot to WhatsApp admin.
            </p>
          </div>
          <div className="flex items-start">
            <div className="bg-indigo-600 text-white font-black rounded-lg h-5 w-5 flex items-center justify-center text-[11px] shrink-0 mt-0.5 mr-2.5">
              3
            </div>
            <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
              Account activated upon payment confirmation.
            </p>
          </div>
        </div>

        {/* 100% Refund Trust Guarantee Badge */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-200/90 dark:border-emerald-500/30 flex items-center gap-3 text-left mb-5 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center text-lg shrink-0 shadow-sm">
            🛡️
          </div>
          <div>
            <p className="text-xs font-black text-emerald-950 dark:text-emerald-300">
              100% Risk-Free Money-Back Guarantee
            </p>
            <p className="text-[11px] text-emerald-800 dark:text-emerald-200 font-medium leading-tight mt-0.5">
              Technical issue or not satisfied? Full refund within 24 hours via WhatsApp.
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
