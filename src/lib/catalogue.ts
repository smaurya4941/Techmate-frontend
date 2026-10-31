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
 * Provides authentic, high-resolution commercial food-service equipment dummy images
 * mapped to category and model code patterns until real production photographs are supplied.
 */
export function getDefaultDummyProductImage(categorySlug?: string, sku?: string): string {
  const m = (sku || '').toUpperCase();
  if (m.includes('DB1044') || m.includes('DETERGENT') || m.includes('CLEAN')) {
    return '/images/products/cleaning-detergent.jpg';
  }
  if (m.includes('SPEED') || m.includes('XEMA')) {
    return '/images/products/speed-oven.jpg';
  }
  if (m.includes('LIEVOX') || m.includes('XEBPC') || m.includes('PROOF')) {
    return '/images/products/proofer-lievox.jpg';
  }
  if (m.includes('XEVC-0711') || m.includes('XEVL-2011')) {
    return '/images/products/cheftop-combi-2.jpg';
  }
  if (m.includes('CHEFTOP') || m.includes('XEVC')) {
    return '/images/products/cheftop-combi-1.jpg';
  }
  if (m.includes('XEFR-04EU') || m.includes('XEFR-06EU')) {
    return '/images/products/bakerlux-convection-2.jpg';
  }
  if (m.includes('BAKERLUX') || m.includes('XEFR') || m.includes('XFT')) {
    return '/images/products/bakerlux-convection-1.jpg';
  }
  if (m.includes('XEBC-10EU')) {
    return '/images/products/bakertop-combi-2.jpg';
  }
  if (m.includes('BAKERTOP') || m.includes('XEBC')) {
    return '/images/products/bakertop-combi-1.jpg';
  }

  switch (categorySlug) {
    case 'bakery-baking':
      return '/images/products/bakertop-combi-1.jpg';
    case 'cooking':
      return '/images/products/cheftop-combi-1.jpg';
    case 'refrigeration':
      return '/images/products/commercial-refrigeration.jpg';
    case 'dishwashing':
      return '/images/products/commercial-dishwashing.jpg';
    case 'food-preparation':
      return '/images/products/commercial-food-prep.jpg';
    case 'hot-holding':
      return '/images/products/commercial-hot-holding.jpg';
    case 'kitchen-equipment':
    default:
      return '/images/products/commercial-kitchen-equipment.jpg';
  }
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
    image: api.image_url || getDefaultDummyProductImage(top?.slug, api.sku),
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
          group: (group.group as ProductSpecification['group']) || 'Construction & Material',
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

  const dummyFallback = getDefaultDummyProductImage(base.category, base.modelNumber);

  return {
    ...base,
    image: base.image || dummyFallback,
    fullDescription: api.description || api.short_description || base.fullDescription,
    galleryImages: gallery.length > 0 ? gallery : [dummyFallback, '/images/products/bakertop-combi-2.jpg', '/images/products/cheftop-combi-2.jpg'],
    specifications: specs.length > 0 ? specs : base.specifications,
    brochureUrl: brochure,
  };
}
