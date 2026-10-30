import { GOOGLE_REVIEWS_URL, GOOGLE_WRITE_REVIEW_URL } from '@/lib/site-config';
import type { GoogleReviewsData } from '@/types/api';

/**
 * Static Google Review model for verified customer reviews.
 * You can add, edit, or reorder reviews directly in the STATIC_GOOGLE_REVIEWS array below.
 */
export interface StaticGoogleReview {
  /** Unique key for React rendering */
  id: string;
  /** Name of the reviewer as shown on Google */
  authorName: string;
  /** Google contributor details, e.g. 'Local Guide · 6 reviews · 103 photos' */
  authorDetails?: string;
  /** Optional direct link to the reviewer profile or review on Google */
  authorUri?: string | null;
  /** Optional photo URL for the reviewer (if omitted, an initials avatar is rendered) */
  authorPhotoUri?: string | null;
  /** Background hex color for the profile avatar circle */
  avatarColor: string;
  /** Rating score out of 5 */
  rating: number;
  /** Relative time of the review, e.g. '2 years ago', '3 years ago' */
  relativeDate: string;
  /** Full text of the review. Preserves paragraphs and formatting. */
  text: string;
  /** Whether the reviewer has a verified buyer / customer badge */
  isVerified?: boolean;
}

/**
 * 100% Real, verified customer reviews from Google for Techmate Industries.
 * Curated from actual customer submissions.
 */
export const STATIC_GOOGLE_REVIEWS: StaticGoogleReview[] = [
  {
    id: 'shruti-chintawar',
    authorName: 'Shruti Chintawar',
    authorDetails: '3 reviews · 3 photos',
    avatarColor: '#8E24AA', // Vibrant Google Purple
    isVerified: true,
    rating: 5,
    relativeDate: '3 years ago',
    text: `I have buy Unox oven1year ago Aarina Model, I'm very happy with my requirements I can bake 5-6 cakes at a time which is very time saving to me, baking many cookies, macrons , cupcakes etc .`,
  },
  {
    id: 'rajesh-kumar',
    authorName: 'Rajesh Kumar',
    authorDetails: 'Local Guide · 6 reviews · 103 photos',
    avatarColor: '#E65100', // Vibrant Google Orange
    isVerified: true,
    rating: 5,
    relativeDate: '2 years ago',
    text: `I invested in a comprehensive café and bakery setup from Techmate Industries, and it has been a game changer for us! The quality of every product is exceptional, enhancing both our efficiency and the quality of service. Thank you, Techmate Industries, for your fantastic equipment.`,
  },
  {
    id: 'sanskruti-khakhar',
    authorName: 'Sanskruti Khakhar',
    authorDetails: '6 reviews · 3 photos',
    avatarColor: '#D81B60', // Vibrant Google Magenta / Pink
    isVerified: true,
    rating: 5,
    relativeDate: '4 years ago',
    text: `The dealer provided great service, guidance and on time delivery with proper packaging.
They helped us pick the suitable product and guided through the process of usage.
Also the after sales service was good and quick.
The service was done in expected time too.
The dealer immediately helped us regarding the after sales service personally.
Had a great experience..`,
  },
  {
    id: 'stanzin-sherab',
    authorName: 'stanzin sherab',
    authorDetails: 'Local Guide · 38 reviews · 85 photos',
    avatarColor: '#1565C0', // Vibrant Google Blue
    isVerified: true,
    rating: 5,
    relativeDate: '8 months ago',
    text: `Bought all the bakery machines for our setup in Leh. The product quality is top-notch and performance has been excellent so far. However, the after-sales service needs improvement, especially considering remote locations like Leh where timely support is crucial. Overall, great machines, but better service support would make the experience much better.`,
  },
  {
    id: 'bakery-bits',
    authorName: 'Bakery Bits',
    authorDetails: '1 review · 1 photo',
    avatarColor: '#D62836', // Techmate Brand Red
    isVerified: true,
    rating: 5,
    relativeDate: '3 years ago',
    text: `Dear Techmate Industries,

We extend our heartfelt gratitude for the exceptional Unox Bakerlux oven. It has elevated our culinary experience immensely. Your generosity has not gone unnoticed, and we are truly thankful for your contribution to our kitchen.

Warm regards,

BAKERY BITS
ORIGINAL BOUTIQUE BAKERY`,
  },
];

/** Summary metadata displayed in the Google Reviews banner */
export const GOOGLE_REVIEWS_SUMMARY = {
  businessName: 'Techmate Industries',
  rating: 4.9,
  totalReviews: '300+',
  headline: 'EXCELLENT',
  googleMapsUrl: GOOGLE_REVIEWS_URL,
  writeReviewUrl: GOOGLE_WRITE_REVIEW_URL,
};

/**
 * Backward compatibility helper for legacy callers.
 */
export async function getGoogleReviews(): Promise<GoogleReviewsData> {
  return {
    businessName: GOOGLE_REVIEWS_SUMMARY.businessName,
    rating: GOOGLE_REVIEWS_SUMMARY.rating,
    totalReviews: 300,
    googleMapsUri: GOOGLE_REVIEWS_SUMMARY.googleMapsUrl,
    writeReviewUri: GOOGLE_REVIEWS_SUMMARY.writeReviewUrl,
    reviews: STATIC_GOOGLE_REVIEWS.map((r) => ({
      authorName: r.authorName,
      authorUri: r.authorUri ?? null,
      authorPhotoUri: r.authorPhotoUri ?? null,
      rating: r.rating,
      text: r.text,
      relativeDate: r.relativeDate,
      publishTime: null,
    })),
  };
}
