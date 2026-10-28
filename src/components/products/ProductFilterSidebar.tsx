'use client';

import React from 'react';
import {
  CATEGORIES_DATA,
  countProductsInSubCategory,
  getSubCategoriesOf,
} from '@/lib/products-data';
import { Filter, X, RotateCcw, Check } from 'lucide-react';
import { Button } from '../ui/Button';

export interface ProductFilterSidebarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedSubCategory: string;
  onSelectSubCategory: (subCategory: string) => void;
  selectedPower: string;
  onSelectPower: (power: string) => void;
  onReset: () => void;
  activeFilterCount: number;
  className?: string;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

export const ProductFilterSidebar: React.FC<ProductFilterSidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedSubCategory,
  onSelectSubCategory,
  selectedPower,
  onSelectPower,
  onReset,
  activeFilterCount,
  className = '',
  isMobileDrawer = false,
  onCloseMobileDrawer,
}) => {
  const powerOptions = ['All', 'Electric', 'Gas'];

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-6 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#174A83]" />
          <h3 className="font-heading font-bold text-sm text-[#102B46] uppercase tracking-wider">
            Catalogue Filters
          </h3>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#D62836] text-white text-[10px] font-bold flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={onReset}
              className="text-[11px] font-semibold text-gray-500 hover:text-[#D62836] flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          )}

          {isMobileDrawer && onCloseMobileDrawer && (
            <button
              type="button"
              onClick={onCloseMobileDrawer}
              className="p-1 rounded-md text-gray-400 hover:text-gray-700"
              aria-label="Close filters"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* 1. Category Filter */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#102B46] mb-3">
          Equipment Category
        </label>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => onSelectCategory('all')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition ${
              selectedCategory === 'all'
                ? 'bg-[#174A83] text-white font-bold shadow-sm'
                : 'text-[#344054] hover:bg-[#F3F6FA]'
            }`}
          >
            <span>All Equipment Categories</span>
            {selectedCategory === 'all' && <Check className="w-3.5 h-3.5" />}
          </button>

          {CATEGORIES_DATA.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            const subCategories = isSelected ? getSubCategoriesOf(cat.slug) : [];
            return (
              <div key={cat.slug}>
                <button
                  type="button"
                  onClick={() => onSelectCategory(cat.slug)}
                  aria-pressed={isSelected}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                    isSelected
                      ? 'bg-[#174A83] text-white font-bold shadow-sm'
                      : 'text-[#344054] hover:bg-[#F3F6FA]'
                  }`}
                >
                  <span className="truncate pr-2">{cat.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {cat.itemCount}
                  </span>
                </button>

                {subCategories.length > 0 && (
                  <div className="mt-1 mb-2 ml-3 pl-3 border-l-2 border-[#174A83]/20 space-y-1">
                    <button
                      type="button"
                      onClick={() => onSelectSubCategory('all')}
                      aria-pressed={selectedSubCategory === 'all'}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md text-[11px] transition ${
                        selectedSubCategory === 'all'
                          ? 'bg-[#F3F6FA] text-[#174A83] font-bold'
                          : 'text-gray-500 hover:text-[#174A83] hover:bg-[#F3F6FA]'
                      }`}
                    >
                      All {cat.name}
                    </button>
                    {subCategories.map((sub) => {
                      const isSubSelected = selectedSubCategory === sub.slug;
                      return (
                        <button
                          key={sub.slug}
                          type="button"
                          onClick={() => onSelectSubCategory(sub.slug)}
                          aria-pressed={isSubSelected}
                          className={`w-full text-left px-2.5 py-1.5 rounded-md text-[11px] flex items-center justify-between transition ${
                            isSubSelected
                              ? 'bg-[#F3F6FA] text-[#174A83] font-bold'
                              : 'text-gray-500 hover:text-[#174A83] hover:bg-[#F3F6FA]'
                          }`}
                        >
                          <span className="truncate pr-2">{sub.name}</span>
                          <span className="text-[10px] text-gray-400">
                            {countProductsInSubCategory(sub.slug)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Power Source Filter */}
      <div className="pt-4 border-t border-gray-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#102B46] mb-3">
          Power Source / Utility
        </label>
        <div className="flex flex-wrap gap-2">
          {powerOptions.map((power) => {
            const isSelected = selectedPower.toLowerCase() === power.toLowerCase();
            return (
              <button
                key={power}
                type="button"
                onClick={() => onSelectPower(power.toLowerCase())}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  isSelected
                    ? 'bg-[#102B46] text-white shadow-sm'
                    : 'bg-[#F3F6FA] text-[#344054] hover:bg-gray-200'
                }`}
              >
                {power}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. B2B Assistance Box */}
      <div className="pt-4 border-t border-gray-100 bg-[#F3F6FA] -mx-5 -mb-5 p-5 rounded-b-2xl">
        <h4 className="text-xs font-bold text-[#102B46] mb-1">Custom Fabrication?</h4>
        <p className="text-[11px] text-[#344054] leading-relaxed mb-3">
          Need non-standard dimensions, custom CAD layouts, or multi-unit project pricing?
        </p>
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs"
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.location.href = '/request-quote';
            }
          }}
        >
          Request Project Consultation
        </Button>
      </div>
    </div>
  );
};
