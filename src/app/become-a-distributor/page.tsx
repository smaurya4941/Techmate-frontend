'use client';

import React, { useState } from 'react';
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
import { mapFieldErrors, submitDistributorApplication } from '@/lib/submissions';
import type { DistributorApplicationPayload } from '@/types/api';
import {
  Handshake,
  CheckCircle2,
  ShieldCheck,
  Send,
  Building,
  Award,
  Globe,
} from 'lucide-react';

/** API field -> form field, for server-side validation messages. */
const FIELD_MAP: Record<string, string> = {
  contact_name: 'contactName',
  company_name: 'companyName',
  email: 'email',
  phone: 'phone',
  regions_served: 'region',
  business_type: 'businessType',
  message: 'message',
};

export default function BecomeADistributorPage() {
  const [formData, setFormData] = useState({
    contactName: '',
    companyName: '',
    email: '',
    phone: '',
    region: '',
    businessType: 'dealer',
    experienceYears: '3-5',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [reference, setReference] = useState('');
  const [honeypot, setHoneypot] = useState('');

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
    if (!formData.contactName.trim()) newErrors.contactName = 'Contact name is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Valid corporate email is required';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.region.trim()) newErrors.region = 'Operating territory/city is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');
    try {
      const ref = await submitDistributorApplication({
        contact_name: formData.contactName.trim(),
        company_name: formData.companyName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        business_type: formData.businessType as DistributorApplicationPayload['business_type'],
        experience_range: formData.experienceYears as DistributorApplicationPayload['experience_range'],
        regions_served: [formData.region.trim()],
        message: formData.message.trim() || undefined,
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

      <main className="min-h-screen bg-[#F3F6FA]/50 py-8">
        <PageContainer size="narrow">
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'Become an Authorized Distributor' }]} />
          </div>

          <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm overflow-hidden mb-12">
            {/* Header Banner */}
            <div className="bg-[#102B46] text-white p-6 sm:p-10 border-b border-white/10">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#D62836] block mb-2 font-mono">
                B2B PARTNERSHIP NETWORK
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading">
                Become a Techmate Channel Partner
              </h1>
              <p className="mt-2 text-sm text-gray-300 max-w-xl leading-relaxed">
                Expand your food-service equipment distribution business with direct OEM manufacturing support, protected territories, and comprehensive technical training.
              </p>
            </div>

            <div className="p-6 sm:p-10">
              {isSuccess ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#102B46]">
                    Partnership Application Submitted
                  </h3>
                  <p className="text-sm text-[#344054] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.contactName}</strong> from <strong>{formData.companyName}</strong>. Our channel development team will review your territory profile and contact you within 2 business days.
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
                        setFormData({
                          contactName: '',
                          companyName: '',
                          email: '',
                          phone: '',
                          region: '',
                          businessType: 'dealer',
                          experienceYears: '3-5',
                          message: '',
                        });
                      }}
                    >
                      Submit Another Territory
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative" noValidate>
                  {submitError && <Alert variant="error">{submitError}</Alert>}
                  <Honeypot value={honeypot} onChange={setHoneypot} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label="Contact Person Name"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      error={errors.contactName}
                      isRequired
                      placeholder="e.g. Vikram Singhania"
                    />

                    <Input
                      label="Dealership / Company Name"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      error={errors.companyName}
                      isRequired
                      placeholder="e.g. Singhania Kitchen Solutions"
                    />

                    <Input
                      label="Business Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      isRequired
                      placeholder="vikram@singhaniakitchen.com"
                    />

                    <Input
                      label="Mobile / Phone Number"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      error={errors.phone}
                      isRequired
                      placeholder="+91 98200 12345"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                    <Input
                      label="Target Territory / Operating State & City"
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      error={errors.region}
                      isRequired
                      placeholder="e.g. Pune, Western Maharashtra"
                    />

                    <Select
                      label="Current Business Focus"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      options={[
                        { value: 'dealer', label: 'Commercial Kitchen Equipment Dealer' },
                        { value: 'bakery-supplier', label: 'Bakery Ingredients & Machinery Supplier' },
                        { value: 'refrigeration-mep', label: 'Refrigeration & HVAC Contractor' },
                        { value: 'turnkey-consultant', label: 'Hospitality Project Consultant' },
                      ]}
                    />
                  </div>

                  <div className="pt-2">
                    <TextArea
                      label="Existing Commercial Kitchen Experience & Capabilities"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your current showroom space, warehouse facilities, existing brand representations, or technical service team..."
                      rows={4}
                    />
                  </div>

                  {/* Legal Notice */}
                  <div className="p-4 rounded-xl bg-[#F3F6FA] border border-gray-200 text-xs text-gray-500 leading-relaxed">
                    <strong>Note:</strong> Submitting this dealer expression of interest does not automatically establish an authorized dealership or exclusivity agreement. All applications undergo due commercial evaluation and factory review.
                  </div>

                  <div className="pt-2 flex justify-end">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      isLoading={isSubmitting}
                      className="w-full sm:w-auto"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      <span>Submit Dealership Expression</span>
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
