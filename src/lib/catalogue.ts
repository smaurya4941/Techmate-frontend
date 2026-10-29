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
  // A product in a sub-category reports its top-level category as `parent`.
  const top = api.category?.parent ?? api.category;
  const power = POWER_SOURCES.find((p) => p === api.power_source);
  const price = api.price !== null && api.price !== undefined ? Number(api.price) : undefined;

  const specifications: ProductSpecification[] = [
    { label: 'Model Code', value: api.sku, group: 'Construction & Material' },
  ];
  if (power) specifications.push({ label: 'Power Source', value: power, group: 'Electrical & Thermal' });

  return {
    id: String(api.id),
    slug: api.slug,
    name: api.name,
    modelNumber: api.sku,
    category: (top?.slug as EquipmentCategory) || 'cooking',
    categoryName: top?.name || 'Commercial Kitchen Equipment',
    subCategory: api.category?.parent ? api.category.slug : undefined,
    brand: api.brand?.slug,
    brandName: api.brand?.name,
    shortDescription: api.short_description || '',
    fullDescription: api.short_description || '',
    image: api.image_url || '',
    keyHighlights: api.key_highlights ?? [],
    specifications,
    isFlagship: api.is_featured,
    price: price !== undefined && Number.isFinite(price) ? price : undefined,
    currency: api.currency_code ?? undefined,
    warrantyPeriod: api.warranty_period ?? undefined,
    powerSource: power,
  };
}

const POWER_SOURCES = ['Electric', 'Gas', 'Dual Fuel', 'Passive'] as const;

/** Admin-managed details for the category cards, keyed by category slug. */
export interface CategoryMeta {
  /** Picture uploaded in the admin panel (omitted when none). */
  imageUrl?: string;
  /** Number of active sub-categories. */
  subCategoryCount: number;
}

/**
 * Category pictures and sub-category counts from the admin panel. Returns {} when the API cannot be
 * reached, so callers fall back to the built-in icons and sub-category list.
 */
export async function getCategoryMeta(): Promise<Record<string, CategoryMeta>> {
  try {
    const res = await getCategories();
    const meta: Record<string, CategoryMeta> = {};
    for (const category of res.data ?? []) {
      meta[category.slug] = {
        imageUrl: category.image_url ?? undefined,
        subCategoryCount: category.children?.length ?? 0,
      };
    }
    return meta;
  } catch {
    return {};
  }
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
