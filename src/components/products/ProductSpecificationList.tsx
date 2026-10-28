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
    <div className={`space-y-6 ${className}`}>
      {Object.entries(groups).map(([groupTitle, specs]) => (
        <div
          key={groupTitle}
          className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
        >
          <div className="bg-[#102B46] text-white px-5 py-3 font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-between">
            <span>{groupTitle}</span>
            <span className="text-[10px] text-gray-300 font-mono">
              {specs.length} verified parameters
            </span>
          </div>

          <div className="divide-y divide-gray-100">
            {specs.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 sm:grid-cols-3 p-3.5 sm:px-5 hover:bg-[#F3F6FA]/50 transition-colors text-xs"
              >
                <div className="text-gray-500 font-medium sm:col-span-1 mb-1 sm:mb-0">
                  {item.label}
                </div>
                <div className="text-[#102B46] font-bold sm:col-span-2 flex items-center justify-between">
                  <span>{item.value}</span>
                  {item.unit && (
                    <span className="text-gray-400 font-mono text-[10px] ml-2">
                      [{item.unit}]
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
