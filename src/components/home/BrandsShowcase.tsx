import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/animations/MotionWrapper';
import { OWN_BRANDS, PARTNER_BRANDS, type BrandInfo as Brand } from '@/lib/brands-data';
import { BrandLogo } from '@/components/brands/BrandLogo';

// Every partner brand appears in both rows; the second row runs in reverse order so the rows never mirror each other.
const ROW_ONE = PARTNER_BRANDS;
const ROW_TWO = [...PARTNER_BRANDS].reverse();

/** Repeats the list so one sequence always outruns the widest screen (cards are ~210px). */
function fillSequence(brands: readonly Brand[]): Brand[] {
  const copies = Math.max(1, Math.ceil(14 / brands.length));
  return Array.from({ length: copies }, () => brands).flat();
}

function BrandRow({ brands, direction }: { brands: readonly Brand[]; direction: 'left' | 'right' }) {
  const sequence = fillSequence(brands);
  const animation = direction === 'left' ? 'animate-marquee-slow' : 'animate-marquee-slow-reverse';

  return (
    <div className="group relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,#000_3%,#000_97%,transparent)]">
      <div className={`flex w-max ${animation} motion-reduce:animate-none group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]`}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-8 pr-8" aria-hidden={copy === 1 || undefined}>
            {sequence.map((brand, i) => (
              <Link
                key={`${brand.slug}-${i}`}
                href={`/brands/${brand.slug}`}
                tabIndex={copy === 1 ? -1 : undefined}
                className="w-40 sm:w-48 shrink-0 flex items-center justify-center text-center px-3 font-heading font-bold text-base text-[#102B46] hover:text-[#174A83] hover:scale-105 transition-transform duration-300"
              >
                <span className="flex h-20 w-full items-center justify-center"><BrandLogo brand={brand} className="h-14" /></span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

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

        {/* Two marquee rows drifting in opposite directions; pauses on hover/focus, static when reduced motion is requested. */}
        <div className="space-y-2" role="region" aria-label="Authorised brands">
          <BrandRow brands={ROW_ONE} direction="left" />
          <BrandRow brands={ROW_TWO} direction="right" />
        </div>

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
