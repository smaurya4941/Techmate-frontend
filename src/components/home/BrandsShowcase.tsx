import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/animations/MotionWrapper';
import { OWN_BRANDS, PARTNER_BRANDS } from '@/lib/brands-data';
import { BrandLogo } from '@/components/brands/BrandLogo';

export function BrandsShowcase() {
  return (
    <section className="py-20 lg:py-24 bg-white px-6 sm:px-8 border-t border-gray-100" id="brands">
      <div className="max-w-7xl mx-auto space-y-12">
        <FadeIn direction="up">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-4 max-w-xl">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#F3F6FA] text-[11px] font-bold tracking-widest text-[#174A83] uppercase border border-gray-200">
                AUTHORISED BRANDS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102B46] tracking-tight leading-[1.15] font-heading">
                World-Class Brands,<br />
                <span className="text-[#174A83]">One Trusted Partner</span>
              </h2>
            </div>
            <Link
              href="/brands"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#174A83] hover:text-[#D62836] transition-colors shrink-0"
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
                className="h-32 flex flex-col items-center justify-center gap-1.5 text-center px-4 rounded-2xl bg-white border border-gray-200/80 hover:border-[#174A83]/50 shadow-sm hover:shadow-md transition-all font-heading font-bold text-base text-[#102B46] hover:text-[#174A83]"
              >
                <BrandLogo brand={brand} className="h-14" />
                {brand.country && (
                  <span className="text-[11px] font-sans font-semibold text-gray-500">{brand.country}</span>
                )}
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <FadeIn direction="up">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
            <span className="font-bold uppercase tracking-wider text-gray-600">Our own brands:</span>
            {OWN_BRANDS.map((brand) => (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="font-semibold text-[#174A83] hover:text-[#D62836] transition-colors"
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
