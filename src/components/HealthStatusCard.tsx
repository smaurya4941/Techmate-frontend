import React from 'react';
import type { ApiHealthResult } from '@/types/api';

interface HealthStatusCardProps {
  health: ApiHealthResult;
  apiBaseUrl: string;
}

export function HealthStatusCard({ health, apiBaseUrl }: HealthStatusCardProps) {
  const isOnline = health.isOnline;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 md:p-8 backdrop-blur-sm shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Backend Connectivity Status
            </h2>
            <span
              className={`inline-flex items-center gap-x-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                isOnline
                  ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/30'
                  : 'bg-rose-500/10 text-rose-400 ring-1 ring-inset ring-rose-500/30'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
                }`}
              />
              {isOnline ? 'OPERATIONAL' : 'UNREACHABLE'}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-400">
            Real-time server-side diagnostic verification with the Laravel REST API service.
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs uppercase tracking-wider text-slate-500 font-mono block">
            ROUND-TRIP LATENCY
          </span>
          <span className="text-lg font-mono font-bold text-slate-200">
            {health.latencyMs} ms
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        <div className="rounded-lg bg-slate-950/60 p-4 border border-slate-800/80">
          <span className="text-xs text-slate-400 block font-mono">TARGET ENDPOINT</span>
          <span className="text-sm font-mono font-medium text-amber-400 truncate block mt-1">
            {apiBaseUrl}/health
          </span>
        </div>

        <div className="rounded-lg bg-slate-950/60 p-4 border border-slate-800/80">
          <span className="text-xs text-slate-400 block font-mono">HTTP STATUS</span>
          <span
            className={`text-sm font-mono font-semibold block mt-1 ${
              isOnline ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {health.statusCode ? `${health.statusCode} OK` : 'No Connection'}
          </span>
        </div>

        <div className="rounded-lg bg-slate-950/60 p-4 border border-slate-800/80">
          <span className="text-xs text-slate-400 block font-mono">REPORTED ENVIRONMENT</span>
          <span className="text-sm font-mono font-medium text-slate-300 block mt-1 capitalize">
            {health.data?.environment || 'Unknown'}
          </span>
        </div>

        <div className="rounded-lg bg-slate-950/60 p-4 border border-slate-800/80">
          <span className="text-xs text-slate-400 block font-mono">SERVICE APPLICATION</span>
          <span className="text-sm font-mono font-medium text-slate-300 block mt-1">
            {health.data?.application || 'Offline'}
          </span>
        </div>
      </div>

      {isOnline ? (
        <div className="rounded-xl bg-slate-950/80 border border-slate-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              Verified JSON Payload
            </span>
            <span className="text-xs font-mono text-emerald-400">Schema Validated</span>
          </div>
          <pre className="text-xs font-mono text-emerald-300 overflow-x-auto bg-slate-900/90 p-3 rounded-lg border border-slate-800/60">
            {JSON.stringify(health.data, null, 2)}
          </pre>
        </div>
      ) : (
        <div className="rounded-xl bg-rose-950/30 border border-rose-900/50 p-4">
          <div className="flex items-center space-x-2 text-rose-400 font-medium mb-1 text-sm">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>Backend Service Temporarily Unavailable</span>
          </div>
          <p className="text-xs text-rose-300/80 leading-relaxed mt-1">
            {health.errorMessage || 'Unable to establish TCP socket with backend on port 8000.'}
          </p>
          <div className="mt-3 text-xs text-slate-400 bg-slate-950/60 p-3 rounded-lg border border-slate-800/60">
            <span className="font-semibold text-slate-300 block mb-1">Recovery Checklist:</span>
            <ul className="list-disc list-inside space-y-0.5 text-slate-400">
              <li>Ensure the Laravel development server is running: <code className="text-amber-400 font-mono">php artisan serve --port=8000</code></li>
              <li>Ensure MySQL service is listening on port 3308 (or configured database port).</li>
              <li>Verify that <code className="text-amber-400 font-mono">frontend/.env.local</code> points to the active API base URL.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
