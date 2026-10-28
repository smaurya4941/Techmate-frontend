import type { EquipmentCategory, ProductItem } from '@/types/product';
import { CATEGORIES_DATA, SAMPLE_PRODUCTS } from '@/lib/products-data';

/**
 * Brand directory.
 *
 * - `partner`: third-party brands Techmate supplies and supports.
 * - `own`: Techmate house brands. Their product range is derived from `categories`.
 *
 * REAL DATA: the 11 authorised partner brands (name, country, positioning) were supplied by
 * Techmate. Do not invent further brand facts. Logos and per-brand products are still to come;
 * link products to a partner brand through `ProductItem.brand` (the brand slug).
 */
export type BrandKind = 'partner' | 'own';

export interface BrandInfo {
  slug: string;
  name: string;
  kind: BrandKind;
  /** Country of origin. Omitted when not known (e.g. Homat). */
  country?: string;
  /** Key categories / positioning. */
  division: string;
  badge: string;
  tagline: string;
  description: string;
  overview: string[];
  highlights: string[];
  applications: string[];
  /** Categories this brand covers. Own brands derive their models from these. */
  categories: EquipmentCategory[];
}

const PARTNER_HIGHLIGHTS = [
  'Authorised Techmate supply',
  'Expert consultation',
  'Installation',
  'Training, service and genuine spares',
];

function partnerBrand(
  slug: string,
  name: string,
  country: string | undefined,
  positioning: string,
  categories: EquipmentCategory[]
): BrandInfo {
  return {
    slug,
    name,
    kind: 'partner',
    country,
    division: positioning,
    badge: 'Authorised Brand',
    tagline: country ? `${name} from ${country}, supplied and supported by Techmate.` : `${name}, supplied and supported by Techmate.`,
    description: positioning,
    overview: [
      `${name}${country ? ` (${country})` : ''}: ${positioning}`,
      `Techmate Industries is an authorised supplier of ${name} equipment. Our engineers help you select the right models, plan the layout, install and commission the equipment, train your team and support it for its working life.`,
    ],
    highlights: PARTNER_HIGHLIGHTS,
    applications: [],
    categories,
  };
}

