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
import {
  Wrench,
  ShieldCheck,
  FileText,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  Clock,
  Layers,
} from 'lucide-react';

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    modelNumber: '',
    serialNumber: '',
    issueType: 'breakdown',
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
    if (!formData.name.trim()) newErrors.name = 'Contact name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.modelNumber.trim()) newErrors.modelNumber = 'Machine model number is required';
    if (!formData.description.trim()) newErrors.description = 'Issue description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 700);
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F3F6FA]/50 py-8">
        <PageContainer>
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'Service & Technical Support' }]} />
          </div>

          {/* Heading */}
          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-10 mb-8 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#174A83] block mb-2 font-mono">
              AFTER-SALES &amp; LIFECYCLE ASSISTANCE
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#102B46] font-heading">
              Technical Support &amp; Equipment Maintenance
            </h1>
            <p className="mt-3 text-sm text-[#344054] max-w-2xl leading-relaxed">
              Factory-trained service technicians, genuine OEM spare parts, annual maintenance contracts (AMC), and MEP commissioning support across India.
            </p>
          </div>

          {/* 3 Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#174A83]/10 text-[#174A83] flex items-center justify-center mb-4">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#102B46] mb-2">
                On-Site Breakdown Support
              </h3>
              <p className="text-xs text-[#344054] leading-relaxed mb-4">
                Direct dispatch of technicians for combi ovens, refrigeration chillers, and rotary bakery machinery.
              </p>
              <div className="text-xs font-mono font-bold text-[#D62836] flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" /> +91 800-TECHMATE
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#102B46] mb-2">
                Factory Warranty &amp; AMC
              </h3>
              <p className="text-xs text-[#344054] leading-relaxed mb-4">
                Comprehensive 1-2 year standard warranties with options for preventative maintenance schedules.
              </p>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Genuine OEM Spare Parts
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#102B46]/10 text-[#102B46] flex items-center justify-center mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#102B46] mb-2">
                Technical Manuals &amp; Schematics
              </h3>
              <p className="text-xs text-[#344054] leading-relaxed mb-4">
                Access equipment user guides, wiring diagrams, plumbing specs, and preventive descaling protocols.
              </p>
              <a
                href="#service-ticket"
                className="text-xs font-bold text-[#174A83] hover:underline"
              >
                Request Machine Manual ↓
              </a>
            </div>
          </div>

          {/* Service Ticket Form */}
          <div id="service-ticket" className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-10 shadow-sm">
            <div className="max-w-2xl mb-8">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#102B46]">
                Log a Service Request or Spare Part Inquiry
              </h2>
              <p className="text-xs sm:text-sm text-[#344054] mt-1.5">
                Submit machine details below to generate a service ticket with our factory technical team.
              </p>
            </div>

            {isSuccess ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold text-xl text-[#102B46]">
                  Service Request Dispatched
                </h3>
                <p className="text-sm text-[#344054] max-w-md mx-auto leading-relaxed">
                  Ticket logged for <strong>{formData.modelNumber}</strong>. A service engineer will review the issue and contact <strong>{formData.phone}</strong> promptly.
                </p>
                <div className="pt-4">
                  <Button
                    variant="primary"
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        modelNumber: '',
                        serialNumber: '',
                        issueType: 'breakdown',
                        description: '',
                      });
                    }}
                  >
                    Submit Another Ticket
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <Input
                    label="Contact Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    isRequired
                    placeholder="e.g. Chef Sanjay"
                  />

                  <Input
                    label="Contact Phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    isRequired
                    placeholder="+91 98000 00000"
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="sanjay@hotel.com"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
                  <Input
                    label="Equipment Model / SKU"
                    name="modelNumber"
                    value={formData.modelNumber}
                    onChange={handleChange}
                    error={errors.modelNumber}
                    isRequired
                    placeholder="e.g. TM-CO-10GN"
                  />

                  <Input
                    label="Serial Number (from Nameplate)"
                    name="serialNumber"
                    value={formData.serialNumber}
                    onChange={handleChange}
                    placeholder="e.g. TM-2024-8912"
                  />

                  <Select
                    label="Nature of Request"
                    name="issueType"
                    value={formData.issueType}
                    onChange={handleChange}
                    options={[
                      { value: 'breakdown', label: 'Urgent Breakdown / Machine Down' },
                      { value: 'preventive', label: 'Scheduled Maintenance / AMC Service' },
                      { value: 'spares', label: 'Spare Parts Order' },
                      { value: 'installation', label: 'Commissioning & Training' },
                      { value: 'manual', label: 'Technical Manual / Wiring Diagram' },
                    ]}
                  />
                </div>

                <div className="pt-2">
                  <TextArea
                    label="Description of Problem / Parts Required"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    error={errors.description}
                    isRequired
                    placeholder="Describe error code, abnormal noise, heating/cooling failure, or parts needed..."
                    rows={4}
                  />
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    <span>Submit Service Ticket</span>
                  </Button>
                </div>
              </form>
            )}
          </div>
        </PageContainer>
      </main>

      <Footer />
    </>
  );
}
