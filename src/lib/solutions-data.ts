import type { EquipmentCategory } from '@/types/product';

/**
 * Industry solutions. Titles and `description` are the real website content supplied by Techmate.
 * `categories` links each solution to the product categories it draws on.
 */
export type SolutionIconName =
  | 'hotel'
  | 'restaurant'
  | 'bakery'
  | 'cafe'
  | 'cloud-kitchen'
  | 'catering'
  | 'institutional'
  | 'central-kitchen';

export interface SolutionInfo {
  slug: string;
  title: string;
  iconName: SolutionIconName;
  description: string;
  categories: EquipmentCategory[];
}

export const SOLUTIONS_DATA: SolutionInfo[] = [
  {
    slug: 'hotels-hospitality',
    title: 'Hotels & Hospitality',
    iconName: 'hotel',
    description:
      'Complete professional kitchen solutions for hotel kitchens, banquet and hospitality operations',
    categories: [
      'bakery-baking',
      'cooking',
      'food-preparation',
      'dishwashing',
      'refrigeration',
      'hot-holding',
      'beverage',
      'kitchen-equipment',
    ],
  },
  {
    slug: 'restaurants-qsr',
    title: 'Restaurants & QSR',
    iconName: 'restaurant',
    description: 'Cooking, food preparation, refrigeration, holding and dishwashing solutions',
    categories: ['cooking', 'food-preparation', 'refrigeration', 'hot-holding', 'dishwashing'],
  },
  {
    slug: 'bakeries-confectioneries',
    title: 'Bakeries & Confectioneries',
    iconName: 'bakery',
    description: 'Ovens, mixers, proofers, preparation and bakery production solutions',
    categories: ['bakery-baking', 'food-preparation'],
  },
  {
    slug: 'cafes',
    title: 'Cafés',
    iconName: 'cafe',
    description:
      'Compact cooking, baking, beverage, refrigeration and food preparation solutions',
    categories: ['cooking', 'bakery-baking', 'beverage', 'refrigeration', 'food-preparation'],
  },
  {
    slug: 'cloud-kitchens',
    title: 'Cloud Kitchens',
    iconName: 'cloud-kitchen',
    description: 'Space-efficient, high-productivity kitchen equipment solutions',
    categories: ['cooking', 'food-preparation', 'refrigeration', 'kitchen-equipment'],
  },
  {
    slug: 'catering',
    title: 'Catering',
    iconName: 'catering',
    description: 'High-capacity cooking, holding, transport and foodservice equipment',
    categories: ['cooking', 'hot-holding', 'kitchen-equipment'],
  },
  {
    slug: 'institutional-kitchens',
    title: 'Institutional Kitchens',
    iconName: 'institutional',
    description: 'Reliable high-volume cooking, preparation and dishwashing solutions',
    categories: ['cooking', 'food-preparation', 'dishwashing'],
  },
  {
    slug: 'central-kitchens',
    title: 'Central Kitchens',
    iconName: 'central-kitchen',
    description: 'End-to-end high-volume production kitchen solutions',
    categories: ['cooking', 'food-preparation', 'refrigeration', 'kitchen-equipment'],
  },
];

export function getSolutionBySlug(slug: string): SolutionInfo | undefined {
  return SOLUTIONS_DATA.find((s) => s.slug === slug);
}
