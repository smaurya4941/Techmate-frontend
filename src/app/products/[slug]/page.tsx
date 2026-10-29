import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageContainer } from '@/components/layout/PageContainer';
import { ProductGallery } from '@/components/products/ProductGallery';
import { ProductSpecificationList } from '@/components/products/ProductSpecificationList';
import { RelatedProducts } from '@/components/products/RelatedProducts';
import { SAMPLE_PRODUCTS } from '@/lib/products-data';
import { getProduct, mapApiDetailToProductItem } from '@/lib/catalogue';
import { Badge } from '@/components/ui/Badge';
import type { ProductItem } from '@/types/product';
import {
  ShieldCheck,
  Award,
  ArrowRight,
  Download,
  Phone,
  CheckCircle2,
  Zap,
  HelpCircle,
  FileCheck,
  FileText,
} from 'lucide-react';

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/** Pre-render all known sample products at build time */
export async function generateStaticParams() {
  return SAMPLE_PRODUCTS.map((p) => ({
    slug: p.slug,
  }));
}

/** Dynamic metadata per product */
export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  let product: ProductItem | undefined = SAMPLE_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    try {
      const res = await getProduct(slug);
      if (res?.data) {
        product = mapApiDetailToProductItem(res.data);
      }
    } catch {
      // not found
    }
  }

  if (!product) {
    return {
      title: 'Product Not Found | Techmate Industries',
    };
  }

  return {
    title: `${product.name} (${product.modelNumber}) | Techmate Industries`,
    description: product.shortDescription,
    keywords: [
      product.name,
      product.modelNumber,
      product.categoryName,
      'commercial kitchen equipment',
      'Techmate Industries',
    ],
    openGraph: {
      title: `${product.name} | Techmate Industries`,
      description: product.shortDescription,
      images: [{ url: product.image, alt: product.name }],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  let product: ProductItem | undefined = SAMPLE_PRODUCTS.find((p) => p.slug === slug);

  // If not in static fixtures, fetch dynamically from the Laravel REST API
  if (!product) {
    try {
      const res = await getProduct(slug);
      if (res?.data) {
        product = mapApiDetailToProductItem(res.data);
      }
    } catch {
      // API unreachable or 404
    }
  }

  if (!product) {
    notFound();
  }

  // Schema.org Product structured data
  const jsonLdProduct = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.fullDescription,
    sku: product.modelNumber,
    mpn: product.modelNumber,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Techmate Industries',
    },
    category: product.categoryName,
    offers: {
      '@type': 'Offer',
      url: `https://techmateindustries.com/products/${product.slug}`,
      priceCurrency: 'INR',
      price: '0.00',
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };

  // Schema.org Breadcrumbs
  const jsonLdBreadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://techmateindustries.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: 'https://techmateindustries.com/products',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.categoryName,
        item: `https://techmateindustries.com/products?category=${product.category}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: product.name,
        item: `https://techmateindustries.com/products/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }}
      />

      <Header />

      <main className="min-h-screen bg-[#F3F6FA]/50 py-8">
        <PageContainer>
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: 'Products', href: '/products' },
                {
                  label: product.categoryName,
                  href: `/products?category=${product.category}`,
                },
                { label: product.name },
              ]}
            />
          </div>

          {/* 1. Main Product Overview Grid (2 Columns on Desktop) */}
          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-10 shadow-sm mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Left Column: Interactive Image Gallery (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <ProductGallery
                  primaryImage={product.image}
                  galleryImages={product.galleryImages}
                  productName={product.name}
                  category={product.category}
                  modelNumber={product.modelNumber}
                  isFlagship={product.isFlagship}
                />

                {/* Badges / Guarantees */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-[#F3F6FA] border border-gray-100 flex items-center gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <div className="text-[10px] font-bold uppercase text-gray-500">
                        Warranty SLA
                      </div>
                      <div className="text-xs font-bold text-[#102B46] leading-tight">
                        {product.warrantyPeriod}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F3F6FA] border border-gray-100 flex items-center gap-2.5">
                    <Award className="w-5 h-5 text-[#174A83] shrink-0" />
                    <div>
                      <div className="text-[10px] font-bold uppercase text-gray-500">
                        Quality Standard
                      </div>
                      <div className="text-xs font-bold text-[#102B46] leading-tight">
                        ISO 9001:2015 / CE
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Key Details & Quotation CTA (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  {/* Category & Power Badges */}
                  <div className="flex items-center flex-wrap gap-2 mb-3">
                    <Badge variant="primary">{product.categoryName}</Badge>
                    <Badge variant="neutral">
                      <Zap className="w-3 h-3 text-[#D62836]" /> {product.powerSource} Powered
                    </Badge>
                    <Badge variant="success">B2B Heavy Duty</Badge>
                  </div>

                  {/* Product Title */}
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#102B46] font-heading tracking-tight leading-tight">
                    {product.name}
                  </h1>

                  {/* SKU & Brand Line */}
                  <div className="mt-2 flex items-center gap-4 text-xs text-gray-500 pb-4 border-b border-gray-100">
                    <span>
                      Model SKU: <strong className="font-mono text-[#102B46]">{product.modelNumber}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Brand: <strong className="text-[#102B46]">{product.brand || 'Techmate® Heavy Duty'}</strong>
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-sm text-[#344054] leading-relaxed">
                    {product.fullDescription}
                  </p>

                  {/* Key Highlights Checklist */}
                  <div className="mt-6 bg-[#F3F6FA] rounded-2xl p-5 border border-gray-200/80">
                    <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-[#102B46] mb-3">
                      Core Engineering Highlights
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {product.keyHighlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#344054]">
                          <CheckCircle2 className="w-4 h-4 text-[#174A83] shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Download Brochure Link if Available */}
                  {product.brochureUrl && (
                    <div className="mt-4">
                      <a
                        href={product.brochureUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold text-[#174A83] hover:text-[#D62836] transition p-2 rounded-lg border border-gray-200 bg-white shadow-sm"
                      >
                        <FileText className="w-4 h-4 text-[#D62836]" />
                        <span>Download Technical PDF Datasheet</span>
                        <Download className="w-3.5 h-3.5 ml-1" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Direct Conversion Actions */}
                <div className="pt-6 border-t border-gray-100 space-y-4">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Link
                      href={`/request-quote?product=${encodeURIComponent(product.name)}&sku=${encodeURIComponent(product.modelNumber)}&slug=${encodeURIComponent(product.slug)}`}
                      className="w-full sm:w-auto flex-1 inline-flex items-center justify-center px-8 py-4 rounded-xl text-sm font-extrabold text-white bg-[#D62836] hover:bg-[#b81d29] shadow-lg shadow-[#D62836]/25 transition transform hover:-translate-y-0.5"
                    >
                      <span>Request Official Price Quotation</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>

                    <Link
                      href={`/contact?subject=Technical Inquiry for ${encodeURIComponent(product.modelNumber)}`}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-xl text-sm font-bold text-[#174A83] bg-[#174A83]/10 hover:bg-[#174A83]/20 transition"
                    >
                      <HelpCircle className="w-4 h-4 mr-2" />
                      <span>Ask Technical Specialist</span>
                    </Link>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
                    <span className="flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4 text-emerald-600" />
                      Direct OEM Factory Dispatch
                    </span>
                    <a
                      href="tel:+918008324628"
                      className="font-bold text-[#174A83] hover:underline flex items-center gap-1"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#D62836]" />
                      +91 800-TECHMATE
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Structured Technical Specifications */}
          <div className="mb-12">
            <div className="mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#174A83] block mb-1">
                ENGINEERING DATA SHEET
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102B46] font-heading">
                Comprehensive Technical Specifications
              </h2>
              <p className="mt-2 text-sm text-[#344054]">
                Verified mechanical, electrical, and thermal parameters for MEP consultants and kitchen planners.
              </p>
            </div>

            <ProductSpecificationList specifications={product.specifications} />
          </div>

          {/* 3. Related Products Section */}
          <RelatedProducts
            products={SAMPLE_PRODUCTS}
            currentProductId={product.id}
            category={product.category}
          />
        </PageContainer>
      </main>

      <Footer />
    </>
  );
}
