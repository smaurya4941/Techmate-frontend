import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/animations/MotionWrapper';
import { ServiceIcon } from '@/components/services/ServiceIcon';
import { SERVICES_DATA } from '@/lib/services-data';
import { SITE } from '@/lib/site-config';

export function ServicesOverview() {
  return (
    <section className="py-20 lg:py-24 bg-[#0a0d14] px-6 sm:px-8 border-t border-white/5" id="services">
      <div className="max-w-7xl mx-auto space-y-12">
        <FadeIn direction="up">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-4 max-w-xl">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#181d28] text-[11px] font-bold tracking-widest text-gray-300 uppercase border border-white/10">
                SERVICES
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] font-heading">
                Support From<br />
                <span className="text-blue-400">Concept To Daily Service</span>
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-blue-300 transition-colors"
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
                className="group h-full block p-6 rounded-3xl bg-[#111215] border border-white/5 hover:border-blue-400/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-5">
                  <ServiceIcon name={service.iconName} className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-base font-bold text-white font-heading mb-2 group-hover:text-blue-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">{service.description}</p>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
