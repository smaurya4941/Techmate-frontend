'use client';

import React from 'react';
import Link from 'next/link';
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/animations/MotionWrapper';
import { motion } from 'framer-motion';

export function MetricsTicker() {
  const ribbons = [
    { label: 'FINANCIAL & COMMERCIAL COOKING', href: '/products?category=cooking', highlight: true },
    { label: 'STRATEGIC BAKERY MACHINERY', href: '/products?category=bakery-baking', highlight: false },
    { label: 'REFRIGERATION & TURNKEY PLANNING', href: '/products?category=refrigeration', highlight: false },
  ];

  const statistics = [
    { value: '450+', label: 'SESSION COMPLETED / MODELS' },
    { value: '35+', label: 'REGIONAL OPERATIONS' },
    { value: '26', label: 'EXPERT CONSULTANTS' },
    { value: '100%', label: 'HAPPY CLIENTS' },
  ];

  return (
    <div className="w-full relative z-20">
      {/* 1. Category Consultation Ribbon */}
      <section className="bg-[#0e1014] border-t border-b border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <FadeIn direction="none" duration={0.6}>
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
              {ribbons.map((item, idx) => (
                <div key={idx} className="py-2.5 md:py-1 px-4 flex items-center justify-center">
                  <Link
                    href={item.href}
                    className={`text-xs sm:text-sm font-extrabold tracking-widest uppercase transition-colors flex items-center gap-2 ${
                      item.highlight
                        ? 'text-[#174A83] sm:text-blue-400 hover:text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.highlight && (
                      <span className="w-2 h-2 rounded-full bg-[#D62836] animate-pulse" />
                    )}
                    <span>{item.label}</span>
                  </Link>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. High-Impact Statistics Banner with Cascading Numbers */}
      <section className="bg-[#174A83] text-white py-16 px-6 sm:px-8 shadow-2xl relative overflow-hidden">
        {/* Subtle radial inner glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-transparent to-blue-900/40 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center" staggerDelay={0.12}>
            {statistics.map((stat, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="flex flex-col items-center cursor-default"
                >
                  <span className="text-5xl lg:text-6xl font-black tracking-tight mb-2 text-white font-heading">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold tracking-wider uppercase text-blue-100">
                    {stat.label}
                  </span>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </div>
  );
}
