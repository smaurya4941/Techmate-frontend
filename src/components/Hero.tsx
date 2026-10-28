'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { SITE } from '@/lib/site-config';

export function Hero() {
  return (
    <section
      className="relative min-h-[92vh] sm:min-h-[96vh] flex items-center justify-start overflow-hidden pt-28 pb-20 bg-[#08090a]"
      id="hero"
    >
      {/* 1. Full-Bleed Background Image with Subtle Atmospheric Zoom on Mount */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0 z-0 select-none"
      >
        <Image
          src="/images/hero-executive.jpg"
          alt="Professional commercial kitchen consultation with Techmate Industries"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right lg:object-center brightness-[0.88] scale-100"
        />

        {/* Cinematic gradient scrims for contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090a] via-transparent to-transparent opacity-80" />
      </motion.div>

      {/* 2. Main Content Container with Staggered Entrance */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="max-w-2xl pt-16 sm:pt-24 lg:pt-28">
          
          {/* Main Hero Title (Fades & Slides Up) */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white leading-[1.05] mb-6 font-heading uppercase"
          >
            Technifying
            <br />
            Your Kitchen
          </motion.h1>

          {/* Hero Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-sm sm:text-base lg:text-lg text-gray-200 mb-9 max-w-lg leading-relaxed font-normal"
          >
            Professional Kitchen &amp; Bakery Equipment Solutions
          </motion.p>

          {/* CTA Buttons with Spring Physics on Hover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={SITE.primaryCta.href}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#D62836] hover:bg-[#b81d29] text-white font-bold transition-colors text-sm tracking-wide shadow-xl shadow-[#D62836]/30"
              >
                <span>{SITE.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/products"
                className="inline-flex items-center px-6 py-3.5 rounded-xl bg-black/40 hover:bg-black/60 text-gray-200 hover:text-white font-medium backdrop-blur-md border border-white/10 transition-colors text-xs tracking-wider uppercase gap-2"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
