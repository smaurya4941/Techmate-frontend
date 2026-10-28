'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageContainer } from '@/components/layout/PageContainer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ChevronDown, HelpCircle, ArrowRight, Phone } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      category: 'Procurement & Quotations',
      question: 'How do I obtain formal pricing for commercial kitchen equipment?',
      answer:
        'You can use our online "Get a Quote" tool to select machinery models, specify required quantities, and submit your technical parameters. Our sales engineering team issues formal GST-compliant commercial quotations within 24 business hours.',
    },
    {
      category: 'Procurement & Quotations',
      question: 'Can Techmate manufacture custom non-standard dimensions?',
      answer:
        'Yes. Our Navi Mumbai sheet metal fabrication plant features high-precision CNC laser cutting and hydraulic press brakes, allowing us to build custom stainless steel work tables, sink units, bain-maries, and exhaust hoods according to your kitchen layout drawings.',
    },
    {
      category: 'Delivery & Commissioning',
      question: 'What are typical manufacturing and delivery lead times?',
      answer:
        'Standard catalogue equipment (cooking ranges, reach-in chillers, planetary mixers) is typically dispatched within 7–14 business days. Custom turnkey projects or specialized rotary rack ovens require 3–4 weeks for fabrication, testing, and crating.',
    },
    {
      category: 'Delivery & Commissioning',
      question: 'Does Techmate provide on-site installation and testing?',
      answer:
        'Yes. We offer factory commissioning services where certified technicians oversee electrical connections, gas pressure regulators, water filtration lines, and test-run all heating and refrigeration cycles prior to handover.',
    },
    {
      category: 'Warranty & Support',
      question: 'What is the standard warranty on Techmate equipment?',
      answer:
        'All equipment carries a 1-year to 2-year comprehensive factory warranty against manufacturing defects. Extended Annual Maintenance Contracts (AMC) and preventative service SLAs are available for institutional and high-volume clients.',
    },
    {
      category: 'Warranty & Support',
      question: 'How can we order genuine replacement spare parts?',
      answer:
        'We maintain a centralized warehouse inventory of genuine heating elements, contactors, thermostats, gaskets, and motor assemblies. You can log a spare parts request through our Support portal or call our service desk.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F3F6FA]/50 py-8">
        <PageContainer size="narrow">
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'Frequently Asked Questions (FAQs)' }]} />
          </div>

          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-10 mb-8 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#174A83] block mb-2 font-mono">
              COMMERCIAL &amp; TECHNICAL GUIDANCE
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#102B46] font-heading">
              Frequently Asked Questions
            </h1>
            <p className="mt-3 text-sm text-[#344054] leading-relaxed">
              Find answers regarding commercial equipment ordering, custom fabrication, warranty terms, and nationwide technical service.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4 mb-12">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(idx)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-[#F3F6FA]/50 transition-colors"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#174A83] block mb-1">
                        {faq.category}
                      </span>
                      <h3 className="font-heading font-bold text-base text-[#102B46]">
                        {faq.question}
                      </h3>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full bg-[#F3F6FA] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-[#174A83] text-white' : 'text-gray-500'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-[#344054] leading-relaxed border-t border-gray-100 animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Need More Assistance Box */}
          <div className="bg-[#102B46] text-white rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading font-bold text-lg">Have a specific question not covered here?</h3>
              <p className="text-xs text-gray-300 mt-1">
                Our sales engineering team can assist with MEP utility questions or customized quotation packages.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-[#D62836] hover:bg-[#b81d29] text-white text-xs font-bold transition shrink-0"
            >
              Contact Engineering Desk
            </Link>
          </div>
        </PageContainer>
      </main>

      <Footer />
    </>
  );
}
