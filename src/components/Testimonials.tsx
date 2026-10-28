'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FadeIn } from '@/components/animations/MotionWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { GOOGLE_REVIEWS_URL } from '@/lib/site-config';

export function Testimonials() {
  const testimonials = [
    {
      id: 0,
      quote:
        '“I saved over 50% using Techmate turnkey equipment over my hotel chain. The customer support staff was very helpful. I will definitely be using Techmate for all my future kitchen expansions. Thank you !!!”',
      name: 'Eric Stocklin',
      role: 'Director, PRP Hospitality Group',
      avatar: '/images/testimonial-avatar-eric.jpg',
    },
    {
      id: 1,
      quote:
        '“The thermal precision of Techmate 10GN combi ovens and 6-burner ranges during 1,000-cover banquet services is astonishing. Seamless AISI 304 joints make daily sanitation effortless.”',
      name: 'Chef Sanjeev Nambiar',
      role: 'Culinary Director, Grand Horizon Suites',
      avatar: '/images/testimonial-avatar-eric.jpg',
    },
    {
      id: 2,
      quote:
        '“Rolling out 24 commissary hubs across Maharashtra seemed daunting until we partnered with Techmate. Their modular prep lines and rapid equipment delivery cut our launch timeline by 6 weeks.”',
      name: 'Pooja Deshmukh',
      role: 'VP of Infrastructure, FreshBox Cloud Hubs',
      avatar: '/images/testimonial-avatar-eric.jpg',
    },
    {
      id: 3,
      quote:
        '“Our 120-tray rotary rack ovens and heavy-duty spiral mixers run 18 hours daily without a hiccup. Techmate’s factory AMC support gives our operations absolute peace of mind.”',
      name: 'Rajesh Singhal',
      role: 'Managing Partner, Artisan Crust Bakery',
      avatar: '/images/testimonial-avatar-eric.jpg',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const current = testimonials[currentIndex];

  return (
    <section className="py-20 lg:py-28 bg-[#08090a] px-6 sm:px-8 border-t border-white/5 relative overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Full-Bleed Executive Woman Portrait (Fade In Left) */}
          <div className="lg:col-span-5 flex justify-center">
            <FadeIn direction="left" distance={40}>
              <div className="relative w-full max-w-md lg:max-w-none rounded-[32px] overflow-hidden border border-white/10 shadow-2xl aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] group">
                <Image
                  src="/images/testimonial-exec-woman.jpg"
                  alt="Techmate Client and Facility Director"
                  fill
                  priority
                  className="object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Pill Badge, Headline, Large Quote Mark, Testimonial Box & Dots (Fade In Right) */}
          <div className="lg:col-span-7 space-y-8 relative">
            <FadeIn direction="right" delay={0.15} distance={40}>
              {/* Top Row: Left Header & Right Decorative Big Quotation Mark */}
              <div className="flex items-start justify-between gap-6 relative">
                <div className="space-y-4 max-w-lg z-10">
                  <span className="inline-block px-3.5 py-1 rounded-full bg-[#181d28] text-[11px] font-bold tracking-widest text-gray-300 uppercase border border-white/10">
                    CUSTOMER REVIEWS
                  </span>

                  <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.12] font-heading">
                    What Our Customers<br />
                    Say
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-normal pt-1">
                    Hotels, bakeries and cloud kitchens share their experience working with Techmate.
                  </p>

                  {GOOGLE_REVIEWS_URL && (
                    <a
                      href={GOOGLE_REVIEWS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-blue-300 hover:text-white transition-colors pt-2"
                    >
                      <span>Read our Google reviews</span>
                      <span aria-hidden="true">→</span>
                    </a>
                  )}
                </div>

                {/* Large Double Quotation Mark */}
                <div className="text-lime-500/25 sm:text-[#566e2c] select-none pointer-events-none text-7xl sm:text-8xl lg:text-9xl font-serif font-black shrink-0 leading-none -mt-4">
                  ”
                </div>
              </div>

              {/* Testimonial Quote Box with AnimatePresence */}
              <div className="rounded-2xl bg-[#121620] border border-white/10 p-7 sm:p-9 shadow-2xl relative z-10 min-h-[140px] flex items-center mt-6">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal"
                  >
                    {current.quote}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Bottom Row: Author Profile & Interactive Carousel Dots */}
              <div className="flex items-center justify-between pt-6">
                {/* Author Avatar & Metadata */}
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-white/15 shrink-0 shadow-lg bg-[#141822]">
                    <Image
                      src={current.avatar}
                      alt={current.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white font-heading leading-tight">
                      {current.name}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">
                      {current.role}
                    </p>
                  </div>
                </div>

                {/* 4 Interactive Carousel Dots */}
                <div className="flex items-center gap-2.5">
                  {testimonials.map((item, idx) => {
                    const isActive = currentIndex === idx;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setCurrentIndex(idx)}
                        className={`transition-all duration-300 rounded-full ${
                          isActive
                            ? 'w-3.5 h-3.5 bg-transparent border-2 border-white scale-110'
                            : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
                        }`}
                        aria-label={`Switch to testimonial ${idx + 1}`}
                      />
                    );
                  })}
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}
