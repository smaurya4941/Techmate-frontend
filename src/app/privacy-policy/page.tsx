import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageContainer } from '@/components/layout/PageContainer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F3F6FA]/50 py-8">
        <PageContainer size="narrow">
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
          </div>

          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-12 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#174A83] block mb-1 font-mono">
                LEGAL COMPLIANCE &amp; DATA PRIVACY
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102B46] font-heading">
                Privacy Policy
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                Last Updated: October 2026 • Techmate Industries Pvt. Ltd.
              </p>
            </div>

            <div className="text-xs sm:text-sm text-[#344054] space-y-4 leading-relaxed">
              <p>
                Techmate Industries Pvt. Ltd. (&ldquo;Techmate&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting the privacy and confidentiality of corporate clients, dealers, and visitors who interact with our website and digital services.
              </p>

              <h3 className="font-heading font-bold text-base text-[#102B46] pt-2">
                1. Information We Collect
              </h3>
              <p>
                When you request a price quotation, submit a dealer expression of interest, or register a service ticket, we collect business contact details including your name, corporate email address, telephone number, company name, delivery location, and specific equipment requirements.
              </p>

              <h3 className="font-heading font-bold text-base text-[#102B46] pt-2">
                2. Use of Business Information
              </h3>
              <p>
                The information provided is strictly utilized to:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs">
                <li>Generate and dispatch formal commercial equipment quotations and proforma invoices.</li>
                <li>Coordinate logistics, delivery timelines, and factory site inspections.</li>
                <li>Assign authorized factory service engineers for commissioning and maintenance.</li>
                <li>Distribute relevant technical product brochures, user manuals, and safety bulletins.</li>
              </ul>

              <h3 className="font-heading font-bold text-base text-[#102B46] pt-2">
                3. Data Security &amp; Confidentiality
              </h3>
              <p>
                We do not sell, rent, or lease our commercial lead database to third-party marketing companies. Data is protected using encrypted HTTPS channels and accessible exclusively by authorized sales engineering and customer service staff.
              </p>

              <h3 className="font-heading font-bold text-base text-[#102B46] pt-2">
                4. Contact for Privacy Inquiries
              </h3>
              <p>
                If you have questions regarding your data or wish to update your business contact records, please contact our compliance desk at{' '}
                <a href="mailto:privacy@techmateindustries.com" className="text-[#174A83] font-bold underline">
                  privacy@techmateindustries.com
                </a>.
              </p>
            </div>
          </div>
        </PageContainer>
      </main>

      <Footer />
    </>
  );
}
