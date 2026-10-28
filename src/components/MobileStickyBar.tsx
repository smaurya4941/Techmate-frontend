'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, FileText } from 'lucide-react';
import { SITE, buildWhatsAppUrl } from '@/lib/site-config';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';

export function MobileStickyBar() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#102B46]/95 backdrop-blur-md border-t border-white/15 px-4 py-3 shadow-2xl flex items-center justify-between gap-3">
      <a
        href={`tel:${SITE.phone.tel}`}
        className="flex-1 py-2.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/15 transition active:scale-95"
      >
        <Phone className="w-3.5 h-3.5 text-[#D62836]" />
        <span>Call</span>
      </a>

      <a
        href={buildWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95"
      >
        <WhatsAppIcon className="w-3.5 h-3.5" />
        <span>WhatsApp</span>
      </a>

      <Link
        href="#quote-form"
        className="flex-1 py-2.5 px-3 rounded-lg bg-[#D62836] hover:bg-[#b81d29] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#D62836]/30 transition active:scale-95"
      >
        <FileText className="w-3.5 h-3.5" />
        <span>{SITE.primaryCta.label}</span>
      </Link>
    </div>
  );
}
