import React from 'react';
import { ProductSpecification } from '@/types/product';

export interface ProductSpecificationListProps {
  specifications: ProductSpecification[];
  className?: string;
}

export const ProductSpecificationList: React.FC<ProductSpecificationListProps> = ({
  specifications,
  className = '',
}) => {
  // Group specifications by group name
  const groups: Record<string, ProductSpecification[]> = {};

  specifications.forEach((spec) => {
    const groupName = spec.group || 'Technical Details';
    if (!groups[groupName]) {
      groups[groupName] = [];
    }
    groups[groupName].push(spec);
  });

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 items-start ${className}`}>
      {Object.entries(groups).map(([groupTitle, specs]) => (
        <div
          key={groupTitle}
          className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col"
        >
          <div className="bg-[#102B46] text-white px-5 py-3.5 font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-between">
            <span>{groupTitle}</span>
            <span className="text-[10px] text-gray-300 font-mono">
              {specs.length} verified parameters
            </span>
          </div>

          <div className="divide-y divide-gray-100 flex-1">
            {specs.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 sm:grid-cols-12 p-3 sm:px-5 hover:bg-[#F3F6FA]/50 transition-colors text-xs items-center gap-1 sm:gap-3"
              >
                <div className="text-gray-500 font-medium sm:col-span-5 leading-snug">
                  {item.label}
                </div>
                <div className="text-[#102B46] font-bold sm:col-span-7 break-words leading-snug">
                  <span>{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
