import React from 'react';

export function HealthCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 md:p-8 backdrop-blur-sm shadow-xl animate-pulse">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-3">
            <div className="h-6 w-56 bg-slate-800 rounded" />
            <div className="h-5 w-24 bg-slate-800 rounded-full" />
          </div>
          <div className="h-4 w-72 bg-slate-800/60 rounded mt-2" />
        </div>
        <div className="h-8 w-20 bg-slate-800 rounded" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-lg bg-slate-950/60 p-4 border border-slate-800/80">
            <div className="h-3 w-20 bg-slate-800/70 rounded mb-2" />
            <div className="h-4 w-32 bg-slate-800 rounded" />
          </div>
        ))}
      </div>

      <div className="h-24 bg-slate-950/80 border border-slate-800 rounded-xl" />
    </div>
  );
}
