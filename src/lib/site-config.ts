/**
 * Site-wide constants: identity, contact channels and the primary navigation.
 * Keep the website journey here so Header, Footer and any future sitemap stay in sync.
 */

export const SITE = {
  name: 'Techmate Industries',
  tagline: 'Technifying Your Kitchen',
  phone: {
    display: '080 4767 6599',
    tel: '+918047676599',
  },
  email: 'Techmateindustries@gmail.com',
  primaryCta: { label: 'Get a Quote', href: '/request-quote' },
} as const;

/**
 * Company facts from Techmate's previous website (techmateindustries.co.in), approved for reuse
 * by Techmate on 2026-10-29. Offices, registrations and trade reach live here so the footer,
 * Contact, About and SEO data stay in sync.
 */
export interface Office {
  label: string;
  lines: string[];
}

export const COMPANY = {
  established: 2010,
  ceo: 'Manoj Kataria',
  registrations: [
    { label: 'GST No.', value: '07AREPK3268K1ZJ' },
    { label: 'IEC', value: '0515038091' },
    { label: 'Udyam No.', value: 'UDYAM-DL-11-0020315' },
  ],
  importsFrom: ['Taiwan', 'China', 'Germany', 'Italy', 'Malaysia', 'USA', 'Turkey'],
  exportsTo: ['Middle East', 'Africa', 'Algeria'],
  /** Headline address (registered / head office). */
  address: {
    street: 'Ground Floor, Rz-7, KH No-31/23/1, Matiala Extn., Uttam Nagar',
    locality: 'New Delhi',
    region: 'Delhi',
    postalCode: '110059',
    country: 'India',
  },
  offices: [
    {
      label: 'Head Office & Warehouse',
      lines: ['Ground Floor, Rz-7, KH No-31/23/1, Matiala Extn.', 'Uttam Nagar, New Delhi - 110059'],
    },
    {
      label: 'Corporate Office',
      lines: ['Rz-7, Matiala, Near Delhi Public School (DPS)', 'Sector-3, Dwarka, New Delhi - 110059'],
    },
    {
      label: 'Branch Office, Kolkata',
      lines: ['123, Sailendhar Road, Liluah', 'Kolkata - 711204'],
    },
  ] as Office[],
} as const;

export const ADDRESS_ONE_LINE = `${COMPANY.address.street}, ${COMPANY.address.locality} - ${COMPANY.address.postalCode}`;

/** Digits only (country code + number, no "+"), as required by wa.me links. */
const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '918008324628').replace(/\D/g, '');

export const WHATSAPP_DEFAULT_MESSAGE =
  'Hello Techmate Industries, I would like to discuss commercial kitchen equipment for my project.';

export function buildWhatsAppUrl(message: string = WHATSAPP_DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Public Google reviews page for the business. Uses the configured env var or falls back to Google Search/Maps. */
export const GOOGLE_REVIEWS_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL ||
  'https://maps.app.goo.gl/V1CdPJFCWRszomSP6';

/** Direct link for customers to post a new review on Google. */
export const GOOGLE_WRITE_REVIEW_URL =
  process.env.NEXT_PUBLIC_GOOGLE_WRITE_REVIEW_URL ||
  'https://maps.app.goo.gl/V1CdPJFCWRszomSP6';

export interface NavLink {
  label: string;
  href: string;
}

/** Website journey: Home, then Products -> Brands -> Solutions -> Projects -> Services, About Us and Contact. */
export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Brands', href: '/brands' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function isActivePath(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}
