import type { EquipmentCategory, ProductItem, ProductSpecification } from '@/types/product';

/**
 * REAL CATALOGUE: the 18 UNOX (Italy) products listed on Techmate's previous website
 * (techmateindustries.co.in), approved for reuse by Techmate on 2026-10-29.
 *
 * - Prices are the INR prices listed on that site and are indicative; the final quotation applies.
 * - Warranty and certification are intentionally not set: the source contradicted itself.
 * - No product photographs yet (the source had one, hosted by a third party); the card falls back
 *   to the category icon until Techmate supplies images.
 * - Category / sub-category placement is Techmate-catalogue mapping: BAKERTOP and BAKERLUX lines
 *   under Bakery & Baking, CHEFTOP and speed ovens under Cooking Equipment.
 */

interface UnoxInput {
  model: string;
  name: string;
  category: EquipmentCategory;
  categoryName: string;
  subCategory?: string;
  price: number;
  short: string;
  highlights: string[];
  specs: ProductSpecification[];
  powerSource?: ProductItem['powerSource'];
}

const BAKERY = { category: 'bakery-baking', categoryName: 'Bakery & Baking' } as const;
const COOKING = { category: 'cooking', categoryName: 'Cooking Equipment' } as const;

const cap = (value: string, unit?: string): ProductSpecification => ({
  label: 'Capacity',
  value,
  unit,
  group: 'Capacity & Output',
});
const elec = (label: string, value: string): ProductSpecification => ({ label, value, group: 'Electrical & Thermal' });
const dims = (label: string, value: string, unit?: string): ProductSpecification => ({
  label,
  value,
  unit,
  group: 'Dimensions & Weight',
});

