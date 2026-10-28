import React from 'react';
import { ProductItem } from '@/types/product';
import { ProductCard } from './ProductCard';
import { SectionHeading } from '../layout/SectionHeading';

export interface RelatedProductsProps {
  products: ProductItem[];
  currentProductId: string;
  category?: string;
  className?: string;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  products,
  currentProductId,
  category,
  className = '',
}) => {
  const related = products
    .filter((p) => p.id !== currentProductId && (!category || p.category === category))
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className={`pt-12 mt-12 border-t border-gray-200 ${className}`}>
      <SectionHeading
        badge="Complementary Machinery"
        title="Related Food-Service Equipment"
        subtitle="Explore compatible kitchen and bakery units frequently specified together for turnkey setups."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
};
