import React from 'react';

export function ArchitectureOverview() {
  const pillars = [
    {
      title: 'Frontend Presentation',
      framework: 'Next.js App Router & TypeScript',
      description: 'Server Components by default, Tailwind CSS styling, strict type-checking, and zero secrets exposed.',
      status: 'Active & Verified',
      accent: 'border-cyan-500/30 text-cyan-400',
    },
    {
      title: 'Backend API Service',
      framework: 'Laravel REST API (PHP 8.2+)',
      description: 'Centralized route dispatching, Form Request validation, API Resources, and CORS isolation.',
      status: 'Active & Verified',
      accent: 'border-red-500/30 text-red-400',
    },
    {
      title: 'Persistence Engine',
      framework: 'MySQL 8 (utf8mb4)',
      description: 'Database techmate_db running on port 3308 with automated schema migrations.',
      status: 'Active & Migrated',
      accent: 'border-amber-500/30 text-amber-400',
    },
  ];

  const categories = [
    {
      name: 'Commercial Kitchen Equipment',
      items: 'Ranges, Fryers, Combi Ovens, Prep Counters, Exhausts',
      badge: 'B2B Core',
    },
    {
      name: 'Bakery & Pastry Machinery',
      items: 'Planetary & Spiral Mixers, Rotary Racks, Dough Sheeters',
      badge: 'Production Grade',
    },
    {
      name: 'Commercial Refrigeration',
      items: 'Reach-In Chillers, Undercounter Freezers, Blast Freezers',
      badge: 'Cold Chain',
    },
  ];

  return (
    <div className="space-y-8 mt-8">
      {/* Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className={`rounded-2xl border bg-slate-900/40 p-6 backdrop-blur-sm shadow-lg ${pillar.accent}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider font-mono text-slate-400">
                {pillar.title}
              </span>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                {pillar.status}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{pillar.framework}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{pillar.description}</p>
          </div>
        ))}
      </div>

      {/* Domain Scope Preview */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 md:p-8">
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold block">
            Business Domain Foundation
          </span>
          <h3 className="text-xl font-bold text-white mt-1">
            Commercial Equipment Catalogue Readiness
          </h3>
          <p className="text-sm text-slate-400 mt-2">
            The Phase 1 architecture is engineered to scale directly into full product cataloguing,
            technical specification sheets, brochure distribution, and B2B quotation workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition-colors hover:border-slate-700"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-200">{cat.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-amber-400 border border-slate-700/60">
                  {cat.badge}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">{cat.items}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
