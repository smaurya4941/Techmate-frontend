'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Honeypot } from '@/components/ui/Honeypot';
import { ApiError } from '@/lib/http';
import { mapFieldErrors, submitEnquiry } from '@/lib/submissions';
import { buildWhatsAppUrl } from '@/lib/site-config';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building,
  ShieldCheck,
  ArrowRight,
  Factory,
  Calendar,
} from 'lucide-react';

/** API field -> form field, for server-side validation messages. */
const FIELD_MAP: Record<string, string> = {
  customer_name: 'fullName',
  email: 'email',
  phone: 'phone',
  company_name: 'companyName',
  subject: 'subject',
  message: 'message',
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [reference, setReference] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');
    try {
      const ref = await submitEnquiry({
        customer_name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company_name: formData.companyName.trim() || undefined,
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        source: 'contact_page',
        hp_field: honeypot || undefined,
      });
      setReference(ref);
      setIsSuccess(true);
    } catch (error) {
      if (error instanceof ApiError) {
        setErrors((prev) => ({ ...prev, ...mapFieldErrors(error.fieldErrors, FIELD_MAP) }));
        setSubmitError(error.message);
      } else {
        setSubmitError('Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#08090a] text-gray-200 antialiased selection:bg-[#D62836] selection:text-white">
      <Header />

      <main className="flex-1 py-12 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Breadcrumbs */}
          <div className="pt-2">
            <Breadcrumbs items={[{ label: 'Contact' }]} />
          </div>

          {/* Page Heading (Dark Sleek Glassmorphism Header) */}
          <div className="rounded-[32px] bg-[#11141c] border border-white/10 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#174A83 1.5px, transparent 1.5px)',
                backgroundSize: '24px 24px',
              }}
            />
            <div className="relative z-10 max-w-3xl space-y-4">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#181d28] text-[11px] font-bold uppercase tracking-widest text-blue-400 border border-white/10 font-mono">
                DIRECT FACTORY CONNECT
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
                Contact Techmate Industries
              </h1>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                Connect directly with our corporate office, production plant engineers, or regional distributor coordinators for commercial kitchen equipment inquiries, turnkey projects, and factory visits.
              </p>
            </div>
          </div>

          {/* Form and Plant Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Column: Interactive Contact Form (7 cols) */}
            <div className="lg:col-span-7 bg-[#11141c] rounded-[32px] border border-white/10 p-8 sm:p-12 shadow-2xl relative">
              <div className="mb-8">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 block mb-1">
                  OFFICIAL INQUIRY DESK
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                  Send a Message to Factory Support
                </h2>
              </div>

              {isSuccess ? (
                <div className="text-center py-16 space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/60 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30 shadow-lg">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-white">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.fullName}</strong>. A technical sales engineer will respond to <strong>{formData.email}</strong> within 1 business day.
                  </p>
                  {reference && (
                    <p className="text-xs text-gray-400">
                      Your reference number: <strong className="font-mono text-white">{reference}</strong>
                    </p>
                  )}
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSuccess(false);
                        setReference('');
                        setFormData({
                          fullName: '',
                          email: '',
                          phone: '',
                          companyName: '',
                          subject: '',
                          message: '',
                        });
                      }}
                      className="inline-flex items-center px-6 py-3 rounded-xl bg-[#174A83] hover:bg-[#123a67] text-white text-xs font-bold transition shadow-lg"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative" noValidate>
                  {submitError && (
                    <div role="alert" className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-xs text-red-200">
                      {submitError}
                    </div>
                  )}
                  <Honeypot value={honeypot} onChange={setHoneypot} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-2">
                        Your Full Name <span className="text-[#D62836]">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Anand Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-[#181d28] border border-white/10 text-white placeholder-gray-500 text-sm focus:border-blue-400 focus:outline-none transition-colors"
                      />
                      {errors.fullName && (
                        <p className="mt-1.5 text-xs text-rose-400">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-2">
                        Business Email <span className="text-[#D62836]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. anand@hospitality.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#181d28] border border-white/10 text-white placeholder-gray-500 text-sm focus:border-blue-400 focus:outline-none transition-colors"
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-rose-400">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-2">
                        Phone / Mobile <span className="text-[#D62836]">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98000 00000"
                        className="w-full px-4 py-3 rounded-xl bg-[#181d28] border border-white/10 text-white placeholder-gray-500 text-sm focus:border-blue-400 focus:outline-none transition-colors"
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-xs text-rose-400">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-2">
                        Company / Establishment
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Hotel / Bakery / Hospital name"
                        className="w-full px-4 py-3 rounded-xl bg-[#181d28] border border-white/10 text-white placeholder-gray-500 text-sm focus:border-blue-400 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-2">
                      Inquiry Subject <span className="text-[#D62836]">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Factory Inspection &amp; Turnkey Cooking Range Proposal"
                      className="w-full px-4 py-3 rounded-xl bg-[#181d28] border border-white/10 text-white placeholder-gray-500 text-sm focus:border-blue-400 focus:outline-none transition-colors"
                    />
                    {errors.subject && (
                      <p className="mt-1.5 text-xs text-rose-400">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-2">
                      Detailed Message <span className="text-[#D62836]">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Specify your equipment requirements, site dimensions, or consultation questions..."
                      className="w-full px-4 py-3 rounded-xl bg-[#181d28] border border-white/10 text-white placeholder-gray-500 text-sm focus:border-blue-400 focus:outline-none transition-colors resize-none"
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-rose-400">{errors.message}</p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#174A83] hover:bg-[#123a67] text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-900/40 transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Sending Message...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          <span>Send Official Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Plant Details & Direct Contacts (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Plant Details Deep Navy Card */}
              <div className="bg-[#102B46] text-white rounded-[32px] p-8 sm:p-10 space-y-6 shadow-2xl border border-white/10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D62836] font-mono">
                    HEAD OFFICE &amp; MANUFACTURING
                  </span>
                  <h3 className="text-2xl font-bold font-heading text-white mt-1">
                    Techmate Industries Plant
                  </h3>
                </div>

                <div className="space-y-5 text-xs sm:text-sm text-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-[#D62836]" />
                    </div>
                    <div>
                      <strong className="block text-white mb-0.5">Factory &amp; Experience Centre:</strong>
                      <span className="text-gray-300 leading-relaxed">
                        Plot C-48, TTC Industrial Area, MIDC Pawane, Navi Mumbai, Maharashtra 400705, India
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <strong className="block text-white mb-0.5">Phone &amp; Toll Free Hotline:</strong>
                      <a href="tel:+918008324628" className="hover:text-blue-300 transition-colors font-bold block">
                        +91 800-TECHMATE (832-4628)
                      </a>
                      <a href="tel:+912227788900" className="text-xs text-gray-400 hover:text-white transition-colors">
                        Landline: +91 (022) 2778-8900
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <WhatsAppIcon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <strong className="block text-white mb-0.5">WhatsApp:</strong>
                      <a
                        href={buildWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-300 transition-colors font-bold block"
                      >
                        +91 800-TECHMATE (832-4628)
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <strong className="block text-white mb-0.5">Official Technical Inquiries:</strong>
                      <a href="mailto:sales@techmateindustries.com" className="hover:text-blue-300 transition-colors block">
                        sales@techmateindustries.com
                      </a>
                      <a href="mailto:quotes@techmateindustries.com" className="text-xs text-gray-400 hover:text-white transition-colors">
                        quotes@techmateindustries.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <strong className="block text-white mb-0.5">Business &amp; Plant Operating Hours:</strong>
                      <span className="text-gray-300 block">Monday – Saturday: 8:30 AM – 7:00 PM IST</span>
                      <span className="text-xs text-gray-400 block">Sunday: Closed (Breakdown Hotline Open)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/15 flex items-center gap-2.5 text-xs text-blue-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Factory visits welcomed by prior appointment.</span>
                </div>
              </div>

              {/* WhatsApp quick chat */}
              <div className="bg-[#11141c] rounded-[32px] border border-emerald-500/20 p-8 shadow-2xl space-y-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 block">
                  INSTANT CHAT
                </span>
                <h4 className="font-heading font-bold text-lg text-white">
                  Prefer WhatsApp?
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Message our sales engineers directly with your requirement, site photos or equipment drawings.
                </p>
                <div className="pt-2">
                  <a
                    href={buildWhatsAppUrl(
                      'Hello Techmate Industries, I am contacting you from your website regarding a commercial kitchen requirement.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-wider uppercase transition shadow-lg shadow-emerald-900/30"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Quick RFQ Quote Tool Box */}
              <div className="bg-[#11141c] rounded-[32px] border border-white/10 p-8 shadow-2xl space-y-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D62836] block">
                  FORMAL TENDERS &amp; BID SPECIFICATIONS
                </span>
                <h4 className="font-heading font-bold text-lg text-white">
                  Need an Immediate Quotation?
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  For formal bids, institutional tenders, or turnkey commercial kitchen equipment sizing estimates, use our dedicated B2B request-a-quote workflow.
                </p>
                <div className="pt-2">
                  <Link
                    href="/request-quote"
                    className="inline-flex items-center justify-center w-full px-6 py-3.5 rounded-xl bg-[#D62836] hover:bg-[#b81d29] text-white font-bold text-xs tracking-wider uppercase transition shadow-lg shadow-red-900/30"
                  >
                    <span>Launch Quotation Builder</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
