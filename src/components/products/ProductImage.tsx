'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { EquipmentCategory } from '@/types/product';
import { getDefaultDummyProductImage } from '@/lib/catalogue';

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

  // If primary image is missing or failed to load, automatically use the realistic dummy equipment image
  const resolvedSrc = !imageError && src ? src : getDefaultDummyProductImage(category, modelNumber);

  return (
    <div
      className={`relative w-full h-full min-h-[220px] bg-gradient-to-b from-gray-100/60 via-gray-50 to-white overflow-hidden ${className}`}
    >
      <Image
        src={resolvedSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        unoptimized={resolvedSrc.startsWith('http')}
        onError={() => setImageError(true)}
        priority={priority}
      />
      {/* Subtle bottom vignette scrim for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#102B46]/30 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
