import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageContainer } from '@/components/layout/PageContainer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SERVICES_DATA } from '@/lib/services-data';
import { ServiceIcon } from '@/components/services/ServiceIcon';
import { SITE } from '@/lib/site-config';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services | Consultation, Installation, Training, Maintenance, Spares & AMC | Techmate Industries',
  description:
    'Techmate Industries services: kitchen consultation and planning, installation and commissioning, operator training, preventive maintenance, genuine spares and annual maintenance contracts.',
};

export default function ServicesPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F3F6FA]/50 py-8">
        <PageContainer>
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'Services' }]} />
          </div>

          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-10 mb-10 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#174A83] block mb-2 font-mono">
              END-TO-END PROJECT DELIVERY
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#102B46] font-heading">
              Consultation, Installation &amp; Lifecycle Services
            </h1>
            <p className="mt-3 text-sm text-[#344054] max-w-2xl leading-relaxed">
              From initial architectural concept to daily commercial operation, Techmate provides comprehensive technical design, installation, training and after-sales maintenance.
            </p>
            <nav aria-label="Jump to a service" className="mt-6 flex flex-wrap gap-2">
              {SERVICES_DATA.map((service) => (
                <a
                  key={service.slug}
                  href={`#${service.slug}`}
                  className="text-xs font-semibold text-[#174A83] bg-[#F3F6FA] hover:bg-[#174A83] hover:text-white px-3 py-1.5 rounded-full transition-colors"
                >
                  {service.shortTitle}
                </a>
              ))}
            </nav>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {SERVICES_DATA.map((service) => (
              <article
                key={service.slug}
                id={service.slug}
                className="scroll-mt-28 bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-8 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#F3F6FA] flex items-center justify-center mb-5">
                    <ServiceIcon name={service.iconName} />
                  </div>
                  <h2 className="font-heading font-bold text-lg text-[#102B46] mb-2">{service.title}</h2>
                  <p className="text-xs text-[#344054] leading-relaxed mb-5">{service.description}</p>

                </div>

                <Link
                  href={service.ctaHref}
                  className="w-full inline-flex items-center justify-center py-2.5 rounded-xl bg-[#F3F6FA] hover:bg-[#174A83] hover:text-white text-[#174A83] text-xs font-bold transition"
                >
                  <span>{service.ctaLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </article>
            ))}
          </div>

          <div className="bg-white rounded-3xl border border-gray-200/90 p-8 sm:p-10 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-lg font-bold font-heading text-[#102B46] mb-1">Not sure which service you need?</h2>
              <p className="text-xs text-[#344054]">Tell us about your project and an engineer will get back to you.</p>
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
