'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Phone,
  Mail,
  Clock,
  Award,
  Lock,
  Search,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Activity,
  Layers,
  Headphones,
} from 'lucide-react';
import { CATEGORIES_DATA, getSubCategoriesOf } from '@/lib/products-data';
import { OWN_BRANDS, PARTNER_BRANDS } from '@/lib/brands-data';
import { NAV_LINKS, SITE, buildWhatsAppUrl, isActivePath } from '@/lib/site-config';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';

interface HeaderProps {
  apiHealthStatus?: 'online' | 'offline' | 'checking';
}

type DropdownKey = 'products' | 'brands';

/** Sub-categories listed per category in the Products dropdown before "View all". */
const DROPDOWN_SUBCATEGORY_LIMIT = 5;

/** Nav entries that open a dropdown on desktop. */
const DROPDOWN_LINKS: Record<string, DropdownKey> = {
  '/products': 'products',
  '/brands': 'brands',
};

export function Header({ apiHealthStatus }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Close menus on path change (state adjusted during render, not in an effect)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    setSearchOpen(false);
  }

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const closeMobile = () => setMobileMenuOpen(false);

  const desktopLinkClass = (href: string) =>
    `transition-colors py-2 ${
      isActivePath(pathname, href) ? 'text-[#174A83] font-bold' : 'hover:text-[#174A83]'
    }`;

  const renderProductsDropdown = () => (
    <div className="absolute top-full left-0 w-[880px] max-w-[90vw] bg-white shadow-2xl rounded-2xl border border-gray-100 py-3 text-xs z-50">
      <div className="px-5 py-2 border-b border-gray-100 text-[11px] font-bold uppercase text-[#174A83] tracking-wider flex items-center justify-between">
        <span>Product Categories</span>
        <Link href="/products" className="text-[#D62836] text-[10px] font-semibold hover:underline">
          All Products
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-x-6 gap-y-5 px-5 py-4">
        {CATEGORIES_DATA.map((cat) => {
          const allSubs = getSubCategoriesOf(cat.slug);
          const subs = allSubs.slice(0, DROPDOWN_SUBCATEGORY_LIMIT);
          return (
            <div key={cat.slug}>
              <Link
                href={`/products?category=${cat.slug}`}
                className="block font-semibold text-[#102B46] hover:text-[#174A83] transition-colors"
              >
                {cat.name}
              </Link>
              {subs.length > 0 && (
                <ul className="mt-1.5 space-y-1 border-l border-gray-100 pl-3">
                  {subs.map((sub) => (
                    <li key={sub.slug}>
                      <Link
                        href={`/products?category=${cat.slug}&subcategory=${sub.slug}`}
                        className="block text-[11px] text-gray-500 hover:text-[#174A83] transition-colors"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                  {allSubs.length > subs.length && (
                    <li>
                      <Link
                        href={`/products?category=${cat.slug}`}
                        className="block text-[11px] font-semibold text-[#D62836] hover:underline"
                      >
                        View all {allSubs.length}
                      </Link>
                    </li>
                  )}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderBrandsDropdown = () => (
    <div className="absolute top-full left-0 w-[420px] bg-white shadow-2xl rounded-2xl border border-gray-100 py-3 text-xs z-50">
      <div className="px-5 py-2 border-b border-gray-100 text-[11px] font-bold uppercase text-[#174A83] tracking-wider flex items-center justify-between">
        <span>Authorised Brands</span>
        <Link href="/brands" className="text-[#D62836] text-[10px] font-semibold hover:underline">
          All Brands
        </Link>
      </div>
      <ul className="grid grid-cols-2 gap-x-4 px-5 py-3">
        {PARTNER_BRANDS.map((brand) => (
          <li key={brand.slug}>
            <Link
              href={`/brands/${brand.slug}`}
              className="block py-1.5 font-semibold text-[#102B46] hover:text-[#174A83] transition-colors"
            >
              {brand.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="px-5 pt-3 border-t border-gray-100 text-[11px] font-bold uppercase text-[#174A83] tracking-wider">
        Techmate® Brands
      </div>
      <ul className="px-5 py-2">
        {OWN_BRANDS.map((brand) => (
          <li key={brand.slug}>
            <Link
              href={`/brands/${brand.slug}`}
              className="block py-1.5 font-semibold text-[#102B46] hover:text-[#174A83] transition-colors"
            >
              {brand.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      {/* 1. TOP UTILITY BAR (Deep Navy) */}
      <div className="bg-[#102B46] text-gray-200 text-xs py-2.5 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Contact Details */}
          <div className="flex items-center space-x-6">
            <a
              href={`tel:${SITE.phone.tel}`}
              className="flex items-center space-x-2 text-gray-200 hover:text-[#D62836] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#D62836]" />
              <span className="font-semibold">{SITE.phone.display}</span>
            </a>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-200 hover:text-emerald-400 transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="hidden lg:flex items-center space-x-2 text-gray-200 hover:text-[#D62836] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#D62836]" />
              <span>{SITE.email}</span>
            </a>
            <div className="hidden xl:flex items-center space-x-2 text-gray-400">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span>Mon - Sat: 8:30 AM - 7:00 PM IST</span>
            </div>
          </div>

          {/* Right Credential Badges & Portals */}
          <div className="flex items-center space-x-5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#174A83]/60 text-blue-100 text-[11px] font-semibold border border-blue-400/30">
              <Award className="w-3 h-3 text-[#D62836]" /> ISO 9001:2015 Certified
            </span>

            {/* Backend health status badge */}
            {apiHealthStatus && (
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                  apiHealthStatus === 'online'
                    ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/30'
                    : 'bg-amber-900/60 text-amber-300 border border-amber-500/30'
                }`}
                title={`REST API is ${apiHealthStatus}`}
              >
                <Activity className="w-2.5 h-2.5" /> API: {apiHealthStatus}
              </span>
            )}

            <Link
              href="/support"
              className="hover:text-white transition-colors flex items-center gap-1 font-medium text-xs text-gray-300 hover:underline"
            >
              <Headphones className="w-3 h-3 text-gray-300" /> Support
            </Link>

            <Link
              href="/become-a-distributor"
              className="hover:text-white transition-colors flex items-center gap-1 font-medium text-xs text-gray-300 hover:underline"
            >
              <Lock className="w-3 h-3 text-gray-300" /> Dealer & OEM Portal
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative h-12 w-32 sm:w-36 flex items-center">
                <Image
                  src="/images/techmate-logo.png"
                  alt={`${SITE.name} - Bake With Mate`}
                  width={144}
                  height={48}
                  className="object-contain group-hover:scale-105 transition-transform"
                  priority
                />
              </div>
              <div className="hidden 2xl:block pl-2 border-l border-gray-200">
                <div className="text-[10px] tracking-widest text-[#174A83] font-extrabold uppercase leading-none">
                  {SITE.tagline}
                </div>
                <div className="text-[9px] tracking-wider text-[#D62836] font-bold uppercase mt-1">
                  KITCHEN • BAKERY • COLD CHAIN
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav
              aria-label="Primary"
              className="hidden xl:flex items-center space-x-6 font-medium text-sm text-[#344054]"
            >
              {NAV_LINKS.map((link) => {
                const dropdownKey = DROPDOWN_LINKS[link.href];

                if (!dropdownKey) {
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={isActivePath(pathname, link.href) ? 'page' : undefined}
                      className={desktopLinkClass(link.href)}
                    >
                      {link.label}
                    </Link>
                  );
                }

                const isOpen = openDropdown === dropdownKey;
                return (
                  <div
                    key={link.href}
                    className="relative py-2"
                    onMouseEnter={() => setOpenDropdown(dropdownKey)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    onFocus={() => setOpenDropdown(dropdownKey)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                        setOpenDropdown(null);
                      }
                    }}
                  >
                    <Link
                      href={link.href}
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      aria-current={isActivePath(pathname, link.href) ? 'page' : undefined}
                      className={`flex items-center gap-1 transition-colors ${
                        isActivePath(pathname, link.href)
                          ? 'text-[#174A83] font-bold'
                          : 'hover:text-[#174A83]'
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-gray-400 transition-transform ${
                          isOpen ? 'rotate-180 text-[#174A83]' : ''
                        }`}
                      />
                    </Link>
                    {isOpen && (dropdownKey === 'products' ? renderProductsDropdown() : renderBrandsDropdown())}
                  </div>
                );
              })}
            </nav>

            {/* Header Actions */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="w-10 h-10 rounded-full border border-gray-200 text-gray-600 hover:text-[#174A83] hover:border-[#174A83] flex items-center justify-center transition"
                title="Search Products"
                aria-label="Search Products"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Primary Get a Quote Button (Techmate Red) */}
              <Link
                href={SITE.primaryCta.href}
                className="inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-bold text-white bg-[#D62836] hover:bg-[#b81d29] shadow-md shadow-[#D62836]/25 transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{SITE.primaryCta.label}</span>
                <ArrowRight className="ml-1.5 sm:ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition"
                aria-label="Toggle Navigation Menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#D62836]" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Modal Bar */}
        {searchOpen && (
          <div className="bg-[#F3F6FA] border-t border-gray-200 py-3 px-4 sm:px-6">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-3">
              <Search className="w-5 h-5 text-[#174A83] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products: combi oven, planetary mixer, blast chiller, cold room, work table..."
                className="w-full bg-white px-4 py-2 rounded-lg text-sm border border-gray-300 focus:outline-none focus:border-[#174A83] text-[#344054]"
                autoFocus
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#174A83] text-white text-xs font-bold rounded-lg hover:bg-[#123a67] transition shrink-0"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-xs font-bold text-gray-500 hover:text-[#D62836] shrink-0"
              >
                Close
              </button>
            </form>
          </div>
        )}

        {/* Mobile Slide-Out Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-gray-200 px-6 py-6 shadow-2xl animate-fade-in max-h-[80vh] overflow-y-auto">
            <nav aria-label="Mobile" className="space-y-4">
              {NAV_LINKS.map((link) => {
                const active = isActivePath(pathname, link.href);
                return (
                  <React.Fragment key={link.href}>
                    <Link
                      href={link.href}
                      onClick={closeMobile}
                      aria-current={active ? 'page' : undefined}
                      className={`block text-base py-2 border-b border-gray-100 ${
                        active ? 'text-[#174A83] font-bold' : 'text-[#344054] font-medium'
                      }`}
                    >
                      {link.label}
                    </Link>

                    {link.href === '/products' && (
                      <div className="py-2 border-b border-gray-100">
                        <div className="font-bold text-xs uppercase tracking-wider text-[#174A83] mb-2 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5" /> Product Categories
                        </div>
                        <div className="space-y-2 pl-3">
                          {CATEGORIES_DATA.map((cat) => {
                            return (
                              <div key={cat.slug}>
                                <Link
                                  href={`/products?category=${cat.slug}`}
                                  onClick={closeMobile}
                                  className="block text-sm text-[#344054] hover:text-[#174A83] py-1"
                                >
                                  • {cat.name}
                                </Link>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {link.href === '/brands' && (
                      <div className="space-y-1 pl-3 pb-2 border-b border-gray-100">
                        {[...PARTNER_BRANDS, ...OWN_BRANDS].map((brand) => (
                          <Link
                            key={brand.slug}
                            href={`/brands/${brand.slug}`}
                            onClick={closeMobile}
                            className="block text-sm text-[#344054] hover:text-[#174A83] py-1"
                          >
                            • {brand.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </React.Fragment>
                );
              })}

              <Link
                href="/support"
                onClick={closeMobile}
                className="block text-[#344054] font-medium text-sm py-2 border-b border-gray-100"
              >
                Technical Support
              </Link>
              <Link
                href="/become-a-distributor"
                onClick={closeMobile}
                className="block text-[#174A83] font-semibold text-sm py-2 border-b border-gray-100"
              >
                Dealer & OEM Portal
              </Link>

              {/* Mobile Quick Action Details */}
              <div className="pt-4 space-y-3">
                <a
                  href={`tel:${SITE.phone.tel}`}
                  className="w-full py-3 px-4 rounded-lg bg-[#102B46] text-white flex items-center justify-center gap-2 font-bold text-sm"
                >
                  <Phone className="w-4 h-4 text-[#D62836]" />
                  <span>Call: +91 800-TECHMATE</span>
                </a>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 font-bold text-sm"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
                <Link
                  href={SITE.primaryCta.href}
                  onClick={closeMobile}
                  className="w-full py-3 px-4 rounded-lg bg-[#D62836] text-white flex items-center justify-center gap-2 font-bold text-sm shadow-md"
                >
                  <span>{SITE.primaryCta.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
