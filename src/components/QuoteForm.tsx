'use client';

import React, { useState } from 'react';
import { Phone, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { FadeIn } from '@/components/animations/MotionWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { Honeypot } from '@/components/ui/Honeypot';
import { ApiError } from '@/lib/http';
import { submitEnquiry } from '@/lib/submissions';

export function QuoteForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    companyName: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [reference, setReference] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Please enter your full name, business email, and phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const ref = await submitEnquiry({
        customer_name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company_name: formData.companyName.trim() || undefined,
        subject: 'Kitchen consultation request',
        message: formData.message.trim().length >= 10
          ? formData.message.trim()
          : `Consultation requested from the homepage. ${formData.message.trim()}`.trim(),
        source: 'home_page',
        hp_field: honeypot || undefined,
      });
      setReference(ref);
      setSubmitted(true);
    } catch (error) {
      if (error instanceof ApiError) {
        const first = Object.values(error.fieldErrors)[0];
        setErrorMsg(first ?? error.message);
      } else {
        setErrorMsg('Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-[#0a0d14] px-6 sm:px-8" id="quote-form">
      {/* Glowing Border Container (Bizznep Layout with FadeIn) */}
      <FadeIn direction="up">
        <div className="max-w-6xl mx-auto p-1.5 sm:p-2.5 rounded-[36px] bg-gradient-to-b from-[#174A83] via-[#174A83]/20 to-transparent glow-blue-border">
        <div className="rounded-[30px] bg-[#121620] p-8 sm:p-14 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Info Column (Bizznep Layout) */}
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-block px-4 py-1 rounded-full bg-[#1e2330] text-xs font-bold tracking-wider text-blue-200 uppercase border border-white/10">
                APPOINTMENT &amp; QUOTE
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading">
                Schedule Kitchen Consultation
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Connect directly with Techmate factory engineers to discuss commercial kitchen machinery specifications, custom dimensions, and formal quotation pricing.
              </p>

              {/* Phone Widget */}
              <div className="flex items-center gap-4 pt-4">
                <div className="w-12 h-12 rounded-xl bg-transparent border border-white/20 flex items-center justify-center text-white shrink-0">
                  <Phone className="w-5 h-5 text-[#D62836]" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-blue-300">*Direct Phone</span>
                  <a href="tel:+918008324628" className="text-base font-bold text-white tracking-wide hover:underline">
                    +91 800-TECHMATE
                  </a>
                </div>
              </div>

              {/* Opening Hour Widget */}
              <div className="flex items-center gap-4 pt-2">
                <div className="w-12 h-12 rounded-xl bg-transparent border border-white/20 flex items-center justify-center text-white shrink-0">
                  <Clock className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-blue-300">Plant &amp; Office Hours</span>
                  <span className="text-sm font-semibold text-white">Mon - Sat (08:30 - 19:00 IST)</span>
                  <span className="block text-xs text-gray-400">Sunday Closed (Breakdown Hotline Open)</span>
                </div>
              </div>
            </div>

            {/* Right Form Column with Underline Inputs (Bizznep Layout) */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-900/60 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-heading">
                    Consultation Request Logged!
                  </h3>
                  <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.fullName}</strong>. A technical sales engineer will reach out to <strong>{formData.phone}</strong> and provide formal commercial specifications.
                  </p>
                  {reference && (
                    <p className="text-xs text-gray-400">
                      Your reference number: <strong className="font-mono text-white">{reference}</strong>
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setReference('');
                      setFormData({ fullName: '', phone: '', email: '', companyName: '', message: '' });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative" noValidate>
                  <Honeypot value={honeypot} onChange={setHoneypot} />
                  {errorMsg && (
                    <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-xs text-red-200">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-white mb-1">
                        *Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Rajesh Kumar"
                        className="input-underline w-full text-sm text-gray-200 placeholder-gray-500 py-2 focus:outline-none"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-white mb-1">
                        *Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98000 00000"
                        className="input-underline w-full text-sm text-gray-200 placeholder-gray-500 py-2 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-bold text-white mb-1">
                      *Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="rajesh@hotel.com"
                      className="input-underline w-full text-sm text-gray-200 placeholder-gray-500 py-2 focus:outline-none"
                    />
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-xs font-bold text-white mb-1">
                      Company / Property Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Grand Horizon Hotel"
                      className="input-underline w-full text-sm text-gray-200 placeholder-gray-500 py-2 focus:outline-none"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-white mb-1">
                      Equipment Requirements or Project Notes
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={2}
                      placeholder="e.g. 10-tray combi oven and 6-burner cooking suite for new banquet project"
                      className="input-underline w-full text-sm text-gray-200 placeholder-gray-500 py-2 focus:outline-none resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[11px] text-gray-400">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Direct OEM confidential pricing.</span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-9 py-3.5 rounded-xl bg-[#D62836] hover:bg-[#b81d29] text-white font-extrabold text-sm transition-all shadow-lg shadow-[#D62836]/25 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Now'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
    </section>
  );
}
