import { apiRequest } from '@/lib/http';
import type { GoogleReviewsData } from '@/types/api';

/** Rating, review count and up to five reviews, normalised by Laravel (the Google key stays server-side). */
export function getGoogleReviews(signal?: AbortSignal) {
  return apiRequest<GoogleReviewsData>('/google-reviews', { signal, timeoutMs: 12000 });
}

/**
 * Clearly labelled sample data for designing the section before credentials exist.
 * Only used when NEXT_PUBLIC_REVIEWS_PREVIEW=1 outside production; never shipped as real reviews.
 */
export const PREVIEW_REVIEWS: GoogleReviewsData = {
  businessName: 'Techmate Industries',
  rating: 4.8,
  totalReviews: 120,
  googleMapsUri: null,
  writeReviewUri: null,
  reviews: [
    { authorName: 'Sample Reviewer One', authorUri: null, authorPhotoUri: null, rating: 5, relativeDate: 'a month ago', publishTime: null, text: 'Sample text only. This layout preview is not a real customer review. It shows how a longer review wraps and truncates inside the card so the design can be checked before the Google connection is live.' },
    { authorName: 'Sample Reviewer Two', authorUri: null, authorPhotoUri: null, rating: 4, relativeDate: '2 months ago', publishTime: null, text: 'Sample text only. Not a real review.' },
    { authorName: 'Sample Reviewer Three', authorUri: null, authorPhotoUri: null, rating: 5, relativeDate: '3 months ago', publishTime: null, text: 'Sample text only. Not a real review.' },
  ],
};
