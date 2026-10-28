import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageContainer } from '@/components/layout/PageContainer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { OWN_BRANDS } from '@/lib/brands-data';
import {
  Award,
  ShieldCheck,
  Factory,
  Layers,
  ArrowRight,
  Flame,
  Wheat,
  Snowflake,
  Compass,
  Wrench,
  Handshake,
} from 'lucide-react';

const TEAM_FUNCTIONS = [
  {
    icon: Compass,
    title: 'Design & Application Engineering',
    desc: 'Layout planning, equipment sizing and utility coordination for every project.',
  },
  {
    icon: Factory,
    title: 'Manufacturing & Quality',
    desc: 'Fabrication, thermal calibration and ISO 9001:2015 quality control at our plant.',
  },
  {
    icon: Wrench,
    title: 'Installation & Service Engineers',
    desc: 'Commissioning, preventive maintenance and breakdown response across regions.',
  },
  {
    icon: Handshake,
    title: 'Sales Engineering & Distribution',
    desc: 'Technical quotations, project follow-up and our regional distributor network.',
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F3F6FA]/50 py-8">
        <PageContainer>
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'About Us' }]} />
          </div>

          {/* Hero Banner */}
          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-12 mb-10 shadow-sm">
            <div className="max-w-3xl">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#174A83] block mb-2 font-mono">
                ENGINEERING EXCELLENCE IN COMMERCIAL FOOD-SERVICE
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#102B46] font-heading leading-tight">
                About Techmate Industries
              </h1>
              <p className="mt-4 text-base text-[#344054] leading-relaxed">
                Techmate Industries is a specialized Indian manufacturing and equipment distribution company dedicated to high-performance commercial kitchen equipment, industrial bakery machinery, and commercial refrigeration systems.
              </p>
            </div>
          </div>

          {/* 3 Core Manufacturing Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl border border-gray-200/90 p-8 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-[#174A83]/10 text-[#174A83] flex items-center justify-center mb-6">
                <Factory className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#102B46] mb-2">
                Heavy-Duty Fabrication
              </h3>
              <p className="text-sm text-[#344054] leading-relaxed">
                Fabricated with food-grade AISI 304 stainless steel, CNC laser cutting, and argon arc welding to ensure structural durability in demanding commercial kitchens.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200/90 p-8 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-[#D62836]/10 text-[#D62836] flex items-center justify-center mb-6">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#102B46] mb-2">
                Rigorous Quality Standards
              </h3>
              <p className="text-sm text-[#344054] leading-relaxed">
                Manufactured according to ISO 9001:2015 quality management procedures, featuring thermal calibration, pressure tests, and safety thermocouple compliance.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200/90 p-8 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-[#102B46]/10 text-[#102B46] flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#102B46] mb-2">
                Nationwide Lifecycle Support
              </h3>
              <p className="text-sm text-[#344054] leading-relaxed">
                Direct factory warranty backed by an inventory of genuine spare parts, regional service engineers, and preventative maintenance contracts.
              </p>
            </div>
          </div>

          {/* Core Product Capabilities */}
          <div className="bg-white rounded-3xl border border-gray-200/90 p-8 sm:p-12 mb-12 shadow-sm">
            <h2 className="text-2xl font-bold font-heading text-[#102B46] mb-6">
              Our Equipment Capabilities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-5 rounded-2xl bg-[#F3F6FA] border border-gray-200/70">
                <Flame className="w-6 h-6 text-[#174A83] mb-3" />
                <h4 className="font-bold text-[#102B46] text-sm mb-1">Commercial Cooking</h4>
                <p className="text-xs text-[#344054]">
                  4/6 burner ranges, stock pot stoves, Chinese woks, and deep fat fryers.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F3F6FA] border border-gray-200/70">
                <Layers className="w-6 h-6 text-[#174A83] mb-3" />
                <h4 className="font-bold text-[#102B46] text-sm mb-1">Combi Ovens</h4>
                <p className="text-xs text-[#344054]">
                  Digital touch screen 6, 10, and 20-tray electric combi steam ovens.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F3F6FA] border border-gray-200/70">
                <Wheat className="w-6 h-6 text-[#174A83] mb-3" />
                <h4 className="font-bold text-[#102B46] text-sm mb-1">Bakery Machinery</h4>
                <p className="text-xs text-[#344054]">
                  Heavy-duty spiral kneaders, planetary mixers, and rotary rack ovens.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F3F6FA] border border-gray-200/70">
                <Snowflake className="w-6 h-6 text-[#174A83] mb-3" />
                <h4 className="font-bold text-[#102B46] text-sm mb-1">Cold Chain</h4>
                <p className="text-xs text-[#344054]">
                  Tropicalized reach-in chillers, blast freezers, and modular cold rooms.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-gray-500">
                Need customized layout consultation or technical equipment drawings?
              </p>
              <Link
                href="/request-quote"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D62836] text-white text-xs font-bold hover:bg-[#b81d29] transition shadow-sm"
              >
                <span>Request Project Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Brands */}
          <section aria-labelledby="about-brands" className="bg-white rounded-3xl border border-gray-200/90 p-8 sm:p-12 mb-12 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 id="about-brands" className="text-2xl font-bold font-heading text-[#102B46]">
                Our Techmate® Brands
              </h2>
              <Link href="/brands" className="text-xs font-bold text-[#174A83] hover:text-[#D62836] transition-colors">
                View all brands
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {OWN_BRANDS.map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/brands/${brand.slug}`}
                  className="p-5 rounded-2xl bg-[#F3F6FA] border border-gray-200/70 hover:border-[#174A83] transition-colors block"
                >
                  <h3 className="font-bold text-[#102B46] text-sm mb-1">{brand.name}</h3>
                  <span className="block text-xs font-semibold text-[#174A83] mb-2">{brand.division}</span>
                  <p className="text-xs text-[#344054] leading-relaxed">{brand.tagline}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Team */}
          <section aria-labelledby="about-team" className="bg-white rounded-3xl border border-gray-200/90 p-8 sm:p-12 mb-12 shadow-sm">
            <h2 id="about-team" className="text-2xl font-bold font-heading text-[#102B46] mb-2">
              Our Team
            </h2>
            <p className="text-sm text-[#344054] mb-6 max-w-2xl">
              Engineers and specialists across design, manufacturing, service and sales work together on every project from first sketch to daily operation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TEAM_FUNCTIONS.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="p-5 rounded-2xl bg-[#F3F6FA] border border-gray-200/70">
                  <Icon className="w-6 h-6 text-[#174A83] mb-3" aria-hidden="true" />
                  <h3 className="font-bold text-[#102B46] text-sm mb-1">{title}</h3>
                  <p className="text-xs text-[#344054] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>
        </PageContainer>
      </main>

      <Footer />
    </>
  );
}
