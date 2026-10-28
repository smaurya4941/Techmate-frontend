'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/animations/MotionWrapper';
import { motion } from 'framer-motion';

export function SplitCtaBanner() {
  return (
    <section className="py-20 lg:py-28 bg-[#08090a] px-6 sm:px-8 border-t border-white/5 relative overflow-hidden" id="cta-banner">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-[36px] overflow-hidden bg-[#0d1017] border border-white/10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-center min-h-[500px]">
          
          {/* Left Column: Full-Bleed Photographic Composition (Fade In Left) */}
          <div className="lg:col-span-6 relative w-full h-[400px] sm:h-[480px] lg:h-full min-h-[440px]">
            <FadeIn direction="left" distance={40} className="w-full h-full">
              <div className="relative w-full h-[400px] sm:h-[480px] lg:h-full min-h-[440px]">
                <Image
                  src="/images/cta-split-execs.jpg"
                  alt="Techmate Senior Project Consultants and Facility Planners"
                  fill
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/40 via-transparent to-[#0d1017]/80" />
              </div>
            </FadeIn>
          </div>

          {/* Right Column: High-Impact Rounded CTA Card (Fade In Right) */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 relative z-10 flex justify-center lg:justify-end">
            <FadeIn direction="right" delay={0.15} distance={40}>
              <div className="w-full max-w-lg rounded-[32px] p-8 sm:p-12 shadow-2xl flex flex-col justify-between space-y-6 bg-[#174A83] text-white border border-white/10 relative overflow-hidden">
                
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 80% 20%, #ffffff 0%, transparent 60%)',
                  }}
                />

                <div className="relative z-10 space-y-4">
                  <span className="inline-block px-3.5 py-1 rounded-full bg-white/15 text-[10px] font-mono font-bold tracking-widest text-white uppercase border border-white/20">
                    TURNKEY ADVISORY
                  </span>

                  <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-[1.12] font-heading">
                    Empowering Smarter Kitchen Decisions
                  </h2>

                  <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed font-normal pt-2">
                    We specialize in engineering durable, high-efficiency culinary spaces that not only captivate your chefs and staff but also drive sustainable growth for your hospitality brand.
                  </p>
                </div>

                {/* "Contact Us" Button */}
                <div className="pt-2 relative z-10">
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-block">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center px-9 py-4 rounded-xl bg-[#0a0d14] hover:bg-[#121622] text-white font-bold text-sm tracking-wide shadow-xl transition-all border border-white/10"
                    >
                      <span>Contact Us</span>
                      <ArrowRight className="w-4 h-4 ml-2.5 text-blue-300" />
                    </Link>
                  </motion.div>
                </div>

              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}
