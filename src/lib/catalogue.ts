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
import type { EquipmentCategory, ProductItem, ProductSpecification } from '@/types/product';

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

/**
 * Transforms an ApiProductSummary into the standard UI ProductItem interface
 */
export function mapApiSummaryToProductItem(api: ApiProductSummary): ProductItem {
  const catSlug = (api.category?.slug as EquipmentCategory) || 'cooking';
  return {
    id: String(api.id),
    slug: api.slug,
    name: api.name,
    modelNumber: api.sku,
    category: catSlug,
    categoryName: api.category?.name || 'Commercial Kitchen Equipment',
    brand: api.brand?.slug,
    shortDescription:
      api.short_description ||
      'Heavy-duty commercial food-service equipment engineered for 24/7 hospitality kitchens.',
    fullDescription:
      api.short_description ||
      'High-performance commercial equipment manufactured with food-grade AISI 304 stainless steel.',
    image: api.image_url || '/images/products/placeholder.jpg',
    keyHighlights: [
      'Heavy-Duty AISI 304 Stainless Steel Construction',
      'Industrial Grade Thermal & Energy Efficiency',
      '24/7 Continuous Operation Duty Cycle',
      'GST Compliant Commercial B2B Warranty',
    ],
    specifications: [
      { label: 'Model Code', value: api.sku, group: 'Construction & Material' },
      { label: 'Power Source', value: 'Electric', group: 'Electrical & Thermal' },
    ],
    isFlagship: api.is_featured,
    warrantyPeriod: '1 Year Comprehensive Factory Warranty',
    certifications: ['ISO 9001:2015', 'CE Certified'],
    powerSource: 'Electric',
  };
}

/**
 * Transforms an ApiProductDetail into the full UI ProductItem interface with specifications & galleries
 */
export function mapApiDetailToProductItem(api: ApiProductDetail): ProductItem {
  const base = mapApiSummaryToProductItem(api);

  const specs: ProductSpecification[] = [];
  for (const group of api.specifications || []) {
    for (const item of group.items || []) {
      if (item.value !== null && item.value !== undefined) {
        specs.push({
          label: item.label,
          value: item.unit ? `${item.value} ${item.unit}` : String(item.value),
          unit: item.unit || undefined,
          group: (group.group as any) || 'Construction & Material',
        });
      }
    }
  }

  const gallery = (api.images || [])
    .map((img) => img.url)
    .filter((url): url is string => Boolean(url));

  const brochure = (api.documents || []).find(
    (doc) => doc.type === 'brochure' || doc.type === 'manual'
  )?.url || undefined;

  return {
    ...base,
    fullDescription: api.description || api.short_description || base.fullDescription,
    galleryImages: gallery.length > 0 ? gallery : undefined,
    specifications: specs.length > 0 ? specs : base.specifications,
    brochureUrl: brochure,
  };
}
