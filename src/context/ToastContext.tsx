import React, { createContext, useContext, useState, useCallback } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  title: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (title: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((title: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Notification Container */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            onClick={() => removeToast(toast.id)}
            className={`pointer-events-auto cursor-pointer p-4 rounded-2xl border shadow-lg backdrop-blur-xl flex items-center justify-between gap-3 animate-page-enter transition-all transform hover:scale-[1.02] ${
              toast.type === 'success'
                ? 'bg-white text-slate-900 border-emerald-300 shadow-emerald-500/10 dark:bg-emerald-950/90 dark:border-emerald-500/50 dark:text-emerald-200 dark:shadow-emerald-950/50'
                : toast.type === 'error'
                ? 'bg-white text-slate-900 border-rose-300 shadow-rose-500/10 dark:bg-rose-950/90 dark:border-rose-500/50 dark:text-rose-200 dark:shadow-rose-950/50'
                : toast.type === 'warning'
                ? 'bg-white text-slate-900 border-amber-300 shadow-amber-500/10 dark:bg-amber-950/90 dark:border-amber-500/50 dark:text-amber-200 dark:shadow-amber-950/50'
                : 'bg-white text-slate-900 border-slate-200 shadow-slate-900/5 dark:bg-slate-900 dark:text-white dark:border-slate-800 dark:shadow-indigo-950/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg shrink-0">
                {toast.type === 'success' && '✅'}
                {toast.type === 'error' && '⚠️'}
                {toast.type === 'warning' && '⚡'}
                {toast.type === 'info' && '💡'}
              </span>
              <p className="text-xs font-extrabold tracking-wide leading-snug">{toast.title}</p>
            </div>
            <button
              type="button"
              className="text-slate-400 hover:text-slate-700 dark:hover:text-white text-xs font-bold p-1 transition-colors"
              aria-label="Close notification"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
