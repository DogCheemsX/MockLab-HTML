import React from 'react';
import { PAYMENT_INFO } from '../../constants/config';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PremiumModal: React.FC<PremiumModalProps> = React.memo(({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4">
      <div className="bg-gray-800 border-2 border-indigo-500 rounded-xl p-6 w-full max-w-md shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white font-bold text-xl"
        >
          ✕
        </button>
        <h2 className="text-2xl font-black mb-2 text-center text-indigo-400">🔒 Premium Test</h2>
        <p className="text-center text-gray-300 text-sm mb-6">
          This test is locked. Upgrade your account to unlock all tests permanently on all your devices!
        </p>

        <div className="flex flex-col items-center justify-center mb-6">
          <div className="bg-white p-3 rounded-2xl shadow-[0_0_15px_rgba(79,70,229,0.3)] border-2 border-indigo-400 mb-3">
            <img src="qr.png" alt="NayaPay QR Code" className="w-32 h-32 object-contain rounded-lg" />
          </div>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-900/40 px-3 py-1 rounded-full border border-indigo-500/30">
            Scan to Pay
          </span>
        </div>

        <div className="space-y-4 text-left bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div className="flex items-start">
            <div className="bg-indigo-600 text-white font-bold rounded-full h-6 w-6 flex items-center justify-center text-xs shrink-0 mt-0.5 mr-3">
              1
            </div>
            <p className="text-sm font-medium text-gray-300">
              Send <b className="text-white">{PAYMENT_INFO.amount}</b> to <b className="text-white">{PAYMENT_INFO.accountNumber}</b> ({PAYMENT_INFO.bankName}).
            </p>
          </div>
          <div className="flex items-start">
            <div className="bg-indigo-600 text-white font-bold rounded-full h-6 w-6 flex items-center justify-center text-xs shrink-0 mt-0.5 mr-3">
              2
            </div>
            <p className="text-sm font-medium text-gray-300">
              Message your registered email and screenshot to{' '}
              <a
                href={PAYMENT_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="text-green-400 font-bold underline hover:text-green-300"
              >
                WhatsApp Admin
              </a>
              .
            </p>
          </div>
          <div className="flex items-start">
            <div className="bg-indigo-600 text-white font-bold rounded-full h-6 w-6 flex items-center justify-center text-xs shrink-0 mt-0.5 mr-3">
              3
            </div>
            <p className="text-sm font-medium text-gray-300">
              We will instantly activate Premium on your account!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

PremiumModal.displayName = 'PremiumModal';
