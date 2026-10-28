import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/animations/MotionWrapper';
import { OWN_BRANDS, PARTNER_BRANDS } from '@/lib/brands-data';

export function BrandsShowcase() {
  return (
    <section className="py-20 lg:py-24 bg-[#0a0d14] px-6 sm:px-8 border-t border-white/5" id="brands">
      <div className="max-w-7xl mx-auto space-y-12">
        <FadeIn direction="up">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-4 max-w-xl">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#181d28] text-[11px] font-bold tracking-widest text-gray-300 uppercase border border-white/10">
                AUTHORISED BRANDS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] font-heading">
                World-Class Brands,<br />
                <span className="text-blue-400">One Trusted Partner</span>
              </h2>
            </div>
            <Link
              href="/brands"
              className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-blue-300 transition-colors shrink-0"
            >
              <span>View brand directory</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>

        <StaggerGroup
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          staggerDelay={0.05}
        >
          {PARTNER_BRANDS.map((brand) => (
            <StaggerItem key={brand.slug}>
              <Link
                href={`/brands/${brand.slug}`}
                className="h-28 flex flex-col items-center justify-center gap-1 text-center px-4 rounded-2xl bg-[#111215] border border-white/5 hover:border-blue-400/40 transition-colors font-heading font-bold text-base text-gray-200 hover:text-white"
              >
                <span>{brand.name}</span>
                {brand.country && (
                  <span className="text-[11px] font-sans font-semibold text-gray-500">{brand.country}</span>
                )}
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <FadeIn direction="up">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-400">
            <span className="font-bold uppercase tracking-wider text-gray-500">Our own brands:</span>
            {OWN_BRANDS.map((brand) => (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="font-semibold text-blue-300 hover:text-white transition-colors"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
