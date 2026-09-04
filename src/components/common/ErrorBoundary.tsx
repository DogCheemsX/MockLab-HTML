import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in MockLab UI:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // Check if student has an un-submitted active test session in storage
      let hasActiveTest = false;
      let testName = 'Active Test';
      try {
        const raw = localStorage.getItem('mocklab_active_session') || sessionStorage.getItem('mocklab_active_session');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && !parsed.completed && parsed.activeQuestions?.length > 0) {
            hasActiveTest = true;
            if (parsed.typeName) testName = parsed.typeName;
          }
        }
      } catch (e) {}

      return (
        <div className="w-full max-w-xl mx-auto my-12 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-rose-200 dark:border-rose-500/40 shadow-2xl text-left relative overflow-hidden animate-page-enter">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-36 h-36 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 flex items-center justify-center font-black text-2xl shrink-0">
              ⚠️
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-600 dark:text-rose-400">
                UNHANDLED RUNTIME RECOVERY
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                An Error Occurred
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium mb-6 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 font-mono">
            {this.state.error?.message || 'An unexpected rendering error occurred. Your test progress is safely saved.'}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {hasActiveTest && (
              <button
                type="button"
                onClick={() => {
                  window.location.href = '/test-runner';
                }}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm py-3.5 px-5 rounded-xl shadow-glow-emerald transition-all flex items-center justify-center gap-2 border border-emerald-400/30"
              >
                <span>⚡ Resume {testName}</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm py-3.5 px-5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 border border-indigo-400/30"
            >
              <span>🔄 Reload Page</span>
            </button>

            <button
              type="button"
              onClick={() => {
                window.location.href = '/';
              }}
              className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm py-3.5 px-5 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <span>🏠 Home</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
