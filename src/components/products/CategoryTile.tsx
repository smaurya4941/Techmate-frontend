import Link from 'next/link';
import type { EquipmentCategory } from '@/types/product';
import { CategoryIcon } from './CategoryIcon';
import { CategoryImage } from './CategoryImage';

const DEFAULT_CATEGORY_IMAGES: Partial<Record<EquipmentCategory, string>> = {
  'bakery-baking': '/images/categories/bakery-baking.jpg',
  'cooking': '/images/categories/cooking.jpg',
  'food-preparation': '/images/categories/food-preparation.jpg',
  'dishwashing': '/images/categories/dishwashing.jpg',
  'refrigeration': '/images/categories/refrigeration.jpg',
  'hot-holding': '/images/categories/hot-holding.jpg',
};

export interface CategoryTileProps {
  slug: EquipmentCategory;
  name: string;
  /** Picture uploaded in the admin panel (4:3). The category icon is shown when missing. */
  imageUrl?: string;
  subCategoryCount: number;
}

/** Category card: picture on top, then the name, then "N subcategories". */
export function CategoryTile({ slug, name, imageUrl, subCategoryCount }: CategoryTileProps) {
  // Ignore missing, null, or local development placeholder/test URLs
  const isValidCustomImage =
    imageUrl &&
    !imageUrl.includes('test-4x3') &&
    !imageUrl.includes('127.0.0.1:8001');

  const displayImage = (isValidCustomImage ? imageUrl : undefined) || DEFAULT_CATEGORY_IMAGES[slug];

  return (
    <Link
      href={`/products?category=${slug}`}
      className="group block rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#174A83]/40 hover:shadow-md"
    >
      <div className="overflow-hidden rounded-xl">
        {displayImage ? (
          <CategoryImage src={displayImage} alt={name} aspect="aspect-[3/2]" />
        ) : (
          <div className="flex aspect-[3/2] w-full items-center justify-center bg-[#F3F6FA] text-[#174A83]">
            <CategoryIcon category={slug} className="h-12 w-12 text-inherit" />
          </div>
        )}
      </div>
      <div className="px-1 pb-1 pt-3 text-center">
        <h3 className="truncate font-heading text-base font-bold text-[#102B46] transition-colors group-hover:text-[#174A83]">
          {name}
        </h3>
        <span className="mt-0.5 block text-sm text-gray-500">
          {subCategoryCount} {subCategoryCount === 1 ? 'subcategory' : 'subcategories'}
        </span>
      </div>
    </Link>
  );
}
