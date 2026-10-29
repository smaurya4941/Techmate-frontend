'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Award,
  Compass,
  Wrench,
  GraduationCap,
  Headphones,
  Settings,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { FadeIn, StaggerGroup, StaggerItem, HoverCard } from '@/components/animations/MotionWrapper';
import { COMPANY } from '@/lib/site-config';

interface LifecyclePoint {
  step: string;
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const POINTS: LifecyclePoint[] = [
  {
    step: '01',
    title: 'Authorised Brands',
    description:
      'Direct partner for leading European and Asian commercial food-service manufacturers.',
    href: '/brands',
    icon: Award,
  },
  {
    step: '02',
    title: 'Expert Consultation',
    description:
      'Turnkey capacity planning, menu equipment matching, and workflow optimization.',
    href: '/services#consultation',
    icon: Compass,
  },
  {
    step: '03',
    title: 'Installation',
    description:
      'Factory-certified on-site assembly, electrical checks, and equipment commissioning.',
    href: '/services#installation',
    icon: Wrench,
  },
  {
    step: '04',
    title: 'Training',
    description:
      'Comprehensive hands-on training for kitchen crew on optimal usage and safety.',
    href: '/services#training',
    icon: GraduationCap,
  },
  {
    step: '05',
    title: 'Preventive Service',
    description:
      'Scheduled maintenance cycles, breakdown repairs, and dedicated hotline support.',
    href: '/services#maintenance',
    icon: Headphones,
  },
  {
    step: '06',
    title: 'Genuine Spares',
    description:
      'Ready inventory of authentic manufacturer parts to minimize equipment downtime.',
    href: '/services#spares',
    icon: Settings,
  },
];

export function WhyChooseUs() {
  return (
    <section
      className="py-20 lg:py-24 bg-[#F8FAFC] px-6 sm:px-8 border-t border-b border-gray-200/80 relative overflow-hidden"
      id="why-us"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Image with Equal Height to Right Side */}
          <div className="lg:col-span-4 flex flex-col h-full relative">
            <FadeIn direction="left" distance={30} className="w-full h-full flex flex-col">
              <div className="relative w-full h-full flex flex-col flex-1">
                {/* Ambient Soft Glow Behind Frame */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#174A83]/15 via-[#174A83]/5 to-transparent rounded-[44px] blur-2xl -z-10 pointer-events-none" />

                {/* Arch-Mask Container matching full height */}
                <div className="relative z-10 w-full flex-1 arch-mask rounded-b-[28px] overflow-hidden border border-gray-200 shadow-2xl bg-white group min-h-[420px] lg:min-h-0">
                  <Image
                    src="/images/why-choose-arch.jpg"
                    alt="Techmate commercial kitchen engineering team and consultants"
                    fill
                    sizes="(min-width: 1024px) 35vw, 90vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102B46]/70 via-transparent to-transparent opacity-60" />
                </div>

                {/* Top-Right Floating Trust Badge: Est. 2010 */}
                <div className="absolute -top-3 -right-2 sm:-right-4 z-20 bg-white/95 backdrop-blur-md border border-gray-200/90 rounded-2xl p-3 sm:p-3.5 shadow-xl shadow-[#102B46]/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#174A83] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#102B46] tracking-tight">
                      Est. {COMPANY.established} • 15+ Years
                    </span>
                    <span className="block text-[11px] font-medium text-gray-500">
                      Authorised OEM Partner
                    </span>
                  </div>
                </div>

                {/* Bottom-Left Floating Badge: Pan-India Network */}
                <div className="absolute -bottom-4 -left-2 sm:-left-4 z-20 bg-white/95 backdrop-blur-md border border-gray-200/90 rounded-2xl p-3.5 sm:p-4 shadow-xl shadow-[#102B46]/10 max-w-[260px] sm:max-w-[280px]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#102B46]">
                      Pan-India Coverage
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-snug">
                    Delhi Head Office &amp; Warehouse with Kolkata regional branch.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Pill Badge, Headline and 6 Cards (3 in 1 row) */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-6 h-full">
            <FadeIn direction="up">
              <div className="space-y-2.5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[11px] font-bold tracking-widest text-[#174A83] uppercase border border-gray-200 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#174A83]" />
                  <span>WHY TECHMATE</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#102B46] tracking-tight leading-[1.15] font-heading">
                  From First Sketch<br />
                  <span className="text-[#174A83]">To Every Service Call</span>
                </h2>
              </div>
            </FadeIn>

            {/* 6 Sequential Lifecycle Cards: 3 in 1 row on Desktop */}
            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 flex-1" staggerDelay={0.04}>
              {POINTS.map((point) => {
                const Icon = point.icon;
                return (
                  <StaggerItem key={point.title} className="h-full">
                    <HoverCard yOffset={-3} scale={1.01} className="h-full">
                      <Link
                        href={point.href}
                        className="group flex flex-col justify-between h-full p-4.5 sm:p-5 rounded-2xl bg-white border border-gray-200/90 hover:border-[#174A83]/50 shadow-xs hover:shadow-lg hover:shadow-[#174A83]/6 transition-all duration-300"
                      >
                        <div>
                          {/* Card Header: Icon on left, Step number on right */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 rounded-xl bg-[#F0F5FA] text-[#174A83] flex items-center justify-center group-hover:bg-[#174A83] group-hover:text-white transition-colors duration-300 shadow-xs">
                              <Icon
                                className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                                aria-hidden="true"
                              />
                            </div>
                            <span className="font-mono text-xs font-extrabold text-gray-400 group-hover:text-[#174A83] transition-colors">
                              {point.step}
                            </span>
                          </div>

                          <h3 className="text-base font-bold font-heading text-[#102B46] group-hover:text-[#174A83] transition-colors mb-1.5">
                            {point.title}
                          </h3>

                          <p className="text-xs text-[#475467] leading-relaxed">
                            {point.description}
                          </p>
                        </div>

                        {/* Action Affordance */}
                        <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-[#174A83]">
                          <span className="group-hover:underline">Explore {point.title}</span>
                          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    </HoverCard>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
