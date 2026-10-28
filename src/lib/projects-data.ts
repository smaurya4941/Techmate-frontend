import type { EquipmentCategory } from '@/types/product';

/**
 * Completed installations and project showcases.
 * Each project belongs to a solution sector (see solutions-data.ts) via `sector` and lists
 * the brands (slugs from brands-data.ts) and equipment used.
 *
 * PLACEHOLDER DATA: replace with real installations, brands, equipment and photographs.
 */
export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ProjectInfo {
  slug: string;
  title: string;
  client: string;
  badge: string;
  /** Short sector label shown on cards. */
  category: string;
  /** Slug of the matching SolutionInfo. */
  sector: string;
  /** Hero image, plus any extra project photographs. */
  image: string;
  gallery?: string[];
  summary: string;
  metrics: ProjectMetric[];
  scope: string[];
  /** Brand slugs (see brands-data.ts) used on the project. */
  brands: string[];
  /** Key equipment installed. */
  equipment: string[];
  equipmentCategories: EquipmentCategory[];
}

export const PROJECTS_DATA: ProjectInfo[] = [
  {
    slug: 'radisson-blu-banquet-dining-suite',
    title: 'Turnkey Banquet & All-Day Dining Suite for Radisson Blu',
    client: 'Radisson Blu',
    badge: '5-STAR HOSPITALITY',
    category: 'Hospitality',
    sector: 'hotels-hospitality',
    image: '/images/case-hotel-kitchen.jpg',
    summary:
      'Engineered 8-burner AISI 304 cooking suites, high-capacity rotary ovens, and custom coved stainless worktables for 1,200-cover daily banquet throughput.',
    metrics: [{ value: '1,200', label: 'Covers / Day' }],
    scope: [
      '8-burner AISI 304 cooking suites',
      'High-capacity rotary ovens',
      'Custom coved stainless steel worktables',
    ],
    brands: ['heavy-duty', 'bake-with-mate'],
    equipment: ['8-Burner Cooking Suites', 'Rotary Rack Ovens', 'Coved Stainless Steel Worktables'],
    equipmentCategories: ['cooking', 'bakery-baking', 'kitchen-equipment'],
  },
  {
    slug: 'rebel-foods-cloud-kitchen-commissary',
    title: 'High-Velocity Multi-Brand Commissary for Rebel Foods',
    client: 'Rebel Foods',
    badge: 'CLOUD KITCHEN NETWORK',
    category: 'Cloud Kitchen',
    sector: 'cloud-kitchens',
    image: '/images/case-cloud-kitchen.jpg',
    summary:
      'Rapid-assembly stainless prep line, induction wok stations, and overhead grease extraction hoods powering 18 virtual delivery brands simultaneously.',
    metrics: [{ value: '18', label: 'Brands / Hub' }],
    scope: [
      'Rapid-assembly stainless steel prep line',
      'Induction wok stations',
      'Overhead grease extraction hoods',
    ],
    brands: ['heavy-duty'],
    equipment: ['Stainless Steel Prep Line', 'Induction Wok Stations', 'Grease Extraction Hoods'],
    equipmentCategories: ['kitchen-equipment', 'cooking'],
  },
  {
    slug: 'monginis-rotary-oven-bakery-line',
    title: 'Automated 120-Tray Rotary Oven Line for Monginis Franchise',
    client: 'Monginis Franchise',
    badge: 'INDUSTRIAL BAKERY',
    category: 'Bakery Plant',
    sector: 'bakeries-confectioneries',
    image: '/images/case-bakery-plant.jpg',
    summary:
      'Heavy-duty spiral dough kneaders, automated dividers, and diesel/electric rotary rack ovens delivering 4,500 artisan loaves every morning.',
    metrics: [{ value: '4,500', label: 'Loaves / Day' }],
    scope: [
      'Heavy-duty spiral dough kneaders',
      'Automated dough dividers',
      'Diesel / electric rotary rack ovens',
    ],
    brands: ['bake-with-mate'],
    equipment: ['Spiral Dough Kneaders', 'Automated Dough Dividers', '120-Tray Rotary Rack Ovens'],
    equipmentCategories: ['bakery-baking'],
  },
  {
    slug: 'apollo-hospitals-central-dietary-facility',
    title: 'Sterile Central Dietary Facility for Apollo Hospitals',
    client: 'Apollo Hospitals',
    badge: 'HEALTHCARE CATERING',
    category: 'Healthcare',
    sector: 'institutional-kitchens',
    image: '/images/case-hospital-kitchen.jpg',
    summary:
      'HACCP-certified combi-steamer suites, sub-zero walk-in blast chillers, and automated conveyor tray-line ensuring 100% bacterial safety compliance.',
    metrics: [{ value: '100%', label: 'HACCP Sterile' }],
    scope: [
      'HACCP-certified combi-steamer suites',
      'Sub-zero walk-in blast chillers',
      'Automated conveyor tray-line',
    ],
    brands: ['heavy-duty', 'coldpro'],
    equipment: ['Combi-Steamer Suites', 'Walk-In Blast Chillers', 'Conveyor Tray-Line'],
    equipmentCategories: ['cooking', 'refrigeration'],
  },
];

export function getProjectBySlug(slug: string): ProjectInfo | undefined {
  return PROJECTS_DATA.find((p) => p.slug === slug);
}

export function getProjectsBySector(sector: string): ProjectInfo[] {
  return PROJECTS_DATA.filter((p) => p.sector === sector);
}
