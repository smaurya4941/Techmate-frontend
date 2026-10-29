'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Wheat,
  Flame,
  UtensilsCrossed,
  Sparkles,
  Snowflake,
  Thermometer,
  Coffee,
  Boxes,
} from 'lucide-react';
import { CATEGORIES_DATA, getSubCategoriesOf } from '@/lib/products-data';
import { OWN_BRANDS, PARTNER_BRANDS } from '@/lib/brands-data';
import { NAV_LINKS, SITE, buildWhatsAppUrl, isActivePath } from '@/lib/site-config';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import type { EquipmentCategory } from '@/types/product';

interface HeaderProps {
  apiHealthStatus?: 'online' | 'offline' | 'checking';
}

type DropdownKey = 'products' | 'brands';

/** Maximum sub-categories listed per category in the Products dropdown before 'View all'. */
const DROPDOWN_SUBCATEGORY_LIMIT = 4;

/** Icon map for the 8 machinery divisions */
const CATEGORY_ICON_MAP: Record<EquipmentCategory, React.ElementType> = {
  'bakery-baking': Wheat,
  'cooking': Flame,
  'food-preparation': UtensilsCrossed,
  'dishwashing': Sparkles,
  'refrigeration': Snowflake,
  'hot-holding': Thermometer,
  'beverage': Coffee,
  'kitchen-equipment': Boxes,
};

