'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ProductImage } from '@/components/products/ProductImage';
import type { EquipmentCategory } from '@/types/product';
import { ZoomIn, ShieldCheck, Check } from 'lucide-react';

interface ProductGalleryProps {
  primaryImage: string;
  galleryImages?: string[];
  productName: string;
  category: EquipmentCategory;
  modelNumber: string;
  isFlagship?: boolean;
}

export function ProductGallery({
  primaryImage,
  galleryImages = [],
  productName,
  category,
  modelNumber,
  isFlagship = false,
}: ProductGalleryProps) {
  // Combine primary image and gallery images into a unique list
  const allImages = React.useMemo(() => {
    const list = [primaryImage, ...galleryImages].filter(Boolean);
    return Array.from(new Set(list));
  }, [primaryImage, galleryImages]);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = allImages[activeIndex] || primaryImage;

  return (
    <div className="space-y-4">
      {/* Main Image Display Box */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200/90 shadow-sm bg-gray-50 group">
        <ProductImage
          src={activeImage}
          alt={`${productName} - View ${activeIndex + 1}`}
          category={category}
          modelNumber={modelNumber}
          priority
          className="transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top Floating Badges */}
        <div className="absolute top-3.5 left-3.5 z-10 flex flex-wrap gap-2 pointer-events-none">
          <span className="px-3 py-1 rounded-md bg-[#102B46] text-white text-xs font-mono font-bold tracking-wider uppercase shadow-sm">
            {modelNumber}
          </span>
          {isFlagship && (
            <span className="px-2.5 py-1 rounded-md bg-[#D62836] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
              Flagship Model
            </span>
          )}
        </div>

        {/* Bottom Verification Watermark */}
        <div className="absolute bottom-3 right-3 z-10 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] text-white font-medium flex items-center gap-1.5 pointer-events-none">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Verified Commercial Grade</span>
        </div>
      </div>

      {/* Thumbnails (Only rendered if there are multiple images) */}
      {allImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {allImages.map((img, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition shrink-0 bg-white ${
                  isActive ? 'border-[#174A83] ring-2 ring-[#174A83]/20' : 'border-gray-200 hover:border-gray-300'
                }`}
                aria-label={`View image ${idx + 1}`}
              >
                <Image
                  src={img}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                />
                {isActive && (
                  <div className="absolute inset-0 bg-[#174A83]/10 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-[#174A83]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

