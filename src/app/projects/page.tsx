import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageContainer } from '@/components/layout/PageContainer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { PROJECTS_DATA } from '@/lib/projects-data';
import { SOLUTIONS_DATA, getSolutionBySlug } from '@/lib/solutions-data';
import { SITE } from '@/lib/site-config';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Projects | Completed Kitchen Installations | Techmate Industries',
  description:
    'Completed commercial kitchen, bakery and healthcare catering installations by Techmate Industries: project showcases across hospitality, cloud kitchens, bakeries and hospitals.',
};

interface ProjectsPageProps {
  searchParams: Promise<{ sector?: string | string[] }>;
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const { sector: sectorParam } = await searchParams;
  const sectorSlug = Array.isArray(sectorParam) ? sectorParam[0] : sectorParam;
  const activeSolution = sectorSlug ? getSolutionBySlug(sectorSlug) : undefined;

  const projects = activeSolution
    ? PROJECTS_DATA.filter((p) => p.sector === activeSolution.slug)
    : PROJECTS_DATA;

  // Only offer sectors that have at least one project.
  const sectors = SOLUTIONS_DATA.filter((s) => PROJECTS_DATA.some((p) => p.sector === s.slug));

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F3F6FA]/50 py-8">
        <PageContainer>
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: 'Projects', href: '/projects' },
                ...(activeSolution ? [{ label: activeSolution.title }] : []),
              ]}
            />
          </div>

          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-10 mb-8 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#174A83] block mb-2 font-mono">
              COMPLETED INSTALLATIONS
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#102B46] font-heading">
              Project Showcases
            </h1>
            <p className="mt-3 text-sm text-[#344054] max-w-2xl leading-relaxed">
              Working with Techmate turnkey engineering gives you complete peace of mind in knowing that your kitchen operations are safe, compliant, and optimized for high volume.
            </p>
          </div>

          {/* Sector filter */}
          <nav aria-label="Filter projects by sector" className="flex flex-wrap gap-2 mb-8">
            <Link
              href="/projects"
              aria-current={!activeSolution ? 'true' : undefined}
              className={`text-xs font-semibold px-4 py-2 rounded-full transition-colors ${
                !activeSolution
                  ? 'bg-[#174A83] text-white'
                  : 'bg-white text-[#344054] border border-gray-200 hover:border-[#174A83] hover:text-[#174A83]'
              }`}
            >
              All Projects ({PROJECTS_DATA.length})
            </Link>
            {sectors.map((s) => {
              const isActive = activeSolution?.slug === s.slug;
              return (
                <Link
                  key={s.slug}
                  href={`/projects?sector=${s.slug}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`text-xs font-semibold px-4 py-2 rounded-full transition-colors ${
                    isActive
                      ? 'bg-[#174A83] text-white'
                      : 'bg-white text-[#344054] border border-gray-200 hover:border-[#174A83] hover:text-[#174A83]'
                  }`}
                >
                  {s.title}
                </Link>
              );
            })}
          </nav>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200/90 p-10 text-center mb-12">
              <p className="text-sm text-[#344054] mb-4">No projects are listed for this sector yet.</p>
              <Link href="/projects" className="text-xs font-bold text-[#174A83] hover:underline">
                View all projects
              </Link>
            </div>
          )}

          <div className="bg-[#102B46] text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-xl sm:text-2xl font-bold font-heading mb-2">
                Planning your own kitchen project?
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Share your site details and our engineers will propose a layout, equipment list and commercial quotation.
              </p>
            </div>
            <Link
              href={SITE.primaryCta.href}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D62836] hover:bg-[#b81d29] text-white text-xs font-bold transition shadow-sm shrink-0"
            >
              <span>{SITE.primaryCta.label}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </PageContainer>
      </main>

      <Footer />
    </>
  );
}
