'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Smartphone, Headphones, LayoutGrid } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/site-config';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';

export function FloatingRightSidebar() {
  return (
    <aside
      aria-label="Quick Access Toolbar"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-white rounded-l-xl shadow-2xl py-3.5 px-2.5 hidden lg:flex flex-col items-center gap-5 border-l border-y border-gray-200 text-gray-700"
    >
      <Link
        href="/request-quote"
        title="Get a Quote"
        className="p-1.5 hover:text-[#174A83] hover:bg-gray-100 rounded-lg transition"
      >
        <ShoppingCart className="w-4 h-4" />
        <span className="sr-only">Get a Quote</span>
      </Link>

      <a
        href={buildWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
      >
        <WhatsAppIcon className="w-4 h-4" />
        <span className="sr-only">Chat on WhatsApp</span>
      </a>

      <Link
        href="/products"
        title="Products"
        className="p-1.5 hover:text-[#174A83] hover:bg-gray-100 rounded-lg transition"
      >
        <Smartphone className="w-4 h-4" />
        <span className="sr-only">Products</span>
      </Link>

      <Link
        href="/support"
        title="Factory Technical Support"
        className="p-1.5 hover:text-[#174A83] hover:bg-gray-100 rounded-lg transition"
      >
        <Headphones className="w-4 h-4" />
        <span className="sr-only">Factory Support</span>
      </Link>

      <Link
        href="/become-a-distributor"
        title="Dealer & Partner Portal"
        className="p-1.5 hover:text-[#174A83] hover:bg-gray-100 rounded-lg transition"
      >
        <LayoutGrid className="w-4 h-4" />
        <span className="sr-only">Dealer Portal</span>
      </Link>
    </aside>
  );
}
