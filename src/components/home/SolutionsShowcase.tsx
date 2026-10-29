import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/animations/MotionWrapper';
import { SolutionIcon } from '@/components/solutions/SolutionIcon';
import { SOLUTIONS_DATA } from '@/lib/solutions-data';

export function SolutionsShowcase() {
  return (
    <section className="py-20 lg:py-24 bg-white px-6 sm:px-8 border-t border-gray-100" id="solutions">
      <div className="max-w-7xl mx-auto space-y-12">
        <FadeIn direction="up">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-4 max-w-xl">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#F3F6FA] text-[11px] font-bold tracking-widest text-[#174A83] uppercase border border-gray-200">
                SOLUTIONS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102B46] tracking-tight leading-[1.15] font-heading">
                Kitchen Solutions<br />
                <span className="text-[#174A83]">By Industry</span>
              </h2>
            </div>
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#174A83] hover:text-[#D62836] transition-colors shrink-0"
            >
              <span>View all solutions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>

        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.08}>
          {SOLUTIONS_DATA.map((solution) => (
            <StaggerItem key={solution.slug}>
              <Link
                href={`/solutions#${solution.slug}`}
                className="group h-full block p-6 rounded-3xl bg-[#F8FAFC] border border-gray-200/80 hover:border-[#174A83]/50 hover:bg-white shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-200/80 flex items-center justify-center mb-5">
                  <SolutionIcon name={solution.iconName} className="w-6 h-6 text-[#174A83]" />
                </div>
                <h3 className="text-base font-bold text-[#102B46] font-heading mb-2 group-hover:text-[#174A83] transition-colors">
                  {solution.title}
                </h3>
                <p className="text-xs text-[#475467] leading-relaxed">{solution.description}</p>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
