import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageContainer } from '@/components/layout/PageContainer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ProductGrid } from '@/components/products/ProductGrid';
import {
  BRANDS_DATA,
  getBrandBySlug,
  getBrandCategories,
  getBrandProducts,
} from '@/lib/brands-data';
import { SITE } from '@/lib/site-config';
import { Award, CheckCircle2, ArrowRight } from 'lucide-react';

interface BrandPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BRANDS_DATA.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return { title: 'Brand not found | Techmate Industries' };
  return {
    title: `${brand.name} | ${brand.division} | Techmate Industries`,
    description: brand.description,
  };
}

export default async function BrandDetailPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();

  const categories = getBrandCategories(brand);
  const products = getBrandProducts(brand);
  const otherBrands = BRANDS_DATA.filter((b) => b.kind === brand.kind && b.slug !== brand.slug).slice(0, 4);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F3F6FA]/50 py-8">
        <PageContainer>
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'Brands', href: '/brands' }, { label: brand.name }]} />
          </div>

          {/* Brand hero */}
          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-10 mb-10 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#D62836] bg-[#D62836]/10 px-2.5 py-1 rounded-full mb-4">
                  <Award className="w-3 h-3" aria-hidden="true" />
                  {brand.badge}
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-[#102B46] font-heading">
                  {brand.name}
                </h1>
                {brand.country && (
                  <p className="mt-1 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Country of origin: {brand.country}
                  </p>
                )}
                <p className="mt-1 text-sm font-semibold text-[#174A83]">{brand.division}</p>
                <p className="mt-4 text-base text-[#344054] leading-relaxed">{brand.tagline}</p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  href={SITE.primaryCta.href}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D62836] hover:bg-[#b81d29] text-white text-xs font-bold transition shadow-sm"
                >
                  <span>{SITE.primaryCta.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                {categories[0] && (
                  <Link
                    href={`/products?category=${categories[0].slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F3F6FA] hover:bg-[#174A83] hover:text-white text-[#174A83] text-xs font-bold transition"
                  >
                    Browse in Catalogue
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Overview + highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold font-heading text-[#102B46]">About the brand</h2>
              {brand.overview.map((paragraph) => (
                <p key={paragraph} className="text-sm text-[#344054] leading-relaxed">
                  {paragraph}
                </p>
              ))}
              {brand.applications.length > 0 && (
                <div className="pt-4 border-t border-gray-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                    Typical applications
                  </span>
                  <ul className="flex flex-wrap gap-2">
                    {brand.applications.map((app) => (
                      <li
                        key={app}
                        className="text-xs font-semibold text-[#174A83] bg-[#F3F6FA] px-3 py-1 rounded-full"
                      >
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="bg-[#102B46] text-white rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold font-heading mb-4">Why this range</h2>
              <ul className="space-y-3">
                {brand.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-gray-200 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Categories & sub-categories */}
          {categories.length > 0 && (
          <section aria-labelledby="brand-categories" className="mb-12">
            <h2 id="brand-categories" className="text-xl font-bold font-heading text-[#102B46] mb-5">
              Product categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => {
                return (
                  <div
                    key={cat.slug}
                    className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-sm flex flex-col"
                  >
                    <h3 className="font-heading font-bold text-base text-[#102B46] mb-1">{cat.name}</h3>
                    <p className="text-xs text-[#344054] leading-relaxed mb-4">{cat.description}</p>
                    <Link
                      href={`/products?category=${cat.slug}`}
                      className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-[#174A83] hover:text-[#D62836] transition-colors"
                    >
                      <span>View category</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
          )}

          {/* Products */}
          <section aria-labelledby="brand-products" className="mb-12">
            <h2 id="brand-products" className="text-xl font-bold font-heading text-[#102B46] mb-5">
              {brand.kind === 'partner' ? `${brand.name} equipment` : 'Featured models'}
            </h2>
            {products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200/90 p-8 text-center text-sm text-[#344054]">
                Models for this brand are being added to the catalogue.{' '}
                <Link href={SITE.primaryCta.href} className="font-bold text-[#D62836] hover:underline">
                  Get a quote
                </Link>{' '}
                for current models and availability.
              </div>
            )}
          </section>

          {/* Other brands */}
          <section aria-labelledby="other-brands">
            <h2 id="other-brands" className="text-xl font-bold font-heading text-[#102B46] mb-5">
              {brand.kind === 'partner' ? 'Other authorised brands' : 'Other Techmate brands'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherBrands.map((b) => (
                <Link
                  key={b.slug}
                  href={`/brands/${b.slug}`}
                  className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-sm hover:border-[#174A83] transition-colors block"
                >
                  <span className="block font-heading font-bold text-[#102B46]">{b.name}</span>
                  <span className="block text-xs text-[#174A83] font-semibold mt-0.5">{b.division}</span>
                </Link>
              ))}
            </div>
          </section>
        </PageContainer>
      </main>

      <Footer />
    </>
  );
}
