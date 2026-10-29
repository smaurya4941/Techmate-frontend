/**
 * Product & Catalogue Data Types for Techmate Industries (Phase 2)
 */

export type EquipmentCategory =
  | 'bakery-baking'
  | 'cooking'
  | 'food-preparation'
  | 'dishwashing'
  | 'refrigeration'
  | 'hot-holding'
  | 'beverage'
  | 'kitchen-equipment';

export interface CategoryInfo {
  slug: EquipmentCategory;
  name: string;
  description: string;
  iconName: string;
  itemCount: number;
}

export interface SubCategoryInfo {
  slug: string;
  name: string;
  category: EquipmentCategory;
}

export interface ProductSpecification {
  label: string;
  value: string;
  unit?: string;
  group?: 'Dimensions & Weight' | 'Electrical & Thermal' | 'Capacity & Output' | 'Construction & Material';
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  modelNumber: string;
  category: EquipmentCategory;
  categoryName: string;
  /** Slug of a SubCategoryInfo belonging to `category`. */
  subCategory?: string;
  /** Slug of a partner BrandInfo when the product is supplied under a third-party brand. */
  brand?: string;
  /** Display name of the brand (admin-managed brands may not exist in the built-in brand list). */
  brandName?: string;
  /** Indicative list price in INR; the final quotation applies. Omit for price on request. */
  price?: number;
  /** ISO currency code for `price`; INR when omitted. */
  currency?: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  galleryImages?: string[];
  keyHighlights: string[];
  specifications: ProductSpecification[];
  brochureUrl?: string;
  isFlagship?: boolean;
  warrantyPeriod?: string;
  certifications?: string[];
  powerSource?: 'Electric' | 'Gas' | 'Dual Fuel' | 'Passive';
}

export interface FilterState {
  category: string;
  powerSource: string;
  searchQuery: string;
  sortBy: 'name-asc' | 'name-desc' | 'model';
}
