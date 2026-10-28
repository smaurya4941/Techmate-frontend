import React, { Suspense } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { MetricsTicker } from '@/components/MetricsTicker';
import { EquipmentGrid } from '@/components/EquipmentGrid';
import { BrandsShowcase } from '@/components/home/BrandsShowcase';
import { SolutionsShowcase } from '@/components/home/SolutionsShowcase';
import { ServicesOverview } from '@/components/home/ServicesOverview';
import { AboutFactoryBanner } from '@/components/AboutFactoryBanner';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { CaseStudiesCarousel } from '@/components/CaseStudiesCarousel';
import { SplitCtaBanner } from '@/components/SplitCtaBanner';
import { MarqueeTicker } from '@/components/MarqueeTicker';
import { ProcessSteps } from '@/components/ProcessSteps';
import { Testimonials } from '@/components/Testimonials';
import { TechnicalInsights } from '@/components/TechnicalInsights';
import { QuoteForm } from '@/components/QuoteForm';
import { Footer } from '@/components/Footer';
import { MobileStickyBar } from '@/components/MobileStickyBar';
import { FloatingRightSidebar } from '@/components/FloatingRightSidebar';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { getApiHealth } from '@/lib/api';

export const revalidate = 60; // ISR revalidation every 60s

export default async function Home() {
  // Gracefully fetch backend health to verify system status without blocking the UI
  let apiStatus: 'online' | 'offline' = 'offline';
  try {
    const health = await getApiHealth();
    if (health.isOnline) {
      apiStatus = 'online';
    }
  } catch {
    apiStatus = 'offline';
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0d14] text-gray-200 antialiased selection:bg-[#D62836] selection:text-white relative">
      {/* 1. Header with Top Utility Bar & Official Techmate Brand Logo */}
      <Header apiHealthStatus={apiStatus} />

      <main className="flex-1 w-full">
        {/* 1. Hero: TECHNIFYING YOUR KITCHEN */}
        <Hero />
        <MetricsTicker />

        {/* 2. Authorised Brands */}
        <BrandsShowcase />

        {/* 3. Product Categories */}
        <EquipmentGrid />

        {/* 4. Solutions */}
        <SolutionsShowcase />

        {/* 5. Why Techmate */}
        <WhyChooseUs />

        {/* 6. Featured Projects */}
        <CaseStudiesCarousel />

        {/* 7. Customer Reviews */}
        <Testimonials />

        {/* Supporting sections */}
        <AboutFactoryBanner />
        <ServicesOverview />
        <SplitCtaBanner />
        <MarqueeTicker />
        <ProcessSteps />
        <TechnicalInsights />
        <QuoteForm />
      </main>

      {/* 8. Final CTA: pre-footer banner "Building or upgrading your kitchen?", then the footer */}
      <Footer />

      {/* Floating Right Sidebar (from Screenshots 1, 2, 3) */}
      <FloatingRightSidebar />

      {/* Circular Scroll-to-Top Button (from Screenshots 2, 3) */}
      <ScrollToTopButton />

      {/* Mobile Sticky Call & Quote Bar (Hidden on Desktop) */}
      <MobileStickyBar />
    </div>
  );
}
