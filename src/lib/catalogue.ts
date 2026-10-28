import { apiRequest } from '@/lib/http';
import type {
  ApiBrand,
  ApiCategory,
  ApiProductDetail,
  ApiProductSummary,
  CollectionResponse,
  DetailResponse,
  ProductQuery,
} from '@/types/api';

/** Public, read-only catalogue endpoints (server or client usable). */

const REVALIDATE_SECONDS = 60;

export function getCategories() {
  return apiRequest<CollectionResponse<ApiCategory, { total: number }>>('/categories', { revalidate: REVALIDATE_SECONDS });
}

export function getBrands(query: { page?: number; per_page?: number } = {}) {
  return apiRequest<CollectionResponse<ApiBrand>>('/brands', { query, revalidate: REVALIDATE_SECONDS });
}

export function getProducts(query: ProductQuery = {}) {
  return apiRequest<CollectionResponse<ApiProductSummary>>('/products', {
    query: { ...query, featured: query.featured === undefined ? undefined : query.featured ? 1 : 0 },
    revalidate: REVALIDATE_SECONDS,
  });
}

export function getCategoryProducts(slug: string, query: Omit<ProductQuery, 'category'> = {}) {
  return apiRequest<CollectionResponse<ApiProductSummary>>(`/categories/${encodeURIComponent(slug)}/products`, {
    query: { ...query, featured: query.featured === undefined ? undefined : query.featured ? 1 : 0 },
    revalidate: REVALIDATE_SECONDS,
  });
}

export function getProduct(slug: string) {
  return apiRequest<DetailResponse<ApiProductDetail>>(`/products/${encodeURIComponent(slug)}`, { revalidate: REVALIDATE_SECONDS });
}
