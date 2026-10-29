'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Compass, Wrench, GraduationCap, Headphones, Settings, ArrowRight } from 'lucide-react';
import { FadeIn, StaggerGroup, StaggerItem, HoverCard } from '@/components/animations/MotionWrapper';
import { SITE } from '@/lib/site-config';

const POINTS = [
  {
    title: 'Authorised Brands',
    description:
      'Equipment from leading international brands, supplied and supported by Techmate as an authorised partner.',
    href: '/brands',
    icon: Award,
  },
  {
    title: 'Expert Consultation',
    description:
      'Understand requirements and recommend the right equipment and configuration.',
    href: '/services#consultation',
    icon: Compass,
  },
  {
    title: 'Installation',
    description:
      'Professional installation and equipment commissioning.',
    href: '/services#installation',
    icon: Wrench,
  },
  {
    title: 'Training',
    description:
      'Equipment operation, best practices and user training.',
    href: '/services#training',
    icon: GraduationCap,
  },
  {
    title: 'Service',
    description:
      'Preventive maintenance, breakdown service, technical support and annual maintenance contracts.',
    href: '/services#maintenance',
    icon: Headphones,
  },
  {
    title: 'Genuine Spares',
    description:
      'Supply of genuine equipment spare parts.',
    href: '/services#spares',
    icon: Settings,
  },
];

export function WhyChooseUs() {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  return (
    <section className="py-20 lg:py-28 bg-[#F8FAFC] px-6 sm:px-8 border-t border-b border-gray-200/80 relative overflow-hidden" id="why-us">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Arched Image Mask with Overlapping Geometric Accents (Fade In Left) */}
          <div className="lg:col-span-5 flex justify-center relative w-full">
            <FadeIn direction="left" distance={40} className="w-full max-w-sm sm:max-w-md">
              <div className="relative w-full">
                {/* Top-Left Soft Grey Ring Accent */}
                <div className="absolute -top-10 -left-6 sm:left-4 w-36 h-36 rounded-full border-[22px] border-[#E2E8F0] -z-0 pointer-events-none opacity-80" />

                {/* Top Apex Triangle Accent */}
                <div className="absolute -top-4 left-1/3 -translate-x-1/2 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-[#174A83] -z-0 pointer-events-none drop-shadow-sm" />

                {/* Arch-Mask Container with Photographic Portrait */}
                <div className="relative z-10 w-full arch-mask overflow-hidden border border-gray-200 shadow-xl bg-white aspect-[3/4] group">
                  <Image
                    src="/images/why-choose-arch.jpg"
                    alt="Techmate project engineers and consultants"
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102B46]/60 via-transparent to-transparent opacity-40" />
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Pill Badge, Headline and the six Techmate promises */}
          <div className="lg:col-span-7 space-y-8">
            <FadeIn direction="up">
              <div>
                <span className="inline-block px-3.5 py-1 rounded-full bg-white text-[11px] font-bold tracking-widest text-[#174A83] uppercase border border-gray-200 shadow-sm mb-5">
                  WHY TECHMATE
                </span>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102B46] tracking-tight leading-[1.15] font-heading">
                  From First Sketch<br />
                  <span className="text-[#174A83] font-extrabold">To Every Service Call</span>
                </h2>
              </div>
            </FadeIn>

            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4" staggerDelay={0.08}>
              {POINTS.map((point, index) => {
                const isActive = activeCardIndex === index;
                const Icon = point.icon;
                return (
                  <StaggerItem key={point.title}>
                    <HoverCard yOffset={-4} scale={1.01}>
                      <Link
                        href={point.href}
                        onMouseEnter={() => setActiveCardIndex(index)}
                        onFocus={() => setActiveCardIndex(index)}
                        className={`block h-full p-6 rounded-[26px] transition-all duration-300 group border ${
                          isActive
                            ? 'bg-white border-2 border-[#174A83] shadow-lg shadow-blue-900/10'
                            : 'bg-white border-gray-200/90 hover:border-[#174A83]/50 shadow-sm hover:shadow-md'
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-all ${
                            isActive
                              ? 'bg-[#174A83] text-white shadow-md'
                              : 'bg-[#F3F6FA] border border-gray-200 text-[#174A83]'
                          }`}
                        >
                          <Icon className="w-6 h-6" aria-hidden="true" />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold font-heading text-[#102B46] mb-2 group-hover:text-[#174A83] transition-colors">
                          {point.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">{point.description}</p>
                      </Link>
                    </HoverCard>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>

            <FadeIn direction="up">
              <Link
                href={SITE.primaryCta.href}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#D62836] hover:bg-[#b81d29] text-white text-sm font-bold transition shadow-lg shadow-[#D62836]/25"
              >
                <span>{SITE.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}
