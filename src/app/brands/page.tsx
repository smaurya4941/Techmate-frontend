import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageContainer } from '@/components/layout/PageContainer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { OWN_BRANDS, PARTNER_BRANDS, getBrandCategories, getBrandProducts } from '@/lib/brands-data';
import { Award, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Brands | Techmate Industries',
  description:
    'Authorised brand directory from Techmate Industries: UNOX, Electrolux Professional, Alto-Shaam, Rational and more, plus our own Heavy Duty, Bake With Mate and ColdPro brands.',
};

export default function BrandsPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F3F6FA]/50 py-8">
        <PageContainer>
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'Brands' }]} />
          </div>

          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-10 mb-10 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#174A83] block mb-2 font-mono">
              AUTHORISED BRAND DIRECTORY
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#102B46] font-heading">
              Brands We Supply & Support
            </h1>
            <p className="mt-3 text-sm text-[#344054] max-w-2xl leading-relaxed">
              Techmate Industries supplies and supports leading commercial kitchen and bakery equipment brands, alongside its own manufactured ranges.
            </p>
          </div>

          <section aria-labelledby="partner-brands" className="mb-14">
            <h2 id="partner-brands" className="text-xl font-bold font-heading text-[#102B46] mb-5">
              Authorised Brands
            </h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {PARTNER_BRANDS.map((brand) => (
                <li key={brand.slug}>
                  <Link
                    href={`/brands/${brand.slug}`}
                    className="h-28 flex flex-col items-center justify-center gap-1 text-center px-4 rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:border-[#174A83] hover:shadow-md transition font-heading font-bold text-base text-[#102B46] hover:text-[#174A83]"
                  >
                    <span>{brand.name}</span>
                    {brand.country && (
                      <span className="text-[11px] font-sans font-semibold text-gray-400">{brand.country}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <h2 className="text-xl font-bold font-heading text-[#102B46] mb-5">Techmate® Brands</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {OWN_BRANDS.map((brand) => {
              const categories = getBrandCategories(brand);
              const productCount = getBrandProducts(brand).length;
              return (
                <article
                  key={brand.slug}
                  className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-8 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#D62836] bg-[#D62836]/10 px-2.5 py-1 rounded-full">
                        {brand.badge}
                      </span>
                      <Award className="w-5 h-5 text-[#174A83]" aria-hidden="true" />
                    </div>

                    <h2 className="font-heading font-bold text-xl text-[#102B46] mb-1">
                      <Link href={`/brands/${brand.slug}`} className="hover:text-[#174A83] transition-colors">
                        {brand.name}
                      </Link>
                    </h2>
                    <div className="text-xs font-semibold text-[#174A83] mb-3">{brand.division}</div>
                    <p className="text-xs text-[#344054] leading-relaxed mb-5">{brand.description}</p>

                    <ul className="flex flex-wrap gap-1.5 mb-6">
                      {categories.map((cat) => (
                        <li key={cat.slug}>
                          <Link
                            href={`/products?category=${cat.slug}`}
                            className="inline-block text-[10px] font-semibold text-[#344054] bg-[#F3F6FA] hover:bg-[#174A83] hover:text-white px-2.5 py-1 rounded-full transition-colors"
                          >
                            {cat.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <Link
                      href={`/brands/${brand.slug}`}
                      className="w-full inline-flex items-center justify-center py-2.5 rounded-xl bg-[#F3F6FA] hover:bg-[#174A83] hover:text-white text-[#174A83] text-xs font-bold transition"
                    >
                      <span>
                        View Brand{productCount > 0 ? ` & ${productCount} Models` : ''}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Component Engineering Standards */}
          <div className="bg-[#102B46] text-white rounded-3xl p-8 sm:p-12">
            <h2 className="text-xl sm:text-2xl font-bold font-heading mb-3">
              Built with Global Component Standards
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed mb-6">
              Our machines incorporate globally recognized industrial components including Schneider Electric contactors, Omron digital temperature controllers, and Danfoss / Embraco tropicalized refrigeration compressors.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold text-gray-200">
              {[
                'Schneider Electric Switchgear',
                'Embraco / Danfoss Compressors',
                'AISI 304 Food-Grade Steel',
                'ISO 9001:2015 Certification',
              ].map((item) => (
                <div
                  key={item}
                  className="p-3 bg-white/10 rounded-xl border border-white/10 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </main>

      <Footer />
    </>
  );
}
