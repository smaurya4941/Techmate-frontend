'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { EquipmentCategory } from '@/types/product';
import { CategoryIcon } from './CategoryIcon';

export interface ProductImageProps {
  src?: string;
  alt: string;
  category?: EquipmentCategory;
  modelNumber?: string;
  className?: string;
  priority?: boolean;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  category,
  modelNumber,
  className = '',
  priority = false,
}) => {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div
        className={`relative w-full h-full min-h-[220px] bg-gradient-to-br from-[#F3F6FA] via-[#e8eff7] to-[#F3F6FA] flex flex-col items-center justify-center p-6 text-center border-b border-gray-100 select-none overflow-hidden ${className}`}
      >
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(#102B46 1px, transparent 1px), radial-gradient(#102B46 1px, #F3F6FA 1px)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px',
          }}
        />

        <div className="relative z-10 w-20 h-20 rounded-2xl bg-white shadow-md border border-gray-200/80 flex items-center justify-center mb-3">
          <CategoryIcon category={category} className="w-12 h-12 text-[#174A83]" />
        </div>

        <span className="relative z-10 inline-block px-2.5 py-0.5 rounded bg-[#102B46] text-white text-[10px] font-mono font-bold tracking-wider uppercase mb-1">
          {modelNumber || 'TECHMATE INDUSTRIAL'}
        </span>

        <p className="relative z-10 text-xs font-semibold text-[#344054] max-w-[200px] truncate">
          {alt}
        </p>

        <span className="relative z-10 text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-bold">
          AISI 304 Certified Model
        </span>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full min-h-[220px] bg-white overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-300 hover:scale-105"
        onError={() => setImageError(true)}
        priority={priority}
      />
    </div>
  );
};
