import React from 'react';
import Link from 'next/link';
import { CategoryInfo } from '@/types/product';
import { ArrowRight } from 'lucide-react';
import { CategoryIcon } from './CategoryIcon';

export interface CategoryCardProps {
  category: CategoryInfo;
  className?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, className = '' }) => {
  return (
    <Link
      href={`/products?category=${category.slug}`}
      className={`group relative bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-xl hover:border-[#174A83]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden ${className}`}
    >
      {/* Top Accent Strip */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#174A83] opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        <div className="w-14 h-14 rounded-xl bg-[#F3F6FA] group-hover:bg-[#174A83]/10 flex items-center justify-center mb-4 transition-colors">
          <CategoryIcon category={category.slug} />
        </div>

        <h3 className="font-heading font-bold text-lg text-[#102B46] group-hover:text-[#174A83] transition-colors mb-2">
          {category.name}
        </h3>

        <p className="text-xs text-[#344054] leading-relaxed line-clamp-3 mb-4">
          {category.description}
        </p>
      </div>

      <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#174A83]">
        <span className="text-gray-400 font-normal">{category.itemCount} Equipment Models</span>
        <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          Explore Line <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
};
