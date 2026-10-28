'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FadeIn, StaggerGroup, StaggerItem, HoverCard } from '@/components/animations/MotionWrapper';
import { motion } from 'framer-motion';
import { CATEGORIES_DATA } from '@/lib/products-data';
import { CategoryIcon } from '@/components/products/CategoryIcon';

export function EquipmentGrid() {
  const [activeSlug, setActiveSlug] = useState<string>(CATEGORIES_DATA[0]?.slug ?? '');

  return (
    <section className="relative z-20 -mt-6 rounded-t-[44px] bg-[#08090a] pt-24 pb-28 px-6 sm:px-8 border-t border-white/10" id="categories">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Heading and "Browse All Products" button (Fade In Left) */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-8">
            <FadeIn direction="left">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#1b1e24] text-xs font-semibold tracking-wider text-gray-300 uppercase mb-6 border border-white/10">
                  PRODUCT CATEGORIES
                </span>

                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.12] mb-8 font-heading">
                  Equipment<br />
                  For Every <span className="text-[#174A83] sm:text-blue-400">Kitchen</span><br />
                  &amp; Bakery
                </h2>

                <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                  A complete catalogue organised by category and sub-category, from baking and cooking to refrigeration, dishwashing and beverage.
                </p>
              </div>

              <div className="pt-8">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
                  <Link
                    href="/products"
                    className="inline-flex items-center px-8 py-3.5 rounded-xl bg-[#22242a] hover:bg-[#2b2e36] text-white font-semibold text-sm transition-all border border-white/5 shadow-lg"
                  >
                    Browse All Products
                  </Link>
                </motion.div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: category cards (Staggered Entrance) */}
          <div className="lg:col-span-8">
            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-5" staggerDelay={0.07}>
              {CATEGORIES_DATA.map((category) => {
                const isActive = activeSlug === category.slug;
                return (
                  <StaggerItem key={category.slug}>
                    <HoverCard yOffset={-5} scale={1.015}>
                      <Link
                        href={`/products?category=${category.slug}`}
                        onMouseEnter={() => setActiveSlug(category.slug)}
                        onFocus={() => setActiveSlug(category.slug)}
                        className={`group block p-7 rounded-[26px] transition-all duration-300 shadow-xl h-full min-h-[190px] ${
                          isActive
                            ? 'bg-[#174A83] text-white border-2 border-blue-400 shadow-blue-900/40'
                            : 'bg-[#111215] border border-white/5 hover:border-white/20 text-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className="text-xl font-bold font-heading text-white">{category.name}</h3>
                          <CategoryIcon
                            category={category.slug}
                            className={`w-8 h-8 shrink-0 transition-colors ${
                              isActive ? 'text-white' : 'text-blue-400'
                            }`}
                          />
                        </div>
                        <p className={`text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3 ${isActive ? 'text-blue-100' : 'text-gray-400'}`}>
                          {category.description}
                        </p>
                        <span className="inline-flex items-center text-sm font-semibold text-white">
                          <span>Explore</span>
                          <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                      </Link>
                    </HoverCard>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>
          </div>

        </div>
      </div>
    </section>
  );
}
