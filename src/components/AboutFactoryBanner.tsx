'use client';

import React, { useState } from 'react';
import { ADDRESS_ONE_LINE } from '@/lib/site-config';
import Image from 'next/image';
import Link from 'next/link';
import {
  CheckCircle2,
  Play,
  X,
  Factory,
  ArrowRight,
} from 'lucide-react';
import { FadeIn } from '@/components/animations/MotionWrapper';
import { motion, AnimatePresence } from 'framer-motion';

export function AboutFactoryBanner() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const checklistItems = [
    'AISI 304 Food-Grade Metallurgy',
    'Turnkey 2D/3D BIM Kitchen Layouts',
    'ISO 9001:2015 & CE Quality Certified',
    'Pan-India Warranty & Technical AMC',
  ];

  return (
    <section className="py-20 lg:py-28 bg-white px-6 sm:px-8 border-t border-gray-100 relative overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          
          {/* Left Column (Fade In from Left) */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            <FadeIn direction="left" className="h-full flex flex-col justify-between space-y-6">
              <div>
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#F3F6FA] text-[11px] font-bold tracking-widest text-[#174A83] uppercase border border-gray-200">
                  MANUFACTURING &amp; CONSULTANCY
                </span>

                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#102B46] tracking-tight leading-[1.18] font-heading mt-4">
                  We Do Engineering For Developing An Effective Food Facility Culture
                </h2>

                {/* Stat & Description Row */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 pt-4">
                  <div className="shrink-0">
                    <div className="text-4xl sm:text-5xl font-extrabold text-[#102B46] font-heading tracking-tight">
                      65K+
                    </div>
                    <div className="text-[11px] uppercase tracking-wider text-[#D62836] font-bold mt-1">
                      SQ.FT. PLANT MIDC
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[#475467] leading-relaxed max-w-sm pt-1">
                    Giving turnkey engineering for every commercial kitchen projection, equipment sizing, and layout analysis for hospitality projects across India.
                  </p>
                </div>
              </div>

              {/* Feature Card with Video Thumbnail & Checklist */}
              <div className="bg-[#F8FAFC] border border-gray-200/90 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center gap-6 mt-6">
                {/* Video Thumbnail */}
                <div
                  onClick={() => setIsVideoModalOpen(true)}
                  className="relative w-full sm:w-44 h-28 rounded-xl overflow-hidden cursor-pointer group shrink-0 border border-gray-200 shadow-sm bg-gray-100"
                >
                  <Image
                    src="/images/about-video-thumb.jpg"
                    alt="Techmate Consultation Overview"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />
                  
                  {/* Play Button */}
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-[#174A83] hover:bg-[#D62836] text-white flex items-center justify-center shadow-lg transition-colors"
                  >
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </motion.div>
                </div>

                {/* 4-Item Checklist */}
                <div className="w-full space-y-2.5">
                  {checklistItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-[#102B46]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Matched-Height Boardroom Photographic Showcase (Fade In from Right) */}
          <div className="lg:col-span-6 flex w-full h-full">
            <FadeIn direction="right" delay={0.15} className="w-full h-full flex">
              <div className="relative w-full h-full min-h-[380px] sm:min-h-[440px] rounded-3xl overflow-hidden border border-gray-200/90 shadow-xl group bg-gray-100">
                <Image
                  src="/images/about-team-meeting.jpg"
                  alt="Techmate Project Engineers and Executive Team in Boardroom Consultation"
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 90vw"
                  className="object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102B46]/40 via-transparent to-transparent opacity-40" />
              </div>
            </FadeIn>
          </div>

        </div>
      </div>

      {/* Video Modal Player with AnimatePresence */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="relative w-full max-w-3xl bg-[#11141c] rounded-2xl border border-white/15 overflow-hidden shadow-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="text-lg font-bold text-white font-heading">
                  Techmate Manufacturing &amp; Turnkey Facility Tour
                </h3>
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 flex items-center justify-center transition"
                  aria-label="Close video modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="aspect-video relative rounded-xl overflow-hidden mt-4 bg-black flex items-center justify-center">
                <Image
                  src="/images/about-team-meeting.jpg"
                  alt="Factory tour"
                  fill
                  className="object-cover opacity-75"
                />
                <div className="relative z-10 text-center space-y-2 p-6 bg-black/60 rounded-xl border border-white/10 backdrop-blur-sm max-w-md">
                  <Factory className="w-10 h-10 text-blue-400 mx-auto" />
                  <h4 className="text-white font-bold text-base">In-Person Factory Visits Welcomed</h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Visit us at {ADDRESS_ONE_LINE}.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/contact"
                      onClick={() => setIsVideoModalOpen(false)}
                      className="inline-flex items-center px-5 py-2 rounded-lg bg-[#174A83] text-white text-xs font-bold hover:bg-[#123a67] transition"
                    >
                      <span>Schedule Appointment</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
