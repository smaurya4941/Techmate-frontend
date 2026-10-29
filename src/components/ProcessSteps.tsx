import React from 'react';
import { Handshake, Lightbulb, Users } from 'lucide-react';
import { FadeIn, StaggerGroup, StaggerItem, HoverCard } from '@/components/animations/MotionWrapper';

export function ProcessSteps() {
  const steps = [
    {
      num: '01',
      title: 'Introduction',
      description:
        'The introduction phase is all about understanding your commercial kitchen operation inside and out & taking the time to learn your volume requirements.',
      icon: Handshake,
    },
    {
      num: '02',
      title: 'Ideas & Concept',
      description:
        'Developing innovative equipment layouts that form the foundation of your facility. Turning spatial needs into structured 2D/3D BIM drawings.',
      icon: Lightbulb,
    },
    {
      num: '03',
      title: 'Consultation',
      description:
        'Turning plans and equipment engineering into real, measurable results. Bringing your kitchen machinery to life with on-site commissioning.',
      icon: Users,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F8FAFC] px-6 sm:px-8 border-t border-gray-200 relative overflow-hidden" id="work-process">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Header: Badge, Headline, and Paragraph Description (with Framer Motion FadeIn) */}
        <FadeIn direction="up">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
            <div className="space-y-4 max-w-xl">
              {/* Pill Badge */}
              <span className="inline-block px-3.5 py-1 rounded-full bg-white text-[11px] font-bold tracking-widest text-[#174A83] uppercase border border-gray-200 shadow-sm">
                WORK PROCESS
              </span>

              {/* Headline with Highlighted Word */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102B46] tracking-tight leading-[1.15] font-heading">
                How Techmate <span className="text-[#174A83] font-extrabold">Operate</span> In<br />
                The Market
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#475467] leading-relaxed max-w-md lg:pb-1">
              From spatial 2D/3D BIM layout design and CNC fabrication to on-site machinery commissioning, our structured 3-phase execution model ensures zero operational downtime.
            </p>
          </div>
        </FadeIn>

        {/* 3 Large White Process Cards with Staggered Entrance */}
        <div className="relative pt-6">
          {/* Subtle Horizontal Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 inset-x-20 h-0.5 border-t border-dashed border-gray-300 -z-0" />

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 relative z-10" staggerDelay={0.15}>
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <StaggerItem key={step.num}>
                  <div
                    className="bg-white text-gray-900 rounded-[32px] p-8 sm:p-10 shadow-md border border-gray-200/80 relative flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl group h-full"
                  >
                  {/* Step Number Circular Badge (Centered on Top Edge: 01, 02, 03) */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#102B46] text-white border-2 border-white flex items-center justify-center font-mono font-bold text-xs shadow-md group-hover:scale-110 transition-transform">
                    {step.num}
                  </div>

                  {/* Squircle Icon Container with Corporate Blue */}
                  <div className="w-20 h-20 rounded-2xl bg-[#174A83] text-white flex items-center justify-center shadow-md my-6 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-10 h-10" />
                  </div>

                  {/* Step Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-[#102B46] font-heading mb-3 tracking-tight">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>

      </div>
    </section>
  );
}
