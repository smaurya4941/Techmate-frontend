'use client';

import React, { useState, useMemo } from 'react';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageContainer } from '@/components/layout/PageContainer';
import { CategoryTile } from '@/components/products/CategoryTile';
import type { CategoryMeta } from '@/lib/catalogue';
import { CATEGORIES_DATA, getSubCategoriesOf } from '@/lib/products-data';
import { Search } from 'lucide-react';

/** `categoryMeta` holds the pictures and sub-category counts managed in the admin panel (built-in values are the fallback). */
export function CategoriesClient({ categoryMeta = {} }: { categoryMeta?: Record<string, CategoryMeta> }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter categories and their subcategories based on search input
  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      return CATEGORIES_DATA.map((cat) => ({
        ...cat,
        subCategories: getSubCategoriesOf(cat.slug),
      }));
    }

    return CATEGORIES_DATA.map((cat) => {
      const allSubs = getSubCategoriesOf(cat.slug);
      const matchesCat =
        cat.name.toLowerCase().includes(q) || cat.description.toLowerCase().includes(q);
      const matchingSubs = allSubs.filter((sub) => sub.name.toLowerCase().includes(q));

      return {
        ...cat,
        subCategories: allSubs,
        hasMatches: matchesCat || matchingSubs.length > 0,
        matchingSubNames: matchingSubs.map((s) => s.name),
      };
    }).filter((cat) => cat.hasMatches);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#344054] antialiased">
      {/* 1. Header */}
      <Header />

      <main className="flex-1 py-8 sm:py-10">
        <PageContainer>
          {/* Top Card: Exactly like reference layout */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-8 mb-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102B46] font-heading tracking-tight">
                Category
              </h1>
              <p className="mt-1 text-sm font-medium text-[#174A83]">
                Find your favourite categories
              </p>
            </div>

            {/* Search Input with Solid Blue Button on Right */}
            <form onSubmit={handleSearchSubmit} className="w-full md:w-auto">
              <div className="flex items-center w-full md:w-[360px] lg:w-[420px] rounded-xl border border-gray-300 focus-within:border-[#174A83] bg-white overflow-hidden shadow-sm transition">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search categories"
                  className="flex-1 px-4 py-2.5 text-sm text-[#102B46] placeholder-gray-400 outline-none bg-transparent"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="bg-[#174A83] hover:bg-[#102B46] text-white px-4 py-3 transition flex items-center justify-center shrink-0"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* 4 Categories in One Row Grid (4 columns on desktop) */}
          {filteredCategories.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200/80 p-12 text-center my-8 shadow-sm">
              <h3 className="text-lg font-bold text-[#102B46] mb-1">No categories found</h3>
              <p className="text-sm text-gray-500 mb-5">
                No equipment category matches &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="px-5 py-2 rounded-xl bg-[#174A83] text-white text-xs font-semibold hover:bg-[#102B46] transition"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-12">
              {filteredCategories.map((category) => (
                <CategoryTile
                  key={category.slug}
                  slug={category.slug}
                  name={category.name}
                  imageUrl={categoryMeta[category.slug]?.imageUrl}
                  subCategoryCount={categoryMeta[category.slug]?.subCategoryCount ?? category.subCategories.length}
                />
              ))}
            </div>
          )}
        </PageContainer>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
