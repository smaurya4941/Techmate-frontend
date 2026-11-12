import type { EquipmentCategory, ProductItem, ProductSpecification } from '@/types/product';
import { getDefaultDummyProductImage } from '@/lib/catalogue';

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
  image?: string;
  galleryImages?: string[];
  fullDescription?: string;
  warrantyPeriod?: string;
  certifications?: string[];
  brochureUrl?: string;
  isFlagship?: boolean;
}

const BAKERY = { category: 'bakery-baking', categoryName: 'Bakery & Baking' } as const;
const COOKING = { category: 'cooking', categoryName: 'Cooking Equipment' } as const;

const cap = (value: string, unit?: string, label: string = 'Capacity'): ProductSpecification => ({
  label,
  value,
  unit,
  group: 'Capacity & Output',
});
const elec = (label: string, value: string, unit?: string): ProductSpecification => ({
  label,
  value,
  unit,
  group: 'Electrical & Thermal',
});
const dims = (label: string, value: string, unit?: string): ProductSpecification => ({
  label,
  value,
  unit,
  group: 'Dimensions & Weight',
});
const constr = (label: string, value: string, unit?: string): ProductSpecification => ({
  label,
  value,
  unit,
  group: 'Construction & Material',
});

function unox(p: UnoxInput): ProductItem {
  const slug = `unox-${p.model.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const dummyImg = p.image || getDefaultDummyProductImage(p.category, p.model);

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
    fullDescription:
      p.fullDescription ??
      `${p.name}. ${p.short} Supplied and supported in India by Techmate Industries as an authorised UNOX partner.`,
    image: dummyImg,
    galleryImages: p.galleryImages ?? [
      dummyImg,
      '/images/products/cheftop-combi-1.jpg',
      '/images/products/cheftop-combi-2.jpg',
    ],
    keyHighlights: p.highlights,
    specifications: p.specs,
    powerSource: p.powerSource ?? 'Electric',
    warrantyPeriod: p.warrantyPeriod,
    certifications: p.certifications,
    brochureUrl: p.brochureUrl,
    isFlagship: p.isFlagship,
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
    name: 'Commercial Electric Countertop Combi Oven - GN1/1 UNOX XEVC-0511-EPRM CHEFTOP MIND.Maps',
    ...COOKING,
    subCategory: 'cooking-combi-ovens',
    price: 435000,
    short:
      'Technologically advanced 5-tray GN 1/1 commercial electric countertop combi oven with 9.5" touch control, CHEFUNOX automation, and 9.3 kW power.',
    fullDescription:
      'Commercial Electric Countertop Combi Oven - GN1/1 UNOX XEVC-0511-EPRM CHEFTOP MIND.Maps PLUS. Technologically advanced combi oven for gastronomy cooking processes (dehydrating, steaming, low temperature cooking, sous vide cooking, roasting, grilling, pan frying, regeneration and plate regeneration) and for fresh or frozen baking thanks to Unox Intensive Cooking and Intelligence Performance technologies which guarantee perfect results and repeatability for any load size. Features automatic management of cooking processes (CHEFUNOX) for perfect results even without trained staff. Equipped with a 9.5" capacitive touch screen, left-hinged door, and robust AISI 304 food-grade stainless steel construction. Techmate Industries is an authorised dealer for all UNOX ovens in Delhi NCR and across India, delivering complete equipment supply, kitchen layout consultation, factory-trained commissioning, genuine spare parts, and comprehensive 1-year on-site warranty support.',
    image: '/images/products/unox-xevc-0511-eprm.png',
    galleryImages: [
      '/images/products/unox-xevc-0511-eprm.png',
      '/images/products/cheftop-combi-1.jpg',
      '/images/products/cheftop-combi-2.jpg',
    ],
    isFlagship: true,
    warrantyPeriod: '1 Year On-site Manufacturer Warranty',
    certifications: ['CE Certified', 'ISO 9001:2015', 'HACCP Compliant', 'NSF / Hygiene Certified'],
    powerSource: 'Electric',
    highlights: [
      '5 Trays Capacity (GN 1/1, 530 × 325 mm)',
      '9.5" Capacitive Touch Control with MIND.Maps™ Visual Programming',
      '9.3 kW Connected Power (380-415V 3N~ / 400V 3N~)',
      'Intelligent Cooking Automation (CHEFUNOX, Intensive Cooking & Intelligence Performance)',
      'Multi-Cooking Modes: Steam, Bake, Combi, Convection, Roast, Grill, Pan Fry, Sous-Vide & Regeneration',
      'Food-Grade AISI 304 Stainless Steel Construction (70 kg Net Weight)',
      'Authorised UNOX Italy Dealership — Techmate Delhi NCR & Pan-India Dispatch',
    ],
    specs: [
      // Capacity & Output
      cap('5 Trays', undefined, 'Tray Capacity'),
      cap('5 Trays (GN 1/1)', undefined, 'Pan Capacity'),
      cap('5 Trays', undefined, 'Number of Trays'),
      cap('GN 1/1 (530 × 325 mm)', undefined, 'Tray Size'),
      cap('67 mm', undefined, 'Distance Between Trays (Pitch)'),
      cap('800 kg', undefined, 'Capacity / Throughput'),
      cap('1 Piece', undefined, 'Minimum Order Quantity (MOQ)'),

      // Electrical & Thermal
      elec('Power Source', 'Electric'),
      elec('Power Type', 'Electric'),
      elec('Connected Power', '9.3 kW'),
      elec('Supply Voltage', '380-415V 3N~ / 220-240V 3~ / 220-240V 1~ (400V 3N~)'),
      elec('Frequency', '50 / 60 Hz'),
      elec('Max Temperature', '260°C'),
      elec('Operating Temperature Range', '30°C to 260°C'),

      // Dimensions & Weight
      dims('Size / Dimension', 'Medium Countertop'),
      dims('Dimensions (W × D × H)', '750 × 783 × 675 mm'),
      dims('Net Weight', '70 kg'),
      dims('Gross Packaging Weight', '80 kg'),

      // Construction & Material
      constr('Model Name / Number', 'XEVC-0511-EPRM'),
      constr('Brand & Origin', 'UNOX (Italy)'),
      constr('Product Series', 'CHEFTOP MIND.Maps™ PLUS / Bakertop Mind Maps Compatibility'),
      constr('Oven Type', 'Industrial / Commercial Countertop Combi Oven'),
      constr('Body & Chamber Material', 'AISI 304 Stainless Steel'),
      constr('Door Type', 'Single Door (Hinge on Left Side, Triple-Glazed High Emissivity Glass)'),
      constr('Control Type', 'Digital (9.5" Capacitive Touch Control Panel)'),
      constr('Cooking Functions', 'Steam, Bake, Combi, Convection, Regeneration, Roast, Grill, Pan Frying, Dehydrating, Sous-Vide'),
      constr('Advanced Technologies', 'UNOX Intensive Cooking, Intelligence Performance, CHEFUNOX Automation'),
      constr('Suitable Applications', 'Cloud Kitchen, Restaurant, Bakery, Canteen, Cafe, Hotel, Central Commissary'),
      constr('Warranty Coverage', '1 Year On-site Manufacturer Warranty'),
      constr('Official Authority', 'Techmate Industries — Authorized UNOX Oven Dealers in Delhi & Pan-India'),
    ],
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