export function Header({ apiHealthStatus }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close menus on path change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    setSearchOpen(false);
  }

  // Handle escape key and click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const closeMobile = () => {
    setMobileMenuOpen(false);
    setMobileExpandedCat(null);
  };

  const desktopLinkClass = (href: string) =>
    `transition-colors py-2 text-sm font-semibold flex items-center gap-1 ${
      isActivePath(pathname, href) ? 'text-[#174A83] font-bold' : 'text-[#344054] hover:text-[#174A83]'
    }`;

  // Products Mega Menu
  const renderProductsDropdown = () => (
    <div
      role="region"
      aria-label="Products Mega Menu"
      className="absolute top-full left-1/2 -translate-x-1/2 w-[1140px] max-w-[95vw] bg-white shadow-2xl rounded-2xl border border-gray-100/90 text-xs z-50 overflow-hidden animate-fade-in mt-1"
    >
      {/* Top Header Bar */}
      <div className="bg-[#F8FAFC] px-8 py-3.5 border-b border-gray-200/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#174A83]" />
          <span className="text-[11px] font-extrabold uppercase text-[#102B46] tracking-wider font-heading">
            Commercial Food-Service Machinery Divisions
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/categories"
            onClick={() => setOpenDropdown(null)}
            className="text-[#174A83] text-xs font-bold hover:underline flex items-center gap-1"
          >
            <span>All 8 Divisions &amp; 44 Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            href="/products"
            onClick={() => setOpenDropdown(null)}
            className="text-[#D62836] text-xs font-bold hover:underline"
          >
            View Complete Catalogue
          </Link>
        </div>
      </div>

      {/* 4-Column Grid with 8 Divisions */}
      <div className="grid grid-cols-4 gap-6 px-8 py-6 max-h-[65vh] overflow-y-auto">
        {CATEGORIES_DATA.map((cat) => {
          const Icon = CATEGORY_ICON_MAP[cat.slug] || Layers;
          const allSubs = getSubCategoriesOf(cat.slug);
          const subs = allSubs.slice(0, DROPDOWN_SUBCATEGORY_LIMIT);

          return (
            <div key={cat.slug} className="space-y-2.5 group">
              <Link
                href={`/products?category=${cat.slug}`}
                onClick={() => setOpenDropdown(null)}
                className="flex items-center gap-2.5 font-bold text-sm text-[#102B46] hover:text-[#174A83] transition-colors pb-1 border-b border-gray-100"
              >
                <div className="w-7 h-7 rounded-lg bg-[#F3F6FA] text-[#174A83] flex items-center justify-center shrink-0 group-hover:bg-[#174A83] group-hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="truncate">{cat.name}</span>
              </Link>

              {subs.length > 0 && (
                <ul className="space-y-1.5 pl-2 border-l border-gray-100">
                  {subs.map((sub) => (
                    <li key={sub.slug}>
                      <Link
                        href={`/products?category=${cat.slug}&subcategory=${sub.slug}`}
                        onClick={() => setOpenDropdown(null)}
                        className="block text-[11px] text-[#475467] hover:text-[#174A83] hover:translate-x-0.5 transition-all truncate"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                  {allSubs.length > subs.length && (
                    <li className="pt-0.5">
                      <Link
                        href={`/products?category=${cat.slug}`}
                        onClick={() => setOpenDropdown(null)}
                        className="text-[11px] font-bold text-[#D62836] hover:underline block"
                      >
                        + {allSubs.length - subs.length} more categories →
                      </Link>
                    </li>
                  )}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Ribbon CTA */}
      <div className="bg-[#102B46] text-white px-8 py-3 flex items-center justify-between text-xs">
        <span className="text-gray-300 font-medium">
          Need custom AISI 304 fabrication, equipment sizing or CAD drawings?
        </span>
        <Link
          href="/request-quote"
          onClick={() => setOpenDropdown(null)}
          className="text-white bg-[#D62836] hover:bg-[#b81d29] px-4 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 shrink-0"
        >
          <span>Request Technical Quote</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );

  // Brands Dropdown
  const renderBrandsDropdown = () => (
    <div
      role="region"
      aria-label="Brands Menu"
      className="absolute top-full left-1/2 -translate-x-1/2 w-[520px] bg-white shadow-2xl rounded-2xl border border-gray-100 text-xs z-50 overflow-hidden animate-fade-in mt-1"
    >
      <div className="px-6 py-3.5 bg-[#F8FAFC] border-b border-gray-100 flex items-center justify-between">
        <span className="text-[11px] font-extrabold uppercase text-[#102B46] tracking-wider font-heading">
          Authorised Brand Directory
        </span>
        <Link
          href="/brands"
          onClick={() => setOpenDropdown(null)}
          className="text-[#D62836] text-[11px] font-bold hover:underline"
        >
          View All Brands →
        </Link>
      </div>

      <div className="p-6">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[#174A83] mb-2 font-mono">
          Global Partner Brands
        </div>
        <ul className="grid grid-cols-2 gap-2 mb-4">
          {PARTNER_BRANDS.map((brand) => (
            <li key={brand.slug}>
              <Link
                href={`/brands/${brand.slug}`}
                onClick={() => setOpenDropdown(null)}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F3F6FA] text-xs font-semibold text-[#102B46] hover:text-[#174A83] transition"
              >
                <span>{brand.name}</span>
                {brand.country && <span className="text-[10px] text-gray-400 font-normal">{brand.country}</span>}
              </Link>
            </li>
          ))}
        </ul>

        <div className="pt-3 border-t border-gray-100">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#174A83] mb-2 font-mono">
            Techmate® Manufacturing Brands
          </div>
          <ul className="grid grid-cols-3 gap-2">
            {OWN_BRANDS.map((brand) => (
              <li key={brand.slug}>
                <Link
                  href={`/brands/${brand.slug}`}
                  onClick={() => setOpenDropdown(null)}
                  className="block p-2 rounded-lg bg-[#F8FAFC] hover:bg-[#174A83] hover:text-white text-center text-xs font-bold text-[#102B46] transition"
                >
                  {brand.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
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
              <Lock className="w-3 h-3 text-gray-300" /> Dealer Portal
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/90 shadow-sm transition-all" ref={dropdownRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group py-2" aria-label="Techmate Industries Home">
              <div className="relative w-44 sm:w-52 h-12 transition-transform duration-200 group-hover:scale-[1.02]">
                <Image
                  src="/images/techmate-logo.png"
                  alt="Techmate Industries - Technifying Your Kitchen"
                  fill
                  priority
                  className="object-contain object-left"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav aria-label="Main Navigation" className="hidden xl:flex items-center space-x-7">
              {NAV_LINKS.map((link) => {
                const isProducts = link.href === '/products';
                const isBrands = link.href === '/brands';
                const hasDropdown = isProducts || isBrands;
                const dropdownKey: DropdownKey | null = isProducts ? 'products' : isBrands ? 'brands' : null;
                const isOpen = openDropdown === dropdownKey;

                if (!hasDropdown) {
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

                return (
                  <div
                    key={link.href}
                    className="relative py-2"
                    onMouseEnter={() => dropdownKey && setOpenDropdown(dropdownKey)}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => {
                        // Allow clicking to toggle dropdown if desired
                        if (dropdownKey && openDropdown === dropdownKey) {
                          setOpenDropdown(null);
                        }
                      }}
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      className={desktopLinkClass(link.href)}
                    >
                      <span>{link.label}</span>
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

              {/* Primary Call to Action */}
              <Link
                href={SITE.primaryCta.href}
                className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-[#D62836] hover:bg-[#b81d29] text-white font-extrabold text-sm tracking-wide shadow-md shadow-[#D62836]/20 transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{SITE.primaryCta.label}</span>
              </Link>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden w-10 h-10 rounded-lg border border-gray-200 text-gray-700 hover:text-[#174A83] flex items-center justify-center transition"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Global Expandable Search Bar */}
        {searchOpen && (
          <div className="border-t border-gray-100 bg-[#F8FAFC] py-4 px-4 sm:px-8 animate-fade-in shadow-inner">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search machinery by model, keyword (e.g. Combi Oven, Spiral Mixer, Blast Chiller)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#174A83] focus:ring-1 focus:ring-[#174A83] text-[#102B46] placeholder-gray-400 shadow-sm"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-[#174A83] hover:bg-[#102B46] text-white rounded-xl text-sm font-bold transition shadow-sm"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-3 text-gray-400 hover:text-gray-600 rounded-xl"
                aria-label="Close Search"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Slide-Out Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-gray-200 px-6 py-6 shadow-2xl animate-fade-in max-h-[85vh] overflow-y-auto">
            <nav aria-label="Mobile Navigation" className="space-y-3">
              {NAV_LINKS.map((link) => {
                const active = isActivePath(pathname, link.href);
                const isProducts = link.href === '/products';
                const isBrands = link.href === '/brands';

                if (!isProducts && !isBrands) {
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobile}
                      aria-current={active ? 'page' : undefined}
                      className={`block text-base py-2.5 border-b border-gray-100 ${
                        active ? 'text-[#174A83] font-bold' : 'text-[#344054] font-medium'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                }

                if (isProducts) {
                  return (
                    <div key={link.href} className="py-2 border-b border-gray-100">
                      <div className="flex items-center justify-between py-1">
                        <Link
                          href="/products"
                          onClick={closeMobile}
                          className={`text-base ${active ? 'text-[#174A83] font-bold' : 'text-[#344054] font-medium'}`}
                        >
                          Products Catalogue
                        </Link>
                        <Link
                          href="/categories"
                          onClick={closeMobile}
                          className="text-[#D62836] text-xs font-bold hover:underline"
                        >
                          All Categories →
                        </Link>
                      </div>

                      {/* Mobile Categories Accordion */}
                      <div className="mt-2 space-y-1.5 pl-2">
                        {CATEGORIES_DATA.map((cat) => {
                          const isExpanded = mobileExpandedCat === cat.slug;
                          const subs = getSubCategoriesOf(cat.slug);

                          return (
                            <div key={cat.slug} className="border-l-2 border-gray-100 pl-3 py-1">
                              <div className="flex items-center justify-between">
                                <Link
                                  href={`/products?category=${cat.slug}`}
                                  onClick={closeMobile}
                                  className="text-xs font-semibold text-[#102B46] hover:text-[#174A83]"
                                >
                                  {cat.name}
                                </Link>
                                {subs.length > 0 && (
                                  <button
                                    type="button"
                                    onClick={() => setMobileExpandedCat(isExpanded ? null : cat.slug)}
                                    className="p-1 text-gray-400 hover:text-[#174A83]"
                                    aria-label={`Toggle ${cat.name} subcategories`}
                                  >
                                    <ChevronDown
                                      className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                    />
                                  </button>
                                )}
                              </div>

                              {isExpanded && subs.length > 0 && (
                                <ul className="mt-1.5 space-y-1 pl-2">
                                  {subs.map((sub) => (
                                    <li key={sub.slug}>
                                      <Link
                                        href={`/products?category=${cat.slug}&subcategory=${sub.slug}`}
                                        onClick={closeMobile}
                                        className="block text-[11px] text-gray-500 hover:text-[#174A83] py-0.5"
                                      >
                                        • {sub.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                if (isBrands) {
                  return (
                    <div key={link.href} className="py-2 border-b border-gray-100">
                      <div className="flex items-center justify-between py-1">
                        <Link
                          href="/brands"
                          onClick={closeMobile}
                          className={`text-base ${active ? 'text-[#174A83] font-bold' : 'text-[#344054] font-medium'}`}
                        >
                          Brands Directory
                        </Link>
                        <Link
                          href="/brands"
                          onClick={closeMobile}
                          className="text-[#D62836] text-xs font-bold hover:underline"
                        >
                          View All →
                        </Link>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 pl-3 pt-1">
                        {[...PARTNER_BRANDS, ...OWN_BRANDS].slice(0, 8).map((brand) => (
                          <Link
                            key={brand.slug}
                            href={`/brands/${brand.slug}`}
                            onClick={closeMobile}
                            className="text-xs text-[#475467] hover:text-[#174A83] py-0.5 truncate"
                          >
                            • {brand.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return null;
              })}

              <div className="pt-2 flex items-center justify-between text-xs text-gray-500 border-b border-gray-100 pb-3">
                <Link href="/support" onClick={closeMobile} className="hover:text-[#174A83] flex items-center gap-1 font-semibold">
                  <Headphones className="w-3.5 h-3.5" /> Machinery Support
                </Link>
                <Link href="/become-a-distributor" onClick={closeMobile} className="text-[#174A83] font-bold hover:underline flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" /> Dealer &amp; OEM Portal
                </Link>
              </div>

              {/* Mobile Quick Action Buttons */}
              <div className="pt-4 space-y-2.5">
                <a
                  href={`tel:${SITE.phone.tel}`}
                  className="w-full py-3 px-4 rounded-xl bg-[#102B46] text-white flex items-center justify-center gap-2 font-bold text-sm shadow-sm"
                >
                  <Phone className="w-4 h-4 text-[#D62836]" />
                  <span>Call: {SITE.phone.display}</span>
                </a>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 font-bold text-sm shadow-sm"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Chat with Sales on WhatsApp</span>
                </a>
                <Link
                  href={SITE.primaryCta.href}
                  onClick={closeMobile}
                  className="w-full py-3 px-4 rounded-xl bg-[#D62836] text-white flex items-center justify-center gap-2 font-extrabold text-sm shadow-md"
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
