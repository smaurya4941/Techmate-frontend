import { ProductItem, CategoryInfo, SubCategoryInfo, EquipmentCategory } from '@/types/product';

/**
 * DEVELOPMENT FIXTURE DATA (Phase 2 Prototype)
 *
 * NOTE: These products represent sample B2B equipment specifications for
 * UI/UX demonstration and catalogue layout validation. They are structured
 * to map 1:1 with future Laravel REST API responses (`/api/products`).
 */

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

export const SAMPLE_PRODUCTS: ProductItem[] = [
  {
    id: 'tm-co-10gn',
    slug: 'tm-pro-series-10gn-touch-combi-oven',
    name: 'TM-Pro Series Touch Combi Oven (10-Tray GN1/1)',
    modelNumber: 'TM-CO-10GN',
    category: 'cooking',
    categoryName: 'Cooking Equipment',
    subCategory: 'cooking-combi-ovens',
    shortDescription: 'Heavy-duty electric 10-tray combi oven with precision steam injection, automatic boiler flush, and 7-inch touch interface.',
    fullDescription: 'The TM-Pro 10GN is engineered for commercial high-volume hospitality, banquet, and healthcare dietary kitchens. Featuring dual boiler steam technology with precision ±0.5°C thermal control, a heavy-gauge AISI 304 coved cooking chamber, and a multi-point core temperature probe. Compatible with standard GN 1/1 containers.',
    image: '/images/products/combi-oven.jpg',
    isFlagship: true,
    powerSource: 'Electric',
    warrantyPeriod: '2 Years Comprehensive Factory Warranty',
    certifications: ['ISO 9001:2015', 'CE Certified', 'IPX5 Water Resistant'],
    keyHighlights: [
      '10-Tray GN 1/1 capacity with 68mm pitch spacing',
      'Dual boiler steam injection with automatic descale cycle',
      'Programmable 7-inch digital touchscreen with 200+ presets',
      'Energy-efficient triple-glazed thermal viewing door',
    ],
    specifications: [
      { label: 'External Dimensions (W×D×H)', value: '875 × 795 × 1060', unit: 'mm', group: 'Dimensions & Weight' },
      { label: 'Tray Capacity', value: '10 × GN 1/1 or 10 × 600×400', unit: 'Pans', group: 'Capacity & Output' },
      { label: 'Electrical Connection', value: '415V, 3-Phase, 50Hz', unit: 'V', group: 'Electrical & Thermal' },
      { label: 'Connected Power Load', value: '18.5', unit: 'kW', group: 'Electrical & Thermal' },
      { label: 'Temperature Range', value: '30°C to 300°C', group: 'Electrical & Thermal' },
      { label: 'Chamber Material', value: 'Food-grade AISI 304 Stainless Steel (1.2mm)', group: 'Construction & Material' },
      { label: 'Water Inlet / Drain', value: '3/4" BSP / 50mm High-Temp Drain', group: 'Construction & Material' },
      { label: 'Net Weight', value: '142', unit: 'kg', group: 'Dimensions & Weight' },
    ],
  },
  {
    id: 'tm-cr-6b-ov',
    slug: 'heavy-duty-6-burner-gas-range-with-static-oven',
    name: 'Heavy-Duty 6-Burner Gas Range with Static Oven',
    modelNumber: 'TM-GR-6B-OV',
    category: 'cooking',
    categoryName: 'Cooking Equipment',
    subCategory: 'cooking-ranges',
    shortDescription: 'Industrial stainless steel cooking range with 6 cast iron high-efficiency burners and integrated GN 2/1 gastro oven.',
    fullDescription: 'Constructed from 1.5mm thick AISI 304 stainless steel, this range is designed for continuous 18-hour daily operation in demanding restaurant and hotel kitchens. High-heat brass flame spreaders with individual pilot flames, safety thermocouples, and deep spill-collection trays ensure seamless cleaning.',
    image: '/images/products/cooking-range.jpg',
    powerSource: 'Gas',
    warrantyPeriod: '1 Year Factory Warranty + AMC Support',
    certifications: ['ISO 9001:2015', 'BIS Approved Gas Fittings'],
    keyHighlights: [
      '6 Heavy cast-iron open burners (3 × 7.5 kW + 3 × 5.5 kW)',
      'Heavy-gauge 1.5mm AISI 304 seamless pressed top',
      'Integrated static gas oven accommodating GN 2/1 trays',
      'Flame failure device (FFD) on all burners',
    ],
    specifications: [
      { label: 'Dimensions (W×D×H)', value: '1200 × 900 × 850+150', unit: 'mm', group: 'Dimensions & Weight' },
      { label: 'Burner Configuration', value: '6 Individual Cast Iron Burners', group: 'Capacity & Output' },
      { label: 'Total Gas Output', value: '45.0', unit: 'kW (153,500 BTU/hr)', group: 'Electrical & Thermal' },
      { label: 'Gas Inlet Connection', value: '3/4" BSP (LPG / Natural Gas)', group: 'Construction & Material' },
      { label: 'Oven Dimensions', value: '680 × 580 × 340', unit: 'mm', group: 'Dimensions & Weight' },
      { label: 'Top Plate Material', value: 'AISI 304 (1.5mm Thickness)', group: 'Construction & Material' },
    ],
  },
  {
    id: 'tm-bk-sp-100',
    slug: 'industrial-spiral-kneader-100kg-dough',
    name: 'Industrial Heavy-Duty Spiral Kneader (100kg Dough)',
    modelNumber: 'TM-SP-100',
    category: 'bakery-baking',
    categoryName: 'Bakery & Baking',
    subCategory: 'spiral-dough-mixers',
    shortDescription: 'Two-speed industrial spiral mixer with fixed stainless bowl, dual timers, and safety grid for continuous dough production.',
    fullDescription: 'Specifically calibrated for industrial bakeries, artisan bread plants, and pizza production hubs. High-torque dual motor drive system powers both the spiral hook and bowl independently, ensuring gentle, oxygen-rich gluten matrix development without dough overheating.',
    image: '/images/products/spiral-mixer.jpg',
    powerSource: 'Electric',
    warrantyPeriod: '2 Years Mechanical Warranty',
    certifications: ['ISO 9001:2015', 'CE Machinery Directive'],
    keyHighlights: [
      'Dough capacity: 100 kg dough / 62.5 kg flour batch',
      'Dual high-torque motor drive (spiral hook + bowl rotation)',
      'Two digital electro-mechanical timers with automatic speed switch',
      'Heavy-duty stainless steel safety cage with microswitch interlock',
    ],
    specifications: [
      { label: 'Dimensions (W×D×H)', value: '750 × 1220 × 1380', unit: 'mm', group: 'Dimensions & Weight' },
      { label: 'Bowl Volume', value: '150', unit: 'Litres', group: 'Capacity & Output' },
      { label: 'Max Dough Capacity', value: '100', unit: 'kg per batch', group: 'Capacity & Output' },
      { label: 'Power Rating', value: '5.5 kW (Hook) + 0.75 kW (Bowl)', unit: 'kW', group: 'Electrical & Thermal' },
      { label: 'Supply Voltage', value: '415V, 3-Phase, 50Hz', group: 'Electrical & Thermal' },
      { label: 'Net Weight', value: '420', unit: 'kg', group: 'Dimensions & Weight' },
    ],
  },
  {
    id: 'tm-rf-4d-ch',
    slug: 'tropicalized-4-door-reach-in-vertical-chiller',
    name: 'Tropicalized 4-Door Vertical Reach-In Chiller',
    modelNumber: 'TM-RF-4D-1000L',
    category: 'refrigeration',
    categoryName: 'Refrigeration',
    subCategory: 'upright-refrigerators',
    shortDescription: '1,000-litre 4-door stainless upright chiller with European compressor, auto-defrost, and digital climate controller.',
    fullDescription: 'Tropicalized refrigeration designed to maintain consistent core temperatures in high-ambient commercial kitchens up to +43°C. Features Danfoss/Embraco compressor, ventilated uniform air circulation, self-closing magnetic gasket doors, and eco-friendly R290 refrigerant.',
    image: '/images/products/refrigeration-chiller.jpg',
    powerSource: 'Electric',
    warrantyPeriod: '1 Year Full Machine + 4 Years Compressor Warranty',
    certifications: ['ISO 9001:2015', 'RoHS Eco-Refrigerant'],
    keyHighlights: [
      '1,000 Litres gross storage capacity across 4 half-doors',
      'Tropicalized cooling performance verified at +43°C ambient',
      'Self-closing doors with 90° stay-open feature for easy loading',
      'Energy-efficient Danfoss hermetic compressor with R290 gas',
    ],
    specifications: [
      { label: 'Dimensions (W×D×H)', value: '1220 × 820 × 2050', unit: 'mm', group: 'Dimensions & Weight' },
      { label: 'Operating Temperature', value: '-2°C to +8°C', group: 'Electrical & Thermal' },
      { label: 'Gross Volume', value: '1000', unit: 'Litres', group: 'Capacity & Output' },
      { label: 'Compressor', value: 'Danfoss / Embraco Tropicalized', group: 'Electrical & Thermal' },
      { label: 'Refrigerant', value: 'R290 Eco-Friendly Hydrocarbon', group: 'Electrical & Thermal' },
      { label: 'Body Construction', value: 'AISI 304 Interior and Exterior', group: 'Construction & Material' },
    ],
  },
  {
    id: 'tm-bf-10gn',
    slug: 'rapid-temperature-blast-chiller-freezer-10gn',
    name: 'Rapid Temperature Blast Chiller / Freezer (10 GN)',
    modelNumber: 'TM-BF-10GN',
    category: 'refrigeration',
    categoryName: 'Refrigeration',
    subCategory: 'blast-chillers-freezers',
    shortDescription: 'HACCP compliant blast chiller bringing 40kg food from +90°C down to +3°C in under 90 minutes.',
    fullDescription: 'Essential for high-volume banqueting, cloud kitchens, and central commissary food preparation. Preserves cellular structure, moisture, and aroma of freshly cooked food while preventing bacterial multiplication in compliance with strict international food hygiene protocols.',
    image: '/images/products/blast-chiller.jpg',
    powerSource: 'Electric',
    warrantyPeriod: '2 Years Comprehensive Warranty',
    certifications: ['ISO 9001:2015', 'HACCP Compliant Protocol'],
    keyHighlights: [
      'Chilling cycle: +90°C to +3°C (40 kg in 90 min)',
      'Freezing cycle: +90°C to -18°C (25 kg in 240 min)',
      'Multipoint temperature core insertion probe',
      'Automatic switch to holding temperature at cycle completion',
    ],
    specifications: [
      { label: 'Dimensions (W×D×H)', value: '800 × 820 × 1640', unit: 'mm', group: 'Dimensions & Weight' },
      { label: 'Tray Capacity', value: '10 × GN 1/1 or 10 × 600×400 Trays', group: 'Capacity & Output' },
      { label: 'Connected Load', value: '2.8', unit: 'kW', group: 'Electrical & Thermal' },
      { label: 'Power Supply', value: '230V / 50Hz / 16A Single Phase', group: 'Electrical & Thermal' },
      { label: 'Chamber Material', value: 'Full AISI 304 with Coved Corners', group: 'Construction & Material' },
    ],
  },
  {
    id: 'tm-ss-wt-2400',
    slug: 'heavy-duty-stainless-steel-prep-table-with-sink',
    name: 'Custom AISI 304 Stainless Steel Work Table with Sink Unit',
    modelNumber: 'TM-SS-WT-2400',
    category: 'kitchen-equipment',
    categoryName: 'Kitchen Equipment',
    subCategory: 'work-tables',
    shortDescription: 'Food-grade 16-gauge stainless steel preparation island with integrated sound-dampened sink and undershelf.',
    fullDescription: 'Custom fabricated for commercial kitchen wash-up, prep, and butchery sections. Seamless laser-cut and argon TIG welded construction with full sound-deadening marine plywood backing, sanitary 100mm coved rear backsplash, and adjustable bullet leveling feet.',
    image: '/images/products/stainless-table.jpg',
    powerSource: 'Passive',
    warrantyPeriod: '5 Years Structural Integrity Warranty',
    certifications: ['ISO 9001:2015', 'Food Grade Stainless Certificate'],
    keyHighlights: [
      'Heavy-gauge 1.5mm AISI 304 stainless top plate',
      'Integrated deep-drawn sink bowl (500×500×300mm)',
      'Anti-corrosion sound-deadening underside lining',
      'Solid tubular stainless steel legs with bullet feet',
    ],
    specifications: [
      { label: 'Dimensions (W×D×H)', value: '2400 × 750 × 850 + 100 Backsplash', unit: 'mm', group: 'Dimensions & Weight' },
      { label: 'Sink Bowl Dimensions', value: '500 × 500 × 300', unit: 'mm', group: 'Capacity & Output' },
      { label: 'Top Sheet Thickness', value: '16 Gauge (1.5mm) AISI 304', group: 'Construction & Material' },
      { label: 'Under-Shelf', value: '18 Gauge (1.2mm) Removable Shelf', group: 'Construction & Material' },
      { label: 'Load Capacity', value: '450', unit: 'kg Uniform Load', group: 'Capacity & Output' },
    ],
  },
];

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
