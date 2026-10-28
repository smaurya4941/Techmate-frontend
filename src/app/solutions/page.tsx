import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageContainer } from '@/components/layout/PageContainer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SolutionIcon } from '@/components/solutions/SolutionIcon';
import { SOLUTIONS_DATA } from '@/lib/solutions-data';
import { getProjectsBySector } from '@/lib/projects-data';
import { CATEGORIES_DATA } from '@/lib/products-data';
import { SITE } from '@/lib/site-config';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Industry Kitchen Solutions | Techmate Industries',
  description:
    'Industry-focused commercial kitchen solutions for hotels, bakeries, restaurant chains, cloud kitchens and institutional catering from Techmate Industries.',
};

export default function SolutionsPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F3F6FA]/50 py-8">
        <PageContainer>
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'Solutions' }]} />
          </div>

          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-10 mb-10 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#174A83] block mb-2 font-mono">
              INDUSTRY-FOCUSED KITCHEN SOLUTIONS
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#102B46] font-heading">
              Solutions for Every Kitchen
            </h1>
            <p className="mt-3 text-sm text-[#344054] max-w-2xl leading-relaxed">
              Tailored food-service machinery configurations engineered to withstand the thermal, hygienic, and volume demands of diverse commercial hospitality operations.
            </p>
            <nav aria-label="Jump to a solution" className="mt-6 flex flex-wrap gap-2">
              {SOLUTIONS_DATA.map((solution) => (
                <a
                  key={solution.slug}
                  href={`#${solution.slug}`}
                  className="text-xs font-semibold text-[#174A83] bg-[#F3F6FA] hover:bg-[#174A83] hover:text-white px-3 py-1.5 rounded-full transition-colors"
                >
                  {solution.title}
                </a>
              ))}
            </nav>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {SOLUTIONS_DATA.map((solution) => {
              const projectCount = getProjectsBySector(solution.slug).length;
              const categories = CATEGORIES_DATA.filter((c) => solution.categories.includes(c.slug));
              return (
                <article
                  key={solution.slug}
                  id={solution.slug}
                  className="scroll-mt-28 bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-8 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-[#F3F6FA] flex items-center justify-center mb-5">
                      <SolutionIcon name={solution.iconName} />
                    </div>
                    <h2 className="font-heading font-bold text-lg text-[#102B46] mb-2">
                      {solution.title}
                    </h2>
                    <p className="text-xs text-[#344054] leading-relaxed mb-5">{solution.description}</p>

                    <div className="border-t border-gray-100 pt-4 mb-6">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                        Browse equipment:
                      </span>
                      <ul className="flex flex-wrap gap-1.5">
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
                  </div>

                  <div className="space-y-2">
                    {projectCount > 0 && (
                      <Link
                        href={`/projects?sector=${solution.slug}`}
                        className="w-full inline-flex items-center justify-center py-2.5 rounded-xl border border-[#174A83]/20 hover:border-[#174A83] text-[#174A83] text-xs font-bold transition"
                      >
                        <span>
                          View {projectCount} Related Project{projectCount > 1 ? 's' : ''}
                        </span>
                      </Link>
                    )}
                    <Link
                      href={SITE.primaryCta.href}
                      className="w-full inline-flex items-center justify-center py-2.5 rounded-xl bg-[#F3F6FA] hover:bg-[#174A83] hover:text-white text-[#174A83] text-xs font-bold transition"
                    >
                      <span>Request Sector Proposal</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </PageContainer>
      </main>

      <Footer />
    </>
  );
}
