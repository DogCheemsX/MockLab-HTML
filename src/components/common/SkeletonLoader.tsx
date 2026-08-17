import React from 'react';

export const CardSkeleton: React.FC = () => {
  return (
    <div className="w-full glass-card rounded-2xl p-5 border border-slate-800 animate-pulse space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-slate-800/80"></div>
          <div className="space-y-2">
            <div className="h-4 w-40 bg-slate-800/90 rounded-md"></div>
            <div className="h-3 w-28 bg-slate-800/60 rounded-md"></div>
          </div>
        </div>
        <div className="h-6 w-20 bg-slate-800/80 rounded-full"></div>
      </div>
    </div>
  );
};

export const FormSkeleton: React.FC = () => {
  return (
    <div className="w-full glass-panel rounded-3xl p-6 sm:p-8 space-y-6 animate-pulse">
      <div className="h-4 w-32 bg-slate-800/80 rounded-md"></div>
      <div className="h-11 w-full bg-slate-900/80 rounded-xl border border-slate-800"></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-11 bg-slate-900/80 rounded-xl border border-slate-800"></div>
        <div className="h-11 bg-slate-900/80 rounded-xl border border-slate-800"></div>
      </div>
      <div className="h-12 w-full bg-indigo-600/30 rounded-2xl"></div>
    </div>
  );
};

export const PageSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-3xl space-y-6 py-6 animate-pulse">
      <div className="h-6 w-36 bg-slate-800/80 rounded-lg mx-auto mb-4"></div>
      <div className="h-8 w-64 bg-slate-800/90 rounded-xl mx-auto mb-8"></div>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
};
