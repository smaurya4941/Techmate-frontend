import { apiRequest } from '@/lib/http';
import type {
  DetailResponse,
  DistributorApplicationPayload,
  EnquiryPayload,
  QuoteRequestPayload,
  SubmissionReceipt,
} from '@/types/api';

/** Public write endpoints. Each resolves to the reference shown to the customer. */

/**
 * A key identifying one filled-in form. The API creates at most one lead per key, so a
 * double click, a flaky-network retry or a proxy replay returns the original reference
 * instead of a duplicate enquiry. Create one per form, reuse it for retries, and create
 * a fresh one after a successful submission.
 */
export function newSubmissionKey(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Older browsers: still unique enough for a per-form retry key.
  return `k${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
}

/**
 * Approved attribution only: the page path the form was on and the campaign label. No query
 * string, referrer URL or visitor identifiers are captured.
 */
export function getAttribution(): { source_page?: string; campaign?: string } {
  if (typeof window === 'undefined') return {};

  const path = window.location.pathname;
  const campaign = new URLSearchParams(window.location.search).get('utm_campaign') ?? '';

  return {
    source_page: /^\/(?!\/)[A-Za-z0-9/_\-.]{0,254}$/.test(path) ? path : undefined,
    campaign: /^[A-Za-z0-9 _\-.]{1,100}$/.test(campaign) ? campaign : undefined,
  };
}

function idempotencyHeaders(key?: string): Record<string, string> | undefined {
  return key ? { 'Idempotency-Key': key } : undefined;
}

export async function submitEnquiry(payload: EnquiryPayload, idempotencyKey?: string): Promise<string> {
  const res = await apiRequest<DetailResponse<SubmissionReceipt>>('/enquiries', {
    method: 'POST',
    body: { ...getAttribution(), ...payload },
    headers: idempotencyHeaders(idempotencyKey),
  });
  return res.data.reference;
}

export async function submitQuoteRequest(payload: QuoteRequestPayload, idempotencyKey?: string): Promise<string> {
  const res = await apiRequest<DetailResponse<SubmissionReceipt>>('/quote-requests', {
    method: 'POST',
    body: { ...getAttribution(), ...payload },
    headers: idempotencyHeaders(idempotencyKey),
  });
  return res.data.reference;
}

export async function submitDistributorApplication(payload: DistributorApplicationPayload, idempotencyKey?: string): Promise<string> {
  const res = await apiRequest<DetailResponse<SubmissionReceipt>>('/distributor-applications', {
    method: 'POST',
    body: payload,
    headers: idempotencyHeaders(idempotencyKey),
  });
  return res.data.reference;
}

/**
 * Maps API field names (snake_case) to the form's field names so server-side
 * validation messages render beside the right input.
 */
export function mapFieldErrors(fieldErrors: Record<string, string>, fieldMap: Record<string, string>): Record<string, string> {
  const mapped: Record<string, string> = {};
  for (const [apiField, message] of Object.entries(fieldErrors)) {
    const key = apiField.replace(/\.\d+\./g, '.');
    const formField = fieldMap[apiField] ?? fieldMap[key] ?? fieldMap[apiField.split('.')[0]];
    if (formField && !mapped[formField]) mapped[formField] = message;
  }
  return mapped;
}