export const BRANDS_DATA: BrandInfo[] = [
  partnerBrand(
    'unox',
    'UNOX',
    'Italy',
    'Commercial ovens, combi ovens, bakery ovens and professional cooking/baking solutions.',
    ['cooking', 'bakery-baking']
  ),
  partnerBrand(
    'electrolux-professional',
    'Electrolux Professional',
    'Sweden',
    'Professional cooking, dishwashing, refrigeration and foodservice solutions.',
    ['cooking', 'dishwashing', 'refrigeration']
  ),
  partnerBrand(
    'alto-shaam',
    'Alto-Shaam',
    'USA',
    'Cooking, hot holding and food holding solutions.',
    ['cooking', 'hot-holding']
  ),
  partnerBrand('rational', 'Rational', 'Germany', 'Professional combi cooking systems.', ['cooking']),
  partnerBrand(
    'spar',
    'SPAR',
    'Taiwan',
    'Planetary mixers, bakery and food preparation equipment.',
    ['food-preparation', 'bakery-baking']
  ),
  partnerBrand(
    'hatco',
    'Hatco',
    'USA',
    'Food holding, warming and serving equipment.',
    ['hot-holding']
  ),
  partnerBrand(
    'dynamic',
    'Dynamic',
    'France',
    'Professional hand mixers, stick blenders and food preparation.',
    ['food-preparation']
  ),
  partnerBrand(
    'robot-coupe',
    'Robot Coupe',
    'France',
    'Food processors and vegetable preparation equipment.',
    ['food-preparation']
  ),
  partnerBrand(
    'veetsan',
    'Veetsan',
    'India',
    'Commercial dishwashing and kitchen equipment.',
    ['dishwashing', 'kitchen-equipment']
  ),
  partnerBrand(
    'homat',
    'Homat',
    undefined,
    'Professional kitchen and foodservice equipment.',
    ['kitchen-equipment']
  ),
  partnerBrand(
    'hongling',
    'Hongling',
    'China',
    'Bakery and food processing equipment.',
    ['bakery-baking', 'food-preparation']
  ),
  {
    slug: 'heavy-duty',
    name: 'Techmate® Heavy Duty',
    kind: 'own',
    division: 'Commercial Cooking, Dishwashing & Kitchen Equipment',
    badge: 'Proprietary OEM Brand',
    tagline: 'Built for 18-hour kitchen shifts.',
    description:
      'Our proprietary line of heavy-gauge stainless steel gas & electric cooking ranges, stock pot stoves, deep fryers, and fabrication tables.',
    overview: [
      'Techmate Heavy Duty covers the hot line and the stainless steel backbone of a commercial kitchen: cooking ranges, touch combi steam ovens, custom AISI 304 fabrication and commercial dishwashing.',
      'Every unit is built from food-grade stainless steel with flame-failure protection, serviceable components and layouts that can be sized to your site.',
    ],
    highlights: [
      'Heavy-gauge AISI 304 seamless pressed construction',
      'Flame failure device on every gas burner',
      'Custom dimensions and CAD layouts on request',
      'Factory warranty with AMC support',
    ],
    applications: ['Hotels & Resorts', 'Restaurants & QSR', 'Cloud Kitchens', 'Institutional Kitchens'],
    categories: ['cooking', 'kitchen-equipment', 'dishwashing'],
  },
  {
    slug: 'bake-with-mate',
    name: 'Techmate® Bake With Mate',
    kind: 'own',
    division: 'Bakery & Baking Machinery',
    badge: 'Core Brand Trademark',
    tagline: 'Consistent dough. Every batch.',
    description:
      'Precision bakery dough mixers, spiral kneaders, planetary mixers, and diesel/gas rotary rack baking ovens built for 24/7 baking throughput.',
    overview: [
      'Bake With Mate is our bakery division, engineered around dough handling and baking throughput for artisan bakeries, patisseries and industrial bakery plants.',
      'From spiral kneaders to rotary rack ovens, each machine is specified to your daily output so that capacity, power source and floor space match your production plan.',
    ],
    highlights: [
      'High-torque spiral kneaders and planetary mixers',
      'Diesel, gas and electric rotary rack ovens',
      'Designed for continuous, multi-shift production',
      'Genuine spares and preventive maintenance contracts',
    ],
    applications: ['Bakeries & Patisseries', 'Cafés', 'Bakery Franchise Plants', 'Hotel Bakeries'],
    categories: ['bakery-baking'],
  },
  {
    slug: 'coldpro',
    name: 'Techmate® ColdPro',
    kind: 'own',
    division: 'Refrigeration & Cold Rooms',
    badge: 'Refrigeration Division',
    tagline: 'Cold chain tuned for Indian summers.',
    description:
      'Tropicalized stainless reach-in chillers, sub-zero blast freezers, undercounter prep counters, and modular insulated cold rooms.',
    overview: [
      'ColdPro is our refrigeration division: reach-in chillers, blast chillers and freezers, prep counters and modular cold rooms engineered for high ambient temperatures and humidity.',
      'Components such as Embraco / Danfoss tropicalized compressors keep food safe through demanding service, with HACCP-friendly stainless interiors.',
    ],
    highlights: [
      'Tropicalized performance in high-ambient, high-humidity sites',
      'Rapid blast chilling for HACCP compliance',
      'Modular insulated cold rooms sized to your layout',
      'Embraco / Danfoss compressors',
    ],
    applications: ['Hotels & Resorts', 'Institutional Kitchens', 'Cloud Kitchens', 'Central Kitchens'],
    categories: ['refrigeration'],
  },
];

export const PARTNER_BRANDS = BRANDS_DATA.filter((b) => b.kind === 'partner');
export const OWN_BRANDS = BRANDS_DATA.filter((b) => b.kind === 'own');

export function getBrandBySlug(slug: string): BrandInfo | undefined {
  return BRANDS_DATA.find((b) => b.slug === slug);
}

export function getBrandCategories(brand: BrandInfo) {
  return CATEGORIES_DATA.filter((c) => brand.categories.includes(c.slug));
}

export function getBrandProducts(brand: BrandInfo): ProductItem[] {
  if (brand.kind === 'partner') {
    return SAMPLE_PRODUCTS.filter((p) => p.brand === brand.slug);
  }
  return SAMPLE_PRODUCTS.filter((p) => !p.brand && brand.categories.includes(p.category));
}
