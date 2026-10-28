'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, FileText, CheckCircle2, Zap } from 'lucide-react';
import { ProductItem } from '@/types/product';
import { ProductImage } from './ProductImage';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export interface ProductCardProps {
  product: ProductItem;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  return (
    <div
      className={`group bg-white rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-gray-300 transition-all duration-300 flex flex-col justify-between overflow-hidden ${className}`}
    >
      <div>
        {/* Top Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-gray-100">
          <ProductImage
            src={product.image}
            alt={product.name}
            category={product.category}
            modelNumber={product.modelNumber}
          />

          {/* Model Tag Overlay */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-md bg-[#102B46]/90 backdrop-blur-sm text-white text-[10px] font-mono font-bold tracking-wider uppercase shadow-sm">
              {product.modelNumber}
            </span>
            {product.isFlagship && (
              <span className="px-2 py-1 rounded-md bg-[#D62836] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                Flagship
              </span>
            )}
          </div>

          {/* Power Source Badge */}
          <div className="absolute top-3 right-3 z-20">
            <span className="px-2 py-0.5 rounded-full bg-white/95 text-[#174A83] text-[10px] font-bold shadow-sm border border-gray-200 flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 text-[#D62836]" /> {product.powerSource}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6">
          {/* Category */}
          <div className="mb-2">
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#174A83]">
              {product.categoryName}
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-heading font-bold text-base sm:text-lg text-[#102B46] line-clamp-2 min-h-[3rem] group-hover:text-[#174A83] transition-colors leading-snug">
            <Link href={`/products/${product.slug}`} className="hover:underline">
              {product.name}
            </Link>
          </h3>

          {/* Short Description */}
          <p className="text-xs text-[#344054] line-clamp-2 mt-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Key Technical Highlights (2 items max on card) */}
          {product.keyHighlights && product.keyHighlights.length > 0 && (
            <ul className="mt-3.5 space-y-1.5 border-t border-gray-100 pt-3">
              {product.keyHighlights.slice(0, 2).map((highlight, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-1.5 text-[11px] text-[#344054] line-clamp-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#174A83] shrink-0 mt-0.5" />
                  <span className="truncate">{highlight}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Card Footer: Pricing/Quote Status & Action Buttons */}
      <div className="p-5 sm:p-6 pt-0 mt-2 border-t border-gray-100">
        <div className="flex items-center justify-between mb-4 pt-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
              Pricing Model
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-extrabold text-[#102B46]">
              Commercial RFQ / Quote
            </span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            B2B Direct Supply
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center justify-center px-3 py-2 rounded-lg text-xs font-bold text-[#174A83] bg-[#F3F6FA] hover:bg-[#e4ebf5] transition text-center"
          >
            <span>View Specs</span>
            <ArrowRight className="w-3 h-3 ml-1" />
          </Link>

          <Link
            href={`/request-quote?product=${encodeURIComponent(product.name)}&sku=${encodeURIComponent(product.modelNumber)}`}
            className="inline-flex items-center justify-center px-3 py-2 rounded-lg text-xs font-bold text-white bg-[#D62836] hover:bg-[#b81d29] shadow-sm shadow-[#D62836]/20 transition text-center"
          >
            <span>Get Quote</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
