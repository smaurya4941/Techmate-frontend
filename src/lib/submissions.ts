import { apiRequest } from '@/lib/http';
import type {
  DetailResponse,
  DistributorApplicationPayload,
  EnquiryPayload,
  QuoteRequestPayload,
  SubmissionReceipt,
} from '@/types/api';

/** Public write endpoints. Each resolves to the reference shown to the customer. */

export async function submitEnquiry(payload: EnquiryPayload): Promise<string> {
  const res = await apiRequest<DetailResponse<SubmissionReceipt>>('/enquiries', { method: 'POST', body: payload });
  return res.data.reference;
}

export async function submitQuoteRequest(payload: QuoteRequestPayload): Promise<string> {
  const res = await apiRequest<DetailResponse<SubmissionReceipt>>('/quote-requests', { method: 'POST', body: payload });
  return res.data.reference;
}

export async function submitDistributorApplication(payload: DistributorApplicationPayload): Promise<string> {
  const res = await apiRequest<DetailResponse<SubmissionReceipt>>('/distributor-applications', { method: 'POST', body: payload });
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
