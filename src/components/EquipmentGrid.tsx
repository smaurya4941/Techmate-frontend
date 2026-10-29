'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/animations/MotionWrapper';
import { motion } from 'framer-motion';
import { CATEGORIES_DATA, getSubCategoriesOf } from '@/lib/products-data';
import { CategoryTile } from '@/components/products/CategoryTile';
import type { CategoryMeta } from '@/lib/catalogue';

/** `categoryMeta` holds the pictures and sub-category counts managed in the admin panel (built-in values are the fallback). */
export function EquipmentGrid({ categoryMeta = {} }: { categoryMeta?: Record<string, CategoryMeta> }) {
  const displayedCategories = CATEGORIES_DATA.slice(0, 6);

  return (
    <section className="relative z-20 -mt-6 rounded-t-[44px] bg-[#F8FAFC] pt-24 pb-28 px-6 sm:px-8 border-t border-gray-200" id="categories">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Heading and "Browse All Products" button (Fade In Left) */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-8">
            <FadeIn direction="left">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-white text-xs font-semibold tracking-wider text-[#174A83] uppercase mb-6 border border-gray-200 shadow-sm">
                  PRODUCT CATEGORIES
                </span>

                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#102B46] leading-[1.12] mb-8 font-heading">
                  Equipment<br />
                  For Every <span className="text-[#174A83]">Kitchen</span><br />
                  &amp; Bakery
                </h2>

                <p className="text-sm text-[#344054] leading-relaxed max-w-sm">
                  A complete catalogue organised by category and sub-category, from baking and cooking to refrigeration, dishwashing and beverage.
                </p>
              </div>

              <div className="pt-8 flex flex-wrap items-center gap-3">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
                  <Link
                    href="/categories"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#174A83] hover:bg-[#102B46] text-white font-bold text-sm transition-all shadow-md"
                  >
                    <span>See All Categories</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>

                <Link
                  href="/products"
                  className="inline-flex items-center px-5 py-3.5 rounded-xl bg-white hover:bg-gray-50 border border-gray-300 text-[#102B46] hover:text-[#174A83] font-semibold text-sm transition-all shadow-sm"
                >
                  Browse All Products
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: 4 category cards (Staggered Entrance) */}
          <div className="lg:col-span-8 lg:self-center">
            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4" staggerDelay={0.07}>
              {displayedCategories.map((category) => (
                <StaggerItem key={category.slug}>
                  <CategoryTile
                    slug={category.slug}
                    name={category.name}
                    imageUrl={categoryMeta[category.slug]?.imageUrl}
                    subCategoryCount={categoryMeta[category.slug]?.subCategoryCount ?? getSubCategoriesOf(category.slug).length}
                  />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

        </div>
      </div>
    </section>
  );
}
