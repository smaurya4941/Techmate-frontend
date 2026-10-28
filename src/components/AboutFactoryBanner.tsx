'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  CheckCircle2,
  Play,
  Phone,
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
    <section className="py-20 lg:py-28 bg-[#08090a] px-6 sm:px-8 border-t border-white/5 relative overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column (Fade In from Left) */}
          <div className="lg:col-span-6 space-y-8">
            <FadeIn direction="left">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#181d28] text-[11px] font-bold tracking-widest text-gray-400 uppercase border border-white/10">
                MANUFACTURING &amp; CONSULTANCY
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.16] font-heading mt-4">
                We Do Engineering For Developing An Effective Food Facility Culture
              </h2>

              {/* Stat & Description Row */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 pt-4">
                <div className="shrink-0">
                  <div className="text-4xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
                    65K+
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-gray-400 font-bold mt-1">
                    SQ.FT. PLANT MIDC
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-sm pt-1">
                  Giving turnkey engineering for every commercial kitchen projection, equipment sizing, and layout analysis for hospitality projects across India.
                </p>
              </div>

              {/* Feature Card with Video Thumbnail & Checklist */}
              <div className="bg-[#12141c] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col sm:flex-row items-center gap-6 mt-8">
                {/* Video Thumbnail */}
                <div
                  onClick={() => setIsVideoModalOpen(true)}
                  className="relative w-full sm:w-44 h-28 rounded-xl overflow-hidden cursor-pointer group shrink-0 border border-white/10 shadow-lg"
                >
                  <Image
                    src="/images/about-video-thumb.jpg"
                    alt="Techmate Consultation Overview"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors" />
                  
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
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-gray-200">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Row: CTA Button + Phone Help */}
              <div className="flex flex-wrap items-center gap-6 pt-6">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-[#174A83] hover:bg-[#123a67] text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-900/40 transition-colors"
                  >
                    Contact Us
                  </Link>
                </motion.div>

                <div className="flex items-center gap-3">
                  <a
                    href="tel:+912227788900"
                    className="w-12 h-12 rounded-full bg-[#181d28] border border-white/10 flex items-center justify-center text-white hover:border-white/30 transition-all shrink-0"
                    aria-label="Call Techmate Factory Desk"
                  >
                    <Phone className="w-5 h-5 text-gray-300" />
                  </a>
                  <div className="text-left">
                    <span className="text-xs text-blue-400 font-semibold block leading-tight">
                      Have Any Questions?
                    </span>
                    <a
                      href="tel:+912227788900"
                      className="text-sm sm:text-base font-bold text-white hover:text-blue-300 transition-colors font-heading tracking-wide"
                    >
                      +91 (022) 2778-8900
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Full-Height Boardroom Photographic Showcase (Fade In from Right) */}
          <div className="lg:col-span-6 flex justify-center">
            <FadeIn direction="right" delay={0.15}>
              <div className="relative w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/3] sm:aspect-square lg:aspect-[4/3] group">
                <Image
                  src="/images/about-team-meeting.jpg"
                  alt="Techmate Project Engineers and Executive Team in Boardroom Consultation"
                  fill
                  priority
                  className="object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
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
                    Visit our 65,000 sq.ft. facility at Plot C-48, TTC Industrial Area, MIDC Pawane, Navi Mumbai to inspect live machinery and CNC fabrication.
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
