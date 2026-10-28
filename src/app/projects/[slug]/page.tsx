import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageContainer } from '@/components/layout/PageContainer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { PROJECTS_DATA, getProjectBySlug } from '@/lib/projects-data';
import { getSolutionBySlug } from '@/lib/solutions-data';
import { getBrandBySlug } from '@/lib/brands-data';
import { CATEGORIES_DATA } from '@/lib/products-data';
import { SITE } from '@/lib/site-config';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECTS_DATA.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project not found | Techmate Industries' };
  return {
    title: `${project.title} | Techmate Industries`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const solution = getSolutionBySlug(project.sector);
  const brands = project.brands
    .map((brandSlug) => getBrandBySlug(brandSlug))
    .filter((brand): brand is NonNullable<typeof brand> => Boolean(brand));
  const categories = CATEGORIES_DATA.filter((c) => project.equipmentCategories.includes(c.slug));
  const related = PROJECTS_DATA.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F3F6FA]/50 py-8">
        <PageContainer>
          <div className="mb-6">
            <Breadcrumbs
              items={[{ label: 'Projects', href: '/projects' }, { label: project.client }]}
            />
          </div>

          {/* Hero */}
          <div className="relative rounded-3xl overflow-hidden mb-10 shadow-sm bg-[#102B46] min-h-[320px] sm:min-h-[420px] flex items-end">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="relative z-10 p-6 sm:p-10 max-w-3xl">
              <span className="inline-block px-3 py-1 rounded-full bg-[#174A83] text-[10px] font-black uppercase tracking-wider text-white mb-4">
                {project.badge}
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-heading leading-tight">
                {project.title}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-8 shadow-sm">
                <h2 className="text-lg font-bold font-heading text-[#102B46] mb-3">Project overview</h2>
                <p className="text-sm text-[#344054] leading-relaxed">{project.summary}</p>
              </section>

              <section className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-8 shadow-sm">
                <h2 className="text-lg font-bold font-heading text-[#102B46] mb-4">Scope of supply</h2>
                <ul className="space-y-2.5">
                  {project.scope.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#344054]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {(project.equipment.length > 0 || brands.length > 0) && (
                <section className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-8 shadow-sm space-y-6">
                  {project.equipment.length > 0 && (
                    <div>
                      <h2 className="text-lg font-bold font-heading text-[#102B46] mb-4">Equipment installed</h2>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {project.equipment.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-[#344054]">
                            <CheckCircle2 className="w-4 h-4 text-[#174A83] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {brands.length > 0 && (
                    <div className={project.equipment.length > 0 ? 'pt-6 border-t border-gray-100' : ''}>
                      <h2 className="text-lg font-bold font-heading text-[#102B46] mb-4">Brands used</h2>
                      <ul className="flex flex-wrap gap-2">
                        {brands.map((brand) => (
                          <li key={brand.slug}>
                            <Link
                              href={`/brands/${brand.slug}`}
                              className="inline-block text-xs font-semibold text-[#174A83] bg-[#F3F6FA] hover:bg-[#174A83] hover:text-white px-3 py-1.5 rounded-full transition-colors"
                            >
                              {brand.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              )}

              {project.gallery && project.gallery.length > 0 && (
                <section aria-labelledby="project-gallery">
                  <h2 id="project-gallery" className="text-lg font-bold font-heading text-[#102B46] mb-4">
                    Project photographs
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.gallery.map((src, index) => (
                      <div key={src} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                        <Image
                          src={src}
                          alt={`${project.title} photograph ${index + 1}`}
                          fill
                          sizes="(min-width: 640px) 33vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {categories.length > 0 && (
                <section className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-8 shadow-sm">
                  <h2 className="text-lg font-bold font-heading text-[#102B46] mb-4">
                    Product categories used
                  </h2>
                  <ul className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <li key={cat.slug}>
                        <Link
                          href={`/products?category=${cat.slug}`}
                          className="inline-block text-xs font-semibold text-[#174A83] bg-[#F3F6FA] hover:bg-[#174A83] hover:text-white px-3 py-1.5 rounded-full transition-colors"
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            <aside className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-sm">
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Client</dt>
                    <dd className="font-semibold text-[#102B46] mt-0.5">{project.client}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Sector</dt>
                    <dd className="font-semibold text-[#102B46] mt-0.5">
                      {solution ? (
                        <Link href={`/solutions#${solution.slug}`} className="hover:text-[#174A83] hover:underline">
                          {solution.title}
                        </Link>
                      ) : (
                        project.category
                      )}
                    </dd>
                  </div>
                  {project.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        {m.label}
                      </dt>
                      <dd className="text-2xl font-extrabold text-[#174A83] font-heading mt-0.5">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="bg-[#102B46] text-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-heading font-bold text-lg mb-2">Planning a similar kitchen?</h2>
                <p className="text-xs text-gray-300 leading-relaxed mb-5">
                  Our engineers will size equipment and propose a layout for your site.
                </p>
                <Link
                  href={SITE.primaryCta.href}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#D62836] hover:bg-[#b81d29] text-white text-xs font-bold transition"
                >
                  <span>{SITE.primaryCta.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </aside>
          </div>

          <section aria-labelledby="more-projects">
            <div className="flex items-center justify-between mb-5">
              <h2 id="more-projects" className="text-xl font-bold font-heading text-[#102B46]">
                More projects
              </h2>
              <Link href="/projects" className="text-xs font-bold text-[#174A83] hover:text-[#D62836]">
                View all projects
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </section>
        </PageContainer>
      </main>

      <Footer />
    </>
  );
}
