'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/animations/MotionWrapper';
import { motion } from 'framer-motion';
import { PROJECTS_DATA } from '@/lib/projects-data';

export function CaseStudiesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const caseStudies = PROJECTS_DATA.map((project, index) => ({
    id: index + 1,
    slug: project.slug,
    badge: project.badge,
    title: project.title,
    description: project.summary,
    image: project.image,
    category: project.category,
    stats: project.metrics.map((m) => `${m.value} ${m.label}`).join(' • '),
  }));

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.clientWidth / 2;
    if (direction === 'left') {
      scrollRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      setScrollIndex((prev) => Math.max(0, prev - 1));
    } else {
      scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
      setScrollIndex((prev) => Math.min(caseStudies.length - 1, prev + 1));
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-[#08090a] px-6 sm:px-8 border-t border-white/5 relative overflow-hidden" id="case-studies">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Header: Badge, Headline, Paragraph Description & Navigation Arrows (Fade In) */}
        <FadeIn direction="up">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4">
            <div className="space-y-4 max-w-xl">
              {/* Pill Badge */}
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#181d28] text-[11px] font-bold tracking-widest text-gray-300 uppercase border border-white/10">
                CASE STUDIES
              </span>

              {/* Headline with Highlighted Phrase */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] font-heading">
                Explore Our Insightful<br />
                <span className="text-lime-400 sm:text-blue-400 font-extrabold">Case Studies</span>
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between lg:justify-end gap-6 lg:max-w-xl">
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-md">
                Working with Techmate turnkey engineering gives you complete peace of mind in knowing that your kitchen operations are safe, compliant, and optimized for high volume.
              </p>

              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-blue-300 transition-colors shrink-0"
              >
                <span>View all projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {/* Circular Carousel Controls */}
              <div className="flex items-center gap-3 shrink-0">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleScroll('left')}
                  className="w-12 h-12 rounded-full border border-white/20 hover:border-white/40 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                  aria-label="Previous Case Study"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleScroll('right')}
                  className="w-12 h-12 rounded-full border border-white/20 hover:border-white/40 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                  aria-label="Next Case Study"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 4 Interactive Photo Cards with Staggered Entrance */}
        <div
          ref={scrollRef}
          className="no-scrollbar overflow-x-auto scroll-smooth pt-2"
        >
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 min-w-full" staggerDelay={0.1}>
            {caseStudies.map((item) => (
              <StaggerItem key={item.id}>
                <Link
                  href={`/projects/${item.slug}`}
                  className="h-[480px] sm:h-[520px] rounded-3xl overflow-hidden relative group cursor-pointer border border-white/10 shadow-2xl block bg-[#11141c]"
                >
                  {/* Photographic Background Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    priority={item.id <= 2}
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />

                  {/* Ambient Bottom Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-500 group-hover:from-black/95 group-hover:via-black/75" />

                  {/* Static Top Category Badge */}
                  <div className="absolute top-5 left-5 z-20">
                    <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-[10px] font-mono font-bold uppercase tracking-wider text-gray-300 border border-white/10">
                      {item.category}
                    </span>
                  </div>

                  {/* Animated Text Container: Slides up from bottom upon hover */}
                  <div className="absolute bottom-0 inset-x-0 p-6 sm:p-7 z-20 flex flex-col justify-end transition-all duration-500 ease-out">
                    <div className="overflow-hidden mb-2.5">
                      <span className="inline-block px-3.5 py-1 rounded-full bg-lime-400 sm:bg-[#174A83] text-[10px] font-black uppercase tracking-wider text-black sm:text-white shadow-md transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white font-heading leading-tight drop-shadow-md mb-2 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-400 ease-out">
                      {item.title}
                    </h3>

                    <p className="text-xs text-gray-300 leading-relaxed line-clamp-3 max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transform translate-y-6 group-hover:translate-y-0 transition-all duration-500 delay-75 ease-out">
                      {item.description}
                    </p>

                    <div className="pt-3 flex items-center justify-between text-xs font-bold text-lime-400 sm:text-blue-300 group-hover:text-white transition-colors transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 ease-out">
                      <span className="inline-flex items-center gap-1.5">
                        <span>View Project</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <span className="text-[11px] font-mono text-gray-400 font-normal">
                        {item.stats}
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

      </div>
    </section>
  );
}
