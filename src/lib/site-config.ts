/**
 * Site-wide constants: identity, contact channels and the primary navigation.
 * Keep the website journey here so Header, Footer and any future sitemap stay in sync.
 */

export const SITE = {
  name: 'Techmate Industries',
  tagline: 'Technifying Your Kitchen',
  phone: {
    display: '+91 800-TECHMATE (832-4628)',
    tel: '+918008324628',
  },
  email: 'sales@techmateindustries.com',
  primaryCta: { label: 'Get a Quote', href: '/request-quote' },
} as const;

/** Digits only (country code + number, no "+"), as required by wa.me links. */
const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '918008324628').replace(/\D/g, '');

export const WHATSAPP_DEFAULT_MESSAGE =
  'Hello Techmate Industries, I would like to discuss commercial kitchen equipment for my project.';

export function buildWhatsAppUrl(message: string = WHATSAPP_DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Public Google reviews page for the business. Empty string hides the link. */
export const GOOGLE_REVIEWS_URL = process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL ?? '';

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
