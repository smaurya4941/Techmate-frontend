import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/animations/MotionWrapper';
import { ServiceIcon } from '@/components/services/ServiceIcon';
import { SERVICES_DATA } from '@/lib/services-data';
import { SITE } from '@/lib/site-config';

export function ServicesOverview() {
  return (
    <section className="py-20 lg:py-24 bg-[#F8FAFC] px-6 sm:px-8 border-t border-gray-200" id="services">
      <div className="max-w-7xl mx-auto space-y-12">
        <FadeIn direction="up">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-4 max-w-xl">
              <span className="inline-block px-3.5 py-1 rounded-full bg-white text-[11px] font-bold tracking-widest text-[#174A83] uppercase border border-gray-200 shadow-sm">
                SERVICES
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102B46] tracking-tight leading-[1.15] font-heading">
                Support From<br />
                <span className="text-[#174A83]">Concept To Daily Service</span>
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#174A83] hover:text-[#D62836] transition-colors"
              >
                <span>All services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={SITE.primaryCta.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D62836] hover:bg-[#b81d29] text-white text-sm font-bold transition shadow-lg shadow-[#D62836]/25"
              >
                <span>{SITE.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </FadeIn>

        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
          {SERVICES_DATA.map((service) => (
            <StaggerItem key={service.slug}>
              <Link
                href={`/services#${service.slug}`}
                className="group h-full block p-6 rounded-3xl bg-white border border-gray-200/90 hover:border-[#174A83]/50 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F3F6FA] border border-gray-200 flex items-center justify-center mb-5">
                  <ServiceIcon name={service.iconName} className="w-6 h-6 text-[#174A83]" />
                </div>
                <h3 className="text-base font-bold text-[#102B46] font-heading mb-2 group-hover:text-[#174A83] transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-[#475467] leading-relaxed line-clamp-3">{service.description}</p>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
