'use client';

import React from 'react';
import { Award, Shield, Zap, Wrench, Factory } from 'lucide-react';

export function MarqueeTicker() {
  const items = [
    { text: 'ISO 9001:2015 CERTIFIED', icon: Award },
    { text: '100% FOOD-GRADE AISI 304 STAINLESS STEEL', icon: Shield },
    { text: 'EUROPEAN COMPRESSORS (35% ENERGY SAVINGS)', icon: Zap },
    { text: 'TURNKEY KITCHEN & MEP CAD ENGINEERING', icon: Wrench },
    { text: '65,000 SQ.FT. CNC MANUFACTURING PLANT', icon: Factory },
    { text: '24/7 PAN-INDIA EMERGENCY FIELD SERVICE', icon: Shield },
  ];

  return (
    <div className="bg-[#174A83] text-white py-4 overflow-hidden border-y border-blue-900/40 relative shadow-inner">
      <div className="flex animate-marquee whitespace-nowrap">
        {/* Sequence 1 */}
        <div className="flex items-center space-x-8 shrink-0 pr-8">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`a-${idx}`}
                className="flex items-center space-x-3 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-blue-100"
              >
                <Icon className="w-4 h-4 text-[#D62836]" />
                <span>{item.text}</span>
                <span className="text-blue-300 font-bold">•</span>
              </div>
            );
          })}
        </div>

        {/* Sequence 2 for seamless loop */}
        <div className="flex items-center space-x-8 shrink-0 pr-8">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`b-${idx}`}
                className="flex items-center space-x-3 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-blue-100"
              >
                <Icon className="w-4 h-4 text-[#D62836]" />
                <span>{item.text}</span>
                <span className="text-blue-300 font-bold">•</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
