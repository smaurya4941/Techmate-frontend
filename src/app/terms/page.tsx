import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageContainer } from '@/components/layout/PageContainer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export default function TermsPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F3F6FA]/50 py-8">
        <PageContainer size="narrow">
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'Terms of Supply & Equipment Warranty' }]} />
          </div>

          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-12 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#174A83] block mb-1 font-mono">
                COMMERCIAL CONDITIONS
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102B46] font-heading">
                Terms of Supply &amp; Commercial Warranty
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                Standard B2B Equipment Supply Conditions • Techmate Industries Pvt. Ltd.
              </p>
            </div>

            <div className="text-xs sm:text-sm text-[#344054] space-y-4 leading-relaxed">
              <p>
                These standard commercial conditions govern the supply, dispatch, warranty, and servicing of industrial kitchen, bakery, and refrigeration equipment by Techmate Industries Pvt. Ltd.
              </p>

              <h3 className="font-heading font-bold text-base text-[#102B46] pt-2">
                1. Quotations and Price Validity
              </h3>
              <p>
                All official quotations provided by Techmate Industries remain valid for 30 calendar days from the date of issuance unless explicitly specified otherwise. Prices are subject to prevailing GST rates and exclude uncrating or internal carrying charges unless contracted in writing.
              </p>

              <h3 className="font-heading font-bold text-base text-[#102B46] pt-2">
                2. Manufacturing &amp; Dispatch Lead Times
              </h3>
              <p>
                Fabrication lead times commence from the receipt of confirmed purchase order and initial advance payment. While Techmate strives to meet targeted delivery dates, lead times may be adjusted for customized stainless steel fabrication requiring site MEP approval.
              </p>

              <h3 className="font-heading font-bold text-base text-[#102B46] pt-2">
                3. Standard Warranty Terms
              </h3>
              <p>
                Techmate equipment is covered by a 1-year to 2-year factory warranty against defects in material and workmanship under normal commercial operation. The warranty does not cover damage resulting from improper utility voltage, absence of water softening units on combi steam ovens, or unauthorized third-party modifications.
              </p>

              <h3 className="font-heading font-bold text-base text-[#102B46] pt-2">
                4. Site Readiness &amp; Commissioning
              </h3>
              <p>
                The buyer is responsible for ensuring that site electrical power supply, water inlet pressures, floor drains, and gas connections comply with the equipment technical specification sheet prior to technician dispatch.
              </p>
            </div>
          </div>
        </PageContainer>
      </main>

      <Footer />
    </>
  );
}
