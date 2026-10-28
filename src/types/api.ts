/**
 * API Response Interfaces for Techmate Industries
 */

export interface HealthResponse {
  success: boolean;
  application: string;
  message: string;
  environment: string;
}

export interface ApiHealthResult {
  data: HealthResponse | null;
  isOnline: boolean;
  statusCode: number | null;
  errorMessage: string | null;
  latencyMs: number;
}

/* ---------------------------- /api/v1 contract ---------------------------- */

export interface ApiErrorBody {
  message: string;
  errors?: Record<string, string[]>;
  request_id?: string;
}

export interface PaginationMeta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export interface CollectionResponse<T, M = PaginationMeta> {
  message: string;
  data: T[];
  meta: M;
}

export interface DetailResponse<T> {
  message: string;
  data: T;
}

export interface SubmissionReceipt {
  reference: string;
}

export interface ApiCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  parent?: { name: string; slug: string } | null;
  product_count?: number;
  children?: ApiCategory[];
}

export interface ApiBrand {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  website_url: string | null;
  product_count?: number;
}

export interface ApiProductSummary {
  id: number;
  name: string;
  slug: string;
  sku: string;
  short_description: string | null;
  /** null = price on request (quote-first catalogue). */
  price: string | null;
  currency_code: string | null;
  is_featured: boolean;
  image_url: string | null;
  published_at: string | null;
  category: { id: number; name: string; slug: string } | null;
  brand: { id: number; name: string; slug: string; logo_url: string | null } | null;
}

export interface ApiSpecificationGroup {
  group: string;
  items: Array<{ key: string; label: string; type: 'string' | 'number' | 'boolean'; value: string | number | boolean | null; unit: string | null }>;
}

export interface ApiProductDetail extends ApiProductSummary {
  description: string | null;
  images: Array<{ url: string | null; alt_text: string | null; caption: string | null }>;
  specifications: ApiSpecificationGroup[];
  documents: Array<{ title: string; type: string; url: string | null; mime_type: string | null; file_size_bytes: number | null; language_code: string | null }>;
}

export interface ProductQuery {
  page?: number;
  per_page?: number;
  search?: string;
  category?: string;
  brand?: string;
  featured?: boolean;
  sort_by?: 'sort_order' | 'name' | 'published_at';
  sort_direction?: 'asc' | 'desc';
}

export interface EnquiryPayload {
  customer_name: string;
  email: string;
  phone?: string;
  company_name?: string;
  subject: string;
  message: string;
  source?: 'website' | 'contact_page' | 'home_page';
  hp_field?: string;
}

export interface QuoteItemPayload {
  product?: string;
  name?: string;
  quantity: number;
  notes?: string;
}

export interface QuoteRequestPayload {
  customer_name: string;
  email: string;
  phone: string;
  company_name?: string;
  message?: string;
  business_type?: 'restaurant' | 'bakery' | 'cloud-kitchen' | 'catering' | 'dealer' | 'other';
  source?: 'website' | 'request_quote_page' | 'product_page' | 'home_page';
  items: QuoteItemPayload[];
  hp_field?: string;
}

export interface DistributorApplicationPayload {
  contact_name: string;
  company_name: string;
  email: string;
  phone: string;
  business_type: 'dealer' | 'bakery-supplier' | 'refrigeration-mep' | 'turnkey-consultant' | 'other';
  experience_range?: '0-2' | '3-5' | '6-10' | '10+';
  regions_served: string[];
  message?: string;
  hp_field?: string;
}
