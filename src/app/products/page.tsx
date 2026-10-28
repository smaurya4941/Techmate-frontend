'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageContainer } from '@/components/layout/PageContainer';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilterSidebar } from '@/components/products/ProductFilterSidebar';
import { SearchInput } from '@/components/ui/Input';
import { Pagination } from '@/components/ui/Pagination';
import {
  SAMPLE_PRODUCTS,
  CATEGORIES_DATA,
  getSubCategory,
  getSubCategoriesOf,
} from '@/lib/products-data';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';

function ProductListingContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const subCategoryParam = searchParams.get('subcategory');
  const searchParam = searchParams.get('search');

  // Category and sub-category live in the URL so links from the menu, footer and
  // brand pages are shareable and the browser back button works. Unknown values
  // fall back to "all" instead of rendering an empty catalogue.
  const selectedCategory =
    categoryParam && CATEGORIES_DATA.some((c) => c.slug === categoryParam) ? categoryParam : 'all';
  const selectedSubCategory =
    selectedCategory !== 'all' &&
    subCategoryParam &&
    getSubCategoriesOf(selectedCategory).some((s) => s.slug === subCategoryParam)
      ? subCategoryParam
      : 'all';

  // Local filter states
  const [selectedPower, setSelectedPower] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>(searchParam ?? '');
  const [sortBy, setSortBy] = useState<'name' | 'model'>('name');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  const ITEMS_PER_PAGE = 6;

  // Sync search from the URL (header search box) and reset to page 1 whenever the
  // URL-driven filters change. State is adjusted during render rather than in an effect.
  const [prevSearchParam, setPrevSearchParam] = useState(searchParam);
  if (searchParam !== prevSearchParam) {
    setPrevSearchParam(searchParam);
    if (searchParam) {
      setSearchQuery(searchParam);
      setCurrentPage(1);
    }
  }
  const filterKey = `${selectedCategory}/${selectedSubCategory}`;
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey);
    setCurrentPage(1);
  }

  const updateUrl = (category: string, subCategory: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    if (category === 'all' || subCategory === 'all') {
      params.delete('subcategory');
    } else {
      params.set('subcategory', subCategory);
    }
    params.delete('search');
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const handleCategoryChange = (cat: string) => {
    updateUrl(cat, 'all');
  };

  const handleSubCategoryChange = (sub: string) => {
    updateUrl(selectedCategory, sub);
  };

  const handlePowerChange = (power: string) => {
    setSelectedPower(power);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedPower('all');
    setSearchQuery('');
    setCurrentPage(1);
    router.replace(pathname, { scroll: false });
  };

  // Filter calculations
  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Sub-category filter
      if (selectedSubCategory !== 'all' && item.subCategory !== selectedSubCategory) {
        return false;
      }

      // Power filter
      if (selectedPower !== 'all') {
        if (selectedPower === 'electric' && item.powerSource !== 'Electric') return false;
        if (selectedPower === 'gas' && item.powerSource !== 'Gas') return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesModel = item.modelNumber.toLowerCase().includes(query);
        const matchesDesc = item.shortDescription.toLowerCase().includes(query);
        const matchesCategory = item.categoryName.toLowerCase().includes(query);
        if (!matchesName && !matchesModel && !matchesDesc && !matchesCategory) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'model') {
        return a.modelNumber.localeCompare(b.modelNumber);
      }
      return a.name.localeCompare(b.name);
    });
  }, [selectedCategory, selectedSubCategory, selectedPower, searchQuery, sortBy]);

  // Pagination slice
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const activeFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedSubCategory !== 'all' ? 1 : 0) +
    (selectedPower !== 'all' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const currentCategoryObj = CATEGORIES_DATA.find((c) => c.slug === selectedCategory);
  const currentSubCategoryObj =
    selectedSubCategory !== 'all' ? getSubCategory(selectedSubCategory) : undefined;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F3F6FA]/60 py-8">
        <PageContainer>
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: 'Products', href: '/products' },
                ...(currentCategoryObj
                  ? [
                      {
                        label: currentCategoryObj.name,
                        href: `/products?category=${currentCategoryObj.slug}`,
                      },
                    ]
                  : []),
                ...(currentSubCategoryObj ? [{ label: currentSubCategoryObj.name }] : []),
              ]}
            />
          </div>

          {/* Page Heading & Intro */}
          <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-8 mb-8 shadow-sm">
            <div className="max-w-3xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#174A83] block mb-1">
                INDUSTRIAL SPECIFICATION CATALOGUE
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#102B46] font-heading">
                {currentSubCategoryObj
                  ? currentSubCategoryObj.name
                  : currentCategoryObj
                    ? currentCategoryObj.name
                    : 'Commercial Equipment & Food-Service Machinery'}
              </h1>
              <p className="mt-3 text-sm text-[#344054] leading-relaxed">
                {currentCategoryObj
                  ? currentCategoryObj.description
                  : 'Explore certified heavy-duty cooking ranges, rotary rack ovens, planetary mixers, blast chillers, and turnkey food-service machinery engineered for 24/7 demanding hospitality environments.'}
              </p>
            </div>
          </div>

          {/* Layout: Sidebar + Main Results Area */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-28">
                <ProductFilterSidebar
                  selectedCategory={selectedCategory}
                  onSelectCategory={handleCategoryChange}
                  selectedSubCategory={selectedSubCategory}
                  onSelectSubCategory={handleSubCategoryChange}
                  selectedPower={selectedPower}
                  onSelectPower={handlePowerChange}
                  onReset={handleResetFilters}
                  activeFilterCount={activeFilterCount}
                />
              </div>
            </div>

            {/* Results Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Search, Sort, and Mobile Filter Bar */}
              <div className="bg-white p-4 rounded-xl border border-gray-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Search Input */}
                <div className="w-full sm:max-w-sm">
                  <SearchInput
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Filter by name, model (e.g. TM-CO)..."
                  />
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-3">
                  {/* Mobile Filter Toggle */}
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-gray-300 bg-[#F3F6FA] text-xs font-bold text-[#102B46]"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#174A83]" />
                    <span>Filters</span>
                    {activeFilterCount > 0 && (
                      <span className="w-4 h-4 rounded-full bg-[#D62836] text-white text-[9px] font-bold flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>

                  {/* Sort Controls */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 hidden sm:inline">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'name' | 'model')}
                      className="text-xs font-semibold text-[#102B46] bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-2 outline-none focus:border-[#174A83]"
                    >
                      <option value="name">Product Name (A-Z)</option>
                      <option value="model">Model Number / SKU</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Status Header */}
              <div className="flex items-center justify-between text-xs text-gray-500 px-1">
                <span>
                  Showing <strong className="text-[#102B46]">{filteredProducts.length}</strong> equipment models
                  {selectedCategory !== 'all' &&
                    ` in ${currentSubCategoryObj?.name || currentCategoryObj?.name || selectedCategory}`}
                </span>
                <span className="text-[11px] font-mono text-gray-400">
                  Direct Factory Supply • ISO 9001:2015
                </span>
              </div>

              {/* Product Grid */}
              <ProductGrid
                products={paginatedProducts}
                onResetFilters={handleResetFilters}
              />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pt-8 flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </PageContainer>
      </main>

      {/* Mobile Filter Drawer Overlay */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs h-full bg-white shadow-2xl p-6 overflow-y-auto">
            <ProductFilterSidebar
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryChange}
              selectedSubCategory={selectedSubCategory}
              onSelectSubCategory={(sub) => {
                handleSubCategoryChange(sub);
                setMobileFiltersOpen(false);
              }}
              selectedPower={selectedPower}
              onSelectPower={(power) => {
                handlePowerChange(power);
                setMobileFiltersOpen(false);
              }}
              onReset={() => {
                handleResetFilters();
                setMobileFiltersOpen(false);
              }}
              activeFilterCount={activeFilterCount}
              isMobileDrawer
              onCloseMobileDrawer={() => setMobileFiltersOpen(false)}
            />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default function ProductListingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F3F6FA]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#174A83]" />
        </div>
      }
    >
      <ProductListingContent />
    </Suspense>
  );
}
