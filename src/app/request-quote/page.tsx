'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageContainer } from '@/components/layout/PageContainer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Honeypot } from '@/components/ui/Honeypot';
import { ApiError } from '@/lib/http';
import { mapFieldErrors, submitQuoteRequest } from '@/lib/submissions';
import type { QuoteRequestPayload } from '@/types/api';
import {
  FileText,
  CheckCircle2,
  Phone,
  Mail,
  ShieldCheck,
  Send,
  Building2,
  Clock,
} from 'lucide-react';

/** API field -> form field, for server-side validation messages. */
const FIELD_MAP: Record<string, string> = {
  customer_name: 'fullName',
  email: 'email',
  phone: 'phone',
  company_name: 'companyName',
  business_type: 'businessType',
  message: 'message',
  items: 'equipmentRequirement',
};

/** Quantity ranges are sent as the lower bound plus a note preserving the range. */
const QUANTITY_MAP: Record<string, { count: number; note?: string }> = {
  '1': { count: 1 },
  '2': { count: 2 },
  '3-5': { count: 3, note: 'Requested quantity: 3 - 5 units' },
  '6-10': { count: 6, note: 'Requested quantity: 6 - 10 units' },
  '10+': { count: 10, note: 'Requested quantity: 10+ units (turnkey project)' },
};

function RequestQuoteContent() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get('product') || '';
  const skuParam = searchParams.get('sku') || '';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    equipmentRequirement: '',
    quantity: '1',
    businessType: 'restaurant',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [reference, setReference] = useState('');
  const [honeypot, setHoneypot] = useState('');

  useEffect(() => {
    if (productParam) {
      setFormData((prev) => ({
        ...prev,
        equipmentRequirement: skuParam ? `${productParam} (${skuParam})` : productParam,
      }));
    }
  }, [productParam, skuParam]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
      newErrors.email = 'Valid corporate email is required';
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      newErrors.phone = 'Valid phone number is required';
    }
    if (!formData.companyName.trim()) newErrors.companyName = 'Company / Business name is required';
    if (!formData.equipmentRequirement.trim()) {
      newErrors.equipmentRequirement = 'Please specify equipment model or requirement';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');
    try {
      const quantity = QUANTITY_MAP[formData.quantity] ?? { count: 1, note: undefined };
      const ref = await submitQuoteRequest({
        customer_name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company_name: formData.companyName.trim(),
        business_type: formData.businessType as QuoteRequestPayload['business_type'],
        message: formData.message.trim() || undefined,
        source: 'request_quote_page',
        // The on-site catalogue is not yet served from the API, so the requirement
        // is sent as a described line item (the API also accepts catalogue slugs).
        items: [
          {
            name: formData.equipmentRequirement.trim().slice(0, 200),
            quantity: quantity.count,
            notes: quantity.note,
          },
        ],
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
    <>
      <Header />

      <main className="min-h-screen bg-[#F3F6FA]/60 py-8">
        <PageContainer size="narrow">
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'Request a Quotation' }]} />
          </div>

          <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm overflow-hidden">
            {/* Header Banner */}
            <div className="bg-[#102B46] text-white p-6 sm:p-10 border-b border-white/10">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#D62836] block mb-2 font-mono">
                B2B COMMERCIAL INQUIRY
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading">
                Request an Official Price Quotation
              </h1>
              <p className="mt-2 text-sm text-gray-300 max-w-xl leading-relaxed">
                Receive comprehensive commercial pricing, MEP utility requirements, and delivery schedules directly from Techmate factory engineers.
              </p>
            </div>

            <div className="p-6 sm:p-10">
              {isSuccess ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#102B46]">
                    Quotation Request Received!
                  </h3>
                  <p className="text-sm text-[#344054] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.fullName}</strong>. Our commercial sales engineering team will review your specifications for <em>{formData.equipmentRequirement}</em> and send an official formal quotation to <strong>{formData.email}</strong>.
                  </p>
                  {reference && (
                    <p className="text-xs text-[#344054]">
                      Your reference number: <strong className="font-mono">{reference}</strong>
                    </p>
                  )}
                  <div className="pt-4">
                    <Button
                      variant="primary"
                      onClick={() => {
                        setIsSuccess(false);
                        setReference('');
                        setFormData({
                          fullName: '',
                          email: '',
                          phone: '',
                          companyName: '',
                          equipmentRequirement: '',
                          quantity: '1',
                          businessType: 'restaurant',
                          message: '',
                        });
                      }}
                    >
                      Submit Another Requirement
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative" noValidate>
                  {submitError && <Alert variant="error">{submitError}</Alert>}
                  <Honeypot value={honeypot} onChange={setHoneypot} />
                  {/* Two-Column Grid for Personal & Company Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label="Contact Person Name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      error={errors.fullName}
                      isRequired
                      placeholder="e.g. Rajesh Kumar"
                    />

                    <Input
                      label="Business Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      isRequired
                      placeholder="e.g. rajesh@tajhotels.com"
                    />

                    <Input
                      label="Mobile / Phone Number"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      error={errors.phone}
                      isRequired
                      placeholder="e.g. +91 98765 43210"
                    />

                    <Input
                      label="Company / Establishment Name"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      error={errors.companyName}
                      isRequired
                      placeholder="e.g. Royal Grand Bakery & Cafe"
                    />
                  </div>

                  {/* Equipment Requirement & Quantity */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
                    <div className="sm:col-span-2">
                      <Input
                        label="Equipment Model / Requirement"
                        name="equipmentRequirement"
                        value={formData.equipmentRequirement}
                        onChange={handleChange}
                        error={errors.equipmentRequirement}
                        isRequired
                        placeholder="e.g. TM-CO-10GN Touch Combi Oven"
                      />
                    </div>

                    <div>
                      <Select
                        label="Quantity Needed"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        options={[
                          { value: '1', label: '1 Unit' },
                          { value: '2', label: '2 Units' },
                          { value: '3-5', label: '3 - 5 Units' },
                          { value: '6-10', label: '6 - 10 Units' },
                          { value: '10+', label: '10+ Units (Turnkey Project)' },
                        ]}
                      />
                    </div>
                  </div>

                  {/* Business Type */}
                  <div className="pt-2">
                    <Select
                      label="Industry / Establishment Type"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      options={[
                        { value: 'restaurant', label: 'Hotel / Fine Dining Restaurant' },
                        { value: 'bakery', label: 'Industrial Bakery / Patisserie' },
                        { value: 'cloud-kitchen', label: 'Cloud Kitchen / QSR Chain' },
                        { value: 'catering', label: 'Institutional / Banquet Catering' },
                        { value: 'dealer', label: 'Equipment Dealer / Distributor' },
                        { value: 'other', label: 'Other Commercial Food Production' },
                      ]}
                    />
                  </div>

                  {/* Detailed Message */}
                  <div className="pt-2">
                    <TextArea
                      label="Specific Requirements / Layout Notes (Optional)"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please mention electrical phase (Single or 3-Phase), gas type (LPG/PNG), custom dimensions, or site delivery location."
                      rows={4}
                    />
                  </div>

                  {/* Submission Notice & Button */}
                  <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-gray-500 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Direct OEM confidential pricing. No spam.</span>
                    </div>

                    <Button
                      type="submit"
                      variant="accent"
                      size="lg"
                      isLoading={isSubmitting}
                      className="w-full sm:w-auto"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      <span>Submit Quotation Request</span>
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </PageContainer>
      </main>

      <Footer />
    </>
  );
}

export default function RequestQuotePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F3F6FA]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#174A83]" />
        </div>
      }
    >
      <RequestQuoteContent />
    </Suspense>
  );
}