function unox(p: UnoxInput): ProductItem {
  const slug = `unox-${p.model.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  return {
    id: slug,
    slug,
    name: p.name,
    modelNumber: p.model,
    category: p.category,
    categoryName: p.categoryName,
    subCategory: p.subCategory,
    brand: 'unox',
    price: p.price,
    shortDescription: p.short,
    fullDescription: `${p.name}. ${p.short} Supplied and supported in India by Techmate Industries as an authorised UNOX partner.`,
    image: '',
    keyHighlights: p.highlights,
    specifications: p.specs,
    powerSource: p.powerSource ?? 'Electric',
  };
}

export const UNOX_PRODUCTS: ProductItem[] = [
  unox({
    model: 'XEBC-06EU-EPRM',
    name: 'UNOX XEBC-06EU-EPRM PLUS Countertop Combi Oven',
    ...BAKERY,
    subCategory: 'bakery-combi-ovens',
    price: 595000,
    short: 'Electric countertop combi oven with 6 trays (600x400 mm) and touch screen control.',
    highlights: ['6 trays (600x400 mm)', 'Touch screen control', 'Temperature range 30-260°C'],
    specs: [cap('6 x 600x400 mm', 'Trays'), elec('Supply Voltage', '380 V'), elec('Temperature Range', '30°C to 260°C')],
  }),
  unox({
    model: 'XEVC-0711-EPRM',
    name: 'UNOX XEVC-0711-EPRM CHEFTOP MIND.Maps Countertop Plus Combi Oven',
    ...COOKING,
    subCategory: 'cooking-combi-ovens',
    price: 604000,
    short: 'Electric combi oven with 7 GN 1/1 trays, USB and Wi-Fi/LAN connectivity.',
    highlights: ['7 trays (GN 1/1)', 'USB and Wi-Fi/LAN connectivity', '12 kW, 415 V'],
    specs: [cap('7 x GN 1/1', 'Trays'), elec('Connected Power', '12 kW'), elec('Supply Voltage', '415 V'), dims('Net Weight', '85', 'kg')],
  }),
  unox({
    model: 'XEFR-04HS-ELDP',
    name: 'UNOX XEFR-04HS-ELDP BAKERLUX SHOP.Pro LED Convection Oven',
    ...BAKERY,
    subCategory: 'convection-ovens',
    price: 132000,
    short: 'Tabletop electric convection oven with steam and 4 trays (460x330 mm).',
    highlights: ['4 trays (460x330 mm)', 'Steam function', 'Tabletop installation'],
    specs: [cap('4 x 460x330 mm', 'Trays'), elec('Connected Power', '3 kW'), elec('Supply Voltage', '220-240 V'), dims('Net Weight', '39', 'kg')],
  }),
  unox({
    model: 'XFT 193',
    name: 'UNOX XFT 193 L.MISS ROSSELLA Manual Convection Oven with Humidity',
    ...BAKERY,
    subCategory: 'convection-ovens',
    price: 142000,
    short: 'Manual-control convection oven with humidity and 4 trays (600x400 mm).',
    highlights: ['4 trays (600x400 mm)', 'Manual controls with analog display', 'Humidity function'],
    specs: [cap('4 x 600x400 mm', 'Trays'), elec('Connected Load', '6.5 kW'), dims('Net Weight', '49', 'kg')],
  }),
  unox({
    model: 'XEMA-01NS-MCDN',
    name: 'UNOX XEMA-01NS-MCDN SPEED.Compact Electric Speed Oven',
    ...COOKING,
    price: 348000,
    short: 'Compact speed oven combining microwave and hot air, with a drop-down door.',
    highlights: ['Microwave and hot-air cooking', 'Drop-down door', '60 cm depth'],
    specs: [cap('1 x 300x300 mm', 'Tray'), dims('Depth', '60', 'cm')],
  }),
  unox({
    model: 'XEVC-0311-EPRM',
    name: 'UNOX XEVC-0311-EPRM CHEFTOP MIND.Maps Countertop Combi Oven GN 1/1',
    ...COOKING,
    subCategory: 'cooking-combi-ovens',
    price: 370000,
    short: 'Countertop electric combi oven with 3 GN 1/1 trays and timer.',
    highlights: ['3 trays (GN 1/1)', 'Timer control', '5 kW'],
    specs: [cap('3 x GN 1/1', 'Trays'), elec('Connected Power', '5 kW'), elec('Supply Voltage', '230 V / 400 V'), dims('Net Weight', '50', 'kg')],
  }),
  unox({
    model: 'XEBC-10EU-EPRM',
    name: 'UNOX XEBC-10EU-EPRM BAKERTOP MIND.Maps Combi Oven',
    ...BAKERY,
    subCategory: 'bakery-combi-ovens',
    price: 820000,
    short: 'Electric combi oven with 10 trays (600x400 mm), 21 kW, three-phase supply.',
    highlights: ['10 trays (600x400 mm)', '21 kW (32 A, 3-phase)', '400 V 3N'],
    specs: [
      cap('10 x 600x400 mm', 'Trays'),
      elec('Connected Power', '21 kW (32 A, 3-phase)'),
      elec('Supply Voltage', '400 V 3N'),
      dims('Dimensions (W×D×H)', '860 × 957 × 1163', 'mm'),
    ],
  }),
  unox({
    model: 'XEFR-04EU-ELDP',
    name: 'UNOX XEFR-04EU-ELDP ROSSELLA BAKERLUX SHOP.Pro Convection Oven with Humidity',
    ...BAKERY,
    subCategory: 'convection-ovens',
    price: 198000,
    short: 'Electric convection oven with humidity and 4 trays (600x400 mm).',
    highlights: ['4 trays (600x400 mm)', 'Humidity function', '6.9 kW, 400 V 3N'],
    specs: [
      cap('4 x 600x400 mm', 'Trays'),
      elec('Connected Power', '6.9 kW'),
      elec('Supply Voltage', '400 V 3N'),
      dims('Dimensions (W×D×H)', '800 × 811 × 502', 'mm'),
      dims('Net Weight', '57', 'kg'),
    ],
  }),
  unox({
    model: 'XEVC-0511-EPRM',
    name: 'UNOX XEVC-0511-EPRM CHEFTOP MIND.Maps Countertop Plus Combi Oven GN 1/1',
    ...COOKING,
    subCategory: 'cooking-combi-ovens',
    price: 435000,
    short: 'Electric countertop combi oven with 5 GN 1/1 trays. Unox, Italy.',
    highlights: ['5 trays (GN 1/1)', '9.3 kW', '400 V 3N'],
    specs: [cap('5 x GN 1/1', 'Trays'), elec('Connected Power', '9.3 kW'), elec('Supply Voltage', '400 V 3N'), dims('Net Weight', '70', 'kg')],
  }),
  unox({
    model: 'XEBC-06EU-E1RM',
    name: 'UNOX XEBC-06EU-E1RM BAKERTOP MIND Countertop One Combi Oven',
    ...BAKERY,
    subCategory: 'bakery-combi-ovens',
    price: 512000,
    short: 'Countertop combi oven with hybrid steam, 6 trays (600x400 mm) and touch controls.',
    highlights: ['6 trays (600x400 mm)', 'Hybrid steam', 'Touch controls'],
    specs: [cap('6 x 600x400 mm', 'Trays'), elec('Connected Power', 'Over 4.7 kW')],
  }),
  unox({
    model: 'XEBC-04EU-E1RM',
    name: 'UNOX XEBC-04EU-E1RM BAKERTOP Countertop One Combi Oven',
    ...BAKERY,
    subCategory: 'bakery-combi-ovens',
    price: 385000,
    short: 'Portable countertop combi oven with 4 trays (600x400 mm) and touch screen.',
    highlights: ['4 trays (600x400 mm)', 'Touch screen', 'Maximum temperature 260°C'],
    specs: [cap('4 x 600x400 mm', 'Trays'), elec('Maximum Temperature', '260°C')],
  }),
  unox({
    model: 'XEFR-06EU-ELRV',
    name: 'UNOX XEFR-06EU-ELRV BAKERLUX SHOP.Pro Convection Oven with Humidity',
    ...BAKERY,
    subCategory: 'convection-ovens',
    price: 287500,
    short: 'Tabletop electric convection oven with humidity and 6 trays (600x400 mm).',
    highlights: ['6 trays (600x400 mm)', 'Humidity function', 'Tabletop installation'],
    specs: [cap('6 x 600x400 mm', 'Trays'), elec('Supply Voltage', '380-415 V 3N'), dims('Net Weight', '72', 'kg')],
  }),
  unox({
    model: 'XEBC-10EU-E1RM',
    name: 'UNOX XEBC-10EU-E1RM BAKERTOP MIND Countertop Combi Oven',
    ...BAKERY,
    subCategory: 'bakery-combi-ovens',
    price: 656000,
    short: 'Countertop combi oven with 10 trays (600x400 mm), touch screen and side-opening door.',
    highlights: ['10 trays (600x400 mm)', 'Touch screen', 'Side-opening door'],
    specs: [cap('10 x 600x400 mm', 'Trays')],
  }),
  unox({
    model: 'XEVL-2011-YPRS',
    name: 'UNOX XEVL-2011-YPRS CHEFTOP MIND BIG PLUS Trolley Combi Oven GN 1/1',
    ...COOKING,
    subCategory: 'cooking-combi-ovens',
    price: 1390000,
    short: 'Electric trolley combi oven with 20 GN 1/1 trays, touch screen and side-opening door.',
    highlights: ['20 trays (GN 1/1)', 'Touch screen', 'Side-opening door'],
    specs: [cap('20 x GN 1/1', 'Trays'), elec('Maximum Temperature', '260°C')],
  }),
  unox({
    model: 'XEVC-1011-EPRM',
    name: 'UNOX XEVC-1011-EPRM CHEFTOP MIND.Maps Countertop Plus Combi Oven GN 1/1',
    ...COOKING,
    subCategory: 'cooking-combi-ovens',
    price: 790000,
    short: 'Electric countertop combi oven with 10 GN 1/1 trays, touch screen and side-opening door.',
    highlights: ['10 trays (GN 1/1)', 'Touch screen', 'Side-opening door'],
    specs: [cap('10 x GN 1/1', 'Trays')],
  }),
  unox({
    model: 'XEBPC-08EU-V',
    name: 'UNOX XEBPC-08EU-V LIEVOX Commercial Proofer',
    ...BAKERY,
    subCategory: 'proofers',
    price: 132000,
    short: 'Oven-controlled proofer for 8 trays (600x400 mm), up to 50°C.',
    highlights: ['8 trays (600x400 mm)', 'Up to 50°C', 'Controlled from the oven'],
    specs: [cap('8 x 600x400 mm', 'Trays'), elec('Maximum Temperature', '50°C'), elec('Connected Power', '1.2 kW'), elec('Supply Voltage', '220 V'), dims('Net Weight', '42', 'kg')],
  }),
  unox({
    model: 'XEVC-0511-E1RM',
    name: 'UNOX XEVC-0511-E1RM CHEFTOP MIND.Maps Countertop Combi Oven GN 1/1',
    ...COOKING,
    subCategory: 'cooking-combi-ovens',
    price: 376000,
    short: 'Electric countertop combi oven with 5 GN 1/1 trays and touch screen.',
    highlights: ['5 trays (GN 1/1)', 'Touch screen', '4.7 kW'],
    specs: [cap('5 x GN 1/1', 'Trays'), elec('Connected Power', '4.7 kW'), elec('Supply Voltage', '380 V')],
  }),
  unox({
    model: 'DB1044A0',
    name: 'UNOX Spray & Rinse Oven Cleaning Detergent (750 ml)',
    category: 'kitchen-equipment',
    categoryName: 'Kitchen Equipment',
    subCategory: 'kitchen-accessories',
    price: 1250,
    short: 'Jet-spray detergent for cleaning the oven chamber, 750 ml bottle.',
    highlights: ['750 ml plastic bottle', 'Jet spray, 4 LPM flow', 'For oven chamber cleaning'],
    specs: [{ label: 'Pack Size', value: '750', unit: 'ml', group: 'Capacity & Output' }],
    powerSource: 'Passive',
  }),
];
