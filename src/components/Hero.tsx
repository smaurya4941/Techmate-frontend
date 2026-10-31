'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { SITE } from '@/lib/site-config';

interface HeroSlide {
  id: number;
  image: string;
  alt: string;
  badge: string;
  subtitle: string;
}

const HERO_SLIDES: readonly HeroSlide[] = [
  {
    id: 1,
    image: '/images/hero-executive.jpg',
    alt: 'Professional commercial kitchen consultation and engineering with Techmate Industries',
    badge: 'Turnkey Food Facility Engineering',
    subtitle: 'Professional Kitchen & Bakery Equipment Solutions',
  },
  {
    id: 2,
    image: '/images/case-hotel-kitchen.jpg',
    alt: 'Heavy-duty AISI 304 commercial cooking suites, ranges and stainless steel fabrication',
    badge: 'Commercial Cooking & Heavy Fabrication',
    subtitle: 'Engineered for High-Volume Banquets, 5-Star Hotels & Cloud Kitchens',
  },
  {
    id: 3,
    image: '/images/case-bakery-plant.jpg',
    alt: 'Industrial bakery machinery, automated rotary rack ovens and dough processing lines',
    badge: 'Industrial Bakery & Food Processing',
    subtitle: 'Automated Rotary Rack Ovens, Mixers & High-Yield Production Lines',
  },
] as const;

const SLIDE_DURATION_MS = 5000;

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = HERO_SLIDES.length;

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  // Continuous auto-slide every 5 seconds (does not pause on hover)
  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, SLIDE_DURATION_MS);

    return () => clearInterval(timer);
  }, [goToNext]);

  // Slide animation variants (Directional slide with smooth fade & subtle zoom drift)
  const slideVariants: Variants = {
    enter: {
      x: '100%',
      opacity: 0,
      scale: 1.05,
    },
    center: {
      x: '0%',
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 240, damping: 28 },
        opacity: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
        scale: { duration: 5.5, ease: 'easeOut' }, // Subtle Ken Burns drift
      },
    },
    exit: {
      x: '-100%',
      opacity: 0,
      scale: 1.02,
      transition: {
        x: { type: 'spring' as const, stiffness: 240, damping: 28 },
        opacity: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
      },
    },
  };

  const activeSlideData = HERO_SLIDES[currentSlide];

  return (
    <section
      className="relative min-h-[92vh] sm:min-h-[96vh] flex items-center justify-start overflow-hidden pt-28 pb-20 bg-[#0B1A2C]"
      id="hero"
      aria-label="Hero showcase"
    >
      {/* 1. Full-Bleed 3-Image Slider Background (Slides automatically every 5 seconds) */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={activeSlideData.image}
              alt={activeSlideData.alt}
              fill
              priority={currentSlide === 0}
              sizes="100vw"
              className="object-cover object-right lg:object-center brightness-[0.88]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic gradient scrims for contrast (placed above images, below text) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1A2C]/95 via-[#0B1A2C]/80 to-[#0B1A2C]/35 z-[1] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A2C] via-transparent to-transparent opacity-85 z-[1] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(23,74,131,0.25),transparent_70%)] z-[1] pointer-events-none" />
      </div>

      {/* 2. Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="max-w-3xl pt-12 sm:pt-20 lg:pt-24">
          
          {/* Dynamic Category Pill Badge that smoothly updates per slide */}
          <div className="min-h-[34px] mb-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlideData.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-[#D62836] animate-pulse" />
                <span>{activeSlideData.badge}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Main Hero Title (Flagship Techmate Identity) */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white leading-[1.05] mb-5 font-heading uppercase"
          >
            Technifying
            <br />
            Your Kitchen
          </motion.h1>

          {/* Dynamic Slide Subtitle */}
          <div className="min-h-[56px] sm:min-h-[48px] mb-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeSlideData.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-sm sm:text-base lg:text-lg text-gray-200 max-w-xl leading-relaxed font-normal"
              >
                {activeSlideData.subtitle}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={SITE.primaryCta.href}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#D62836] hover:bg-[#b81d29] text-white font-bold transition-all text-sm tracking-wide shadow-xl shadow-[#D62836]/30"
              >
                <span>{SITE.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/products"
                className="inline-flex items-center px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur-md border border-white/25 transition-all text-xs tracking-wider uppercase gap-2"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-300" />
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
