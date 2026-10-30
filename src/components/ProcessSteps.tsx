import React from 'react';
import { Handshake, Lightbulb, Users } from 'lucide-react';
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/animations/MotionWrapper';

export function ProcessSteps() {
  const steps = [
    {
      num: '01',
      title: 'Introduction',
      phase: 'Step 01 • Discovery',
      description:
        'The introduction phase is all about understanding your commercial kitchen operation inside and out & taking the time to learn your volume requirements.',
      icon: Handshake,
    },
    {
      num: '02',
      title: 'Ideas & Concept',
      phase: 'Step 02 • Layout & BIM',
      description:
        'Developing innovative equipment layouts that form the foundation of your facility. Turning spatial needs into structured 2D/3D BIM drawings.',
      icon: Lightbulb,
    },
    {
      num: '03',
      title: 'Consultation',
      phase: 'Step 03 • Commissioning',
      description:
        'Turning plans and equipment engineering into real, measurable results. Bringing your kitchen machinery to life with on-site commissioning.',
      icon: Users,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F8FAFC] px-6 sm:px-8 border-t border-gray-200 relative overflow-hidden" id="work-process">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Header: Badge and 1-2 Line Headline (Subheading removed per request) */}
        <FadeIn direction="up">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block px-4 py-1 rounded-full bg-white text-[11px] font-bold tracking-widest text-[#174A83] uppercase border border-gray-200 shadow-2xs">
              WORK PROCESS
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102B46] tracking-tight leading-[1.2] font-heading">
              How Techmate <span className="text-[#174A83]">Operates In The Market</span>
            </h2>
          </div>
        </FadeIn>

        {/* 3 Process Cards with Step Nodes and Connecting Guide Line */}
        <div className="relative pt-6">
          {/* Subtle Horizontal Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 inset-x-24 lg:inset-x-32 h-0.5 border-t-2 border-dashed border-gray-300/80 -z-0" />

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 relative z-10" staggerDelay={0.15}>
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <StaggerItem key={step.num}>
                  <div
                    className="bg-white text-gray-900 rounded-[32px] p-8 sm:p-10 shadow-xs hover:shadow-xl hover:-translate-y-2 border border-gray-200/80 relative flex flex-col items-center text-center transition-all duration-300 group h-full"
                  >
                    {/* Step Number Circular Badge (Centered on Top Edge: 01, 02, 03) */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#102B46] text-white border-4 border-[#F8FAFC] flex items-center justify-center font-mono font-bold text-xs shadow-md group-hover:bg-[#174A83] group-hover:scale-110 transition-all duration-300">
                      {step.num}
                    </div>

                    {/* Gradient Squircle Icon Container */}
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#174A83] to-[#102B46] text-white flex items-center justify-center shadow-lg shadow-[#174A83]/20 my-6 group-hover:scale-105 group-hover:shadow-[#174A83]/30 transition-all duration-300">
                      <Icon className="w-10 h-10" />
                    </div>

                    {/* Step Phase Label */}
                    <span className="text-[11px] font-bold tracking-wider text-[#174A83] uppercase mb-2">
                      {step.phase}
                    </span>

                    {/* Step Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-[#102B46] font-heading mb-3 tracking-tight group-hover:text-[#174A83] transition-colors">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-xs sm:text-sm text-[#475467] leading-relaxed max-w-xs mx-auto">
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
