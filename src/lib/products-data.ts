import { ProductItem, CategoryInfo, SubCategoryInfo, EquipmentCategory } from '@/types/product';
import { UNOX_PRODUCTS } from '@/lib/unox-products';

/**
 * REAL TAXONOMY supplied by Techmate: 8 main categories, each with its sub-categories.
 * "Combi Ovens" appears under both Bakery & Baking and Cooking Equipment, so those use
 * distinct sub-category slugs.
 */
const TAXONOMY: {
  slug: EquipmentCategory;
  name: string;
  iconName: string;
  subCategories: [slug: string, name: string][];
}[] = [
  {
    slug: 'bakery-baking',
    name: 'Bakery & Baking',
    iconName: 'Wheat',
    subCategories: [
      ['bakery-ovens', 'Bakery Ovens'],
      ['convection-ovens', 'Convection Ovens'],
      ['deck-ovens', 'Deck Ovens'],
      ['bakery-combi-ovens', 'Combi Ovens'],
      ['rack-ovens', 'Rack Ovens'],
      ['spiral-dough-mixers', 'Spiral Dough Mixers'],
      ['planetary-mixers', 'Planetary Mixers'],
      ['proofers', 'Proofers / Proving Chambers'],
      ['dough-sheeters', 'Dough Sheeters'],
      ['bread-slicers', 'Bread Slicers'],
    ],
  },
  {
    slug: 'cooking',
    name: 'Cooking Equipment',
    iconName: 'Flame',
    subCategories: [
      ['cooking-combi-ovens', 'Combi Ovens'],
      ['cooking-ranges', 'Cooking Ranges'],
      ['fryers', 'Fryers'],
      ['griddles', 'Griddles'],
      ['induction-cooking', 'Induction Cooking'],
      ['salamanders', 'Salamanders'],
    ],
  },
  {
    slug: 'food-preparation',
    name: 'Food Preparation',
    iconName: 'UtensilsCrossed',
    subCategories: [
      ['food-processors', 'Food Processors'],
      ['vegetable-preparation', 'Vegetable Preparation'],
      ['stick-blenders', 'Stick Blenders'],
      ['food-prep-mixers', 'Mixers'],
      ['choppers', 'Choppers'],
    ],
  },
  {
    slug: 'dishwashing',
    name: 'Dishwashing',
    iconName: 'Sparkles',
    subCategories: [
      ['undercounter-dishwashers', 'Undercounter Dishwashers'],
      ['hood-type-dishwashers', 'Hood Type Dishwashers'],
      ['rack-conveyor-dishwashers', 'Rack Conveyor Dishwashers'],
      ['flight-type-dishwashers', 'Flight Type Dishwashers'],
      ['glasswashers', 'Glasswashers'],
    ],
  },
  {
    slug: 'refrigeration',
    name: 'Refrigeration',
    iconName: 'Snowflake',
    subCategories: [
      ['upright-refrigerators', 'Upright Refrigerators'],
      ['freezers', 'Freezers'],
      ['under-counter-refrigeration', 'Under Counter Refrigeration'],
      ['preparation-counters', 'Preparation Counters'],
      ['blast-chillers-freezers', 'Blast Chillers & Freezers'],
    ],
  },
  {
    slug: 'hot-holding',
    name: 'Hot Holding',
    iconName: 'Thermometer',
    subCategories: [
      ['holding-cabinets', 'Holding Cabinets'],
      ['heated-shelves', 'Heated Shelves'],
      ['food-warmers', 'Food Warmers'],
    ],
  },
  {
    slug: 'beverage',
    name: 'Beverage Equipment',
    iconName: 'Coffee',
    subCategories: [
      ['coffee-machines', 'Coffee Machines'],
      ['coffee-grinders', 'Coffee Grinders'],
      ['juice-equipment', 'Juice Equipment'],
    ],
  },
  {
    slug: 'kitchen-equipment',
    name: 'Kitchen Equipment',
    iconName: 'ChefHat',
    subCategories: [
      ['stainless-steel-equipment', 'Stainless Steel Equipment'],
      ['work-tables', 'Work Tables'],
      ['sinks', 'Sinks'],
      ['storage-racks', 'Storage Racks'],
      ['kitchen-accessories', 'Kitchen Accessories'],
    ],
  },
];

export const SUBCATEGORIES_DATA: SubCategoryInfo[] = TAXONOMY.flatMap((category) =>
  category.subCategories.map(([slug, name]) => ({ slug, name, category: category.slug }))
);

/** Real catalogue: UNOX products from the previous Techmate website (see unox-products.ts). */
export const SAMPLE_PRODUCTS: ProductItem[] = UNOX_PRODUCTS;

/** Categories shown across the site. Descriptions list the sub-categories; counts come from the catalogue. */
export const CATEGORIES_DATA: CategoryInfo[] = TAXONOMY.map((category) => ({
  slug: category.slug,
  name: category.name,
  iconName: category.iconName,
  description: category.subCategories.map(([, name]) => name).join(', '),
  itemCount: SAMPLE_PRODUCTS.filter((product) => product.category === category.slug).length,
}));


/**
 * Helper to fetch all products or filter them
 */
export function getAllProducts(): ProductItem[] {
  return SAMPLE_PRODUCTS;
}

export function getProductBySlug(slug: string): ProductItem | undefined {
  return SAMPLE_PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): ProductItem[] {
  if (!category || category === 'ALL') return SAMPLE_PRODUCTS;
  return SAMPLE_PRODUCTS.filter((p) => p.category === category);
}

export function getRelatedProducts(currentId: string, category: string, limit = 3): ProductItem[] {
  return SAMPLE_PRODUCTS.filter((p) => p.id !== currentId && p.category === category).slice(0, limit);
}

export function getSubCategory(slug: string): SubCategoryInfo | undefined {
  return SUBCATEGORIES_DATA.find((s) => s.slug === slug);
}

/** Number of catalogue products in a sub-category. */
export function countProductsInSubCategory(slug: string): number {
  return SAMPLE_PRODUCTS.filter((p) => p.subCategory === slug).length;
}

/** All sub-categories of a category, in catalogue order. */
export function getSubCategoriesOf(category: string): SubCategoryInfo[] {
  return SUBCATEGORIES_DATA.filter((s) => s.category === category);
}


/** Formats a price the Indian way, e.g. 595000 -> "₹5,95,000". */
export function formatPrice(amount: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
}
