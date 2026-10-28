'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Award,
  ArrowRight,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/site-config';
import { CATEGORIES_DATA } from '@/lib/products-data';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#102B46] text-white">
      {/* 1. PRE-FOOTER CTA BANNER */}
      <div className="bg-[#174A83] py-12 border-b border-blue-900/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-200 block mb-1 font-mono">
              TALK TO A TECHMATE EXPERT
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Building or upgrading your kitchen?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
              Talk to a Techmate expert for equipment selection, layout planning, installation and after-sales support.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              href="/request-quote"
              className="px-8 py-3.5 rounded-xl bg-[#D62836] hover:bg-[#b81d29] text-white font-extrabold text-sm shadow-xl shadow-[#D62836]/30 transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-sm transition flex items-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Talk to an Expert</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN 4-COLUMN FOOTER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: Brand & Certification (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block bg-white px-3 py-2 rounded-xl shadow">
              <Image
                src="/images/techmate-logo.png"
                alt="Techmate Industries - Bake With Mate"
                width={150}
                height={50}
                className="object-contain"
              />
            </Link>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Technifying Your Kitchen. Techmate Industries is a premium commercial kitchen
              &amp; bakery equipment solutions company, offering cooking ranges, industrial
              bakery machines, and commercial refrigeration systems built for 24/7 demanding
              environments.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 text-xs font-semibold text-blue-200 border border-white/15">
                <Award className="w-3.5 h-3.5 text-[#D62836]" /> ISO 9001:2015
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 text-xs font-semibold text-blue-200 border border-white/15">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> CE Compliant
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-3 text-gray-400 pt-2">
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#174A83] hover:text-white flex items-center justify-center transition" title="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.59 1.59 0 0 0 0-3.18 1.59 1.59 0 0 0 0 3.18m1.4 9.74v-8.37H5.06v8.37z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#D62836] hover:text-white flex items-center justify-center transition" title="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M21.58 7.19a2.71 2.71 0 0 0-1.9-1.9C17.97 4.75 12 4.75 12 4.75s-5.97 0-7.68.54A2.71 2.71 0 0 0 2.42 7.2 28.5 28.5 0 0 0 2 12a28.5 28.5 0 0 0 .42 4.81 2.71 2.71 0 0 0 1.9 1.9c1.71.54 7.68.54 7.68.54s5.97 0 7.68-.54a2.71 2.71 0 0 0 1.9-1.9A28.5 28.5 0 0 0 22 12a28.5 28.5 0 0 0-.42-4.81zM10 15V9l5.2 3z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#174A83] hover:text-white flex items-center justify-center transition" title="X (Twitter)">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#174A83] hover:text-white flex items-center justify-center transition" title="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300 font-mono">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-white transition-colors">
                  Brands
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-white transition-colors">
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/become-a-distributor" className="hover:text-white transition-colors">
                  Become a Distributor
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-white transition-colors">
                  Service & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Product Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300 font-mono">
              Product Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              {CATEGORIES_DATA.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/products?category=${cat.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Factory Plant & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300 font-mono">
              Contact & Plant
            </h4>
            <div className="text-xs text-gray-300 space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D62836] shrink-0 mt-0.5" />
                <span>Plot C-48, TTC Industrial Area, MIDC Pawane, Navi Mumbai, MH 400705</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D62836] shrink-0" />
                <span>+91 800-TECHMATE (832-4628)</span>
              </div>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Chat on WhatsApp</span>
              </a>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D62836] shrink-0" />
                <span>sales@techmateindustries.com</span>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-gray-400 block mb-2">
                Subscribe for New Machinery Catalogues
              </span>
              {subscribed ? (
                <div className="p-2.5 rounded bg-white/10 text-[11px] text-emerald-300 flex items-center gap-1.5 font-semibold">
                  <ShieldCheck className="w-4 h-4" /> Thank you for subscribing!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter corporate email..."
                    className="w-full bg-white/10 border border-white/20 px-3 py-2 rounded-l-lg text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#174A83]"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-[#D62836] hover:bg-[#b81d29] px-3.5 py-2 rounded-r-lg text-white text-xs font-bold transition flex items-center justify-center shrink-0"
                    title="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 3. COPYRIGHT BAR */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Techmate Industries Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center flex-wrap gap-6 text-gray-400">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Supply
            </Link>
            <Link href="/faqs" className="hover:text-white transition-colors">
              FAQs
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact Factory
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
