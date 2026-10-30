'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageContainer } from '@/components/layout/PageContainer';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilterSidebar } from '@/components/products/ProductFilterSidebar';
import { Pagination } from '@/components/ui/Pagination';
import {
  SAMPLE_PRODUCTS,
  CATEGORIES_DATA,
  getSubCategory,
  getSubCategoriesOf,
} from '@/lib/products-data';
import { getProducts, mapApiSummaryToProductItem } from '@/lib/catalogue';
import type { ProductItem } from '@/types/product';
import { SlidersHorizontal, Search, X, ChevronDown } from 'lucide-react';

function ProductListingContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const subCategoryParam = searchParams.get('subcategory');
  const searchParam = searchParams.get('search');

  // The admin panel (API) is the source of truth; the built-in catalogue is used only while the API is unreachable.
  const [allProducts, setAllProducts] = useState<ProductItem[]>(SAMPLE_PRODUCTS);
  const [isLoadingApi, setIsLoadingApi] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadApiProducts() {
      try {
        setIsLoadingApi(true);
        const res = await getProducts({ per_page: 100 });
        if (isMounted && Array.isArray(res?.data)) {
          setAllProducts(res.data.map(mapApiSummaryToProductItem));
        }
      } catch {
        // API unreachable: keep the built-in catalogue
      } finally {
        if (isMounted) setIsLoadingApi(false);
      }
    }

    loadApiProducts();
    return () => {
      isMounted = false;
    };
  }, []);

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

  const ITEMS_PER_PAGE = 9;

  // Sync search from the URL
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
    return allProducts.filter((item) => {
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
  }, [allProducts, selectedCategory, selectedSubCategory, selectedPower, searchQuery, sortBy]);

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
          {/* Breadcrumbs & Page Header */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2">
            <div>
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
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102B46] font-heading tracking-tight mt-2">
                {currentSubCategoryObj
                  ? currentSubCategoryObj.name
                  : currentCategoryObj
                    ? currentCategoryObj.name
                    : 'Commercial Kitchen Equipment & Machinery'}
              </h1>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Direct Factory Supply • ISO 9001:2015
              </span>
            </div>
          </div>

          {/* Layout: Sidebar + Main Results Area */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24">
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
            <div className="lg:col-span-3 space-y-5">
              {/* Search, Sort, and Mobile Filter Toolbar */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/90 shadow-sm space-y-3.5">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  {/* Search Input with Clear Button */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      placeholder="Filter by name, model (e.g. XEBC), brand..."
                      className="w-full pl-10 pr-9 py-2.5 bg-[#F8FAFC] hover:bg-white focus:bg-white rounded-xl border border-gray-200 focus:border-[#174A83] focus:ring-2 focus:ring-[#174A83]/10 text-xs sm:text-sm text-[#102B46] placeholder:text-gray-400 outline-none transition-all"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery('');
                          setCurrentPage(1);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
                        aria-label="Clear search"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    {/* Mobile Filter Toggle */}
                    <button
                      type="button"
                      onClick={() => setMobileFiltersOpen(true)}
                      className="lg:hidden flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#F8FAFC] text-xs font-bold text-[#102B46] hover:bg-gray-100 transition"
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
                      <span className="text-xs font-medium text-gray-500 hidden sm:inline">Sort:</span>
                      <div className="relative">
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value as 'name' | 'model')}
                          className="appearance-none text-xs font-semibold text-[#102B46] bg-[#F8FAFC] hover:bg-white border border-gray-200 rounded-xl pl-3 pr-8 py-2.5 outline-none focus:border-[#174A83] focus:ring-2 focus:ring-[#174A83]/10 transition-all cursor-pointer"
                        >
                          <option value="name">Product Name (A-Z)</option>
                          <option value="model">Model Number / SKU</option>
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Active Filter Chips */}
                {activeFilterCount > 0 && (
                  <div className="pt-3 border-t border-gray-100 flex items-center flex-wrap gap-2 text-xs">
                    <span className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">
                      Active Filters:
                    </span>

                    {selectedCategory !== 'all' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#EAF0F8] text-[#174A83] text-xs font-semibold">
                        <span>Category: {currentCategoryObj?.name || selectedCategory}</span>
                        <button
                          type="button"
                          onClick={() => handleCategoryChange('all')}
                          className="hover:text-[#D62836] transition p-0.5"
                          aria-label="Remove category filter"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}

                    {selectedSubCategory !== 'all' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#EAF0F8] text-[#174A83] text-xs font-semibold">
                        <span>Type: {currentSubCategoryObj?.name || selectedSubCategory}</span>
                        <button
                          type="button"
                          onClick={() => handleSubCategoryChange('all')}
                          className="hover:text-[#D62836] transition p-0.5"
                          aria-label="Remove subcategory filter"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}

                    {selectedPower !== 'all' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#EAF0F8] text-[#174A83] text-xs font-semibold">
                        <span>Power: {selectedPower.charAt(0).toUpperCase() + selectedPower.slice(1)}</span>
                        <button
                          type="button"
                          onClick={() => handlePowerChange('all')}
                          className="hover:text-[#D62836] transition p-0.5"
                          aria-label="Remove power filter"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}

                    {searchQuery.trim() && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#EAF0F8] text-[#174A83] text-xs font-semibold">
                        <span>Query: &ldquo;{searchQuery}&rdquo;</span>
                        <button
                          type="button"
                          onClick={() => {
                            setSearchQuery('');
                            setCurrentPage(1);
                          }}
                          className="hover:text-[#D62836] transition p-0.5"
                          aria-label="Clear search query"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="text-xs font-bold text-[#D62836] hover:underline ml-1"
                    >
                      Clear All
                    </button>
                  </div>
                )}
              </div>

              {/* Status Header */}
              <div className="flex items-center justify-between text-xs text-gray-500 px-1">
                <span>
                  Showing{' '}
                  <strong className="text-[#102B46] font-bold">
                    {filteredProducts.length === 0
                      ? 0
                      : `${(currentPage - 1) * ITEMS_PER_PAGE + 1}–${Math.min(
                          currentPage * ITEMS_PER_PAGE,
                          filteredProducts.length
                        )}`}
                  </strong>{' '}
                  of <strong className="text-[#102B46] font-bold">{filteredProducts.length}</strong> equipment models
                  {selectedCategory !== 'all' && (
                    <span className="text-[#174A83] font-semibold">
                      {' '}in {currentSubCategoryObj?.name || currentCategoryObj?.name || selectedCategory}
                    </span>
                  )}
                  {isLoadingApi && <span className="ml-2 text-blue-600 font-mono">(Syncing...)</span>}
                </span>
                <span className="text-[11px] font-mono text-gray-400 hidden sm:inline">
                  Page {currentPage} of {Math.max(1, totalPages)}
                </span>
              </div>

              {/* Product Grid */}
              <ProductGrid
                products={paginatedProducts}
                onResetFilters={handleResetFilters}
              />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pt-6 flex justify-center">
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
